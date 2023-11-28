import { Bicicleta } from "./bicicleta";
import { Usuario } from "./usuario";

export class Aluguel {
  id!: number;
  valor?: string;
  quantidadeHoras!: string;
  data!: string | undefined;
  status!: string;
  bicicleta!: Bicicleta;
  usuarioId?: number;
}
