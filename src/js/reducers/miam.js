let state = [];
export default (_ = [], action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_SUPPLEMENT':
            if(state.supplements === undefined){
                state.supplements = [action.supplement];
            } else {
                state.supplements = [
                    ...state.supplements,
                    action.supplement
                ];
            }
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
            return state;
        case 'INSTANTIATE_PRINCIPAL':
            state.principal = action.principal;
            return state;
        case 'INSTANTIATE_DRINK':
            state.drink = action.drink;
            return state;
        case 'INSTANTIATE_RESTAURANT':
            state.restaurant = action.restaurant;
            return state;
        default:
            return state
    }
}