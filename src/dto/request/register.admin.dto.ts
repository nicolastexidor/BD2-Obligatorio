export class RegisterAdminDTO {
    public ci: string; 
    public nombre: string; 
    public contraseña: string;

    constructor(CI: string, Nombre: string, Contraseña: string) {
        this.ci = CI;
        this.nombre = Nombre;
        this.contraseña = Contraseña;
    }
}