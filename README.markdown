# Elegant Expanding Textareas

## Description

**Elegant Expanding Textareas** is a jQuery 1.7+ plugin that implements the expanding textarea technique pioneered by [Neil Jenkins](http://nmjenkins.com/) in his A List Apart article [Expanding Text Areas Made Elegant](http://www.alistapart.com/articles/expanding-text-areas-made-elegant/).

## Usage

```html
<!-- somewhere in your head -->
<link rel="stylesheet" href="stylesheets/jquery.elegantExpandingTextareas.css">
<link rel="stylesheet" href="stylesheets/yourCustomStyles.css">
<!-- see stylesheets/jquery.elegantExpandingTextareas.customization.css for customization ideas -->

<script src="javascripts/jquery-1.7.js"></script>
<script src="javascripts/jquery.elegantExpandingTextareas.js"></script>

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
    // var customMirroringMethod = function(area, span) {
    //   span.text(area.val() + ' and some additional text')
    // }
    // var customActivationClass = 'evenMoreElegantlyExpanding'

    // var options = {
    //   method: customMirroringMethod,
    //   activeClass: customActivationClass
    // };

    // Bind directly...
    $('.expandingArea').expandElegantly(/* options */);

    // ...or use event delegatation (Not supported < IE9)
    $('#form').expandElegantly('.expandingArea'/*, options */);
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

Neil's technique improves upon the these techniques in several ways. First, it eliminates the need for polling by utilizing the `input` event (and IE's proprietary `onpropertychange` event) to handle the mirroring of content between the mirror element and the associated textarea.

Second, Neil's technique eliminates the need for a fudge factor by setting the textarea's width and height to 100% and positioning it absolutely over the mirror element inside of a relatively positioned container. When the container expands to fit the mirror, the textarea expands in turn, filling the container. **Nifty!**

Lastly, the technique degrades gracefully, leaving a normal textarea with a default height when Javascript is absent.

For a full overview of the technique and potential extensions, do yourself a favor and read the [original article](http://www.alistapart.com/articles/expanding-text-areas-made-elegant/).

## Contribution guidelines

Have a bug fix or a feature that you're dying to contribute to the project? Great! Follow these steps to ensure a timely response:

* Fork the official repository.
* Make your changes in a topic branch.
* Send a pull request.

That's it! If I have any questions or concerns, I'll address them in the pull request's comments.

## License

Copyright (c) 2011 Matt Hooks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.