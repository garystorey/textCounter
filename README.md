textCounter
===========
A jQuery plugin to count the number of characters allowed in input fields and textareas similar to Twitter but with more options and flexibility.

Usage and Examples
------------------------------
The simplest usage is:

    $('selector').textCounter();

More complex examples can be found at <a href="http://garystorey.com/textCounter/">GaryStorey.com</a>.


Options and the Default Values
------------------------------
This section will show you the basics of how to configure the textCounter plugin.  The following is a list of all the options available and their default values:

<table cellspacing="0" cellpadding="0"><caption>Options and Defaults</caption>
<thead>
    <tr><th>Option</th><th>Description</th><th>Default</th></tr>
</thead>
<tbody>
	<tr><td>defaultClass</td><td>The default class used for the text counter. Unless overridden, the same class will be used for all textCounter objects.</td><td>textCounter</td></tr>
	<tr><td>counterWarningClass</td><td>The class to apply to the text counter element when the warnAt value has been met or passed.</td><td>counterWarning</td></tr>
	<tr><td>txtWarningClass</td><td>The class to apply to the textarea/input element when the warnAt value has been met or passed.</td><td>txtWarning</td></tr>
	<tr><td>counterPatternClass</td><td>The class to apply to the textPattern <div> when the warnAt value has been met or passed.</td><td>counterTextPattern</td></tr>
	<tr><td>progressBarClass</td><td>The default class used for the progress bar <span>. </td><td>counterProgressBar</td></tr>
	<tr><td>transition</td><td>The transition to use when showing the text counter. Possible values include:  <em>none</em>, <em>fadeToggle</em>, <em>slideToggle</em> or any defined jQuery toggle method.</td><td>slideToggle</td></tr>
	<tr><td>easing</td><td>The easing mode the transition should use.  Possible values include <em>swing</em> and <em>linear</em>.  Additional options are available via jQuery UI.</td><td>swing</td></tr>
	<tr><td>transitionSpeed</td><td>In milliseconds the amount of time for the transition to last.</td><td>200</td></tr>
	<tr><td>posX</td><td>The X-axis where the counter should appear.  Possible values include: <em>left</em>, <em>center</em> , <em>right</em>, or any <em>integer</em>.</td><td>right</td></tr>
	<tr><td>posY</td><td>The Y-axis where the counter should appear. Possible values include: <em>top</em>, <em>center</em> , <em>bottom</em>, or any <em>integer</em></td><td>bottom</td></tr>
	<tr><td>posXoffset</td><td>The number of pixels on the X-axis to move the counter from it's default position of <strong>posX</strong>.</td><td>0</td></tr>
	<tr><td>posYoffset</td><td>The number of pixels on the Y-axis to move the counter from it's default position of <strong>posY</strong>.</td><td>0</td></tr>
	<tr><td>zIndex</td><td>the css z-Index value to be used for the textCounter object.</td><td>100</td></tr>
	<tr><td>warnAt</td><td>The number of characters, or percentage, remaining when the <strong>warningClass</strong> will be applied.</td><td>10</td></tr>
	<tr><td>showBeforeWarn</td><td>Should the text counter be shown before reaching the <strong>warnAt</strong> value. Possible values include: <em>true</em> and <em>false</em>.</td><td>true</td></tr>
	<tr><td>textPattern</td><td>The text to be displayed in the counter.  The following constants will be replaced:  <dl><dt><em>[+]</em></dt> <dd>- The characters remaining/typed based on the <strong>countDown</strong> option</dd><dt><em>[=]</em></dt><dd>- The maximum number of characters based on the <strong>maxlength</strong> attribute</dd><dt><em>[%]</em></dt><dd>- The percentage of characters remaining/typed based on the <strong>countDown</strong> option</dd></dl></td><td>[+] / [=]</td></tr>
	<tr><td>maxLength</td><td>The default <strong>maxlength</strong> value to apply to any field that does not have the attribute set.  Enforces this value on Opera and Internet Explorer versions that do not support the <strong>maxlength</strong> attribute.</td><td>500</td></tr>
	<tr><td>countDown</td><td>Should the text counter count down from maximum value (<em>true</em>) or up to it (<em>false</em>).</td><td>true</td></tr>
</tbody>
</table>

Globally Overriding the Defaults
--------------------------------
If you want to override a default option *globally* for the textCounter object(s), you can make a call to the textCounter options object.  The below will change the default transition
from "_slideToggle_" to "_none_" for all textCounters and changed the default *zIndex* option to 200.  

    $.fn.textCounter.options.transition = "none";
    $.fn.textCounter.options.zIndex = 200;


Miscellaneous
--------------------------------
-	Tested with jQuery 1.7.1.
-	Compatible with IE 7+, Firefox 11+, Opera 11.61+, and Chrome 17+.

Feel free to <a href="mailto:gary@garystorey.com">email me</a> if you have any questions.

Copyright &copy; 2012, Gary Storey ( http://garystorey.com )
Released under Creative Commons Attribution-ShareAlike 3.0 Unported License.

