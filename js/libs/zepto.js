/* zepto.js */

/* 1   */ //     Zepto.js
/* 2   */ //     (c) 2010, 2011 Thomas Fuchs
/* 3   */ //     Zepto.js may be freely distributed under the MIT license.
/* 4   */ 
/* 5   */ var Zepto = (function() {
/* 6   */   var undefined, key, $$, classList, emptyArray = [], slice = emptyArray.slice,
/* 7   */     document = window.document,
/* 8   */     elementDisplay = {}, classCache = {},
/* 9   */     getComputedStyle = document.defaultView.getComputedStyle,
/* 10  */     cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
/* 11  */     fragmentRE = /^\s*<(\w+)[^>]*>/,
/* 12  */     elementTypes = [1, 9, 11],
/* 13  */     adjacencyOperators = ['prepend', 'after', 'before', 'append'],
/* 14  */     reverseAdjacencyOperators = ['append', 'prepend'],
/* 15  */     table = document.createElement('table'),
/* 16  */     tableRow = document.createElement('tr'),
/* 17  */     containers = {
/* 18  */       'tr': document.createElement('tbody'),
/* 19  */       'tbody': table, 'thead': table, 'tfoot': table,
/* 20  */       'td': tableRow, 'th': tableRow,
/* 21  */       '*': document.createElement('div')
/* 22  */     };
/* 23  */ 
/* 24  */   function isF(value) { return ({}).toString.call(value) == "[object Function]" }
/* 25  */   function isO(value) { return value instanceof Object }
/* 26  */   function isA(value) { return value instanceof Array }
/* 27  */   function likeArray(obj) { return typeof obj.length == 'number' }
/* 28  */ 
/* 29  */   function compact(array) { return array.filter(function(item){ return item !== undefined && item !== null }) }
/* 30  */   function flatten(array) { return array.length > 0 ? [].concat.apply([], array) : array }
/* 31  */   function camelize(str)  { return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
/* 32  */   function dasherize(str){
/* 33  */     return str.replace(/::/g, '/')
/* 34  */            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
/* 35  */            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
/* 36  */            .replace(/_/g, '-')
/* 37  */            .toLowerCase();
/* 38  */   }
/* 39  */   function uniq(array)    { return array.filter(function(item,index,array){ return array.indexOf(item) == index }) }
/* 40  */ 
/* 41  */   function classRE(name){
/* 42  */     return name in classCache ?
/* 43  */       classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'));
/* 44  */   }
/* 45  */ 
/* 46  */   function maybeAddPx(name, value) { return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value; }
/* 47  */ 
/* 48  */   function defaultDisplay(nodeName) {
/* 49  */     var element, display;
/* 50  */     if (!elementDisplay[nodeName]) {

/* zepto.js */

/* 51  */       element = document.createElement(nodeName);
/* 52  */       document.body.appendChild(element);
/* 53  */       display = getComputedStyle(element, '').getPropertyValue("display");
/* 54  */       element.parentNode.removeChild(element);
/* 55  */       display == "none" && (display = "block");
/* 56  */       elementDisplay[nodeName] = display;
/* 57  */     }
/* 58  */     return elementDisplay[nodeName];
/* 59  */   }
/* 60  */ 
/* 61  */   function fragment(html, name) {
/* 62  */     if (name === undefined) fragmentRE.test(html) && RegExp.$1;
/* 63  */     if (!(name in containers)) name = '*';
/* 64  */     var container = containers[name];
/* 65  */     container.innerHTML = '' + html;
/* 66  */     return slice.call(container.childNodes);
/* 67  */   }
/* 68  */ 
/* 69  */   function Z(dom, selector){
/* 70  */     dom = dom || emptyArray;
/* 71  */     dom.__proto__ = Z.prototype;
/* 72  */     dom.selector = selector || '';
/* 73  */     return dom;
/* 74  */   }
/* 75  */ 
/* 76  */   function $(selector, context){
/* 77  */     if (!selector) return Z();
/* 78  */     if (context !== undefined) return $(context).find(selector);
/* 79  */     else if (isF(selector)) return $(document).ready(selector);
/* 80  */     else if (selector instanceof Z) return selector;
/* 81  */     else {
/* 82  */       var dom;
/* 83  */       if (isA(selector)) dom = compact(selector);
/* 84  */       else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window)
/* 85  */         dom = [selector], selector = null;
/* 86  */       else if (fragmentRE.test(selector))
/* 87  */         dom = fragment(selector, RegExp.$1), selector = null;
/* 88  */       else if (selector.nodeType && selector.nodeType == 3) dom = [selector];
/* 89  */       else dom = $$(document, selector);
/* 90  */       return Z(dom, selector);
/* 91  */     }
/* 92  */   }
/* 93  */ 
/* 94  */   $.extend = function(target){
/* 95  */     slice.call(arguments, 1).forEach(function(source) {
/* 96  */       for (key in source) target[key] = source[key];
/* 97  */     })
/* 98  */     return target;
/* 99  */   }
/* 100 */   $.qsa = $$ = function(element, selector){ return slice.call(element.querySelectorAll(selector)) }

/* zepto.js */

/* 101 */ 
/* 102 */   function filtered(nodes, selector){
/* 103 */     return selector === undefined ? $(nodes) : $(nodes).filter(selector);
/* 104 */   }
/* 105 */ 
/* 106 */   function funcArg(context, arg, idx, payload){
/* 107 */    return isF(arg) ? arg.call(context, idx, payload) : arg;
/* 108 */   }
/* 109 */ 
/* 110 */   $.isFunction = isF;
/* 111 */   $.isObject = isO;
/* 112 */   $.isArray = isA;
/* 113 */ 
/* 114 */   $.map = function(elements, callback) {
/* 115 */     var value, values = [], i, key;
/* 116 */     if (likeArray(elements))
/* 117 */       for (i = 0; i < elements.length; i++) {
/* 118 */         value = callback(elements[i], i);
/* 119 */         if (value != null) values.push(value);
/* 120 */       }
/* 121 */     else
/* 122 */       for (key in elements) {
/* 123 */         value = callback(elements[key], key);
/* 124 */         if (value != null) values.push(value);
/* 125 */       }
/* 126 */     return flatten(values);
/* 127 */   }
/* 128 */ 
/* 129 */   $.each = function(elements, callback) {
/* 130 */     var i, key;
/* 131 */     if (likeArray(elements))
/* 132 */       for(i = 0; i < elements.length; i++) {
/* 133 */         if(callback(i, elements[i]) === false) return elements;
/* 134 */       }
/* 135 */     else
/* 136 */       for(key in elements) {
/* 137 */         if(callback(key, elements[key]) === false) return elements;
/* 138 */       }
/* 139 */     return elements;
/* 140 */   }
/* 141 */ 
/* 142 */   $.fn = {
/* 143 */     forEach: emptyArray.forEach,
/* 144 */     reduce: emptyArray.reduce,
/* 145 */     push: emptyArray.push,
/* 146 */     indexOf: emptyArray.indexOf,
/* 147 */     concat: emptyArray.concat,
/* 148 */     map: function(fn){
/* 149 */       return $.map(this, function(el, i){ return fn.call(el, i, el) });
/* 150 */     },

/* zepto.js */

/* 151 */     slice: function(){
/* 152 */       return $(slice.apply(this, arguments));
/* 153 */     },
/* 154 */     ready: function(callback){
/* 155 */       if (document.readyState == 'complete' || document.readyState == 'loaded') callback();
/* 156 */       document.addEventListener('DOMContentLoaded', callback, false);
/* 157 */       return this;
/* 158 */     },
/* 159 */     get: function(idx){ return idx === undefined ? this : this[idx] },
/* 160 */     size: function(){ return this.length },
/* 161 */     remove: function () {
/* 162 */       return this.each(function () {
/* 163 */         if (this.parentNode != null) {
/* 164 */           this.parentNode.removeChild(this);
/* 165 */         }
/* 166 */       });
/* 167 */     },
/* 168 */     each: function(callback){
/* 169 */       this.forEach(function(el, idx){ callback.call(el, idx, el) });
/* 170 */       return this;
/* 171 */     },
/* 172 */     filter: function(selector){
/* 173 */       return $([].filter.call(this, function(element){
/* 174 */         return $$(element.parentNode, selector).indexOf(element) >= 0;
/* 175 */       }));
/* 176 */     },
/* 177 */     end: function(){
/* 178 */       return this.prevObject || $();
/* 179 */     },
/* 180 */     add:function(selector,context){
/* 181 */       return $(uniq(this.concat($(selector,context))));
/* 182 */     },
/* 183 */     is: function(selector){
/* 184 */       return this.length > 0 && $(this[0]).filter(selector).length > 0;
/* 185 */     },
/* 186 */     not: function(selector){
/* 187 */       var nodes=[];
/* 188 */       if (isF(selector) && selector.call !== undefined)
/* 189 */         this.each(function(idx){
/* 190 */           if (!selector.call(this,idx)) nodes.push(this);
/* 191 */         });
/* 192 */       else {
/* 193 */         var excludes = typeof selector == 'string' ? this.filter(selector) :
/* 194 */           (likeArray(selector) && isF(selector.item)) ? slice.call(selector) : $(selector);
/* 195 */         this.forEach(function(el){
/* 196 */           if (excludes.indexOf(el) < 0) nodes.push(el);
/* 197 */         });
/* 198 */       }
/* 199 */       return $(nodes);
/* 200 */     },

/* zepto.js */

/* 201 */     eq: function(idx){
/* 202 */       return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1);
/* 203 */     },
/* 204 */     first: function(){ return $(this[0]) },
/* 205 */     last: function(){ return $(this[this.length - 1]) },
/* 206 */     find: function(selector){
/* 207 */       var result;
/* 208 */       if (this.length == 1) result = $$(this[0], selector);
/* 209 */       else result = this.map(function(){ return $$(this, selector) });
/* 210 */       return $(result);
/* 211 */     },
/* 212 */     closest: function(selector, context){
/* 213 */       var node = this[0], nodes = $$(context !== undefined ? context : document, selector);
/* 214 */       if (nodes.length === 0) node = null;
/* 215 */       while(node && node !== document && nodes.indexOf(node) < 0) node = node.parentNode;
/* 216 */       return $(node !== document && node);
/* 217 */     },
/* 218 */     parents: function(selector){
/* 219 */       var ancestors = [], nodes = this;
/* 220 */       while (nodes.length > 0)
/* 221 */         nodes = $.map(nodes, function(node){
/* 222 */           if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
/* 223 */             ancestors.push(node);
/* 224 */             return node;
/* 225 */           }
/* 226 */         });
/* 227 */       return filtered(ancestors, selector);
/* 228 */     },
/* 229 */     parent: function(selector){
/* 230 */       return filtered(uniq(this.pluck('parentNode')), selector);
/* 231 */     },
/* 232 */     children: function(selector){
/* 233 */       return filtered(this.map(function(){ return slice.call(this.children) }), selector);
/* 234 */     },
/* 235 */     siblings: function(selector){
/* 236 */       return filtered(this.map(function(i, el){
/* 237 */         return slice.call(el.parentNode.children).filter(function(child){ return child!==el });
/* 238 */       }), selector);
/* 239 */     },
/* 240 */     empty: function(){ return this.each(function(){ this.innerHTML = '' }) },
/* 241 */     pluck: function(property){ return this.map(function(){ return this[property] }) },
/* 242 */     show: function(){
/* 243 */       return this.each(function() {
/* 244 */         this.style.display == "none" && (this.style.display = null);
/* 245 */         if (getComputedStyle(this, '').getPropertyValue("display") == "none") {
/* 246 */           this.style.display = defaultDisplay(this.nodeName)
/* 247 */         }
/* 248 */       })
/* 249 */     },
/* 250 */     replaceWith: function(newContent) {

/* zepto.js */

/* 251 */       return this.each(function() {
/* 252 */         var par=this.parentNode,next=this.nextSibling;
/* 253 */         $(this).remove();
/* 254 */         next ? $(next).before(newContent) : $(par).append(newContent);
/* 255 */       });
/* 256 */     },
/* 257 */     wrap: function(newContent) {
/* 258 */       return this.each(function() {
/* 259 */         $(this).wrapAll($(newContent)[0].cloneNode(false));
/* 260 */       });
/* 261 */     },
/* 262 */     wrapAll: function(newContent) {
/* 263 */       if (this[0]) {
/* 264 */         $(this[0]).before(newContent = $(newContent));
/* 265 */         newContent.append(this);
/* 266 */       }
/* 267 */       return this;
/* 268 */     },
/* 269 */     unwrap: function(){
/* 270 */       this.parent().each(function(){
/* 271 */         $(this).replaceWith($(this).children());
/* 272 */       });
/* 273 */       return this;
/* 274 */     },
/* 275 */     hide: function(){
/* 276 */       return this.css("display", "none")
/* 277 */     },
/* 278 */     toggle: function(setting){
/* 279 */       return (setting === undefined ? this.css("display") == "none" : setting) ? this.show() : this.hide();
/* 280 */     },
/* 281 */     prev: function(){ return $(this.pluck('previousElementSibling')) },
/* 282 */     next: function(){ return $(this.pluck('nextElementSibling')) },
/* 283 */     html: function(html){
/* 284 */       return html === undefined ?
/* 285 */         (this.length > 0 ? this[0].innerHTML : null) :
/* 286 */         this.each(function (idx) {
/* 287 */           var originHtml = this.innerHTML;
/* 288 */           $(this).empty().append( funcArg(this, html, idx, originHtml) );
/* 289 */         });
/* 290 */     },
/* 291 */     text: function(text){
/* 292 */       return text === undefined ?
/* 293 */         (this.length > 0 ? this[0].textContent : null) :
/* 294 */         this.each(function(){ this.textContent = text });
/* 295 */     },
/* 296 */     attr: function(name, value){
/* 297 */       return (typeof name == 'string' && value === undefined) ?
/* 298 */         (this.length > 0 && this[0].nodeName == 'INPUT' && this[0].type == 'text' && name == 'value') ? (this.val()) :
/* 299 */         (this.length > 0 ? this[0].getAttribute(name) || (name in this[0] ? this[0][name] : undefined) : undefined) :
/* 300 */         this.each(function(idx){

/* zepto.js */

/* 301 */           if (isO(name)) for (key in name) this.setAttribute(key, name[key])
/* 302 */           else this.setAttribute(name, funcArg(this, value, idx, this.getAttribute(name)));
/* 303 */         });
/* 304 */     },
/* 305 */     removeAttr: function(name) {
/* 306 */       return this.each(function() { this.removeAttribute(name); });
/* 307 */     },
/* 308 */     data: function(name, value){
/* 309 */       return this.attr('data-' + name, value);
/* 310 */     },
/* 311 */     val: function(value){
/* 312 */       return (value === undefined) ?
/* 313 */         (this.length > 0 ? this[0].value : null) :
/* 314 */         this.each(function(){
/* 315 */           this.value = value;
/* 316 */         });
/* 317 */     },
/* 318 */     offset: function(){
/* 319 */       if(this.length==0) return null;
/* 320 */       var obj = this[0].getBoundingClientRect();
/* 321 */       return {
/* 322 */         left: obj.left + document.body.scrollLeft,
/* 323 */         top: obj.top + document.body.scrollTop,
/* 324 */         width: obj.width,
/* 325 */         height: obj.height
/* 326 */       };
/* 327 */     },
/* 328 */     css: function(property, value){
/* 329 */       if (value === undefined && typeof property == 'string')
/* 330 */         return this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property);
/* 331 */       var css = '';
/* 332 */       for (key in property) css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
/* 333 */       if (typeof property == 'string') css = dasherize(property) + ":" + maybeAddPx(property, value);
/* 334 */       return this.each(function() { this.style.cssText += ';' + css });
/* 335 */     },
/* 336 */     index: function(element){
/* 337 */       return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
/* 338 */     },
/* 339 */     hasClass: function(name){
/* 340 */       if (this.length < 1) return false;
/* 341 */       else return classRE(name).test(this[0].className);
/* 342 */     },
/* 343 */     addClass: function(name){
/* 344 */       return this.each(function(idx) {
/* 345 */         classList = [];
/* 346 */         var cls = this.className, newName = funcArg(this, name, idx, cls);
/* 347 */         newName.split(/\s+/g).forEach(function(klass) {
/* 348 */           if (!$(this).hasClass(klass)) {
/* 349 */             classList.push(klass)
/* 350 */           }

/* zepto.js */

/* 351 */         }, this);
/* 352 */         classList.length && (this.className += (cls ? " " : "") + classList.join(" "))
/* 353 */       });
/* 354 */     },
/* 355 */     removeClass: function(name){
/* 356 */       return this.each(function(idx) {
/* 357 */         if(name === undefined)
/* 358 */           return this.className = '';
/* 359 */         classList = this.className;
/* 360 */         funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
/* 361 */           classList = classList.replace(classRE(klass), " ")
/* 362 */         });
/* 363 */         this.className = classList.trim()
/* 364 */       });
/* 365 */     },
/* 366 */     toggleClass: function(name, when){
/* 367 */       return this.each(function(idx){
/* 368 */        var cls = this.className, newName = funcArg(this, name, idx, cls);
/* 369 */        ((when !== undefined && !when) || $(this).hasClass(newName)) ?
/* 370 */          $(this).removeClass(newName) : $(this).addClass(newName)
/* 371 */       });
/* 372 */     }
/* 373 */   };
/* 374 */ 
/* 375 */   'filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings'.split(',').forEach(function(property){
/* 376 */     var fn = $.fn[property];
/* 377 */     $.fn[property] = function() {
/* 378 */       var ret = fn.apply(this, arguments);
/* 379 */       ret.prevObject = this;
/* 380 */       return ret;
/* 381 */     }
/* 382 */   });
/* 383 */ 
/* 384 */   ['width', 'height'].forEach(function(property){
/* 385 */     $.fn[property] = function(value) {
/* 386 */       var offset;
/* 387 */       if (value === undefined) { return (offset = this.offset()) && offset[property] }
/* 388 */       else return this.css(property, value);
/* 389 */     }
/* 390 */   });
/* 391 */ 
/* 392 */   function insert(operator, target, node) {
/* 393 */     var parent = (!operator || operator == 3) ? target : target.parentNode;
/* 394 */     node.length && (node = node[0]);
/* 395 */     parent.insertBefore(node,
/* 396 */       !operator ? parent.firstChild :         // prepend
/* 397 */       operator == 1 ? target.nextSibling :    // after
/* 398 */       operator == 2 ? target :                // before
/* 399 */       null);                                  // append
/* 400 */   }

