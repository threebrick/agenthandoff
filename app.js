"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const builder = require("botbuilder");
const handoff_1 = require("./handoff");
const commands_1 = require("./commands");
//=========================================================
// Bot Setup
//=========================================================
const app = express();
// Setup Express Server
app.listen(process.env.port || process.env.PORT || 3978, '::', () => {
    console.log('Server Up');
});
// Create chat bot
const connector = new builder.ChatConnector({
    appId: '5e2e50e0-1585-49fc-ada7-3d48e1570a66',
    appPassword: 'DMShbPiq4zafWT38TzA9oeL'
});
const bot = new builder.UniversalBot(connector, [
    function (session, args, next) {
        session.send('Echo ' + session.message.text);
    }
]);
app.post('https://radiant-escarpment-99255.herokuapp.com/api/messages', connector.listen());
// Create endpoint for agent / call center
app.use('/webchat', express.static('public'));
// replace this function with custom login/verification for agents
const isAgent = (session) => session.message.user.name.startsWith("Agent");
const handoff = new handoff_1.Handoff(bot, isAgent);
//========================================================
// Bot Middleware
//========================================================
bot.use(commands_1.commandsMiddleware(handoff), handoff.routingMiddleware());

server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));
