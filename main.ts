import { Observable } from "rxjs";
import { load, loadWithFetch } from "./loader"

let source = Observable.create(observer => {
    observer.next(1);
    observer.next(2);
    observer.error("Stop!");
    //throw new Error("Stop!");
    observer.next(3);
    observer.complete();
});

source.subscribe(
    value => console.log(`value: ${value}`),
    error => console.log(`error: ${error}`),
    () => console.log("complete")
)


/*
let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

// with map we'll get stream of 'streams' instead of flatMap give us stream of movies
click.flatMap(e => loadWithFetch("movies.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );
*/