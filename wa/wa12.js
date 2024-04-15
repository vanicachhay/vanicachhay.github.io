document.getElementById("getLyricsBtn").addEventListener("click", function() {
    console.log("Button clicked");
    
    var accessToken = 'j0bsh3-EqsDsiUIPEy6b6UN3qp0d-wWcJxUVUX6Ysppw2_bJrxnDRiuT9qvBEMAT';

    //where you put in a song name 
    var songTitle = 'YOUR_SONG_TITLE';
    console.log("Searching for song:", songTitle);

    
    var apiUrl = 'https://api.genius.com/search?q=' + encodeURIComponent(songTitle);
    console.log("API URL:", apiUrl);

    
    fetch(apiUrl, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => {
        console.log("Response:", response);
        return response.json();
    })
    .then(data => {
        console.log("Data:", data);
        //check if search results are found
        if (data.response.hits.length > 0) {
            
            var songUrl = data.response.hits[0].result.url;
            console.log("Song URL:", songUrl);

            
            return fetch(songUrl);
        } else {
            // if no search results found, display an error message
            throw new Error('No lyrics found for the song: ' + songTitle);
        }
    })
    .then(response => response.text())
    .then(html => {
        console.log("HTML:", html);
        
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var lyrics = doc.querySelector('.lyrics').innerText;

        
        document.getElementById("lyricsContainer").innerText = lyrics;
    })
    .catch(error => {
        // display any errors that occur during the process
        console.error('Error:', error.message);
        document.getElementById("lyricsContainer").innerText = 'Error: ' + error.message;
    });
});
