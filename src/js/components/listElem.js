import React from 'react';

export default ({element, click, selected, del}) => {
    let color = '';
    let count = 0;
    if(selected[0] !== undefined){
        const filter = selected.filter(select => {
            console.log("select", select, "elem", element);
            return select.name === element.name;
        });
        color = filter.length > 0 ? "red" : '';
        count = filter.length;
    }else {
        color = selected.name === element.name ? "red" : '';
    }
    return <li>
        <span onClick={() => click(element)} style={{ color: color}}> {element.name}{count > 1 ? ` | ${count}` : '' }</span>
        {count > 0 ? <button onClick={() => del(element)}>-</button>: ''}
    </li>;
}