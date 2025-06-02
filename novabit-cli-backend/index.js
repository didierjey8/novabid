#!/usr/bin/env node

require("dotenv").config();
const axios = require("axios");
const readline = require("readline");
const { v4: uuidv4 } = require("uuid");
const chalk = require("chalk");
const figures = require("figures");

const WEBHOOK_URL = process.env.WEBHOOKN8N;
const conversationId = uuidv4();

async function sendMessage(message) {
  try {
    const response = await axios.post(WEBHOOK_URL, {
      message,
      id: conversationId,
    });

    if (response.status === 200 && response.data?.text) {
      console.log(`\n${chalk.green(figures.tick)} ${chalk.bold("NovaBot Response:")}`);
      console.log(`${chalk.cyanBright(response.data.text)}\n`);
      return true;
    } else {
      console.error(`${chalk.red(figures.cross)} ${chalk.red("Webhook error")}: ${response.statusText}`);
      return false;
    }
  } catch (err) {
    console.error(`${chalk.red(figures.cross)} ${chalk.red("Failed to send message")}: ${err.message}`);
    return false;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  text: process.stdout,
  prompt: chalk.magenta("> "),
});

(async () => {
  console.log(`${chalk.blueBright("🌐 Connecting to NovaBot...")}`);
  const success = await sendMessage("Hello, I am a nova deployer user");

  if (!success) {
    console.error(chalk.red("❌ Failed to start conversation."));
    process.exit(1);
  }

  console.log(chalk.gray("──────────── Conversation started ────────────"));
  console.log(`${chalk.yellow("🤖 Type your message. Type")} ${chalk.bold('"exit"')} ${chalk.yellow("to quit.")}`);
  rl.prompt();

  rl.on("line", async (line) => {
    const trimmed = line.trim();
    if (trimmed.toLowerCase() === "exit") {
      console.log(`\n${chalk.greenBright(figures.star)} ${chalk.bold("Exiting... See you later!")}`);
      rl.close();
      return;
    }

    const ok = await sendMessage(trimmed);
    if (!ok) {
      console.error(chalk.red("❌ Failed to send message."));
    }
    rl.prompt();
  });
})();
