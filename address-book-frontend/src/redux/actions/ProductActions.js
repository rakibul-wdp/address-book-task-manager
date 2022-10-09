import { ActionTypes } from '../constants/ActionTypes.js'

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  }
}
export const selectedProducts = (products) => {
  return {
    type: ActionTypes.SELECTED_PRODUCTS,
    payload: products,
  }
}
export const changeImageandCount = (products) => {
  return {
    type: ActionTypes.CHANGE_NAME_AND_NUMBER,
    payload: products,
  }
}
export const setInitialProduct = (products) => {
  return {
    type: ActionTypes.SET_INITIAL_PRODUCT,
    payload: products,
  }
}
export const setSearchText = (products) => {
  return {
    type: ActionTypes.SET_SEARCH_TEXT,
    payload: products,
  }
}