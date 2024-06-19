export class EstadioDTO {
    public id: number;
    public nombre: string;
    public ciudad: string;
    public estado: string;

    constructor(Id: number, Nombre: string, Ciudad: string, Estado: string) {
        this.id = Id;
        this.nombre = Nombre;
        this.ciudad = Ciudad;
        this.estado = Estado;
    }
}