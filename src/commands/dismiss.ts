import { EmbedBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { Colors } from "discord.js";
import { PermissionsBitField } from "discord.js";
import { Candidate } from "../schemata/candidate";

@ApplyOptions<Command.Options>({
  description: "Dismiss a candidate from the current election.",
  requiredUserPermissions: ["Administrator"],
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
        .addUserOption((builder) =>
          builder.setName("candidate").setDescription("Candidate to dismiss").setRequired(true)
        )
        .setDefaultMemberPermissions(
          new PermissionsBitField(this.options.requiredUserPermissions).valueOf()
        )
    );
  }

  public override async chatInputRun(inter: Command.ChatInputCommandInteraction) {
    const candidate = inter.options.getUser("candidate");
    await Candidate.deleteOne({
      electionId: inter.guildId,
      userId: candidate?.id,
    });

    const embed = new EmbedBuilder()
      .setDescription(`${candidate} has successfully been dismissed!`)
      .setColor(Colors.Green);
    return inter.reply({ embeds: [embed], ephemeral: true });
  }
}
