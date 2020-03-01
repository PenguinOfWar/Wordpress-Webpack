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

_For more information, please re-read this readme._

## TODO

- [ ] Expose additional webpack configuration options via config.js
- [ ] Update readme instructions

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
