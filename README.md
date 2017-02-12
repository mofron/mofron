# mofron

mofron is JavaScript Framework for Web UI.<br>
It encapsulations the elements of the front-end (html, css, etc. ..) and provides APIs like Swing and .NET. <br>
If you have developed a GUI with Swing or .NET, you can do web development smoothly.<br>

# Quick Start
need webpack babel expose-loader

```bash
npm install --save-dev webpack expose-loader babel-core babel-loader babel-preset-es2015 mofron 
```

```html
<html>
    <head></head>
    <body style="margin:0px;padding:0px;"></body>
    <script src='./path/to/webpack/output.js'></script>
</html>
```

example (button display)

```javascript
require('mofron'); 
require('mofron-comp-button');

// simple use
new mofron.comp.Button('test').visible(true); 

var btn = new mofron.comp.Button('size');
btn.width(150);        // set width to 150px
btn.visible(true);       // set to DOM
btn.height(30);         // enable changing after inited
btn.style('background', 'white');  // css setting

var click = new mofron.comp.Button('click');
click.setClickEvent(function() {
    alert('click');        // click event
});
click.visible(true);
```

[more](http://qiita.com/Ki4mTaria/items/3d2ccc1c9867ee9270bf)