/* zepto.js */

/* 401 */ 
/* 402 */   function traverseNode (node, fun) {
/* 403 */     fun(node);
/* 404 */     for (key in node.childNodes) {
/* 405 */       traverseNode(node.childNodes[key], fun);
/* 406 */     }
/* 407 */   }
/* 408 */ 
/* 409 */   adjacencyOperators.forEach(function(key, operator) {
/* 410 */     $.fn[key] = function(html){
/* 411 */       var nodes = typeof(html) == 'object' ? html : fragment(html);
/* 412 */       if (!('length' in nodes)) nodes = [nodes];
/* 413 */       if (nodes.length < 1) return this;
/* 414 */       var size = this.length, copyByClone = size > 1, inReverse = operator < 2;
/* 415 */ 
/* 416 */       return this.each(function(index, target){
/* 417 */         for (var i = 0; i < nodes.length; i++) {
/* 418 */           var node = nodes[inReverse ? nodes.length-i-1 : i];
/* 419 */           traverseNode(node, function (node) {
/* 420 */             if (node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT') {
/* 421 */               window['eval'].call(window, node.innerHTML);
/* 422 */             }
/* 423 */           });
/* 424 */           if (copyByClone && index < size - 1) node = node.cloneNode(true);
/* 425 */           insert(operator, target, node);
/* 426 */         }
/* 427 */       });
/* 428 */     };
/* 429 */   });
/* 430 */ 
/* 431 */   reverseAdjacencyOperators.forEach(function(key) {
/* 432 */     $.fn[key+'To'] = function(html){
/* 433 */       if (typeof(html) != 'object') html = $(html);
/* 434 */       html[key](this);
/* 435 */       return this;
/* 436 */     };
/* 437 */   });
/* 438 */ 
/* 439 */   Z.prototype = $.fn;
/* 440 */ 
/* 441 */   return $;
/* 442 */ })();
/* 443 */ 
/* 444 */ '$' in window || (window.$ = Zepto);
/* 445 */ 

