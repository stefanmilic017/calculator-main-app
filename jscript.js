function changeTheme(checkbox) {
    var checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    })
    var blue = document.querySelector('#blue');
    var white = document.querySelector('#white');
    var purple = document.querySelector('#purple');

    var html = document.querySelector('html');
    var body = document.querySelector('body');
    var themePicker = document.querySelector('.themePicker');
    var screenColor = document.querySelector('#resultScreen');
    var screenColorSmallText = document.querySelector('.previous-number');
    var screenColorBigText = document.querySelector('.current-number');
    var topTextColor = document.querySelector('#top');
    var calcKeys = document.querySelector('#keys');
    var allKeys = document.querySelectorAll('.grid-item');
    var deleteKey = document.querySelector('.itemDel');
    var resetKey = document.querySelector('.itemReset');
    var equalKey = document.querySelector('.itemEquals');
    var attribution = document.querySelector('.attribution');

    //Blue theme
    if(blue.checked === true){
      html.style.backgroundColor = 'hsl(222, 26%, 31%)';
      body.style.backgroundColor = 'hsl(222, 26%, 31%)';
      themePicker.style.backgroundColor = 'hsl(223, 31%, 20%)';
      screenColor.style.backgroundColor = 'hsl(223, 31%, 20%)';
      screenColor.style.color = '#fff';
      screenColorSmallText.style.color = '#fff';
      screenColorBigText.style.color = '#fff';
      topTextColor.style.color = '#fff';
      calcKeys.style.backgroundColor = 'hsl(223, 31%, 20%)';

      for(var i=0;i<allKeys.length;i++){
        allKeys[i].classList.remove('grid-item-white');
        allKeys[i].classList.remove('grid-item-purple');
      }

      deleteKey.classList.remove('grid-item-green');
      resetKey.classList.remove('grid-item-green');
      equalKey.classList.remove('grid-item-orange');

      deleteKey.classList.remove('grid-item-del-res-three');
      resetKey.classList.remove('grid-item-del-res-three');
      equalKey.classList.remove('grid-item-equal-three');

      attribution.firstElementChild.style.color = '#fff';

      //input radio:not checked invisible
      blue.style.opacity = '1';
      white.style.opacity = '0';
      purple.style.opacity = '0';
    }

    // White theme
    if(white.checked === true){
      html.style.backgroundColor = 'hsl(0, 0%, 90%)';
      body.style.backgroundColor = 'hsl(0, 0%, 90%)';
      themePicker.style.backgroundColor = 'hsl(0, 5%, 81%)';
      screenColor.style.backgroundColor = 'hsl(0, 0%, 93%)';
      screenColorSmallText.style.color = '#000';
      screenColorBigText.style.color = '#000';
      topTextColor.style.color = '#000';
      calcKeys.style.backgroundColor = 'hsl(0, 5%, 81%)';

      for(var i=0;i<allKeys.length;i++){
        allKeys[i].classList.remove('grid-item-purple');
        allKeys[i].classList.add('grid-item-white');
      }

      deleteKey.classList.add('grid-item-green');
      resetKey.classList.add('grid-item-green');
      equalKey.classList.add('grid-item-orange');

      deleteKey.classList.remove('grid-item-del-res-three');
      resetKey.classList.remove('grid-item-del-res-three');
      equalKey.classList.remove('grid-item-equal-three');

      attribution.firstElementChild.style.color = '#000';


      //input radio:not checked invisible
      blue.style.opacity = '0';
      white.style.opacity = '1';
      purple.style.opacity = '0';

    }

    // purple theme
    if(purple.checked === true){
      html.style.backgroundColor = 'hsl(268, 75%, 9%)';
      body.style.backgroundColor = 'hsl(268, 75%, 9%)';
      themePicker.style.backgroundColor = 'hsl(268, 71%, 12%)';
      screenColor.style.backgroundColor = 'hsl(268, 71%, 12%)';
      screenColorSmallText.style.color = 'hsl(52, 100%, 62%)';
      screenColorBigText.style.color = 'hsl(52, 100%, 62%)';
      topTextColor.style.color = 'hsl(52, 100%, 62%)';
      calcKeys.style.backgroundColor = 'hsl(268, 71%, 12%)';

      for(var i=0;i<allKeys.length;i++){
        allKeys[i].classList.add('grid-item-purple');
      }

      deleteKey.classList.remove('grid-item-green');
      resetKey.classList.remove('grid-item-green');
      equalKey.classList.remove('grid-item-orange');

      deleteKey.classList.add('grid-item-del-res-three');
      resetKey.classList.add('grid-item-del-res-three');
      equalKey.classList.add('grid-item-equal-three');

      attribution.firstElementChild.style.color = 'hsl(52, 100%, 62%)';

      //input radio:not checked invisible
      blue.style.opacity = '0';
      white.style.opacity = '0';
      purple.style.opacity = '1';
    }

    
}


class Calculator {
  constructor(resultElement){
    this.previousOperandTextELement = previousOperandTextELement;
    this.currentOperandTextELement = currentOperandTextELement;
    this.clear();
  }

  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }

  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation){
    if(this.currentOperand === '') return;
    if(this.previousOperand !== ''){
      this.compute();
    }
      
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch(this.operation){
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case 'x':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if(isNaN(integerDigits)){
      integerDisplay = '';
    }else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits:0})
    }
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    }else{
      return integerDisplay;
    }
  }

  updateDisplay(){
    this.currentOperandTextELement.innerText = this.getDisplayNumber(this.currentOperand);
    if(this.operation != null){
      this.previousOperandTextELement.innerText = 
      `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }else{
      this.previousOperandTextELement.innerText = '';
    }

    var screenBigText = document.querySelector('.current-number');
    
    if(screenBigText.innerText.length >= 7 ){
      screenBigText.style.fontSize = "4rem";
    }
    if(screenBigText.innerText.length > 15){
      screenBigText.style.fontSize = "3rem"
    }
    if(screenBigText.innerText.length > 21){
      screenBigText.innerText = "Too many numbers";
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const resetButton = document.querySelector('[data-reset]');
const previousOperandTextELement = document.querySelector('[data-previous-operand]');
const currentOperandTextELement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextELement, currentOperandTextELement)

numberButtons.forEach(button =>{
  button.addEventListener('click',() => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button =>{
  button.addEventListener('click',() => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button =>{
  calculator.compute();
  calculator.updateDisplay();
})

resetButton.addEventListener('click', button =>{
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button =>{
  calculator.delete();
  calculator.updateDisplay();
})

