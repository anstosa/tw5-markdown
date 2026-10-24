# TiddlyWiki 5 Markdown Plugin

> **Archive notice · Historical / unmaintained.** This plugin is preserved as a record of earlier engineering work. It is not receiving active compatibility or security updates. Its original demo and build instructions reflect a historical TiddlyWiki ecosystem and are not validated against modern releases.

## Retrospective

### Problem and product

This project added Markdown authoring support to TiddlyWiki 5, making a familiar writing syntax available inside an extensible personal wiki instead of requiring a separate editor.

### Engineering approach

The plugin follows TiddlyWiki's modular distribution pattern. The repository includes `plugin.info`, `modules/`, `ui/`, `usage.tid`, `docs_type_markdown.tid`, and build scripts. Editor behavior, integration points, and help content were packaged as pieces of the wiki itself.

An accompanying demo wiki served as interactive documentation, letting people experiment with the behavior in context. That documentation-first approach suited a plugin whose usefulness is clearest while editing.

### Tradeoffs and lasting lessons

Extending an existing writing environment can deliver a better end-to-end experience than introducing another standalone application, but it depends on the host's plugin APIs and editor conventions. The original demo URL may no longer function, and the historical source should not be treated as evidence of current compatibility.

## Original documentation

The original README linked to the demo wiki: [demo.santosa.family/#tw5-markdown](http://demo.santosa.family/#tw5-markdown).

The repository retains its original [plugin metadata](plugin.info), [usage tiddler](usage.tid), [Markdown documentation tiddler](docs_type_markdown.tid), and source modules.

## Related projects

[Docker deployment](https://github.com/anstosa/tw5-docker) · [Demo wiki](https://github.com/anstosa/tw5-demo) · [Material theme](https://github.com/anstosa/tw5-material-theme) · [Material companion](https://github.com/anstosa/tw5-material-plugin)
