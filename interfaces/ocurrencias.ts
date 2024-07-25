export interface IOcurrencia{
    observacion? : string,
    estado? : string, 
    id?: number,
    descripcion?: string,
    prioridad?: string
    fecha?: string
    tipo_mantenimiento?: string
    activo_id?:IActivo | null, 
    personal_id?:IPersonal | null,
    tecnico_id?: ITecnico |number| null
    area_id?:  IArea | null
}

export interface IPersonal{
    id: number;
    nombres: string;
    apellidos: string;
}

export interface ITecnico extends IPersonal{}

export interface IActivo{
    id: number
    nombre: string
}
export interface IArea{
    id:number
    nombre: string
}