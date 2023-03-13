// Get all the Variables

// All Inputs
const allInputs = document.querySelectorAll('input')

// Buttons 
const confirmBtn = document.getElementById('confirm-btn');

// CardHolder Name
const displayCardName = document.querySelector('.name')
const inputName = document.querySelector('.name-input')
const nameError = document.querySelector('.err1')

// Card Number
const displayNumber = document.querySelector('.card-numbers');
const inputNumber = document.querySelector('.number-input');
const numberError = document.querySelector('.err2')


// Expiration Date
const displayDate = document.querySelector('.expiration-date')
const inputMonth = document.querySelector('.input-month')
const inputYear = document.querySelector('.input-year')
const dateError = document.querySelector('.err3')

// CVC 
const inputCvc = document.querySelector('.input-cvc')
const cvcError = document.querySelector('.err4')
const displayCvc = document.getElementById('display-cvc')

// Error Message 
const blank = "Can't leave blank!"
const invalidFormat = 'Wrong Format!'

// Thank You Page Variables
const thankYouPage = document.querySelector('.thank-you-page')
const continueBtn = document.getElementById('continue-btn')

// Card Content Form Section
const cardContent = document.querySelector('.card-content-form')

const regexCC = /^\d+$/;
const nameRegex = `^[a-zA-Z]+$`;

// Variable to check if form passed or not
let validateForm = false


//  Funciton to check Name
function checkName(input, errorName) {
    let passedName = false

    if (input.value === '') {
        input.classList.add('blank-input')
        errorName.innerText = blank
        passedName = false
    } else {
        errorName.innerText = '';
        input.classList.remove('blank-input')
        passedName = true
    }

    displayCardName.innerText = input.value

    if(passedName === true){
        console.log('Name Function has passed!');
        validateForm = true
    } else{
        validateForm = false
    }

}
inputName.addEventListener('input', () => checkName(inputName, nameError))

//  Funciton to check CC Number
function checkCC(input, errorNum) {
    let passedCC = false

    const maxLength = 16;

    if (input.value === '') {
        errorNum.innerText = blank
        input.classList.add('blank-input')
        passedCC = false
    } else if (!regexCC.test(input.value)) {
        errorNum.innerText = invalidFormat
        input.classList.add('blank-input')
        passedCC = false
    } else {
        errorNum.innerText = '';
        input.classList.remove('blank-input')
        passedCC = true;
    }

    // Update the DOM
    // Slice the number off when it reaches 16
    input.value = input.value.slice(0, maxLength)
    displayNumber.innerText = input.value
    
    // Every Four Digits Add a Space to the DOM
    // displayNumber.innerText = displayNumber.innerText.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (input.value !== '') {
        const formattedNumber = input.value.match(/.{1,4}/g).join(' ');
        displayNumber.innerText = formattedNumber;
      }

    // ValidateForm
    if(passedCC === true){
        console.log('Name Function has passed!');
        validateForm = true
    } else{
        validateForm = false
    }


}
// Input Event Listener for CC Number
inputNumber.addEventListener('input', () => checkCC(inputNumber, numberError))



//  Funciton to check Date
function checkDate(inputM, inputY, errD) {
    let passedDate = false;

    if (inputM.value === '' || inputY.value === '') {
        console.log('empty value');
        errD.innerText = blank
        inputM.classList.add('blank-input')
        inputY.classList.add('blank-input')
        passedDate = false
    } else {
        errD.innerText = '';
        inputM.classList.remove('blank-input')
        inputY.classList.remove('blank-input')
        passedDate = true
    }
    // Update the Date DOM
    displayDate.innerText = `${inputM.value} / ${inputY.value}`

    if(passedDate === true){
        validateForm = true
    } else {
        validateForm = false
    }


}
inputMonth.addEventListener('input', () => checkDate(inputMonth, inputYear, dateError))
inputYear.addEventListener('input', () => checkDate(inputMonth, inputYear, dateError))

//  Funciton to check CVC
function checkCvc(input, errorDiv) {
    let passedCvc = false

    const maxCvc = 3;

    if (input.value === '') {
        errorDiv.innerText = blank
        input.classList.add('blank-input')
        passedCvc = false
    } else {
        errorDiv.innerText = '';
        input.classList.remove('blank-input')
        passedCvc = true
    }

    // Update the DOM
    displayCvc.innerText = input.value

    input.value = input.value.slice(0, maxCvc)
    displayCvc.innerText = input.value

    if(passedCvc === true){
        validateForm = true
    } else {
        validateForm = false
    }
}
inputCvc.addEventListener('input', () => checkCvc(inputCvc, cvcError))

// Event Listener if Input is Acitve
inputName.addEventListener('focus', function() {
    inputName.classList.add('active-input')
})
inputName.addEventListener('blur', function() {
    inputName.classList.remove('active-input')
})
inputNumber.addEventListener('focus', function() {
    inputNumber.classList.add('active-input')
})
inputNumber.addEventListener('blur', function() {
    inputNumber.classList.remove('active-input')
})
inputMonth.addEventListener('focus', function() {
    inputMonth.classList.add('active-input')
})
inputMonth.addEventListener('blur', function() {
    inputMonth.classList.remove('active-input')
})
inputYear.addEventListener('focus', function() {
    inputYear.classList.add('active-input')
})
inputYear.addEventListener('blur', function() {
    inputYear.classList.remove('active-input')
})
inputCvc.addEventListener('focus', function() {
    inputCvc.classList.add('active-input')
})
inputCvc.addEventListener('blur', function() {
    inputCvc.classList.remove('active-input')
})


// Show Thank You Message if Passed
// Button Event Listener
confirmBtn.addEventListener('click', function (e) {
    e.preventDefault()

    checkName(inputName, nameError)
    checkCC(inputNumber, numberError)
    checkDate(inputMonth, inputYear, dateError)
    checkCvc(inputCvc, cvcError)

    if(validateForm === false){
        e.preventDefault()
    } else {
        console.log('show thank you page');
        thankYouPage.classList.add('show-me')
        cardContent.classList.add('none')
    }
})

// Countine BTN
continueBtn.addEventListener('click', function(e){

    validateForm = false
    thankYouPage.classList.remove('show-me')
    cardContent.classList.remove('none')
    window.location.reload()
})