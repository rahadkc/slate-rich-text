(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{204:function(e,t,n){},206:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(16),l=n.n(o),i=(n(95),n(33)),c=n(34),s=n(37),u=n(35),d=n(36),m=n(82),h=n(22),f=n(23),b=n(88),k=n(2),p=n(10),v=n(25),g=n(12),y=function(e){return r.a.createElement("div",{className:"format-toobar"},e.children)},E=n(60);function w(){var e=Object(f.a)(["\n  padding: 10px;\n  height: 34px;\n  border-radius: 6px;\n"]);return w=function(){return e},e}var B=v.a.input(w());function x(e){return r.a.createElement(B,e)}function j(){var e=Object(f.a)(["\n  background: ",";\n  color: ",";\n  border:none;\n  box-shadow:none;\n  border-radius: 6px;\n  cursor: pointer;\n  display: inline-block;\n  padding: 9px;\n  margin: 0 5px;\n\n  :hover {\n    opacity: 0.7;\n  }\n"]);return j=function(){return e},e}function C(){var e=Object(f.a)(["\n  display: block;\n  max-width: 100%;\n  max-height: 20em;\n  margin-top: 10px;\n  margin-bottom: 10px"]);return C=function(){return e},e}var O=v.a.img(C()),S=v.a.button(j(),function(e){return e.primary?"#74e2d3":"white"},function(e){return e.primary?"white":"#74e2d3"}),N={blocks:{image:{isVoid:!0}}},M="paragraph",D=Object(p.isKeyHotkey)("alt+b"),I=Object(p.isKeyHotkey)("alt+i"),A=Object(p.isKeyHotkey)("alt+u"),J=Object(p.isKeyHotkey)("alt+`"),K=JSON.parse(localStorage.getItem("content")),L=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={value:k.m.fromJSON(K||E)},n.blockCount=0,n.handleChange=function(e){var t=e.target,a=t.value,r=t.name;n.setState(Object(m.a)({},r,parseInt(a,10)))},n.handleSaveContent=function(e){if("save"===e){var t=JSON.stringify(n.editor.value.toJSON());localStorage.setItem("content",t)}else n.setState({value:k.m.fromJSON(K||E)})},n.hasMark=function(e){return n.state.value.activeMarks.some(function(t){return t.type===e})},n.hasBlock=function(e){return n.state.value.blocks.some(function(t){return t.type===e})},n.ref=function(e){n.editor=e},n.renderMarkButton=function(e,t){var a=n.hasMark(e);return r.a.createElement("button",{className:"tooltip-icon-button",active:a.toString(),onMouseDown:function(t){return n.onClickMark(t,e)}},r.a.createElement("i",null,t))},n.renderBlockButton=function(e,t){var a=n.hasBlock(e);if(["numbered-list","bulleted-list"].includes(e)){var o=n.state.value,l=o.document,i=o.blocks;if(i.size>0){var c=l.getParent(i.first().key);a=n.hasBlock("list-item")&&c&&c.type===e}}return r.a.createElement("button",{className:"tooltip-icon-button",active:a.toString(),onMouseDown:function(t){return n.onClickBlock(t,e)}},r.a.createElement("i",null,t))},n.renderImageButton=function(e,t){var a=n.hasBlock(e);return r.a.createElement("button",{className:"tooltip-icon-button imgBtn",active:a.toString()},r.a.createElement("input",{type:"file",ref:"file",onChange:function(e){return n.handleUploadImage(e)}}),r.a.createElement("b",null,t))},n.renderEditor=function(e,t,a){var o=n.state.blockLimit,l=a(),i=e.value.document.getBlocks().size;return r.a.createElement("div",null,r.a.createElement("div",null,l),r.a.createElement("div",{className:"editor-tools"},r.a.createElement("h3",null,"Block Count: ",i),r.a.createElement("h3",null,"Max block limit: ",o||"None")))},n.renderNode=function(e,t,a){var o=e.attributes,l=e.parent,i=e.children,c=e.node,s=e.isFocused;switch(n.blockCount=l.getBlocks().size,c.type){case"block-quote":return r.a.createElement("blockquote",o,i);case"bulleted-list":return r.a.createElement("ul",o,i);case"heading-one":return r.a.createElement("h1",o,i);case"heading-two":return r.a.createElement("h2",o,i);case"list-item":return r.a.createElement("li",o,i);case"numbered-list":return r.a.createElement("ol",o,i);case"image":var u=c.data.get("src");return r.a.createElement(O,Object.assign({src:u,selected:s},o));default:return a()}},n.renderMark=function(e,t,n){var a=e.children,o=e.mark,l=e.attributes;switch(o.type){case"bold":return r.a.createElement("strong",l,a);case"code":return r.a.createElement("code",l,a);case"italic":return r.a.createElement("em",l,a);case"underlined":return r.a.createElement("u",l,a);default:return n()}},n.insertImage=function(e,t,n){n&&e.select(n),e.insertBlock({type:"image",data:{src:t}})},n.onChange=function(e){var t=e.value;n.setState({value:t})},n.onKeyDown=function(e,t,a){if(n.blockCount>n.state.blockLimit&&"Backspace"!==e.key)e.preventDefault();else{var r;if(D(e))r="bold";else if(I(e))r="italic";else if(A(e))r="underlined";else{if(!J(e))return a();r="code"}e.preventDefault(),t.toggleMark(r)}},n.onClickMark=function(e,t){e.preventDefault(),n.editor.toggleMark(t)},n.onClickBlock=function(e,t){e.preventDefault();var a=Object(h.a)(Object(h.a)(n)).editor,r=a.value,o=r.document;if("bulleted-list"!==t&&"numbered-list"!==t){var l=n.hasBlock(t);n.hasBlock("list-item")?a.setBlocks(l?M:t).unwrapBlock("bulleted-list").unwrapBlock("numbered-list"):a.setBlocks(l?M:t)}else{var i=n.hasBlock("list-item"),c=r.blocks.some(function(e){return!!o.getClosest(e.key,function(e){return e.type===t})});i&&c?a.setBlocks(M).unwrapBlock("bulleted-list").unwrapBlock("numbered-list"):i?a.unwrapBlock("bulleted-list"===t?"numbered-list":"bulleted-list").wrapBlock(t):a.setBlocks("list-item").wrapBlock(t)}},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(y,null,this.renderMarkButton("bold",r.a.createElement(g.b,null)),this.renderMarkButton("italic",r.a.createElement(g.c,null)),this.renderMarkButton("underlined",r.a.createElement(g.g,null)),this.renderMarkButton("code",r.a.createElement(g.a,null)),this.renderBlockButton("heading-one","H1"),this.renderBlockButton("heading-two","H2"),this.renderBlockButton("block-quote",r.a.createElement(g.f,null)),this.renderBlockButton("numbered-list",r.a.createElement(g.e,null)),this.renderBlockButton("bulleted-list",r.a.createElement(g.d,null)),this.renderImageButton("image",r.a.createElement(g.h,null)),r.a.createElement(x,{type:"number",placeholder:"Set Block limit",name:"blockLimit",onChange:this.handleChange}),r.a.createElement("div",{className:""},r.a.createElement(S,{primary:!0,onClick:function(){return e.handleSaveContent("save")}},"Save"),r.a.createElement(S,{onClick:function(){return e.handleSaveContent("cancel")}},"Cancel"))),r.a.createElement("div",{className:"editor-field"},r.a.createElement(b.a,{spellCheck:!0,autoFocus:!0,placeholder:"Enter some rich text...",schema:N,ref:this.ref,value:this.state.value,onChange:this.onChange,onKeyDown:this.onKeyDown,renderNode:this.renderNode,renderEditor:this.renderEditor,renderMark:this.renderMark})))}},{key:"handleUploadImage",value:function(e){var t=this,n=new FileReader,a=e.target.files[0];n.addEventListener("load",function(){return t.setState({src:n.result},function(){t.editor.command(t.insertImage,t.state.src)})}),n.readAsDataURL(a)}}]),t}(r.a.Component),W=(n(204),function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"editor"},r.a.createElement(L,null)))}}]),t}(a.Component)),q=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function H(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}l.a.render(r.a.createElement(W,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");q?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):H(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):H(t,e)})}}()},60:function(e){e.exports={document:{nodes:[{object:"block",type:"paragraph",nodes:[{object:"text",leaves:[{text:"This is editable "},{text:"rich",marks:[{type:"bold"}]},{text:" text, "},{text:"much",marks:[{type:"italic"}]},{text:" better than a "},{text:"<textarea>",marks:[{type:"code"}]},{text:"!"}]}]},{object:"block",type:"paragraph",nodes:[{object:"text",leaves:[{text:"Since it's rich text, you can do things like turn a selection of text "},{text:"bold",marks:[{type:"bold"}]},{text:", or add a semantically rendered block quote in the middle of the page, like this:"}]}]},{object:"block",type:"block-quote",nodes:[{object:"text",leaves:[{text:"A wise quote."}]}]},{object:"block",type:"paragraph",nodes:[{object:"text",leaves:[{text:"Try it out for yourself!"}]}]}]}}},90:function(e,t,n){e.exports=n(206)},95:function(e,t,n){}},[[90,2,1]]]);
//# sourceMappingURL=main.3ba9efa0.chunk.js.map