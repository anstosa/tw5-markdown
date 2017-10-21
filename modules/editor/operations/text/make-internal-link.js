/*\
title: $:/plugins/anstosa/tw5-markdown/modules/editor/operations/text/make-internal-link.js
type: application/javascript
module-type: texteditoroperation
condition: [<targetTiddler>type[text/x-markdown]]
\*/
(() => {
    'use strict';

    exports['make-internal-link'] = (event, operation) => {
        const fragment = `#${encodeURIComponent(event.paramObject.text)}`;
        operation.replacement = `[${operation.selection}](${fragment})`;
        operation.cutStart = operation.selStart;
        operation.cutEnd = operation.selEnd;
        operation.newSelStart = operation.selStart + operation.replacement.length;
        operation.newSelEnd = operation.newSelStart;
    };

})();
