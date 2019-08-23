/*\
title: $:/plugins/anstosa/tw5-markdown/wrapper.js
type: application/javascript
module-type: parser

Wraps up the markdown-it parser for use in TiddlyWiki5
\*/
(() => {
    'use strict';

    const TYPE_WIKI = 'text/vnd.tiddlywiki';

    let dom;
    if (typeof(window) !== 'undefined') {
        dom = new DOMParser();
    }
    const highlight = require('$:/plugins/anstosa/tw5-markdown/highlight.js');
    const MarkdownIt = require('$:/plugins/anstosa/tw5-markdown/markdown.js');
    const markdown = new MarkdownIt({
        highlight: (source, syntax) => {
            if (syntax && highlight.getLanguage(syntax)) {
                try {
                    return highlight.highlight(syntax, source).value;
                } catch (__) {}
            }
            return '';
        },
        html: true,
        linkify: true,
        typographer: true,
    });
    markdown.use(require('$:/plugins/anstosa/tw5-markdown/markdown-checkbox.js'), {
        disabled: true,
        idPrefix: 'c-task-list__item__checkbox__',
        ulClass: 'c-task-list',
        liClass: 'c-task-list__item'
    });

    class MarkdownParser {
        constructor(type, text, options) {
            const source = markdown.render(text);
            const wikiParser = new $tw.Wiki.parsers[TYPE_WIKI](
                TYPE_WIKI,
                source, options
            );
            this.tree = wikiParser.tree;
        }
    }

    exports['text/x-markdown'] = MarkdownParser;
})();
