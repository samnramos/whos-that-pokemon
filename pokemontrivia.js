import express from "express";
const app = express();
app.use(express.json());
app.use(express.static("public"))

const games = {};

app.get("/new", async (req, res) => {
    try {
        // Pick a random Pokemon ID
        const randomId = Math.floor(Math.random() * 1025) + 1;
        
        // Get Pokemon data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

        //Store the response into the var pokemon
        const pokemon = await response.json();

        // Get species data (generation + habitat)
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`);
        const species = await speciesResponse.json();
        
        // Create generation hint
        const generation = species.generation.name.replace("generation-", "Gen ").toUpperCase();
        
        // Pick a random move
        const randomMove =pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move.name;

        // Create hints
        const hints = [
            `Type: ${pokemon.types.map(t => t.type.name).join(", ")}`,
            `Move: ${randomMove}`,
            `Generation: ${generation}`,
            `Found in: ${species.habitat?.name ?? "unknown"}`,
            `Weight: ${pokemon.weight / 10} kg`
        ];

        //Creates a game Id
        const gameId = Date.now().toString();
        //Stroes the correct answer/pokemon
        games[gameId] = {
            answer: pokemon.name.toLowerCase(), 
            hints,
            guesses: [],
            hintsUsed: 0,
            pokemon: {
                type: pokemon.types.map(t => t.type.name).join(", "),
                move: randomMove,
                generation: generation,
                foundIn: species.habitat?.name ?? "unknown",
                weight: `${pokemon.weight / 10} kg`}
        };

        console.log("Created Game:");
        console.log(games[gameId]);


        // Send hints back to the player
        const firstHint = hints.shift(); // Get the first hint
        res.json({
            gameId,
            hint: "Choose a hint category!",
            hintsLeft: 5
        });
            } catch (error) {
            res.status(500).json({
                error: "Could not get Pokemon, Only enter Pokemon"
             });
            }
        });

//If-else statement is a Java Script statemnet, 
//In this case it's when you put in the right answer you get the right output, 
//but when you put in the wrong answer you get the other output or an error code message

//To guess the pokemon

app.get("/guess/:gameId/:guess", (req,res) => {
    const {gameId, guess} = req.params;
    const game = games[gameId];
    //When put the wrong id it gives the error code message
    if (!games[gameId]) {
        return res.status(404).json ({
            error: "Game not found :(." 
        });
    }
    //Makes it lower case 
    const normalizedGuess = guess.toLowerCase(); 
    //To store a guess
    game.guesses.push(normalizedGuess); 

    if (normalizedGuess === game.answer) {
        const wrongGuesses = game.guesses.length -1;

        let score = 100;
        score -= game.hintsUsed * 10;
        score -= wrongGuesses * 5;

        if (score < 0) {
            score = 0;
        }

        delete games[gameId]; //To end the game 
        return res.json({
            result: "correct",
            Score: Score,
            message: `You got the right pokemon! It was ${game.answer}. Score: ${score}`
        });
    } else {
        return res.json ({
            result: "wrong",
            message: "Try again or get another hint.",
            guesses: game.guesses
        })
    }
});

//Gets more hints 

app.get("/hint/:gameId", (req, res) => {
    const { gameId } = req.params;
    const game = games[gameId];

    if (!game) {
        return res.status(404).json({
            error: "Game not found"
        });
    }

    const nextHint = game.hints.shift();

    if (!nextHint) {
        return res.json({
            message: "No more hints :(.",
            hintsLeft: 0
        });
    }

    res.json({
        hint: nextHint,
        hintsLeft: game.hints.length
    });
});

app.get("/hint/:gameId/:category", (req, res) => {
    const {gameId, category} = req.params;
    const game = games[gameId];

    console.log("Category:", category);
    console.log("Game:", game);

    if (!game) {
        return res.status(404).json({
            message: "Game not found"
        });
    }

    game.hintsUsed++;

    const hintsLeft = Math.max(0, 5 - game.hintsUsed);

    switch (category) {
        case "type":
            console.log({
                hint: game.pokemon.type,
                hintsLeft});
            return res.json({
                hint: game.pokemon.type,
                hintsLeft
            });
        case "move":
            console.log({
                hint: game.pokemon.move,
                hintsLeft});
            return res.json({
                hint: game.pokemon.move,
                hintsLeft
            });
        case "generation":
            console.log({
                hint: game.pokemon.generation,
                hintsLeft});
            return res.json({
                hint: game.pokemon.generation,
                hintsLeft
            });
        case "foundin":
            console.log({
                hint: game.pokemon.foundIn,
                hintsLeft});
                return res.json({
                    hint: game.pokemon.foundIn,
                    hintsLeft
            });
        case "weight":
            console.log({
                hint: game.pokemon.weight,
                hintsLeft});
                return res.json({
                    hint: game.pokemon.weight,
                    hintsLeft
            });
        default:
            return res.status(400).json({
                message: "Invalid hint category"
            });
        }
});

    app.get("/giveup/:gameId", (req,res) => {
        const {gameId} = req.params;
        const game= games[gameId]
    //When put the wrong id it gives the error code message
        if (!game) {
            return res.status(404).json ({error: "Game not found." 
            });
        }

        delete games[gameId]; //To end the game 
        return res.json({
            result: "Gave up? Better luck next time.",
            message: `The pokemon was ${game.answer}`
        
    });
});

    app.listen(3000, () => {
        console.log("app is running on 3000");
    }); 

