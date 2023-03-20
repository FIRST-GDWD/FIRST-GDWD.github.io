let result = document.getElementById("result");

function displayTwoPlusTwo() {
    const number1 = 2;
    const number2 = 2;
    result.innerHTML = number1 + number2;
}

function displayMultiplication() {
    let input1 = document.getElementById("input1");
    let input2 = document.getElementById("input2");
    result.innerHTML = 
        parseInt(input1.value) * parseInt(input2.value);
}



