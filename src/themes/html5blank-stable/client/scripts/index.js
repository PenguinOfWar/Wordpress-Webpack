import $ from 'jquery';

import Example from './components/example';

__webpack_public_path__ = 'http://localhost:5000/html5blank-stable/bundled/'; // eslint-disable-line no-undef

$(document).ready(() => {
  console.log('Working!');
  Example.init();
});

if (module.hot) {
  module.hot.accept();
}
