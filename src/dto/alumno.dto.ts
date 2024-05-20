export class AlumnoDTO {
    public CI: string;
    public Nombre: string;
    public EqCampeon: string;
    public EqSubcampeon: string;
    public Carrera: string;
    public Puntos: number;
    public Contraseña: string;
  
    constructor(CI: string, Nombre: string, EqCampeon: string, EqSubcampeon: string, Carrera: string, Puntos: number, Contraseña: string) {
      this.CI = CI;
      this.Nombre = Nombre;
      this.EqCampeon = EqCampeon;
      this.EqSubcampeon = EqSubcampeon;
      this.Carrera = Carrera;
      this.Puntos = Puntos;
      this.Contraseña = Contraseña;
    }
}
  

  