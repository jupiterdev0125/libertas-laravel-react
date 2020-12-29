<p align="center"><img src="https://cdn.discordapp.com/attachments/718675104942522375/775375035053375488/160493408854464187.png" width="400"></p>

# Libertas
Libertas is focused on liberating the experience of every Discord user through an innovative, fully-customizable, and user-oriented bot: The Libertas Bot.

## Requirements
- PHP 7.4
- MySQL 8.0
- Composer
- npm

## Setup
The first step is to create a MySQL schema.
```sql
CREATE SCHEMA `libertas`;
```

Once that's done you'll need to rename the `.env.example` file, which is located in the root directory of the project, to `.env`. Make sure that you have all database, [Discord](https://discord.com/developers/applications) & [Twitch](https://dev.twitch.tv/console/apps) environment variables assigned with the correct values.

The final step is to run the following commands in the root directory of the project.
```
composer install
npm install
npm run dev
php artisan migrate --seed
php artisan storage:link
php artisan serve
```
