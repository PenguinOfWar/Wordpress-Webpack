import 'babel-polyfill';
import $ from 'jquery';

import Example from './components/example';

__webpack_public_path__ = 'http://localhost:5000/bundled/'; // eslint-disable-line no-undef 

$(document).ready(() => {
  console.log('Working!');
  Example.init();
});