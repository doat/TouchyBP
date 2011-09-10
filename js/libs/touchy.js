 /* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

(function(){
/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

/**
* @description Enables attachment of callback functions to Doat events
* @class
*/
var Doat_Events = function(){
    var self = this,
        eventArr = {};
    
    // Public Methods
    this.addEventListener = function(type, cb){
        var evt = eventArr[type];
        if (!evt){
            eventArr[type] = {
                'callbacks': [],
                'enabled': false
            };
            evt = eventArr[type];
        }
        evt['callbacks'].push(cb);

        if (evt['enabled'] && evt['callOnce']){
            call(cb);
        }
    };
    
    this.dispatchEvent = function(type, cfg){
        var evt = eventArr[type];
        if (!evt){
            eventArr[type] = {
                'callbacks': [],
                'enabled': true
            };
            evt = eventArr[type];
        }
        else{
            var len = evt['callbacks'].length;
            for (var i=0; i< len; ++i ){
                call(evt['callbacks'][i]);
            }
        }
        if (cfg){
            aug(evt, cfg);
        }
    };

    var call = function(cb){
        //try{
            cb();
        //}
        /*catch(e){
            var log = Log || Doat.Log || (Logger) ? new Logger : null;
            if (log){
                log.error(e);
            }
        }*/
    };

    // shortcuts
    this.ready = function(cb){
        self.addEventListener('ready', cb);
    };

    this.focused = function(cb){
        self.addEventListener('focused', cb);
    };

    this.blurred = function(cb){
        self.addEventListener('blurred', cb);
    };

    this.hidden = function(cb){
        self.addEventListener('hidden', cb);
    };

    this.visible = function(cb){
        self.addEventListener('visible', cb);
    };

    // CONSTS
    this.NO_RESULTS         = 'no results';
    this.RENDER_START       = 'render start';
    this.RENDER_END         = 'render end';
    this.RENDER_VISIBLE_END = 'render visible end';
    this.SEARCH_START       = 'search request';
    this.SEARCH_END         = 'search response success';
    this.SEARCH_ERROR       = 'search response error';
    this.WINDOW_LOADED      = 'window loaded';
    this.DOAT_READY         = 'doat ready';
    this.DOCUMENT_READY     = 'document ready';
    this.USER_ACTION        = 'user action';
    this.PAGE_VIEW          = 'page view';

    
    // Specific event settings
    this.ready(function(){
        eventArr['ready'].enabled = true;
    });

    this.focused(function(){
        eventArr['focused'].enabled = true;
        eventArr['visible'].enabled = eventArr['hidden'].enabled = eventArr['blurred'].enabled = false;
    });

    this.visible(function(){
        eventArr['visible'].enabled = true;
        eventArr['focused'].enabled = eventArr['hidden'].enabled = eventArr['blurred'].enabled = false;
    });

    this.hidden(function(){
        eventArr['hidden'].enabled = true;
        eventArr['focused'].enabled = eventArr['visible'].enabled = eventArr['blurred'].enabled = false;
    });

    this.blurred(function(){
        eventArr['blurred'].enabled = true;
        eventArr['focused'].enabled = eventArr['visible'].enabled = eventArr['hidden'].enabled = false;
    });
};/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

/**
* A utility for getting info detected about the platform and browser running the script.
* @class
*/
function Doat_Env(cfg){
    var self = this,
        _info,
        _do_platform,        
        orientationPrefix = (typeof Doat !== "undefined") ? "doml-orientation-" : "orientation-",
        orientationRegEpx = new RegExp(orientationPrefix+"[^\s]*","g"),        
        isTouch = cfg && cfg.isTouch || ('ontouchstart' in window);
    
    /*onScreenChange(function(){
        updateOrientationClassName();
        _info.screen = _getScreen();
    });*/
    window.addEventListener('orientationchange', updateOrientationClassName, false);
    window.addEventListener('load', updateOrientationClassName, false);

    var _getInfo = function(uaStr){
        // If no uaStr (user agent string) was sent (for testing purposes)
        // Get it from the browser
        uaStr = (uaStr || navigator.userAgent).toLowerCase();
        
        _info = {};
        _info.platform = _getPlatform(uaStr);
        _info.browser = _getBrowser(uaStr);
        _info.os = _getOS(uaStr);
        _info.screen = _getScreen();
    };
    
    var _getPlatform = function(uaStr){
        var n = '', v = '', m;
        
        m = /(iphone|ipad)|(android)|(symbian)|(webOSos)|(windows phone os)/.exec(uaStr) || [];
        n = m[1] ||
            m[2] && '' ||
            m[3] && 'nokia'||
            m[4] && 'blackberry' ||
            m[5] && '' ||
            'desktop';  
        
        return {
            "name": n,
            "version": v
        }
    };
    
    var _getOS = function(uaStr){
        var n = '', v = '', m;
        
        m = /(iphone|ipad)|(android|symbian|webos)|(windows phone os)/.exec(uaStr) || [];
        n = m[1] && 'ios' ||
            m[2] ||
            m[3] && 'windowsphoneos';
        
        if (!n){
            m = /(Win32)|(Linux)|(MacIntel)/.exec(navigator.platform) || [];
            n = m[1] && 'windows' ||
                m[2] ||
                m[3] && 'mac' || '';
        }
        
        switch (n){
            case "ios":
                // ipad os 3_2 like
                // iphone os 3_0 like
                v = /os\s([\d_]+)\slike/.exec(uaStr);
                v = v[1].replace(/_/g, '.');
            break;
            case "android":
                // android 2.1-update1; en-us;
                // android 2.2; en-us;
                v = /android\s([\d\.\-]+)[^;]*;/.exec(uaStr);
                v = v[1].replace(/-/g, '');
            break;
        }
        
        return {
            "name": n,
            "version": v
        };
    };
    
    var _getBrowser = function(uaStr){
        var n, v = '', m;
        
        uaStr = uaStr.toLowerCase();
        
        m = /(webkit)[ \/]([\w.]+)/.exec( uaStr ) ||
            /(opera)(?:.*version)?[ \/]([\w.]+)/.exec( uaStr ) ||
            /(msie) ([\w.]+)/.exec( uaStr ) ||
            uaStr.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( uaStr ) ||
            [];
        n = m[1] || '';

        return {
            "name": n,
            "version": v
        };
    };
    
    var _getScreen = function(){
        var w="", h="";
        if (window.innerHeight){
            w = window.innerWidth;
            h = window.innerHeight;
        }
        else if (window.screen && window.screen.availHeight){
            w = window.screen.availWidth;
            h = window.screen.availHeight;
        }
        
        return {
            "width": w,
            "height": h
        }
    };
    
    function updateOrientationClassName(){
        switch (window.orientation) {
            case 90:
                o = 'landscape-right';
            break;
            case -90:
                o = 'landscape-left';
            break;
            default:
                o = 'portrait';
        }
        document.body.className = document.body.className.replace(orientationRegEpx, '') + ' ' + orientationPrefix+o;
    }
    
    /*function onScreenChange(cb){
        var CHANGE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize';
        window.addEventListener(CHANGE_EV, cb, false);
    }
    
    this.onScreenChange = onScreenChange;*/

    this.isTouch = function(){
        return isTouch;
    };

    this.isMobile = function(uaStr){        
        var p = self.getInfo(uaStr).platform.name;
        return cfg && cfg.isTouch || /^(iphone|ipad|android|symbian|webos|windowsphoneos)$/.test(p);
    };

    this.getInfo = function(){
        if (arguments[0] || !_info){
            var uaStr = (arguments[0] === true) ? undefined : arguments[0];
            _getInfo(uaStr);
        }
        return _info;
    };

    this.addEventListener = function(){
       if (typeof arguments[0] === 'string'){
            arguments[2] = arguments[1];
            arguments[1] = arguments[0];
            arguments[0] = document;
        }
        var el = arguments[0],
            type = arguments[1],
            cb = arguments[2],
            TOUCHSTART = self.isMobile() ? 'touchstart' : 'mousedown',
            TOUCHMOVE  = self.isMobile() ? 'touchmove' : 'mousemove',
            TOUCHEND   = self.isMobile() ? 'touchend' : 'mouseup';

        switch (type){
            case 'swipeX':
                addListener(el, 'swipeX', cb);
                break;
            case 'touch':
                var startPos, movePos, enableTouchMove = false;

                // touchstart
                addListener(el, TOUCHSTART, function(e){
                    e = e.originalEvent || e;  
                    //e.preventDefault(); // Meant to stop browser image dragging 
                    
                    startPos = {
                        'type': 'start',
                        'position': {
                            'x': e.touches ? e.touches[0].pageX : e.clientX,
                            'y': e.touches ? e.touches[0].pageY : e.clientY
                        }
                    };
                    cb(e, startPos);
                    
                    enableTouchMove = true;
                });

                // touchmove
                addListener(document, TOUCHMOVE, function(e){
                    if (!enableTouchMove) {return false;}
                    
                    e = e.originalEvent || e;
                    
                    movePos = {
                        'type': 'move',
                        'position': {
                            'x': e.touches ? e.touches[0].pageX : e.clientX,
                            'y': e.touches ? e.touches[0].pageY : e.clientY
                        }
                    }
                    movePos['delta'] = {
                        'x': movePos.position.x - startPos.position.x,
                        'y': movePos.position.y - startPos.position.y
                    }
                    cb(e, movePos);
                });

                // touchend
                addListener(document, TOUCHEND, function(e){                                        
                    enableTouchMove = false;
                    
                    // If the finger didn't move (onclick) - don't fire the event
                    if (!movePos || movePos.delta.x === 0 && movePos.delta.y === 0){
                        return false;
                    }
                    
                    e = e.originalEvent || e;

                    var data = {
                        'type': 'end',
                        'position': movePos.position,
                        'delta': movePos.delta,
                        'swipeEvent': true,
                        'direction': (movePos.delta.x > 0) ? 'ltr' : 'rtl'
                    };
                   
                    cb(e, data);
                    
                    movePos = undefined;
                });
            break;
        }
    }
}/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

/**
* Providing the ability to embed DOML tags inside the document HTML, parse and replace with predefined code.
* @class
*/
function Doat_DOML(){
    var imageTemplate = 'http://doatresizer.appspot.com/?url={src}&width={width}&height={height}&cache=short&crop={crop}', 
    templates = {
        'searchbar':{type: 'replace', html:
                        '<div><form '+
                            'id="doml-searchbar-form" '+
                            'onsubmit="{onsubmit}();Doat.Searchbar.onSubmit();return false;" '+
                            '>'+
                                '<input type="text" '+
                                'value="{defaulttext}" '+
                                'onfocus="Doat.Searchbar.clearValue(\'{defaulttext}\')" '+
                                'onblur="Doat.Searchbar.fillValue(\'{defaulttext}\')" '+
                                'id="doml-searchbar-searchfield" '+
                                'name="searchfield" '+
                                'style="{style}" '+
                                'clearbutton={clearbutton}' +
                                '/>'+
                        '</form></div>'},
        'navigate': {type: 'replace', html: '<a href="javascript://" class="{class}" onclick="Doat.Navigation.goTo(\'{to}\')"><span>{label}</span></a>'},
        'image': {type: 'image', html: '<img src="'+imageTemplate+'" alt="{alt}" />'}
    },
    prefix = 'doml',
    keyDefaultValues = {
        'autoinit': 'false'
    };

    var regex = /\{([^}]*)\}/g;
    
    var _renderAttributes = function(DOMLTag, templateString){
      var values = {};
      return templateString ? (''+templateString).replace(regex, function(ignored, key) {
          if (!values.hasOwnProperty(key)) {
              // Don't use hasAttribute - fails in IE8
              values[key] = DOMLTag.getAttribute(key) ? DOMLTag.getAttribute(key) :
                  keyDefaultValues.hasOwnProperty(key) ? keyDefaultValues[key] : '';
          }
          return values[key];
      }) : templateString;
    };

    var replace = function(replacedEl, newHTML){
        if ($(replacedEl).replaceWith){
            $(replacedEl).replaceWith($(newHTML));
        }
        else{
            var newEl = $(newHTML)[0];
            replacedEl.parentNode.replaceChild(newEl, replacedEl);
        }
    };

    /**
    * Searches for DOML tags inside the document, replacing them with DOML UI element code and functionality.
    */
    this.parse = function(container){
        !container && (container = document.body);
        // Loop through every template in 'templates' array
        for (var suffix in templates){
            if (templates.hasOwnProperty(suffix)){// Simply a 'for each' best practice
                // Essemble tag name (e.g. 'do:header')
                var DOMLTagName = prefix+':'+suffix;

                // Get all DOML tags, within the wrapper element, that match the doTagName
                var DOMLTagsArr = container.getElementsByTagName(DOMLTagName);

                // Loop through all tags found and wrap them with the specified element
                for (var i=0; i<DOMLTagsArr.length; i++){
                    var templateHTML = _renderAttributes(DOMLTagsArr[i], templates[suffix].html);
                    replace(DOMLTagsArr[i], templateHTML);
                    i--;
                }
            }
        }
    };
    
    this.getImage = function(cfg){
        var pseudoTag = new function(cfg){
            this.getAttribute = function(key){
                return cfg[key];
            }
        }(cfg);
        return _renderAttributes(pseudoTag, imageTemplate);
    }
}
/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

/**
* Instantiated if a DOML:searchbar tag was found in the document during parse()
* Gives a set of properties and methods for easy access to the DOM element and value.
* In touch interfaces (tablet, mobile...) it enables the key board to display a "search" button with submition functionality.
* @class
*/
var Doat_Searchbar = function(cfg){
    var inputEl, clearButton;

    this.autoinit = autoinit;
    this.clearValue = clearValue;
    this.fillValue = fillValue;
    this.setValue = setValue;
    this.getValue = getValue;
    this.getInputElement = getInputElement;
    this.onSubmit = onSubmit;
    this.blur = blur;
    this.focus = focus;
    
    Doat.Events.ready(init);
    
    function init(){
        inputEl = document.getElementById('doml-searchbar-searchfield');
        if (cfg && cfg.searchClearButton){
            addClearButton(cfg);   
        }
    }
    
    function addClearButton(cfg){
        if (getInputElement().getAttribute('clearbutton') !== ''){
            clearButton = new ClearButton();
            var css = cfg && cfg.css || {};
            !css['left'] && (css['left']= inputEl.offsetWidth);
            
            buttonEl = clearButton.init({
                'css': css,
                'onClick': function(){
                    setValue('');
                    focus();
                }
            });
            
            var form = getInputElement().parentNode;
            form.style.position = 'relative';
            form.appendChild(buttonEl);
        }
    }

    function clearValue(defaultText){
        if (defaultText === ''){return;}
        if (getValue() === defaultText){
            setValue('');
        }
    }

    function fillValue(defaultText){
        if (defaultText === ''){return;}
        if (getValue() === ''){
            setValue(defaultText);
        }
    }
    
    function focus(){
        inputEl.focus();
    }
    
    function blur(){
        inputEl.blur();
    }

    /**
    * @method setValue
    * @description Sets a new value to the searchbar textfield
    * @param {string|integer} value New value to set
    */
    function setValue (value){
        inputEl.value = value;
    }

    /**
    * @method getValue
    * @description Returns the current value of the searchbar textfield
    * @return {string} Current value of the searchbar textfield
    */
    function getValue(){
        return inputEl.value;
    }

    /**
    * @method getInputElement
    * @description Returns the generated searchbar textfield
    * @return {object HTMLInputElement} input
    */
    function getInputElement(){
        return inputEl;
    }

    /**
    * @method autoinit
    * @description Auto-searches the do_query value upon startup
    * @param {function} searchFunc The search function to be called
    * @ignore
    */
    function autoinit(searchFunc){
        setValue(Doat.getSearchQuery());
        searchFunc.call(this);
    }

    function onSubmit(){
        blur();
    }
};

