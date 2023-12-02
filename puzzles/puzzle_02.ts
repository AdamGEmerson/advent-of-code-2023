// Advent of Code 2023
// Puzzle #2

// INPUT:
const file = Bun.file("../input/input_02.txt")
const input = await file.text()
const lines = input.split("\n")

// SOLUTION:
console.time('Runtime')

const digitMap = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}

const isDigit = (c: string) => ((parseInt(c) >= 0 && parseInt(c) <= 9))

let sum = 0
lines.forEach((line) => {
  let firstDigit = {index: line.length, digit: ''};
  let lastDigit = {index: -1, digit: ''};
  if (line.length) {
    Object.keys(digitMap).forEach((digit) => {
      if (line.includes(digit)) {
        let subIndex = 0
        while (subIndex + digit.length < line.length) {
          let index = line.indexOf(digit, subIndex)
          if (index === -1) break;
          if (index < firstDigit.index) {
            firstDigit = {index: index, digit: digitMap[digit as keyof typeof digitMap]}
          }
          if (index > lastDigit.index) {
            lastDigit = {index: index, digit: digitMap[digit as keyof typeof digitMap]}
          }
          subIndex += digit.length + 1
        }
      }
    })
    line.split('').forEach((char, i) => {
      if (isDigit(char)) {
        if (i < firstDigit.index) {
          firstDigit = {index: i, digit: char}
        }
        if (i > lastDigit.index) {
          lastDigit = {index: i, digit: char}
        }
      }
    })
    sum += parseInt(firstDigit.digit + lastDigit.digit)
  }
})

console.log(sum)

console.timeEnd('Runtime')

// OUTPUT:
// 53268
// [3.94ms] Runtime