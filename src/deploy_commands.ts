import {DiscordRequest} from "./discord_request"
const path = require("path");
const fs = require("fs");
import {HtmlMethod} from "./enums"

// async function createCommand(command: {}) {
//     const appId = process.env['werewolf-discord_app-id'];
//     // const guildId = process.env.GUILD_ID;
//
//     /**
//      * Globally-scoped slash commands (generally only recommended for production)
//      * See https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
//      */
//     const globalEndpoint = `applications/${appId}/commands`;
//
//     /**
//      * Guild-scoped slash commands
//      * See https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command
//      */
//     // const guildEndpoint = `applications/${appId}/guilds/${guildId}/commands`;
//     // const commandBody = {
//     //     name: 'test',
//     //     description: 'Just your average command',
//     //     // chat command (see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)
//     //     type: 1,
//     // };
//
//     try {
//         // Send HTTP request with bot token
//         const res = await DiscordRequest({
//             endpoint: globalEndpoint,
//             method: Html_Method.POST,
//             body: command,
//         });
//         console.log(await res.json());
//     } catch (err) {
//         console.error('Error installing commands: ', err);
//     }
// }
//
// async function deleteCommand(commandName: string) {
//     const appId = process.env['werewolf-discord_app-id'];
//     // const guildId = process.env.GUILD_ID;
//
//     /**
//      * Globally-scoped slash commands (generally only recommended for production)
//      * See https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
//      */
//     const globalEndpoint = `applications/${appId}/commands/${commandName}`;
//
//     /**
//      * Guild-scoped slash commands
//      * See https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command
//      */
//     // const guildEndpoint = `applications/${appId}/guilds/${guildId}/commands`;
//     // const commandBody = {
//     //     name: 'test',
//     //     description: 'Just your average command',
//     //     // chat command (see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)
//     //     type: 1,
//     // };
//
//     try {
//         // Send HTTP request with bot token
//         const res = await DiscordRequest({
//             endpoint: {
//                 endpoint: globalEndpoint,
//                 method: Html_Method.DELETE,
//             }
//         });
//         console.log(await res.json());
//         // console.log('success')
//     } catch (err) {
//         console.error('Error deleting commands: ', err);
//     }
// }

async function overwriteAllCommands(commands: {}[]) {
    const appId = process.env['werewolf-discord_app-id'];
    // const guildId = process.env.GUILD_ID;

    /**
     * Globally-scoped slash commands (generally only recommended for production)
     * See https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
     */
    const globalEndpoint = `applications/${appId}/commands`;

    /**
     * Guild-scoped slash commands
     * See https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command
     */
    // const guildEndpoint = `applications/${appId}/guilds/${guildId}/commands`;
    // const commandBody = {
    //     name: 'test',
    //     description: 'Just your average command',
    //     // chat command (see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)
    //     type: 1,
    // };

    try {
        // Send HTTP request with bot token
        const res = await DiscordRequest({
            endpoint: globalEndpoint,
            method: HtmlMethod.PUT,
            body: commands,
        });
        console.log(await res.json());
    } catch (err) {
        console.error('Error installing commands: ', err);
    }
}

const commandsPath = path.join(__dirname, 'commands');
const commandFiles: string[] = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.js'));
// console.log(commandFiles)
// for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath);
//     createCommand(command.data).then(console.log)
// }

// [start, role, hello].forEach(command => {
//     createCommand(command.data)
// })
// deleteCommand("test")

overwriteAllCommands(commandFiles.map((file: string) => {
    const commandFilePath = path.join(commandsPath, file);
    const command = require(commandFilePath);
    return command.data;
}))