function ClearButton(){
    var $el,
        css = {
           'position': 'absolute',
           'top': '5px',
           'cursor': 'pointer',
           'background-color': '#BBBBBB',
           'width': '16px',
           'height': '16px',
           'text-align': 'center',
           'line-height': '17px',
           'border-radius': '8px',
           '-webkitborder-radius': '8px',
           '-moz-border-radius': '8px',
           'color': 'white',
           'font-weight': 'bold',
           'font-size': '12px',
           'font-family': 'arial',
           'text-shadow': 'none',
           'leftOffset': -19
       };
    
    this.init = function(cfg){
        for (i in cfg.css) css[i] = cfg.css[i];
        css['left'] = css.left+css.leftOffset+'px';
        
        $el = $('<span/>');
        $el.addClass('doml-searchbar-clear')
           .html('X')
           .css(css)
           .click(function(e){
               e.preventDefault();
               cfg.onClick();
           });
        
        return $el[0];
    }
    
    this.show = function(){
        $el.show();
    };
        
    this.hide = function(){
        $el.hide();
    };
        
}
/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

/**
* Instantiated if a DOML:slider tag was found in the document during parse()
* @class
*/
var Doat_Slider = function(){
    var $el, isTouch, CSS_PREFIX, handle, track, preview, TOUCHSTART, TOUCHMOVE, TOUCHEND, trackWidth, currentIndex, itemPixelRange, onSelectCB;
    
    this.init = function(cfg){
        var $originalEl;
        if (cfg && cfg.id && document.getElementById(cfg.id)){
             $originalEl= $('#'+cfg.id);
        }
        else{
            return false;
        }       
        
        if (typeof Doat !== 'undefined'){
            isTouch = Doat.Env.isMobile();
            
            var b = Doat.Env.getInfo().browser;
            CSS_PREFIX = b === 'webkit' ? '-webkit-' : b === 'mozilla' ? '-moz-' : '';
        }
        else{
            isTouch = true;
        }
        trackWidth = cfg.trackWidth;
        
        onSelectCB = cfg.onSelect;
            
        TOUCHSTART = isTouch ? 'touchstart' : 'mousedown';
        TOUCHMOVE = isTouch ? 'touchmove' : 'mousemove';
        TOUCHEND = isTouch ? 'touchend' : 'mouseup';
        
        $el = $('<div class="doml-slider" />');
        $originalEl.parent().append($el);
        $el.append($originalEl);
        
        var itemArr = [];
        $originalEl.children().each(function(){
            var $tempWrap = $('<div/>');
            $(this).appendTo($tempWrap);
            itemArr.push($tempWrap.html());
        });
        itemArrLength = itemArr.length;     
        itemPixelRange = trackWidth / itemArrLength;
        
        var $wrapperEl = $('<div class="wrapper">');
        $wrapperEl.css('width', trackWidth+'px');       
        $el.append($wrapperEl);
        
        // Event Capture
        $eventCaptureEl = $('<div class="eventCapture" />');
        $eventCaptureEl.css('width', trackWidth+'px');      
        $eventCaptureEl.bind(TOUCHSTART, onTouchStart, false);
        document.addEventListener(TOUCHEND, onTouchEnd, false);     
        $wrapperEl.append($eventCaptureEl);
        
        // Handle
        handleWrapper = new HandleWrapper();
        var $handleWrapperEl = handleWrapper.init();        
        $wrapperEl.append($handleWrapperEl);
        
        // Preview
        preview = new Preview();
        var $previewEl = preview.init(itemArr);
        $handleWrapperEl.append($previewEl);
        
        return true;
    };
    
    var onTouchStart = function(e){
        document.addEventListener(TOUCHMOVE, onTouchMove, false);
        var pos = getPos(e);
        var newIndex = getNewIndex(pos);
        if (newIndex !== currentIndex){
            currentIndex = newIndex;
            preview.update(currentIndex);
        }
        handleWrapper.update(pos, currentIndex);    
        preview.show();
    };
    
    var onTouchMove = function(e){
        e.preventDefault(e);
        var pos = getPos(e);
        if (pos<=trackWidth && pos>=0){
            var newIndex = getNewIndex(pos);
            if (newIndex !== currentIndex){
                currentIndex = newIndex;
                preview.update(currentIndex);
            }
            handleWrapper.onTouchMove();
            handleWrapper.update(pos, currentIndex);
        }
    };
    
    var onTouchEnd = function(e){
        handleWrapper.onTouchEnd();
        document.removeEventListener(TOUCHMOVE, onTouchMove);
        var pos = getSnapPos(currentIndex);
        handleWrapper.update(pos);  
        preview.hide();
        if (onSelectCB) onSelectCB(currentIndex);
    };
        
    var getNewIndex = function(pos){
        var index = (pos / trackWidth) * itemArrLength;
        index = parseInt(index, 10);
        return index;
    };
    
    var getPos = function(e){       
        e = e.touches && e.touches[0] || e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0] || e;
        return e.clientX;
    };
    
    var getSnapPos = function(index){
        return index*itemPixelRange;
    };
    
    function HandleWrapper(){
        var $el;
        
        this.init = function(cfg){                              
            $el = $('<div class="handle_wrapper"><div class="handle"/></div>');
            
            return $el;
        };
        
        this.update = function(pos){
            updatePosition(pos);            
        };
        
        this.onTouchMove = function(){
            $el.addClass('dragged');
        };
        
        this.onTouchEnd = function(){
            $el.removeClass('dragged');
        };
        
        var updatePosition = function(left){
            $el.css(CSS_PREFIX+'transform', 'translateX('+left+'px)');
        };
    }
    
    function Preview(){
        var self = this;
        var $el, $contentEl, $indicatorEl, itemArr;
        
        this.init = function(_itemArr){
            itemArr = _itemArr;
            $el = $('<div class="preview"/>');
            $contentEl = $('<div class="content"/>');
            $el.append($contentEl);
            $indicatorEl = $('<span class="indicator"/>');
            $el.append($indicatorEl);
            self.hide();
            
            return $el;
        };
        
        this.show = function(){
            $el.addClass('displayed');
        };
        
        this.update = function(index){
            $contentEl.html(itemArr[index]);
            $indicatorEl.html(index+1+' of '+itemArr.length);
        };
        
        this.hide = function(){
            $el.removeClass('displayed');
        };
    }
};/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

/**
* Instantiated if a DOML:swiper tag was found in the document during parse()
* @class
*/
function Doat_Swiper() {
    var $el = null, $navEl = null, $itemsEl = null, selectCallback = null;
    var current = 0, currentTabs = 0, active = false, stopAutoplayOnTouch = true, thumbsSwipe = false;
    var ITEM_WIDTH = 320, THUMB_WIDTH = 0, NUMBER_OF_VISIBLE_THUMBS = 5, NUMBER_OF_ITEMS = 0, autoplayInterval = null;
    var ANIMATION_SPEED = "0.5", AUTOPLAY_SPEED = 4000;
    var _this = this;

    this.init = function(options) {
        options = options || {};
        
        $el = options.element || null;
        $navEl = options.navElement || null;
        $itemsEl = options.itemsElement || null;
        
        selectCallback = options.onSelect || null;
        
        options.itemWidth && (ITEM_WIDTH = options.itemWidth);
        options.thumbWidth && (THUMB_WIDTH = options.thumbWidth);
        options.numVisibleThumbs && (NUMBER_OF_VISIBLE_THUMBS = options.numVisibleThumbs);

        options.animationSpeed && (ANIMATION_SPEED = options.animationSpeed);
        
        options.autoplay && (typeof options.autoplay == "number") && (AUTOPLAY_SPEED = options.autoplay);
        stopAutoplayOnTouch = (typeof options.stopAutoplayOnTouch == "boolean")? options.stopAutoplayOnTouch : true;
        thumbsSwipe = (typeof options.thumbsSwipe == "boolean")? options.thumbsSwipe : false;

        onHitStartArr = [],
        onHitEndArr = [],
        onHitStart = function(){
            onHitStartArr.forEach(function(cb){
                cb.apply(arguments);
            });
        };
        onHitEnd = function(){
            onHitEndArr.forEach(function(cb){
                cb.apply(arguments);
            });
        };
        
        options.onHitStartCallback && onHitStartArr.push(options.onHitStartCallback);
        options.onHitEndCallback && onHitEndArr.push(options.onHitEndCallback);

        NUMBER_OF_ITEMS = $itemsEl.find("li").length;
        
        initDesign();
        addNavigationEvents();

        if ($navEl) {
            var $tabs = $navEl.find("li");
            $tabs.click(function(){
                _this.setItemByThumb(this);
            });
            $($tabs[0]).addClass("active");
        }

        show();
        if (options.autoplay) {
            _this.autoplayStart();
            if (options.stopAutoplayOnFocus) {
                Doat.Events.focused(function(){
                    _this.autoplayStop();
                });
                Doat.Events.blurred(function(){
                    _this.autoplayStart();
                });
            }
        }
    };

    function addNavigationEvents() {
        var element = $itemsEl.parent().get(0);
        Doat.Env.addEventListener(element, 'touch', function(e, data){
            switch (data.type){
                case "start":
                    disableAnimation($itemsEl);
                    stopAutoplayOnTouch && _this.autoplayStop();
                    break;
                case 'move':
                    _this.move(data.delta.x);
                    break;
                case 'end':
                    if (!data['swipeEvent']) {
                        _this.showCurrentItem();
                    } else {
                        e = e.originalEvent || e;
                        e.preventDefault();
                        enableAnimation($itemsEl);
                        if (data.direction == "rtl") {
                            _this.next();
                        } else {
                            _this.prev();
                        }
                    }
                    break;
            }
        });

        if ($navEl && thumbsSwipe) {
            element = $navEl.parent().get(0);
            Doat.Env.addEventListener(element, 'touch', function(e, data){
                switch (data.type){
                    case "start":
                        disableAnimation($navEl);
                        stopAutoplayOnTouch && _this.autoplayStop();
                        break;
                    case 'move':
                        _this.moveTabs(data.delta.x);
                        break;
                    case 'end':
                        if (!data['swipeEvent']) {
                            _this.showCurrentItem(true);
                        } else {
                            e = e.originalEvent || e;
                            e.preventDefault();
                            enableAnimation($navEl);
                            if (data.direction == "rtl") {
                                _this.nextTabs();
                            } else {
                                _this.prevTabs();
                            }
                        }
                        break;
                }
            });
        }

        $(document).bind("keyup", function(e) {
            if (active) {
                switch(e.keyCode) {
                    case 36: // HOME
                         stopAutoplayOnTouch && _this.autoplayStop();
                         _this.setItem(0);
                        break;
                    case 35: // END
                         stopAutoplayOnTouch && _this.autoplayStop();
                         _this.setItem(NUMBER_OF_ITEMS-1);
                        break;
                    case 39: // RIGHT
                         stopAutoplayOnTouch && _this.autoplayStop();
                         _this.next();
                        break;
                    case 37: // LEFT
                         stopAutoplayOnTouch && _this.autoplayStop();
                         _this.prev();
                        break;
                }
            }
        });
    }

    function initDesign() {
        preventFlicker($el);
        preventFlicker($navEl);
        preventFlicker($itemsEl);

        $itemsEl.parent().css({
            "width": ITEM_WIDTH + "px",
            "overflow": "hidden"
        });
        $itemsEl.find("li").css({
            "float": "left",
            "width": ITEM_WIDTH + "px"
        });
        $itemsEl.css({
            "width": (ITEM_WIDTH*NUMBER_OF_ITEMS) + "px",
            "list-style-type": "none",
            "overflow": "hidden"
        });
        
        if ($navEl && THUMB_WIDTH !== 0) {
            $navEl.css({
                "width": (THUMB_WIDTH*NUMBER_OF_ITEMS) + "px",
                "list-style-type": "none",
                "overflow": "hidden"
            });
        }
    }
    
    this.autoplayStart = function(){
        if (autoplayInterval !== null) {
            _this.autoplayStop();
        }
        
        autoplayInterval = setInterval(function(){
            _this.next(true);
        }, AUTOPLAY_SPEED);
    };
    
    this.autoplayStop = function(){
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    };

    this.show = function(cfg) {
        if (cfg && cfg.delay) {
            setTimeout(show, cfg.delay);
        } else {
            show();
        }
    };
    this.hide = function() {
        $el.hide();
        active = false;
    };
    
    function show(){
        $el.show();
        active = true;
    }

    this.removeItem = function(item) {
        var el = (typeof item == "number")? $itemsEl.children()[item] : item;
        var i = _this.index(el);
        
        $(el).remove();
        $navEl && $($navEl.children()[i]).remove();

        NUMBER_OF_ITEMS--;
        if (current == i) {
            current--;
            if (current <= 0) {
                current = 0;
            }
        }
        _this.showCurrentItem();
    };

    this.move = function(x) {
        $itemsEl.css({
            "-webkit-transform": "translate(" + -(current*ITEM_WIDTH-x) + "px)",
            "-moz-transform": "translate(" + -(current*ITEM_WIDTH-x) + "px)",
            "transform": "translate(" + -(current*ITEM_WIDTH-x) + "px)"
        });
    };
    this.moveTabs = function(x) {
        $navEl && $navEl.css({
            "-webkit-transform": "translate(" + -(currentTabs*THUMB_WIDTH-x) + "px)",
            "-moz-transform": "translate(" + -(currentTabs*THUMB_WIDTH-x) + "px)",
            "transform": "translate(" + -(currentTabs*THUMB_WIDTH-x) + "px)"
        });
    };
    this.prev = function() {
        current--;
        if (current < 0) {
            current = 0;
            onHitStart();
        }
        _this.showCurrentItem();
    };
    this.next = function(bFromAutoplay) {
        current++;
        if (current == NUMBER_OF_ITEMS) {
            current = (bFromAutoplay)? 0 : NUMBER_OF_ITEMS-1;
            onHitEnd();
        }
        _this.showCurrentItem();
    };
    this.prevTabs = function() {
        currentTabs-=NUMBER_OF_VISIBLE_THUMBS;
        if (currentTabs <= 0) {
            currentTabs = 0;
        }
        _this.showCurrentItem(true);
    };
    this.nextTabs = function() {
        currentTabs+=NUMBER_OF_VISIBLE_THUMBS;
        
        if (currentTabs >= NUMBER_OF_ITEMS - NUMBER_OF_VISIBLE_THUMBS) {
            currentTabs = NUMBER_OF_ITEMS - NUMBER_OF_VISIBLE_THUMBS;
        }
        _this.showCurrentItem(true);
    };

    this.setItemByThumb = function(el) {
        _this.setItem(_this.index(el));
    };

    this.index = function($el) {
        $el = $($el);
        var items = $el.parent().children();
        for (var i=0; i<items.length; i++) {
            if (items[i] == $el[0]) {
                return i;
            }
        }
        return -1;
    };
    
    this.setItem = function(index) {
        current = index;
        _this.showCurrentItem();
    };

    this.showCurrentItem = function(changeTabs) {
        var $elToMove = (changeTabs && $navEl)? $navEl : $itemsEl;
        var newPos = (changeTabs && $navEl)? -(currentTabs*THUMB_WIDTH) : -(current*ITEM_WIDTH);
        
        enableAnimation($elToMove);
        $elToMove.css({
            "-webkit-transform": "translate(" + newPos + "px)",
            "-moz-transform": "translate(" + newPos + "px)",
            "transform": "translate(" + newPos + "px)"
        });
        
        selectCallback && selectCallback(current);

        $itemsEl.find(".active").removeClass("active");
        $($itemsEl.children("li")[current]).addClass("active");
        
        if ($navEl) {
            $navEl.find(".active").removeClass("active");
            $($navEl.children("li")[current]).addClass("active");
        }

        if (!changeTabs) {
            var newTabsPosition = Math.floor(current/NUMBER_OF_VISIBLE_THUMBS)*NUMBER_OF_VISIBLE_THUMBS;
            if (newTabsPosition != currentTabs) {
                currentTabs = newTabsPosition;
                _this.showCurrentItem(true);
            }
        }
    };

    function disableAnimation($el) {
        $el.css({
            "-moz-transition": "-moz-transform 0s",
            "-webkit-transition": "-webkit-transform 0s",
            "transition": "transform 0s"
        });
    }

    function enableAnimation($el) {
        $el && $el.css({
            "-moz-transition": " -moz-transform " + ANIMATION_SPEED + "s ease-out",
            "-webkit-transition": "-webkit-transform " + ANIMATION_SPEED + "s ease-out",
            "transition": "transform " + ANIMATION_SPEED + "s ease-out"
        });
    }

    function preventFlicker($el) {
        $el && $el.css({
            "-webkit-transform": "translate3d(0px, 0px, 0px) rotate(0deg) scale(1)",
            "-webkit-box-sizing": "border-box",
            "-webkit-backface-visibility": "hidden"
        });
    }
}/*!
 * iScroll v4.1.9 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */

