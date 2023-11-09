import { Bicicleta } from "./bicicleta";
import { Usuario } from "./usuario";

export class Aluguel {
  id!: number;
  valor!: number;
  data!: string | undefined;
  status!: string;
  bicicleta!: Bicicleta;
  usuarioDTO?: Usuario;
}
