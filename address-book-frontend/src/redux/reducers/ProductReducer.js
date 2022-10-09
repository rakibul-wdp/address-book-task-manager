import { ActionTypes } from "../constants/ActionTypes";

const initialState = {
  //Initial list
  products: [

  ],

  //Index of selected product for editing
  selectedProducts: [
    "0"
  ],

  //Stores search text for searching
  searchText: ""

}

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //Used to update the entire list
    case (ActionTypes.SET_INITIAL_PRODUCT):
      return {
        ...state,
        products: payload
      };

    //Used to append a sing element into list
    case (ActionTypes.SET_PRODUCTS):
      return {
        ...state,
        products: state.products.concat(payload)
      };

    //Used to update current select index
    case (ActionTypes.SELECTED_PRODUCTS):
      return {
        ...state,
        selectedProducts: payload
      };

    //Used to change name and number during editing
    case (ActionTypes.CHANGE_NAME_AND_NUMBER):
      return {
        ...state,
        products: state.products.map(
          (product, index) => (index == state.selectedProducts) ? { ...product, name: payload.name, phone_no: payload.phone_no } : product
        )
      }

    // Used to store the text for searching
    case (ActionTypes.SET_SEARCH_TEXT):
      return {
        ...state,
        searchText: payload
      };

    default:
      return state;
  }
}