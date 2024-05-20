export class AdministradorDTO {
    public CI: string;
    public Nombre: string;
    public Contraseña: string;
  
    constructor(CI: string, Nombre: string, Contraseña: string) {
      this.CI = CI;
      this.Nombre = Nombre;
      this.Contraseña = Contraseña;
    }
  }

  