'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let key = 0;

let user ;
let pin ;

containerApp.style.opacity = 0

///////////////////////User Authentication////////////////////////////////

function authenticateUser(enteredPin, name) {
  let authenticatedAccount = null;
  
  accounts.forEach(function (account) {
    const [first, last] = account.owner.split(' ');
    const input = first[0] + last[0];

    if (account.pin === enteredPin && input === name) {
      if (enteredPin !== pin) {
        key = 0;
        pin = enteredPin;
      }
      containerApp.style.opacity = 100
      authenticatedAccount = account;
    }
  });

  return authenticatedAccount;
}


function displayMovements(account) {

  labelWelcome.innerHTML = 'Welcome ' + account.owner;
  const movContainer = document.querySelector('.movements');
  movContainer.innerHTML = ''; // Clear existing movements

    let deposit = 0
    let withdraw = 0

  account.movements.forEach(function (mov) {

    console.log(`Outer loop ${mov}`)
    const movRow = document.createElement('div');
    movRow.classList.add('movements__row');

    const movType = mov < 0 ? 'withdrawal' : 'deposit';
    const date = new Date().toLocaleDateString();
    labelDate.innerHTML = date;

    let value;

    if (Math.abs(mov) > 100) {
      value = mov / 100;
      if (value === 0 || isNaN(value)) {
        value = 1;
      }
    }

    movRow.innerHTML = `
      <div class="movements__type movements__type--${movType}">
        ${Math.floor(Math.abs(value))} ${movType}
      </div>
      <div class="movements__date">
        ${movType === 'withdrawal' ? '24/01/2037' : date}
      </div>
      <div class="movements__value">
        ${mov}€
      </div>
    `;
    movContainer.appendChild(movRow);

    
    if (mov > 0) {
      deposit += mov;
    } else {
      withdraw += mov;
    }
      console.log(`inner loop ${mov}`)
   
    
    // Update labels with the calculated sums
    
  });

  /*labelSumIn.textContent = sumIn + '€';
  labelSumOut.textContent = sumOut + '€';*/
  //const key2 = localStorage.getItem('key1')
  let balancevalue = deposit + withdraw;
  console.log(withdraw)
  console.log(deposit)
  labelBalance.textContent = balancevalue + '€'
  labelSumIn.textContent = deposit
  labelSumOut.textContent = withdraw
  labelSumInterest.textContent = ((deposit * account.interestRate) /100 )
}

///////////////////////////Login///////////////////////////////////////////////////////////

function check(event) {
  event.preventDefault();

  const enteredPin = Number(inputLoginPin.value);
  const name = inputLoginUsername.value;

  const authenticatedAccount = authenticateUser(enteredPin, name);
  
  if (authenticatedAccount) {
    displayMovements(authenticatedAccount);
  } else {
    // Handle authentication failure
    console.log('Authentication failed.');
  }
}

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  check(event);
});

///////////////////////////Transfer Money from one account to another////////////////////////

function transfer(){
  let transfer_to;
  //let authenticatedAccount = null;
  accounts.forEach(function (account) {

    const [first, last] = account.owner.split(' ');
    const input = first[0] + last[0];

    if (input === inputTransferTo.value) {
      transfer_to = account;
    }
  });

  console.log(labelBalance.textContent)
  console.log(labelSumOut.textContent)

  const amount = Number(inputTransferAmount.value)
  console.log(amount)
  key = amount;
  //localStorage.setItem('key1',key)

  const enteredPin = Number(inputLoginPin.value);

  const authenticatedAccount = authenticateUser(enteredPin, inputLoginUsername.value);
  console.log(authenticatedAccount)
  authenticatedAccount.movements.push((-1*amount))
  displayMovements(authenticatedAccount);

  transfer_to.movements.push(amount);

  inputTransferAmount.value = ""
  inputTransferTo.value = ""
}

const transferForm = document.querySelector('.operation');
transferForm.addEventListener('submit', function(){
  event.preventDefault();
  transfer();
})

///////////////////////////////Loan////////////////////////////////////////

function loan()
{
  const amount = Number(inputLoanAmount.value)
  console.log(amount)

  const enteredPin = Number(inputLoginPin.value);

  const authenticatedAccount = authenticateUser(enteredPin, inputLoginUsername.value);
  console.log(authenticatedAccount)
  authenticatedAccount.movements.push(amount)
  displayMovements(authenticatedAccount);

}

//const Loan = document.querySelector('.form--loan')
btnLoan.addEventListener('click',function () {
  event.preventDefault();
  loan();
})

////////////////////////Sort////////////////////////////

btnSort.addEventListener('click', function(){
  const enteredPin = Number(inputLoginPin.value);
  const authenticatedAccount = authenticateUser(enteredPin, inputLoginUsername.value);
  
  // Sort movements array numerically in descending order
  authenticatedAccount.movements.sort((a, b) => b - a);

  // Display sorted movements
  displayMovements(authenticatedAccount);
});



/////////////////////////////Close///////////////////////////

function close() {
  const enteredPin = Number(inputClosePin.value);
  const name = inputCloseUsername.value;

  const authenticatedAccount = authenticateUser(enteredPin, name);

  if (authenticatedAccount) {
    containerApp.style.opacity = 0;
    inputLoginPin.value = ""; // Clear the pin input field
    inputLoginUsername.value = "";
    labelWelcome.innerHTML = 'Log in to get started'
  } else {
    alert('Wrong input');
  }
}

btnClose.addEventListener('click', function(event) {
  event.preventDefault();
  close();
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const timerElement = document.getElementById('timer');
  timerElement.textContent = '05:00'; // Set the timer back to its default value

  let [minutes, seconds] = timerElement.textContent.split(':').map(Number);
  console.log()

  const timerInterval = setInterval(() => {

    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 00:00
        containerApp.style.opacity = 0 // Call the close function
        alert("You've been logged out.");
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    // Format the time with leading zeros
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerElement.textContent = formattedTime;
  }, 1000); // Update every second
});






/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
/*const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
console.log(array.join(" "))

console.log(array)
console.log(array.splice(5))
console.log(array)
console.log(array.slice(3))
console.log(array)
console.log(array.at[1])

//to get the last element of an array
console.log(array[array.length - 1])
console.log(array.slice(-1)[0])
console.log(array.at(-1))

/////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log('You have deposited money')
  } else {
    console.log(`You have withdrew ${Math.abs(movement)}`)
  }
}

console.log('------ForEach loop------')
// function(movement, index, array)

movements.forEach(function (movement, i) {
  if (movement > 0) {
    console.log(`Movement at index ${i + 1}`)
  } else {
    console.log(`Movement at index ${i + 1} You have withdrew ${Math.abs(movement)}`)
  }
})

console.log('------ForEach loop------')

const array2 = [1, 2, 3, 4, 5];

array2.forEach(function (element, index, array2) {
  console.log(`Element ${element} at index ${index}`);
  console.log("Full array:", array2);
});

// foreach for Maps and sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`)
})*/