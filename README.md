# Discord Bot 

A chat bot that can create aliases for API requests and tie them to in-chat slash commands. Once a user enters a slash command our bot grabs the action from our server and performs that specific command. Users have the choice of either `/ping`, `/help`, or `/APIEndpoint`.

## Authors

#### Micha, Michael Tiara

## Command Details

| invoke command | Bot responose                                                                                                                  |
|----------------|--------------------------------------------------------------------------------------------------------------------------------|
| /ping          | 'Pong!'                                                                                                                        |
| /help          | instructions for all commands                                                                                                  |
| /APIEndpoint   | Users can use this to return data from an api endpoint of their choice, they can additionally add parameters to their request. |

## How to use this as a templete!

# Installation

- Install [NPM](https://www.npmjs.com/) onto your command line
- Chose Code above the repo and enter this command into your terminal:
 ![gitClone](https://user-images.githubusercontent.com/90294860/164510188-de75ecd1-2f26-4058-a164-351b296079b3.png)

    `git clone https://github.com/Back-End-Masters/discord-bot.git`
- `cd discord-bot`
- `npm install`

# Usage 

- Initialize the package via `npm start`
- Use the /commands folder to create your own commands! Plug and play with our code until you find what works for you.
  - ![commands folder](https://user-images.githubusercontent.com/90294860/164510223-aabf8f49-ab72-4ef7-899c-a2c764c56712.png)
- Documentation from [Discord](https://discord.com/developers/docs/intro) and [Discord.js](https://discordjs.guide/additional-info/changes-in-v13.html#before-you-start) helped us with this portion.
- When on Discord Developer applications make sure you include the `guildId`, `clientId`, and `token` into an env file. That file must be in the same directory and the files that require variables from it.

![env sample](https://user-images.githubusercontent.com/90294860/164510718-2ebeff5e-e71a-4116-aada-06ff4480cc48.png)

‼️ **If you have never built a Discord bot before you may want to checkout their documenttation and example on [GitHub](https://github.com/discord/discord-example-app).** ‼️


## UML
![discordBotUML](https://user-images.githubusercontent.com/90294860/164507381-9e81fc4e-9e9b-4146-ad2f-f0083d03cd19.png)
