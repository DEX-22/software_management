import supaInstance from '../supabase/index'

class ActivosInformaticosService{
    supa
    constructor(){
        this.table = 'activo_informatico'
        this.supa = supaInstance
    }
    db(){
        return this.supa.from(this.table)
    }
    async create(activo){
        const res = await this.db().insert([activo])
        return res
    }
    async getAll(){
        const {data,error} = await this.db().select('*')

        if(error) throw new Error(error)
        else return data

    }
}


export default new ActivosInformaticosService