(function(){
var m = Math,
    vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
        (/firefox/i).test(navigator.userAgent) ? 'Moz' :
        'opera' in window ? 'O' : '',

    // Browser capabilities
    has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
    hasTouch = 'ontouchstart' in window,
    hasTransform = vendor + 'Transform' in document.documentElement.style,
    isAndroid = (/android/gi).test(navigator.appVersion),
    isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
    isPlaybook = (/playbook/gi).test(navigator.appVersion),
    hasTransitionEnd = isIDevice || isPlaybook,
    nextFrame = (function() {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function(callback) { return setTimeout(callback, 1); }
    })(),
    cancelFrame = (function () {
        return window.cancelRequestAnimationFrame
            || window.webkitCancelRequestAnimationFrame
            || window.mozCancelRequestAnimationFrame
            || window.oCancelRequestAnimationFrame
            || window.msCancelRequestAnimationFrame
            || clearTimeout
    })(),

    // Events
    RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
    START_EV = hasTouch ? 'touchstart' : 'mousedown',
    MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
    END_EV = hasTouch ? 'touchend' : 'mouseup',
    CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
    WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel',

    // Helpers
    trnOpen = 'translate' + (has3d ? '3d(' : '('),
    trnClose = has3d ? ',0)' : ')',

    // Constructor
    iScroll = function (el, options) {
        var that = this,
            doc = document,
            i;

        that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
        that.wrapper.style.overflow = 'hidden';
        that.scroller = that.wrapper.children[0];

        // Default options
        that.options = {
            hScroll: true,
            vScroll: true,
            x: 0,
            y: 0,
            bounce: true,
            bounceLock: false,
            momentum: true,
            lockDirection: true,
            useTransform: true,
            useTransition: false,
            topOffset: 0,
            checkDOMChanges: false,     // Experimental

            // Scrollbar
            hScrollbar: true,
            vScrollbar: true,
            fixedScrollbar: isAndroid,
            hideScrollbar: isIDevice,
            fadeScrollbar: isIDevice && has3d,
            scrollbarClass: '',

            // Zoom
            zoom: false,
            zoomMin: 1,
            zoomMax: 4,
            doubleTapZoom: 2,
            wheelAction: 'scroll',

            // Snap
            snap: false,
            snapThreshold: 1,

            // Events
            onRefresh: null,
            onBeforeScrollStart: function (e) { e.preventDefault(); },
            onScrollStart: null,
            onBeforeScrollMove: null,
            onScrollMove: null,
            onBeforeScrollEnd: null,
            onScrollEnd: null,
            onTouchEnd: null,
            onDestroy: null,
            onZoomStart: null,
            onZoom: null,
            onZoomEnd: null
        };

        // User defined options
        for (i in options) that.options[i] = options[i];
        
        // Set starting position
        that.x = that.options.x;
        that.y = that.options.y;

        // Normalize options
        that.options.useTransform = hasTransform ? that.options.useTransform : false;
        that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
        that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
        that.options.zoom = that.options.useTransform && that.options.zoom;
        that.options.useTransition = hasTransitionEnd && that.options.useTransition;
        
        // Set some default styles
        that.scroller.style[vendor + 'TransitionProperty'] = that.options.useTransform ? '-' + vendor.toLowerCase() + '-transform' : 'top left';
        that.scroller.style[vendor + 'TransitionDuration'] = '0';
        that.scroller.style[vendor + 'TransformOrigin'] = '0 0';
        if (that.options.useTransition) that.scroller.style[vendor + 'TransitionTimingFunction'] = 'cubic-bezier(0.33,0.66,0.66,1)';
        
        if (that.options.useTransform) that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose;
        else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';

        if (that.options.useTransition) that.options.fixedScrollbar = true;

        that.refresh();

        that._bind(RESIZE_EV, window);
        that._bind(START_EV);
        if (!hasTouch) {
            that._bind('mouseout', that.wrapper);
            that._bind(WHEEL_EV);
        }

        if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
            that._checkDOMChanges();
        }, 500);
    };

