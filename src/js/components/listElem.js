import React from 'react';

export default ({element, click, selected}) => {
    const color = selected.name === element.name ? "red" : '';
    return <li onClick={() => click(element)} style={{ color: color}}> {element.name}</li>;
}