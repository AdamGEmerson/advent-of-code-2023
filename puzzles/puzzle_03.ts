// Advent of Code 2023
// Puzzle #3

// INPUT:
import {parse} from "url";

const file = Bun.file("../input/input_03.txt")
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

const validGames = games.filter((game) => (
  game.blue <= limits.blue && game.red <= limits.red && game.green <= limits.green
))

const sum = validGames.reduce((prev, curr) => prev += curr.id, 0)
console.log(sum)

console.timeEnd('Runtime')

// OUTPUT:
// 2541
// [2.22ms] Runtime