;
/* ajax.js */

/* 1   */ //     Zepto.js
/* 2   */ //     (c) 2010, 2011 Thomas Fuchs
/* 3   */ //     Zepto.js may be freely distributed under the MIT license.
/* 4   */ 
/* 5   */ (function($){
/* 6   */   var jsonpID = 0,
/* 7   */       isObject = $.isObject,
/* 8   */       key;
/* 9   */ 
/* 10  */   // Empty function, used as default callback
/* 11  */   function empty() {}
/* 12  */ 
/* 13  */   // ### $.ajaxJSONP
/* 14  */   //
/* 15  */   // Load JSON from a server in a different domain (JSONP)
/* 16  */   //
/* 17  */   // *Arguments:*
/* 18  */   //
/* 19  */   //     options — object that configure the request,
/* 20  */   //               see avaliable options below
/* 21  */   //
/* 22  */   // *Avaliable options:*
/* 23  */   //
/* 24  */   //     url     — url to which the request is sent
/* 25  */   //     success — callback that is executed if the request succeeds
/* 26  */   //
/* 27  */   // *Example:*
/* 28  */   //
/* 29  */   //     $.ajaxJSONP({
/* 30  */   //        url:     'http://example.com/projects?callback=?',
/* 31  */   //        success: function (data) {
/* 32  */   //            projects.push(json);
/* 33  */   //        }
/* 34  */   //     });
/* 35  */   //
/* 36  */   $.ajaxJSONP = function(options){
/* 37  */     var jsonpString = 'jsonp' + (++jsonpID),
/* 38  */     script = document.createElement('script');
/* 39  */     window[jsonpString] = function(data){
/* 40  */       $(script).remove();
/* 41  */       options.success(data);
/* 42  */       delete window[jsonpString];
/* 43  */     };
/* 44  */     script.src = options.url.replace(/=\?/, '=' + jsonpString);
/* 45  */     $('head').append(script);
/* 46  */     
/* 47  */     return {
/* 48  */         'abort': function(){
/* 49  */             $(script).remove();
/* 50  */             window[jsonpString] = function(){};

/* ajax.js */

/* 51  */         }
/* 52  */     }
/* 53  */   };
/* 54  */ 
/* 55  */   // ### $.ajaxSettings
/* 56  */   //
/* 57  */   // AJAX settings
/* 58  */   //
/* 59  */   $.ajaxSettings = {
/* 60  */     // Default type of request
/* 61  */     type: 'GET',
/* 62  */     // Callback that is executed before request
/* 63  */     beforeSend: empty,
/* 64  */     // Callback that is executed if the request succeeds
/* 65  */     success: empty,
/* 66  */     // Callback that is executed the the server drops error
/* 67  */     error: empty,
/* 68  */     // Callback that is executed on request complete (both: error and success)
/* 69  */     complete: empty,
/* 70  */     // MIME types mapping
/* 71  */     accepts: {
/* 72  */       script: 'text/javascript, application/javascript',
/* 73  */       json:   'application/json',
/* 74  */       xml:    'application/xml, text/xml',
/* 75  */       html:   'text/html',
/* 76  */       text:   'text/plain'
/* 77  */     }
/* 78  */   };
/* 79  */ 
/* 80  */   // ### $.ajax
/* 81  */   //
/* 82  */   // Perform AJAX request
/* 83  */   //
/* 84  */   // *Arguments:*
/* 85  */   //
/* 86  */   //     options — object that configure the request,
/* 87  */   //               see avaliable options below
/* 88  */   //
/* 89  */   // *Avaliable options:*
/* 90  */   //
/* 91  */   //     type ('GET')          — type of request GET / POST
/* 92  */   //     url (window.location) — url to which the request is sent
/* 93  */   //     data                  — data to send to server,
/* 94  */   //                             can be string or object
/* 95  */   //     dataType ('json')     — what response type you accept from
/* 96  */   //                             the server:
/* 97  */   //                             'json', 'xml', 'html', or 'text'
/* 98  */   //     success               — callback that is executed if
/* 99  */   //                             the request succeeds
/* 100 */   //     error                 — callback that is executed if

/* ajax.js */

/* 101 */   //                             the server drops error
/* 102 */   //
/* 103 */   // *Example:*
/* 104 */   //
/* 105 */   //     $.ajax({
/* 106 */   //        type:     'POST',
/* 107 */   //        url:      '/projects',
/* 108 */   //        data:     { name: 'Zepto.js' },
/* 109 */   //        dataType: 'html',
/* 110 */   //        success:  function (data) {
/* 111 */   //            $('body').append(data);
/* 112 */   //        },
/* 113 */   //        error:    function (xhr, type) {
/* 114 */   //            alert('Error!');
/* 115 */   //        }
/* 116 */   //     });
/* 117 */   //
/* 118 */   $.ajax = function(options){
/* 119 */     options = options || {};
/* 120 */     var settings = $.extend({}, options);
/* 121 */     for (key in $.ajaxSettings) if (!settings[key]) settings[key] = $.ajaxSettings[key];
/* 122 */ 
/* 123 */     if (/=\?/.test(settings.url)) return $.ajaxJSONP(settings);
/* 124 */ 
/* 125 */     if (!settings.url) settings.url = window.location.toString();
/* 126 */     if (settings.data && !settings.contentType) settings.contentType = 'application/x-www-form-urlencoded';
/* 127 */     if (isObject(settings.data)) settings.data = $.param(settings.data);
/* 128 */ 
/* 129 */     if (settings.type.match(/get/i) && settings.data) {
/* 130 */       var queryString = settings.data;
/* 131 */       if (settings.url.match(/\?.*=/)) {
/* 132 */         queryString = '&' + queryString;
/* 133 */       } else if (queryString[0] != '?') {
/* 134 */         queryString = '?' + queryString;
/* 135 */       }
/* 136 */       settings.url += queryString;
/* 137 */     }
/* 138 */ 
/* 139 */     var mime = settings.accepts[settings.dataType],
/* 140 */         xhr = new XMLHttpRequest();
/* 141 */ 
/* 142 */     settings.headers = $.extend({'X-Requested-With': 'XMLHttpRequest'}, settings.headers || {});
/* 143 */     if (mime) settings.headers['Accept'] = mime;
/* 144 */ 
/* 145 */     xhr.onreadystatechange = function(){
/* 146 */       if (xhr.readyState == 4) {
/* 147 */         var result, error = false;
/* 148 */         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0) {
/* 149 */           if (mime == 'application/json' && !(xhr.responseText == '')) {
/* 150 */             try { result = JSON.parse(xhr.responseText); }

/* ajax.js */

/* 151 */             catch (e) { error = e; }
/* 152 */           }
/* 153 */           else result = xhr.responseText;
/* 154 */           if (error) settings.error(xhr, 'parsererror', error);
/* 155 */           else settings.success(result, 'success', xhr);
/* 156 */         } else {
/* 157 */           error = true;
/* 158 */           settings.error(xhr, 'error');
/* 159 */         }
/* 160 */         settings.complete(xhr, error ? 'error' : 'success');
/* 161 */       }
/* 162 */     };
/* 163 */ 
/* 164 */     xhr.open(settings.type, settings.url, true);
/* 165 */     if (settings.beforeSend(xhr, settings) === false) {
/* 166 */       xhr.abort();
/* 167 */       return false;
/* 168 */     }
/* 169 */ 
/* 170 */     if (settings.contentType) settings.headers['Content-Type'] = settings.contentType;
/* 171 */     for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name]);
/* 172 */     xhr.send(settings.data);
/* 173 */ 
/* 174 */     return xhr;
/* 175 */   };
/* 176 */ 
/* 177 */   // ### $.get
/* 178 */   //
/* 179 */   // Load data from the server using a GET request
/* 180 */   //
/* 181 */   // *Arguments:*
/* 182 */   //
/* 183 */   //     url     — url to which the request is sent
/* 184 */   //     success — callback that is executed if the request succeeds
/* 185 */   //
/* 186 */   // *Example:*
/* 187 */   //
/* 188 */   //     $.get(
/* 189 */   //        '/projects/42',
/* 190 */   //        function (data) {
/* 191 */   //            $('body').append(data);
/* 192 */   //        }
/* 193 */   //     );
/* 194 */   //
/* 195 */   $.get = function(url, success){ $.ajax({ url: url, success: success }) };
/* 196 */ 
/* 197 */   // ### $.post
/* 198 */   //
/* 199 */   // Load data from the server using POST request
/* 200 */   //

