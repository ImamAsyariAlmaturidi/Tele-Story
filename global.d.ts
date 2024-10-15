// @types/global.d.ts
import { Telegram } from "./Telegram";

declare global {
  interface Window {
    /**
     * Telegram Object
     */
    Telegram: Telegram;
  }
}
