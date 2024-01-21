
// Selecting the DOM elements below
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];

//Show new quote
function newQuote() {
//Pick a random quote from apiQuotes array;
    const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length)];
    // Check if Author field is blank and replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine the styling
    if (quote.text.length > 120){
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    // writing the code below to select and generate the dynamic author name and quote on the browser
    //authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
}

// Get quotes from the API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error) {
//catch error here and in production website we pass an 'alert' to that it can be fixed or we can could also create a UI element to display the error that there is some issue with this functionality.
    }
}

// Tweet Quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; //using the template straing as it can take the varbaible and convert it into a string
    window.open(twitterUrl,"_blank");//open the new twitter window on the new tab
}

// Adding event listeners to the DOM elements

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);



//On load
getQuotes();