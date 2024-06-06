export class AlumnoDTO {
    public ci: string;
    public nombre: string;
    public eqCampeon: string;
    public eqSubcampeon: string;
    public carrera: string;
    public puntos: number;
    public contraseña: string;
  
    constructor(CI: string, Nombre: string, EqCampeon: string, EqSubcampeon: string, Carrera: string, Puntos: number, contraseña: string) {
      this.ci = CI;
      this.nombre = Nombre;
      this.eqCampeon = EqCampeon;
      this.eqSubcampeon = EqSubcampeon;
      this.carrera = Carrera;
      this.puntos = Puntos;
      this.contraseña = contraseña;
    }
}
  

  