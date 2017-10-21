/*\
title: $:/plugins/anstosa/tw5-markdown/modules/editor/operations/text/make-external-link.js
type: application/javascript
module-type: texteditoroperation
condition: [<targetTiddler>type[text/x-markdown]]
\*/
(() => {
    'use strict';

    exports['make-external-link'] = (event, operation) => {
        operation.replacement = `[${operation.selection}](${event.paramObject.text})`;
        operation.cutStart = operation.selStart;
        operation.cutEnd = operation.selEnd;
        operation.newSelStart = operation.selStart + operation.replacement.length;
        operation.newSelEnd = operation.newSelStart;
    };

})();
