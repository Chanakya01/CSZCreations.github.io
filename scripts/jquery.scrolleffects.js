/*
 Copyright 2011-2016 Adobe Systems Incorporated. All Rights Reserved.
*/
(function(d){"function"===typeof define&&define.amd&&define.amd.jQuery?define(["jquery","museutils"],d):d(jQuery)})(function(d){(function(b){var c=b(window),a=function(a,b,c,d){this.service=a;this.$bp=b;this.elem=c;this.data=d;this.cssProxy=this.service.cssProxy;this.enabled=d&&0<d.length;this.visible=!0;this.isMarkedAsOOV=!1};a.HIDDEN_CLASS="mse_pre_init";a.prototype.onBPActivate=function(){};a.prototype.onBPDeactivate=function(){this.hasPreInitClass=!0;this.elem.addClass(a.HIDDEN_CLASS)};a.prototype.clone=
function(b){b.hasClass(a.HIDDEN_CLASS)||b.addClass(a.HIDDEN_CLASS);b.registerGenericScrollEffect(a,this.data)};a.prototype.initialize=function(){this.hasPreInitClass=this.elem.hasClass(a.HIDDEN_CLASS);var c=b("#page"),d=Muse.Utils.tryParse(b("body").css("padding-top"),parseInt,0)+Muse.Utils.tryParse(c.css("border-top-width"),parseInt,0);this.initialPosition={left:Muse.Utils.tryParse(this.elem.css("left"),parseInt,0)+Muse.Utils.tryParse(c.css("border-left-width"),parseInt,0),top:Muse.Utils.tryParse(this.elem.css("top"),
parseInt,0)+d};this.referenceOffset=this.data[0]["in"][1];this.elemWidth=this.elem.innerWidth();this.elemHeight=this.elem.innerHeight();this.skipVisibleCheck=this.elemWidth<1;for(var f,c=0;d=this.data[c];c++)d.length=d["in"][1]-d["in"][0],d.startPosition=f?{left:f.startPosition.left+f.length*f.speed[0],top:f.startPosition.top+f.length*f.speed[1]}:{left:-d.length*d.speed[0],top:-d.length*d.speed[1]},f=d};a.prototype.update=function(c,d,f){if(!b("body").hasClass("awaiting_bp_activate_scroll")){var g=
this.initialPosition.left-f.scrollLeft,h=this.initialPosition.top-this.referenceOffset,k=c.startPosition.left+c.speed[0]*d,d=c.startPosition.top+c.speed[1]*d,i={};if("number"==typeof c.speed[0])i.left=g+k+"px";if("number"==typeof c.speed[1])i.top=h-d+"px";if(this.visible=this.skipVisibleCheck||this.getVisible(g+k,h-d,f)){if(this.isMarkedAsOOV)i.display="",this.isMarkedAsOOV=!1;this.cssProxy.setCSSProperties(this.elem,i)}else if(!this.isMarkedAsOOV)this.cssProxy.setCSSProperties(this.elem,{display:"none"}),
this.isMarkedAsOOV=!0;if(this.hasPreInitClass)this.elem.removeClass(a.HIDDEN_CLASS),this.hasPreInitClass=!1}};a.prototype.getVisible=function(a,b,c){var d=Math.max(this.elemWidth,this.elemHeight)+100;return(void 0===a||a+d>0&&a-d<c.windowWidth)&&(void 0===b||b+d>0&&b-d<c.windowHeight)};var d=function(a,b,c,d){this.service=a;this.$bp=b;this.elem=c;this.data=d;this.cssProxy=this.service.cssProxy;this.r7Mode=!0;if(!this.r7Mode&&(this.cssBackgroundPosition=this.elem.css("background-position"),this.cssBackgroundPosition.match(/^\d+\%$/gi)))this.cssBackgroundPosition=
(a=this.elem[0].currentStyle)&&a.backgroundPositionX&&a.backgroundPositionY?a.backgroundPositionX+" "+a.backgroundPositionY:Muse.Utils.getRuleProperty(this.getCSSRules(),"background-position");if(this.useBackgroundFixedOptimization()){this.elem.css("background-attachment","fixed");if(this.r7Mode)this.enabled=!1;this.backgroundFixedMode=!0}this.elem.data("hasBackgroundPositionScrollEffect",!0)};d.BG_NORMAL=0;d.BG_COVER=1;d.BG_CONTAIN=2;d.prototype.getCSSRules=function(){if(!this.pageSheet)this.pageStyleSheet=
Muse.Utils.getPageStyleSheets();if(!this.cssRules)this.cssRules=Muse.Utils.getStyleSheetRulesById(this.pageStyleSheet,this.elem.attr("id"));return this.cssRules};d.prototype.useBackgroundFixedOptimization=function(){if(!c.data("scrollWrapper").isStandard())return!1;return 0==this.data[0].speed[0]&&0==this.data[0].speed[1]&&0==this.data[1].speed[0]&&0==this.data[1].speed[1]};d.prototype.initialize=function(){this.referenceOffset=this.data[0]["in"][1];var d=this.elem.parent();this.is100PercentWidth=
d.hasClass("browser_width");this.hasPositionEffect=(this.positionEffect=this.service.getElementEffect(this.is100PercentWidth?d:this.elem,a))&&this.positionEffect.enabled;for(var d=0,f,g;f=this.data[d];d++)f.speed[0]-=0,f.speed[1]-=1,f.length=f["in"][1]-f["in"][0],f.startPosition=null==g?{left:-f.length*f.speed[0],top:-f.length*f.speed[1]}:{left:g.startPosition.left+g.length*g.speed[0],top:g.startPosition.top+g.length*g.speed[1]},g=f;if(!Muse.Browser.Features.checkCSSFeature("background-size")&&this.elem.hasClass("museBGSize")&&
0<b("> .museBgSizePolyfill",this.elem).length)this.polyfillElement=b(b(".museBgSizePolyfill img",this.elem)[0]);this.bgMode=this.getBgMode();this.backgroundOffsetAvailable=!1;this.elem.resize(this,this.onElementResize);this.is100PercentWidth&&c.resize(this,this.onWindowResize);this.backgroundPosition=this.getBackgroundPosition();this.getBackgroundOffset();if(this.elem.hasClass("browser_width"))this.originalWidth=Muse.Utils.tryParse(Muse.Utils.getRuleProperty(this.getCSSRules(),"width"),parseInt)};
d.prototype.onWindowResize=function(a){a.data.recalculateBackgroundOffset=!0};d.prototype.onElementResize=function(a){var a=a.data,b=a.service.getEffectProgress(),c=a.service.getEffectInterval(a,b);a.update(c,b-c["in"][0])};d.prototype.hasOriginalWidth=function(){return Muse.Utils.isDefined(this.originalWidth)&&-1!=this.originalWidth};d.prototype.getDeltaWidth=function(){if(!this.hasOriginalWidth())return 0;return(this.elem.innerWidth()-this.originalWidth)*this.backgroundPosition.multiplier.x};d.prototype.getBackgroundModeDisplayRatio=
function(){switch(this.bgMode){case d.BG_CONTAIN:return Math.min(this.elem.innerWidth()/this.backgroundSize.width,this.elem.innerHeight()/this.backgroundSize.height);case d.BG_COVER:return Math.max(this.elem.innerWidth()/this.backgroundSize.width,this.elem.innerHeight()/this.backgroundSize.height);default:return 1}};d.prototype.updateFixedBackground=function(a,b){var c=this.getBackgroundModeDisplayRatio(),f=this.elem.offset(),h=f.left,k=f.top-this.referenceOffset;if(this.hasPositionEffect&&0==this.positionEffect.data[this.data.indexOf(a)].speed[1]||
!this.hasPositionEffect&&"fixed"==this.elem.css("position"))k=f.top-(a["in"][0]+b);f=(d.BG_COVER!==this.bgMode||!this.is100PercentWidth?h:0)+this.backgroundPosition.multiplier.x*(this.elem.width()-c*this.backgroundSize.width)+Muse.Utils.getCSSIntValue(this.elem,"border-left-width");k=k+this.backgroundPosition.multiplier.y*(this.elem.height()-c*this.backgroundSize.height)+Muse.Utils.getCSSIntValue(this.elem,"border-top-width");k={"background-position":f+"px "+k+"px"};1!=c&&(k["background-size"]=c*
this.backgroundSize.width+"px "+c*this.backgroundSize.height+"px");this.cssProxy.setCSSProperties(this.elem,k)};d.prototype.update=function(a,b){if(this.backgroundOffsetAvailable){if(this.recalculateBackgroundOffset)this.recalculateBackgroundOffset=!1,this.getBackgroundOffset();if(this.backgroundFixedMode)this.updateFixedBackground(a,b);else{var c=this.getBackgroundModeDisplayRatio()-1,d=Math.floor(this.bgOffset.x-c*this.backgroundPosition.multiplier.x*this.backgroundSize.width+this.getDeltaWidth())+
a.startPosition.left+a.speed[0]*b,c=Math.floor(this.bgOffset.y-c*this.backgroundPosition.multiplier.y*this.backgroundSize.height)-(a.startPosition.top+a.speed[1]*b);this.polyfillElement?(d={"margin-left":d+"px","margin-top":c+"px",left:0,top:0},this.cssProxy.setCSSProperties(this.polyfillElement,d)):(d={"background-attachment":"scroll","background-position":d+"px "+c+"px"},this.cssProxy.setCSSProperties(this.elem,d))}}else this.updateRequested=!0};d.prototype.getBackgroundOffset=function(){var a=
Muse.Utils.tryParse(this.backgroundPosition.x,parseFloat,0),b=Muse.Utils.tryParse(this.backgroundPosition.y,parseFloat,0);if(!Muse.Utils.endsWith(this.backgroundPosition.x,"%")&&!Muse.Utils.endsWith(this.backgroundPosition.y,"%"))this.onBackgroundOffsetAvailable(a,b);else if(this.backgroundSize)this.updateBackgroundOffset(a,b);else{var c=this;this.getBackgroundSize(function(d){c.backgroundSize=d;c.updateBackgroundOffset(a,b);if(c.updateRequested){c.updateRequested=!1;var d=c.service.getEffectProgress(),
f=c.service.getEffectInterval(c,d);c.update(f,d-f["in"][0])}})}};d.prototype.updateBackgroundOffset=function(a,b){var c=this.is100PercentWidth&&this.hasPositionEffect&&this.positionEffect.isMarkedAsOOV?this.elem.parent():this.elem;if(Muse.Utils.endsWith(this.backgroundPosition.x,"%"))var d=Muse.Utils.firstDefined(this.originalWidth,c.innerWidth()),a=a/100*(d-Muse.Utils.firstDefined(this.backgroundSize.width,d));Muse.Utils.endsWith(this.backgroundPosition.y,"%")&&(c=c.innerHeight(),b=b/100*(c-Muse.Utils.firstDefined(this.backgroundSize.height,
c)));this.onBackgroundOffsetAvailable(a,b)};d.prototype.onBackgroundOffsetAvailable=function(a,b){this.bgOffset={x:a,y:b};this.backgroundOffsetAvailable=!0};d.prototype.getBgMode=function(){var a=(this.elem.get(0).currentStyle||window.getComputedStyle(this.elem.get(0),null))["background-size"]||this.elem.css("background-size");if(!a||!a.match)return d.BG_NORMAL;if(a.match(/cover/gi))return d.BG_COVER;if(a.match(/contain/))return d.BG_CONTAIN;return d.BG_NORMAL};d.prototype.isValidBackgroundPosition=
function(a){return Muse.Utils.endsWith(a,"%")||Muse.Utils.endsWith(a,"px")};d.prototype.getBackgroundPosition=function(){var a=this.cssBackgroundPosition?this.cssBackgroundPosition:this.elem.css("background-position");switch(a){case "top":case "bottom":a="center "+a;break;case "0%":case "50%":case "100%":a+=" center"}if(!a){var b=this.elem.css("background-position-x"),c=this.elem.css("background-position-y");b&&(a=b+" "+(c||""))}if(!a||!a.split)return{x:"0%",y:"0%"};a=a.replace(/(?:left|top)/gi,"0%").replace(/center/gi,
"50%").replace(/(?:right|bottom)/gi,"100%");a=a.replace(/^\s+|\s+$/gi,"");a=a.split(" ");1==a.length&&a.push("50%");if(!this.isValidBackgroundPosition(a[0])||!this.isValidBackgroundPosition(a[1]))Muse.Assert.fail("Invalid measurement unit for background position. Expecting px or %.");else return{x:a[0],y:a[1],multiplier:{x:Muse.Utils.endsWith(a[0],"%")?Muse.Utils.tryParse(a[0],parseInt,0)/100:0,y:Muse.Utils.endsWith(a[1],"%")?Muse.Utils.tryParse(a[1],parseInt,0)/100:0}}};d.prototype.getBackgroundSize=
function(a){var c=this.polyfillElement?this.polyfillElement.attr("src"):this.elem.css("background-image");if(!c&&!c.replace)a();else{var c=c.replace(/^url\("?|"?\)$/gi,""),d=new Image;b(d).one("load",function(){a({width:d.width,height:d.height})});d.src=c}};var j=function(a,b,c,d){this.service=a;this.$bp=b;this.elem=c;this.data=d};j.prototype.initialize=function(){};j.prototype.update=function(){};var f=function(a,b,c,d){this.service=a;this.$bp=b;this.elem=c;this.data=d;this.cssProxy=this.service.cssProxy;
this.elemToBeMarkedAsInvisible=this.elem.parent().hasClass("browser_width")?this.elem.parent():this.elem;this.hasPreInitClass=this.elem.hasClass(f.PRE_INITIT_CLASS_NAME)};f.PRE_INITIT_CLASS_NAME="ose_pre_init";f.INVISIBLE_CLASS_NAME="ose_ei";f.prototype.initialize=function(){Muse.Assert.assert(3==this.data.length,"Opacity Scroll Effect should have 3 intervals");var b=this.data[0],c=this.data[1],d=this.data[2];0<b.fade&&(b["in"][1]-=b.fade,this.data.splice(1,0,{"in":[b["in"][1],b["in"][1]+b.fade],
opacity:[b.opacity,c.opacity],rate:(c.opacity-b.opacity)/b.fade}));0<d.fade&&(d["in"][0]+=d.fade,this.data.splice(this.data.length-1,0,{"in":[d["in"][0]-d.fade,d["in"][0]],opacity:[c.opacity,d.opacity],rate:(d.opacity-c.opacity)/d.fade}));this.hasPositionEffect=(this.positionEffect=this.service.getElementEffect(this.elem,a))&&this.positionEffect.enabled};f.prototype.setElementOpacity=function(a){this.cssProxy.setCSSProperties(this.elem,{opacity:a/100,filter:"alpha(opacity="+a+")"});var b=0===a;if(void 0===
this.previousOpacity||b&&0!==this.previousOpacity||!b&&0===this.previousOpacity)b?this.elemToBeMarkedAsInvisible.addClass(f.INVISIBLE_CLASS_NAME):this.elemToBeMarkedAsInvisible.removeClass(f.INVISIBLE_CLASS_NAME);this.previousOpacity=a};f.prototype.update=function(a,b){var c=0;if(!this.hasPositionEffect||this.positionEffect.visible)c="number"!=typeof a.opacity?a.opacity[0]+a.rate*b:a.opacity,c=Math.max(Math.min(c,100),0);this.setElementOpacity(c);if(this.hasPreInitClass)this.elem.removeClass(f.PRE_INITIT_CLASS_NAME),
this.hasPreInitClass=!1};var h=function(a,b,c,d){this.service=a;this.$bp=b;this.elem=c;this.data=d;this.widget=this.elem.data("widget");this.lastDisplayedSlide=0;this.lastInterval=null};h.prototype.initialize=function(){this.noOfSlides=this.widget.slides.$element.length;if(this.isLinkToScrollEffect=this.isLinkToScrollInterval(this.data[1]))this.data[1].intervalLength=this.data[1]["in"][1]-this.data[1]["in"][0],Muse.Assert.assert(2==this.data.length||Infinity!=this.data[1].intervalLength,"In a 3 interval configuration, why do we have middle interval with length = Infinity?")};
h.prototype.update=function(a,b){if(this.play!==a.play)!0===a.play?(this.play=!0,this.start()):!1===a.play?(this.play=!1,this.stop()):this.isLinkToScrollInterval(a)?(this.play=void 0,this.jump(b)):Muse.Assert.assert(!1,"Unknown widget configuration: play="+a.play);if(!1===a.play&&this.isLinkToScrollEffect&&a!==this.lastInterval)switch(this.data.indexOf(a)){case 0:this.jump(0);break;case 2:this.jump(this.data[1].intervalLength);break;default:Muse.Assert.assert(!1,"Why is the second interval using a play:false setting?")}this.lastInterval=
a};h.prototype.isLinkToScrollInterval=function(a){return"number"==typeof a.play};h.prototype.jump=function(a){var a=Math.floor(a/this.data[1].play),b=(a-this.lastDisplayedSlide)%this.noOfSlides;if(0!=b){for(var c=0<b?b:-b,d=0;d<c;d++)0<b?this.widget.next():this.widget.previous();this.lastDisplayedSlide=a}};h.prototype.start=function(){var a;b(this.widget).one("wp-slideshow-before-play",function(){a=this.options.displayInterval;this.options.displayInterval=0});b(this.widget).one("wp-slideshow-play",
function(){Muse.Assert.assert(void 0!==a,"Why do we got a play event fired before beforePlay event?");this.options.displayInterval=a});this.widget.play()};h.prototype.stop=function(){this.widget.stop()};var i=function(a,b,c,d){this.service=a;this.$bp=b;this.elem=c;this.data=d;this.enabled=!0;this.stage=null;this.play=!1;this.lastInterval=null};i.prototype.initialize=function(){this.data[1].intervalLength=this.data[1]["in"][1]-this.data[1]["in"][0];Muse.Assert.assert(2==this.data.length||Infinity!=
this.data[1].intervalLength,"In a 3 interval configuration, why do we have middle interval with length = Infinity?");this.iframe=this.elem.children()[0];this.iframeWindow=this.iframe.contentWindow;if(!this.iframeWindow.AdobeEdge&&!this.iframeWindow.AdobeAn){var a=this;b(this.iframe).bind("load",function(){a.updateStage(a)})}else this.updateStage(this)};i.prototype.updateStage=function(a){"undefined"==typeof a.iframeWindow.AdobeEdge&&"undefined"==typeof a.iframeWindow.AdobeAn?a.enabled=!1:(a.iframeWindow.AdobeEdge||
a.iframeWindow.AdobeAn).bootstrapCallback(function(b){a.onCompositionReady(b,a)})};i.prototype.onCompositionReady=function(a,b){var c=b.iframeWindow.AdobeEdge||b.iframeWindow.AdobeAn,d=null;Muse.Assert.assert(null!=c,"AdobeEdge/AdobeAn object must not be null.");"undefined"!=typeof c.compositions?d=c.compositions[a]:"function"==typeof c.getComposition?d=c.getComposition(a):Muse.Assert.assert(!1,"Could not find any reliable way of obtaining the composition object.");Muse.Assert.assert(null!=d,"Composition object must not be null.");
b.stage=d.getStage();if(b.stage&&"function"==typeof b.stage.setAutoPlay)b.stage.setAutoPlay(!1);else for(var f in b.stage.timelines)b.stage.autoPlay[f]=!1;b.lastUpdateInterval&&b.lastUpdateIntervalProgress&&setTimeout(function(){b.update(b.lastUpdateInterval,b.lastUpdateIntervalProgress)},10)};i.prototype.update=function(a,b){if(this.enabled)if(this.stage){if(this.play!==a.play)!0===a.play?(this.play=!0,this.start()):!1===a.play?(this.play=!1,this.stop()):"number"==typeof a.play?(this.play=!0,this.seek(b*
1E3/a.play)):Muse.Assert.assert(!1,"Unknown widget configuration: play="+a.play);if(!1===a.play&&a!==this.lastInterval)switch(this.data.indexOf(a)){case 0:this.seek(0);break;case 2:this.seek(this.data[1].intervalLength*1E3/this.data[1].play);break;default:Muse.Assert.assert(!1,"Why is the second interval using a play:false setting?")}this.lastInterval=a}else this.lastUpdateInterval=a,this.lastUpdateIntervalProgress=b};i.prototype.start=function(){this.stage.play()};i.prototype.stop=function(){this.stage.stop(this.stage.getTimelinePosition())};
i.prototype.seek=function(a){this.stage.seek(a%this.stage.getDuration())};var l=function(a){this.idGetterFn=a;this.mode=l.MODE_IMMEDIATE;this.cssPropsCache={};this.requestCSSUpdatePending=!1};l.MODE_IMMEDIATE=0;l.MODE_DELAYED=1;l.prototype.setModeDelayed=function(){if(window.webkitRequestAnimationFrame)this.mode=l.MODE_DELAYED};l.prototype.clearCacheForElement=function(a){this.getCacheForElement(a).appliedProps={}};l.prototype.getCacheForElement=function(a){var b=this.idGetterFn(a),c=this.cssPropsCache[b];
void 0===c&&(this.cssPropsCache[b]=c={getStyle:function(){return a[0].style},appliedProps:{},queuedProps:{},hasQueuedProps:!1});return c};l.prototype.setCSSProperties=function(a,b){var c=this.getCacheForElement(a),d=!1,f=this,g;for(g in b)if(c.appliedProps[g]!==b[g])c.queuedProps[g]=b[g],c.hasQueuedProps=d=!0;if(!this.requestCSSUpdatePending&&d)this.requestCSSUpdatePending=!0,l.MODE_DELAYED==this.mode?Muse.Utils.requestAnimationFrame(function(){f.doCSSUpdate()}):this.doCSSUpdate()};l.prototype.doCSSUpdate=
function(){for(var a in this.cssPropsCache){var b=this.cssPropsCache[a],c=b.getStyle();if(b.hasQueuedProps){for(var d in b.queuedProps)c[Muse.Utils.toCamelCase(d)]=b.appliedProps[d]=b.queuedProps[d];b.queuedProps={};b.hasQueuedProps=!1}}this.requestCSSUpdatePending=!1};var k=function(){this.effects=[];this.scrollY=this.scrollX=0;this.$page=b("#page");this.cssProxy=new l(this.getElemID);var a=this;b("body").on("muse_bp_activate",function(b,c,d){a.onBPActivate(d)}).on("muse_bp_deactivate",function(b,
c,d){a.onBPDeactivate(d)})};k.TEMP_UID_ATTR="data-muse-tempuid";k.prototype.onBPActivate=function(a){this.$page=b("#page");for(var c=0;c<this.effects.length;c++)if(this.effects[c].$bp.is(a)&&this.effects[c].onBPActivate)this.effects[c].onBPActivate()};k.prototype.onBPDeactivate=function(a){for(var b=0;b<this.effects.length;b++)if(this.effects[b].$bp.is(a)){if(this.effects[b].onBPDeactivate)this.effects[b].onBPDeactivate();var c=this.effects[b].elem;c.removeAttr("style");this.cssProxy.clearCacheForElement(c)}};
k.prototype.getEffectProgress=function(){return Math.max(0,this.scrollY)};k.prototype.getHorizontalScroll=function(){return this.scrollX-this.$page.offset().left};k.prototype.getEnvironmentSettings=function(){return{windowWidth:window.innerWidth||c.width(),windowHeight:window.innerHeight||c.height(),scrollLeft:this.getHorizontalScroll(),$activeBP:b(".breakpoint.active")}};k.prototype.onUpdate=function(a,b){this.scrollX=a;this.scrollY=b;for(var c=this.getEnvironmentSettings(),d=0;d<this.effects.length;d++)this.doUpdateOneEffect(this.effects[d],
c)};k.prototype.doUpdateOneEffect=function(a,b){if(!a.$bp||a.$bp.is(b.$activeBP)){var c=this.getEffectProgress(),d=this.getEffectInterval(a,c);if(!a.initialized)a.initialize(),a.initialized=!0,a.elem.addClass("scroll_effect");a.update(d,c-d["in"][0],b)}};k.prototype.getEffectInterval=function(a,b){for(var c=0,d;d=a.data[c]["in"];c++)if(d[0]<b&&b<=d[1])return a.data[c];Muse.Assert.fail("Why do we have a progress value that does not fit in any interval?");return null};k.prototype.registerEffect=function(a,
b,c,d){var f=this,g=new c(this,a,b,d);if(!1!==g.enabled)g.type=c,g.data[0]["in"][0]=-100,(!a||a.hasClass("active"))&&setTimeout(function(){f.doUpdateOneEffect(g,f.getEnvironmentSettings())},0),this.effects.push(g)};k.prototype.getElementEffect=function(a,b){for(var c=n.effects.length,d=0;d<c;d++){var f=n.effects[d];if(f.elem.is(a)&&f.type==b)return f}};k.prototype.getElemID=function(a){var b=a.attr("id")||a.attr(k.TEMP_UID_ATTR)||a.attr(k.TEMP_UID_ATTR,Math.round(Math.random()*1E6)).attr(k.TEMP_UID_ATTR),
a=a.closest(".breakpoint");0<a.length&&(b=a.attr("id")+"_"+b);return b};var n=new k;c.data("scrollEffectsService",n);b.fn.registerPositionScrollEffect=function(c,d){return b(this).registerGenericScrollEffect(a,c,d)};b.fn.registerBackgroundPositionScrollEffect=function(a,c){return b(this).registerGenericScrollEffect(d,a,c)};b.fn.registerRotateScrollEffect=function(a,c){return b(this).registerGenericScrollEffect(j,a,c)};b.fn.registerOpacityScrollEffect=function(a,c){return b(this).registerGenericScrollEffect(f,
a,c)};b.fn.registerSlideshowScrollEffect=function(a,c){return b(this).registerGenericScrollEffect(h,a,c)};b.fn.registerEdgeAnimateScrollEffect=function(a,c){return b(this).registerGenericScrollEffect(i,a,c)};b.fn.registerGenericScrollEffect=function(a,c,d){var f=b(this);n.registerEffect(d?d:null,f,a,c);return this};b.fn.clearScrollEffects=function(){var a=b(this);a.removeClass("scroll_effect");n.cssProxy.clearCacheForElement(a);for(a=0;a<n.effects.length;)n.effects[a].elem.is(this)?n.effects.splice(a,
1):a++};b.fn.cloneScrollEffectsFrom=function(a){for(var b=n.effects.length,c=0;c<b;c++){var d=n.effects[c];d.elem.is(a)&&d.clone&&d.clone(this)}}})(d);(function(b){var c=b(window),a=b(document),g=b("html"),j=b("body"),f=b("#page"),h=function(a,b){this.wrapper=a;this.onScrollFn=b;this.type="StandardScrollProvider"};h.prototype.activate=function(){c.scroll(this,this.onUpdate);c.on("mousewheel",this,this.onMouseWheel);c.resize(this,this.onUpdate);this.onUpdate()};h.prototype.deactivate=function(){c.off("scroll",
this.onUpdate);c.off("mousewheel",this.onMouseWheel);c.off("resize",this.onUpdate)};h.prototype.scrollTop=function(){return c.scrollTop()};h.prototype.scrollLeft=function(){return c.scrollLeft()};h.prototype.onUpdate=function(a){a=a&&a.data||this;a.onScrollFn(a.scrollLeft(),a.scrollTop())};h.prototype.onMouseWheel=function(){};h.prototype.scrollTo=function(a,b){window.scrollTo(a,b)};h.prototype.scrollHeight=function(){return(document.documentElement||document.body).scrollHeight};h.prototype.scrollWidth=
function(){return(document.documentElement||document.body).scrollWidth};var i=function(a,c){this.wrapper=a;this.onScrollFn=c;this.moveStarted=!1;this.animation=null;this.scrollOffset={x:0,y:0};this.speed={x:0,y:0};this.lastTouch={x:0,y:0};this.metaViewPort=b("meta[name=viewport]");this.enabled=!0;this.type="WebkitScrollProvider";this.touchListeners=[]};i.DECELERATION_RATE=1.5;i.SCALE=1;i.LOCK_X=!1;i.LOCK_Y=!1;i.HTML_WRAPPER_ID="webit_scroll_provider_wrapper";i.IFRAME_BODY_CLASS="WebkitScrollProviderIframeBodyHelperClass";
i.IFRAME_DATA="WebkitScrollProviderIframeData";i.prototype.available=function(){if(this.enabled&&"ontouchstart"in window&&d.browser.SafariMobile&&d.browser.SafariMobile.input&&d.browser.SafariMobile.input.match){var a=d.browser.SafariMobile.input.match(/version\/([\d\.]+)/i);if(a&&2==a.length&&a[1].split(".")[0]<=7)return!0}return!1};i.prototype.activate=function(){b("script").remove();f.wrap('<div id="'+i.HTML_WRAPPER_ID+'" />');this.htmlWrapper=b("#"+i.HTML_WRAPPER_ID+"");this.docProps={paddingTop:Muse.Utils.getCSSIntValue(j,
"padding-top")+Muse.Utils.getCSSIntValue(j,"margin-top"),paddingBottom:Muse.Utils.getCSSIntValue(j,"padding-bottom")+Muse.Utils.getCSSIntValue(j,"margin-bottom"),paddingLeft:Muse.Utils.getCSSIntValue(f,"margin-left"),paddingRight:Muse.Utils.getCSSIntValue(f,"margin-right")};this.htmlWrapper.css("padding-top",this.docProps.paddingTop);this.htmlWrapper.css("padding-bottom",this.docProps.paddingBottom);this.htmlWrapper.css("width","100%");this.htmlWrapper.css("min-width",f.outerWidth());this.htmlWrapper.addClass("html");
g.removeClass("html");j.addClass("scroll_wrapper");c.scroll(this,this.onWindowScroll);c.on("orientationchange",this,this.orientationChange);this.addTouchListeners(a);b("input,textarea").on("touchstart",this,this.onElementTouchStart);b("input,textarea").on("focus",this,this.onElementFocus);b("input,textarea").on("blur",this,this.onElementBlur);var d=this;b(".animationContainer").each(function(){var a=b(this);a.load(function(){var c=a.contents();d.addTouchListeners(c);b("body",c).addClass(i.IFRAME_BODY_CLASS);
b("body",c).data(i.IFRAME_DATA,a)})})};i.prototype.onElementTouchStart=function(a){a.data.inFormFieldEditMode=!0};i.prototype.onElementFocus=function(a){a=a.data;if(a.stopTimeout)clearTimeout(a.stopTimeout),a.stopTimeout=0};i.prototype.onElementBlur=function(a){var b=a.data;b.stopTimeout=setTimeout(function(){b.stopTimeout=0;b.inFormFieldEditMode=!1},200)};i.prototype.addTouchListeners=function(a){a.on("touchstart",this,this.touchStartHandler);a.on("touchmove",this,this.touchMoveHandler);a.on("touchend",
this,this.touchEndHandler);this.touchListeners.push(a)};i.prototype.removeTouchListeners=function(){for(var a=0,b,c=this.touchListeners.length;a<c;a++)b=this.touchListeners[a],b.off("touchstart",this.touchStartHandler),b.off("touchmove",this.touchMoveHandler),b.off("touchend",this.touchEndHandler);this.touchListeners.splice(0,this.touchListeners.length)};i.prototype.deactivate=function(){c.off("scroll",this.onWindowScroll);c.off("orientationchange",this.orientationChange);this.removeTouchListeners();
j.removeClass("scroll_wrapper");g.addClass("html");f.unwrap();b("input,textarea").off("touchstart",this.onElementTouchStart);b("input,textarea").off("focus",this.onElementFocus);b("input,textarea").off("blur",this.onElementBlur)};i.prototype.onWindowScroll=function(a){var a=a.data,b=c.scrollLeft(),d=c.scrollTop();if(!a.inFormFieldEditMode&&(0!=b||0!=d))window.scrollTo(0,0),a.scrollTo(b,d)};i.prototype.orientationChange=function(a){a=a.data;a.animation&&a.animation.stop(!1,!1);a.scrollTo(a.scrollOffset.x,
a.scrollOffset.y)};i.prototype.canStartScroll=function(a){return!a.tagName.match(/input|textarea|select/i)};i.prototype.getIFrameScrollOffset=function(a){a=b("body",b(a).parents());if(a.hasClass(i.IFRAME_BODY_CLASS))return a.data(i.IFRAME_DATA).offset()};i.prototype.touchStartHandler=function(a){var b=a.data,c=a.originalEvent;Muse.Assert.assert(!b.moveStarted,"Starting touch tracking while already tracking movement?");if(b.canStartScroll(a.target))b.animation&&b.animation.stop(!1,!1),b.speed.y=b.speed.x=
0,a=b.getIFrameScrollOffset(a.target),b.lastTouch.y=c.targetTouches[0].pageY+(a?a.top:0),b.lastTouch.x=c.targetTouches[0].pageX+(a?a.left:0),b.moveStarted=!0};i.prototype.touchMoveHandler=function(a){var b=a.data,c=a.originalEvent;a.preventDefault();if(b.moveStarted)a=b.getIFrameScrollOffset(a.target),b.scrollByDelta(b.lastTouch.x-c.targetTouches[0].pageX-(a?a.left:0),b.lastTouch.y-c.targetTouches[0].pageY-(a?a.top:0)),b.lastTouch.y=c.targetTouches[0].pageY+(a?a.top:0),b.lastTouch.x=c.targetTouches[0].pageX+
(a?a.left:0)};i.prototype.touchEndHandler=function(a){var c=a.data;if(c.moveStarted){c.moveStarted=!1;var d=20/i.DECELERATION_RATE,f=c.speed.x,g=c.speed.y,a=(1.71+0.0020*Math.sqrt(Math.pow(d*f,2)+Math.pow(d*g,2)))/i.DECELERATION_RATE*1E3/1.71,h=0,j=0;c.animation=b({progress:0}).animate({progress:1},{duration:a,easing:"linear",step:function(a){h=c.decelerate(a);c.scrollByDelta(Math.round((h-j)*d*f),Math.round((h-j)*d*g));j=h}})}};i.prototype.decelerate=function(a){return(1-a)*(1-a)*(1-a)*0+3*(1-a)*
(1-a)*a*1+3*(1-a)*a*a*1+a*a*a*1};i.prototype.scrollByDelta=function(a,b){this.scrollTo(i.SCALE*(this.scrollOffset.x+a),i.SCALE*(this.scrollOffset.y+b));i.LOCK_X||(this.speed.x=0.75*a*i.SCALE);i.LOCK_Y||(this.speed.y=0.75*b*i.SCALE)};i.prototype.scrollTop=function(){return this.scrollOffset.y};i.prototype.scrollLeft=function(){return this.scrollOffset.x};i.prototype.scrollHeight=function(){return this.htmlWrapper.outerHeight()};i.prototype.scrollWidth=function(){return this.htmlWrapper.outerWidth()};
i.prototype.scrollTo=function(a,b){i.LOCK_X||(this.scrollOffset.x=Math.min(Math.max(0,a),Math.max(0,this.scrollWidth()-window.innerWidth)));i.LOCK_Y||(this.scrollOffset.y=Math.min(Math.max(0,b),Math.max(0,this.scrollHeight()-window.innerHeight)));this.speed.x=this.speed.y=0;j.css({top:(i.LOCK_Y?0:-this.scrollOffset.y)+"px",left:(i.LOCK_X?0:-this.scrollOffset.x)+"px"});this.onScrollFn(0,this.scrollOffset.y)};var l=function(){var a=this;this.updateCallbacks=[];this.enabled=!0;this.STANDARD_PROVIDER=
new h(this,function(b,c){a.onScroll(b,c)});this.WEBKIT_PROVIDER=new i(this,function(b,c){a.onScroll(b,c)});this.provider=this.getProvider();this.provider.activate();b("body").on("muse_bp_activate",function(){a.onBPActivate()}).on("muse_bp_deactivate",function(){a.onBPDeactivate()}).on("muse_bp_ready",function(){c.scrollTop(0);c.trigger("scroll")})};l.prototype.onBPActivate=function(){var a=this;Muse.Utils.requestAnimationFrame(function(){a.enabled=!0})};l.prototype.onBPDeactivate=function(){this.enabled=
!1};l.prototype.onScroll=function(a,b){if(this.enabled)for(var c=0,d=this.updateCallbacks.length;c<d;c++)this.updateCallbacks[c](a,b)};l.prototype.getProvider=function(){if(this.WEBKIT_PROVIDER.available())return this.WEBKIT_PROVIDER;return this.STANDARD_PROVIDER};l.prototype.registerUpdateCallback=function(a){this.updateCallbacks.push(a)};l.prototype.isStandard=function(){return this.STANDARD_PROVIDER===this.getProvider()};l.prototype.scrollTop=function(){return this.provider.scrollTop()};l.prototype.scrollLeft=
function(){return this.provider.scrollLeft()};l.prototype.scrollTo=function(a,b){this.provider.scrollTo(a,b)};l.prototype.scrollHeight=function(){return this.provider.scrollHeight()};l.prototype.scrollWidth=function(){return this.provider.scrollWidth()};a.ready(function(){var a=c.data("scrollEffectsService"),b=new l;b.registerUpdateCallback(function(b,c){a.onUpdate(b,c)});c.data("scrollWrapper",b);b.onScroll(b.scrollLeft(),b.scrollTop())})})(d)});
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"jquery.scrolleffects.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2017.0.1.363"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("jquery.scrolleffects.js");break}}}}})();
