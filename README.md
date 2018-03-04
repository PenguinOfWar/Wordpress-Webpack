# Wordpress-Webpack

Wordpress/Webpack theme development made easy (hopefully).

## But why?

To teach myself a bit more about webpack, and to give myself and my colleagues a (slightly opinionated) tool for creating Wordpress themes from scratch using the tools we are already familiar with - Webpack, Babel, and SASS.

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

Details coming soon, for now please consult the comments in `config.js`.

*For more information, please re-read this readme.*

## TODO

- [x] ~~Webpack 4~~
- [ ] Expose additional webpack configuration options via config.js
- [x] ~~Manifest generation with environment variables~~
- [x] ~~Example template integration with manifest~~
- [ ] Cache-buster fingerprints for static assets
- [ ] Livereload for CSS changes on local
- [ ] Update readme instructions

## BUGS

- [ ] Livereload beta is failing with missing hot update JSON

*For more information, please re-read this readme.*

*&copy; 1974 Scarfolk Council.*
