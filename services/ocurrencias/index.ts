import OcurrenciasTrackingService from './tracking'
import supaInstance from '../supabase/index'
import type { IOcurrencia } from '~/interfaces/ocurrencias'
import type { Track } from '~/interfaces/tracking'

class OcurrenciasService {
    supa
    table
    constructor() {
        this.supa = supaInstance
        this.table = 'ocurrencias'
    }
    db() {
        return this.supa.from(this.table)
    }
    async getAll() {
        const { data, error } = await this.db()
            .select(`
                        id,codigo,descripcion,
                        activo_informatico( id ,nombre),
                        areas(id,nombre),
                        personal_id (id,nombres,apellidos),
                        tecnico_id (id,nombres,apellidos),
                        prioridad,
                        estado,
                        fecha, 
                        tipo_mantenimiento
                        `)
            .order('prioridad')
        /*
        id,codigo,descripcion,
        activo_informatico( id ,nombre),
        areas(id,nombre),
        personal(id,nombre),
        prioridad,
        estado,
        fecha, tipo_mantenimiento
        */



        if (!error)
            return data
        else
            throw new Error(error)
    }
    async create(ocurrencia) {

        const { data, error } = await this.db().insert([ocurrencia]).select()
        if (error) {
            throw new Error(error.message)
        }


        const tracking = await OcurrenciasTrackingService.track({
            ocurrencia_id,
            user_id: tecnico_id,
            accion: "crear ocurrencia",
            observacion: ""
        })

        if (tracking?.error) {
            throw new Error(tracking.error.message)
        } else {
            return data
        }
    }
    async assignTech(ocurrencia_id: number, tecnico_id: number) {
        const { data, error } = await this.db()
            .update({ tecnico_id, estado: "EN REVISION" })
            .eq('id', ocurrencia_id)
            .select()

        if (error)
            throw new Error(error)

        const tracking = await OcurrenciasTrackingService.track({
            ocurrencia_id,
            user_id: tecnico_id,
            accion: "asignar tecnico",
            observacion: ""
        })

        if (tracking?.error) {
            throw new Error(tracking.error.message)
        }
        else
            return data
    }
    async getDetailsById(id: number) {
        const { data, error } = await this.db().select(`
                id,descripcion,estado,prioridad,fecha,tipo_mantenimiento,
                activo_id (nombre),
                personal_id(id,nombres,apellidos),tecnico_id(id,nombres,apellidos),area_id (nombre)
            `).eq('id', id)

        if (error) throw new Error(error.message)

        const item:IItemDetail = data[0]

        item.activo = item.activo_id.nombre
        item.personal = `${item.personal_id.nombres} ${item.personal_id.apellidos}`
        item.tecnico = `${item.tecnico_id?.nombres ?? ''} ${item.tecnico_id?.apellidos ?? ''}`
        item.area = item.area_id.nombre

        return item
    }
    async addStep(info: IOcurrencia, ocurrencia_id: number) {
        info.tecnico_id = info.tecnico_id?.id
        
        const observacion = info.observacion ?? ""
        delete info.observacion

        const { data, error } = await this.db()
            .update(info)
            .eq('id', ocurrencia_id)
            .single()

        if (error)
            throw new Error(error.message)

        const track: Track = {
            ocurrencia_id,
            user_id: info.tecnico_id?.id ?? null,
            accion: info.estado ?? "",
            observacion
        } 

        const trackingData = await OcurrenciasTrackingService.track(track)

        if(trackingData?.error){
            throw new Error(error.message)
        }


        return data

    }

}

interface IItemDetail extends IOcurrencia{
    activo: string
    personal: string
    tecnico: string
    area:string
}


export default new OcurrenciasService