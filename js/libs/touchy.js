(function(){;function create(tagName,parent,props,callback,adjacentNode){var doc=parent?parent.ownerDocument:document;var o=doc.createElement(tagName);if(props)for(var p in props){if(p=='style'){var styles=props[p];for(var s in styles)o.style.setProperty(s,styles[s]);}else o[p]=props[p];}
if(callback&&tagName=='script'){var loaded=false;var loadFunction=function(){if(loaded){return;}
loaded=true;callback();};o.onload=loadFunction;o.onreadystatechange=function(){if(this.readyState=='loaded'){loadFunction();}};}
if(parent){try{parent.insertBefore(o,adjacentNode);}
catch(e){parent.insertBefore(o);}}
return o;}
function parseQuery(){var r={};(location.search||'').replace(/(?:[?&]|^)([^=]+)=([^&]*)/g,function(ig,k,v){r[k]=v;});return r;}
function proxify(origObj,proxyObj,funkList){var replaceFunk=function(org,proxy,fName)
{org[fName]=function()
{return proxy[fName].apply(proxy,arguments);};};for(var v in funkList){replaceFunk(origObj,proxyObj,funkList[v]);}}
function unique(a){if(!a)return a;var i=a.length,r=[],s={};while(i--){var k=a[i];if(!s[k]){s[k]=true;r.push(k);}}
return r;}
function aug(json1,json2){json1=json1||{};for(var key in json2)json1[key]=json2[key];return json1;}
function addClass(el,newName){var curName=el.className;newName=curName!==''?' '+newName:newName;el.className+=newName}
function trim(str){return trim&&str.trim()||this.replace(/^\s+/,'').replace(/\s+$/,'');}
var Logger=function(){function getLoggerLevel(){if(location.href.indexOf('stg.doitapps.com')!==-1){return Log.INFO;}
else if(location.href.indexOf('www.doitapps.com')!==-1){return Log.ERROR;}
return Log.DEBUG;}
function getLoggerOutput(){var loggerOutput=parseQuery()['doatloggeroutput'];if(loggerOutput){switch(loggerOutput){case'console':return Log.consoleLogger;break;case'inline':return Log.writeLogger;break;case'alert':return Log.alertLogger;break;case'popup':return Log.popupLogger;break;default:if(window[loggerOutput]){return window[loggerOutput]}}}
return Log.consoleLogger;}
return new Log(getLoggerLevel(),getLoggerOutput());};;function Doat_Env(cfg){var self=this,_info,_do_platform,orientationPrefix=(typeof Doat!=="undefined")?"doml-orientation-":"orientation-",orientationRegEpx=new RegExp(orientationPrefix+"[^\s]*","g"),isTouch=cfg&&cfg.isTouch||('ontouchstart'in window);window.addEventListener('orientationchange',updateOrientationClassName,false);window.addEventListener('load',updateOrientationClassName,false);var _getInfo=function(uaStr){uaStr=(uaStr||navigator.userAgent).toLowerCase();_info={};_info.platform=_getPlatform(uaStr);_info.browser=_getBrowser(uaStr);_info.os=_getOS(uaStr);_info.screen=_getScreen();};var _getPlatform=function(uaStr){var n='',v='',m;m=/(iphone|ipad)|(android)|(symbian)|(webOSos)|(windows phone os)/.exec(uaStr)||[];n=m[1]||m[2]&&''||m[3]&&'nokia'||m[4]&&'blackberry'||m[5]&&'';return{"name":n,"version":v}};var _getOS=function(uaStr){var n='',v='',m;m=/(iphone|ipad)|(android|symbian|webos)|(windows phone os)/.exec(uaStr)||[];n=m[1]&&'ios'||m[2]||m[3]&&'windowsphoneos';if(!n){m=/(Win32)|(Linux)|(MacIntel)/.exec(navigator.platform)||[];n=m[1]&&'windows'||m[2]||m[3]&&'mac'||'';}
switch(n){case"ios":v=/os\s([\d_]+)\slike/.exec(uaStr);v=v[1].replace(/_/g,'.');break;case"android":v=/android\s([\d\.\-]+)[^;]*;/.exec(uaStr);v=v[1].replace(/-/g,'');break;}
return{"name":n,"version":v};};var _getBrowser=function(uaStr){var n,v='',m;uaStr=uaStr.toLowerCase();m=/(webkit)[ \/]([\w.]+)/.exec(uaStr)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(uaStr)||/(msie) ([\w.]+)/.exec(uaStr)||uaStr.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(uaStr)||[];n=m[1]||'';return{"name":n,"version":v};};var _getScreen=function(){var w="",h="";if(window.innerHeight){w=window.innerWidth;h=window.innerHeight;}
else if(window.screen&&window.screen.availHeight){w=window.screen.availWidth;h=window.screen.availHeight;}
return{"width":w,"height":h}};function updateOrientationClassName(){switch(window.orientation){case 90:o='landscape-right';break;case-90:o='landscape-left';break;default:o='portrait';}
document.body.className=document.body.className.replace(orientationRegEpx,'')+orientationPrefix+o;}
this.isTouch=function(){return isTouch;};this.isMobile=function(uaStr){var p=self.getInfo(uaStr).platform.name;return cfg&&cfg.isTouch||/^(iphone|ipad|android|symbian|webos|windowsphoneos)$/.test(p);};this.getInfo=function(){if(arguments[0]||!_info){var uaStr=(arguments[0]===true)?undefined:arguments[0];_getInfo(uaStr);}
return _info;};this.addEventListener=function(){if(typeof arguments[0]==='string'){arguments[2]=arguments[1];arguments[1]=arguments[0];arguments[0]=document;}
var el=arguments[0],type=arguments[1],cb=arguments[2],TOUCHSTART=self.isMobile()?'touchstart':'mousedown',TOUCHMOVE=self.isMobile()?'touchmove':'mousemove',TOUCHEND=self.isMobile()?'touchend':'mouseup';switch(type){case'swipeX':addListener(el,'swipeX',cb);break;case'touch':var startPos,movePos,enableTouchMove=false;addListener(el,TOUCHSTART,function(e){e=e.originalEvent||e;startPos={'type':'start','position':{'x':e.touches?e.touches[0].pageX:e.clientX,'y':e.touches?e.touches[0].pageY:e.clientY}};cb(e,startPos);enableTouchMove=true;});addListener(document,TOUCHMOVE,function(e){if(!enableTouchMove){return false;}
e=e.originalEvent||e;movePos={'type':'move','position':{'x':e.touches?e.touches[0].pageX:e.clientX,'y':e.touches?e.touches[0].pageY:e.clientY}}
movePos['delta']={'x':movePos.position.x-startPos.position.x,'y':movePos.position.y-startPos.position.y}
cb(e,movePos);});addListener(document,TOUCHEND,function(e){enableTouchMove=false;if(!movePos||movePos.delta.x===0&&movePos.delta.y===0){return false;}
e=e.originalEvent||e;var data={'type':'end','position':movePos.position,'delta':movePos.delta,'swipeEvent':true,'direction':(movePos.delta.x>0)?'ltr':'rtl'};cb(e,data);movePos=undefined;});break;}}};function enableCssAnim(platform,browser,Log){Log&&Log.info('platform='+platform);var transfromKeys=['scale','rotate','skew','translate','matrix'],CSS_PREFIX=browser==='webkit'?'-webkit-':browser==='mozilla'?'-moz-':'';css();$.fn.fadeIn=function(){var a=normalizeArguments(arguments);return $(this).animate({'opacity':1},a.dur,a.ease,a.cb);};$.fn.fadeOut=function(){var a=normalizeArguments(arguments);return $(this).animate({'opacity':0},a.dur,a.ease,a.cb);};$.fn.animate=function(){var $el=this;var k,props,dur,ease,callbacks=[];for(var i=1;i<arguments.length;i++){var arg=arguments[i];if(typeof arg==='function'){callbacks.push(arg);}
else if(arg==='fast'||arg==='slow'){dur=arg;}
else if(typeof arg==='string'){ease=arg;}
else{dur=arg;}}
props=arguments[0];props[CSS_PREFIX+'transform']='';for(k in props){var val;if(props[k].toString().indexOf('=')!==-1){props[k]=getIncVal($el,k,props[k]);}
if(isTransform(k)){props[CSS_PREFIX+'transform']+=k+'('+props[k]+')';delete props[k];}
else if(k==='left'||k==='right'){val=(k==='right')?reverse(props[k]):props[k];props[CSS_PREFIX+'transform']+='translateX('+val+')';delete props[k];}
else if(k==='bottom'||k==='top'){val=(k==='bottom')?reverse(props[k]):props[k];props[CSS_PREFIX+'transform']+='translateY('+val+')';delete props[k];}}
dur=(dur==='fast')?0.2:(dur==='slow')?0.6:dur/1000||0.3;ease=(!ease||ease==='swing')?'ease-in-out':ease;if(callbacks.length>0){setTimeout(function(){var i,len=callbacks.length;for(i=0;i<len;i++){callbacks[i].call($el);}},dur*1000);}
props[CSS_PREFIX+'transition']='all '+dur+'s '+ease;return $el.css(props);}
function isTransform(k){for(var i=0;i<transfromKeys.length;i++){if(k.indexOf(transfromKeys[i])!==-1){return true;break;}}
return false;}
function reverse(v){v=v.toString();return(v.indexOf('-')===0)?v.substring(1,v.length):'-'+v;}
function getIncVal(el,propName,value){var inc=(value.indexOf('-=')!==-1)?-1:1;value=value.toString();var num=parseInt(value.substring(2,value.length),10).toString();var unit=value.substring(2+num.length,value.length);var curValue=el.css(propName);curValue=(curValue&&curValue!=='')?parseInt(curValue,10):0;var newValue=curValue+(inc*num)+unit;return newValue;}
function css(){var cfg={};if(platform!=='android'){cfg[CSS_PREFIX+'transform']='translate3d(0px, 0px, 0px) rotate(0deg) scale(1)';cfg[CSS_PREFIX+'box-sizing']='border-box';cfg[CSS_PREFIX+'backface-visibility']='hidden';Log&&Log.info('Including cfg[\''+CSS_PREFIX+'transform\'] = \'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)\'');}
else{Log&&Log.info('not including cfg[\''+CSS_PREFIX+'transform\'] = \'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)\'');}
$('.doml_content').css(cfg);}}
function normalizeArguments(args){var val={};for(var i=0;i<args.length;i++){var arg=args[i];if(typeof arg==='function'){val.cb=arg;}
else if(arg==='fast'||arg==='slow'){val.dur=arg;}
else if(typeof arg==='string'){val.ease=arg;}
else{val.dur=arg;}}
return val;};var Doat_Events=function(){var self=this,eventArr={};var addEventListener=function(type,cb){var evt=eventArr[type];if(!evt){eventArr[type]={'callbacks':[],'enabled':false};evt=eventArr[type];}
evt['callbacks'].push(cb);if(evt['enabled']&&evt['callOnce']){cb();}};this.ready=function(cb){addEventListener('ready',cb);};this.orientationchange=function(cb){window.addEventListener('orientationchange',cb,false);};this.ready(function(){eventArr['ready'].enabled=true;});};;(function(window,document,undefined){var width='width',length='length',radius='radius',lines='lines',trail='trail',color='color',opacity='opacity',speed='speed',shadow='shadow',style='style',height='height',left='left',top='top',px='px',childNodes='childNodes',firstChild='firstChild',parentNode='parentNode',position='position',relative='relative',absolute='absolute',animation='animation',transform='transform',Origin='Origin',Timeout='Timeout',coord='coord',black='#000',styleSheets=style+'Sheets',prefixes="webkit0Moz0ms0O".split(0),animations={},useCssAnimations;function eachPair(args,it){var end=~~((args[length]-1)/2);for(var i=1;i<=end;i++){it(args[i*2-1],args[i*2]);}}
function createEl(tag){var el=document.createElement(tag||'div');eachPair(arguments,function(prop,val){el[prop]=val;});return el;}
function ins(parent,child1,child2){if(child2&&!child2[parentNode])ins(parent,child2);parent.insertBefore(child1,child2||null);return parent;}
ins(document.getElementsByTagName('head')[0],createEl(style));var sheet=document[styleSheets][document[styleSheets][length]-1];function addAnimation(to,end){var name=[opacity,end,~~(to*100)].join('-'),dest='{'+opacity+':'+to+'}',i;if(!animations[name]){for(i=0;i<prefixes[length];i++){try{sheet.insertRule('@'+
(prefixes[i]&&'-'+prefixes[i].toLowerCase()+'-'||'')+'keyframes '+name+'{0%{'+opacity+':1}'+
end+'%'+dest+'to'+dest+'}',sheet.cssRules[length]);}
catch(err){}}
animations[name]=1;}
return name;}
function vendor(el,prop){var s=el[style],pp,i;if(s[prop]!==undefined)return prop;prop=prop.charAt(0).toUpperCase()+prop.slice(1);for(i=0;i<prefixes[length];i++){pp=prefixes[i]+prop;if(s[pp]!==undefined)return pp;}}
function css(el){eachPair(arguments,function(n,val){el[style][vendor(el,n)||n]=val;});return el;}
function defaults(obj){eachPair(arguments,function(prop,val){if(obj[prop]===undefined)obj[prop]=val;});return obj;}
var Spinner=function Spinner(o){this.opts=defaults(o||{},lines,12,trail,100,length,7,width,5,radius,10,color,black,opacity,1/4,speed,1);},proto=Spinner.prototype={spin:function(target){var self=this,el=self.el=self[lines](self.opts);if(target){ins(target,css(el,left,~~(target.offsetWidth/2)+px,top,~~(target.offsetHeight/2)+px),target[firstChild]);}
if(!useCssAnimations){var o=self.opts,i=0,f=20/o[speed],ostep=(1-o[opacity])/(f*o[trail]/100),astep=f/o[lines];(function anim(){i++;for(var s=o[lines];s;s--){var alpha=Math.max(1-(i+s*astep)%f*ostep,o[opacity]);self[opacity](el,o[lines]-s,alpha,o);}
self[Timeout]=self.el&&window['set'+Timeout](anim,50);})();}
return self;},stop:function(){var self=this,el=self.el;window['clear'+Timeout](self[Timeout]);if(el&&el[parentNode])el[parentNode].removeChild(el);self.el=undefined;return self;}};proto[lines]=function(o){var el=css(createEl(),position,relative),animationName=addAnimation(o[opacity],o[trail]),i=0,seg;function fill(color,shadow){return css(createEl(),position,absolute,width,(o[length]+o[width])+px,height,o[width]+px,'background',color,'boxShadow',shadow,transform+Origin,left,transform,'rotate('+~~(360/o[lines]*i)+'deg) translate('+o[radius]+px+',0)','borderRadius','100em');}
for(;i<o[lines];i++){seg=css(createEl(),position,absolute,top,1+~(o[width]/2)+px,transform,'translate3d(0,0,0)',animation,animationName+' '+1/o[speed]+'s linear infinite '+(1/o[lines]/o[speed]*i-1/o[speed])+'s');if(o[shadow])ins(seg,css(fill(black,'0 0 4px '+black),top,2+px));ins(el,ins(seg,fill(o[color],'0 0 1px rgba(0,0,0,.1)')));}
return el;};proto[opacity]=function(el,i,val){el[childNodes][i][style][opacity]=val;};var behavior='behavior',URL_VML='url(#default#VML)',tag='group0roundrect0fill0stroke'.split(0);(function(){var s=css(createEl(tag[0]),behavior,URL_VML),i;if(!vendor(s,transform)&&s.adj){for(i=0;i<tag[length];i++){sheet.addRule(tag[i],behavior+':'+URL_VML);}
proto[lines]=function(){var o=this.opts,r=o[length]+o[width],s=2*r;function grp(){return css(createEl(tag[0],coord+'size',s+' '+s,coord+Origin,-r+' '+-r),width,s,height,s);}
var g=grp(),margin=~(o[length]+o[radius]+o[width])+px,i;function seg(i,dx,filter){ins(g,ins(css(grp(),'rotation',360/o[lines]*i+'deg',left,~~dx),ins(css(createEl(tag[1],'arcsize',1),width,r,height,o[width],left,o[radius],top,-o[width]/2,'filter',filter),createEl(tag[2],color,o[color],opacity,o[opacity]),createEl(tag[3],opacity,0))));}
if(o[shadow]){for(i=1;i<=o[lines];i++){seg(i,-2,'progid:DXImage'+transform+'.Microsoft.Blur(pixel'+radius+'=2,make'+shadow+'=1,'+shadow+opacity+'=.3)');}}
for(i=1;i<=o[lines];i++){seg(i);}
return ins(css(createEl(),'margin',margin+' 0 0 '+margin,position,relative),g);};proto[opacity]=function(el,i,val,o){o=o[shadow]&&o[lines]||0;el[firstChild][childNodes][i+o][firstChild][firstChild][opacity]=val;};}
else{useCssAnimations=vendor(s,animation);}})();window.Spinner=Spinner;})(window,document);;var Doat_Navigation=function(){var MainObj=typeof Doat!='undefined'?Doat:TouchyJS,classnamePrefix=typeof Doat!='undefined'?'doml_':'touchyjs-',isMobile=MainObj.Env.isMobile(),$currentElement,$previousElement,currentElementHeight,cbArr={},CSS_PREFIX;var b=MainObj.Env.getInfo().browser.name||MainObj.Env.getInfo().browser;CSS_PREFIX=b==='webkit'?'-webkit-':b==='mozilla'?'-moz-':'';var attachCallback=function(){var a=arguments;var pageId=(typeof a[0]==='string')?a[0]:a[0].get?a[0].get(0).getAttribute('id'):a[0].getAttribute('id'),direction=a[1],timing=(typeof a[2]==='string')?a[2].toLowerCase():'oncomplete',cb=(typeof a[2]==='string')?a[3]:a[2];cbArr[pageId]=cbArr[pageId]||{};cbArr[pageId][timing]=cbArr[pageId][timing]||{};cbArr[pageId][timing][direction]=cb;};var navigate=function(toPage,options){if(!toPage){return false;}
var $nextElement=(toPage.constructor===String)?$('.'+classnamePrefix+'content#'+toPage):$(toPage);onStart($nextElement,options);if($currentElement[0].id==$nextElement[0].id){onComplete($nextElement,options);return false;}
else if(options&&options['transition']=='none'){var nextElCss={'left':'0%','display':'block'};nextElCss[CSS_PREFIX+'transition-duration']='0';nextElCss[CSS_PREFIX+'transform']='translateX(0)';$nextElement.css(nextElCss);$currentElement.css({'display':'none'});onComplete($nextElement,options);}
else if(options&&options['transition']=='fade'){$nextElement.css(CSS_PREFIX+'transition','opacity 0.5s linear');$nextElement.css({'display':'block','opacity':1});$currentElement.css(CSS_PREFIX+'transition','opacity 0.5s linear');$currentElement.css({'opacity':0});onComplete($nextElement,options);}
else{var direction=options&&options.direction||determineDirection($nextElement),nextStart=(direction==='rtl')?'100%':'-100%',currentEnd=(direction==='rtl')?'-100%':'100%';if(isMobile){$nextElement.css(CSS_PREFIX+'transition-duration','0');$nextElement.css(CSS_PREFIX+'transform','translateX('+nextStart+')');}
else{$nextElement.css('left',nextStart);}
$nextElement.css('display','block');setTimeout(function(){$nextElement.animate({'left':'0%'});$currentElement.animate({'left':currentEnd},function(){onComplete($nextElement,options);});},200);}
if(!options||options.muteEventReport!==true){var props={'action':'Navigate','to':$nextElement[0].id};if(options&&options.title){props.title=options.title.replace('/','-');}
if(options&&options.id){props.id=options.id.replace('/','-');}
if(MainObj.Messenger){MainObj.Messenger.trigger(MainObj.Events.USER_ACTION,props)};}
return true;};var back=function(){goTo($previousElement,{'muteEventReport':true});};var goTo=navigate;var onStart=function($nextElement,options){var currId=$currentElement[0].id,nextId=$nextElement[0].id;if(cbArr[nextId]&&cbArr[nextId]['onstart']&&cbArr[nextId]['onstart']['in']){cbArr[nextId]['onstart']['in']($currentElement[0],$nextElement[0]);}
if(cbArr[currId]&&cbArr[currId]['onstart']&&cbArr[currId]['onstart']['out']){cbArr[currId]['onstart']['out']($currentElement[0],$nextElement[0]);}
if(options&&options.onStart){options.onStart($currentElement[0],$nextElement[0]);}};var onComplete=function($nextElement,options){var currId=$currentElement[0].id,nextId=$nextElement[0].id;$currentElement.css('display','none');$previousElement=$currentElement;$currentElement=$nextElement;if(cbArr[nextId]&&cbArr[nextId]['oncomplete']&&cbArr[nextId]['oncomplete']['in']){cbArr[nextId]['oncomplete']['in']($currentElement[0],$previousElement[0]);}
if(cbArr[currId]&&cbArr[currId]['oncomplete']&&cbArr[currId]['oncomplete']['out']){cbArr[currId]['oncomplete']['out']($currentElement[0],$previousElement[0]);}
if(options&&options.onComplete){options.onComplete($currentElement[0],$previousElement[0]);}};var determineDirection=function($el){var transformVal=getTransformValue($el);var condition=(transformVal&&transformVal!==''&&transformVal!=='none')?(transformVal==='translateX(-100%)'):($el.get(0).style.left==='-100%');return condition?'ltr':'rtl';};var getTransformValue=function($el){var $value=$el.css(CSS_PREFIX+'transform'),value=$el[0].style[CSS_PREFIX+'transform'];return $value&&$value!==''&&$value!=='none'?$value:value;};var setCurrent=function(currentEl){if(currentEl.constructor===String){$currentElement=$('#'+currentEl);}
else{$currentElement=$(currentEl);}};var getCurrent=function(){return $currentElement[0];};var hasNewContentHeight=function(){if($currentElement&&currentElementHeight!==$currentElement[0].offsetHeight){currentElementHeight=$currentElement[0].offsetHeight;return currentElementHeight;}
return false;};return{'goTo':goTo,'back':back,'attachCallback':attachCallback,'setCurrent':setCurrent,'getCurrent':getCurrent,'hasNewContentHeight':hasNewContentHeight,'Indicator':new Doat_Progress_Indicator()};};function Doat_Progress_Indicator(){var mainSpinner,customSpinner,mainEl,default_cfg={lines:10,length:7,width:3,radius:7,color:'#ffffff',speed:1.4,trail:72,shadow:true,parent:document.body},default_css={'position':'absolute','left':'50%','top':'200px','z-index':200,'margin-left':'-10px'};var initCustomSpinner=function(customSpinnerCfg){var cfg={};for(i in default_cfg)cfg[i]=default_cfg[i];for(i in customSpinnerCfg)cfg[i]=customSpinnerCfg[i];customSpinner=new Spinner(cfg);customSpinner.spin(cfg.parent);};var initMainSpinner=function(){$mainEl=$('<span class="touchyjs-progress-indicator" />');$mainEl.css(default_css);$(document.body).append($mainEl);mainEl=$mainEl[0];mainSpinner=new Spinner(default_cfg);};this.show=function(customSpinnerCfg){if(customSpinnerCfg){initCustomSpinner(customSpinnerCfg);}
else{if(!mainSpinner){initMainSpinner();}
mainSpinner.spin(mainEl);}};this.hide=function(){if(customSpinner){customSpinner.stop();}
if(mainSpinner){mainSpinner.stop();}};};function Doat_Scroll(){var MainObj=typeof Doat!='undefined'?Doat:TouchyJS,classnamePrefix=typeof Doat!='undefined'?'doml_':'touchyjs-',contentClassName=classnamePrefix+'content',headerClassName=classnamePrefix+'header',contentInnerClassName=classnamePrefix+'scrollable',iscrollArr=[],$container,$header,cfg;window.addEventListener('orientationchange',calculate,false);var isElementExists=function(){var _elements=$('.'+contentClassName);return(_elements.length>0);};var fixElementsPositions=function(){if(hasFixedPositioning()){MainObj.Log&&MainObj.Log.info(Doat.Env.getInfo().platform+' '+MainObj.Env.getInfo().version+' has fixed positioning so using position: fixed');$header.css({'position':'fixed','top':0,'left':0,'width':'100%','z-index':2});$contents.css({'top':$header.get(0).offsetHeight+'px','height':'auto','z-index':1});}
else{MainObj.Log&&MainObj.Log.info(MainObj.Env.getInfo().platform+' '+MainObj.Env.getInfo().version+' has NO fixed positioning so using iScroll');if(iscrollArr.length==0){document.body.addEventListener('touchmove',function(e){e.preventDefault();},false);}
for(var i=0,len=$contents.length;i<len;i++){var el=$contents[i];var $el=$(el);var id=el.getAttribute('id');if(iscrollArr[id]){iscrollArr[id].refresh();}
else{$el.css({'visibility':'hidden','display':'block'});var $innerEl=$(el).children('*');var hasInnerEl=$innerEl.length===1;if(!hasInnerEl){var innerEl=document.createElement("div");innerEl.className=classnamePrefix+'created';innerEl.style.width='100%';innerEl.forEach(function(child){innerEl.appendChild(child);});el.appendChild(innerEl);}
else{$innerEl[0].style.width='100%';}
iscrollArr[id]=new iScroll(id,{onBeforeScrollStart:null,vScrollbar:true,hScroll:false});el.addEventListener('touchstart',function(){iscrollArr[id].refresh.call(iscrollArr[id]);},false);$el.css({'display':'none','visibility':'visible'});}};}};this.init=function(_cfg){cfg=_cfg||{};$container=$(document.body);$contents=$container.children('.'+contentClassName);if($contents.length>0){calculate($contents);var displayContentIndex=cfg.displayContent||0,currentContent=$contents[displayContentIndex];$(currentContent).css('display','block');MainObj.Nav.setCurrent(currentContent);}
if(cfg.scrollTopOffset){MainObj.Log&&MainObj.Log.info('cfg.scrollTopOffset='+cfg.scrollTopOffset+'. window.scrollTo(0,0) set.');setTimeout('window.scrollTo(0,0);',1000);}
else{MainObj.Log&&MainObj.Log.info('cfg.scrollTopOffset not set');}};function calculate($contents){$contents=$contents.length&&$contents||$container.children('.'+contentClassName);$header=$container.children('.'+headerClassName);var headerHeight=$header.length?$header[0].offsetHeight:0,contentHeight=$(window).height()
-parseInt($container.css('margin-top'),10)
-parseInt($container.css('margin-bottom'),10)
-headerHeight
+(cfg.scrollTopOffset||0);$contents.css({'width':'100%','position':'absolute','height':contentHeight+'px','top':headerHeight+'px'});if(cfg.fixedPositioning){fixElementsPositions($header);}}
this.refresh=function(id,height){id=id||MainObj.Nav.getCurrent().getAttribute('id');if(height){$("#"+id).children("*").css("height",height+"px");}
if(iscrollArr[id]){iscrollArr[id].refresh();}};this.scrollTo=function(y){var currentEl=MainObj.Nav.getCurrent(),id=currentEl.getAttribute('id');if(iscrollArr[id]){iscrollArr[id].scrollTo(0,y,0);}
else{currentEl.scrollTop=y;}};this.disable=function(){var currentEl=MainObj.Nav.getCurrent(),id=currentEl.getAttribute('id');if(iscrollArr[id]){iscrollArr[id].disable();}};this.enable=function(){var currentEl=MainObj.Nav.getCurrent(),id=currentEl.getAttribute('id');if(iscrollArr[id]){iscrollArr[id].enable();}};var hasFixedPositioning=function(){if(!MainObj.Env.isMobile()){return true;}
var i=MainObj.Env.getInfo();p=i.platform,v=i.version;if(p==='iphone'||p==='ipad'){return isVersionOrHigher(v,'5');}
else if(p==='android'){return isVersionOrHigher(v,'2.2');}
return false;};function isVersionOrHigher(v1,v2){var v1parts=v1.split('.');var v2parts=v2.split('.');for(var i=0;i<v1parts.length;++i){if(v2parts.length==i){return true;}
if(v1parts[i]==v2parts[i]){continue;}
else if(parseInt(v1parts[i],10)>parseInt(v2parts[i],10)){return true;}
else{return false;}}
if(v1parts.length!=v2parts.length){return false;}
return true;}};function Main(){var self=this,head=document.getElementsByTagName('HEAD')[0],Env,envInfo,cfg={};if(typeof touchy_config!=='undefined'){cfg=aug(cfg,touchy_config);}
this.Events=new Doat_Events();Env=new Doat_Env({'isTouch':cfg.isTouch||(parseQuery()['istouch']=='true')});this.Env=Env;envInfo=self.Env.getInfo();this.init=function(){this.Scroll=new Doat_Scroll();this.Nav=new Doat_Navigation();document.addEventListener('DOMContentLoaded',function(){if(self.Env.isMobile()){if(cfg.webkitAnimation!==false){enableCssAnim(envInfo.platform.name,envInfo.browser.name);}}
self.Scroll.init();},false);}}
var TouchyJS=new Main();;window['TouchyJS']=TouchyJS;})();;(function(){var tag=document.querySelector("HTML"),env=window.TouchyJS&&TouchyJS.Env||new Doat_Env(),envInfo=env.getInfo();tag.className=tag.className+
getTouch()+" "+
getBrowser()+" "+
getPlatform()+" "+
getStandalone()+" "+
getScreenSize()+" "+
getPixelRatio()+" "+
getGeolocation()+" "+
getCSSAnimations()+" ";function render(condition,className){return(condition)?className:"no-"+className;}
function getTouch(){return render(env.isTouch(),"touch");}
function getBrowser(){return envInfo&&envInfo.browser&&envInfo.browser.name||"";}
function getPlatform(){return envInfo&&envInfo.os&&envInfo.os.name||"";}
function getStandalone(){return render(("standalone"in navigator),"standalone");}
function getScreenSize(){var w=envInfo.screen.width,h=envInfo.screen.height;return"width-"+w+" height-"+h;}
function getPixelRatio(){return"pixel-ratio-"+(window.devicePixelRatio||1);}
function getGeolocation(){return render(("geolocation"in navigator),"geolocation");}
function getCSSAnimations(){return render(("webkitTransition"in tag.style||"MozTransition"in tag.style),"cssanimations");}})();