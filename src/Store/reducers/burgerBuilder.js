import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const INGREDIENT_PRICES =  {
    salad: 0.5,
    cheese: 0.7,
    meat : 0.8,
    bacon : 0.3
}

const initialState = {
    ingredients : null,
    totalPrice: 4,
    error: false,
    building : false
}

const addIngredient = (state,action) => {
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building : true
    };

    return updateObject(state,updatedState);
}

const removeIngredient = (state,action) => {
    const updatedIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updateObject(state.ingredients,updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building : true
    };
    return updateObject(state,updatedSt);
}

const setIngredient = (state,action) => {
    return updateObject(state, {
        ingredients : {
            salad  : action.ingredients.salad,
            bacon : action.ingredients.salad,
            cheese : action.ingredients.cheese,
            meat : action.ingredients.meat

        },
        totalPrice: 4,
        error: false,
        building : false
    })
}
const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return updateObject(state,{error : true});

    }
    return state;
}

export default reducer;