// app/api/bot/route.js

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Bot, InlineKeyboard, webhookCallback } from "grammy";

const bot = new Bot("8179858662:AAHCbffRvIyBpduf32GmxeqtdmGhjB8nLL8");

bot.command("start", async (ctx) => {
  const inlineKeyboard = new InlineKeyboard().url(
    "Open App",
    "https://t.me/storytele_bot?startapp"
  );

  await ctx.reply(
    "Please click a button open app, for launch tele story app. enjoy 😋😋",
    {
      reply_markup: inlineKeyboard,
    }
  );
});

// Menghandle update dari Telegram
export const POST = webhookCallback(bot, "std/http");
