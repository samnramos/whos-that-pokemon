# Pokemon Trivia Game

## Prerequisites

- **Node 22+** and **Yarn 4** (via Corepack: `corepack enable`)
- **ngrok** (only needed to play together across machines)

### Node version (nvm)

Make sure you're on Node 22 before installing anything:

```bash
node --version
nvm install 22
nvm use 22
nvm alias default 22
```

## Installation

Run these commands from the project root:

```bash
cd whos-that-pokemon
yarn install
```


## Running locally

Start the API and the frontend together from the project root:

```bash
node pokemontrivia.js
```

Open the game at:

```text
http://localhost:3000
```

## How to use

After running `node pokemontrivia.js` in the root terminal:

1. Copy the localhost link into the browser.
2. Guess the pokemon based on the hint that was given when you run.
3. Click get hint for more hints reminder you only have 4 hints.
4. If you give up press give up for the pokemon name.

## How to play

5. The game gives you 5 hints to guess from (type, move, generation, area it's found in, and weight)
6. The score will show up when you guessed the pokemon correctly.
7. If you want to start a new game press "New Game"
58. If you give up press "Give up" to get the pokemon


----AI Disclosure----

Our team used AI as a coding partner.
