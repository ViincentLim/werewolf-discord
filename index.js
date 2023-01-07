const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');
const path = require("path");
const fs = require("fs");

const app = express();

const admin = require("firebase-admin");
const dotenv = require('dotenv');
dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)),
    // credential: applicationDefault(),
    databaseURL: "https://were-wolves-default-rtdb.firebaseio.com"
});

// app.get('/', (req, res) => {
//
// });
const db = admin.database()
const gameStates = {}

function getCommands() {
    const commands = new Map()
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
    return commands;
}

const commands = getCommands();

const gameStatesPath = db.ref('games');
app.post('/interactions', verifyKeyMiddleware(process.env['werewolf-discord_public-key']), async (req, res) => {
    const interaction = req.body;
    const { data } = interaction;
    const channelId = interaction.channel_id;

    if (!gameStates[channelId]) {
        gameStates[channelId] = (await gameStatesPath.child(channelId).get()).val()
    }

    // Handle different slash commands
    const gameState = gameStates[channelId];
    const reply = await commands.get(data?.name)?.execute(interaction, gameState);
    await gameStatesPath.child(channelId).set(gameState)
    res.send(reply)
});

app.listen(3000, () => {
    console.log('server started');
});