/* ajax.js */

/* 201 */   // *Arguments:*
/* 202 */   //
/* 203 */   //     url        — url to which the request is sent
/* 204 */   //     [data]     — data to send to server, can be string or object
/* 205 */   //     [success]  — callback that is executed if the request succeeds
/* 206 */   //     [dataType] — type of expected response
/* 207 */   //                  'json', 'xml', 'html', or 'text'
/* 208 */   //
/* 209 */   // *Example:*
/* 210 */   //
/* 211 */   //     $.post(
/* 212 */   //        '/projects',
/* 213 */   //        { name: 'Zepto.js' },
/* 214 */   //        function (data) {
/* 215 */   //            $('body').append(data);
/* 216 */   //        },
/* 217 */   //        'html'
/* 218 */   //     );
/* 219 */   //
/* 220 */   $.post = function(url, data, success, dataType){
/* 221 */     if ($.isFunction(data)) dataType = dataType || success, success = data, data = null;
/* 222 */     $.ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType });
/* 223 */   };
/* 224 */ 
/* 225 */   // ### $.getJSON
/* 226 */   //
/* 227 */   // Load JSON from the server using GET request
/* 228 */   //
/* 229 */   // *Arguments:*
/* 230 */   //
/* 231 */   //     url     — url to which the request is sent
/* 232 */   //     success — callback that is executed if the request succeeds
/* 233 */   //
/* 234 */   // *Example:*
/* 235 */   //
/* 236 */   //     $.getJSON(
/* 237 */   //        '/projects/42',
/* 238 */   //        function (json) {
/* 239 */   //            projects.push(json);
/* 240 */   //        }
/* 241 */   //     );
/* 242 */   //
/* 243 */   $.getJSON = function(url, success){ return $.ajax({ url: url, success: success, dataType: 'json' }) };
/* 244 */ 
/* 245 */   // ### $.fn.load
/* 246 */   //
/* 247 */   // Load data from the server into an element
/* 248 */   //
/* 249 */   // *Arguments:*
/* 250 */   //

