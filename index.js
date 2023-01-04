const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');


const app = express();

// app.get('/', (req, res) => {
//
// });

app.post('/interactions', verifyKeyMiddleware(process.env['werewolf-discord_public-key']), (req, res) => {
    const interaction = req.body;
    const { data } = interaction;

    // Different slash commands
    switch (data?.name) {
        case "role":
            res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Your role is ${"seer"}`,
                    flags: 1 << 6
                },
            });
            return
    }
});

app.listen(3000, () => {
    console.log('server started');
});
