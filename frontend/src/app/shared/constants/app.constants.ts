export const MESSAGES = {
  ADDED_TO_CART: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Produto adicionado ao carrinho.',
  },
  REMOVED_FROM_CART: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Produto removido do carrinho.',
  },
  RECORD_ADDED: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Registro salvo.',
  },
  RECORD_REMOVED: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Registro removido.',
  },
  USER_UPDATED: {
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Usuário atualizado.',
  },
};

export const ORDER_STEPS = [
  { label: 'Carrinho' },
  { label: 'Entrega' },
  { label: 'Pagamento' },
  { label: 'Confirmação' },
];

export const CART = 'cart';
export const AUTHORIZATION = 'authorization';
export const DARK_MODE = 'dark-mode';
export const VISIBLE_SIDEBAR = 'visible-sidebar';
