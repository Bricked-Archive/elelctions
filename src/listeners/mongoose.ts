import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { connect } from "mongoose";
import chalk from "chalk";

@ApplyOptions<Listener.Options>({ event: "ready", name: "mongoose" })
export class MongooseListener extends Listener {
  public override async run() {
    await connect(process.env.MONGO_URI!);
    const name = process.env.MONGO_URI?.split("://")[1].split(":")[0];
    this.container.logger.info(`Successfully connected to MongoDB as ${chalk.dim(name)}!`);
  }
}
