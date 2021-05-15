# Setup Local Development Environment
Make sure you have the latest version of Node.js installed before installing mofron. Bellow command creates a new directory with default configuration files. Replace 'mofron-project-name' with any name if necessary

```shell
npx mofron-init mofron-project-name 
cd mofron-project-name
npm install mofron mofron-build
```

# Sample Project
Edit ./mof/index.mf in the directory to create the content.This is a sample to display the simplest characters.

```xml
<setting>
    <tag load="mofron-comp-text">Text</tag>
</setting>

<Text size="0.3rem" style="margin:0.5rem;">Hello mofron!</Text>
```

Install the component module used by index.mf

```shell
npm install mofron-comp-text
```

Convert from markup format .mf file to javascript file.

```
npx mofron-build index
```

Since dist_index.js is generated in ./dist/index directory, if you read it from the html file, the contents of the sample will be displayed.
