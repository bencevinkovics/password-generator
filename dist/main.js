
const lowerCheckbox = document.getElementById('low');
const upperCheckbox = document.getElementById('upp');
const numberCheckbox = document.getElementById('num');
const symbolCheckbox = document.getElementById('sym');
const lengthTextbox = document.getElementById('len');
const finishButton = document.getElementById('finishBtn');
const copyButton = document.getElementById('copyBtn');
const passwordText = document.getElementById('pswd');

const randomSomething = {
    lower: getRandomLowerLetter,
    upper: getRandomUpperLetter,
    number: getRandomNumber,
    symbol: getRandomSymbol 
}

finishButton.addEventListener('click', () => {
    const lower = lowerCheckbox.checked;
    const upper = upperCheckbox.checked;
    const number = numberCheckbox.checked;
    const symbol = symbolCheckbox.checked;
    const length = +lengthTextbox.value;

    if(length > 100) {
        alert("Sorry, you can't make such a long password.");
        return;
    }

    passwordText.value = generatePswd(lower, upper, number, symbol, length); 
})

function generatePswd(lower, upper, number, symbol, length) {

let generatedPswd = ''

const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(
    item => Object.values(item)[0]
);

//const functionsArray = [getRandomLowerLetter(), getRandomUpperLetter(), getRandomNumber(), getRandomSymbol()]

if(typesArray.length === 0) {
    return '';
}
    
for(let i = 0; i <= length; i += typesArray.length) {
    /*const randomFunction = Math.floor(Math.random() * typesArray.length);
    //console.log(nextElement); 
    generatedPswd += randomSomething[Object.keys(typesArray[randomFunction])[0]];

    typesArray.forEach(type => {
        const functionName = Object.keys(type)[0];
        console.log(functionName);
        generatedPswd += randomFunction[functionName];
    });*/

    for (let i = typesArray.length - 1; i > 0; i--) {
        const otherNumber = Math.floor(Math.random() * i);
    
        const temp = typesArray[i];
        typesArray[i] = typesArray[otherNumber];
        typesArray[otherNumber] = temp;
      }

    typesArray.forEach(type => {
        const functionName = Object.keys(type)[0]

        generatedPswd += randomSomething[functionName]();
    })
    
}

const finalPswd = generatedPswd.slice(0, length);
return finalPswd;
}

copyButton.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const pswd = passwordText.value;

    if(!pswd) {
        return;
    }

    textarea.value = pswd;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied successfully!');
})


/*function randomFunction(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}*/

function getRandomLowerLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpperLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function getRandomSymbol() {
    const symbols = '+!%/=()[]{}@&#><ß$×÷^ˇ~§-_?';
    return symbols[Math.floor(Math.random() * symbols.length)];
}