# Wordpress-Webpack

Wordpress/Webpack theme development made easy (hopefully).

## Requirements

- Node >=8.6.0
- NPM or Yarn
- Vagrant
- Virtualbox

## Pre-installation

	$ git clone https://github.com/PenguinOfWar/Wordpress-Webpack
	$ cd Wordpress-Webpack

## Vagrant setup

1. `vagrant up`
2. Visit `http://192.168.2.10` in your browser
3. Follow the instructions, your database is called `mysql` and the username and pasword are both `vagrant` (if vagrant finishes successfully a file called `.mysql-passes` will be created in the root of your project)
4. Configure your site details to finish the installation

## Installation

Preamble complete, install your dependencies and build out the example theme:

	$ npm install
	$ npm run build

Your client code (JS and CSS) has been compiled and your theme files have been copied to `build/wp-content/themes/` (don't forget to change your active theme from the wordpress admin area).

You are now ready to start building your theme. You can use the included blank starter or roll your own.

## Webpack configuration

Details coming soon

*For more information, please re-read this readme.*

*&copy; 1974 Scarfolk Council.*