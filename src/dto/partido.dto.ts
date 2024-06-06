export class PartidoDTO {
    public eqloc: string;
    public eqvis: string;
    public fechahora: Date;
    public golesloc: number;
    public golesvis: number;
    public estadio: string;
  
    constructor(EqLoc: string, EqVis: string, FechaHora: Date, GolesLoc: number, GolesVis: number, Estadio: string) {
      this.eqloc = EqLoc;
      this.eqvis = EqVis;
      this.fechahora = FechaHora;
      this.golesloc = GolesLoc;
      this.golesvis = GolesVis;
      this.estadio = Estadio;
    }
}
  