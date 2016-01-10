import React from 'react';

export default ({element, click, selected, del}) => {
    let color = '';
    let count = 0;
    const elem = <small> - Selectionné</small>;
    const less = <footer className="row">
        <button onClick={() => click(element)} className="card u-full-width button-primary">Choisir</button>
    </footer>;
    let number;
    const more = <footer class="row">
        <div className="six columns">
            <button onClick={() => click(element)} className="card u-full-width button-primary">Choisir</button>
        </div>
        <div className="six columns">
            <button onClick={() => del(element)} className="card u-full-width">-</button>
        </div>
    </footer>;

    if (selected[0] !== undefined) {
        const filter = selected.filter(select => {
            console.log("select", select, "elem", element);
            return select.name === element.name;
        });
        color = filter.length > 0 ? elem : '';
        count = filter.length;
        number = <div className="card__date">
            <span className="card__date__day">{count}</span>
        </div>;
    } else {
        color = selected.name === element.name ? elem : '';
    }
    return <article className='card four columns'>
        <header className="card__thumb">
            <a onClick={() => click(element)}>
                <img src={element.img}/>
            </a>
        </header>
        {count > 0 ? number : ''}
        <div className="card__body">
            <div className="card__category"><a onClick={() => click(element)}>{element.type}</a></div>
            <h2 className="card__title"><a onClick={() => click(element)}>{element.name} {color}</a></h2>
            <p className="card__description">
                {element.desc}
            </p>
        </div>
        {count > 0 ? more : less}
    </article>;
}
