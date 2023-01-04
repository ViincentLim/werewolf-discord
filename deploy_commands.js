const start = require('./commands/start')
const role = require('./commands/role')
const hello = require('./commands/hello')

const {DiscordRequest} = require("./discord_request");

async function createCommand(command) {
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
        const res = await DiscordRequest(globalEndpoint, {
            method: 'POST',
            body: command,
        });
        // console.log(await res.json());
    } catch (err) {
        console.error('Error installing commands: ', err);
    }
}

async function deleteCommand(commandName) {
    const appId = process.env['werewolf-discord_app-id'];
    // const guildId = process.env.GUILD_ID;

    /**
     * Globally-scoped slash commands (generally only recommended for production)
     * See https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
     */
    const globalEndpoint = `applications/${appId}/commands/${commandName}`;

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
        const res = await DiscordRequest(globalEndpoint, {
            method: 'DELETE',
        });
        // console.log(await res.json());
        // console.log('success')
    } catch (err) {
        console.error('Error deleting commands: ', err);
    }
}

[start, role, hello].forEach(command => {
    createCommand(command.data)
})
// deleteCommand("test")