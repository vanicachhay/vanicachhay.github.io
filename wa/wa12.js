document.getElementById("getLyricsBtn").addEventListener("click", function() {
    var accessToken = 'j0bsh3-EqsDsiUIPEy6b6UN3qp0d-wWcJxUVUX6Ysppw2_bJrxnDRiuT9qvBEMAT';

    // Replace 'YOUR_SONG_TITLE' with the title of the song you want to search for
    var songTitle = 'SHOULD I BE OK?';

    // Construct the URL for the Genius API search endpoint
    var apiUrl = 'https://api.genius.com/search?q=' + encodeURIComponent(songTitle);
    
    // Make a GET request to the Genius API
    fetch(apiUrl, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => response.json())
    .then(data => {
        // Check if search results are found
        if (data.response.hits.length > 0) {
            // Extract the URL of the first search result
            var songUrl = data.response.hits[0].result.url;
            
            // Fetch the lyrics page of the song from Genius website
            return fetch(songUrl);
        } else {
            // If no search results found, display an error message
            throw new Error('No lyrics found for the song: ' + songTitle);
        }
    })
    .then(response => response.text())
    .then(html => {
        // Parse the HTML response to extract the lyrics
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var lyrics = doc.querySelector('.lyrics').innerText;

        // Display the lyrics in the container
        document.getElementById("lyricsContainer").innerText = lyrics;
    })
    .catch(error => {
        // Display any errors that occur during the process
        console.error('Error:', error.message);
        document.getElementById("lyricsContainer").innerText = 'Error: ' + error.message;
    });
});
