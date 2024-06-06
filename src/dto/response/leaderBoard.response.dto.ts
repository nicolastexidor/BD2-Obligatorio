export class LeaderBoardResponseDTO {
    public Nombre: string;
    public Puntos: number;
    public Carrera: string;
  
    constructor(Nombre: string, Puntos: number, Carrera: string) {
        this.Nombre = Nombre;
        this.Puntos = Puntos;
        this.Carrera = Carrera;
    }
}