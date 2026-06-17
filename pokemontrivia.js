import express from "express";
const app = express(); 

app.get("/", (req, res) => {
    res.send("Pokemon Trivia"); 
});

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

        // Send hints back to the player
        res.json({
            hints
        });


    } catch (error) {
        res.status(500).json({
            error: "Could not get Pokemon"
        });
    }
});