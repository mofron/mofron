# mofron

> ⚠️ mofron is currently under **major refactoring** toward version 2.0.
> 
> For the current stable usage, see [./legacy.md](./legacy.md).

---

## What is mofron?

**mofron** is a frontend UI framework where each component is a standalone Node.js module.  
It emphasizes **configuration over templates**, and enables building UIs without writing low-level HTML, CSS, or JavaScript.

---

## Why mofron?

While most frontend frameworks focus on reactivity or performance,  
**mofron** is built around:

- 🧩 **Modular Composition**  
 Each UI component in mofron is distributed as a standalone npm module.  
 These modules are designed to be **generic and portable**, so they can be reused across different projects without modification.

 To use a component, simply declare it as a tag using mofron’s configuration syntax:
 For example, you can assign a module to `<Text>` like this:

```xml
<setting>
  <tag load="mofron-comp-text">Text</tag>
</setting>

<Text size=0.3rem>hello</Text>
```


- 🔁 **Replaceable UI Architecture**  
 In typical UI frameworks, replacing deeply nested base elements (like `<Text>` or `<Button>`)  
 requires digging into multiple layers of component structure.  

 mofron's **theme system** allows you to globally replace components by simply redefining their tags.  
 You don't have to write any JavaScript to handle replacements or modify internal component structures just redefine tags declaratively, and mofron takes care of the rest.

 mofron automatically applies these replacements across the entire component tree —  
 making it easy to switch from mockups to production designs, or apply branding themes across your app.


- 🔌 **Plugin-Oriented Extension**  
 In mofron, components are kept lightweight and focused — they don’t include every feature by default.  
 Instead, you can extend their behavior using plugins or configuration options, depending on your needs.

 This approach avoids bloated components and improves reusability across projects.  
 For example, you can add visual effects (`mofron-effect-fade`), event handling (`mofron-event-click`),  
 or layout control (`mofron-layout-grid`) as modular extensions — all without modifying the base component itself.

 As a result, the same component can be reused in many contexts,  
 customized only through external modules or configuration.



## Quick Start
You can try mofron immediately using the CLI initializer and a simple `.mf` markup file:

```bash
npx mofron-init myproj
cd myproj
npm install mofron mofron-build
npm install mofron-comp-text
```

Edit ./mof/index.mf as follows:

```xml
<setting>
  <tag load="mofron-comp-text">Text</tag>
</setting>

<Text size="0.3rem" style="margin:0.5rem;">Hello mofron!</Text>
```

Then build it:
```bash
npx mofron-build index
```
This generates dist_index.js in ./dist/index.
Include it in an HTML file to render your UI.


## Legacy Documentation

mofron currently uses a `.mf` file format —  
an HTML-like markup language that lets you define UI components declaratively, without writing JavaScript.  
This structure remains core to mofron's design and will continue to be supported in future versions.

To learn how to use existing components with the current CLI and build system, see:

- [docs/legacy.md](./legacy.md) — Component list and usage examples  
- [Sample Codes](https://mofron.github.io/mofron/) — Live demos with interactive component switching and output previews

## Roadmap

Version 2.x is currently in active development with the following key goals:

- A redesigned component architecture focused on clarity, decoupling, and deep cross-component collaboration
- A unified plugin and configuration model to simplify complex UI behaviors without bloating base components
- Static analysis of message-based links to visualize inter-component impact,  
 combined with runtime log mapping for structure-aware debugging
- Native references to child components for smarter control and integration patterns

Breaking changes are expected.  
v1.x will remain supported as a stable legacy version until v2.x reaches full release.
