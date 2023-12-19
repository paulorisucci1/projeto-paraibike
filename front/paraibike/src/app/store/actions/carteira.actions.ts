import { createAction, props } from "@ngrx/store";
import { Carteira } from "src/app/interface/carteira";

export const atualizarValorCarteira = createAction(
    '[Carteira] Atualizar valor da carteira',
    props<{valorCarteira: Carteira}>()
);

export const debitarCredito = createAction(
    '[Carteira] Debitar Crédito',
    props<{ valorDebito: number }>()
);