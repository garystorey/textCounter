textCounter
===========
A jQuery plugin to count the number of characters left in input fields and textareas similar to Twitter but with more options and flexibility.

Usage and Examples
------------------------------
The simplest usage is:

    $('selector').textCounter();

More complex examples can be found at [GaryStorey.com][http://garystorey.com/textCounter/].


Options and the Default Values
------------------------------
<table cellspacing="0" cellpadding="0"><caption>Options and Defaults</caption>
<thead>
    <tr><th>Option</th><th>Description</th><th>Default</th></tr>
</thead>
<tbody>
    <tr><td>__defaultClass__</td><td>The default class used for the text counter. Unless overridden, the same class will be used for all textCounter objects.</td><td>textCounter</td></tr>
	<tr><td>__counterWarningClass__</td><td>The class to apply to the text counter element when the warnAt value has been met or passed.</td><td>counterWarning</td></tr>
	<tr><td>__txtWarningClass__</td><td>The class to apply to the textarea/input element when the warnAt value has been met or passed.</td><td>txtWarning</td></tr>
	<tr><td>__counterPatternClass__</td><td>The class to apply to the textPattern <div> when the warnAt value has been met or passed.</td><td>counterTextPattern</td></tr>
	<tr><td>__progressBarClass__</td><td>The default class used for the progress bar <span>. </td><td>counterProgressBar</td></tr>
	<tr><td>__transition__</td><td>The transition to use when showing the text counter. Possible values include:  _none_, _fadeToggle_, _slideToggle_ or any defined jQuery toggle method.</td><td>slideToggle</td></tr>
	<tr><td>__easing__</td><td>The easing mode the transition should use.  Possible values include _swing_ and _linear_.  Additional options are available via jQuery UI.</td><td>swing</td></tr>
	<tr><td>__transitionSpeed__</td><td>In milliseconds the amount of time for the transition to last.</td><td>200</td></tr>
	<tr><td>__posX__</td><td>The X-axis where the counter should appear.  Possible values include: _left_, _center_ , _right_, or any _integer_.</td><td>right</td></tr>
	<tr><td>__posY__</td><td>The Y-axis where the counter should appear. Possible values include: _top_, _center_ , _bottom_, or any _integer_</td><td>bottom</td></tr>
	<tr><td>__posXoffset__</td><td>The number of pixels on the X-axis to move the counter from it's default position of <strong>posX</strong>.</td><td>0</td></tr>
	<tr><td>__posYoffset__</td><td>The number of pixels on the Y-axis to move the counter from it's default position of <strong>posY</strong>.</td><td>0</td></tr>
	<tr><td>__zIndex__</td><td>the css z-Index value to be used for the textCounter object.</td><td>100</td></tr>
	<tr><td>__warnAt__</td><td>The number of characters, or percentage, remaining when the <strong>warningClass</strong> will be applied.</td><td>10</td></tr>
	<tr><td>__showBeforeWarn__</td><td>Should the text counter be shown before reaching the <strong>warnAt</strong> value. Possible values include: _true_ and _false_.</td><td>true</td></tr>
	<tr><td>__textPattern__</td><td>The text to be displayed in the counter.  The following constants will be replaced:  <dl><dt>_[+]_</dt> <dd>- The characters remaining/typed based on the <strong>countDown</strong> option</dd><dt>_[=]_</dt><dd>- The maximum number of characters based on the <strong>maxlength</strong> attribute</dd><dt>_[%]_</dt><dd>- The percentage of characters remaining/typed based on the <strong>countDown</strong> option</dd></dl></td><td>[+] / [=]</td></tr>
	<tr><td>__maxLength__</td><td>The default <strong>maxlength</strong> value to apply to any field that does not have the attribute set.  Enforces this value on Opera and Internet Explorer versions that do not support the <strong>maxlength</strong> attribute.</td><td>500</td></tr>
	<tr><td>__countDown__</td><td>Should the text counter count down from maximum value (_true_) or up to it (_false_).</td><td>true</td></tr>
</tbody>
</table>

