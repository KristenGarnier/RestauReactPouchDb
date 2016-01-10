import React from 'react';

export default ({element, click}) => {
    return <tr>
        <td>{element.name}</td>
        <td>Produit supplémentaire</td>
        <td>{element.price}</td>
        <td><button onClick={ () => click('DELETE', element) }>X</button></td>
    </tr>;
}