// Prototype
iScroll.prototype = {
    enabled: true,
    x: 0,
    y: 0,
    steps: [],
    scale: 1,
    currPageX: 0, currPageY: 0,
    pagesX: [], pagesY: [],
    aniTime: null,
    wheelZoomCount: 0,
    
    handleEvent: function (e) {
        var that = this;
        switch(e.type) {
            case START_EV:
                if (!hasTouch && e.button !== 0) return;
                that._start(e);
                break;
            case MOVE_EV: that._move(e); break;
            case END_EV:
            case CANCEL_EV: that._end(e); break;
            case RESIZE_EV: that._resize(); break;
            case WHEEL_EV: that._wheel(e); break;
            case 'mouseout': that._mouseout(e); break;
            case 'webkitTransitionEnd': that._transitionEnd(e); break;
        }
    },
    
    _checkDOMChanges: function () {
        if (this.moved || this.zoomed || this.animating ||
            (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;

        this.refresh();
    },
    
    _scrollbar: function (dir) {
        var that = this,
            doc = document,
            bar;

        if (!that[dir + 'Scrollbar']) {
            if (that[dir + 'ScrollbarWrapper']) {
                if (hasTransform) that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = '';
                that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
                that[dir + 'ScrollbarWrapper'] = null;
                that[dir + 'ScrollbarIndicator'] = null;
            }

            return;
        }

        if (!that[dir + 'ScrollbarWrapper']) {
            // Create the scrollbar wrapper
            bar = doc.createElement('div');

            if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
            else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');

            bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:opacity;-' + vendor + '-transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');

            that.wrapper.appendChild(bar);
            that[dir + 'ScrollbarWrapper'] = bar;

            // Create the scrollbar indicator
            bar = doc.createElement('div');
            if (!that.options.scrollbarClass) {
                bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-' + vendor + '-background-clip:padding-box;-' + vendor + '-box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';-' + vendor + '-border-radius:3px;border-radius:3px';
            }
            bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:-' + vendor + '-transform;-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-' + vendor + '-transition-duration:0;-' + vendor + '-transform:' + trnOpen + '0,0' + trnClose;
            if (that.options.useTransition) bar.style.cssText += ';-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';

            that[dir + 'ScrollbarWrapper'].appendChild(bar);
            that[dir + 'ScrollbarIndicator'] = bar;
        }

        if (dir == 'h') {
            that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
            that.hScrollbarIndicatorSize = m.max(m.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
            that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
            that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
            that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
        } else {
            that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
            that.vScrollbarIndicatorSize = m.max(m.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
            that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
            that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
            that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
        }

        // Reset position
        that._scrollbarPos(dir, true);
    },
    
    _resize: function () {
        var that = this;
        setTimeout(function () { that.refresh(); }, isAndroid ? 200 : 0);
    },
    
    _pos: function (x, y) {
        x = this.hScroll ? x : 0;
        y = this.vScroll ? y : 0;

        if (this.options.useTransform) {
            this.scroller.style[vendor + 'Transform'] = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + this.scale + ')';
        } else {
            x = m.round(x);
            y = m.round(y);
            this.scroller.style.left = x + 'px';
            this.scroller.style.top = y + 'px';
        }

        this.x = x;
        this.y = y;

        this._scrollbarPos('h');
        this._scrollbarPos('v');
    },

    _scrollbarPos: function (dir, hidden) {
        var that = this,
            pos = dir == 'h' ? that.x : that.y,
            size;

        if (!that[dir + 'Scrollbar']) return;

        pos = that[dir + 'ScrollbarProp'] * pos;

        if (pos < 0) {
            if (!that.options.fixedScrollbar) {
                size = that[dir + 'ScrollbarIndicatorSize'] + m.round(pos * 3);
                if (size < 8) size = 8;
                that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
            }
            pos = 0;
        } else if (pos > that[dir + 'ScrollbarMaxScroll']) {
            if (!that.options.fixedScrollbar) {
                size = that[dir + 'ScrollbarIndicatorSize'] - m.round((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
                if (size < 8) size = 8;
                that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
                pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
            } else {
                pos = that[dir + 'ScrollbarMaxScroll'];
            }
        }

        that[dir + 'ScrollbarWrapper'].style[vendor + 'TransitionDelay'] = '0';
        that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
        that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = trnOpen + (dir == 'h' ? pos + 'px,0' : '0,' + pos + 'px') + trnClose;
    },
    
    _start: function (e) {
        var that = this,
            point = hasTouch ? e.touches[0] : e,
            matrix, x, y,
            c1, c2;

        if (!that.enabled) return;

        if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);

        if (that.options.useTransition || that.options.zoom) that._transitionTime(0);

        that.moved = false;
        that.animating = false;
        that.zoomed = false;
        that.distX = 0;
        that.distY = 0;
        that.absDistX = 0;
        that.absDistY = 0;
        that.dirX = 0;
        that.dirY = 0;

        // Gesture start
        if (that.options.zoom && hasTouch && e.touches.length > 1) {
            c1 = m.abs(e.touches[0].pageX-e.touches[1].pageX);
            c2 = m.abs(e.touches[0].pageY-e.touches[1].pageY);
            that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);

            that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
            that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;

            if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
        }

        if (that.options.momentum) {
            if (that.options.useTransform) {
                // Very lame general purpose alternative to CSSMatrix
                matrix = getComputedStyle(that.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
                x = matrix[4] * 1;
                y = matrix[5] * 1;
            } else {
                x = getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
                y = getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
            }
            
            if (x != that.x || y != that.y) {
                if (that.options.useTransition) that._unbind('webkitTransitionEnd');
                else cancelFrame(that.aniTime);
                that.steps = [];
                that._pos(x, y);
            }
        }

        that.absStartX = that.x;    // Needed by snap threshold
        that.absStartY = that.y;

        that.startX = that.x;
        that.startY = that.y;
        that.pointX = point.pageX;
        that.pointY = point.pageY;

        that.startTime = e.timeStamp || Date.now();

        if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

        that._bind(MOVE_EV);
        that._bind(END_EV);
        that._bind(CANCEL_EV);
    },
    
    _move: function (e) {
        var that = this,
            point = hasTouch ? e.touches[0] : e,
            deltaX = point.pageX - that.pointX,
            deltaY = point.pageY - that.pointY,
            newX = that.x + deltaX,
            newY = that.y + deltaY,
            c1, c2, scale,
            timestamp = e.timeStamp || Date.now();

        if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);

        // Zoom
        if (that.options.zoom && hasTouch && e.touches.length > 1) {
            c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
            c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
            that.touchesDist = m.sqrt(c1*c1+c2*c2);

            that.zoomed = true;

            scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;

            if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
            else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);

            that.lastScale = scale / this.scale;

            newX = this.originX - this.originX * that.lastScale + this.x,
            newY = this.originY - this.originY * that.lastScale + this.y;

            this.scroller.style[vendor + 'Transform'] = trnOpen + newX + 'px,' + newY + 'px' + trnClose + ' scale(' + scale + ')';

            if (that.options.onZoom) that.options.onZoom.call(that, e);
            return;
        }

        that.pointX = point.pageX;
        that.pointY = point.pageY;

        // Slow down if outside of the boundaries
        if (newX > 0 || newX < that.maxScrollX) {
            newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
        }
        if (newY > that.minScrollY || newY < that.maxScrollY) { 
            newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
        }

        if (that.absDistX < 6 && that.absDistY < 6) {
            that.distX += deltaX;
            that.distY += deltaY;
            that.absDistX = m.abs(that.distX);
            that.absDistY = m.abs(that.distY);

            return;
        }

        // Lock direction
        if (that.options.lockDirection) {
            if (that.absDistX > that.absDistY + 5) {
                newY = that.y;
                deltaY = 0;
            } else if (that.absDistY > that.absDistX + 5) {
                newX = that.x;
                deltaX = 0;
            }
        }

        that.moved = true;
        that._pos(newX, newY);
        that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
        that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

        if (timestamp - that.startTime > 300) {
            that.startTime = timestamp;
            that.startX = that.x;
            that.startY = that.y;
        }
        
        if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
    },
    
    _end: function (e) {
        if (hasTouch && e.touches.length != 0) return;

        var that = this,
            point = hasTouch ? e.changedTouches[0] : e,
            target, ev,
            momentumX = { dist:0, time:0 },
            momentumY = { dist:0, time:0 },
            duration = (e.timeStamp || Date.now()) - that.startTime,
            newPosX = that.x,
            newPosY = that.y,
            distX, distY,
            newDuration,
            snap,
            scale;

        that._unbind(MOVE_EV);
        that._unbind(END_EV);
        that._unbind(CANCEL_EV);

        if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);

        if (that.zoomed) {
            scale = that.scale * that.lastScale;
            scale = Math.max(that.options.zoomMin, scale);
            scale = Math.min(that.options.zoomMax, scale);
            that.lastScale = scale / that.scale;
            that.scale = scale;

            that.x = that.originX - that.originX * that.lastScale + that.x;
            that.y = that.originY - that.originY * that.lastScale + that.y;
            
            that.scroller.style[vendor + 'TransitionDuration'] = '200ms';
            that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + that.scale + ')';
            
            that.zoomed = false;
            that.refresh();

            if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
            return;
        }

        if (!that.moved) {
            if (hasTouch) {
                if (that.doubleTapTimer && that.options.zoom) {
                    // Double tapped
                    clearTimeout(that.doubleTapTimer);
                    that.doubleTapTimer = null;
                    if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
                    that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
                    if (that.options.onZoomEnd) {
                        setTimeout(function() {
                            that.options.onZoomEnd.call(that, e);
                        }, 200); // 200 is default zoom duration
                    }
                } else {
                    that.doubleTapTimer = setTimeout(function () {
                        that.doubleTapTimer = null;

                        // Find the last touched element
                        target = point.target;
                        while (target.nodeType != 1) target = target.parentNode;

                        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
                            ev = document.createEvent('MouseEvents');
                            ev.initMouseEvent('click', true, true, e.view, 1,
                                point.screenX, point.screenY, point.clientX, point.clientY,
                                e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                                0, null);
                            ev._fake = true;
                            target.dispatchEvent(ev);
                        }
                    }, that.options.zoom ? 250 : 0);
                }
            }

            that._resetPos(200);

            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
            return;
        }

        if (duration < 300 && that.options.momentum) {
            momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
            momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

            newPosX = that.x + momentumX.dist;
            newPosY = that.y + momentumY.dist;

            if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
            if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
        }

        if (momentumX.dist || momentumY.dist) {
            newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);

            // Do we need to snap?
            if (that.options.snap) {
                distX = newPosX - that.absStartX;
                distY = newPosY - that.absStartY;
                if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) { that.scrollTo(that.absStartX, that.absStartY, 200); }
                else {
                    snap = that._snap(newPosX, newPosY);
                    newPosX = snap.x;
                    newPosY = snap.y;
                    newDuration = m.max(snap.time, newDuration);
                }
            }

            that.scrollTo(m.round(newPosX), m.round(newPosY), newDuration);

            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
            return;
        }

        // Do we need to snap?
        if (that.options.snap) {
            distX = newPosX - that.absStartX;
            distY = newPosY - that.absStartY;
            if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
            else {
                snap = that._snap(that.x, that.y);
                if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
            }

            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
            return;
        }

        that._resetPos(200);
        if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
    },
    
    _resetPos: function (time) {
        var that = this,
            resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
            resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

        if (resetX == that.x && resetY == that.y) {
            if (that.moved) {
                that.moved = false;
                if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);      // Execute custom code on scroll end
            }

            if (that.hScrollbar && that.options.hideScrollbar) {
                if (vendor == 'webkit') that.hScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
                that.hScrollbarWrapper.style.opacity = '0';
            }
            if (that.vScrollbar && that.options.hideScrollbar) {
                if (vendor == 'webkit') that.vScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
                that.vScrollbarWrapper.style.opacity = '0';
            }

            return;
        }

        that.scrollTo(resetX, resetY, time || 0);
    },

    _wheel: function (e) {
        var that = this,
            wheelDeltaX, wheelDeltaY,
            deltaX, deltaY,
            deltaScale;

        if ('wheelDeltaX' in e) {
            wheelDeltaX = e.wheelDeltaX / 12;
            wheelDeltaY = e.wheelDeltaY / 12;
        } else if ('detail' in e) {
            wheelDeltaX = wheelDeltaY = -e.detail * 3;
        } else {
            wheelDeltaX = wheelDeltaY = -e.wheelDelta;
        }
        
        if (that.options.wheelAction == 'zoom') {
            deltaScale = that.scale * Math.pow(2, 1/3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
            if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
            if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;
            
            if (deltaScale != that.scale) {
                if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
                that.wheelZoomCount++;
                
                that.zoom(e.pageX, e.pageY, deltaScale, 400);
                
                setTimeout(function() {
                    that.wheelZoomCount--;
                    if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
                }, 400);
            }
            
            return;
        }
        
        deltaX = that.x + wheelDeltaX;
        deltaY = that.y + wheelDeltaY;

        if (deltaX > 0) deltaX = 0;
        else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;

        if (deltaY > that.minScrollY) deltaY = that.minScrollY;
        else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;

        that.scrollTo(deltaX, deltaY, 0);
    },
    
    _mouseout: function (e) {
        var t = e.relatedTarget;

        if (!t) {
            this._end(e);
            return;
        }

        while (t = t.parentNode) if (t == this.wrapper) return;
        
        this._end(e);
    },

    _transitionEnd: function (e) {
        var that = this;

        if (e.target != that.scroller) return;

        that._unbind('webkitTransitionEnd');
        
        that._startAni();
    },


    /**
     *
     * Utilities
     *
     */
    _startAni: function () {
        var that = this,
            startX = that.x, startY = that.y,
            startTime = Date.now(),
            step, easeOut,
            animate;

        if (that.animating) return;
        
        if (!that.steps.length) {
            that._resetPos(400);
            return;
        }
        
        step = that.steps.shift();
        
        if (step.x == startX && step.y == startY) step.time = 0;

        that.animating = true;
        that.moved = true;
        
        if (that.options.useTransition) {
            that._transitionTime(step.time);
            that._pos(step.x, step.y);
            that.animating = false;
            if (step.time) that._bind('webkitTransitionEnd');
            else that._resetPos(0);
            return;
        }

        animate = function () {
            var now = Date.now(),
                newX, newY;

            if (now >= startTime + step.time) {
                that._pos(step.x, step.y);
                that.animating = false;
                if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);            // Execute custom code on animation end
                that._startAni();
                return;
            }

            now = (now - startTime) / step.time - 1;
            easeOut = m.sqrt(1 - now * now);
            newX = (step.x - startX) * easeOut + startX;
            newY = (step.y - startY) * easeOut + startY;
            that._pos(newX, newY);
            if (that.animating) that.aniTime = nextFrame(animate);
        };

        animate();
    },

    _transitionTime: function (time) {
        time += 'ms';
        this.scroller.style[vendor + 'TransitionDuration'] = time;
        if (this.hScrollbar) this.hScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
        if (this.vScrollbar) this.vScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
    },

    _momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
        var deceleration = 0.0006,
            speed = m.abs(dist) / time,
            newDist = (speed * speed) / (2 * deceleration),
            newTime = 0, outsideDist = 0;

        // Proportinally reduce speed if we are outside of the boundaries 
        if (dist > 0 && newDist > maxDistUpper) {
            outsideDist = size / (6 / (newDist / speed * deceleration));
            maxDistUpper = maxDistUpper + outsideDist;
            speed = speed * maxDistUpper / newDist;
            newDist = maxDistUpper;
        } else if (dist < 0 && newDist > maxDistLower) {
            outsideDist = size / (6 / (newDist / speed * deceleration));
            maxDistLower = maxDistLower + outsideDist;
            speed = speed * maxDistLower / newDist;
            newDist = maxDistLower;
        }

        newDist = newDist * (dist < 0 ? -1 : 1);
        newTime = speed / deceleration;

        return { dist: newDist, time: m.round(newTime) };
    },

    _offset: function (el) {
        var left = -el.offsetLeft,
            top = -el.offsetTop;
            
        while (el = el.offsetParent) {
            left -= el.offsetLeft;
            top -= el.offsetTop;
        }
        
        if (el != this.wrapper) {
            left *= this.scale;
            top *= this.scale;
        }

        return { left: left, top: top };
    },

    _snap: function (x, y) {
        var that = this,
            i, l,
            page, time,
            sizeX, sizeY;

        // Check page X
        page = that.pagesX.length - 1;
        for (i=0, l=that.pagesX.length; i<l; i++) {
            if (x >= that.pagesX[i]) {
                page = i;
                break;
            }
        }
        if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
        x = that.pagesX[page];
        sizeX = m.abs(x - that.pagesX[that.currPageX]);
        sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
        that.currPageX = page;

        // Check page Y
        page = that.pagesY.length-1;
        for (i=0; i<page; i++) {
            if (y >= that.pagesY[i]) {
                page = i;
                break;
            }
        }
        if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
        y = that.pagesY[page];
        sizeY = m.abs(y - that.pagesY[that.currPageY]);
        sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
        that.currPageY = page;

        // Snap with constant speed (proportional duration)
        time = m.round(m.max(sizeX, sizeY)) || 200;

        return { x: x, y: y, time: time };
    },

    _bind: function (type, el, bubble) {
        (el || this.scroller).addEventListener(type, this, !!bubble);
    },

    _unbind: function (type, el, bubble) {
        (el || this.scroller).removeEventListener(type, this, !!bubble);
    },


    /**
     *
     * Public methods
     *
     */
    destroy: function () {
        var that = this;

        that.scroller.style[vendor + 'Transform'] = '';

        // Remove the scrollbars
        that.hScrollbar = false;
        that.vScrollbar = false;
        that._scrollbar('h');
        that._scrollbar('v');

        // Remove the event listeners
        that._unbind(RESIZE_EV, window);
        that._unbind(START_EV);
        that._unbind(MOVE_EV);
        that._unbind(END_EV);
        that._unbind(CANCEL_EV);
        
        if (that.options.hasTouch) {
            that._unbind('mouseout', that.wrapper);
            that._unbind(WHEEL_EV);
        }
        
        if (that.options.useTransition) that._unbind('webkitTransitionEnd');
        
        if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
        
        if (that.options.onDestroy) that.options.onDestroy.call(that);
    },

    refresh: function () {
        var that = this,
            offset,
            i, l,
            els,
            pos = 0,
            page = 0;

        if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
        that.wrapperW = that.wrapper.clientWidth || 1;
        that.wrapperH = that.wrapper.clientHeight || 1;

        that.minScrollY = -that.options.topOffset || 0;
        that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
        that.scrollerH = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
        that.maxScrollX = that.wrapperW - that.scrollerW;
        that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
        that.dirX = 0;
        that.dirY = 0;

        if (that.options.onRefresh) that.options.onRefresh.call(that);

        that.hScroll = that.options.hScroll && that.maxScrollX < 0;
        that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);

        that.hScrollbar = that.hScroll && that.options.hScrollbar;
        that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;

        offset = that._offset(that.wrapper);
        that.wrapperOffsetLeft = -offset.left;
        that.wrapperOffsetTop = -offset.top;

        // Prepare snap
        if (typeof that.options.snap == 'string') {
            that.pagesX = [];
            that.pagesY = [];
            els = that.scroller.querySelectorAll(that.options.snap);
            for (i=0, l=els.length; i<l; i++) {
                pos = that._offset(els[i]);
                pos.left += that.wrapperOffsetLeft;
                pos.top += that.wrapperOffsetTop;
                that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
                that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
            }
        } else if (that.options.snap) {
            that.pagesX = [];
            while (pos >= that.maxScrollX) {
                that.pagesX[page] = pos;
                pos = pos - that.wrapperW;
                page++;
            }
            if (that.maxScrollX%that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length-1] + that.pagesX[that.pagesX.length-1];

            pos = 0;
            page = 0;
            that.pagesY = [];
            while (pos >= that.maxScrollY) {
                that.pagesY[page] = pos;
                pos = pos - that.wrapperH;
                page++;
            }
            if (that.maxScrollY%that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length-1] + that.pagesY[that.pagesY.length-1];
        }

        // Prepare the scrollbars
        that._scrollbar('h');
        that._scrollbar('v');

        if (!that.zoomed) {
            that.scroller.style[vendor + 'TransitionDuration'] = '0';
            that._resetPos(200);
        }
    },

    scrollTo: function (x, y, time, relative) {
        var that = this,
            step = x,
            i, l;

        that.stop();

        if (!step.length) step = [{ x: x, y: y, time: time, relative: relative }];
        
        for (i=0, l=step.length; i<l; i++) {
            if (step[i].relative) { step[i].x = that.x - step[i].x; step[i].y = that.y - step[i].y; }
            that.steps.push({ x: step[i].x, y: step[i].y, time: step[i].time || 0 });
        }

        that._startAni();
    },

    scrollToElement: function (el, time) {
        var that = this, pos;
        el = el.nodeType ? el : that.scroller.querySelector(el);
        if (!el) return;

        pos = that._offset(el);
        pos.left += that.wrapperOffsetLeft;
        pos.top += that.wrapperOffsetTop;

        pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
        pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
        time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;

        that.scrollTo(pos.left, pos.top, time);
    },

    scrollToPage: function (pageX, pageY, time) {
        var that = this, x, y;

        if (that.options.onScrollStart) that.options.onScrollStart.call(that);

        if (that.options.snap) {
            pageX = pageX == 'next' ? that.currPageX+1 : pageX == 'prev' ? that.currPageX-1 : pageX;
            pageY = pageY == 'next' ? that.currPageY+1 : pageY == 'prev' ? that.currPageY-1 : pageY;

            pageX = pageX < 0 ? 0 : pageX > that.pagesX.length-1 ? that.pagesX.length-1 : pageX;
            pageY = pageY < 0 ? 0 : pageY > that.pagesY.length-1 ? that.pagesY.length-1 : pageY;

            that.currPageX = pageX;
            that.currPageY = pageY;
            x = that.pagesX[pageX];
            y = that.pagesY[pageY];
        } else {
            x = -that.wrapperW * pageX;
            y = -that.wrapperH * pageY;
            if (x < that.maxScrollX) x = that.maxScrollX;
            if (y < that.maxScrollY) y = that.maxScrollY;
        }

        that.scrollTo(x, y, time || 400);
    },

    disable: function () {
        this.stop();
        this._resetPos(0);
        this.enabled = false;

        // If disabled after touchstart we make sure that there are no left over events
        this._unbind(MOVE_EV);
        this._unbind(END_EV);
        this._unbind(CANCEL_EV);
    },
    
    enable: function () {
        this.enabled = true;
    },
    
    stop: function () {
        if (this.options.useTransition) this._unbind('webkitTransitionEnd');
        else cancelFrame(this.aniTime);
        this.steps = [];
        this.moved = false;
        this.animating = false;
    },
    
    zoom: function (x, y, scale, time) {
        var that = this,
            relScale = scale / that.scale;

        if (!that.options.useTransform) return;

        that.zoomed = true;
        time = time === undefined ? 200 : time;
        x = x - that.wrapperOffsetLeft - that.x;
        y = y - that.wrapperOffsetTop - that.y;
        that.x = x - x * relScale + that.x;
        that.y = y - y * relScale + that.y;

        that.scale = scale;
        that.refresh();

        that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
        that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

        that.scroller.style[vendor + 'TransitionDuration'] = time + 'ms';
        that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + scale + ')';
        that.zoomed = false;
    },
    
    isReady: function () {
        return !this.moved && !this.zoomed && !this.animating;
    }
};

