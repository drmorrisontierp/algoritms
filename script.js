
const ids = [
  'd11',
  'd13',
  'd15',
  'd17',
  'd19',
  'd21',
  'd23',
  'd25',
  'd27',
  'd29',
  'b11',
  'b13',
  'b15',
  'b17',
  'b19',
  'b21',
  'b23',
  'b25',
  'b27',
  'b29',
];

document.addEventListener('DOMContentLoaded', function () {
  const dict = {
    d11: document.getElementById('d11'),
    d13: document.getElementById('d13'),
    d15: document.getElementById('d15'),
    d17: document.getElementById('d17'),
    d19: document.getElementById('d19'),
    d21: document.getElementById('d21'),
    d23: document.getElementById('d23'),
    d25: document.getElementById('d25'),
    d27: document.getElementById('d27'),
    d29: document.getElementById('d29'),
    b11: document.getElementById('b11'),
    b13: document.getElementById('b13'),
    b15: document.getElementById('b15'),
    b17: document.getElementById('b17'),
    b19: document.getElementById('b19'),
    b21: document.getElementById('b21'),
    b23: document.getElementById('b23'),
    b25: document.getElementById('b25'),
    b27: document.getElementById('b27'),
    b29: document.getElementById('b29'),
  };

  for (let x = 0; x < 10; x++) {
    dict[ids[x]].addEventListener('dragstart', function (e) {
      console.log("dragging")
      e.dataTransfer.setData('text/plain', ids[x]);
    });
  }

  for (let x = 10; x < 20; x++) {
    dict[ids[x]].addEventListener('dragover', function (e) {
      console.log("dragging")
      e.preventDefault();
    });

    dict[ids[x]].addEventListener('drop', function (e) {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('text/plain');
      if (draggedId.replace('d', 'b') === ids[x]) {
        dict[ids[x]].querySelector('p').textContent = dict[draggedId].querySelector('p').textContent;
      }
    });
  }
});


function generateAddition() {
  let numbers = [[], []]
  for (let x = 0; x < 4; x++) {
    numbers[0].push((Math.round(Math.random() * 9)).toString())
  }
  for (let x = 0; x < 4; x++) {
    numbers[1].push((Math.round(Math.random() * 9)).toString())
  }
  numbers[0][Math.round(Math.random() * 2 + 1)] = "."
  numbers[1][Math.round(Math.random() * 2 + 1)] = "."
  return numbers
}

function reduceNumbers(number) {
  let decX = 2

  let x = number.indexOf(".")
  if ((x == 2) && number[0] == "0") {
    number.shift()
    decX = 2
  }
  if ((x == 3) && number[0] == "0") {
    number.shift()
    decX = 1
  }
  if (x == 1 && number[number.length - 1] == "0") {
    number.pop()
    decX = 2
    if (number[number.length - 1] == "0") {
      number.pop()
      decX = 1
      if (number[number.length - 1] == "0") {
        number.pop()
        number.pop()
        decX = 0
      }
    }
  }
  if (x == 2 && number[number.length - 1] == "0") {
    number.pop()
    decX = 1
    if (number[number.length - 1] == "0") {
      number.pop()
      number.pop()
      decX = 0
    }
  }

  if (x == 3) {
    number.pop()
    decX = 0
  }
  return [decX, number]
}

function checkNumbers(numbers) {
  let flag = true;
  let number_one = reduceNumbers(numbers[0]);
  let number_two = reduceNumbers(numbers[1]);

  if (parseFloat(number_one[1].join("")) == 0 || parseFloat(number_two[1].join("")) == 0) flag = false;

  let x = number_one[1].indexOf(".");
  let y = number_two[1].indexOf(".");

  if (number_one[0] === number_two[0]) {
    while (number_one[1].length < 5) {
      number_one[1].unshift("");
    }
    while (number_two[1].length < 5) {
      number_two[1].unshift("");
    }
  } else if (number_one[0] > number_two[0]) {
    while (number_one[1].length < 5) {
      number_one[1].unshift("");
    }
    while (number_two[1].length < 5 + (number_one[0] - number_two[0])) {
      number_two[1].unshift("");
    }
  } else {
    while (number_two[1].length < 5) {
      number_two[1].unshift("");
    }
    while (number_one[1].length < 5 + (number_two[0] - number_one[0])) {
      number_one[1].unshift("");
    }
  }

  return [number_one[1].concat(number_two[1]), flag];
}
/*
function checkNumbers(numbers) {

  let flag = true
  let number_one = reduceNumbers(numbers[0])
  let number_two = reduceNumbers(numbers[1])

  if (parseFloat(number_one[1].join("")) == 0 || parseFloat(number_two[1].join("")) == 0) flag = false

  x = number_one[1].indexOf(".");
  y = number_two[1].indexOf(".");

  if (number_one[0] == 0 && number_two[0] == 0) {
    for (let x = 0; x < 5 - number_one[1].length; x++) {
      number_one[1].unshift("")
    }
    for (let x = 0; x < 5 - number_two[1].length; x++) {
      number_two[1].unshift("")
    }
  }
  if (number_one[0] === number_two[0]) {
    for (let x = 0; x < 5 - number_one[1].length; x++) {
      number_one[1].unshift("")
    }
    for (let x = 0; x < 5 - number_two[1].length; x++) {
      number_two[1].unshift("")
    }
  }
  if (number_one[0] > number_two[0]) {
    for (let x = 0; x < 5 - number_one[1].length; x++) {
      number_one[1].unshift("")
    }
    for (let x = 0; x < (number_one[0] - number_two[0]); x++) {
      number_two[1].push("")
    }
    if (number_two[0] == 0) number_two[1].push("")

    for (let x = 0; x < 5 - number_two[1].length; x++) {
      number_two[1].unshift("")
    }

  }
  if (number_two[0] > number_one[0]) {
    for (let x = 0; x < 5 - number_one.length[1]; x++) {
      number_two[1].unshift("")
    }
    for (let x = 0; x < (number_two[0] - number_one[0]); x++) {
      number_one[1].push("")
    }
    if (number_one[0] == 0) number_one[1].push("")
    for (let x = 0; x < 5 - number_two[1].length; x++) {
      number_one[1].unshift("")
    }

  }

  return [number_one[1].concat(number_two[1]), flag]
}
*/
function placeNumbers(numbers) {
  let placings = {
    'd11': "",
    'd13': "",
    'd15': "",
    'd17': "",
    'd19': "",
    'd21': "",
    'd23': "",
    'd25': "",
    'd27': "",
    'd29': "",
  }
  for (let x = 0; x < 10; x++) {
    placings[`d${10 + 2 * x + 1}`] = numbers[0][x]
  }

}

let numbers = generateAddition()
//let numbers = [["0", "0", ".", "0"], ["0", ".", "0"]]
//console.log(numbers)
let numberCheck = checkNumbers(numbers)
console.log(numberCheck)
let flag = numberCheck[1]
while (!flag) {
  numbers = generateAddition()
  numberCheck = checkNumbers(numbers)
  flag = numberCheck[1]
}
//console.log(numberCheck)
placeNumbers(numberCheck)

/*const test = [
  [["0", "0", ".", "0"], ["0", ".", "0"]],
  [["0", "0", ".", "2"], ["5", ".", "0"]],
  [["0", "4", ".", "2"], ["0", ".", "5"]],
  [["6", "4", ".", "0"], ["0", ".", "5"]],
  [["6", ".", "0", "0"], ["0", ".", "5"]],
  [["6", "4", "0", "."], ["0", "5", "."]],
]

for (let x of test) {
  checkNumbers(x)
}*/


//check