/* ajax.js */

/* 251 */   //     url     — url to which the request is sent
/* 252 */   //     [success] — callback that is executed if the request succeeds
/* 253 */   //
/* 254 */   // *Examples:*
/* 255 */   //
/* 256 */   //     $('#project_container').get(
/* 257 */   //        '/projects/42',
/* 258 */   //        function () {
/* 259 */   //            alert('Project was successfully loaded');
/* 260 */   //        }
/* 261 */   //     );
/* 262 */   //
/* 263 */   //     $('#project_comments').get(
/* 264 */   //        '/projects/42 #comments',
/* 265 */   //        function () {
/* 266 */   //            alert('Comments was successfully loaded');
/* 267 */   //        }
/* 268 */   //     );
/* 269 */   //
/* 270 */   $.fn.load = function(url, success){
/* 271 */     if (!this.length) return this;
/* 272 */     var self = this, parts = url.split(/\s/), selector;
/* 273 */     if (parts.length > 1) url = parts[0], selector = parts[1];
/* 274 */     $.get(url, function(response){
/* 275 */       self.html(selector ?
/* 276 */         $(document.createElement('div')).html(response).find(selector).html()
/* 277 */         : response);
/* 278 */       success && success();
/* 279 */     });
/* 280 */     return this;
/* 281 */   };
/* 282 */ 
/* 283 */   // ### $.param
/* 284 */   //
/* 285 */   // Encode object as a string for submission
/* 286 */   //
/* 287 */   // *Arguments:*
/* 288 */   //
/* 289 */   //     obj — object to serialize
/* 290 */   //     [v] — root node
/* 291 */   //
/* 292 */   // *Example:*
/* 293 */   //
/* 294 */   //     $.param( { name: 'Zepto.js', version: '0.6' } );
/* 295 */   //
/* 296 */   $.param = function(obj, v){
/* 297 */     var result = [], add = function(key, value){
/* 298 */       result.push(encodeURIComponent(v ? v + '[' + key + ']' : key)
/* 299 */         + '=' + encodeURIComponent(value));
/* 300 */       },

/* ajax.js */

/* 301 */       isObjArray = $.isArray(obj);
/* 302 */ 
/* 303 */     for(key in obj)
/* 304 */       if(isObject(obj[key]))
/* 305 */         result.push($.param(obj[key], (v ? v + '[' + key + ']' : key)));
/* 306 */       else
/* 307 */         add(isObjArray ? '' : key, obj[key]);
/* 308 */ 
/* 309 */     return result.join('&').replace('%20', '+');
/* 310 */   };
/* 311 */ })(Zepto);
/* 312 */ 

;
/* event.js */

