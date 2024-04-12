document.addEventListener("DOMContentLoaded", function() {
    const newQuoteBtn = document.querySelector(".new-quote");
    const showAnswerBtn = document.querySelector(".show-answer");
  
    newQuoteBtn.addEventListener("click", getQuote);
    showAnswerBtn.addEventListener("click", showAnswer);
  
    function getQuote() {
      console.log("Button clicked"); // Check if button click works
  
      const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
  
      fetch(endpoint)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch quote");
          }
          return response.json();
        })
        .then(data => {
          displayQuote(data.question, data.answer);
        })
        .catch(error => {
          console.error(error);
          alert("Failed to fetch quote. Please try again later.");
        });
    }
  
    function displayQuote(question, answer) {
      const quoteTextElement = document.getElementById("js-quote-text");
      const answerTextElement = document.getElementById("js-answer-text");
  
      quoteTextElement.textContent = question;
      answerTextElement.textContent = answer; // Answer is initially hidden
      answerTextElement.style.display = "none"; // Hide the answer initially
    }
  
    function showAnswer() {
      const answerTextElement = document.getElementById("js-answer-text");
      answerTextElement.style.display = "block"; // Show the answer when button is clicked
    }
    
    // Initial quote display on page load
    getQuote();
  });
  
  
  
  