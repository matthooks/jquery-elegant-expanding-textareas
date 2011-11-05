(($) ->

  mirrorContent = (area, span) ->
    span.text(area.val())

  namespace = 'jQuery.elegantExpandingTextareas'

  baseDefaults =
    method: mirrorContent
    activeClass: 'expandsElegantly'

  class ElegantExpansionDelegator
    constructor: (@container, opts) ->
      # Selector is a special option, grab that first
      selector = opts.selector

      @options = $.extend({}, @defaults, opts)

      # Set up the appropriate event delegation
      @container.on('input onpropertychange', selector, {}, @handleContentMirroring)

      # Activate the containers
      elegantExpanders = @container.find(selector)
      elegantExpanders.addClass(@options.activeClass)

      # Trigger the events once to seed the mirror element
      areas = elegantExpanders.find('textarea')
      areas.trigger('input')
      areas.trigger('onpropertychange')

    handleContentMirroring: (e) =>
      area = $(e.target)
      span = area.siblings('pre').find('span')
      @options.method.apply(this, [area, span])

    defaults: baseDefaults

  class ElegantExpander
    constructor: (@container, opts) ->
      @options = $.extend({}, @defaults, opts)

      # Find the textarea and mirror element
      area = @container.find('textarea')
      span = @container.find('span')

      # Activate the container
      @container.addClass(@options.activeClass)

      # Set up the appropriate event bindings
      @container.on('input onpropertychange', { area: area, span: span }, @handleContentMirroring)

      # Trigger the events once to seed the mirror element
      area.trigger('input')
      area.trigger('onpropertychange')

    handleContentMirroring: (e) =>
      area = e.data.area
      span = e.data.span

      @options.method.apply(this, [area, span])

    defaults: baseDefaults

  $.fn['expandElegantly'] = (selector, options) ->
    # Assume delegation
    klass = ElegantExpansionDelegator

    if options?
      # Options exists, assign the appropriate selector
      options.selector = selector
    else
      # Options doesn't exist
      if $.isPlainObject(selector) is true || not selector?
        # If the selector is an object literal or is missing, assume event binding
        klass = ElegantExpander
        options = selector
      else
        # Otherwise, set up default options
        options = { selector: selector }

    # Maintain chainability
    return this.each () ->
      # Protect against multiple instantiations
      unless $.data(this, namespace)
        $.data(this, namespace, new klass($(this), options))
)(jQuery)