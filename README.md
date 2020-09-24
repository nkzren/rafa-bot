# RAFA bot
RAFA: Robô Automatizador e Facilitador de Administração

Bot de Discord que auxilia em tarefas comuns em escritórios corporativos

## Requirements
- `git` command line installed (Downloads [here](https://git-scm.com/downloads))
- `node` [Version 8.0.0+](https://nodejs.org)
- A Discord bot application (create one [here](https://discordapp.com/developers/applications/) if you haven't yet)
- Your bot's Token
- Any text editor (Recommended: [VSCode](https://code.visualstudio.com/))

## Getting Started
> git clone https://gitlab.com/nkzren/rafa-bot.git

- Create a 'token.json' file in the project's root directory (**DO NOT share the token publicly, it will open your application up to hackers**)
```json
{
    "token": "YOUR TOKEN HERE"
}
```
- Create a 'config.js' file in the project's root directory. You can use the 'example_config.js' file already provided as base
```js
  const config = {
    prefix: '.',

    // Name of the moderator and admin roles
    moderator: 'Moderator',
    admin: 'Admin',
  }

module.exports = config;
```
- You're all set! Proceed to *Running the Application*

## Running the Application

> node index

## Assigning your bot to a Discord Guild
- On your bot's application page, go to 'OAuth2' setting
- On the 'Scope' Section, check the option 'bot'
- (Optional/Recommended) Customize your bot's permissions on the 'Bot Permissions' section

## FAQ
- What is the bot's token?
  - Access Tokens are used in token-based authentication to allow an application to access an API. The application receives an Access Token after a user successfully authenticates and authorizes access, then passes the Access Token as a credential when it calls the target API. The passed token informs the API that the bearer of the token has been authorized to access the API and perform specific actions specified by the scope that was granted during authorization. More on that [here](https://auth0.com/docs/tokens/access-tokens)