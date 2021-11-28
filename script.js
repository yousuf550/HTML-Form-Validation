// Retrieving HTML document elements from DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Function to update class and message for errors
function showError(input, message) {
    //Get the parent element for the input field (.form-control)
    const formControl = input.parentElement;
    //Replace the class - add error
    formControl.className = "form-control error";
    //Get the small element for the error message
    const small = formControl.querySelector('small');
    //Replace the text for small element using the input message
    small.innerText = message;
}

//Function to update class for success
function showSuccess(input) {
    //Get the parent element for the input field (.form-control)
    const formControl = input.parentElement;
    //Replace the class - add success
    formControl.className = "form-control success";
}

//Function to check if email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `Please provide a valid email`)
    }
}

//Function to check lenght of input field
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldID(input)} needs to be atleast ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldID(input)} needs to be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

//Function to check if password & confirm password match

function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Passord don't match")
    }
}

//Function to check if required fields have data

function checkRequired(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value === "") {
            showError(input, `${getFieldID(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

//Function to get the id of the input field with proper case
function getFieldID(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listner
// Create event listner for submit button
form.addEventListener('submit', function (e) {
    //stop page from reloading on submit
    e.preventDefault()

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 10);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPasswordMatch(password, password2)

})