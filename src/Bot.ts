import { Client, ClientOptions } from 'discord.js';
import 'dotenv/config';
import ready from './listeners/ready';

const token = process.env.DISCORD_TOKEN;

console.log('Bot is starting...');

const client = new Client({
  intents: [],
});

ready(client);

client.login(token);

// https://discord.com/api/oauth2/authorize?client_id=1154796838319304746&permissions=2048&scope=bot%20applications.commands