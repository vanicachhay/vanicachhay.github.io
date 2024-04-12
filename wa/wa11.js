document.addEventListener("DOMContentLoaded", function () {
    const fullImg = document.querySelector(".full-img");
    const overlay = document.querySelector(".overlay");
    const toggleButton = document.querySelector(".toggle-mode");
    const thumbnails = document.querySelectorAll(".thumb-bar img");
  
   
    toggleButton.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      document.body.classList.toggle("light-mode");
    });
  
  
    thumbnails.forEach(function (thumbnail) {
      thumbnail.addEventListener("click", function () {
        const imgSrc = thumbnail.getAttribute("src");
        fullImg.innerHTML = `<img class="displayed-img" src="${imgSrc}" alt="Image" />`;
      });
    });
  });
  