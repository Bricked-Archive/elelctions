import { Client } from "./client";
import "dotenv/config";

const client = new Client({
  baseUserDirectory: __dirname,
  intents: [], // insert bot intents
  partials: [], // insert partial events

  color: "Blurple", // insert an accent color
  typing: true,
});

client.login(process.env.TOKEN);
