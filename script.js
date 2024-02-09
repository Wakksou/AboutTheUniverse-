

fetch("https://swapi.dev/api/people")
.then((results) => {
    return results.json();
    })
    .then((data) => {
        vivants = data.count;
        document.getElementById("p1").innerHTML = data.count;
});

fetch("https://swapi.dev/api/planets")
.then((results) => {
    return results.json();
    })
    .then((data) => {
        document.getElementById("p3").innerHTML = data.count;
});

fetch("https://swapi.dev/api/vehicles/")
.then((results) => {
    return results.json();
    })
    .then((data) => {
        document.getElementById("p2").innerHTML = data.count;
});



