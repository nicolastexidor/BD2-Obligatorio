export class PartidoDTO {
    public eqloc: string;
    public eqvis: string;
    public fechahora: string;
    public golesloc: number;
    public golesvis: number;
    public estadioId: number;
  
    constructor(EqLoc: string, EqVis: string, FechaHora: string, GolesLoc: number, GolesVis: number, EstadioId: number) {
      this.eqloc = EqLoc;
      this.eqvis = EqVis;
      this.fechahora = FechaHora;
      this.golesloc = GolesLoc;
      this.golesvis = GolesVis;
      this.estadioId = EstadioId;
    }
}
  