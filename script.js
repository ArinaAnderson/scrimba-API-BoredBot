'use strict';
// https://www.boredapi.com/

document.getElementById("bored-bot").addEventListener("click", getIdea)

function getIdea() {
    fetch("https://www.boredapi.com/api/activity")
        .then(res => res.json())
        .then(data => {
            document.body.classList.add("fun")
            document.getElementById("idea").textContent = data.activity
            document.getElementById("title").textContent = "🦾 HappyBot🦿"
        })
}
/*
fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById("image-container").innerHTML = `
            <img src="${data.message}" />
        `
    })
    */
const catBox = document.querySelector('#cat-box');
const getCatPic = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
    .then((payload) => payload.json())
    .then((srcData) => {
      catBox.innerHTML = '';
      const imgElem = document.createElement('img');
      catBox.appendChild(imgElem);
      imgElem.setAttribute('src', srcData[0].url);
    })
};

catBox.addEventListener('click', getCatPic);
getCatPic();

// improvement --> introduce MVC
// can load previous loads
// cat image clicker -- udacity

/*
const myImage = new Image(100, 200);
myImage.src = 'picture.jpg';
document.body.appendChild(myImage);
*/

// https://docs.thecatapi.com/
