import {getNowPlusDays} from "../utils";

export const MESSAGES = {
  ADDED_TO_CART: {severity: 'success', summary: 'Sucesso', detail: 'Produto adicionado ao carrinho.'},
  RECORD_SAVED: {severity: 'success', summary: 'Sucesso', detail: 'Registro salvo.'},
  RECORD_REMOVED: {severity: 'success', summary: 'Sucesso', detail: 'Registro removido.'},
  USER_UPDATED: {severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado.'},
};

export const ORDER_STEPS = [
  {label: 'Carrinho'},
  {label: 'Entrega'},
  {label: 'Pagamento'},
  {label: 'Confirmação'},
];

export const CART = 'CART';

export const SHIPPING_METHODS = [
  {
    name: 'Entrega Econômica',
    date: getNowPlusDays(7),
    price: 0,
  },
  {
    name: 'Entrega Expressa',
    date: getNowPlusDays(3),
    price: 19.53,
  },
];
