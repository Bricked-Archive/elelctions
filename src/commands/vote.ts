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
        .addUserOption((builder) =>
          builder.setName("candidate").setDescription("Candidate to vote for").setRequired(true)
        )
    );
  }

  public override async chatInputRun(inter: Command.ChatInputCommandInteraction) {
    const candidate = inter.options.getUser("candidate")!;

    await Vote.deleteMany({
      electionId: inter.guildId,
      voterId: inter.user.id,
    });
    await Vote.create({
      electionId: inter.guildId,
      candidateId: candidate.id,
      voterId: inter.user.id,
    });

    const embed = new EmbedBuilder()
      .setDescription(`Successfully voted for ${candidate}!`)
      .setColor(Colors.Green);
    return inter.reply({ embeds: [embed], ephemeral: true });
  }
}
