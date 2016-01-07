export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_SUPPLEMENT':
            return;
        case 'DELETE_SUPPLEMENT':
            return;
        case 'INSTANTIATE_PRINCIPAL':
            return;
        case 'INSTANTIATE_DRINK':
            return;
        case 'INSTANTIATE_RESTAURANT':
            console.log(action);
                state.restaurant = action.restaurant;
            return state;
        default:
            return state
    }
}