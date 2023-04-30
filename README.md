# @bricked/bot-template

[![license](https://custom-icon-badges.demolab.com/github/license/brycked/bot-template?logo=law)](LICENSE.md)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![version](https://img.shields.io/npm/v/@bricked/bot-template?color=crimson&logo=npm)](https://www.npmjs.com/package/@bricked/bot-template)

A template for Discord.JS bots.

## ToDo

- [ ] [Create](https://github.com/brycked/bot-template/generate) a new repository from this template
- [ ] Find & replace `bot-template` with the name of the new repository
- [ ] Find & replace the description with a proper one
- [ ] Add `NPM_TOKEN` as a [new repository secret](https://github.com/brycked/bot-template/settings/secrets/actions/new)
- [ ] Add your bot [`TOKEN`](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-bot-s-token) as [environment variable](./.env)
- [ ] Add your [`MONGO_URI`](https://www.mongodb.com/docs/manual/reference/connection-string/) as [environment variable](./.env)
- [ ] Remove `"dryRun": true` from the [`package.json`](./package.json)
- [ ] Remove this section

## Usage

`bot-template` can be used as a template for Discord.JS bots.

## Building

### Building Publicly

Pulls to the repository will automatically be built with [semantic-release](https://github.com/semantic-release/npm).
The built package can be found on [npm](https://www.npmjs.com/package/@bricked/bot-template?activeTab=code) or in the
[latest github release](https://github.com/brycked/bot-template/releases/latest).

### Building Locally

The package can also be built locally using the `build` script.

```sh
npm run build
yarn run build
pnpm run build
```
