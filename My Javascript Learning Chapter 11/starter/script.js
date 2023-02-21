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





/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////N/B MORE ON ARRAY METHDS

///SLICE; does nt mutate/change the original copy
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));//logs c, d, e. this is not a copy of the original but just an extract
// console.log(arr.slice(2, 4));//logs c, d cos the end parameter is usualy nt included in the output
// console.log(arr.slice(-2));//logs d, e
// console.log(arr.slice(-1)); //logs e
// console.log(arr.slice(1, -2)); //logs b, c
// console.log(arr.slice());//logs all elemnts
// console.log([...arr]);//logs all aray elemnts too

////SPLICE; mutates or changes the original copy
//console.log(arr.splice(2));///cuts out c, d, e
//console.log(arr);///nw remains a, b.
//console.log(arr.splice(1, 2));///here 1 wil remove elemnt at positn 1, while 2 is the number of elemnt we want to delete

///REVERSE; mutates the original aray
// let arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());///logs f, g, h, i, j
// console.log(arr2);///same as reversd array

///CONCAT; joins/concats two arrays, doesnt mutate the original array
// const letters = arr.concat(arr2);///logs all/combined elemnts of arr nd arr2
// console.log(letters);
// console.log([...arr, ...arr2]); ///logs all/combined elemnts of arr nd arr2, doesnt mutate the original too

///JOIN
//console.log(letters.join('-'));///joins letters in this format; a-b-c-d-e etc

//////ARRAY METHDS USED FOR DATA TRANSFORMATION
//they are MAP, FILTER AND REDUCE
// --The map Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//const eurToUsd = 1.1;

//call back functn
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

///using for of loop over movemnts aray
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

///---The Filter Method:
// The filter Method
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);//logs deposits

///using the for of loop to do same as above(deposits):
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log(withdrawals);//logs withdrawals
////OR/SAME AS ABOVE(withdrawal) USING AROW FUNCTION
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//--- The Reduce Method

//accumulator(acc) -> SNOWBALL
//const balance = movements.reduce(function (acc, cur, i, arr) {
//console.log(`Iteration ${i}: ${acc}`); to see the serial acumulatn ocuring
//return acc + cur;
//}, 0);////the 0 here represents the accumulator's original value before the loop
//console.log(balance);

//using arow function to write same as above;
const balanceb = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balanceb);

///doing same as above(balance) using the for of loop :
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

///Using the reduce methd to compute maximum value in the movement array
const max = movements.reduce((acc, mov) => {
  if (acc > mov)
    return acc;
  else
    return mov;

}, movements[0]);
console.log(max);//logs 3000

///////////////////////////////////////
// The Magic of Chaining Methods: we can only chain a method after anoda one if the first one returns an array
///PIPELINE
const eurToUsd = 1.1;
console.log(movements);

const totalDepositsUSD = movements
  .filter(mov => mov > 0)///filters the deposits
  .map(mov => mov * eurToUsd)///converts the filterd values to usd
  .reduce((acc, mov) => acc + mov, 0);//sums up the total value
console.log(totalDepositsUSD);


// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {///to verify wht happens at each stage of chaining we do this
//     // console.log(arr);///to see info recieved on console
//     return mov * eurToUsd;
//   })
//   // .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);


///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))

    // .filter((age, i, arr) => { //to see info recievd from map
    //   console.log(arr);
    //   return age >= 18;
    // })
    .filter(age => age >= 18)

    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);///calculates average
// adults.length

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

///////////////////////////////////////
// The THE FIND METHOD of working on arays: used to retriev one/first elemnt of an aray that matches a condtn
const firstWithdrawal = movements.find(mov => mov < 0);///logs first elemnt that is < 0
console.log(movements);
console.log(firstWithdrawal);///logs -400

//console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');///used to find the accout that bears the name in the bigger accounts obj
console.log(account);//logs jesisca Davies acct alone

////LECTURES CONTD:
///////////////////////////////////////
// More Ways of Creating and Filling Arrays
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Emprty arrays + fill method
// const x = new Array(7);
// console.log(x); ///logs empty array
// // console.log(x.map(() => 5));
// x.fill(1, 3, 5); ///means fil 1 at index 3 nd stop at 5 or index 3 to 5
// x.fill(1);
// console.log(x);

// arr.fill(23, 2, 6); ///means fil 23 at index 2 nd stop at 6 or 2-6
// console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1); ////means creat an aray of 7 elemnts, fill it with 1
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); ///means creat an aray of 7 lenght, fil/loop it with nos frm 1 to 7
console.log(z); //_, meaning walk over parameter

/////////SORTING METHODS: it mutates the original araay
// Sorting Arrays

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); ///arranges the aray in alphabetical order
console.log(owners);

// Numbers
// console.log(movements);
// console.log(movements.sort());

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending order sorting
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
// movements.sort((a, b) => a - b); ////simplified code of abov
// console.log(movements);

