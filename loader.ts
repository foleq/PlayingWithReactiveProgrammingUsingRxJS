import { Observable } from "rxjs";

export function load(url: string) {

    return Observable.create(observer => {

        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }

        });

        xhr.open("GET", url);
        xhr.send();
    }).retryWhen(retryStrategy({ attempts: 3, delay: 1500 }));
}

//Google check -> web hypertext application technology fetch // not all browsers supports fetch
export function loadWithFetch(url: string) {
    //to get lazy loading(do request only if someone subscribe) we need to use defer
    return Observable.defer(() => {
        return Observable.fromPromise(
            fetch(url).then(response => {
                if(response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            }))
    }).retryWhen(retryStrategy());
}

function retryStrategy({ attempts = 4, delay = 1000 } = {}) {
    return function(errors) {
        return errors
            .scan((acc, value) => {
                acc += 1;
                if(acc < attempts) {
                    return acc;
                } else {
                    throw new Error(value);
                }
            }, 0)
            .delay(delay);
    }
}