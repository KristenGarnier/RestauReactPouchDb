let state = [];
export default (_ = [], action) => {
    console.log(action);
    console.log(state);
    switch (action.type) {
        case 'ADD_SUPPLEMENT':
            return;
        case 'DELETE_SUPPLEMENT':
            return;
        case 'INSTANTIATE_PRINCIPAL':
            state.principal = action.principal;
            return state;
        case 'INSTANTIATE_DRINK':
            return;
        case 'INSTANTIATE_RESTAURANT':
            state.restaurant = action.restaurant;
            return state;
        default:
            return state
    }
}