/* 1   */ //     Zepto.js
/* 2   */ //     (c) 2010, 2011 Thomas Fuchs
/* 3   */ //     Zepto.js may be freely distributed under the MIT license.
/* 4   */ 
/* 5   */ (function($){
/* 6   */   var $$ = $.qsa, handlers = {}, _zid = 1;
/* 7   */   function zid(element) {
/* 8   */     return element._zid || (element._zid = _zid++);
/* 9   */   }
/* 10  */   function findHandlers(element, event, fn, selector) {
/* 11  */     event = parse(event);
/* 12  */     if (event.ns) var matcher = matcherFor(event.ns);
/* 13  */     return (handlers[zid(element)] || []).filter(function(handler) {
/* 14  */       return handler
/* 15  */         && (!event.e  || handler.e == event.e)
/* 16  */         && (!event.ns || matcher.test(handler.ns))
/* 17  */         && (!fn       || handler.fn == fn)
/* 18  */         && (!selector || handler.sel == selector);
/* 19  */     });
/* 20  */   }
/* 21  */   function parse(event) {
/* 22  */     var parts = ('' + event).split('.');
/* 23  */     return {e: parts[0], ns: parts.slice(1).sort().join(' ')};
/* 24  */   }
/* 25  */   function matcherFor(ns) {
/* 26  */     return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
/* 27  */   }
/* 28  */     
/* 29  */   function add(element, events, fn, selector, delegate){
/* 30  */     var id = zid(element), set = (handlers[id] || (handlers[id] = []));
/* 31  */     events.split(/\s/).forEach(function(event){
/* 32  */       var callback = delegate || fn;
/* 33  */       var proxyfn = function (event) {
/* 34  */         var result = callback.apply(element, [event].concat(event.data));
/* 35  */         if (result === false) {
/* 36  */           event.preventDefault();
/* 37  */         }
/* 38  */         return result;
/* 39  */       };
/* 40  */       var handler = $.extend(parse(event), {fn: fn, proxy: proxyfn, sel: selector, del: delegate, i: set.length});
/* 41  */       set.push(handler);
/* 42  */       element.addEventListener(handler.e, proxyfn, false);
/* 43  */     });
/* 44  */   }
/* 45  */   function remove(element, events, fn, selector){
/* 46  */     var id = zid(element);
/* 47  */     (events || '').split(/\s/).forEach(function(event){
/* 48  */       findHandlers(element, event, fn, selector).forEach(function(handler){
/* 49  */         delete handlers[id][handler.i];
/* 50  */         element.removeEventListener(handler.e, handler.proxy, false);

/* event.js */

/* 51  */       });
/* 52  */     });
/* 53  */   }
/* 54  */ 
/* 55  */   $.event = { add: add, remove: remove }
/* 56  */ 
/* 57  */   $.fn.bind = function(event, callback){
/* 58  */     return this.each(function(){
/* 59  */       add(this, event, callback);
/* 60  */     });
/* 61  */   };
/* 62  */   $.fn.unbind = function(event, callback){
/* 63  */     return this.each(function(){
/* 64  */       remove(this, event, callback);
/* 65  */     });
/* 66  */   };
/* 67  */   $.fn.one = function(event, callback){
/* 68  */     return this.each(function(){
/* 69  */       var self = this;
/* 70  */       add(this, event, function wrapper(evt){
/* 71  */         callback.call(self, evt);
/* 72  */         remove(self, event, arguments.callee);
/* 73  */       });
/* 74  */     });
/* 75  */   };
/* 76  */ 
/* 77  */   var returnTrue = function(){return true},
/* 78  */       returnFalse = function(){return false},
/* 79  */       eventMethods = {
/* 80  */         preventDefault: 'isDefaultPrevented',
/* 81  */         stopImmediatePropagation: 'isImmediatePropagationStopped',
/* 82  */         stopPropagation: 'isPropagationStopped'
/* 83  */       };
/* 84  */   function createProxy(event) {
/* 85  */     var proxy = $.extend({originalEvent: event}, event);
/* 86  */     $.each(eventMethods, function(name, predicate) {
/* 87  */       proxy[name] = function(){
/* 88  */         this[predicate] = returnTrue;
/* 89  */         return event[name].apply(event, arguments);
/* 90  */       };
/* 91  */       proxy[predicate] = returnFalse;
/* 92  */     })
/* 93  */     return proxy;
/* 94  */   }
/* 95  */ 
/* 96  */   $.fn.delegate = function(selector, event, callback){
/* 97  */     return this.each(function(i, element){
/* 98  */       add(element, event, callback, selector, function(e, data){
/* 99  */         var target = e.target, nodes = $$(element, selector);
/* 100 */         while (target && nodes.indexOf(target) < 0) target = target.parentNode;

/* event.js */

/* 101 */         if (target && !(target === element) && !(target === document)) {
/* 102 */           callback.call(target, $.extend(createProxy(e), {
/* 103 */             currentTarget: target, liveFired: element
/* 104 */           }), data);
/* 105 */         }
/* 106 */       });
/* 107 */     });
/* 108 */   };
/* 109 */   $.fn.undelegate = function(selector, event, callback){
/* 110 */     return this.each(function(){
/* 111 */       remove(this, event, callback, selector);
/* 112 */     });
/* 113 */   }
/* 114 */ 
/* 115 */   $.fn.live = function(event, callback){
/* 116 */     $(document.body).delegate(this.selector, event, callback);
/* 117 */     return this;
/* 118 */   };
/* 119 */   $.fn.die = function(event, callback){
/* 120 */     $(document.body).undelegate(this.selector, event, callback);
/* 121 */     return this;
/* 122 */   };
/* 123 */ 
/* 124 */   $.fn.trigger = function(event, data){
/* 125 */     if (typeof event == 'string') event = $.Event(event);
/* 126 */     event.data = data;
/* 127 */     return this.each(function(){ this.dispatchEvent(event) });
/* 128 */   };
/* 129 */ 
/* 130 */   // triggers event handlers on current element just as if an event occurred,
/* 131 */   // doesn't trigger an actual event, doesn't bubble
/* 132 */   $.fn.triggerHandler = function(event, data){
/* 133 */     var e, result;
/* 134 */     this.each(function(i, element){
/* 135 */       e = createProxy(typeof event == 'string' ? $.Event(event) : event);
/* 136 */       e.data = data; e.target = element;
/* 137 */       $.each(findHandlers(element, event.type || event), function(i, handler){
/* 138 */         result = handler.proxy(e);
/* 139 */         if (e.isImmediatePropagationStopped()) return false;
/* 140 */       });
/* 141 */     });
/* 142 */     return result;
/* 143 */   };
/* 144 */ 
/* 145 */   // shortcut methods for `.bind(event, fn)` for each event type
/* 146 */   ('focusin focusout load resize scroll unload click dblclick '+
/* 147 */   'mousedown mouseup mousemove mouseover mouseout '+
/* 148 */   'change select keydown keypress keyup error').split(' ').forEach(function(event) {
/* 149 */     $.fn[event] = function(callback){ return this.bind(event, callback) };
/* 150 */   });

/* event.js */

/* 151 */ 
/* 152 */   ['focus', 'blur'].forEach(function(name) {
/* 153 */     $.fn[name] = function(callback) {
/* 154 */       if (callback) this.bind(name, callback);
/* 155 */       else if (this.length) try { this.get(0)[name]() } catch(e){};
/* 156 */       return this;
/* 157 */     };
/* 158 */   });
/* 159 */ 
/* 160 */   $.Event = function(type, props) {
/* 161 */     var event = document.createEvent('Events');
/* 162 */     if (props) $.extend(event, props);
/* 163 */     event.initEvent(type, !(props && props.bubbles === false), true);
/* 164 */     return event;
/* 165 */   };
/* 166 */ 
/* 167 */ })(Zepto);
/* 168 */ 

