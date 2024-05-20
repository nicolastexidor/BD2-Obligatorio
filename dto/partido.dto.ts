export class PartidoDTO {
    public EqLoc: string;
    public EqVis: string;
    public FechaHora: Date;
    public GolesLoc: number;
    public GolesVis: number;
    public Estadio: string;
  
    constructor(EqLoc: string, EqVis: string, FechaHora: Date, GolesLoc: number, GolesVis: number, Estadio: string) {
      this.EqLoc = EqLoc;
      this.EqVis = EqVis;
      this.FechaHora = FechaHora;
      this.GolesLoc = GolesLoc;
      this.GolesVis = GolesVis;
      this.Estadio = Estadio;
    }
}
  