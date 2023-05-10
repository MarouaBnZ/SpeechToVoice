const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing Jokes to VoiceRSS API 

function tellMe(joke){
    const jokeString = joke.trim().replace(/ /g,'%20')
    VoiceRSS.speech({
        key: '05c1324ee2bd4abe9ab5571bf1358c2b',
        src: jokeString,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}
async function getJokes(){
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
    try {
       const response = await fetch(apiUrl);
       const data = await response.json();
       if(data.setup){
        joke = `${data.setup} ...${data.delivery}`;
       }
       else {
        joke = data.joke;
       }
       tellMe(joke);
    // Disable button
    toggleButton();

    } catch (error) {
        console.log("oops its does not work" ,error);
    }
}

getJokes();
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);






