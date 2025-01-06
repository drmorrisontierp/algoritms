
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
  for (let x = 0; x < 3; x++) {
    numbers[1].push((Math.round(Math.random() * 9)).toString())
  }
  numbers[0][Math.round(Math.random() * 2 + 1)] = "."
  numbers[1][Math.round(Math.random() * 1 + 1)] = "."
  return numbers
}

function checkNumbers(numbers) {
  let number_one = numbers[0]
  let number_two = numbers[1]

  let x = number_one.indexOf(".")
  let y = number_two.indexOf(".")
  let flag = true

  if ((x == 2 || x == 3) && number_one[0] == "0") number_one.shift()
  if (x == 3 && number_one[0] == "0") number_one.shift()
  if (y == 2 && number_two[0] == "0") number_two.shift()
  if (x == 1 && number_one[number_one.length - 1] == "0") {
    number_one.pop()
    if (number_one[number_one.length - 1] == "0") {
      number_one.pop()
      number_one.pop()
    }
  }
  if (x == 2 && number_one[number_one.length - 1] == "0") {
    number_one.pop()
    number_one.pop()
  }
  if (x == 3) number_one.pop()
  if (y == 2) number_two.pop()
  if (y == 1 && number_two[number_two.length - 1] == "0") {
    number_two.pop()
    number_two.pop()
  }
  if (parseFloat(number_one.join("")) == 0 || parseFloat(number_two.join("")) == 0) flag = false
  return [x, y, [number_one, number_two], flag] 
}



let numbers = generateAddition()
//let numbers = [["0", "0", ".", "0"], ["0", ".", "0"]]
console.log(numbers)
let numberCheck = checkNumbers(numbers)
console.log(numberCheck)
let flag = numberCheck[3]
while (!flag) {
  numbers = generateAddition()
  numberCheck = checkNumbers(numbers)
  flag = numberCheck[3]
}
console.log(numberCheck)


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