;
/* doat-enhance.js */

/* 1   */ // events.js
/* 2   */ (function($){
/* 3   */     var $$ = $.qsa, handlers = {}, _zid = 1;
/* 4   */     
/* 5   */     function zid(element) {
/* 6   */         return element._zid || (element._zid = _zid++);
/* 7   */     }
/* 8   */     
/* 9   */     function findHandlers(element, event, fn, selector) {
/* 10  */         event = parse(event);
/* 11  */         if (event.ns) var matcher = matcherFor(event.ns);
/* 12  */         return (handlers[zid(element)] || []).filter(function(handler) {
/* 13  */           return handler
/* 14  */             && (!event.e  || handler.e == event.e)
/* 15  */             && (!event.ns || matcher.test(handler.ns))
/* 16  */             && (!fn       || handler.fn == fn)
/* 17  */             && (!selector || handler.sel == selector);
/* 18  */         });
/* 19  */       }
/* 20  */       
/* 21  */       function parse(event) {
/* 22  */         var parts = ('' + event).split('.');
/* 23  */         return {e: parts[0], ns: parts.slice(1).sort().join(' ')};
/* 24  */       }
/* 25  */       function matcherFor(ns) {
/* 26  */         return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
/* 27  */       }
/* 28  */       
/* 29  */     $.fn.click = function(cb){
/* 30  */         if (cb){
/* 31  */             return $(this).bind('click', cb);
/* 32  */         }
/* 33  */         else{
/* 34  */             var e = document.createEvent("MouseEvents");
/* 35  */             e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
/* 36  */             this[0].dispatchEvent(e);
/* 37  */         }
/* 38  */     };
/* 39  */     
/* 40  */     ("dblclick mouseenter mouseleave submit").split(' ').forEach(function(event) {
/* 41  */         $.fn[event] = function(callback){ return this.bind(event, callback) };
/* 42  */     });
/* 43  */     
/* 44  */     function add(element, events, data, fn, selector, delegate){    
/* 45  */         var id = zid(element), set = (handlers[id] || (handlers[id] = []));
/* 46  */         events.split(/\s/).forEach(function(event){
/* 47  */             var handler = $.extend(parse(event), {fn: fn, sel: selector, del: delegate, i: set.length});
/* 48  */             set.push(handler);
/* 49  */             element.addEventListener(handler.e, delegate || function(e){e.data = data; fn.call(element, e)}, false);
/* 50  */         });

/* doat-enhance.js */

/* 51  */     }
/* 52  */     
/* 53  */     function remove(element, events, fn, selector){
/* 54  */         var id = zid(element);
/* 55  */         (events || '').split(/\s/).forEach(function(event){
/* 56  */           findHandlers(element, event, fn, selector).forEach(function(handler){
/* 57  */             delete handlers[id][handler.i];
/* 58  */             element.removeEventListener(handler.e, handler.del || handler.fn, false);
/* 59  */           });
/* 60  */         });
/* 61  */       }
/* 62  */ 
/* 63  */     $.event = {
/* 64  */         add: function(element, events, data, fn){
/* 65  */             add(element, events, data, fn);
/* 66  */         },
/* 67  */         remove: function(element, events, fn){
/* 68  */             remove(element, events, fn);
/* 69  */         }
/* 70  */     };
/* 71  */ 
/* 72  */     $.fn.bind = function(event, arg2, arg3){
/* 73  */         var data, fn = arg2;
/* 74  */         if (arg3 instanceof Function){
/* 75  */             data = arg2;
/* 76  */             fn = arg3;
/* 77  */         }
/* 78  */         return this.each(function(){
/* 79  */             add(this, event, data, fn);
/* 80  */         });
/* 81  */     };
/* 82  */     $.fn.unbind = function(event, callback){
/* 83  */         return this.each(function(){
/* 84  */             remove(this, event, callback);
/* 85  */         });
/* 86  */     };
/* 87  */ })(Zepto);
/* 88  */ 
/* 89  */   
/* 90  */  // fx.js
/* 91  */ (function($){ 
/* 92  */     var transfromKeys = ['scale', 'rotate', 'skew', 'translate', 'matrix'];
/* 93  */ 
/* 94  */     css();
/* 95  */ 
/* 96  */     $.fn.stop = function(){
/* 97  */         return $(this);
/* 98  */     };
/* 99  */ 
/* 100 */     $.fn.animate = function(){

/* doat-enhance.js */

/* 101 */         var $el = this;
/* 102 */         var k, props, dur, ease, callbacks = [];
/* 103 */         for (var i=1; i<arguments.length; i++){
/* 104 */             var arg = arguments[i];
/* 105 */             if (typeof arg === 'function'){
/* 106 */                 callbacks.push(arg);
/* 107 */             }
/* 108 */             else if (arg === 'fast' || arg === 'slow'){
/* 109 */                 dur = arg;
/* 110 */             }
/* 111 */             else if (typeof arg === 'string'){
/* 112 */                 ease = arg;
/* 113 */             }
/* 114 */             else {
/* 115 */                 dur = arg;
/* 116 */             }
/* 117 */         }
/* 118 */ 
/* 119 */         // CSS properties
/* 120 */         props = arguments[0];
/* 121 */         props['-webkit-transform'] = '';
/* 122 */         for (k in props){
/* 123 */             var val;
/* 124 */             if (props[k].toString().indexOf('=')!==-1){
/* 125 */                 props[k] = getIncVal($el, k, props[k]);
/* 126 */             }
/* 127 */             if (isTransform(k)){
/* 128 */                 props['-webkit-transform']+= k+'('+props[k]+')';
/* 129 */                 delete props[k];
/* 130 */             }
/* 131 */             else if (k === 'left' || k === 'right'){
/* 132 */                 val = (k === 'right') ? reverse(props[k]) : props[k];
/* 133 */                 props['-webkit-transform']+= 'translateX('+val+')';
/* 134 */                 delete props[k];
/* 135 */             }
/* 136 */             else if (k === 'bottom' || k === 'top'){
/* 137 */                 val = (k === 'bottom') ? reverse(props[k]) : props[k];
/* 138 */                 props['-webkit-transform']+= 'translateY('+val+')';
/* 139 */                 delete props[k];
/* 140 */             }
/* 141 */         }
/* 142 */ 
/* 143 */         // Duration
/* 144 */         dur = (dur === 'fast') ? 0.2 : (dur === 'slow') ? 0.6 : dur/1000 || 0.3;
/* 145 */ 
/* 146 */         // Easing
/* 147 */         ease = (!ease || ease === 'swing') ? 'ease-in-out' : ease;
/* 148 */ 
/* 149 */         // Callback
/* 150 */         if (callbacks.length > 0){

/* doat-enhance.js */

/* 151 */             setTimeout(function(){
/* 152 */                 var i, len = callbacks.length;
/* 153 */                 for (i=0; i<len; i++){
/* 154 */                   callbacks[i].call($el);
/* 155 */                 }
/* 156 */             }, dur*1000);
/* 157 */         }
/* 158 */ 
/* 159 */         // Execute CSS properties
/* 160 */         props['-webkit-transition'] = 'all '+dur+'s '+ease;
/* 161 */         return $el.css(props);
/* 162 */     }
/* 163 */ 
/* 164 */     function isTransform(k){
/* 165 */         for (var i=0; i<transfromKeys.length; i++){
/* 166 */             if (k.indexOf(transfromKeys[i])!==-1){
/* 167 */                 return true;
/* 168 */                 break;
/* 169 */             }
/* 170 */         }
/* 171 */         return false;
/* 172 */     }
/* 173 */ 
/* 174 */     function reverse(v){
/* 175 */         v = v.toString();
/* 176 */         return (v.indexOf('-') === 0) ? v.substring(1, v.length) : '-'+v;
/* 177 */     }
/* 178 */ 
/* 179 */     function getIncVal(el, propName, value){
/* 180 */         var inc = (value.indexOf('-=')!==-1) ? -1 : 1;
/* 181 */         value = value.toString();
/* 182 */         var num = parseInt(value.substring(2, value.length), 10).toString();
/* 183 */         var unit = value.substring(2+num.length, value.length);
/* 184 */         var curValue = el.css(propName);
/* 185 */         curValue = (curValue && curValue !== '') ? parseInt(curValue, 10) : 0;
/* 186 */         var newValue = curValue+(inc*num)+unit;
/* 187 */         return newValue;
/* 188 */     }
/* 189 */ 
/* 190 */     function css(){
/* 191 */         
/* 192 */         $('.doml_content, .touchyjs-content').css({
/* 193 */             '-webkit-transform': 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)',
/* 194 */             '-webkit-box-sizing': 'border-box',
/* 195 */             '-webkit-backface-visibility': 'hidden'
/* 196 */         });
/* 197 */     }
/* 198 */ })(Zepto);
/* 199 */ 
/* 200 */ // zepto.js

