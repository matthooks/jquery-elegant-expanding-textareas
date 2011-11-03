var getCarat;
getCarat = function(el) {
  var r, rc, re;
  if (el.selectionStart) {
    return el.selectionStart;
  } else if (document.selection) {
    el.focus();
    r = document.selection.createRange();
    if (r === null) {
      return 0;
    }
    re = el.createTextRange();
    rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);
    return rc.text.length;
  }
  return 0;
};
(function($) {
  return $.fn.expandingArea = function(options) {
    var placeFakeCarat, refresh, refreshMirror, settings;
    refresh = function(area, span) {
      return span.text(area.val());
    };
    refreshMirror = function(e) {
      var area, span;
      area = e.data[0];
      span = e.data[1];
      return settings.method.apply(this, [area, span]);
    };
    placeFakeCarat = function(e) {
      var area, clone, span;
      area = e.data[0];
      span = e.data[1];
      clone = e.data[2];
      return clone.html(area.val().substring(0, getCarat(e.srcElement)) + '<strong></strong>');
    };
    settings = {
      method: refresh
    };
    if (options != null) {
      $.extend(settings, options);
    }
    return this.each(function() {
      var area, clone, container, span;
      container = $(this);
      area = container.find('textarea');
      span = container.find('pre:not(.clone) span');
      clone = container.find('pre.clone span');
      area.bind('keyup', [area, span, clone], placeFakeCarat);
      area.bind('input', [area, span], refreshMirror);
      area.bind('onpropertychange', [area, span], refreshMirror);
      area.trigger('input', [area, span]);
      area.trigger('onpropertychange', [area, span]);
      return container.addClass('active');
    });
  };
})(jQuery);