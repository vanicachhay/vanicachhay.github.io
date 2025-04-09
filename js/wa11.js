const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Declaring the alternative text for each image file */
const altText = {
  'pic1.jpg': 'Closeup of a blue human eye',
  'pic2.jpg': 'Rock that looks like a wave',
  'pic3.jpg': 'Purple and white pansies',
  'pic4.jpg': 'Section of wall from a pharaoh’s tomb',
  'pic5.jpg': 'Large moth on a leaf'
};

/* Looping through images */
imageFilenames.forEach(filename => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `/img/${filename}`);
  newImage.setAttribute('alt', altText[filename]);
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', `/img/${filename}`);
    displayedImage.setAttribute('alt', altText[filename]);
  });
});

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
  const currentClass = btn.getAttribute('class');

  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
  }
});
