define([
  'underscore',
  'jquery'
], function (
  _,
  $
) {

  'use strict';

  var GreenLantern = Make.It.Happen({
    url: 'internet'
  });

  return {
    jqueryVer: $.fn.version,
    offers: new GreenLantern()
  };
});
