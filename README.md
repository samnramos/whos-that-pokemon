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
corepack enable
yarn install
```


## Running locally

Start the API and the frontend together from the project root:

```bash
yarn dev
```

Open the game at:

```text
http://localhost:3000
```

## How to play

1. Go to the Create tab.
2. The game gives you a hint and how many you have left
3. If you need more hints press "Get Hint"
4. If you want to start a new game press "New Game"
5. If you give up press "Give up" to get the pokemon

----Game Start for Browser----

After running `yarn dev` in the root terminal:

1. Copy the localhost link into the browser.
2. Guess the pokemon based on the hint that was given when you run.
3. Click get hint for more hints reminder you only have 4 hints.
4. If you give up press give up for the pokemon name.

----AI Disclosure----

Our team used AI as a coding partner.
