import fetch, {Response} from "node-fetch"
import {HtmlMethod} from "./enums";

export async function DiscordRequest({endpoint, body, method}: { endpoint: string, body?: any, method: HtmlMethod }): Promise<Response> {
    // append endpoint to root API URL
    const url = 'https://discord.com/api/v10/' + endpoint;
    const options: any = {method: method}
    // Stringify payloads
    if (body) options.body = JSON.stringify(body);
    // Use node-fetch to make requests
    const res: Response = await fetch(url, {
        headers: {
            'Authorization': `Bot ${process.env['werewolf-discord_token']}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (https://github.com/ViincentLim/werewolf-discord, 1.0.0)',
        },
        ...options
    });
    // throw API errors
    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }
    // return original response
    return res;
}