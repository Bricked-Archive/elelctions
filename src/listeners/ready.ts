import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import type { Client } from "discord.js";
import chalk from "chalk";

@ApplyOptions<Listener.Options>({ name: "ready" })
export class ReadyListener extends Listener {
  public run(client: Client<true>) {
    const name = client.user.tag;
    const color = client.hexColor;
    this.container.logger.info(`Successfully logged in as ${chalk.hex(color)(name)}!`);
  }
}
