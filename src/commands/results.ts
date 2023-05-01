import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { Collection, Colors, EmbedBuilder, userMention } from "discord.js";
import Vote from "../schemata/vote";
import Candidate from "../schemata/candidate";

@ApplyOptions<Command.Options>({
  description: "See how the election is going",
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
    const candidates = await Candidate.find({ electionId: inter.guildId }, { candidateId: 1 });
    const rawVotes = candidates.map(
      async ({ candidateId }) =>
        [candidateId, await Vote.count({ electionId: inter.guildId, candidateId })] as const
    );
    const votes = new Collection<string, number>(await Promise.all(rawVotes));
    const sorted = votes.sort((first, second) => second - first);

    const description = sorted
      .map((count, candidate) => `${userMention(candidate)}: **${count}**`)
      .join("\n");

    const embed = new EmbedBuilder()
      .setTitle("Results")
      .setDescription(description || "There aren't any votes yet!")
      .setColor(description ? inter.client.color : Colors.Red);
    await inter.reply({ embeds: [embed], ephemeral: true });
  }
}
