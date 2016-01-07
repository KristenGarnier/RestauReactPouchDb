import React from 'react';

export default ({restaurant, click}) => {
    return <li onClick={() => click(restaurant)}> {restaurant.name}</li>;
}
