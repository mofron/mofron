# mofron

mofron is JavaScript Framework for Web UI.<br>
It encapsulations the elements of the front-end (html, css, etc. ..) and provides APIs like Swing and .NET. <br>
If you have developed a GUI with Swing or .NET, you can do web development smoothly.<br>

# Quick Start

mofron require webpack babel expose-loader

```bash
npm init
npm install --save-dev webpack expose-loader babel-core babel-loader babel-preset-es2015 mofron 
```

create ./index.html

```html
<html>
    <head></head>
    <body style="margin:0px;padding:0px;"></body>
    <script src='./dist/app.js'></script>
</html>
```

create ./src/sample.js (button display sample)

```javascript
require('mofron'); 
require('mofron-comp-button');

// simple use
new mofron.comp.Button('test').visible(true); 

// set size setting
var btn = new mofron.comp.Button('size');
btn.width(150);        // set width to 150px
btn.visible(true);       // set to DOM
btn.height(30);         // enable changing after display
btn.style('background', 'white');  // css setting

// simple code
new mofron.comp.Button('simple code', {
    width  : 150,
    height : 30,
    visible : true
});

// set click event function
var click = new mofron.comp.Button('click');
click.setClickEvent(function() {
    alert('click');        // click event
});
click.visible(true);
```

create ./webpack.config.js

```javascript
module.exports = {
    entry: './src/sample.js', 
    output: {
        path: __dirname + '/dist',
        filename: 'app.js' 
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'  ,
            query: {
                presets: ['es2015']  
            }
        }]
    }
};
```
packed

```bash
`npm bin`/webpack   # create dist/app.js
```


[more](http://qiita.com/Ki4mTaria/items/3d2ccc1c9867ee9270bf)
