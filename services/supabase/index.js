import { createClient } from '@supabase/supabase-js'

class SupaService{
    instance
    constructor(){
          
        console.log(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PASS)

        if(!this.instance)
            this.instance = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PASS,['public'])

    }
    getInstance(){
        if(!this.instance) throw new Error("Instance not exists.")

        return this.instance
    }
}


const supa = new SupaService()

export default supa.getInstance()


