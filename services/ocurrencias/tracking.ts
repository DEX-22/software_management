import type { Track } from '~/interfaces/tracking' 
import supaInstance from '../supabase/index'
import type { IUser } from '~/interfaces/user'
class OcurrenciasTrackingService{
    supa
    table
    constructor(){
        this.supa = supaInstance
        this.table = 'ocurrencias_tracking'
    }
    db(){
        return this.supa.from(this.table)
    }
    async track(track:Track){
        const {data,error} = await this.db().insert(track)

        if(error) throw new Error(error.message)
            else return data
    }
    async getTrackingOcurrencia(ocurrencia_id:number){
        const {data,error} = await this.db()
        .select( `accion,user_id(nombres,apellidos),created_at,observacion`)
        .eq('ocurrencia_id',ocurrencia_id)

        data?.forEach(e=> e.user = `${e?.user_id?.nombres} ${e?.user_id?.apellidos}`)

        if(error) throw new Error(error.message)
        else return data
    }
}
interface IOcurrenciaDb{
    created_at: string,
    accion: string,
    user_id: IUser
}


export default new OcurrenciasTrackingService