import { ApplyOptions } from "@sapphire/decorators";
import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { AutocompleteInteraction, type ApplicationCommandOptionChoiceData } from "discord.js";
import Candidate from "../schemata/candidate";

@ApplyOptions<InteractionHandler.Options>({
  interactionHandlerType: InteractionHandlerTypes.Autocomplete,
})
export class AutocompleteHandler extends InteractionHandler {
  public override async run(
    interaction: AutocompleteInteraction,
    result: ApplicationCommandOptionChoiceData[]
  ) {
    return interaction.respond(result);
  }

  public override async parse(inter: AutocompleteInteraction) {
    if (!["nominate", "dismiss", "vote", "results"].includes(inter.commandName)) return this.none();

    const focusedOption = inter.options.getFocused(true);
    if (focusedOption.name !== "election") return this.none();

    const { guildId } = inter;
    const candidates = await Candidate.find({ guildId }, { election: 1 });

    const elections = [...new Set(candidates.map((candidate) => candidate.election))]
      .filter((election) => election.includes(focusedOption.value))
      .map((election) => ({ name: election, value: election }));

    return this.some(elections);
  }
}
