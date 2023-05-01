import { EmbedBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { Colors } from "discord.js";
import { PermissionsBitField } from "discord.js";
import Candidate from "../schemata/candidate";

@ApplyOptions<Command.Options>({
  description: "Nominate a candidate for the current election.",
  requiredUserPermissions: ["Administrator"],
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((builder) =>
          builder
            .setName("election")
            .setDescription("The selection to nominate for.")
            .setAutocomplete(true)
            .setRequired(true)
        )
        .addUserOption((builder) =>
          builder.setName("candidate").setDescription("Candidate to nominate").setRequired(true)
        )
        .setDefaultMemberPermissions(
          new PermissionsBitField(this.options.requiredUserPermissions).valueOf()
        )
    );
  }

  public override async chatInputRun(inter: Command.ChatInputCommandInteraction) {
    const { guildId } = inter;
    const election = inter.options.getString("election");
    const candidate = inter.options.getUser("candidate");

    await Candidate.create({ guildId, election, candidateId: candidate?.id });

    const embed = new EmbedBuilder()
      .setDescription(`${candidate} has successfully been nominated for **${election}**!`)
      .setColor(Colors.Green);
    return inter.reply({ embeds: [embed], ephemeral: true });
  }
}
