# Wordpress-Webpack

Wordpress/Webpack theme development made easy (hopefully).

## But why?

To give myself and my colleagues a (slightly opinionated) tool for creating Wordpress themes from scratch using the tools we are already familiar with - Webpack, Babel, and SASS.

## Requirements

- Node >=12.15.0
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

Your client code (JS and CSS) has been compiled and your theme files have been copied to `build/wp-content/themes/` (don't forget to change your active theme from the wordpress admin area).

You are now ready to start building your theme. You can use the included blank starter or roll your own.

After the initial install and build, you can leverage `webpack-dev-server` to faciliate your local template development.

    $ npm run start

When you are ready to build a release ready theme package, use the `release` script.

    $ npm run release

Your themes will be compiled out to the `./release` directory, ready for production.

## In The Box

By default, the base theme is a custom flavour of [HTML5 Blank](http://html5blank.com) more tailored to the development concepts within this framework, however you may use whatever theme you want by including it in the `src/themes` directory and setting the correct configuration in `config.js`.

Note that using a custom theme will entail some setup, and you should consult/copy `load_css_js` within `functions.php` in the example theme.

For the rest, `react` and `jquery` are provided purely as sample vendor files for the purposes of demonstration. You may use them, or not, as your project requires. If you add new dependencies and want them to be compiled into the `vendor` output then make sure you update the theme config in `config.js`.

## Webpack configuration

Details coming soon (swearsie realsies), for now please consult the comments in `config.js` (sorry).

## TODO

- [ ] Expose additional webpack configuration options via config.js
- [ ] Update readme instructions
- [ ] Add readme section with guide for custom theme integration
- [ ] Update HTML5 Blank Stable theme and provide automatic pulling of latest version
- [ ] Smart code splitting
- [ ] Update Ubuntu box

## BUGS

- [ ] Webpack is still looking for hot update JSON for SASS changes

## License

### MIT License

Copyright (c) 2020 Darryl Walker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

_For more information, please re-read this readme._

_&copy; 1974 Scarfolk Council._
