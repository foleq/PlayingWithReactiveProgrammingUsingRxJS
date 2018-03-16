import { Observable } from "rxjs";

let numbers = [1, 5, 10];
let source = Observable.create(observer => {

    for(let n of numbers){

        if(n === 5) {
            //it will raise like an exception and run error method from Observer
            observer.error("Something went wrong!");
        }

        // it runs method from Observer ---> value => console.log(`value: ${value}`),
        observer.next(n);
    }

    observer.complete();
})

source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);