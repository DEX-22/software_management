import supaInstance from '@/services/supabase'
class AreasService{
    supa
    table
    constructor(){
        this.table = 'areas'
        this.supa = supaInstance
    }
    db(){
        return this.supa.from(this.table)
    }
    async create(area){
        const res = await this.db().insert([area]).select()
        return res
    }
    async getAll(){
        const {data,error} = await this.db().select('*')
        if(error){
            throw new Error(error)
        }else{
            return data
        }
    }
}

export default new AreasService
