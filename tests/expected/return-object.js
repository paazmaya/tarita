import _ from 'underscore';
import $ from 'jquery';
'use strict';
var GreenLantern = Make.It.Happen({ url: 'internet' });
export default {
  jqueryVer: $.fn.version,
  offers: new GreenLantern(),
  isMovieOk: true
};
