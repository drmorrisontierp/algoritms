
const ids = [
  'd10',
  'd11',
  'd12',
  'd13',
  'd14',
  'd15',
  'd20',
  'd21',
  'd22',
  'd23',
  'd24',
  'd25',
  'b10',
  'b11',
  'b12',
  'b13',
  'b14',
  'b15',
  'b20',
  'b21',
  'b22',
  'b23',
  'b24',
  'b25',
];

document.addEventListener('DOMContentLoaded', function () {
  const dict = {
    d10: document.getElementById('d10'),
    d11: document.getElementById('d11'),
    d12: document.getElementById('d12'),
    d13: document.getElementById('d13'),
    d14: document.getElementById('d14'),
    d15: document.getElementById('d15'),
    d20: document.getElementById('d20'),
    d21: document.getElementById('d21'),
    d22: document.getElementById('d22'),
    d23: document.getElementById('d23'),
    d24: document.getElementById('d24'),
    d25: document.getElementById('d25'),
    b10: document.getElementById('b10'),
    b11: document.getElementById('b11'),
    b12: document.getElementById('b12'),
    b13: document.getElementById('b13'),
    b14: document.getElementById('b14'),
    b15: document.getElementById('b15'),
    b20: document.getElementById('b20'),
    b21: document.getElementById('b21'),
    b22: document.getElementById('b22'),
    b23: document.getElementById('b23'),
    b24: document.getElementById('b24'),
    b25: document.getElementById('b25'),
  };

  for (let x = 0; x < 12; x++) {
    dict[ids[x]].addEventListener('dragstart', function (e) {
      console.log("dragging")
      e.dataTransfer.setData('text/plain', ids[x]);
    });
  }

  for (let x = 12; x < 24; x++) {
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
  let x = number.indexOf(".")
  let decX = x == 1 ? 2 : x == 2 ? 1 : 0
  if ((x == 2) && number[0] == "0") {
    number.shift()
  }
  if ((x == 3) && number[0] == "0") {
    number.shift()
  }
  if (x == 1 && number[number.length - 1] == "0") {
    number.pop()
    decX = 1
    if (number[number.length - 1] == "0") {
      number.pop()
      number.pop()
      decX = 0
    }
  }

  if (x == 2 && number[number.length - 1] == "0") {
    number.pop()
    number.pop()
    decX = 0
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
  console.log(number_one)
  console.log(number_two)

  if (parseFloat(number_one[1].join("")) == 0 || parseFloat(number_two[1].join("")) == 0) flag = false;

  if (number_one[0] === number_two[0]) {
    while (number_one[1].length < 6) {
      number_one[1].unshift("");
    }
    while (number_two[1].length < 6) {
      number_two[1].unshift("");
    }
  } else if (number_one[0] > number_two[0]) {
    let extraDecs = number_two[0] !== 0 ? number_one[0] - number_two[0] : number_one[0] - number_two[0] + 1;
    for (let x = 0; x < extraDecs; x++) {
      number_two[1].push("");
    }
    while (number_one[1].length < 6) {
      number_one[1].unshift("");
    }
    while (number_two[1].length < 6) {
      number_two[1].unshift("");
    }
  } else {
    let extraDecs = number_one[0] !== 0 ? number_two[0] - number_one[0] : number_two[0] - number_one[0] + 1;
    for (let x = 0; x < extraDecs; x++) {
      number_one[1].push("");
    }
    while (number_two[1].length < 6) {
      number_two[1].unshift("");
    }
    while (number_one[1].length < 6) {
      number_one[1].unshift("");
    }
  }
  
  console.log(number_one)
  console.log(number_two)
  return [number_one[1].concat(number_two[1]), flag];
}

function placeNumbers(numbers) {
  let placings = {
    'd10': "",
    'd11': "",
    'd12': "",
    'd13': "",
    'd14': "",
    'd15': "",
    'd20': "",
    'd21': "",
    'd22': "",
    'd23': "",
    'd24': "",
    'd25': "",
  }
  for (let x = 0; x < 6; x++) {
    placings[`d${x + 10}`] = numbers[0][x]
  }
  for (let x = 6; x < 12; x++) {
    placings[`d${x + 14}`] = numbers[0][x]
  }
  console.log(placings)
  return placings
}

function writeNumbers(numbers) {
  Object.keys(numbers)
  .forEach(function eachKey(key) {
    document.getElementById(key).innerHTML = `<p>${numbers[key]}</p>`
  });
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
writeNumbers(placeNumbers(numberCheck))

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