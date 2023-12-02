// Advent of Code 2023
// Puzzle #1

// INPUT:
const file = Bun.file("../input/input_01.txt")
const input = await file.text()
const lines = input.split("\n")

// SOLUTION:

console.time('Runtime')
const isDigit = (c: string) => ((parseInt(c) >= 0 && parseInt(c) <= 9))
let sum = 0
lines.forEach((line) => {
    if (line) {
      const digits = line.split('').filter((char) => isDigit(char))
      sum += parseInt(digits[0] + digits[digits.length - 1])
    }
  }
)
console.log(sum)

console.timeEnd('Runtime')

// OUTPUT:
// 53080
// [4.57ms] Runtime