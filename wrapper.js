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

    const tiddlify = (node, forceText) => {
        if (node.nodeType === Node.TEXT_NODE) {
            let subtree;
            try {
                const children = new $tw.Wiki.parsers[TYPE_WIKI](TYPE_WIKI, node.textContent, {}).tree[0].children;
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
                    text: node.textContent,
                    type: 'text'
                };
            }
        }
        if (node.tagName) {
            const widget = {
                attributes: {},
                tag: node.tagName.toLowerCase(),
                type: 'element'
            };
            $tw.utils.each(node.attributes, (attribute) => {
                widget.attributes[attribute.nodeName] = {
                    type: 'string',
                    value: attribute.nodeValue
                };
            });
            widget.children = [];
            node.childNodes.forEach((child) => {
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
            const tree = dom.parseFromString(source, 'text/html');
            this.tree = tiddlify(tree.body).children;
        }
    }

    exports['text/x-markdown'] = MarkdownParser;
})();
