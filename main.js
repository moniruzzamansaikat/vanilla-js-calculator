const buttons = document.querySelectorAll('button'),
  resultContainer = document.getElementById('result-text'),
  smallResult = document.getElementById('small-result'),
  clearBackButton = document.getElementById('clear-button')
  

let str = '', arr = [],fullStr = ''

buttons.forEach(button => {
  button.addEventListener('click', e => {
    let buttonValue = e.target.innerHTML 

    // if button is for factorial
    if(buttonValue == '!') {
      // todo: factorial
      resultContainer.innerHTML = factorial(parseInt(str))
      return false
    }

    // create expotential calculation
    if(buttonValue == 'x<sup>2</sup>')  {
      let tmpNum = parseInt(str)
      resultContainer.innerHTML = tmpNum ** 2
      return false
    }

    if(buttonValue == 'x') buttonValue = '*' // if char is cross make to times sign
    if(buttonValue == '÷') buttonValue = '/'

    // if button is not equal button then add to str 
    if(buttonValue != '=') {
      let opts = ['*', '-', '/', '+']
      if(opts.indexOf(str[str.length - 1]) >= 0) { // if button value is any of the operators
        const lstInStr = str[str.length - 1]
        if(opts.indexOf(buttonValue) < 0) {
          str += buttonValue
        } else { 
          const arr = str.split('') 
          arr[arr.length - 1] = buttonValue
          str = arr.join('')
          // str[str.length - 1] = buttonValue
        }
      } else {
        str += buttonValue
      }
    } 

    // if clear back button is clicked , remove the last char from string
    if(buttonValue == 'C') {
      if(str)
        str = str.split('').splice(0, str.length - 2).join('')
    }
  
    //  if ac button is clicked clear everything
    if(buttonValue == 'AC') {
      str = ''
      fullStr = ''
      arr = []
    }
    
    // if equal sign is done 
    if(buttonValue == '=') {
      smallResult.textContent = fullStr
      fullStr = str 
      smallResult.innerHTML = fullStr
      str = showResult(str)
    }

    // do not forget to show result
    displayResult(str)
    displayHistoryText(fullStr)
  })
})

// show result to the screen
function showResult(string) {
  let numbers = string.split(new RegExp('[-|*|+|/]')) // take all the numbers from the string
  let operators = string.split(new RegExp('[0-9]')).filter(opt => opt)
  let optItr = operators.entries() // make an array iterator
  if(string[0] == '-' || string[0] == '+' || string[0] == '/' || string[0] == '*' || string[string.length - 1] == '-' || string[string.length - 1] == '+' || string[string.length - 1] == '/' || string[string.length - 1] == '*') {
    return 'wrong input !'
  } else {
    let tmpRes = parseFloat(numbers[0]) // take the first value from the array
    // loop through the array 
    // if numbers's length is less than two 
    if(numbers.length === 2) {
      tmpRes = operation(tmpRes, parseFloat(numbers[1]), operators[0])      
    } else {
      for(let i = 1; i < numbers.length; i++) {
        tmpRes = operation(tmpRes, parseFloat(numbers[i]), optItr.next().value[1])
      }
    }
    return tmpRes
  }
}

function displayResult(result) {


  // if NaN
  if(result == 'NaN') {
    resultContainer.innerHTML = '&inf';
    return false
  }

  result+=''
  if(result.length > 20) return false 
  if(result.split('.').length > 1) {
    let lastStr = result.split('.')[1].slice(0, 3) 
    result = result.split('.')[0].concat('.',lastStr)
  }
  resultContainer.innerHTML = result
}

// show history outline
function displayHistoryText(history) {
  smallResult.innerHTML = history
}

// return resutl based on operator and number
function operation(number1, number2, operator) {



  let res // result container
  // basic math operation
  switch(operator){
    case '+':
      res =  parseFloat(number1) + parseFloat(number2)
      break
    case '-':
      res =  parseFloat(number1) - parseFloat(number2)
      break
    case '/':
      res =  parseFloat(number1) / parseFloat(number2)
      break
    case '*':
      res =  parseFloat(number1) * parseFloat(number2)
      break
    default:
      return 0
  }

  // some scientific calculation


  return res
}


// ! make for something facktorial 
function factorial(number) {
  if(number <= 1) return number
  return factorial(number - 1) * number
}
