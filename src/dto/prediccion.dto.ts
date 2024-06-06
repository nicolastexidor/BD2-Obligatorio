export class PrediccionDTO {
    public CIAlumno: string;
    public PuntosOtorgados: number;
    public eqLoc: string;
    public eqVis: string;
    public GolesLoc: number;
    public GolesVis: number;
    public FechaHora: string;
  
    constructor(CIAlumno: string, PuntosOtorgados: number, EqLoc: string, EqVis: string, GolesLoc: number, GolesVis: number, FechaHora: string) {
        this.CIAlumno = CIAlumno;
        this.PuntosOtorgados = PuntosOtorgados;
        this.GolesLoc = GolesLoc;
        this.GolesVis = GolesVis;
        this.eqLoc = EqLoc;
        this.eqVis = EqVis;
        this.FechaHora = FechaHora;
    }
}