// Descending order sorting
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// movements.sort((a, b) => b - a); ////simplified code of abov
// console.log(movements);







/////////////////BANKIST APP BUILDING STARTS
////ILLUSTRATIONS BELOW ON THE MOVEMNT SECTION;
//using the for of methd to loop over the movemnt array(loop can be broken at choice)
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of  movements) {
//   if (movement > 0) {
//     console.log(`you have deposited ${movement}`);
//   } else {
//     console.log(`you have withdrawn ${Math.abs(movement)}`);//N/B;Math.abs makes it log absolute values without '-' sign
//   }
// }

/// to add/count the number of movemnts using the for of loop we have;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: you have deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: you have withdrawn ${Math.abs(movement)}`);//N/B;Math.abs makes it log absolute values without '-' sign
//   }
// } ///logs Movement 1: you have deposited 200, Movement 2: you have deposited 450


////using the for each methd to loop over the movemnt array(loop cant be broken, mst be complted)
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`you have deposited ${movement}`);
//   } else {
//     console.log(`you have withdrawn ${Math.abs(movement)}`);//N/B;Math.abs makes it log absolute values without '-' sign
//   }
// });

/// to add/count the number of movemnts using the for of loop we have;
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: you have deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: you have withdrawn ${Math.abs(mov)}`);//N/B;Math.abs makes it log absolute values without '-' sign
//   }
// });

///////TO SEE HW FOR EACH WORKS WITH MAP
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

////TO SEE HW FOR EACH WORKS ON SETS:
// const newCurrencies = new Set(['USD', 'GBP', 'EUR', 'EUR', 'NGR']);
// console.log(newCurrencies);
// newCurrencies.forEach(function (keys, value, map) {
//   console.log(`${keys}: ${value}`);
// });

///////////SOME AND EVERY METHOD: Used to test if a condition is true
// some and every
console.log(movements);

// EQUALITY
//console.log(movements.includes(-130));//includes is used for equality

// SOME: CONDITION
//console.log(movements.some(mov => mov === -130));code same as includes abv

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);///logs true/false

// EVERY:returns true if all of the elemnts in the array pass a certain condition 
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////
// FLAT AND FLAT MAP METHODS
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());///logs the entire array without nesting ie 1-8.it goes on level deep ie one nesting deep

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];///aray in aray in array...DOUBLE NESTED DEEP
console.log(arrDeep.flat(2));////adding (2), makes the flat go deeper into double nested arays

//////EXAMPLE USING FLAT TO CALC THE OVERALL BAL/SUM OF USERS ACCTS ON BANKIST APP

// const accountsMovements = accounts.map(acc => acc.movements);
// console.log(accountsMovements);///logs all the movents in the accounts obj

// const allMovements = accountsMovements.flat();
// console.log(allMovements);///logs all accounts movemnts in a/one big array

// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(`the sum is ${overalBalance}`);


///using chainning to write the codes abov we have:
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap: combines the flat and map methds
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)///works for only one level deep flatening
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

/////////////////////////////
//FINDING OUT WHICH ARRAY METHOD TO USE
//N/B see iphone pictures or slide 25 of chapter 11.

////////////////////////////////////////
///TO WATCH A RECAP OF ALL ARRAYS METHOD IN ONE CLIP, SEE SLIDE 26








//////////////////////////TO WORK ON THE REAL BANKIST MOVEMNENT:
///To compute movements:
// const displayMovements = function (movements) {/////BEFORE ADDING SORTING
//   //containerMovements.innerHTML = '';////deletes previous content of container

//   movements.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';///declaring if statmnt for withdrawal/deposits

//     const html = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${i + 1
//       } ${type}</div>
//         <div class="movements__value">${mov}€</div>
//       </div>
//     `;
//     containerMovements.insertAdjacentHTML('afterbegin', html);///code to insert html into the movemnt section

//   });
// };

const displayMovements = function (movements, sort = false) {////AFTER ADDING SORTING
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


//displayMovements(account1.movements);

///TO CREATE USERNAME FOR BANKIST APP
// const user = 'Stephen Thomas Williams';
// const username = user.toLowerCase().split(' ').map(function (name) {
//   return name[0];

// }).join('');
// console.log(username);///logs stw

///OR/SAME AS
// const user = 'Stephen Thomas Williams';
// const username = user.toLowerCase().split(' ').map(name => name[0])//logs stw
//   .join('');
// console.log(username);///logs stw

///OR/SAME AS
// const createUsernames = function (user) {
//   const username = user.toLowerCase().split(' ').map(name => name[0])//logs stw
//     .join('');
//   return username;
// };
// console.log(createUsernames('Stephen Thomas Williams'));

////TO COMPUTE/ADD ONE USERNAME FOR EACH OF THE ACCT HOLDER IN THE ACCOUNTS ARRAY;
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase().split(' ').map(name => name[0])
      .join('');//adds the username to each account array object
  });


};
createUsernames(accounts);///calling the function
console.log(accounts);///checks if username has been added to each aray

