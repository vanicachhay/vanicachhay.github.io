const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');
let insertX = ["the void","their mom","Kora the dog"];
let insertY = ["car","mother","million dollar pool"];
let insertZ = ["cry","curse at their mother","kick trump in his \*redacted\*"];
let storyText = " 94 fahrenheit !! \"It's so hot out man! \" Bob said to :insertx:. Bob then began pacing around their :inserty:, \'I should probably do something about it.\' Bob thought to themselves then  BOOM they started to :insertz:. :insertx: who suddenly gained 300 pounds , saw everything and made sure to console them about Bob's minor inconvience of the heat and then began to :insertz: and be sad about their sudden weight gain.";

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];

}



randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);
    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replaceAll(':inserty:', yItem);
    newStory = newStory.replaceAll(':insertz:', zItem);


  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob',name);


  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300/14)+' stones';
    const temperature =  Math.round((94-32)*5/9) +' centigrades';
    newStory = newStory.replaceAll("94 fahrenheit",temperature);
    newStory = newStory.replaceAll("300 pounds", weight);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}


