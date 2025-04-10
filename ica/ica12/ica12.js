
const newQuoteButton = document.querySelector('#js-new-quote');
newQuoteButton.addEventListener('click', getQuote);
const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';


function getQuote() {

  fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); 
      displayQuote(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('Something went wrong.');
    });
}


function displayQuote(data) {
  const quoteText = document.getElementById('js-quote-text');
  quoteText.textContent = data.question;

}


  fetch(endpoint)
    .then(response => response.json());


getQuote();