if (typeof exports !== 'undefined') exports.iScroll = iScroll;
else window.iScroll = iScroll;

})();
/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

/**
* @class Scroll
* @description Provides the fixed positioning for header with scrolling content.
* When multiple content containers are present, Scroll makes only the first visible and enables use of MainObj.Nav
*/
function Doat_Scroll(){
    var self = this,
        MainObj,
        classnamePrefix,
        contentClassName,
        headerClassName,
        contentInnerClassName,
        iscrollArr = [],
        $container,
        $header,
        head = document.getElementsByTagName('head')[0],
        //iScrollConfig = {onBeforeScrollStart: null, vScrollbar: true, hScroll: false},      
        iScrollConfig = {vScrollbar: true, hScroll: false},        
        cfg;
        
    window.addEventListener('orientationchange', calculate, false);

    var isElementExists = function(){
        var _elements = $('.'+contentClassName);
        return (_elements.length > 0);
    };

    var fixElementsPositions = function(){
        if (hasFixedPositioning()){
            MainObj.Log && MainObj.Log.info(MainObj.Env.getInfo().platform+' '+MainObj.Env.getInfo().version+' has fixed positioning so using position: fixed');
            
            $header.css({
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'width': '100%',
                'z-index': 2
            });

           $contents.css({
                'top': $header.get(0).offsetHeight+'px',
                'height': 'auto',
                'z-index': 1
            });
        }
        else{
            MainObj.Log && MainObj.Log.info(MainObj.Env.getInfo().platform+' '+MainObj.Env.getInfo().version+' has NO fixed positioning so using iScroll');
            
            if (iscrollArr.length == 0){
                document.body.addEventListener('touchmove', function(e){
                    //e.preventDefault();
                }, false);
            }

            for (var i=0, len=$contents.length; i<len; i++){
                var el = $contents[i];          
                var $el = $(el);                
               
                var id = el.getAttribute('id');
                if (iscrollArr[id]){
                    iscrollArr[id].refresh.call();
                }
                else if(!(cfg.disableIScroll && cfg.disableIScroll[id])){
                    $el.css({
                        'visibility': 'hidden',
                        'display': 'block'
                    });
                    
                    var config = {};
                    for (k in iScrollConfig) config[k] = iScrollConfig[k];       
                    
                    var $innerEl = $(el).children('*');
                    var hasInnerEl = $innerEl.length === 1;
                    if (!hasInnerEl){
                        var innerEl = document.createElement("div");
                        innerEl.className = classnamePrefix+'created';
                        innerEl.style.width = '100%';
                        for (var i=0, len=el.children.length; i<len; i++){
                            alert(el.children[i]);
                            innerEl.appendChild(el.children[i]);
                        }
                        el.appendChild(innerEl);
                    }
                    else{
                        $innerEl[0].style.width = '100%';
                    }
                    
                    if (cfg.pullToRefresh === id) {                                              
                        
                        var pullDownContainer = 'touchy-pulldown',
                            pullDownIconClass = 'touchy-pulldown-icon',
                            pullDownFlipClass = 'touchy-pulldown-flip',
                            pullDownLoadingClass = 'touchy-pulldown-loading',
                            pullDownLabelClass = 'touchy-pulldown-label',
                            pullDownLabelText = {'pull':'Pull down to refresh...',
                                                 'release':'Release to refresh...',
                                                 'loading':'Loading...'};                            
                        
                        var css = '#'+pullDownContainer+' {'+                        
                                  '     background:#000000;'+
                                  '     height:40px;'+
                                  '     line-height:40px;'+
                                  '     padding:5px 10px;'+                                  
                                  '     font-weight:bold;'+
                                  '     font-size:14px;'+
                                  '     color:#888888;'+
                                  '     visibility:hidden'+
                                  '}'+                        
                                  '#'+pullDownContainer+' .'+pullDownIconClass+' {'+
                                  '     display:block; float:left;'+
                                  '     width:40px; height:40px;'+                                                        
                                  '     background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAACgCAMAAACsXRuGAAAAt1BMVEX////FxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcU7SVrkAAAAPHRSTlMAAPONxyCMRvCjM2n59gzeD/xssVo52Akwh6sDpeTbckJLZroqfhUnRernVxifG9XDgb2ZzzxjeLThEmBcLCjmAAACDklEQVR4Xu2Y124yQQyFM9sh9BJafgik956/7fs/V4RCwiITbMdjCSGfKy4On7THnuLZ8yGTyRWUr1W54NgNIC4Dbm+VrQ+tbQxoQAMa0IAGnO4vtR44WBquCcBuJadrSslwQucNaBm2qbyHEQ3YqNN4l3fUKpdpMV7Q26ZF4T3S+5AU49OIA8RjvLpxDCAeY/PIcYB4jKf8tTzcxDt2fGBt/D3v19kPgK5fRQLkAt0MCZANdIdIgGxg7WBjgHygO1kTY/NVMla8QeBvJwHCGP84CRDG+PefBAhjrHTlo9n/InDiY9a7XfLazgewd//Jqze8AN15sAiw7Gu87XwAW/7m5ec5b+j8AXsveT6uSYAwxmrf7xNBZ+aYQJPJZDLh+20aRlkWhen8twdgnCyO0SCJfQDjUv6lUuwBmOQFJXJgGhSBQSoGhvmKQnFNo1VgBD3MmmarwAx6WDWFQOhh1RR+MvSwagqLwqw7/ndW3UkfCD2bhJcAephAvJGYn4y3OrMouIfZNriH19i4h7v0cI9ww4ce4ZEEPTt6/uJ+UdS4H28G1C9qV9yPLyjUL1vyuB/dlLh+dNtE/dpA+SdrF0XeNsqNLV96+puDfPvaaukfUvJjVP+gl19F9C9L8uuc/oVTfiXWv7TLxwr9wUc+msmHR/3xVj6A6z8RSBej/jMLp+76T1X6j2m7eP6aTO9STHV4CXebKAAAAABJRU5ErkJggg%3D%3D); 0 0 no-repeat;'+
                                  '     -webkit-background-size:40px 80px; background-size:40px 80px;'+
                                  '     -webkit-transition-property:-webkit-transform;'+
                                  '     -webkit-transition-duration:250ms;'+
                                  '     -webkit-transform:rotate(0deg) translateZ(0);'+  
                                  '}'+                                
                                  '#'+pullDownContainer+'.'+pullDownFlipClass+' .'+pullDownIconClass+' {'+
                                  '     -webkit-transform:rotate(-180deg) translateZ(0);'+
                                  '}'+                                                  
                                  '#'+pullDownContainer+'.'+pullDownLoadingClass+' .'+pullDownIconClass+' {'+
                                  '     background-position:0 100%;'+
                                  '     -webkit-transform:rotate(0deg) translateZ(0);'+
                                  '     -webkit-transition-duration:0ms;'+                     
                                  '     -webkit-animation-name:'+pullDownLoadingClass+';'+
                                  '     -webkit-animation-duration:2s;'+
                                  '     -webkit-animation-iteration-count:infinite;'+
                                  '     -webkit-animation-timing-function:linear;'+
                                  '}'+                             
                                  '@-webkit-keyframes '+pullDownLoadingClass+' {'+
                                  '     from { -webkit-transform:rotate(0deg) translateZ(0); }'+
                                  '     to { -webkit-transform:rotate(360deg) translateZ(0); }'+
                                  '}';
                        
                        create('style',head,{
                             type:'text/css',
                             innerHTML: css
                        });
                        
                        var html = '<div id="'+pullDownContainer+'">'+
                                   '    <span class="'+pullDownIconClass+'"></span>'+
                                   '    <span class="'+pullDownLabelClass+'">'+pullDownLabelText.pull+'</span>'+
                                   '</div>';  
                                   
                        $innerEl.prepend(html);
                        
                        $pullDownElement = $('#'+pullDownContainer);
                        $pullDownLabelClass = $pullDownElement.find('.'+pullDownLabelClass);
                        
                        pullDownOffset = $pullDownElement[0].offsetHeight; 
                        
                        var extraConfig = {
                          "onRefresh" : function() { 
                                $pullDownElement.css('visibility','visible');  
                                $pullDownElement.removeAttr('class');
                                $pullDownLabelClass.html(pullDownLabelText.pull);                                                                                                          
                          },
                          "onScrollMove" : function() {                            
                                if (this.y > 5 && !$pullDownElement.hasClass(pullDownFlipClass)) {
                                    $pullDownElement.addClass(pullDownFlipClass);
                                    $pullDownLabelClass.html(pullDownLabelText.release);
                                    this.minScrollY = 0;
                                } else if (this.y < 5 && $pullDownElement.hasClass(pullDownFlipClass)) {
                                     $pullDownElement.removeAttr('class');
                                    $pullDownLabelClass.html(pullDownLabelText.pull);
                                    this.minScrollY = -pullDownOffset;
                                }
                          },
                          "onScrollEnd" : function() {
                              if ($pullDownElement.hasClass(pullDownFlipClass)) {
                                  $pullDownElement.removeAttr('class');
                                  //$pullDownElement.addClass(pullDownLoadingClass);
                                  $pullDownLabelClass.html(pullDownLabelText.loading);
                                  if (doat_config.pullToRefreshCB) {
                                      doat_config.pullToRefreshCB();
                                  } 
                                  iscrollArr[id].refresh.call(iscrollArr[id]);
                                  //callback
                                  // myScroll.refresh();
                              }
                          },
                          "topOffset" : pullDownOffset,
                          "useTransition": true          
                        };
                          
                        for (k in extraConfig) config[k] = extraConfig[k];                         
                    }                    
                    
                    iscrollArr[id] = new iScroll(id, config);
                    //iscrollArr[id] = {refresh:function(){}, scrollTo: function(){}};   
                    
                    $el.bind('touchstart', {'id': id}, function(e){
                        var id = e.data.id;
                        iscrollArr[id].refresh.call(iscrollArr[id]);
                    });
                    
                    $el.css({
                        'display': 'none',
                        'visibility': 'visible'
                    });
                }
            };
        }
    };

    this.init = function(_cfg){
        cfg = _cfg;
        $container = $(document.body);
        
        MainObj = window.Doat || window.TouchyJS;
        classnamePrefix = window.Doat ? 'doml_' : 'touchyjs-';
        contentClassName = classnamePrefix+'content';
        headerClassName = classnamePrefix+'header';
        contentInnerClassName = classnamePrefix+'scrollable';
        $contents = $container.children('.'+contentClassName);        
        
        if ($contents.length > 0){
            calculate($contents);
            
            var displayContentIndex = cfg.displayContent || 0,
                currentContent = $contents[displayContentIndex];
            $(currentContent).css('display', 'block');
            MainObj.Nav.setCurrent(currentContent);
            
            //window.addEventListener('load', hideAddressBar, false);
            //window.addEventListener('DOMContentLoaded', hideAddressBar, false);
        }
    };
    
    function hideAddressBar(){
        document.body.removeEventListener('touchstart', hideAddressBar);
        var currentContent = MainObj.Nav.getCurrent();
        $(currentContent).css('height', window.screen && window.screen.availHeight+'px' || '1000px');
             
        window.scrollTo(0,0);
        
        setTimeout(function(){
            self.refreshAll();    
        }, 1000);
    }

    function calculate($contents){
        $contents = $contents && $contents.length ? $contents : $container.children('.'+contentClassName);
        
        $header = $header || $container.children('.'+headerClassName);
        var headerHeight = $header.length ? $header[0].offsetHeight : 0,
            contentHeight = window.innerHeight
                      - parseInt($container.css('margin-top'), 10)
                      - parseInt($container.css('margin-bottom'), 10)
                      - headerHeight;

        $contents.css({
            'width': '100%',
            'position': 'absolute',
            'height': contentHeight+'px',
            'top': headerHeight+'px'
        });
        
        if (cfg.fixedPositioning){
            fixElementsPositions(cfg.fixedPositioning === 'capableOnly');
        }
    }

    /**
     * @method refresh
     * @description Recalculates header/content heights. Use this when either elements have changed height.
     * @example
     * header.style.height = "40px";
     * MainObj.Scroll.refresh();
     */
    this.refresh = function(id, height){
        id = id || MainObj.Nav.getCurrent().getAttribute('id');
                
        if (height) {
            $("#" + id).children("*").css("height", height + "px");
        }

        if (iscrollArr[id]) {
            iscrollArr[id].refresh();
        }
    };
    
    this.refreshAll = function(){
        calculate();
    };
    
    this.scrollTo = function(y){
        var currentEl = MainObj.Nav.getCurrent(),
            id = currentEl.getAttribute('id');
        
        if (iscrollArr[id]){
            iscrollArr[id].scrollTo(0, y, 0);   
        }   
        else{
            currentEl.scrollTop = y;
        }   
    };

    this.disable = function(){
        var currentEl = MainObj.Nav.getCurrent(),
            id = currentEl.getAttribute('id');

        if (iscrollArr[id]){
            iscrollArr[id].disable();
        }
    };

    this.enable = function(){
        var currentEl = MainObj.Nav.getCurrent(),
            id = currentEl.getAttribute('id');

        if (iscrollArr[id]){
            iscrollArr[id].enable();
        }
    };
    
    /**
    * @method hasFixedPosition
    * @description Returns if the current browser has position:fixed enabled 
    * Returns true for iOS5+, Android2.2+ and all non-mobile devices
    * @return {boolean}
    */
    var hasFixedPositioning = function(){       
        if (!MainObj.Env.isMobile()){
            return true;
        }
        
        var i = MainObj.Env.getInfo();
            p = i.platform,
            v = i.version;          
            
        if (p === 'iphone' || p === 'ipad'){
            return isVersionOrHigher(v, '5');
        }
        else if (p === 'android'){
            return isVersionOrHigher(v, '2.2');
        }
        
        return false;
    };
    
    function isVersionOrHigher(v1, v2) {
        var v1parts = v1.split('.');
        var v2parts = v2.split('.');
        
        for (var i = 0; i < v1parts.length; ++i) {
            if (v2parts.length == i) {
                return true;
            }
            
            if (v1parts[i] == v2parts[i]) {
                continue;
            }
            else if (parseInt(v1parts[i], 10) > parseInt(v2parts[i], 10)) {
                return true;
            }
            else {
                return false;
            }
        }
        
        if (v1parts.length != v2parts.length) {
            return false;
        }
        
        return true;
    }
}
function enableCssAnim(platform, browser, Log){
    Log && Log.info('platform='+platform);
    var transfromKeys = ['scale', 'rotate', 'skew', 'translate', 'matrix'],    
    CSS_PREFIX = browser === 'webkit' ? '-webkit-' : browser === 'mozilla' ? '-moz-' : '';

    css();

    $.fn.fadeIn = function(){
        var a = normalizeArguments(arguments);
        return $(this).animate({'opacity': 1}, a.dur, a.ease, a.cb);
    };

    $.fn.fadeOut = function(){
        var a = normalizeArguments(arguments);
        return $(this).animate({'opacity': 0}, a.dur, a.ease, a.cb);
    };

    $.fn.animate = function(){
        var $el = this;
        var k, props, dur, ease, callbacks = [];
        for (var i=1; i<arguments.length; i++){
            var arg = arguments[i];
            if (typeof arg === 'function'){
                callbacks.push(arg);
            }
            else if (arg === 'fast' || arg === 'slow'){
                dur = arg;
            }
            else if (typeof arg === 'string'){
                ease = arg;
            }
            else {
                dur = arg;
            }
        }

        // CSS properties
        props = arguments[0];
        props[CSS_PREFIX+'transform'] = '';
        for (k in props){
            var val;
            if (props[k].toString().indexOf('=')!==-1){
                props[k] = getIncVal($el, k, props[k]);
            }
            if (isTransform(k)){
                props[CSS_PREFIX+'transform']+= k+'('+props[k]+')';
                delete props[k];
            }
            else if (k === 'left' || k === 'right'){
                val = (k === 'right') ? reverse(props[k]) : props[k];
                props[CSS_PREFIX+'transform']+= 'translateX('+val+')';
                delete props[k];
            }
            else if (k === 'bottom' || k === 'top'){
                val = (k === 'bottom') ? reverse(props[k]) : props[k];
                props[CSS_PREFIX+'transform']+= 'translateY('+val+')';
                delete props[k];
            }
        }

        // Duration
        dur = (dur === 'fast') ? 0.2 : (dur === 'slow') ? 0.6 : dur/1000 || 0.3;

        // Easing
        ease = (!ease || ease === 'swing') ? 'ease-in-out' : ease;

        // Callback
        if (callbacks.length > 0){
            setTimeout(function(){
                var i, len = callbacks.length;
                for (i=0; i<len; i++){
                  callbacks[i].call($el);
                }
            }, dur*1000);
        }

        // Execute CSS properties
        props[CSS_PREFIX+'transition'] = 'all '+dur+'s '+ease;
        return $el.css(props);
    }

    function isTransform(k){
        for (var i=0; i<transfromKeys.length; i++){
            if (k.indexOf(transfromKeys[i])!==-1){
                return true;
                break;
            }
        }
        return false;
    }

    function reverse(v){
        v = v.toString();
        return (v.indexOf('-') === 0) ? v.substring(1, v.length) : '-'+v;
    }

    function getIncVal(el, propName, value){
        var inc = (value.indexOf('-=')!==-1) ? -1 : 1;
        value = value.toString();
        var num = parseInt(value.substring(2, value.length), 10).toString();
        var unit = value.substring(2+num.length, value.length);
        var curValue = el.css(propName);
        curValue = (curValue && curValue !== '') ? parseInt(curValue, 10) : 0;
        var newValue = curValue+(inc*num)+unit;
        return newValue;
    }

    function css(){
        var cfg = {};

        if (platform !== 'android'){
            cfg[CSS_PREFIX+'transform'] = 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)';
            cfg[CSS_PREFIX+'box-sizing'] =  'border-box';
            cfg[CSS_PREFIX+'backface-visibility'] = 'hidden';
            Log && Log.info('Including cfg[\''+CSS_PREFIX+'transform\'] = \'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)\'');
        }
        else{
            Log && Log.info('not including cfg[\''+CSS_PREFIX+'transform\'] = \'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)\'');
        }
        $('.doml_content').css(cfg);
    }
}

