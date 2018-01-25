# mofron

mofron is JavaScript Framework for Web UI.<br>
It has an interface like .NET,swing. <br>
so it makes possible to development front-end by only js.


## Install

```bash
npm install mofron
```

## Quick Start
this is a sample for it build the login page.

install mofron develop env
```
cd (deploy target dir)
git clone https://github.com/mofron/env-template.git (dirname)
cd (dirname)
./tool/init.sh
```

install mofron and login component
```
npm install mofron mofron-comp-login
```

edit src/js/ctrl/init/index.js
```javascript
let Login = require('mofron-comp-login');    // add
let start = (rt) => {
    try {
        new Login().visible(true);           // add
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}
```

create a js file for browser 
```bash
./too/build.sh
```

then you can see login page.
![login](https://raw.githubusercontent.com/mofron/mofron/image/login-comp.png)
