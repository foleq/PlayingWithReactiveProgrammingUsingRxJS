import { Observable } from "rxjs";

let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function load(url: string) {

    return Observable.create(observer => {

        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });

        xhr.open("GET", url);
        xhr.send();
    });
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

//this code doesn't request server for movies.json until someone will subscribe to it
load("movies.json");

// with map we'll get stream of 'streams' instead of flatMap give us stream of movies
click.flatMap(e => load("movies.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );