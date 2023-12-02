// Advent of Code 2023
// Puzzle #4

// INPUT:
const file = Bun.file("../input/input_04.txt")
const input = await file.text()
let lines = input.split("\n")
lines = lines.slice(0, lines.length - 1)

// SOLUTION:
console.time('Runtime')

const limits = {
  red: 12,
  green: 13,
  blue: 14
}

interface Game {
  id: number
  red: number
  green: number
  blue: number
}

const colorFound = (s: string): string | false => {
  const colors = Object.keys(limits)
  for (let i = 0; i < colors.length; i++) {
    if (s.includes(colors[i])) return colors[i]
  }
  return false
}

const games = lines.map((line): Game => {
  let game: Game = {
    id: parseInt(line.split(':').join('').split(' ')[1]),
    red: 0,
    green: 0,
    blue: 0
  }
  let array = line.split(' ')
  for (let i = 0; i < array.length; i++) {
    let color = colorFound(array[i])
    if (color) {
      let amount = parseInt(array[i - 1])
      if (amount > game[color as keyof typeof game]) {
        game[color as keyof typeof game] = amount
      }
    }
  }
  return game
})

const sum = games.reduce((sum, curr) => sum + (curr.red * curr.blue * curr.green), 0)
console.log(sum)

console.timeEnd('Runtime')

// OUTPUT:
// 66016
// [1.64ms] Runtime

