export const initialState = {
  products: [],
  loading: true,
  error: null,
};

export function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload, // Update products with new data
        loading: false,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
