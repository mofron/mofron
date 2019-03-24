# mofron

mofron is JavaScript Framework for Web UI.<br>
It makes possible to development front-end by only simple tag.

## Install

```bash
npm install mofron
```

## Quick Start
This is a sample for [login component](https://github.com/simpart/mofron-comp-login.git).
By using this component you can simplify the build of a login page.

install mofron develop env

```bash
cd (deploy target dir)
git clone https://github.com/mofron/env-template.git (dirname)
cd (dirname)
./tool/init/centos.sh
```

install mofron and login component

```bash
npm install mofron mofron-comp-login
```


edit tag/index.mof

```xml
<require>
    <tag module='mofron-comp-login'>login</tag>
</require>

<login title='Test Login'></login>
```

create a js file for browser 

```bash
./tool/tagbuild.sh
```

Please access to index.html, then you can see a login page.
![login](https://raw.githubusercontent.com/mofron/mofron/image/image/login-comp.png)
