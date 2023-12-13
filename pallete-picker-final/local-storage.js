import defaults from './palettes.json'

export const setLocalStorage = (key,value) => {
    try {
        localStorage.setItem(key,JSON.stringify(value));
    } catch (e) {
        console.log(`ERROR: ${e}`)
        return null;
    };
};

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const setPalletes = (newPalletes) => {
    setLocalStorage('palletes',newPalletes)
}

export const initPalletes = () => {
    setLocalStorage('palletes',[...defaults]);
}

export const getPalletes = () => {
    return getLocalStorage('palletes');
}

export const addPallete = (pallete) => {
    const gotPalletes = getPalletes();
    gotPalletes.push(pallete);
    setPalletes(gotPalletes);
}

export const removePallete = (uuid) => {
    setPalletes([...getPalletes()].filter((pallete) => pallete.uuid !== uuid));
}