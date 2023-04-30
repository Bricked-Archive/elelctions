import { EmbedBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";

@ApplyOptions<Command.Options>({
  description: "Play ping pong! 🏓",
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
    );
  }

  public override async chatInputRun(inter: Command.ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(inter.client.color)
      .setTitle("Ping")
      .setDescription("*Pong!* 🏓");
    return inter.reply({ embeds: [embed] });
  }
}
