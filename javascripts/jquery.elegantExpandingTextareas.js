var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
(function($) {
  var ElegantExpander, ElegantExpansionDelegator, baseDefaults, mirrorContent, namespace;
  mirrorContent = function(area, span) {
    return span.text(area.val());
  };
  namespace = 'jQuery.elegantExpandingTextareas';
  baseDefaults = {
    method: mirrorContent,
    activeClass: 'expandsElegantly'
  };
  ElegantExpansionDelegator = (function() {
    function ElegantExpansionDelegator(container, opts) {
      var areas, elegantExpanders, selector;
      this.container = container;
      this.handleContentMirroring = __bind(this.handleContentMirroring, this);
      selector = opts.selector;
      this.options = $.extend({}, this.defaults, opts);
      this.container.on('input onpropertychange', selector, {}, this.handleContentMirroring);
      elegantExpanders = this.container.find(selector);
      elegantExpanders.addClass(this.options.activeClass);
      areas = elegantExpanders.find('textarea');
      areas.trigger('input');
      areas.trigger('onpropertychange');
    }
    ElegantExpansionDelegator.prototype.handleContentMirroring = function(e) {
      var area, span;
      area = $(e.target);
      span = area.siblings('pre').find('span');
      return this.options.method.apply(this, [area, span]);
    };
    ElegantExpansionDelegator.prototype.defaults = baseDefaults;
    return ElegantExpansionDelegator;
  })();
  ElegantExpander = (function() {
    function ElegantExpander(container, opts) {
      var area, span;
      this.container = container;
      this.handleContentMirroring = __bind(this.handleContentMirroring, this);
      this.options = $.extend({}, this.defaults, opts);
      area = this.container.find('textarea');
      span = this.container.find('span');
      this.container.addClass(this.options.activeClass);
      this.container.on('input onpropertychange', {
        area: area,
        span: span
      }, this.handleContentMirroring);
      area.trigger('input');
      area.trigger('onpropertychange');
    }
    ElegantExpander.prototype.handleContentMirroring = function(e) {
      var area, span;
      area = e.data.area;
      span = e.data.span;
      return this.options.method.apply(this, [area, span]);
    };
    ElegantExpander.prototype.defaults = baseDefaults;
    return ElegantExpander;
  })();
  return $.fn['expandElegantly'] = function(selector, options) {
    var klass;
    klass = ElegantExpansionDelegator;
    if (options != null) {
      options.selector = selector;
    } else {
      if ($.isPlainObject(selector) === true || !(selector != null)) {
        klass = ElegantExpander;
        options = selector;
      } else {
        options = {
          selector: selector
        };
      }
    }
    return this.each(function() {
      if (!$.data(this, namespace)) {
        return $.data(this, namespace, new klass($(this), options));
      }
    });
  };
})(jQuery);