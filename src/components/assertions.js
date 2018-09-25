function assertAPI(json) {
    let prefix = "[API error]: "
    if (!('canvas' in json)) {
        const err = prefix + "Canvas undefined!";
        throw err;
    }
    if (!('globals' in json.canvas)) {
        const err = prefix + "Global canvas parameters undefined!";
        throw err;
    }

    const globals = json.canvas.globals;
    prefix = "[API error -> globals]: ";
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
    for (let param in params) {
        if (!(param in globals)) {
            const err = prefix + "The <" + param + "> is undefined!";
            throw err;
        }
    }
}

export default assertAPI;
