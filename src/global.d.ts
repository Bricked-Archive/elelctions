import { SapphireClientOptions } from "@sapphire/framework";

declare module "discord.js" {
  interface Client {
    color: number;
    hexColor: `#${string}`;
  }

  interface ClientOptions extends SapphireClientOptions {
    /** @default "Blurple" */
    color?: ColorResolvable;
  }
}
