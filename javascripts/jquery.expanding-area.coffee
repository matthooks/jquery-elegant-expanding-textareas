getCarat = (el) ->
  if el.selectionStart
    return el.selectionStart
  else if(document.selection)
    el.focus()

    r = document.selection.createRange()
    return 0 if r is null

    re = el.createTextRange()
    rc = re.duplicate()

    re.moveToBookmark(r.getBookmark())
    rc.setEndPoint('EndToStart', re)

    return rc.text.length
  return 0

(($) ->

  $.fn.expandingArea = (options) ->
    refresh = (area, span) ->
      span.text(area.val())

    refreshMirror = (e) ->
      area  = e.data[0]
      span  = e.data[1]

      settings.method.apply(this, [area, span])

    placeFakeCarat = (e) ->
      area = e.data[0]
      span = e.data[1]
      clone = e.data[2]

      clone.html(area.val().substring(0,getCarat(e.srcElement)) + '<strong></strong>')

    settings = {
      method: refresh
    }

    $.extend(settings, options) if options?

    return this.each () ->
      container = $(this)
      area = container.find('textarea')
      span = container.find('pre:not(.clone) span')
      clone = container.find('pre.clone span')

      area.bind('keyup', [area, span, clone], placeFakeCarat)

      area.bind('input', [area, span], refreshMirror)
      area.bind('onpropertychange', [area, span], refreshMirror)

      area.trigger('input', [area, span])
      area.trigger('onpropertychange', [area, span])

      container.addClass('active')
)(jQuery)

# function makeExpandingArea(container) {
#  var area = container.querySelector('textarea');
#  var span = container.querySelector('span');
#  if (area.addEventListener) {
#    area.addEventListener('input', function() {
#      span.textContent = area.value;
#    }, false);
#    span.textContent = area.value;
#  } else if (area.attachEvent) {
#    // IE8 compatibility
#    area.attachEvent('onpropertychange', function() {
#      span.innerText = area.value;
#    });
#    span.innerText = area.value;
#  }
#  // Enable extra CSS
#  container.className += ' active';
# }
#
# var areas = document.querySelectorAll('.expandingArea');
# var l = areas.length;
#
# while (l--) {
#  makeExpandingArea(areas[l]);
# }