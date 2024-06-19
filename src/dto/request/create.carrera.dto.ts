export class CreateCarreraDTO {
   public id: number;
    public nombre: string;
  
    constructor(Id: number, Nombre: string) {
        this.nombre = Nombre;
        this.id = Id
    }
}