/////////TO PRINT THE BALANCE ON BANKIST APP WE HAVE:
// const calcDisplayBalance = function (movements) {
//   const balance = movements.reduce((acc, mov) => acc + mov, 0);//computing bal
//   labelBalance.textContent = `${balance} EUR`;

// };
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);//computing total bal
  labelBalance.textContent = `${acc.balance} EUR`;

};
//calcDisplayBalance(account1.movements);///bal is printed on the app


////////////TO DISPLAY SUMMARY OF BALANCES ON BANKIST APP WE HAVE:

//for deposits
const calcDisplaySummary = function (acc) {///N/B acc is same as currentAccount variable
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} EUR`;

  ////for withrawals
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} EUR`;////'Math.abs is used to remov -ve sign on printout/result

  ///for interests
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)///multiplies each output by 1.2%
    .filter(int => int >= 1)///to select only inetrsts frm 1 and abv 
    // .filter((int, i, arr) => {///to see info recieved on console
    //   console.log(arr);///to see info recieved on console
    //   return int >= 1;

    // })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)} EUR`;
};
//calcDisplaySummary(account1.movements);///logs total sum of all deposits/incomes


const updateUI = function (acc) {////functn merging the 3(D's)
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

/////////////////////////////////
///event handler
//TO CREATE THE LOGIN SECTION ON BANKIST APP
let currentAccount; ///stored outside for re usability

btnLogin.addEventListener('click', function (e) {

  e.preventDefault();// Prevent form from submitting/Page reload

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value///finds the username that matches the input value in username of bankist app

  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {//check username and matching pin b/4 login
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;///splits the owners name in an array and selects the first elemnt/word

    containerApp.style.opacity = 100;///alows the account details to display on login

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';///causes the input/login field to be empty afetr login
    inputLoginPin.blur();///removes focus on input pin field after login

    updateUI(currentAccount)///the 3(D'S) below hav been merferd into the updateUI functn
    // displaymovements
    //displayMovements(currentAccount.movements);

    //display balance
    //calcDisplayBalance(currentAccount);

    //display summary
    //calcDisplaySummary(currentAccount);////needs to access the entire acct nt only movemnts
  }
});


/////////////////////////////////////////////
////TO CREATE THE TRANSFER SECTION ON THE BANKIST APP:

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();///prevents page reload on click
  const amount = Number(inputTransferAmount.value);///picks the value/amt inputed on app
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );///finds acct that matches username inputed
  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';///clears the transfer inputs after operatn

  if (
    amount > 0 &&
    receiverAcc &&///if reciever acct xists
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username//if reciever accts username is diff from users username
  ) {
    //     // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }


  //     // Update UI
  updateUI(currentAccount);

});

//////COMPUTING THE LOAN SECTION WITH SUM/EVERY METHD
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  //N/B: loan is only grantd if there is any deposit/movement greater than 10% of amt of loan requested
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {///2nd command checks for the N/B above
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});


//////////To close an account ON BANKIST we use the FIND INDEX METHOD:
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';//clear input field after opratn
});


let sorted = false; ///stored outside to enable it work after functn has ran
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted); ///sets sorted to true
  sorted = !sorted; ///enables sort to return to original state being clicked
});


///////////////////////////////////////////
////MORE EXERCISES ON ARRAY METHODS
// Array Methods Practice

// 1. to calc/sum all deposits on bankist
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2. to calc how many deposits that were at least 1000EUR
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;///using '.lenght' prints the number of values abov 1000, nd nt the values itself
///OR USING THE REDUCE MTHD ALSO BELOW
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);////using ++count enable the incremnt on current value

console.log(numDeposits1000);

// Prefixed ++ oeprator
let a = 10;
console.log(++a);///++a enable incremnt on a
console.log(a);

// 3.///to creat an obj which containns sum of deposits nd withrawals 
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }/////this is the accumulator
  );

console.log(sums);

///4: to create a function to convert any string to a title case
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);///converts ist leter to upercas and adds thers from positn 1

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))///if word recievd frm map is an exceptn word, it shld return the word else it shld perform capitalize on it
    .join(' ');

  return capitzalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));


///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

////////CODING CHALLENGE SOLUTION
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.///to push recomended weight(recfood) to the dog obj
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  } `
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4.
// "Matilda and Alice and Bob's dogs eat too much!"
//  "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);




























////CODING CHALLENGE 1
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

////SOLUJTION TO CODING CHALLENGE 1
//NO 1:
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();///llogs all elemnts
  dogsJuliaCorrected.splice(0, 1);///0, removs elemnt at ist positn, 1 declares the no of elemnts to remov 
  dogsJuliaCorrected.splice(-2); //removs last two elemnts
  // dogsJulia.slice(1, 3);

  //NO 2:
  const dogs = dogsJuliaCorrected.concat(dogsKate);///joins the two arrays
  console.log(dogs);

  //NO 3:
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
///NO 4:
//checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);