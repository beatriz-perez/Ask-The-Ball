'use strict';

// INFO: Título de la página y formulario ------------------------------------------------------

const title = {
    es: 'pregunta a la bola',
    en: 'ask the ball'
}
const formText = {
    intputText: {es: '¿qué te gustaría saber?', en: 'what would you like to know?'},
    buttonText: {es: 'ver', en: 'ask'},
    alertShort: {es: '* Uy! Tu pregunta es demasiado corta', en: '* Oops! Your question is too short'},
    alertLong: {es: '* WOW! Tu pregunta es demasiado larga,<br>resúmela un poco por favor', 
                en: '* WOW! Your question is too long,<br>make it a litle shorter please'},
    resetText: {es: 'hacer otra pregunta', en: 'make a new question'}
}

// INFO: Posibles respuestas --------------------------------------------------------------------

const answer = [
    {
        es: 'sin ninguna duda' ,
        en: 'no doubt about it'
    },
    {
        es: '¡claro que SÍ!' ,
        en: 'absolutely YES!'
    },
    {
        es: 'puedes contar con ello' ,
        en: 'you can count on it'
    },
    {
        es: 'parece que sí' ,
        en: 'looks like yes'
    },
    {
        es: 'no está muy claro' ,
        en: 'it\'s unclear'
    },
    {
        es: 'no apuestes por ello' ,
        en: 'don\'t bet on it'
    },
    {
        es: 'los augurios no son buenos' ,
        en: 'chances aren\'t good'
    },
    {
        es: 'las estrellas dicen que NO' ,
        en: 'the stars say NO'
    },

]

// Botones y controles --------------------------------------------------------------------------

const esButton = document.querySelector('.button--es');
const enButton = document.querySelector('.button--en');

const titleBox = document.querySelector('.title');

const askForm = document.querySelector('.formBox');
const askInput = document.querySelector('.questionImput');
const askButton = document.querySelector('.button--ask');

const alert = document.querySelector('.alert');
const resetButton = document.querySelector('.button--reset');

// Elementos de resultado -----------------------------------------------------------------------

const questionText = document.querySelector('.question');

const answerBall = document.querySelector('.ball');
const answerBox = document.querySelector('.answerBox');
const answerText = document.querySelector('.answer');


// FUNCIONES *************************************************************************************

// Cambio de idioma ------------------------------------------------------------------------------

function changeLang (evt){ // modificamos el idioma en función del botón pulsado
    let x = evt.currentTarget.id;
    console.log(x)
    esButton.classList.toggle('activeLang');
    enButton.classList.toggle('activeLang');
    titleBox.innerHTML = title[x];
    askInput.placeholder = formText.intputText[x];
    askButton.innerHTML = formText.buttonText[x];
    resetButton.innerHTML = formText.resetText[x];
    if (x === 'es' && window.innerWidth < 700){
        titleBox.style.width = "200px";
        console.log(x, 'estoy en castellano');
        console.log(window.innerWidth);    
    } else {
        titleBox.style.width = "100%";
        console.log(x)
        console.log(window.innerWidth);    
    }
}

esButton.addEventListener('click', changeLang);
enButton.addEventListener('click', changeLang);

// Preguntas a la bola ----------------------------------------------------------------------------

let answerNumber;

function makeAQuestion (event) { // evitamos el reseteo y pasamos a comprobar el formulario
    event.preventDefault();
    questionText.innerHTML = askInput.value;
    checkForm();
};

function checkForm () {  // en función del formulario, configuramos alert y damos paso o no a responder
    if (askInput.value.length > 60 ) {
        if (esButton.classList.contains('activeLang')) {
            alert.innerHTML = formText.alertLong.es;
        } else {
            alert.innerHTML = formText.alertLong.en;
        }

    } else if (askInput.value.length > 7 && esButton.classList.contains('activeLang')) {
        alert.innerHTML = '';
        getAnAnswer('es');
    } else if (askInput.value.length > 7 && enButton.classList.contains('activeLang')) {
        alert.innerHTML = '';
        getAnAnswer('en');

    } else {
        if (esButton.classList.contains('activeLang')) {
            alert.innerHTML = formText.alertShort.es;
        } else {
            alert.innerHTML = formText.alertShort.en;
        }
    }
};

function getAnAnswer (x) { // damos una respuesta y pasamos a mostrarla en la bola y retirar el formulario
    answerNumber = Math.floor((Math.random() * 8));
    answerText.innerHTML = answer[answerNumber][x];
    resetButton.innerHTML = formText.resetText[x];
    lookAtTheBall();
    changeForm();
}

function lookAtTheBall () { // mostramos la pregunta, ampliamos la bola y hacemos visible la respuesta
    questionText.classList.toggle('seen');
    answerBall.classList.toggle('givingAnswers');
    document.querySelector('.ball8').classList.toggle('gone');
    answerBox.classList.toggle('transparent');
    answerText.classList.toggle('transparent');
};


function changeForm () {
    askInput.classList.toggle('hidden');
    askButton.classList.toggle('hidden');
    resetButton.classList.toggle('hidden');
}


askButton.addEventListener('click', makeAQuestion);

// Volver a preguntar ----------------------------------------------------------------------------

function resetBall (event) {
    event.preventDefault();
    askForm.reset();
    changeForm();
    lookAtTheBall();
};

resetButton.addEventListener('click', resetBall);