/* doat-enhance.js */

/* 201 */ (function($){  
/* 202 */     $.qsa = $$ = function(element, selector){
/* 203 */         try{
/* 204 */             return slice.call(element.querySelectorAll(selector))
/* 205 */         }
/* 206 */         catch(e){}
/* 207 */     }
/* 208 */   
/* 209 */     $.trim = function(str){
/* 210 */         return str.trim();
/* 211 */     };
/* 212 */ 
/* 213 */     $.css = function(el, prop) {
/* 214 */         return $(el).css(prop);
/* 215 */     };
/* 216 */   
/* 217 */     $.fn.show = function(){
/* 218 */         if (!this[0]){return this;}
/* 219 */         var val = /^(ADDRESS|BLOCKQUOTE|CENTER|DIR|DIV|DL|FIELDSET|FORM|H\d|HR|MENU|OL|P|PRE|TABLE|UL)$/.test(this[0].nodeName) ? 'block' : (/^LI$/.test(this[0].nodeName)) ? 'list-item' : 'inline';
/* 220 */         return this.css('display', val);
/* 221 */     };
/* 222 */   
/* 223 */     $.fn.val = function(value){
/* 224 */       var returnVal;
/* 225 */         if (value === undefined){
/* 226 */             returnVal = (this.length > 0) ? this[0].value : null;
/* 227 */         }
/* 228 */         else{
/* 229 */             this.each(function(){
/* 230 */             this.value = value;
/* 231 */             });
/* 232 */             returnVal = $(this);
/* 233 */         }
/* 234 */         return returnVal;
/* 235 */     };
/* 236 */     
/* 237 */     $.fn.offset = function(){
/* 238 */         if (this[0].getBoundingClientRect){
/* 239 */             var obj = this[0].getBoundingClientRect();
/* 240 */             return {
/* 241 */             left: obj.left + document.body.scrollLeft,
/* 242 */             top: obj.top + document.body.scrollTop,
/* 243 */             width: obj.width,
/* 244 */             height: obj.height
/* 245 */             };
/* 246 */         }
/* 247 */         else{
/* 248 */             return {left: 0, top: 0, width: this[0].innerWidth, height: this[0].innerHeight}
/* 249 */         }
/* 250 */     };

/* doat-enhance.js */

/* 251 */     
/* 252 */     $.fn.scrollTop = function(val){
/* 253 */         return val ? this[0].scrollTop = val : this[0].scrollTop;
/* 254 */     };
/* 255 */     
/* 256 */     $.fn.slice = function(from, to){
/* 257 */         var arr = (this.selector && this.selector.slice) ? this.selector : this;
/* 258 */         return arr.slice(from, to);
/* 259 */     };
/* 260 */     
/* 261 */     ['width', 'height'].forEach(function(property){
/* 262 */         $.fn[property] = function(arg){
/* 263 */             if (arg !== 'null' && arg !== undefined){
/* 264 */             // If arg ihas no unit - attach 'px'
/* 265 */                 if (!isNaN(arg) || parseInt(arg, 10).toString() === arg){
/* 266 */                     arg+= 'px';
/* 267 */                 }
/* 268 */                 return $(this).css(property, arg);
/* 269 */             }   
/* 270 */             else{
/* 271 */                 return this.offset()[property];
/* 272 */             }
/* 273 */         }
/* 274 */     });
/* 275 */ })(Zepto);
/* 276 */ 
/* 277 */ function normalizeArguments(args){
/* 278 */     var val = {};
/* 279 */     for (var i=0; i<args.length; i++){
/* 280 */         var arg = args[i];
/* 281 */         if (typeof arg === 'function'){
/* 282 */             val.cb = arg;
/* 283 */         }
/* 284 */         else if (arg === 'fast' || arg === 'slow'){
/* 285 */             val.dur = arg;
/* 286 */         }
/* 287 */         else if (typeof arg === 'string'){
/* 288 */             val.ease = arg;
/* 289 */         }
/* 290 */         else {
/* 291 */             val.dur = arg;
/* 292 */         }
/* 293 */     }
/* 294 */     return val;
/* 295 */ }
/* 296 */ 
