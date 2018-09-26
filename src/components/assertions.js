function assertAPI(json) {
    let prefix = "[api error]: "
    if (!('canvas' in json)) {
        const err = prefix + "Canvas undefined!";
        throw err;
    }
    if (!('globals' in json.canvas)) {
        const err = prefix + "Global canvas parameters undefined!";
        throw err;
    }
    const cells  = json.canvas.cells;
    const cellsp = ['pos', 'background'];
    const hexs   = json.canvas.hexs;
    const hexsp  = ['pos', 'background', 'stroke', 'color', 'title', 'icon', 'link'];
    const conns  = json.canvas.conns;
    const connsp = ['pos', 'direction', 'color', 'arrow'];
    const walls  = json.canvas.walls;
    const wallsp = ['pos', 'side', 'color'];
    assertGlobals(json.canvas.globals);
    assertElement(cells, cellsp);
    assertElement(hexs,  hexsp);
    assertElement(conns, connsp);
    assertElement(walls, wallsp);
}

function assertGlobals(globals) {
    const prefix = "[API error -> globals]: ";
    if (!('Nx' in globals)) {
        const err = prefix + "Nx undefined!";
        throw err;
    } else {
        const Nx = parseInt(globals.Nx, 10);
        if (isNaN(Nx)) {
            const err = prefix + "Nx is NaN!";
            throw err;
        }
    }
    if (!('Ny' in globals)) {
        const err = prefix + "Ny undefined!";
        throw err;
    } else {
        const Ny = parseInt(globals.Ny, 10);
        if (isNaN(Ny)) {
            const err = prefix + "Ny is NaN!";
            throw err;
        }
    }
    const params = ['grid', 'showGrid', 'background', 'gridColor'];
    for (let p in params) {
        if (!(params[p] in globals)) {
            const err = prefix + "The <" + params[p] + "> is undefined!";
            throw err;
        }
    }
}

function assertElement(elements, parameters) {
    const prefix = "[API error -> " + elements + "]: ";
    if (!(Array.isArray(elements))) {
        const err = prefix + "Not an array!";
        throw err;
    }
    for (let el in elements) {
    const params = parameters;
        for (let p in params) {
            if (!(params[p] in elements[el])) {
                const err = prefix + "The <" +  params[p] + "> is undefined!";
                throw err;
            }
        }
    }
    for (let el in elements) {
        if (!(Array.isArray(elements))) {
            const err = prefix + "The <pos> parameter is not an array!";
            throw err;
        } else if (elements[el].pos.length !== 2) {
            const err = prefix + "The <pos> parameter does not have 2 values!";
            throw err;
        } else {
            try {
                const x = parseInt(elements[el].pos[0], 10);
                const y = parseInt(elements[el].pos[1], 10);
                if (isNaN(x) || isNaN(y)) {
                    const err = prefix + "The <pos> cannot be converted to numbers!";
                    throw err;
                }
            } catch(err) {
                throw prefix + "The <pos> cannot be converted to numbers!";
            }
        }
    }
}

export default assertAPI;