function normalizeArguments(args){
    var val = {};
    for (var i=0; i<args.length; i++){
        var arg = args[i];
        if (typeof arg === 'function'){
            val.cb = arg;
        }
        else if (arg === 'fast' || arg === 'slow'){
            val.dur = arg;
        }
        else if (typeof arg === 'string'){
            val.ease = arg;
        }
        else {
            val.dur = arg;
        }
    }
    return val;
}/*!
             * JS Signals <http://millermedeiros.github.com/js-signals/>
             * Released under the MIT license <http://www.opensource.org/licenses/mit-license.php>
             * @author Miller Medeiros <http://millermedeiros.com/>
             * @version 0.6.3
             * @build 187 (07/11/2011 10:14 AM)
             */
            (function(d){var b={VERSION:"0.6.3"};function c(i,h,f,g,e){this._listener=h;this._isOnce=f;this.context=g;this._signal=i;this._priority=e||0}c.prototype={active:true,params:null,execute:function(e){var g,f;if(this.active&&!!this._listener){f=this.params?this.params.concat(e):e;g=this._listener.apply(this.context,f);if(this._isOnce){this.detach()}}return g},detach:function(){return this.isBound()?this._signal.remove(this._listener):null},isBound:function(){return(!!this._signal&&!!this._listener)},getListener:function(){return this._listener},_destroy:function(){delete this._signal;delete this._listener;delete this.context},isOnce:function(){return this._isOnce},toString:function(){return"[SignalBinding isOnce: "+this._isOnce+", isBound: "+this.isBound()+", active: "+this.active+"]"}};function a(e,f){if(typeof e!=="function"){throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",f))}}b.Signal=function(){this._bindings=[]};b.Signal.prototype={_shouldPropagate:true,active:true,_registerListener:function(i,h,g,f){var e=this._indexOfListener(i),j;if(e!==-1){j=this._bindings[e];if(j.isOnce()!==h){throw new Error("You cannot add"+(h?"":"Once")+"() then add"+(!h?"":"Once")+"() the same listener without removing the relationship first.")}}else{j=new c(this,i,h,g,f);this._addBinding(j)}return j},_addBinding:function(e){var f=this._bindings.length;do{--f}while(this._bindings[f]&&e._priority<=this._bindings[f]._priority);this._bindings.splice(f+1,0,e)},_indexOfListener:function(e){var f=this._bindings.length;while(f--){if(this._bindings[f]._listener===e){return f}}return -1},add:function(g,f,e){a(g,"add");return this._registerListener(g,false,f,e)},addOnce:function(g,f,e){a(g,"addOnce");return this._registerListener(g,true,f,e)},remove:function(f){a(f,"remove");var e=this._indexOfListener(f);if(e!==-1){this._bindings[e]._destroy();this._bindings.splice(e,1)}return f},removeAll:function(){var e=this._bindings.length;while(e--){this._bindings[e]._destroy()}this._bindings.length=0},getNumListeners:function(){return this._bindings.length},halt:function(){this._shouldPropagate=false},dispatch:function(f){if(!this.active){return}var e=Array.prototype.slice.call(arguments),h=this._bindings.slice(),g=this._bindings.length;this._shouldPropagate=true;do{g--}while(h[g]&&this._shouldPropagate&&h[g].execute(e)!==false)},dispose:function(){this.removeAll();delete this._bindings},toString:function(){return"[Signal active: "+this.active+" numListeners: "+this.getNumListeners()+"]"}};d.signals=b}(window||this));
/*!
 * Hasher <http://github.com/millermedeiros/hasher>
 * @author Miller Medeiros
 * @version 1.0.0 (2011/08/03 10:49 PM)
 * Released under the MIT License
 */
var hasher=(function(i){var m=25,n=i.document,a=i.location,l=i.history,s=signals.Signal,d,r,k,A,c,y,p=/#(.*)$/,h=/(\?.*)|(\#.*)/,e=/^\#/,g=(!+"\v1"),w=("onhashchange" in i),b=g&&!w,o=(a.protocol==="file:");function q(C){if(!C){return""}var B=new RegExp("^\\"+d.prependHash+"|\\"+d.appendHash+"$","g");return C.replace(B,"")}function z(){var B=p.exec(d.getURL());return(B&&B[1])?decodeURIComponent(B[1]):""}function v(){return(c)?c.contentWindow.frameHash:null}function u(){c=n.createElement("iframe");c.src="about:blank";c.style.display="none";n.body.appendChild(c)}function f(){if(c&&r!==v()){var B=c.contentWindow.document;B.open();B.write("<html><head><title>"+n.title+'</title><script type="text/javascript">var frameHash="'+r+'";<\/script></head><body>&nbsp;</body></html>');B.close()}}function j(B){B=decodeURIComponent(B);if(r!==B){var C=r;r=B;if(b){f()}d.changed.dispatch(q(B),q(C))}}y=(b)?function(){var C=z(),B=v();if(B!==r&&B!==C){d.setHash(q(B))}else{if(C!==r){j(C)}}}:function(){var B=z();if(B!==r){j(B)}};function x(D,B,C){if(D.addEventListener){D.addEventListener(B,C,false)}else{if(D.attachEvent){D.attachEvent("on"+B,C)}}}function t(D,B,C){if(D.removeEventListener){D.removeEventListener(B,C,false)}else{if(D.detachEvent){D.detachEvent("on"+B,C)}}}d={VERSION:"1.0.0",appendHash:"",prependHash:"/",separator:"/",changed:new s(),stopped:new s(),initialized:new s(),init:function(){if(A){return}r=z();if(w){x(i,"hashchange",y)}else{if(b){if(!c){u()}f()}k=setInterval(y,m)}A=true;d.initialized.dispatch(q(r))},stop:function(){if(!A){return}if(w){t(i,"hashchange",y)}else{clearInterval(k);k=null}A=false;d.stopped.dispatch(q(r))},isActive:function(){return A},getURL:function(){return a.href},getBaseURL:function(){return d.getURL().replace(h,"")},setHash:function(B){var C=Array.prototype.slice.call(arguments);B=C.join(d.separator);B=B?d.prependHash+B.replace(e,"")+d.appendHash:B;if(B!==r){j(B);if(g&&o){B=B.replace(/\?/,"%3F")}a.hash="#"+encodeURI(B)}},getHash:function(){return q(r)},getHashAsArray:function(){return d.getHash().split(d.separator)},dispose:function(){d.stop();d.initialized.dispose();d.stopped.dispose();d.changed.dispose();c=d=i.hasher=null},toString:function(){return'[hasher version="'+d.VERSION+'" hash="'+d.getHash()+'"]'}};return d}(window));/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

/**
* Providing the ability to navigate between content "pages" using a smoothe motion animation
* @class
*/
var Doat_Navigation = function(){
    var MainObj = typeof Doat != 'undefined' ? Doat : TouchyJS,
        classnamePrefix = typeof Doat != 'undefined' ? 'doml_' : 'touchyjs-',
        isMobile = MainObj.Env.isMobile(),
        $currentElement,
        $previousElement,
        currentElementHeight,
        cfg = {},
        cbArr = {},
        addressCbArr = {},
        CSS_PREFIX,
        ADDRESS_FIRST = true,
        isNavigating = false,
        firstPageId;

    var b = MainObj.Env.getInfo().browser.name || MainObj.Env.getInfo().browser;
    CSS_PREFIX = b === 'webkit' ? '-webkit-' : b === 'mozilla' ? '-moz-' : '';

    var init = function(_cfg){
        _cfg && (cfg = aug(cfg, _cfg));
        
        if (cfg.browserHistory) {
            initAddress();
        }
    };
    
    /**
     * Responsible for creating the motion animation between the current page and the one provided
     * @param {string | object HTMLElement} toPage The id or DOM element referencing the content wrapper ("page") to move to.
     * @param {object} [options] An object with a set of configuration property/value pairs, specifying the configuration for the navigation.<br/><br/>
     * <ul>
     * <li>onComplete -  a function to be executed when the animation is complete
     * <br />
     *       Recieves two arguments:<br />
     *      &nbsp; outElement - the DOM element that animated out
     *      &nbsp; inElement - the DOM element that animated in</li>
     * <li>
     *      direction -  The direction of the page transition animation.
     *      <br />
     *      Accepts "rtl" or "ltr"
     *      <br /><br />
     *      <em>If not specified, the direction will be determined automatically</em>
     *      </li>
     * </ul>
     * Supports "onComplete" property with a value of . <br />
     */
    var attachCallback = function(){
        var a = arguments;

        var pageId = (typeof a[0] === 'string') ? a[0] : a[0].get ? a[0].get(0).getAttribute('id') : a[0].getAttribute('id'),
            direction = a[1], // 'in'/'out'
            timing = (typeof a[2] === 'string') ? a[2].toLowerCase() : 'oncomplete', // 'onstart'/'oncomplete'
            cb = (typeof a[2] === 'string') ? a[3] : a[2];

        cbArr[pageId] = cbArr[pageId] || {};
        cbArr[pageId][timing] = cbArr[pageId][timing] || {};
        cbArr[pageId][timing][direction] = cb;
    };

    var navigate = function(toPage, options, bNoCallback){
        if (!toPage || isNavigating){return false;}
        isNavigating = true;
        
        var $nextElement = (toPage.constructor === String) ? $('.'+classnamePrefix+'content#'+toPage) : $(toPage);

        if (!bNoCallback) {
            onStart($nextElement, options);
        }
        
        if ($currentElement[0].id == $nextElement[0].id && $currentElement.css("display") == "block"){
            onComplete($nextElement, options);
            return false;
        }
        else if (options && options['transition'] == 'none'){
            var nextElCss = {
                'left': '0%',
                'display': 'block'
            };
            nextElCss[CSS_PREFIX+'transition-duration'] = '0';
            nextElCss[CSS_PREFIX+'transform'] =  'translateX(0)';
            $nextElement.css(nextElCss);

            $currentElement.css({
                /*'left': '100%'*/
                'display': 'none'
            });

            onComplete($nextElement, options);
        }
        else if (options && options['transition'] == 'fade'){
            $nextElement.css(CSS_PREFIX+'transition', 'opacity 0.5s linear');
                $nextElement.css({
                    'display': 'block',
                    'opacity': 1
                });

            $currentElement.css(CSS_PREFIX+'transition', 'opacity 0.5s linear');
                $currentElement.css({
                    'opacity': 0
                });

                onComplete($nextElement, options);
        }
        else{
            var direction = options && options.direction || determineDirection($nextElement),
                nextStart = (direction === 'rtl') ? '100%' : '-100%',
                currentEnd = (direction === 'rtl') ? '-100%' : '100%';

            if (isMobile){
                $nextElement.css(CSS_PREFIX+'transition-duration', '0');
                $nextElement.css(CSS_PREFIX+'transform', 'translateX('+nextStart+')');
            }
            else{
                $nextElement.css('left', nextStart);
            }
            $nextElement.css('display', 'block');

            setTimeout(function(){
                $nextElement.animate({'left': '0%'});
                $currentElement.animate({'left': currentEnd}, function(){
                    onComplete($nextElement, options);
                });
            }, 200);
        }

        // If muteEventReport == true, don't continue to reporting the message
        if (!options || options.muteEventReport !== true){
            var props = {
                'action': 'Navigate',
                'to': $nextElement[0].id
            };
            if (options && options.title){
                props.title = options.title.replace('/', '-');
            }
            if (options && options.id && options.id.replace){
                props.id = options.id.replace('/', '-');
            }
            if (MainObj.Messenger) {MainObj.Messenger.trigger(MainObj.Events.USER_ACTION, props)};
        }

        return true;
    };

    var back = function(){
        if (cfg.browserHistory){
            history.back();
        }
        else{
            goTo($previousElement, {'muteEventReport': true});  
        }
    };

    var goTo = function(toPage, options, bNoCallback){
        if (cfg.browserHistory) {
            var $nextElement = (toPage.constructor === String) ? $('.'+classnamePrefix+'content#'+toPage) : $(toPage);
            
            var urlValue = "";
            if (options) {
                if (options.url) {
                    urlValue = "/" + options.url;
                } else if (options.id) {
                    urlValue = "/" + options.id;
                }
            }
            //$.address.value($nextElement[0].id + urlValue);
            hasher.setHash($nextElement[0].id + urlValue);
        }
        else{
            navigate.apply(this, arguments);
        }
    };

    var onStart = function($nextElement, options){
        var currId = $currentElement[0].id,
            nextId = $nextElement[0].id;
        
        if (currId != nextId) {
            if (cbArr[nextId] && cbArr[nextId]['onstart'] && cbArr[nextId]['onstart']['in']){
                cbArr[nextId]['onstart']['in']($currentElement[0], $nextElement[0]);
            }
            if (cbArr[currId] && cbArr[currId]['onstart'] && cbArr[currId]['onstart']['out']){
                cbArr[currId]['onstart']['out']($currentElement[0], $nextElement[0]);
            }
        }
        
        if (options && options.onStart){
            options.onStart($currentElement[0], $nextElement[0]);
        }
    };
    var onComplete = function($nextElement, options){
        var currId = $currentElement[0].id,
            nextId = $nextElement[0].id;
            
        $previousElement = $currentElement;
        $currentElement = $nextElement;
            
        if (currId != nextId) {
            $previousElement.css('display', 'none');
            
            if (cbArr[nextId] && cbArr[nextId]['oncomplete'] && cbArr[nextId]['oncomplete']['in']){
                cbArr[nextId]['oncomplete']['in']($currentElement[0], $previousElement[0]);
            }
            if (cbArr[currId] && cbArr[currId]['oncomplete'] && cbArr[currId]['oncomplete']['out']){
                cbArr[currId]['oncomplete']['out']($currentElement[0], $previousElement[0]);
            }
        }
        
        if (options && options.onComplete){
            options.onComplete($currentElement[0], $previousElement[0]);
        }
        
        isNavigating = false;
    };

    /**
     * @method determineDirection
     * @description Determines direction by the next element's current position.
     * If the element is on the left (style.left === '-100%') then the direction will be 'ltr'
     * If it's on the right ('100%') or if 'left' was never set, the direction will be 'rtl'
     * @param {object jQuery element} $el the element in question
     * @ignore
     */
    var determineDirection = function($el){
        var transformVal = getTransformValue($el);
        var condition = (transformVal && transformVal !== '' && transformVal !== 'none')
                            ? (transformVal === 'translateX(-100%)')
                                : ($el.get(0).style.left === '-100%');
        return condition ? 'ltr' : 'rtl';
    };

    var getTransformValue = function($el){
        var $value = $el.css(CSS_PREFIX+'transform'),
            value = $el[0].style[CSS_PREFIX+'transform'];

        return $value && $value !== '' && $value !== 'none' ? $value : value;
    };

    /**
     * @method setCurrent
     * @description Sets the DOM element argument as the current content wrapper "page" that is viewed.
     * When navigating to another "page", this element will be moved out.
     * @param {object HTMLElement} currentEl A DOM element to be set as the current content wrapper "page"
     * @ignore
     */
    var setCurrent = function(currentEl){
        if (currentEl.constructor === String){
            $currentElement = $('#'+currentEl);
        }
        else{
            $currentElement = $(currentEl);
        }
        !firstPageId && (firstPageId = currentEl.id);
    };

    /**
     * @method getCurrent
     * @description Gets the DOM element that is the current content wrapper "page".
     * @return {object HTMLElement} A DOM element that has been set as the current content wrapper "page"
     */
    var getCurrent = function(){
        return $currentElement[0];
    };

    var hasNewContentHeight = function(){
        if ($currentElement &&
            currentElementHeight !== $currentElement[0].offsetHeight){
            currentElementHeight = $currentElement[0].offsetHeight;
            return currentElementHeight;
        }

        return false;
    };

    var changed = function(_page, _cb) {
        if (typeof _page == "function") {
            _cb = _page;
            _page = ["__default"];
        } else if (typeof _page == "string") {
            if (_page == "") {
                _page = "__empty";
            }
            _page = [_page];
        }

        for (var i=0; i<_page.length; i++) {
            var page = _page[i];
            if (!addressCbArr[page]) addressCbArr[page] = [];
            addressCbArr[page].push(_cb);
        }
    };

    var addressChanged = function(newHash) {  
        var paths = newHash.split('/'),
            page = "__empty";
        
        if (paths.length > 0 && paths[0] != "") {
            page = paths[0];
        }

        paths.splice(0, 1);
        
        if (!addressCbArr[page]) addressCbArr[page] = [];
        if (!addressCbArr["__default"]) addressCbArr["__default"] = [];
        
        var cbs = addressCbArr[page].concat(addressCbArr["__default"]);
        if (page == "__empty") page = firstPageId;        
        
        if (ADDRESS_FIRST) {
            navigate(page, {
                "transition": "none"
            }, true);
            ADDRESS_FIRST = false;
        }
        else{
            navigate(page, {}, true);
        }

        for (var i=0; i<cbs.length; i++) {
            cbs[i](page, paths);
        }
    };

    var initAddress = function() {        
        hasher.changed.add(addressChanged);
        hasher.initialized.add(addressChanged);
        hasher.init();
    }   

    return {
        'init': init,
        'goTo': goTo,
        'back': back,
        'attachCallback': attachCallback,
        'initAddress': initAddress,
        'changed': changed,
        'setCurrent': setCurrent,
        'getCurrent': getCurrent,
        'hasNewContentHeight': hasNewContentHeight,
        'Indicator': new Doat_Progress_Indicator()
    };
};

function Doat_Progress_Indicator(){
    var mainSpinner, customSpinner, mainEl,
        default_cfg = {
            lines: 10, // The number of lines to draw
            length: 7, // The length of each line
            width: 3, // The line thickness
            radius: 7, // The radius of the inner circle
            color: '#ffffff', // #rbg or #rrggbb
            speed: 1.4, // Rounds per second
            trail: 72, // Afterglow percentage
            shadow: true, // Whether to render a shadow,
            parent: document.body
        },
        default_css = {
            'position': 'absolute',
            'left': '50%',
            'top': '150px',
            'z-index': 200
        };
        
    var initCustomSpinner = function(customSpinnerCfg){
        var cfg = {};
        for (i in default_cfg) cfg[i] = default_cfg[i];
        for (i in customSpinnerCfg) cfg[i] = customSpinnerCfg[i];
        
        customSpinner = new Spinner(cfg);
        customSpinner.spin(cfg.parent);
    };
    
    var initMainSpinner = function(){
        $mainEl = $('<span class="touchyjs-progress-indicator" />');
        $mainEl.css(default_css);
        $(document.body).append($mainEl);
        
        mainEl = $mainEl[0];
        
        mainSpinner = new Spinner(default_cfg);
    };
    
    this.show = function(customSpinnerCfg){
        if (customSpinnerCfg){
            initCustomSpinner(customSpinnerCfg);
        }
        else{
            if (!mainSpinner){
                initMainSpinner();
            }
            mainSpinner.spin(mainEl);
        }
    };
    
    this.hide = function(){
        if (customSpinner){
            customSpinner.stop();
        }
        if (mainSpinner){
            mainSpinner.stop();    
        }        
    };
}/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

function create(tagName, parent, props, callback, adjacentNode) {
    var doc = parent ? parent.ownerDocument : document;
    var o = doc.createElement(tagName);
    if (props) for (var p in props) {
        if (p == 'style') {
            var styles = props[p];
            for (var s in styles) o.style.setProperty(s, styles[s]);
        } else o[p] = props[p];
    }
    if (callback && tagName == 'script'){
        var loaded = false;
        var loadFunction = function(){
            if (loaded) {
                return;
            }
            loaded=true;
            callback();
        };
        o.onload = loadFunction;
        o.onreadystatechange = function(){
            if (this.readyState == 'loaded'){
                loadFunction();
            }
        };
    }
    if (parent){
        // IE compatibility
        try {
            parent.insertBefore(o, adjacentNode);
        }
        catch(e){
            parent.insertBefore(o);
        }
    }
    return o;
}

function parseQuery() {
    var r = {};
   (location.search || '').replace(/(?:[?&]|^)([^=]+)=([^&]*)/g, function(ig, k, v) {r[k] = v;});
   return r;
}

function proxify(origObj,proxyObj,funkList){
    var replaceFunk = function(org,proxy,fName)
    {
        org[fName] = function()
        {
           return proxy[fName].apply(proxy,arguments);
        };
    };

    for(var v in funkList) {replaceFunk(origObj,proxyObj,funkList[v]);}
}

function unique(a) {
    if (!a) return a;
    var i=a.length, r=[], s={};
    while (i--) {
        var k = a[i];
        if (!s[k]) {
            s[k] = true;
            r.push(k);
        }
    }
    return r;
}

function aug(json1, json2){
    json1 = json1 || {};
    for (var key in json2) json1[key] = json2[key];
    return json1;
}

function addClass(el, newName){
    var curName = el.className;
    newName = curName !== '' ? ' '+newName : newName;
    el.className+= newName
}

function trim(str){
    if (str.trim){
        return str.trim();
    }
    else{
        return str.replace(/^\s+|\s+$/g, '');
    }
}

function addListener(){
    if (typeof arguments[0] === 'string'){
        arguments[2] = arguments[1];
        arguments[1] = arguments[0];
        arguments[0] = document;
    }
    var el = arguments[0],
        type = arguments[1],
        cb = arguments[2];

    if (typeof el.addEventListener !== 'undefined'){
      el.addEventListener(type, cb, false);
    }
    else if (el.attachEvent){
      el.attachEvent('on'+type, cb, false);
    }
}

function removeListener(){
    if (typeof arguments[0] === 'string'){
        arguments[2] = arguments[1];
        arguments[1] = arguments[0];
        arguments[0] = document;
    }
    var el = arguments[0],
        type = arguments[1],
        cb = arguments[2];

    if (typeof el.removeEventListener !== 'undefined'){
      el.removeEventListener(type, cb, false);
    }
    else if (el.detachEvent){
      el.detachEvent('on'+type, cb);
    }
}/* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

/**
 * @class
 * @description A global class providing tools for creating cross browser and cross platform compatible web apps with rich capabilities and UI.
 * @requires {object} jQuery If jQuery wasn't loaded in the document, a script request is sent.
 * @author ran@doat.com (Ran Ben Aharon)
 * @version: 0.671
 */
function Main(){
    var self = this,
        $document, head = document.getElementsByTagName('HEAD')[0],
        DOML, Env, Navigation, Searchbar, Scroll, Slider, Swiper, envInfo,
        cfg = {};

    if (typeof doat_config !== 'undefined'){
        cfg = aug(cfg, doat_config);
    }

    this.init = init;
    this.renderHTML = renderHTML;
    this.openLink = openLink;
    this.getSearchQuery = getSearchQuery;
    this.visible = this.focused = false;

    this.Log = typeof Logger !== "undefined" && new Logger() || null;

    // Put here so that apps could attach to Events.ready() before init() executes (if jquery isn't preloaded).
    this.Events = new Doat_Events();

    // Same for Env
    Env = new Doat_Env();
    this.Env = this.Environment = Env;

    envInfo = Env.getInfo();

    // Stretches viewport in mobile browsers
    if (Env.isMobile()){
        create('META', head, {
            'name': 'viewport',
            'content': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;'
        });
        // Hide top searchbar in iphones
        if (envInfo.platform.name === 'iphone'){
            create('META', head, {
                'name': 'apple-mobile-web-app-capable',
                'content': 'yes'
            });
        }
    }

    var renderTemplate = function(str, attrArr){
      if (!attrArr){return str}
      for (var key in attrArr){
        var keyRegex = new RegExp("{"+key+"}", "g");
        var value = attrArr[key];
        str = str.replace(keyRegex, value);
      }
      return str;
    };

    function init(){
        $document = $(document);

        // DOML
        DOML = new Doat_DOML();
        self.DOML = DOML;
        
        Searchbar = new Doat_Searchbar({
            'searchClearButton': cfg.searchClearButton
        });
        self.Searchbar = Searchbar;

        Slider = new Doat_Slider();
        self.Slider = Slider;

        Swiper = new Doat_Swiper();
        self.Swiper = Swiper;
 
        Scroll = new Doat_Scroll();
        self.Scroll = Scroll;

        Navigation = new Doat_Navigation();
        self.Navigation = self.Nav = Navigation;

        // Event handlers
        self.Events.focused(function(){
            cfg.hasHost = true;
            self.focused = true;
        });

        self.Events.blurred(function(){
            self.focused = false;
        });

        self.Events.visible(function(){
            self.visible = true;
        });

        self.Events.hidden(function(){
            self.visible = false;
        });

        $document.ready(function(){
            DOML.parse();

            Scroll.init(cfg);
            Navigation.init(cfg);

            addClass(document.body, 'doml-env-'+envInfo.platform.name);

            if (Env.isMobile()){
                addClass(document.body, 'doml-env-mobile');
                if (cfg.webkitAnimation !== false){
                    enableCssAnim(envInfo.platform.name, envInfo.browser.name, self.Log);
                }
            }

            $('body').bind('click', function(event){
                var el = event.target || event.originalTarget ; // All browsers || IE
                var elPath = '';

                if (el){
                    // Add tag name
                    if (el.nodeName){
                        elPath = el.nodeName;
                    }
                    // Add class name
                    if (el.className != ''){
                        elPath+= '.'+el.className;
                    }
                    // Add id
                    if (el.id != ''){
                        elPath+= '#'+el.id;
                    }
                    // Add text node
                    if (el.firstChild && el.firstChild.nodeType === 3){
                        var text = el.firstChild.nodeValue;
                        text = trim(text);
                        if (text !== ''){
                            elPath+= ' (\"'+text+'\")';
                        }
                    }
                    // Add alt
                    if (el.getAttribute('alt')  && el.getAttribute('alt') !== ''){
                        var alt = el.getAttribute('alt');
                        alt = trim(alt);
                        elPath+= ' (\"'+alt+'\")';
                    }
                }
            });
            self.Events.dispatchEvent('ready', {'callOnce': true});
        });

        var q = parseQuery();
        self.params = {};
        self.params.query = q['do_query'] ? decodeURIComponent(q['do_query']) : '';
        self.params.experience = q['do_experience'] ? decodeURIComponent(q['do_experience']) : '';
        self.params.platform = q['do_platform'] ? q['do_platform'] : '';
        self.params.attributes = q['do_attr'] ? JSON.parse(decodeURIComponent(q['do_attr'])) : {};
    }

    /**
     * @method getSearchQuery
     * @description Returns the original search query sent by the host
     * @returns {String}
     */
    function getSearchQuery(){
        return self.params.query;
    }

    /**
     * @method renderHTML
     * @description Renders an HTML string according to template and data sent. Detrmines what to return according to the running platform.
     * Possible key names:
     * <ul>
     * <li>'default'</li>
     * <li>'web'</li>
     * <li>'iphone'</li>
     * <li>'ipad'</li>
     * <li>'android'</li>
     * <li>'windowsPhone'</li>
     * <li>'symbian'</li>
     * <li>'webOS'</li>
     * </ul>
     * Possible key combinations:
     * <ul>
     * <li>default</li>
     * <li>platformName (e.g 'iphone')</li>
     * <li>platformName[,platformName] (e.g 'iphone,android', 'web,default')<li>
     * </ul>
     * @param {String/Object} templates A string containing an HTML template or an object containing key-value pairs where the key is a platform name and the value is the html template associated.
     * @param {Array} attrArr An associative array in which the keys are the replacement names in the template strings
     * @return {string}
     * @example
     * var html = Doat.renderHTML('Hi! my name is {name}.', {'name': 'Joey'});
     * // Returns 'Hi! My name is Joey.'
     *
     *
     * var html = Doat.renderHTML({'iphone': 'This is an iphone version {ver}.'}, {'ver': '4.2'});
     * // Returns 'This is an iphone version 4.2.' (if platform === 'iphone')
     * // Returns '' (if platform === 'web')
     *
     *
     * var html = Doat.renderHTML({'web': '<p class="web">{text}</p>', 'iphone,default': '<span class="mobile">{text}</span>'}, {'text': 'Just some text'});
     * // Returns '<p class="web">Just some text</p>' (if platform === 'web')
     * // Returns '<span class="mobile">Just some text</span>' (if platform === 'iphone')
     * // Returns '<span class="mobile">Just some text</span>' (if platform === 'android')
     */
     function renderHTML(templates, attrArr){
        var tmpl;
        // If a string was sent instead of an object
        if (typeof templates === 'string'){
            tmpl = templates;
        }
        // If templates was sent as an object
        else{
            var defaultTmpl = '',
                platform = Env.getInfo().platform;

            // Loop through all keys
            for (k in templates){
                // Split by ',' if, for example, sent "web,iphone,default"
                var splitK = k.split(',');
                // Loop through keys that were seperated by ','
                for (var i=0; i<splitK.length; i++){
                    // If the key is the current platform
                    if (splitK[i] === platform){
                        // Set the template string
                        tmpl = templates[k];
                        // Exit the loop
                        break;
                    }
                    // If the key is "default"
                    else if (splitK[i] === 'default'){
                        defaultTmpl = templates[k];
                    }
                }
                // If tmpl wasn't set (no key matched the platform) - set it with default value
                if (!tmpl) tmpl = defaultTmpl;
            }
        }
        // Eventually render the HTML template and return it
        return renderTemplate(tmpl, attrArr);
    }

    function openLink(urls, _options){
        var finalObj,
            userPlatform = Env.getInfo().platform,
            isMobile = Env.isMobile(),
            options = _options || {};

        function _escape(url){
            return encodeURIComponent(encodeURIComponent(url));
        }

        function _normalize(o){
            if (typeof o === 'string'){
                o = {
                    'url': o,
                    'newWindow': (!isMobile),
                    'label': ((o.indexOf("itms-apps://") !== -1 || o.indexOf("itms://") !== -1 || o.indexOf("http://itunes.apple.com") !== -1) ? "Download from App Store" : (o.indexOf("http://") !== 0 && o.indexOf("https://") !== 0) ? "Launch installed app" : o)
                }
            }
            return o;
        }

        function _getObj(arr){
            if (!arr){return arr;}

            var finalObj;
            arr = (arr instanceof Array) ? arr : [arr];
            
            if (isMobile){
                finalObj = {
                    'url': 'doatJS://OpenLink'
                };
                for (var i=0, iLen = arr.length; i<iLen; i++){
                    var o = _normalize(arr[i]);
                    if (o['newWindow'] && o.url.indexOf('http') === 0){
                        o.url = 'doatBrowser://'+o.url;
                    }
                    o.url = _escape(o.url);
                    finalObj['url']+= '/'+o.url;
                }
            }
            else{
                finalObj = _normalize(arr[0]);
            }
            return finalObj;
        }

        for (platform in urls){
            // Split by ',' if, for example, sent "web,iphone,default"
            var splitP = platform.split(',');
            for (var i=0, iLen = splitP.length; i<iLen; i++){
                if (trim(splitP[i]) === userPlatform){
                    finalObj = urls[platform];
                    break;
                }
            }
            if (finalObj){break;}
        }
        
        if (cfg.hasHost === true) {
            finalObj = _getObj(finalObj || urls['default']);
            if (finalObj){
                if (options['debug']){
                    return finalObj['url'];
                }
                else{
                    if (!isMobile && finalObj['newWindow']){
                        window.open(finalObj['url'], '_blank', 'status=no');
                    }
                    else{
                        location.href = finalObj['url'];
                    }
                    return true;
                }
            }
        } else {
            var a = document.getElementById('alertView');
            if (!a){
                var styleRules = '#doatOpenWin ul { list-style-type: none; }' +
                                '#doatOpenWin ul li { padding: 6px 0; }' +
                                '#doatOpenWin ul li a { color: #fff; text-decoration: none; font-size: 13px; }' +
                                                        
                                    '#alertView{'+
                                            'text-align: center;' +
                                            'width: 250px;' +
                                            'position: absolute;' +                                     
                                            'left: 50%;' +
                                            'margin-left: -135px;' +
                                            'border: 2px solid #fff;' +
                                            'border-radius: 20px;' +
                                            '-moz-border-radius: 20px;' +
                                            '-webkit-border-radius: 20px;' +
                                            'background:  rgba(59, 80, 119, 0.9) ;' +
                                            'box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);' +
                                            '-moz-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);' +
                                            '-webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);' +
                                            'overflow:hidden;' +
                                            'z-index:1000;' +
                                            'padding:10px;' +
                                            'display:none;' +
                                    '}'+
                                    '#alertView div#shine {' +
                                        'position: absolute;' +
                                        'top: -1474px;' +
                                        'height: 1500px;' +
                                        'width: 1500px;' +
                                        'border-radius: 1500px;' +
                                        '-moz-border-radius: 1500px;' +
                                        '-webkit-border-radius: 1500px;' +
                                        'background: rgb(255, 255, 255);' +
                                        'left: -626px;' +
                                        'background: -webkit-gradient(' +
                                        'linear,' +
                                        'left bottom,' +
                                        'left top,' +
                                        'color-stop(0, rgba(59,81,119, 0.5)),' +
                                        'color-stop(0.06, rgba(255,255,255, 0.5))' +
                                        ');' +
                                        'background:    -moz-linear-gradient(' +
                                        'center bottom,' +
                                        'rgba(59,81,119, 0.5) 0%,' +
                                        'rgba(255,255,255, 0.5) 4%' +
                                        ');' +
                                        'opacity: 1;' +
                                        'filter: alpha(opacity = 05);' +
                                        'z-index: 5;' +
                                    '}'+
                                    '#alertView h2, #alertView p{'+
                                        'color: white;' +
                                        'margin: 0;' +
                                        'padding: 5px 10px;' +
                                        'font: 12px / 1.1em Helvetica, Arial, sans-serif;' +
                                        'position: relative;' +
                                        'z-index: 20;' +
                                    '}'+
                                    '#alertView h2{'+
                                        'text-align:center;' +
                                        'font: 18px / 1.1em Helvetica, Arial, sans-serif;' +
                                    '}'+
                                    '#alertView div.button.white{'+                                 
                                        'background: -webkit-gradient(' +
                                        'linear,' +
                                        'left bottom,' +
                                        'left top,' +
                                        'color-stop(0.13, rgb(62,73,101)),' +
                                        'color-stop(0.43, rgb(62,73,101)),' +
                                        'color-stop(1, rgb(221,222,224))' +
                                        ');' +
                                        'background: -moz-linear-gradient(' +
                                        'center bottom,' +
                                        'rgb(62,73,101) 13%,' +
                                        'rgb(62,73,101) 43%,' +
                                        'rgb(221,222,224) 100%' +
                                        ');' +               
                                    '}'+
                                    '#alertView div.button{'+
                                        'margin: 0 auto 6px;' +
                                        'background: rgb(69, 90, 129);' +
                                        'border: 1px solid rgb(59, 80, 119);' +
                                        'border: 1px solid rgba(59, 80, 119, 1);' +
                                        'border-radius: 5px;' +
                                        '-moz-border-radius: 5px;' +
                                        '-webkit-border-radius: 5px;' +
                                        'background: -webkit-gradient(' +
                                        'linear,' +
                                        'left bottom,' +
                                        'left top,' +
                                        'color-stop(0.13, rgb(62,73,101)),' +
                                        'color-stop(0.43, rgb(62,73,101)),' +
                                        'color-stop(1, rgb(221,222,224))' +
                                        ');' +
                                        'background: -moz-linear-gradient(' +
                                        'center bottom,' +
                                        'rgb(62,73,101) 13%,' +
                                        'rgb(62,73,101) 43%,' +
                                        'rgb(221,222,224) 100%' +
                                        ');' +               
                                    '}'+
                                    '#alertView div.button p{'+
                                        'text-align: center;' +
                                        'margin: 0;' +
                                        'padding: 0;' +
                                    '}'+
                                    '#alertView div.button p a{' +
                                        'color: #333333;' +
                                        'color: rgba(255, 255, 255, 1);' +
                                        'text-decoration: none;' +
                                        'font: bold 14px/1.2em Helvetica, Arial, sans-serif;' +
                                        'margin: 0;' +
                                        'display: block;' +
                                        'padding: 7px 0 10px;' +
                                        'text-shadow: 0 1px 1px #5E5E5E;' +
                                        'border-radius: 5px;' +
                                        '-moz-border-radius: 5px;' +
                                        '-webkit-border-radius: 5px;' +
                                    '}'+
                                     
                                    '#alertView div.button p a:active {'+
                                        '-moz-box-shadow: 0 0 15px white;' +
                                        '-webkit-box-shadow: 0 0 15px white;' +
                                    '}';
                                    
                create('style', head, {'innerHTML': styleRules});
                                        
                var o = document.createElement("div");
                o.id = "doatOpenWin";
                var a = document.createElement("div");
                a.id = "alertView";
                
                var html = '<h2>Launching '+document.title+' app</h2>';
                for (var i=0; i<finalObj.length; i++) {
                    var url = _normalize(finalObj[i]);
                    html += '<div class="button"><p><a href="' + url.url + '" ' + ((url.newWindow)? 'target="_blank"' : '') + '>' + url.label + '</a></p></div>';
                }               
                html += '<div class="button" id="cancelButton"><p><a href="javascript://">Cancel</a></p></div>';
                html += '<div id="shine"></div>';
                a.innerHTML = html;             
                o.appendChild(a);
                document.body.appendChild(o);
                
                o.querySelector('#cancelButton').addEventListener('click', function(){a.style.display = 'none';}, false);
            }

            a.style.display = 'block';
            a.style.top = document.body.scrollTop + 40 + 'px';
        }
    }
}

// Instantiate object
var Doat = new Main();
if (!window.doat_config || !doat_config.manualInit){
    Doat.init();
}

    

 /* 
 * Copyright 2011 DoAT. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *      conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this list
 *      of conditions and the following disclaimer in the documentation and/or other materials
 *      provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY Do@ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of DoAT.
 */

    window['Doat'] = Doat;
})();