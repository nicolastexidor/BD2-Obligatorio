export class RegisterAlumnoDTO {
    //ci, nombre, eqcampeon, eqsubcampeon, carrera, contraseña
    public ci: string;
    public nombre: string;
    public eqcampeon: string;
    public eqsubcampeon: string;
    public carrera: string;
    public contraseña: string;

    constructor(CI: string, Nombre: string, EqCampeon: string, EqSubcampeon: string, Carrera: string, Contraseña: string,) {
        this.ci = CI;
        this.nombre = Nombre;
        this.eqcampeon = EqCampeon;
        this.eqsubcampeon = EqSubcampeon;
        this.carrera = Carrera;
        this.contraseña = Contraseña;
    }
}