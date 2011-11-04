# Elegant Expanding Textareas

## Description

**Elegant Expanding Textareas** is a jQuery plugin that implements the expanding textarea technique pioneered by [Neil Jenkins](http://nmjenkins.com/) in his A List Apart article [Expanding Text Areas Made Elegant](http://www.alistapart.com/articles/expanding-text-areas-made-elegant/).

## Usage

```html
<!-- somewhere in your head -->
<link rel="stylesheet" href="/stylesheets/jquery.elegantExpandingTextareas.css">
<script src="/javascripts/jquery-1.7.js"></script>
<script src="/javascripts/jquery.elegantExpandingTextareas.js"></script>

...

<!-- somewhere in your body -->
<form id="form">
  ...
  <div class="expandingArea">
    <pre><span></span><br></pre>
    <textarea></textarea>
  </div>
  ...
</form>

...

<script>

  $(function() {
    var options = {};
    
    // Bind to the first element returned by a jQuery selector...
    $('.expandingArea').expandElegantly(options);
    
    // ...or delegate the event to a container for efficient use with multiple textareas
    $('#form').expandElegantly('.expandingArea', options);
  });

</script>
```

## Browser support

This plugin should work in all browsers that support the `input` event and the CSS3 `box-sizing` property, including:

* Safari 5.0+
* Firefox
* Chrome
* IE8+ (event delegation is only supported IE9+, IE9 has quirks with text deletion)

## Summary of the technique

Previous techniques for expanding textareas generally utilized `setTimeout` polling to obtain the height and width of a block-level "mirror" element whose inner text matched the value of a textarea at regular intervals. This is inefficient and requires a "fudge factor" which causes the textarea to always be slightly larger than the content it holds. **How unsightly!**

Neil's technique improves upon the these techniques in several ways. First, it eliminates the need for polling by utilizing the `input` event (and IE8+'s proprietary `onpropertychange` event) to handle the mirroring of content between the mirror element and the associated textarea.

Second, Neil's technique eliminates the need for a fudge factor by setting the textarea's width and height to 100% and positioning it absolutely over the mirror element inside of a relatively positioned container. When the container expands to fit the mirror, the textarea expands in turn, filling the container. **Nifty!**

Lastly, the technique degrades gracefully, leaving a normal textarea with a default height when Javascript is absent.

For a full overview of the technique and potential extensions, do yourself a favor and read the [original article](http://www.alistapart.com/articles/expanding-text-areas-made-elegant/).