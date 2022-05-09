document.addEventListener('DOMContentLoaded', init);

let canvas, ctx, output;
let objects, car, boat, airplane, helicopter, motercycle;
let carImg, boatImg, airplaneImg, helicopterImg, motercycleImg;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

function init()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    loadObjectsImages();
    defineObjectss();
    displayWords();

    output = document.getElementById('output');

    speakButton = document.getElementById('speak');
    speakButton.addEventListener('click', toggleSpeak);
}

function loadObjectsImages()
{
    carImg = new Image();
    carImg.src = 'assets/images/car.png';

    boatImg = new Image();
    boatImg.src = 'assets/images/boat.png';

    airplaneImg = new Image();
    airplaneImg.src = 'assets/images/airplane.jpeg';

    helicopterImg = new Image();
    helicopterImg.src = 'assets/images/helicopter.jpeg';

    motercycleImg = new Image();
    motercycleImg.src = 'assets/images/motercycle.jpeg';
}

function defineObjectss()
{
    car = {
        name: 'car',
        x: canvas.width / 2,
        y: (canvas.height / 2) - 100,
        img: carImg
    };
    
    boat = {
        name: 'boat',
        x: canvas.width / 2,
        y: (canvas.height / 2) - 50,
        img: boatImg
    };
    
    airplane = {
        name: 'airplane',
        x: canvas.width / 2,
        y: (canvas.height / 2),
        img: airplaneImg
    };
    
    helicopter = {
        name: 'helicopter',
        x: canvas.width / 2,
        y: (canvas.height / 2) + 50,
        img: helicopterImg
    };
    
    motercycle = {
        name: 'motercycle',
        x: canvas.width / 2,
        y: (canvas.height / 2) + 100,
        img: motercycleImg
    };

    objects = {
        'car': car,
        'boat': boat,
        'airplane': airplane,
        'helicopter': helicopter,
        'motercycle': motercycle
    }
}

function displayWords()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '50px serif';
    ctx.textAlign = 'center';
    ctx.fillText(car.name, car.x, car.y);
    ctx.fillText(boat.name, boat.x, boat.y);
    ctx.fillText(airplane.name, airplane.x, airplane.y);
    ctx.fillText(helicopter.name, helicopter.x, helicopter.y);
    ctx.fillText(motercycle.name, motercycle.x, motercycle.y);
}

function toggleSpeak(e)
{
    text = e.target.textContent;
    if(text === 'Speak')
    {
        e.target.textContent = 'Stop';
        recognition.start();
    }
    else if(text === 'Stop')
    {
        e.target.textContent = 'Speak';
        recognition.abort();
    }
}

recognition.onresult = (e) =>
{
    res = e.results[0][0].transcript.toLowerCase();
    if(res == 'more')
    {
        copyright = 'This is a CISC 3610 voice recognition project';
        output.textContent = copyright;
        textToSpeech(copyright);
    }
    else if(res == 'help')
    {
        help = 'Say a name of the object on the screen. Say more, to hear about the program.';
        output.textContent = help;
        textToSpeech(help);
    }
    else if(objects[res] != undefined)
    {
        Objects = `Displaying ${res} on the screen...`
        displayObjects(objects[res]);
        output.textContent = Objects;
        textToSpeech(Objects);
    }
    else
    {
        nomatch = "Sorry I did not get that, please try it.";
        output.textContent = nomatch;
        textToSpeech(nomatch);
        displayWords();
    }
}

function displayObjects(Objects)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(Objects.name, canvas.width / 2, canvas.height / 2 - 50);
    ctx.drawImage(Objects.img, (canvas.width / 2) - 150, canvas.height / 2, 266, 237);
}

function textToSpeech(text)
{
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

recognition.onspeechend = () => recognition.stop();

recognition.onerror = (e) => console.error(`Error occurred in recognition: ${e.error}`);