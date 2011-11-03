# Elegant Expanding Textareas

## Description

*Elegant Expanding Textareas* is a jQuery plugin that implements the expanding textarea technique pioneered by [Neil Jenkins](http://nmjenkins.com/) in his A List Apart Article entitled [Expanding Text Areas Made Elegant](http://www.alistapart.com/articles/expanding-text-areas-made-elegant/).

## Usage

```html
<!-- somewhere in your head -->
<link rel="stylesheet" href="/stylesheets/jquery.elegantExpandingTextareas.css">
<script src="/javascripts/jquery.js"></script>
<script src="/javascripts/jquery.elegantExpandingTextareas.js"></script>

...

<!-- somewhere in your body -->
<div class="expandingArea">
  <pre><span></span><br></pre>
  <textarea></textarea>
</div>

...

<script>

  $(function() {
    $('.expandingArea').expandElegantly();
  });

</script>
```

## Browser support

This plugin should work in all browsers that support the `input` event and the CSS3 `box-sizing` property, including:

* Safari 5.0+
* Firefox 2.0+
* Chrome 4.0+
* IE8+ (with caveats)

## Summary of the technique

Previous techniques utilized an _offscreen mirror element_ and _polling_ to obtain the height and width of a block-level element mirroring the value of a textarea. This is inefficient, prone to errors and requires a 'fudge factor' which means the textarea is always slightly larger than the content that it holds.

Neil's technique improves upon the previous techniques in several ways. First, the technique eliminates the need for polling by utilizing the `input` event (and IE8+'s proprietary `onpropertychange` event) to handle mirroring content between our block-level mirror element and the associated textarea.

Second, the technique eliminates the need for a fudge factor and allows for effortless fluid height & width textareas by positioning the textarea absolutely on top the mirror element inside of a relatively positioned container and giving the textarea 100% height and width. As the mirror grows, the container expands to fit the mirror's contents which causes the textarea to expand in turn, filling the container.

Lastly, the technique degrades when there is no javascript, leaving a normal textarea with a set height.

For a full overview of the technique and potential extensions, do yourself a favor and read the [original article](http://www.alistapart.com/articles/expanding-text-areas-made-elegant/).