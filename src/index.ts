import express, {Request, Response} from "express"
import {
    InteractionResponseType,
    InteractionType,
    verifyKeyMiddleware
} from 'discord-interactions'
import * as path from "path"
import * as fs from "fs"
import {Command} from "./discord/command";
import {GameState} from "./game/game";
import * as dotenv from "dotenv"
import {
    ApplicationCommandData, ApplicationCommandInteraction,
    Interaction,
    InteractionResponse,
    Message,
    MessageComponentInteraction
} from "./discord/interaction";
import {newCommandId, wwGuildId} from "./game/game_constants";
import {gameStatesPath, wwChannelPath} from "./firebase/firebase_setup";
import NewCommand from "./commands/new";
import {setUpExtensions} from "./utility/extension";
import WerewolfVote from "./message_component/werewolf_vote";

const app = express();
dotenv.config();
setUpExtensions()

// app.get('/', (req, res) => {
//
// });
const gameStatesPromise = new Promise<{ [key: string]: GameState }>(async (resolve, reject) => {
    try {
        let gameStates = (await gameStatesPath.get()).val()
        resolve(gameStates)
    } catch (e) {
        reject(e)
    }
})

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

async function handleAppCommand(interaction: ApplicationCommandInteraction): Promise<InteractionResponse> {
    const data: ApplicationCommandData = interaction.data
    const commandName = data?.name;

    let gameState: GameState;
    if (interaction.guild_id === wwGuildId) {
        const wwChannel = interaction.channel_id;
        interaction.channel_id = (await wwChannelPath.child(wwChannel).get()).val()
    }
    if (!(await gameStatesPromise)[interaction.channel_id]) {
        (await gameStatesPromise)[interaction.channel_id] = (await gameStatesPath.child(interaction.channel_id).get()).val()
    }
    // TODO: deal with dm vs channel commands (user vs member in interaction)
    gameState = (await gameStatesPromise)[interaction.channel_id];

    let reply: InteractionResponse
    // Handle different slash commands
    if (!gameState && commandName !== NewCommand.data.name) {
        // only allow "/new", else return and ask user to create new game first
        reply = {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Please use </new:${newCommandId}> to create a new game.`
            }
        };
    } else {
        reply = {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: (await commands.get(commandName)?.execute(interaction, gameState)) || {}
        }
        if (gameState) {
            await gameStatesPath.child(interaction.channel_id).set(gameState)// or dont await
        }
    }
    return reply
}

async function handleMessageComponent(interaction: MessageComponentInteraction): Promise<InteractionResponse> {
    const interactionData = interaction.data
    let reply: Message

    switch (interactionData.custom_id) {
        // todo, handle this dynamically
        // todo, if message componenet from werewolf channel, then find gameState from wwChannelPath in db
        case WerewolfVote.data.name:
            const gameState: GameState = (await gameStatesPath.child((await wwChannelPath.child(interaction.channel_id).get()).val()).get()).val()
            reply = await WerewolfVote.execute(interaction, gameState)
            break
        default:
            reply = {}
            break
    }
    return {
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: reply
    }
}

app.post('/interactions', verifyKeyMiddleware(process.env['werewolf-discord_public-key'] || ""), async (req: Request, res: Response) => {
    const interaction: Interaction = req.body;
    // TODO: handle werewolf channel vs game channel vs dm
    // const channelId = interaction.channel_id;
    switch (interaction.type) {
        case InteractionType.APPLICATION_COMMAND:
        case InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE:
            res.send(await handleAppCommand(interaction as ApplicationCommandInteraction));
            break
        case InteractionType.MESSAGE_COMPONENT:
            // todo: for dropdown and checkboxes
            res.send(await handleMessageComponent(interaction as MessageComponentInteraction))
            break
    }
});

app.listen(3000, () => {
    console.log('server started');
});