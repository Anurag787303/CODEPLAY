// get item from local storage
export const getItem = (key) => {
    return localStorage.getItem(key);
}

// set item to local storage
export const setItem = (key, value) => {
    localStorage.setItem(key, value);
}

// remove item from local storage
export const removeItem = (key) => {
    localStorage.removeItem(key);
}

// authenticate user
export const isAuthenticated = () => {
    return getItem('user') !== null;
}

// get user from local storage
export const getUser = () => {
    return JSON.parse(getItem('user'));
}

