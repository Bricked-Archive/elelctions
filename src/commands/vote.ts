import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import Vote from "../schemata/vote";
import Candidate from "../schemata/candidate";
import { Colors, EmbedBuilder } from "discord.js";

@ApplyOptions<Command.Options>({
  description: "Vote for a candidate in the current election.",
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
          builder.setName("candidate").setDescription("Candidate to vote for").setRequired(true)
        )
    );
  }

  public override async chatInputRun(inter: Command.ChatInputCommandInteraction) {
    const { guildId } = inter;
    const election = inter.options.getString("election");
    const candidate = inter.options.getUser("candidate")!;

    if (!(await Candidate.exists({ guildId, election, candidateId: candidate.id }))) {
      const embed = new EmbedBuilder()
        .setDescription(`${candidate} doesn't participate!`)
        .setColor(Colors.Red);
      return inter.reply({ embeds: [embed], ephemeral: true });
    }

    await Vote.deleteMany({
      guildId,
      election: inter.guildId,
      voterId: inter.user.id,
    });
    await Vote.create({
      guildId,
      election: inter.guildId,
      candidateId: candidate.id,
      voterId: inter.user.id,
    });

    const embed = new EmbedBuilder()
      .setDescription(`Successfully voted for ${candidate} as **${election}**!`)
      .setColor(Colors.Green);
    return inter.reply({ embeds: [embed], ephemeral: true });
  }
}
