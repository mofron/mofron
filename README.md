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

Install mofron develop env:

```bash
cd (deploy target dir)
git clone https://github.com/mofron/env-template.git (dirname)
cd (dirname)
./tool/init/centos.sh
```
Install mofron and login component:

```bash
npm install mofron mofron-comp-login
```


Edit tag/index.mof:

```xml
<require>
    <tag module='mofron-comp-login'>login</tag>
</require>

<login title='Test Login'></login>
```

Create a js file for browser:

```bash
./tool/tagbuild.sh
```

Access index.html to see a login page.
![login](https://raw.githubusercontent.com/mofron/mofron/image/login-comp.png)
