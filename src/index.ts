import express from "express"
import {Request, Response} from "express";
// import { InteractionType, InteractionResponseType, verifyKeyMiddleware } from 'discord-interactions'
import {InteractionType, verifyKeyMiddleware} from 'discord-interactions'
import * as path from "path"
import * as fs from "fs"
import {Command} from "./discord/command";
import {GameState} from "./game/game";
// import {Database} from "firebase-admin/lib/database";
import * as dotenv from "dotenv"
import * as admin from "firebase-admin"
import {database} from "firebase-admin";
import Database = database.Database;
import {Interaction} from "./discord/interaction";

const app = express();

dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || "")),
    // credential: applicationDefault(),
    databaseURL: "https://were-wolves-default-rtdb.firebaseio.com"
});

// app.get('/', (req, res) => {
//
// });
const db : Database = admin.database()
// const gameStates: {[key: string]: GameState} = {}
const gameStates: {[key: string]: GameState} = {}

function getCommands() {
    const commands: Map<string, Command> = new Map()
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command: Command = require(filePath).default;
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
console.log(commands.keys())
console.log("hello?")

const gameStatesPath = db.ref('games');
app.post('/interactions', verifyKeyMiddleware(process.env['werewolf-discord_public-key'] || ""), async (req: Request, res: Response) => {
    const interaction: Interaction = req.body;
    const { data, channel_id } = interaction;
    // const channelId = interaction.channel_id;
    const commandName = data?.name;

    if (!gameStates[channel_id]) {
        gameStates[channel_id] = (await gameStatesPath.child(channel_id).get()).val()
    }
    // TODO: deal with dm vs channel commands (user vs member in interaction)
    // Handle different slash commands
    const gameState = gameStates[channel_id];
    if (!gameState) {
        // only allow "/new", else return and ask user to create new game first
    }
    switch (interaction.type) {
        case InteractionType.APPLICATION_COMMAND:
        case InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE:
            const reply = await commands.get(commandName)?.execute(interaction, gameState);
            await gameStatesPath.child(channel_id).set(gameState)// or dont await
            res.send(reply)
            break
        case InteractionType.MESSAGE_COMPONENT:
            // todo: for dropdown and checkboxes
            break
    }
});

app.listen(3000, () => {
    console.log('server started');
});