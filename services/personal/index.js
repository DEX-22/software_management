import supaInstance from '../supabase/index'
class PersonalService{
    supa
    table
    constructor(){
        this.supa = supaInstance
        this.table = 'personal'
    }
    db(){
        return this.supa.from(this.table)
    }
    async getAll(){
        const {data,error} = await this.db().select('*')

        if(!error)
            return data
        else 
            throw new Error(error)
    }
}


export default new PersonalService
