/*\
title: $:/plugins/anstosa/tw5-markdown/wrapper.js
type: application/javascript
module-type: parser

Wraps up the markdown-it parser for use in TiddlyWiki5
\*/
(() => {
    'use strict';

    const TYPE_WIKI = 'text/vnd.tiddlywiki';

    const highlight = require('$:/plugins/anstosa/tw5-markdown/highlight.js');
    const htmlparser = require('$:/plugins/anstosa/tw5-markdown/htmlparser.js');
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

    const tiddlify = (node, forceText) => {
        if (node.type === 'text') {
            let subtree;
            try {
                const children = new $tw.Wiki.parsers[TYPE_WIKI](TYPE_WIKI, node.data, {}).tree[0].children;
                if (children.length === 0) {
                    subtree = null;
                }
                else if (children.length === 1) {
                    subtree = children[0];
                }
                else {
                    subtree = {
                        type: 'element',
                        tag: 'span',
                        children: children,
                    };
                }
            }
            catch(error) {
                subtree = null;
            }
            if (!forceText && subtree) {
                return subtree;
            }
            else {
                return {
                    text: node.data,
                    type: 'text'
                };
            }
        }
        if (node.name) {
            const widget = {
                attributes: {},
                tag: node.name,
                type: 'element'
            };
            $tw.utils.each(node.attribs, (value, attribute) => {
                widget.attributes[attribute] = {
                    type: 'string',
                    value: value,
                };
            });
            if (widget.tag === 'a') {
                widget.attributes.class = widget.attributes.class || {
                    type: 'string',
                    value: '',
                };
                widget.attributes.class.value += ' tc-tiddlylink';
            }
            widget.children = [];
            node.children.forEach((child) => {
                const isPlainText = (
                    forceText ||
                    widget.tag === 'code' ||
                    widget.tag === 'a'
                );
                widget.children.push(tiddlify(child, isPlainText));
            });
            return widget;
        }
    };

    class MarkdownParser {
        constructor(type, text, options) {
            const source = markdown.render(text);
            const handler = new Tautologistics.NodeHtmlParser.DefaultHandler((error, dom) => {
                if (error) { console.error(error); }
            }, {verbose: true});
            const parser = new Tautologistics.NodeHtmlParser.Parser(handler);
            parser.parseComplete(source);
            this.tree = tiddlify({
                children: handler.dom,
                name: 'body',
                type: 'tag',
            }).children;
            console.log(this.tree);
        }
    }

    exports['text/x-markdown'] = MarkdownParser;
})();
