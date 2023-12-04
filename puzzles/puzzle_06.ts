// Advent of Code 2023
// Puzzle #5

// INPUT:
const file = Bun.file("../input/input_06.txt")
const input = await file.text()
let lines = input.split("\n")
lines = lines.slice(0, lines.length - 1)

// SOLUTION:
console.time('Runtime')

// Get array of symbol indices
// For each indices, check surrounding squares
// If square contains numeric, get full number by checking until period
// Add to sum and replace with dots
interface Coordinate {
  i: number,
  j: number
}

let sum = 0
let matrix = lines.map((line) => line.split(''))
const isNumber = (c: string) => (parseInt(c) >= 0 && parseInt(c) <= 9)
function hasAdjacentNums({i, j}: Coordinate) {
  // console.log("Matrix Value: ", matrix[i][j])
  const checks = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1], [i + 1, j + 1], [i + 1, j-1], [i - 1, j+ 1], [i - 1, j - 1]]
  for (let k = 0; k < checks.length; k++) {
    if (isNumber(matrix[checks[k][0]][checks[k][1]])) {
      return {i: checks[k][0], j: checks[k][1]}
    }
  }
  return false
}

function getNum({i, j}:Coordinate) {
  let left = j, right = j
  let num = matrix[i][j]
  matrix[i][j] = '.'
  while (isNumber(matrix[i][right + 1])) {
    num += matrix[i][right + 1]
    matrix[i][j + 1] = '.'
    right++
  }
  while (isNumber(matrix[i][left - 1])) {
    num = matrix[i][left - 1] + num
    matrix[i][left - 1] = '.'
    left--
  }
  return parseInt(num)
}

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] === '*') {
      let ratios = []
      let isAdjNum = hasAdjacentNums({i, j})
      while(isAdjNum) {
        ratios.push(getNum(isAdjNum))
        isAdjNum = hasAdjacentNums({i, j})
      }
      if (ratios.length == 2) {
        sum += (ratios[0] * ratios[1])
      }
    }
  }
}

console.log(sum)
console.timeEnd('Runtime')

// OUTPUT:
// 75312571
// [2.98ms] Runtime