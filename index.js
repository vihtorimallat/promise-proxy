let OldPromise = Promise
Promise = class MyPromise extends OldPromise {
    constructor(...opts) {
        const promise = super(...opts);
        return proxify(promise);
    }
}

function proxify(promise) {
    return new Proxy(promise, {
        get: function(target, key, receiver) {
            if (key in target) {
                const tk = target[key];
                return (typeof tk === 'function') ? tk.bind(target) : tk;
            } else {
                const proxy_inner_func = (...opts) => proxify(target.then(result => result[key](...opts)));
                const proxy_inner_prop =              proxify(target.then(result => result[key]));

                return new Proxy(proxy_inner_func, {
                    get(target_inner, key_inner) {
                        return proxy_inner_prop[key_inner]
                    }
                })
            }
        }
    })
}
