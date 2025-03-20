
let btn1 = document.querySelector('.btn1');
let btn2 = document.querySelector('.btn2');
let button = document.querySelector('button');
let explode = document.createElement('img');
explode.src = '/ica/ica10/explode.gif';

btn1.addEventListener('click', red);

function red() {
    document.body.appendChild(explode);
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = 'red';
    alert("you chose wrong.");

}

btn2.addEventListener('click', blue);

function blue() {
    if (explode) {
        explode.remove();
    }
    document.body.style.backgroundImage = "url(https://images.photowall.com/products/67615/sparkling-rainbow-ii.jpg?h=699&q=85)"
    let userInput = prompt("hooray you did it! now what's your social security?");
    let p = document.createElement('p');
    p.textContent = "that isn't what I asked for.";
    document.body.appendChild(p);
    
}


