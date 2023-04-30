import { SapphireClient } from "@sapphire/framework";
import { ClientOptions, resolveColor } from "discord.js";

export class Client<Ready extends boolean = boolean> extends SapphireClient<Ready> {
  constructor(options: ClientOptions) {
    super(options);
    this.color = resolveColor(options.color ?? "Blurple");
  }

  get hexColor(): `#${string}` {
    return `#${this.color.toString(16).padStart(6, "0")}`;
  }
}
