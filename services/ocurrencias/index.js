import supaInstance from '../supabase/index'
class OcurrenciasService{
    supa
    table
    constructor(){
        this.supa = supaInstance
        this.table = 'ocurrencias'
    }
    db(){
        return this.supa.from(this.table)
    }
    async getAll(){
        const {data,error} = await this.db()
                    .select(`
                        id,codigo,descripcion,
                        activo_informatico( id ,nombre),
                        areas(id,nombre),
                        personal: personal_id(id,nombres,apellidos),
                        prioridad,
                        estado,
                        fecha, tipo_mantenimiento
                        `)
                        /*
                        id,codigo,descripcion,
                        activo_informatico( id ,nombre),
                        areas(id,nombre),
                        personal(id,nombre),
                        prioridad,
                        estado,
                        fecha, tipo_mantenimiento
                        */



        if(!error)
            return data
        else 
            throw new Error(error)
    }
    async create(ocurrencia){

        const {data,error} = await this.db().insert([ocurrencia]).select()
        if(error){
            throw new Error(error)
        }else{
            return data
        }
    }   
}


export default new OcurrenciasService