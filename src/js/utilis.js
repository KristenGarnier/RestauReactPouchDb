import _ from 'ramda';
export function countElems(supplemements) {
    return _.flatten(supplemements).reduce((container, element) => {

        const temp = container.filter(e => {
            return e.id === element._id.toString();
        });

        if (temp.length > 0) {
            return container.map(e => {
                if (e.id === element._id.toString()) {
                    return Object.assign(e, {
                        count: e.count + 1
                    });
                }
                return e;
            });
        } else {
            const newObj = Object.assign(element, {
                    id: element._id.toString(),
                    count: 1
                });

            return [
                ...container,
                newObj];
        }
    }, []);
}

export function getElems(state, cat){
    return state.map(elem => {
        return elem.elems[cat];
    });
}
