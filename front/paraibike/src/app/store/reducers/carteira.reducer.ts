import { Carteira } from "src/app/interface/carteira";
import { createReducer, on } from '@ngrx/store';
import { atualizarValorCarteira, debitarCredito } from '../actions/carteira.actions';

export const initialState: Carteira = { valor: 0 };

export const carteiraReducer = createReducer(
  initialState,
  on(atualizarValorCarteira, (state, { valorCarteira }) => valorCarteira),
  on(debitarCredito, (state, { valorDebito }) => ({ ...state, valor: state.valor - valorDebito }))
);
