import Circular from 'circular-json';

let state = localStorage.getItem('state') !== null && localStorage.getItem('state') !== '' ? Object.assign(Circular.parse(localStorage.getItem('state'))) : {};

const saveState = (save) => {
    localStorage.setItem('state', Circular.stringify(save));
};

export default (_ = [], action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_SUPPLEMENT':
            if(state.supplements === undefined){
                state.supplements = [action.supplement];
            } else {
                state.supplements = [
                    ...state.supplements,
                    Object.assign(action.supplement)
                ];
            }
            saveState(state);
            return state;
        case 'DELETE_SUPPLEMENT':
            let count = 0;
            state.supplements = state.supplements.filter(supplement => {
                if(count === 0){
                    if(supplement._id !== action.supplement._id){
                        return true;
                    }else {
                        count ++;
                        return false
                    }
                } else {
                    return true
                }
            });
            saveState(state);
            return state;
        case 'INSTANTIATE_PRINCIPAL':
            state.principal = action.principal;
            saveState(state);
            return state;
        case 'INSTANTIATE_DRINK':
            state.drink = action.drink;
            saveState(state);
            return state;
        case 'INSTANTIATE_RESTAURANT':
            state = {};
            state.restaurant = action.restaurant;
            saveState(state);
            return state;
        case 'RESET':
            state = [];
            localStorage.removeItem('state');
            return state;
        default:
            return state
    }
}