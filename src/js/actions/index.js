export function addSupplement(supplement){
    return {
        type: 'ADD_SUPPLEMENT',
        supplement
    }
}

export function deleteSupplement(index){
    return {
        type: 'DELETE_SUPPLEMENT',
        index
    }
}

export function instantiatePrincipal(principal){
    return {
        type: 'INSTANTIATE_PRINCIPAL',
        principal
    }
}

export function instantiateDrink(drink){
    return {
        type: 'INSTANTIATE_DRINK',
        drink
    }
}

export function instantiateRestaurant(restaurant){
    return {
        type: 'INSTANTIATE_RESTAURANT',
        restaurant
    }
}
