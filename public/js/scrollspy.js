/*
  Simple ScrollSpy implementation by Ren Aysha
  It updates the active links of the navigation based on your scroll position. 
  When a header tag is at the top of the viewport, it will highlight the navigation link that 
  has the href value of the header's ID.
  
  Usage: $( '.content' ).scrollspy();
  .content should contain several header tags - h1, h2, h3... Should have a navigation list with a 
  href value that corresponds to each header tag's ID.
  
  Example:
  
  <div class="content">
    <h1 id="hello-world">Hello World<h1>
    <p>Some lorem ipsum shit</p>
    <h1 id="hello-people">Hello People<h2>
    <p>Some lorem ipsum shit</p>
  </div>
  
  <div class="navigation">
    <ul>
      <li><a href="#hello-world">Hello World</a></li>
      <li><a href="#hello-people">Hello People</a></li>
    <ul>
  </div>
*/

if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() { }
    F.prototype = obj;
    return new F();
  };
}

(function ($, window, document, undefined) {
  "use strict";

  var ScrollSpy = {

    init: function (options, elem) {
      var self = this;

      self.elem = elem;
      self.$elem = $(elem);

      self.headers = self.$elem.find('h1, h2, h3, h4, h5, h6');

      self.spy();
    },

    spy: function () {
      var self = this, previous, current, list, top, prev;

      $(window).scroll(function (e) {
        // get all the header on top of the viewport
        current = self.headers.map(function (e) {
          if (($(this).offset().top - $(window).scrollTop()) < 10) {
            return this;
          }
        });
        // get only the latest header on the viewport
        current = $(current).eq(current.length - 1);

        if (current && current.length) {
          // get all li tag that contains href of # ( all the parents )
          list = $('li:has("a[href="#' + current.attr('id') + '"]")');

          if (prev !== undefined) {
            prev.removeClass('active');
          }

          list.addClass('active');
          prev = list;
        }
      });
    }
  };

  $.fn.scrollspy = function (options) {
    return this.each(function () {
      if (!$.data(this, 'scrollspy')) {
        var spy = Object.create(ScrollSpy);
        spy.init(options, this);
        $.data(this, 'scrollspy', spy);
      }
    });
  };

})(jQuery, window, document);