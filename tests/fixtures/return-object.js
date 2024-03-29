define([
  'underscore',
  'jquery'
], function (
  _,
  $
) {

  'use strict';

  const GreenLantern = Make.It.Happen({
    url: 'internet'
  });

  return {
    jqueryVer: $.fn.version,
    offers: new GreenLantern(),
    isMovieOk: true
  };
});
