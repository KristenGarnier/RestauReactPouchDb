import React from 'react';

export default ({element, click}) => {
    return <tr>
        <td>{element.name}</td>
        <td>Produit supplémentaire</td>
        <td>{element.price * element.count} € | Prix unitaire {element.price} €</td>
        <td>{element.count}</td>
        <td><button onClick={ () => click('DELETE', element) }>-</button></td>
    </tr>;
}
