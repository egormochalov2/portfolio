/*! UIkit 3.7.3 | https://www.getuikit.com | (c) 2014 - 2021 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('uikit', factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkit = factory());
}(this, (function () { 'use strict';

    var objPrototype = Object.prototype;
    var hasOwnProperty = objPrototype.hasOwnProperty;

    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
    }

    var hyphenateRe = /\B([A-Z])/g;

    var hyphenate = memoize(function (str) { return str
        .replace(hyphenateRe, '-$1')
        .toLowerCase(); }
    );

    var camelizeRe = /-(\w)/g;

    var camelize = memoize(function (str) { return str.replace(camelizeRe, toUpper); }
    );

    var ucfirst = memoize(function (str) { return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : ''; }
    );

    function toUpper(_, c) {
        return c ? c.toUpperCase() : '';
    }

    var strPrototype = String.prototype;
    var startsWithFn = strPrototype.startsWith || function (search) { return this.lastIndexOf(search, 0) === 0; };

    function startsWith(str, search) {
        return startsWithFn.call(str, search);
    }

    var endsWithFn = strPrototype.endsWith || function (search) { return this.substr(-search.length) === search; };

    function endsWith(str, search) {
        return endsWithFn.call(str, search);
    }

    var arrPrototype = Array.prototype;

    var includesFn = function (search, i) { return !!~this.indexOf(search, i); };
    var includesStr = strPrototype.includes || includesFn;
    var includesArray = arrPrototype.includes || includesFn;

    function includes(obj, search) {
        return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
    }

    var findIndexFn = arrPrototype.findIndex || function (predicate) {
        var arguments$1 = arguments;

        for (var i = 0; i < this.length; i++) {
            if (predicate.call(arguments$1[1], this[i], i, this)) {
                return i;
            }
        }
        return -1;
    };

    function findIndex(array, predicate) {
        return findIndexFn.call(array, predicate);
    }

    var isArray = Array.isArray;

    function isFunction(obj) {
        return typeof obj === 'function';
    }

    function isObject(obj) {
        return obj !== null && typeof obj === 'object';
    }

    var toString = objPrototype.toString;
    function isPlainObject(obj) {
        return toString.call(obj) === '[object Object]';
    }

    function isWindow(obj) {
        return isObject(obj) && obj === obj.window;
    }

    function isDocument(obj) {
        return nodeType(obj) === 9;
    }

    function isNode(obj) {
        return nodeType(obj) >= 1;
    }

    function isElement(obj) {
        return nodeType(obj) === 1;
    }

    function nodeType(obj) {
        return !isWindow(obj) && isObject(obj) && obj.nodeType;
    }

    function isBoolean(value) {
        return typeof value === 'boolean';
    }

    function isString(value) {
        return typeof value === 'string';
    }

    function isNumber(value) {
        return typeof value === 'number';
    }

    function isNumeric(value) {
        return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
    }

    function isEmpty(obj) {
        return !(isArray(obj)
            ? obj.length
            : isObject(obj)
                ? Object.keys(obj).length
                : false
        );
    }

    function isUndefined(value) {
        return value === void 0;
    }

    function toBoolean(value) {
        return isBoolean(value)
            ? value
            : value === 'true' || value === '1' || value === ''
                ? true
                : value === 'false' || value === '0'
                    ? false
                    : value;
    }

    function toNumber(value) {
        var number = Number(value);
        return !isNaN(number) ? number : false;
    }

    function toFloat(value) {
        return parseFloat(value) || 0;
    }

    var toArray = Array.from || (function (value) { return arrPrototype.slice.call(value); });

    function toNode(element) {
        return toNodes(element)[0];
    }

    function toNodes(element) {
        return element && (isNode(element) ? [element] : toArray(element).filter(isNode)) || [];
    }

    function toWindow(element) {
        if (isWindow(element)) {
            return element;
        }

        element = toNode(element);

        return element
            ? (isDocument(element)
                ? element
                : element.ownerDocument
            ).defaultView
            : window;
    }

    function toMs(time) {
        return !time
            ? 0
            : endsWith(time, 'ms')
                ? toFloat(time)
                : toFloat(time) * 1000;
    }

    function isEqual(value, other) {
        return value === other
            || isObject(value)
            && isObject(other)
            && Object.keys(value).length === Object.keys(other).length
            && each(value, function (val, key) { return val === other[key]; });
    }

    function swap(value, a, b) {
        return value.replace(
            new RegExp((a + "|" + b), 'g'),
            function (match) { return match === a ? b : a; }
        );
    }

    var assign = Object.assign || function (target) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        target = Object(target);
        for (var i = 0; i < args.length; i++) {
            var source = args[i];
            if (source !== null) {
                for (var key in source) {
                    if (hasOwn(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };

    function last(array) {
        return array[array.length - 1];
    }

    function each(obj, cb) {
        for (var key in obj) {
            if (false === cb(obj[key], key)) {
                return false;
            }
        }
        return true;
    }

    function sortBy$1(array, prop) {
        return array.slice().sort(function (ref, ref$1) {
                var propA = ref[prop]; if ( propA === void 0 ) propA = 0;
                var propB = ref$1[prop]; if ( propB === void 0 ) propB = 0;

                return propA > propB
                ? 1
                : propB > propA
                    ? -1
                    : 0;
        }
        );
    }

    function uniqueBy(array, prop) {
        var seen = new Set();
        return array.filter(function (ref) {
            var check = ref[prop];

            return seen.has(check)
            ? false
            : seen.add(check) || true;
        } // IE 11 does not return the Set object
        );
    }

    function clamp(number, min, max) {
        if ( min === void 0 ) min = 0;
        if ( max === void 0 ) max = 1;

        return Math.min(Math.max(toNumber(number) || 0, min), max);
    }

    function noop() {}

    function intersectRect() {
        var rects = [], len = arguments.length;
        while ( len-- ) rects[ len ] = arguments[ len ];

        return [['bottom', 'top'], ['right', 'left']].every(function (ref) {
                var minProp = ref[0];
                var maxProp = ref[1];

                return Math.min.apply(Math, rects.map(function (ref) {
                var min = ref[minProp];

                return min;
                })) - Math.max.apply(Math, rects.map(function (ref) {
                var max = ref[maxProp];

                return max;
                })) > 0;
        }
        );
    }

    function pointInRect(point, rect) {
        return point.x <= rect.right &&
            point.x >= rect.left &&
            point.y <= rect.bottom &&
            point.y >= rect.top;
    }

    var Dimensions = {

        ratio: function(dimensions, prop, value) {
            var obj;


            var aProp = prop === 'width' ? 'height' : 'width';

            return ( obj = {}, obj[aProp] = dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp], obj[prop] = value, obj );
        },

        contain: function(dimensions, maxDimensions) {
            var this$1 = this;

            dimensions = assign({}, dimensions);

            each(dimensions, function (_, prop) { return dimensions = dimensions[prop] > maxDimensions[prop]
                ? this$1.ratio(dimensions, prop, maxDimensions[prop])
                : dimensions; }
            );

            return dimensions;
        },

        cover: function(dimensions, maxDimensions) {
            var this$1 = this;

            dimensions = this.contain(dimensions, maxDimensions);

            each(dimensions, function (_, prop) { return dimensions = dimensions[prop] < maxDimensions[prop]
                ? this$1.ratio(dimensions, prop, maxDimensions[prop])
                : dimensions; }
            );

            return dimensions;
        }

    };

    function getIndex(i, elements, current, finite) {
        if ( current === void 0 ) current = 0;
        if ( finite === void 0 ) finite = false;


        elements = toNodes(elements);

        var length = elements.length;

        i = isNumeric(i)
            ? toNumber(i)
            : i === 'next'
                ? current + 1
                : i === 'previous'
                    ? current - 1
                    : elements.indexOf(toNode(i));

        if (finite) {
            return clamp(i, 0, length - 1);
        }

        i %= length;

        return i < 0 ? i + length : i;
    }

    function memoize(fn) {
        var cache = Object.create(null);
        return function (key) { return cache[key] || (cache[key] = fn(key)); };
    }

    function attr(element, name, value) {

        if (isObject(name)) {
            for (var key in name) {
                attr(element, key, name[key]);
            }
            return;
        }

        if (isUndefined(value)) {
            element = toNode(element);
            return element && element.getAttribute(name);
        } else {
            toNodes(element).forEach(function (element) {

                if (isFunction(value)) {
                    value = value.call(element, attr(element, name));
                }

                if (value === null) {
                    removeAttr(element, name);
                } else {
                    element.setAttribute(name, value);
                }
            });
        }

    }

    function hasAttr(element, name) {
        return toNodes(element).some(function (element) { return element.hasAttribute(name); });
    }

    function removeAttr(element, name) {
        element = toNodes(element);
        name.split(' ').forEach(function (name) { return element.forEach(function (element) { return element.hasAttribute(name) && element.removeAttribute(name); }
            ); }
        );
    }

    function data(element, attribute) {
        for (var i = 0, attrs = [attribute, ("data-" + attribute)]; i < attrs.length; i++) {
            if (hasAttr(element, attrs[i])) {
                return attr(element, attrs[i]);
            }
        }
    }

    /* global DocumentTouch */

    var inBrowser = typeof window !== 'undefined';
    var isIE = inBrowser && /msie|trident/i.test(window.navigator.userAgent);
    var isRtl = inBrowser && attr(document.documentElement, 'dir') === 'rtl';

    var hasTouchEvents = inBrowser && 'ontouchstart' in window;
    var hasPointerEvents = inBrowser && window.PointerEvent;
    var hasTouch = inBrowser && (hasTouchEvents
        || window.DocumentTouch && document instanceof DocumentTouch
        || navigator.maxTouchPoints); // IE >=11

    var pointerDown = hasPointerEvents ? 'pointerdown' : hasTouchEvents ? 'touchstart' : 'mousedown';
    var pointerMove = hasPointerEvents ? 'pointermove' : hasTouchEvents ? 'touchmove' : 'mousemove';
    var pointerUp = hasPointerEvents ? 'pointerup' : hasTouchEvents ? 'touchend' : 'mouseup';
    var pointerEnter = hasPointerEvents ? 'pointerenter' : hasTouchEvents ? '' : 'mouseenter';
    var pointerLeave = hasPointerEvents ? 'pointerleave' : hasTouchEvents ? '' : 'mouseleave';
    var pointerCancel = hasPointerEvents ? 'pointercancel' : 'touchcancel';

    var voidElements = {
        area: true,
        base: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        menuitem: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
    };
    function isVoidElement(element) {
        return toNodes(element).some(function (element) { return voidElements[element.tagName.toLowerCase()]; });
    }

    function isVisible(element) {
        return toNodes(element).some(function (element) { return element.offsetWidth || element.offsetHeight || element.getClientRects().length; });
    }

    var selInput = 'input,select,textarea,button';
    function isInput(element) {
        return toNodes(element).some(function (element) { return matches(element, selInput); });
    }

    function isFocusable(element) {
        return isInput(element) || matches(element, 'a[href],button') || hasAttr(element, 'tabindex');
    }

    function parent(element) {
        element = toNode(element);
        return element && isElement(element.parentNode) && element.parentNode;
    }

    function filter$1(element, selector) {
        return toNodes(element).filter(function (element) { return matches(element, selector); });
    }

    var elProto = inBrowser ? Element.prototype : {};
    var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector || noop;

    function matches(element, selector) {
        return toNodes(element).some(function (element) { return matchesFn.call(element, selector); });
    }

    var closestFn = elProto.closest || function (selector) {
        var ancestor = this;

        do {

            if (matches(ancestor, selector)) {
                return ancestor;
            }

        } while ((ancestor = parent(ancestor)));
    };

    function closest(element, selector) {

        if (startsWith(selector, '>')) {
            selector = selector.slice(1);
        }

        return isElement(element)
            ? closestFn.call(element, selector)
            : toNodes(element).map(function (element) { return closest(element, selector); }).filter(Boolean);
    }

    function within(element, selector) {
        return !isString(selector)
            ? element === selector || (isDocument(selector)
                ? selector.documentElement
                : toNode(selector)).contains(toNode(element)) // IE 11 document does not implement contains
            : matches(element, selector) || !!closest(element, selector);
    }

    function parents(element, selector) {
        var elements = [];

        while ((element = parent(element))) {
            if (!selector || matches(element, selector)) {
                elements.push(element);
            }
        }

        return elements;
    }

    function children(element, selector) {
        element = toNode(element);
        var children = element ? toNodes(element.children) : [];
        return selector ? filter$1(children, selector) : children;
    }

    function index(element, ref) {
        return ref
            ? toNodes(element).indexOf(toNode(ref))
            : children(parent(element)).indexOf(element);
    }

    function query(selector, context) {
        return find(selector, getContext(selector, context));
    }

    function queryAll(selector, context) {
        return findAll(selector, getContext(selector, context));
    }

    function getContext(selector, context) {
        if ( context === void 0 ) context = document;

        return isString(selector) && isContextSelector(selector) || isDocument(context)
            ? context
            : context.ownerDocument;
    }

    function find(selector, context) {
        return toNode(_query(selector, context, 'querySelector'));
    }

    function findAll(selector, context) {
        return toNodes(_query(selector, context, 'querySelectorAll'));
    }

    function _query(selector, context, queryFn) {
        if ( context === void 0 ) context = document;


        if (!selector || !isString(selector)) {
            return selector;
        }

        selector = selector.replace(contextSanitizeRe, '$1 *');

        if (isContextSelector(selector)) {

            selector = splitSelector(selector).map(function (selector) {

                var ctx = context;

                if (selector[0] === '!') {

                    var selectors = selector.substr(1).trim().split(' ');
                    ctx = closest(parent(context), selectors[0]);
                    selector = selectors.slice(1).join(' ').trim();

                }

                if (selector[0] === '-') {

                    var selectors$1 = selector.substr(1).trim().split(' ');
                    var prev = (ctx || context).previousElementSibling;
                    ctx = matches(prev, selector.substr(1)) ? prev : null;
                    selector = selectors$1.slice(1).join(' ');

                }

                if (!ctx) {
                    return null;
                }

                return ((domPath(ctx)) + " " + selector);

            }).filter(Boolean).join(',');

            context = document;

        }

        try {

            return context[queryFn](selector);

        } catch (e) {

            return null;

        }

    }

    var contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
    var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;

    var isContextSelector = memoize(function (selector) { return selector.match(contextSelectorRe); });

    var selectorRe = /.*?[^\\](?:,|$)/g;

    var splitSelector = memoize(function (selector) { return selector.match(selectorRe).map(function (selector) { return selector.replace(/,$/, '').trim(); }
        ); }
    );

    function domPath(element) {
        var names = [];
        while (element.parentNode) {
            if (element.id) {
                names.unshift(("#" + (escape(element.id))));
                break;
            } else {
                var tagName = element.tagName;
                if (tagName !== 'HTML') {
                    tagName += ":nth-child(" + (index(element) + 1) + ")";
                }
                names.unshift(tagName);
                element = element.parentNode;
            }
        }
        return names.join(' > ');
    }

    var escapeFn = inBrowser && window.CSS && CSS.escape || function (css) { return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) { return ("\\" + match); }); };
    function escape(css) {
        return isString(css) ? escapeFn.call(null, css) : '';
    }

    function on() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];


        var ref = getArgs(args);
        var targets = ref[0];
        var type = ref[1];
        var selector = ref[2];
        var listener = ref[3];
        var useCapture = ref[4];

        targets = toEventTargets(targets);

        if (listener.length > 1) {
            listener = detail(listener);
        }

        if (useCapture && useCapture.self) {
            listener = selfFilter(listener);
        }

        if (selector) {
            listener = delegate(selector, listener);
        }

        useCapture = useCaptureFilter(useCapture);

        type.split(' ').forEach(function (type) { return targets.forEach(function (target) { return target.addEventListener(type, listener, useCapture); }
            ); }
        );
        return function () { return off(targets, type, listener, useCapture); };
    }

    function off(targets, type, listener, useCapture) {
        if ( useCapture === void 0 ) useCapture = false;

        useCapture = useCaptureFilter(useCapture);
        targets = toEventTargets(targets);
        type.split(' ').forEach(function (type) { return targets.forEach(function (target) { return target.removeEventListener(type, listener, useCapture); }
            ); }
        );
    }

    function once() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];


        var ref = getArgs(args);
        var element = ref[0];
        var type = ref[1];
        var selector = ref[2];
        var listener = ref[3];
        var useCapture = ref[4];
        var condition = ref[5];
        var off = on(element, type, selector, function (e) {
            var result = !condition || condition(e);
            if (result) {
                off();
                listener(e, result);
            }
        }, useCapture);

        return off;
    }

    function trigger(targets, event, detail) {
        return toEventTargets(targets).reduce(function (notCanceled, target) { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
            , true);
    }

    function createEvent(e, bubbles, cancelable, detail) {
        if ( bubbles === void 0 ) bubbles = true;
        if ( cancelable === void 0 ) cancelable = false;

        if (isString(e)) {
            var event = document.createEvent('CustomEvent'); // IE 11
            event.initCustomEvent(e, bubbles, cancelable, detail);
            e = event;
        }

        return e;
    }

    function getArgs(args) {
        if (isFunction(args[2])) {
            args.splice(2, 0, false);
        }
        return args;
    }

    function delegate(selector, listener) {
        var this$1 = this;

        return function (e) {

            var current = selector[0] === '>'
                ? findAll(selector, e.currentTarget).reverse().filter(function (element) { return within(e.target, element); })[0]
                : closest(e.target, selector);

            if (current) {
                e.current = current;
                listener.call(this$1, e);
            }

        };
    }

    function detail(listener) {
        return function (e) { return isArray(e.detail) ? listener.apply(void 0, [ e ].concat( e.detail )) : listener(e); };
    }

    function selfFilter(listener) {
        return function (e) {
            if (e.target === e.currentTarget || e.target === e.current) {
                return listener.call(null, e);
            }
        };
    }

    function useCaptureFilter(options) {
        return options && isIE && !isBoolean(options)
            ? !!options.capture
            : options;
    }

    function isEventTarget(target) {
        return target && 'addEventListener' in target;
    }

    function toEventTarget(target) {
        return isEventTarget(target) ? target : toNode(target);
    }

    function toEventTargets(target) {
        return isArray(target)
                ? target.map(toEventTarget).filter(Boolean)
                : isString(target)
                    ? findAll(target)
                    : isEventTarget(target)
                        ? [target]
                        : toNodes(target);
    }

    function isTouch(e) {
        return e.pointerType === 'touch' || !!e.touches;
    }

    function getEventPos(e) {
        var touches = e.touches;
        var changedTouches = e.changedTouches;
        var ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
        var x = ref.clientX;
        var y = ref.clientY;

        return {x: x, y: y};
    }

    /* global setImmediate */

    var Promise$1 = inBrowser && window.Promise || PromiseFn;

    var Deferred = function() {
        var this$1 = this;

        this.promise = new Promise$1(function (resolve, reject) {
            this$1.reject = reject;
            this$1.resolve = resolve;
        });
    };

    /**
     * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
     */

    var RESOLVED = 0;
    var REJECTED = 1;
    var PENDING = 2;

    var async = inBrowser && window.setImmediate || setTimeout;

    function PromiseFn(executor) {

        this.state = PENDING;
        this.value = undefined;
        this.deferred = [];

        var promise = this;

        try {
            executor(
                function (x) {
                    promise.resolve(x);
                },
                function (r) {
                    promise.reject(r);
                }
            );
        } catch (e) {
            promise.reject(e);
        }
    }

    PromiseFn.reject = function (r) {
        return new PromiseFn(function (resolve, reject) {
            reject(r);
        });
    };

    PromiseFn.resolve = function (x) {
        return new PromiseFn(function (resolve, reject) {
            resolve(x);
        });
    };

    PromiseFn.all = function all(iterable) {
        return new PromiseFn(function (resolve, reject) {
            var result = [];
            var count = 0;

            if (iterable.length === 0) {
                resolve(result);
            }

            function resolver(i) {
                return function (x) {
                    result[i] = x;
                    count += 1;

                    if (count === iterable.length) {
                        resolve(result);
                    }
                };
            }

            for (var i = 0; i < iterable.length; i += 1) {
                PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
            }
        });
    };

    PromiseFn.race = function race(iterable) {
        return new PromiseFn(function (resolve, reject) {
            for (var i = 0; i < iterable.length; i += 1) {
                PromiseFn.resolve(iterable[i]).then(resolve, reject);
            }
        });
    };

    var p = PromiseFn.prototype;

    p.resolve = function resolve(x) {
        var promise = this;

        if (promise.state === PENDING) {
            if (x === promise) {
                throw new TypeError('Promise settled with itself.');
            }

            var called = false;

            try {
                var then = x && x.then;

                if (x !== null && isObject(x) && isFunction(then)) {
                    then.call(
                        x,
                        function (x) {
                            if (!called) {
                                promise.resolve(x);
                            }
                            called = true;
                        },
                        function (r) {
                            if (!called) {
                                promise.reject(r);
                            }
                            called = true;
                        }
                    );
                    return;
                }
            } catch (e) {
                if (!called) {
                    promise.reject(e);
                }
                return;
            }

            promise.state = RESOLVED;
            promise.value = x;
            promise.notify();
        }
    };

    p.reject = function reject(reason) {
        var promise = this;

        if (promise.state === PENDING) {
            if (reason === promise) {
                throw new TypeError('Promise settled with itself.');
            }

            promise.state = REJECTED;
            promise.value = reason;
            promise.notify();
        }
    };

    p.notify = function notify() {
        var this$1 = this;

        async(function () {
            if (this$1.state !== PENDING) {
                while (this$1.deferred.length) {
                    var ref = this$1.deferred.shift();
                    var onResolved = ref[0];
                    var onRejected = ref[1];
                    var resolve = ref[2];
                    var reject = ref[3];

                    try {
                        if (this$1.state === RESOLVED) {
                            if (isFunction(onResolved)) {
                                resolve(onResolved.call(undefined, this$1.value));
                            } else {
                                resolve(this$1.value);
                            }
                        } else if (this$1.state === REJECTED) {
                            if (isFunction(onRejected)) {
                                resolve(onRejected.call(undefined, this$1.value));
                            } else {
                                reject(this$1.value);
                            }
                        }
                    } catch (e) {
                        reject(e);
                    }
                }
            }
        });
    };

    p.then = function then(onResolved, onRejected) {
        var this$1 = this;

        return new PromiseFn(function (resolve, reject) {
            this$1.deferred.push([onResolved, onRejected, resolve, reject]);
            this$1.notify();
        });
    };

    p.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    };

    function ajax(url, options) {

        var env = assign({
            data: null,
            method: 'GET',
            headers: {},
            xhr: new XMLHttpRequest(),
            beforeSend: noop,
            responseType: ''
        }, options);

        return Promise$1.resolve()
            .then(function () { return env.beforeSend(env); })
            .then(function () { return send(url, env); });
    }

    function send(url, env) {
        return new Promise$1(function (resolve, reject) {
            var xhr = env.xhr;

            for (var prop in env) {
                if (prop in xhr) {
                    try {

                        xhr[prop] = env[prop];

                    } catch (e) {}
                }
            }

            xhr.open(env.method.toUpperCase(), url);

            for (var header in env.headers) {
                xhr.setRequestHeader(header, env.headers[header]);
            }

            on(xhr, 'load', function () {

                if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

                    // IE 11 does not support responseType 'json'
                    if (env.responseType === 'json' && isString(xhr.response)) {
                        xhr = assign(copyXhr(xhr), {response: JSON.parse(xhr.response)});
                    }

                    resolve(xhr);

                } else {
                    reject(assign(Error(xhr.statusText), {
                        xhr: xhr,
                        status: xhr.status
                    }));
                }

            });

            on(xhr, 'error', function () { return reject(assign(Error('Network Error'), {xhr: xhr})); });
            on(xhr, 'timeout', function () { return reject(assign(Error('Network Timeout'), {xhr: xhr})); });

            xhr.send(env.data);
        });
    }

    function getImage(src, srcset, sizes) {

        return new Promise$1(function (resolve, reject) {
            var img = new Image();

            img.onerror = function (e) { return reject(e); };
            img.onload = function () { return resolve(img); };

            sizes && (img.sizes = sizes);
            srcset && (img.srcset = srcset);
            img.src = src;
        });

    }

    function copyXhr(source) {
        var target = {};
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    }

    function ready(fn) {

        if (document.readyState !== 'loading') {
            fn();
            return;
        }

        var unbind = on(document, 'DOMContentLoaded', function () {
            unbind();
            fn();
        });
    }

    function empty(element) {
        element = $(element);
        element.innerHTML = '';
        return element;
    }

    function html(parent, html) {
        parent = $(parent);
        return isUndefined(html)
            ? parent.innerHTML
            : append(parent.hasChildNodes() ? empty(parent) : parent, html);
    }

    function prepend(parent, element) {

        parent = $(parent);

        if (!parent.hasChildNodes()) {
            return append(parent, element);
        } else {
            return insertNodes(element, function (element) { return parent.insertBefore(element, parent.firstChild); });
        }
    }

    function append(parent, element) {
        parent = $(parent);
        return insertNodes(element, function (element) { return parent.appendChild(element); });
    }

    function before(ref, element) {
        ref = $(ref);
        return insertNodes(element, function (element) { return ref.parentNode.insertBefore(element, ref); });
    }

    function after(ref, element) {
        ref = $(ref);
        return insertNodes(element, function (element) { return ref.nextSibling
            ? before(ref.nextSibling, element)
            : append(ref.parentNode, element); }
        );
    }

    function insertNodes(element, fn) {
        element = isString(element) ? fragment(element) : element;
        return element
            ? 'length' in element
                ? toNodes(element).map(fn)
                : fn(element)
            : null;
    }

    function remove$1(element) {
        toNodes(element).forEach(function (element) { return element.parentNode && element.parentNode.removeChild(element); });
    }

    function wrapAll(element, structure) {

        structure = toNode(before(element, structure));

        while (structure.firstChild) {
            structure = structure.firstChild;
        }

        append(structure, element);

        return structure;
    }

    function wrapInner(element, structure) {
        return toNodes(toNodes(element).map(function (element) { return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure); }
        ));
    }

    function unwrap(element) {
        toNodes(element)
            .map(parent)
            .filter(function (value, index, self) { return self.indexOf(value) === index; })
            .forEach(function (parent) {
                before(parent, parent.childNodes);
                remove$1(parent);
            });
    }

    var fragmentRe = /^\s*<(\w+|!)[^>]*>/;
    var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

    function fragment(html) {

        var matches = singleTagRe.exec(html);
        if (matches) {
            return document.createElement(matches[1]);
        }

        var container = document.createElement('div');
        if (fragmentRe.test(html)) {
            container.insertAdjacentHTML('beforeend', html.trim());
        } else {
            container.textContent = html;
        }

        return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;

    }

    function apply$1(node, fn) {

        if (!isElement(node)) {
            return;
        }

        fn(node);
        node = node.firstElementChild;
        while (node) {
            var next = node.nextElementSibling;
            apply$1(node, fn);
            node = next;
        }
    }

    function $(selector, context) {
        return isHtml(selector)
            ? toNode(fragment(selector))
            : find(selector, context);
    }

    function $$(selector, context) {
        return isHtml(selector)
            ? toNodes(fragment(selector))
            : findAll(selector, context);
    }

    function isHtml(str) {
        return isString(str) && (str[0] === '<' || str.match(/^\s*</));
    }

    function addClass(element) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        apply(element, args, 'add');
    }

    function removeClass(element) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        apply(element, args, 'remove');
    }

    function removeClasses(element, cls) {
        attr(element, 'class', function (value) { return (value || '').replace(new RegExp(("\\b" + cls + "\\b"), 'g'), ''); });
    }

    function replaceClass(element) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        args[0] && removeClass(element, args[0]);
        args[1] && addClass(element, args[1]);
    }

    function hasClass(element, cls) {
        var assign;

        (assign = getClasses(cls), cls = assign[0]);
        var nodes = toNodes(element);
        for (var n = 0; n < nodes.length; n++) {
            if (cls && nodes[n].classList.contains(cls)) {
                return true;
            }
        }
        return false;
    }

    function toggleClass(element, cls, force) {

        cls = getClasses(cls);

        var nodes = toNodes(element);
        for (var n = 0; n < nodes.length; n++) {
            var list = nodes[n].classList;
            for (var i = 0; i < cls.length; i++) {
                if (isUndefined(force)) {
                    list.toggle(cls[i]);
                } else if (supports.Force) {
                    list.toggle(cls[i], !!force);
                } else {
                    list[force ? 'add' : 'remove'](cls[i]);
                }
            }
        }
    }

    function apply(element, args, fn) {
        var ref;


        args = args.reduce(function (args, arg) { return args.concat(getClasses(arg)); }, []);

        var nodes = toNodes(element);
        var loop = function ( n ) {
            if (supports.Multiple) {
                (ref = nodes[n].classList)[fn].apply(ref, args);
            } else {
                args.forEach(function (cls) { return nodes[n].classList[fn](cls); });
            }
        };

        for (var n = 0; n < nodes.length; n++) loop( n );
    }

    function getClasses(str) {
        return String(str).split(/\s|,/).filter(Boolean);
    }

    // IE 11
    var supports = {

        get Multiple() {
            return this.get('Multiple');
        },

        get Force() {
            return this.get('Force');
        },

        get: function(key) {

            var ref = document.createElement('_');
            var classList = ref.classList;
            classList.add('a', 'b');
            classList.toggle('c', false);
            supports = {
                Multiple: classList.contains('b'),
                Force: !classList.contains('c')
            };

            return supports[key];
        }

    };

    var cssNumber = {
        'animation-iteration-count': true,
        'column-count': true,
        'fill-opacity': true,
        'flex-grow': true,
        'flex-shrink': true,
        'font-weight': true,
        'line-height': true,
        'opacity': true,
        'order': true,
        'orphans': true,
        'stroke-dasharray': true,
        'stroke-dashoffset': true,
        'widows': true,
        'z-index': true,
        'zoom': true
    };

    function css(element, property, value, priority) {
        if ( priority === void 0 ) priority = '';


        return toNodes(element).map(function (element) {

            if (isString(property)) {

                property = propName(property);

                if (isUndefined(value)) {
                    return getStyle(element, property);
                } else if (!value && !isNumber(value)) {
                    element.style.removeProperty(property);
                } else {
                    element.style.setProperty(property, isNumeric(value) && !cssNumber[property] ? (value + "px") : value, priority);
                }

            } else if (isArray(property)) {

                var styles = getStyles(element);

                return property.reduce(function (props, property) {
                    props[property] = styles[propName(property)];
                    return props;
                }, {});

            } else if (isObject(property)) {
                priority = value;
                each(property, function (value, property) { return css(element, property, value, priority); });
            }

            return element;

        })[0];

    }

    function getStyles(element, pseudoElt) {
        return toWindow(element).getComputedStyle(element, pseudoElt);
    }

    function getStyle(element, property, pseudoElt) {
        return getStyles(element, pseudoElt)[property];
    }

    var parseCssVar = memoize(function (name) {
        /* usage in css: .uk-name:before { content:"xyz" } */

        var element = append(document.documentElement, document.createElement('div'));

        addClass(element, ("uk-" + name));

        name = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');

        remove$1(element);

        return name;
    });

    function getCssVar(name) {
        return !isIE
            ? getStyles(document.documentElement).getPropertyValue(("--uk-" + name))
            : parseCssVar(name);
    }

    // https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty
    var propName = memoize(function (name) { return vendorPropName(name); });

    var cssPrefixes = ['webkit', 'moz', 'ms'];

    function vendorPropName(name) {

        name = hyphenate(name);

        var ref = document.documentElement;
        var style = ref.style;

        if (name in style) {
            return name;
        }

        var i = cssPrefixes.length, prefixedName;

        while (i--) {
            prefixedName = "-" + (cssPrefixes[i]) + "-" + name;
            if (prefixedName in style) {
                return prefixedName;
            }
        }
    }

    function transition(element, props, duration, timing) {
        if ( duration === void 0 ) duration = 400;
        if ( timing === void 0 ) timing = 'linear';


        return Promise$1.all(toNodes(element).map(function (element) { return new Promise$1(function (resolve, reject) {

                for (var name in props) {
                    var value = css(element, name);
                    if (value === '') {
                        css(element, name, value);
                    }
                }

                var timer = setTimeout(function () { return trigger(element, 'transitionend'); }, duration);

                once(element, 'transitionend transitioncanceled', function (ref) {
                    var type = ref.type;

                    clearTimeout(timer);
                    removeClass(element, 'uk-transition');
                    css(element, {
                        transitionProperty: '',
                        transitionDuration: '',
                        transitionTimingFunction: ''
                    });
                    type === 'transitioncanceled' ? reject() : resolve(element);
                }, {self: true});

                addClass(element, 'uk-transition');
                css(element, assign({
                    transitionProperty: Object.keys(props).map(propName).join(','),
                    transitionDuration: (duration + "ms"),
                    transitionTimingFunction: timing
                }, props));

            }); }
        ));

    }

    var Transition = {

        start: transition,

        stop: function(element) {
            trigger(element, 'transitionend');
            return Promise$1.resolve();
        },

        cancel: function(element) {
            trigger(element, 'transitioncanceled');
        },

        inProgress: function(element) {
            return hasClass(element, 'uk-transition');
        }

    };

    var animationPrefix = 'uk-animation-';

    function animate$1(element, animation, duration, origin, out) {
        if ( duration === void 0 ) duration = 200;


        return Promise$1.all(toNodes(element).map(function (element) { return new Promise$1(function (resolve, reject) {

                trigger(element, 'animationcanceled');
                var timer = setTimeout(function () { return trigger(element, 'animationend'); }, duration);

                once(element, 'animationend animationcanceled', function (ref) {
                    var type = ref.type;


                    clearTimeout(timer);

                    type === 'animationcanceled' ? reject() : resolve(element);

                    css(element, 'animationDuration', '');
                    removeClasses(element, (animationPrefix + "\\S*"));

                }, {self: true});

                css(element, 'animationDuration', (duration + "ms"));
                addClass(element, animation, animationPrefix + (out ? 'leave' : 'enter'));

                if (startsWith(animation, animationPrefix)) {
                    origin && addClass(element, ("uk-transform-origin-" + origin));
                    out && addClass(element, (animationPrefix + "reverse"));
                }

            }); }
        ));

    }

    var inProgress = new RegExp((animationPrefix + "(enter|leave)"));
    var Animation = {

        in: animate$1,

        out: function(element, animation, duration, origin) {
            return animate$1(element, animation, duration, origin, true);
        },

        inProgress: function(element) {
            return inProgress.test(attr(element, 'class'));
        },

        cancel: function(element) {
            trigger(element, 'animationcanceled');
        }

    };

    var dirs$1 = {
        width: ['left', 'right'],
        height: ['top', 'bottom']
    };

    function dimensions(element) {

        var rect = isElement(element)
            ? toNode(element).getBoundingClientRect()
            : {height: height(element), width: width(element), top: 0, left: 0};

        return {
            height: rect.height,
            width: rect.width,
            top: rect.top,
            left: rect.left,
            bottom: rect.top + rect.height,
            right: rect.left + rect.width
        };
    }

    function offset(element, coordinates) {

        var currentOffset = dimensions(element);
        var ref = toWindow(element);
        var pageYOffset = ref.pageYOffset;
        var pageXOffset = ref.pageXOffset;
        var offsetBy = {height: pageYOffset, width: pageXOffset};

        for (var dir in dirs$1) {
            for (var i in dirs$1[dir]) {
                currentOffset[dirs$1[dir][i]] += offsetBy[dir];
            }
        }

        if (!coordinates) {
            return currentOffset;
        }

        var pos = css(element, 'position');

        each(css(element, ['left', 'top']), function (value, prop) { return css(element, prop, coordinates[prop]
                - currentOffset[prop]
                + toFloat(pos === 'absolute' && value === 'auto'
                    ? position(element)[prop]
                    : value)
            ); }
        );
    }

    function position(element) {

        var ref = offset(element);
        var top = ref.top;
        var left = ref.left;

        var ref$1 = toNode(element);
        var ref$1_ownerDocument = ref$1.ownerDocument;
        var body = ref$1_ownerDocument.body;
        var documentElement = ref$1_ownerDocument.documentElement;
        var offsetParent = ref$1.offsetParent;
        var parent = offsetParent || documentElement;

        while (parent && (parent === body || parent === documentElement) && css(parent, 'position') === 'static') {
            parent = parent.parentNode;
        }

        if (isElement(parent)) {
            var parentOffset = offset(parent);
            top -= parentOffset.top + toFloat(css(parent, 'borderTopWidth'));
            left -= parentOffset.left + toFloat(css(parent, 'borderLeftWidth'));
        }

        return {
            top: top - toFloat(css(element, 'marginTop')),
            left: left - toFloat(css(element, 'marginLeft'))
        };
    }

    function offsetPosition(element) {
        var offset = [0, 0];

        element = toNode(element);

        do {

            offset[0] += element.offsetTop;
            offset[1] += element.offsetLeft;

            if (css(element, 'position') === 'fixed') {
                var win = toWindow(element);
                offset[0] += win.pageYOffset;
                offset[1] += win.pageXOffset;
                return offset;
            }

        } while ((element = element.offsetParent));

        return offset;
    }

    var height = dimension('height');
    var width = dimension('width');

    function dimension(prop) {
        var propName = ucfirst(prop);
        return function (element, value) {

            if (isUndefined(value)) {

                if (isWindow(element)) {
                    return element[("inner" + propName)];
                }

                if (isDocument(element)) {
                    var doc = element.documentElement;
                    return Math.max(doc[("offset" + propName)], doc[("scroll" + propName)]);
                }

                element = toNode(element);

                value = css(element, prop);
                value = value === 'auto' ? element[("offset" + propName)] : toFloat(value) || 0;

                return value - boxModelAdjust(element, prop);

            } else {

                return css(element, prop, !value && value !== 0
                    ? ''
                    : +value + boxModelAdjust(element, prop) + 'px'
                );

            }

        };
    }

    function boxModelAdjust(element, prop, sizing) {
        if ( sizing === void 0 ) sizing = 'border-box';

        return css(element, 'boxSizing') === sizing
            ? dirs$1[prop].map(ucfirst).reduce(function (value, prop) { return value
                + toFloat(css(element, ("padding" + prop)))
                + toFloat(css(element, ("border" + prop + "Width"))); }
                , 0)
            : 0;
    }

    function flipPosition(pos) {
        for (var dir in dirs$1) {
            for (var i in dirs$1[dir]) {
                if (dirs$1[dir][i] === pos) {
                    return dirs$1[dir][1 - i];
                }
            }
        }
        return pos;
    }

    function toPx(value, property, element) {
        if ( property === void 0 ) property = 'width';
        if ( element === void 0 ) element = window;

        return isNumeric(value)
            ? +value
            : endsWith(value, 'vh')
                ? percent(height(toWindow(element)), value)
                : endsWith(value, 'vw')
                    ? percent(width(toWindow(element)), value)
                    : endsWith(value, '%')
                        ? percent(dimensions(element)[property], value)
                        : toFloat(value);
    }

    function percent(base, value) {
        return base * toFloat(value) / 100;
    }

    /*
        Based on:
        Copyright (c) 2016 Wilson Page wilsonpage@me.com
        https://github.com/wilsonpage/fastdom
    */

    var fastdom = {

        reads: [],
        writes: [],

        read: function(task) {
            this.reads.push(task);
            scheduleFlush();
            return task;
        },

        write: function(task) {
            this.writes.push(task);
            scheduleFlush();
            return task;
        },

        clear: function(task) {
            remove(this.reads, task);
            remove(this.writes, task);
        },

        flush: flush

    };

    function flush(recursion) {
        if ( recursion === void 0 ) recursion = 1;

        runTasks(fastdom.reads);
        runTasks(fastdom.writes.splice(0));

        fastdom.scheduled = false;

        if (fastdom.reads.length || fastdom.writes.length) {
            scheduleFlush(recursion + 1);
        }
    }

    var RECURSION_LIMIT = 4;
    function scheduleFlush(recursion) {

        if (fastdom.scheduled) {
            return;
        }

        fastdom.scheduled = true;
        if (recursion && recursion < RECURSION_LIMIT) {
            Promise$1.resolve().then(function () { return flush(recursion); });
        } else {
            requestAnimationFrame(function () { return flush(); });
        }

    }

    function runTasks(tasks) {
        var task;
        while ((task = tasks.shift())) {
            try {
                task();
            } catch (e) {
                console.error(e);
            }
        }
    }

    function remove(array, item) {
        var index = array.indexOf(item);
        return ~index && array.splice(index, 1);
    }

    function MouseTracker() {}

    MouseTracker.prototype = {

        positions: [],

        init: function() {
            var this$1 = this;


            this.positions = [];

            var position;
            this.unbind = on(document, 'mousemove', function (e) { return position = getEventPos(e); });
            this.interval = setInterval(function () {

                if (!position) {
                    return;
                }

                this$1.positions.push(position);

                if (this$1.positions.length > 5) {
                    this$1.positions.shift();
                }
            }, 50);

        },

        cancel: function() {
            this.unbind && this.unbind();
            this.interval && clearInterval(this.interval);
        },

        movesTo: function(target) {

            if (this.positions.length < 2) {
                return false;
            }

            var p = target.getBoundingClientRect();
            var left = p.left;
            var right = p.right;
            var top = p.top;
            var bottom = p.bottom;

            var ref = this.positions;
            var prevPosition = ref[0];
            var position = last(this.positions);
            var path = [prevPosition, position];

            if (pointInRect(position, p)) {
                return false;
            }

            var diagonals = [[{x: left, y: top}, {x: right, y: bottom}], [{x: left, y: bottom}, {x: right, y: top}]];

            return diagonals.some(function (diagonal) {
                var intersection = intersect(path, diagonal);
                return intersection && pointInRect(intersection, p);
            });
        }

    };

    // Inspired by http://paulbourke.net/geometry/pointlineplane/
    function intersect(ref, ref$1) {
        var ref_0 = ref[0];
        var x1 = ref_0.x;
        var y1 = ref_0.y;
        var ref_1 = ref[1];
        var x2 = ref_1.x;
        var y2 = ref_1.y;
        var ref$1_0 = ref$1[0];
        var x3 = ref$1_0.x;
        var y3 = ref$1_0.y;
        var ref$1_1 = ref$1[1];
        var x4 = ref$1_1.x;
        var y4 = ref$1_1.y;


        var denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

        // Lines are parallel
        if (denominator === 0) {
            return false;
        }

        var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;

        if (ua < 0) {
            return false;
        }

        // Return an object with the x and y coordinates of the intersection
        return {x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1)};
    }

    var strats = {};

    strats.events =
    strats.created =
    strats.beforeConnect =
    strats.connected =
    strats.beforeDisconnect =
    strats.disconnected =
    strats.destroy = concatStrat;

    // args strategy
    strats.args = function (parentVal, childVal) {
        return childVal !== false && concatStrat(childVal || parentVal);
    };

    // update strategy
    strats.update = function (parentVal, childVal) {
        return sortBy$1(concatStrat(parentVal, isFunction(childVal) ? {read: childVal} : childVal), 'order');
    };

    // property strategy
    strats.props = function (parentVal, childVal) {

        if (isArray(childVal)) {
            childVal = childVal.reduce(function (value, key) {
                value[key] = String;
                return value;
            }, {});
        }

        return strats.methods(parentVal, childVal);
    };

    // extend strategy
    strats.computed =
    strats.methods = function (parentVal, childVal) {
        return childVal
            ? parentVal
                ? assign({}, parentVal, childVal)
                : childVal
            : parentVal;
    };

    // data strategy
    strats.data = function (parentVal, childVal, vm) {

        if (!vm) {

            if (!childVal) {
                return parentVal;
            }

            if (!parentVal) {
                return childVal;
            }

            return function (vm) {
                return mergeFnData(parentVal, childVal, vm);
            };

        }

        return mergeFnData(parentVal, childVal, vm);
    };

    function mergeFnData(parentVal, childVal, vm) {
        return strats.computed(
            isFunction(parentVal)
                ? parentVal.call(vm, vm)
                : parentVal,
            isFunction(childVal)
                ? childVal.call(vm, vm)
                : childVal
        );
    }

    // concat strategy
    function concatStrat(parentVal, childVal) {

        parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;

        return childVal
            ? parentVal
                ? parentVal.concat(childVal)
                : isArray(childVal)
                    ? childVal
                    : [childVal]
            : parentVal;
    }

    // default strategy
    function defaultStrat(parentVal, childVal) {
        return isUndefined(childVal) ? parentVal : childVal;
    }

    function mergeOptions(parent, child, vm) {

        var options = {};

        if (isFunction(child)) {
            child = child.options;
        }

        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm);
        }

        if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
            }
        }

        for (var key in parent) {
            mergeKey(key);
        }

        for (var key$1 in child) {
            if (!hasOwn(parent, key$1)) {
                mergeKey(key$1);
            }
        }

        function mergeKey(key) {
            options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
        }

        return options;
    }

    function parseOptions(options, args) {
        var obj;

        if ( args === void 0 ) args = [];

        try {

            return !options
                ? {}
                : startsWith(options, '{')
                    ? JSON.parse(options)
                    : args.length && !includes(options, ':')
                        ? (( obj = {}, obj[args[0]] = options, obj ))
                        : options.split(';').reduce(function (options, option) {
                            var ref = option.split(/:(.*)/);
                            var key = ref[0];
                            var value = ref[1];
                            if (key && !isUndefined(value)) {
                                options[key.trim()] = value.trim();
                            }
                            return options;
                        }, {});

        } catch (e) {
            return {};
        }

    }

    function play(el) {

        if (isIFrame(el)) {
            call(el, {func: 'playVideo', method: 'play'});
        }

        if (isHTML5(el)) {
            try {
                el.play().catch(noop);
            } catch (e) {}
        }

    }

    function pause(el) {

        if (isIFrame(el)) {
            call(el, {func: 'pauseVideo', method: 'pause'});
        }

        if (isHTML5(el)) {
            el.pause();
        }

    }

    function mute(el) {

        if (isIFrame(el)) {
            call(el, {func: 'mute', method: 'setVolume', value: 0});
        }

        if (isHTML5(el)) {
            el.muted = true;
        }

    }

    function isHTML5(el) {
        return el && el.tagName === 'VIDEO';
    }

    function isIFrame(el) {
        return el && el.tagName === 'IFRAME' && (isYoutube(el) || isVimeo(el));
    }

    function isYoutube(el) {
        return !!el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
    }

    function isVimeo(el) {
        return !!el.src.match(/vimeo\.com\/video\/.*/);
    }

    function call(el, cmd) {
        enableApi(el).then(function () { return post(el, cmd); });
    }

    function post(el, cmd) {
        try {
            el.contentWindow.postMessage(JSON.stringify(assign({event: 'command'}, cmd)), '*');
        } catch (e) {}
    }

    var stateKey$1 = '_ukPlayer';
    var counter = 0;
    function enableApi(el) {

        if (el[stateKey$1]) {
            return el[stateKey$1];
        }

        var youtube = isYoutube(el);
        var vimeo = isVimeo(el);

        var id = ++counter;
        var poller;

        return el[stateKey$1] = new Promise$1(function (resolve) {

            youtube && once(el, 'load', function () {
                var listener = function () { return post(el, {event: 'listening', id: id}); };
                poller = setInterval(listener, 100);
                listener();
            });

            once(window, 'message', resolve, false, function (ref) {
                var data = ref.data;


                try {
                    data = JSON.parse(data);
                    return data && (youtube && data.id === id && data.event === 'onReady' || vimeo && Number(data.player_id) === id);
                } catch (e) {}

            });

            el.src = "" + (el.src) + (includes(el.src, '?') ? '&' : '?') + (youtube ? 'enablejsapi=1' : ("api=1&player_id=" + id));

        }).then(function () { return clearInterval(poller); });
    }

    function isInView(element, offsetTop, offsetLeft) {
        if ( offsetTop === void 0 ) offsetTop = 0;
        if ( offsetLeft === void 0 ) offsetLeft = 0;


        if (!isVisible(element)) {
            return false;
        }

        return intersectRect.apply(void 0, scrollParents(element).map(function (parent) {

            var ref = offset(getViewport$1(parent));
            var top = ref.top;
            var left = ref.left;
            var bottom = ref.bottom;
            var right = ref.right;

            return {
                top: top - offsetTop,
                left: left - offsetLeft,
                bottom: bottom + offsetTop,
                right: right + offsetLeft
            };
        }).concat(offset(element)));
    }

    function scrollTop(element, top) {

        if (isWindow(element) || isDocument(element)) {
            element = getScrollingElement(element);
        } else {
            element = toNode(element);
        }

        element.scrollTop = top;
    }

    function scrollIntoView(element, ref) {
        if ( ref === void 0 ) ref = {};
        var offsetBy = ref.offset; if ( offsetBy === void 0 ) offsetBy = 0;


        var parents = isVisible(element) ? scrollParents(element) : [];
        var diff = 0;
        return parents.reduce(function (fn, scrollElement, i) {

            var scrollTop = scrollElement.scrollTop;
            var scrollHeight = scrollElement.scrollHeight;
            var maxScroll = scrollHeight - getViewportClientHeight(scrollElement);

            var top = Math.ceil(
                offset(parents[i - 1] || element).top
                - offset(getViewport$1(scrollElement)).top
                - offsetBy
                + diff
                + scrollTop
            );

            if (top > maxScroll) {
                diff = top - maxScroll;
                top = maxScroll;
            } else {
                diff = 0;
            }

            return function () { return scrollTo(scrollElement, top - scrollTop).then(fn); };

        }, function () { return Promise$1.resolve(); })();

        function scrollTo(element, top) {
            return new Promise$1(function (resolve) {

                var scroll = element.scrollTop;
                var duration = getDuration(Math.abs(top));
                var start = Date.now();

                (function step() {

                    var percent = ease(clamp((Date.now() - start) / duration));

                    scrollTop(element, scroll + top * percent);

                    // scroll more if we have not reached our destination
                    if (percent !== 1) {
                        requestAnimationFrame(step);
                    } else {
                        resolve();
                    }

                })();
            });
        }

        function getDuration(dist) {
            return 40 * Math.pow(dist, .375);
        }

        function ease(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        }

    }

    function scrolledOver(element, heightOffset) {
        if ( heightOffset === void 0 ) heightOffset = 0;


        if (!isVisible(element)) {
            return 0;
        }

        var ref = scrollParents(element, /auto|scroll/, true);
        var scrollElement = ref[0];
        var scrollHeight = scrollElement.scrollHeight;
        var scrollTop = scrollElement.scrollTop;
        var clientHeight = getViewportClientHeight(scrollElement);
        var viewportTop = offsetPosition(element)[0] - scrollTop - offsetPosition(scrollElement)[0];
        var viewportDist = Math.min(clientHeight, viewportTop + scrollTop);

        var top = viewportTop - viewportDist;
        var dist = Math.min(
            element.offsetHeight + heightOffset + viewportDist,
            scrollHeight - (viewportTop + scrollTop),
            scrollHeight - clientHeight
        );

        return clamp(-1 * top / dist);
    }

    function scrollParents(element, overflowRe, scrollable) {
        if ( overflowRe === void 0 ) overflowRe = /auto|scroll|hidden/;
        if ( scrollable === void 0 ) scrollable = false;

        var scrollEl = getScrollingElement(element);

        var ancestors = parents(element).reverse();
        ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);

        var fixedIndex = findIndex(ancestors, function (el) { return css(el, 'position') === 'fixed'; });
        if (~fixedIndex) {
            ancestors = ancestors.slice(fixedIndex);
        }

        return [scrollEl].concat(ancestors.filter(function (parent) { return overflowRe.test(css(parent, 'overflow')) && (!scrollable || parent.scrollHeight > getViewportClientHeight(parent)); })
        ).reverse();
    }

    function getViewport$1(scrollElement) {
        return scrollElement === getScrollingElement(scrollElement) ? window : scrollElement;
    }

    // iOS 12 returns <body> as scrollingElement
    function getViewportClientHeight(scrollElement) {
        return (scrollElement === getScrollingElement(scrollElement) ? document.documentElement : scrollElement).clientHeight;
    }

    function getScrollingElement(element) {
        var ref = toWindow(element);
        var document = ref.document;
        return document.scrollingElement || document.documentElement;
    }

    var dirs = {
        width: ['x', 'left', 'right'],
        height: ['y', 'top', 'bottom']
    };

    function positionAt(element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {

        elAttach = getPos(elAttach);
        targetAttach = getPos(targetAttach);

        var flipped = {element: elAttach, target: targetAttach};

        if (!element || !target) {
            return flipped;
        }

        var dim = offset(element);
        var targetDim = offset(target);
        var position = targetDim;

        moveTo(position, elAttach, dim, -1);
        moveTo(position, targetAttach, targetDim, 1);

        elOffset = getOffsets(elOffset, dim.width, dim.height);
        targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

        elOffset['x'] += targetOffset['x'];
        elOffset['y'] += targetOffset['y'];

        position.left += elOffset['x'];
        position.top += elOffset['y'];

        if (flip) {

            var boundaries = scrollParents(element).map(getViewport$1);

            if (boundary && !includes(boundaries, boundary)) {
                boundaries.unshift(boundary);
            }

            boundaries = boundaries.map(function (el) { return offset(el); });

            each(dirs, function (ref, prop) {
                var dir = ref[0];
                var align = ref[1];
                var alignFlip = ref[2];


                if (!(flip === true || includes(flip, dir))) {
                    return;
                }

                boundaries.some(function (boundary) {

                    var elemOffset = elAttach[dir] === align
                        ? -dim[prop]
                        : elAttach[dir] === alignFlip
                            ? dim[prop]
                            : 0;

                    var targetOffset = targetAttach[dir] === align
                        ? targetDim[prop]
                        : targetAttach[dir] === alignFlip
                            ? -targetDim[prop]
                            : 0;

                    if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {

                        var centerOffset = dim[prop] / 2;
                        var centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;

                        return elAttach[dir] === 'center' && (
                            apply(centerOffset, centerTargetOffset)
                            || apply(-centerOffset, -centerTargetOffset)
                        ) || apply(elemOffset, targetOffset);

                    }

                    function apply(elemOffset, targetOffset) {

                        var newVal = toFloat((position[align] + elemOffset + targetOffset - elOffset[dir] * 2).toFixed(4));

                        if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
                            position[align] = newVal;

                            ['element', 'target'].forEach(function (el) {
                                flipped[el][dir] = !elemOffset
                                    ? flipped[el][dir]
                                    : flipped[el][dir] === dirs[prop][1]
                                        ? dirs[prop][2]
                                        : dirs[prop][1];
                            });

                            return true;
                        }

                    }

                });

            });
        }

        offset(element, position);

        return flipped;
    }

    function moveTo(position, attach, dim, factor) {
        each(dirs, function (ref, prop) {
            var dir = ref[0];
            var align = ref[1];
            var alignFlip = ref[2];

            if (attach[dir] === alignFlip) {
                position[align] += dim[prop] * factor;
            } else if (attach[dir] === 'center') {
                position[align] += dim[prop] * factor / 2;
            }
        });
    }

    function getPos(pos) {

        var x = /left|center|right/;
        var y = /top|center|bottom/;

        pos = (pos || '').split(' ');

        if (pos.length === 1) {
            pos = x.test(pos[0])
                ? pos.concat('center')
                : y.test(pos[0])
                    ? ['center'].concat(pos)
                    : ['center', 'center'];
        }

        return {
            x: x.test(pos[0]) ? pos[0] : 'center',
            y: y.test(pos[1]) ? pos[1] : 'center'
        };
    }

    function getOffsets(offsets, width, height) {

        var ref = (offsets || '').split(' ');
        var x = ref[0];
        var y = ref[1];

        return {
            x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
            y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
        };
    }

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ajax: ajax,
        getImage: getImage,
        transition: transition,
        Transition: Transition,
        animate: animate$1,
        Animation: Animation,
        attr: attr,
        hasAttr: hasAttr,
        removeAttr: removeAttr,
        data: data,
        addClass: addClass,
        removeClass: removeClass,
        removeClasses: removeClasses,
        replaceClass: replaceClass,
        hasClass: hasClass,
        toggleClass: toggleClass,
        dimensions: dimensions,
        offset: offset,
        position: position,
        offsetPosition: offsetPosition,
        height: height,
        width: width,
        boxModelAdjust: boxModelAdjust,
        flipPosition: flipPosition,
        toPx: toPx,
        ready: ready,
        empty: empty,
        html: html,
        prepend: prepend,
        append: append,
        before: before,
        after: after,
        remove: remove$1,
        wrapAll: wrapAll,
        wrapInner: wrapInner,
        unwrap: unwrap,
        fragment: fragment,
        apply: apply$1,
        $: $,
        $$: $$,
        inBrowser: inBrowser,
        isIE: isIE,
        isRtl: isRtl,
        hasTouch: hasTouch,
        pointerDown: pointerDown,
        pointerMove: pointerMove,
        pointerUp: pointerUp,
        pointerEnter: pointerEnter,
        pointerLeave: pointerLeave,
        pointerCancel: pointerCancel,
        on: on,
        off: off,
        once: once,
        trigger: trigger,
        createEvent: createEvent,
        toEventTargets: toEventTargets,
        isTouch: isTouch,
        getEventPos: getEventPos,
        fastdom: fastdom,
        isVoidElement: isVoidElement,
        isVisible: isVisible,
        selInput: selInput,
        isInput: isInput,
        isFocusable: isFocusable,
        parent: parent,
        filter: filter$1,
        matches: matches,
        closest: closest,
        within: within,
        parents: parents,
        children: children,
        index: index,
        hasOwn: hasOwn,
        hyphenate: hyphenate,
        camelize: camelize,
        ucfirst: ucfirst,
        startsWith: startsWith,
        endsWith: endsWith,
        includes: includes,
        findIndex: findIndex,
        isArray: isArray,
        isFunction: isFunction,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isWindow: isWindow,
        isDocument: isDocument,
        isNode: isNode,
        isElement: isElement,
        isBoolean: isBoolean,
        isString: isString,
        isNumber: isNumber,
        isNumeric: isNumeric,
        isEmpty: isEmpty,
        isUndefined: isUndefined,
        toBoolean: toBoolean,
        toNumber: toNumber,
        toFloat: toFloat,
        toArray: toArray,
        toNode: toNode,
        toNodes: toNodes,
        toWindow: toWindow,
        toMs: toMs,
        isEqual: isEqual,
        swap: swap,
        assign: assign,
        last: last,
        each: each,
        sortBy: sortBy$1,
        uniqueBy: uniqueBy,
        clamp: clamp,
        noop: noop,
        intersectRect: intersectRect,
        pointInRect: pointInRect,
        Dimensions: Dimensions,
        getIndex: getIndex,
        memoize: memoize,
        MouseTracker: MouseTracker,
        mergeOptions: mergeOptions,
        parseOptions: parseOptions,
        play: play,
        pause: pause,
        mute: mute,
        positionAt: positionAt,
        Promise: Promise$1,
        Deferred: Deferred,
        query: query,
        queryAll: queryAll,
        find: find,
        findAll: findAll,
        escape: escape,
        css: css,
        getCssVar: getCssVar,
        propName: propName,
        isInView: isInView,
        scrollTop: scrollTop,
        scrollIntoView: scrollIntoView,
        scrolledOver: scrolledOver,
        scrollParents: scrollParents,
        getViewport: getViewport$1,
        getViewportClientHeight: getViewportClientHeight
    });

    function globalAPI (UIkit) {

        var DATA = UIkit.data;

        UIkit.use = function (plugin) {

            if (plugin.installed) {
                return;
            }

            plugin.call(null, this);
            plugin.installed = true;

            return this;
        };

        UIkit.mixin = function (mixin, component) {
            component = (isString(component) ? UIkit.component(component) : component) || this;
            component.options = mergeOptions(component.options, mixin);
        };

        UIkit.extend = function (options) {

            options = options || {};

            var Super = this;
            var Sub = function UIkitComponent(options) {
                this._init(options);
            };

            Sub.prototype = Object.create(Super.prototype);
            Sub.prototype.constructor = Sub;
            Sub.options = mergeOptions(Super.options, options);

            Sub.super = Super;
            Sub.extend = Super.extend;

            return Sub;
        };

        UIkit.update = function (element, e) {

            element = element ? toNode(element) : document.body;

            parents(element).reverse().forEach(function (element) { return update(element[DATA], e); });
            apply$1(element, function (element) { return update(element[DATA], e); });

        };

        var container;
        Object.defineProperty(UIkit, 'container', {

            get: function() {
                return container || document.body;
            },

            set: function(element) {
                container = $(element);
            }

        });

        function update(data, e) {

            if (!data) {
                return;
            }

            for (var name in data) {
                if (data[name]._connected) {
                    data[name]._callUpdate(e);
                }
            }

        }
    }

    function hooksAPI (UIkit) {

        UIkit.prototype._callHook = function (hook) {
            var this$1 = this;


            var handlers = this.$options[hook];

            if (handlers) {
                handlers.forEach(function (handler) { return handler.call(this$1); });
            }
        };

        UIkit.prototype._callConnected = function () {

            if (this._connected) {
                return;
            }

            this._data = {};
            this._computeds = {};

            this._initProps();

            this._callHook('beforeConnect');
            this._connected = true;

            this._initEvents();
            this._initObservers();

            this._callHook('connected');
            this._callUpdate();
        };

        UIkit.prototype._callDisconnected = function () {

            if (!this._connected) {
                return;
            }

            this._callHook('beforeDisconnect');
            this._disconnectObservers();
            this._unbindEvents();
            this._callHook('disconnected');

            this._connected = false;
            delete this._watch;

        };

        UIkit.prototype._callUpdate = function (e) {
            var this$1 = this;
            if ( e === void 0 ) e = 'update';


            if (!this._connected) {
                return;
            }

            if (e === 'update' || e === 'resize') {
                this._callWatches();
            }

            if (!this.$options.update) {
                return;
            }

            if (!this._updates) {
                this._updates = new Set();
                fastdom.read(function () {
                    if (this$1._connected) {
                        runUpdates.call(this$1, this$1._updates);
                    }
                    delete this$1._updates;
                });
            }

            this._updates.add(e.type || e);
        };

        UIkit.prototype._callWatches = function () {
            var this$1 = this;


            if (this._watch) {
                return;
            }

            var initial = !hasOwn(this, '_watch');

            this._watch = fastdom.read(function () {
                if (this$1._connected) {
                    runWatches.call(this$1, initial);
                }
                this$1._watch = null;

            });

        };

        function runUpdates(types) {
            var this$1 = this;


            var updates = this.$options.update;

            var loop = function ( i ) {
                var ref = updates[i];
                var read = ref.read;
                var write = ref.write;
                var events = ref.events;

                if (!types.has('update') && (!events || !events.some(function (type) { return types.has(type); }))) {
                    return;
                }

                var result = (void 0);
                if (read) {

                    result = read.call(this$1, this$1._data, types);

                    if (result && isPlainObject(result)) {
                        assign(this$1._data, result);
                    }
                }

                if (write && result !== false) {
                    fastdom.write(function () { return write.call(this$1, this$1._data, types); });
                }

            };

            for (var i = 0; i < updates.length; i++) loop( i );
        }

        function runWatches(initial) {

            var ref = this;
            var computed = ref.$options.computed;
            var _computeds = ref._computeds;

            for (var key in computed) {

                var hasPrev = hasOwn(_computeds, key);
                var prev = _computeds[key];

                delete _computeds[key];

                var ref$1 = computed[key];
                var watch = ref$1.watch;
                var immediate = ref$1.immediate;
                if (watch && (
                    initial && immediate
                    || hasPrev && !isEqual(prev, this[key])
                )) {
                    watch.call(this, this[key], prev);
                }

            }
        }
    }

    function stateAPI (UIkit) {

        var uid = 0;

        UIkit.prototype._init = function (options) {

            options = options || {};
            options.data = normalizeData(options, this.constructor.options);

            this.$options = mergeOptions(this.constructor.options, options, this);
            this.$el = null;
            this.$props = {};

            this._uid = uid++;
            this._initData();
            this._initMethods();
            this._initComputeds();
            this._callHook('created');

            if (options.el) {
                this.$mount(options.el);
            }
        };

        UIkit.prototype._initData = function () {

            var ref = this.$options;
            var data = ref.data; if ( data === void 0 ) data = {};

            for (var key in data) {
                this.$props[key] = this[key] = data[key];
            }
        };

        UIkit.prototype._initMethods = function () {

            var ref = this.$options;
            var methods = ref.methods;

            if (methods) {
                for (var key in methods) {
                    this[key] = methods[key].bind(this);
                }
            }
        };

        UIkit.prototype._initComputeds = function () {

            var ref = this.$options;
            var computed = ref.computed;

            this._computeds = {};

            if (computed) {
                for (var key in computed) {
                    registerComputed(this, key, computed[key]);
                }
            }
        };

        UIkit.prototype._initProps = function (props) {

            var key;

            props = props || getProps(this.$options, this.$name);

            for (key in props) {
                if (!isUndefined(props[key])) {
                    this.$props[key] = props[key];
                }
            }

            var exclude = [this.$options.computed, this.$options.methods];
            for (key in this.$props) {
                if (key in props && notIn(exclude, key)) {
                    this[key] = this.$props[key];
                }
            }
        };

        UIkit.prototype._initEvents = function () {
            var this$1 = this;


            this._events = [];

            var ref = this.$options;
            var events = ref.events;

            if (events) {

                events.forEach(function (event) {

                    if (!hasOwn(event, 'handler')) {
                        for (var key in event) {
                            registerEvent(this$1, event[key], key);
                        }
                    } else {
                        registerEvent(this$1, event);
                    }

                });
            }
        };

        UIkit.prototype._unbindEvents = function () {
            this._events.forEach(function (unbind) { return unbind(); });
            delete this._events;
        };

        UIkit.prototype._initObservers = function () {
            this._observers = [
                initChildListObserver(this),
                initPropsObserver(this)
            ];
        };

        UIkit.prototype._disconnectObservers = function () {
            this._observers.forEach(function (observer) { return observer && observer.disconnect(); }
            );
        };

        function getProps(opts, name) {

            var data$1 = {};
            var args = opts.args; if ( args === void 0 ) args = [];
            var props = opts.props; if ( props === void 0 ) props = {};
            var el = opts.el;

            if (!props) {
                return data$1;
            }

            for (var key in props) {
                var prop = hyphenate(key);
                var value = data(el, prop);

                if (isUndefined(value)) {
                    continue;
                }

                value = props[key] === Boolean && value === ''
                    ? true
                    : coerce(props[key], value);

                if (prop === 'target' && (!value || startsWith(value, '_'))) {
                    continue;
                }

                data$1[key] = value;
            }

            var options = parseOptions(data(el, name), args);

            for (var key$1 in options) {
                var prop$1 = camelize(key$1);
                if (props[prop$1] !== undefined) {
                    data$1[prop$1] = coerce(props[prop$1], options[key$1]);
                }
            }

            return data$1;
        }

        function registerComputed(component, key, cb) {
            Object.defineProperty(component, key, {

                enumerable: true,

                get: function() {

                    var _computeds = component._computeds;
                    var $props = component.$props;
                    var $el = component.$el;

                    if (!hasOwn(_computeds, key)) {
                        _computeds[key] = (cb.get || cb).call(component, $props, $el);
                    }

                    return _computeds[key];
                },

                set: function(value) {

                    var _computeds = component._computeds;

                    _computeds[key] = cb.set ? cb.set.call(component, value) : value;

                    if (isUndefined(_computeds[key])) {
                        delete _computeds[key];
                    }
                }

            });
        }

        function registerEvent(component, event, key) {

            if (!isPlainObject(event)) {
                event = ({name: key, handler: event});
            }

            var name = event.name;
            var el = event.el;
            var handler = event.handler;
            var capture = event.capture;
            var passive = event.passive;
            var delegate = event.delegate;
            var filter = event.filter;
            var self = event.self;
            el = isFunction(el)
                ? el.call(component)
                : el || component.$el;

            if (isArray(el)) {
                el.forEach(function (el) { return registerEvent(component, assign({}, event, {el: el}), key); });
                return;
            }

            if (!el || filter && !filter.call(component)) {
                return;
            }

            component._events.push(
                on(
                    el,
                    name,
                    !delegate
                        ? null
                        : isString(delegate)
                            ? delegate
                            : delegate.call(component),
                    isString(handler) ? component[handler] : handler.bind(component),
                    {passive: passive, capture: capture, self: self}
                )
            );

        }

        function notIn(options, key) {
            return options.every(function (arr) { return !arr || !hasOwn(arr, key); });
        }

        function coerce(type, value) {

            if (type === Boolean) {
                return toBoolean(value);
            } else if (type === Number) {
                return toNumber(value);
            } else if (type === 'list') {
                return toList(value);
            }

            return type ? type(value) : value;
        }

        function toList(value) {
            return isArray(value)
                ? value
                : isString(value)
                    ? value.split(/,(?![^(]*\))/).map(function (value) { return isNumeric(value)
                        ? toNumber(value)
                        : toBoolean(value.trim()); })
                    : [value];
        }

        function normalizeData(ref, ref$1) {
            var data = ref.data;
            var args = ref$1.args;
            var props = ref$1.props; if ( props === void 0 ) props = {};

            data = isArray(data)
                ? !isEmpty(args)
                    ? data.slice(0, args.length).reduce(function (data, value, index) {
                        if (isPlainObject(value)) {
                            assign(data, value);
                        } else {
                            data[args[index]] = value;
                        }
                        return data;
                    }, {})
                    : undefined
                : data;

            if (data) {
                for (var key in data) {
                    if (isUndefined(data[key])) {
                        delete data[key];
                    } else {
                        data[key] = props[key] ? coerce(props[key], data[key]) : data[key];
                    }
                }
            }

            return data;
        }

        function initChildListObserver(component) {
            var ref = component.$options;
            var el = ref.el;

            var observer = new MutationObserver(function () { return component.$emit(); });
            observer.observe(el, {
                childList: true,
                subtree: true
            });

            return observer;
        }

        function initPropsObserver(component) {

            var $name = component.$name;
            var $options = component.$options;
            var $props = component.$props;
            var attrs = $options.attrs;
            var props = $options.props;
            var el = $options.el;

            if (!props || attrs === false) {
                return;
            }

            var attributes = isArray(attrs) ? attrs : Object.keys(props);
            var filter = attributes.map(function (key) { return hyphenate(key); }).concat($name);

            var observer = new MutationObserver(function (records) {
                var data = getProps($options, $name);
                if (records.some(function (ref) {
                    var attributeName = ref.attributeName;

                    var prop = attributeName.replace('data-', '');
                    return (prop === $name ? attributes : [camelize(prop), camelize(attributeName)]).some(function (prop) { return !isUndefined(data[prop]) && data[prop] !== $props[prop]; }
                    );
                })) {
                    component.$reset();
                }
            });

            observer.observe(el, {
                attributes: true,
                attributeFilter: filter.concat(filter.map(function (key) { return ("data-" + key); }))
            });

            return observer;
        }
    }

    function instanceAPI (UIkit) {

        var DATA = UIkit.data;

        UIkit.prototype.$create = function (component, element, data) {
            return UIkit[component](element, data);
        };

        UIkit.prototype.$mount = function (el) {

            var ref = this.$options;
            var name = ref.name;

            if (!el[DATA]) {
                el[DATA] = {};
            }

            if (el[DATA][name]) {
                return;
            }

            el[DATA][name] = this;

            this.$el = this.$options.el = this.$options.el || el;

            if (within(el, document)) {
                this._callConnected();
            }
        };

        UIkit.prototype.$reset = function () {
            this._callDisconnected();
            this._callConnected();
        };

        UIkit.prototype.$destroy = function (removeEl) {
            if ( removeEl === void 0 ) removeEl = false;


            var ref = this.$options;
            var el = ref.el;
            var name = ref.name;

            if (el) {
                this._callDisconnected();
            }

            this._callHook('destroy');

            if (!el || !el[DATA]) {
                return;
            }

            delete el[DATA][name];

            if (!isEmpty(el[DATA])) {
                delete el[DATA];
            }

            if (removeEl) {
                remove$1(this.$el);
            }
        };

        UIkit.prototype.$emit = function (e) {
            this._callUpdate(e);
        };

        UIkit.prototype.$update = function (element, e) {
            if ( element === void 0 ) element = this.$el;

            UIkit.update(element, e);
        };

        UIkit.prototype.$getComponent = UIkit.getComponent;

        var componentName = memoize(function (name) { return UIkit.prefix + hyphenate(name); });
        Object.defineProperties(UIkit.prototype, {

            $container: Object.getOwnPropertyDescriptor(UIkit, 'container'),

            $name: {

                get: function() {
                    return componentName(this.$options.name);
                }

            }

        });

    }

    function componentAPI (UIkit) {

        var DATA = UIkit.data;

        var components = {};

        UIkit.component = function (name, options) {

            var id = hyphenate(name);

            name = camelize(id);

            if (!options) {

                if (isPlainObject(components[name])) {
                    components[name] = UIkit.extend(components[name]);
                }

                return components[name];

            }

            UIkit[name] = function (element, data) {
                var i = arguments.length, argsArray = Array(i);
                while ( i-- ) argsArray[i] = arguments[i];


                var component = UIkit.component(name);

                return component.options.functional
                    ? new component({data: isPlainObject(element) ? element : [].concat( argsArray )})
                    : !element ? init(element) : $$(element).map(init)[0];

                function init(element) {

                    var instance = UIkit.getComponent(element, name);

                    if (instance) {
                        if (!data) {
                            return instance;
                        } else {
                            instance.$destroy();
                        }
                    }

                    return new component({el: element, data: data});

                }

            };

            var opt = isPlainObject(options) ? assign({}, options) : options.options;

            opt.name = name;

            if (opt.install) {
                opt.install(UIkit, opt, name);
            }

            if (UIkit._initialized && !opt.functional) {
                fastdom.read(function () { return UIkit[name](("[uk-" + id + "],[data-uk-" + id + "]")); });
            }

            return components[name] = isPlainObject(options) ? opt : options;
        };

        UIkit.getComponents = function (element) { return element && element[DATA] || {}; };
        UIkit.getComponent = function (element, name) { return UIkit.getComponents(element)[name]; };

        UIkit.connect = function (node) {

            if (node[DATA]) {
                for (var name in node[DATA]) {
                    node[DATA][name]._callConnected();
                }
            }

            for (var i = 0; i < node.attributes.length; i++) {

                var name$1 = getComponentName(node.attributes[i].name);

                if (name$1 && name$1 in components) {
                    UIkit[name$1](node);
                }

            }

        };

        UIkit.disconnect = function (node) {
            for (var name in node[DATA]) {
                node[DATA][name]._callDisconnected();
            }
        };

    }

    var getComponentName = memoize(function (attribute) {
        return startsWith(attribute, 'uk-') || startsWith(attribute, 'data-uk-')
            ? camelize(attribute.replace('data-uk-', '').replace('uk-', ''))
            : false;
    });

    var UIkit = function (options) {
        this._init(options);
    };

    UIkit.util = util;
    UIkit.data = '__uikit__';
    UIkit.prefix = 'uk-';
    UIkit.options = {};
    UIkit.version = '3.7.3';

    globalAPI(UIkit);
    hooksAPI(UIkit);
    stateAPI(UIkit);
    componentAPI(UIkit);
    instanceAPI(UIkit);

    function Core (UIkit) {

        if (!inBrowser) {
            return;
        }

        // throttle 'resize'
        var pendingResize;
        var handleResize = function () {
            if (pendingResize) {
                return;
            }
            pendingResize = true;
            fastdom.write(function () { return pendingResize = false; });
            UIkit.update(null, 'resize');
        };

        on(window, 'load resize', handleResize);
        on(document, 'loadedmetadata load', handleResize, true);

        if ('ResizeObserver' in window) {
            (new ResizeObserver(handleResize)).observe(document.documentElement);
        }

        // throttle `scroll` event (Safari triggers multiple `scroll` events per frame)
        var pending;
        on(window, 'scroll', function (e) {

            if (pending) {
                return;
            }
            pending = true;
            fastdom.write(function () { return pending = false; });

            UIkit.update(null, e.type);

        }, {passive: true, capture: true});

        var started = 0;
        on(document, 'animationstart', function (ref) {
            var target = ref.target;

            if ((css(target, 'animationName') || '').match(/^uk-.*(left|right)/)) {

                started++;
                css(document.documentElement, 'overflowX', 'hidden');
                setTimeout(function () {
                    if (!--started) {
                        css(document.documentElement, 'overflowX', '');
                    }
                }, toMs(css(target, 'animationDuration')) + 100);
            }
        }, true);

        on(document, pointerDown, function (e) {

            if (!isTouch(e)) {
                return;
            }

            // Handle Swipe Gesture
            var pos = getEventPos(e);
            var target = 'tagName' in e.target ? e.target : parent(e.target);
            once(document, (pointerUp + " " + pointerCancel + " scroll"), function (e) {

                var ref = getEventPos(e);
                var x = ref.x;
                var y = ref.y;

                // swipe
                if (e.type !== 'scroll' && target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {

                    setTimeout(function () {
                        trigger(target, 'swipe');
                        trigger(target, ("swipe" + (swipeDirection(pos.x, pos.y, x, y))));
                    });

                }

            });

        }, {passive: true});

    }

    function swipeDirection(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
            ? x1 - x2 > 0
                ? 'Left'
                : 'Right'
            : y1 - y2 > 0
                ? 'Up'
                : 'Down';
    }

    function boot (UIkit) {

        var connect = UIkit.connect;
        var disconnect = UIkit.disconnect;

        if (!inBrowser || !window.MutationObserver) {
            return;
        }

        fastdom.read(function () {

            if (document.body) {
                apply$1(document.body, connect);
            }

            new MutationObserver(function (records) { return records.forEach(applyChildListMutation); }
            ).observe(document, {
                childList: true,
                subtree: true
            });

            new MutationObserver(function (records) { return records.forEach(applyAttributeMutation); }
            ).observe(document, {
                attributes: true,
                subtree: true
            });

            UIkit._initialized = true;
        });

        function applyChildListMutation(ref) {
            var addedNodes = ref.addedNodes;
            var removedNodes = ref.removedNodes;

            for (var i = 0; i < addedNodes.length; i++) {
                apply$1(addedNodes[i], connect);
            }

            for (var i$1 = 0; i$1 < removedNodes.length; i$1++) {
                apply$1(removedNodes[i$1], disconnect);
            }
        }

        function applyAttributeMutation(ref) {
            var target = ref.target;
            var attributeName = ref.attributeName;


            var name = getComponentName(attributeName);

            if (!name || !(name in UIkit)) {
                return;
            }

            if (hasAttr(target, attributeName)) {
                UIkit[name](target);
                return;
            }

            var component = UIkit.getComponent(target, name);

            if (component) {
                component.$destroy();
            }

        }

    }

    var Class = {

        connected: function() {
            !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
        }

    };

    var Togglable = {

        props: {
            cls: Boolean,
            animation: 'list',
            duration: Number,
            origin: String,
            transition: String
        },

        data: {
            cls: false,
            animation: [false],
            duration: 200,
            origin: false,
            transition: 'linear',
            clsEnter: 'uk-togglabe-enter',
            clsLeave: 'uk-togglabe-leave',

            initProps: {
                overflow: '',
                height: '',
                paddingTop: '',
                paddingBottom: '',
                marginTop: '',
                marginBottom: ''
            },

            hideProps: {
                overflow: 'hidden',
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
            }

        },

        computed: {

            hasAnimation: function(ref) {
                var animation = ref.animation;

                return !!animation[0];
            },

            hasTransition: function(ref) {
                var animation = ref.animation;

                return this.hasAnimation && animation[0] === true;
            }

        },

        methods: {

            toggleElement: function(targets, toggle, animate) {
                var this$1 = this;

                return new Promise$1(function (resolve) { return Promise$1.all(toNodes(targets).map(function (el) {

                        var show = isBoolean(toggle) ? toggle : !this$1.isToggled(el);

                        if (!trigger(el, ("before" + (show ? 'show' : 'hide')), [this$1])) {
                            return Promise$1.reject();
                        }

                        var promise = (
                            isFunction(animate)
                                ? animate
                                : animate === false || !this$1.hasAnimation
                                ? this$1._toggle
                                : this$1.hasTransition
                                    ? toggleHeight(this$1)
                                    : toggleAnimation(this$1)
                        )(el, show);

                        var cls = show ? this$1.clsEnter : this$1.clsLeave;

                        addClass(el, cls);

                        trigger(el, show ? 'show' : 'hide', [this$1]);

                        var done = function () {
                            removeClass(el, cls);
                            trigger(el, show ? 'shown' : 'hidden', [this$1]);
                            this$1.$update(el);
                        };

                        return promise ? promise.then(done, function () {
                            removeClass(el, cls);
                            return Promise$1.reject();
                        }) : done();

                    })).then(resolve, noop); }
                );
            },

            isToggled: function(el) {
                if ( el === void 0 ) el = this.$el;

                return hasClass(el, this.clsEnter)
                    ? true
                    : hasClass(el, this.clsLeave)
                        ? false
                        : this.cls
                            ? hasClass(el, this.cls.split(' ')[0])
                            : !hasAttr(el, 'hidden');
            },

            _toggle: function(el, toggled) {

                if (!el) {
                    return;
                }

                toggled = Boolean(toggled);

                var changed;
                if (this.cls) {
                    changed = includes(this.cls, ' ') || toggled !== hasClass(el, this.cls);
                    changed && toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
                } else {
                    changed = toggled === el.hidden;
                    changed && (el.hidden = !toggled);
                }

                $$('[autofocus]', el).some(function (el) { return isVisible(el) ? el.focus() || true : el.blur(); });

                if (changed) {
                    trigger(el, 'toggled', [toggled, this]);
                    this.$update(el);
                }
            }

        }

    };

    function toggleHeight(ref) {
        var isToggled = ref.isToggled;
        var duration = ref.duration;
        var initProps = ref.initProps;
        var hideProps = ref.hideProps;
        var transition = ref.transition;
        var _toggle = ref._toggle;

        return function (el, show) {

            var inProgress = Transition.inProgress(el);
            var inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0;
            var currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;

            Transition.cancel(el);

            if (!isToggled(el)) {
                _toggle(el, true);
            }

            height(el, '');

            // Update child components first
            fastdom.flush();

            var endHeight = height(el) + (inProgress ? 0 : inner);
            height(el, currentHeight);

            return (show
                ? Transition.start(el, assign({}, initProps, {overflow: 'hidden', height: endHeight}), Math.round(duration * (1 - currentHeight / endHeight)), transition)
                : Transition.start(el, hideProps, Math.round(duration * (currentHeight / endHeight)), transition).then(function () { return _toggle(el, false); })
            ).then(function () { return css(el, initProps); });

        };
    }

    function toggleAnimation(cmp) {
        return function (el, show) {

            Animation.cancel(el);

            var animation = cmp.animation;
            var duration = cmp.duration;
            var _toggle = cmp._toggle;

            if (show) {
                _toggle(el, true);
                return Animation.in(el, animation[0], duration, cmp.origin);
            }

            return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(function () { return _toggle(el, false); });
        };
    }

    var Accordion = {

        mixins: [Class, Togglable],

        props: {
            targets: String,
            active: null,
            collapsible: Boolean,
            multiple: Boolean,
            toggle: String,
            content: String,
            transition: String,
            offset: Number
        },

        data: {
            targets: '> *',
            active: false,
            animation: [true],
            collapsible: true,
            multiple: false,
            clsOpen: 'uk-open',
            toggle: '> .uk-accordion-title',
            content: '> .uk-accordion-content',
            transition: 'ease',
            offset: 0
        },

        computed: {

            items: {

                get: function(ref, $el) {
                    var targets = ref.targets;

                    return $$(targets, $el);
                },

                watch: function(items, prev) {
                    var this$1 = this;


                    items.forEach(function (el) { return hide($(this$1.content, el), !hasClass(el, this$1.clsOpen)); });

                    if (prev || hasClass(items, this.clsOpen)) {
                        return;
                    }

                    var active = this.active !== false && items[Number(this.active)]
                        || !this.collapsible && items[0];

                    if (active) {
                        this.toggle(active, false);
                    }

                },

                immediate: true

            },

            toggles: function(ref) {
                var toggle = ref.toggle;

                return this.items.map(function (item) { return $(toggle, item); });
            }

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return ((this.targets) + " " + (this.$props.toggle));
                },

                handler: function(e) {
                    e.preventDefault();
                    this.toggle(index(this.toggles, e.current));
                }

            }

        ],

        methods: {

            toggle: function(item, animate) {
                var this$1 = this;


                var items = [this.items[getIndex(item, this.items)]];
                var activeItems = filter$1(this.items, ("." + (this.clsOpen)));

                if (!this.multiple && !includes(activeItems, items[0])) {
                    items = items.concat(activeItems);
                }

                if (!this.collapsible && activeItems.length < 2 && !filter$1(items, (":not(." + (this.clsOpen) + ")")).length) {
                    return;
                }

                items.forEach(function (el) { return this$1.toggleElement(el, !hasClass(el, this$1.clsOpen), function (el, show) {

                    toggleClass(el, this$1.clsOpen, show);
                    attr($(this$1.$props.toggle, el), 'aria-expanded', show);

                    var content = $(("" + (el._wrapper ? '> * ' : '') + (this$1.content)), el);

                    if (animate === false || !this$1.hasTransition) {
                        hide(content, !show);
                        return;
                    }

                    if (!el._wrapper) {
                        el._wrapper = wrapAll(content, ("<div" + (show ? ' hidden' : '') + ">"));
                    }

                    hide(content, false);
                    return toggleHeight(this$1)(el._wrapper, show).then(function () {
                        hide(content, !show);
                        delete el._wrapper;
                        unwrap(content);

                        if (show) {
                            var toggle = $(this$1.$props.toggle, el);
                            if (!isInView(toggle)) {
                                scrollIntoView(toggle, {offset: this$1.offset});
                            }
                        }
                    });
                }); });
            }

        }

    };

    function hide(el, hide) {
        el && (el.hidden = hide);
    }

    var alert = {

        mixins: [Class, Togglable],

        args: 'animation',

        props: {
            close: String
        },

        data: {
            animation: [true],
            selClose: '.uk-alert-close',
            duration: 150,
            hideProps: assign({opacity: 0}, Togglable.data.hideProps)
        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return this.selClose;
                },

                handler: function(e) {
                    e.preventDefault();
                    this.close();
                }

            }

        ],

        methods: {

            close: function() {
                var this$1 = this;

                this.toggleElement(this.$el).then(function () { return this$1.$destroy(true); });
            }

        }

    };

    var Video = {

        args: 'autoplay',

        props: {
            automute: Boolean,
            autoplay: Boolean
        },

        data: {
            automute: false,
            autoplay: true
        },

        computed: {

            inView: function(ref) {
                var autoplay = ref.autoplay;

                return autoplay === 'inview';
            }

        },

        connected: function() {

            if (this.inView && !hasAttr(this.$el, 'preload')) {
                this.$el.preload = 'none';
            }

            if (this.automute) {
                mute(this.$el);
            }

        },

        update: {

            read: function() {
                return {
                    visible: isVisible(this.$el) && css(this.$el, 'visibility') !== 'hidden',
                    inView: this.inView && isInView(this.$el)
                };
            },

            write: function(ref) {
                var visible = ref.visible;
                var inView = ref.inView;


                if (!visible || this.inView && !inView) {
                    pause(this.$el);
                } else if (this.autoplay === true || this.inView && inView) {
                    play(this.$el);
                }

            },

            events: ['resize', 'scroll']

        }

    };

    var cover = {

        mixins: [Class, Video],

        props: {
            width: Number,
            height: Number
        },

        data: {
            automute: true
        },

        update: {

            read: function() {

                var el = this.$el;
                var ref = getPositionedParent(el) || parent(el);
                var height = ref.offsetHeight;
                var width = ref.offsetWidth;
                var dim = Dimensions.cover(
                    {
                        width: this.width || el.naturalWidth || el.videoWidth || el.clientWidth,
                        height: this.height || el.naturalHeight || el.videoHeight || el.clientHeight
                    },
                    {
                        width: width + (width % 2 ? 1 : 0),
                        height: height + (height % 2 ? 1 : 0)
                    }
                );

                if (!dim.width || !dim.height) {
                    return false;
                }

                return dim;
            },

            write: function(ref) {
                var height = ref.height;
                var width = ref.width;

                css(this.$el, {height: height, width: width});
            },

            events: ['resize']

        }

    };

    function getPositionedParent(el) {
        while ((el = parent(el))) {
            if (css(el, 'position') !== 'static') {
                return el;
            }
        }
    }

    var Container = {

        props: {
            container: Boolean
        },

        data: {
            container: true
        },

        computed: {

            container: function(ref) {
                var container = ref.container;

                return container === true && this.$container || container && $(container);
            }

        }

    };

    var Position = {

        props: {
            pos: String,
            offset: null,
            flip: Boolean,
            clsPos: String
        },

        data: {
            pos: ("bottom-" + (!isRtl ? 'left' : 'right')),
            flip: true,
            offset: false,
            clsPos: ''
        },

        computed: {

            pos: function(ref) {
                var pos = ref.pos;

                return (pos + (!includes(pos, '-') ? '-center' : '')).split('-');
            },

            dir: function() {
                return this.pos[0];
            },

            align: function() {
                return this.pos[1];
            }

        },

        methods: {

            positionAt: function(element, target, boundary) {

                removeClasses(element, ((this.clsPos) + "-(top|bottom|left|right)(-[a-z]+)?"));

                var ref = this;
                var offset$1 = ref.offset;
                var axis = this.getAxis();

                if (!isNumeric(offset$1)) {
                    var node = $(offset$1);
                    offset$1 = node
                        ? offset(node)[axis === 'x' ? 'left' : 'top'] - offset(target)[axis === 'x' ? 'right' : 'bottom']
                        : 0;
                }

                var ref$1 = positionAt(
                    element,
                    target,
                    axis === 'x' ? ((flipPosition(this.dir)) + " " + (this.align)) : ((this.align) + " " + (flipPosition(this.dir))),
                    axis === 'x' ? ((this.dir) + " " + (this.align)) : ((this.align) + " " + (this.dir)),
                    axis === 'x' ? ("" + (this.dir === 'left' ? -offset$1 : offset$1)) : (" " + (this.dir === 'top' ? -offset$1 : offset$1)),
                    null,
                    this.flip,
                    boundary
                ).target;
                var x = ref$1.x;
                var y = ref$1.y;

                this.dir = axis === 'x' ? x : y;
                this.align = axis === 'x' ? y : x;

                toggleClass(element, ((this.clsPos) + "-" + (this.dir) + "-" + (this.align)), this.offset === false);

            },

            getAxis: function() {
                return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
            }

        }

    };

    var active$1;

    var drop = {

        mixins: [Container, Position, Togglable],

        args: 'pos',

        props: {
            mode: 'list',
            toggle: Boolean,
            boundary: Boolean,
            boundaryAlign: Boolean,
            delayShow: Number,
            delayHide: Number,
            clsDrop: String
        },

        data: {
            mode: ['click', 'hover'],
            toggle: '- *',
            boundary: true,
            boundaryAlign: false,
            delayShow: 0,
            delayHide: 800,
            clsDrop: false,
            animation: ['uk-animation-fade'],
            cls: 'uk-open',
            container: false
        },

        computed: {

            boundary: function(ref, $el) {
                var boundary = ref.boundary;

                return boundary === true ? window : query(boundary, $el);
            },

            clsDrop: function(ref) {
                var clsDrop = ref.clsDrop;

                return clsDrop || ("uk-" + (this.$options.name));
            },

            clsPos: function() {
                return this.clsDrop;
            }

        },

        created: function() {
            this.tracker = new MouseTracker();
        },

        connected: function() {

            addClass(this.$el, this.clsDrop);

            if (this.toggle && !this.target) {
                this.target = this.$create('toggle', query(this.toggle, this.$el), {
                    target: this.$el,
                    mode: this.mode
                });
            }

        },

        disconnected: function() {
            if (this.isActive()) {
                active$1 = null;
            }
        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return ("." + (this.clsDrop) + "-close");
                },

                handler: function(e) {
                    e.preventDefault();
                    this.hide(false);
                }

            },

            {

                name: 'click',

                delegate: function() {
                    return 'a[href^="#"]';
                },

                handler: function(ref) {
                    var defaultPrevented = ref.defaultPrevented;
                    var hash = ref.current.hash;

                    if (!defaultPrevented && hash && !within(hash, this.$el)) {
                        this.hide(false);
                    }
                }

            },

            {

                name: 'beforescroll',

                handler: function() {
                    this.hide(false);
                }

            },

            {

                name: 'toggle',

                self: true,

                handler: function(e, toggle) {

                    e.preventDefault();

                    if (this.isToggled()) {
                        this.hide(false);
                    } else {
                        this.show(toggle.$el, false);
                    }
                }

            },

            {

                name: 'toggleshow',

                self: true,

                handler: function(e, toggle) {
                    e.preventDefault();
                    this.show(toggle.$el);
                }

            },

            {

                name: 'togglehide',

                self: true,

                handler: function(e) {
                    e.preventDefault();
                    this.hide();
                }

            },

            {

                name: (pointerEnter + " focusin"),

                filter: function() {
                    return includes(this.mode, 'hover');
                },

                handler: function(e) {
                    if (!isTouch(e)) {
                        this.clearTimers();
                    }
                }

            },

            {

                name: (pointerLeave + " focusout"),

                filter: function() {
                    return includes(this.mode, 'hover');
                },

                handler: function(e) {
                    if (!isTouch(e) && e.relatedTarget) {
                        this.hide();
                    }
                }

            },

            {

                name: 'toggled',

                self: true,

                handler: function(e, toggled) {

                    if (!toggled) {
                        return;
                    }

                    this.clearTimers();
                    this.position();
                }

            },

            {

                name: 'show',

                self: true,

                handler: function() {
                    var this$1 = this;


                    active$1 = this;

                    this.tracker.init();

                    once(this.$el, 'hide', on(document, pointerDown, function (ref) {
                            var target = ref.target;

                            return !within(target, this$1.$el) && once(document, (pointerUp + " " + pointerCancel + " scroll"), function (ref) {
                            var defaultPrevented = ref.defaultPrevented;
                            var type = ref.type;
                            var newTarget = ref.target;

                            if (!defaultPrevented && type === pointerUp && target === newTarget && !(this$1.target && within(target, this$1.target))) {
                                this$1.hide(false);
                            }
                        }, true);
                    }
                    ), {self: true});

                    once(this.$el, 'hide', on(document, 'keydown', function (e) {
                        if (e.keyCode === 27) {
                            this$1.hide(false);
                        }
                    }), {self: true});

                }

            },

            {

                name: 'beforehide',

                self: true,

                handler: function() {
                    this.clearTimers();
                }

            },

            {

                name: 'hide',

                handler: function(ref) {
                    var target = ref.target;


                    if (this.$el !== target) {
                        active$1 = active$1 === null && within(target, this.$el) && this.isToggled() ? this : active$1;
                        return;
                    }

                    active$1 = this.isActive() ? null : active$1;
                    this.tracker.cancel();
                }

            }

        ],

        update: {

            write: function() {

                if (this.isToggled() && !hasClass(this.$el, this.clsEnter)) {
                    this.position();
                }

            },

            events: ['resize']

        },

        methods: {

            show: function(target, delay) {
                var this$1 = this;
                if ( target === void 0 ) target = this.target;
                if ( delay === void 0 ) delay = true;


                if (this.isToggled() && target && this.target && target !== this.target) {
                    this.hide(false);
                }

                this.target = target;

                this.clearTimers();

                if (this.isActive()) {
                    return;
                }

                if (active$1) {

                    if (delay && active$1.isDelaying) {
                        this.showTimer = setTimeout(this.show, 10);
                        return;
                    }

                    var prev;
                    while (active$1 && prev !== active$1 && !within(this.$el, active$1.$el)) {
                        prev = active$1;
                        active$1.hide(false);
                    }

                }

                if (this.container && parent(this.$el) !== this.container) {
                    append(this.container, this.$el);
                }

                this.showTimer = setTimeout(function () { return this$1.toggleElement(this$1.$el, true); }, delay && this.delayShow || 0);

            },

            hide: function(delay) {
                var this$1 = this;
                if ( delay === void 0 ) delay = true;


                var hide = function () { return this$1.toggleElement(this$1.$el, false, false); };

                this.clearTimers();

                this.isDelaying = getPositionedElements(this.$el).some(function (el) { return this$1.tracker.movesTo(el); });

                if (delay && this.isDelaying) {
                    this.hideTimer = setTimeout(this.hide, 50);
                } else if (delay && this.delayHide) {
                    this.hideTimer = setTimeout(hide, this.delayHide);
                } else {
                    hide();
                }
            },

            clearTimers: function() {
                clearTimeout(this.showTimer);
                clearTimeout(this.hideTimer);
                this.showTimer = null;
                this.hideTimer = null;
                this.isDelaying = false;
            },

            isActive: function() {
                return active$1 === this;
            },

            position: function() {

                removeClass(this.$el, ((this.clsDrop) + "-stack"));
                toggleClass(this.$el, ((this.clsDrop) + "-boundary"), this.boundaryAlign);

                var boundary = offset(this.boundary);
                var alignTo = this.boundaryAlign ? boundary : offset(this.target);

                if (this.align === 'justify') {
                    var prop = this.getAxis() === 'y' ? 'width' : 'height';
                    css(this.$el, prop, alignTo[prop]);
                } else if (this.boundary && this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
                    addClass(this.$el, ((this.clsDrop) + "-stack"));
                }

                this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.target, this.boundary);

            }

        }

    };

    function getPositionedElements(el) {
        var result = [];
        apply$1(el, function (el) { return css(el, 'position') !== 'static' && result.push(el); });
        return result;
    }

    var formCustom = {

        mixins: [Class],

        args: 'target',

        props: {
            target: Boolean
        },

        data: {
            target: false
        },

        computed: {

            input: function(_, $el) {
                return $(selInput, $el);
            },

            state: function() {
                return this.input.nextElementSibling;
            },

            target: function(ref, $el) {
                var target = ref.target;

                return target && (target === true
                    && parent(this.input) === $el
                    && this.input.nextElementSibling
                    || query(target, $el));
            }

        },

        update: function() {

            var ref = this;
            var target = ref.target;
            var input = ref.input;

            if (!target) {
                return;
            }

            var option;
            var prop = isInput(target) ? 'value' : 'textContent';
            var prev = target[prop];
            var value = input.files && input.files[0]
                ? input.files[0].name
                : matches(input, 'select') && (option = $$('option', input).filter(function (el) { return el.selected; })[0]) // eslint-disable-line prefer-destructuring
                    ? option.textContent
                    : input.value;

            if (prev !== value) {
                target[prop] = value;
            }

        },

        events: [

            {
                name: 'change',

                handler: function() {
                    this.$update();
                }
            },

            {
                name: 'reset',

                el: function() {
                    return closest(this.$el, 'form');
                },

                handler: function() {
                    this.$update();
                }
            }

        ]

    };

    // Deprecated
    var gif = {

        update: {

            read: function(data) {

                var inview = isInView(this.$el);

                if (!inview || data.isInView === inview) {
                    return false;
                }

                data.isInView = inview;
            },

            write: function() {
                this.$el.src = '' + this.$el.src; // force self-assign
            },

            events: ['scroll', 'resize']
        }

    };

    var Margin = {

        props: {
            margin: String,
            firstColumn: Boolean
        },

        data: {
            margin: 'uk-margin-small-top',
            firstColumn: 'uk-first-column'
        },

        update: {

            read: function() {

                var rows = getRows(this.$el.children);

                return {
                    rows: rows,
                    columns: getColumns(rows)
                };
            },

            write: function(ref) {
                var columns = ref.columns;
                var rows = ref.rows;

                for (var i = 0; i < rows.length; i++) {
                    for (var j = 0; j < rows[i].length; j++) {
                        toggleClass(rows[i][j], this.margin, i !== 0);
                        toggleClass(rows[i][j], this.firstColumn, !!~columns[0].indexOf(rows[i][j]));
                    }
                }
            },

            events: ['resize']

        }

    };

    function getRows(items) {
        return sortBy(items, 'top', 'bottom');
    }

    function getColumns(rows) {

        var columns = [];

        for (var i = 0; i < rows.length; i++) {
            var sorted = sortBy(rows[i], 'left', 'right');
            for (var j = 0; j < sorted.length; j++) {
                columns[j] = !columns[j] ? sorted[j] : columns[j].concat(sorted[j]);
            }
        }

        return isRtl
            ? columns.reverse()
            : columns;
    }

    function sortBy(items, startProp, endProp) {

        var sorted = [[]];

        for (var i = 0; i < items.length; i++) {

            var el = items[i];

            if (!isVisible(el)) {
                continue;
            }

            var dim = getOffset(el);

            for (var j = sorted.length - 1; j >= 0; j--) {

                var current = sorted[j];

                if (!current[0]) {
                    current.push(el);
                    break;
                }

                var startDim = (void 0);
                if (current[0].offsetParent === el.offsetParent) {
                    startDim = getOffset(current[0]);
                } else {
                    dim = getOffset(el, true);
                    startDim = getOffset(current[0], true);
                }

                if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
                    sorted.push([el]);
                    break;
                }

                if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
                    current.push(el);
                    break;
                }

                if (j === 0) {
                    sorted.unshift([el]);
                    break;
                }

            }

        }

        return sorted;
    }

    function getOffset(element, offset) {
        var assign;

        if ( offset === void 0 ) offset = false;

        var offsetTop = element.offsetTop;
        var offsetLeft = element.offsetLeft;
        var offsetHeight = element.offsetHeight;
        var offsetWidth = element.offsetWidth;

        if (offset) {
            (assign = offsetPosition(element), offsetTop = assign[0], offsetLeft = assign[1]);
        }

        return {
            top: offsetTop,
            left: offsetLeft,
            bottom: offsetTop + offsetHeight,
            right: offsetLeft + offsetWidth
        };
    }

    var grid = {

        extends: Margin,

        mixins: [Class],

        name: 'grid',

        props: {
            masonry: Boolean,
            parallax: Number
        },

        data: {
            margin: 'uk-grid-margin',
            clsStack: 'uk-grid-stack',
            masonry: false,
            parallax: 0
        },

        connected: function() {
            this.masonry && addClass(this.$el, 'uk-flex-top uk-flex-wrap-top');
        },

        update: [

            {

                write: function(ref) {
                    var columns = ref.columns;

                    toggleClass(this.$el, this.clsStack, columns.length < 2);
                },

                events: ['resize']

            },

            {

                read: function(data) {

                    var columns = data.columns;
                    var rows = data.rows;

                    // Filter component makes elements positioned absolute
                    if (!columns.length || !this.masonry && !this.parallax || positionedAbsolute(this.$el)) {
                        data.translates = false;
                        return false;
                    }

                    var translates = false;

                    var nodes = children(this.$el);
                    var columnHeights = getColumnHeights(columns);
                    var margin = getMarginTop(nodes, this.margin) * (rows.length - 1);
                    var elHeight = Math.max.apply(Math, columnHeights) + margin;

                    if (this.masonry) {
                        columns = columns.map(function (column) { return sortBy$1(column, 'offsetTop'); });
                        translates = getTranslates(rows, columns);
                    }

                    var padding = Math.abs(this.parallax);
                    if (padding) {
                        padding = columnHeights.reduce(function (newPadding, hgt, i) { return Math.max(newPadding, hgt + margin + (i % 2 ? padding : padding / 8) - elHeight); }
                            , 0);
                    }

                    return {padding: padding, columns: columns, translates: translates, height: translates ? elHeight : ''};

                },

                write: function(ref) {
                    var height = ref.height;
                    var padding = ref.padding;


                    css(this.$el, 'paddingBottom', padding || '');
                    height !== false && css(this.$el, 'height', height);

                },

                events: ['resize']

            },

            {

                read: function(ref) {
                    var height$1 = ref.height;


                    if (positionedAbsolute(this.$el)) {
                        return false;
                    }

                    return {
                        scrolled: this.parallax
                            ? scrolledOver(this.$el, height$1 ? height$1 - height(this.$el) : 0) * Math.abs(this.parallax)
                            : false
                    };
                },

                write: function(ref) {
                    var columns = ref.columns;
                    var scrolled = ref.scrolled;
                    var translates = ref.translates;


                    if (scrolled === false && !translates) {
                        return;
                    }

                    columns.forEach(function (column, i) { return column.forEach(function (el, j) { return css(el, 'transform', !scrolled && !translates ? '' : ("translateY(" + ((translates && -translates[i][j]) + (scrolled ? i % 2 ? scrolled : scrolled / 8 : 0)) + "px)")); }
                        ); }
                    );

                },

                events: ['scroll', 'resize']

            }

        ]

    };

    function positionedAbsolute(el) {
        return children(el).some(function (el) { return css(el, 'position') === 'absolute'; });
    }

    function getTranslates(rows, columns) {

        var rowHeights = rows.map(function (row) { return Math.max.apply(Math, row.map(function (el) { return el.offsetHeight; })); }
        );

        return columns.map(function (elements) {
            var prev = 0;
            return elements.map(function (element, row) { return prev += row
                    ? rowHeights[row - 1] - elements[row - 1].offsetHeight
                    : 0; }
            );
        });
    }

    function getMarginTop(nodes, cls) {

        var ref = nodes.filter(function (el) { return hasClass(el, cls); });
        var node = ref[0];

        return toFloat(node
            ? css(node, 'marginTop')
            : css(nodes[0], 'paddingLeft'));
    }

    function getColumnHeights(columns) {
        return columns.map(function (column) { return column.reduce(function (sum, el) { return sum + el.offsetHeight; }, 0); }
        );
    }

    // IE 11 fix (min-height on a flex container won't apply to its flex items)
    var FlexBug = isIE ? {

        props: {
            selMinHeight: String
        },

        data: {
            selMinHeight: false,
            forceHeight: false
        },

        computed: {

            elements: function(ref, $el) {
                var selMinHeight = ref.selMinHeight;

                return selMinHeight ? $$(selMinHeight, $el) : [$el];
            }

        },

        update: [

            {

                read: function() {
                    css(this.elements, 'height', '');
                },

                order: -5,

                events: ['resize']

            },

            {

                write: function() {
                    var this$1 = this;

                    this.elements.forEach(function (el) {
                        var height = toFloat(css(el, 'minHeight'));
                        if (height && (this$1.forceHeight || Math.round(height + boxModelAdjust(el, 'height', 'content-box')) >= el.offsetHeight)) {
                            css(el, 'height', height);
                        }
                    });
                },

                order: 5,

                events: ['resize']

            }

        ]

    } : {};

    var heightMatch = {

        mixins: [FlexBug],

        args: 'target',

        props: {
            target: String,
            row: Boolean
        },

        data: {
            target: '> *',
            row: true,
            forceHeight: true
        },

        computed: {

            elements: function(ref, $el) {
                var target = ref.target;

                return $$(target, $el);
            }

        },

        update: {

            read: function() {
                return {
                    rows: (this.row ? getRows(this.elements) : [this.elements]).map(match$1)
                };
            },

            write: function(ref) {
                var rows = ref.rows;

                rows.forEach(function (ref) {
                        var heights = ref.heights;
                        var elements = ref.elements;

                        return elements.forEach(function (el, i) { return css(el, 'minHeight', heights[i]); }
                    );
                }
                );
            },

            events: ['resize']

        }

    };

    function match$1(elements) {

        if (elements.length < 2) {
            return {heights: [''], elements: elements};
        }

        var heights = elements.map(getHeight);
        var max = Math.max.apply(Math, heights);
        var hasMinHeight = elements.some(function (el) { return el.style.minHeight; });
        var hasShrunk = elements.some(function (el, i) { return !el.style.minHeight && heights[i] < max; });

        if (hasMinHeight && hasShrunk) {
            css(elements, 'minHeight', '');
            heights = elements.map(getHeight);
            max = Math.max.apply(Math, heights);
        }

        heights = elements.map(function (el, i) { return heights[i] === max && toFloat(el.style.minHeight).toFixed(2) !== max.toFixed(2) ? '' : max; }
        );

        return {heights: heights, elements: elements};
    }

    function getHeight(element) {

        var style = false;
        if (!isVisible(element)) {
            style = element.style.display;
            css(element, 'display', 'block', 'important');
        }

        var height = dimensions(element).height - boxModelAdjust(element, 'height', 'content-box');

        if (style !== false) {
            css(element, 'display', style);
        }

        return height;
    }

    var heightViewport = {

        mixins: [FlexBug],

        props: {
            expand: Boolean,
            offsetTop: Boolean,
            offsetBottom: Boolean,
            minHeight: Number
        },

        data: {
            expand: false,
            offsetTop: false,
            offsetBottom: false,
            minHeight: 0
        },

        update: {

            read: function(ref) {
                var prev = ref.minHeight;


                if (!isVisible(this.$el)) {
                    return false;
                }

                var minHeight = '';
                var box = boxModelAdjust(this.$el, 'height', 'content-box');

                if (this.expand) {

                    minHeight = height(window) - (dimensions(document.documentElement).height - dimensions(this.$el).height) - box || '';

                } else {

                    // on mobile devices (iOS and Android) window.innerHeight !== 100vh
                    minHeight = 'calc(100vh';

                    if (this.offsetTop) {

                        var ref$1 = offset(this.$el);
                        var top = ref$1.top;
                        minHeight += top > 0 && top < height(window) / 2 ? (" - " + top + "px") : '';

                    }

                    if (this.offsetBottom === true) {

                        minHeight += " - " + (dimensions(this.$el.nextElementSibling).height) + "px";

                    } else if (isNumeric(this.offsetBottom)) {

                        minHeight += " - " + (this.offsetBottom) + "vh";

                    } else if (this.offsetBottom && endsWith(this.offsetBottom, 'px')) {

                        minHeight += " - " + (toFloat(this.offsetBottom)) + "px";

                    } else if (isString(this.offsetBottom)) {

                        minHeight += " - " + (dimensions(query(this.offsetBottom, this.$el)).height) + "px";

                    }

                    minHeight += (box ? (" - " + box + "px") : '') + ")";

                }

                return {minHeight: minHeight, prev: prev};
            },

            write: function(ref) {
                var minHeight = ref.minHeight;
                var prev = ref.prev;


                css(this.$el, {minHeight: minHeight});

                if (minHeight !== prev) {
                    this.$update(this.$el, 'resize');
                }

                if (this.minHeight && toFloat(css(this.$el, 'minHeight')) < this.minHeight) {
                    css(this.$el, 'minHeight', this.minHeight);
                }

            },

            events: ['resize']

        }

    };

    var SVG = {

        args: 'src',

        props: {
            id: Boolean,
            icon: String,
            src: String,
            style: String,
            width: Number,
            height: Number,
            ratio: Number,
            class: String,
            strokeAnimation: Boolean,
            focusable: Boolean, // IE 11
            attributes: 'list'
        },

        data: {
            ratio: 1,
            include: ['style', 'class', 'focusable'],
            class: '',
            strokeAnimation: false
        },

        beforeConnect: function() {
            this.class += ' uk-svg';
        },

        connected: function() {
            var this$1 = this;
            var assign;


            if (!this.icon && includes(this.src, '#')) {
                (assign = this.src.split('#'), this.src = assign[0], this.icon = assign[1]);
            }

            this.svg = this.getSvg().then(function (el) {

                if (this$1._connected) {

                    var svg = insertSVG(el, this$1.$el);

                    if (this$1.svgEl && svg !== this$1.svgEl) {
                        remove$1(this$1.svgEl);
                    }

                    this$1.applyAttributes(svg, el);
                    this$1.$emit();
                    return this$1.svgEl = svg;
                }

            }, noop);

        },

        disconnected: function() {
            var this$1 = this;


            this.svg.then(function (svg) {
                if (!this$1._connected) {

                    if (isVoidElement(this$1.$el)) {
                        this$1.$el.hidden = false;
                    }

                    remove$1(svg);
                    this$1.svgEl = null;
                }
            });

            this.svg = null;

        },

        update: {

            read: function() {
                return !!(this.strokeAnimation && this.svgEl && isVisible(this.svgEl));
            },

            write: function() {
                applyAnimation(this.svgEl);
            },

            type: ['resize']

        },

        methods: {

            getSvg: function() {
                var this$1 = this;

                return loadSVG(this.src).then(function (svg) { return parseSVG(svg, this$1.icon) || Promise$1.reject('SVG not found.'); }
                );
            },

            applyAttributes: function(el, ref) {
                var this$1 = this;


                for (var prop in this.$options.props) {
                    if (includes(this.include, prop) && (prop in this)) {
                        attr(el, prop, this[prop]);
                    }
                }

                for (var attribute in this.attributes) {
                    var ref$1 = this.attributes[attribute].split(':', 2);
                    var prop$1 = ref$1[0];
                    var value = ref$1[1];
                    attr(el, prop$1, value);
                }

                if (!this.id) {
                    removeAttr(el, 'id');
                }

                var props = ['width', 'height'];
                var dimensions = props.map(function (prop) { return this$1[prop]; });

                if (!dimensions.some(function (val) { return val; })) {
                    dimensions = props.map(function (prop) { return attr(ref, prop); });
                }

                var viewBox = attr(ref, 'viewBox');
                if (viewBox && !dimensions.some(function (val) { return val; })) {
                    dimensions = viewBox.split(' ').slice(2);
                }

                dimensions.forEach(function (val, i) { return attr(el, props[i], toFloat(val) * this$1.ratio || null); }
                );

            }

        }

    };

    var loadSVG = memoize(function (src) { return new Promise$1(function (resolve, reject) {

            if (!src) {
                reject();
                return;
            }

            if (startsWith(src, 'data:')) {
                resolve(decodeURIComponent(src.split(',')[1]));
            } else {

                ajax(src).then(
                    function (xhr) { return resolve(xhr.response); },
                    function () { return reject('SVG not found.'); }
                );

            }
        }); }
    );

    function parseSVG(svg, icon) {

        if (icon && includes(svg, '<symbol')) {
            svg = parseSymbols(svg, icon) || svg;
        }

        svg = $(svg.substr(svg.indexOf('<svg')));
        return svg && svg.hasChildNodes() && svg;
    }

    var symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
    var symbols = {};

    function parseSymbols(svg, icon) {

        if (!symbols[svg]) {

            symbols[svg] = {};

            symbolRe.lastIndex = 0;

            var match;
            while ((match = symbolRe.exec(svg))) {
                symbols[svg][match[3]] = "<svg xmlns=\"http://www.w3.org/2000/svg\"" + (match[1]) + "svg>";
            }

        }

        return symbols[svg][icon];
    }

    function applyAnimation(el) {

        var length = getMaxPathLength(el);

        if (length) {
            el.style.setProperty('--uk-animation-stroke', length);
        }

    }

    function getMaxPathLength(el) {
        return Math.ceil(Math.max.apply(Math, [ 0 ].concat( $$('[stroke]', el).map(function (stroke) {
            try {
                return stroke.getTotalLength();
            } catch (e) {
                return 0;
            }
        }) )));
    }

    function insertSVG(el, root) {

        if (isVoidElement(root) || root.tagName === 'CANVAS') {

            root.hidden = true;

            var next = root.nextElementSibling;
            return equals(el, next)
                ? next
                : after(root, el);

        }

        var last = root.lastElementChild;
        return equals(el, last)
            ? last
            : append(root, el);
    }

    function equals(el, other) {
        return isSVG(el) && isSVG(other) && innerHTML(el) === innerHTML(other);
    }

    function isSVG(el) {
        return el && el.tagName === 'svg';
    }

    function innerHTML(el) {
        return (el.innerHTML || (new XMLSerializer()).serializeToString(el).replace(/<svg.*?>(.*?)<\/svg>/g, '$1')).replace(/\s/g, '');
    }

    var closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";

    var closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";

    var marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"/><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"/></svg>";

    var navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect y=\"9\" width=\"20\" height=\"2\"/><rect y=\"3\" width=\"20\" height=\"2\"/><rect y=\"15\" width=\"20\" height=\"2\"/></svg>";

    var overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"/><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"/></svg>";

    var paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";

    var paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";

    var searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";

    var searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";

    var searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";

    var slidenavNext = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1 \"/></svg>";

    var slidenavNextLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5 \"/></svg>";

    var slidenavPrevious = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23 \"/></svg>";

    var slidenavPreviousLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547 \"/></svg>";

    var spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";

    var totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9 \"/></svg>";

    var icons = {
        spinner: spinner,
        totop: totop,
        marker: marker,
        'close-icon': closeIcon,
        'close-large': closeLarge,
        'navbar-toggle-icon': navbarToggleIcon,
        'overlay-icon': overlayIcon,
        'pagination-next': paginationNext,
        'pagination-previous': paginationPrevious,
        'search-icon': searchIcon,
        'search-large': searchLarge,
        'search-navbar': searchNavbar,
        'slidenav-next': slidenavNext,
        'slidenav-next-large': slidenavNextLarge,
        'slidenav-previous': slidenavPrevious,
        'slidenav-previous-large': slidenavPreviousLarge
    };

    var Icon = {

        install: install$3,

        extends: SVG,

        args: 'icon',

        props: ['icon'],

        data: {
            include: ['focusable']
        },

        isIcon: true,

        beforeConnect: function() {
            addClass(this.$el, 'uk-icon');
        },

        methods: {

            getSvg: function() {

                var icon = getIcon(this.icon);

                if (!icon) {
                    return Promise$1.reject('Icon not found.');
                }

                return Promise$1.resolve(icon);
            }

        }

    };

    var IconComponent = {

        args: false,

        extends: Icon,

        data: function (vm) { return ({
            icon: hyphenate(vm.constructor.options.name)
        }); },

        beforeConnect: function() {
            addClass(this.$el, this.$name);
        }

    };

    var Slidenav = {

        extends: IconComponent,

        beforeConnect: function() {
            addClass(this.$el, 'uk-slidenav');
        },

        computed: {

            icon: function(ref, $el) {
                var icon = ref.icon;

                return hasClass($el, 'uk-slidenav-large')
                    ? (icon + "-large")
                    : icon;
            }

        }

    };

    var Search = {

        extends: IconComponent,

        computed: {

            icon: function(ref, $el) {
                var icon = ref.icon;

                return hasClass($el, 'uk-search-icon') && parents($el, '.uk-search-large').length
                    ? 'search-large'
                    : parents($el, '.uk-search-navbar').length
                        ? 'search-navbar'
                        : icon;
            }

        }

    };

    var Close = {

        extends: IconComponent,

        computed: {

            icon: function() {
                return ("close-" + (hasClass(this.$el, 'uk-close-large') ? 'large' : 'icon'));
            }

        }

    };

    var Spinner = {

        extends: IconComponent,

        connected: function() {
            var this$1 = this;

            this.svg.then(function (svg) { return svg && this$1.ratio !== 1 && css($('circle', svg), 'strokeWidth', 1 / this$1.ratio); });
        }

    };

    var parsed = {};
    function install$3(UIkit) {
        UIkit.icon.add = function (name, svg) {
            var obj;


            var added = isString(name) ? (( obj = {}, obj[name] = svg, obj )) : name;
            each(added, function (svg, name) {
                icons[name] = svg;
                delete parsed[name];
            });

            if (UIkit._initialized) {
                apply$1(document.body, function (el) { return each(UIkit.getComponents(el), function (cmp) {
                        cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
                    }); }
                );
            }
        };
    }

    function getIcon(icon) {

        if (!icons[icon]) {
            return null;
        }

        if (!parsed[icon]) {
            parsed[icon] = $((icons[applyRtl(icon)] || icons[icon]).trim());
        }

        return parsed[icon].cloneNode(true);
    }

    function applyRtl(icon) {
        return isRtl ? swap(swap(icon, 'left', 'right'), 'previous', 'next') : icon;
    }

    var img = {

        args: 'dataSrc',

        props: {
            dataSrc: String,
            dataSrcset: Boolean,
            sizes: String,
            width: Number,
            height: Number,
            offsetTop: String,
            offsetLeft: String,
            target: String
        },

        data: {
            dataSrc: '',
            dataSrcset: false,
            sizes: false,
            width: false,
            height: false,
            offsetTop: '50vh',
            offsetLeft: '50vw',
            target: false
        },

        computed: {

            cacheKey: function(ref) {
                var dataSrc = ref.dataSrc;

                return ((this.$name) + "." + dataSrc);
            },

            width: function(ref) {
                var width = ref.width;
                var dataWidth = ref.dataWidth;

                return width || dataWidth;
            },

            height: function(ref) {
                var height = ref.height;
                var dataHeight = ref.dataHeight;

                return height || dataHeight;
            },

            sizes: function(ref) {
                var sizes = ref.sizes;
                var dataSizes = ref.dataSizes;

                return sizes || dataSizes;
            },

            isImg: function(_, $el) {
                return isImg($el);
            },

            target: {

                get: function(ref) {
                    var target = ref.target;

                    return [this.$el ].concat( queryAll(target, this.$el));
                },

                watch: function() {
                    this.observe();
                }

            },

            offsetTop: function(ref) {
                var offsetTop = ref.offsetTop;

                return toPx(offsetTop, 'height');
            },

            offsetLeft: function(ref) {
                var offsetLeft = ref.offsetLeft;

                return toPx(offsetLeft, 'width');
            }

        },

        connected: function() {

            if (!window.IntersectionObserver) {
                setSrcAttrs(this.$el, this.dataSrc, this.dataSrcset, this.sizes);
                return;
            }

            if (storage[this.cacheKey]) {
                setSrcAttrs(this.$el, storage[this.cacheKey], this.dataSrcset, this.sizes);
            } else if (this.isImg && this.width && this.height) {
                setSrcAttrs(this.$el, getPlaceholderImage(this.width, this.height, this.sizes));
            }

            this.observer = new IntersectionObserver(this.load, {
                rootMargin: ((this.offsetTop) + "px " + (this.offsetLeft) + "px")
            });

            requestAnimationFrame(this.observe);

        },

        disconnected: function() {
            this.observer && this.observer.disconnect();
        },

        update: {

            read: function(ref) {
                var this$1 = this;
                var image = ref.image;


                if (!this.observer) {
                    return false;
                }

                if (!image && document.readyState === 'complete') {
                    this.load(this.observer.takeRecords());
                }

                if (this.isImg) {
                    return false;
                }

                image && image.then(function (img) { return img && img.currentSrc !== '' && setSrcAttrs(this$1.$el, currentSrc(img)); });

            },

            write: function(data) {

                if (this.dataSrcset && window.devicePixelRatio !== 1) {

                    var bgSize = css(this.$el, 'backgroundSize');
                    if (bgSize.match(/^(auto\s?)+$/) || toFloat(bgSize) === data.bgSize) {
                        data.bgSize = getSourceSize(this.dataSrcset, this.sizes);
                        css(this.$el, 'backgroundSize', ((data.bgSize) + "px"));
                    }

                }

            },

            events: ['resize']

        },

        methods: {

            load: function(entries) {
                var this$1 = this;


                // Old chromium based browsers (UC Browser) did not implement `isIntersecting`
                if (!entries.some(function (entry) { return isUndefined(entry.isIntersecting) || entry.isIntersecting; })) {
                    return;
                }

                this._data.image = getImage(this.dataSrc, this.dataSrcset, this.sizes).then(function (img) {

                    setSrcAttrs(this$1.$el, currentSrc(img), img.srcset, img.sizes);
                    storage[this$1.cacheKey] = currentSrc(img);
                    return img;

                }, function (e) { return trigger(this$1.$el, new e.constructor(e.type, e)); });

                this.observer.disconnect();
            },

            observe: function() {
                var this$1 = this;

                if (this._connected && !this._data.image) {
                    this.target.forEach(function (el) { return this$1.observer.observe(el); });
                }
            }

        }

    };

    function setSrcAttrs(el, src, srcset, sizes) {

        if (isImg(el)) {
            var set = function (prop, val) { return val && val !== el[prop] && (el[prop] = val); };
            set('sizes', sizes);
            set('srcset', srcset);
            set('src', src);
        } else if (src) {

            var change = !includes(el.style.backgroundImage, src);
            if (change) {
                css(el, 'backgroundImage', ("url(" + (escape(src)) + ")"));
                trigger(el, createEvent('load', false));
            }

        }

    }

    function getPlaceholderImage(width, height, sizes) {
        var assign;


        if (sizes) {
            ((assign = Dimensions.ratio({width: width, height: height}, 'width', toPx(sizesToPixel(sizes))), width = assign.width, height = assign.height));
        }

        return ("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "\" height=\"" + height + "\"></svg>");
    }

    var sizesRe = /\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;
    function sizesToPixel(sizes) {
        var matches;

        sizesRe.lastIndex = 0;

        while ((matches = sizesRe.exec(sizes))) {
            if (!matches[1] || window.matchMedia(matches[1]).matches) {
                matches = evaluateSize(matches[2]);
                break;
            }
        }

        return matches || '100vw';
    }

    var sizeRe = /\d+(?:\w+|%)/g;
    var additionRe = /[+-]?(\d+)/g;
    function evaluateSize(size) {
        return startsWith(size, 'calc')
            ? size
                .slice(5, -1)
                .replace(sizeRe, function (size) { return toPx(size); })
                .replace(/ /g, '')
                .match(additionRe)
                .reduce(function (a, b) { return a + +b; }, 0)
            : size;
    }

    var srcSetRe = /\s+\d+w\s*(?:,|$)/g;
    function getSourceSize(srcset, sizes) {
        var srcSize = toPx(sizesToPixel(sizes));
        var descriptors = (srcset.match(srcSetRe) || []).map(toFloat).sort(function (a, b) { return a - b; });

        return descriptors.filter(function (size) { return size >= srcSize; })[0] || descriptors.pop() || '';
    }

    function isImg(el) {
        return el.tagName === 'IMG';
    }

    function currentSrc(el) {
        return el.currentSrc || el.src;
    }

    var key = '__test__';
    var storage;

    // workaround for Safari's private browsing mode and accessing sessionStorage in Blink
    try {
        storage = window.sessionStorage || {};
        storage[key] = 1;
        delete storage[key];
    } catch (e) {
        storage = {};
    }

    var Media = {

        props: {
            media: Boolean
        },

        data: {
            media: false
        },

        computed: {

            matchMedia: function() {
                var media = toMedia(this.media);
                return !media || window.matchMedia(media).matches;
            }

        }

    };

    function toMedia(value) {

        if (isString(value)) {
            if (value[0] === '@') {
                var name = "breakpoint-" + (value.substr(1));
                value = toFloat(getCssVar(name));
            } else if (isNaN(value)) {
                return value;
            }
        }

        return value && !isNaN(value) ? ("(min-width: " + value + "px)") : false;
    }

    var leader = {

        mixins: [Class, Media],

        props: {
            fill: String
        },

        data: {
            fill: '',
            clsWrapper: 'uk-leader-fill',
            clsHide: 'uk-leader-hide',
            attrFill: 'data-fill'
        },

        computed: {

            fill: function(ref) {
                var fill = ref.fill;

                return fill || getCssVar('leader-fill-content');
            }

        },

        connected: function() {
            var assign;

            (assign = wrapInner(this.$el, ("<span class=\"" + (this.clsWrapper) + "\">")), this.wrapper = assign[0]);
        },

        disconnected: function() {
            unwrap(this.wrapper.childNodes);
        },

        update: {

            read: function(ref) {
                var changed = ref.changed;
                var width = ref.width;


                var prev = width;

                width = Math.floor(this.$el.offsetWidth / 2);

                return {
                    width: width,
                    fill: this.fill,
                    changed: changed || prev !== width,
                    hide: !this.matchMedia
                };
            },

            write: function(data) {

                toggleClass(this.wrapper, this.clsHide, data.hide);

                if (data.changed) {
                    data.changed = false;
                    attr(this.wrapper, this.attrFill, new Array(data.width).join(data.fill));
                }

            },

            events: ['resize']

        }

    };

    var active = [];

    var Modal = {

        mixins: [Class, Container, Togglable],

        props: {
            selPanel: String,
            selClose: String,
            escClose: Boolean,
            bgClose: Boolean,
            stack: Boolean
        },

        data: {
            cls: 'uk-open',
            escClose: true,
            bgClose: true,
            overlay: true,
            stack: false
        },

        computed: {

            panel: function(ref, $el) {
                var selPanel = ref.selPanel;

                return $(selPanel, $el);
            },

            transitionElement: function() {
                return this.panel;
            },

            bgClose: function(ref) {
                var bgClose = ref.bgClose;

                return bgClose && this.panel;
            }

        },

        beforeDisconnect: function() {
            if (this.isToggled()) {
                this.toggleElement(this.$el, false, false);
            }
        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return this.selClose;
                },

                handler: function(e) {
                    e.preventDefault();
                    this.hide();
                }

            },

            {

                name: 'toggle',

                self: true,

                handler: function(e) {

                    if (e.defaultPrevented) {
                        return;
                    }

                    e.preventDefault();

                    if (this.isToggled() === includes(active, this)) {
                        this.toggle();
                    }
                }

            },

            {
                name: 'beforeshow',

                self: true,

                handler: function(e) {

                    if (includes(active, this)) {
                        return false;
                    }

                    if (!this.stack && active.length) {
                        Promise$1.all(active.map(function (modal) { return modal.hide(); })).then(this.show);
                        e.preventDefault();
                    } else {
                        active.push(this);
                    }
                }

            },

            {

                name: 'show',

                self: true,

                handler: function() {
                    var this$1 = this;


                    var docEl = document.documentElement;

                    if (width(window) > docEl.clientWidth && this.overlay) {
                        css(document.body, 'overflowY', 'scroll');
                    }

                    if (this.stack) {
                        css(this.$el, 'zIndex', toFloat(css(this.$el, 'zIndex')) + active.length);
                    }

                    addClass(docEl, this.clsPage);

                    if (this.bgClose) {
                        once(this.$el, 'hide', on(document, pointerDown, function (ref) {
                            var target = ref.target;


                            if (last(active) !== this$1 || this$1.overlay && !within(target, this$1.$el) || within(target, this$1.panel)) {
                                return;
                            }

                            once(document, (pointerUp + " " + pointerCancel + " scroll"), function (ref) {
                                var defaultPrevented = ref.defaultPrevented;
                                var type = ref.type;
                                var newTarget = ref.target;

                                if (!defaultPrevented && type === pointerUp && target === newTarget) {
                                    this$1.hide();
                                }
                            }, true);

                        }), {self: true});
                    }

                    if (this.escClose) {
                        once(this.$el, 'hide', on(document, 'keydown', function (e) {
                            if (e.keyCode === 27 && last(active) === this$1) {
                                this$1.hide();
                            }
                        }), {self: true});
                    }
                }

            },

            {

                name: 'hidden',

                self: true,

                handler: function() {
                    var this$1 = this;


                    if (includes(active, this)) {
                        active.splice(active.indexOf(this), 1);
                    }

                    if (!active.length) {
                        css(document.body, 'overflowY', '');
                    }

                    css(this.$el, 'zIndex', '');

                    if (!active.some(function (modal) { return modal.clsPage === this$1.clsPage; })) {
                        removeClass(document.documentElement, this.clsPage);
                    }

                }

            }

        ],

        methods: {

            toggle: function() {
                return this.isToggled() ? this.hide() : this.show();
            },

            show: function() {
                var this$1 = this;

                if (this.container && parent(this.$el) !== this.container) {
                    append(this.container, this.$el);
                    return new Promise$1(function (resolve) { return requestAnimationFrame(function () { return this$1.show().then(resolve); }
                        ); }
                    );
                }

                return this.toggleElement(this.$el, true, animate(this));
            },

            hide: function() {
                return this.toggleElement(this.$el, false, animate(this));
            }

        }

    };

    function animate(ref) {
        var transitionElement = ref.transitionElement;
        var _toggle = ref._toggle;

        return function (el, show) { return new Promise$1(function (resolve, reject) { return once(el, 'show hide', function () {
                    el._reject && el._reject();
                    el._reject = reject;

                    _toggle(el, show);

                    var off = once(transitionElement, 'transitionstart', function () {
                        once(transitionElement, 'transitionend transitioncancel', resolve, {self: true});
                        clearTimeout(timer);
                    }, {self: true});

                    var timer = setTimeout(function () {
                        off();
                        resolve();
                    }, toMs(css(transitionElement, 'transitionDuration')));

                }); }
            ).then(function () { return delete el._reject; }); };
    }

    var modal = {

        install: install$2,

        mixins: [Modal],

        data: {
            clsPage: 'uk-modal-page',
            selPanel: '.uk-modal-dialog',
            selClose: '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full'
        },

        events: [

            {
                name: 'show',

                self: true,

                handler: function() {

                    if (hasClass(this.panel, 'uk-margin-auto-vertical')) {
                        addClass(this.$el, 'uk-flex');
                    } else {
                        css(this.$el, 'display', 'block');
                    }

                    height(this.$el); // force reflow
                }
            },

            {
                name: 'hidden',

                self: true,

                handler: function() {

                    css(this.$el, 'display', '');
                    removeClass(this.$el, 'uk-flex');

                }
            }

        ]

    };

    function install$2(ref) {
        var modal = ref.modal;


        modal.dialog = function (content, options) {

            var dialog = modal(
                ("<div class=\"uk-modal\"> <div class=\"uk-modal-dialog\">" + content + "</div> </div>"),
                options
            );

            dialog.show();

            on(dialog.$el, 'hidden', function () { return Promise$1.resolve().then(function () { return dialog.$destroy(true); }
                ); }, {self: true}
            );

            return dialog;
        };

        modal.alert = function (message, options) {
            return openDialog(
                function (ref) {
                    var labels = ref.labels;

                    return ("<div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-primary uk-modal-close\" autofocus>" + (labels.ok) + "</button> </div>");
            },
                options,
                function (deferred) { return deferred.resolve(); }
            );
        };

        modal.confirm = function (message, options) {
            return openDialog(
                function (ref) {
                    var labels = ref.labels;

                    return ("<form> <div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">" + (labels.cancel) + "</button> <button class=\"uk-button uk-button-primary\" autofocus>" + (labels.ok) + "</button> </div> </form>");
            },
                options,
                function (deferred) { return deferred.reject(); }
            );
        };

        modal.prompt = function (message, value, options) {
            return openDialog(
                function (ref) {
                    var labels = ref.labels;

                    return ("<form class=\"uk-form-stacked\"> <div class=\"uk-modal-body\"> <label>" + (isString(message) ? message : html(message)) + "</label> <input class=\"uk-input\" value=\"" + (value || '') + "\" autofocus> </div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">" + (labels.cancel) + "</button> <button class=\"uk-button uk-button-primary\">" + (labels.ok) + "</button> </div> </form>");
            },
                options,
                function (deferred) { return deferred.resolve(null); },
                function (dialog) { return $('input', dialog.$el).value; }
            );
        };

        modal.labels = {
            ok: 'Ok',
            cancel: 'Cancel'
        };

        function openDialog(tmpl, options, hideFn, submitFn) {

            options = assign({bgClose: false, escClose: true, labels: modal.labels}, options);

            var dialog = modal.dialog(tmpl(options), options);
            var deferred = new Deferred();

            var resolved = false;

            on(dialog.$el, 'submit', 'form', function (e) {
                e.preventDefault();
                deferred.resolve(submitFn && submitFn(dialog));
                resolved = true;
                dialog.hide();
            });

            on(dialog.$el, 'hide', function () { return !resolved && hideFn(deferred); });

            deferred.promise.dialog = dialog;

            return deferred.promise;
        }

    }

    var nav = {

        extends: Accordion,

        data: {
            targets: '> .uk-parent',
            toggle: '> a',
            content: '> ul'
        }

    };

    var navItem = '.uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle';

    var navbar = {

        mixins: [Class, Container, FlexBug],

        props: {
            dropdown: String,
            mode: 'list',
            align: String,
            offset: Number,
            boundary: Boolean,
            boundaryAlign: Boolean,
            clsDrop: String,
            delayShow: Number,
            delayHide: Number,
            dropbar: Boolean,
            dropbarMode: String,
            dropbarAnchor: Boolean,
            duration: Number
        },

        data: {
            dropdown: navItem,
            align: !isRtl ? 'left' : 'right',
            clsDrop: 'uk-navbar-dropdown',
            mode: undefined,
            offset: undefined,
            delayShow: undefined,
            delayHide: undefined,
            boundaryAlign: undefined,
            flip: 'x',
            boundary: true,
            dropbar: false,
            dropbarMode: 'slide',
            dropbarAnchor: false,
            duration: 200,
            forceHeight: true,
            selMinHeight: navItem,
            container: false
        },

        computed: {

            boundary: function(ref, $el) {
                var boundary = ref.boundary;
                var boundaryAlign = ref.boundaryAlign;

                return (boundary === true || boundaryAlign) ? $el : boundary;
            },

            dropbarAnchor: function(ref, $el) {
                var dropbarAnchor = ref.dropbarAnchor;

                return query(dropbarAnchor, $el);
            },

            pos: function(ref) {
                var align = ref.align;

                return ("bottom-" + align);
            },

            dropbar: {

                get: function(ref) {
                    var dropbar = ref.dropbar;


                    if (!dropbar) {
                        return null;
                    }

                    dropbar = this._dropbar || query(dropbar, this.$el) || $('+ .uk-navbar-dropbar', this.$el);

                    return dropbar ? dropbar : (this._dropbar = $('<div></div>'));

                },

                watch: function(dropbar) {
                    addClass(dropbar, 'uk-navbar-dropbar');
                },

                immediate: true

            },

            dropContainer: function(_, $el) {
                return this.container || $el;
            },

            dropdowns: {

                get: function(ref, $el) {
                    var clsDrop = ref.clsDrop;

                    var dropdowns = $$(("." + clsDrop), $el);

                    if (this.container !== $el) {
                        $$(("." + clsDrop), this.container).forEach(function (el) { return !includes(dropdowns, el) && dropdowns.push(el); });
                    }

                    return dropdowns;
                },

                watch: function(dropdowns) {
                    var this$1 = this;

                    this.$create(
                        'drop',
                        dropdowns.filter(function (el) { return !this$1.getDropdown(el); }),
                        assign({}, this.$props, {boundary: this.boundary, pos: this.pos, offset: this.dropbar || this.offset})
                    );
                },

                immediate: true

            }

        },

        disconnected: function() {
            this.dropbar && remove$1(this.dropbar);
            delete this._dropbar;
        },

        events: [

            {
                name: 'mouseover',

                delegate: function() {
                    return this.dropdown;
                },

                handler: function(ref) {
                    var current = ref.current;

                    var active = this.getActive();
                    if (active && active.target && !within(active.target, current) && !active.tracker.movesTo(active.$el)) {
                        active.hide(false);
                    }
                }

            },

            {
                name: 'mouseleave',

                el: function() {
                    return this.dropbar;
                },

                handler: function() {
                    var active = this.getActive();

                    if (active && !this.dropdowns.some(function (el) { return matches(el, ':hover'); })) {
                        active.hide();
                    }
                }
            },

            {
                name: 'beforeshow',

                el: function() {
                    return this.dropContainer;
                },

                filter: function() {
                    return this.dropbar;
                },

                handler: function() {

                    if (!parent(this.dropbar)) {
                        after(this.dropbarAnchor || this.$el, this.dropbar);
                    }

                }
            },

            {
                name: 'show',

                el: function() {
                    return this.dropContainer;
                },

                filter: function() {
                    return this.dropbar;
                },

                handler: function(_, ref) {
                    var $el = ref.$el;
                    var dir = ref.dir;

                    if (!hasClass($el, this.clsDrop)) {
                        return;
                    }

                    if (this.dropbarMode === 'slide') {
                        addClass(this.dropbar, 'uk-navbar-dropbar-slide');
                    }

                    this.clsDrop && addClass($el, ((this.clsDrop) + "-dropbar"));

                    if (dir === 'bottom') {
                        this.transitionTo($el.offsetHeight + toFloat(css($el, 'marginTop')) + toFloat(css($el, 'marginBottom')), $el);
                    }
                }
            },

            {
                name: 'beforehide',

                el: function() {
                    return this.dropContainer;
                },

                filter: function() {
                    return this.dropbar;
                },

                handler: function(e, ref) {
                    var $el = ref.$el;


                    var active = this.getActive();

                    if (matches(this.dropbar, ':hover') && active && active.$el === $el) {
                        e.preventDefault();
                    }
                }
            },

            {
                name: 'hide',

                el: function() {
                    return this.dropContainer;
                },

                filter: function() {
                    return this.dropbar;
                },

                handler: function(_, ref) {
                    var $el = ref.$el;

                    if (!hasClass($el, this.clsDrop)) {
                        return;
                    }

                    var active = this.getActive();

                    if (!active || active && active.$el === $el) {
                        this.transitionTo(0);
                    }
                }
            }

        ],

        methods: {

            getActive: function() {
                return active$1 && includes(active$1.mode, 'hover') && within(active$1.target, this.$el) && active$1;
            },

            transitionTo: function(newHeight, el) {
                var this$1 = this;


                var ref = this;
                var dropbar = ref.dropbar;
                var oldHeight = isVisible(dropbar) ? height(dropbar) : 0;

                el = oldHeight < newHeight && el;

                css(el, 'clip', ("rect(0," + (el.offsetWidth) + "px," + oldHeight + "px,0)"));

                height(dropbar, oldHeight);

                Transition.cancel([el, dropbar]);
                return Promise$1.all([
                    Transition.start(dropbar, {height: newHeight}, this.duration),
                    Transition.start(el, {clip: ("rect(0," + (el.offsetWidth) + "px," + newHeight + "px,0)")}, this.duration)
                ])
                    .catch(noop)
                    .then(function () {
                        css(el, {clip: ''});
                        this$1.$update(dropbar);
                    });
            },

            getDropdown: function(el) {
                return this.$getComponent(el, 'drop') || this.$getComponent(el, 'dropdown');
            }

        }

    };

    var offcanvas = {

        mixins: [Modal],

        args: 'mode',

        props: {
            mode: String,
            flip: Boolean,
            overlay: Boolean
        },

        data: {
            mode: 'slide',
            flip: false,
            overlay: false,
            clsPage: 'uk-offcanvas-page',
            clsContainer: 'uk-offcanvas-container',
            selPanel: '.uk-offcanvas-bar',
            clsFlip: 'uk-offcanvas-flip',
            clsContainerAnimation: 'uk-offcanvas-container-animation',
            clsSidebarAnimation: 'uk-offcanvas-bar-animation',
            clsMode: 'uk-offcanvas',
            clsOverlay: 'uk-offcanvas-overlay',
            selClose: '.uk-offcanvas-close',
            container: false
        },

        computed: {

            clsFlip: function(ref) {
                var flip = ref.flip;
                var clsFlip = ref.clsFlip;

                return flip ? clsFlip : '';
            },

            clsOverlay: function(ref) {
                var overlay = ref.overlay;
                var clsOverlay = ref.clsOverlay;

                return overlay ? clsOverlay : '';
            },

            clsMode: function(ref) {
                var mode = ref.mode;
                var clsMode = ref.clsMode;

                return (clsMode + "-" + mode);
            },

            clsSidebarAnimation: function(ref) {
                var mode = ref.mode;
                var clsSidebarAnimation = ref.clsSidebarAnimation;

                return mode === 'none' || mode === 'reveal' ? '' : clsSidebarAnimation;
            },

            clsContainerAnimation: function(ref) {
                var mode = ref.mode;
                var clsContainerAnimation = ref.clsContainerAnimation;

                return mode !== 'push' && mode !== 'reveal' ? '' : clsContainerAnimation;
            },

            transitionElement: function(ref) {
                var mode = ref.mode;

                return mode === 'reveal' ? parent(this.panel) : this.panel;
            }

        },

        update: {

            read: function() {
                if (this.isToggled() && !isVisible(this.$el)) {
                    this.hide();
                }
            },

            events: ['resize']

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return 'a[href^="#"]';
                },

                handler: function(ref) {
                    var hash = ref.current.hash;
                    var defaultPrevented = ref.defaultPrevented;

                    if (!defaultPrevented && hash && $(hash, document.body)) {
                        this.hide();
                    }
                }

            },

            {
                name: 'touchstart',

                passive: true,

                el: function() {
                    return this.panel;
                },

                handler: function(ref) {
                    var targetTouches = ref.targetTouches;


                    if (targetTouches.length === 1) {
                        this.clientY = targetTouches[0].clientY;
                    }

                }

            },

            {
                name: 'touchmove',

                self: true,
                passive: false,

                filter: function() {
                    return this.overlay;
                },

                handler: function(e) {
                    e.cancelable && e.preventDefault();
                }

            },

            {
                name: 'touchmove',

                passive: false,

                el: function() {
                    return this.panel;
                },

                handler: function(e) {

                    if (e.targetTouches.length !== 1) {
                        return;
                    }

                    var clientY = e.targetTouches[0].clientY - this.clientY;
                    var ref = this.panel;
                    var scrollTop = ref.scrollTop;
                    var scrollHeight = ref.scrollHeight;
                    var clientHeight = ref.clientHeight;

                    if (clientHeight >= scrollHeight
                        || scrollTop === 0 && clientY > 0
                        || scrollHeight - scrollTop <= clientHeight && clientY < 0
                    ) {
                        e.cancelable && e.preventDefault();
                    }

                }

            },

            {
                name: 'show',

                self: true,

                handler: function() {

                    if (this.mode === 'reveal' && !hasClass(parent(this.panel), this.clsMode)) {
                        wrapAll(this.panel, '<div>');
                        addClass(parent(this.panel), this.clsMode);
                    }

                    css(document.documentElement, 'overflowY', this.overlay ? 'hidden' : '');
                    addClass(document.body, this.clsContainer, this.clsFlip);
                    css(document.body, 'touch-action', 'pan-y pinch-zoom');
                    css(this.$el, 'display', 'block');
                    addClass(this.$el, this.clsOverlay);
                    addClass(this.panel, this.clsSidebarAnimation, this.mode !== 'reveal' ? this.clsMode : '');

                    height(document.body); // force reflow
                    addClass(document.body, this.clsContainerAnimation);

                    this.clsContainerAnimation && suppressUserScale();


                }
            },

            {
                name: 'hide',

                self: true,

                handler: function() {
                    removeClass(document.body, this.clsContainerAnimation);
                    css(document.body, 'touch-action', '');
                }
            },

            {
                name: 'hidden',

                self: true,

                handler: function() {

                    this.clsContainerAnimation && resumeUserScale();

                    if (this.mode === 'reveal') {
                        unwrap(this.panel);
                    }

                    removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
                    removeClass(this.$el, this.clsOverlay);
                    css(this.$el, 'display', '');
                    removeClass(document.body, this.clsContainer, this.clsFlip);

                    css(document.documentElement, 'overflowY', '');

                }
            },

            {
                name: 'swipeLeft swipeRight',

                handler: function(e) {

                    if (this.isToggled() && endsWith(e.type, 'Left') ^ this.flip) {
                        this.hide();
                    }

                }
            }

        ]

    };

    // Chrome in responsive mode zooms page upon opening offcanvas
    function suppressUserScale() {
        getViewport().content += ',user-scalable=0';
    }

    function resumeUserScale() {
        var viewport = getViewport();
        viewport.content = viewport.content.replace(/,user-scalable=0$/, '');
    }

    function getViewport() {
        return $('meta[name="viewport"]', document.head) || append(document.head, '<meta name="viewport">');
    }

    var overflowAuto = {

        mixins: [Class],

        props: {
            selContainer: String,
            selContent: String,
            minHeight: Number,
        },

        data: {
            selContainer: '.uk-modal',
            selContent: '.uk-modal-dialog',
            minHeight: 150,
        },

        computed: {

            container: function(ref, $el) {
                var selContainer = ref.selContainer;

                return closest($el, selContainer);
            },

            content: function(ref, $el) {
                var selContent = ref.selContent;

                return closest($el, selContent);
            }

        },

        connected: function() {
            css(this.$el, 'minHeight', this.minHeight);
        },

        update: {

            read: function() {

                if (!this.content || !this.container || !isVisible(this.$el)) {
                    return false;
                }

                return {
                    current: toFloat(css(this.$el, 'maxHeight')),
                    max: Math.max(this.minHeight, height(this.container) - (dimensions(this.content).height - height(this.$el)))
                };
            },

            write: function(ref) {
                var current = ref.current;
                var max = ref.max;

                css(this.$el, 'maxHeight', max);
                if (Math.round(current) !== Math.round(max)) {
                    trigger(this.$el, 'resize');
                }
            },

            events: ['resize']

        }

    };

    var responsive = {

        props: ['width', 'height'],

        connected: function() {
            addClass(this.$el, 'uk-responsive-width');
        },

        update: {

            read: function() {
                return isVisible(this.$el) && this.width && this.height
                    ? {width: width(parent(this.$el)), height: this.height}
                    : false;
            },

            write: function(dim) {
                height(this.$el, Dimensions.contain({
                    height: this.height,
                    width: this.width
                }, dim).height);
            },

            events: ['resize']

        }

    };

    var scroll = {

        props: {
            offset: Number
        },

        data: {
            offset: 0
        },

        methods: {

            scrollTo: function(el) {
                var this$1 = this;


                el = el && $(el) || document.body;

                if (trigger(this.$el, 'beforescroll', [this, el])) {
                    scrollIntoView(el, {offset: this.offset}).then(function () { return trigger(this$1.$el, 'scrolled', [this$1, el]); }
                    );
                }

            }

        },

        events: {

            click: function(e) {

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                this.scrollTo(("#" + (escape(decodeURIComponent((this.$el.hash || '').substr(1))))));
            }

        }

    };

    var stateKey = '_ukScrollspy';
    var scrollspy = {

        args: 'cls',

        props: {
            cls: String,
            target: String,
            hidden: Boolean,
            offsetTop: Number,
            offsetLeft: Number,
            repeat: Boolean,
            delay: Number
        },

        data: function () { return ({
            cls: false,
            target: false,
            hidden: true,
            offsetTop: 0,
            offsetLeft: 0,
            repeat: false,
            delay: 0,
            inViewClass: 'uk-scrollspy-inview'
        }); },

        computed: {

            elements: {

                get: function(ref, $el) {
                    var target = ref.target;

                    return target ? $$(target, $el) : [$el];
                },

                watch: function(elements) {
                    if (this.hidden) {
                        css(filter$1(elements, (":not(." + (this.inViewClass) + ")")), 'visibility', 'hidden');
                    }
                },

                immediate: true

            }

        },

        disconnected: function() {
            var this$1 = this;

            this.elements.forEach(function (el) {
                removeClass(el, this$1.inViewClass, el[stateKey] ? el[stateKey].cls : '');
                delete el[stateKey];
            });
        },

        update: [

            {

                read: function(data$1) {
                    var this$1 = this;


                    // Let child components be applied at least once first
                    if (!data$1.update) {
                        Promise$1.resolve().then(function () {
                            this$1.$emit();
                            data$1.update = true;
                        });
                        return false;
                    }

                    this.elements.forEach(function (el) {

                        if (!el[stateKey]) {
                            el[stateKey] = {cls: data(el, 'uk-scrollspy-class') || this$1.cls};
                        }

                        el[stateKey].show = isInView(el, this$1.offsetTop, this$1.offsetLeft);

                    });

                },

                write: function(data) {
                    var this$1 = this;


                    this.elements.forEach(function (el) {

                        var state = el[stateKey];

                        if (state.show && !state.inview && !state.queued) {

                            state.queued = true;

                            data.promise = (data.promise || Promise$1.resolve()).then(function () { return new Promise$1(function (resolve) { return setTimeout(resolve, this$1.delay); }
                                ); }
                            ).then(function () {
                                this$1.toggle(el, true);
                                setTimeout(function () {
                                    state.queued = false;
                                    this$1.$emit();
                                }, 300);
                            });

                        } else if (!state.show && state.inview && !state.queued && this$1.repeat) {

                            this$1.toggle(el, false);

                        }

                    });

                },

                events: ['scroll', 'resize']

            }

        ],

        methods: {

            toggle: function(el, inview) {

                var state = el[stateKey];

                state.off && state.off();

                css(el, 'visibility', !inview && this.hidden ? 'hidden' : '');

                toggleClass(el, this.inViewClass, inview);
                toggleClass(el, state.cls);

                if (/\buk-animation-/.test(state.cls)) {
                    state.off = once(el, 'animationcancel animationend', function () { return removeClasses(el, 'uk-animation-[\\w-]+'); }
                    );
                }

                trigger(el, inview ? 'inview' : 'outview');

                state.inview = inview;

                this.$update(el);
            }

        }

    };

    var scrollspyNav = {

        props: {
            cls: String,
            closest: String,
            scroll: Boolean,
            overflow: Boolean,
            offset: Number
        },

        data: {
            cls: 'uk-active',
            closest: false,
            scroll: false,
            overflow: true,
            offset: 0
        },

        computed: {

            links: {

                get: function(_, $el) {
                    return $$('a[href^="#"]', $el).filter(function (el) { return el.hash; });
                },

                watch: function(links) {
                    if (this.scroll) {
                        this.$create('scroll', links, {offset: this.offset || 0});
                    }
                },

                immediate: true

            },

            targets: function() {
                return $$(this.links.map(function (el) { return escape(el.hash).substr(1); }).join(','));
            },

            elements: function(ref) {
                var selector = ref.closest;

                return closest(this.links, selector || '*');
            }

        },

        update: [

            {

                read: function() {
                    var this$1 = this;


                    var ref = this.targets;
                    var length = ref.length;

                    if (!length || !isVisible(this.$el)) {
                        return false;
                    }

                    var ref$1 = scrollParents(this.targets, /auto|scroll/, true);
                    var scrollElement = ref$1[0];
                    var scrollTop = scrollElement.scrollTop;
                    var scrollHeight = scrollElement.scrollHeight;
                    var max = scrollHeight - getViewportClientHeight(scrollElement);
                    var active = false;

                    if (scrollTop === max) {
                        active = length - 1;
                    } else {

                        this.targets.every(function (el, i) {
                            if (offset(el).top - offset(getViewport$1(scrollElement)).top - this$1.offset <= 0) {
                                active = i;
                                return true;
                            }
                        });

                        if (active === false && this.overflow) {
                            active = 0;
                        }
                    }

                    return {active: active};
                },

                write: function(ref) {
                    var active = ref.active;


                    var changed = active !== false && !hasClass(this.elements[active], this.cls);

                    this.links.forEach(function (el) { return el.blur(); });
                    removeClass(this.elements, this.cls);
                    addClass(this.elements[active], this.cls);

                    if (changed) {
                        trigger(this.$el, 'active', [active, this.elements[active]]);
                    }
                },

                events: ['scroll', 'resize']

            }

        ]

    };

    var sticky = {

        mixins: [Class, Media],

        props: {
            top: null,
            bottom: Boolean,
            offset: String,
            animation: String,
            clsActive: String,
            clsInactive: String,
            clsFixed: String,
            clsBelow: String,
            selTarget: String,
            widthElement: Boolean,
            showOnUp: Boolean,
            targetOffset: Number
        },

        data: {
            top: 0,
            bottom: false,
            offset: 0,
            animation: '',
            clsActive: 'uk-active',
            clsInactive: '',
            clsFixed: 'uk-sticky-fixed',
            clsBelow: 'uk-sticky-below',
            selTarget: '',
            widthElement: false,
            showOnUp: false,
            targetOffset: false
        },

        computed: {

            offset: function(ref) {
                var offset = ref.offset;

                return toPx(offset);
            },

            selTarget: function(ref, $el) {
                var selTarget = ref.selTarget;

                return selTarget && $(selTarget, $el) || $el;
            },

            widthElement: function(ref, $el) {
                var widthElement = ref.widthElement;

                return query(widthElement, $el) || this.placeholder;
            },

            isActive: {

                get: function() {
                    return hasClass(this.selTarget, this.clsActive);
                },

                set: function(value) {
                    if (value && !this.isActive) {
                        replaceClass(this.selTarget, this.clsInactive, this.clsActive);
                        trigger(this.$el, 'active');
                    } else if (!value && !hasClass(this.selTarget, this.clsInactive)) {
                        replaceClass(this.selTarget, this.clsActive, this.clsInactive);
                        trigger(this.$el, 'inactive');
                    }
                }

            }

        },

        connected: function() {
            this.placeholder = $('+ .uk-sticky-placeholder', this.$el) || $('<div class="uk-sticky-placeholder"></div>');
            this.isFixed = false;
            this.isActive = false;
        },

        disconnected: function() {

            if (this.isFixed) {
                this.hide();
                removeClass(this.selTarget, this.clsInactive);
            }

            remove$1(this.placeholder);
            this.placeholder = null;
            this.widthElement = null;
        },

        events: [

            {

                name: 'load hashchange popstate',

                el: function() {
                    return window;
                },

                handler: function() {
                    var this$1 = this;


                    if (!(this.targetOffset !== false && location.hash && window.pageYOffset > 0)) {
                        return;
                    }

                    var target = $(location.hash);

                    if (target) {
                        fastdom.read(function () {

                            var ref = offset(target);
                            var top = ref.top;
                            var elTop = offset(this$1.$el).top;
                            var elHeight = this$1.$el.offsetHeight;

                            if (this$1.isFixed && elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
                                scrollTop(window, top - elHeight - (isNumeric(this$1.targetOffset) ? this$1.targetOffset : 0) - this$1.offset);
                            }

                        });
                    }

                }

            }

        ],

        update: [

            {

                read: function(ref, types) {
                    var height = ref.height;


                    this.inactive = !this.matchMedia || !isVisible(this.$el);

                    if (this.inactive) {
                        return false;
                    }

                    if (this.isActive && types.has('resize')) {
                        this.hide();
                        height = this.$el.offsetHeight;
                        this.show();
                    }

                    height = !this.isActive ? this.$el.offsetHeight : height;

                    this.topOffset = offset(this.isFixed ? this.placeholder : this.$el).top;
                    this.bottomOffset = this.topOffset + height;

                    var bottom = parseProp('bottom', this);

                    this.top = Math.max(toFloat(parseProp('top', this)), this.topOffset) - this.offset;
                    this.bottom = bottom && bottom - this.$el.offsetHeight;
                    this.width = dimensions(isVisible(this.widthElement) ? this.widthElement : this.$el).width;

                    return {
                        height: height,
                        top: offsetPosition(this.placeholder)[0],
                        margins: css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
                    };
                },

                write: function(ref) {
                    var height = ref.height;
                    var margins = ref.margins;


                    var ref$1 = this;
                    var placeholder = ref$1.placeholder;

                    css(placeholder, assign({height: height}, margins));

                    if (!within(placeholder, document)) {
                        after(this.$el, placeholder);
                        placeholder.hidden = true;
                    }

                    this.isActive = !!this.isActive; // force self-assign

                },

                events: ['resize']

            },

            {

                read: function(ref) {
                    var scroll = ref.scroll; if ( scroll === void 0 ) scroll = 0;


                    this.scroll = window.pageYOffset;

                    return {
                        dir: scroll <= this.scroll ? 'down' : 'up',
                        scroll: this.scroll
                    };
                },

                write: function(data, types) {
                    var this$1 = this;


                    var now = Date.now();
                    var isScrollUpdate = types.has('scroll');
                    var initTimestamp = data.initTimestamp; if ( initTimestamp === void 0 ) initTimestamp = 0;
                    var dir = data.dir;
                    var lastDir = data.lastDir;
                    var lastScroll = data.lastScroll;
                    var scroll = data.scroll;
                    var top = data.top;

                    data.lastScroll = scroll;

                    if (scroll < 0 || scroll === lastScroll && isScrollUpdate || this.showOnUp && !isScrollUpdate && !this.isFixed) {
                        return;
                    }

                    if (now - initTimestamp > 300 || dir !== lastDir) {
                        data.initScroll = scroll;
                        data.initTimestamp = now;
                    }

                    data.lastDir = dir;

                    if (this.showOnUp && !this.isFixed && Math.abs(data.initScroll - scroll) <= 30 && Math.abs(lastScroll - scroll) <= 10) {
                        return;
                    }

                    if (this.inactive
                        || scroll < this.top
                        || this.showOnUp && (scroll <= this.top || dir === 'down' && isScrollUpdate || dir === 'up' && !this.isFixed && scroll <= this.bottomOffset)
                    ) {

                        if (!this.isFixed) {

                            if (Animation.inProgress(this.$el) && top > scroll) {
                                Animation.cancel(this.$el);
                                this.hide();
                            }

                            return;
                        }

                        this.isFixed = false;

                        if (this.animation && scroll > this.topOffset) {
                            Animation.cancel(this.$el);
                            Animation.out(this.$el, this.animation).then(function () { return this$1.hide(); }, noop);
                        } else {
                            this.hide();
                        }

                    } else if (this.isFixed) {

                        this.update();

                    } else if (this.animation) {

                        Animation.cancel(this.$el);
                        this.show();
                        Animation.in(this.$el, this.animation).catch(noop);

                    } else {
                        this.show();
                    }

                },

                events: ['resize', 'scroll']

            }

        ],

        methods: {

            show: function() {

                this.isFixed = true;
                this.update();
                this.placeholder.hidden = false;

            },

            hide: function() {

                this.isActive = false;
                removeClass(this.$el, this.clsFixed, this.clsBelow);
                css(this.$el, {position: '', top: '', width: ''});
                this.placeholder.hidden = true;

            },

            update: function() {

                var active = this.top !== 0 || this.scroll > this.top;
                var top = Math.max(0, this.offset);

                if (isNumeric(this.bottom) && this.scroll > this.bottom - this.offset) {
                    top = this.bottom - this.scroll;
                }

                css(this.$el, {
                    position: 'fixed',
                    top: (top + "px"),
                    width: this.width
                });

                this.isActive = active;
                toggleClass(this.$el, this.clsBelow, this.scroll > this.bottomOffset);
                addClass(this.$el, this.clsFixed);

            }

        }

    };

    function parseProp(prop, ref) {
        var $props = ref.$props;
        var $el = ref.$el;
        var propOffset = ref[(prop + "Offset")];


        var value = $props[prop];

        if (!value) {
            return;
        }

        if (isString(value) && value.match(/^-?\d/)) {

            return propOffset + toPx(value);

        } else {

            return offset(value === true ? parent($el) : query(value, $el)).bottom;

        }
    }

    var Switcher = {

        mixins: [Togglable],

        args: 'connect',

        props: {
            connect: String,
            toggle: String,
            active: Number,
            swiping: Boolean
        },

        data: {
            connect: '~.uk-switcher',
            toggle: '> * > :first-child',
            active: 0,
            swiping: true,
            cls: 'uk-active',
            attrItem: 'uk-switcher-item'
        },

        computed: {

            connects: {

                get: function(ref, $el) {
                    var connect = ref.connect;

                    return queryAll(connect, $el);
                },

                watch: function(connects) {
                    var this$1 = this;


                    if (this.swiping) {
                        css(connects, 'touch-action', 'pan-y pinch-zoom');
                    }

                    var index = this.index();
                    this.connects.forEach(function (el) { return children(el).forEach(function (child, i) { return toggleClass(child, this$1.cls, i === index); }
                        ); }
                    );

                },

                immediate: true

            },

            toggles: {

                get: function(ref, $el) {
                    var toggle = ref.toggle;

                    return $$(toggle, $el).filter(function (el) { return !matches(el, '.uk-disabled *, .uk-disabled, [disabled]'); });
                },

                watch: function(toggles) {
                    var active = this.index();
                    this.show(~active ? active : toggles[this.active] || toggles[0]);
                },

                immediate: true

            },

            children: function() {
                var this$1 = this;

                return children(this.$el).filter(function (child) { return this$1.toggles.some(function (toggle) { return within(toggle, child); }); });
            }

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return this.toggle;
                },

                handler: function(e) {
                    e.preventDefault();
                    this.show(e.current);
                }

            },

            {
                name: 'click',

                el: function() {
                    return this.connects;
                },

                delegate: function() {
                    return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
                },

                handler: function(e) {
                    e.preventDefault();
                    this.show(data(e.current, this.attrItem));
                }
            },

            {
                name: 'swipeRight swipeLeft',

                filter: function() {
                    return this.swiping;
                },

                el: function() {
                    return this.connects;
                },

                handler: function(ref) {
                    var type = ref.type;

                    this.show(endsWith(type, 'Left') ? 'next' : 'previous');
                }
            }

        ],

        methods: {

            index: function() {
                var this$1 = this;

                return findIndex(this.children, function (el) { return hasClass(el, this$1.cls); });
            },

            show: function(item) {
                var this$1 = this;


                var prev = this.index();
                var next = getIndex(
                    this.children[getIndex(item, this.toggles, prev)],
                    children(this.$el)
                );

                if (prev === next) {
                    return;
                }

                this.children.forEach(function (child, i) {
                    toggleClass(child, this$1.cls, next === i);
                    attr(this$1.toggles[i], 'aria-expanded', next === i);
                });

                this.connects.forEach(function (ref) {
                        var children = ref.children;

                        return this$1.toggleElement(toNodes(children).filter(function (child) { return hasClass(child, this$1.cls); }
                    ), false, prev >= 0).then(function () { return this$1.toggleElement(children[next], true, prev >= 0); }
                    );
                }
                );
            }

        }

    };

    var tab = {

        mixins: [Class],

        extends: Switcher,

        props: {
            media: Boolean
        },

        data: {
            media: 960,
            attrItem: 'uk-tab-item'
        },

        connected: function() {

            var cls = hasClass(this.$el, 'uk-tab-left')
                ? 'uk-tab-left'
                : hasClass(this.$el, 'uk-tab-right')
                    ? 'uk-tab-right'
                    : false;

            if (cls) {
                this.$create('toggle', this.$el, {cls: cls, mode: 'media', media: this.media});
            }
        }

    };

    var toggle = {

        mixins: [Media, Togglable],

        args: 'target',

        props: {
            href: String,
            target: null,
            mode: 'list',
            queued: Boolean
        },

        data: {
            href: false,
            target: false,
            mode: 'click',
            queued: true
        },

        connected: function() {
            if (!isFocusable(this.$el)) {
                attr(this.$el, 'tabindex', '0');
            }
        },

        computed: {

            target: {

                get: function(ref, $el) {
                    var href = ref.href;
                    var target = ref.target;

                    target = queryAll(target || href, $el);
                    return target.length && target || [$el];
                },

                watch: function() {
                    this.updateAria();
                },

                immediate: true

            }

        },

        events: [

            {
                name: (pointerDown + " " + pointerUp + " " + pointerCancel),

                filter: function() {
                    return includes(this.mode, 'hover');
                },

                handler: function(e) {
                    this._isTouch = isTouch(e) && e.type === pointerDown;
                }
            },

            {
                // Clicking a button does not give it focus on all browsers and platforms
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
                name: (pointerEnter + " " + pointerLeave + " focus blur"),

                filter: function() {
                    return includes(this.mode, 'hover');
                },

                handler: function(e) {
                    if (!isTouch(e) && !this._isTouch) {

                        var isPointerEvent = includes(['pointerleave', 'pointerenter'], e.type);
                        if (!isPointerEvent && matches(this.$el, ':hover')
                            || isPointerEvent && matches(this.$el, ':focus')
                        ) {
                            return;
                        }

                        this.toggle(("toggle" + (includes([pointerEnter, 'focus'], e.type) ? 'show' : 'hide')));
                    }
                }

            },

            {

                name: 'click',

                filter: function() {
                    return includes(this.mode, 'click') || hasTouch && includes(this.mode, 'hover');
                },

                handler: function(e) {

                    var link;
                    if (closest(e.target, 'a[href="#"], a[href=""]')
                        || (link = closest(e.target, 'a[href]')) && (
                            !attr(this.$el, 'aria-expanded')
                            || link.hash && matches(this.target, link.hash)
                        )
                    ) {
                        e.preventDefault();
                    }

                    this.toggle();
                }

            },

            {

                name: 'toggled',

                self: true,

                el: function() {
                    return this.target;
                },

                handler: function(e, toggled) {
                    this.updateAria(toggled);
                }
            }

        ],

        update: {

            read: function() {
                return includes(this.mode, 'media') && this.media
                    ? {match: this.matchMedia}
                    : false;
            },

            write: function(ref) {
                var match = ref.match;


                var toggled = this.isToggled(this.target);
                if (match ? !toggled : toggled) {
                    this.toggle();
                }

            },

            events: ['resize']

        },

        methods: {

            toggle: function(type) {
                var this$1 = this;


                if (!trigger(this.target, type || 'toggle', [this])) {
                    return;
                }

                if (!this.queued) {
                    return this.toggleElement(this.target);
                }

                var leaving = this.target.filter(function (el) { return hasClass(el, this$1.clsLeave); });

                if (leaving.length) {
                    this.target.forEach(function (el) {
                        var isLeaving = includes(leaving, el);
                        this$1.toggleElement(el, isLeaving, isLeaving);
                    });
                    return;
                }

                var toggled = this.target.filter(this.isToggled);
                this.toggleElement(toggled, false).then(function () { return this$1.toggleElement(this$1.target.filter(function (el) { return !includes(toggled, el); }
                    ), true); }
                );

            },

            updateAria: function(toggled) {
                attr(this.$el, 'aria-expanded', isBoolean(toggled)
                    ? toggled
                    : this.cls
                        ? hasClass(this.target[0], this.cls.split(' ')[0])
                        : isVisible(this.target[0])
                );
            }

        }

    };

    var components$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Accordion: Accordion,
        Alert: alert,
        Cover: cover,
        Drop: drop,
        Dropdown: drop,
        FormCustom: formCustom,
        Gif: gif,
        Grid: grid,
        HeightMatch: heightMatch,
        HeightViewport: heightViewport,
        Icon: Icon,
        Img: img,
        Leader: leader,
        Margin: Margin,
        Modal: modal,
        Nav: nav,
        Navbar: navbar,
        Offcanvas: offcanvas,
        OverflowAuto: overflowAuto,
        Responsive: responsive,
        Scroll: scroll,
        Scrollspy: scrollspy,
        ScrollspyNav: scrollspyNav,
        Sticky: sticky,
        Svg: SVG,
        Switcher: Switcher,
        Tab: tab,
        Toggle: toggle,
        Video: Video,
        Close: Close,
        Spinner: Spinner,
        SlidenavNext: Slidenav,
        SlidenavPrevious: Slidenav,
        SearchIcon: Search,
        Marker: IconComponent,
        NavbarToggleIcon: IconComponent,
        OverlayIcon: IconComponent,
        PaginationNext: IconComponent,
        PaginationPrevious: IconComponent,
        Totop: IconComponent
    });

    // register components
    each(components$1, function (component, name) { return UIkit.component(name, component); }
    );

    // core functionality
    UIkit.use(Core);

    boot(UIkit);

    var countdown = {

        mixins: [Class],

        props: {
            date: String,
            clsWrapper: String
        },

        data: {
            date: '',
            clsWrapper: '.uk-countdown-%unit%'
        },

        computed: {

            date: function(ref) {
                var date = ref.date;

                return Date.parse(date);
            },

            days: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'days'), $el);
            },

            hours: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'hours'), $el);
            },

            minutes: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'minutes'), $el);
            },

            seconds: function(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'seconds'), $el);
            },

            units: function() {
                var this$1 = this;

                return ['days', 'hours', 'minutes', 'seconds'].filter(function (unit) { return this$1[unit]; });
            }

        },

        connected: function() {
            this.start();
        },

        disconnected: function() {
            var this$1 = this;

            this.stop();
            this.units.forEach(function (unit) { return empty(this$1[unit]); });
        },

        events: [

            {

                name: 'visibilitychange',

                el: function() {
                    return document;
                },

                handler: function() {
                    if (document.hidden) {
                        this.stop();
                    } else {
                        this.start();
                    }
                }

            }

        ],

        update: {

            write: function() {
                var this$1 = this;


                var timespan = getTimeSpan(this.date);

                if (timespan.total <= 0) {

                    this.stop();

                    timespan.days
                        = timespan.hours
                        = timespan.minutes
                        = timespan.seconds
                        = 0;
                }

                this.units.forEach(function (unit) {

                    var digits = String(Math.floor(timespan[unit]));

                    digits = digits.length < 2 ? ("0" + digits) : digits;

                    var el = this$1[unit];
                    if (el.textContent !== digits) {
                        digits = digits.split('');

                        if (digits.length !== el.children.length) {
                            html(el, digits.map(function () { return '<span></span>'; }).join(''));
                        }

                        digits.forEach(function (digit, i) { return el.children[i].textContent = digit; });
                    }

                });

            }

        },

        methods: {

            start: function() {

                this.stop();

                if (this.date && this.units.length) {
                    this.$update();
                    this.timer = setInterval(this.$update, 1000);
                }

            },

            stop: function() {

                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }

            }

        }

    };

    function getTimeSpan(date) {

        var total = date - Date.now();

        return {
            total: total,
            seconds: total / 1000 % 60,
            minutes: total / 1000 / 60 % 60,
            hours: total / 1000 / 60 / 60 % 24,
            days: total / 1000 / 60 / 60 / 24
        };
    }

    var clsLeave = 'uk-transition-leave';
    var clsEnter = 'uk-transition-enter';

    function fade(action, target, duration, stagger) {
        if ( stagger === void 0 ) stagger = 0;


        var index = transitionIndex(target, true);
        var propsIn = {opacity: 1};
        var propsOut = {opacity: 0};

        var wrapIndexFn = function (fn) { return function () { return index === transitionIndex(target) ? fn() : Promise$1.reject(); }; };

        var leaveFn = wrapIndexFn(function () {

            addClass(target, clsLeave);

            return Promise$1.all(getTransitionNodes(target).map(function (child, i) { return new Promise$1(function (resolve) { return setTimeout(function () { return Transition.start(child, propsOut, duration / 2, 'ease').then(resolve); }, i * stagger); }
                ); }
            )).then(function () { return removeClass(target, clsLeave); });

        });

        var enterFn = wrapIndexFn(function () {

            var oldHeight = height(target);

            addClass(target, clsEnter);
            action();

            css(children(target), {opacity: 0});

            // Ensure UIkit updates have propagated
            return new Promise$1(function (resolve) { return requestAnimationFrame(function () {

                    var nodes = children(target);
                    var newHeight = height(target);

                    // Ensure Grid cells do not stretch when height is applied
                    css(target, 'alignContent', 'flex-start');
                    height(target, oldHeight);

                    var transitionNodes = getTransitionNodes(target);
                    css(nodes, propsOut);

                    var transitions = transitionNodes.map(function (child, i) { return new Promise$1(function (resolve) { return setTimeout(function () { return Transition.start(child, propsIn, duration / 2, 'ease').then(resolve); }, i * stagger); }
                        ); }
                    );

                    if (oldHeight !== newHeight) {
                        transitions.push(Transition.start(target, {height: newHeight}, duration / 2 + transitionNodes.length * stagger, 'ease'));
                    }

                    Promise$1.all(transitions).then(function () {
                        removeClass(target, clsEnter);
                        if (index === transitionIndex(target)) {
                            css(target, {height: '', alignContent: ''});
                            css(nodes, {opacity: ''});
                            delete target.dataset.transition;
                        }
                        resolve();
                    });
                }); }
            );
        });

        return hasClass(target, clsLeave)
            ? waitTransitionend(target).then(enterFn)
            : hasClass(target, clsEnter)
                ? waitTransitionend(target).then(leaveFn).then(enterFn)
                : leaveFn().then(enterFn);
    }

    function transitionIndex(target, next) {
        if (next) {
            target.dataset.transition = 1 + transitionIndex(target);
        }

        return toNumber(target.dataset.transition) || 0;
    }

    function waitTransitionend(target) {
        return Promise$1.all(children(target).filter(Transition.inProgress).map(function (el) { return new Promise$1(function (resolve) { return once(el, 'transitionend transitioncanceled', resolve); }); }
        ));
    }

    function getTransitionNodes(target) {
        return getRows(children(target)).reduce(function (nodes, row) { return nodes.concat(sortBy$1(row.filter(function (el) { return isInView(el); }), 'offsetLeft')); }, []);
    }

    function slide (action, target, duration) {

        return new Promise$1(function (resolve) { return requestAnimationFrame(function () {

                var nodes = children(target);

                // Get current state
                var currentProps = nodes.map(function (el) { return getProps(el, true); });
                var targetProps = css(target, ['height', 'padding']);

                // Cancel previous animations
                Transition.cancel(target);
                nodes.forEach(Transition.cancel);
                reset(target);

                // Adding, sorting, removing nodes
                action();

                // Find new nodes
                nodes = nodes.concat(children(target).filter(function (el) { return !includes(nodes, el); }));

                // Wait for update to propagate
                Promise$1.resolve().then(function () {

                    // Force update
                    fastdom.flush();

                    // Get new state
                    var targetPropsTo = css(target, ['height', 'padding']);
                    var ref = getTransitionProps(target, nodes, currentProps);
                    var propsTo = ref[0];
                    var propsFrom = ref[1];

                    // Reset to previous state
                    nodes.forEach(function (el, i) { return propsFrom[i] && css(el, propsFrom[i]); });
                    css(target, assign({display: 'block'}, targetProps));

                    // Start transitions on next frame
                    requestAnimationFrame(function () {

                        var transitions = nodes.map(function (el, i) { return parent(el) === target && Transition.start(el, propsTo[i], duration, 'ease'); }
                            ).concat(Transition.start(target, targetPropsTo, duration, 'ease'));

                        Promise$1.all(transitions).then(function () {
                            nodes.forEach(function (el, i) { return parent(el) === target && css(el, 'display', propsTo[i].opacity === 0 ? 'none' : ''); });
                            reset(target);
                        }, noop).then(resolve);

                    });
                });
            }); });
    }

    function getProps(el, opacity) {

        var zIndex = css(el, 'zIndex');

        return isVisible(el)
            ? assign({
                display: '',
                opacity: opacity ? css(el, 'opacity') : '0',
                pointerEvents: 'none',
                position: 'absolute',
                zIndex: zIndex === 'auto' ? index(el) : zIndex
            }, getPositionWithMargin(el))
            : false;
    }

    function getTransitionProps(target, nodes, currentProps) {

        var propsTo = nodes.map(function (el, i) { return parent(el) && i in currentProps
                ? currentProps[i]
                ? isVisible(el)
                    ? getPositionWithMargin(el)
                    : {opacity: 0}
                : {opacity: isVisible(el) ? 1 : 0}
                : false; });

        var propsFrom = propsTo.map(function (props, i) {

            var from = parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));

            if (!from) {
                return false;
            }

            if (!props) {
                delete from.opacity;
            } else if (!('opacity' in props)) {
                var opacity = from.opacity;

                if (opacity % 1) {
                    props.opacity = 1;
                } else {
                    delete from.opacity;
                }
            }

            return from;
        });

        return [propsTo, propsFrom];
    }

    function reset(el) {
        css(el.children, {
            height: '',
            left: '',
            opacity: '',
            pointerEvents: '',
            position: '',
            top: '',
            marginTop: '',
            marginLeft: '',
            transform: '',
            width: '',
            zIndex: ''
        });
        css(el, {height: '', display: '', padding: ''});
    }

    function getPositionWithMargin(el) {
        var ref = offset(el);
        var height = ref.height;
        var width = ref.width;
        var ref$1 = position(el);
        var top = ref$1.top;
        var left = ref$1.left;
        var ref$2 = css(el, ['marginTop', 'marginLeft']);
        var marginLeft = ref$2.marginLeft;
        var marginTop = ref$2.marginTop;

        return {top: top, left: left, height: height, width: width, marginLeft: marginLeft, marginTop: marginTop, transform: ''};
    }

    var Animate = {

        props: {
            duration: Number,
            animation: Boolean
        },

        data: {
            duration: 150,
            animation: 'slide'
        },

        methods: {

            animate: function(action, target) {
                var this$1 = this;
                if ( target === void 0 ) target = this.$el;


                var name = this.animation;
                var animationFn = name === 'fade'
                    ? fade
                    : name === 'delayed-fade'
                        ? function () {
                            var args = [], len = arguments.length;
                            while ( len-- ) args[ len ] = arguments[ len ];

                            return fade.apply(void 0, args.concat( [40] ));
                }
                        : !name
                            ? function () {
                                action();
                                return Promise$1.resolve();
                            }
                            : slide;

                return animationFn(action, target, this.duration)
                    .then(function () { return this$1.$update(target, 'resize'); }, noop);
            }

        }
    };

    var filter = {

        mixins: [Animate],

        args: 'target',

        props: {
            target: Boolean,
            selActive: Boolean
        },

        data: {
            target: null,
            selActive: false,
            attrItem: 'uk-filter-control',
            cls: 'uk-active',
            duration: 250
        },

        computed: {

            toggles: {

                get: function(ref, $el) {
                    var attrItem = ref.attrItem;

                    return $$(("[" + attrItem + "],[data-" + attrItem + "]"), $el);
                },

                watch: function() {
                    var this$1 = this;


                    this.updateState();

                    if (this.selActive !== false) {
                        var actives = $$(this.selActive, this.$el);
                        this.toggles.forEach(function (el) { return toggleClass(el, this$1.cls, includes(actives, el)); });
                    }

                },

                immediate: true

            },

            children: {

                get: function(ref, $el) {
                    var target = ref.target;

                    return $$((target + " > *"), $el);
                },

                watch: function(list, old) {
                    if (old && !isEqualList(list, old)) {
                        this.updateState();
                    }
                },

                immediate: true

            }

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
                },

                handler: function(e) {

                    e.preventDefault();
                    this.apply(e.current);

                }

            }

        ],

        methods: {

            apply: function(el) {
                var prevState = this.getState();
                var newState = mergeState(el, this.attrItem, this.getState());

                if (!isEqualState(prevState, newState)) {
                    this.setState(newState);
                }
            },

            getState: function() {
                var this$1 = this;

                return this.toggles
                    .filter(function (item) { return hasClass(item, this$1.cls); })
                    .reduce(function (state, el) { return mergeState(el, this$1.attrItem, state); }, {filter: {'': ''}, sort: []});
            },

            setState: function(state, animate) {
                var this$1 = this;
                if ( animate === void 0 ) animate = true;


                state = assign({filter: {'': ''}, sort: []}, state);

                trigger(this.$el, 'beforeFilter', [this, state]);

                this.toggles.forEach(function (el) { return toggleClass(el, this$1.cls, !!matchFilter(el, this$1.attrItem, state)); });

                Promise$1.all($$(this.target, this.$el).map(function (target) {
                    var filterFn = function () {
                        applyState(state, target, children(target));
                        this$1.$update(this$1.$el);
                    };
                    return animate ? this$1.animate(filterFn, target) : filterFn();
                })).then(function () { return trigger(this$1.$el, 'afterFilter', [this$1]); });

            },

            updateState: function() {
                var this$1 = this;

                fastdom.write(function () { return this$1.setState(this$1.getState(), false); });
            }

        }

    };

    function getFilter(el, attr) {
        return parseOptions(data(el, attr), ['filter']);
    }

    function isEqualState(stateA, stateB) {
        return ['filter', 'sort'].every(function (prop) { return isEqual(stateA[prop], stateB[prop]); });
    }

    function applyState(state, target, children) {
        var selector = getSelector(state);

        children.forEach(function (el) { return css(el, 'display', selector && !matches(el, selector) ? 'none' : ''); });

        var ref = state.sort;
        var sort = ref[0];
        var order = ref[1];

        if (sort) {
            var sorted = sortItems(children, sort, order);
            if (!isEqual(sorted, children)) {
                append(target, sorted);
            }
        }
    }

    function mergeState(el, attr, state) {

        var filterBy = getFilter(el, attr);
        var filter = filterBy.filter;
        var group = filterBy.group;
        var sort = filterBy.sort;
        var order = filterBy.order; if ( order === void 0 ) order = 'asc';

        if (filter || isUndefined(sort)) {

            if (group) {

                if (filter) {
                    delete state.filter[''];
                    state.filter[group] = filter;
                } else {
                    delete state.filter[group];

                    if (isEmpty(state.filter) || '' in state.filter) {
                        state.filter = {'': filter || ''};
                    }

                }

            } else {
                state.filter = {'': filter || ''};
            }

        }

        if (!isUndefined(sort)) {
            state.sort = [sort, order];
        }

        return state;
    }

    function matchFilter(el, attr, ref) {
        var stateFilter = ref.filter; if ( stateFilter === void 0 ) stateFilter = {'': ''};
        var ref_sort = ref.sort;
        var stateSort = ref_sort[0];
        var stateOrder = ref_sort[1];


        var ref$1 = getFilter(el, attr);
        var filter = ref$1.filter; if ( filter === void 0 ) filter = '';
        var group = ref$1.group; if ( group === void 0 ) group = '';
        var sort = ref$1.sort;
        var order = ref$1.order; if ( order === void 0 ) order = 'asc';

        return isUndefined(sort)
            ? group in stateFilter && filter === stateFilter[group]
                || !filter && group && !(group in stateFilter) && !stateFilter['']
            : stateSort === sort && stateOrder === order;
    }

    function isEqualList(listA, listB) {
        return listA.length === listB.length
            && listA.every(function (el) { return ~listB.indexOf(el); });
    }

    function getSelector(ref) {
        var filter = ref.filter;

        var selector = '';
        each(filter, function (value) { return selector += value || ''; });
        return selector;
    }

    function sortItems(nodes, sort, order) {
        return assign([], nodes).sort(function (a, b) { return data(a, sort).localeCompare(data(b, sort), undefined, {numeric: true}) * (order === 'asc' || -1); });
    }

    var Animations$2 = {

        slide: {

            show: function(dir) {
                return [
                    {transform: translate(dir * -100)},
                    {transform: translate()}
                ];
            },

            percent: function(current) {
                return translated(current);
            },

            translate: function(percent, dir) {
                return [
                    {transform: translate(dir * -100 * percent)},
                    {transform: translate(dir * 100 * (1 - percent))}
                ];
            }

        }

    };

    function translated(el) {
        return Math.abs(css(el, 'transform').split(',')[4] / el.offsetWidth) || 0;
    }

    function translate(value, unit) {
        if ( value === void 0 ) value = 0;
        if ( unit === void 0 ) unit = '%';

        value += value ? unit : '';
        return isIE ? ("translateX(" + value + ")") : ("translate3d(" + value + ", 0, 0)"); // currently not translate3d in IE, translate3d within translate3d does not work while transitioning
    }

    function scale3d(value) {
        return ("scale3d(" + value + ", " + value + ", 1)");
    }

    var Animations$1 = assign({}, Animations$2, {

        fade: {

            show: function() {
                return [
                    {opacity: 0},
                    {opacity: 1}
                ];
            },

            percent: function(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function(percent) {
                return [
                    {opacity: 1 - percent},
                    {opacity: percent}
                ];
            }

        },

        scale: {

            show: function() {
                return [
                    {opacity: 0, transform: scale3d(1 - .2)},
                    {opacity: 1, transform: scale3d(1)}
                ];
            },

            percent: function(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function(percent) {
                return [
                    {opacity: 1 - percent, transform: scale3d(1 - .2 * percent)},
                    {opacity: percent, transform: scale3d(1 - .2 + .2 * percent)}
                ];
            }

        }

    });

    function Transitioner$1(prev, next, dir, ref) {
        var animation = ref.animation;
        var easing = ref.easing;


        var percent = animation.percent;
        var translate = animation.translate;
        var show = animation.show; if ( show === void 0 ) show = noop;
        var props = show(dir);
        var deferred = new Deferred();

        return {

            dir: dir,

            show: function(duration, percent, linear) {
                var this$1 = this;
                if ( percent === void 0 ) percent = 0;


                var timing = linear ? 'linear' : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));

                this.translate(percent);

                triggerUpdate$1(next, 'itemin', {percent: percent, duration: duration, timing: timing, dir: dir});
                triggerUpdate$1(prev, 'itemout', {percent: 1 - percent, duration: duration, timing: timing, dir: dir});

                Promise$1.all([
                    Transition.start(next, props[1], duration, timing),
                    Transition.start(prev, props[0], duration, timing)
                ]).then(function () {
                    this$1.reset();
                    deferred.resolve();
                }, noop);

                return deferred.promise;
            },

            cancel: function() {
                Transition.cancel([next, prev]);
            },

            reset: function() {
                for (var prop in props[0]) {
                    css([next, prev], prop, '');
                }
            },

            forward: function(duration, percent) {
                if ( percent === void 0 ) percent = this.percent();

                Transition.cancel([next, prev]);
                return this.show(duration, percent, true);
            },

            translate: function(percent) {

                this.reset();

                var props = translate(percent, dir);
                css(next, props[1]);
                css(prev, props[0]);
                triggerUpdate$1(next, 'itemtranslatein', {percent: percent, dir: dir});
                triggerUpdate$1(prev, 'itemtranslateout', {percent: 1 - percent, dir: dir});

            },

            percent: function() {
                return percent(prev || next, next, dir);
            },

            getDistance: function() {
                return prev && prev.offsetWidth;
            }

        };

    }

    function triggerUpdate$1(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }

    var SliderAutoplay = {

        props: {
            autoplay: Boolean,
            autoplayInterval: Number,
            pauseOnHover: Boolean
        },

        data: {
            autoplay: false,
            autoplayInterval: 7000,
            pauseOnHover: true
        },

        connected: function() {
            this.autoplay && this.startAutoplay();
        },

        disconnected: function() {
            this.stopAutoplay();
        },

        update: function() {
            attr(this.slides, 'tabindex', '-1');
        },

        events: [

            {

                name: 'visibilitychange',

                el: function() {
                    return document;
                },

                filter: function() {
                    return this.autoplay;
                },

                handler: function() {
                    if (document.hidden) {
                        this.stopAutoplay();
                    } else {
                        this.startAutoplay();
                    }
                }

            }

        ],

        methods: {

            startAutoplay: function() {
                var this$1 = this;


                this.stopAutoplay();

                this.interval = setInterval(
                    function () { return (!this$1.draggable || !$(':focus', this$1.$el))
                        && (!this$1.pauseOnHover || !matches(this$1.$el, ':hover'))
                        && !this$1.stack.length
                        && this$1.show('next'); },
                    this.autoplayInterval
                );

            },

            stopAutoplay: function() {
                this.interval && clearInterval(this.interval);
            }

        }

    };

    var SliderDrag = {

        props: {
            draggable: Boolean
        },

        data: {
            draggable: true,
            threshold: 10
        },

        created: function() {
            var this$1 = this;


            ['start', 'move', 'end'].forEach(function (key) {

                var fn = this$1[key];
                this$1[key] = function (e) {

                    var pos = getEventPos(e).x * (isRtl ? -1 : 1);

                    this$1.prevPos = pos !== this$1.pos ? this$1.pos : this$1.prevPos;
                    this$1.pos = pos;

                    fn(e);
                };

            });

        },

        events: [

            {

                name: pointerDown,

                delegate: function() {
                    return this.selSlides;
                },

                handler: function(e) {

                    if (!this.draggable
                        || !isTouch(e) && hasTextNodesOnly(e.target)
                        || closest(e.target, selInput)
                        || e.button > 0
                        || this.length < 2
                    ) {
                        return;
                    }

                    this.start(e);
                }

            },

            {
                name: 'dragstart',

                handler: function(e) {
                    e.preventDefault();
                }
            }

        ],

        methods: {

            start: function() {

                this.drag = this.pos;

                if (this._transitioner) {

                    this.percent = this._transitioner.percent();
                    this.drag += this._transitioner.getDistance() * this.percent * this.dir;

                    this._transitioner.cancel();
                    this._transitioner.translate(this.percent);

                    this.dragging = true;

                    this.stack = [];

                } else {
                    this.prevIndex = this.index;
                }

                on(document, pointerMove, this.move, {passive: false});

                // 'input' event is triggered by video controls
                on(document, (pointerUp + " " + pointerCancel + " input"), this.end, true);

                css(this.list, 'userSelect', 'none');

            },

            move: function(e) {
                var this$1 = this;


                var distance = this.pos - this.drag;

                if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
                    return;
                }

                // prevent click event
                css(this.list, 'pointerEvents', 'none');

                e.cancelable && e.preventDefault();

                this.dragging = true;
                this.dir = (distance < 0 ? 1 : -1);

                var ref = this;
                var slides = ref.slides;
                var ref$1 = this;
                var prevIndex = ref$1.prevIndex;
                var dis = Math.abs(distance);
                var nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                var width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

                while (nextIndex !== prevIndex && dis > width) {

                    this.drag -= width * this.dir;

                    prevIndex = nextIndex;
                    dis -= width;
                    nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                    width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

                }

                this.percent = dis / width;

                var prev = slides[prevIndex];
                var next = slides[nextIndex];
                var changed = this.index !== nextIndex;
                var edge = prevIndex === nextIndex;

                var itemShown;

                [this.index, this.prevIndex].filter(function (i) { return !includes([nextIndex, prevIndex], i); }).forEach(function (i) {
                    trigger(slides[i], 'itemhidden', [this$1]);

                    if (edge) {
                        itemShown = true;
                        this$1.prevIndex = prevIndex;
                    }

                });

                if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
                    trigger(slides[this.index], 'itemshown', [this]);
                }

                if (changed) {
                    this.prevIndex = prevIndex;
                    this.index = nextIndex;

                    !edge && trigger(prev, 'beforeitemhide', [this]);
                    trigger(next, 'beforeitemshow', [this]);
                }

                this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);

                if (changed) {
                    !edge && trigger(prev, 'itemhide', [this]);
                    trigger(next, 'itemshow', [this]);
                }

            },

            end: function() {

                off(document, pointerMove, this.move, {passive: false});
                off(document, (pointerUp + " " + pointerCancel + " input"), this.end, true);

                if (this.dragging) {

                    this.dragging = null;

                    if (this.index === this.prevIndex) {
                        this.percent = 1 - this.percent;
                        this.dir *= -1;
                        this._show(false, this.index, true);
                        this._transitioner = null;
                    } else {

                        var dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
                        this.index = dirChange ? this.index : this.prevIndex;

                        if (dirChange) {
                            this.percent = 1 - this.percent;
                        }

                        this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? 'next' : 'previous', true);
                    }

                }

                css(this.list, {userSelect: '', pointerEvents: ''});

                this.drag
                    = this.percent
                    = null;

            }

        }

    };

    function hasTextNodesOnly(el) {
        return !el.children.length && el.childNodes.length;
    }

    var SliderNav = {

        data: {
            selNav: false
        },

        computed: {

            nav: function(ref, $el) {
                var selNav = ref.selNav;

                return $(selNav, $el);
            },

            selNavItem: function(ref) {
                var attrItem = ref.attrItem;

                return ("[" + attrItem + "],[data-" + attrItem + "]");
            },

            navItems: function(_, $el) {
                return $$(this.selNavItem, $el);
            }

        },

        update: {

            write: function() {
                var this$1 = this;


                if (this.nav && this.length !== this.nav.children.length) {
                    html(this.nav, this.slides.map(function (_, i) { return ("<li " + (this$1.attrItem) + "=\"" + i + "\"><a href></a></li>"); }).join(''));
                }

                this.navItems.concat(this.nav).forEach(function (el) { return el && (el.hidden = !this$1.maxIndex); });

                this.updateNav();

            },

            events: ['resize']

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return this.selNavItem;
                },

                handler: function(e) {
                    e.preventDefault();
                    this.show(data(e.current, this.attrItem));
                }

            },

            {

                name: 'itemshow',
                handler: 'updateNav'

            }

        ],

        methods: {

            updateNav: function() {
                var this$1 = this;


                var i = this.getValidIndex();
                this.navItems.forEach(function (el) {

                    var cmd = data(el, this$1.attrItem);

                    toggleClass(el, this$1.clsActive, toNumber(cmd) === i);
                    toggleClass(el, 'uk-invisible', this$1.finite && (cmd === 'previous' && i === 0 || cmd === 'next' && i >= this$1.maxIndex));
                });

            }

        }

    };

    var Slider = {

        mixins: [SliderAutoplay, SliderDrag, SliderNav],

        props: {
            clsActivated: Boolean,
            easing: String,
            index: Number,
            finite: Boolean,
            velocity: Number,
            selSlides: String
        },

        data: function () { return ({
            easing: 'ease',
            finite: false,
            velocity: 1,
            index: 0,
            prevIndex: -1,
            stack: [],
            percent: 0,
            clsActive: 'uk-active',
            clsActivated: false,
            Transitioner: false,
            transitionOptions: {}
        }); },

        connected: function() {
            this.prevIndex = -1;
            this.index = this.getValidIndex(this.$props.index);
            this.stack = [];
        },

        disconnected: function() {
            removeClass(this.slides, this.clsActive);
        },

        computed: {

            duration: function(ref, $el) {
                var velocity = ref.velocity;

                return speedUp($el.offsetWidth / velocity);
            },

            list: function(ref, $el) {
                var selList = ref.selList;

                return $(selList, $el);
            },

            maxIndex: function() {
                return this.length - 1;
            },

            selSlides: function(ref) {
                var selList = ref.selList;
                var selSlides = ref.selSlides;

                return (selList + " " + (selSlides || '> *'));
            },

            slides: {

                get: function() {
                    return $$(this.selSlides, this.$el);
                },

                watch: function() {
                    this.$reset();
                }

            },

            length: function() {
                return this.slides.length;
            }

        },

        events: {

            itemshown: function() {
                this.$update(this.list);
            }

        },

        methods: {

            show: function(index, force) {
                var this$1 = this;
                if ( force === void 0 ) force = false;


                if (this.dragging || !this.length) {
                    return;
                }

                var ref = this;
                var stack = ref.stack;
                var queueIndex = force ? 0 : stack.length;
                var reset = function () {
                    stack.splice(queueIndex, 1);

                    if (stack.length) {
                        this$1.show(stack.shift(), true);
                    }
                };

                stack[force ? 'unshift' : 'push'](index);

                if (!force && stack.length > 1) {

                    if (stack.length === 2) {
                        this._transitioner.forward(Math.min(this.duration, 200));
                    }

                    return;
                }

                var prevIndex = this.getIndex(this.index);
                var prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
                var nextIndex = this.getIndex(index, this.index);
                var next = this.slides[nextIndex];

                if (prev === next) {
                    reset();
                    return;
                }

                this.dir = getDirection(index, prevIndex);
                this.prevIndex = prevIndex;
                this.index = nextIndex;

                if (prev && !trigger(prev, 'beforeitemhide', [this])
                    || !trigger(next, 'beforeitemshow', [this, prev])
                ) {
                    this.index = this.prevIndex;
                    reset();
                    return;
                }

                var promise = this._show(prev, next, force).then(function () {

                    prev && trigger(prev, 'itemhidden', [this$1]);
                    trigger(next, 'itemshown', [this$1]);

                    return new Promise$1(function (resolve) {
                        fastdom.write(function () {
                            stack.shift();
                            if (stack.length) {
                                this$1.show(stack.shift(), true);
                            } else {
                                this$1._transitioner = null;
                            }
                            resolve();
                        });
                    });

                });

                prev && trigger(prev, 'itemhide', [this]);
                trigger(next, 'itemshow', [this]);

                return promise;

            },

            getIndex: function(index, prev) {
                if ( index === void 0 ) index = this.index;
                if ( prev === void 0 ) prev = this.index;

                return clamp(getIndex(index, this.slides, prev, this.finite), 0, this.maxIndex);
            },

            getValidIndex: function(index, prevIndex) {
                if ( index === void 0 ) index = this.index;
                if ( prevIndex === void 0 ) prevIndex = this.prevIndex;

                return this.getIndex(index, prevIndex);
            },

            _show: function(prev, next, force) {

                this._transitioner = this._getTransitioner(
                    prev,
                    next,
                    this.dir,
                    assign({
                        easing: force
                            ? next.offsetWidth < 600
                                ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' /* easeOutQuad */
                                : 'cubic-bezier(0.165, 0.84, 0.44, 1)' /* easeOutQuart */
                            : this.easing
                    }, this.transitionOptions)
                );

                if (!force && !prev) {
                    this._translate(1);
                    return Promise$1.resolve();
                }

                var ref = this.stack;
                var length = ref.length;
                return this._transitioner[length > 1 ? 'forward' : 'show'](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);

            },

            _getDistance: function(prev, next) {
                return this._getTransitioner(prev, prev !== next && next).getDistance();
            },

            _translate: function(percent, prev, next) {
                if ( prev === void 0 ) prev = this.prevIndex;
                if ( next === void 0 ) next = this.index;

                var transitioner = this._getTransitioner(prev !== next ? prev : false, next);
                transitioner.translate(percent);
                return transitioner;
            },

            _getTransitioner: function(prev, next, dir, options) {
                if ( prev === void 0 ) prev = this.prevIndex;
                if ( next === void 0 ) next = this.index;
                if ( dir === void 0 ) dir = this.dir || 1;
                if ( options === void 0 ) options = this.transitionOptions;

                return new this.Transitioner(
                    isNumber(prev) ? this.slides[prev] : prev,
                    isNumber(next) ? this.slides[next] : next,
                    dir * (isRtl ? -1 : 1),
                    options
                );
            }

        }

    };

    function getDirection(index, prevIndex) {
        return index === 'next'
            ? 1
            : index === 'previous'
                ? -1
                : index < prevIndex
                    ? -1
                    : 1;
    }

    function speedUp(x) {
        return .5 * x + 300; // parabola through (400,500; 600,600; 1800,1200)
    }

    var Slideshow = {

        mixins: [Slider],

        props: {
            animation: String
        },

        data: {
            animation: 'slide',
            clsActivated: 'uk-transition-active',
            Animations: Animations$2,
            Transitioner: Transitioner$1
        },

        computed: {

            animation: function(ref) {
                var animation = ref.animation;
                var Animations = ref.Animations;

                return assign(Animations[animation] || Animations.slide, {name: animation});
            },

            transitionOptions: function() {
                return {animation: this.animation};
            }

        },

        events: {

            'itemshow itemhide itemshown itemhidden': function(ref) {
                var target = ref.target;

                this.$update(target);
            },

            beforeitemshow: function(ref) {
                var target = ref.target;

                addClass(target, this.clsActive);
            },

            itemshown: function(ref) {
                var target = ref.target;

                addClass(target, this.clsActivated);
            },

            itemhidden: function(ref) {
                var target = ref.target;

                removeClass(target, this.clsActive, this.clsActivated);
            }

        }

    };

    var LightboxPanel = {

        mixins: [Container, Modal, Togglable, Slideshow],

        functional: true,

        props: {
            delayControls: Number,
            preload: Number,
            videoAutoplay: Boolean,
            template: String
        },

        data: function () { return ({
            preload: 1,
            videoAutoplay: false,
            delayControls: 3000,
            items: [],
            cls: 'uk-open',
            clsPage: 'uk-lightbox-page',
            selList: '.uk-lightbox-items',
            attrItem: 'uk-lightbox-item',
            selClose: '.uk-close-large',
            selCaption: '.uk-lightbox-caption',
            pauseOnHover: false,
            velocity: 2,
            Animations: Animations$1,
            template: "<div class=\"uk-lightbox uk-overflow-hidden\"> <ul class=\"uk-lightbox-items\"></ul> <div class=\"uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque\"> <button class=\"uk-lightbox-toolbar-icon uk-close-large\" type=\"button\" uk-close></button> </div> <a class=\"uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade\" href uk-slidenav-previous uk-lightbox-item=\"previous\"></a> <a class=\"uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade\" href uk-slidenav-next uk-lightbox-item=\"next\"></a> <div class=\"uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque\"></div> </div>"
        }); },

        created: function() {

            var $el = $(this.template);
            var list = $(this.selList, $el);
            this.items.forEach(function () { return append(list, '<li>'); });

            this.$mount(append(this.container, $el));

        },

        computed: {

            caption: function(ref, $el) {
                var selCaption = ref.selCaption;

                return $(selCaption, $el);
            }

        },

        events: [

            {

                name: (pointerMove + " " + pointerDown + " keydown"),

                handler: 'showControls'

            },

            {

                name: 'click',

                self: true,

                delegate: function() {
                    return this.selSlides;
                },

                handler: function(e) {

                    if (e.defaultPrevented) {
                        return;
                    }

                    this.hide();
                }

            },

            {

                name: 'shown',

                self: true,

                handler: function() {
                    this.showControls();
                }

            },

            {

                name: 'hide',

                self: true,

                handler: function() {

                    this.hideControls();

                    removeClass(this.slides, this.clsActive);
                    Transition.stop(this.slides);

                }
            },

            {

                name: 'hidden',

                self: true,

                handler: function() {
                    this.$destroy(true);
                }

            },

            {

                name: 'keyup',

                el: function() {
                    return document;
                },

                handler: function(e) {

                    if (!this.isToggled(this.$el) || !this.draggable) {
                        return;
                    }

                    switch (e.keyCode) {
                        case 37:
                            this.show('previous');
                            break;
                        case 39:
                            this.show('next');
                            break;
                    }
                }
            },

            {

                name: 'beforeitemshow',

                handler: function(e) {

                    if (this.isToggled()) {
                        return;
                    }

                    this.draggable = false;

                    e.preventDefault();

                    this.toggleElement(this.$el, true, false);

                    this.animation = Animations$1['scale'];
                    removeClass(e.target, this.clsActive);
                    this.stack.splice(1, 0, this.index);

                }

            },

            {

                name: 'itemshow',

                handler: function() {

                    html(this.caption, this.getItem().caption || '');

                    for (var j = -this.preload; j <= this.preload; j++) {
                        this.loadItem(this.index + j);
                    }

                }

            },

            {

                name: 'itemshown',

                handler: function() {
                    this.draggable = this.$props.draggable;
                }

            },

            {

                name: 'itemload',

                handler: function(_, item) {
                    var this$1 = this;


                    var src = item.source;
                    var type = item.type;
                    var alt = item.alt; if ( alt === void 0 ) alt = '';
                    var poster = item.poster;
                    var attrs = item.attrs; if ( attrs === void 0 ) attrs = {};

                    this.setItem(item, '<span uk-spinner></span>');

                    if (!src) {
                        return;
                    }

                    var matches;
                    var iframeAttrs = {
                        frameborder: '0',
                        allow: 'autoplay',
                        allowfullscreen: '',
                        style: 'max-width: 100%; box-sizing: border-box;',
                        'uk-responsive': '',
                        'uk-video': ("" + (this.videoAutoplay))
                    };

                    // Image
                    if (type === 'image' || src.match(/\.(avif|jpe?g|a?png|gif|svg|webp)($|\?)/i)) {

                        getImage(src, attrs.srcset, attrs.size).then(
                            function (ref) {
                                var width = ref.width;
                                var height = ref.height;

                                return this$1.setItem(item, createEl('img', assign({src: src, width: width, height: height, alt: alt}, attrs)));
                        },
                            function () { return this$1.setError(item); }
                        );

                    // Video
                    } else if (type === 'video' || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {

                        var video = createEl('video', assign({
                            src: src,
                            poster: poster,
                            controls: '',
                            playsinline: '',
                            'uk-video': ("" + (this.videoAutoplay))
                        }, attrs));

                        on(video, 'loadedmetadata', function () {
                            attr(video, {width: video.videoWidth, height: video.videoHeight});
                            this$1.setItem(item, video);
                        });
                        on(video, 'error', function () { return this$1.setError(item); });

                    // Iframe
                    } else if (type === 'iframe' || src.match(/\.(html|php)($|\?)/i)) {

                        this.setItem(item, createEl('iframe', assign({
                            src: src,
                            frameborder: '0',
                            allowfullscreen: '',
                            class: 'uk-lightbox-iframe'
                        }, attrs)));

                    // YouTube
                    } else if ((matches = src.match(/\/\/(?:.*?youtube(-nocookie)?\..*?[?&]v=|youtu\.be\/)([\w-]{11})[&?]?(.*)?/))) {

                        this.setItem(item, createEl('iframe', assign({
                            src: ("https://www.youtube" + (matches[1] || '') + ".com/embed/" + (matches[2]) + (matches[3] ? ("?" + (matches[3])) : '')),
                            width: 1920,
                            height: 1080
                        }, iframeAttrs, attrs)));

                    // Vimeo
                    } else if ((matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/))) {

                        ajax(("https://vimeo.com/api/oembed.json?maxwidth=1920&url=" + (encodeURI(src))), {
                            responseType: 'json',
                            withCredentials: false
                        }).then(
                            function (ref) {
                                var ref_response = ref.response;
                                var height = ref_response.height;
                                var width = ref_response.width;

                                return this$1.setItem(item, createEl('iframe', assign({
                                src: ("https://player.vimeo.com/video/" + (matches[1]) + (matches[2] ? ("?" + (matches[2])) : '')),
                                width: width,
                                height: height
                            }, iframeAttrs, attrs)));
                        },
                            function () { return this$1.setError(item); }
                        );

                    }

                }

            }

        ],

        methods: {

            loadItem: function(index) {
                if ( index === void 0 ) index = this.index;


                var item = this.getItem(index);

                if (!this.getSlide(item).childElementCount) {
                    trigger(this.$el, 'itemload', [item]);
                }
            },

            getItem: function(index) {
                if ( index === void 0 ) index = this.index;

                return this.items[getIndex(index, this.slides)];
            },

            setItem: function(item, content) {
                trigger(this.$el, 'itemloaded', [this, html(this.getSlide(item), content) ]);
            },

            getSlide: function(item) {
                return this.slides[this.items.indexOf(item)];
            },

            setError: function(item) {
                this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
            },

            showControls: function() {

                clearTimeout(this.controlsTimer);
                this.controlsTimer = setTimeout(this.hideControls, this.delayControls);

                addClass(this.$el, 'uk-active', 'uk-transition-active');

            },

            hideControls: function() {
                removeClass(this.$el, 'uk-active', 'uk-transition-active');
            }

        }

    };

    function createEl(tag, attrs) {
        var el = fragment(("<" + tag + ">"));
        attr(el, attrs);
        return el;
    }

    var lightbox = {

        install: install$1,

        props: {toggle: String},

        data: {toggle: 'a'},

        computed: {

            toggles: {

                get: function(ref, $el) {
                    var toggle = ref.toggle;

                    return $$(toggle, $el);
                },

                watch: function() {
                    this.hide();
                }

            }

        },

        disconnected: function() {
            this.hide();
        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return ((this.toggle) + ":not(.uk-disabled)");
                },

                handler: function(e) {
                    e.preventDefault();
                    this.show(e.current);
                }

            }

        ],

        methods: {

            show: function(index) {
                var this$1 = this;


                var items = uniqueBy(this.toggles.map(toItem), 'source');

                if (isElement(index)) {
                    var ref = toItem(index);
                    var source = ref.source;
                    index = findIndex(items, function (ref) {
                        var src = ref.source;

                        return source === src;
                    });
                }

                this.panel = this.panel || this.$create('lightboxPanel', assign({}, this.$props, {items: items}));

                on(this.panel.$el, 'hidden', function () { return this$1.panel = false; });

                return this.panel.show(index);

            },

            hide: function() {

                return this.panel && this.panel.hide();

            }

        }

    };

    function install$1(UIkit, Lightbox) {

        if (!UIkit.lightboxPanel) {
            UIkit.component('lightboxPanel', LightboxPanel);
        }

        assign(
            Lightbox.props,
            UIkit.component('lightboxPanel').options.props
        );

    }

    function toItem(el) {

        var item = {};

        ['href', 'caption', 'type', 'poster', 'alt', 'attrs'].forEach(function (attr) {
            item[attr === 'href' ? 'source' : attr] = data(el, attr);
        });

        item.attrs = parseOptions(item.attrs);

        return item;
    }

    var obj$1;

    var notification = {

        mixins: [Container],

        functional: true,

        args: ['message', 'status'],

        data: {
            message: '',
            status: '',
            timeout: 5000,
            group: null,
            pos: 'top-center',
            clsContainer: 'uk-notification',
            clsClose: 'uk-notification-close',
            clsMsg: 'uk-notification-message'
        },

        install: install,

        computed: {

            marginProp: function(ref) {
                var pos = ref.pos;

                return ("margin" + (startsWith(pos, 'top') ? 'Top' : 'Bottom'));
            },

            startProps: function() {
                var obj;

                return ( obj = {opacity: 0}, obj[this.marginProp] = -this.$el.offsetHeight, obj );
            }

        },

        created: function() {

            var container = $(("." + (this.clsContainer) + "-" + (this.pos)), this.container)
                || append(this.container, ("<div class=\"" + (this.clsContainer) + " " + (this.clsContainer) + "-" + (this.pos) + "\" style=\"display: block\"></div>"));

            this.$mount(append(container,
                ("<div class=\"" + (this.clsMsg) + (this.status ? (" " + (this.clsMsg) + "-" + (this.status)) : '') + "\"> <a href class=\"" + (this.clsClose) + "\" data-uk-close></a> <div>" + (this.message) + "</div> </div>")
            ));

        },

        connected: function() {
            var this$1 = this;
            var obj;


            var margin = toFloat(css(this.$el, this.marginProp));
            Transition.start(
                css(this.$el, this.startProps),
                ( obj = {opacity: 1}, obj[this.marginProp] = margin, obj )
            ).then(function () {
                if (this$1.timeout) {
                    this$1.timer = setTimeout(this$1.close, this$1.timeout);
                }
            });

        },

        events: ( obj$1 = {

            click: function(e) {
                if (closest(e.target, 'a[href="#"],a[href=""]')) {
                    e.preventDefault();
                }
                this.close();
            }

        }, obj$1[pointerEnter] = function () {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            }, obj$1[pointerLeave] = function () {
                if (this.timeout) {
                    this.timer = setTimeout(this.close, this.timeout);
                }
            }, obj$1 ),

        methods: {

            close: function(immediate) {
                var this$1 = this;


                var removeFn = function (el) {

                    var container = parent(el);

                    trigger(el, 'close', [this$1]);
                    remove$1(el);

                    if (container && !container.hasChildNodes()) {
                        remove$1(container);
                    }

                };

                if (this.timer) {
                    clearTimeout(this.timer);
                }

                if (immediate) {
                    removeFn(this.$el);
                } else {
                    Transition.start(this.$el, this.startProps).then(removeFn);
                }
            }

        }

    };

    function install(UIkit) {
        UIkit.notification.closeAll = function (group, immediate) {
            apply$1(document.body, function (el) {
                var notification = UIkit.getComponent(el, 'notification');
                if (notification && (!group || group === notification.group)) {
                    notification.close(immediate);
                }
            });
        };
    }

    var props = ['x', 'y', 'bgx', 'bgy', 'rotate', 'scale', 'color', 'backgroundColor', 'borderColor', 'opacity', 'blur', 'hue', 'grayscale', 'invert', 'saturate', 'sepia', 'fopacity', 'stroke'];

    var Parallax = {

        mixins: [Media],

        props: props.reduce(function (props, prop) {
            props[prop] = 'list';
            return props;
        }, {}),

        data: props.reduce(function (data, prop) {
            data[prop] = undefined;
            return data;
        }, {}),

        computed: {

            props: function(properties, $el) {
                var this$1 = this;


                return props.reduce(function (props, prop) {

                    if (isUndefined(properties[prop])) {
                        return props;
                    }

                    var isColor = prop.match(/color/i);
                    var isCssProp = isColor || prop === 'opacity';

                    var pos, bgPos, diff;
                    var steps = properties[prop].slice();

                    if (isCssProp) {
                        css($el, prop, '');
                    }

                    if (steps.length < 2) {
                        steps.unshift((prop === 'scale'
                            ? 1
                            : isCssProp
                                ? css($el, prop)
                                : 0) || 0);
                    }

                    var unit = getUnit(steps);

                    if (isColor) {

                        var ref = $el.style;
                        var color = ref.color;
                        steps = steps.map(function (step) { return parseColor($el, step); });
                        $el.style.color = color;

                    } else if (startsWith(prop, 'bg')) {

                        var attr = prop === 'bgy' ? 'height' : 'width';
                        steps = steps.map(function (step) { return toPx(step, attr, this$1.$el); });

                        css($el, ("background-position-" + (prop[2])), '');
                        bgPos = css($el, 'backgroundPosition').split(' ')[prop[2] === 'x' ? 0 : 1]; // IE 11 can't read background-position-[x|y]

                        if (this$1.covers) {

                            var min = Math.min.apply(Math, steps);
                            var max = Math.max.apply(Math, steps);
                            var down = steps.indexOf(min) < steps.indexOf(max);

                            diff = max - min;

                            steps = steps.map(function (step) { return step - (down ? min : max); });
                            pos = (down ? -diff : 0) + "px";

                        } else {

                            pos = bgPos;

                        }

                    } else {

                        steps = steps.map(toFloat);

                    }

                    if (prop === 'stroke') {

                        if (!steps.some(function (step) { return step; })) {
                            return props;
                        }

                        var length = getMaxPathLength(this$1.$el);
                        css($el, 'strokeDasharray', length);

                        if (unit === '%') {
                            steps = steps.map(function (step) { return step * length / 100; });
                        }

                        steps = steps.reverse();

                        prop = 'strokeDashoffset';
                    }

                    props[prop] = {steps: steps, unit: unit, pos: pos, bgPos: bgPos, diff: diff};

                    return props;

                }, {});

            },

            bgProps: function() {
                var this$1 = this;

                return ['bgx', 'bgy'].filter(function (bg) { return bg in this$1.props; });
            },

            covers: function(_, $el) {
                return covers($el);
            }

        },

        disconnected: function() {
            delete this._image;
        },

        update: {

            read: function(data) {
                var this$1 = this;


                if (!this.matchMedia) {
                    return;
                }

                if (!data.image && this.covers && this.bgProps.length) {
                    var src = css(this.$el, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1');

                    if (src) {
                        var img = new Image();
                        img.src = src;
                        data.image = img;

                        if (!img.naturalWidth) {
                            img.onload = function () { return this$1.$update(); };
                        }
                    }

                }

                var image = data.image;

                if (!image || !image.naturalWidth) {
                    return;
                }

                var dimEl = {
                    width: this.$el.offsetWidth,
                    height: this.$el.offsetHeight
                };
                var dimImage = {
                    width: image.naturalWidth,
                    height: image.naturalHeight
                };

                var dim = Dimensions.cover(dimImage, dimEl);

                this.bgProps.forEach(function (prop) {

                    var ref = this$1.props[prop];
                    var diff = ref.diff;
                    var bgPos = ref.bgPos;
                    var steps = ref.steps;
                    var attr = prop === 'bgy' ? 'height' : 'width';
                    var span = dim[attr] - dimEl[attr];

                    if (span < diff) {
                        dimEl[attr] = dim[attr] + diff - span;
                    } else if (span > diff) {

                        var posPercentage = dimEl[attr] / toPx(bgPos, attr, this$1.$el);

                        if (posPercentage) {
                            this$1.props[prop].steps = steps.map(function (step) { return step - (span - diff) / posPercentage; });
                        }
                    }

                    dim = Dimensions.cover(dimImage, dimEl);
                });

                data.dim = dim;
            },

            write: function(ref) {
                var dim = ref.dim;


                if (!this.matchMedia) {
                    css(this.$el, {backgroundSize: '', backgroundRepeat: ''});
                    return;
                }

                dim && css(this.$el, {
                    backgroundSize: ((dim.width) + "px " + (dim.height) + "px"),
                    backgroundRepeat: 'no-repeat'
                });

            },

            events: ['resize']

        },

        methods: {

            reset: function() {
                var this$1 = this;

                each(this.getCss(0), function (_, prop) { return css(this$1.$el, prop, ''); });
            },

            getCss: function(percent) {

                var ref = this;
                var props = ref.props;
                return Object.keys(props).reduce(function (css, prop) {

                    var ref = props[prop];
                    var steps = ref.steps;
                    var unit = ref.unit;
                    var pos = ref.pos;
                    var value = getValue(steps, percent);

                    switch (prop) {

                        // transforms
                        case 'x':
                        case 'y': {
                            unit = unit || 'px';
                            css.transform += " translate" + (ucfirst(prop)) + "(" + (toFloat(value).toFixed(unit === 'px' ? 0 : 2)) + unit + ")";
                            break;
                        }
                        case 'rotate':
                            unit = unit || 'deg';
                            css.transform += " rotate(" + (value + unit) + ")";
                            break;
                        case 'scale':
                            css.transform += " scale(" + value + ")";
                            break;

                        // bg image
                        case 'bgy':
                        case 'bgx':
                            css[("background-position-" + (prop[2]))] = "calc(" + pos + " + " + value + "px)";
                            break;

                        // color
                        case 'color':
                        case 'backgroundColor':
                        case 'borderColor': {

                            var ref$1 = getStep(steps, percent);
                            var start = ref$1[0];
                            var end = ref$1[1];
                            var p = ref$1[2];

                            css[prop] = "rgba(" + (start.map(function (value, i) {
                                    value = value + p * (end[i] - value);
                                    return i === 3 ? toFloat(value) : parseInt(value, 10);
                                }).join(',')) + ")";
                            break;
                        }
                        // CSS Filter
                        case 'blur':
                            unit = unit || 'px';
                            css.filter += " blur(" + (value + unit) + ")";
                            break;
                        case 'hue':
                            unit = unit || 'deg';
                            css.filter += " hue-rotate(" + (value + unit) + ")";
                            break;
                        case 'fopacity':
                            unit = unit || '%';
                            css.filter += " opacity(" + (value + unit) + ")";
                            break;
                        case 'grayscale':
                        case 'invert':
                        case 'saturate':
                        case 'sepia':
                            unit = unit || '%';
                            css.filter += " " + prop + "(" + (value + unit) + ")";
                            break;
                        default:
                            css[prop] = value;
                    }

                    return css;

                }, {transform: '', filter: ''});

            }

        }

    };

    function parseColor(el, color) {
        return css(css(el, 'color', color), 'color')
            .split(/[(),]/g)
            .slice(1, -1)
            .concat(1)
            .slice(0, 4)
            .map(toFloat);
    }

    function getStep(steps, percent) {
        var count = steps.length - 1;
        var index = Math.min(Math.floor(count * percent), count - 1);
        var step = steps.slice(index, index + 2);

        step.push(percent === 1 ? 1 : percent % (1 / count) * count);

        return step;
    }

    function getValue(steps, percent, digits) {
        if ( digits === void 0 ) digits = 2;

        var ref = getStep(steps, percent);
        var start = ref[0];
        var end = ref[1];
        var p = ref[2];
        return (isNumber(start)
            ? start + Math.abs(start - end) * p * (start < end ? 1 : -1)
            : +end
        ).toFixed(digits);
    }

    function getUnit(steps) {
        return steps.reduce(function (unit, step) { return isString(step) && step.replace(/-|\d/g, '').trim() || unit; }, '');
    }

    function covers(el) {
        var ref = el.style;
        var backgroundSize = ref.backgroundSize;
        var covers = css(css(el, 'backgroundSize', ''), 'backgroundSize') === 'cover';
        el.style.backgroundSize = backgroundSize;
        return covers;
    }

    var parallax = {

        mixins: [Parallax],

        props: {
            target: String,
            viewport: Number,
            easing: Number
        },

        data: {
            target: false,
            viewport: 1,
            easing: 1
        },

        computed: {

            target: function(ref, $el) {
                var target = ref.target;

                return getOffsetElement(target && query(target, $el) || $el);
            }

        },

        update: {

            read: function(ref, types) {
                var percent = ref.percent;


                if (!types.has('scroll')) {
                    percent = false;
                }

                if (!this.matchMedia) {
                    return;
                }

                var prev = percent;
                percent = ease(scrolledOver(this.target) / (this.viewport || 1), this.easing);

                return {
                    percent: percent,
                    style: prev !== percent ? this.getCss(percent) : false
                };
            },

            write: function(ref) {
                var style = ref.style;


                if (!this.matchMedia) {
                    this.reset();
                    return;
                }

                style && css(this.$el, style);

            },

            events: ['scroll', 'resize']
        }

    };

    function ease(percent, easing) {
        return clamp(percent * (1 - (easing - easing * percent)));
    }

    // SVG elements do not inherit from HTMLElement
    function getOffsetElement(el) {
        return el
            ? 'offsetTop' in el
                ? el
                : getOffsetElement(parent(el))
            : document.body;
    }

    var SliderReactive = {

        update: {

            write: function() {

                if (this.stack.length || this.dragging) {
                    return;
                }

                var index = this.getValidIndex(this.index);

                if (!~this.prevIndex || this.index !== index) {
                    this.show(index);
                }

            },

            events: ['resize']

        }

    };

    function Transitioner (prev, next, dir, ref) {
        var center = ref.center;
        var easing = ref.easing;
        var list = ref.list;


        var deferred = new Deferred();

        var from = prev
            ? getLeft(prev, list, center)
            : getLeft(next, list, center) + dimensions(next).width * dir;
        var to = next
            ? getLeft(next, list, center)
            : from + dimensions(prev).width * dir * (isRtl ? -1 : 1);

        return {

            dir: dir,

            show: function(duration, percent, linear) {
                if ( percent === void 0 ) percent = 0;


                var timing = linear ? 'linear' : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));

                this.translate(percent);

                percent = prev ? percent : clamp(percent, 0, 1);
                triggerUpdate(this.getItemIn(), 'itemin', {percent: percent, duration: duration, timing: timing, dir: dir});
                prev && triggerUpdate(this.getItemIn(true), 'itemout', {percent: 1 - percent, duration: duration, timing: timing, dir: dir});

                Transition
                    .start(list, {transform: translate(-to * (isRtl ? -1 : 1), 'px')}, duration, timing)
                    .then(deferred.resolve, noop);

                return deferred.promise;

            },

            cancel: function() {
                Transition.cancel(list);
            },

            reset: function() {
                css(list, 'transform', '');
            },

            forward: function(duration, percent) {
                if ( percent === void 0 ) percent = this.percent();

                Transition.cancel(list);
                return this.show(duration, percent, true);
            },

            translate: function(percent) {

                var distance = this.getDistance() * dir * (isRtl ? -1 : 1);

                css(list, 'transform', translate(clamp(
                    -to + (distance - distance * percent),
                    -getWidth(list),
                    dimensions(list).width
                ) * (isRtl ? -1 : 1), 'px'));

                var actives = this.getActives();
                var itemIn = this.getItemIn();
                var itemOut = this.getItemIn(true);

                percent = prev ? clamp(percent, -1, 1) : 0;

                children(list).forEach(function (slide) {
                    var isActive = includes(actives, slide);
                    var isIn = slide === itemIn;
                    var isOut = slide === itemOut;
                    var translateIn = isIn || !isOut && (isActive || dir * (isRtl ? -1 : 1) === -1 ^ getElLeft(slide, list) > getElLeft(prev || next));

                    triggerUpdate(slide, ("itemtranslate" + (translateIn ? 'in' : 'out')), {
                        dir: dir,
                        percent: isOut
                            ? 1 - percent
                            : isIn
                                ? percent
                                : isActive
                                    ? 1
                                    : 0
                    });
                });

            },

            percent: function() {
                return Math.abs((css(list, 'transform').split(',')[4] * (isRtl ? -1 : 1) + from) / (to - from));
            },

            getDistance: function() {
                return Math.abs(to - from);
            },

            getItemIn: function(out) {
                if ( out === void 0 ) out = false;


                var actives = this.getActives();
                var nextActives = inView(list, getLeft(next || prev, list, center));

                if (out) {
                    var temp = actives;
                    actives = nextActives;
                    nextActives = temp;
                }

                return nextActives[findIndex(nextActives, function (el) { return !includes(actives, el); })];

            },

            getActives: function() {
                return inView(list, getLeft(prev || next, list, center));
            }

        };

    }

    function getLeft(el, list, center) {

        var left = getElLeft(el, list);

        return center
            ? left - centerEl(el, list)
            : Math.min(left, getMax(list));

    }

    function getMax(list) {
        return Math.max(0, getWidth(list) - dimensions(list).width);
    }

    function getWidth(list) {
        return children(list).reduce(function (right, el) { return dimensions(el).width + right; }, 0);
    }

    function centerEl(el, list) {
        return dimensions(list).width / 2 - dimensions(el).width / 2;
    }

    function getElLeft(el, list) {
        return el && (position(el).left + (isRtl ? dimensions(el).width - dimensions(list).width : 0)) * (isRtl ? -1 : 1) || 0;
    }

    function inView(list, listLeft) {

        listLeft -= 1;
        var listRight = listLeft + dimensions(list).width + 2;

        return children(list).filter(function (slide) {
            var slideLeft = getElLeft(slide, list);
            var slideRight = slideLeft + dimensions(slide).width;

            return slideLeft >= listLeft && slideRight <= listRight;
        });
    }

    function triggerUpdate(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }

    var slider = {

        mixins: [Class, Slider, SliderReactive],

        props: {
            center: Boolean,
            sets: Boolean
        },

        data: {
            center: false,
            sets: false,
            attrItem: 'uk-slider-item',
            selList: '.uk-slider-items',
            selNav: '.uk-slider-nav',
            clsContainer: 'uk-slider-container',
            Transitioner: Transitioner
        },

        computed: {

            avgWidth: function() {
                return getWidth(this.list) / this.length;
            },

            finite: function(ref) {
                var finite = ref.finite;

                return finite || Math.ceil(getWidth(this.list)) < dimensions(this.list).width + getMaxElWidth(this.list) + this.center;
            },

            maxIndex: function() {

                if (!this.finite || this.center && !this.sets) {
                    return this.length - 1;
                }

                if (this.center) {
                    return last(this.sets);
                }

                var lft = 0;
                var max = getMax(this.list);
                var index = findIndex(this.slides, function (el) {

                    if (lft >= max) {
                        return true;
                    }

                    lft += dimensions(el).width;

                });

                return ~index ? index : this.length - 1;
            },

            sets: function(ref) {
                var this$1 = this;
                var sets = ref.sets;


                if (!sets) {
                    return;
                }

                var width = dimensions(this.list).width / (this.center ? 2 : 1);

                var left = 0;
                var leftCenter = width;
                var slideLeft = 0;

                sets = sortBy$1(this.slides, 'offsetLeft').reduce(function (sets, slide, i) {

                    var slideWidth = dimensions(slide).width;
                    var slideRight = slideLeft + slideWidth;

                    if (slideRight > left) {

                        if (!this$1.center && i > this$1.maxIndex) {
                            i = this$1.maxIndex;
                        }

                        if (!includes(sets, i)) {

                            var cmp = this$1.slides[i + 1];
                            if (this$1.center && cmp && slideWidth < leftCenter - dimensions(cmp).width / 2) {
                                leftCenter -= slideWidth;
                            } else {
                                leftCenter = width;
                                sets.push(i);
                                left = slideLeft + width + (this$1.center ? slideWidth / 2 : 0);
                            }

                        }
                    }

                    slideLeft += slideWidth;

                    return sets;

                }, []);

                return !isEmpty(sets) && sets;

            },

            transitionOptions: function() {
                return {
                    center: this.center,
                    list: this.list
                };
            }

        },

        connected: function() {
            toggleClass(this.$el, this.clsContainer, !$(("." + (this.clsContainer)), this.$el));
        },

        update: {

            write: function() {
                var this$1 = this;

                this.navItems.forEach(function (el) {
                    var index = toNumber(data(el, this$1.attrItem));
                    if (index !== false) {
                        el.hidden = !this$1.maxIndex || index > this$1.maxIndex || this$1.sets && !includes(this$1.sets, index);
                    }
                });

                if (this.length && !this.dragging && !this.stack.length) {
                    this.reorder();
                    this._translate(1);
                }

                var actives = this._getTransitioner(this.index).getActives();
                this.slides.forEach(function (slide) { return toggleClass(slide, this$1.clsActive, includes(actives, slide)); });

                if (this.clsActivated && (!this.sets || includes(this.sets, toFloat(this.index)))) {
                    this.slides.forEach(function (slide) { return toggleClass(slide, this$1.clsActivated || '', includes(actives, slide)); });
                }
            },

            events: ['resize']

        },

        events: {

            beforeitemshow: function(e) {

                if (!this.dragging && this.sets && this.stack.length < 2 && !includes(this.sets, this.index)) {
                    this.index = this.getValidIndex();
                }

                var diff = Math.abs(
                    this.index
                    - this.prevIndex
                    + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0)
                );

                if (!this.dragging && diff > 1) {

                    for (var i = 0; i < diff; i++) {
                        this.stack.splice(1, 0, this.dir > 0 ? 'next' : 'previous');
                    }

                    e.preventDefault();
                    return;
                }

                var index = this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex;
                this.duration = speedUp(this.avgWidth / this.velocity) * (dimensions(this.slides[index]).width / this.avgWidth);

                this.reorder();

            },

            itemshow: function() {
                if (~this.prevIndex) {
                    addClass(this._getTransitioner().getItemIn(), this.clsActive);
                }
            }

        },

        methods: {

            reorder: function() {
                var this$1 = this;


                if (this.finite) {
                    css(this.slides, 'order', '');
                    return;
                }

                var index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;

                this.slides.forEach(function (slide, i) { return css(slide, 'order', this$1.dir > 0 && i < index
                        ? 1
                        : this$1.dir < 0 && i >= this$1.index
                            ? -1
                            : ''
                    ); }
                );

                if (!this.center) {
                    return;
                }

                var next = this.slides[index];
                var width = dimensions(this.list).width / 2 - dimensions(next).width / 2;
                var j = 0;

                while (width > 0) {
                    var slideIndex = this.getIndex(--j + index, index);
                    var slide = this.slides[slideIndex];

                    css(slide, 'order', slideIndex > index ? -2 : -1);
                    width -= dimensions(slide).width;
                }

            },

            getValidIndex: function(index, prevIndex) {
                if ( index === void 0 ) index = this.index;
                if ( prevIndex === void 0 ) prevIndex = this.prevIndex;


                index = this.getIndex(index, prevIndex);

                if (!this.sets) {
                    return index;
                }

                var prev;

                do {

                    if (includes(this.sets, index)) {
                        return index;
                    }

                    prev = index;
                    index = this.getIndex(index + this.dir, prevIndex);

                } while (index !== prev);

                return index;
            }

        }

    };

    function getMaxElWidth(list) {
        return Math.max.apply(Math, [ 0 ].concat( children(list).map(function (el) { return dimensions(el).width; }) ));
    }

    var sliderParallax = {

        mixins: [Parallax],

        data: {
            selItem: '!li'
        },

        computed: {

            item: function(ref, $el) {
                var selItem = ref.selItem;

                return query(selItem, $el);
            }

        },

        events: [

            {
                name: 'itemin itemout',

                self: true,

                el: function() {
                    return this.item;
                },

                handler: function(ref) {
                    var this$1 = this;
                    var type = ref.type;
                    var ref_detail = ref.detail;
                    var percent = ref_detail.percent;
                    var duration = ref_detail.duration;
                    var timing = ref_detail.timing;
                    var dir = ref_detail.dir;


                    fastdom.read(function () {
                        var propsFrom = this$1.getCss(getCurrentPercent(type, dir, percent));
                        var propsTo = this$1.getCss(isIn(type) ? .5 : dir > 0 ? 1 : 0);
                        fastdom.write(function () {
                            css(this$1.$el, propsFrom);
                            Transition.start(this$1.$el, propsTo, duration, timing).catch(noop);
                        });
                    });

                }
            },

            {
                name: 'transitioncanceled transitionend',

                self: true,

                el: function() {
                    return this.item;
                },

                handler: function() {
                    Transition.cancel(this.$el);
                }

            },

            {
                name: 'itemtranslatein itemtranslateout',

                self: true,

                el: function() {
                    return this.item;
                },

                handler: function(ref) {
                    var this$1 = this;
                    var type = ref.type;
                    var ref_detail = ref.detail;
                    var percent = ref_detail.percent;
                    var dir = ref_detail.dir;

                    fastdom.read(function () {
                        var props = this$1.getCss(getCurrentPercent(type, dir, percent));
                        fastdom.write(function () { return css(this$1.$el, props); });
                    });
                }
            }

        ]

    };

    function isIn(type) {
        return endsWith(type, 'in');
    }

    function getCurrentPercent(type, dir, percent) {

        percent /= 2;

        return !isIn(type)
            ? dir < 0
                ? percent
                : 1 - percent
            : dir < 0
                ? 1 - percent
                : percent;
    }

    var Animations = assign({}, Animations$2, {

        fade: {

            show: function() {
                return [
                    {opacity: 0, zIndex: 0},
                    {zIndex: -1}
                ];
            },

            percent: function(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function(percent) {
                return [
                    {opacity: 1 - percent, zIndex: 0},
                    {zIndex: -1}
                ];
            }

        },

        scale: {

            show: function() {
                return [
                    {opacity: 0, transform: scale3d(1 + .5), zIndex: 0},
                    {zIndex: -1}
                ];
            },

            percent: function(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function(percent) {
                return [
                    {opacity: 1 - percent, transform: scale3d(1 + .5 * percent), zIndex: 0},
                    {zIndex: -1}
                ];
            }

        },

        pull: {

            show: function(dir) {
                return dir < 0
                    ? [
                        {transform: translate(30), zIndex: -1},
                        {transform: translate(), zIndex: 0}
                    ]
                    : [
                        {transform: translate(-100), zIndex: 0},
                        {transform: translate(), zIndex: -1}
                    ];
            },

            percent: function(current, next, dir) {
                return dir < 0
                    ? 1 - translated(next)
                    : translated(current);
            },

            translate: function(percent, dir) {
                return dir < 0
                    ? [
                        {transform: translate(30 * percent), zIndex: -1},
                        {transform: translate(-100 * (1 - percent)), zIndex: 0}
                    ]
                    : [
                        {transform: translate(-percent * 100), zIndex: 0},
                        {transform: translate(30 * (1 - percent)), zIndex: -1}
                    ];
            }

        },

        push: {

            show: function(dir) {
                return dir < 0
                    ? [
                        {transform: translate(100), zIndex: 0},
                        {transform: translate(), zIndex: -1}
                    ]
                    : [
                        {transform: translate(-30), zIndex: -1},
                        {transform: translate(), zIndex: 0}
                    ];
            },

            percent: function(current, next, dir) {
                return dir > 0
                    ? 1 - translated(next)
                    : translated(current);
            },

            translate: function(percent, dir) {
                return dir < 0
                    ? [
                        {transform: translate(percent * 100), zIndex: 0},
                        {transform: translate(-30 * (1 - percent)), zIndex: -1}
                    ]
                    : [
                        {transform: translate(-30 * percent), zIndex: -1},
                        {transform: translate(100 * (1 - percent)), zIndex: 0}
                    ];
            }

        }

    });

    var slideshow = {

        mixins: [Class, Slideshow, SliderReactive],

        props: {
            ratio: String,
            minHeight: Number,
            maxHeight: Number
        },

        data: {
            ratio: '16:9',
            minHeight: false,
            maxHeight: false,
            selList: '.uk-slideshow-items',
            attrItem: 'uk-slideshow-item',
            selNav: '.uk-slideshow-nav',
            Animations: Animations
        },

        update: {

            read: function() {

                var ref = this.ratio.split(':').map(Number);
                var width = ref[0];
                var height = ref[1];

                height = height * this.list.offsetWidth / width || 0;

                if (this.minHeight) {
                    height = Math.max(this.minHeight, height);
                }

                if (this.maxHeight) {
                    height = Math.min(this.maxHeight, height);
                }

                return {height: height - boxModelAdjust(this.list, 'height', 'content-box')};
            },

            write: function(ref) {
                var height = ref.height;

                height > 0 && css(this.list, 'minHeight', height);
            },

            events: ['resize']

        }

    };

    var sortable = {

        mixins: [Class, Animate],

        props: {
            group: String,
            threshold: Number,
            clsItem: String,
            clsPlaceholder: String,
            clsDrag: String,
            clsDragState: String,
            clsBase: String,
            clsNoDrag: String,
            clsEmpty: String,
            clsCustom: String,
            handle: String
        },

        data: {
            group: false,
            threshold: 5,
            clsItem: 'uk-sortable-item',
            clsPlaceholder: 'uk-sortable-placeholder',
            clsDrag: 'uk-sortable-drag',
            clsDragState: 'uk-drag',
            clsBase: 'uk-sortable',
            clsNoDrag: 'uk-sortable-nodrag',
            clsEmpty: 'uk-sortable-empty',
            clsCustom: '',
            handle: false,
            pos: {}
        },

        created: function() {
            var this$1 = this;

            ['init', 'start', 'move', 'end'].forEach(function (key) {
                var fn = this$1[key];
                this$1[key] = function (e) {
                    assign(this$1.pos, getEventPos(e));
                    fn(e);
                };
            });
        },

        events: {

            name: pointerDown,
            passive: false,
            handler: 'init'

        },

        computed: {

            target: function() {
                return (this.$el.tBodies || [this.$el])[0];
            },

            items: function() {
                return children(this.target);
            },

            isEmpty: {

                get: function() {
                    return isEmpty(this.items);
                },

                watch: function(empty) {
                    toggleClass(this.target, this.clsEmpty, empty);
                },

                immediate: true

            },

            handles: {

                get: function(ref, el) {
                    var handle = ref.handle;

                    return handle ? $$(handle, el) : this.items;
                },

                watch: function(handles, prev) {
                    css(prev, {touchAction: '', userSelect: ''});
                    css(handles, {touchAction: hasTouch ? 'none' : '', userSelect: 'none'}); // touchAction set to 'none' causes a performance drop in Chrome 80
                },

                immediate: true

            }

        },

        update: {

            write: function(data) {

                if (!this.drag || !parent(this.placeholder)) {
                    return;
                }

                var ref = this;
                var ref_pos = ref.pos;
                var x = ref_pos.x;
                var y = ref_pos.y;
                var ref_origin = ref.origin;
                var offsetTop = ref_origin.offsetTop;
                var offsetLeft = ref_origin.offsetLeft;
                var placeholder = ref.placeholder;

                css(this.drag, {
                    top: y - offsetTop,
                    left: x - offsetLeft
                });

                var sortable = this.getSortable(document.elementFromPoint(x, y));

                if (!sortable) {
                    return;
                }

                var items = sortable.items;

                if (items.some(Transition.inProgress)) {
                    return;
                }

                var target = findTarget(items, {x: x, y: y});

                if (items.length && (!target || target === placeholder)) {
                    return;
                }

                var previous = this.getSortable(placeholder);
                var insertTarget = findInsertTarget(sortable.target, target, placeholder, x, y, sortable === previous && data.moved !== target);

                if (insertTarget === false) {
                    return;
                }

                if (insertTarget && placeholder === insertTarget) {
                    return;
                }

                if (sortable !== previous) {
                    previous.remove(placeholder);
                    data.moved = target;
                } else {
                    delete data.moved;
                }

                sortable.insert(placeholder, insertTarget);

                this.touched.add(sortable);
            },

            events: ['move']

        },

        methods: {

            init: function(e) {

                var target = e.target;
                var button = e.button;
                var defaultPrevented = e.defaultPrevented;
                var ref = this.items.filter(function (el) { return within(target, el); });
                var placeholder = ref[0];

                if (!placeholder
                    || defaultPrevented
                    || button > 0
                    || isInput(target)
                    || within(target, ("." + (this.clsNoDrag)))
                    || this.handle && !within(target, this.handle)
                ) {
                    return;
                }

                e.preventDefault();

                this.touched = new Set([this]);
                this.placeholder = placeholder;
                this.origin = assign({target: target, index: index(placeholder)}, this.pos);

                on(document, pointerMove, this.move);
                on(document, pointerUp, this.end);

                if (!this.threshold) {
                    this.start(e);
                }

            },

            start: function(e) {

                this.drag = appendDrag(this.$container, this.placeholder);
                var ref = this.placeholder.getBoundingClientRect();
                var left = ref.left;
                var top = ref.top;
                assign(this.origin, {offsetLeft: this.pos.x - left, offsetTop: this.pos.y - top});

                addClass(this.drag, this.clsDrag, this.clsCustom);
                addClass(this.placeholder, this.clsPlaceholder);
                addClass(this.items, this.clsItem);
                addClass(document.documentElement, this.clsDragState);

                trigger(this.$el, 'start', [this, this.placeholder]);

                trackScroll(this.pos);

                this.move(e);
            },

            move: function(e) {

                if (this.drag) {
                    this.$emit('move');
                } else if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
                    this.start(e);
                }

            },

            end: function() {
                var this$1 = this;


                off(document, pointerMove, this.move);
                off(document, pointerUp, this.end);
                off(window, 'scroll', this.scroll);

                if (!this.drag) {
                    return;
                }

                untrackScroll();

                var sortable = this.getSortable(this.placeholder);

                if (this === sortable) {
                    if (this.origin.index !== index(this.placeholder)) {
                        trigger(this.$el, 'moved', [this, this.placeholder]);
                    }
                } else {
                    trigger(sortable.$el, 'added', [sortable, this.placeholder]);
                    trigger(this.$el, 'removed', [this, this.placeholder]);
                }

                trigger(this.$el, 'stop', [this, this.placeholder]);

                remove$1(this.drag);
                this.drag = null;

                this.touched.forEach(function (ref) {
                        var clsPlaceholder = ref.clsPlaceholder;
                        var clsItem = ref.clsItem;

                        return this$1.touched.forEach(function (sortable) { return removeClass(sortable.items, clsPlaceholder, clsItem); }
                    );
                }
                );
                this.touched = null;
                removeClass(document.documentElement, this.clsDragState);

            },

            insert: function(element, target) {
                var this$1 = this;


                addClass(this.items, this.clsItem);

                var insert = function () { return target
                    ? before(target, element)
                    : append(this$1.target, element); };

                this.animate(insert);

            },

            remove: function(element) {

                if (!within(element, this.target)) {
                    return;
                }

                this.animate(function () { return remove$1(element); });

            },

            getSortable: function(element) {
                do {
                    var sortable = this.$getComponent(element, 'sortable');

                    if (sortable && (sortable === this || this.group !== false && sortable.group === this.group)) {
                        return sortable;
                    }
                } while ((element = parent(element)));
            }

        }

    };

    var trackTimer;
    function trackScroll(pos) {

        var last = Date.now();
        trackTimer = setInterval(function () {

            var x = pos.x;
            var y = pos.y;
            y += window.pageYOffset;

            var dist = (Date.now() - last) * .3;
            last = Date.now();

            scrollParents(document.elementFromPoint(x, pos.y)).reverse().some(function (scrollEl) {

                var scroll = scrollEl.scrollTop;
                var scrollHeight = scrollEl.scrollHeight;

                var ref = offset(getViewport$1(scrollEl));
                var top = ref.top;
                var bottom = ref.bottom;
                var height = ref.height;

                if (top < y && top + 35 > y) {
                    scroll -= dist;
                } else if (bottom > y && bottom - 35 < y) {
                    scroll += dist;
                } else {
                    return;
                }

                if (scroll > 0 && scroll < scrollHeight - height) {
                    scrollTop(scrollEl, scroll);
                    return true;
                }

            });

        }, 15);

    }

    function untrackScroll() {
        clearInterval(trackTimer);
    }

    function appendDrag(container, element) {
        var clone = append(container, element.outerHTML.replace(/(^<)(?:li|tr)|(?:li|tr)(\/>$)/g, '$1div$2'));

        css(clone, 'margin', '0', 'important');
        css(clone, assign({
            boxSizing: 'border-box',
            width: element.offsetWidth,
            height: element.offsetHeight
        }, css(element, ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'])));

        height(clone.firstElementChild, height(element.firstElementChild));

        return clone;
    }

    function findTarget(items, point) {
        return items[findIndex(items, function (item) { return pointInRect(point, item.getBoundingClientRect()); })];
    }

    function findInsertTarget(list, target, placeholder, x, y, sameList) {

        if (!children(list).length) {
            return;
        }

        var rect = target.getBoundingClientRect();
        if (!sameList) {

            if (!isHorizontal(list, placeholder)) {
                return y < rect.top + rect.height / 2
                    ? target
                    : target.nextElementSibling;
            }

            return target;
        }

        var placeholderRect = placeholder.getBoundingClientRect();
        var sameRow = linesIntersect(
            [rect.top, rect.bottom],
            [placeholderRect.top, placeholderRect.bottom]
        );

        var pointerPos = sameRow ? x : y;
        var lengthProp = sameRow ? 'width' : 'height';
        var startProp = sameRow ? 'left' : 'top';
        var endProp = sameRow ? 'right' : 'bottom';

        var diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;

        if (placeholderRect[startProp] < rect[startProp]) {

            if (diff && pointerPos < rect[startProp] + diff) {
                return false;
            }

            return target.nextElementSibling;
        }

        if (diff && pointerPos > rect[endProp] - diff) {
            return false;
        }

        return target;
    }

    function isHorizontal(list, placeholder) {

        var single = children(list).length === 1;

        if (single) {
            append(list, placeholder);
        }

        var items = children(list);
        var isHorizontal = items.some(function (el, i) {
            var rectA = el.getBoundingClientRect();
            return items.slice(i + 1).some(function (el) {
                var rectB = el.getBoundingClientRect();
                return !linesIntersect([rectA.left, rectA.right], [rectB.left, rectB.right]);
            });
        });

        if (single) {
            remove$1(placeholder);
        }

        return isHorizontal;
    }

    function linesIntersect(lineA, lineB) {
        return lineA[1] > lineB[0] && lineB[1] > lineA[0];
    }

    var obj;

    var tooltip = {

        mixins: [Container, Togglable, Position],

        args: 'title',

        props: {
            delay: Number,
            title: String
        },

        data: {
            pos: 'top',
            title: '',
            delay: 0,
            animation: ['uk-animation-scale-up'],
            duration: 100,
            cls: 'uk-active',
            clsPos: 'uk-tooltip'
        },

        beforeConnect: function() {
            this._hasTitle = hasAttr(this.$el, 'title');
            attr(this.$el, 'title', '');
            this.updateAria(false);
            makeFocusable(this.$el);
        },

        disconnected: function() {
            this.hide();
            attr(this.$el, 'title', this._hasTitle ? this.title : null);
        },

        methods: {

            show: function() {
                var this$1 = this;


                if (this.isToggled(this.tooltip || null) || !this.title) {
                    return;
                }

                this._unbind = once(document, ("show keydown " + pointerDown), this.hide, false, function (e) { return e.type === pointerDown && !within(e.target, this$1.$el)
                    || e.type === 'keydown' && e.keyCode === 27
                    || e.type === 'show' && e.detail[0] !== this$1 && e.detail[0].$name === this$1.$name; }
                );

                clearTimeout(this.showTimer);
                this.showTimer = setTimeout(this._show, this.delay);
            },

            hide: function() {
                var this$1 = this;


                if (matches(this.$el, 'input:focus')) {
                    return;
                }

                clearTimeout(this.showTimer);

                if (!this.isToggled(this.tooltip || null)) {
                    return;
                }

                this.toggleElement(this.tooltip, false, false).then(function () {
                    this$1.tooltip = remove$1(this$1.tooltip);
                    this$1._unbind();
                });
            },

            _show: function() {
                var this$1 = this;


                this.tooltip = append(this.container,
                    ("<div class=\"" + (this.clsPos) + "\"> <div class=\"" + (this.clsPos) + "-inner\">" + (this.title) + "</div> </div>")
                );

                on(this.tooltip, 'toggled', function (e, toggled) {

                    this$1.updateAria(toggled);

                    if (!toggled) {
                        return;
                    }

                    this$1.positionAt(this$1.tooltip, this$1.$el);

                    this$1.origin = this$1.getAxis() === 'y'
                        ? ((flipPosition(this$1.dir)) + "-" + (this$1.align))
                        : ((this$1.align) + "-" + (flipPosition(this$1.dir)));
                });

                this.toggleElement(this.tooltip, true);

            },

            updateAria: function(toggled) {
                attr(this.$el, 'aria-expanded', toggled);
            }

        },

        events: ( obj = {

            focus: 'show',
            blur: 'hide'

        }, obj[(pointerEnter + " " + pointerLeave)] = function (e) {
                if (!isTouch(e)) {
                    this[e.type === pointerEnter ? 'show' : 'hide']();
                }
            }, obj[pointerDown] = function (e) {
                if (isTouch(e)) {
                    this.show();
                }
            }, obj )

    };

    function makeFocusable(el) {
        if (!isFocusable(el)) {
            attr(el, 'tabindex', '0');
        }
    }

    var upload = {

        props: {
            allow: String,
            clsDragover: String,
            concurrent: Number,
            maxSize: Number,
            method: String,
            mime: String,
            msgInvalidMime: String,
            msgInvalidName: String,
            msgInvalidSize: String,
            multiple: Boolean,
            name: String,
            params: Object,
            type: String,
            url: String
        },

        data: {
            allow: false,
            clsDragover: 'uk-dragover',
            concurrent: 1,
            maxSize: 0,
            method: 'POST',
            mime: false,
            msgInvalidMime: 'Invalid File Type: %s',
            msgInvalidName: 'Invalid File Name: %s',
            msgInvalidSize: 'Invalid File Size: %s Kilobytes Max',
            multiple: false,
            name: 'files[]',
            params: {},
            type: '',
            url: '',
            abort: noop,
            beforeAll: noop,
            beforeSend: noop,
            complete: noop,
            completeAll: noop,
            error: noop,
            fail: noop,
            load: noop,
            loadEnd: noop,
            loadStart: noop,
            progress: noop
        },

        events: {

            change: function(e) {

                if (!matches(e.target, 'input[type="file"]')) {
                    return;
                }

                e.preventDefault();

                if (e.target.files) {
                    this.upload(e.target.files);
                }

                e.target.value = '';
            },

            drop: function(e) {
                stop(e);

                var transfer = e.dataTransfer;

                if (!transfer || !transfer.files) {
                    return;
                }

                removeClass(this.$el, this.clsDragover);

                this.upload(transfer.files);
            },

            dragenter: function(e) {
                stop(e);
            },

            dragover: function(e) {
                stop(e);
                addClass(this.$el, this.clsDragover);
            },

            dragleave: function(e) {
                stop(e);
                removeClass(this.$el, this.clsDragover);
            }

        },

        methods: {

            upload: function(files) {
                var this$1 = this;


                if (!files.length) {
                    return;
                }

                trigger(this.$el, 'upload', [files]);

                for (var i = 0; i < files.length; i++) {

                    if (this.maxSize && this.maxSize * 1000 < files[i].size) {
                        this.fail(this.msgInvalidSize.replace('%s', this.maxSize));
                        return;
                    }

                    if (this.allow && !match(this.allow, files[i].name)) {
                        this.fail(this.msgInvalidName.replace('%s', this.allow));
                        return;
                    }

                    if (this.mime && !match(this.mime, files[i].type)) {
                        this.fail(this.msgInvalidMime.replace('%s', this.mime));
                        return;
                    }

                }

                if (!this.multiple) {
                    files = [files[0]];
                }

                this.beforeAll(this, files);

                var chunks = chunk(files, this.concurrent);
                var upload = function (files) {

                    var data = new FormData();

                    files.forEach(function (file) { return data.append(this$1.name, file); });

                    for (var key in this$1.params) {
                        data.append(key, this$1.params[key]);
                    }

                    ajax(this$1.url, {
                        data: data,
                        method: this$1.method,
                        responseType: this$1.type,
                        beforeSend: function (env) {

                            var xhr = env.xhr;
                            xhr.upload && on(xhr.upload, 'progress', this$1.progress);
                            ['loadStart', 'load', 'loadEnd', 'abort'].forEach(function (type) { return on(xhr, type.toLowerCase(), this$1[type]); }
                            );

                            return this$1.beforeSend(env);

                        }
                    }).then(
                        function (xhr) {

                            this$1.complete(xhr);

                            if (chunks.length) {
                                upload(chunks.shift());
                            } else {
                                this$1.completeAll(xhr);
                            }

                        },
                        function (e) { return this$1.error(e); }
                    );

                };

                upload(chunks.shift());

            }

        }

    };

    function match(pattern, path) {
        return path.match(new RegExp(("^" + (pattern.replace(/\//g, '\\/').replace(/\*\*/g, '(\\/[^\\/]+)*').replace(/\*/g, '[^\\/]+').replace(/((?!\\))\?/g, '$1.')) + "$"), 'i'));
    }

    function chunk(files, size) {
        var chunks = [];
        for (var i = 0; i < files.length; i += size) {
            var chunk = [];
            for (var j = 0; j < size; j++) {
                chunk.push(files[i + j]);
            }
            chunks.push(chunk);
        }
        return chunks;
    }

    function stop(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    var components = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Countdown: countdown,
        Filter: filter,
        Lightbox: lightbox,
        LightboxPanel: LightboxPanel,
        Notification: notification,
        Parallax: parallax,
        Slider: slider,
        SliderParallax: sliderParallax,
        Slideshow: slideshow,
        SlideshowParallax: sliderParallax,
        Sortable: sortable,
        Tooltip: tooltip,
        Upload: upload
    });

    each(components, function (component, name) { return UIkit.component(name, component); }
    );

    return UIkit;

})));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1aWtpdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgVUlraXQgMy43LjMgfCBodHRwczovL3d3dy5nZXR1aWtpdC5jb20gfCAoYykgMjAxNCAtIDIwMjEgWU9PdGhlbWUgfCBNSVQgTGljZW5zZSAqL1xyXG5cclxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcclxuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcclxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgndWlraXQnLCBmYWN0b3J5KSA6XHJcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuVUlraXQgPSBmYWN0b3J5KCkpO1xyXG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgb2JqUHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcclxuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IG9ialByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYXNPd24ob2JqLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGh5cGhlbmF0ZVJlID0gL1xcQihbQS1aXSkvZztcclxuXHJcbiAgICB2YXIgaHlwaGVuYXRlID0gbWVtb2l6ZShmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBzdHJcclxuICAgICAgICAucmVwbGFjZShoeXBoZW5hdGVSZSwgJy0kMScpXHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7IH1cclxuICAgICk7XHJcblxyXG4gICAgdmFyIGNhbWVsaXplUmUgPSAvLShcXHcpL2c7XHJcblxyXG4gICAgdmFyIGNhbWVsaXplID0gbWVtb2l6ZShmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJlLCB0b1VwcGVyKTsgfVxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgdWNmaXJzdCA9IG1lbW9pemUoZnVuY3Rpb24gKHN0cikgeyByZXR1cm4gc3RyLmxlbmd0aCA/IHRvVXBwZXIobnVsbCwgc3RyLmNoYXJBdCgwKSkgKyBzdHIuc2xpY2UoMSkgOiAnJzsgfVxyXG4gICAgKTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b1VwcGVyKF8sIGMpIHtcclxuICAgICAgICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdHJQcm90b3R5cGUgPSBTdHJpbmcucHJvdG90eXBlO1xyXG4gICAgdmFyIHN0YXJ0c1dpdGhGbiA9IHN0clByb3RvdHlwZS5zdGFydHNXaXRoIHx8IGZ1bmN0aW9uIChzZWFyY2gpIHsgcmV0dXJuIHRoaXMubGFzdEluZGV4T2Yoc2VhcmNoLCAwKSA9PT0gMDsgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydHNXaXRoKHN0ciwgc2VhcmNoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXJ0c1dpdGhGbi5jYWxsKHN0ciwgc2VhcmNoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZW5kc1dpdGhGbiA9IHN0clByb3RvdHlwZS5lbmRzV2l0aCB8fCBmdW5jdGlvbiAoc2VhcmNoKSB7IHJldHVybiB0aGlzLnN1YnN0cigtc2VhcmNoLmxlbmd0aCkgPT09IHNlYXJjaDsgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaCkge1xyXG4gICAgICAgIHJldHVybiBlbmRzV2l0aEZuLmNhbGwoc3RyLCBzZWFyY2gpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcnJQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XHJcblxyXG4gICAgdmFyIGluY2x1ZGVzRm4gPSBmdW5jdGlvbiAoc2VhcmNoLCBpKSB7IHJldHVybiAhIX50aGlzLmluZGV4T2Yoc2VhcmNoLCBpKTsgfTtcclxuICAgIHZhciBpbmNsdWRlc1N0ciA9IHN0clByb3RvdHlwZS5pbmNsdWRlcyB8fCBpbmNsdWRlc0ZuO1xyXG4gICAgdmFyIGluY2x1ZGVzQXJyYXkgPSBhcnJQcm90b3R5cGUuaW5jbHVkZXMgfHwgaW5jbHVkZXNGbjtcclxuXHJcbiAgICBmdW5jdGlvbiBpbmNsdWRlcyhvYmosIHNlYXJjaCkge1xyXG4gICAgICAgIHJldHVybiBvYmogJiYgKGlzU3RyaW5nKG9iaikgPyBpbmNsdWRlc1N0ciA6IGluY2x1ZGVzQXJyYXkpLmNhbGwob2JqLCBzZWFyY2gpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBmaW5kSW5kZXhGbiA9IGFyclByb3RvdHlwZS5maW5kSW5kZXggfHwgZnVuY3Rpb24gKHByZWRpY2F0ZSkge1xyXG4gICAgICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbChhcmd1bWVudHMkMVsxXSwgdGhpc1tpXSwgaSwgdGhpcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUpIHtcclxuICAgICAgICByZXR1cm4gZmluZEluZGV4Rm4uY2FsbChhcnJheSwgcHJlZGljYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XHJcblxyXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0b1N0cmluZyA9IG9ialByb3RvdHlwZS50b1N0cmluZztcclxuICAgIGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNXaW5kb3cob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KG9iaikgJiYgb2JqID09PSBvYmoud2luZG93O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRG9jdW1lbnQob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGVUeXBlKG9iaikgPT09IDk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNOb2RlKG9iaikge1xyXG4gICAgICAgIHJldHVybiBub2RlVHlwZShvYmopID49IDE7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNFbGVtZW50KG9iaikge1xyXG4gICAgICAgIHJldHVybiBub2RlVHlwZShvYmopID09PSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5vZGVUeXBlKG9iaikge1xyXG4gICAgICAgIHJldHVybiAhaXNXaW5kb3cob2JqKSAmJiBpc09iamVjdChvYmopICYmIG9iai5ub2RlVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTnVtZXJpYyh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBpc051bWJlcih2YWx1ZSkgfHwgaXNTdHJpbmcodmFsdWUpICYmICFpc05hTih2YWx1ZSAtIHBhcnNlRmxvYXQodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xyXG4gICAgICAgIHJldHVybiAhKGlzQXJyYXkob2JqKVxyXG4gICAgICAgICAgICA/IG9iai5sZW5ndGhcclxuICAgICAgICAgICAgOiBpc09iamVjdChvYmopXHJcbiAgICAgICAgICAgICAgICA/IE9iamVjdC5rZXlzKG9iaikubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICA6IGZhbHNlXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdm9pZCAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvQm9vbGVhbih2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpXHJcbiAgICAgICAgICAgID8gdmFsdWVcclxuICAgICAgICAgICAgOiB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMScgfHwgdmFsdWUgPT09ICcnXHJcbiAgICAgICAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgICAgICAgIDogdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT09ICcwJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICA6IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIG51bWJlciA9IE51bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihudW1iZXIpID8gbnVtYmVyIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0b0FycmF5ID0gQXJyYXkuZnJvbSB8fCAoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBhcnJQcm90b3R5cGUuc2xpY2UuY2FsbCh2YWx1ZSk7IH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvTm9kZShlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudClbMF07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9Ob2RlcyhlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQgJiYgKGlzTm9kZShlbGVtZW50KSA/IFtlbGVtZW50XSA6IHRvQXJyYXkoZWxlbWVudCkuZmlsdGVyKGlzTm9kZSkpIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvV2luZG93KGVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoaXNXaW5kb3coZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudFxyXG4gICAgICAgICAgICA/IChpc0RvY3VtZW50KGVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICA/IGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIDogZWxlbWVudC5vd25lckRvY3VtZW50XHJcbiAgICAgICAgICAgICkuZGVmYXVsdFZpZXdcclxuICAgICAgICAgICAgOiB3aW5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9Ncyh0aW1lKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aW1lXHJcbiAgICAgICAgICAgID8gMFxyXG4gICAgICAgICAgICA6IGVuZHNXaXRoKHRpbWUsICdtcycpXHJcbiAgICAgICAgICAgICAgICA/IHRvRmxvYXQodGltZSlcclxuICAgICAgICAgICAgICAgIDogdG9GbG9hdCh0aW1lKSAqIDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNFcXVhbCh2YWx1ZSwgb3RoZXIpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IG90aGVyXHJcbiAgICAgICAgICAgIHx8IGlzT2JqZWN0KHZhbHVlKVxyXG4gICAgICAgICAgICAmJiBpc09iamVjdChvdGhlcilcclxuICAgICAgICAgICAgJiYgT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gT2JqZWN0LmtleXMob3RoZXIpLmxlbmd0aFxyXG4gICAgICAgICAgICAmJiBlYWNoKHZhbHVlLCBmdW5jdGlvbiAodmFsLCBrZXkpIHsgcmV0dXJuIHZhbCA9PT0gb3RoZXJba2V5XTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3dhcCh2YWx1ZSwgYSwgYikge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKFxyXG4gICAgICAgICAgICBuZXcgUmVnRXhwKChhICsgXCJ8XCIgKyBiKSwgJ2cnKSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKG1hdGNoKSB7IHJldHVybiBtYXRjaCA9PT0gYSA/IGIgOiBhOyB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgd2hpbGUgKCBsZW4tLSA+IDAgKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xyXG5cclxuICAgICAgICB0YXJnZXQgPSBPYmplY3QodGFyZ2V0KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3NbaV07XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2UgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzT3duKHNvdXJjZSwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBsYXN0KGFycmF5KSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVhY2gob2JqLCBjYikge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKGZhbHNlID09PSBjYihvYmpba2V5XSwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNvcnRCeSQxKGFycmF5LCBwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5LnNsaWNlKCkuc29ydChmdW5jdGlvbiAocmVmLCByZWYkMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3BBID0gcmVmW3Byb3BdOyBpZiAoIHByb3BBID09PSB2b2lkIDAgKSBwcm9wQSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcEIgPSByZWYkMVtwcm9wXTsgaWYgKCBwcm9wQiA9PT0gdm9pZCAwICkgcHJvcEIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wQSA+IHByb3BCXHJcbiAgICAgICAgICAgICAgICA/IDFcclxuICAgICAgICAgICAgICAgIDogcHJvcEIgPiBwcm9wQVxyXG4gICAgICAgICAgICAgICAgICAgID8gLTFcclxuICAgICAgICAgICAgICAgICAgICA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW5pcXVlQnkoYXJyYXksIHByb3ApIHtcclxuICAgICAgICB2YXIgc2VlbiA9IG5ldyBTZXQoKTtcclxuICAgICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChyZWYpIHtcclxuICAgICAgICAgICAgdmFyIGNoZWNrID0gcmVmW3Byb3BdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNlZW4uaGFzKGNoZWNrKVxyXG4gICAgICAgICAgICA/IGZhbHNlXHJcbiAgICAgICAgICAgIDogc2Vlbi5hZGQoY2hlY2spIHx8IHRydWU7XHJcbiAgICAgICAgfSAvLyBJRSAxMSBkb2VzIG5vdCByZXR1cm4gdGhlIFNldCBvYmplY3RcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsYW1wKG51bWJlciwgbWluLCBtYXgpIHtcclxuICAgICAgICBpZiAoIG1pbiA9PT0gdm9pZCAwICkgbWluID0gMDtcclxuICAgICAgICBpZiAoIG1heCA9PT0gdm9pZCAwICkgbWF4ID0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHRvTnVtYmVyKG51bWJlcikgfHwgMCwgbWluKSwgbWF4KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub29wKCkge31cclxuXHJcbiAgICBmdW5jdGlvbiBpbnRlcnNlY3RSZWN0KCkge1xyXG4gICAgICAgIHZhciByZWN0cyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlICggbGVuLS0gKSByZWN0c1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xyXG5cclxuICAgICAgICByZXR1cm4gW1snYm90dG9tJywgJ3RvcCddLCBbJ3JpZ2h0JywgJ2xlZnQnXV0uZXZlcnkoZnVuY3Rpb24gKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1pblByb3AgPSByZWZbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4UHJvcCA9IHJlZlsxXTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5taW4uYXBwbHkoTWF0aCwgcmVjdHMubWFwKGZ1bmN0aW9uIChyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtaW4gPSByZWZbbWluUHJvcF07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1pbjtcclxuICAgICAgICAgICAgICAgIH0pKSAtIE1hdGgubWF4LmFwcGx5KE1hdGgsIHJlY3RzLm1hcChmdW5jdGlvbiAocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWF4ID0gcmVmW21heFByb3BdO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXg7XHJcbiAgICAgICAgICAgICAgICB9KSkgPiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBvaW50SW5SZWN0KHBvaW50LCByZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBvaW50LnggPD0gcmVjdC5yaWdodCAmJlxyXG4gICAgICAgICAgICBwb2ludC54ID49IHJlY3QubGVmdCAmJlxyXG4gICAgICAgICAgICBwb2ludC55IDw9IHJlY3QuYm90dG9tICYmXHJcbiAgICAgICAgICAgIHBvaW50LnkgPj0gcmVjdC50b3A7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIERpbWVuc2lvbnMgPSB7XHJcblxyXG4gICAgICAgIHJhdGlvOiBmdW5jdGlvbihkaW1lbnNpb25zLCBwcm9wLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgb2JqO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBhUHJvcCA9IHByb3AgPT09ICd3aWR0aCcgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKCBvYmogPSB7fSwgb2JqW2FQcm9wXSA9IGRpbWVuc2lvbnNbcHJvcF0gPyBNYXRoLnJvdW5kKHZhbHVlICogZGltZW5zaW9uc1thUHJvcF0gLyBkaW1lbnNpb25zW3Byb3BdKSA6IGRpbWVuc2lvbnNbYVByb3BdLCBvYmpbcHJvcF0gPSB2YWx1ZSwgb2JqICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29udGFpbjogZnVuY3Rpb24oZGltZW5zaW9ucywgbWF4RGltZW5zaW9ucykge1xyXG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGRpbWVuc2lvbnMgPSBhc3NpZ24oe30sIGRpbWVuc2lvbnMpO1xyXG5cclxuICAgICAgICAgICAgZWFjaChkaW1lbnNpb25zLCBmdW5jdGlvbiAoXywgcHJvcCkgeyByZXR1cm4gZGltZW5zaW9ucyA9IGRpbWVuc2lvbnNbcHJvcF0gPiBtYXhEaW1lbnNpb25zW3Byb3BdXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMkMS5yYXRpbyhkaW1lbnNpb25zLCBwcm9wLCBtYXhEaW1lbnNpb25zW3Byb3BdKVxyXG4gICAgICAgICAgICAgICAgOiBkaW1lbnNpb25zOyB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGltZW5zaW9ucztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb3ZlcjogZnVuY3Rpb24oZGltZW5zaW9ucywgbWF4RGltZW5zaW9ucykge1xyXG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGRpbWVuc2lvbnMgPSB0aGlzLmNvbnRhaW4oZGltZW5zaW9ucywgbWF4RGltZW5zaW9ucyk7XHJcblxyXG4gICAgICAgICAgICBlYWNoKGRpbWVuc2lvbnMsIGZ1bmN0aW9uIChfLCBwcm9wKSB7IHJldHVybiBkaW1lbnNpb25zID0gZGltZW5zaW9uc1twcm9wXSA8IG1heERpbWVuc2lvbnNbcHJvcF1cclxuICAgICAgICAgICAgICAgID8gdGhpcyQxLnJhdGlvKGRpbWVuc2lvbnMsIHByb3AsIG1heERpbWVuc2lvbnNbcHJvcF0pXHJcbiAgICAgICAgICAgICAgICA6IGRpbWVuc2lvbnM7IH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KGksIGVsZW1lbnRzLCBjdXJyZW50LCBmaW5pdGUpIHtcclxuICAgICAgICBpZiAoIGN1cnJlbnQgPT09IHZvaWQgMCApIGN1cnJlbnQgPSAwO1xyXG4gICAgICAgIGlmICggZmluaXRlID09PSB2b2lkIDAgKSBmaW5pdGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIGVsZW1lbnRzID0gdG9Ob2RlcyhlbGVtZW50cyk7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGkgPSBpc051bWVyaWMoaSlcclxuICAgICAgICAgICAgPyB0b051bWJlcihpKVxyXG4gICAgICAgICAgICA6IGkgPT09ICduZXh0J1xyXG4gICAgICAgICAgICAgICAgPyBjdXJyZW50ICsgMVxyXG4gICAgICAgICAgICAgICAgOiBpID09PSAncHJldmlvdXMnXHJcbiAgICAgICAgICAgICAgICAgICAgPyBjdXJyZW50IC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIDogZWxlbWVudHMuaW5kZXhPZih0b05vZGUoaSkpO1xyXG5cclxuICAgICAgICBpZiAoZmluaXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFtcChpLCAwLCBsZW5ndGggLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGkgJT0gbGVuZ3RoO1xyXG5cclxuICAgICAgICByZXR1cm4gaSA8IDAgPyBpICsgbGVuZ3RoIDogaTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtZW1vaXplKGZuKSB7XHJcbiAgICAgICAgdmFyIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY2FjaGVba2V5XSB8fCAoY2FjaGVba2V5XSA9IGZuKGtleSkpOyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGF0dHIoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyKGVsZW1lbnQsIGtleSwgbmFtZVtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvTm9kZXMoZWxlbWVudCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChlbGVtZW50LCBhdHRyKGVsZW1lbnQsIG5hbWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVBdHRyKGVsZW1lbnQsIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFzQXR0cihlbGVtZW50LCBuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUobmFtZSk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0dHIoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgICAgIGVsZW1lbnQgPSB0b05vZGVzKGVsZW1lbnQpO1xyXG4gICAgICAgIG5hbWUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBlbGVtZW50LmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlKG5hbWUpICYmIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpOyB9XHJcbiAgICAgICAgICAgICk7IH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRhdGEoZWxlbWVudCwgYXR0cmlidXRlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGF0dHJzID0gW2F0dHJpYnV0ZSwgKFwiZGF0YS1cIiArIGF0dHJpYnV0ZSldOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGhhc0F0dHIoZWxlbWVudCwgYXR0cnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXR0cihlbGVtZW50LCBhdHRyc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogZ2xvYmFsIERvY3VtZW50VG91Y2ggKi9cclxuXHJcbiAgICB2YXIgaW5Ccm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICB2YXIgaXNJRSA9IGluQnJvd3NlciAmJiAvbXNpZXx0cmlkZW50L2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICB2YXIgaXNSdGwgPSBpbkJyb3dzZXIgJiYgYXR0cihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdkaXInKSA9PT0gJ3J0bCc7XHJcblxyXG4gICAgdmFyIGhhc1RvdWNoRXZlbnRzID0gaW5Ccm93c2VyICYmICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcclxuICAgIHZhciBoYXNQb2ludGVyRXZlbnRzID0gaW5Ccm93c2VyICYmIHdpbmRvdy5Qb2ludGVyRXZlbnQ7XHJcbiAgICB2YXIgaGFzVG91Y2ggPSBpbkJyb3dzZXIgJiYgKGhhc1RvdWNoRXZlbnRzXHJcbiAgICAgICAgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoXHJcbiAgICAgICAgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzKTsgLy8gSUUgPj0xMVxyXG5cclxuICAgIHZhciBwb2ludGVyRG93biA9IGhhc1BvaW50ZXJFdmVudHMgPyAncG9pbnRlcmRvd24nIDogaGFzVG91Y2hFdmVudHMgPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJztcclxuICAgIHZhciBwb2ludGVyTW92ZSA9IGhhc1BvaW50ZXJFdmVudHMgPyAncG9pbnRlcm1vdmUnIDogaGFzVG91Y2hFdmVudHMgPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnO1xyXG4gICAgdmFyIHBvaW50ZXJVcCA9IGhhc1BvaW50ZXJFdmVudHMgPyAncG9pbnRlcnVwJyA6IGhhc1RvdWNoRXZlbnRzID8gJ3RvdWNoZW5kJyA6ICdtb3VzZXVwJztcclxuICAgIHZhciBwb2ludGVyRW50ZXIgPSBoYXNQb2ludGVyRXZlbnRzID8gJ3BvaW50ZXJlbnRlcicgOiBoYXNUb3VjaEV2ZW50cyA/ICcnIDogJ21vdXNlZW50ZXInO1xyXG4gICAgdmFyIHBvaW50ZXJMZWF2ZSA9IGhhc1BvaW50ZXJFdmVudHMgPyAncG9pbnRlcmxlYXZlJyA6IGhhc1RvdWNoRXZlbnRzID8gJycgOiAnbW91c2VsZWF2ZSc7XHJcbiAgICB2YXIgcG9pbnRlckNhbmNlbCA9IGhhc1BvaW50ZXJFdmVudHMgPyAncG9pbnRlcmNhbmNlbCcgOiAndG91Y2hjYW5jZWwnO1xyXG5cclxuICAgIHZhciB2b2lkRWxlbWVudHMgPSB7XHJcbiAgICAgICAgYXJlYTogdHJ1ZSxcclxuICAgICAgICBiYXNlOiB0cnVlLFxyXG4gICAgICAgIGJyOiB0cnVlLFxyXG4gICAgICAgIGNvbDogdHJ1ZSxcclxuICAgICAgICBlbWJlZDogdHJ1ZSxcclxuICAgICAgICBocjogdHJ1ZSxcclxuICAgICAgICBpbWc6IHRydWUsXHJcbiAgICAgICAgaW5wdXQ6IHRydWUsXHJcbiAgICAgICAga2V5Z2VuOiB0cnVlLFxyXG4gICAgICAgIGxpbms6IHRydWUsXHJcbiAgICAgICAgbWVudWl0ZW06IHRydWUsXHJcbiAgICAgICAgbWV0YTogdHJ1ZSxcclxuICAgICAgICBwYXJhbTogdHJ1ZSxcclxuICAgICAgICBzb3VyY2U6IHRydWUsXHJcbiAgICAgICAgdHJhY2s6IHRydWUsXHJcbiAgICAgICAgd2JyOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gaXNWb2lkRWxlbWVudChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gdm9pZEVsZW1lbnRzW2VsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNWaXNpYmxlKGVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gdG9Ob2RlcyhlbGVtZW50KS5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50Lm9mZnNldFdpZHRoIHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IGVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGg7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWxJbnB1dCA9ICdpbnB1dCxzZWxlY3QsdGV4dGFyZWEsYnV0dG9uJztcclxuICAgIGZ1bmN0aW9uIGlzSW5wdXQoZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0b05vZGVzKGVsZW1lbnQpLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIG1hdGNoZXMoZWxlbWVudCwgc2VsSW5wdXQpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0ZvY3VzYWJsZShlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGlzSW5wdXQoZWxlbWVudCkgfHwgbWF0Y2hlcyhlbGVtZW50LCAnYVtocmVmXSxidXR0b24nKSB8fCBoYXNBdHRyKGVsZW1lbnQsICd0YWJpbmRleCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcmVudChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudCAmJiBpc0VsZW1lbnQoZWxlbWVudC5wYXJlbnROb2RlKSAmJiBlbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmlsdGVyJDEoZWxlbWVudCwgc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gdG9Ob2RlcyhlbGVtZW50KS5maWx0ZXIoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIG1hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3IpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZWxQcm90byA9IGluQnJvd3NlciA/IEVsZW1lbnQucHJvdG90eXBlIDoge307XHJcbiAgICB2YXIgbWF0Y2hlc0ZuID0gZWxQcm90by5tYXRjaGVzIHx8IGVsUHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsUHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHwgbm9vcDtcclxuXHJcbiAgICBmdW5jdGlvbiBtYXRjaGVzKGVsZW1lbnQsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gbWF0Y2hlc0ZuLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xvc2VzdEZuID0gZWxQcm90by5jbG9zZXN0IHx8IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgIHZhciBhbmNlc3RvciA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRvIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaGVzKGFuY2VzdG9yLCBzZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbmNlc3RvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IHdoaWxlICgoYW5jZXN0b3IgPSBwYXJlbnQoYW5jZXN0b3IpKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudCwgc2VsZWN0b3IpIHtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0c1dpdGgoc2VsZWN0b3IsICc+JykpIHtcclxuICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5zbGljZSgxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc0VsZW1lbnQoZWxlbWVudClcclxuICAgICAgICAgICAgPyBjbG9zZXN0Rm4uY2FsbChlbGVtZW50LCBzZWxlY3RvcilcclxuICAgICAgICAgICAgOiB0b05vZGVzKGVsZW1lbnQpLm1hcChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gY2xvc2VzdChlbGVtZW50LCBzZWxlY3Rvcik7IH0pLmZpbHRlcihCb29sZWFuKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3aXRoaW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gIWlzU3RyaW5nKHNlbGVjdG9yKVxyXG4gICAgICAgICAgICA/IGVsZW1lbnQgPT09IHNlbGVjdG9yIHx8IChpc0RvY3VtZW50KHNlbGVjdG9yKVxyXG4gICAgICAgICAgICAgICAgPyBzZWxlY3Rvci5kb2N1bWVudEVsZW1lbnRcclxuICAgICAgICAgICAgICAgIDogdG9Ob2RlKHNlbGVjdG9yKSkuY29udGFpbnModG9Ob2RlKGVsZW1lbnQpKSAvLyBJRSAxMSBkb2N1bWVudCBkb2VzIG5vdCBpbXBsZW1lbnQgY29udGFpbnNcclxuICAgICAgICAgICAgOiBtYXRjaGVzKGVsZW1lbnQsIHNlbGVjdG9yKSB8fCAhIWNsb3Nlc3QoZWxlbWVudCwgc2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcmVudHMoZWxlbWVudCwgc2VsZWN0b3IpIHtcclxuICAgICAgICB2YXIgZWxlbWVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgd2hpbGUgKChlbGVtZW50ID0gcGFyZW50KGVsZW1lbnQpKSkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGVjdG9yIHx8IG1hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3IpKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hpbGRyZW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcclxuICAgICAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW1lbnQgPyB0b05vZGVzKGVsZW1lbnQuY2hpbGRyZW4pIDogW107XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yID8gZmlsdGVyJDEoY2hpbGRyZW4sIHNlbGVjdG9yKSA6IGNoaWxkcmVuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluZGV4KGVsZW1lbnQsIHJlZikge1xyXG4gICAgICAgIHJldHVybiByZWZcclxuICAgICAgICAgICAgPyB0b05vZGVzKGVsZW1lbnQpLmluZGV4T2YodG9Ob2RlKHJlZikpXHJcbiAgICAgICAgICAgIDogY2hpbGRyZW4ocGFyZW50KGVsZW1lbnQpKS5pbmRleE9mKGVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZpbmQoc2VsZWN0b3IsIGdldENvbnRleHQoc2VsZWN0b3IsIGNvbnRleHQpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBxdWVyeUFsbChzZWxlY3RvciwgY29udGV4dCkge1xyXG4gICAgICAgIHJldHVybiBmaW5kQWxsKHNlbGVjdG9yLCBnZXRDb250ZXh0KHNlbGVjdG9yLCBjb250ZXh0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q29udGV4dChzZWxlY3RvciwgY29udGV4dCkge1xyXG4gICAgICAgIGlmICggY29udGV4dCA9PT0gdm9pZCAwICkgY29udGV4dCA9IGRvY3VtZW50O1xyXG5cclxuICAgICAgICByZXR1cm4gaXNTdHJpbmcoc2VsZWN0b3IpICYmIGlzQ29udGV4dFNlbGVjdG9yKHNlbGVjdG9yKSB8fCBpc0RvY3VtZW50KGNvbnRleHQpXHJcbiAgICAgICAgICAgID8gY29udGV4dFxyXG4gICAgICAgICAgICA6IGNvbnRleHQub3duZXJEb2N1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRvTm9kZShfcXVlcnkoc2VsZWN0b3IsIGNvbnRleHQsICdxdWVyeVNlbGVjdG9yJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRBbGwoc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuICAgICAgICByZXR1cm4gdG9Ob2RlcyhfcXVlcnkoc2VsZWN0b3IsIGNvbnRleHQsICdxdWVyeVNlbGVjdG9yQWxsJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9xdWVyeShzZWxlY3RvciwgY29udGV4dCwgcXVlcnlGbikge1xyXG4gICAgICAgIGlmICggY29udGV4dCA9PT0gdm9pZCAwICkgY29udGV4dCA9IGRvY3VtZW50O1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RvciB8fCAhaXNTdHJpbmcoc2VsZWN0b3IpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZShjb250ZXh0U2FuaXRpemVSZSwgJyQxIConKTtcclxuXHJcbiAgICAgICAgaWYgKGlzQ29udGV4dFNlbGVjdG9yKHNlbGVjdG9yKSkge1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0b3IgPSBzcGxpdFNlbGVjdG9yKHNlbGVjdG9yKS5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGN0eCA9IGNvbnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yWzBdID09PSAnIScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9ycyA9IHNlbGVjdG9yLnN1YnN0cigxKS50cmltKCkuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHggPSBjbG9zZXN0KHBhcmVudChjb250ZXh0KSwgc2VsZWN0b3JzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9ycy5zbGljZSgxKS5qb2luKCcgJykudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3JbMF0gPT09ICctJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3JzJDEgPSBzZWxlY3Rvci5zdWJzdHIoMSkudHJpbSgpLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXYgPSAoY3R4IHx8IGNvbnRleHQpLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4ID0gbWF0Y2hlcyhwcmV2LCBzZWxlY3Rvci5zdWJzdHIoMSkpID8gcHJldiA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvcnMkMS5zbGljZSgxKS5qb2luKCcgJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgoZG9tUGF0aChjdHgpKSArIFwiIFwiICsgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQgPSBkb2N1bWVudDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHRbcXVlcnlGbl0oc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgY29udGV4dFNlbGVjdG9yUmUgPSAvKF58W15cXFxcXSwpXFxzKlshPit+LV0vO1xyXG4gICAgdmFyIGNvbnRleHRTYW5pdGl6ZVJlID0gLyhbIT4rfi1dKSg/PVxccytbIT4rfi1dfFxccyokKS9nO1xyXG5cclxuICAgIHZhciBpc0NvbnRleHRTZWxlY3RvciA9IG1lbW9pemUoZnVuY3Rpb24gKHNlbGVjdG9yKSB7IHJldHVybiBzZWxlY3Rvci5tYXRjaChjb250ZXh0U2VsZWN0b3JSZSk7IH0pO1xyXG5cclxuICAgIHZhciBzZWxlY3RvclJlID0gLy4qP1teXFxcXF0oPzosfCQpL2c7XHJcblxyXG4gICAgdmFyIHNwbGl0U2VsZWN0b3IgPSBtZW1vaXplKGZ1bmN0aW9uIChzZWxlY3RvcikgeyByZXR1cm4gc2VsZWN0b3IubWF0Y2goc2VsZWN0b3JSZSkubWFwKGZ1bmN0aW9uIChzZWxlY3RvcikgeyByZXR1cm4gc2VsZWN0b3IucmVwbGFjZSgvLCQvLCAnJykudHJpbSgpOyB9XHJcbiAgICAgICAgKTsgfVxyXG4gICAgKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkb21QYXRoKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgbmFtZXMgPSBbXTtcclxuICAgICAgICB3aGlsZSAoZWxlbWVudC5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmlkKSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lcy51bnNoaWZ0KChcIiNcIiArIChlc2NhcGUoZWxlbWVudC5pZCkpKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhZ05hbWUgIT09ICdIVE1MJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZ05hbWUgKz0gXCI6bnRoLWNoaWxkKFwiICsgKGluZGV4KGVsZW1lbnQpICsgMSkgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5hbWVzLnVuc2hpZnQodGFnTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lcy5qb2luKCcgPiAnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZXNjYXBlRm4gPSBpbkJyb3dzZXIgJiYgd2luZG93LkNTUyAmJiBDU1MuZXNjYXBlIHx8IGZ1bmN0aW9uIChjc3MpIHsgcmV0dXJuIGNzcy5yZXBsYWNlKC8oW15cXHg3Zi1cXHVGRkZGXFx3LV0pL2csIGZ1bmN0aW9uIChtYXRjaCkgeyByZXR1cm4gKFwiXFxcXFwiICsgbWF0Y2gpOyB9KTsgfTtcclxuICAgIGZ1bmN0aW9uIGVzY2FwZShjc3MpIHtcclxuICAgICAgICByZXR1cm4gaXNTdHJpbmcoY3NzKSA/IGVzY2FwZUZuLmNhbGwobnVsbCwgY3NzKSA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcclxuXHJcblxyXG4gICAgICAgIHZhciByZWYgPSBnZXRBcmdzKGFyZ3MpO1xyXG4gICAgICAgIHZhciB0YXJnZXRzID0gcmVmWzBdO1xyXG4gICAgICAgIHZhciB0eXBlID0gcmVmWzFdO1xyXG4gICAgICAgIHZhciBzZWxlY3RvciA9IHJlZlsyXTtcclxuICAgICAgICB2YXIgbGlzdGVuZXIgPSByZWZbM107XHJcbiAgICAgICAgdmFyIHVzZUNhcHR1cmUgPSByZWZbNF07XHJcblxyXG4gICAgICAgIHRhcmdldHMgPSB0b0V2ZW50VGFyZ2V0cyh0YXJnZXRzKTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3RlbmVyLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXIgPSBkZXRhaWwobGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHVzZUNhcHR1cmUgJiYgdXNlQ2FwdHVyZS5zZWxmKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyID0gc2VsZkZpbHRlcihsaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXIgPSBkZWxlZ2F0ZShzZWxlY3RvciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXNlQ2FwdHVyZSA9IHVzZUNhcHR1cmVGaWx0ZXIodXNlQ2FwdHVyZSk7XHJcblxyXG4gICAgICAgIHR5cGUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiB0YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpOyB9XHJcbiAgICAgICAgICAgICk7IH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBvZmYodGFyZ2V0cywgdHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpOyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9mZih0YXJnZXRzLCB0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xyXG4gICAgICAgIGlmICggdXNlQ2FwdHVyZSA9PT0gdm9pZCAwICkgdXNlQ2FwdHVyZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB1c2VDYXB0dXJlID0gdXNlQ2FwdHVyZUZpbHRlcih1c2VDYXB0dXJlKTtcclxuICAgICAgICB0YXJnZXRzID0gdG9FdmVudFRhcmdldHModGFyZ2V0cyk7XHJcbiAgICAgICAgdHlwZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIHRhcmdldHMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7IH1cclxuICAgICAgICAgICAgKTsgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25jZSgpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XHJcblxyXG5cclxuICAgICAgICB2YXIgcmVmID0gZ2V0QXJncyhhcmdzKTtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IHJlZlswXTtcclxuICAgICAgICB2YXIgdHlwZSA9IHJlZlsxXTtcclxuICAgICAgICB2YXIgc2VsZWN0b3IgPSByZWZbMl07XHJcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gcmVmWzNdO1xyXG4gICAgICAgIHZhciB1c2VDYXB0dXJlID0gcmVmWzRdO1xyXG4gICAgICAgIHZhciBjb25kaXRpb24gPSByZWZbNV07XHJcbiAgICAgICAgdmFyIG9mZiA9IG9uKGVsZW1lbnQsIHR5cGUsIHNlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gIWNvbmRpdGlvbiB8fCBjb25kaXRpb24oZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIG9mZigpO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoZSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHVzZUNhcHR1cmUpO1xyXG5cclxuICAgICAgICByZXR1cm4gb2ZmO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRyaWdnZXIodGFyZ2V0cywgZXZlbnQsIGRldGFpbCkge1xyXG4gICAgICAgIHJldHVybiB0b0V2ZW50VGFyZ2V0cyh0YXJnZXRzKS5yZWR1Y2UoZnVuY3Rpb24gKG5vdENhbmNlbGVkLCB0YXJnZXQpIHsgcmV0dXJuIG5vdENhbmNlbGVkICYmIHRhcmdldC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KGV2ZW50LCB0cnVlLCB0cnVlLCBkZXRhaWwpKTsgfVxyXG4gICAgICAgICAgICAsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRldGFpbCkge1xyXG4gICAgICAgIGlmICggYnViYmxlcyA9PT0gdm9pZCAwICkgYnViYmxlcyA9IHRydWU7XHJcbiAgICAgICAgaWYgKCBjYW5jZWxhYmxlID09PSB2b2lkIDAgKSBjYW5jZWxhYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChpc1N0cmluZyhlKSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTsgLy8gSUUgMTFcclxuICAgICAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRldGFpbCk7XHJcbiAgICAgICAgICAgIGUgPSBldmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFyZ3MoYXJncykge1xyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGFyZ3NbMl0pKSB7XHJcbiAgICAgICAgICAgIGFyZ3Muc3BsaWNlKDIsIDAsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFyZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZWdhdGUoc2VsZWN0b3IsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBzZWxlY3RvclswXSA9PT0gJz4nXHJcbiAgICAgICAgICAgICAgICA/IGZpbmRBbGwoc2VsZWN0b3IsIGUuY3VycmVudFRhcmdldCkucmV2ZXJzZSgpLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gd2l0aGluKGUudGFyZ2V0LCBlbGVtZW50KTsgfSlbMF1cclxuICAgICAgICAgICAgICAgIDogY2xvc2VzdChlLnRhcmdldCwgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGUuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMkMSwgZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZXRhaWwobGlzdGVuZXIpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGlzQXJyYXkoZS5kZXRhaWwpID8gbGlzdGVuZXIuYXBwbHkodm9pZCAwLCBbIGUgXS5jb25jYXQoIGUuZGV0YWlsICkpIDogbGlzdGVuZXIoZSk7IH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZkZpbHRlcihsaXN0ZW5lcikge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCB8fCBlLnRhcmdldCA9PT0gZS5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbChudWxsLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXNlQ2FwdHVyZUZpbHRlcihvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMgJiYgaXNJRSAmJiAhaXNCb29sZWFuKG9wdGlvbnMpXHJcbiAgICAgICAgICAgID8gISFvcHRpb25zLmNhcHR1cmVcclxuICAgICAgICAgICAgOiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRXZlbnRUYXJnZXQodGFyZ2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldCAmJiAnYWRkRXZlbnRMaXN0ZW5lcicgaW4gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvRXZlbnRUYXJnZXQodGFyZ2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlzRXZlbnRUYXJnZXQodGFyZ2V0KSA/IHRhcmdldCA6IHRvTm9kZSh0YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvRXZlbnRUYXJnZXRzKHRhcmdldCkge1xyXG4gICAgICAgIHJldHVybiBpc0FycmF5KHRhcmdldClcclxuICAgICAgICAgICAgICAgID8gdGFyZ2V0Lm1hcCh0b0V2ZW50VGFyZ2V0KS5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICAgICAgICAgIDogaXNTdHJpbmcodGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgID8gZmluZEFsbCh0YXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBpc0V2ZW50VGFyZ2V0KHRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBbdGFyZ2V0XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRvTm9kZXModGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1RvdWNoKGUpIHtcclxuICAgICAgICByZXR1cm4gZS5wb2ludGVyVHlwZSA9PT0gJ3RvdWNoJyB8fCAhIWUudG91Y2hlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFdmVudFBvcyhlKSB7XHJcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBlLnRvdWNoZXM7XHJcbiAgICAgICAgdmFyIGNoYW5nZWRUb3VjaGVzID0gZS5jaGFuZ2VkVG91Y2hlcztcclxuICAgICAgICB2YXIgcmVmID0gdG91Y2hlcyAmJiB0b3VjaGVzWzBdIHx8IGNoYW5nZWRUb3VjaGVzICYmIGNoYW5nZWRUb3VjaGVzWzBdIHx8IGU7XHJcbiAgICAgICAgdmFyIHggPSByZWYuY2xpZW50WDtcclxuICAgICAgICB2YXIgeSA9IHJlZi5jbGllbnRZO1xyXG5cclxuICAgICAgICByZXR1cm4ge3g6IHgsIHk6IHl9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGdsb2JhbCBzZXRJbW1lZGlhdGUgKi9cclxuXHJcbiAgICB2YXIgUHJvbWlzZSQxID0gaW5Ccm93c2VyICYmIHdpbmRvdy5Qcm9taXNlIHx8IFByb21pc2VGbjtcclxuXHJcbiAgICB2YXIgRGVmZXJyZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMkMS5yZWplY3QgPSByZWplY3Q7XHJcbiAgICAgICAgICAgIHRoaXMkMS5yZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9taXNlcy9BKyBwb2x5ZmlsbCB2MS4xLjQgKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFtc3RlaW4vcHJvbWlzKVxyXG4gICAgICovXHJcblxyXG4gICAgdmFyIFJFU09MVkVEID0gMDtcclxuICAgIHZhciBSRUpFQ1RFRCA9IDE7XHJcbiAgICB2YXIgUEVORElORyA9IDI7XHJcblxyXG4gICAgdmFyIGFzeW5jID0gaW5Ccm93c2VyICYmIHdpbmRvdy5zZXRJbW1lZGlhdGUgfHwgc2V0VGltZW91dDtcclxuXHJcbiAgICBmdW5jdGlvbiBQcm9taXNlRm4oZXhlY3V0b3IpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBFTkRJTkc7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmRlZmVycmVkID0gW107XHJcblxyXG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcztcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZXhlY3V0b3IoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZSh4KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UucmVqZWN0KHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFByb21pc2VGbi5yZWplY3QgPSBmdW5jdGlvbiAocikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUZuKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgcmVqZWN0KHIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBQcm9taXNlRm4ucmVzb2x2ZSA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlRm4oZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBQcm9taXNlRm4uYWxsID0gZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlRm4oZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlcmFibGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc29sdmVyKGkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IHg7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSBpdGVyYWJsZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIFByb21pc2VGbi5yZXNvbHZlKGl0ZXJhYmxlW2ldKS50aGVuKHJlc29sdmVyKGkpLCByZWplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIFByb21pc2VGbi5yYWNlID0gZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUZuKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgUHJvbWlzZUZuLnJlc29sdmUoaXRlcmFibGVbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcCA9IFByb21pc2VGbi5wcm90b3R5cGU7XHJcblxyXG4gICAgcC5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAocHJvbWlzZS5zdGF0ZSA9PT0gUEVORElORykge1xyXG4gICAgICAgICAgICBpZiAoeCA9PT0gcHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZSBzZXR0bGVkIHdpdGggaXRzZWxmLicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FsbGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoZW4gPSB4ICYmIHgudGhlbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoeCAhPT0gbnVsbCAmJiBpc09iamVjdCh4KSAmJiBpc0Z1bmN0aW9uKHRoZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbi5jYWxsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjYWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjYWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnJlamVjdChyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjYWxsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnJlamVjdChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJvbWlzZS5zdGF0ZSA9IFJFU09MVkVEO1xyXG4gICAgICAgICAgICBwcm9taXNlLnZhbHVlID0geDtcclxuICAgICAgICAgICAgcHJvbWlzZS5ub3RpZnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHAucmVqZWN0ID0gZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKHByb21pc2Uuc3RhdGUgPT09IFBFTkRJTkcpIHtcclxuICAgICAgICAgICAgaWYgKHJlYXNvbiA9PT0gcHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZSBzZXR0bGVkIHdpdGggaXRzZWxmLicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcm9taXNlLnN0YXRlID0gUkVKRUNURUQ7XHJcbiAgICAgICAgICAgIHByb21pc2UudmFsdWUgPSByZWFzb247XHJcbiAgICAgICAgICAgIHByb21pc2Uubm90aWZ5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwLm5vdGlmeSA9IGZ1bmN0aW9uIG5vdGlmeSgpIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgYXN5bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcyQxLnN0YXRlICE9PSBQRU5ESU5HKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcyQxLmRlZmVycmVkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSB0aGlzJDEuZGVmZXJyZWQuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb25SZXNvbHZlZCA9IHJlZlswXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb25SZWplY3RlZCA9IHJlZlsxXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzb2x2ZSA9IHJlZlsyXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVqZWN0ID0gcmVmWzNdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLnN0YXRlID09PSBSRVNPTFZFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ob25SZXNvbHZlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9uUmVzb2x2ZWQuY2FsbCh1bmRlZmluZWQsIHRoaXMkMS52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMkMS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcyQxLnN0YXRlID09PSBSRUpFQ1RFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ob25SZWplY3RlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9uUmVqZWN0ZWQuY2FsbCh1bmRlZmluZWQsIHRoaXMkMS52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QodGhpcyQxLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBwLnRoZW4gPSBmdW5jdGlvbiB0aGVuKG9uUmVzb2x2ZWQsIG9uUmVqZWN0ZWQpIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlRm4oZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzJDEuZGVmZXJyZWQucHVzaChbb25SZXNvbHZlZCwgb25SZWplY3RlZCwgcmVzb2x2ZSwgcmVqZWN0XSk7XHJcbiAgICAgICAgICAgIHRoaXMkMS5ub3RpZnkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcC5jYXRjaCA9IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBhamF4KHVybCwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICB2YXIgZW52ID0gYXNzaWduKHtcclxuICAgICAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge30sXHJcbiAgICAgICAgICAgIHhocjogbmV3IFhNTEh0dHBSZXF1ZXN0KCksXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IG5vb3AsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJydcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gZW52LmJlZm9yZVNlbmQoZW52KTsgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VuZCh1cmwsIGVudik7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmQodXJsLCBlbnYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciB4aHIgPSBlbnYueGhyO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBlbnYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9wIGluIHhocikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHJbcHJvcF0gPSBlbnZbcHJvcF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHhoci5vcGVuKGVudi5tZXRob2QudG9VcHBlckNhc2UoKSwgdXJsKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGhlYWRlciBpbiBlbnYuaGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBlbnYuaGVhZGVyc1toZWFkZXJdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb24oeGhyLCAnbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMCB8fCB4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwIHx8IHhoci5zdGF0dXMgPT09IDMwNCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJRSAxMSBkb2VzIG5vdCBzdXBwb3J0IHJlc3BvbnNlVHlwZSAnanNvbidcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nICYmIGlzU3RyaW5nKHhoci5yZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyID0gYXNzaWduKGNvcHlYaHIoeGhyKSwge3Jlc3BvbnNlOiBKU09OLnBhcnNlKHhoci5yZXNwb25zZSl9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeGhyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChhc3NpZ24oRXJyb3IoeGhyLnN0YXR1c1RleHQpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhocjogeGhyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG9uKHhociwgJ2Vycm9yJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVqZWN0KGFzc2lnbihFcnJvcignTmV0d29yayBFcnJvcicpLCB7eGhyOiB4aHJ9KSk7IH0pO1xyXG4gICAgICAgICAgICBvbih4aHIsICd0aW1lb3V0JywgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVqZWN0KGFzc2lnbihFcnJvcignTmV0d29yayBUaW1lb3V0JyksIHt4aHI6IHhocn0pKTsgfSk7XHJcblxyXG4gICAgICAgICAgICB4aHIuc2VuZChlbnYuZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW1hZ2Uoc3JjLCBzcmNzZXQsIHNpemVzKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gcmVqZWN0KGUpOyB9O1xyXG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZShpbWcpOyB9O1xyXG5cclxuICAgICAgICAgICAgc2l6ZXMgJiYgKGltZy5zaXplcyA9IHNpemVzKTtcclxuICAgICAgICAgICAgc3Jjc2V0ICYmIChpbWcuc3Jjc2V0ID0gc3Jjc2V0KTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHNyYztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29weVhocihzb3VyY2UpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWR5KGZuKSB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHVuYmluZCA9IG9uKGRvY3VtZW50LCAnRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdW5iaW5kKCk7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZW1wdHkoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaHRtbChwYXJlbnQsIGh0bWwpIHtcclxuICAgICAgICBwYXJlbnQgPSAkKHBhcmVudCk7XHJcbiAgICAgICAgcmV0dXJuIGlzVW5kZWZpbmVkKGh0bWwpXHJcbiAgICAgICAgICAgID8gcGFyZW50LmlubmVySFRNTFxyXG4gICAgICAgICAgICA6IGFwcGVuZChwYXJlbnQuaGFzQ2hpbGROb2RlcygpID8gZW1wdHkocGFyZW50KSA6IHBhcmVudCwgaHRtbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlcGVuZChwYXJlbnQsIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgcGFyZW50ID0gJChwYXJlbnQpO1xyXG5cclxuICAgICAgICBpZiAoIXBhcmVudC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwcGVuZChwYXJlbnQsIGVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcGFyZW50Lmluc2VydEJlZm9yZShlbGVtZW50LCBwYXJlbnQuZmlyc3RDaGlsZCk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBlbmQocGFyZW50LCBlbGVtZW50KSB7XHJcbiAgICAgICAgcGFyZW50ID0gJChwYXJlbnQpO1xyXG4gICAgICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBiZWZvcmUocmVmLCBlbGVtZW50KSB7XHJcbiAgICAgICAgcmVmID0gJChyZWYpO1xyXG4gICAgICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcmVmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHJlZik7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFmdGVyKHJlZiwgZWxlbWVudCkge1xyXG4gICAgICAgIHJlZiA9ICQocmVmKTtcclxuICAgICAgICByZXR1cm4gaW5zZXJ0Tm9kZXMoZWxlbWVudCwgZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIHJlZi5uZXh0U2libGluZ1xyXG4gICAgICAgICAgICA/IGJlZm9yZShyZWYubmV4dFNpYmxpbmcsIGVsZW1lbnQpXHJcbiAgICAgICAgICAgIDogYXBwZW5kKHJlZi5wYXJlbnROb2RlLCBlbGVtZW50KTsgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5zZXJ0Tm9kZXMoZWxlbWVudCwgZm4pIHtcclxuICAgICAgICBlbGVtZW50ID0gaXNTdHJpbmcoZWxlbWVudCkgPyBmcmFnbWVudChlbGVtZW50KSA6IGVsZW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRcclxuICAgICAgICAgICAgPyAnbGVuZ3RoJyBpbiBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICA/IHRvTm9kZXMoZWxlbWVudCkubWFwKGZuKVxyXG4gICAgICAgICAgICAgICAgOiBmbihlbGVtZW50KVxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlJDEoZWxlbWVudCkge1xyXG4gICAgICAgIHRvTm9kZXMoZWxlbWVudCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlICYmIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JhcEFsbChlbGVtZW50LCBzdHJ1Y3R1cmUpIHtcclxuXHJcbiAgICAgICAgc3RydWN0dXJlID0gdG9Ob2RlKGJlZm9yZShlbGVtZW50LCBzdHJ1Y3R1cmUpKTtcclxuXHJcbiAgICAgICAgd2hpbGUgKHN0cnVjdHVyZS5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIHN0cnVjdHVyZSA9IHN0cnVjdHVyZS5maXJzdENoaWxkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXBwZW5kKHN0cnVjdHVyZSwgZWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHJ1Y3R1cmU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd3JhcElubmVyKGVsZW1lbnQsIHN0cnVjdHVyZSkge1xyXG4gICAgICAgIHJldHVybiB0b05vZGVzKHRvTm9kZXMoZWxlbWVudCkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50Lmhhc0NoaWxkTm9kZXMgPyB3cmFwQWxsKHRvTm9kZXMoZWxlbWVudC5jaGlsZE5vZGVzKSwgc3RydWN0dXJlKSA6IGFwcGVuZChlbGVtZW50LCBzdHJ1Y3R1cmUpOyB9XHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW53cmFwKGVsZW1lbnQpIHtcclxuICAgICAgICB0b05vZGVzKGVsZW1lbnQpXHJcbiAgICAgICAgICAgIC5tYXAocGFyZW50KVxyXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHsgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4OyB9KVxyXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBiZWZvcmUocGFyZW50LCBwYXJlbnQuY2hpbGROb2Rlcyk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmUkMShwYXJlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZnJhZ21lbnRSZSA9IC9eXFxzKjwoXFx3K3whKVtePl0qPi87XHJcbiAgICB2YXIgc2luZ2xlVGFnUmUgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPik/JC87XHJcblxyXG4gICAgZnVuY3Rpb24gZnJhZ21lbnQoaHRtbCkge1xyXG5cclxuICAgICAgICB2YXIgbWF0Y2hlcyA9IHNpbmdsZVRhZ1JlLmV4ZWMoaHRtbCk7XHJcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobWF0Y2hlc1sxXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaWYgKGZyYWdtZW50UmUudGVzdChodG1sKSkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sLnRyaW0oKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLnRleHRDb250ZW50ID0gaHRtbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPiAxID8gdG9Ob2Rlcyhjb250YWluZXIuY2hpbGROb2RlcykgOiBjb250YWluZXIuZmlyc3RDaGlsZDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHkkMShub2RlLCBmbikge1xyXG5cclxuICAgICAgICBpZiAoIWlzRWxlbWVudChub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmbihub2RlKTtcclxuICAgICAgICBub2RlID0gbm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICB3aGlsZSAobm9kZSkge1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBhcHBseSQxKG5vZGUsIGZuKTtcclxuICAgICAgICAgICAgbm9kZSA9IG5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uICQoc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuICAgICAgICByZXR1cm4gaXNIdG1sKHNlbGVjdG9yKVxyXG4gICAgICAgICAgICA/IHRvTm9kZShmcmFnbWVudChzZWxlY3RvcikpXHJcbiAgICAgICAgICAgIDogZmluZChzZWxlY3RvciwgY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gJCQoc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuICAgICAgICByZXR1cm4gaXNIdG1sKHNlbGVjdG9yKVxyXG4gICAgICAgICAgICA/IHRvTm9kZXMoZnJhZ21lbnQoc2VsZWN0b3IpKVxyXG4gICAgICAgICAgICA6IGZpbmRBbGwoc2VsZWN0b3IsIGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzSHRtbChzdHIpIHtcclxuICAgICAgICByZXR1cm4gaXNTdHJpbmcoc3RyKSAmJiAoc3RyWzBdID09PSAnPCcgfHwgc3RyLm1hdGNoKC9eXFxzKjwvKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHdoaWxlICggbGVuLS0gPiAwICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcclxuXHJcbiAgICAgICAgYXBwbHkoZWxlbWVudCwgYXJncywgJ2FkZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB3aGlsZSAoIGxlbi0tID4gMCApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XHJcblxyXG4gICAgICAgIGFwcGx5KGVsZW1lbnQsIGFyZ3MsICdyZW1vdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVDbGFzc2VzKGVsZW1lbnQsIGNscykge1xyXG4gICAgICAgIGF0dHIoZWxlbWVudCwgJ2NsYXNzJywgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiAodmFsdWUgfHwgJycpLnJlcGxhY2UobmV3IFJlZ0V4cCgoXCJcXFxcYlwiICsgY2xzICsgXCJcXFxcYlwiKSwgJ2cnKSwgJycpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXBsYWNlQ2xhc3MoZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHdoaWxlICggbGVuLS0gPiAwICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcclxuXHJcbiAgICAgICAgYXJnc1swXSAmJiByZW1vdmVDbGFzcyhlbGVtZW50LCBhcmdzWzBdKTtcclxuICAgICAgICBhcmdzWzFdICYmIGFkZENsYXNzKGVsZW1lbnQsIGFyZ3NbMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQsIGNscykge1xyXG4gICAgICAgIHZhciBhc3NpZ247XHJcblxyXG4gICAgICAgIChhc3NpZ24gPSBnZXRDbGFzc2VzKGNscyksIGNscyA9IGFzc2lnblswXSk7XHJcbiAgICAgICAgdmFyIG5vZGVzID0gdG9Ob2RlcyhlbGVtZW50KTtcclxuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IG5vZGVzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgIGlmIChjbHMgJiYgbm9kZXNbbl0uY2xhc3NMaXN0LmNvbnRhaW5zKGNscykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbHMsIGZvcmNlKSB7XHJcblxyXG4gICAgICAgIGNscyA9IGdldENsYXNzZXMoY2xzKTtcclxuXHJcbiAgICAgICAgdmFyIG5vZGVzID0gdG9Ob2RlcyhlbGVtZW50KTtcclxuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IG5vZGVzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gbm9kZXNbbl0uY2xhc3NMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKGZvcmNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QudG9nZ2xlKGNsc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnRzLkZvcmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC50b2dnbGUoY2xzW2ldLCAhIWZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtmb3JjZSA/ICdhZGQnIDogJ3JlbW92ZSddKGNsc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHkoZWxlbWVudCwgYXJncywgZm4pIHtcclxuICAgICAgICB2YXIgcmVmO1xyXG5cclxuXHJcbiAgICAgICAgYXJncyA9IGFyZ3MucmVkdWNlKGZ1bmN0aW9uIChhcmdzLCBhcmcpIHsgcmV0dXJuIGFyZ3MuY29uY2F0KGdldENsYXNzZXMoYXJnKSk7IH0sIFtdKTtcclxuXHJcbiAgICAgICAgdmFyIG5vZGVzID0gdG9Ob2RlcyhlbGVtZW50KTtcclxuICAgICAgICB2YXIgbG9vcCA9IGZ1bmN0aW9uICggbiApIHtcclxuICAgICAgICAgICAgaWYgKHN1cHBvcnRzLk11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAocmVmID0gbm9kZXNbbl0uY2xhc3NMaXN0KVtmbl0uYXBwbHkocmVmLCBhcmdzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7IHJldHVybiBub2Rlc1tuXS5jbGFzc0xpc3RbZm5dKGNscyk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBub2Rlcy5sZW5ndGg7IG4rKykgbG9vcCggbiApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENsYXNzZXMoc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyhzdHIpLnNwbGl0KC9cXHN8LC8pLmZpbHRlcihCb29sZWFuKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJRSAxMVxyXG4gICAgdmFyIHN1cHBvcnRzID0ge1xyXG5cclxuICAgICAgICBnZXQgTXVsdGlwbGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnTXVsdGlwbGUnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQgRm9yY2UoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCgnRm9yY2UnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ18nKTtcclxuICAgICAgICAgICAgdmFyIGNsYXNzTGlzdCA9IHJlZi5jbGFzc0xpc3Q7XHJcbiAgICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ2EnLCAnYicpO1xyXG4gICAgICAgICAgICBjbGFzc0xpc3QudG9nZ2xlKCdjJywgZmFsc2UpO1xyXG4gICAgICAgICAgICBzdXBwb3J0cyA9IHtcclxuICAgICAgICAgICAgICAgIE11bHRpcGxlOiBjbGFzc0xpc3QuY29udGFpbnMoJ2InKSxcclxuICAgICAgICAgICAgICAgIEZvcmNlOiAhY2xhc3NMaXN0LmNvbnRhaW5zKCdjJylcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0c1trZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjc3NOdW1iZXIgPSB7XHJcbiAgICAgICAgJ2FuaW1hdGlvbi1pdGVyYXRpb24tY291bnQnOiB0cnVlLFxyXG4gICAgICAgICdjb2x1bW4tY291bnQnOiB0cnVlLFxyXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiB0cnVlLFxyXG4gICAgICAgICdmbGV4LWdyb3cnOiB0cnVlLFxyXG4gICAgICAgICdmbGV4LXNocmluayc6IHRydWUsXHJcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogdHJ1ZSxcclxuICAgICAgICAnbGluZS1oZWlnaHQnOiB0cnVlLFxyXG4gICAgICAgICdvcGFjaXR5JzogdHJ1ZSxcclxuICAgICAgICAnb3JkZXInOiB0cnVlLFxyXG4gICAgICAgICdvcnBoYW5zJzogdHJ1ZSxcclxuICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6IHRydWUsXHJcbiAgICAgICAgJ3N0cm9rZS1kYXNob2Zmc2V0JzogdHJ1ZSxcclxuICAgICAgICAnd2lkb3dzJzogdHJ1ZSxcclxuICAgICAgICAnei1pbmRleCc6IHRydWUsXHJcbiAgICAgICAgJ3pvb20nOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNzcyhlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUsIHByaW9yaXR5KSB7XHJcbiAgICAgICAgaWYgKCBwcmlvcml0eSA9PT0gdm9pZCAwICkgcHJpb3JpdHkgPSAnJztcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0b05vZGVzKGVsZW1lbnQpLm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzU3RyaW5nKHByb3BlcnR5KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHByb3BlcnR5ID0gcHJvcE5hbWUocHJvcGVydHkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0U3R5bGUoZWxlbWVudCwgcHJvcGVydHkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsdWUgJiYgIWlzTnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCBpc051bWVyaWModmFsdWUpICYmICFjc3NOdW1iZXJbcHJvcGVydHldID8gKHZhbHVlICsgXCJweFwiKSA6IHZhbHVlLCBwcmlvcml0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkocHJvcGVydHkpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlcyA9IGdldFN0eWxlcyhlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHkucmVkdWNlKGZ1bmN0aW9uIChwcm9wcywgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wc1twcm9wZXJ0eV0gPSBzdHlsZXNbcHJvcE5hbWUocHJvcGVydHkpXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHM7XHJcbiAgICAgICAgICAgICAgICB9LCB7fSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVhY2gocHJvcGVydHksIGZ1bmN0aW9uICh2YWx1ZSwgcHJvcGVydHkpIHsgcmV0dXJuIGNzcyhlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUsIHByaW9yaXR5KTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG5cclxuICAgICAgICB9KVswXTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3R5bGVzKGVsZW1lbnQsIHBzZXVkb0VsdCkge1xyXG4gICAgICAgIHJldHVybiB0b1dpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIHBzZXVkb0VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3R5bGUoZWxlbWVudCwgcHJvcGVydHksIHBzZXVkb0VsdCkge1xyXG4gICAgICAgIHJldHVybiBnZXRTdHlsZXMoZWxlbWVudCwgcHNldWRvRWx0KVtwcm9wZXJ0eV07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBhcnNlQ3NzVmFyID0gbWVtb2l6ZShmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIC8qIHVzYWdlIGluIGNzczogLnVrLW5hbWU6YmVmb3JlIHsgY29udGVudDpcInh5elwiIH0gKi9cclxuXHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhcHBlbmQoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XHJcblxyXG4gICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIChcInVrLVwiICsgbmFtZSkpO1xyXG5cclxuICAgICAgICBuYW1lID0gZ2V0U3R5bGUoZWxlbWVudCwgJ2NvbnRlbnQnLCAnOmJlZm9yZScpLnJlcGxhY2UoL15bXCInXSguKilbXCInXSQvLCAnJDEnKTtcclxuXHJcbiAgICAgICAgcmVtb3ZlJDEoZWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q3NzVmFyKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gIWlzSUVcclxuICAgICAgICAgICAgPyBnZXRTdHlsZXMoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKChcIi0tdWstXCIgKyBuYW1lKSlcclxuICAgICAgICAgICAgOiBwYXJzZUNzc1ZhcihuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI2RvbS1jc3NzdHlsZWRlY2xhcmF0aW9uLXNldHByb3BlcnR5XHJcbiAgICB2YXIgcHJvcE5hbWUgPSBtZW1vaXplKGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiB2ZW5kb3JQcm9wTmFtZShuYW1lKTsgfSk7XHJcblxyXG4gICAgdmFyIGNzc1ByZWZpeGVzID0gWyd3ZWJraXQnLCAnbW96JywgJ21zJ107XHJcblxyXG4gICAgZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUobmFtZSkge1xyXG5cclxuICAgICAgICBuYW1lID0gaHlwaGVuYXRlKG5hbWUpO1xyXG5cclxuICAgICAgICB2YXIgcmVmID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHJlZi5zdHlsZTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUgaW4gc3R5bGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaSA9IGNzc1ByZWZpeGVzLmxlbmd0aCwgcHJlZml4ZWROYW1lO1xyXG5cclxuICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgIHByZWZpeGVkTmFtZSA9IFwiLVwiICsgKGNzc1ByZWZpeGVzW2ldKSArIFwiLVwiICsgbmFtZTtcclxuICAgICAgICAgICAgaWYgKHByZWZpeGVkTmFtZSBpbiBzdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZWZpeGVkTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uKGVsZW1lbnQsIHByb3BzLCBkdXJhdGlvbiwgdGltaW5nKSB7XHJcbiAgICAgICAgaWYgKCBkdXJhdGlvbiA9PT0gdm9pZCAwICkgZHVyYXRpb24gPSA0MDA7XHJcbiAgICAgICAgaWYgKCB0aW1pbmcgPT09IHZvaWQgMCApIHRpbWluZyA9ICdsaW5lYXInO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UkMS5hbGwodG9Ob2RlcyhlbGVtZW50KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjc3MoZWxlbWVudCwgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoZWxlbWVudCwgbmFtZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRyaWdnZXIoZWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnKTsgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIG9uY2UoZWxlbWVudCwgJ3RyYW5zaXRpb25lbmQgdHJhbnNpdGlvbmNhbmNlbGVkJywgZnVuY3Rpb24gKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgJ3VrLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICBjc3MoZWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uUHJvcGVydHk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb246ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PT0gJ3RyYW5zaXRpb25jYW5jZWxlZCcgPyByZWplY3QoKSA6IHJlc29sdmUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9LCB7c2VsZjogdHJ1ZX0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGVsZW1lbnQsICd1ay10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBjc3MoZWxlbWVudCwgYXNzaWduKHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uUHJvcGVydHk6IE9iamVjdC5rZXlzKHByb3BzKS5tYXAocHJvcE5hbWUpLmpvaW4oJywnKSxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IChkdXJhdGlvbiArIFwibXNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uOiB0aW1pbmdcclxuICAgICAgICAgICAgICAgIH0sIHByb3BzKSk7XHJcblxyXG4gICAgICAgICAgICB9KTsgfVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgVHJhbnNpdGlvbiA9IHtcclxuXHJcbiAgICAgICAgc3RhcnQ6IHRyYW5zaXRpb24sXHJcblxyXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdHJpZ2dlcihlbGVtZW50LCAndHJhbnNpdGlvbmVuZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZSQxLnJlc29sdmUoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdHJpZ2dlcihlbGVtZW50LCAndHJhbnNpdGlvbmNhbmNlbGVkJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5Qcm9ncmVzczogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaGFzQ2xhc3MoZWxlbWVudCwgJ3VrLXRyYW5zaXRpb24nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgYW5pbWF0aW9uUHJlZml4ID0gJ3VrLWFuaW1hdGlvbi0nO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFuaW1hdGUkMShlbGVtZW50LCBhbmltYXRpb24sIGR1cmF0aW9uLCBvcmlnaW4sIG91dCkge1xyXG4gICAgICAgIGlmICggZHVyYXRpb24gPT09IHZvaWQgMCApIGR1cmF0aW9uID0gMjAwO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UkMS5hbGwodG9Ob2RlcyhlbGVtZW50KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRyaWdnZXIoZWxlbWVudCwgJ2FuaW1hdGlvbmNhbmNlbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRyaWdnZXIoZWxlbWVudCwgJ2FuaW1hdGlvbmVuZCcpOyB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgb25jZShlbGVtZW50LCAnYW5pbWF0aW9uZW5kIGFuaW1hdGlvbmNhbmNlbGVkJywgZnVuY3Rpb24gKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0eXBlID09PSAnYW5pbWF0aW9uY2FuY2VsZWQnID8gcmVqZWN0KCkgOiByZXNvbHZlKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjc3MoZWxlbWVudCwgJ2FuaW1hdGlvbkR1cmF0aW9uJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoZWxlbWVudCwgKGFuaW1hdGlvblByZWZpeCArIFwiXFxcXFMqXCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCB7c2VsZjogdHJ1ZX0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNzcyhlbGVtZW50LCAnYW5pbWF0aW9uRHVyYXRpb24nLCAoZHVyYXRpb24gKyBcIm1zXCIpKTtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIGFuaW1hdGlvbiwgYW5pbWF0aW9uUHJlZml4ICsgKG91dCA/ICdsZWF2ZScgOiAnZW50ZXInKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0c1dpdGgoYW5pbWF0aW9uLCBhbmltYXRpb25QcmVmaXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luICYmIGFkZENsYXNzKGVsZW1lbnQsIChcInVrLXRyYW5zZm9ybS1vcmlnaW4tXCIgKyBvcmlnaW4pKTtcclxuICAgICAgICAgICAgICAgICAgICBvdXQgJiYgYWRkQ2xhc3MoZWxlbWVudCwgKGFuaW1hdGlvblByZWZpeCArIFwicmV2ZXJzZVwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTsgfVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgaW5Qcm9ncmVzcyA9IG5ldyBSZWdFeHAoKGFuaW1hdGlvblByZWZpeCArIFwiKGVudGVyfGxlYXZlKVwiKSk7XHJcbiAgICB2YXIgQW5pbWF0aW9uID0ge1xyXG5cclxuICAgICAgICBpbjogYW5pbWF0ZSQxLFxyXG5cclxuICAgICAgICBvdXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGFuaW1hdGlvbiwgZHVyYXRpb24sIG9yaWdpbikge1xyXG4gICAgICAgICAgICByZXR1cm4gYW5pbWF0ZSQxKGVsZW1lbnQsIGFuaW1hdGlvbiwgZHVyYXRpb24sIG9yaWdpbiwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5Qcm9ncmVzczogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5Qcm9ncmVzcy50ZXN0KGF0dHIoZWxlbWVudCwgJ2NsYXNzJykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNhbmNlbDogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0cmlnZ2VyKGVsZW1lbnQsICdhbmltYXRpb25jYW5jZWxlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBkaXJzJDEgPSB7XHJcbiAgICAgICAgd2lkdGg6IFsnbGVmdCcsICdyaWdodCddLFxyXG4gICAgICAgIGhlaWdodDogWyd0b3AnLCAnYm90dG9tJ11cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZGltZW5zaW9ucyhlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHZhciByZWN0ID0gaXNFbGVtZW50KGVsZW1lbnQpXHJcbiAgICAgICAgICAgID8gdG9Ob2RlKGVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICAgIDoge2hlaWdodDogaGVpZ2h0KGVsZW1lbnQpLCB3aWR0aDogd2lkdGgoZWxlbWVudCksIHRvcDogMCwgbGVmdDogMH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxyXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXHJcbiAgICAgICAgICAgIGJvdHRvbTogcmVjdC50b3AgKyByZWN0LmhlaWdodCxcclxuICAgICAgICAgICAgcmlnaHQ6IHJlY3QubGVmdCArIHJlY3Qud2lkdGhcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9mZnNldChlbGVtZW50LCBjb29yZGluYXRlcykge1xyXG5cclxuICAgICAgICB2YXIgY3VycmVudE9mZnNldCA9IGRpbWVuc2lvbnMoZWxlbWVudCk7XHJcbiAgICAgICAgdmFyIHJlZiA9IHRvV2luZG93KGVsZW1lbnQpO1xyXG4gICAgICAgIHZhciBwYWdlWU9mZnNldCA9IHJlZi5wYWdlWU9mZnNldDtcclxuICAgICAgICB2YXIgcGFnZVhPZmZzZXQgPSByZWYucGFnZVhPZmZzZXQ7XHJcbiAgICAgICAgdmFyIG9mZnNldEJ5ID0ge2hlaWdodDogcGFnZVlPZmZzZXQsIHdpZHRoOiBwYWdlWE9mZnNldH07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGRpciBpbiBkaXJzJDEpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkaXJzJDFbZGlyXSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE9mZnNldFtkaXJzJDFbZGlyXVtpXV0gKz0gb2Zmc2V0QnlbZGlyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjb29yZGluYXRlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudE9mZnNldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwb3MgPSBjc3MoZWxlbWVudCwgJ3Bvc2l0aW9uJyk7XHJcblxyXG4gICAgICAgIGVhY2goY3NzKGVsZW1lbnQsIFsnbGVmdCcsICd0b3AnXSksIGZ1bmN0aW9uICh2YWx1ZSwgcHJvcCkgeyByZXR1cm4gY3NzKGVsZW1lbnQsIHByb3AsIGNvb3JkaW5hdGVzW3Byb3BdXHJcbiAgICAgICAgICAgICAgICAtIGN1cnJlbnRPZmZzZXRbcHJvcF1cclxuICAgICAgICAgICAgICAgICsgdG9GbG9hdChwb3MgPT09ICdhYnNvbHV0ZScgJiYgdmFsdWUgPT09ICdhdXRvJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gcG9zaXRpb24oZWxlbWVudClbcHJvcF1cclxuICAgICAgICAgICAgICAgICAgICA6IHZhbHVlKVxyXG4gICAgICAgICAgICApOyB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwb3NpdGlvbihlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHZhciByZWYgPSBvZmZzZXQoZWxlbWVudCk7XHJcbiAgICAgICAgdmFyIHRvcCA9IHJlZi50b3A7XHJcbiAgICAgICAgdmFyIGxlZnQgPSByZWYubGVmdDtcclxuXHJcbiAgICAgICAgdmFyIHJlZiQxID0gdG9Ob2RlKGVsZW1lbnQpO1xyXG4gICAgICAgIHZhciByZWYkMV9vd25lckRvY3VtZW50ID0gcmVmJDEub3duZXJEb2N1bWVudDtcclxuICAgICAgICB2YXIgYm9keSA9IHJlZiQxX293bmVyRG9jdW1lbnQuYm9keTtcclxuICAgICAgICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gcmVmJDFfb3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIG9mZnNldFBhcmVudCA9IHJlZiQxLm9mZnNldFBhcmVudDtcclxuICAgICAgICB2YXIgcGFyZW50ID0gb2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAocGFyZW50ID09PSBib2R5IHx8IHBhcmVudCA9PT0gZG9jdW1lbnRFbGVtZW50KSAmJiBjc3MocGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcclxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNFbGVtZW50KHBhcmVudCkpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9IG9mZnNldChwYXJlbnQpO1xyXG4gICAgICAgICAgICB0b3AgLT0gcGFyZW50T2Zmc2V0LnRvcCArIHRvRmxvYXQoY3NzKHBhcmVudCwgJ2JvcmRlclRvcFdpZHRoJykpO1xyXG4gICAgICAgICAgICBsZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0ICsgdG9GbG9hdChjc3MocGFyZW50LCAnYm9yZGVyTGVmdFdpZHRoJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiB0b3AgLSB0b0Zsb2F0KGNzcyhlbGVtZW50LCAnbWFyZ2luVG9wJykpLFxyXG4gICAgICAgICAgICBsZWZ0OiBsZWZ0IC0gdG9GbG9hdChjc3MoZWxlbWVudCwgJ21hcmdpbkxlZnQnKSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9mZnNldFBvc2l0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gWzAsIDBdO1xyXG5cclxuICAgICAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBkbyB7XHJcblxyXG4gICAgICAgICAgICBvZmZzZXRbMF0gKz0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgIG9mZnNldFsxXSArPSBlbGVtZW50Lm9mZnNldExlZnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3NzKGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2luID0gdG9XaW5kb3coZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRbMF0gKz0gd2luLnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WzFdICs9IHdpbi5wYWdlWE9mZnNldDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSB3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBoZWlnaHQgPSBkaW1lbnNpb24oJ2hlaWdodCcpO1xyXG4gICAgdmFyIHdpZHRoID0gZGltZW5zaW9uKCd3aWR0aCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRpbWVuc2lvbihwcm9wKSB7XHJcbiAgICAgICAgdmFyIHByb3BOYW1lID0gdWNmaXJzdChwcm9wKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzV2luZG93KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRbKFwiaW5uZXJcIiArIHByb3BOYW1lKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRG9jdW1lbnQoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gZWxlbWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGRvY1soXCJvZmZzZXRcIiArIHByb3BOYW1lKV0sIGRvY1soXCJzY3JvbGxcIiArIHByb3BOYW1lKV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjc3MoZWxlbWVudCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSAnYXV0bycgPyBlbGVtZW50WyhcIm9mZnNldFwiICsgcHJvcE5hbWUpXSA6IHRvRmxvYXQodmFsdWUpIHx8IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlIC0gYm94TW9kZWxBZGp1c3QoZWxlbWVudCwgcHJvcCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjc3MoZWxlbWVudCwgcHJvcCwgIXZhbHVlICYmIHZhbHVlICE9PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgPyAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogK3ZhbHVlICsgYm94TW9kZWxBZGp1c3QoZWxlbWVudCwgcHJvcCkgKyAncHgnXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJveE1vZGVsQWRqdXN0KGVsZW1lbnQsIHByb3AsIHNpemluZykge1xyXG4gICAgICAgIGlmICggc2l6aW5nID09PSB2b2lkIDAgKSBzaXppbmcgPSAnYm9yZGVyLWJveCc7XHJcblxyXG4gICAgICAgIHJldHVybiBjc3MoZWxlbWVudCwgJ2JveFNpemluZycpID09PSBzaXppbmdcclxuICAgICAgICAgICAgPyBkaXJzJDFbcHJvcF0ubWFwKHVjZmlyc3QpLnJlZHVjZShmdW5jdGlvbiAodmFsdWUsIHByb3ApIHsgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgICAgICArIHRvRmxvYXQoY3NzKGVsZW1lbnQsIChcInBhZGRpbmdcIiArIHByb3ApKSlcclxuICAgICAgICAgICAgICAgICsgdG9GbG9hdChjc3MoZWxlbWVudCwgKFwiYm9yZGVyXCIgKyBwcm9wICsgXCJXaWR0aFwiKSkpOyB9XHJcbiAgICAgICAgICAgICAgICAsIDApXHJcbiAgICAgICAgICAgIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmbGlwUG9zaXRpb24ocG9zKSB7XHJcbiAgICAgICAgZm9yICh2YXIgZGlyIGluIGRpcnMkMSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGRpcnMkMVtkaXJdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlycyQxW2Rpcl1baV0gPT09IHBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXJzJDFbZGlyXVsxIC0gaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b1B4KHZhbHVlLCBwcm9wZXJ0eSwgZWxlbWVudCkge1xyXG4gICAgICAgIGlmICggcHJvcGVydHkgPT09IHZvaWQgMCApIHByb3BlcnR5ID0gJ3dpZHRoJztcclxuICAgICAgICBpZiAoIGVsZW1lbnQgPT09IHZvaWQgMCApIGVsZW1lbnQgPSB3aW5kb3c7XHJcblxyXG4gICAgICAgIHJldHVybiBpc051bWVyaWModmFsdWUpXHJcbiAgICAgICAgICAgID8gK3ZhbHVlXHJcbiAgICAgICAgICAgIDogZW5kc1dpdGgodmFsdWUsICd2aCcpXHJcbiAgICAgICAgICAgICAgICA/IHBlcmNlbnQoaGVpZ2h0KHRvV2luZG93KGVsZW1lbnQpKSwgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICA6IGVuZHNXaXRoKHZhbHVlLCAndncnKVxyXG4gICAgICAgICAgICAgICAgICAgID8gcGVyY2VudCh3aWR0aCh0b1dpbmRvdyhlbGVtZW50KSksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIDogZW5kc1dpdGgodmFsdWUsICclJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwZXJjZW50KGRpbWVuc2lvbnMoZWxlbWVudClbcHJvcGVydHldLCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwZXJjZW50KGJhc2UsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhc2UgKiB0b0Zsb2F0KHZhbHVlKSAvIDEwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICAgIEJhc2VkIG9uOlxyXG4gICAgICAgIENvcHlyaWdodCAoYykgMjAxNiBXaWxzb24gUGFnZSB3aWxzb25wYWdlQG1lLmNvbVxyXG4gICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS93aWxzb25wYWdlL2Zhc3Rkb21cclxuICAgICovXHJcblxyXG4gICAgdmFyIGZhc3Rkb20gPSB7XHJcblxyXG4gICAgICAgIHJlYWRzOiBbXSxcclxuICAgICAgICB3cml0ZXM6IFtdLFxyXG5cclxuICAgICAgICByZWFkOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVhZHMucHVzaCh0YXNrKTtcclxuICAgICAgICAgICAgc2NoZWR1bGVGbHVzaCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFzaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3cml0ZTogZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlcy5wdXNoKHRhc2spO1xyXG4gICAgICAgICAgICBzY2hlZHVsZUZsdXNoKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZSh0aGlzLnJlYWRzLCB0YXNrKTtcclxuICAgICAgICAgICAgcmVtb3ZlKHRoaXMud3JpdGVzLCB0YXNrKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmbHVzaDogZmx1c2hcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGZsdXNoKHJlY3Vyc2lvbikge1xyXG4gICAgICAgIGlmICggcmVjdXJzaW9uID09PSB2b2lkIDAgKSByZWN1cnNpb24gPSAxO1xyXG5cclxuICAgICAgICBydW5UYXNrcyhmYXN0ZG9tLnJlYWRzKTtcclxuICAgICAgICBydW5UYXNrcyhmYXN0ZG9tLndyaXRlcy5zcGxpY2UoMCkpO1xyXG5cclxuICAgICAgICBmYXN0ZG9tLnNjaGVkdWxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZmFzdGRvbS5yZWFkcy5sZW5ndGggfHwgZmFzdGRvbS53cml0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlRmx1c2gocmVjdXJzaW9uICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBSRUNVUlNJT05fTElNSVQgPSA0O1xyXG4gICAgZnVuY3Rpb24gc2NoZWR1bGVGbHVzaChyZWN1cnNpb24pIHtcclxuXHJcbiAgICAgICAgaWYgKGZhc3Rkb20uc2NoZWR1bGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZhc3Rkb20uc2NoZWR1bGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAocmVjdXJzaW9uICYmIHJlY3Vyc2lvbiA8IFJFQ1VSU0lPTl9MSU1JVCkge1xyXG4gICAgICAgICAgICBQcm9taXNlJDEucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gZmx1c2gocmVjdXJzaW9uKTsgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZsdXNoKCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuVGFza3ModGFza3MpIHtcclxuICAgICAgICB2YXIgdGFzaztcclxuICAgICAgICB3aGlsZSAoKHRhc2sgPSB0YXNrcy5zaGlmdCgpKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGFzaygpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZShhcnJheSwgaXRlbSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIH5pbmRleCAmJiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE1vdXNlVHJhY2tlcigpIHt9XHJcblxyXG4gICAgTW91c2VUcmFja2VyLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICAgICAgcG9zaXRpb25zOiBbXSxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25zID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kID0gb24oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gcG9zaXRpb24gPSBnZXRFdmVudFBvcyhlKTsgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFwb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzJDEucG9zaXRpb25zLnB1c2gocG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzJDEucG9zaXRpb25zLmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucG9zaXRpb25zLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy51bmJpbmQgJiYgdGhpcy51bmJpbmQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCAmJiBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1vdmVzVG86IGZ1bmN0aW9uKHRhcmdldCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb25zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHAgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0ID0gcC5sZWZ0O1xyXG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBwLnJpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgdG9wID0gcC50b3A7XHJcbiAgICAgICAgICAgIHZhciBib3R0b20gPSBwLmJvdHRvbTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWYgPSB0aGlzLnBvc2l0aW9ucztcclxuICAgICAgICAgICAgdmFyIHByZXZQb3NpdGlvbiA9IHJlZlswXTtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gbGFzdCh0aGlzLnBvc2l0aW9ucyk7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gW3ByZXZQb3NpdGlvbiwgcG9zaXRpb25dO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvaW50SW5SZWN0KHBvc2l0aW9uLCBwKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZGlhZ29uYWxzID0gW1t7eDogbGVmdCwgeTogdG9wfSwge3g6IHJpZ2h0LCB5OiBib3R0b219XSwgW3t4OiBsZWZ0LCB5OiBib3R0b219LCB7eDogcmlnaHQsIHk6IHRvcH1dXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkaWFnb25hbHMuc29tZShmdW5jdGlvbiAoZGlhZ29uYWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbnRlcnNlY3Rpb24gPSBpbnRlcnNlY3QocGF0aCwgZGlhZ29uYWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbiAmJiBwb2ludEluUmVjdChpbnRlcnNlY3Rpb24sIHApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbnNwaXJlZCBieSBodHRwOi8vcGF1bGJvdXJrZS5uZXQvZ2VvbWV0cnkvcG9pbnRsaW5lcGxhbmUvXHJcbiAgICBmdW5jdGlvbiBpbnRlcnNlY3QocmVmLCByZWYkMSkge1xyXG4gICAgICAgIHZhciByZWZfMCA9IHJlZlswXTtcclxuICAgICAgICB2YXIgeDEgPSByZWZfMC54O1xyXG4gICAgICAgIHZhciB5MSA9IHJlZl8wLnk7XHJcbiAgICAgICAgdmFyIHJlZl8xID0gcmVmWzFdO1xyXG4gICAgICAgIHZhciB4MiA9IHJlZl8xLng7XHJcbiAgICAgICAgdmFyIHkyID0gcmVmXzEueTtcclxuICAgICAgICB2YXIgcmVmJDFfMCA9IHJlZiQxWzBdO1xyXG4gICAgICAgIHZhciB4MyA9IHJlZiQxXzAueDtcclxuICAgICAgICB2YXIgeTMgPSByZWYkMV8wLnk7XHJcbiAgICAgICAgdmFyIHJlZiQxXzEgPSByZWYkMVsxXTtcclxuICAgICAgICB2YXIgeDQgPSByZWYkMV8xLng7XHJcbiAgICAgICAgdmFyIHk0ID0gcmVmJDFfMS55O1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGRlbm9taW5hdG9yID0gKHk0IC0geTMpICogKHgyIC0geDEpIC0gKHg0IC0geDMpICogKHkyIC0geTEpO1xyXG5cclxuICAgICAgICAvLyBMaW5lcyBhcmUgcGFyYWxsZWxcclxuICAgICAgICBpZiAoZGVub21pbmF0b3IgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHVhID0gKCh4NCAtIHgzKSAqICh5MSAtIHkzKSAtICh5NCAtIHkzKSAqICh4MSAtIHgzKSkgLyBkZW5vbWluYXRvcjtcclxuXHJcbiAgICAgICAgaWYgKHVhIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIHggYW5kIHkgY29vcmRpbmF0ZXMgb2YgdGhlIGludGVyc2VjdGlvblxyXG4gICAgICAgIHJldHVybiB7eDogeDEgKyB1YSAqICh4MiAtIHgxKSwgeTogeTEgKyB1YSAqICh5MiAtIHkxKX07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0cmF0cyA9IHt9O1xyXG5cclxuICAgIHN0cmF0cy5ldmVudHMgPVxyXG4gICAgc3RyYXRzLmNyZWF0ZWQgPVxyXG4gICAgc3RyYXRzLmJlZm9yZUNvbm5lY3QgPVxyXG4gICAgc3RyYXRzLmNvbm5lY3RlZCA9XHJcbiAgICBzdHJhdHMuYmVmb3JlRGlzY29ubmVjdCA9XHJcbiAgICBzdHJhdHMuZGlzY29ubmVjdGVkID1cclxuICAgIHN0cmF0cy5kZXN0cm95ID0gY29uY2F0U3RyYXQ7XHJcblxyXG4gICAgLy8gYXJncyBzdHJhdGVneVxyXG4gICAgc3RyYXRzLmFyZ3MgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xyXG4gICAgICAgIHJldHVybiBjaGlsZFZhbCAhPT0gZmFsc2UgJiYgY29uY2F0U3RyYXQoY2hpbGRWYWwgfHwgcGFyZW50VmFsKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gdXBkYXRlIHN0cmF0ZWd5XHJcbiAgICBzdHJhdHMudXBkYXRlID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcclxuICAgICAgICByZXR1cm4gc29ydEJ5JDEoY29uY2F0U3RyYXQocGFyZW50VmFsLCBpc0Z1bmN0aW9uKGNoaWxkVmFsKSA/IHtyZWFkOiBjaGlsZFZhbH0gOiBjaGlsZFZhbCksICdvcmRlcicpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBwcm9wZXJ0eSBzdHJhdGVneVxyXG4gICAgc3RyYXRzLnByb3BzID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcclxuXHJcbiAgICAgICAgaWYgKGlzQXJyYXkoY2hpbGRWYWwpKSB7XHJcbiAgICAgICAgICAgIGNoaWxkVmFsID0gY2hpbGRWYWwucmVkdWNlKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZVtrZXldID0gU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RyYXRzLm1ldGhvZHMocGFyZW50VmFsLCBjaGlsZFZhbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGV4dGVuZCBzdHJhdGVneVxyXG4gICAgc3RyYXRzLmNvbXB1dGVkID1cclxuICAgIHN0cmF0cy5tZXRob2RzID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcclxuICAgICAgICByZXR1cm4gY2hpbGRWYWxcclxuICAgICAgICAgICAgPyBwYXJlbnRWYWxcclxuICAgICAgICAgICAgICAgID8gYXNzaWduKHt9LCBwYXJlbnRWYWwsIGNoaWxkVmFsKVxyXG4gICAgICAgICAgICAgICAgOiBjaGlsZFZhbFxyXG4gICAgICAgICAgICA6IHBhcmVudFZhbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gZGF0YSBzdHJhdGVneVxyXG4gICAgc3RyYXRzLmRhdGEgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCwgdm0pIHtcclxuXHJcbiAgICAgICAgaWYgKCF2bSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjaGlsZFZhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudFZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFwYXJlbnRWYWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZFZhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2bSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lcmdlRm5EYXRhKHBhcmVudFZhbCwgY2hpbGRWYWwsIHZtKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVyZ2VGbkRhdGEocGFyZW50VmFsLCBjaGlsZFZhbCwgdm0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBtZXJnZUZuRGF0YShwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSkge1xyXG4gICAgICAgIHJldHVybiBzdHJhdHMuY29tcHV0ZWQoXHJcbiAgICAgICAgICAgIGlzRnVuY3Rpb24ocGFyZW50VmFsKVxyXG4gICAgICAgICAgICAgICAgPyBwYXJlbnRWYWwuY2FsbCh2bSwgdm0pXHJcbiAgICAgICAgICAgICAgICA6IHBhcmVudFZhbCxcclxuICAgICAgICAgICAgaXNGdW5jdGlvbihjaGlsZFZhbClcclxuICAgICAgICAgICAgICAgID8gY2hpbGRWYWwuY2FsbCh2bSwgdm0pXHJcbiAgICAgICAgICAgICAgICA6IGNoaWxkVmFsXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25jYXQgc3RyYXRlZ3lcclxuICAgIGZ1bmN0aW9uIGNvbmNhdFN0cmF0KHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcclxuXHJcbiAgICAgICAgcGFyZW50VmFsID0gcGFyZW50VmFsICYmICFpc0FycmF5KHBhcmVudFZhbCkgPyBbcGFyZW50VmFsXSA6IHBhcmVudFZhbDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVmFsXHJcbiAgICAgICAgICAgID8gcGFyZW50VmFsXHJcbiAgICAgICAgICAgICAgICA/IHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpXHJcbiAgICAgICAgICAgICAgICA6IGlzQXJyYXkoY2hpbGRWYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgPyBjaGlsZFZhbFxyXG4gICAgICAgICAgICAgICAgICAgIDogW2NoaWxkVmFsXVxyXG4gICAgICAgICAgICA6IHBhcmVudFZhbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWZhdWx0IHN0cmF0ZWd5XHJcbiAgICBmdW5jdGlvbiBkZWZhdWx0U3RyYXQocGFyZW50VmFsLCBjaGlsZFZhbCkge1xyXG4gICAgICAgIHJldHVybiBpc1VuZGVmaW5lZChjaGlsZFZhbCkgPyBwYXJlbnRWYWwgOiBjaGlsZFZhbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZCwgdm0pIHtcclxuXHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oY2hpbGQpKSB7XHJcbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQub3B0aW9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGlsZC5leHRlbmRzKSB7XHJcbiAgICAgICAgICAgIHBhcmVudCA9IG1lcmdlT3B0aW9ucyhwYXJlbnQsIGNoaWxkLmV4dGVuZHMsIHZtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGlsZC5taXhpbnMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZC5taXhpbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZC5taXhpbnNbaV0sIHZtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHBhcmVudCkge1xyXG4gICAgICAgICAgICBtZXJnZUtleShrZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5JDEgaW4gY2hpbGQpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNPd24ocGFyZW50LCBrZXkkMSkpIHtcclxuICAgICAgICAgICAgICAgIG1lcmdlS2V5KGtleSQxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VLZXkoa2V5KSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IChzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXQpKHBhcmVudFtrZXldLCBjaGlsZFtrZXldLCB2bSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZU9wdGlvbnMob3B0aW9ucywgYXJncykge1xyXG4gICAgICAgIHZhciBvYmo7XHJcblxyXG4gICAgICAgIGlmICggYXJncyA9PT0gdm9pZCAwICkgYXJncyA9IFtdO1xyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICFvcHRpb25zXHJcbiAgICAgICAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICAgICAgICA6IHN0YXJ0c1dpdGgob3B0aW9ucywgJ3snKVxyXG4gICAgICAgICAgICAgICAgICAgID8gSlNPTi5wYXJzZShvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIDogYXJncy5sZW5ndGggJiYgIWluY2x1ZGVzKG9wdGlvbnMsICc6JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAoKCBvYmogPSB7fSwgb2JqW2FyZ3NbMF1dID0gb3B0aW9ucywgb2JqICkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogb3B0aW9ucy5zcGxpdCgnOycpLnJlZHVjZShmdW5jdGlvbiAob3B0aW9ucywgb3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gb3B0aW9uLnNwbGl0KC86KC4qKS8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IHJlZlswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJlZlsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgJiYgIWlzVW5kZWZpbmVkKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5LnRyaW0oKV0gPSB2YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBsYXkoZWwpIHtcclxuXHJcbiAgICAgICAgaWYgKGlzSUZyYW1lKGVsKSkge1xyXG4gICAgICAgICAgICBjYWxsKGVsLCB7ZnVuYzogJ3BsYXlWaWRlbycsIG1ldGhvZDogJ3BsYXknfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNIVE1MNShlbCkpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGVsLnBsYXkoKS5jYXRjaChub29wKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhdXNlKGVsKSB7XHJcblxyXG4gICAgICAgIGlmIChpc0lGcmFtZShlbCkpIHtcclxuICAgICAgICAgICAgY2FsbChlbCwge2Z1bmM6ICdwYXVzZVZpZGVvJywgbWV0aG9kOiAncGF1c2UnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNIVE1MNShlbCkpIHtcclxuICAgICAgICAgICAgZWwucGF1c2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG11dGUoZWwpIHtcclxuXHJcbiAgICAgICAgaWYgKGlzSUZyYW1lKGVsKSkge1xyXG4gICAgICAgICAgICBjYWxsKGVsLCB7ZnVuYzogJ211dGUnLCBtZXRob2Q6ICdzZXRWb2x1bWUnLCB2YWx1ZTogMH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzSFRNTDUoZWwpKSB7XHJcbiAgICAgICAgICAgIGVsLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzSFRNTDUoZWwpIHtcclxuICAgICAgICByZXR1cm4gZWwgJiYgZWwudGFnTmFtZSA9PT0gJ1ZJREVPJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0lGcmFtZShlbCkge1xyXG4gICAgICAgIHJldHVybiBlbCAmJiBlbC50YWdOYW1lID09PSAnSUZSQU1FJyAmJiAoaXNZb3V0dWJlKGVsKSB8fCBpc1ZpbWVvKGVsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNZb3V0dWJlKGVsKSB7XHJcbiAgICAgICAgcmV0dXJuICEhZWwuc3JjLm1hdGNoKC9cXC9cXC8uKj95b3V0dWJlKC1ub2Nvb2tpZSk/XFwuW2Etel0rXFwvKHdhdGNoXFw/dj1bXiZcXHNdK3xlbWJlZCl8eW91dHVcXC5iZVxcLy4qLyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNWaW1lbyhlbCkge1xyXG4gICAgICAgIHJldHVybiAhIWVsLnNyYy5tYXRjaCgvdmltZW9cXC5jb21cXC92aWRlb1xcLy4qLyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsbChlbCwgY21kKSB7XHJcbiAgICAgICAgZW5hYmxlQXBpKGVsKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvc3QoZWwsIGNtZCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBvc3QoZWwsIGNtZCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGVsLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoYXNzaWduKHtldmVudDogJ2NvbW1hbmQnfSwgY21kKSksICcqJyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3RhdGVLZXkkMSA9ICdfdWtQbGF5ZXInO1xyXG4gICAgdmFyIGNvdW50ZXIgPSAwO1xyXG4gICAgZnVuY3Rpb24gZW5hYmxlQXBpKGVsKSB7XHJcblxyXG4gICAgICAgIGlmIChlbFtzdGF0ZUtleSQxXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxbc3RhdGVLZXkkMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgeW91dHViZSA9IGlzWW91dHViZShlbCk7XHJcbiAgICAgICAgdmFyIHZpbWVvID0gaXNWaW1lbyhlbCk7XHJcblxyXG4gICAgICAgIHZhciBpZCA9ICsrY291bnRlcjtcclxuICAgICAgICB2YXIgcG9sbGVyO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxbc3RhdGVLZXkkMV0gPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcblxyXG4gICAgICAgICAgICB5b3V0dWJlICYmIG9uY2UoZWwsICdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9zdChlbCwge2V2ZW50OiAnbGlzdGVuaW5nJywgaWQ6IGlkfSk7IH07XHJcbiAgICAgICAgICAgICAgICBwb2xsZXIgPSBzZXRJbnRlcnZhbChsaXN0ZW5lciwgMTAwKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgb25jZSh3aW5kb3csICdtZXNzYWdlJywgcmVzb2x2ZSwgZmFsc2UsIGZ1bmN0aW9uIChyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVmLmRhdGE7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgJiYgKHlvdXR1YmUgJiYgZGF0YS5pZCA9PT0gaWQgJiYgZGF0YS5ldmVudCA9PT0gJ29uUmVhZHknIHx8IHZpbWVvICYmIE51bWJlcihkYXRhLnBsYXllcl9pZCkgPT09IGlkKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGVsLnNyYyA9IFwiXCIgKyAoZWwuc3JjKSArIChpbmNsdWRlcyhlbC5zcmMsICc/JykgPyAnJicgOiAnPycpICsgKHlvdXR1YmUgPyAnZW5hYmxlanNhcGk9MScgOiAoXCJhcGk9MSZwbGF5ZXJfaWQ9XCIgKyBpZCkpO1xyXG5cclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNsZWFySW50ZXJ2YWwocG9sbGVyKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNJblZpZXcoZWxlbWVudCwgb2Zmc2V0VG9wLCBvZmZzZXRMZWZ0KSB7XHJcbiAgICAgICAgaWYgKCBvZmZzZXRUb3AgPT09IHZvaWQgMCApIG9mZnNldFRvcCA9IDA7XHJcbiAgICAgICAgaWYgKCBvZmZzZXRMZWZ0ID09PSB2b2lkIDAgKSBvZmZzZXRMZWZ0ID0gMDtcclxuXHJcblxyXG4gICAgICAgIGlmICghaXNWaXNpYmxlKGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnRlcnNlY3RSZWN0LmFwcGx5KHZvaWQgMCwgc2Nyb2xsUGFyZW50cyhlbGVtZW50KS5tYXAoZnVuY3Rpb24gKHBhcmVudCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlZiA9IG9mZnNldChnZXRWaWV3cG9ydCQxKHBhcmVudCkpO1xyXG4gICAgICAgICAgICB2YXIgdG9wID0gcmVmLnRvcDtcclxuICAgICAgICAgICAgdmFyIGxlZnQgPSByZWYubGVmdDtcclxuICAgICAgICAgICAgdmFyIGJvdHRvbSA9IHJlZi5ib3R0b207XHJcbiAgICAgICAgICAgIHZhciByaWdodCA9IHJlZi5yaWdodDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHRvcCAtIG9mZnNldFRvcCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQgLSBvZmZzZXRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiBib3R0b20gKyBvZmZzZXRUb3AsXHJcbiAgICAgICAgICAgICAgICByaWdodDogcmlnaHQgKyBvZmZzZXRMZWZ0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkuY29uY2F0KG9mZnNldChlbGVtZW50KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvcChlbGVtZW50LCB0b3ApIHtcclxuXHJcbiAgICAgICAgaWYgKGlzV2luZG93KGVsZW1lbnQpIHx8IGlzRG9jdW1lbnQoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGdldFNjcm9sbGluZ0VsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gdG9wO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNjcm9sbEludG9WaWV3KGVsZW1lbnQsIHJlZikge1xyXG4gICAgICAgIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcclxuICAgICAgICB2YXIgb2Zmc2V0QnkgPSByZWYub2Zmc2V0OyBpZiAoIG9mZnNldEJ5ID09PSB2b2lkIDAgKSBvZmZzZXRCeSA9IDA7XHJcblxyXG5cclxuICAgICAgICB2YXIgcGFyZW50cyA9IGlzVmlzaWJsZShlbGVtZW50KSA/IHNjcm9sbFBhcmVudHMoZWxlbWVudCkgOiBbXTtcclxuICAgICAgICB2YXIgZGlmZiA9IDA7XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudHMucmVkdWNlKGZ1bmN0aW9uIChmbiwgc2Nyb2xsRWxlbWVudCwgaSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsRWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciBtYXhTY3JvbGwgPSBzY3JvbGxIZWlnaHQgLSBnZXRWaWV3cG9ydENsaWVudEhlaWdodChzY3JvbGxFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0b3AgPSBNYXRoLmNlaWwoXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQocGFyZW50c1tpIC0gMV0gfHwgZWxlbWVudCkudG9wXHJcbiAgICAgICAgICAgICAgICAtIG9mZnNldChnZXRWaWV3cG9ydCQxKHNjcm9sbEVsZW1lbnQpKS50b3BcclxuICAgICAgICAgICAgICAgIC0gb2Zmc2V0QnlcclxuICAgICAgICAgICAgICAgICsgZGlmZlxyXG4gICAgICAgICAgICAgICAgKyBzY3JvbGxUb3BcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b3AgPiBtYXhTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIGRpZmYgPSB0b3AgLSBtYXhTY3JvbGw7XHJcbiAgICAgICAgICAgICAgICB0b3AgPSBtYXhTY3JvbGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaWZmID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjcm9sbFRvKHNjcm9sbEVsZW1lbnQsIHRvcCAtIHNjcm9sbFRvcCkudGhlbihmbik7IH07XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKCk7IH0pKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbFRvKGVsZW1lbnQsIHRvcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSBlbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IGdldER1cmF0aW9uKE1hdGguYWJzKHRvcCkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gc3RlcCgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSBlYXNlKGNsYW1wKChEYXRlLm5vdygpIC0gc3RhcnQpIC8gZHVyYXRpb24pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wKGVsZW1lbnQsIHNjcm9sbCArIHRvcCAqIHBlcmNlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzY3JvbGwgbW9yZSBpZiB3ZSBoYXZlIG5vdCByZWFjaGVkIG91ciBkZXN0aW5hdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJjZW50ICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RHVyYXRpb24oZGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gNDAgKiBNYXRoLnBvdyhkaXN0LCAuMzc1KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGVhc2Uoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKDEgLSBNYXRoLmNvcyhNYXRoLlBJICogaykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2Nyb2xsZWRPdmVyKGVsZW1lbnQsIGhlaWdodE9mZnNldCkge1xyXG4gICAgICAgIGlmICggaGVpZ2h0T2Zmc2V0ID09PSB2b2lkIDAgKSBoZWlnaHRPZmZzZXQgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCFpc1Zpc2libGUoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVmID0gc2Nyb2xsUGFyZW50cyhlbGVtZW50LCAvYXV0b3xzY3JvbGwvLCB0cnVlKTtcclxuICAgICAgICB2YXIgc2Nyb2xsRWxlbWVudCA9IHJlZlswXTtcclxuICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsRWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBnZXRWaWV3cG9ydENsaWVudEhlaWdodChzY3JvbGxFbGVtZW50KTtcclxuICAgICAgICB2YXIgdmlld3BvcnRUb3AgPSBvZmZzZXRQb3NpdGlvbihlbGVtZW50KVswXSAtIHNjcm9sbFRvcCAtIG9mZnNldFBvc2l0aW9uKHNjcm9sbEVsZW1lbnQpWzBdO1xyXG4gICAgICAgIHZhciB2aWV3cG9ydERpc3QgPSBNYXRoLm1pbihjbGllbnRIZWlnaHQsIHZpZXdwb3J0VG9wICsgc2Nyb2xsVG9wKTtcclxuXHJcbiAgICAgICAgdmFyIHRvcCA9IHZpZXdwb3J0VG9wIC0gdmlld3BvcnREaXN0O1xyXG4gICAgICAgIHZhciBkaXN0ID0gTWF0aC5taW4oXHJcbiAgICAgICAgICAgIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgaGVpZ2h0T2Zmc2V0ICsgdmlld3BvcnREaXN0LFxyXG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQgLSAodmlld3BvcnRUb3AgKyBzY3JvbGxUb3ApLFxyXG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQgLSBjbGllbnRIZWlnaHRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gY2xhbXAoLTEgKiB0b3AgLyBkaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzY3JvbGxQYXJlbnRzKGVsZW1lbnQsIG92ZXJmbG93UmUsIHNjcm9sbGFibGUpIHtcclxuICAgICAgICBpZiAoIG92ZXJmbG93UmUgPT09IHZvaWQgMCApIG92ZXJmbG93UmUgPSAvYXV0b3xzY3JvbGx8aGlkZGVuLztcclxuICAgICAgICBpZiAoIHNjcm9sbGFibGUgPT09IHZvaWQgMCApIHNjcm9sbGFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdmFyIHNjcm9sbEVsID0gZ2V0U2Nyb2xsaW5nRWxlbWVudChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgdmFyIGFuY2VzdG9ycyA9IHBhcmVudHMoZWxlbWVudCkucmV2ZXJzZSgpO1xyXG4gICAgICAgIGFuY2VzdG9ycyA9IGFuY2VzdG9ycy5zbGljZShhbmNlc3RvcnMuaW5kZXhPZihzY3JvbGxFbCkgKyAxKTtcclxuXHJcbiAgICAgICAgdmFyIGZpeGVkSW5kZXggPSBmaW5kSW5kZXgoYW5jZXN0b3JzLCBmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGNzcyhlbCwgJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCc7IH0pO1xyXG4gICAgICAgIGlmICh+Zml4ZWRJbmRleCkge1xyXG4gICAgICAgICAgICBhbmNlc3RvcnMgPSBhbmNlc3RvcnMuc2xpY2UoZml4ZWRJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW3Njcm9sbEVsXS5jb25jYXQoYW5jZXN0b3JzLmZpbHRlcihmdW5jdGlvbiAocGFyZW50KSB7IHJldHVybiBvdmVyZmxvd1JlLnRlc3QoY3NzKHBhcmVudCwgJ292ZXJmbG93JykpICYmICghc2Nyb2xsYWJsZSB8fCBwYXJlbnQuc2Nyb2xsSGVpZ2h0ID4gZ2V0Vmlld3BvcnRDbGllbnRIZWlnaHQocGFyZW50KSk7IH0pXHJcbiAgICAgICAgKS5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Vmlld3BvcnQkMShzY3JvbGxFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHNjcm9sbEVsZW1lbnQgPT09IGdldFNjcm9sbGluZ0VsZW1lbnQoc2Nyb2xsRWxlbWVudCkgPyB3aW5kb3cgOiBzY3JvbGxFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlPUyAxMiByZXR1cm5zIDxib2R5PiBhcyBzY3JvbGxpbmdFbGVtZW50XHJcbiAgICBmdW5jdGlvbiBnZXRWaWV3cG9ydENsaWVudEhlaWdodChzY3JvbGxFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIChzY3JvbGxFbGVtZW50ID09PSBnZXRTY3JvbGxpbmdFbGVtZW50KHNjcm9sbEVsZW1lbnQpID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogc2Nyb2xsRWxlbWVudCkuY2xpZW50SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNjcm9sbGluZ0VsZW1lbnQoZWxlbWVudCkge1xyXG4gICAgICAgIHZhciByZWYgPSB0b1dpbmRvdyhlbGVtZW50KTtcclxuICAgICAgICB2YXIgZG9jdW1lbnQgPSByZWYuZG9jdW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkaXJzID0ge1xyXG4gICAgICAgIHdpZHRoOiBbJ3gnLCAnbGVmdCcsICdyaWdodCddLFxyXG4gICAgICAgIGhlaWdodDogWyd5JywgJ3RvcCcsICdib3R0b20nXVxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBwb3NpdGlvbkF0KGVsZW1lbnQsIHRhcmdldCwgZWxBdHRhY2gsIHRhcmdldEF0dGFjaCwgZWxPZmZzZXQsIHRhcmdldE9mZnNldCwgZmxpcCwgYm91bmRhcnkpIHtcclxuXHJcbiAgICAgICAgZWxBdHRhY2ggPSBnZXRQb3MoZWxBdHRhY2gpO1xyXG4gICAgICAgIHRhcmdldEF0dGFjaCA9IGdldFBvcyh0YXJnZXRBdHRhY2gpO1xyXG5cclxuICAgICAgICB2YXIgZmxpcHBlZCA9IHtlbGVtZW50OiBlbEF0dGFjaCwgdGFyZ2V0OiB0YXJnZXRBdHRhY2h9O1xyXG5cclxuICAgICAgICBpZiAoIWVsZW1lbnQgfHwgIXRhcmdldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmxpcHBlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkaW0gPSBvZmZzZXQoZWxlbWVudCk7XHJcbiAgICAgICAgdmFyIHRhcmdldERpbSA9IG9mZnNldCh0YXJnZXQpO1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHRhcmdldERpbTtcclxuXHJcbiAgICAgICAgbW92ZVRvKHBvc2l0aW9uLCBlbEF0dGFjaCwgZGltLCAtMSk7XHJcbiAgICAgICAgbW92ZVRvKHBvc2l0aW9uLCB0YXJnZXRBdHRhY2gsIHRhcmdldERpbSwgMSk7XHJcblxyXG4gICAgICAgIGVsT2Zmc2V0ID0gZ2V0T2Zmc2V0cyhlbE9mZnNldCwgZGltLndpZHRoLCBkaW0uaGVpZ2h0KTtcclxuICAgICAgICB0YXJnZXRPZmZzZXQgPSBnZXRPZmZzZXRzKHRhcmdldE9mZnNldCwgdGFyZ2V0RGltLndpZHRoLCB0YXJnZXREaW0uaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgZWxPZmZzZXRbJ3gnXSArPSB0YXJnZXRPZmZzZXRbJ3gnXTtcclxuICAgICAgICBlbE9mZnNldFsneSddICs9IHRhcmdldE9mZnNldFsneSddO1xyXG5cclxuICAgICAgICBwb3NpdGlvbi5sZWZ0ICs9IGVsT2Zmc2V0Wyd4J107XHJcbiAgICAgICAgcG9zaXRpb24udG9wICs9IGVsT2Zmc2V0Wyd5J107XHJcblxyXG4gICAgICAgIGlmIChmbGlwKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYm91bmRhcmllcyA9IHNjcm9sbFBhcmVudHMoZWxlbWVudCkubWFwKGdldFZpZXdwb3J0JDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJvdW5kYXJ5ICYmICFpbmNsdWRlcyhib3VuZGFyaWVzLCBib3VuZGFyeSkpIHtcclxuICAgICAgICAgICAgICAgIGJvdW5kYXJpZXMudW5zaGlmdChib3VuZGFyeSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJvdW5kYXJpZXMgPSBib3VuZGFyaWVzLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIG9mZnNldChlbCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgZWFjaChkaXJzLCBmdW5jdGlvbiAocmVmLCBwcm9wKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gcmVmWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsaWduID0gcmVmWzFdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsaWduRmxpcCA9IHJlZlsyXTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEoZmxpcCA9PT0gdHJ1ZSB8fCBpbmNsdWRlcyhmbGlwLCBkaXIpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBib3VuZGFyaWVzLnNvbWUoZnVuY3Rpb24gKGJvdW5kYXJ5KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtT2Zmc2V0ID0gZWxBdHRhY2hbZGlyXSA9PT0gYWxpZ25cclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAtZGltW3Byb3BdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZWxBdHRhY2hbZGlyXSA9PT0gYWxpZ25GbGlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGRpbVtwcm9wXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0T2Zmc2V0ID0gdGFyZ2V0QXR0YWNoW2Rpcl0gPT09IGFsaWduXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGFyZ2V0RGltW3Byb3BdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGFyZ2V0QXR0YWNoW2Rpcl0gPT09IGFsaWduRmxpcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAtdGFyZ2V0RGltW3Byb3BdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvblthbGlnbl0gPCBib3VuZGFyeVthbGlnbl0gfHwgcG9zaXRpb25bYWxpZ25dICsgZGltW3Byb3BdID4gYm91bmRhcnlbYWxpZ25GbGlwXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNlbnRlck9mZnNldCA9IGRpbVtwcm9wXSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjZW50ZXJUYXJnZXRPZmZzZXQgPSB0YXJnZXRBdHRhY2hbZGlyXSA9PT0gJ2NlbnRlcicgPyAtdGFyZ2V0RGltW3Byb3BdIC8gMiA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxBdHRhY2hbZGlyXSA9PT0gJ2NlbnRlcicgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHkoY2VudGVyT2Zmc2V0LCBjZW50ZXJUYXJnZXRPZmZzZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBhcHBseSgtY2VudGVyT2Zmc2V0LCAtY2VudGVyVGFyZ2V0T2Zmc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHx8IGFwcGx5KGVsZW1PZmZzZXQsIHRhcmdldE9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYXBwbHkoZWxlbU9mZnNldCwgdGFyZ2V0T2Zmc2V0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VmFsID0gdG9GbG9hdCgocG9zaXRpb25bYWxpZ25dICsgZWxlbU9mZnNldCArIHRhcmdldE9mZnNldCAtIGVsT2Zmc2V0W2Rpcl0gKiAyKS50b0ZpeGVkKDQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPj0gYm91bmRhcnlbYWxpZ25dICYmIG5ld1ZhbCArIGRpbVtwcm9wXSA8PSBib3VuZGFyeVthbGlnbkZsaXBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblthbGlnbl0gPSBuZXdWYWw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWydlbGVtZW50JywgJ3RhcmdldCddLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxpcHBlZFtlbF1bZGlyXSA9ICFlbGVtT2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZmxpcHBlZFtlbF1bZGlyXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZsaXBwZWRbZWxdW2Rpcl0gPT09IGRpcnNbcHJvcF1bMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZGlyc1twcm9wXVsyXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkaXJzW3Byb3BdWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvZmZzZXQoZWxlbWVudCwgcG9zaXRpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gZmxpcHBlZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlVG8ocG9zaXRpb24sIGF0dGFjaCwgZGltLCBmYWN0b3IpIHtcclxuICAgICAgICBlYWNoKGRpcnMsIGZ1bmN0aW9uIChyZWYsIHByb3ApIHtcclxuICAgICAgICAgICAgdmFyIGRpciA9IHJlZlswXTtcclxuICAgICAgICAgICAgdmFyIGFsaWduID0gcmVmWzFdO1xyXG4gICAgICAgICAgICB2YXIgYWxpZ25GbGlwID0gcmVmWzJdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGF0dGFjaFtkaXJdID09PSBhbGlnbkZsaXApIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uW2FsaWduXSArPSBkaW1bcHJvcF0gKiBmYWN0b3I7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0YWNoW2Rpcl0gPT09ICdjZW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvblthbGlnbl0gKz0gZGltW3Byb3BdICogZmFjdG9yIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBvcyhwb3MpIHtcclxuXHJcbiAgICAgICAgdmFyIHggPSAvbGVmdHxjZW50ZXJ8cmlnaHQvO1xyXG4gICAgICAgIHZhciB5ID0gL3RvcHxjZW50ZXJ8Ym90dG9tLztcclxuXHJcbiAgICAgICAgcG9zID0gKHBvcyB8fCAnJykuc3BsaXQoJyAnKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgcG9zID0geC50ZXN0KHBvc1swXSlcclxuICAgICAgICAgICAgICAgID8gcG9zLmNvbmNhdCgnY2VudGVyJylcclxuICAgICAgICAgICAgICAgIDogeS50ZXN0KHBvc1swXSlcclxuICAgICAgICAgICAgICAgICAgICA/IFsnY2VudGVyJ10uY29uY2F0KHBvcylcclxuICAgICAgICAgICAgICAgICAgICA6IFsnY2VudGVyJywgJ2NlbnRlciddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogeC50ZXN0KHBvc1swXSkgPyBwb3NbMF0gOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgeTogeS50ZXN0KHBvc1sxXSkgPyBwb3NbMV0gOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0T2Zmc2V0cyhvZmZzZXRzLCB3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG4gICAgICAgIHZhciByZWYgPSAob2Zmc2V0cyB8fCAnJykuc3BsaXQoJyAnKTtcclxuICAgICAgICB2YXIgeCA9IHJlZlswXTtcclxuICAgICAgICB2YXIgeSA9IHJlZlsxXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogeCA/IHRvRmxvYXQoeCkgKiAoZW5kc1dpdGgoeCwgJyUnKSA/IHdpZHRoIC8gMTAwIDogMSkgOiAwLFxyXG4gICAgICAgICAgICB5OiB5ID8gdG9GbG9hdCh5KSAqIChlbmRzV2l0aCh5LCAnJScpID8gaGVpZ2h0IC8gMTAwIDogMSkgOiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdXRpbCA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcclxuICAgICAgICBfX3Byb3RvX186IG51bGwsXHJcbiAgICAgICAgYWpheDogYWpheCxcclxuICAgICAgICBnZXRJbWFnZTogZ2V0SW1hZ2UsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcclxuICAgICAgICBUcmFuc2l0aW9uOiBUcmFuc2l0aW9uLFxyXG4gICAgICAgIGFuaW1hdGU6IGFuaW1hdGUkMSxcclxuICAgICAgICBBbmltYXRpb246IEFuaW1hdGlvbixcclxuICAgICAgICBhdHRyOiBhdHRyLFxyXG4gICAgICAgIGhhc0F0dHI6IGhhc0F0dHIsXHJcbiAgICAgICAgcmVtb3ZlQXR0cjogcmVtb3ZlQXR0cixcclxuICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgIGFkZENsYXNzOiBhZGRDbGFzcyxcclxuICAgICAgICByZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3NlczogcmVtb3ZlQ2xhc3NlcyxcclxuICAgICAgICByZXBsYWNlQ2xhc3M6IHJlcGxhY2VDbGFzcyxcclxuICAgICAgICBoYXNDbGFzczogaGFzQ2xhc3MsXHJcbiAgICAgICAgdG9nZ2xlQ2xhc3M6IHRvZ2dsZUNsYXNzLFxyXG4gICAgICAgIGRpbWVuc2lvbnM6IGRpbWVuc2lvbnMsXHJcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXHJcbiAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxyXG4gICAgICAgIG9mZnNldFBvc2l0aW9uOiBvZmZzZXRQb3NpdGlvbixcclxuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgYm94TW9kZWxBZGp1c3Q6IGJveE1vZGVsQWRqdXN0LFxyXG4gICAgICAgIGZsaXBQb3NpdGlvbjogZmxpcFBvc2l0aW9uLFxyXG4gICAgICAgIHRvUHg6IHRvUHgsXHJcbiAgICAgICAgcmVhZHk6IHJlYWR5LFxyXG4gICAgICAgIGVtcHR5OiBlbXB0eSxcclxuICAgICAgICBodG1sOiBodG1sLFxyXG4gICAgICAgIHByZXBlbmQ6IHByZXBlbmQsXHJcbiAgICAgICAgYXBwZW5kOiBhcHBlbmQsXHJcbiAgICAgICAgYmVmb3JlOiBiZWZvcmUsXHJcbiAgICAgICAgYWZ0ZXI6IGFmdGVyLFxyXG4gICAgICAgIHJlbW92ZTogcmVtb3ZlJDEsXHJcbiAgICAgICAgd3JhcEFsbDogd3JhcEFsbCxcclxuICAgICAgICB3cmFwSW5uZXI6IHdyYXBJbm5lcixcclxuICAgICAgICB1bndyYXA6IHVud3JhcCxcclxuICAgICAgICBmcmFnbWVudDogZnJhZ21lbnQsXHJcbiAgICAgICAgYXBwbHk6IGFwcGx5JDEsXHJcbiAgICAgICAgJDogJCxcclxuICAgICAgICAkJDogJCQsXHJcbiAgICAgICAgaW5Ccm93c2VyOiBpbkJyb3dzZXIsXHJcbiAgICAgICAgaXNJRTogaXNJRSxcclxuICAgICAgICBpc1J0bDogaXNSdGwsXHJcbiAgICAgICAgaGFzVG91Y2g6IGhhc1RvdWNoLFxyXG4gICAgICAgIHBvaW50ZXJEb3duOiBwb2ludGVyRG93bixcclxuICAgICAgICBwb2ludGVyTW92ZTogcG9pbnRlck1vdmUsXHJcbiAgICAgICAgcG9pbnRlclVwOiBwb2ludGVyVXAsXHJcbiAgICAgICAgcG9pbnRlckVudGVyOiBwb2ludGVyRW50ZXIsXHJcbiAgICAgICAgcG9pbnRlckxlYXZlOiBwb2ludGVyTGVhdmUsXHJcbiAgICAgICAgcG9pbnRlckNhbmNlbDogcG9pbnRlckNhbmNlbCxcclxuICAgICAgICBvbjogb24sXHJcbiAgICAgICAgb2ZmOiBvZmYsXHJcbiAgICAgICAgb25jZTogb25jZSxcclxuICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxyXG4gICAgICAgIGNyZWF0ZUV2ZW50OiBjcmVhdGVFdmVudCxcclxuICAgICAgICB0b0V2ZW50VGFyZ2V0czogdG9FdmVudFRhcmdldHMsXHJcbiAgICAgICAgaXNUb3VjaDogaXNUb3VjaCxcclxuICAgICAgICBnZXRFdmVudFBvczogZ2V0RXZlbnRQb3MsXHJcbiAgICAgICAgZmFzdGRvbTogZmFzdGRvbSxcclxuICAgICAgICBpc1ZvaWRFbGVtZW50OiBpc1ZvaWRFbGVtZW50LFxyXG4gICAgICAgIGlzVmlzaWJsZTogaXNWaXNpYmxlLFxyXG4gICAgICAgIHNlbElucHV0OiBzZWxJbnB1dCxcclxuICAgICAgICBpc0lucHV0OiBpc0lucHV0LFxyXG4gICAgICAgIGlzRm9jdXNhYmxlOiBpc0ZvY3VzYWJsZSxcclxuICAgICAgICBwYXJlbnQ6IHBhcmVudCxcclxuICAgICAgICBmaWx0ZXI6IGZpbHRlciQxLFxyXG4gICAgICAgIG1hdGNoZXM6IG1hdGNoZXMsXHJcbiAgICAgICAgY2xvc2VzdDogY2xvc2VzdCxcclxuICAgICAgICB3aXRoaW46IHdpdGhpbixcclxuICAgICAgICBwYXJlbnRzOiBwYXJlbnRzLFxyXG4gICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcclxuICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgaGFzT3duOiBoYXNPd24sXHJcbiAgICAgICAgaHlwaGVuYXRlOiBoeXBoZW5hdGUsXHJcbiAgICAgICAgY2FtZWxpemU6IGNhbWVsaXplLFxyXG4gICAgICAgIHVjZmlyc3Q6IHVjZmlyc3QsXHJcbiAgICAgICAgc3RhcnRzV2l0aDogc3RhcnRzV2l0aCxcclxuICAgICAgICBlbmRzV2l0aDogZW5kc1dpdGgsXHJcbiAgICAgICAgaW5jbHVkZXM6IGluY2x1ZGVzLFxyXG4gICAgICAgIGZpbmRJbmRleDogZmluZEluZGV4LFxyXG4gICAgICAgIGlzQXJyYXk6IGlzQXJyYXksXHJcbiAgICAgICAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcclxuICAgICAgICBpc09iamVjdDogaXNPYmplY3QsXHJcbiAgICAgICAgaXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcclxuICAgICAgICBpc1dpbmRvdzogaXNXaW5kb3csXHJcbiAgICAgICAgaXNEb2N1bWVudDogaXNEb2N1bWVudCxcclxuICAgICAgICBpc05vZGU6IGlzTm9kZSxcclxuICAgICAgICBpc0VsZW1lbnQ6IGlzRWxlbWVudCxcclxuICAgICAgICBpc0Jvb2xlYW46IGlzQm9vbGVhbixcclxuICAgICAgICBpc1N0cmluZzogaXNTdHJpbmcsXHJcbiAgICAgICAgaXNOdW1iZXI6IGlzTnVtYmVyLFxyXG4gICAgICAgIGlzTnVtZXJpYzogaXNOdW1lcmljLFxyXG4gICAgICAgIGlzRW1wdHk6IGlzRW1wdHksXHJcbiAgICAgICAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxyXG4gICAgICAgIHRvQm9vbGVhbjogdG9Cb29sZWFuLFxyXG4gICAgICAgIHRvTnVtYmVyOiB0b051bWJlcixcclxuICAgICAgICB0b0Zsb2F0OiB0b0Zsb2F0LFxyXG4gICAgICAgIHRvQXJyYXk6IHRvQXJyYXksXHJcbiAgICAgICAgdG9Ob2RlOiB0b05vZGUsXHJcbiAgICAgICAgdG9Ob2RlczogdG9Ob2RlcyxcclxuICAgICAgICB0b1dpbmRvdzogdG9XaW5kb3csXHJcbiAgICAgICAgdG9NczogdG9NcyxcclxuICAgICAgICBpc0VxdWFsOiBpc0VxdWFsLFxyXG4gICAgICAgIHN3YXA6IHN3YXAsXHJcbiAgICAgICAgYXNzaWduOiBhc3NpZ24sXHJcbiAgICAgICAgbGFzdDogbGFzdCxcclxuICAgICAgICBlYWNoOiBlYWNoLFxyXG4gICAgICAgIHNvcnRCeTogc29ydEJ5JDEsXHJcbiAgICAgICAgdW5pcXVlQnk6IHVuaXF1ZUJ5LFxyXG4gICAgICAgIGNsYW1wOiBjbGFtcCxcclxuICAgICAgICBub29wOiBub29wLFxyXG4gICAgICAgIGludGVyc2VjdFJlY3Q6IGludGVyc2VjdFJlY3QsXHJcbiAgICAgICAgcG9pbnRJblJlY3Q6IHBvaW50SW5SZWN0LFxyXG4gICAgICAgIERpbWVuc2lvbnM6IERpbWVuc2lvbnMsXHJcbiAgICAgICAgZ2V0SW5kZXg6IGdldEluZGV4LFxyXG4gICAgICAgIG1lbW9pemU6IG1lbW9pemUsXHJcbiAgICAgICAgTW91c2VUcmFja2VyOiBNb3VzZVRyYWNrZXIsXHJcbiAgICAgICAgbWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXHJcbiAgICAgICAgcGFyc2VPcHRpb25zOiBwYXJzZU9wdGlvbnMsXHJcbiAgICAgICAgcGxheTogcGxheSxcclxuICAgICAgICBwYXVzZTogcGF1c2UsXHJcbiAgICAgICAgbXV0ZTogbXV0ZSxcclxuICAgICAgICBwb3NpdGlvbkF0OiBwb3NpdGlvbkF0LFxyXG4gICAgICAgIFByb21pc2U6IFByb21pc2UkMSxcclxuICAgICAgICBEZWZlcnJlZDogRGVmZXJyZWQsXHJcbiAgICAgICAgcXVlcnk6IHF1ZXJ5LFxyXG4gICAgICAgIHF1ZXJ5QWxsOiBxdWVyeUFsbCxcclxuICAgICAgICBmaW5kOiBmaW5kLFxyXG4gICAgICAgIGZpbmRBbGw6IGZpbmRBbGwsXHJcbiAgICAgICAgZXNjYXBlOiBlc2NhcGUsXHJcbiAgICAgICAgY3NzOiBjc3MsXHJcbiAgICAgICAgZ2V0Q3NzVmFyOiBnZXRDc3NWYXIsXHJcbiAgICAgICAgcHJvcE5hbWU6IHByb3BOYW1lLFxyXG4gICAgICAgIGlzSW5WaWV3OiBpc0luVmlldyxcclxuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcclxuICAgICAgICBzY3JvbGxJbnRvVmlldzogc2Nyb2xsSW50b1ZpZXcsXHJcbiAgICAgICAgc2Nyb2xsZWRPdmVyOiBzY3JvbGxlZE92ZXIsXHJcbiAgICAgICAgc2Nyb2xsUGFyZW50czogc2Nyb2xsUGFyZW50cyxcclxuICAgICAgICBnZXRWaWV3cG9ydDogZ2V0Vmlld3BvcnQkMSxcclxuICAgICAgICBnZXRWaWV3cG9ydENsaWVudEhlaWdodDogZ2V0Vmlld3BvcnRDbGllbnRIZWlnaHRcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdsb2JhbEFQSSAoVUlraXQpIHtcclxuXHJcbiAgICAgICAgdmFyIERBVEEgPSBVSWtpdC5kYXRhO1xyXG5cclxuICAgICAgICBVSWtpdC51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAocGx1Z2luLmluc3RhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbHVnaW4uY2FsbChudWxsLCB0aGlzKTtcclxuICAgICAgICAgICAgcGx1Z2luLmluc3RhbGxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC5taXhpbiA9IGZ1bmN0aW9uIChtaXhpbiwgY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IChpc1N0cmluZyhjb21wb25lbnQpID8gVUlraXQuY29tcG9uZW50KGNvbXBvbmVudCkgOiBjb21wb25lbnQpIHx8IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5vcHRpb25zID0gbWVyZ2VPcHRpb25zKGNvbXBvbmVudC5vcHRpb25zLCBtaXhpbik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVUlraXQuZXh0ZW5kID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgdmFyIFN1cGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIFN1YiA9IGZ1bmN0aW9uIFVJa2l0Q29tcG9uZW50KG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBTdWIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlci5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICBTdWIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ViO1xyXG4gICAgICAgICAgICBTdWIub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhTdXBlci5vcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIFN1Yi5zdXBlciA9IFN1cGVyO1xyXG4gICAgICAgICAgICBTdWIuZXh0ZW5kID0gU3VwZXIuZXh0ZW5kO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFN1YjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC51cGRhdGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgZSkge1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgPyB0b05vZGUoZWxlbWVudCkgOiBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgICAgICAgICAgcGFyZW50cyhlbGVtZW50KS5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gdXBkYXRlKGVsZW1lbnRbREFUQV0sIGUpOyB9KTtcclxuICAgICAgICAgICAgYXBwbHkkMShlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gdXBkYXRlKGVsZW1lbnRbREFUQV0sIGUpOyB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRhaW5lcjtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlraXQsICdjb250YWluZXInLCB7XHJcblxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGUoZGF0YSwgZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbbmFtZV0uX2Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFbbmFtZV0uX2NhbGxVcGRhdGUoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhvb2tzQVBJIChVSWtpdCkge1xyXG5cclxuICAgICAgICBVSWtpdC5wcm90b3R5cGUuX2NhbGxIb29rID0gZnVuY3Rpb24gKGhvb2spIHtcclxuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy4kb3B0aW9uc1tob29rXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVycykge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcikgeyByZXR1cm4gaGFuZGxlci5jYWxsKHRoaXMkMSk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVUlraXQucHJvdG90eXBlLl9jYWxsQ29ubmVjdGVkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXB1dGVkcyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW5pdFByb3BzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jYWxsSG9vaygnYmVmb3JlQ29ubmVjdCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW5pdEV2ZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0T2JzZXJ2ZXJzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jYWxsSG9vaygnY29ubmVjdGVkJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxVcGRhdGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC5wcm90b3R5cGUuX2NhbGxEaXNjb25uZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jYWxsSG9vaygnYmVmb3JlRGlzY29ubmVjdCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNjb25uZWN0T2JzZXJ2ZXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VuYmluZEV2ZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsSG9vaygnZGlzY29ubmVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3dhdGNoO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC5wcm90b3R5cGUuX2NhbGxVcGRhdGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCBlID09PSB2b2lkIDAgKSBlID0gJ3VwZGF0ZSc7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGUgPT09ICd1cGRhdGUnIHx8IGUgPT09ICdyZXNpemUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsV2F0Y2hlcygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuJG9wdGlvbnMudXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdXBkYXRlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlcyA9IG5ldyBTZXQoKTtcclxuICAgICAgICAgICAgICAgIGZhc3Rkb20ucmVhZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5fY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1blVwZGF0ZXMuY2FsbCh0aGlzJDEsIHRoaXMkMS5fdXBkYXRlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzJDEuX3VwZGF0ZXM7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlcy5hZGQoZS50eXBlIHx8IGUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFVJa2l0LnByb3RvdHlwZS5fY2FsbFdhdGNoZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl93YXRjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5pdGlhbCA9ICFoYXNPd24odGhpcywgJ193YXRjaCcpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fd2F0Y2ggPSBmYXN0ZG9tLnJlYWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5fY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuV2F0Y2hlcy5jYWxsKHRoaXMkMSwgaW5pdGlhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzJDEuX3dhdGNoID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBydW5VcGRhdGVzKHR5cGVzKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciB1cGRhdGVzID0gdGhpcy4kb3B0aW9ucy51cGRhdGU7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9vcCA9IGZ1bmN0aW9uICggaSApIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWYgPSB1cGRhdGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWQgPSByZWYucmVhZDtcclxuICAgICAgICAgICAgICAgIHZhciB3cml0ZSA9IHJlZi53cml0ZTtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudHMgPSByZWYuZXZlbnRzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdHlwZXMuaGFzKCd1cGRhdGUnKSAmJiAoIWV2ZW50cyB8fCAhZXZlbnRzLnNvbWUoZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIHR5cGVzLmhhcyh0eXBlKTsgfSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAodm9pZCAwKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWFkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlYWQuY2FsbCh0aGlzJDEsIHRoaXMkMS5fZGF0YSwgdHlwZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIGlzUGxhaW5PYmplY3QocmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ24odGhpcyQxLl9kYXRhLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod3JpdGUgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhc3Rkb20ud3JpdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gd3JpdGUuY2FsbCh0aGlzJDEsIHRoaXMkMS5fZGF0YSwgdHlwZXMpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVwZGF0ZXMubGVuZ3RoOyBpKyspIGxvb3AoIGkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJ1bldhdGNoZXMoaW5pdGlhbCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjb21wdXRlZCA9IHJlZi4kb3B0aW9ucy5jb21wdXRlZDtcclxuICAgICAgICAgICAgdmFyIF9jb21wdXRlZHMgPSByZWYuX2NvbXB1dGVkcztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBoYXNQcmV2ID0gaGFzT3duKF9jb21wdXRlZHMsIGtleSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IF9jb21wdXRlZHNba2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgX2NvbXB1dGVkc1trZXldO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZWYkMSA9IGNvbXB1dGVkW2tleV07XHJcbiAgICAgICAgICAgICAgICB2YXIgd2F0Y2ggPSByZWYkMS53YXRjaDtcclxuICAgICAgICAgICAgICAgIHZhciBpbW1lZGlhdGUgPSByZWYkMS5pbW1lZGlhdGU7XHJcbiAgICAgICAgICAgICAgICBpZiAod2F0Y2ggJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWwgJiYgaW1tZWRpYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgaGFzUHJldiAmJiAhaXNFcXVhbChwcmV2LCB0aGlzW2tleV0pXHJcbiAgICAgICAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2F0Y2guY2FsbCh0aGlzLCB0aGlzW2tleV0sIHByZXYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdGF0ZUFQSSAoVUlraXQpIHtcclxuXHJcbiAgICAgICAgdmFyIHVpZCA9IDA7XHJcblxyXG4gICAgICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblxyXG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0gbm9ybWFsaXplRGF0YShvcHRpb25zLCB0aGlzLmNvbnN0cnVjdG9yLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh0aGlzLmNvbnN0cnVjdG9yLm9wdGlvbnMsIG9wdGlvbnMsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLiRlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuJHByb3BzID0ge307XHJcblxyXG4gICAgICAgICAgICB0aGlzLl91aWQgPSB1aWQrKztcclxuICAgICAgICAgICAgdGhpcy5faW5pdERhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5pdE1ldGhvZHMoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5pdENvbXB1dGVkcygpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsSG9vaygnY3JlYXRlZCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJG1vdW50KG9wdGlvbnMuZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVUlraXQucHJvdG90eXBlLl9pbml0RGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWYgPSB0aGlzLiRvcHRpb25zO1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlZi5kYXRhOyBpZiAoIGRhdGEgPT09IHZvaWQgMCApIGRhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwcm9wc1trZXldID0gdGhpc1trZXldID0gZGF0YVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVUlraXQucHJvdG90eXBlLl9pbml0TWV0aG9kcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWYgPSB0aGlzLiRvcHRpb25zO1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kcyA9IHJlZi5tZXRob2RzO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1ldGhvZHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gbWV0aG9kc1trZXldLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC5wcm90b3R5cGUuX2luaXRDb21wdXRlZHMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVmID0gdGhpcy4kb3B0aW9ucztcclxuICAgICAgICAgICAgdmFyIGNvbXB1dGVkID0gcmVmLmNvbXB1dGVkO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fY29tcHV0ZWRzID0ge307XHJcblxyXG4gICAgICAgICAgICBpZiAoY29tcHV0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyQ29tcHV0ZWQodGhpcywga2V5LCBjb21wdXRlZFtrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdFByb3BzID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIga2V5O1xyXG5cclxuICAgICAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCBnZXRQcm9wcyh0aGlzLiRvcHRpb25zLCB0aGlzLiRuYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHByb3BzW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcHJvcHNba2V5XSA9IHByb3BzW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBleGNsdWRlID0gW3RoaXMuJG9wdGlvbnMuY29tcHV0ZWQsIHRoaXMuJG9wdGlvbnMubWV0aG9kc107XHJcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHRoaXMuJHByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHByb3BzICYmIG5vdEluKGV4Y2x1ZGUsIGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0aGlzLiRwcm9wc1trZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVUlraXQucHJvdG90eXBlLl9pbml0RXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWYgPSB0aGlzLiRvcHRpb25zO1xyXG4gICAgICAgICAgICB2YXIgZXZlbnRzID0gcmVmLmV2ZW50cztcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNPd24oZXZlbnQsICdoYW5kbGVyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlckV2ZW50KHRoaXMkMSwgZXZlbnRba2V5XSwga2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyRXZlbnQodGhpcyQxLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVUlraXQucHJvdG90eXBlLl91bmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh1bmJpbmQpIHsgcmV0dXJuIHVuYmluZCgpOyB9KTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50cztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC5wcm90b3R5cGUuX2luaXRPYnNlcnZlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29ic2VydmVycyA9IFtcclxuICAgICAgICAgICAgICAgIGluaXRDaGlsZExpc3RPYnNlcnZlcih0aGlzKSxcclxuICAgICAgICAgICAgICAgIGluaXRQcm9wc09ic2VydmVyKHRoaXMpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVUlraXQucHJvdG90eXBlLl9kaXNjb25uZWN0T2JzZXJ2ZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2ZXIpIHsgcmV0dXJuIG9ic2VydmVyICYmIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTsgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFByb3BzKG9wdHMsIG5hbWUpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhJDEgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBvcHRzLmFyZ3M7IGlmICggYXJncyA9PT0gdm9pZCAwICkgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgcHJvcHMgPSBvcHRzLnByb3BzOyBpZiAoIHByb3BzID09PSB2b2lkIDAgKSBwcm9wcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgZWwgPSBvcHRzLmVsO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwcm9wcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEkMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGh5cGhlbmF0ZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YShlbCwgcHJvcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcHJvcHNba2V5XSA9PT0gQm9vbGVhbiAmJiB2YWx1ZSA9PT0gJydcclxuICAgICAgICAgICAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgICAgICAgICAgICA6IGNvZXJjZShwcm9wc1trZXldLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT09ICd0YXJnZXQnICYmICghdmFsdWUgfHwgc3RhcnRzV2l0aCh2YWx1ZSwgJ18nKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhJDFba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyhkYXRhKGVsLCBuYW1lKSwgYXJncyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkkMSBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCQxID0gY2FtZWxpemUoa2V5JDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW3Byb3AkMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEkMVtwcm9wJDFdID0gY29lcmNlKHByb3BzW3Byb3AkMV0sIG9wdGlvbnNba2V5JDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEkMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcHV0ZWQoY29tcG9uZW50LCBrZXksIGNiKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wb25lbnQsIGtleSwge1xyXG5cclxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9jb21wdXRlZHMgPSBjb21wb25lbnQuX2NvbXB1dGVkcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHByb3BzID0gY29tcG9uZW50LiRwcm9wcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsID0gY29tcG9uZW50LiRlbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNPd24oX2NvbXB1dGVkcywga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY29tcHV0ZWRzW2tleV0gPSAoY2IuZ2V0IHx8IGNiKS5jYWxsKGNvbXBvbmVudCwgJHByb3BzLCAkZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb21wdXRlZHNba2V5XTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2NvbXB1dGVkcyA9IGNvbXBvbmVudC5fY29tcHV0ZWRzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfY29tcHV0ZWRzW2tleV0gPSBjYi5zZXQgPyBjYi5zZXQuY2FsbChjb21wb25lbnQsIHZhbHVlKSA6IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQoX2NvbXB1dGVkc1trZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgX2NvbXB1dGVkc1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVnaXN0ZXJFdmVudChjb21wb25lbnQsIGV2ZW50LCBrZXkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNQbGFpbk9iamVjdChldmVudCkpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gKHtuYW1lOiBrZXksIGhhbmRsZXI6IGV2ZW50fSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gZXZlbnQubmFtZTtcclxuICAgICAgICAgICAgdmFyIGVsID0gZXZlbnQuZWw7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGVyID0gZXZlbnQuaGFuZGxlcjtcclxuICAgICAgICAgICAgdmFyIGNhcHR1cmUgPSBldmVudC5jYXB0dXJlO1xyXG4gICAgICAgICAgICB2YXIgcGFzc2l2ZSA9IGV2ZW50LnBhc3NpdmU7XHJcbiAgICAgICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV2ZW50LmRlbGVnYXRlO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gZXZlbnQuZmlsdGVyO1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IGV2ZW50LnNlbGY7XHJcbiAgICAgICAgICAgIGVsID0gaXNGdW5jdGlvbihlbClcclxuICAgICAgICAgICAgICAgID8gZWwuY2FsbChjb21wb25lbnQpXHJcbiAgICAgICAgICAgICAgICA6IGVsIHx8IGNvbXBvbmVudC4kZWw7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNBcnJheShlbCkpIHtcclxuICAgICAgICAgICAgICAgIGVsLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiByZWdpc3RlckV2ZW50KGNvbXBvbmVudCwgYXNzaWduKHt9LCBldmVudCwge2VsOiBlbH0pLCBrZXkpOyB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFlbCB8fCBmaWx0ZXIgJiYgIWZpbHRlci5jYWxsKGNvbXBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29tcG9uZW50Ll9ldmVudHMucHVzaChcclxuICAgICAgICAgICAgICAgIG9uKFxyXG4gICAgICAgICAgICAgICAgICAgIGVsLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgIWRlbGVnYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGlzU3RyaW5nKGRlbGVnYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBkZWxlZ2F0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkZWxlZ2F0ZS5jYWxsKGNvbXBvbmVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgaXNTdHJpbmcoaGFuZGxlcikgPyBjb21wb25lbnRbaGFuZGxlcl0gOiBoYW5kbGVyLmJpbmQoY29tcG9uZW50KSxcclxuICAgICAgICAgICAgICAgICAgICB7cGFzc2l2ZTogcGFzc2l2ZSwgY2FwdHVyZTogY2FwdHVyZSwgc2VsZjogc2VsZn1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBub3RJbihvcHRpb25zLCBrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZXZlcnkoZnVuY3Rpb24gKGFycikgeyByZXR1cm4gIWFyciB8fCAhaGFzT3duKGFyciwga2V5KTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb2VyY2UodHlwZSwgdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBCb29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9Cb29sZWFuKHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b051bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2xpc3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9MaXN0KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPyB0eXBlKHZhbHVlKSA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9MaXN0KHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgPyB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgOiBpc1N0cmluZyh2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICA/IHZhbHVlLnNwbGl0KC8sKD8hW14oXSpcXCkpLykubWFwKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXNOdW1lcmljKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRvTnVtYmVyKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRvQm9vbGVhbih2YWx1ZS50cmltKCkpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDogW3ZhbHVlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEocmVmLCByZWYkMSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlZi5kYXRhO1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IHJlZiQxLmFyZ3M7XHJcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHJlZiQxLnByb3BzOyBpZiAoIHByb3BzID09PSB2b2lkIDAgKSBwcm9wcyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZGF0YSA9IGlzQXJyYXkoZGF0YSlcclxuICAgICAgICAgICAgICAgID8gIWlzRW1wdHkoYXJncylcclxuICAgICAgICAgICAgICAgICAgICA/IGRhdGEuc2xpY2UoMCwgYXJncy5sZW5ndGgpLnJlZHVjZShmdW5jdGlvbiAoZGF0YSwgdmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduKGRhdGEsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbYXJnc1tpbmRleF1dID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIDogZGF0YTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmaW5lZChkYXRhW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gcHJvcHNba2V5XSA/IGNvZXJjZShwcm9wc1trZXldLCBkYXRhW2tleV0pIDogZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0Q2hpbGRMaXN0T2JzZXJ2ZXIoY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIHZhciByZWYgPSBjb21wb25lbnQuJG9wdGlvbnM7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IHJlZi5lbDtcclxuXHJcbiAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbXBvbmVudC4kZW1pdCgpOyB9KTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCwge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRQcm9wc09ic2VydmVyKGNvbXBvbmVudCkge1xyXG5cclxuICAgICAgICAgICAgdmFyICRuYW1lID0gY29tcG9uZW50LiRuYW1lO1xyXG4gICAgICAgICAgICB2YXIgJG9wdGlvbnMgPSBjb21wb25lbnQuJG9wdGlvbnM7XHJcbiAgICAgICAgICAgIHZhciAkcHJvcHMgPSBjb21wb25lbnQuJHByb3BzO1xyXG4gICAgICAgICAgICB2YXIgYXR0cnMgPSAkb3B0aW9ucy5hdHRycztcclxuICAgICAgICAgICAgdmFyIHByb3BzID0gJG9wdGlvbnMucHJvcHM7XHJcbiAgICAgICAgICAgIHZhciBlbCA9ICRvcHRpb25zLmVsO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwcm9wcyB8fCBhdHRycyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBpc0FycmF5KGF0dHJzKSA/IGF0dHJzIDogT2JqZWN0LmtleXMocHJvcHMpO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gYXR0cmlidXRlcy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gaHlwaGVuYXRlKGtleSk7IH0pLmNvbmNhdCgkbmFtZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAocmVjb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBnZXRQcm9wcygkb3B0aW9ucywgJG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY29yZHMuc29tZShmdW5jdGlvbiAocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSByZWYuYXR0cmlidXRlTmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3AgPSBhdHRyaWJ1dGVOYW1lLnJlcGxhY2UoJ2RhdGEtJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocHJvcCA9PT0gJG5hbWUgPyBhdHRyaWJ1dGVzIDogW2NhbWVsaXplKHByb3ApLCBjYW1lbGl6ZShhdHRyaWJ1dGVOYW1lKV0pLnNvbWUoZnVuY3Rpb24gKHByb3ApIHsgcmV0dXJuICFpc1VuZGVmaW5lZChkYXRhW3Byb3BdKSAmJiBkYXRhW3Byb3BdICE9PSAkcHJvcHNbcHJvcF07IH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuJHJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogZmlsdGVyLmNvbmNhdChmaWx0ZXIubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIChcImRhdGEtXCIgKyBrZXkpOyB9KSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluc3RhbmNlQVBJIChVSWtpdCkge1xyXG5cclxuICAgICAgICB2YXIgREFUQSA9IFVJa2l0LmRhdGE7XHJcblxyXG4gICAgICAgIFVJa2l0LnByb3RvdHlwZS4kY3JlYXRlID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgZWxlbWVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gVUlraXRbY29tcG9uZW50XShlbGVtZW50LCBkYXRhKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC5wcm90b3R5cGUuJG1vdW50ID0gZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVmID0gdGhpcy4kb3B0aW9ucztcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSByZWYubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZWxbREFUQV0pIHtcclxuICAgICAgICAgICAgICAgIGVsW0RBVEFdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbFtEQVRBXVtuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbFtEQVRBXVtuYW1lXSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRlbCA9IHRoaXMuJG9wdGlvbnMuZWwgPSB0aGlzLiRvcHRpb25zLmVsIHx8IGVsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpdGhpbihlbCwgZG9jdW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsQ29ubmVjdGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC5wcm90b3R5cGUuJHJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsRGlzY29ubmVjdGVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxDb25uZWN0ZWQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC5wcm90b3R5cGUuJGRlc3Ryb3kgPSBmdW5jdGlvbiAocmVtb3ZlRWwpIHtcclxuICAgICAgICAgICAgaWYgKCByZW1vdmVFbCA9PT0gdm9pZCAwICkgcmVtb3ZlRWwgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgcmVmID0gdGhpcy4kb3B0aW9ucztcclxuICAgICAgICAgICAgdmFyIGVsID0gcmVmLmVsO1xyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IHJlZi5uYW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsRGlzY29ubmVjdGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxIb29rKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWVsIHx8ICFlbFtEQVRBXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgZWxbREFUQV1bbmFtZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzRW1wdHkoZWxbREFUQV0pKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgZWxbREFUQV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZW1vdmVFbCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlJDEodGhpcy4kZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVUlraXQucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbFVwZGF0ZShlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBVSWtpdC5wcm90b3R5cGUuJHVwZGF0ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBlKSB7XHJcbiAgICAgICAgICAgIGlmICggZWxlbWVudCA9PT0gdm9pZCAwICkgZWxlbWVudCA9IHRoaXMuJGVsO1xyXG5cclxuICAgICAgICAgICAgVUlraXQudXBkYXRlKGVsZW1lbnQsIGUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFVJa2l0LnByb3RvdHlwZS4kZ2V0Q29tcG9uZW50ID0gVUlraXQuZ2V0Q29tcG9uZW50O1xyXG5cclxuICAgICAgICB2YXIgY29tcG9uZW50TmFtZSA9IG1lbW9pemUoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFVJa2l0LnByZWZpeCArIGh5cGhlbmF0ZShuYW1lKTsgfSk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVUlraXQucHJvdG90eXBlLCB7XHJcblxyXG4gICAgICAgICAgICAkY29udGFpbmVyOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFVJa2l0LCAnY29udGFpbmVyJyksXHJcblxyXG4gICAgICAgICAgICAkbmFtZToge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudE5hbWUodGhpcy4kb3B0aW9ucy5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBvbmVudEFQSSAoVUlraXQpIHtcclxuXHJcbiAgICAgICAgdmFyIERBVEEgPSBVSWtpdC5kYXRhO1xyXG5cclxuICAgICAgICB2YXIgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICAgICAgICBVSWtpdC5jb21wb25lbnQgPSBmdW5jdGlvbiAobmFtZSwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGlkID0gaHlwaGVuYXRlKG5hbWUpO1xyXG5cclxuICAgICAgICAgICAgbmFtZSA9IGNhbWVsaXplKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1BsYWluT2JqZWN0KGNvbXBvbmVudHNbbmFtZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50c1tuYW1lXSA9IFVJa2l0LmV4dGVuZChjb21wb25lbnRzW25hbWVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50c1tuYW1lXTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFVJa2l0W25hbWVdID0gZnVuY3Rpb24gKGVsZW1lbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCwgYXJnc0FycmF5ID0gQXJyYXkoaSk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIGFyZ3NBcnJheVtpXSA9IGFyZ3VtZW50c1tpXTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IFVJa2l0LmNvbXBvbmVudChuYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbFxyXG4gICAgICAgICAgICAgICAgICAgID8gbmV3IGNvbXBvbmVudCh7ZGF0YTogaXNQbGFpbk9iamVjdChlbGVtZW50KSA/IGVsZW1lbnQgOiBbXS5jb25jYXQoIGFyZ3NBcnJheSApfSlcclxuICAgICAgICAgICAgICAgICAgICA6ICFlbGVtZW50ID8gaW5pdChlbGVtZW50KSA6ICQkKGVsZW1lbnQpLm1hcChpbml0KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gVUlraXQuZ2V0Q29tcG9uZW50KGVsZW1lbnQsIG5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGNvbXBvbmVudCh7ZWw6IGVsZW1lbnQsIGRhdGE6IGRhdGF9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIG9wdCA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucykgPyBhc3NpZ24oe30sIG9wdGlvbnMpIDogb3B0aW9ucy5vcHRpb25zO1xyXG5cclxuICAgICAgICAgICAgb3B0Lm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdC5pbnN0YWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvcHQuaW5zdGFsbChVSWtpdCwgb3B0LCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFVJa2l0Ll9pbml0aWFsaXplZCAmJiAhb3B0LmZ1bmN0aW9uYWwpIHtcclxuICAgICAgICAgICAgICAgIGZhc3Rkb20ucmVhZChmdW5jdGlvbiAoKSB7IHJldHVybiBVSWtpdFtuYW1lXSgoXCJbdWstXCIgKyBpZCArIFwiXSxbZGF0YS11ay1cIiArIGlkICsgXCJdXCIpKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRzW25hbWVdID0gaXNQbGFpbk9iamVjdChvcHRpb25zKSA/IG9wdCA6IG9wdGlvbnM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgVUlraXQuZ2V0Q29tcG9uZW50cyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnRbREFUQV0gfHwge307IH07XHJcbiAgICAgICAgVUlraXQuZ2V0Q29tcG9uZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG5hbWUpIHsgcmV0dXJuIFVJa2l0LmdldENvbXBvbmVudHMoZWxlbWVudClbbmFtZV07IH07XHJcblxyXG4gICAgICAgIFVJa2l0LmNvbm5lY3QgPSBmdW5jdGlvbiAobm9kZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGVbREFUQV0pIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gbm9kZVtEQVRBXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVbREFUQV1bbmFtZV0uX2NhbGxDb25uZWN0ZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSQxID0gZ2V0Q29tcG9uZW50TmFtZShub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUkMSAmJiBuYW1lJDEgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIFVJa2l0W25hbWUkMV0obm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFVJa2l0LmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIG5vZGVbREFUQV0pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVbREFUQV1bbmFtZV0uX2NhbGxEaXNjb25uZWN0ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHZhciBnZXRDb21wb25lbnROYW1lID0gbWVtb2l6ZShmdW5jdGlvbiAoYXR0cmlidXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXJ0c1dpdGgoYXR0cmlidXRlLCAndWstJykgfHwgc3RhcnRzV2l0aChhdHRyaWJ1dGUsICdkYXRhLXVrLScpXHJcbiAgICAgICAgICAgID8gY2FtZWxpemUoYXR0cmlidXRlLnJlcGxhY2UoJ2RhdGEtdWstJywgJycpLnJlcGxhY2UoJ3VrLScsICcnKSlcclxuICAgICAgICAgICAgOiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBVSWtpdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcclxuICAgIH07XHJcblxyXG4gICAgVUlraXQudXRpbCA9IHV0aWw7XHJcbiAgICBVSWtpdC5kYXRhID0gJ19fdWlraXRfXyc7XHJcbiAgICBVSWtpdC5wcmVmaXggPSAndWstJztcclxuICAgIFVJa2l0Lm9wdGlvbnMgPSB7fTtcclxuICAgIFVJa2l0LnZlcnNpb24gPSAnMy43LjMnO1xyXG5cclxuICAgIGdsb2JhbEFQSShVSWtpdCk7XHJcbiAgICBob29rc0FQSShVSWtpdCk7XHJcbiAgICBzdGF0ZUFQSShVSWtpdCk7XHJcbiAgICBjb21wb25lbnRBUEkoVUlraXQpO1xyXG4gICAgaW5zdGFuY2VBUEkoVUlraXQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIENvcmUgKFVJa2l0KSB7XHJcblxyXG4gICAgICAgIGlmICghaW5Ccm93c2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRocm90dGxlICdyZXNpemUnXHJcbiAgICAgICAgdmFyIHBlbmRpbmdSZXNpemU7XHJcbiAgICAgICAgdmFyIGhhbmRsZVJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHBlbmRpbmdSZXNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwZW5kaW5nUmVzaXplID0gdHJ1ZTtcclxuICAgICAgICAgICAgZmFzdGRvbS53cml0ZShmdW5jdGlvbiAoKSB7IHJldHVybiBwZW5kaW5nUmVzaXplID0gZmFsc2U7IH0pO1xyXG4gICAgICAgICAgICBVSWtpdC51cGRhdGUobnVsbCwgJ3Jlc2l6ZScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9uKHdpbmRvdywgJ2xvYWQgcmVzaXplJywgaGFuZGxlUmVzaXplKTtcclxuICAgICAgICBvbihkb2N1bWVudCwgJ2xvYWRlZG1ldGFkYXRhIGxvYWQnLCBoYW5kbGVSZXNpemUsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAoJ1Jlc2l6ZU9ic2VydmVyJyBpbiB3aW5kb3cpIHtcclxuICAgICAgICAgICAgKG5ldyBSZXNpemVPYnNlcnZlcihoYW5kbGVSZXNpemUpKS5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0aHJvdHRsZSBgc2Nyb2xsYCBldmVudCAoU2FmYXJpIHRyaWdnZXJzIG11bHRpcGxlIGBzY3JvbGxgIGV2ZW50cyBwZXIgZnJhbWUpXHJcbiAgICAgICAgdmFyIHBlbmRpbmc7XHJcbiAgICAgICAgb24od2luZG93LCAnc2Nyb2xsJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGVuZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGZhc3Rkb20ud3JpdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gcGVuZGluZyA9IGZhbHNlOyB9KTtcclxuXHJcbiAgICAgICAgICAgIFVJa2l0LnVwZGF0ZShudWxsLCBlLnR5cGUpO1xyXG5cclxuICAgICAgICB9LCB7cGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogdHJ1ZX0pO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRlZCA9IDA7XHJcbiAgICAgICAgb24oZG9jdW1lbnQsICdhbmltYXRpb25zdGFydCcsIGZ1bmN0aW9uIChyZWYpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoKGNzcyh0YXJnZXQsICdhbmltYXRpb25OYW1lJykgfHwgJycpLm1hdGNoKC9edWstLioobGVmdHxyaWdodCkvKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHN0YXJ0ZWQrKztcclxuICAgICAgICAgICAgICAgIGNzcyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdvdmVyZmxvd1gnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tc3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnb3ZlcmZsb3dYJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHRvTXMoY3NzKHRhcmdldCwgJ2FuaW1hdGlvbkR1cmF0aW9uJykpICsgMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRydWUpO1xyXG5cclxuICAgICAgICBvbihkb2N1bWVudCwgcG9pbnRlckRvd24sIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzVG91Y2goZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSGFuZGxlIFN3aXBlIEdlc3R1cmVcclxuICAgICAgICAgICAgdmFyIHBvcyA9IGdldEV2ZW50UG9zKGUpO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJ3RhZ05hbWUnIGluIGUudGFyZ2V0ID8gZS50YXJnZXQgOiBwYXJlbnQoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICBvbmNlKGRvY3VtZW50LCAocG9pbnRlclVwICsgXCIgXCIgKyBwb2ludGVyQ2FuY2VsICsgXCIgc2Nyb2xsXCIpLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZWYgPSBnZXRFdmVudFBvcyhlKTtcclxuICAgICAgICAgICAgICAgIHZhciB4ID0gcmVmLng7XHJcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHJlZi55O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHN3aXBlXHJcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlICE9PSAnc2Nyb2xsJyAmJiB0YXJnZXQgJiYgeCAmJiBNYXRoLmFicyhwb3MueCAtIHgpID4gMTAwIHx8IHkgJiYgTWF0aC5hYnMocG9zLnkgLSB5KSA+IDEwMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0YXJnZXQsICdzd2lwZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRhcmdldCwgKFwic3dpcGVcIiArIChzd2lwZURpcmVjdGlvbihwb3MueCwgcG9zLnksIHgsIHkpKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzd2lwZURpcmVjdGlvbih4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyh4MSAtIHgyKSA+PSBNYXRoLmFicyh5MSAtIHkyKVxyXG4gICAgICAgICAgICA/IHgxIC0geDIgPiAwXHJcbiAgICAgICAgICAgICAgICA/ICdMZWZ0J1xyXG4gICAgICAgICAgICAgICAgOiAnUmlnaHQnXHJcbiAgICAgICAgICAgIDogeTEgLSB5MiA+IDBcclxuICAgICAgICAgICAgICAgID8gJ1VwJ1xyXG4gICAgICAgICAgICAgICAgOiAnRG93bic7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYm9vdCAoVUlraXQpIHtcclxuXHJcbiAgICAgICAgdmFyIGNvbm5lY3QgPSBVSWtpdC5jb25uZWN0O1xyXG4gICAgICAgIHZhciBkaXNjb25uZWN0ID0gVUlraXQuZGlzY29ubmVjdDtcclxuXHJcbiAgICAgICAgaWYgKCFpbkJyb3dzZXIgfHwgIXdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZhc3Rkb20ucmVhZChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgYXBwbHkkMShkb2N1bWVudC5ib2R5LCBjb25uZWN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKHJlY29yZHMpIHsgcmV0dXJuIHJlY29yZHMuZm9yRWFjaChhcHBseUNoaWxkTGlzdE11dGF0aW9uKTsgfVxyXG4gICAgICAgICAgICApLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAocmVjb3JkcykgeyByZXR1cm4gcmVjb3Jkcy5mb3JFYWNoKGFwcGx5QXR0cmlidXRlTXV0YXRpb24pOyB9XHJcbiAgICAgICAgICAgICkub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBVSWtpdC5faW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhcHBseUNoaWxkTGlzdE11dGF0aW9uKHJlZikge1xyXG4gICAgICAgICAgICB2YXIgYWRkZWROb2RlcyA9IHJlZi5hZGRlZE5vZGVzO1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlZE5vZGVzID0gcmVmLnJlbW92ZWROb2RlcztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRkZWROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYXBwbHkkMShhZGRlZE5vZGVzW2ldLCBjb25uZWN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgcmVtb3ZlZE5vZGVzLmxlbmd0aDsgaSQxKyspIHtcclxuICAgICAgICAgICAgICAgIGFwcGx5JDEocmVtb3ZlZE5vZGVzW2kkMV0sIGRpc2Nvbm5lY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhcHBseUF0dHJpYnV0ZU11dGF0aW9uKHJlZikge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcclxuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSByZWYuYXR0cmlidXRlTmFtZTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoYXR0cmlidXRlTmFtZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5hbWUgfHwgIShuYW1lIGluIFVJa2l0KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFzQXR0cih0YXJnZXQsIGF0dHJpYnV0ZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBVSWtpdFtuYW1lXSh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gVUlraXQuZ2V0Q29tcG9uZW50KHRhcmdldCwgbmFtZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHZhciBDbGFzcyA9IHtcclxuXHJcbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgIWhhc0NsYXNzKHRoaXMuJGVsLCB0aGlzLiRuYW1lKSAmJiBhZGRDbGFzcyh0aGlzLiRlbCwgdGhpcy4kbmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIFRvZ2dsYWJsZSA9IHtcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgY2xzOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBhbmltYXRpb246ICdsaXN0JyxcclxuICAgICAgICAgICAgZHVyYXRpb246IE51bWJlcixcclxuICAgICAgICAgICAgb3JpZ2luOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IFN0cmluZ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgY2xzOiBmYWxzZSxcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiBbZmFsc2VdLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICBvcmlnaW46IGZhbHNlLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnbGluZWFyJyxcclxuICAgICAgICAgICAgY2xzRW50ZXI6ICd1ay10b2dnbGFiZS1lbnRlcicsXHJcbiAgICAgICAgICAgIGNsc0xlYXZlOiAndWstdG9nZ2xhYmUtbGVhdmUnLFxyXG5cclxuICAgICAgICAgICAgaW5pdFByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJycsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogJycsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJycsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcnXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBoaWRlUHJvcHM6IHtcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IDAsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAwXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIGhhc0FuaW1hdGlvbjogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0aW9uID0gcmVmLmFuaW1hdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFhbmltYXRpb25bMF07XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBoYXNUcmFuc2l0aW9uOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb24gPSByZWYuYW5pbWF0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc0FuaW1hdGlvbiAmJiBhbmltYXRpb25bMF0gPT09IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgdG9nZ2xlRWxlbWVudDogZnVuY3Rpb24odGFyZ2V0cywgdG9nZ2xlLCBhbmltYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gUHJvbWlzZSQxLmFsbCh0b05vZGVzKHRhcmdldHMpLm1hcChmdW5jdGlvbiAoZWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaG93ID0gaXNCb29sZWFuKHRvZ2dsZSkgPyB0b2dnbGUgOiAhdGhpcyQxLmlzVG9nZ2xlZChlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRyaWdnZXIoZWwsIChcImJlZm9yZVwiICsgKHNob3cgPyAnc2hvdycgOiAnaGlkZScpKSwgW3RoaXMkMV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZSQxLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRnVuY3Rpb24oYW5pbWF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGFuaW1hdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFuaW1hdGUgPT09IGZhbHNlIHx8ICF0aGlzJDEuaGFzQW5pbWF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzJDEuX3RvZ2dsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcyQxLmhhc1RyYW5zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0b2dnbGVIZWlnaHQodGhpcyQxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRvZ2dsZUFuaW1hdGlvbih0aGlzJDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkoZWwsIHNob3cpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNscyA9IHNob3cgPyB0aGlzJDEuY2xzRW50ZXIgOiB0aGlzJDEuY2xzTGVhdmU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhlbCwgY2xzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIoZWwsIHNob3cgPyAnc2hvdycgOiAnaGlkZScsIFt0aGlzJDFdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb25lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZWwsIGNscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKGVsLCBzaG93ID8gJ3Nob3duJyA6ICdoaWRkZW4nLCBbdGhpcyQxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuJHVwZGF0ZShlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZSA/IHByb21pc2UudGhlbihkb25lLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhlbCwgY2xzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlJDEucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIDogZG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KSkudGhlbihyZXNvbHZlLCBub29wKTsgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGlzVG9nZ2xlZDogZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICggZWwgPT09IHZvaWQgMCApIGVsID0gdGhpcy4kZWw7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhc0NsYXNzKGVsLCB0aGlzLmNsc0VudGVyKVxyXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIDogaGFzQ2xhc3MoZWwsIHRoaXMuY2xzTGVhdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBoYXNDbGFzcyhlbCwgdGhpcy5jbHMuc3BsaXQoJyAnKVswXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogIWhhc0F0dHIoZWwsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIF90b2dnbGU6IGZ1bmN0aW9uKGVsLCB0b2dnbGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0b2dnbGVkID0gQm9vbGVhbih0b2dnbGVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlZDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNscykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSBpbmNsdWRlcyh0aGlzLmNscywgJyAnKSB8fCB0b2dnbGVkICE9PSBoYXNDbGFzcyhlbCwgdGhpcy5jbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgJiYgdG9nZ2xlQ2xhc3MoZWwsIHRoaXMuY2xzLCBpbmNsdWRlcyh0aGlzLmNscywgJyAnKSA/IHVuZGVmaW5lZCA6IHRvZ2dsZWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdG9nZ2xlZCA9PT0gZWwuaGlkZGVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgJiYgKGVsLmhpZGRlbiA9ICF0b2dnbGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkJCgnW2F1dG9mb2N1c10nLCBlbCkuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGlzVmlzaWJsZShlbCkgPyBlbC5mb2N1cygpIHx8IHRydWUgOiBlbC5ibHVyKCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihlbCwgJ3RvZ2dsZWQnLCBbdG9nZ2xlZCwgdGhpc10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHVwZGF0ZShlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlSGVpZ2h0KHJlZikge1xyXG4gICAgICAgIHZhciBpc1RvZ2dsZWQgPSByZWYuaXNUb2dnbGVkO1xyXG4gICAgICAgIHZhciBkdXJhdGlvbiA9IHJlZi5kdXJhdGlvbjtcclxuICAgICAgICB2YXIgaW5pdFByb3BzID0gcmVmLmluaXRQcm9wcztcclxuICAgICAgICB2YXIgaGlkZVByb3BzID0gcmVmLmhpZGVQcm9wcztcclxuICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IHJlZi50cmFuc2l0aW9uO1xyXG4gICAgICAgIHZhciBfdG9nZ2xlID0gcmVmLl90b2dnbGU7XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWwsIHNob3cpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpblByb2dyZXNzID0gVHJhbnNpdGlvbi5pblByb2dyZXNzKGVsKTtcclxuICAgICAgICAgICAgdmFyIGlubmVyID0gZWwuaGFzQ2hpbGROb2RlcyA/IHRvRmxvYXQoY3NzKGVsLmZpcnN0RWxlbWVudENoaWxkLCAnbWFyZ2luVG9wJykpICsgdG9GbG9hdChjc3MoZWwubGFzdEVsZW1lbnRDaGlsZCwgJ21hcmdpbkJvdHRvbScpKSA6IDA7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50SGVpZ2h0ID0gaXNWaXNpYmxlKGVsKSA/IGhlaWdodChlbCkgKyAoaW5Qcm9ncmVzcyA/IDAgOiBpbm5lcikgOiAwO1xyXG5cclxuICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwoZWwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc1RvZ2dsZWQoZWwpKSB7XHJcbiAgICAgICAgICAgICAgICBfdG9nZ2xlKGVsLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaGVpZ2h0KGVsLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgY2hpbGQgY29tcG9uZW50cyBmaXJzdFxyXG4gICAgICAgICAgICBmYXN0ZG9tLmZsdXNoKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW5kSGVpZ2h0ID0gaGVpZ2h0KGVsKSArIChpblByb2dyZXNzID8gMCA6IGlubmVyKTtcclxuICAgICAgICAgICAgaGVpZ2h0KGVsLCBjdXJyZW50SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoc2hvd1xyXG4gICAgICAgICAgICAgICAgPyBUcmFuc2l0aW9uLnN0YXJ0KGVsLCBhc3NpZ24oe30sIGluaXRQcm9wcywge292ZXJmbG93OiAnaGlkZGVuJywgaGVpZ2h0OiBlbmRIZWlnaHR9KSwgTWF0aC5yb3VuZChkdXJhdGlvbiAqICgxIC0gY3VycmVudEhlaWdodCAvIGVuZEhlaWdodCkpLCB0cmFuc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgOiBUcmFuc2l0aW9uLnN0YXJ0KGVsLCBoaWRlUHJvcHMsIE1hdGgucm91bmQoZHVyYXRpb24gKiAoY3VycmVudEhlaWdodCAvIGVuZEhlaWdodCkpLCB0cmFuc2l0aW9uKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90b2dnbGUoZWwsIGZhbHNlKTsgfSlcclxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNzcyhlbCwgaW5pdFByb3BzKTsgfSk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlQW5pbWF0aW9uKGNtcCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWwsIHNob3cpIHtcclxuXHJcbiAgICAgICAgICAgIEFuaW1hdGlvbi5jYW5jZWwoZWwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IGNtcC5hbmltYXRpb247XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IGNtcC5kdXJhdGlvbjtcclxuICAgICAgICAgICAgdmFyIF90b2dnbGUgPSBjbXAuX3RvZ2dsZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICBfdG9nZ2xlKGVsLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBbmltYXRpb24uaW4oZWwsIGFuaW1hdGlvblswXSwgZHVyYXRpb24sIGNtcC5vcmlnaW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gQW5pbWF0aW9uLm91dChlbCwgYW5pbWF0aW9uWzFdIHx8IGFuaW1hdGlvblswXSwgZHVyYXRpb24sIGNtcC5vcmlnaW4pLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RvZ2dsZShlbCwgZmFsc2UpOyB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBBY2NvcmRpb24gPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0NsYXNzLCBUb2dnbGFibGVdLFxyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICB0YXJnZXRzOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogbnVsbCxcclxuICAgICAgICAgICAgY29sbGFwc2libGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIG11bHRpcGxlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB0b2dnbGU6IFN0cmluZyxcclxuICAgICAgICAgICAgY29udGVudDogU3RyaW5nLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIG9mZnNldDogTnVtYmVyXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0YXJnZXRzOiAnPiAqJyxcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiBbdHJ1ZV0sXHJcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsc09wZW46ICd1ay1vcGVuJyxcclxuICAgICAgICAgICAgdG9nZ2xlOiAnPiAudWstYWNjb3JkaW9uLXRpdGxlJyxcclxuICAgICAgICAgICAgY29udGVudDogJz4gLnVrLWFjY29yZGlvbi1jb250ZW50JyxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2Vhc2UnLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IDBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgaXRlbXM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldHMgPSByZWYudGFyZ2V0cztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQkKHRhcmdldHMsICRlbCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbihpdGVtcywgcHJldikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGhpZGUoJCh0aGlzJDEuY29udGVudCwgZWwpLCAhaGFzQ2xhc3MoZWwsIHRoaXMkMS5jbHNPcGVuKSk7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldiB8fCBoYXNDbGFzcyhpdGVtcywgdGhpcy5jbHNPcGVuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5hY3RpdmUgIT09IGZhbHNlICYmIGl0ZW1zW051bWJlcih0aGlzLmFjdGl2ZSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICF0aGlzLmNvbGxhcHNpYmxlICYmIGl0ZW1zWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKGFjdGl2ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHRvZ2dsZXM6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZSA9IHJlZi50b2dnbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiAkKHRvZ2dsZSwgaXRlbSk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czogW1xyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMudGFyZ2V0cykgKyBcIiBcIiArICh0aGlzLiRwcm9wcy50b2dnbGUpKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZShpbmRleCh0aGlzLnRvZ2dsZXMsIGUuY3VycmVudCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uKGl0ZW0sIGFuaW1hdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSBbdGhpcy5pdGVtc1tnZXRJbmRleChpdGVtLCB0aGlzLml0ZW1zKV1dO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZUl0ZW1zID0gZmlsdGVyJDEodGhpcy5pdGVtcywgKFwiLlwiICsgKHRoaXMuY2xzT3BlbikpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgIWluY2x1ZGVzKGFjdGl2ZUl0ZW1zLCBpdGVtc1swXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcyA9IGl0ZW1zLmNvbmNhdChhY3RpdmVJdGVtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbGxhcHNpYmxlICYmIGFjdGl2ZUl0ZW1zLmxlbmd0aCA8IDIgJiYgIWZpbHRlciQxKGl0ZW1zLCAoXCI6bm90KC5cIiArICh0aGlzLmNsc09wZW4pICsgXCIpXCIpKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHRoaXMkMS50b2dnbGVFbGVtZW50KGVsLCAhaGFzQ2xhc3MoZWwsIHRoaXMkMS5jbHNPcGVuKSwgZnVuY3Rpb24gKGVsLCBzaG93KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGVsLCB0aGlzJDEuY2xzT3Blbiwgc2hvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cigkKHRoaXMkMS4kcHJvcHMudG9nZ2xlLCBlbCksICdhcmlhLWV4cGFuZGVkJywgc2hvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJCgoXCJcIiArIChlbC5fd3JhcHBlciA/ICc+ICogJyA6ICcnKSArICh0aGlzJDEuY29udGVudCkpLCBlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRlID09PSBmYWxzZSB8fCAhdGhpcyQxLmhhc1RyYW5zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZShjb250ZW50LCAhc2hvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZWwuX3dyYXBwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuX3dyYXBwZXIgPSB3cmFwQWxsKGNvbnRlbnQsIChcIjxkaXZcIiArIChzaG93ID8gJyBoaWRkZW4nIDogJycpICsgXCI+XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGUoY29udGVudCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2dnbGVIZWlnaHQodGhpcyQxKShlbC5fd3JhcHBlciwgc2hvdykudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGUoY29udGVudCwgIXNob3cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZWwuX3dyYXBwZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVud3JhcChjb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gJCh0aGlzJDEuJHByb3BzLnRvZ2dsZSwgZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0luVmlldyh0b2dnbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSW50b1ZpZXcodG9nZ2xlLCB7b2Zmc2V0OiB0aGlzJDEub2Zmc2V0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pOyB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlKGVsLCBoaWRlKSB7XHJcbiAgICAgICAgZWwgJiYgKGVsLmhpZGRlbiA9IGhpZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhbGVydCA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbQ2xhc3MsIFRvZ2dsYWJsZV0sXHJcblxyXG4gICAgICAgIGFyZ3M6ICdhbmltYXRpb24nLFxyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBjbG9zZTogU3RyaW5nXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBhbmltYXRpb246IFt0cnVlXSxcclxuICAgICAgICAgICAgc2VsQ2xvc2U6ICcudWstYWxlcnQtY2xvc2UnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTUwLFxyXG4gICAgICAgICAgICBoaWRlUHJvcHM6IGFzc2lnbih7b3BhY2l0eTogMH0sIFRvZ2dsYWJsZS5kYXRhLmhpZGVQcm9wcylcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBldmVudHM6IFtcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxDbG9zZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLiRlbCkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuJGRlc3Ryb3kodHJ1ZSk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBWaWRlbyA9IHtcclxuXHJcbiAgICAgICAgYXJnczogJ2F1dG9wbGF5JyxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgYXV0b211dGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBCb29sZWFuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBhdXRvbXV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIGluVmlldzogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXV0b3BsYXkgPSByZWYuYXV0b3BsYXk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF1dG9wbGF5ID09PSAnaW52aWV3JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5WaWV3ICYmICFoYXNBdHRyKHRoaXMuJGVsLCAncHJlbG9hZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5wcmVsb2FkID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvbXV0ZSkge1xyXG4gICAgICAgICAgICAgICAgbXV0ZSh0aGlzLiRlbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogaXNWaXNpYmxlKHRoaXMuJGVsKSAmJiBjc3ModGhpcy4kZWwsICd2aXNpYmlsaXR5JykgIT09ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGluVmlldzogdGhpcy5pblZpZXcgJiYgaXNJblZpZXcodGhpcy4kZWwpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpc2libGUgPSByZWYudmlzaWJsZTtcclxuICAgICAgICAgICAgICAgIHZhciBpblZpZXcgPSByZWYuaW5WaWV3O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpc2libGUgfHwgdGhpcy5pblZpZXcgJiYgIWluVmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdXNlKHRoaXMuJGVsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvcGxheSA9PT0gdHJ1ZSB8fCB0aGlzLmluVmlldyAmJiBpblZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5KHRoaXMuJGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJywgJ3Njcm9sbCddXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjb3ZlciA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbQ2xhc3MsIFZpZGVvXSxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgd2lkdGg6IE51bWJlcixcclxuICAgICAgICAgICAgaGVpZ2h0OiBOdW1iZXJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGF1dG9tdXRlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzLiRlbDtcclxuICAgICAgICAgICAgICAgIHZhciByZWYgPSBnZXRQb3NpdGlvbmVkUGFyZW50KGVsKSB8fCBwYXJlbnQoZWwpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSByZWYub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGltID0gRGltZW5zaW9ucy5jb3ZlcihcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoIHx8IGVsLm5hdHVyYWxXaWR0aCB8fCBlbC52aWRlb1dpZHRoIHx8IGVsLmNsaWVudFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0IHx8IGVsLm5hdHVyYWxIZWlnaHQgfHwgZWwudmlkZW9IZWlnaHQgfHwgZWwuY2xpZW50SGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCArICh3aWR0aCAlIDIgPyAxIDogMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICsgKGhlaWdodCAlIDIgPyAxIDogMClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGltLndpZHRoIHx8ICFkaW0uaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkaW07XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcmVmLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZi53aWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHtoZWlnaHQ6IGhlaWdodCwgd2lkdGg6IHdpZHRofSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UG9zaXRpb25lZFBhcmVudChlbCkge1xyXG4gICAgICAgIHdoaWxlICgoZWwgPSBwYXJlbnQoZWwpKSkge1xyXG4gICAgICAgICAgICBpZiAoY3NzKGVsLCAncG9zaXRpb24nKSAhPT0gJ3N0YXRpYycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgQ29udGFpbmVyID0ge1xyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBjb250YWluZXI6IEJvb2xlYW5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXI6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHJlZi5jb250YWluZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lciA9PT0gdHJ1ZSAmJiB0aGlzLiRjb250YWluZXIgfHwgY29udGFpbmVyICYmICQoY29udGFpbmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgUG9zaXRpb24gPSB7XHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHBvczogU3RyaW5nLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IG51bGwsXHJcbiAgICAgICAgICAgIGZsaXA6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGNsc1BvczogU3RyaW5nXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBwb3M6IChcImJvdHRvbS1cIiArICghaXNSdGwgPyAnbGVmdCcgOiAncmlnaHQnKSksXHJcbiAgICAgICAgICAgIGZsaXA6IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsc1BvczogJydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgcG9zOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSByZWYucG9zO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAocG9zICsgKCFpbmNsdWRlcyhwb3MsICctJykgPyAnLWNlbnRlcicgOiAnJykpLnNwbGl0KCctJyk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkaXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zWzBdO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYWxpZ246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zWzFdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIHBvc2l0aW9uQXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHRhcmdldCwgYm91bmRhcnkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzc2VzKGVsZW1lbnQsICgodGhpcy5jbHNQb3MpICsgXCItKHRvcHxib3R0b218bGVmdHxyaWdodCkoLVthLXpdKyk/XCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQkMSA9IHJlZi5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXhpcyA9IHRoaXMuZ2V0QXhpcygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXNOdW1lcmljKG9mZnNldCQxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gJChvZmZzZXQkMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0JDEgPSBub2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gb2Zmc2V0KG5vZGUpW2F4aXMgPT09ICd4JyA/ICdsZWZ0JyA6ICd0b3AnXSAtIG9mZnNldCh0YXJnZXQpW2F4aXMgPT09ICd4JyA/ICdyaWdodCcgOiAnYm90dG9tJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZWYkMSA9IHBvc2l0aW9uQXQoXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpcyA9PT0gJ3gnID8gKChmbGlwUG9zaXRpb24odGhpcy5kaXIpKSArIFwiIFwiICsgKHRoaXMuYWxpZ24pKSA6ICgodGhpcy5hbGlnbikgKyBcIiBcIiArIChmbGlwUG9zaXRpb24odGhpcy5kaXIpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgYXhpcyA9PT0gJ3gnID8gKCh0aGlzLmRpcikgKyBcIiBcIiArICh0aGlzLmFsaWduKSkgOiAoKHRoaXMuYWxpZ24pICsgXCIgXCIgKyAodGhpcy5kaXIpKSxcclxuICAgICAgICAgICAgICAgICAgICBheGlzID09PSAneCcgPyAoXCJcIiArICh0aGlzLmRpciA9PT0gJ2xlZnQnID8gLW9mZnNldCQxIDogb2Zmc2V0JDEpKSA6IChcIiBcIiArICh0aGlzLmRpciA9PT0gJ3RvcCcgPyAtb2Zmc2V0JDEgOiBvZmZzZXQkMSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kYXJ5XHJcbiAgICAgICAgICAgICAgICApLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIHZhciB4ID0gcmVmJDEueDtcclxuICAgICAgICAgICAgICAgIHZhciB5ID0gcmVmJDEueTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGF4aXMgPT09ICd4JyA/IHggOiB5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbiA9IGF4aXMgPT09ICd4JyA/IHkgOiB4O1xyXG5cclxuICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGVsZW1lbnQsICgodGhpcy5jbHNQb3MpICsgXCItXCIgKyAodGhpcy5kaXIpICsgXCItXCIgKyAodGhpcy5hbGlnbikpLCB0aGlzLm9mZnNldCA9PT0gZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldEF4aXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlyID09PSAndG9wJyB8fCB0aGlzLmRpciA9PT0gJ2JvdHRvbScgPyAneScgOiAneCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIGFjdGl2ZSQxO1xyXG5cclxuICAgIHZhciBkcm9wID0ge1xyXG5cclxuICAgICAgICBtaXhpbnM6IFtDb250YWluZXIsIFBvc2l0aW9uLCBUb2dnbGFibGVdLFxyXG5cclxuICAgICAgICBhcmdzOiAncG9zJyxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgbW9kZTogJ2xpc3QnLFxyXG4gICAgICAgICAgICB0b2dnbGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGJvdW5kYXJ5OiBCb29sZWFuLFxyXG4gICAgICAgICAgICBib3VuZGFyeUFsaWduOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBkZWxheVNob3c6IE51bWJlcixcclxuICAgICAgICAgICAgZGVsYXlIaWRlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIGNsc0Ryb3A6IFN0cmluZ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbW9kZTogWydjbGljaycsICdob3ZlciddLFxyXG4gICAgICAgICAgICB0b2dnbGU6ICctIConLFxyXG4gICAgICAgICAgICBib3VuZGFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgYm91bmRhcnlBbGlnbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGRlbGF5U2hvdzogMCxcclxuICAgICAgICAgICAgZGVsYXlIaWRlOiA4MDAsXHJcbiAgICAgICAgICAgIGNsc0Ryb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICBhbmltYXRpb246IFsndWstYW5pbWF0aW9uLWZhZGUnXSxcclxuICAgICAgICAgICAgY2xzOiAndWstb3BlbicsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgYm91bmRhcnk6IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYm91bmRhcnkgPSByZWYuYm91bmRhcnk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvdW5kYXJ5ID09PSB0cnVlID8gd2luZG93IDogcXVlcnkoYm91bmRhcnksICRlbCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjbHNEcm9wOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbHNEcm9wID0gcmVmLmNsc0Ryb3A7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsc0Ryb3AgfHwgKFwidWstXCIgKyAodGhpcy4kb3B0aW9ucy5uYW1lKSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjbHNQb3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xzRHJvcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy50cmFja2VyID0gbmV3IE1vdXNlVHJhY2tlcigpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgdGhpcy5jbHNEcm9wKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZSAmJiAhdGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy4kY3JlYXRlKCd0b2dnbGUnLCBxdWVyeSh0aGlzLnRvZ2dsZSwgdGhpcy4kZWwpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLiRlbCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlOiB0aGlzLm1vZGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZSQxID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czogW1xyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXCIuXCIgKyAodGhpcy5jbHNEcm9wKSArIFwiLWNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYVtocmVmXj1cIiNcIl0nO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFByZXZlbnRlZCA9IHJlZi5kZWZhdWx0UHJldmVudGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoYXNoID0gcmVmLmN1cnJlbnQuaGFzaDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkICYmIGhhc2ggJiYgIXdpdGhpbihoYXNoLCB0aGlzLiRlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVzY3JvbGwnLFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICd0b2dnbGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSwgdG9nZ2xlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3codG9nZ2xlLiRlbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RvZ2dsZXNob3cnLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSwgdG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyh0b2dnbGUuJGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RvZ2dsZWhpZGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogKHBvaW50ZXJFbnRlciArIFwiIGZvY3VzaW5cIiksXHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZXModGhpcy5tb2RlLCAnaG92ZXInKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUb3VjaChlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAocG9pbnRlckxlYXZlICsgXCIgZm9jdXNvdXRcIiksXHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZXModGhpcy5tb2RlLCAnaG92ZXInKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUb3VjaChlKSAmJiBlLnJlbGF0ZWRUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndG9nZ2xlZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihlLCB0b2dnbGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdG9nZ2xlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hvdycsXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja2VyLmluaXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25jZSh0aGlzLiRlbCwgJ2hpZGUnLCBvbihkb2N1bWVudCwgcG9pbnRlckRvd24sIGZ1bmN0aW9uIChyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhd2l0aGluKHRhcmdldCwgdGhpcyQxLiRlbCkgJiYgb25jZShkb2N1bWVudCwgKHBvaW50ZXJVcCArIFwiIFwiICsgcG9pbnRlckNhbmNlbCArIFwiIHNjcm9sbFwiKSwgZnVuY3Rpb24gKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRQcmV2ZW50ZWQgPSByZWYuZGVmYXVsdFByZXZlbnRlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VGFyZ2V0ID0gcmVmLnRhcmdldDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQgJiYgdHlwZSA9PT0gcG9pbnRlclVwICYmIHRhcmdldCA9PT0gbmV3VGFyZ2V0ICYmICEodGhpcyQxLnRhcmdldCAmJiB3aXRoaW4odGFyZ2V0LCB0aGlzJDEudGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuaGlkZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApLCB7c2VsZjogdHJ1ZX0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbmNlKHRoaXMuJGVsLCAnaGlkZScsIG9uKGRvY3VtZW50LCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuaGlkZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSwge3NlbGY6IHRydWV9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVoaWRlJyxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuJGVsICE9PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlJDEgPSBhY3RpdmUkMSA9PT0gbnVsbCAmJiB3aXRoaW4odGFyZ2V0LCB0aGlzLiRlbCkgJiYgdGhpcy5pc1RvZ2dsZWQoKSA/IHRoaXMgOiBhY3RpdmUkMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlJDEgPSB0aGlzLmlzQWN0aXZlKCkgPyBudWxsIDogYWN0aXZlJDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja2VyLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICB1cGRhdGU6IHtcclxuXHJcbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQoKSAmJiAhaGFzQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRW50ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGV2ZW50czogWydyZXNpemUnXVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbih0YXJnZXQsIGRlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0ID09PSB2b2lkIDAgKSB0YXJnZXQgPSB0aGlzLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIGlmICggZGVsYXkgPT09IHZvaWQgMCApIGRlbGF5ID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkgJiYgdGFyZ2V0ICYmIHRoaXMudGFyZ2V0ICYmIHRhcmdldCAhPT0gdGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmUkMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsYXkgJiYgYWN0aXZlJDEuaXNEZWxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lciA9IHNldFRpbWVvdXQodGhpcy5zaG93LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChhY3RpdmUkMSAmJiBwcmV2ICE9PSBhY3RpdmUkMSAmJiAhd2l0aGluKHRoaXMuJGVsLCBhY3RpdmUkMS4kZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXYgPSBhY3RpdmUkMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlJDEuaGlkZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgcGFyZW50KHRoaXMuJGVsKSAhPT0gdGhpcy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBlbmQodGhpcy5jb250YWluZXIsIHRoaXMuJGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnRvZ2dsZUVsZW1lbnQodGhpcyQxLiRlbCwgdHJ1ZSk7IH0sIGRlbGF5ICYmIHRoaXMuZGVsYXlTaG93IHx8IDApO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGhpZGU6IGZ1bmN0aW9uKGRlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICggZGVsYXkgPT09IHZvaWQgMCApIGRlbGF5ID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGhpZGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEudG9nZ2xlRWxlbWVudCh0aGlzJDEuJGVsLCBmYWxzZSwgZmFsc2UpOyB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRGVsYXlpbmcgPSBnZXRQb3NpdGlvbmVkRWxlbWVudHModGhpcy4kZWwpLnNvbWUoZnVuY3Rpb24gKGVsKSB7IHJldHVybiB0aGlzJDEudHJhY2tlci5tb3Zlc1RvKGVsKTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRlbGF5ICYmIHRoaXMuaXNEZWxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVRpbWVyID0gc2V0VGltZW91dCh0aGlzLmhpZGUsIDUwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsYXkgJiYgdGhpcy5kZWxheUhpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVUaW1lciA9IHNldFRpbWVvdXQoaGlkZSwgdGhpcy5kZWxheUhpZGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBoaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjbGVhclRpbWVyczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZXIpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpbWVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVRpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNEZWxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaXNBY3RpdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZSQxID09PSB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcG9zaXRpb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCAoKHRoaXMuY2xzRHJvcCkgKyBcIi1zdGFja1wiKSk7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLiRlbCwgKCh0aGlzLmNsc0Ryb3ApICsgXCItYm91bmRhcnlcIiksIHRoaXMuYm91bmRhcnlBbGlnbik7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kYXJ5ID0gb2Zmc2V0KHRoaXMuYm91bmRhcnkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsaWduVG8gPSB0aGlzLmJvdW5kYXJ5QWxpZ24gPyBib3VuZGFyeSA6IG9mZnNldCh0aGlzLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ24gPT09ICdqdXN0aWZ5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wID0gdGhpcy5nZXRBeGlzKCkgPT09ICd5JyA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcclxuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHByb3AsIGFsaWduVG9bcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJvdW5kYXJ5ICYmIHRoaXMuJGVsLm9mZnNldFdpZHRoID4gTWF0aC5tYXgoYm91bmRhcnkucmlnaHQgLSBhbGlnblRvLmxlZnQsIGFsaWduVG8ucmlnaHQgLSBib3VuZGFyeS5sZWZ0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCAoKHRoaXMuY2xzRHJvcCkgKyBcIi1zdGFja1wiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkF0KHRoaXMuJGVsLCB0aGlzLmJvdW5kYXJ5QWxpZ24gPyB0aGlzLmJvdW5kYXJ5IDogdGhpcy50YXJnZXQsIHRoaXMuYm91bmRhcnkpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQb3NpdGlvbmVkRWxlbWVudHMoZWwpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgYXBwbHkkMShlbCwgZnVuY3Rpb24gKGVsKSB7IHJldHVybiBjc3MoZWwsICdwb3NpdGlvbicpICE9PSAnc3RhdGljJyAmJiByZXN1bHQucHVzaChlbCk7IH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZvcm1DdXN0b20gPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcclxuXHJcbiAgICAgICAgYXJnczogJ3RhcmdldCcsXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHRhcmdldDogQm9vbGVhblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oXywgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChzZWxJbnB1dCwgJGVsKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHRhcmdldDogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQgJiYgKHRhcmdldCA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHBhcmVudCh0aGlzLmlucHV0KSA9PT0gJGVsXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5pbnB1dC5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICAgICAgICAgICAgICB8fCBxdWVyeSh0YXJnZXQsICRlbCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVmID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IHJlZi5pbnB1dDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBvcHRpb247XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gaXNJbnB1dCh0YXJnZXQpID8gJ3ZhbHVlJyA6ICd0ZXh0Q29udGVudCc7XHJcbiAgICAgICAgICAgIHZhciBwcmV2ID0gdGFyZ2V0W3Byb3BdO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBpbnB1dC5maWxlcyAmJiBpbnB1dC5maWxlc1swXVxyXG4gICAgICAgICAgICAgICAgPyBpbnB1dC5maWxlc1swXS5uYW1lXHJcbiAgICAgICAgICAgICAgICA6IG1hdGNoZXMoaW5wdXQsICdzZWxlY3QnKSAmJiAob3B0aW9uID0gJCQoJ29wdGlvbicsIGlucHV0KS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5zZWxlY3RlZDsgfSlbMF0pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcclxuICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbi50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIDogaW5wdXQudmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAocHJldiAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czogW1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NoYW5nZScsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAncmVzZXQnLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xvc2VzdCh0aGlzLiRlbCwgJ2Zvcm0nKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gRGVwcmVjYXRlZFxyXG4gICAgdmFyIGdpZiA9IHtcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGludmlldyA9IGlzSW5WaWV3KHRoaXMuJGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWludmlldyB8fCBkYXRhLmlzSW5WaWV3ID09PSBpbnZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS5pc0luVmlldyA9IGludmlldztcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVsLnNyYyA9ICcnICsgdGhpcy4kZWwuc3JjOyAvLyBmb3JjZSBzZWxmLWFzc2lnblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Njcm9sbCcsICdyZXNpemUnXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBNYXJnaW4gPSB7XHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIG1hcmdpbjogU3RyaW5nLFxyXG4gICAgICAgICAgICBmaXJzdENvbHVtbjogQm9vbGVhblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbWFyZ2luOiAndWstbWFyZ2luLXNtYWxsLXRvcCcsXHJcbiAgICAgICAgICAgIGZpcnN0Q29sdW1uOiAndWstZmlyc3QtY29sdW1uJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZToge1xyXG5cclxuICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJvd3MgPSBnZXRSb3dzKHRoaXMuJGVsLmNoaWxkcmVuKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZ2V0Q29sdW1ucyhyb3dzKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2x1bW5zID0gcmVmLmNvbHVtbnM7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93cyA9IHJlZi5yb3dzO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcm93c1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhyb3dzW2ldW2pdLCB0aGlzLm1hcmdpbiwgaSAhPT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHJvd3NbaV1bal0sIHRoaXMuZmlyc3RDb2x1bW4sICEhfmNvbHVtbnNbMF0uaW5kZXhPZihyb3dzW2ldW2pdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Jlc2l6ZSddXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFJvd3MoaXRlbXMpIHtcclxuICAgICAgICByZXR1cm4gc29ydEJ5KGl0ZW1zLCAndG9wJywgJ2JvdHRvbScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENvbHVtbnMocm93cykge1xyXG5cclxuICAgICAgICB2YXIgY29sdW1ucyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHNvcnRlZCA9IHNvcnRCeShyb3dzW2ldLCAnbGVmdCcsICdyaWdodCcpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNvcnRlZC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uc1tqXSA9ICFjb2x1bW5zW2pdID8gc29ydGVkW2pdIDogY29sdW1uc1tqXS5jb25jYXQoc29ydGVkW2pdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlzUnRsXHJcbiAgICAgICAgICAgID8gY29sdW1ucy5yZXZlcnNlKClcclxuICAgICAgICAgICAgOiBjb2x1bW5zO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNvcnRCeShpdGVtcywgc3RhcnRQcm9wLCBlbmRQcm9wKSB7XHJcblxyXG4gICAgICAgIHZhciBzb3J0ZWQgPSBbW11dO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZWwgPSBpdGVtc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKGVsKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBkaW0gPSBnZXRPZmZzZXQoZWwpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IHNvcnRlZC5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gc29ydGVkW2pdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudFswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQucHVzaChlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0RGltID0gKHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFswXS5vZmZzZXRQYXJlbnQgPT09IGVsLm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGltID0gZ2V0T2Zmc2V0KGN1cnJlbnRbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkaW0gPSBnZXRPZmZzZXQoZWwsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGltID0gZ2V0T2Zmc2V0KGN1cnJlbnRbMF0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaW1bc3RhcnRQcm9wXSA+PSBzdGFydERpbVtlbmRQcm9wXSAtIDEgJiYgZGltW3N0YXJ0UHJvcF0gIT09IHN0YXJ0RGltW3N0YXJ0UHJvcF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChbZWxdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGltW2VuZFByb3BdIC0gMSA+IHN0YXJ0RGltW3N0YXJ0UHJvcF0gfHwgZGltW3N0YXJ0UHJvcF0gPT09IHN0YXJ0RGltW3N0YXJ0UHJvcF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChqID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkLnVuc2hpZnQoW2VsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRPZmZzZXQoZWxlbWVudCwgb2Zmc2V0KSB7XHJcbiAgICAgICAgdmFyIGFzc2lnbjtcclxuXHJcbiAgICAgICAgaWYgKCBvZmZzZXQgPT09IHZvaWQgMCApIG9mZnNldCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgb2Zmc2V0VG9wID0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgdmFyIG9mZnNldExlZnQgPSBlbGVtZW50Lm9mZnNldExlZnQ7XHJcbiAgICAgICAgdmFyIG9mZnNldEhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIHZhciBvZmZzZXRXaWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChvZmZzZXQpIHtcclxuICAgICAgICAgICAgKGFzc2lnbiA9IG9mZnNldFBvc2l0aW9uKGVsZW1lbnQpLCBvZmZzZXRUb3AgPSBhc3NpZ25bMF0sIG9mZnNldExlZnQgPSBhc3NpZ25bMV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiBvZmZzZXRUb3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IG9mZnNldExlZnQsXHJcbiAgICAgICAgICAgIGJvdHRvbTogb2Zmc2V0VG9wICsgb2Zmc2V0SGVpZ2h0LFxyXG4gICAgICAgICAgICByaWdodDogb2Zmc2V0TGVmdCArIG9mZnNldFdpZHRoXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZ3JpZCA9IHtcclxuXHJcbiAgICAgICAgZXh0ZW5kczogTWFyZ2luLFxyXG5cclxuICAgICAgICBtaXhpbnM6IFtDbGFzc10sXHJcblxyXG4gICAgICAgIG5hbWU6ICdncmlkJyxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgbWFzb25yeTogQm9vbGVhbixcclxuICAgICAgICAgICAgcGFyYWxsYXg6IE51bWJlclxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbWFyZ2luOiAndWstZ3JpZC1tYXJnaW4nLFxyXG4gICAgICAgICAgICBjbHNTdGFjazogJ3VrLWdyaWQtc3RhY2snLFxyXG4gICAgICAgICAgICBtYXNvbnJ5OiBmYWxzZSxcclxuICAgICAgICAgICAgcGFyYWxsYXg6IDBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hc29ucnkgJiYgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1mbGV4LXRvcCB1ay1mbGV4LXdyYXAtdG9wJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2x1bW5zID0gcmVmLmNvbHVtbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc1N0YWNrLCBjb2x1bW5zLmxlbmd0aCA8IDIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sdW1ucyA9IGRhdGEuY29sdW1ucztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IGRhdGEucm93cztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmlsdGVyIGNvbXBvbmVudCBtYWtlcyBlbGVtZW50cyBwb3NpdGlvbmVkIGFic29sdXRlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb2x1bW5zLmxlbmd0aCB8fCAhdGhpcy5tYXNvbnJ5ICYmICF0aGlzLnBhcmFsbGF4IHx8IHBvc2l0aW9uZWRBYnNvbHV0ZSh0aGlzLiRlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS50cmFuc2xhdGVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGVzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlcyA9IGNoaWxkcmVuKHRoaXMuJGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sdW1uSGVpZ2h0cyA9IGdldENvbHVtbkhlaWdodHMoY29sdW1ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcmdpbiA9IGdldE1hcmdpblRvcChub2RlcywgdGhpcy5tYXJnaW4pICogKHJvd3MubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsSGVpZ2h0ID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgY29sdW1uSGVpZ2h0cykgKyBtYXJnaW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc29ucnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucyA9IGNvbHVtbnMubWFwKGZ1bmN0aW9uIChjb2x1bW4pIHsgcmV0dXJuIHNvcnRCeSQxKGNvbHVtbiwgJ29mZnNldFRvcCcpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlcyA9IGdldFRyYW5zbGF0ZXMocm93cywgY29sdW1ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFkZGluZyA9IE1hdGguYWJzKHRoaXMucGFyYWxsYXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWRkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmcgPSBjb2x1bW5IZWlnaHRzLnJlZHVjZShmdW5jdGlvbiAobmV3UGFkZGluZywgaGd0LCBpKSB7IHJldHVybiBNYXRoLm1heChuZXdQYWRkaW5nLCBoZ3QgKyBtYXJnaW4gKyAoaSAlIDIgPyBwYWRkaW5nIDogcGFkZGluZyAvIDgpIC0gZWxIZWlnaHQpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtwYWRkaW5nOiBwYWRkaW5nLCBjb2x1bW5zOiBjb2x1bW5zLCB0cmFuc2xhdGVzOiB0cmFuc2xhdGVzLCBoZWlnaHQ6IHRyYW5zbGF0ZXMgPyBlbEhlaWdodCA6ICcnfTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcmVmLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFkZGluZyA9IHJlZi5wYWRkaW5nO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAncGFkZGluZ0JvdHRvbScsIHBhZGRpbmcgfHwgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCAhPT0gZmFsc2UgJiYgY3NzKHRoaXMuJGVsLCAnaGVpZ2h0JywgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGV2ZW50czogWydyZXNpemUnXVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0JDEgPSByZWYuaGVpZ2h0O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uZWRBYnNvbHV0ZSh0aGlzLiRlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsZWQ6IHRoaXMucGFyYWxsYXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gc2Nyb2xsZWRPdmVyKHRoaXMuJGVsLCBoZWlnaHQkMSA/IGhlaWdodCQxIC0gaGVpZ2h0KHRoaXMuJGVsKSA6IDApICogTWF0aC5hYnModGhpcy5wYXJhbGxheClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbHVtbnMgPSByZWYuY29sdW1ucztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsZWQgPSByZWYuc2Nyb2xsZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZXMgPSByZWYudHJhbnNsYXRlcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxlZCA9PT0gZmFsc2UgJiYgIXRyYW5zbGF0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb2x1bW4sIGkpIHsgcmV0dXJuIGNvbHVtbi5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaikgeyByZXR1cm4gY3NzKGVsLCAndHJhbnNmb3JtJywgIXNjcm9sbGVkICYmICF0cmFuc2xhdGVzID8gJycgOiAoXCJ0cmFuc2xhdGVZKFwiICsgKCh0cmFuc2xhdGVzICYmIC10cmFuc2xhdGVzW2ldW2pdKSArIChzY3JvbGxlZCA/IGkgJSAyID8gc2Nyb2xsZWQgOiBzY3JvbGxlZCAvIDggOiAwKSkgKyBcInB4KVwiKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJywgJ3Jlc2l6ZSddXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2l0aW9uZWRBYnNvbHV0ZShlbCkge1xyXG4gICAgICAgIHJldHVybiBjaGlsZHJlbihlbCkuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGNzcyhlbCwgJ3Bvc2l0aW9uJykgPT09ICdhYnNvbHV0ZSc7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRyYW5zbGF0ZXMocm93cywgY29sdW1ucykge1xyXG5cclxuICAgICAgICB2YXIgcm93SGVpZ2h0cyA9IHJvd3MubWFwKGZ1bmN0aW9uIChyb3cpIHsgcmV0dXJuIE1hdGgubWF4LmFwcGx5KE1hdGgsIHJvdy5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5vZmZzZXRIZWlnaHQ7IH0pKTsgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb2x1bW5zLm1hcChmdW5jdGlvbiAoZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgdmFyIHByZXYgPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudHMubWFwKGZ1bmN0aW9uIChlbGVtZW50LCByb3cpIHsgcmV0dXJuIHByZXYgKz0gcm93XHJcbiAgICAgICAgICAgICAgICAgICAgPyByb3dIZWlnaHRzW3JvdyAtIDFdIC0gZWxlbWVudHNbcm93IC0gMV0ub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgOiAwOyB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TWFyZ2luVG9wKG5vZGVzLCBjbHMpIHtcclxuXHJcbiAgICAgICAgdmFyIHJlZiA9IG5vZGVzLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGhhc0NsYXNzKGVsLCBjbHMpOyB9KTtcclxuICAgICAgICB2YXIgbm9kZSA9IHJlZlswXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRvRmxvYXQobm9kZVxyXG4gICAgICAgICAgICA/IGNzcyhub2RlLCAnbWFyZ2luVG9wJylcclxuICAgICAgICAgICAgOiBjc3Mobm9kZXNbMF0sICdwYWRkaW5nTGVmdCcpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRDb2x1bW5IZWlnaHRzKGNvbHVtbnMpIHtcclxuICAgICAgICByZXR1cm4gY29sdW1ucy5tYXAoZnVuY3Rpb24gKGNvbHVtbikgeyByZXR1cm4gY29sdW1uLnJlZHVjZShmdW5jdGlvbiAoc3VtLCBlbCkgeyByZXR1cm4gc3VtICsgZWwub2Zmc2V0SGVpZ2h0OyB9LCAwKTsgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSUUgMTEgZml4IChtaW4taGVpZ2h0IG9uIGEgZmxleCBjb250YWluZXIgd29uJ3QgYXBwbHkgdG8gaXRzIGZsZXggaXRlbXMpXHJcbiAgICB2YXIgRmxleEJ1ZyA9IGlzSUUgPyB7XHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHNlbE1pbkhlaWdodDogU3RyaW5nXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBzZWxNaW5IZWlnaHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBmb3JjZUhlaWdodDogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudHM6IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsTWluSGVpZ2h0ID0gcmVmLnNlbE1pbkhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsTWluSGVpZ2h0ID8gJCQoc2VsTWluSGVpZ2h0LCAkZWwpIDogWyRlbF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuZWxlbWVudHMsICdoZWlnaHQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9yZGVyOiAtNSxcclxuXHJcbiAgICAgICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSB0b0Zsb2F0KGNzcyhlbCwgJ21pbkhlaWdodCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlaWdodCAmJiAodGhpcyQxLmZvcmNlSGVpZ2h0IHx8IE1hdGgucm91bmQoaGVpZ2h0ICsgYm94TW9kZWxBZGp1c3QoZWwsICdoZWlnaHQnLCAnY29udGVudC1ib3gnKSkgPj0gZWwub2Zmc2V0SGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzKGVsLCAnaGVpZ2h0JywgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvcmRlcjogNSxcclxuXHJcbiAgICAgICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXVxyXG5cclxuICAgIH0gOiB7fTtcclxuXHJcbiAgICB2YXIgaGVpZ2h0TWF0Y2ggPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0ZsZXhCdWddLFxyXG5cclxuICAgICAgICBhcmdzOiAndGFyZ2V0JyxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHJvdzogQm9vbGVhblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiAnPiAqJyxcclxuICAgICAgICAgICAgcm93OiB0cnVlLFxyXG4gICAgICAgICAgICBmb3JjZUhlaWdodDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50czogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkJCh0YXJnZXQsICRlbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogKHRoaXMucm93ID8gZ2V0Um93cyh0aGlzLmVsZW1lbnRzKSA6IFt0aGlzLmVsZW1lbnRzXSkubWFwKG1hdGNoJDEpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvd3MgPSByZWYucm93cztcclxuXHJcbiAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0cyA9IHJlZi5oZWlnaHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSByZWYuZWxlbWVudHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHsgcmV0dXJuIGNzcyhlbCwgJ21pbkhlaWdodCcsIGhlaWdodHNbaV0pOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gbWF0Y2gkMShlbGVtZW50cykge1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICByZXR1cm4ge2hlaWdodHM6IFsnJ10sIGVsZW1lbnRzOiBlbGVtZW50c307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaGVpZ2h0cyA9IGVsZW1lbnRzLm1hcChnZXRIZWlnaHQpO1xyXG4gICAgICAgIHZhciBtYXggPSBNYXRoLm1heC5hcHBseShNYXRoLCBoZWlnaHRzKTtcclxuICAgICAgICB2YXIgaGFzTWluSGVpZ2h0ID0gZWxlbWVudHMuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLnN0eWxlLm1pbkhlaWdodDsgfSk7XHJcbiAgICAgICAgdmFyIGhhc1NocnVuayA9IGVsZW1lbnRzLnNvbWUoZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiAhZWwuc3R5bGUubWluSGVpZ2h0ICYmIGhlaWdodHNbaV0gPCBtYXg7IH0pO1xyXG5cclxuICAgICAgICBpZiAoaGFzTWluSGVpZ2h0ICYmIGhhc1NocnVuaykge1xyXG4gICAgICAgICAgICBjc3MoZWxlbWVudHMsICdtaW5IZWlnaHQnLCAnJyk7XHJcbiAgICAgICAgICAgIGhlaWdodHMgPSBlbGVtZW50cy5tYXAoZ2V0SGVpZ2h0KTtcclxuICAgICAgICAgICAgbWF4ID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgaGVpZ2h0cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoZWlnaHRzID0gZWxlbWVudHMubWFwKGZ1bmN0aW9uIChlbCwgaSkgeyByZXR1cm4gaGVpZ2h0c1tpXSA9PT0gbWF4ICYmIHRvRmxvYXQoZWwuc3R5bGUubWluSGVpZ2h0KS50b0ZpeGVkKDIpICE9PSBtYXgudG9GaXhlZCgyKSA/ICcnIDogbWF4OyB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtoZWlnaHRzOiBoZWlnaHRzLCBlbGVtZW50czogZWxlbWVudHN9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEhlaWdodChlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBzdHlsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghaXNWaXNpYmxlKGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHN0eWxlID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xyXG4gICAgICAgICAgICBjc3MoZWxlbWVudCwgJ2Rpc3BsYXknLCAnYmxvY2snLCAnaW1wb3J0YW50Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaGVpZ2h0ID0gZGltZW5zaW9ucyhlbGVtZW50KS5oZWlnaHQgLSBib3hNb2RlbEFkanVzdChlbGVtZW50LCAnaGVpZ2h0JywgJ2NvbnRlbnQtYm94Jyk7XHJcblxyXG4gICAgICAgIGlmIChzdHlsZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY3NzKGVsZW1lbnQsICdkaXNwbGF5Jywgc3R5bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaGVpZ2h0Vmlld3BvcnQgPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0ZsZXhCdWddLFxyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBleHBhbmQ6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIG9mZnNldFRvcDogQm9vbGVhbixcclxuICAgICAgICAgICAgb2Zmc2V0Qm90dG9tOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IE51bWJlclxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgZXhwYW5kOiBmYWxzZSxcclxuICAgICAgICAgICAgb2Zmc2V0VG9wOiBmYWxzZSxcclxuICAgICAgICAgICAgb2Zmc2V0Qm90dG9tOiBmYWxzZSxcclxuICAgICAgICAgICAgbWluSGVpZ2h0OiAwXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gcmVmLm1pbkhlaWdodDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1Zpc2libGUodGhpcy4kZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtaW5IZWlnaHQgPSAnJztcclxuICAgICAgICAgICAgICAgIHZhciBib3ggPSBib3hNb2RlbEFkanVzdCh0aGlzLiRlbCwgJ2hlaWdodCcsICdjb250ZW50LWJveCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4cGFuZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQgPSBoZWlnaHQod2luZG93KSAtIChkaW1lbnNpb25zKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuaGVpZ2h0IC0gZGltZW5zaW9ucyh0aGlzLiRlbCkuaGVpZ2h0KSAtIGJveCB8fCAnJztcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBvbiBtb2JpbGUgZGV2aWNlcyAoaU9TIGFuZCBBbmRyb2lkKSB3aW5kb3cuaW5uZXJIZWlnaHQgIT09IDEwMHZoXHJcbiAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0ID0gJ2NhbGMoMTAwdmgnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vZmZzZXRUb3ApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYkMSA9IG9mZnNldCh0aGlzLiRlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3AgPSByZWYkMS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodCArPSB0b3AgPiAwICYmIHRvcCA8IGhlaWdodCh3aW5kb3cpIC8gMiA/IChcIiAtIFwiICsgdG9wICsgXCJweFwiKSA6ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9mZnNldEJvdHRvbSA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0ICs9IFwiIC0gXCIgKyAoZGltZW5zaW9ucyh0aGlzLiRlbC5uZXh0RWxlbWVudFNpYmxpbmcpLmhlaWdodCkgKyBcInB4XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOdW1lcmljKHRoaXMub2Zmc2V0Qm90dG9tKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0ICs9IFwiIC0gXCIgKyAodGhpcy5vZmZzZXRCb3R0b20pICsgXCJ2aFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2Zmc2V0Qm90dG9tICYmIGVuZHNXaXRoKHRoaXMub2Zmc2V0Qm90dG9tLCAncHgnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0ICs9IFwiIC0gXCIgKyAodG9GbG9hdCh0aGlzLm9mZnNldEJvdHRvbSkpICsgXCJweFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHRoaXMub2Zmc2V0Qm90dG9tKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0ICs9IFwiIC0gXCIgKyAoZGltZW5zaW9ucyhxdWVyeSh0aGlzLm9mZnNldEJvdHRvbSwgdGhpcy4kZWwpKS5oZWlnaHQpICsgXCJweFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodCArPSAoYm94ID8gKFwiIC0gXCIgKyBib3ggKyBcInB4XCIpIDogJycpICsgXCIpXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7bWluSGVpZ2h0OiBtaW5IZWlnaHQsIHByZXY6IHByZXZ9O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1pbkhlaWdodCA9IHJlZi5taW5IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHJlZi5wcmV2O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHttaW5IZWlnaHQ6IG1pbkhlaWdodH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtaW5IZWlnaHQgIT09IHByZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR1cGRhdGUodGhpcy4kZWwsICdyZXNpemUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5IZWlnaHQgJiYgdG9GbG9hdChjc3ModGhpcy4kZWwsICdtaW5IZWlnaHQnKSkgPCB0aGlzLm1pbkhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ21pbkhlaWdodCcsIHRoaXMubWluSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIFNWRyA9IHtcclxuXHJcbiAgICAgICAgYXJnczogJ3NyYycsXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGlkOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBpY29uOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHNyYzogU3RyaW5nLFxyXG4gICAgICAgICAgICBzdHlsZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB3aWR0aDogTnVtYmVyLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IE51bWJlcixcclxuICAgICAgICAgICAgcmF0aW86IE51bWJlcixcclxuICAgICAgICAgICAgY2xhc3M6IFN0cmluZyxcclxuICAgICAgICAgICAgc3Ryb2tlQW5pbWF0aW9uOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBmb2N1c2FibGU6IEJvb2xlYW4sIC8vIElFIDExXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6ICdsaXN0J1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcmF0aW86IDEsXHJcbiAgICAgICAgICAgIGluY2x1ZGU6IFsnc3R5bGUnLCAnY2xhc3MnLCAnZm9jdXNhYmxlJ10sXHJcbiAgICAgICAgICAgIGNsYXNzOiAnJyxcclxuICAgICAgICAgICAgc3Ryb2tlQW5pbWF0aW9uOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJlZm9yZUNvbm5lY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzICs9ICcgdWstc3ZnJztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGFzc2lnbjtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaWNvbiAmJiBpbmNsdWRlcyh0aGlzLnNyYywgJyMnKSkge1xyXG4gICAgICAgICAgICAgICAgKGFzc2lnbiA9IHRoaXMuc3JjLnNwbGl0KCcjJyksIHRoaXMuc3JjID0gYXNzaWduWzBdLCB0aGlzLmljb24gPSBhc3NpZ25bMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuZ2V0U3ZnKCkudGhlbihmdW5jdGlvbiAoZWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcyQxLl9jb25uZWN0ZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN2ZyA9IGluc2VydFNWRyhlbCwgdGhpcyQxLiRlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuc3ZnRWwgJiYgc3ZnICE9PSB0aGlzJDEuc3ZnRWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlJDEodGhpcyQxLnN2Z0VsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5hcHBseUF0dHJpYnV0ZXMoc3ZnLCBlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLiRlbWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMkMS5zdmdFbCA9IHN2ZztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIG5vb3ApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnN2Zy50aGVuKGZ1bmN0aW9uIChzdmcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcyQxLl9jb25uZWN0ZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVm9pZEVsZW1lbnQodGhpcyQxLiRlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLiRlbC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZSQxKHN2Zyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnN2Z0VsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN2ZyA9IG51bGw7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZToge1xyXG5cclxuICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISEodGhpcy5zdHJva2VBbmltYXRpb24gJiYgdGhpcy5zdmdFbCAmJiBpc1Zpc2libGUodGhpcy5zdmdFbCkpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYXBwbHlBbmltYXRpb24odGhpcy5zdmdFbCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB0eXBlOiBbJ3Jlc2l6ZSddXHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIGdldFN2ZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZFNWRyh0aGlzLnNyYykudGhlbihmdW5jdGlvbiAoc3ZnKSB7IHJldHVybiBwYXJzZVNWRyhzdmcsIHRoaXMkMS5pY29uKSB8fCBQcm9taXNlJDEucmVqZWN0KCdTVkcgbm90IGZvdW5kLicpOyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYXBwbHlBdHRyaWJ1dGVzOiBmdW5jdGlvbihlbCwgcmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLiRvcHRpb25zLnByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVzKHRoaXMuaW5jbHVkZSwgcHJvcCkgJiYgKHByb3AgaW4gdGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cihlbCwgcHJvcCwgdGhpc1twcm9wXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGF0dHJpYnV0ZSBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmJDEgPSB0aGlzLmF0dHJpYnV0ZXNbYXR0cmlidXRlXS5zcGxpdCgnOicsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wJDEgPSByZWYkMVswXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZWYkMVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyKGVsLCBwcm9wJDEsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVBdHRyKGVsLCAnaWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSBbJ3dpZHRoJywgJ2hlaWdodCddO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBwcm9wcy5tYXAoZnVuY3Rpb24gKHByb3ApIHsgcmV0dXJuIHRoaXMkMVtwcm9wXTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFkaW1lbnNpb25zLnNvbWUoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gdmFsOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMgPSBwcm9wcy5tYXAoZnVuY3Rpb24gKHByb3ApIHsgcmV0dXJuIGF0dHIocmVmLCBwcm9wKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXdCb3ggPSBhdHRyKHJlZiwgJ3ZpZXdCb3gnKTtcclxuICAgICAgICAgICAgICAgIGlmICh2aWV3Qm94ICYmICFkaW1lbnNpb25zLnNvbWUoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gdmFsOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMgPSB2aWV3Qm94LnNwbGl0KCcgJykuc2xpY2UoMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGltZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGkpIHsgcmV0dXJuIGF0dHIoZWwsIHByb3BzW2ldLCB0b0Zsb2F0KHZhbCkgKiB0aGlzJDEucmF0aW8gfHwgbnVsbCk7IH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBsb2FkU1ZHID0gbWVtb2l6ZShmdW5jdGlvbiAoc3JjKSB7IHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghc3JjKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXJ0c1dpdGgoc3JjLCAnZGF0YTonKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkZWNvZGVVUklDb21wb25lbnQoc3JjLnNwbGl0KCcsJylbMV0pKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhamF4KHNyYykudGhlbihcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeGhyKSB7IHJldHVybiByZXNvbHZlKHhoci5yZXNwb25zZSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVqZWN0KCdTVkcgbm90IGZvdW5kLicpOyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyB9XHJcbiAgICApO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlU1ZHKHN2ZywgaWNvbikge1xyXG5cclxuICAgICAgICBpZiAoaWNvbiAmJiBpbmNsdWRlcyhzdmcsICc8c3ltYm9sJykpIHtcclxuICAgICAgICAgICAgc3ZnID0gcGFyc2VTeW1ib2xzKHN2ZywgaWNvbikgfHwgc3ZnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3ZnID0gJChzdmcuc3Vic3RyKHN2Zy5pbmRleE9mKCc8c3ZnJykpKTtcclxuICAgICAgICByZXR1cm4gc3ZnICYmIHN2Zy5oYXNDaGlsZE5vZGVzKCkgJiYgc3ZnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzeW1ib2xSZSA9IC88c3ltYm9sKFteXSo/aWQ9KFsnXCJdKSguKz8pXFwyW15dKj88XFwvKXN5bWJvbD4vZztcclxuICAgIHZhciBzeW1ib2xzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VTeW1ib2xzKHN2ZywgaWNvbikge1xyXG5cclxuICAgICAgICBpZiAoIXN5bWJvbHNbc3ZnXSkge1xyXG5cclxuICAgICAgICAgICAgc3ltYm9sc1tzdmddID0ge307XHJcblxyXG4gICAgICAgICAgICBzeW1ib2xSZS5sYXN0SW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hdGNoO1xyXG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gc3ltYm9sUmUuZXhlYyhzdmcpKSkge1xyXG4gICAgICAgICAgICAgICAgc3ltYm9sc1tzdmddW21hdGNoWzNdXSA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiXCIgKyAobWF0Y2hbMV0pICsgXCJzdmc+XCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3ltYm9sc1tzdmddW2ljb25dO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGx5QW5pbWF0aW9uKGVsKSB7XHJcblxyXG4gICAgICAgIHZhciBsZW5ndGggPSBnZXRNYXhQYXRoTGVuZ3RoKGVsKTtcclxuXHJcbiAgICAgICAgaWYgKGxlbmd0aCkge1xyXG4gICAgICAgICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS11ay1hbmltYXRpb24tc3Ryb2tlJywgbGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1heFBhdGhMZW5ndGgoZWwpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKE1hdGgubWF4LmFwcGx5KE1hdGgsIFsgMCBdLmNvbmNhdCggJCQoJ1tzdHJva2VdJywgZWwpLm1hcChmdW5jdGlvbiAoc3Ryb2tlKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Ryb2tlLmdldFRvdGFsTGVuZ3RoKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkgKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluc2VydFNWRyhlbCwgcm9vdCkge1xyXG5cclxuICAgICAgICBpZiAoaXNWb2lkRWxlbWVudChyb290KSB8fCByb290LnRhZ05hbWUgPT09ICdDQU5WQVMnKSB7XHJcblxyXG4gICAgICAgICAgICByb290LmhpZGRlbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IHJvb3QubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICByZXR1cm4gZXF1YWxzKGVsLCBuZXh0KVxyXG4gICAgICAgICAgICAgICAgPyBuZXh0XHJcbiAgICAgICAgICAgICAgICA6IGFmdGVyKHJvb3QsIGVsKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGFzdCA9IHJvb3QubGFzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICByZXR1cm4gZXF1YWxzKGVsLCBsYXN0KVxyXG4gICAgICAgICAgICA/IGxhc3RcclxuICAgICAgICAgICAgOiBhcHBlbmQocm9vdCwgZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVxdWFscyhlbCwgb3RoZXIpIHtcclxuICAgICAgICByZXR1cm4gaXNTVkcoZWwpICYmIGlzU1ZHKG90aGVyKSAmJiBpbm5lckhUTUwoZWwpID09PSBpbm5lckhUTUwob3RoZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzU1ZHKGVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsICYmIGVsLnRhZ05hbWUgPT09ICdzdmcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlubmVySFRNTChlbCkge1xyXG4gICAgICAgIHJldHVybiAoZWwuaW5uZXJIVE1MIHx8IChuZXcgWE1MU2VyaWFsaXplcigpKS5zZXJpYWxpemVUb1N0cmluZyhlbCkucmVwbGFjZSgvPHN2Zy4qPz4oLio/KTxcXC9zdmc+L2csICckMScpKS5yZXBsYWNlKC9cXHMvZywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjbG9zZUljb24gPSBcIjxzdmcgd2lkdGg9XFxcIjE0XFxcIiBoZWlnaHQ9XFxcIjE0XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTQgMTRcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMVxcXCIgeDE9XFxcIjFcXFwiIHkxPVxcXCIxXFxcIiB4Mj1cXFwiMTNcXFwiIHkyPVxcXCIxM1xcXCIvPjxsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjFcXFwiIHgxPVxcXCIxM1xcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIxXFxcIiB5Mj1cXFwiMTNcXFwiLz48L3N2Zz5cIjtcclxuXHJcbiAgICB2YXIgY2xvc2VMYXJnZSA9IFwiPHN2ZyB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyMCAyMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS40XFxcIiB4MT1cXFwiMVxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIxOVxcXCIgeTI9XFxcIjE5XFxcIi8+PGxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuNFxcXCIgeDE9XFxcIjE5XFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjFcXFwiIHkyPVxcXCIxOVxcXCIvPjwvc3ZnPlwiO1xyXG5cclxuICAgIHZhciBtYXJrZXIgPSBcIjxzdmcgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjAgMjBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHJlY3QgeD1cXFwiOVxcXCIgeT1cXFwiNFxcXCIgd2lkdGg9XFxcIjFcXFwiIGhlaWdodD1cXFwiMTFcXFwiLz48cmVjdCB4PVxcXCI0XFxcIiB5PVxcXCI5XFxcIiB3aWR0aD1cXFwiMTFcXFwiIGhlaWdodD1cXFwiMVxcXCIvPjwvc3ZnPlwiO1xyXG5cclxuICAgIHZhciBuYXZiYXJUb2dnbGVJY29uID0gXCI8c3ZnIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDIwIDIwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxyZWN0IHk9XFxcIjlcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyXFxcIi8+PHJlY3QgeT1cXFwiM1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjJcXFwiLz48cmVjdCB5PVxcXCIxNVxcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjJcXFwiLz48L3N2Zz5cIjtcclxuXHJcbiAgICB2YXIgb3ZlcmxheUljb24gPSBcIjxzdmcgd2lkdGg9XFxcIjQwXFxcIiBoZWlnaHQ9XFxcIjQwXFxcIiB2aWV3Qm94PVxcXCIwIDAgNDAgNDBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHJlY3QgeD1cXFwiMTlcXFwiIHk9XFxcIjBcXFwiIHdpZHRoPVxcXCIxXFxcIiBoZWlnaHQ9XFxcIjQwXFxcIi8+PHJlY3QgeD1cXFwiMFxcXCIgeT1cXFwiMTlcXFwiIHdpZHRoPVxcXCI0MFxcXCIgaGVpZ2h0PVxcXCIxXFxcIi8+PC9zdmc+XCI7XHJcblxyXG4gICAgdmFyIHBhZ2luYXRpb25OZXh0ID0gXCI8c3ZnIHdpZHRoPVxcXCI3XFxcIiBoZWlnaHQ9XFxcIjEyXFxcIiB2aWV3Qm94PVxcXCIwIDAgNyAxMlxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMlxcXCIgcG9pbnRzPVxcXCIxIDEgNiA2IDEgMTFcXFwiLz48L3N2Zz5cIjtcclxuXHJcbiAgICB2YXIgcGFnaW5hdGlvblByZXZpb3VzID0gXCI8c3ZnIHdpZHRoPVxcXCI3XFxcIiBoZWlnaHQ9XFxcIjEyXFxcIiB2aWV3Qm94PVxcXCIwIDAgNyAxMlxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMlxcXCIgcG9pbnRzPVxcXCI2IDEgMSA2IDYgMTFcXFwiLz48L3N2Zz5cIjtcclxuXHJcbiAgICB2YXIgc2VhcmNoSWNvbiA9IFwiPHN2ZyB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyMCAyMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48Y2lyY2xlIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjFcXFwiIGN4PVxcXCI5XFxcIiBjeT1cXFwiOVxcXCIgcj1cXFwiN1xcXCIvPjxwYXRoIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjFcXFwiIGQ9XFxcIk0xNCwxNCBMMTgsMTggTDE0LDE0IFpcXFwiLz48L3N2Zz5cIjtcclxuXHJcbiAgICB2YXIgc2VhcmNoTGFyZ2UgPSBcIjxzdmcgd2lkdGg9XFxcIjQwXFxcIiBoZWlnaHQ9XFxcIjQwXFxcIiB2aWV3Qm94PVxcXCIwIDAgNDAgNDBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGNpcmNsZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS44XFxcIiBjeD1cXFwiMTcuNVxcXCIgY3k9XFxcIjE3LjVcXFwiIHI9XFxcIjE2LjVcXFwiLz48bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS44XFxcIiB4MT1cXFwiMzhcXFwiIHkxPVxcXCIzOVxcXCIgeDI9XFxcIjI5XFxcIiB5Mj1cXFwiMzBcXFwiLz48L3N2Zz5cIjtcclxuXHJcbiAgICB2YXIgc2VhcmNoTmF2YmFyID0gXCI8c3ZnIHdpZHRoPVxcXCIyNFxcXCIgaGVpZ2h0PVxcXCIyNFxcXCIgdmlld0JveD1cXFwiMCAwIDI0IDI0XFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxjaXJjbGUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMVxcXCIgY3g9XFxcIjEwLjVcXFwiIGN5PVxcXCIxMC41XFxcIiByPVxcXCI5LjVcXFwiLz48bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4xXFxcIiB4MT1cXFwiMjNcXFwiIHkxPVxcXCIyM1xcXCIgeDI9XFxcIjE3XFxcIiB5Mj1cXFwiMTdcXFwiLz48L3N2Zz5cIjtcclxuXHJcbiAgICB2YXIgc2xpZGVuYXZOZXh0ID0gXCI8c3ZnIHdpZHRoPVxcXCIxNFxcXCIgaGVpZ2h0PVxcXCIyNFxcXCIgdmlld0JveD1cXFwiMCAwIDE0IDI0XFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxwb2x5bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS40XFxcIiBwb2ludHM9XFxcIjEuMjI1LDIzIDEyLjc3NSwxMiAxLjIyNSwxIFxcXCIvPjwvc3ZnPlwiO1xyXG5cclxuICAgIHZhciBzbGlkZW5hdk5leHRMYXJnZSA9IFwiPHN2ZyB3aWR0aD1cXFwiMjVcXFwiIGhlaWdodD1cXFwiNDBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNSA0MFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjJcXFwiIHBvaW50cz1cXFwiNC4wMDIsMzguNTQ3IDIyLjUyNywyMC4wMjQgNCwxLjUgXFxcIi8+PC9zdmc+XCI7XHJcblxyXG4gICAgdmFyIHNsaWRlbmF2UHJldmlvdXMgPSBcIjxzdmcgd2lkdGg9XFxcIjE0XFxcIiBoZWlnaHQ9XFxcIjI0XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTQgMjRcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjRcXFwiIHBvaW50cz1cXFwiMTIuNzc1LDEgMS4yMjUsMTIgMTIuNzc1LDIzIFxcXCIvPjwvc3ZnPlwiO1xyXG5cclxuICAgIHZhciBzbGlkZW5hdlByZXZpb3VzTGFyZ2UgPSBcIjxzdmcgd2lkdGg9XFxcIjI1XFxcIiBoZWlnaHQ9XFxcIjQwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjUgNDBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIyXFxcIiBwb2ludHM9XFxcIjIwLjUyNywxLjUgMiwyMC4wMjQgMjAuNTI1LDM4LjU0NyBcXFwiLz48L3N2Zz5cIjtcclxuXHJcbiAgICB2YXIgc3Bpbm5lciA9IFwiPHN2ZyB3aWR0aD1cXFwiMzBcXFwiIGhlaWdodD1cXFwiMzBcXFwiIHZpZXdCb3g9XFxcIjAgMCAzMCAzMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48Y2lyY2xlIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgY3g9XFxcIjE1XFxcIiBjeT1cXFwiMTVcXFwiIHI9XFxcIjE0XFxcIi8+PC9zdmc+XCI7XHJcblxyXG4gICAgdmFyIHRvdG9wID0gXCI8c3ZnIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxMFxcXCIgdmlld0JveD1cXFwiMCAwIDE4IDEwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxwb2x5bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4yXFxcIiBwb2ludHM9XFxcIjEgOSA5IDEgMTcgOSBcXFwiLz48L3N2Zz5cIjtcclxuXHJcbiAgICB2YXIgaWNvbnMgPSB7XHJcbiAgICAgICAgc3Bpbm5lcjogc3Bpbm5lcixcclxuICAgICAgICB0b3RvcDogdG90b3AsXHJcbiAgICAgICAgbWFya2VyOiBtYXJrZXIsXHJcbiAgICAgICAgJ2Nsb3NlLWljb24nOiBjbG9zZUljb24sXHJcbiAgICAgICAgJ2Nsb3NlLWxhcmdlJzogY2xvc2VMYXJnZSxcclxuICAgICAgICAnbmF2YmFyLXRvZ2dsZS1pY29uJzogbmF2YmFyVG9nZ2xlSWNvbixcclxuICAgICAgICAnb3ZlcmxheS1pY29uJzogb3ZlcmxheUljb24sXHJcbiAgICAgICAgJ3BhZ2luYXRpb24tbmV4dCc6IHBhZ2luYXRpb25OZXh0LFxyXG4gICAgICAgICdwYWdpbmF0aW9uLXByZXZpb3VzJzogcGFnaW5hdGlvblByZXZpb3VzLFxyXG4gICAgICAgICdzZWFyY2gtaWNvbic6IHNlYXJjaEljb24sXHJcbiAgICAgICAgJ3NlYXJjaC1sYXJnZSc6IHNlYXJjaExhcmdlLFxyXG4gICAgICAgICdzZWFyY2gtbmF2YmFyJzogc2VhcmNoTmF2YmFyLFxyXG4gICAgICAgICdzbGlkZW5hdi1uZXh0Jzogc2xpZGVuYXZOZXh0LFxyXG4gICAgICAgICdzbGlkZW5hdi1uZXh0LWxhcmdlJzogc2xpZGVuYXZOZXh0TGFyZ2UsXHJcbiAgICAgICAgJ3NsaWRlbmF2LXByZXZpb3VzJzogc2xpZGVuYXZQcmV2aW91cyxcclxuICAgICAgICAnc2xpZGVuYXYtcHJldmlvdXMtbGFyZ2UnOiBzbGlkZW5hdlByZXZpb3VzTGFyZ2VcclxuICAgIH07XHJcblxyXG4gICAgdmFyIEljb24gPSB7XHJcblxyXG4gICAgICAgIGluc3RhbGw6IGluc3RhbGwkMyxcclxuXHJcbiAgICAgICAgZXh0ZW5kczogU1ZHLFxyXG5cclxuICAgICAgICBhcmdzOiAnaWNvbicsXHJcblxyXG4gICAgICAgIHByb3BzOiBbJ2ljb24nXSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBpbmNsdWRlOiBbJ2ZvY3VzYWJsZSddXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaXNJY29uOiB0cnVlLFxyXG5cclxuICAgICAgICBiZWZvcmVDb25uZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1pY29uJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgZ2V0U3ZnOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IGdldEljb24odGhpcy5pY29uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZSQxLnJlamVjdCgnSWNvbiBub3QgZm91bmQuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKGljb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBJY29uQ29tcG9uZW50ID0ge1xyXG5cclxuICAgICAgICBhcmdzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgZXh0ZW5kczogSWNvbixcclxuXHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24gKHZtKSB7IHJldHVybiAoe1xyXG4gICAgICAgICAgICBpY29uOiBoeXBoZW5hdGUodm0uY29uc3RydWN0b3Iub3B0aW9ucy5uYW1lKVxyXG4gICAgICAgIH0pOyB9LFxyXG5cclxuICAgICAgICBiZWZvcmVDb25uZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsIHRoaXMuJG5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBTbGlkZW5hdiA9IHtcclxuXHJcbiAgICAgICAgZXh0ZW5kczogSWNvbkNvbXBvbmVudCxcclxuXHJcbiAgICAgICAgYmVmb3JlQ29ubmVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCAndWstc2xpZGVuYXYnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgaWNvbjogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpY29uID0gcmVmLmljb247XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhc0NsYXNzKCRlbCwgJ3VrLXNsaWRlbmF2LWxhcmdlJylcclxuICAgICAgICAgICAgICAgICAgICA/IChpY29uICsgXCItbGFyZ2VcIilcclxuICAgICAgICAgICAgICAgICAgICA6IGljb247XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIFNlYXJjaCA9IHtcclxuXHJcbiAgICAgICAgZXh0ZW5kczogSWNvbkNvbXBvbmVudCxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIGljb246IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IHJlZi5pY29uO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBoYXNDbGFzcygkZWwsICd1ay1zZWFyY2gtaWNvbicpICYmIHBhcmVudHMoJGVsLCAnLnVrLXNlYXJjaC1sYXJnZScpLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgID8gJ3NlYXJjaC1sYXJnZSdcclxuICAgICAgICAgICAgICAgICAgICA6IHBhcmVudHMoJGVsLCAnLnVrLXNlYXJjaC1uYXZiYXInKS5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnc2VhcmNoLW5hdmJhcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBpY29uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBDbG9zZSA9IHtcclxuXHJcbiAgICAgICAgZXh0ZW5kczogSWNvbkNvbXBvbmVudCxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIGljb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcImNsb3NlLVwiICsgKGhhc0NsYXNzKHRoaXMuJGVsLCAndWstY2xvc2UtbGFyZ2UnKSA/ICdsYXJnZScgOiAnaWNvbicpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgU3Bpbm5lciA9IHtcclxuXHJcbiAgICAgICAgZXh0ZW5kczogSWNvbkNvbXBvbmVudCxcclxuXHJcbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN2Zy50aGVuKGZ1bmN0aW9uIChzdmcpIHsgcmV0dXJuIHN2ZyAmJiB0aGlzJDEucmF0aW8gIT09IDEgJiYgY3NzKCQoJ2NpcmNsZScsIHN2ZyksICdzdHJva2VXaWR0aCcsIDEgLyB0aGlzJDEucmF0aW8pOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcGFyc2VkID0ge307XHJcbiAgICBmdW5jdGlvbiBpbnN0YWxsJDMoVUlraXQpIHtcclxuICAgICAgICBVSWtpdC5pY29uLmFkZCA9IGZ1bmN0aW9uIChuYW1lLCBzdmcpIHtcclxuICAgICAgICAgICAgdmFyIG9iajtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgYWRkZWQgPSBpc1N0cmluZyhuYW1lKSA/ICgoIG9iaiA9IHt9LCBvYmpbbmFtZV0gPSBzdmcsIG9iaiApKSA6IG5hbWU7XHJcbiAgICAgICAgICAgIGVhY2goYWRkZWQsIGZ1bmN0aW9uIChzdmcsIG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGljb25zW25hbWVdID0gc3ZnO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHBhcnNlZFtuYW1lXTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoVUlraXQuX2luaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBseSQxKGRvY3VtZW50LmJvZHksIGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWFjaChVSWtpdC5nZXRDb21wb25lbnRzKGVsKSwgZnVuY3Rpb24gKGNtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbXAuJG9wdGlvbnMuaXNJY29uICYmIGNtcC5pY29uIGluIGFkZGVkICYmIGNtcC4kcmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTsgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SWNvbihpY29uKSB7XHJcblxyXG4gICAgICAgIGlmICghaWNvbnNbaWNvbl0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXBhcnNlZFtpY29uXSkge1xyXG4gICAgICAgICAgICBwYXJzZWRbaWNvbl0gPSAkKChpY29uc1thcHBseVJ0bChpY29uKV0gfHwgaWNvbnNbaWNvbl0pLnRyaW0oKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyc2VkW2ljb25dLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBseVJ0bChpY29uKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzUnRsID8gc3dhcChzd2FwKGljb24sICdsZWZ0JywgJ3JpZ2h0JyksICdwcmV2aW91cycsICduZXh0JykgOiBpY29uO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbWcgPSB7XHJcblxyXG4gICAgICAgIGFyZ3M6ICdkYXRhU3JjJyxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgZGF0YVNyYzogU3RyaW5nLFxyXG4gICAgICAgICAgICBkYXRhU3Jjc2V0OiBCb29sZWFuLFxyXG4gICAgICAgICAgICBzaXplczogU3RyaW5nLFxyXG4gICAgICAgICAgICB3aWR0aDogTnVtYmVyLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IE51bWJlcixcclxuICAgICAgICAgICAgb2Zmc2V0VG9wOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIG9mZnNldExlZnQ6IFN0cmluZyxcclxuICAgICAgICAgICAgdGFyZ2V0OiBTdHJpbmdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRhdGFTcmM6ICcnLFxyXG4gICAgICAgICAgICBkYXRhU3Jjc2V0OiBmYWxzZSxcclxuICAgICAgICAgICAgc2l6ZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICB3aWR0aDogZmFsc2UsXHJcbiAgICAgICAgICAgIGhlaWdodDogZmFsc2UsXHJcbiAgICAgICAgICAgIG9mZnNldFRvcDogJzUwdmgnLFxyXG4gICAgICAgICAgICBvZmZzZXRMZWZ0OiAnNTB2dycsXHJcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgY2FjaGVLZXk6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGFTcmMgPSByZWYuZGF0YVNyYztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLiRuYW1lKSArIFwiLlwiICsgZGF0YVNyYyk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB3aWR0aDogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSByZWYud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YVdpZHRoID0gcmVmLmRhdGFXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGggfHwgZGF0YVdpZHRoO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaGVpZ2h0OiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWYuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGFIZWlnaHQgPSByZWYuZGF0YUhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IHx8IGRhdGFIZWlnaHQ7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBzaXplczogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2l6ZXMgPSByZWYuc2l6ZXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YVNpemVzID0gcmVmLmRhdGFTaXplcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZXMgfHwgZGF0YVNpemVzO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaXNJbWc6IGZ1bmN0aW9uKF8sICRlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSW1nKCRlbCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB0YXJnZXQ6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3RoaXMuJGVsIF0uY29uY2F0KCBxdWVyeUFsbCh0YXJnZXQsIHRoaXMuJGVsKSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvZmZzZXRUb3A6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldFRvcCA9IHJlZi5vZmZzZXRUb3A7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvUHgob2Zmc2V0VG9wLCAnaGVpZ2h0Jyk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvZmZzZXRMZWZ0OiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXRMZWZ0ID0gcmVmLm9mZnNldExlZnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvUHgob2Zmc2V0TGVmdCwgJ3dpZHRoJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTcmNBdHRycyh0aGlzLiRlbCwgdGhpcy5kYXRhU3JjLCB0aGlzLmRhdGFTcmNzZXQsIHRoaXMuc2l6ZXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RvcmFnZVt0aGlzLmNhY2hlS2V5XSkge1xyXG4gICAgICAgICAgICAgICAgc2V0U3JjQXR0cnModGhpcy4kZWwsIHN0b3JhZ2VbdGhpcy5jYWNoZUtleV0sIHRoaXMuZGF0YVNyY3NldCwgdGhpcy5zaXplcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0ltZyAmJiB0aGlzLndpZHRoICYmIHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTcmNBdHRycyh0aGlzLiRlbCwgZ2V0UGxhY2Vob2xkZXJJbWFnZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5zaXplcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKHRoaXMubG9hZCwge1xyXG4gICAgICAgICAgICAgICAgcm9vdE1hcmdpbjogKCh0aGlzLm9mZnNldFRvcCkgKyBcInB4IFwiICsgKHRoaXMub2Zmc2V0TGVmdCkgKyBcInB4XCIpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMub2JzZXJ2ZSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIgJiYgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlID0gcmVmLmltYWdlO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpbWFnZSAmJiBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkKHRoaXMub2JzZXJ2ZXIudGFrZVJlY29yZHMoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJbWcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW1hZ2UgJiYgaW1hZ2UudGhlbihmdW5jdGlvbiAoaW1nKSB7IHJldHVybiBpbWcgJiYgaW1nLmN1cnJlbnRTcmMgIT09ICcnICYmIHNldFNyY0F0dHJzKHRoaXMkMS4kZWwsIGN1cnJlbnRTcmMoaW1nKSk7IH0pO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YVNyY3NldCAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAhPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmdTaXplID0gY3NzKHRoaXMuJGVsLCAnYmFja2dyb3VuZFNpemUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmdTaXplLm1hdGNoKC9eKGF1dG9cXHM/KSskLykgfHwgdG9GbG9hdChiZ1NpemUpID09PSBkYXRhLmJnU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmJnU2l6ZSA9IGdldFNvdXJjZVNpemUodGhpcy5kYXRhU3Jjc2V0LCB0aGlzLnNpemVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnYmFja2dyb3VuZFNpemUnLCAoKGRhdGEuYmdTaXplKSArIFwicHhcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Jlc2l6ZSddXHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIGxvYWQ6IGZ1bmN0aW9uKGVudHJpZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBPbGQgY2hyb21pdW0gYmFzZWQgYnJvd3NlcnMgKFVDIEJyb3dzZXIpIGRpZCBub3QgaW1wbGVtZW50IGBpc0ludGVyc2VjdGluZ2BcclxuICAgICAgICAgICAgICAgIGlmICghZW50cmllcy5zb21lKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gaXNVbmRlZmluZWQoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHx8IGVudHJ5LmlzSW50ZXJzZWN0aW5nOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLmltYWdlID0gZ2V0SW1hZ2UodGhpcy5kYXRhU3JjLCB0aGlzLmRhdGFTcmNzZXQsIHRoaXMuc2l6ZXMpLnRoZW4oZnVuY3Rpb24gKGltZykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRTcmNBdHRycyh0aGlzJDEuJGVsLCBjdXJyZW50U3JjKGltZyksIGltZy5zcmNzZXQsIGltZy5zaXplcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcmFnZVt0aGlzJDEuY2FjaGVLZXldID0gY3VycmVudFNyYyhpbWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbWc7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIHRyaWdnZXIodGhpcyQxLiRlbCwgbmV3IGUuY29uc3RydWN0b3IoZS50eXBlLCBlKSk7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29ubmVjdGVkICYmICF0aGlzLl9kYXRhLmltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHRoaXMkMS5vYnNlcnZlci5vYnNlcnZlKGVsKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U3JjQXR0cnMoZWwsIHNyYywgc3Jjc2V0LCBzaXplcykge1xyXG5cclxuICAgICAgICBpZiAoaXNJbWcoZWwpKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXQgPSBmdW5jdGlvbiAocHJvcCwgdmFsKSB7IHJldHVybiB2YWwgJiYgdmFsICE9PSBlbFtwcm9wXSAmJiAoZWxbcHJvcF0gPSB2YWwpOyB9O1xyXG4gICAgICAgICAgICBzZXQoJ3NpemVzJywgc2l6ZXMpO1xyXG4gICAgICAgICAgICBzZXQoJ3NyY3NldCcsIHNyY3NldCk7XHJcbiAgICAgICAgICAgIHNldCgnc3JjJywgc3JjKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNyYykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNoYW5nZSA9ICFpbmNsdWRlcyhlbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UsIHNyYyk7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNzcyhlbCwgJ2JhY2tncm91bmRJbWFnZScsIChcInVybChcIiArIChlc2NhcGUoc3JjKSkgKyBcIilcIikpO1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcihlbCwgY3JlYXRlRXZlbnQoJ2xvYWQnLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UGxhY2Vob2xkZXJJbWFnZSh3aWR0aCwgaGVpZ2h0LCBzaXplcykge1xyXG4gICAgICAgIHZhciBhc3NpZ247XHJcblxyXG5cclxuICAgICAgICBpZiAoc2l6ZXMpIHtcclxuICAgICAgICAgICAgKChhc3NpZ24gPSBEaW1lbnNpb25zLnJhdGlvKHt3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fSwgJ3dpZHRoJywgdG9QeChzaXplc1RvUGl4ZWwoc2l6ZXMpKSksIHdpZHRoID0gYXNzaWduLndpZHRoLCBoZWlnaHQgPSBhc3NpZ24uaGVpZ2h0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFwiZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCJcIiArIHdpZHRoICsgXCJcXFwiIGhlaWdodD1cXFwiXCIgKyBoZWlnaHQgKyBcIlxcXCI+PC9zdmc+XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzaXplc1JlID0gL1xccyooLio/KVxccyooXFx3K3xjYWxjXFwoLio/XFwpKVxccyooPzosfCQpL2c7XHJcbiAgICBmdW5jdGlvbiBzaXplc1RvUGl4ZWwoc2l6ZXMpIHtcclxuICAgICAgICB2YXIgbWF0Y2hlcztcclxuXHJcbiAgICAgICAgc2l6ZXNSZS5sYXN0SW5kZXggPSAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoKG1hdGNoZXMgPSBzaXplc1JlLmV4ZWMoc2l6ZXMpKSkge1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZXNbMV0gfHwgd2luZG93Lm1hdGNoTWVkaWEobWF0Y2hlc1sxXSkubWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IGV2YWx1YXRlU2l6ZShtYXRjaGVzWzJdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWF0Y2hlcyB8fCAnMTAwdncnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzaXplUmUgPSAvXFxkKyg/Olxcdyt8JSkvZztcclxuICAgIHZhciBhZGRpdGlvblJlID0gL1srLV0/KFxcZCspL2c7XHJcbiAgICBmdW5jdGlvbiBldmFsdWF0ZVNpemUoc2l6ZSkge1xyXG4gICAgICAgIHJldHVybiBzdGFydHNXaXRoKHNpemUsICdjYWxjJylcclxuICAgICAgICAgICAgPyBzaXplXHJcbiAgICAgICAgICAgICAgICAuc2xpY2UoNSwgLTEpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZShzaXplUmUsIGZ1bmN0aW9uIChzaXplKSB7IHJldHVybiB0b1B4KHNpemUpOyB9KVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyAvZywgJycpXHJcbiAgICAgICAgICAgICAgICAubWF0Y2goYWRkaXRpb25SZSlcclxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyArYjsgfSwgMClcclxuICAgICAgICAgICAgOiBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzcmNTZXRSZSA9IC9cXHMrXFxkK3dcXHMqKD86LHwkKS9nO1xyXG4gICAgZnVuY3Rpb24gZ2V0U291cmNlU2l6ZShzcmNzZXQsIHNpemVzKSB7XHJcbiAgICAgICAgdmFyIHNyY1NpemUgPSB0b1B4KHNpemVzVG9QaXhlbChzaXplcykpO1xyXG4gICAgICAgIHZhciBkZXNjcmlwdG9ycyA9IChzcmNzZXQubWF0Y2goc3JjU2V0UmUpIHx8IFtdKS5tYXAodG9GbG9hdCkuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSAtIGI7IH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVzY3JpcHRvcnMuZmlsdGVyKGZ1bmN0aW9uIChzaXplKSB7IHJldHVybiBzaXplID49IHNyY1NpemU7IH0pWzBdIHx8IGRlc2NyaXB0b3JzLnBvcCgpIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzSW1nKGVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsLnRhZ05hbWUgPT09ICdJTUcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGN1cnJlbnRTcmMoZWwpIHtcclxuICAgICAgICByZXR1cm4gZWwuY3VycmVudFNyYyB8fCBlbC5zcmM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGtleSA9ICdfX3Rlc3RfXyc7XHJcbiAgICB2YXIgc3RvcmFnZTtcclxuXHJcbiAgICAvLyB3b3JrYXJvdW5kIGZvciBTYWZhcmkncyBwcml2YXRlIGJyb3dzaW5nIG1vZGUgYW5kIGFjY2Vzc2luZyBzZXNzaW9uU3RvcmFnZSBpbiBCbGlua1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBzdG9yYWdlID0gd2luZG93LnNlc3Npb25TdG9yYWdlIHx8IHt9O1xyXG4gICAgICAgIHN0b3JhZ2Vba2V5XSA9IDE7XHJcbiAgICAgICAgZGVsZXRlIHN0b3JhZ2Vba2V5XTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBzdG9yYWdlID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIE1lZGlhID0ge1xyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBtZWRpYTogQm9vbGVhblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbWVkaWE6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIG1hdGNoTWVkaWE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lZGlhID0gdG9NZWRpYSh0aGlzLm1lZGlhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhbWVkaWEgfHwgd2luZG93Lm1hdGNoTWVkaWEobWVkaWEpLm1hdGNoZXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gdG9NZWRpYSh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZVswXSA9PT0gJ0AnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFwiYnJlYWtwb2ludC1cIiArICh2YWx1ZS5zdWJzdHIoMSkpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0b0Zsb2F0KGdldENzc1ZhcihuYW1lKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiAhaXNOYU4odmFsdWUpID8gKFwiKG1pbi13aWR0aDogXCIgKyB2YWx1ZSArIFwicHgpXCIpIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxlYWRlciA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbQ2xhc3MsIE1lZGlhXSxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgZmlsbDogU3RyaW5nXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBmaWxsOiAnJyxcclxuICAgICAgICAgICAgY2xzV3JhcHBlcjogJ3VrLWxlYWRlci1maWxsJyxcclxuICAgICAgICAgICAgY2xzSGlkZTogJ3VrLWxlYWRlci1oaWRlJyxcclxuICAgICAgICAgICAgYXR0ckZpbGw6ICdkYXRhLWZpbGwnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIGZpbGw6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGwgPSByZWYuZmlsbDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsbCB8fCBnZXRDc3NWYXIoJ2xlYWRlci1maWxsLWNvbnRlbnQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYXNzaWduO1xyXG5cclxuICAgICAgICAgICAgKGFzc2lnbiA9IHdyYXBJbm5lcih0aGlzLiRlbCwgKFwiPHNwYW4gY2xhc3M9XFxcIlwiICsgKHRoaXMuY2xzV3JhcHBlcikgKyBcIlxcXCI+XCIpKSwgdGhpcy53cmFwcGVyID0gYXNzaWduWzBdKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB1bndyYXAodGhpcy53cmFwcGVyLmNoaWxkTm9kZXMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZToge1xyXG5cclxuICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlZCA9IHJlZi5jaGFuZ2VkO1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gcmVmLndpZHRoO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIHdpZHRoID0gTWF0aC5mbG9vcih0aGlzLiRlbC5vZmZzZXRXaWR0aCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHRoaXMuZmlsbCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkOiBjaGFuZ2VkIHx8IHByZXYgIT09IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGU6ICF0aGlzLm1hdGNoTWVkaWFcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMud3JhcHBlciwgdGhpcy5jbHNIaWRlLCBkYXRhLmhpZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyKHRoaXMud3JhcHBlciwgdGhpcy5hdHRyRmlsbCwgbmV3IEFycmF5KGRhdGEud2lkdGgpLmpvaW4oZGF0YS5maWxsKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Jlc2l6ZSddXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBhY3RpdmUgPSBbXTtcclxuXHJcbiAgICB2YXIgTW9kYWwgPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0NsYXNzLCBDb250YWluZXIsIFRvZ2dsYWJsZV0sXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHNlbFBhbmVsOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHNlbENsb3NlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGVzY0Nsb3NlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBiZ0Nsb3NlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBzdGFjazogQm9vbGVhblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgY2xzOiAndWstb3BlbicsXHJcbiAgICAgICAgICAgIGVzY0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICBiZ0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICBvdmVybGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBzdGFjazogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgcGFuZWw6IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsUGFuZWwgPSByZWYuc2VsUGFuZWw7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoc2VsUGFuZWwsICRlbCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uRWxlbWVudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGJnQ2xvc2U6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJnQ2xvc2UgPSByZWYuYmdDbG9zZTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYmdDbG9zZSAmJiB0aGlzLnBhbmVsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJlZm9yZURpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMuJGVsLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsQ2xvc2U7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICd0b2dnbGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkgPT09IGluY2x1ZGVzKGFjdGl2ZSwgdGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2JlZm9yZXNob3cnLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZXMoYWN0aXZlLCB0aGlzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2sgJiYgYWN0aXZlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlJDEuYWxsKGFjdGl2ZS5tYXAoZnVuY3Rpb24gKG1vZGFsKSB7IHJldHVybiBtb2RhbC5oaWRlKCk7IH0pKS50aGVuKHRoaXMuc2hvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUucHVzaCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICdzaG93JyxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAod2lkdGgod2luZG93KSA+IGRvY0VsLmNsaWVudFdpZHRoICYmIHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93WScsICdzY3JvbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ3pJbmRleCcsIHRvRmxvYXQoY3NzKHRoaXMuJGVsLCAnekluZGV4JykpICsgYWN0aXZlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2NFbCwgdGhpcy5jbHNQYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYmdDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNlKHRoaXMuJGVsLCAnaGlkZScsIG9uKGRvY3VtZW50LCBwb2ludGVyRG93biwgZnVuY3Rpb24gKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0KGFjdGl2ZSkgIT09IHRoaXMkMSB8fCB0aGlzJDEub3ZlcmxheSAmJiAhd2l0aGluKHRhcmdldCwgdGhpcyQxLiRlbCkgfHwgd2l0aGluKHRhcmdldCwgdGhpcyQxLnBhbmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNlKGRvY3VtZW50LCAocG9pbnRlclVwICsgXCIgXCIgKyBwb2ludGVyQ2FuY2VsICsgXCIgc2Nyb2xsXCIpLCBmdW5jdGlvbiAocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRQcmV2ZW50ZWQgPSByZWYuZGVmYXVsdFByZXZlbnRlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdUYXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQgJiYgdHlwZSA9PT0gcG9pbnRlclVwICYmIHRhcmdldCA9PT0gbmV3VGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwge3NlbGY6IHRydWV9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVzY0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2UodGhpcy4kZWwsICdoaWRlJywgb24oZG9jdW1lbnQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3ICYmIGxhc3QoYWN0aXZlKSA9PT0gdGhpcyQxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksIHtzZWxmOiB0cnVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnaGlkZGVuJyxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVzKGFjdGl2ZSwgdGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlLnNwbGljZShhY3RpdmUuaW5kZXhPZih0aGlzKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKGRvY3VtZW50LmJvZHksICdvdmVyZmxvd1knLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICd6SW5kZXgnLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlLnNvbWUoZnVuY3Rpb24gKG1vZGFsKSB7IHJldHVybiBtb2RhbC5jbHNQYWdlID09PSB0aGlzJDEuY2xzUGFnZTsgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLmNsc1BhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIHRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc1RvZ2dsZWQoKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiBwYXJlbnQodGhpcy4kZWwpICE9PSB0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZCh0aGlzLmNvbnRhaW5lciwgdGhpcy4kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnNob3coKS50aGVuKHJlc29sdmUpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7IH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy4kZWwsIHRydWUsIGFuaW1hdGUodGhpcykpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaGlkZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVFbGVtZW50KHRoaXMuJGVsLCBmYWxzZSwgYW5pbWF0ZSh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gYW5pbWF0ZShyZWYpIHtcclxuICAgICAgICB2YXIgdHJhbnNpdGlvbkVsZW1lbnQgPSByZWYudHJhbnNpdGlvbkVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIF90b2dnbGUgPSByZWYuX3RvZ2dsZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgc2hvdykgeyByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHJldHVybiBvbmNlKGVsLCAnc2hvdyBoaWRlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLl9yZWplY3QgJiYgZWwuX3JlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLl9yZWplY3QgPSByZWplY3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90b2dnbGUoZWwsIHNob3cpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2ZmID0gb25jZSh0cmFuc2l0aW9uRWxlbWVudCwgJ3RyYW5zaXRpb25zdGFydCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25jZSh0cmFuc2l0aW9uRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQgdHJhbnNpdGlvbmNhbmNlbCcsIHJlc29sdmUsIHtzZWxmOiB0cnVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge3NlbGY6IHRydWV9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdG9Ncyhjc3ModHJhbnNpdGlvbkVsZW1lbnQsICd0cmFuc2l0aW9uRHVyYXRpb24nKSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pOyB9XHJcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBkZWxldGUgZWwuX3JlamVjdDsgfSk7IH07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1vZGFsID0ge1xyXG5cclxuICAgICAgICBpbnN0YWxsOiBpbnN0YWxsJDIsXHJcblxyXG4gICAgICAgIG1peGluczogW01vZGFsXSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBjbHNQYWdlOiAndWstbW9kYWwtcGFnZScsXHJcbiAgICAgICAgICAgIHNlbFBhbmVsOiAnLnVrLW1vZGFsLWRpYWxvZycsXHJcbiAgICAgICAgICAgIHNlbENsb3NlOiAnLnVrLW1vZGFsLWNsb3NlLCAudWstbW9kYWwtY2xvc2UtZGVmYXVsdCwgLnVrLW1vZGFsLWNsb3NlLW91dHNpZGUsIC51ay1tb2RhbC1jbG9zZS1mdWxsJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czogW1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Nob3cnLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0aGlzLnBhbmVsLCAndWstbWFyZ2luLWF1dG8tdmVydGljYWwnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgJ3VrLWZsZXgnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQodGhpcy4kZWwpOyAvLyBmb3JjZSByZWZsb3dcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdoaWRkZW4nLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ2Rpc3BsYXknLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsICd1ay1mbGV4Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGluc3RhbGwkMihyZWYpIHtcclxuICAgICAgICB2YXIgbW9kYWwgPSByZWYubW9kYWw7XHJcblxyXG5cclxuICAgICAgICBtb2RhbC5kaWFsb2cgPSBmdW5jdGlvbiAoY29udGVudCwgb3B0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpYWxvZyA9IG1vZGFsKFxyXG4gICAgICAgICAgICAgICAgKFwiPGRpdiBjbGFzcz1cXFwidWstbW9kYWxcXFwiPiA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1kaWFsb2dcXFwiPlwiICsgY29udGVudCArIFwiPC9kaXY+IDwvZGl2PlwiKSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGRpYWxvZy5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICBvbihkaWFsb2cuJGVsLCAnaGlkZGVuJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gUHJvbWlzZSQxLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRpYWxvZy4kZGVzdHJveSh0cnVlKTsgfVxyXG4gICAgICAgICAgICAgICAgKTsgfSwge3NlbGY6IHRydWV9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGlhbG9nO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1vZGFsLmFsZXJ0ID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wZW5EaWFsb2coXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVscyA9IHJlZi5sYWJlbHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXCI8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1ib2R5XFxcIj5cIiArIChpc1N0cmluZyhtZXNzYWdlKSA/IG1lc3NhZ2UgOiBodG1sKG1lc3NhZ2UpKSArIFwiPC9kaXY+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWZvb3RlciB1ay10ZXh0LXJpZ2h0XFxcIj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1wcmltYXJ5IHVrLW1vZGFsLWNsb3NlXFxcIiBhdXRvZm9jdXM+XCIgKyAobGFiZWxzLm9rKSArIFwiPC9idXR0b24+IDwvZGl2PlwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZGVmZXJyZWQpIHsgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoKTsgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1vZGFsLmNvbmZpcm0gPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gb3BlbkRpYWxvZyhcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWxzID0gcmVmLmxhYmVscztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcIjxmb3JtPiA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1ib2R5XFxcIj5cIiArIChpc1N0cmluZyhtZXNzYWdlKSA/IG1lc3NhZ2UgOiBodG1sKG1lc3NhZ2UpKSArIFwiPC9kaXY+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWZvb3RlciB1ay10ZXh0LXJpZ2h0XFxcIj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1kZWZhdWx0IHVrLW1vZGFsLWNsb3NlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPlwiICsgKGxhYmVscy5jYW5jZWwpICsgXCI8L2J1dHRvbj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1wcmltYXJ5XFxcIiBhdXRvZm9jdXM+XCIgKyAobGFiZWxzLm9rKSArIFwiPC9idXR0b24+IDwvZGl2PiA8L2Zvcm0+XCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkZWZlcnJlZCkgeyByZXR1cm4gZGVmZXJyZWQucmVqZWN0KCk7IH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBtb2RhbC5wcm9tcHQgPSBmdW5jdGlvbiAobWVzc2FnZSwgdmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wZW5EaWFsb2coXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVscyA9IHJlZi5sYWJlbHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXCI8Zm9ybSBjbGFzcz1cXFwidWstZm9ybS1zdGFja2VkXFxcIj4gPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtYm9keVxcXCI+IDxsYWJlbD5cIiArIChpc1N0cmluZyhtZXNzYWdlKSA/IG1lc3NhZ2UgOiBodG1sKG1lc3NhZ2UpKSArIFwiPC9sYWJlbD4gPGlucHV0IGNsYXNzPVxcXCJ1ay1pbnB1dFxcXCIgdmFsdWU9XFxcIlwiICsgKHZhbHVlIHx8ICcnKSArIFwiXFxcIiBhdXRvZm9jdXM+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1mb290ZXIgdWstdGV4dC1yaWdodFxcXCI+IDxidXR0b24gY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tZGVmYXVsdCB1ay1tb2RhbC1jbG9zZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIj5cIiArIChsYWJlbHMuY2FuY2VsKSArIFwiPC9idXR0b24+IDxidXR0b24gY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tcHJpbWFyeVxcXCI+XCIgKyAobGFiZWxzLm9rKSArIFwiPC9idXR0b24+IDwvZGl2PiA8L2Zvcm0+XCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkZWZlcnJlZCkgeyByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZShudWxsKTsgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkaWFsb2cpIHsgcmV0dXJuICQoJ2lucHV0JywgZGlhbG9nLiRlbCkudmFsdWU7IH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBtb2RhbC5sYWJlbHMgPSB7XHJcbiAgICAgICAgICAgIG9rOiAnT2snLFxyXG4gICAgICAgICAgICBjYW5jZWw6ICdDYW5jZWwnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3BlbkRpYWxvZyh0bXBsLCBvcHRpb25zLCBoaWRlRm4sIHN1Ym1pdEZuKSB7XHJcblxyXG4gICAgICAgICAgICBvcHRpb25zID0gYXNzaWduKHtiZ0Nsb3NlOiBmYWxzZSwgZXNjQ2xvc2U6IHRydWUsIGxhYmVsczogbW9kYWwubGFiZWxzfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGlhbG9nID0gbW9kYWwuZGlhbG9nKHRtcGwob3B0aW9ucyksIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXNvbHZlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgb24oZGlhbG9nLiRlbCwgJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc3VibWl0Rm4gJiYgc3VibWl0Rm4oZGlhbG9nKSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkaWFsb2cuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG9uKGRpYWxvZy4kZWwsICdoaWRlJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gIXJlc29sdmVkICYmIGhpZGVGbihkZWZlcnJlZCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgZGVmZXJyZWQucHJvbWlzZS5kaWFsb2cgPSBkaWFsb2c7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHZhciBuYXYgPSB7XHJcblxyXG4gICAgICAgIGV4dGVuZHM6IEFjY29yZGlvbixcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0YXJnZXRzOiAnPiAudWstcGFyZW50JyxcclxuICAgICAgICAgICAgdG9nZ2xlOiAnPiBhJyxcclxuICAgICAgICAgICAgY29udGVudDogJz4gdWwnXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIG5hdkl0ZW0gPSAnLnVrLW5hdmJhci1uYXYgPiBsaSA+IGEsIC51ay1uYXZiYXItaXRlbSwgLnVrLW5hdmJhci10b2dnbGUnO1xyXG5cclxuICAgIHZhciBuYXZiYXIgPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0NsYXNzLCBDb250YWluZXIsIEZsZXhCdWddLFxyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBkcm9wZG93bjogU3RyaW5nLFxyXG4gICAgICAgICAgICBtb2RlOiAnbGlzdCcsXHJcbiAgICAgICAgICAgIGFsaWduOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIG9mZnNldDogTnVtYmVyLFxyXG4gICAgICAgICAgICBib3VuZGFyeTogQm9vbGVhbixcclxuICAgICAgICAgICAgYm91bmRhcnlBbGlnbjogQm9vbGVhbixcclxuICAgICAgICAgICAgY2xzRHJvcDogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWxheVNob3c6IE51bWJlcixcclxuICAgICAgICAgICAgZGVsYXlIaWRlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIGRyb3BiYXI6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRyb3BiYXJNb2RlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRyb3BiYXJBbmNob3I6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBOdW1iZXJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duOiBuYXZJdGVtLFxyXG4gICAgICAgICAgICBhbGlnbjogIWlzUnRsID8gJ2xlZnQnIDogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgY2xzRHJvcDogJ3VrLW5hdmJhci1kcm9wZG93bicsXHJcbiAgICAgICAgICAgIG1vZGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgb2Zmc2V0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGRlbGF5U2hvdzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBkZWxheUhpZGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgYm91bmRhcnlBbGlnbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBmbGlwOiAneCcsXHJcbiAgICAgICAgICAgIGJvdW5kYXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICBkcm9wYmFyOiBmYWxzZSxcclxuICAgICAgICAgICAgZHJvcGJhck1vZGU6ICdzbGlkZScsXHJcbiAgICAgICAgICAgIGRyb3BiYXJBbmNob3I6IGZhbHNlLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICBmb3JjZUhlaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgc2VsTWluSGVpZ2h0OiBuYXZJdGVtLFxyXG4gICAgICAgICAgICBjb250YWluZXI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIGJvdW5kYXJ5OiBmdW5jdGlvbihyZWYsICRlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kYXJ5ID0gcmVmLmJvdW5kYXJ5O1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kYXJ5QWxpZ24gPSByZWYuYm91bmRhcnlBbGlnbjtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGJvdW5kYXJ5ID09PSB0cnVlIHx8IGJvdW5kYXJ5QWxpZ24pID8gJGVsIDogYm91bmRhcnk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkcm9wYmFyQW5jaG9yOiBmdW5jdGlvbihyZWYsICRlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRyb3BiYXJBbmNob3IgPSByZWYuZHJvcGJhckFuY2hvcjtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkoZHJvcGJhckFuY2hvciwgJGVsKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBvczogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxpZ24gPSByZWYuYWxpZ247XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcImJvdHRvbS1cIiArIGFsaWduKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGRyb3BiYXI6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkcm9wYmFyID0gcmVmLmRyb3BiYXI7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRyb3BiYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkcm9wYmFyID0gdGhpcy5fZHJvcGJhciB8fCBxdWVyeShkcm9wYmFyLCB0aGlzLiRlbCkgfHwgJCgnKyAudWstbmF2YmFyLWRyb3BiYXInLCB0aGlzLiRlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkcm9wYmFyID8gZHJvcGJhciA6ICh0aGlzLl9kcm9wYmFyID0gJCgnPGRpdj48L2Rpdj4nKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB3YXRjaDogZnVuY3Rpb24oZHJvcGJhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGRyb3BiYXIsICd1ay1uYXZiYXItZHJvcGJhcicpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBpbW1lZGlhdGU6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkcm9wQ29udGFpbmVyOiBmdW5jdGlvbihfLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lciB8fCAkZWw7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkcm9wZG93bnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsc0Ryb3AgPSByZWYuY2xzRHJvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRyb3Bkb3ducyA9ICQkKChcIi5cIiArIGNsc0Ryb3ApLCAkZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIgIT09ICRlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkJCgoXCIuXCIgKyBjbHNEcm9wKSwgdGhpcy5jb250YWluZXIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhaW5jbHVkZXMoZHJvcGRvd25zLCBlbCkgJiYgZHJvcGRvd25zLnB1c2goZWwpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkcm9wZG93bnM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbihkcm9wZG93bnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kY3JlYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZHJvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3ducy5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhdGhpcyQxLmdldERyb3Bkb3duKGVsKTsgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbih7fSwgdGhpcy4kcHJvcHMsIHtib3VuZGFyeTogdGhpcy5ib3VuZGFyeSwgcG9zOiB0aGlzLnBvcywgb2Zmc2V0OiB0aGlzLmRyb3BiYXIgfHwgdGhpcy5vZmZzZXR9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRyb3BiYXIgJiYgcmVtb3ZlJDEodGhpcy5kcm9wYmFyKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2Ryb3BiYXI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnbW91c2VvdmVyJyxcclxuXHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcmVmLmN1cnJlbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmUgJiYgYWN0aXZlLnRhcmdldCAmJiAhd2l0aGluKGFjdGl2ZS50YXJnZXQsIGN1cnJlbnQpICYmICFhY3RpdmUudHJhY2tlci5tb3Zlc1RvKGFjdGl2ZS4kZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ21vdXNlbGVhdmUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcm9wYmFyO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZSAmJiAhdGhpcy5kcm9wZG93bnMuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIG1hdGNoZXMoZWwsICc6aG92ZXInKTsgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3Jlc2hvdycsXHJcblxyXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyb3BDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGJhcjtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFyZW50KHRoaXMuZHJvcGJhcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIodGhpcy5kcm9wYmFyQW5jaG9yIHx8IHRoaXMuJGVsLCB0aGlzLmRyb3BiYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hvdycsXHJcblxyXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyb3BDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGJhcjtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oXywgcmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbCA9IHJlZi4kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpciA9IHJlZi5kaXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzQ2xhc3MoJGVsLCB0aGlzLmNsc0Ryb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyb3BiYXJNb2RlID09PSAnc2xpZGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZHJvcGJhciwgJ3VrLW5hdmJhci1kcm9wYmFyLXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc0Ryb3AgJiYgYWRkQ2xhc3MoJGVsLCAoKHRoaXMuY2xzRHJvcCkgKyBcIi1kcm9wYmFyXCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oJGVsLm9mZnNldEhlaWdodCArIHRvRmxvYXQoY3NzKCRlbCwgJ21hcmdpblRvcCcpKSArIHRvRmxvYXQoY3NzKCRlbCwgJ21hcmdpbkJvdHRvbScpKSwgJGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3JlaGlkZScsXHJcblxyXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyb3BDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGJhcjtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSwgcmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbCA9IHJlZi4kZWw7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXModGhpcy5kcm9wYmFyLCAnOmhvdmVyJykgJiYgYWN0aXZlICYmIGFjdGl2ZS4kZWwgPT09ICRlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcm9wQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyb3BiYXI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKF8sIHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwgPSByZWYuJGVsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc0NsYXNzKCRlbCwgdGhpcy5jbHNEcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUgfHwgYWN0aXZlICYmIGFjdGl2ZS4kZWwgPT09ICRlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25UbygwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgZ2V0QWN0aXZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmUkMSAmJiBpbmNsdWRlcyhhY3RpdmUkMS5tb2RlLCAnaG92ZXInKSAmJiB3aXRoaW4oYWN0aXZlJDEudGFyZ2V0LCB0aGlzLiRlbCkgJiYgYWN0aXZlJDE7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uVG86IGZ1bmN0aW9uKG5ld0hlaWdodCwgZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBkcm9wYmFyID0gcmVmLmRyb3BiYXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkSGVpZ2h0ID0gaXNWaXNpYmxlKGRyb3BiYXIpID8gaGVpZ2h0KGRyb3BiYXIpIDogMDtcclxuXHJcbiAgICAgICAgICAgICAgICBlbCA9IG9sZEhlaWdodCA8IG5ld0hlaWdodCAmJiBlbDtcclxuXHJcbiAgICAgICAgICAgICAgICBjc3MoZWwsICdjbGlwJywgKFwicmVjdCgwLFwiICsgKGVsLm9mZnNldFdpZHRoKSArIFwicHgsXCIgKyBvbGRIZWlnaHQgKyBcInB4LDApXCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQoZHJvcGJhciwgb2xkSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLmNhbmNlbChbZWwsIGRyb3BiYXJdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlJDEuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLnN0YXJ0KGRyb3BiYXIsIHtoZWlnaHQ6IG5ld0hlaWdodH0sIHRoaXMuZHVyYXRpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uc3RhcnQoZWwsIHtjbGlwOiAoXCJyZWN0KDAsXCIgKyAoZWwub2Zmc2V0V2lkdGgpICsgXCJweCxcIiArIG5ld0hlaWdodCArIFwicHgsMClcIil9LCB0aGlzLmR1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2gobm9vcClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyhlbCwge2NsaXA6ICcnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS4kdXBkYXRlKGRyb3BiYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZ2V0RHJvcGRvd246IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZ2V0Q29tcG9uZW50KGVsLCAnZHJvcCcpIHx8IHRoaXMuJGdldENvbXBvbmVudChlbCwgJ2Ryb3Bkb3duJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9mZmNhbnZhcyA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbTW9kYWxdLFxyXG5cclxuICAgICAgICBhcmdzOiAnbW9kZScsXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIG1vZGU6IFN0cmluZyxcclxuICAgICAgICAgICAgZmxpcDogQm9vbGVhbixcclxuICAgICAgICAgICAgb3ZlcmxheTogQm9vbGVhblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbW9kZTogJ3NsaWRlJyxcclxuICAgICAgICAgICAgZmxpcDogZmFsc2UsXHJcbiAgICAgICAgICAgIG92ZXJsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbHNQYWdlOiAndWstb2ZmY2FudmFzLXBhZ2UnLFxyXG4gICAgICAgICAgICBjbHNDb250YWluZXI6ICd1ay1vZmZjYW52YXMtY29udGFpbmVyJyxcclxuICAgICAgICAgICAgc2VsUGFuZWw6ICcudWstb2ZmY2FudmFzLWJhcicsXHJcbiAgICAgICAgICAgIGNsc0ZsaXA6ICd1ay1vZmZjYW52YXMtZmxpcCcsXHJcbiAgICAgICAgICAgIGNsc0NvbnRhaW5lckFuaW1hdGlvbjogJ3VrLW9mZmNhbnZhcy1jb250YWluZXItYW5pbWF0aW9uJyxcclxuICAgICAgICAgICAgY2xzU2lkZWJhckFuaW1hdGlvbjogJ3VrLW9mZmNhbnZhcy1iYXItYW5pbWF0aW9uJyxcclxuICAgICAgICAgICAgY2xzTW9kZTogJ3VrLW9mZmNhbnZhcycsXHJcbiAgICAgICAgICAgIGNsc092ZXJsYXk6ICd1ay1vZmZjYW52YXMtb3ZlcmxheScsXHJcbiAgICAgICAgICAgIHNlbENsb3NlOiAnLnVrLW9mZmNhbnZhcy1jbG9zZScsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgY2xzRmxpcDogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmxpcCA9IHJlZi5mbGlwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsc0ZsaXAgPSByZWYuY2xzRmxpcDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxpcCA/IGNsc0ZsaXAgOiAnJztcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNsc092ZXJsYXk6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXkgPSByZWYub3ZlcmxheTtcclxuICAgICAgICAgICAgICAgIHZhciBjbHNPdmVybGF5ID0gcmVmLmNsc092ZXJsYXk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJsYXkgPyBjbHNPdmVybGF5IDogJyc7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjbHNNb2RlOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2RlID0gcmVmLm1vZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xzTW9kZSA9IHJlZi5jbHNNb2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAoY2xzTW9kZSArIFwiLVwiICsgbW9kZSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjbHNTaWRlYmFyQW5pbWF0aW9uOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2RlID0gcmVmLm1vZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xzU2lkZWJhckFuaW1hdGlvbiA9IHJlZi5jbHNTaWRlYmFyQW5pbWF0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlID09PSAnbm9uZScgfHwgbW9kZSA9PT0gJ3JldmVhbCcgPyAnJyA6IGNsc1NpZGViYXJBbmltYXRpb247XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjbHNDb250YWluZXJBbmltYXRpb246IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vZGUgPSByZWYubW9kZTtcclxuICAgICAgICAgICAgICAgIHZhciBjbHNDb250YWluZXJBbmltYXRpb24gPSByZWYuY2xzQ29udGFpbmVyQW5pbWF0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlICE9PSAncHVzaCcgJiYgbW9kZSAhPT0gJ3JldmVhbCcgPyAnJyA6IGNsc0NvbnRhaW5lckFuaW1hdGlvbjtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25FbGVtZW50OiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2RlID0gcmVmLm1vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdyZXZlYWwnID8gcGFyZW50KHRoaXMucGFuZWwpIDogdGhpcy5wYW5lbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGU6IHtcclxuXHJcbiAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkgJiYgIWlzVmlzaWJsZSh0aGlzLiRlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGV2ZW50czogWydyZXNpemUnXVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBldmVudHM6IFtcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FbaHJlZl49XCIjXCJdJztcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc2ggPSByZWYuY3VycmVudC5oYXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0UHJldmVudGVkID0gcmVmLmRlZmF1bHRQcmV2ZW50ZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGVmYXVsdFByZXZlbnRlZCAmJiBoYXNoICYmICQoaGFzaCwgZG9jdW1lbnQuYm9keSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICd0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbDtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldFRvdWNoZXMgPSByZWYudGFyZ2V0VG91Y2hlcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFkgPSB0YXJnZXRUb3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndG91Y2htb3ZlJyxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcGFzc2l2ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5jYW5jZWxhYmxlICYmIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndG91Y2htb3ZlJyxcclxuXHJcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFuZWw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggIT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudFkgPSBlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSAtIHRoaXMuY2xpZW50WTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcy5wYW5lbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gcmVmLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gcmVmLnNjcm9sbEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gcmVmLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudEhlaWdodCA+PSBzY3JvbGxIZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgc2Nyb2xsVG9wID09PSAwICYmIGNsaWVudFkgPiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHNjcm9sbEhlaWdodCAtIHNjcm9sbFRvcCA8PSBjbGllbnRIZWlnaHQgJiYgY2xpZW50WSA8IDBcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5jYW5jZWxhYmxlICYmIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdzaG93JyxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAncmV2ZWFsJyAmJiAhaGFzQ2xhc3MocGFyZW50KHRoaXMucGFuZWwpLCB0aGlzLmNsc01vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBBbGwodGhpcy5wYW5lbCwgJzxkaXY+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHBhcmVudCh0aGlzLnBhbmVsKSwgdGhpcy5jbHNNb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNzcyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdvdmVyZmxvd1knLCB0aGlzLm92ZXJsYXkgPyAnaGlkZGVuJyA6ICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCB0aGlzLmNsc0NvbnRhaW5lciwgdGhpcy5jbHNGbGlwKTtcclxuICAgICAgICAgICAgICAgICAgICBjc3MoZG9jdW1lbnQuYm9keSwgJ3RvdWNoLWFjdGlvbicsICdwYW4teSBwaW5jaC16b29tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc092ZXJsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMucGFuZWwsIHRoaXMuY2xzU2lkZWJhckFuaW1hdGlvbiwgdGhpcy5tb2RlICE9PSAncmV2ZWFsJyA/IHRoaXMuY2xzTW9kZSA6ICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0KGRvY3VtZW50LmJvZHkpOyAvLyBmb3JjZSByZWZsb3dcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2N1bWVudC5ib2R5LCB0aGlzLmNsc0NvbnRhaW5lckFuaW1hdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzQ29udGFpbmVyQW5pbWF0aW9uICYmIHN1cHByZXNzVXNlclNjYWxlKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdoaWRlJyxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIHRoaXMuY2xzQ29udGFpbmVyQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBjc3MoZG9jdW1lbnQuYm9keSwgJ3RvdWNoLWFjdGlvbicsICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdoaWRkZW4nLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzQ29udGFpbmVyQW5pbWF0aW9uICYmIHJlc3VtZVVzZXJTY2FsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAncmV2ZWFsJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bndyYXAodGhpcy5wYW5lbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLnBhbmVsLCB0aGlzLmNsc1NpZGViYXJBbmltYXRpb24sIHRoaXMuY2xzTW9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzT3ZlcmxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnZGlzcGxheScsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCB0aGlzLmNsc0NvbnRhaW5lciwgdGhpcy5jbHNGbGlwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ292ZXJmbG93WScsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3dpcGVMZWZ0IHN3aXBlUmlnaHQnLFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkgJiYgZW5kc1dpdGgoZS50eXBlLCAnTGVmdCcpIF4gdGhpcy5mbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2hyb21lIGluIHJlc3BvbnNpdmUgbW9kZSB6b29tcyBwYWdlIHVwb24gb3BlbmluZyBvZmZjYW52YXNcclxuICAgIGZ1bmN0aW9uIHN1cHByZXNzVXNlclNjYWxlKCkge1xyXG4gICAgICAgIGdldFZpZXdwb3J0KCkuY29udGVudCArPSAnLHVzZXItc2NhbGFibGU9MCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzdW1lVXNlclNjYWxlKCkge1xyXG4gICAgICAgIHZhciB2aWV3cG9ydCA9IGdldFZpZXdwb3J0KCk7XHJcbiAgICAgICAgdmlld3BvcnQuY29udGVudCA9IHZpZXdwb3J0LmNvbnRlbnQucmVwbGFjZSgvLHVzZXItc2NhbGFibGU9MCQvLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Vmlld3BvcnQoKSB7XHJcbiAgICAgICAgcmV0dXJuICQoJ21ldGFbbmFtZT1cInZpZXdwb3J0XCJdJywgZG9jdW1lbnQuaGVhZCkgfHwgYXBwZW5kKGRvY3VtZW50LmhlYWQsICc8bWV0YSBuYW1lPVwidmlld3BvcnRcIj4nKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgb3ZlcmZsb3dBdXRvID0ge1xyXG5cclxuICAgICAgICBtaXhpbnM6IFtDbGFzc10sXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHNlbENvbnRhaW5lcjogU3RyaW5nLFxyXG4gICAgICAgICAgICBzZWxDb250ZW50OiBTdHJpbmcsXHJcbiAgICAgICAgICAgIG1pbkhlaWdodDogTnVtYmVyLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgc2VsQ29udGFpbmVyOiAnLnVrLW1vZGFsJyxcclxuICAgICAgICAgICAgc2VsQ29udGVudDogJy51ay1tb2RhbC1kaWFsb2cnLFxyXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IDE1MCxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyOiBmdW5jdGlvbihyZWYsICRlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbENvbnRhaW5lciA9IHJlZi5zZWxDb250YWluZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb3Nlc3QoJGVsLCBzZWxDb250YWluZXIpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY29udGVudDogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxDb250ZW50ID0gcmVmLnNlbENvbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb3Nlc3QoJGVsLCBzZWxDb250ZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjc3ModGhpcy4kZWwsICdtaW5IZWlnaHQnLCB0aGlzLm1pbkhlaWdodCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGVudCB8fCAhdGhpcy5jb250YWluZXIgfHwgIWlzVmlzaWJsZSh0aGlzLiRlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiB0b0Zsb2F0KGNzcyh0aGlzLiRlbCwgJ21heEhlaWdodCcpKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IE1hdGgubWF4KHRoaXMubWluSGVpZ2h0LCBoZWlnaHQodGhpcy5jb250YWluZXIpIC0gKGRpbWVuc2lvbnModGhpcy5jb250ZW50KS5oZWlnaHQgLSBoZWlnaHQodGhpcy4kZWwpKSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHJlZi5jdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIG1heCA9IHJlZi5tYXg7XHJcblxyXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnbWF4SGVpZ2h0JywgbWF4KTtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLnJvdW5kKGN1cnJlbnQpICE9PSBNYXRoLnJvdW5kKG1heCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAncmVzaXplJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHJlc3BvbnNpdmUgPSB7XHJcblxyXG4gICAgICAgIHByb3BzOiBbJ3dpZHRoJywgJ2hlaWdodCddLFxyXG5cclxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgJ3VrLXJlc3BvbnNpdmUtd2lkdGgnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGU6IHtcclxuXHJcbiAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVmlzaWJsZSh0aGlzLiRlbCkgJiYgdGhpcy53aWR0aCAmJiB0aGlzLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgID8ge3dpZHRoOiB3aWR0aChwYXJlbnQodGhpcy4kZWwpKSwgaGVpZ2h0OiB0aGlzLmhlaWdodH1cclxuICAgICAgICAgICAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGRpbSkge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMuJGVsLCBEaW1lbnNpb25zLmNvbnRhaW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcclxuICAgICAgICAgICAgICAgIH0sIGRpbSkuaGVpZ2h0KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGV2ZW50czogWydyZXNpemUnXVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc2Nyb2xsID0ge1xyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBvZmZzZXQ6IE51bWJlclxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb2Zmc2V0OiAwXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsVG86IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZWwgPSBlbCAmJiAkKGVsKSB8fCBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0cmlnZ2VyKHRoaXMuJGVsLCAnYmVmb3Jlc2Nyb2xsJywgW3RoaXMsIGVsXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxJbnRvVmlldyhlbCwge29mZnNldDogdGhpcy5vZmZzZXR9KS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRyaWdnZXIodGhpcyQxLiRlbCwgJ3Njcm9sbGVkJywgW3RoaXMkMSwgZWxdKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czoge1xyXG5cclxuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG8oKFwiI1wiICsgKGVzY2FwZShkZWNvZGVVUklDb21wb25lbnQoKHRoaXMuJGVsLmhhc2ggfHwgJycpLnN1YnN0cigxKSkpKSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzdGF0ZUtleSA9ICdfdWtTY3JvbGxzcHknO1xyXG4gICAgdmFyIHNjcm9sbHNweSA9IHtcclxuXHJcbiAgICAgICAgYXJnczogJ2NscycsXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGNsczogU3RyaW5nLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IFN0cmluZyxcclxuICAgICAgICAgICAgaGlkZGVuOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBvZmZzZXRUb3A6IE51bWJlcixcclxuICAgICAgICAgICAgb2Zmc2V0TGVmdDogTnVtYmVyLFxyXG4gICAgICAgICAgICByZXBlYXQ6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlbGF5OiBOdW1iZXJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xyXG4gICAgICAgICAgICBjbHM6IGZhbHNlLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldFRvcDogMCxcclxuICAgICAgICAgICAgb2Zmc2V0TGVmdDogMCxcclxuICAgICAgICAgICAgcmVwZWF0OiBmYWxzZSxcclxuICAgICAgICAgICAgZGVsYXk6IDAsXHJcbiAgICAgICAgICAgIGluVmlld0NsYXNzOiAndWstc2Nyb2xsc3B5LWludmlldydcclxuICAgICAgICB9KTsgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnRzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihyZWYsICRlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0ID8gJCQodGFyZ2V0LCAkZWwpIDogWyRlbF07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbihlbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoZmlsdGVyJDEoZWxlbWVudHMsIChcIjpub3QoLlwiICsgKHRoaXMuaW5WaWV3Q2xhc3MpICsgXCIpXCIpKSwgJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBpbW1lZGlhdGU6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhlbCwgdGhpcyQxLmluVmlld0NsYXNzLCBlbFtzdGF0ZUtleV0gPyBlbFtzdGF0ZUtleV0uY2xzIDogJycpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVsW3N0YXRlS2V5XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24oZGF0YSQxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMZXQgY2hpbGQgY29tcG9uZW50cyBiZSBhcHBsaWVkIGF0IGxlYXN0IG9uY2UgZmlyc3RcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEkMS51cGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZSQxLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS4kZW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSQxLnVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVsW3N0YXRlS2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxbc3RhdGVLZXldID0ge2NsczogZGF0YShlbCwgJ3VrLXNjcm9sbHNweS1jbGFzcycpIHx8IHRoaXMkMS5jbHN9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbFtzdGF0ZUtleV0uc2hvdyA9IGlzSW5WaWV3KGVsLCB0aGlzJDEub2Zmc2V0VG9wLCB0aGlzJDEub2Zmc2V0TGVmdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IGVsW3N0YXRlS2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5zaG93ICYmICFzdGF0ZS5pbnZpZXcgJiYgIXN0YXRlLnF1ZXVlZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnF1ZXVlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wcm9taXNlID0gKGRhdGEucHJvbWlzZSB8fCBQcm9taXNlJDEucmVzb2x2ZSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIHNldFRpbWVvdXQocmVzb2x2ZSwgdGhpcyQxLmRlbGF5KTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnRvZ2dsZShlbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnF1ZXVlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuJGVtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZS5zaG93ICYmIHN0YXRlLmludmlldyAmJiAhc3RhdGUucXVldWVkICYmIHRoaXMkMS5yZXBlYXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEudG9nZ2xlKGVsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ3Njcm9sbCcsICdyZXNpemUnXVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uKGVsLCBpbnZpZXcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBlbFtzdGF0ZUtleV07XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUub2ZmICYmIHN0YXRlLm9mZigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNzcyhlbCwgJ3Zpc2liaWxpdHknLCAhaW52aWV3ICYmIHRoaXMuaGlkZGVuID8gJ2hpZGRlbicgOiAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZWwsIHRoaXMuaW5WaWV3Q2xhc3MsIGludmlldyk7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgc3RhdGUuY2xzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoL1xcYnVrLWFuaW1hdGlvbi0vLnRlc3Qoc3RhdGUuY2xzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLm9mZiA9IG9uY2UoZWwsICdhbmltYXRpb25jYW5jZWwgYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlQ2xhc3NlcyhlbCwgJ3VrLWFuaW1hdGlvbi1bXFxcXHctXSsnKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcihlbCwgaW52aWV3ID8gJ2ludmlldycgOiAnb3V0dmlldycpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0YXRlLmludmlldyA9IGludmlldztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLiR1cGRhdGUoZWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzY3JvbGxzcHlOYXYgPSB7XHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGNsczogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbG9zZXN0OiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHNjcm9sbDogQm9vbGVhbixcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIG9mZnNldDogTnVtYmVyXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBjbHM6ICd1ay1hY3RpdmUnLFxyXG4gICAgICAgICAgICBjbG9zZXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgc2Nyb2xsOiBmYWxzZSxcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogMFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgICAgICBsaW5rczoge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oXywgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQkKCdhW2hyZWZePVwiI1wiXScsICRlbCkuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuaGFzaDsgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbihsaW5rcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRjcmVhdGUoJ3Njcm9sbCcsIGxpbmtzLCB7b2Zmc2V0OiB0aGlzLm9mZnNldCB8fCAwfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBpbW1lZGlhdGU6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB0YXJnZXRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkJCh0aGlzLmxpbmtzLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVzY2FwZShlbC5oYXNoKS5zdWJzdHIoMSk7IH0pLmpvaW4oJywnKSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBlbGVtZW50czogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSByZWYuY2xvc2VzdDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvc2VzdCh0aGlzLmxpbmtzLCBzZWxlY3RvciB8fCAnKicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZTogW1xyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXMudGFyZ2V0cztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gcmVmLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsZW5ndGggfHwgIWlzVmlzaWJsZSh0aGlzLiRlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiQxID0gc2Nyb2xsUGFyZW50cyh0aGlzLnRhcmdldHMsIC9hdXRvfHNjcm9sbC8sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxFbGVtZW50ID0gcmVmJDFbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBzY3JvbGxFbGVtZW50LnNjcm9sbEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4ID0gc2Nyb2xsSGVpZ2h0IC0gZ2V0Vmlld3BvcnRDbGllbnRIZWlnaHQoc2Nyb2xsRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsVG9wID09PSBtYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gbGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRzLmV2ZXJ5KGZ1bmN0aW9uIChlbCwgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldChlbCkudG9wIC0gb2Zmc2V0KGdldFZpZXdwb3J0JDEoc2Nyb2xsRWxlbWVudCkpLnRvcCAtIHRoaXMkMS5vZmZzZXQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZSA9PT0gZmFsc2UgJiYgdGhpcy5vdmVyZmxvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHthY3RpdmU6IGFjdGl2ZX07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gcmVmLmFjdGl2ZTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gYWN0aXZlICE9PSBmYWxzZSAmJiAhaGFzQ2xhc3ModGhpcy5lbGVtZW50c1thY3RpdmVdLCB0aGlzLmNscyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmJsdXIoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50cywgdGhpcy5jbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuZWxlbWVudHNbYWN0aXZlXSwgdGhpcy5jbHMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnYWN0aXZlJywgW2FjdGl2ZSwgdGhpcy5lbGVtZW50c1thY3RpdmVdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJywgJ3Jlc2l6ZSddXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzdGlja3kgPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0NsYXNzLCBNZWRpYV0sXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHRvcDogbnVsbCxcclxuICAgICAgICAgICAgYm90dG9tOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IFN0cmluZyxcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGNsc0FjdGl2ZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbHNJbmFjdGl2ZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbHNGaXhlZDogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbHNCZWxvdzogU3RyaW5nLFxyXG4gICAgICAgICAgICBzZWxUYXJnZXQ6IFN0cmluZyxcclxuICAgICAgICAgICAgd2lkdGhFbGVtZW50OiBCb29sZWFuLFxyXG4gICAgICAgICAgICBzaG93T25VcDogQm9vbGVhbixcclxuICAgICAgICAgICAgdGFyZ2V0T2Zmc2V0OiBOdW1iZXJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgYm90dG9tOiBmYWxzZSxcclxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICBhbmltYXRpb246ICcnLFxyXG4gICAgICAgICAgICBjbHNBY3RpdmU6ICd1ay1hY3RpdmUnLFxyXG4gICAgICAgICAgICBjbHNJbmFjdGl2ZTogJycsXHJcbiAgICAgICAgICAgIGNsc0ZpeGVkOiAndWstc3RpY2t5LWZpeGVkJyxcclxuICAgICAgICAgICAgY2xzQmVsb3c6ICd1ay1zdGlja3ktYmVsb3cnLFxyXG4gICAgICAgICAgICBzZWxUYXJnZXQ6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aEVsZW1lbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93T25VcDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhcmdldE9mZnNldDogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgb2Zmc2V0OiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSByZWYub2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0b1B4KG9mZnNldCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBzZWxUYXJnZXQ6IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsVGFyZ2V0ID0gcmVmLnNlbFRhcmdldDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsVGFyZ2V0ICYmICQoc2VsVGFyZ2V0LCAkZWwpIHx8ICRlbDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHdpZHRoRWxlbWVudDogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciB3aWR0aEVsZW1lbnQgPSByZWYud2lkdGhFbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeSh3aWR0aEVsZW1lbnQsICRlbCkgfHwgdGhpcy5wbGFjZWhvbGRlcjtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGlzQWN0aXZlOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzQ2xhc3ModGhpcy5zZWxUYXJnZXQsIHRoaXMuY2xzQWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiAhdGhpcy5pc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlQ2xhc3ModGhpcy5zZWxUYXJnZXQsIHRoaXMuY2xzSW5hY3RpdmUsIHRoaXMuY2xzQWN0aXZlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlICYmICFoYXNDbGFzcyh0aGlzLnNlbFRhcmdldCwgdGhpcy5jbHNJbmFjdGl2ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNsYXNzKHRoaXMuc2VsVGFyZ2V0LCB0aGlzLmNsc0FjdGl2ZSwgdGhpcy5jbHNJbmFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdpbmFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICQoJysgLnVrLXN0aWNreS1wbGFjZWhvbGRlcicsIHRoaXMuJGVsKSB8fCAkKCc8ZGl2IGNsYXNzPVwidWstc3RpY2t5LXBsYWNlaG9sZGVyXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaXhlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRml4ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5zZWxUYXJnZXQsIHRoaXMuY2xzSW5hY3RpdmUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZW1vdmUkMSh0aGlzLnBsYWNlaG9sZGVyKTtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGhFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBldmVudHM6IFtcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnbG9hZCBoYXNoY2hhbmdlIHBvcHN0YXRlJyxcclxuXHJcbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdztcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0aGlzLnRhcmdldE9mZnNldCAhPT0gZmFsc2UgJiYgbG9jYXRpb24uaGFzaCAmJiB3aW5kb3cucGFnZVlPZmZzZXQgPiAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChsb2NhdGlvbi5oYXNoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXN0ZG9tLnJlYWQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSBvZmZzZXQodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3AgPSByZWYudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsVG9wID0gb2Zmc2V0KHRoaXMkMS4kZWwpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbEhlaWdodCA9IHRoaXMkMS4kZWwub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuaXNGaXhlZCAmJiBlbFRvcCArIGVsSGVpZ2h0ID49IHRvcCAmJiBlbFRvcCA8PSB0b3AgKyB0YXJnZXQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wKHdpbmRvdywgdG9wIC0gZWxIZWlnaHQgLSAoaXNOdW1lcmljKHRoaXMkMS50YXJnZXRPZmZzZXQpID8gdGhpcyQxLnRhcmdldE9mZnNldCA6IDApIC0gdGhpcyQxLm9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICB1cGRhdGU6IFtcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbihyZWYsIHR5cGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5oZWlnaHQ7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluYWN0aXZlID0gIXRoaXMubWF0Y2hNZWRpYSB8fCAhaXNWaXNpYmxlKHRoaXMuJGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdHlwZXMuaGFzKCdyZXNpemUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy4kZWwub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9ICF0aGlzLmlzQWN0aXZlID8gdGhpcy4kZWwub2Zmc2V0SGVpZ2h0IDogaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcE9mZnNldCA9IG9mZnNldCh0aGlzLmlzRml4ZWQgPyB0aGlzLnBsYWNlaG9sZGVyIDogdGhpcy4kZWwpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbU9mZnNldCA9IHRoaXMudG9wT2Zmc2V0ICsgaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYm90dG9tID0gcGFyc2VQcm9wKCdib3R0b20nLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3AgPSBNYXRoLm1heCh0b0Zsb2F0KHBhcnNlUHJvcCgndG9wJywgdGhpcykpLCB0aGlzLnRvcE9mZnNldCkgLSB0aGlzLm9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbSAmJiBib3R0b20gLSB0aGlzLiRlbC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IGRpbWVuc2lvbnMoaXNWaXNpYmxlKHRoaXMud2lkdGhFbGVtZW50KSA/IHRoaXMud2lkdGhFbGVtZW50IDogdGhpcy4kZWwpLndpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBvZmZzZXRQb3NpdGlvbih0aGlzLnBsYWNlaG9sZGVyKVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luczogY3NzKHRoaXMuJGVsLCBbJ21hcmdpblRvcCcsICdtYXJnaW5Cb3R0b20nLCAnbWFyZ2luTGVmdCcsICdtYXJnaW5SaWdodCddKVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcmVmLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWFyZ2lucyA9IHJlZi5tYXJnaW5zO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiQxID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSByZWYkMS5wbGFjZWhvbGRlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzKHBsYWNlaG9sZGVyLCBhc3NpZ24oe2hlaWdodDogaGVpZ2h0fSwgbWFyZ2lucykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXdpdGhpbihwbGFjZWhvbGRlciwgZG9jdW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyKHRoaXMuJGVsLCBwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gISF0aGlzLmlzQWN0aXZlOyAvLyBmb3JjZSBzZWxmLWFzc2lnblxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ3Jlc2l6ZSddXHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSByZWYuc2Nyb2xsOyBpZiAoIHNjcm9sbCA9PT0gdm9pZCAwICkgc2Nyb2xsID0gMDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXI6IHNjcm9sbCA8PSB0aGlzLnNjcm9sbCA/ICdkb3duJyA6ICd1cCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbDogdGhpcy5zY3JvbGxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oZGF0YSwgdHlwZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1Njcm9sbFVwZGF0ZSA9IHR5cGVzLmhhcygnc2Nyb2xsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluaXRUaW1lc3RhbXAgPSBkYXRhLmluaXRUaW1lc3RhbXA7IGlmICggaW5pdFRpbWVzdGFtcCA9PT0gdm9pZCAwICkgaW5pdFRpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpciA9IGRhdGEuZGlyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0RGlyID0gZGF0YS5sYXN0RGlyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0U2Nyb2xsID0gZGF0YS5sYXN0U2Nyb2xsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSBkYXRhLnNjcm9sbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wID0gZGF0YS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubGFzdFNjcm9sbCA9IHNjcm9sbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA8IDAgfHwgc2Nyb2xsID09PSBsYXN0U2Nyb2xsICYmIGlzU2Nyb2xsVXBkYXRlIHx8IHRoaXMuc2hvd09uVXAgJiYgIWlzU2Nyb2xsVXBkYXRlICYmICF0aGlzLmlzRml4ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyAtIGluaXRUaW1lc3RhbXAgPiAzMDAgfHwgZGlyICE9PSBsYXN0RGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaW5pdFNjcm9sbCA9IHNjcm9sbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pbml0VGltZXN0YW1wID0gbm93O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5sYXN0RGlyID0gZGlyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93T25VcCAmJiAhdGhpcy5pc0ZpeGVkICYmIE1hdGguYWJzKGRhdGEuaW5pdFNjcm9sbCAtIHNjcm9sbCkgPD0gMzAgJiYgTWF0aC5hYnMobGFzdFNjcm9sbCAtIHNjcm9sbCkgPD0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5hY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgc2Nyb2xsIDwgdGhpcy50b3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5zaG93T25VcCAmJiAoc2Nyb2xsIDw9IHRoaXMudG9wIHx8IGRpciA9PT0gJ2Rvd24nICYmIGlzU2Nyb2xsVXBkYXRlIHx8IGRpciA9PT0gJ3VwJyAmJiAhdGhpcy5pc0ZpeGVkICYmIHNjcm9sbCA8PSB0aGlzLmJvdHRvbU9mZnNldClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0ZpeGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFuaW1hdGlvbi5pblByb2dyZXNzKHRoaXMuJGVsKSAmJiB0b3AgPiBzY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbmltYXRpb24uY2FuY2VsKHRoaXMuJGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNGaXhlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uICYmIHNjcm9sbCA+IHRoaXMudG9wT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbmltYXRpb24uY2FuY2VsKHRoaXMuJGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFuaW1hdGlvbi5vdXQodGhpcy4kZWwsIHRoaXMuYW5pbWF0aW9uKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5oaWRlKCk7IH0sIG5vb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRml4ZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFuaW1hdGlvbi5jYW5jZWwodGhpcy4kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQW5pbWF0aW9uLmluKHRoaXMuJGVsLCB0aGlzLmFuaW1hdGlvbikuY2F0Y2gobm9vcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGV2ZW50czogWydyZXNpemUnLCAnc2Nyb2xsJ11cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpeGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyLmhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0ZpeGVkLCB0aGlzLmNsc0JlbG93KTtcclxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwge3Bvc2l0aW9uOiAnJywgdG9wOiAnJywgd2lkdGg6ICcnfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyLmhpZGRlbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy50b3AgIT09IDAgfHwgdGhpcy5zY3JvbGwgPiB0aGlzLnRvcDtcclxuICAgICAgICAgICAgICAgIHZhciB0b3AgPSBNYXRoLm1heCgwLCB0aGlzLm9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTnVtZXJpYyh0aGlzLmJvdHRvbSkgJiYgdGhpcy5zY3JvbGwgPiB0aGlzLmJvdHRvbSAtIHRoaXMub2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gdGhpcy5ib3R0b20gLSB0aGlzLnNjcm9sbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6ICh0b3AgKyBcInB4XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzQmVsb3csIHRoaXMuc2Nyb2xsID4gdGhpcy5ib3R0b21PZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRml4ZWQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZVByb3AocHJvcCwgcmVmKSB7XHJcbiAgICAgICAgdmFyICRwcm9wcyA9IHJlZi4kcHJvcHM7XHJcbiAgICAgICAgdmFyICRlbCA9IHJlZi4kZWw7XHJcbiAgICAgICAgdmFyIHByb3BPZmZzZXQgPSByZWZbKHByb3AgKyBcIk9mZnNldFwiKV07XHJcblxyXG5cclxuICAgICAgICB2YXIgdmFsdWUgPSAkcHJvcHNbcHJvcF07XHJcblxyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS5tYXRjaCgvXi0/XFxkLykpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wT2Zmc2V0ICsgdG9QeCh2YWx1ZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2Zmc2V0KHZhbHVlID09PSB0cnVlID8gcGFyZW50KCRlbCkgOiBxdWVyeSh2YWx1ZSwgJGVsKSkuYm90dG9tO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIFN3aXRjaGVyID0ge1xyXG5cclxuICAgICAgICBtaXhpbnM6IFtUb2dnbGFibGVdLFxyXG5cclxuICAgICAgICBhcmdzOiAnY29ubmVjdCcsXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IFN0cmluZyxcclxuICAgICAgICAgICAgdG9nZ2xlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogTnVtYmVyLFxyXG4gICAgICAgICAgICBzd2lwaW5nOiBCb29sZWFuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBjb25uZWN0OiAnfi51ay1zd2l0Y2hlcicsXHJcbiAgICAgICAgICAgIHRvZ2dsZTogJz4gKiA+IDpmaXJzdC1jaGlsZCcsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogMCxcclxuICAgICAgICAgICAgc3dpcGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgY2xzOiAndWstYWN0aXZlJyxcclxuICAgICAgICAgICAgYXR0ckl0ZW06ICd1ay1zd2l0Y2hlci1pdGVtJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgICAgICBjb25uZWN0czoge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29ubmVjdCA9IHJlZi5jb25uZWN0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnlBbGwoY29ubmVjdCwgJGVsKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgd2F0Y2g6IGZ1bmN0aW9uKGNvbm5lY3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zd2lwaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyhjb25uZWN0cywgJ3RvdWNoLWFjdGlvbicsICdwYW4teSBwaW5jaC16b29tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gY2hpbGRyZW4oZWwpLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkLCBpKSB7IHJldHVybiB0b2dnbGVDbGFzcyhjaGlsZCwgdGhpcyQxLmNscywgaSA9PT0gaW5kZXgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7IH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdG9nZ2xlczoge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gcmVmLnRvZ2dsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQkKHRvZ2dsZSwgJGVsKS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhbWF0Y2hlcyhlbCwgJy51ay1kaXNhYmxlZCAqLCAudWstZGlzYWJsZWQsIFtkaXNhYmxlZF0nKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbih0b2dnbGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuaW5kZXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3cofmFjdGl2ZSA/IGFjdGl2ZSA6IHRvZ2dsZXNbdGhpcy5hY3RpdmVdIHx8IHRvZ2dsZXNbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBpbW1lZGlhdGU6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjaGlsZHJlbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRyZW4odGhpcy4kZWwpLmZpbHRlcihmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIHRoaXMkMS50b2dnbGVzLnNvbWUoZnVuY3Rpb24gKHRvZ2dsZSkgeyByZXR1cm4gd2l0aGluKHRvZ2dsZSwgY2hpbGQpOyB9KTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhlLmN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcIltcIiArICh0aGlzLmF0dHJJdGVtKSArIFwiXSxbZGF0YS1cIiArICh0aGlzLmF0dHJJdGVtKSArIFwiXVwiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coZGF0YShlLmN1cnJlbnQsIHRoaXMuYXR0ckl0ZW0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdzd2lwZVJpZ2h0IHN3aXBlTGVmdCcsXHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zd2lwaW5nO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdHM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhlbmRzV2l0aCh0eXBlLCAnTGVmdCcpID8gJ25leHQnIDogJ3ByZXZpb3VzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgaW5kZXg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRJbmRleCh0aGlzLmNoaWxkcmVuLCBmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGhhc0NsYXNzKGVsLCB0aGlzJDEuY2xzKTsgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSB0aGlzLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGdldEluZGV4KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5bZ2V0SW5kZXgoaXRlbSwgdGhpcy50b2dnbGVzLCBwcmV2KV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4odGhpcy4kZWwpXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwcmV2ID09PSBuZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQsIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhjaGlsZCwgdGhpcyQxLmNscywgbmV4dCA9PT0gaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cih0aGlzJDEudG9nZ2xlc1tpXSwgJ2FyaWEtZXhwYW5kZWQnLCBuZXh0ID09PSBpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdHMuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHJlZi5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzJDEudG9nZ2xlRWxlbWVudCh0b05vZGVzKGNoaWxkcmVuKS5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBoYXNDbGFzcyhjaGlsZCwgdGhpcyQxLmNscyk7IH1cclxuICAgICAgICAgICAgICAgICAgICApLCBmYWxzZSwgcHJldiA+PSAwKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS50b2dnbGVFbGVtZW50KGNoaWxkcmVuW25leHRdLCB0cnVlLCBwcmV2ID49IDApOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHRhYiA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxyXG5cclxuICAgICAgICBleHRlbmRzOiBTd2l0Y2hlcixcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgbWVkaWE6IEJvb2xlYW5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG1lZGlhOiA5NjAsXHJcbiAgICAgICAgICAgIGF0dHJJdGVtOiAndWstdGFiLWl0ZW0nXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbHMgPSBoYXNDbGFzcyh0aGlzLiRlbCwgJ3VrLXRhYi1sZWZ0JylcclxuICAgICAgICAgICAgICAgID8gJ3VrLXRhYi1sZWZ0J1xyXG4gICAgICAgICAgICAgICAgOiBoYXNDbGFzcyh0aGlzLiRlbCwgJ3VrLXRhYi1yaWdodCcpXHJcbiAgICAgICAgICAgICAgICAgICAgPyAndWstdGFiLXJpZ2h0J1xyXG4gICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2xzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRjcmVhdGUoJ3RvZ2dsZScsIHRoaXMuJGVsLCB7Y2xzOiBjbHMsIG1vZGU6ICdtZWRpYScsIG1lZGlhOiB0aGlzLm1lZGlhfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdG9nZ2xlID0ge1xyXG5cclxuICAgICAgICBtaXhpbnM6IFtNZWRpYSwgVG9nZ2xhYmxlXSxcclxuXHJcbiAgICAgICAgYXJnczogJ3RhcmdldCcsXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGhyZWY6IFN0cmluZyxcclxuICAgICAgICAgICAgdGFyZ2V0OiBudWxsLFxyXG4gICAgICAgICAgICBtb2RlOiAnbGlzdCcsXHJcbiAgICAgICAgICAgIHF1ZXVlZDogQm9vbGVhblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgaHJlZjogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2UsXHJcbiAgICAgICAgICAgIG1vZGU6ICdjbGljaycsXHJcbiAgICAgICAgICAgIHF1ZXVlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNGb2N1c2FibGUodGhpcy4kZWwpKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyKHRoaXMuJGVsLCAndGFiaW5kZXgnLCAnMCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldDoge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaHJlZiA9IHJlZi5ocmVmO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBxdWVyeUFsbCh0YXJnZXQgfHwgaHJlZiwgJGVsKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmxlbmd0aCAmJiB0YXJnZXQgfHwgWyRlbF07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFyaWEoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czogW1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogKHBvaW50ZXJEb3duICsgXCIgXCIgKyBwb2ludGVyVXAgKyBcIiBcIiArIHBvaW50ZXJDYW5jZWwpLFxyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluY2x1ZGVzKHRoaXMubW9kZSwgJ2hvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1RvdWNoID0gaXNUb3VjaChlKSAmJiBlLnR5cGUgPT09IHBvaW50ZXJEb3duO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2xpY2tpbmcgYSBidXR0b24gZG9lcyBub3QgZ2l2ZSBpdCBmb2N1cyBvbiBhbGwgYnJvd3NlcnMgYW5kIHBsYXRmb3Jtc1xyXG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L2J1dHRvbiNjbGlja2luZ19hbmRfZm9jdXNcclxuICAgICAgICAgICAgICAgIG5hbWU6IChwb2ludGVyRW50ZXIgKyBcIiBcIiArIHBvaW50ZXJMZWF2ZSArIFwiIGZvY3VzIGJsdXJcIiksXHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZXModGhpcy5tb2RlLCAnaG92ZXInKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUb3VjaChlKSAmJiAhdGhpcy5faXNUb3VjaCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzUG9pbnRlckV2ZW50ID0gaW5jbHVkZXMoWydwb2ludGVybGVhdmUnLCAncG9pbnRlcmVudGVyJ10sIGUudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQb2ludGVyRXZlbnQgJiYgbWF0Y2hlcyh0aGlzLiRlbCwgJzpob3ZlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBpc1BvaW50ZXJFdmVudCAmJiBtYXRjaGVzKHRoaXMuJGVsLCAnOmZvY3VzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKChcInRvZ2dsZVwiICsgKGluY2x1ZGVzKFtwb2ludGVyRW50ZXIsICdmb2N1cyddLCBlLnR5cGUpID8gJ3Nob3cnIDogJ2hpZGUnKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmNsdWRlcyh0aGlzLm1vZGUsICdjbGljaycpIHx8IGhhc1RvdWNoICYmIGluY2x1ZGVzKHRoaXMubW9kZSwgJ2hvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbms7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3QoZS50YXJnZXQsICdhW2hyZWY9XCIjXCJdLCBhW2hyZWY9XCJcIl0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAobGluayA9IGNsb3Nlc3QoZS50YXJnZXQsICdhW2hyZWZdJykpICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFhdHRyKHRoaXMuJGVsLCAnYXJpYS1leHBhbmRlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBsaW5rLmhhc2ggJiYgbWF0Y2hlcyh0aGlzLnRhcmdldCwgbGluay5oYXNoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICd0b2dnbGVkJyxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGUsIHRvZ2dsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFyaWEodG9nZ2xlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmNsdWRlcyh0aGlzLm1vZGUsICdtZWRpYScpICYmIHRoaXMubWVkaWFcclxuICAgICAgICAgICAgICAgICAgICA/IHttYXRjaDogdGhpcy5tYXRjaE1lZGlhfVxyXG4gICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSByZWYubWF0Y2g7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0b2dnbGVkID0gdGhpcy5pc1RvZ2dsZWQodGhpcy50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID8gIXRvZ2dsZWQgOiB0b2dnbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0cmlnZ2VyKHRoaXMudGFyZ2V0LCB0eXBlIHx8ICd0b2dnbGUnLCBbdGhpc10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5xdWV1ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVFbGVtZW50KHRoaXMudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbGVhdmluZyA9IHRoaXMudGFyZ2V0LmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGhhc0NsYXNzKGVsLCB0aGlzJDEuY2xzTGVhdmUpOyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobGVhdmluZy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNMZWF2aW5nID0gaW5jbHVkZXMobGVhdmluZywgZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEudG9nZ2xlRWxlbWVudChlbCwgaXNMZWF2aW5nLCBpc0xlYXZpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlZCA9IHRoaXMudGFyZ2V0LmZpbHRlcih0aGlzLmlzVG9nZ2xlZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodG9nZ2xlZCwgZmFsc2UpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnRvZ2dsZUVsZW1lbnQodGhpcyQxLnRhcmdldC5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhaW5jbHVkZXModG9nZ2xlZCwgZWwpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgKSwgdHJ1ZSk7IH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdXBkYXRlQXJpYTogZnVuY3Rpb24odG9nZ2xlZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cih0aGlzLiRlbCwgJ2FyaWEtZXhwYW5kZWQnLCBpc0Jvb2xlYW4odG9nZ2xlZClcclxuICAgICAgICAgICAgICAgICAgICA/IHRvZ2dsZWRcclxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY2xzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gaGFzQ2xhc3ModGhpcy50YXJnZXRbMF0sIHRoaXMuY2xzLnNwbGl0KCcgJylbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogaXNWaXNpYmxlKHRoaXMudGFyZ2V0WzBdKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY29tcG9uZW50cyQxID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xyXG4gICAgICAgIF9fcHJvdG9fXzogbnVsbCxcclxuICAgICAgICBBY2NvcmRpb246IEFjY29yZGlvbixcclxuICAgICAgICBBbGVydDogYWxlcnQsXHJcbiAgICAgICAgQ292ZXI6IGNvdmVyLFxyXG4gICAgICAgIERyb3A6IGRyb3AsXHJcbiAgICAgICAgRHJvcGRvd246IGRyb3AsXHJcbiAgICAgICAgRm9ybUN1c3RvbTogZm9ybUN1c3RvbSxcclxuICAgICAgICBHaWY6IGdpZixcclxuICAgICAgICBHcmlkOiBncmlkLFxyXG4gICAgICAgIEhlaWdodE1hdGNoOiBoZWlnaHRNYXRjaCxcclxuICAgICAgICBIZWlnaHRWaWV3cG9ydDogaGVpZ2h0Vmlld3BvcnQsXHJcbiAgICAgICAgSWNvbjogSWNvbixcclxuICAgICAgICBJbWc6IGltZyxcclxuICAgICAgICBMZWFkZXI6IGxlYWRlcixcclxuICAgICAgICBNYXJnaW46IE1hcmdpbixcclxuICAgICAgICBNb2RhbDogbW9kYWwsXHJcbiAgICAgICAgTmF2OiBuYXYsXHJcbiAgICAgICAgTmF2YmFyOiBuYXZiYXIsXHJcbiAgICAgICAgT2ZmY2FudmFzOiBvZmZjYW52YXMsXHJcbiAgICAgICAgT3ZlcmZsb3dBdXRvOiBvdmVyZmxvd0F1dG8sXHJcbiAgICAgICAgUmVzcG9uc2l2ZTogcmVzcG9uc2l2ZSxcclxuICAgICAgICBTY3JvbGw6IHNjcm9sbCxcclxuICAgICAgICBTY3JvbGxzcHk6IHNjcm9sbHNweSxcclxuICAgICAgICBTY3JvbGxzcHlOYXY6IHNjcm9sbHNweU5hdixcclxuICAgICAgICBTdGlja3k6IHN0aWNreSxcclxuICAgICAgICBTdmc6IFNWRyxcclxuICAgICAgICBTd2l0Y2hlcjogU3dpdGNoZXIsXHJcbiAgICAgICAgVGFiOiB0YWIsXHJcbiAgICAgICAgVG9nZ2xlOiB0b2dnbGUsXHJcbiAgICAgICAgVmlkZW86IFZpZGVvLFxyXG4gICAgICAgIENsb3NlOiBDbG9zZSxcclxuICAgICAgICBTcGlubmVyOiBTcGlubmVyLFxyXG4gICAgICAgIFNsaWRlbmF2TmV4dDogU2xpZGVuYXYsXHJcbiAgICAgICAgU2xpZGVuYXZQcmV2aW91czogU2xpZGVuYXYsXHJcbiAgICAgICAgU2VhcmNoSWNvbjogU2VhcmNoLFxyXG4gICAgICAgIE1hcmtlcjogSWNvbkNvbXBvbmVudCxcclxuICAgICAgICBOYXZiYXJUb2dnbGVJY29uOiBJY29uQ29tcG9uZW50LFxyXG4gICAgICAgIE92ZXJsYXlJY29uOiBJY29uQ29tcG9uZW50LFxyXG4gICAgICAgIFBhZ2luYXRpb25OZXh0OiBJY29uQ29tcG9uZW50LFxyXG4gICAgICAgIFBhZ2luYXRpb25QcmV2aW91czogSWNvbkNvbXBvbmVudCxcclxuICAgICAgICBUb3RvcDogSWNvbkNvbXBvbmVudFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gcmVnaXN0ZXIgY29tcG9uZW50c1xyXG4gICAgZWFjaChjb21wb25lbnRzJDEsIGZ1bmN0aW9uIChjb21wb25lbnQsIG5hbWUpIHsgcmV0dXJuIFVJa2l0LmNvbXBvbmVudChuYW1lLCBjb21wb25lbnQpOyB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIGNvcmUgZnVuY3Rpb25hbGl0eVxyXG4gICAgVUlraXQudXNlKENvcmUpO1xyXG5cclxuICAgIGJvb3QoVUlraXQpO1xyXG5cclxuICAgIHZhciBjb3VudGRvd24gPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgZGF0ZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbHNXcmFwcGVyOiBTdHJpbmdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRhdGU6ICcnLFxyXG4gICAgICAgICAgICBjbHNXcmFwcGVyOiAnLnVrLWNvdW50ZG93bi0ldW5pdCUnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIGRhdGU6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSByZWYuZGF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZS5wYXJzZShkYXRlKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGRheXM6IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xzV3JhcHBlciA9IHJlZi5jbHNXcmFwcGVyO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKGNsc1dyYXBwZXIucmVwbGFjZSgnJXVuaXQlJywgJ2RheXMnKSwgJGVsKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGhvdXJzOiBmdW5jdGlvbihyZWYsICRlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsc1dyYXBwZXIgPSByZWYuY2xzV3JhcHBlcjtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChjbHNXcmFwcGVyLnJlcGxhY2UoJyV1bml0JScsICdob3VycycpLCAkZWwpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbWludXRlczogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbHNXcmFwcGVyID0gcmVmLmNsc1dyYXBwZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoY2xzV3JhcHBlci5yZXBsYWNlKCcldW5pdCUnLCAnbWludXRlcycpLCAkZWwpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc2Vjb25kczogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbHNXcmFwcGVyID0gcmVmLmNsc1dyYXBwZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoY2xzV3JhcHBlci5yZXBsYWNlKCcldW5pdCUnLCAnc2Vjb25kcycpLCAkZWwpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdW5pdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnZGF5cycsICdob3VycycsICdtaW51dGVzJywgJ3NlY29uZHMnXS5maWx0ZXIoZnVuY3Rpb24gKHVuaXQpIHsgcmV0dXJuIHRoaXMkMVt1bml0XTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5pdHMuZm9yRWFjaChmdW5jdGlvbiAodW5pdCkgeyByZXR1cm4gZW1wdHkodGhpcyQxW3VuaXRdKTsgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Zpc2liaWxpdHljaGFuZ2UnLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVzcGFuID0gZ2V0VGltZVNwYW4odGhpcy5kYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGltZXNwYW4udG90YWwgPD0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXNwYW4uZGF5c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA9IHRpbWVzcGFuLmhvdXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID0gdGltZXNwYW4ubWludXRlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA9IHRpbWVzcGFuLnNlY29uZHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudW5pdHMuZm9yRWFjaChmdW5jdGlvbiAodW5pdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlnaXRzID0gU3RyaW5nKE1hdGguZmxvb3IodGltZXNwYW5bdW5pdF0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGlnaXRzID0gZGlnaXRzLmxlbmd0aCA8IDIgPyAoXCIwXCIgKyBkaWdpdHMpIDogZGlnaXRzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzJDFbdW5pdF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLnRleHRDb250ZW50ICE9PSBkaWdpdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlnaXRzID0gZGlnaXRzLnNwbGl0KCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWdpdHMubGVuZ3RoICE9PSBlbC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwoZWwsIGRpZ2l0cy5tYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gJzxzcGFuPjwvc3Bhbj4nOyB9KS5qb2luKCcnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZ2l0cy5mb3JFYWNoKGZ1bmN0aW9uIChkaWdpdCwgaSkgeyByZXR1cm4gZWwuY2hpbGRyZW5baV0udGV4dENvbnRlbnQgPSBkaWdpdDsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZSAmJiB0aGlzLnVuaXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCh0aGlzLiR1cGRhdGUsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGltZVNwYW4oZGF0ZSkge1xyXG5cclxuICAgICAgICB2YXIgdG90YWwgPSBkYXRlIC0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxyXG4gICAgICAgICAgICBzZWNvbmRzOiB0b3RhbCAvIDEwMDAgJSA2MCxcclxuICAgICAgICAgICAgbWludXRlczogdG90YWwgLyAxMDAwIC8gNjAgJSA2MCxcclxuICAgICAgICAgICAgaG91cnM6IHRvdGFsIC8gMTAwMCAvIDYwIC8gNjAgJSAyNCxcclxuICAgICAgICAgICAgZGF5czogdG90YWwgLyAxMDAwIC8gNjAgLyA2MCAvIDI0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xzTGVhdmUgPSAndWstdHJhbnNpdGlvbi1sZWF2ZSc7XHJcbiAgICB2YXIgY2xzRW50ZXIgPSAndWstdHJhbnNpdGlvbi1lbnRlcic7XHJcblxyXG4gICAgZnVuY3Rpb24gZmFkZShhY3Rpb24sIHRhcmdldCwgZHVyYXRpb24sIHN0YWdnZXIpIHtcclxuICAgICAgICBpZiAoIHN0YWdnZXIgPT09IHZvaWQgMCApIHN0YWdnZXIgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGluZGV4ID0gdHJhbnNpdGlvbkluZGV4KHRhcmdldCwgdHJ1ZSk7XHJcbiAgICAgICAgdmFyIHByb3BzSW4gPSB7b3BhY2l0eTogMX07XHJcbiAgICAgICAgdmFyIHByb3BzT3V0ID0ge29wYWNpdHk6IDB9O1xyXG5cclxuICAgICAgICB2YXIgd3JhcEluZGV4Rm4gPSBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluZGV4ID09PSB0cmFuc2l0aW9uSW5kZXgodGFyZ2V0KSA/IGZuKCkgOiBQcm9taXNlJDEucmVqZWN0KCk7IH07IH07XHJcblxyXG4gICAgICAgIHZhciBsZWF2ZUZuID0gd3JhcEluZGV4Rm4oZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgYWRkQ2xhc3ModGFyZ2V0LCBjbHNMZWF2ZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZSQxLmFsbChnZXRUcmFuc2l0aW9uTm9kZXModGFyZ2V0KS5tYXAoZnVuY3Rpb24gKGNoaWxkLCBpKSB7IHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIFRyYW5zaXRpb24uc3RhcnQoY2hpbGQsIHByb3BzT3V0LCBkdXJhdGlvbiAvIDIsICdlYXNlJykudGhlbihyZXNvbHZlKTsgfSwgaSAqIHN0YWdnZXIpOyB9XHJcbiAgICAgICAgICAgICAgICApOyB9XHJcbiAgICAgICAgICAgICkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlQ2xhc3ModGFyZ2V0LCBjbHNMZWF2ZSk7IH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGVudGVyRm4gPSB3cmFwSW5kZXhGbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgb2xkSGVpZ2h0ID0gaGVpZ2h0KHRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBhZGRDbGFzcyh0YXJnZXQsIGNsc0VudGVyKTtcclxuICAgICAgICAgICAgYWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBjc3MoY2hpbGRyZW4odGFyZ2V0KSwge29wYWNpdHk6IDB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSBVSWtpdCB1cGRhdGVzIGhhdmUgcHJvcGFnYXRlZFxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gY2hpbGRyZW4odGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SGVpZ2h0ID0gaGVpZ2h0KHRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSBHcmlkIGNlbGxzIGRvIG5vdCBzdHJldGNoIHdoZW4gaGVpZ2h0IGlzIGFwcGxpZWRcclxuICAgICAgICAgICAgICAgICAgICBjc3ModGFyZ2V0LCAnYWxpZ25Db250ZW50JywgJ2ZsZXgtc3RhcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQodGFyZ2V0LCBvbGRIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbk5vZGVzID0gZ2V0VHJhbnNpdGlvbk5vZGVzKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzKG5vZGVzLCBwcm9wc091dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IHRyYW5zaXRpb25Ob2Rlcy5tYXAoZnVuY3Rpb24gKGNoaWxkLCBpKSB7IHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIFRyYW5zaXRpb24uc3RhcnQoY2hpbGQsIHByb3BzSW4sIGR1cmF0aW9uIC8gMiwgJ2Vhc2UnKS50aGVuKHJlc29sdmUpOyB9LCBpICogc3RhZ2dlcik7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRIZWlnaHQgIT09IG5ld0hlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKFRyYW5zaXRpb24uc3RhcnQodGFyZ2V0LCB7aGVpZ2h0OiBuZXdIZWlnaHR9LCBkdXJhdGlvbiAvIDIgKyB0cmFuc2l0aW9uTm9kZXMubGVuZ3RoICogc3RhZ2dlciwgJ2Vhc2UnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlJDEuYWxsKHRyYW5zaXRpb25zKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGFyZ2V0LCBjbHNFbnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdHJhbnNpdGlvbkluZGV4KHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcyh0YXJnZXQsIHtoZWlnaHQ6ICcnLCBhbGlnbkNvbnRlbnQ6ICcnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3Mobm9kZXMsIHtvcGFjaXR5OiAnJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRhcmdldC5kYXRhc2V0LnRyYW5zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7IH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc0NsYXNzKHRhcmdldCwgY2xzTGVhdmUpXHJcbiAgICAgICAgICAgID8gd2FpdFRyYW5zaXRpb25lbmQodGFyZ2V0KS50aGVuKGVudGVyRm4pXHJcbiAgICAgICAgICAgIDogaGFzQ2xhc3ModGFyZ2V0LCBjbHNFbnRlcilcclxuICAgICAgICAgICAgICAgID8gd2FpdFRyYW5zaXRpb25lbmQodGFyZ2V0KS50aGVuKGxlYXZlRm4pLnRoZW4oZW50ZXJGbilcclxuICAgICAgICAgICAgICAgIDogbGVhdmVGbigpLnRoZW4oZW50ZXJGbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbkluZGV4KHRhcmdldCwgbmV4dCkge1xyXG4gICAgICAgIGlmIChuZXh0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5kYXRhc2V0LnRyYW5zaXRpb24gPSAxICsgdHJhbnNpdGlvbkluZGV4KHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdG9OdW1iZXIodGFyZ2V0LmRhdGFzZXQudHJhbnNpdGlvbikgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3YWl0VHJhbnNpdGlvbmVuZCh0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZSQxLmFsbChjaGlsZHJlbih0YXJnZXQpLmZpbHRlcihUcmFuc2l0aW9uLmluUHJvZ3Jlc3MpLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIG9uY2UoZWwsICd0cmFuc2l0aW9uZW5kIHRyYW5zaXRpb25jYW5jZWxlZCcsIHJlc29sdmUpOyB9KTsgfVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25Ob2Rlcyh0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gZ2V0Um93cyhjaGlsZHJlbih0YXJnZXQpKS5yZWR1Y2UoZnVuY3Rpb24gKG5vZGVzLCByb3cpIHsgcmV0dXJuIG5vZGVzLmNvbmNhdChzb3J0QnkkMShyb3cuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gaXNJblZpZXcoZWwpOyB9KSwgJ29mZnNldExlZnQnKSk7IH0sIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzbGlkZSAoYWN0aW9uLCB0YXJnZXQsIGR1cmF0aW9uKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBub2RlcyA9IGNoaWxkcmVuKHRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGN1cnJlbnQgc3RhdGVcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50UHJvcHMgPSBub2Rlcy5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBnZXRQcm9wcyhlbCwgdHJ1ZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldFByb3BzID0gY3NzKHRhcmdldCwgWydoZWlnaHQnLCAncGFkZGluZyddKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYW5jZWwgcHJldmlvdXMgYW5pbWF0aW9uc1xyXG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwodGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIG5vZGVzLmZvckVhY2goVHJhbnNpdGlvbi5jYW5jZWwpO1xyXG4gICAgICAgICAgICAgICAgcmVzZXQodGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGRpbmcsIHNvcnRpbmcsIHJlbW92aW5nIG5vZGVzXHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGaW5kIG5ldyBub2Rlc1xyXG4gICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5jb25jYXQoY2hpbGRyZW4odGFyZ2V0KS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhaW5jbHVkZXMobm9kZXMsIGVsKTsgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFdhaXQgZm9yIHVwZGF0ZSB0byBwcm9wYWdhdGVcclxuICAgICAgICAgICAgICAgIFByb21pc2UkMS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvcmNlIHVwZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGZhc3Rkb20uZmx1c2goKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IG5ldyBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRQcm9wc1RvID0gY3NzKHRhcmdldCwgWydoZWlnaHQnLCAncGFkZGluZyddKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gZ2V0VHJhbnNpdGlvblByb3BzKHRhcmdldCwgbm9kZXMsIGN1cnJlbnRQcm9wcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BzVG8gPSByZWZbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BzRnJvbSA9IHJlZlsxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgdG8gcHJldmlvdXMgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkgeyByZXR1cm4gcHJvcHNGcm9tW2ldICYmIGNzcyhlbCwgcHJvcHNGcm9tW2ldKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRhcmdldCwgYXNzaWduKHtkaXNwbGF5OiAnYmxvY2snfSwgdGFyZ2V0UHJvcHMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RhcnQgdHJhbnNpdGlvbnMgb24gbmV4dCBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbnMgPSBub2Rlcy5tYXAoZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiBwYXJlbnQoZWwpID09PSB0YXJnZXQgJiYgVHJhbnNpdGlvbi5zdGFydChlbCwgcHJvcHNUb1tpXSwgZHVyYXRpb24sICdlYXNlJyk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuY29uY2F0KFRyYW5zaXRpb24uc3RhcnQodGFyZ2V0LCB0YXJnZXRQcm9wc1RvLCBkdXJhdGlvbiwgJ2Vhc2UnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlJDEuYWxsKHRyYW5zaXRpb25zKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiBwYXJlbnQoZWwpID09PSB0YXJnZXQgJiYgY3NzKGVsLCAnZGlzcGxheScsIHByb3BzVG9baV0ub3BhY2l0eSA9PT0gMCA/ICdub25lJyA6ICcnKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBub29wKS50aGVuKHJlc29sdmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UHJvcHMoZWwsIG9wYWNpdHkpIHtcclxuXHJcbiAgICAgICAgdmFyIHpJbmRleCA9IGNzcyhlbCwgJ3pJbmRleCcpO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNWaXNpYmxlKGVsKVxyXG4gICAgICAgICAgICA/IGFzc2lnbih7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHkgPyBjc3MoZWwsICdvcGFjaXR5JykgOiAnMCcsXHJcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgIHpJbmRleDogekluZGV4ID09PSAnYXV0bycgPyBpbmRleChlbCkgOiB6SW5kZXhcclxuICAgICAgICAgICAgfSwgZ2V0UG9zaXRpb25XaXRoTWFyZ2luKGVsKSlcclxuICAgICAgICAgICAgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUcmFuc2l0aW9uUHJvcHModGFyZ2V0LCBub2RlcywgY3VycmVudFByb3BzKSB7XHJcblxyXG4gICAgICAgIHZhciBwcm9wc1RvID0gbm9kZXMubWFwKGZ1bmN0aW9uIChlbCwgaSkgeyByZXR1cm4gcGFyZW50KGVsKSAmJiBpIGluIGN1cnJlbnRQcm9wc1xyXG4gICAgICAgICAgICAgICAgPyBjdXJyZW50UHJvcHNbaV1cclxuICAgICAgICAgICAgICAgID8gaXNWaXNpYmxlKGVsKVxyXG4gICAgICAgICAgICAgICAgICAgID8gZ2V0UG9zaXRpb25XaXRoTWFyZ2luKGVsKVxyXG4gICAgICAgICAgICAgICAgICAgIDoge29wYWNpdHk6IDB9XHJcbiAgICAgICAgICAgICAgICA6IHtvcGFjaXR5OiBpc1Zpc2libGUoZWwpID8gMSA6IDB9XHJcbiAgICAgICAgICAgICAgICA6IGZhbHNlOyB9KTtcclxuXHJcbiAgICAgICAgdmFyIHByb3BzRnJvbSA9IHByb3BzVG8ubWFwKGZ1bmN0aW9uIChwcm9wcywgaSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGZyb20gPSBwYXJlbnQobm9kZXNbaV0pID09PSB0YXJnZXQgJiYgKGN1cnJlbnRQcm9wc1tpXSB8fCBnZXRQcm9wcyhub2Rlc1tpXSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmcm9tKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghcHJvcHMpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBmcm9tLm9wYWNpdHk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoISgnb3BhY2l0eScgaW4gcHJvcHMpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3BhY2l0eSA9IGZyb20ub3BhY2l0eTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob3BhY2l0eSAlIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZyb20ub3BhY2l0eTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZyb207XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBbcHJvcHNUbywgcHJvcHNGcm9tXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNldChlbCkge1xyXG4gICAgICAgIGNzcyhlbC5jaGlsZHJlbiwge1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICcnLFxyXG4gICAgICAgICAgICBsZWZ0OiAnJyxcclxuICAgICAgICAgICAgb3BhY2l0eTogJycsXHJcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICcnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJycsXHJcbiAgICAgICAgICAgIHRvcDogJycsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJycsXHJcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICcnLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogJycsXHJcbiAgICAgICAgICAgIHpJbmRleDogJydcclxuICAgICAgICB9KTtcclxuICAgICAgICBjc3MoZWwsIHtoZWlnaHQ6ICcnLCBkaXNwbGF5OiAnJywgcGFkZGluZzogJyd9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQb3NpdGlvbldpdGhNYXJnaW4oZWwpIHtcclxuICAgICAgICB2YXIgcmVmID0gb2Zmc2V0KGVsKTtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gcmVmLmhlaWdodDtcclxuICAgICAgICB2YXIgd2lkdGggPSByZWYud2lkdGg7XHJcbiAgICAgICAgdmFyIHJlZiQxID0gcG9zaXRpb24oZWwpO1xyXG4gICAgICAgIHZhciB0b3AgPSByZWYkMS50b3A7XHJcbiAgICAgICAgdmFyIGxlZnQgPSByZWYkMS5sZWZ0O1xyXG4gICAgICAgIHZhciByZWYkMiA9IGNzcyhlbCwgWydtYXJnaW5Ub3AnLCAnbWFyZ2luTGVmdCddKTtcclxuICAgICAgICB2YXIgbWFyZ2luTGVmdCA9IHJlZiQyLm1hcmdpbkxlZnQ7XHJcbiAgICAgICAgdmFyIG1hcmdpblRvcCA9IHJlZiQyLm1hcmdpblRvcDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHt0b3A6IHRvcCwgbGVmdDogbGVmdCwgaGVpZ2h0OiBoZWlnaHQsIHdpZHRoOiB3aWR0aCwgbWFyZ2luTGVmdDogbWFyZ2luTGVmdCwgbWFyZ2luVG9wOiBtYXJnaW5Ub3AsIHRyYW5zZm9ybTogJyd9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBBbmltYXRlID0ge1xyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogTnVtYmVyLFxyXG4gICAgICAgICAgICBhbmltYXRpb246IEJvb2xlYW5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAsXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbjogJ3NsaWRlJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGU6IGZ1bmN0aW9uKGFjdGlvbiwgdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0ID09PSB2b2lkIDAgKSB0YXJnZXQgPSB0aGlzLiRlbDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmFuaW1hdGlvbjtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb25GbiA9IG5hbWUgPT09ICdmYWRlJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gZmFkZVxyXG4gICAgICAgICAgICAgICAgICAgIDogbmFtZSA9PT0gJ2RlbGF5ZWQtZmFkZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFkZS5hcHBseSh2b2lkIDAsIGFyZ3MuY29uY2F0KCBbNDBdICkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICFuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZSQxLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc2xpZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuaW1hdGlvbkZuKGFjdGlvbiwgdGFyZ2V0LCB0aGlzLmR1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS4kdXBkYXRlKHRhcmdldCwgJ3Jlc2l6ZScpOyB9LCBub29wKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBmaWx0ZXIgPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0FuaW1hdGVdLFxyXG5cclxuICAgICAgICBhcmdzOiAndGFyZ2V0JyxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBCb29sZWFuLFxyXG4gICAgICAgICAgICBzZWxBY3RpdmU6IEJvb2xlYW5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRhcmdldDogbnVsbCxcclxuICAgICAgICAgICAgc2VsQWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0ckl0ZW06ICd1ay1maWx0ZXItY29udHJvbCcsXHJcbiAgICAgICAgICAgIGNsczogJ3VrLWFjdGl2ZScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyNTBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgdG9nZ2xlczoge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ckl0ZW0gPSByZWYuYXR0ckl0ZW07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkJCgoXCJbXCIgKyBhdHRySXRlbSArIFwiXSxbZGF0YS1cIiArIGF0dHJJdGVtICsgXCJdXCIpLCAkZWwpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB3YXRjaDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbEFjdGl2ZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZXMgPSAkJCh0aGlzLnNlbEFjdGl2ZSwgdGhpcy4kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHRvZ2dsZUNsYXNzKGVsLCB0aGlzJDEuY2xzLCBpbmNsdWRlcyhhY3RpdmVzLCBlbCkpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBpbW1lZGlhdGU6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjaGlsZHJlbjoge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQkKCh0YXJnZXQgKyBcIiA+ICpcIiksICRlbCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbihsaXN0LCBvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkICYmICFpc0VxdWFsTGlzdChsaXN0LCBvbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBldmVudHM6IFtcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFwiW1wiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdLFtkYXRhLVwiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5KGUuY3VycmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICBhcHBseTogZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2U3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3U3RhdGUgPSBtZXJnZVN0YXRlKGVsLCB0aGlzLmF0dHJJdGVtLCB0aGlzLmdldFN0YXRlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXNFcXVhbFN0YXRlKHByZXZTdGF0ZSwgbmV3U3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXRTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVzXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaGFzQ2xhc3MoaXRlbSwgdGhpcyQxLmNscyk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAoc3RhdGUsIGVsKSB7IHJldHVybiBtZXJnZVN0YXRlKGVsLCB0aGlzJDEuYXR0ckl0ZW0sIHN0YXRlKTsgfSwge2ZpbHRlcjogeycnOiAnJ30sIHNvcnQ6IFtdfSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBzZXRTdGF0ZTogZnVuY3Rpb24oc3RhdGUsIGFuaW1hdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBhbmltYXRlID09PSB2b2lkIDAgKSBhbmltYXRlID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBhc3NpZ24oe2ZpbHRlcjogeycnOiAnJ30sIHNvcnQ6IFtdfSwgc3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdiZWZvcmVGaWx0ZXInLCBbdGhpcywgc3RhdGVdKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHRvZ2dsZUNsYXNzKGVsLCB0aGlzJDEuY2xzLCAhIW1hdGNoRmlsdGVyKGVsLCB0aGlzJDEuYXR0ckl0ZW0sIHN0YXRlKSk7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIFByb21pc2UkMS5hbGwoJCQodGhpcy50YXJnZXQsIHRoaXMuJGVsKS5tYXAoZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJGbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHlTdGF0ZShzdGF0ZSwgdGFyZ2V0LCBjaGlsZHJlbih0YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLiR1cGRhdGUodGhpcyQxLiRlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5pbWF0ZSA/IHRoaXMkMS5hbmltYXRlKGZpbHRlckZuLCB0YXJnZXQpIDogZmlsdGVyRm4oKTtcclxuICAgICAgICAgICAgICAgIH0pKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRyaWdnZXIodGhpcyQxLiRlbCwgJ2FmdGVyRmlsdGVyJywgW3RoaXMkMV0pOyB9KTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB1cGRhdGVTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICBmYXN0ZG9tLndyaXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5zZXRTdGF0ZSh0aGlzJDEuZ2V0U3RhdGUoKSwgZmFsc2UpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRGaWx0ZXIoZWwsIGF0dHIpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VPcHRpb25zKGRhdGEoZWwsIGF0dHIpLCBbJ2ZpbHRlciddKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0VxdWFsU3RhdGUoc3RhdGVBLCBzdGF0ZUIpIHtcclxuICAgICAgICByZXR1cm4gWydmaWx0ZXInLCAnc29ydCddLmV2ZXJ5KGZ1bmN0aW9uIChwcm9wKSB7IHJldHVybiBpc0VxdWFsKHN0YXRlQVtwcm9wXSwgc3RhdGVCW3Byb3BdKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHlTdGF0ZShzdGF0ZSwgdGFyZ2V0LCBjaGlsZHJlbikge1xyXG4gICAgICAgIHZhciBzZWxlY3RvciA9IGdldFNlbGVjdG9yKHN0YXRlKTtcclxuXHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGNzcyhlbCwgJ2Rpc3BsYXknLCBzZWxlY3RvciAmJiAhbWF0Y2hlcyhlbCwgc2VsZWN0b3IpID8gJ25vbmUnIDogJycpOyB9KTtcclxuXHJcbiAgICAgICAgdmFyIHJlZiA9IHN0YXRlLnNvcnQ7XHJcbiAgICAgICAgdmFyIHNvcnQgPSByZWZbMF07XHJcbiAgICAgICAgdmFyIG9yZGVyID0gcmVmWzFdO1xyXG5cclxuICAgICAgICBpZiAoc29ydCkge1xyXG4gICAgICAgICAgICB2YXIgc29ydGVkID0gc29ydEl0ZW1zKGNoaWxkcmVuLCBzb3J0LCBvcmRlcik7XHJcbiAgICAgICAgICAgIGlmICghaXNFcXVhbChzb3J0ZWQsIGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICAgICAgYXBwZW5kKHRhcmdldCwgc29ydGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtZXJnZVN0YXRlKGVsLCBhdHRyLCBzdGF0ZSkge1xyXG5cclxuICAgICAgICB2YXIgZmlsdGVyQnkgPSBnZXRGaWx0ZXIoZWwsIGF0dHIpO1xyXG4gICAgICAgIHZhciBmaWx0ZXIgPSBmaWx0ZXJCeS5maWx0ZXI7XHJcbiAgICAgICAgdmFyIGdyb3VwID0gZmlsdGVyQnkuZ3JvdXA7XHJcbiAgICAgICAgdmFyIHNvcnQgPSBmaWx0ZXJCeS5zb3J0O1xyXG4gICAgICAgIHZhciBvcmRlciA9IGZpbHRlckJ5Lm9yZGVyOyBpZiAoIG9yZGVyID09PSB2b2lkIDAgKSBvcmRlciA9ICdhc2MnO1xyXG5cclxuICAgICAgICBpZiAoZmlsdGVyIHx8IGlzVW5kZWZpbmVkKHNvcnQpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZ3JvdXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLmZpbHRlclsnJ107XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZmlsdGVyW2dyb3VwXSA9IGZpbHRlcjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLmZpbHRlcltncm91cF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0VtcHR5KHN0YXRlLmZpbHRlcikgfHwgJycgaW4gc3RhdGUuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmZpbHRlciA9IHsnJzogZmlsdGVyIHx8ICcnfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmZpbHRlciA9IHsnJzogZmlsdGVyIHx8ICcnfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoc29ydCkpIHtcclxuICAgICAgICAgICAgc3RhdGUuc29ydCA9IFtzb3J0LCBvcmRlcl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWF0Y2hGaWx0ZXIoZWwsIGF0dHIsIHJlZikge1xyXG4gICAgICAgIHZhciBzdGF0ZUZpbHRlciA9IHJlZi5maWx0ZXI7IGlmICggc3RhdGVGaWx0ZXIgPT09IHZvaWQgMCApIHN0YXRlRmlsdGVyID0geycnOiAnJ307XHJcbiAgICAgICAgdmFyIHJlZl9zb3J0ID0gcmVmLnNvcnQ7XHJcbiAgICAgICAgdmFyIHN0YXRlU29ydCA9IHJlZl9zb3J0WzBdO1xyXG4gICAgICAgIHZhciBzdGF0ZU9yZGVyID0gcmVmX3NvcnRbMV07XHJcblxyXG5cclxuICAgICAgICB2YXIgcmVmJDEgPSBnZXRGaWx0ZXIoZWwsIGF0dHIpO1xyXG4gICAgICAgIHZhciBmaWx0ZXIgPSByZWYkMS5maWx0ZXI7IGlmICggZmlsdGVyID09PSB2b2lkIDAgKSBmaWx0ZXIgPSAnJztcclxuICAgICAgICB2YXIgZ3JvdXAgPSByZWYkMS5ncm91cDsgaWYgKCBncm91cCA9PT0gdm9pZCAwICkgZ3JvdXAgPSAnJztcclxuICAgICAgICB2YXIgc29ydCA9IHJlZiQxLnNvcnQ7XHJcbiAgICAgICAgdmFyIG9yZGVyID0gcmVmJDEub3JkZXI7IGlmICggb3JkZXIgPT09IHZvaWQgMCApIG9yZGVyID0gJ2FzYyc7XHJcblxyXG4gICAgICAgIHJldHVybiBpc1VuZGVmaW5lZChzb3J0KVxyXG4gICAgICAgICAgICA/IGdyb3VwIGluIHN0YXRlRmlsdGVyICYmIGZpbHRlciA9PT0gc3RhdGVGaWx0ZXJbZ3JvdXBdXHJcbiAgICAgICAgICAgICAgICB8fCAhZmlsdGVyICYmIGdyb3VwICYmICEoZ3JvdXAgaW4gc3RhdGVGaWx0ZXIpICYmICFzdGF0ZUZpbHRlclsnJ11cclxuICAgICAgICAgICAgOiBzdGF0ZVNvcnQgPT09IHNvcnQgJiYgc3RhdGVPcmRlciA9PT0gb3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNFcXVhbExpc3QobGlzdEEsIGxpc3RCKSB7XHJcbiAgICAgICAgcmV0dXJuIGxpc3RBLmxlbmd0aCA9PT0gbGlzdEIubGVuZ3RoXHJcbiAgICAgICAgICAgICYmIGxpc3RBLmV2ZXJ5KGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gfmxpc3RCLmluZGV4T2YoZWwpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RvcihyZWYpIHtcclxuICAgICAgICB2YXIgZmlsdGVyID0gcmVmLmZpbHRlcjtcclxuXHJcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gJyc7XHJcbiAgICAgICAgZWFjaChmaWx0ZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gc2VsZWN0b3IgKz0gdmFsdWUgfHwgJyc7IH0pO1xyXG4gICAgICAgIHJldHVybiBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzb3J0SXRlbXMobm9kZXMsIHNvcnQsIG9yZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGFzc2lnbihbXSwgbm9kZXMpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGRhdGEoYSwgc29ydCkubG9jYWxlQ29tcGFyZShkYXRhKGIsIHNvcnQpLCB1bmRlZmluZWQsIHtudW1lcmljOiB0cnVlfSkgKiAob3JkZXIgPT09ICdhc2MnIHx8IC0xKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIEFuaW1hdGlvbnMkMiA9IHtcclxuXHJcbiAgICAgICAgc2xpZGU6IHtcclxuXHJcbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uKGRpcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoZGlyICogLTEwMCl9LFxyXG4gICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgpfVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2xhdGVkKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbihwZXJjZW50LCBkaXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKGRpciAqIC0xMDAgKiBwZXJjZW50KX0sXHJcbiAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKGRpciAqIDEwMCAqICgxIC0gcGVyY2VudCkpfVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVkKGVsKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGNzcyhlbCwgJ3RyYW5zZm9ybScpLnNwbGl0KCcsJylbNF0gLyBlbC5vZmZzZXRXaWR0aCkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUodmFsdWUsIHVuaXQpIHtcclxuICAgICAgICBpZiAoIHZhbHVlID09PSB2b2lkIDAgKSB2YWx1ZSA9IDA7XHJcbiAgICAgICAgaWYgKCB1bml0ID09PSB2b2lkIDAgKSB1bml0ID0gJyUnO1xyXG5cclxuICAgICAgICB2YWx1ZSArPSB2YWx1ZSA/IHVuaXQgOiAnJztcclxuICAgICAgICByZXR1cm4gaXNJRSA/IChcInRyYW5zbGF0ZVgoXCIgKyB2YWx1ZSArIFwiKVwiKSA6IChcInRyYW5zbGF0ZTNkKFwiICsgdmFsdWUgKyBcIiwgMCwgMClcIik7IC8vIGN1cnJlbnRseSBub3QgdHJhbnNsYXRlM2QgaW4gSUUsIHRyYW5zbGF0ZTNkIHdpdGhpbiB0cmFuc2xhdGUzZCBkb2VzIG5vdCB3b3JrIHdoaWxlIHRyYW5zaXRpb25pbmdcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzY2FsZTNkKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChcInNjYWxlM2QoXCIgKyB2YWx1ZSArIFwiLCBcIiArIHZhbHVlICsgXCIsIDEpXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBBbmltYXRpb25zJDEgPSBhc3NpZ24oe30sIEFuaW1hdGlvbnMkMiwge1xyXG5cclxuICAgICAgICBmYWRlOiB7XHJcblxyXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IDB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxfVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxIC0gY3NzKGN1cnJlbnQsICdvcGFjaXR5Jyk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uKHBlcmNlbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IDEgLSBwZXJjZW50fSxcclxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogcGVyY2VudH1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2NhbGU6IHtcclxuXHJcbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiBzY2FsZTNkKDEgLSAuMil9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxLCB0cmFuc2Zvcm06IHNjYWxlM2QoMSl9XHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24oY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBjc3MoY3VycmVudCwgJ29wYWNpdHknKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24ocGVyY2VudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMSAtIHBlcmNlbnQsIHRyYW5zZm9ybTogc2NhbGUzZCgxIC0gLjIgKiBwZXJjZW50KX0sXHJcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IHBlcmNlbnQsIHRyYW5zZm9ybTogc2NhbGUzZCgxIC0gLjIgKyAuMiAqIHBlcmNlbnQpfVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gVHJhbnNpdGlvbmVyJDEocHJldiwgbmV4dCwgZGlyLCByZWYpIHtcclxuICAgICAgICB2YXIgYW5pbWF0aW9uID0gcmVmLmFuaW1hdGlvbjtcclxuICAgICAgICB2YXIgZWFzaW5nID0gcmVmLmVhc2luZztcclxuXHJcblxyXG4gICAgICAgIHZhciBwZXJjZW50ID0gYW5pbWF0aW9uLnBlcmNlbnQ7XHJcbiAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IGFuaW1hdGlvbi50cmFuc2xhdGU7XHJcbiAgICAgICAgdmFyIHNob3cgPSBhbmltYXRpb24uc2hvdzsgaWYgKCBzaG93ID09PSB2b2lkIDAgKSBzaG93ID0gbm9vcDtcclxuICAgICAgICB2YXIgcHJvcHMgPSBzaG93KGRpcik7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0gbmV3IERlZmVycmVkKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgICAgICBkaXI6IGRpcixcclxuXHJcbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uKGR1cmF0aW9uLCBwZXJjZW50LCBsaW5lYXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBwZXJjZW50ID09PSB2b2lkIDAgKSBwZXJjZW50ID0gMDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWluZyA9IGxpbmVhciA/ICdsaW5lYXInIDogZWFzaW5nO1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb24gLT0gTWF0aC5yb3VuZChkdXJhdGlvbiAqIGNsYW1wKHBlcmNlbnQsIC0xLCAxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUocGVyY2VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlclVwZGF0ZSQxKG5leHQsICdpdGVtaW4nLCB7cGVyY2VudDogcGVyY2VudCwgZHVyYXRpb246IGR1cmF0aW9uLCB0aW1pbmc6IHRpbWluZywgZGlyOiBkaXJ9KTtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJVcGRhdGUkMShwcmV2LCAnaXRlbW91dCcsIHtwZXJjZW50OiAxIC0gcGVyY2VudCwgZHVyYXRpb246IGR1cmF0aW9uLCB0aW1pbmc6IHRpbWluZywgZGlyOiBkaXJ9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBQcm9taXNlJDEuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLnN0YXJ0KG5leHQsIHByb3BzWzFdLCBkdXJhdGlvbiwgdGltaW5nKSxcclxuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLnN0YXJ0KHByZXYsIHByb3BzWzBdLCBkdXJhdGlvbiwgdGltaW5nKVxyXG4gICAgICAgICAgICAgICAgXSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgbm9vcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwoW25leHQsIHByZXZdKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gcHJvcHNbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjc3MoW25leHQsIHByZXZdLCBwcm9wLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBmb3J3YXJkOiBmdW5jdGlvbihkdXJhdGlvbiwgcGVyY2VudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBwZXJjZW50ID09PSB2b2lkIDAgKSBwZXJjZW50ID0gdGhpcy5wZXJjZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwoW25leHQsIHByZXZdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3coZHVyYXRpb24sIHBlcmNlbnQsIHRydWUpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbihwZXJjZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9wcyA9IHRyYW5zbGF0ZShwZXJjZW50LCBkaXIpO1xyXG4gICAgICAgICAgICAgICAgY3NzKG5leHQsIHByb3BzWzFdKTtcclxuICAgICAgICAgICAgICAgIGNzcyhwcmV2LCBwcm9wc1swXSk7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyVXBkYXRlJDEobmV4dCwgJ2l0ZW10cmFuc2xhdGVpbicsIHtwZXJjZW50OiBwZXJjZW50LCBkaXI6IGRpcn0pO1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlclVwZGF0ZSQxKHByZXYsICdpdGVtdHJhbnNsYXRlb3V0Jywge3BlcmNlbnQ6IDEgLSBwZXJjZW50LCBkaXI6IGRpcn0pO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcmNlbnQocHJldiB8fCBuZXh0LCBuZXh0LCBkaXIpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZ2V0RGlzdGFuY2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXYgJiYgcHJldi5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmlnZ2VyVXBkYXRlJDEoZWwsIHR5cGUsIGRhdGEpIHtcclxuICAgICAgICB0cmlnZ2VyKGVsLCBjcmVhdGVFdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgU2xpZGVyQXV0b3BsYXkgPSB7XHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBCb29sZWFuLFxyXG4gICAgICAgICAgICBhdXRvcGxheUludGVydmFsOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogQm9vbGVhblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvcGxheUludGVydmFsOiA3MDAwLFxyXG4gICAgICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9wbGF5ICYmIHRoaXMuc3RhcnRBdXRvcGxheSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9wbGF5KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXR0cih0aGlzLnNsaWRlcywgJ3RhYmluZGV4JywgJy0xJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Zpc2liaWxpdHljaGFuZ2UnLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0b3BsYXk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wQXV0b3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0QXV0b3BsYXk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuICghdGhpcyQxLmRyYWdnYWJsZSB8fCAhJCgnOmZvY3VzJywgdGhpcyQxLiRlbCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICghdGhpcyQxLnBhdXNlT25Ib3ZlciB8fCAhbWF0Y2hlcyh0aGlzJDEuJGVsLCAnOmhvdmVyJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICF0aGlzJDEuc3RhY2subGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMkMS5zaG93KCduZXh0Jyk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvcGxheUludGVydmFsXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHN0b3BBdXRvcGxheTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsICYmIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIFNsaWRlckRyYWcgPSB7XHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGRyYWdnYWJsZTogQm9vbGVhblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDEwXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFsnc3RhcnQnLCAnbW92ZScsICdlbmQnXS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZm4gPSB0aGlzJDFba2V5XTtcclxuICAgICAgICAgICAgICAgIHRoaXMkMVtrZXldID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGdldEV2ZW50UG9zKGUpLnggKiAoaXNSdGwgPyAtMSA6IDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucHJldlBvcyA9IHBvcyAhPT0gdGhpcyQxLnBvcyA/IHRoaXMkMS5wb3MgOiB0aGlzJDEucHJldlBvcztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucG9zID0gcG9zO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmbihlKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogcG9pbnRlckRvd24sXHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbFNsaWRlcztcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZ2dhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICFpc1RvdWNoKGUpICYmIGhhc1RleHROb2Rlc09ubHkoZS50YXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGNsb3Nlc3QoZS50YXJnZXQsIHNlbElucHV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBlLmJ1dHRvbiA+IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5sZW5ndGggPCAyXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2RyYWdzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnID0gdGhpcy5wb3M7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RyYW5zaXRpb25lcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmNlbnQgPSB0aGlzLl90cmFuc2l0aW9uZXIucGVyY2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZyArPSB0aGlzLl90cmFuc2l0aW9uZXIuZ2V0RGlzdGFuY2UoKSAqIHRoaXMucGVyY2VudCAqIHRoaXMuZGlyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uZXIuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbmVyLnRyYW5zbGF0ZSh0aGlzLnBlcmNlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2SW5kZXggPSB0aGlzLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9uKGRvY3VtZW50LCBwb2ludGVyTW92ZSwgdGhpcy5tb3ZlLCB7cGFzc2l2ZTogZmFsc2V9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAnaW5wdXQnIGV2ZW50IGlzIHRyaWdnZXJlZCBieSB2aWRlbyBjb250cm9sc1xyXG4gICAgICAgICAgICAgICAgb24oZG9jdW1lbnQsIChwb2ludGVyVXAgKyBcIiBcIiArIHBvaW50ZXJDYW5jZWwgKyBcIiBpbnB1dFwiKSwgdGhpcy5lbmQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmxpc3QsICd1c2VyU2VsZWN0JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBtb3ZlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gdGhpcy5wb3MgLSB0aGlzLmRyYWc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlID09PSAwIHx8IHRoaXMucHJldlBvcyA9PT0gdGhpcy5wb3MgfHwgIXRoaXMuZHJhZ2dpbmcgJiYgTWF0aC5hYnMoZGlzdGFuY2UpIDwgdGhpcy50aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudCBjbGljayBldmVudFxyXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMubGlzdCwgJ3BvaW50ZXJFdmVudHMnLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGUuY2FuY2VsYWJsZSAmJiBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpciA9IChkaXN0YW5jZSA8IDAgPyAxIDogLTEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZWYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHJlZi5zbGlkZXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVmJDEgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IHJlZiQxLnByZXZJbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBkaXMgPSBNYXRoLmFicyhkaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gdGhpcy5nZXRJbmRleChwcmV2SW5kZXggKyB0aGlzLmRpciwgcHJldkluZGV4KTtcclxuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHRoaXMuX2dldERpc3RhbmNlKHByZXZJbmRleCwgbmV4dEluZGV4KSB8fCBzbGlkZXNbcHJldkluZGV4XS5vZmZzZXRXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobmV4dEluZGV4ICE9PSBwcmV2SW5kZXggJiYgZGlzID4gd2lkdGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnIC09IHdpZHRoICogdGhpcy5kaXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZJbmRleCA9IG5leHRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBkaXMgLT0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdGhpcy5nZXRJbmRleChwcmV2SW5kZXggKyB0aGlzLmRpciwgcHJldkluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHRoaXMuX2dldERpc3RhbmNlKHByZXZJbmRleCwgbmV4dEluZGV4KSB8fCBzbGlkZXNbcHJldkluZGV4XS5vZmZzZXRXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50ID0gZGlzIC8gd2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSBzbGlkZXNbcHJldkluZGV4XTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gc2xpZGVzW25leHRJbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlZCA9IHRoaXMuaW5kZXggIT09IG5leHRJbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBlZGdlID0gcHJldkluZGV4ID09PSBuZXh0SW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1TaG93bjtcclxuXHJcbiAgICAgICAgICAgICAgICBbdGhpcy5pbmRleCwgdGhpcy5wcmV2SW5kZXhdLmZpbHRlcihmdW5jdGlvbiAoaSkgeyByZXR1cm4gIWluY2x1ZGVzKFtuZXh0SW5kZXgsIHByZXZJbmRleF0sIGkpOyB9KS5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihzbGlkZXNbaV0sICdpdGVtaGlkZGVuJywgW3RoaXMkMV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWRnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtU2hvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEucHJldkluZGV4ID0gcHJldkluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gcHJldkluZGV4ICYmIHRoaXMucHJldkluZGV4ICE9PSBwcmV2SW5kZXggfHwgaXRlbVNob3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihzbGlkZXNbdGhpcy5pbmRleF0sICdpdGVtc2hvd24nLCBbdGhpc10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2SW5kZXggPSBwcmV2SW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IG5leHRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgIWVkZ2UgJiYgdHJpZ2dlcihwcmV2LCAnYmVmb3JlaXRlbWhpZGUnLCBbdGhpc10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIobmV4dCwgJ2JlZm9yZWl0ZW1zaG93JywgW3RoaXNdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uZXIgPSB0aGlzLl90cmFuc2xhdGUoTWF0aC5hYnModGhpcy5wZXJjZW50KSwgcHJldiwgIWVkZ2UgJiYgbmV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAhZWRnZSAmJiB0cmlnZ2VyKHByZXYsICdpdGVtaGlkZScsIFt0aGlzXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihuZXh0LCAnaXRlbXNob3cnLCBbdGhpc10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgb2ZmKGRvY3VtZW50LCBwb2ludGVyTW92ZSwgdGhpcy5tb3ZlLCB7cGFzc2l2ZTogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgIG9mZihkb2N1bWVudCwgKHBvaW50ZXJVcCArIFwiIFwiICsgcG9pbnRlckNhbmNlbCArIFwiIGlucHV0XCIpLCB0aGlzLmVuZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLnByZXZJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmNlbnQgPSAxIC0gdGhpcy5wZXJjZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpciAqPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvdyhmYWxzZSwgdGhpcy5pbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXJDaGFuZ2UgPSAoaXNSdGwgPyB0aGlzLmRpciAqIChpc1J0bCA/IDEgOiAtMSkgOiB0aGlzLmRpcikgPCAwID09PSB0aGlzLnByZXZQb3MgPiB0aGlzLnBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGRpckNoYW5nZSA/IHRoaXMuaW5kZXggOiB0aGlzLnByZXZJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJDaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IDEgLSB0aGlzLnBlcmNlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyh0aGlzLmRpciA+IDAgJiYgIWRpckNoYW5nZSB8fCB0aGlzLmRpciA8IDAgJiYgZGlyQ2hhbmdlID8gJ25leHQnIDogJ3ByZXZpb3VzJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5saXN0LCB7dXNlclNlbGVjdDogJycsIHBvaW50ZXJFdmVudHM6ICcnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnXHJcbiAgICAgICAgICAgICAgICAgICAgPSB0aGlzLnBlcmNlbnRcclxuICAgICAgICAgICAgICAgICAgICA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhc1RleHROb2Rlc09ubHkoZWwpIHtcclxuICAgICAgICByZXR1cm4gIWVsLmNoaWxkcmVuLmxlbmd0aCAmJiBlbC5jaGlsZE5vZGVzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgU2xpZGVyTmF2ID0ge1xyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHNlbE5hdjogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgbmF2OiBmdW5jdGlvbihyZWYsICRlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbE5hdiA9IHJlZi5zZWxOYXY7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoc2VsTmF2LCAkZWwpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc2VsTmF2SXRlbTogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0ckl0ZW0gPSByZWYuYXR0ckl0ZW07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcIltcIiArIGF0dHJJdGVtICsgXCJdLFtkYXRhLVwiICsgYXR0ckl0ZW0gKyBcIl1cIik7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBuYXZJdGVtczogZnVuY3Rpb24oXywgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJCQodGhpcy5zZWxOYXZJdGVtLCAkZWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZToge1xyXG5cclxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hdiAmJiB0aGlzLmxlbmd0aCAhPT0gdGhpcy5uYXYuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCh0aGlzLm5hdiwgdGhpcy5zbGlkZXMubWFwKGZ1bmN0aW9uIChfLCBpKSB7IHJldHVybiAoXCI8bGkgXCIgKyAodGhpcyQxLmF0dHJJdGVtKSArIFwiPVxcXCJcIiArIGkgKyBcIlxcXCI+PGEgaHJlZj48L2E+PC9saT5cIik7IH0pLmpvaW4oJycpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdkl0ZW1zLmNvbmNhdCh0aGlzLm5hdikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsICYmIChlbC5oaWRkZW4gPSAhdGhpcyQxLm1heEluZGV4KTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOYXYoKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiBbXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsTmF2SXRlbTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coZGF0YShlLmN1cnJlbnQsIHRoaXMuYXR0ckl0ZW0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1zaG93JyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6ICd1cGRhdGVOYXYnXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZU5hdjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSB0aGlzLmdldFZhbGlkSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNtZCA9IGRhdGEoZWwsIHRoaXMkMS5hdHRySXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGVsLCB0aGlzJDEuY2xzQWN0aXZlLCB0b051bWJlcihjbWQpID09PSBpKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgJ3VrLWludmlzaWJsZScsIHRoaXMkMS5maW5pdGUgJiYgKGNtZCA9PT0gJ3ByZXZpb3VzJyAmJiBpID09PSAwIHx8IGNtZCA9PT0gJ25leHQnICYmIGkgPj0gdGhpcyQxLm1heEluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIFNsaWRlciA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbU2xpZGVyQXV0b3BsYXksIFNsaWRlckRyYWcsIFNsaWRlck5hdl0sXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGNsc0FjdGl2YXRlZDogQm9vbGVhbixcclxuICAgICAgICAgICAgZWFzaW5nOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGluZGV4OiBOdW1iZXIsXHJcbiAgICAgICAgICAgIGZpbml0ZTogQm9vbGVhbixcclxuICAgICAgICAgICAgdmVsb2NpdHk6IE51bWJlcixcclxuICAgICAgICAgICAgc2VsU2xpZGVzOiBTdHJpbmdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiBmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xyXG4gICAgICAgICAgICBlYXNpbmc6ICdlYXNlJyxcclxuICAgICAgICAgICAgZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmVsb2NpdHk6IDEsXHJcbiAgICAgICAgICAgIGluZGV4OiAwLFxyXG4gICAgICAgICAgICBwcmV2SW5kZXg6IC0xLFxyXG4gICAgICAgICAgICBzdGFjazogW10sXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IDAsXHJcbiAgICAgICAgICAgIGNsc0FjdGl2ZTogJ3VrLWFjdGl2ZScsXHJcbiAgICAgICAgICAgIGNsc0FjdGl2YXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIFRyYW5zaXRpb25lcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25PcHRpb25zOiB7fVxyXG4gICAgICAgIH0pOyB9LFxyXG5cclxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5nZXRWYWxpZEluZGV4KHRoaXMuJHByb3BzLmluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuc2xpZGVzLCB0aGlzLmNsc0FjdGl2ZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBmdW5jdGlvbihyZWYsICRlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZlbG9jaXR5ID0gcmVmLnZlbG9jaXR5O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGVlZFVwKCRlbC5vZmZzZXRXaWR0aCAvIHZlbG9jaXR5KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGxpc3Q6IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsTGlzdCA9IHJlZi5zZWxMaXN0O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKHNlbExpc3QsICRlbCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBtYXhJbmRleDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc2VsU2xpZGVzOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxMaXN0ID0gcmVmLnNlbExpc3Q7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsU2xpZGVzID0gcmVmLnNlbFNsaWRlcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHNlbExpc3QgKyBcIiBcIiArIChzZWxTbGlkZXMgfHwgJz4gKicpKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHNsaWRlczoge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQkKHRoaXMuc2VsU2xpZGVzLCB0aGlzLiRlbCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGxlbmd0aDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zbGlkZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czoge1xyXG5cclxuICAgICAgICAgICAgaXRlbXNob3duOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHVwZGF0ZSh0aGlzLmxpc3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuXHJcbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uKGluZGV4LCBmb3JjZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGZvcmNlID09PSB2b2lkIDAgKSBmb3JjZSA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2luZyB8fCAhdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhY2sgPSByZWYuc3RhY2s7XHJcbiAgICAgICAgICAgICAgICB2YXIgcXVldWVJbmRleCA9IGZvcmNlID8gMCA6IHN0YWNrLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHZhciByZXNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFjay5zcGxpY2UocXVldWVJbmRleCwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnNob3coc3RhY2suc2hpZnQoKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdGFja1tmb3JjZSA/ICd1bnNoaWZ0JyA6ICdwdXNoJ10oaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZm9yY2UgJiYgc3RhY2subGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25lci5mb3J3YXJkKE1hdGgubWluKHRoaXMuZHVyYXRpb24sIDIwMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcmV2SW5kZXggPSB0aGlzLmdldEluZGV4KHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSBoYXNDbGFzcyh0aGlzLnNsaWRlcywgdGhpcy5jbHNBY3RpdmUpICYmIHRoaXMuc2xpZGVzW3ByZXZJbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gdGhpcy5nZXRJbmRleChpbmRleCwgdGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHRoaXMuc2xpZGVzW25leHRJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHByZXYgPT09IG5leHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGdldERpcmVjdGlvbihpbmRleCwgcHJldkluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldkluZGV4ID0gcHJldkluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IG5leHRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJldiAmJiAhdHJpZ2dlcihwcmV2LCAnYmVmb3JlaXRlbWhpZGUnLCBbdGhpc10pXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgIXRyaWdnZXIobmV4dCwgJ2JlZm9yZWl0ZW1zaG93JywgW3RoaXMsIHByZXZdKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMucHJldkluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5fc2hvdyhwcmV2LCBuZXh0LCBmb3JjZSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByZXYgJiYgdHJpZ2dlcihwcmV2LCAnaXRlbWhpZGRlbicsIFt0aGlzJDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKG5leHQsICdpdGVtc2hvd24nLCBbdGhpcyQxXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhc3Rkb20ud3JpdGUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuc2hvdyhzdGFjay5zaGlmdCgpLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLl90cmFuc2l0aW9uZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2ICYmIHRyaWdnZXIocHJldiwgJ2l0ZW1oaWRlJywgW3RoaXNdKTtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIobmV4dCwgJ2l0ZW1zaG93JywgW3RoaXNdKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXRJbmRleDogZnVuY3Rpb24oaW5kZXgsIHByZXYpIHtcclxuICAgICAgICAgICAgICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gdGhpcy5pbmRleDtcclxuICAgICAgICAgICAgICAgIGlmICggcHJldiA9PT0gdm9pZCAwICkgcHJldiA9IHRoaXMuaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsYW1wKGdldEluZGV4KGluZGV4LCB0aGlzLnNsaWRlcywgcHJldiwgdGhpcy5maW5pdGUpLCAwLCB0aGlzLm1heEluZGV4KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldFZhbGlkSW5kZXg6IGZ1bmN0aW9uKGluZGV4LCBwcmV2SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gdGhpcy5pbmRleDtcclxuICAgICAgICAgICAgICAgIGlmICggcHJldkluZGV4ID09PSB2b2lkIDAgKSBwcmV2SW5kZXggPSB0aGlzLnByZXZJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJbmRleChpbmRleCwgcHJldkluZGV4KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIF9zaG93OiBmdW5jdGlvbihwcmV2LCBuZXh0LCBmb3JjZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25lciA9IHRoaXMuX2dldFRyYW5zaXRpb25lcihcclxuICAgICAgICAgICAgICAgICAgICBwcmV2LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiBmb3JjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXh0Lm9mZnNldFdpZHRoIDwgNjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnY3ViaWMtYmV6aWVyKDAuMjUsIDAuNDYsIDAuNDUsIDAuOTQpJyAvKiBlYXNlT3V0UXVhZCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2N1YmljLWJlemllcigwLjE2NSwgMC44NCwgMC40NCwgMSknIC8qIGVhc2VPdXRRdWFydCAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmVhc2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMudHJhbnNpdGlvbk9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZm9yY2UgJiYgIXByZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2xhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXMuc3RhY2s7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gcmVmLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFuc2l0aW9uZXJbbGVuZ3RoID4gMSA/ICdmb3J3YXJkJyA6ICdzaG93J10obGVuZ3RoID4gMSA/IE1hdGgubWluKHRoaXMuZHVyYXRpb24sIDc1ICsgNzUgLyAobGVuZ3RoIC0gMSkpIDogdGhpcy5kdXJhdGlvbiwgdGhpcy5wZXJjZW50KTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBfZ2V0RGlzdGFuY2U6IGZ1bmN0aW9uKHByZXYsIG5leHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRUcmFuc2l0aW9uZXIocHJldiwgcHJldiAhPT0gbmV4dCAmJiBuZXh0KS5nZXREaXN0YW5jZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgX3RyYW5zbGF0ZTogZnVuY3Rpb24ocGVyY2VudCwgcHJldiwgbmV4dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBwcmV2ID09PSB2b2lkIDAgKSBwcmV2ID0gdGhpcy5wcmV2SW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZiAoIG5leHQgPT09IHZvaWQgMCApIG5leHQgPSB0aGlzLmluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uZXIgPSB0aGlzLl9nZXRUcmFuc2l0aW9uZXIocHJldiAhPT0gbmV4dCA/IHByZXYgOiBmYWxzZSwgbmV4dCk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uZXIudHJhbnNsYXRlKHBlcmNlbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25lcjtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIF9nZXRUcmFuc2l0aW9uZXI6IGZ1bmN0aW9uKHByZXYsIG5leHQsIGRpciwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBwcmV2ID09PSB2b2lkIDAgKSBwcmV2ID0gdGhpcy5wcmV2SW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZiAoIG5leHQgPT09IHZvaWQgMCApIG5leHQgPSB0aGlzLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYgKCBkaXIgPT09IHZvaWQgMCApIGRpciA9IHRoaXMuZGlyIHx8IDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB0aGlzLnRyYW5zaXRpb25PcHRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5UcmFuc2l0aW9uZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgaXNOdW1iZXIocHJldikgPyB0aGlzLnNsaWRlc1twcmV2XSA6IHByZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNOdW1iZXIobmV4dCkgPyB0aGlzLnNsaWRlc1tuZXh0XSA6IG5leHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyICogKGlzUnRsID8gLTEgOiAxKSxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldERpcmVjdGlvbihpbmRleCwgcHJldkluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSAnbmV4dCdcclxuICAgICAgICAgICAgPyAxXHJcbiAgICAgICAgICAgIDogaW5kZXggPT09ICdwcmV2aW91cydcclxuICAgICAgICAgICAgICAgID8gLTFcclxuICAgICAgICAgICAgICAgIDogaW5kZXggPCBwcmV2SW5kZXhcclxuICAgICAgICAgICAgICAgICAgICA/IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgOiAxO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNwZWVkVXAoeCkge1xyXG4gICAgICAgIHJldHVybiAuNSAqIHggKyAzMDA7IC8vIHBhcmFib2xhIHRocm91Z2ggKDQwMCw1MDA7IDYwMCw2MDA7IDE4MDAsMTIwMClcclxuICAgIH1cclxuXHJcbiAgICB2YXIgU2xpZGVzaG93ID0ge1xyXG5cclxuICAgICAgICBtaXhpbnM6IFtTbGlkZXJdLFxyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBhbmltYXRpb246IFN0cmluZ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiAnc2xpZGUnLFxyXG4gICAgICAgICAgICBjbHNBY3RpdmF0ZWQ6ICd1ay10cmFuc2l0aW9uLWFjdGl2ZScsXHJcbiAgICAgICAgICAgIEFuaW1hdGlvbnM6IEFuaW1hdGlvbnMkMixcclxuICAgICAgICAgICAgVHJhbnNpdGlvbmVyOiBUcmFuc2l0aW9uZXIkMVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgICAgICBhbmltYXRpb246IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IHJlZi5hbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICB2YXIgQW5pbWF0aW9ucyA9IHJlZi5BbmltYXRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBhc3NpZ24oQW5pbWF0aW9uc1thbmltYXRpb25dIHx8IEFuaW1hdGlvbnMuc2xpZGUsIHtuYW1lOiBhbmltYXRpb259KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25PcHRpb25zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7YW5pbWF0aW9uOiB0aGlzLmFuaW1hdGlvbn07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiB7XHJcblxyXG4gICAgICAgICAgICAnaXRlbXNob3cgaXRlbWhpZGUgaXRlbXNob3duIGl0ZW1oaWRkZW4nOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJHVwZGF0ZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYmVmb3JlaXRlbXNob3c6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGFyZ2V0LCB0aGlzLmNsc0FjdGl2ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpdGVtc2hvd246IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGFyZ2V0LCB0aGlzLmNsc0FjdGl2YXRlZCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpdGVtaGlkZGVuOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRhcmdldCwgdGhpcy5jbHNBY3RpdmUsIHRoaXMuY2xzQWN0aXZhdGVkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgTGlnaHRib3hQYW5lbCA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbQ29udGFpbmVyLCBNb2RhbCwgVG9nZ2xhYmxlLCBTbGlkZXNob3ddLFxyXG5cclxuICAgICAgICBmdW5jdGlvbmFsOiB0cnVlLFxyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBkZWxheUNvbnRyb2xzOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHByZWxvYWQ6IE51bWJlcixcclxuICAgICAgICAgICAgdmlkZW9BdXRvcGxheTogQm9vbGVhbixcclxuICAgICAgICAgICAgdGVtcGxhdGU6IFN0cmluZ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIHByZWxvYWQ6IDEsXHJcbiAgICAgICAgICAgIHZpZGVvQXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBkZWxheUNvbnRyb2xzOiAzMDAwLFxyXG4gICAgICAgICAgICBpdGVtczogW10sXHJcbiAgICAgICAgICAgIGNsczogJ3VrLW9wZW4nLFxyXG4gICAgICAgICAgICBjbHNQYWdlOiAndWstbGlnaHRib3gtcGFnZScsXHJcbiAgICAgICAgICAgIHNlbExpc3Q6ICcudWstbGlnaHRib3gtaXRlbXMnLFxyXG4gICAgICAgICAgICBhdHRySXRlbTogJ3VrLWxpZ2h0Ym94LWl0ZW0nLFxyXG4gICAgICAgICAgICBzZWxDbG9zZTogJy51ay1jbG9zZS1sYXJnZScsXHJcbiAgICAgICAgICAgIHNlbENhcHRpb246ICcudWstbGlnaHRib3gtY2FwdGlvbicsXHJcbiAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHZlbG9jaXR5OiAyLFxyXG4gICAgICAgICAgICBBbmltYXRpb25zOiBBbmltYXRpb25zJDEsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9XFxcInVrLWxpZ2h0Ym94IHVrLW92ZXJmbG93LWhpZGRlblxcXCI+IDx1bCBjbGFzcz1cXFwidWstbGlnaHRib3gtaXRlbXNcXFwiPjwvdWw+IDxkaXYgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LXRvb2xiYXIgdWstcG9zaXRpb24tdG9wIHVrLXRleHQtcmlnaHQgdWstdHJhbnNpdGlvbi1zbGlkZS10b3AgdWstdHJhbnNpdGlvbi1vcGFxdWVcXFwiPiA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1saWdodGJveC10b29sYmFyLWljb24gdWstY2xvc2UtbGFyZ2VcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdWstY2xvc2U+PC9idXR0b24+IDwvZGl2PiA8YSBjbGFzcz1cXFwidWstbGlnaHRib3gtYnV0dG9uIHVrLXBvc2l0aW9uLWNlbnRlci1sZWZ0IHVrLXBvc2l0aW9uLW1lZGl1bSB1ay10cmFuc2l0aW9uLWZhZGVcXFwiIGhyZWYgdWstc2xpZGVuYXYtcHJldmlvdXMgdWstbGlnaHRib3gtaXRlbT1cXFwicHJldmlvdXNcXFwiPjwvYT4gPGEgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LWJ1dHRvbiB1ay1wb3NpdGlvbi1jZW50ZXItcmlnaHQgdWstcG9zaXRpb24tbWVkaXVtIHVrLXRyYW5zaXRpb24tZmFkZVxcXCIgaHJlZiB1ay1zbGlkZW5hdi1uZXh0IHVrLWxpZ2h0Ym94LWl0ZW09XFxcIm5leHRcXFwiPjwvYT4gPGRpdiBjbGFzcz1cXFwidWstbGlnaHRib3gtdG9vbGJhciB1ay1saWdodGJveC1jYXB0aW9uIHVrLXBvc2l0aW9uLWJvdHRvbSB1ay10ZXh0LWNlbnRlciB1ay10cmFuc2l0aW9uLXNsaWRlLWJvdHRvbSB1ay10cmFuc2l0aW9uLW9wYXF1ZVxcXCI+PC9kaXY+IDwvZGl2PlwiXHJcbiAgICAgICAgfSk7IH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyICRlbCA9ICQodGhpcy50ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gJCh0aGlzLnNlbExpc3QsICRlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoKSB7IHJldHVybiBhcHBlbmQobGlzdCwgJzxsaT4nKTsgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRtb3VudChhcHBlbmQodGhpcy5jb250YWluZXIsICRlbCkpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgY2FwdGlvbjogZnVuY3Rpb24ocmVmLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxDYXB0aW9uID0gcmVmLnNlbENhcHRpb247XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoc2VsQ2FwdGlvbiwgJGVsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBldmVudHM6IFtcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAocG9pbnRlck1vdmUgKyBcIiBcIiArIHBvaW50ZXJEb3duICsgXCIga2V5ZG93blwiKSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAnc2hvd0NvbnRyb2xzJ1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbFNsaWRlcztcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hvd24nLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q29udHJvbHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUNvbnRyb2xzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuc2xpZGVzLCB0aGlzLmNsc0FjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5zdG9wKHRoaXMuc2xpZGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGRlbicsXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRkZXN0cm95KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAna2V5dXAnLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVG9nZ2xlZCh0aGlzLiRlbCkgfHwgIXRoaXMuZHJhZ2dhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coJ3ByZXZpb3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygnbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVpdGVtc2hvdycsXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLiRlbCwgdHJ1ZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IEFuaW1hdGlvbnMkMVsnc2NhbGUnXTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhlLnRhcmdldCwgdGhpcy5jbHNBY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2suc3BsaWNlKDEsIDAsIHRoaXMuaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1zaG93JyxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCh0aGlzLmNhcHRpb24sIHRoaXMuZ2V0SXRlbSgpLmNhcHRpb24gfHwgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gLXRoaXMucHJlbG9hZDsgaiA8PSB0aGlzLnByZWxvYWQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRJdGVtKHRoaXMuaW5kZXggKyBqKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnaXRlbXNob3duJyxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IHRoaXMuJHByb3BzLmRyYWdnYWJsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1sb2FkJyxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihfLCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3JjID0gaXRlbS5zb3VyY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBpdGVtLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFsdCA9IGl0ZW0uYWx0OyBpZiAoIGFsdCA9PT0gdm9pZCAwICkgYWx0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3RlciA9IGl0ZW0ucG9zdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRycyA9IGl0ZW0uYXR0cnM7IGlmICggYXR0cnMgPT09IHZvaWQgMCApIGF0dHJzID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SXRlbShpdGVtLCAnPHNwYW4gdWstc3Bpbm5lcj48L3NwYW4+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZnJhbWVBdHRycyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVib3JkZXI6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3c6ICdhdXRvcGxheScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnbWF4LXdpZHRoOiAxMDAlOyBib3gtc2l6aW5nOiBib3JkZXItYm94OycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1ay1yZXNwb25zaXZlJzogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1ay12aWRlbyc6IChcIlwiICsgKHRoaXMudmlkZW9BdXRvcGxheSkpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2ltYWdlJyB8fCBzcmMubWF0Y2goL1xcLihhdmlmfGpwZT9nfGE/cG5nfGdpZnxzdmd8d2VicCkoJHxcXD8pL2kpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJbWFnZShzcmMsIGF0dHJzLnNyY3NldCwgYXR0cnMuc2l6ZSkudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSByZWYud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzJDEuc2V0SXRlbShpdGVtLCBjcmVhdGVFbCgnaW1nJywgYXNzaWduKHtzcmM6IHNyYywgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgYWx0OiBhbHR9LCBhdHRycykpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5zZXRFcnJvcihpdGVtKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBWaWRlb1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3ZpZGVvJyB8fCBzcmMubWF0Y2goL1xcLihtcDR8d2VibXxvZ3YpKCR8XFw/KS9pKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvID0gY3JlYXRlRWwoJ3ZpZGVvJywgYXNzaWduKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGVyOiBwb3N0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sczogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5c2lubGluZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWstdmlkZW8nOiAoXCJcIiArICh0aGlzLnZpZGVvQXV0b3BsYXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBhdHRycykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb24odmlkZW8sICdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIodmlkZW8sIHt3aWR0aDogdmlkZW8udmlkZW9XaWR0aCwgaGVpZ2h0OiB2aWRlby52aWRlb0hlaWdodH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnNldEl0ZW0oaXRlbSwgdmlkZW8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb24odmlkZW8sICdlcnJvcicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5zZXRFcnJvcihpdGVtKTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2lmcmFtZScgfHwgc3JjLm1hdGNoKC9cXC4oaHRtbHxwaHApKCR8XFw/KS9pKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtKGl0ZW0sIGNyZWF0ZUVsKCdpZnJhbWUnLCBhc3NpZ24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZWJvcmRlcjogJzAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAndWstbGlnaHRib3gtaWZyYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBhdHRycykpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gWW91VHViZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKG1hdGNoZXMgPSBzcmMubWF0Y2goL1xcL1xcLyg/Oi4qP3lvdXR1YmUoLW5vY29va2llKT9cXC4uKj9bPyZddj18eW91dHVcXC5iZVxcLykoW1xcdy1dezExfSlbJj9dPyguKik/LykpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSwgY3JlYXRlRWwoJ2lmcmFtZScsIGFzc2lnbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IChcImh0dHBzOi8vd3d3LnlvdXR1YmVcIiArIChtYXRjaGVzWzFdIHx8ICcnKSArIFwiLmNvbS9lbWJlZC9cIiArIChtYXRjaGVzWzJdKSArIChtYXRjaGVzWzNdID8gKFwiP1wiICsgKG1hdGNoZXNbM10pKSA6ICcnKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTkyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTA4MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBpZnJhbWVBdHRycywgYXR0cnMpKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpbWVvXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgobWF0Y2hlcyA9IHNyYy5tYXRjaCgvXFwvXFwvLio/dmltZW9cXC5bYS16XStcXC8oXFxkKylbJj9dPyguKik/LykpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhamF4KChcImh0dHBzOi8vdmltZW8uY29tL2FwaS9vZW1iZWQuanNvbj9tYXh3aWR0aD0xOTIwJnVybD1cIiArIChlbmNvZGVVUkkoc3JjKSkpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmX3Jlc3BvbnNlID0gcmVmLnJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWZfcmVzcG9uc2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZl9yZXNwb25zZS53aWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMkMS5zZXRJdGVtKGl0ZW0sIGNyZWF0ZUVsKCdpZnJhbWUnLCBhc3NpZ24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogKFwiaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvL1wiICsgKG1hdGNoZXNbMV0pICsgKG1hdGNoZXNbMl0gPyAoXCI/XCIgKyAobWF0Y2hlc1syXSkpIDogJycpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGlmcmFtZUF0dHJzLCBhdHRycykpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5zZXRFcnJvcihpdGVtKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICBsb2FkSXRlbTogZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gdGhpcy5pbmRleDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5nZXRTbGlkZShpdGVtKS5jaGlsZEVsZW1lbnRDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdpdGVtbG9hZCcsIFtpdGVtXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXRJdGVtOiBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBpbmRleCA9PT0gdm9pZCAwICkgaW5kZXggPSB0aGlzLmluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zW2dldEluZGV4KGluZGV4LCB0aGlzLnNsaWRlcyldO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc2V0SXRlbTogZnVuY3Rpb24oaXRlbSwgY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2l0ZW1sb2FkZWQnLCBbdGhpcywgaHRtbCh0aGlzLmdldFNsaWRlKGl0ZW0pLCBjb250ZW50KSBdKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldFNsaWRlOiBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zbGlkZXNbdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pXTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHNldEVycm9yOiBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSwgJzxzcGFuIHVrLWljb249XCJpY29uOiBib2x0OyByYXRpbzogMlwiPjwvc3Bhbj4nKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHNob3dDb250cm9sczogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY29udHJvbHNUaW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xzVGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuaGlkZUNvbnRyb2xzLCB0aGlzLmRlbGF5Q29udHJvbHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCAndWstYWN0aXZlJywgJ3VrLXRyYW5zaXRpb24tYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaGlkZUNvbnRyb2xzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCAndWstYWN0aXZlJywgJ3VrLXRyYW5zaXRpb24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWwodGFnLCBhdHRycykge1xyXG4gICAgICAgIHZhciBlbCA9IGZyYWdtZW50KChcIjxcIiArIHRhZyArIFwiPlwiKSk7XHJcbiAgICAgICAgYXR0cihlbCwgYXR0cnMpO1xyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbGlnaHRib3ggPSB7XHJcblxyXG4gICAgICAgIGluc3RhbGw6IGluc3RhbGwkMSxcclxuXHJcbiAgICAgICAgcHJvcHM6IHt0b2dnbGU6IFN0cmluZ30sXHJcblxyXG4gICAgICAgIGRhdGE6IHt0b2dnbGU6ICdhJ30sXHJcblxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgICAgICB0b2dnbGVzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihyZWYsICRlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2dnbGUgPSByZWYudG9nZ2xlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCQodG9nZ2xlLCAkZWwpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB3YXRjaDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czogW1xyXG5cclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMudG9nZ2xlKSArIFwiOm5vdCgudWstZGlzYWJsZWQpXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhlLmN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9IHVuaXF1ZUJ5KHRoaXMudG9nZ2xlcy5tYXAodG9JdGVtKSwgJ3NvdXJjZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0VsZW1lbnQoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRvSXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHJlZi5zb3VyY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBmaW5kSW5kZXgoaXRlbXMsIGZ1bmN0aW9uIChyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNyYyA9IHJlZi5zb3VyY2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlID09PSBzcmM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbCA9IHRoaXMucGFuZWwgfHwgdGhpcy4kY3JlYXRlKCdsaWdodGJveFBhbmVsJywgYXNzaWduKHt9LCB0aGlzLiRwcm9wcywge2l0ZW1zOiBpdGVtc30pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvbih0aGlzLnBhbmVsLiRlbCwgJ2hpZGRlbicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5wYW5lbCA9IGZhbHNlOyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbC5zaG93KGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBoaWRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbCAmJiB0aGlzLnBhbmVsLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaW5zdGFsbCQxKFVJa2l0LCBMaWdodGJveCkge1xyXG5cclxuICAgICAgICBpZiAoIVVJa2l0LmxpZ2h0Ym94UGFuZWwpIHtcclxuICAgICAgICAgICAgVUlraXQuY29tcG9uZW50KCdsaWdodGJveFBhbmVsJywgTGlnaHRib3hQYW5lbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhc3NpZ24oXHJcbiAgICAgICAgICAgIExpZ2h0Ym94LnByb3BzLFxyXG4gICAgICAgICAgICBVSWtpdC5jb21wb25lbnQoJ2xpZ2h0Ym94UGFuZWwnKS5vcHRpb25zLnByb3BzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9JdGVtKGVsKSB7XHJcblxyXG4gICAgICAgIHZhciBpdGVtID0ge307XHJcblxyXG4gICAgICAgIFsnaHJlZicsICdjYXB0aW9uJywgJ3R5cGUnLCAncG9zdGVyJywgJ2FsdCcsICdhdHRycyddLmZvckVhY2goZnVuY3Rpb24gKGF0dHIpIHtcclxuICAgICAgICAgICAgaXRlbVthdHRyID09PSAnaHJlZicgPyAnc291cmNlJyA6IGF0dHJdID0gZGF0YShlbCwgYXR0cik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ZW0uYXR0cnMgPSBwYXJzZU9wdGlvbnMoaXRlbS5hdHRycyk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvYmokMTtcclxuXHJcbiAgICB2YXIgbm90aWZpY2F0aW9uID0ge1xyXG5cclxuICAgICAgICBtaXhpbnM6IFtDb250YWluZXJdLFxyXG5cclxuICAgICAgICBmdW5jdGlvbmFsOiB0cnVlLFxyXG5cclxuICAgICAgICBhcmdzOiBbJ21lc3NhZ2UnLCAnc3RhdHVzJ10sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogJycsXHJcbiAgICAgICAgICAgIHN0YXR1czogJycsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IDUwMDAsXHJcbiAgICAgICAgICAgIGdyb3VwOiBudWxsLFxyXG4gICAgICAgICAgICBwb3M6ICd0b3AtY2VudGVyJyxcclxuICAgICAgICAgICAgY2xzQ29udGFpbmVyOiAndWstbm90aWZpY2F0aW9uJyxcclxuICAgICAgICAgICAgY2xzQ2xvc2U6ICd1ay1ub3RpZmljYXRpb24tY2xvc2UnLFxyXG4gICAgICAgICAgICBjbHNNc2c6ICd1ay1ub3RpZmljYXRpb24tbWVzc2FnZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbnN0YWxsOiBpbnN0YWxsLFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgbWFyZ2luUHJvcDogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gcmVmLnBvcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFwibWFyZ2luXCIgKyAoc3RhcnRzV2l0aChwb3MsICd0b3AnKSA/ICdUb3AnIDogJ0JvdHRvbScpKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0UHJvcHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iajtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCBvYmogPSB7b3BhY2l0eTogMH0sIG9ialt0aGlzLm1hcmdpblByb3BdID0gLXRoaXMuJGVsLm9mZnNldEhlaWdodCwgb2JqICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJCgoXCIuXCIgKyAodGhpcy5jbHNDb250YWluZXIpICsgXCItXCIgKyAodGhpcy5wb3MpKSwgdGhpcy5jb250YWluZXIpXHJcbiAgICAgICAgICAgICAgICB8fCBhcHBlbmQodGhpcy5jb250YWluZXIsIChcIjxkaXYgY2xhc3M9XFxcIlwiICsgKHRoaXMuY2xzQ29udGFpbmVyKSArIFwiIFwiICsgKHRoaXMuY2xzQ29udGFpbmVyKSArIFwiLVwiICsgKHRoaXMucG9zKSArIFwiXFxcIiBzdHlsZT1cXFwiZGlzcGxheTogYmxvY2tcXFwiPjwvZGl2PlwiKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRtb3VudChhcHBlbmQoY29udGFpbmVyLFxyXG4gICAgICAgICAgICAgICAgKFwiPGRpdiBjbGFzcz1cXFwiXCIgKyAodGhpcy5jbHNNc2cpICsgKHRoaXMuc3RhdHVzID8gKFwiIFwiICsgKHRoaXMuY2xzTXNnKSArIFwiLVwiICsgKHRoaXMuc3RhdHVzKSkgOiAnJykgKyBcIlxcXCI+IDxhIGhyZWYgY2xhc3M9XFxcIlwiICsgKHRoaXMuY2xzQ2xvc2UpICsgXCJcXFwiIGRhdGEtdWstY2xvc2U+PC9hPiA8ZGl2PlwiICsgKHRoaXMubWVzc2FnZSkgKyBcIjwvZGl2PiA8L2Rpdj5cIilcclxuICAgICAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgb2JqO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBtYXJnaW4gPSB0b0Zsb2F0KGNzcyh0aGlzLiRlbCwgdGhpcy5tYXJnaW5Qcm9wKSk7XHJcbiAgICAgICAgICAgIFRyYW5zaXRpb24uc3RhcnQoXHJcbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHRoaXMuc3RhcnRQcm9wcyksXHJcbiAgICAgICAgICAgICAgICAoIG9iaiA9IHtvcGFjaXR5OiAxfSwgb2JqW3RoaXMubWFyZ2luUHJvcF0gPSBtYXJnaW4sIG9iaiApXHJcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcyQxLnRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzJDEudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMkMS5jbG9zZSwgdGhpcyQxLnRpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiAoIG9iaiQxID0ge1xyXG5cclxuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0KGUudGFyZ2V0LCAnYVtocmVmPVwiI1wiXSxhW2hyZWY9XCJcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCBvYmokMVtwb2ludGVyRW50ZXJdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIG9iaiQxW3BvaW50ZXJMZWF2ZV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQodGhpcy5jbG9zZSwgdGhpcy50aW1lb3V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgb2JqJDEgKSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKGltbWVkaWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZW1vdmVGbiA9IGZ1bmN0aW9uIChlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gcGFyZW50KGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihlbCwgJ2Nsb3NlJywgW3RoaXMkMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZSQxKGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lciAmJiAhY29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUkMShjb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbW1lZGlhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVGbih0aGlzLiRlbCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uc3RhcnQodGhpcy4kZWwsIHRoaXMuc3RhcnRQcm9wcykudGhlbihyZW1vdmVGbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaW5zdGFsbChVSWtpdCkge1xyXG4gICAgICAgIFVJa2l0Lm5vdGlmaWNhdGlvbi5jbG9zZUFsbCA9IGZ1bmN0aW9uIChncm91cCwgaW1tZWRpYXRlKSB7XHJcbiAgICAgICAgICAgIGFwcGx5JDEoZG9jdW1lbnQuYm9keSwgZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uID0gVUlraXQuZ2V0Q29tcG9uZW50KGVsLCAnbm90aWZpY2F0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uICYmICghZ3JvdXAgfHwgZ3JvdXAgPT09IG5vdGlmaWNhdGlvbi5ncm91cCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uY2xvc2UoaW1tZWRpYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcHJvcHMgPSBbJ3gnLCAneScsICdiZ3gnLCAnYmd5JywgJ3JvdGF0ZScsICdzY2FsZScsICdjb2xvcicsICdiYWNrZ3JvdW5kQ29sb3InLCAnYm9yZGVyQ29sb3InLCAnb3BhY2l0eScsICdibHVyJywgJ2h1ZScsICdncmF5c2NhbGUnLCAnaW52ZXJ0JywgJ3NhdHVyYXRlJywgJ3NlcGlhJywgJ2ZvcGFjaXR5JywgJ3N0cm9rZSddO1xyXG5cclxuICAgIHZhciBQYXJhbGxheCA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbTWVkaWFdLFxyXG5cclxuICAgICAgICBwcm9wczogcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChwcm9wcywgcHJvcCkge1xyXG4gICAgICAgICAgICBwcm9wc1twcm9wXSA9ICdsaXN0JztcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgICAgIH0sIHt9KSxcclxuXHJcbiAgICAgICAgZGF0YTogcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChkYXRhLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIGRhdGFbcHJvcF0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0sIHt9KSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIHByb3BzOiBmdW5jdGlvbihwcm9wZXJ0aWVzLCAkZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChwcm9wcywgcHJvcCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQocHJvcGVydGllc1twcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29sb3IgPSBwcm9wLm1hdGNoKC9jb2xvci9pKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNDc3NQcm9wID0gaXNDb2xvciB8fCBwcm9wID09PSAnb3BhY2l0eSc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MsIGJnUG9zLCBkaWZmO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGVwcyA9IHByb3BlcnRpZXNbcHJvcF0uc2xpY2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ3NzUHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoJGVsLCBwcm9wLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcHMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwcy51bnNoaWZ0KChwcm9wID09PSAnc2NhbGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNDc3NQcm9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjc3MoJGVsLCBwcm9wKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMCkgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdW5pdCA9IGdldFVuaXQoc3RlcHMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb2xvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9ICRlbC5zdHlsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gcmVmLmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwcyA9IHN0ZXBzLm1hcChmdW5jdGlvbiAoc3RlcCkgeyByZXR1cm4gcGFyc2VDb2xvcigkZWwsIHN0ZXApOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLnN0eWxlLmNvbG9yID0gY29sb3I7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRzV2l0aChwcm9wLCAnYmcnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBwcm9wID09PSAnYmd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHMgPSBzdGVwcy5tYXAoZnVuY3Rpb24gKHN0ZXApIHsgcmV0dXJuIHRvUHgoc3RlcCwgYXR0ciwgdGhpcyQxLiRlbCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKCRlbCwgKFwiYmFja2dyb3VuZC1wb3NpdGlvbi1cIiArIChwcm9wWzJdKSksICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmdQb3MgPSBjc3MoJGVsLCAnYmFja2dyb3VuZFBvc2l0aW9uJykuc3BsaXQoJyAnKVtwcm9wWzJdID09PSAneCcgPyAwIDogMV07IC8vIElFIDExIGNhbid0IHJlYWQgYmFja2dyb3VuZC1wb3NpdGlvbi1beHx5XVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5jb3ZlcnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluID0gTWF0aC5taW4uYXBwbHkoTWF0aCwgc3RlcHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIHN0ZXBzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb3duID0gc3RlcHMuaW5kZXhPZihtaW4pIDwgc3RlcHMuaW5kZXhPZihtYXgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYgPSBtYXggLSBtaW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHMgPSBzdGVwcy5tYXAoZnVuY3Rpb24gKHN0ZXApIHsgcmV0dXJuIHN0ZXAgLSAoZG93biA/IG1pbiA6IG1heCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gKGRvd24gPyAtZGlmZiA6IDApICsgXCJweFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBiZ1BvcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzID0gc3RlcHMubWFwKHRvRmxvYXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSAnc3Ryb2tlJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGVwcy5zb21lKGZ1bmN0aW9uIChzdGVwKSB7IHJldHVybiBzdGVwOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gZ2V0TWF4UGF0aExlbmd0aCh0aGlzJDEuJGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKCRlbCwgJ3N0cm9rZURhc2hhcnJheScsIGxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5pdCA9PT0gJyUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwcyA9IHN0ZXBzLm1hcChmdW5jdGlvbiAoc3RlcCkgeyByZXR1cm4gc3RlcCAqIGxlbmd0aCAvIDEwMDsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzID0gc3RlcHMucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcCA9ICdzdHJva2VEYXNob2Zmc2V0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzW3Byb3BdID0ge3N0ZXBzOiBzdGVwcywgdW5pdDogdW5pdCwgcG9zOiBwb3MsIGJnUG9zOiBiZ1BvcywgZGlmZjogZGlmZn07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcztcclxuXHJcbiAgICAgICAgICAgICAgICB9LCB7fSk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYmdQcm9wczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWydiZ3gnLCAnYmd5J10uZmlsdGVyKGZ1bmN0aW9uIChiZykgeyByZXR1cm4gYmcgaW4gdGhpcyQxLnByb3BzOyB9KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNvdmVyczogZnVuY3Rpb24oXywgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY292ZXJzKCRlbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2ltYWdlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZToge1xyXG5cclxuICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaE1lZGlhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5pbWFnZSAmJiB0aGlzLmNvdmVycyAmJiB0aGlzLmJnUHJvcHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNyYyA9IGNzcyh0aGlzLiRlbCwgJ2JhY2tncm91bmRJbWFnZScpLnJlcGxhY2UoL15ub25lfHVybFxcKFtcIiddPyguKz8pW1wiJ10/XFwpJC8sICckMScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IHNyYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pbWFnZSA9IGltZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW1nLm5hdHVyYWxXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS4kdXBkYXRlKCk7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbWFnZSA9IGRhdGEuaW1hZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpbWFnZSB8fCAhaW1hZ2UubmF0dXJhbFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkaW1FbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy4kZWwub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLiRlbC5vZmZzZXRIZWlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGltSW1hZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGltYWdlLm5hdHVyYWxXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGltYWdlLm5hdHVyYWxIZWlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRpbSA9IERpbWVuc2lvbnMuY292ZXIoZGltSW1hZ2UsIGRpbUVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcyQxLnByb3BzW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmID0gcmVmLmRpZmY7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJnUG9zID0gcmVmLmJnUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGVwcyA9IHJlZi5zdGVwcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IHByb3AgPT09ICdiZ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcGFuID0gZGltW2F0dHJdIC0gZGltRWxbYXR0cl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGFuIDwgZGlmZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaW1FbFthdHRyXSA9IGRpbVthdHRyXSArIGRpZmYgLSBzcGFuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3BhbiA+IGRpZmYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3NQZXJjZW50YWdlID0gZGltRWxbYXR0cl0gLyB0b1B4KGJnUG9zLCBhdHRyLCB0aGlzJDEuJGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NQZXJjZW50YWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEucHJvcHNbcHJvcF0uc3RlcHMgPSBzdGVwcy5tYXAoZnVuY3Rpb24gKHN0ZXApIHsgcmV0dXJuIHN0ZXAgLSAoc3BhbiAtIGRpZmYpIC8gcG9zUGVyY2VudGFnZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRpbSA9IERpbWVuc2lvbnMuY292ZXIoZGltSW1hZ2UsIGRpbUVsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEuZGltID0gZGltO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpbSA9IHJlZi5kaW07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXRjaE1lZGlhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7YmFja2dyb3VuZFNpemU6ICcnLCBiYWNrZ3JvdW5kUmVwZWF0OiAnJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkaW0gJiYgY3NzKHRoaXMuJGVsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICgoZGltLndpZHRoKSArIFwicHggXCIgKyAoZGltLmhlaWdodCkgKyBcInB4XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgZWFjaCh0aGlzLmdldENzcygwKSwgZnVuY3Rpb24gKF8sIHByb3ApIHsgcmV0dXJuIGNzcyh0aGlzJDEuJGVsLCBwcm9wLCAnJyk7IH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZ2V0Q3NzOiBmdW5jdGlvbihwZXJjZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSByZWYucHJvcHM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocHJvcHMpLnJlZHVjZShmdW5jdGlvbiAoY3NzLCBwcm9wKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSBwcm9wc1twcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcHMgPSByZWYuc3RlcHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVuaXQgPSByZWYudW5pdDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gcmVmLnBvcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShzdGVwcywgcGVyY2VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNmb3Jtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd4JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAneSc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQgPSB1bml0IHx8ICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MudHJhbnNmb3JtICs9IFwiIHRyYW5zbGF0ZVwiICsgKHVjZmlyc3QocHJvcCkpICsgXCIoXCIgKyAodG9GbG9hdCh2YWx1ZSkudG9GaXhlZCh1bml0ID09PSAncHgnID8gMCA6IDIpKSArIHVuaXQgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JvdGF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0ID0gdW5pdCB8fCAnZGVnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy50cmFuc2Zvcm0gKz0gXCIgcm90YXRlKFwiICsgKHZhbHVlICsgdW5pdCkgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzY2FsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MudHJhbnNmb3JtICs9IFwiIHNjYWxlKFwiICsgdmFsdWUgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmcgaW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmd5JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmd4JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc1soXCJiYWNrZ3JvdW5kLXBvc2l0aW9uLVwiICsgKHByb3BbMl0pKV0gPSBcImNhbGMoXCIgKyBwb3MgKyBcIiArIFwiICsgdmFsdWUgKyBcInB4KVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb2xvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JhY2tncm91bmRDb2xvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JvcmRlckNvbG9yJzoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYkMSA9IGdldFN0ZXAoc3RlcHMsIHBlcmNlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gcmVmJDFbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5kID0gcmVmJDFbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHJlZiQxWzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc1twcm9wXSA9IFwicmdiYShcIiArIChzdGFydC5tYXAoZnVuY3Rpb24gKHZhbHVlLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBwICogKGVuZFtpXSAtIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkgPT09IDMgPyB0b0Zsb2F0KHZhbHVlKSA6IHBhcnNlSW50KHZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuam9pbignLCcpKSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ1NTIEZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdibHVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQgPSB1bml0IHx8ICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MuZmlsdGVyICs9IFwiIGJsdXIoXCIgKyAodmFsdWUgKyB1bml0KSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2h1ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0ID0gdW5pdCB8fCAnZGVnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy5maWx0ZXIgKz0gXCIgaHVlLXJvdGF0ZShcIiArICh2YWx1ZSArIHVuaXQpICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZm9wYWNpdHknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdCA9IHVuaXQgfHwgJyUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzLmZpbHRlciArPSBcIiBvcGFjaXR5KFwiICsgKHZhbHVlICsgdW5pdCkgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdncmF5c2NhbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnZlcnQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzYXR1cmF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlcGlhJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQgPSB1bml0IHx8ICclJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy5maWx0ZXIgKz0gXCIgXCIgKyBwcm9wICsgXCIoXCIgKyAodmFsdWUgKyB1bml0KSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3NbcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjc3M7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwge3RyYW5zZm9ybTogJycsIGZpbHRlcjogJyd9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VDb2xvcihlbCwgY29sb3IpIHtcclxuICAgICAgICByZXR1cm4gY3NzKGNzcyhlbCwgJ2NvbG9yJywgY29sb3IpLCAnY29sb3InKVxyXG4gICAgICAgICAgICAuc3BsaXQoL1soKSxdL2cpXHJcbiAgICAgICAgICAgIC5zbGljZSgxLCAtMSlcclxuICAgICAgICAgICAgLmNvbmNhdCgxKVxyXG4gICAgICAgICAgICAuc2xpY2UoMCwgNClcclxuICAgICAgICAgICAgLm1hcCh0b0Zsb2F0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTdGVwKHN0ZXBzLCBwZXJjZW50KSB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gc3RlcHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLm1pbihNYXRoLmZsb29yKGNvdW50ICogcGVyY2VudCksIGNvdW50IC0gMSk7XHJcbiAgICAgICAgdmFyIHN0ZXAgPSBzdGVwcy5zbGljZShpbmRleCwgaW5kZXggKyAyKTtcclxuXHJcbiAgICAgICAgc3RlcC5wdXNoKHBlcmNlbnQgPT09IDEgPyAxIDogcGVyY2VudCAlICgxIC8gY291bnQpICogY291bnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRWYWx1ZShzdGVwcywgcGVyY2VudCwgZGlnaXRzKSB7XHJcbiAgICAgICAgaWYgKCBkaWdpdHMgPT09IHZvaWQgMCApIGRpZ2l0cyA9IDI7XHJcblxyXG4gICAgICAgIHZhciByZWYgPSBnZXRTdGVwKHN0ZXBzLCBwZXJjZW50KTtcclxuICAgICAgICB2YXIgc3RhcnQgPSByZWZbMF07XHJcbiAgICAgICAgdmFyIGVuZCA9IHJlZlsxXTtcclxuICAgICAgICB2YXIgcCA9IHJlZlsyXTtcclxuICAgICAgICByZXR1cm4gKGlzTnVtYmVyKHN0YXJ0KVxyXG4gICAgICAgICAgICA/IHN0YXJ0ICsgTWF0aC5hYnMoc3RhcnQgLSBlbmQpICogcCAqIChzdGFydCA8IGVuZCA/IDEgOiAtMSlcclxuICAgICAgICAgICAgOiArZW5kXHJcbiAgICAgICAgKS50b0ZpeGVkKGRpZ2l0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VW5pdChzdGVwcykge1xyXG4gICAgICAgIHJldHVybiBzdGVwcy5yZWR1Y2UoZnVuY3Rpb24gKHVuaXQsIHN0ZXApIHsgcmV0dXJuIGlzU3RyaW5nKHN0ZXApICYmIHN0ZXAucmVwbGFjZSgvLXxcXGQvZywgJycpLnRyaW0oKSB8fCB1bml0OyB9LCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY292ZXJzKGVsKSB7XHJcbiAgICAgICAgdmFyIHJlZiA9IGVsLnN0eWxlO1xyXG4gICAgICAgIHZhciBiYWNrZ3JvdW5kU2l6ZSA9IHJlZi5iYWNrZ3JvdW5kU2l6ZTtcclxuICAgICAgICB2YXIgY292ZXJzID0gY3NzKGNzcyhlbCwgJ2JhY2tncm91bmRTaXplJywgJycpLCAnYmFja2dyb3VuZFNpemUnKSA9PT0gJ2NvdmVyJztcclxuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IGJhY2tncm91bmRTaXplO1xyXG4gICAgICAgIHJldHVybiBjb3ZlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBhcmFsbGF4ID0ge1xyXG5cclxuICAgICAgICBtaXhpbnM6IFtQYXJhbGxheF0sXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHRhcmdldDogU3RyaW5nLFxyXG4gICAgICAgICAgICB2aWV3cG9ydDogTnVtYmVyLFxyXG4gICAgICAgICAgICBlYXNpbmc6IE51bWJlclxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBmYWxzZSxcclxuICAgICAgICAgICAgdmlld3BvcnQ6IDEsXHJcbiAgICAgICAgICAgIGVhc2luZzogMVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uKHJlZiwgJGVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0T2Zmc2V0RWxlbWVudCh0YXJnZXQgJiYgcXVlcnkodGFyZ2V0LCAkZWwpIHx8ICRlbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbihyZWYsIHR5cGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IHJlZi5wZXJjZW50O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXR5cGVzLmhhcygnc2Nyb2xsJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoTWVkaWEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSBwZXJjZW50O1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudCA9IGVhc2Uoc2Nyb2xsZWRPdmVyKHRoaXMudGFyZ2V0KSAvICh0aGlzLnZpZXdwb3J0IHx8IDEpLCB0aGlzLmVhc2luZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50OiBwZXJjZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBwcmV2ICE9PSBwZXJjZW50ID8gdGhpcy5nZXRDc3MocGVyY2VudCkgOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IHJlZi5zdHlsZTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1hdGNoTWVkaWEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN0eWxlICYmIGNzcyh0aGlzLiRlbCwgc3R5bGUpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGV2ZW50czogWydzY3JvbGwnLCAncmVzaXplJ11cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBlYXNlKHBlcmNlbnQsIGVhc2luZykge1xyXG4gICAgICAgIHJldHVybiBjbGFtcChwZXJjZW50ICogKDEgLSAoZWFzaW5nIC0gZWFzaW5nICogcGVyY2VudCkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTVkcgZWxlbWVudHMgZG8gbm90IGluaGVyaXQgZnJvbSBIVE1MRWxlbWVudFxyXG4gICAgZnVuY3Rpb24gZ2V0T2Zmc2V0RWxlbWVudChlbCkge1xyXG4gICAgICAgIHJldHVybiBlbFxyXG4gICAgICAgICAgICA/ICdvZmZzZXRUb3AnIGluIGVsXHJcbiAgICAgICAgICAgICAgICA/IGVsXHJcbiAgICAgICAgICAgICAgICA6IGdldE9mZnNldEVsZW1lbnQocGFyZW50KGVsKSlcclxuICAgICAgICAgICAgOiBkb2N1bWVudC5ib2R5O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBTbGlkZXJSZWFjdGl2ZSA9IHtcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoIHx8IHRoaXMuZHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRWYWxpZEluZGV4KHRoaXMuaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghfnRoaXMucHJldkluZGV4IHx8IHRoaXMuaW5kZXggIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gVHJhbnNpdGlvbmVyIChwcmV2LCBuZXh0LCBkaXIsIHJlZikge1xyXG4gICAgICAgIHZhciBjZW50ZXIgPSByZWYuY2VudGVyO1xyXG4gICAgICAgIHZhciBlYXNpbmcgPSByZWYuZWFzaW5nO1xyXG4gICAgICAgIHZhciBsaXN0ID0gcmVmLmxpc3Q7XHJcblxyXG5cclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgdmFyIGZyb20gPSBwcmV2XHJcbiAgICAgICAgICAgID8gZ2V0TGVmdChwcmV2LCBsaXN0LCBjZW50ZXIpXHJcbiAgICAgICAgICAgIDogZ2V0TGVmdChuZXh0LCBsaXN0LCBjZW50ZXIpICsgZGltZW5zaW9ucyhuZXh0KS53aWR0aCAqIGRpcjtcclxuICAgICAgICB2YXIgdG8gPSBuZXh0XHJcbiAgICAgICAgICAgID8gZ2V0TGVmdChuZXh0LCBsaXN0LCBjZW50ZXIpXHJcbiAgICAgICAgICAgIDogZnJvbSArIGRpbWVuc2lvbnMocHJldikud2lkdGggKiBkaXIgKiAoaXNSdGwgPyAtMSA6IDEpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICAgICAgZGlyOiBkaXIsXHJcblxyXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbihkdXJhdGlvbiwgcGVyY2VudCwgbGluZWFyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHBlcmNlbnQgPT09IHZvaWQgMCApIHBlcmNlbnQgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGltaW5nID0gbGluZWFyID8gJ2xpbmVhcicgOiBlYXNpbmc7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbiAtPSBNYXRoLnJvdW5kKGR1cmF0aW9uICogY2xhbXAocGVyY2VudCwgLTEsIDEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZShwZXJjZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwZXJjZW50ID0gcHJldiA/IHBlcmNlbnQgOiBjbGFtcChwZXJjZW50LCAwLCAxKTtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJVcGRhdGUodGhpcy5nZXRJdGVtSW4oKSwgJ2l0ZW1pbicsIHtwZXJjZW50OiBwZXJjZW50LCBkdXJhdGlvbjogZHVyYXRpb24sIHRpbWluZzogdGltaW5nLCBkaXI6IGRpcn0pO1xyXG4gICAgICAgICAgICAgICAgcHJldiAmJiB0cmlnZ2VyVXBkYXRlKHRoaXMuZ2V0SXRlbUluKHRydWUpLCAnaXRlbW91dCcsIHtwZXJjZW50OiAxIC0gcGVyY2VudCwgZHVyYXRpb246IGR1cmF0aW9uLCB0aW1pbmc6IHRpbWluZywgZGlyOiBkaXJ9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBUcmFuc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KGxpc3QsIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtdG8gKiAoaXNSdGwgPyAtMSA6IDEpLCAncHgnKX0sIGR1cmF0aW9uLCB0aW1pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGVmZXJyZWQucmVzb2x2ZSwgbm9vcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKGxpc3QpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY3NzKGxpc3QsICd0cmFuc2Zvcm0nLCAnJyk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBmb3J3YXJkOiBmdW5jdGlvbihkdXJhdGlvbiwgcGVyY2VudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBwZXJjZW50ID09PSB2b2lkIDAgKSBwZXJjZW50ID0gdGhpcy5wZXJjZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwobGlzdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93KGR1cmF0aW9uLCBwZXJjZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24ocGVyY2VudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2UoKSAqIGRpciAqIChpc1J0bCA/IC0xIDogMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY3NzKGxpc3QsICd0cmFuc2Zvcm0nLCB0cmFuc2xhdGUoY2xhbXAoXHJcbiAgICAgICAgICAgICAgICAgICAgLXRvICsgKGRpc3RhbmNlIC0gZGlzdGFuY2UgKiBwZXJjZW50KSxcclxuICAgICAgICAgICAgICAgICAgICAtZ2V0V2lkdGgobGlzdCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucyhsaXN0KS53aWR0aFxyXG4gICAgICAgICAgICAgICAgKSAqIChpc1J0bCA/IC0xIDogMSksICdweCcpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlcyA9IHRoaXMuZ2V0QWN0aXZlcygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1JbiA9IHRoaXMuZ2V0SXRlbUluKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbU91dCA9IHRoaXMuZ2V0SXRlbUluKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHBlcmNlbnQgPSBwcmV2ID8gY2xhbXAocGVyY2VudCwgLTEsIDEpIDogMDtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbihsaXN0KS5mb3JFYWNoKGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0FjdGl2ZSA9IGluY2x1ZGVzKGFjdGl2ZXMsIHNsaWRlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNJbiA9IHNsaWRlID09PSBpdGVtSW47XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzT3V0ID0gc2xpZGUgPT09IGl0ZW1PdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZUluID0gaXNJbiB8fCAhaXNPdXQgJiYgKGlzQWN0aXZlIHx8IGRpciAqIChpc1J0bCA/IC0xIDogMSkgPT09IC0xIF4gZ2V0RWxMZWZ0KHNsaWRlLCBsaXN0KSA+IGdldEVsTGVmdChwcmV2IHx8IG5leHQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlclVwZGF0ZShzbGlkZSwgKFwiaXRlbXRyYW5zbGF0ZVwiICsgKHRyYW5zbGF0ZUluID8gJ2luJyA6ICdvdXQnKSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyOiBkaXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcmNlbnQ6IGlzT3V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDEgLSBwZXJjZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzSW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHBlcmNlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzQWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKChjc3MobGlzdCwgJ3RyYW5zZm9ybScpLnNwbGl0KCcsJylbNF0gKiAoaXNSdGwgPyAtMSA6IDEpICsgZnJvbSkgLyAodG8gLSBmcm9tKSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXREaXN0YW5jZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModG8gLSBmcm9tKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldEl0ZW1JbjogZnVuY3Rpb24ob3V0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIG91dCA9PT0gdm9pZCAwICkgb3V0ID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVzID0gdGhpcy5nZXRBY3RpdmVzKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEFjdGl2ZXMgPSBpblZpZXcobGlzdCwgZ2V0TGVmdChuZXh0IHx8IHByZXYsIGxpc3QsIGNlbnRlcikpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IGFjdGl2ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlcyA9IG5leHRBY3RpdmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3RpdmVzID0gdGVtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dEFjdGl2ZXNbZmluZEluZGV4KG5leHRBY3RpdmVzLCBmdW5jdGlvbiAoZWwpIHsgcmV0dXJuICFpbmNsdWRlcyhhY3RpdmVzLCBlbCk7IH0pXTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXRBY3RpdmVzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpblZpZXcobGlzdCwgZ2V0TGVmdChwcmV2IHx8IG5leHQsIGxpc3QsIGNlbnRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldExlZnQoZWwsIGxpc3QsIGNlbnRlcikge1xyXG5cclxuICAgICAgICB2YXIgbGVmdCA9IGdldEVsTGVmdChlbCwgbGlzdCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjZW50ZXJcclxuICAgICAgICAgICAgPyBsZWZ0IC0gY2VudGVyRWwoZWwsIGxpc3QpXHJcbiAgICAgICAgICAgIDogTWF0aC5taW4obGVmdCwgZ2V0TWF4KGxpc3QpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TWF4KGxpc3QpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgZ2V0V2lkdGgobGlzdCkgLSBkaW1lbnNpb25zKGxpc3QpLndpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRXaWR0aChsaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuKGxpc3QpLnJlZHVjZShmdW5jdGlvbiAocmlnaHQsIGVsKSB7IHJldHVybiBkaW1lbnNpb25zKGVsKS53aWR0aCArIHJpZ2h0OyB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjZW50ZXJFbChlbCwgbGlzdCkge1xyXG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zKGxpc3QpLndpZHRoIC8gMiAtIGRpbWVuc2lvbnMoZWwpLndpZHRoIC8gMjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFbExlZnQoZWwsIGxpc3QpIHtcclxuICAgICAgICByZXR1cm4gZWwgJiYgKHBvc2l0aW9uKGVsKS5sZWZ0ICsgKGlzUnRsID8gZGltZW5zaW9ucyhlbCkud2lkdGggLSBkaW1lbnNpb25zKGxpc3QpLndpZHRoIDogMCkpICogKGlzUnRsID8gLTEgOiAxKSB8fCAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluVmlldyhsaXN0LCBsaXN0TGVmdCkge1xyXG5cclxuICAgICAgICBsaXN0TGVmdCAtPSAxO1xyXG4gICAgICAgIHZhciBsaXN0UmlnaHQgPSBsaXN0TGVmdCArIGRpbWVuc2lvbnMobGlzdCkud2lkdGggKyAyO1xyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGRyZW4obGlzdCkuZmlsdGVyKGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVMZWZ0ID0gZ2V0RWxMZWZ0KHNsaWRlLCBsaXN0KTtcclxuICAgICAgICAgICAgdmFyIHNsaWRlUmlnaHQgPSBzbGlkZUxlZnQgKyBkaW1lbnNpb25zKHNsaWRlKS53aWR0aDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzbGlkZUxlZnQgPj0gbGlzdExlZnQgJiYgc2xpZGVSaWdodCA8PSBsaXN0UmlnaHQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHJpZ2dlclVwZGF0ZShlbCwgdHlwZSwgZGF0YSkge1xyXG4gICAgICAgIHRyaWdnZXIoZWwsIGNyZWF0ZUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzbGlkZXIgPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW0NsYXNzLCBTbGlkZXIsIFNsaWRlclJlYWN0aXZlXSxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgY2VudGVyOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBzZXRzOiBCb29sZWFuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBjZW50ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZXRzOiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0ckl0ZW06ICd1ay1zbGlkZXItaXRlbScsXHJcbiAgICAgICAgICAgIHNlbExpc3Q6ICcudWstc2xpZGVyLWl0ZW1zJyxcclxuICAgICAgICAgICAgc2VsTmF2OiAnLnVrLXNsaWRlci1uYXYnLFxyXG4gICAgICAgICAgICBjbHNDb250YWluZXI6ICd1ay1zbGlkZXItY29udGFpbmVyJyxcclxuICAgICAgICAgICAgVHJhbnNpdGlvbmVyOiBUcmFuc2l0aW9uZXJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb21wdXRlZDoge1xyXG5cclxuICAgICAgICAgICAgYXZnV2lkdGg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFdpZHRoKHRoaXMubGlzdCkgLyB0aGlzLmxlbmd0aDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGZpbml0ZTogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmluaXRlID0gcmVmLmZpbml0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluaXRlIHx8IE1hdGguY2VpbChnZXRXaWR0aCh0aGlzLmxpc3QpKSA8IGRpbWVuc2lvbnModGhpcy5saXN0KS53aWR0aCArIGdldE1heEVsV2lkdGgodGhpcy5saXN0KSArIHRoaXMuY2VudGVyO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbWF4SW5kZXg6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maW5pdGUgfHwgdGhpcy5jZW50ZXIgJiYgIXRoaXMuc2V0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhc3QodGhpcy5zZXRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbGZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBtYXggPSBnZXRNYXgodGhpcy5saXN0KTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGZpbmRJbmRleCh0aGlzLnNsaWRlcywgZnVuY3Rpb24gKGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZnQgPj0gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGZ0ICs9IGRpbWVuc2lvbnMoZWwpLndpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB+aW5kZXggPyBpbmRleCA6IHRoaXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHNldHM6IGZ1bmN0aW9uKHJlZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0cyA9IHJlZi5zZXRzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNldHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gZGltZW5zaW9ucyh0aGlzLmxpc3QpLndpZHRoIC8gKHRoaXMuY2VudGVyID8gMiA6IDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0Q2VudGVyID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVMZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRzID0gc29ydEJ5JDEodGhpcy5zbGlkZXMsICdvZmZzZXRMZWZ0JykucmVkdWNlKGZ1bmN0aW9uIChzZXRzLCBzbGlkZSwgaSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVXaWR0aCA9IGRpbWVuc2lvbnMoc2xpZGUpLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZVJpZ2h0ID0gc2xpZGVMZWZ0ICsgc2xpZGVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlUmlnaHQgPiBsZWZ0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMkMS5jZW50ZXIgJiYgaSA+IHRoaXMkMS5tYXhJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IHRoaXMkMS5tYXhJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbmNsdWRlcyhzZXRzLCBpKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbXAgPSB0aGlzJDEuc2xpZGVzW2kgKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuY2VudGVyICYmIGNtcCAmJiBzbGlkZVdpZHRoIDwgbGVmdENlbnRlciAtIGRpbWVuc2lvbnMoY21wKS53aWR0aCAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0Q2VudGVyIC09IHNsaWRlV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDZW50ZXIgPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRzLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHNsaWRlTGVmdCArIHdpZHRoICsgKHRoaXMkMS5jZW50ZXIgPyBzbGlkZVdpZHRoIC8gMiA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVMZWZ0ICs9IHNsaWRlV2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRzO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIFtdKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIWlzRW1wdHkoc2V0cykgJiYgc2V0cztcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uT3B0aW9uczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdGhpcy5saXN0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0NvbnRhaW5lciwgISQoKFwiLlwiICsgKHRoaXMuY2xzQ29udGFpbmVyKSksIHRoaXMuJGVsKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdkl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdG9OdW1iZXIoZGF0YShlbCwgdGhpcyQxLmF0dHJJdGVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5oaWRkZW4gPSAhdGhpcyQxLm1heEluZGV4IHx8IGluZGV4ID4gdGhpcyQxLm1heEluZGV4IHx8IHRoaXMkMS5zZXRzICYmICFpbmNsdWRlcyh0aGlzJDEuc2V0cywgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCAmJiAhdGhpcy5kcmFnZ2luZyAmJiAhdGhpcy5zdGFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2xhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZXMgPSB0aGlzLl9nZXRUcmFuc2l0aW9uZXIodGhpcy5pbmRleCkuZ2V0QWN0aXZlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoc2xpZGUpIHsgcmV0dXJuIHRvZ2dsZUNsYXNzKHNsaWRlLCB0aGlzJDEuY2xzQWN0aXZlLCBpbmNsdWRlcyhhY3RpdmVzLCBzbGlkZSkpOyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbHNBY3RpdmF0ZWQgJiYgKCF0aGlzLnNldHMgfHwgaW5jbHVkZXModGhpcy5zZXRzLCB0b0Zsb2F0KHRoaXMuaW5kZXgpKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzbGlkZSkgeyByZXR1cm4gdG9nZ2xlQ2xhc3Moc2xpZGUsIHRoaXMkMS5jbHNBY3RpdmF0ZWQgfHwgJycsIGluY2x1ZGVzKGFjdGl2ZXMsIHNsaWRlKSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Jlc2l6ZSddXHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czoge1xyXG5cclxuICAgICAgICAgICAgYmVmb3JlaXRlbXNob3c6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5zZXRzICYmIHRoaXMuc3RhY2subGVuZ3RoIDwgMiAmJiAhaW5jbHVkZXModGhpcy5zZXRzLCB0aGlzLmluZGV4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmdldFZhbGlkSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGlmZiA9IE1hdGguYWJzKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAtIHRoaXMucHJldkluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgKyAodGhpcy5kaXIgPiAwICYmIHRoaXMuaW5kZXggPCB0aGlzLnByZXZJbmRleCB8fCB0aGlzLmRpciA8IDAgJiYgdGhpcy5pbmRleCA+IHRoaXMucHJldkluZGV4ID8gKHRoaXMubWF4SW5kZXggKyAxKSAqIHRoaXMuZGlyIDogMClcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYWdnaW5nICYmIGRpZmYgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlmZjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2suc3BsaWNlKDEsIDAsIHRoaXMuZGlyID4gMCA/ICduZXh0JyA6ICdwcmV2aW91cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmRpciA8IDAgfHwgIXRoaXMuc2xpZGVzW3RoaXMucHJldkluZGV4XSA/IHRoaXMuaW5kZXggOiB0aGlzLnByZXZJbmRleDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBzcGVlZFVwKHRoaXMuYXZnV2lkdGggLyB0aGlzLnZlbG9jaXR5KSAqIChkaW1lbnNpb25zKHRoaXMuc2xpZGVzW2luZGV4XSkud2lkdGggLyB0aGlzLmF2Z1dpZHRoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXIoKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpdGVtc2hvdzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAofnRoaXMucHJldkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5fZ2V0VHJhbnNpdGlvbmVyKCkuZ2V0SXRlbUluKCksIHRoaXMuY2xzQWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICByZW9yZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maW5pdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy5zbGlkZXMsICdvcmRlcicsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5kaXIgPiAwICYmIHRoaXMuc2xpZGVzW3RoaXMucHJldkluZGV4XSA/IHRoaXMucHJldkluZGV4IDogdGhpcy5pbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzbGlkZSwgaSkgeyByZXR1cm4gY3NzKHNsaWRlLCAnb3JkZXInLCB0aGlzJDEuZGlyID4gMCAmJiBpIDwgaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcyQxLmRpciA8IDAgJiYgaSA+PSB0aGlzJDEuaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gLTFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcclxuICAgICAgICAgICAgICAgICAgICApOyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jZW50ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSB0aGlzLnNsaWRlc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSBkaW1lbnNpb25zKHRoaXMubGlzdCkud2lkdGggLyAyIC0gZGltZW5zaW9ucyhuZXh0KS53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICB2YXIgaiA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHdpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUluZGV4ID0gdGhpcy5nZXRJbmRleCgtLWogKyBpbmRleCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHRoaXMuc2xpZGVzW3NsaWRlSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjc3Moc2xpZGUsICdvcmRlcicsIHNsaWRlSW5kZXggPiBpbmRleCA/IC0yIDogLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoIC09IGRpbWVuc2lvbnMoc2xpZGUpLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldFZhbGlkSW5kZXg6IGZ1bmN0aW9uKGluZGV4LCBwcmV2SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gdGhpcy5pbmRleDtcclxuICAgICAgICAgICAgICAgIGlmICggcHJldkluZGV4ID09PSB2b2lkIDAgKSBwcmV2SW5kZXggPSB0aGlzLnByZXZJbmRleDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLmdldEluZGV4KGluZGV4LCBwcmV2SW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcmV2O1xyXG5cclxuICAgICAgICAgICAgICAgIGRvIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVzKHRoaXMuc2V0cywgaW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByZXYgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMuZ2V0SW5kZXgoaW5kZXggKyB0aGlzLmRpciwgcHJldkluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChpbmRleCAhPT0gcHJldik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1heEVsV2lkdGgobGlzdCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heC5hcHBseShNYXRoLCBbIDAgXS5jb25jYXQoIGNoaWxkcmVuKGxpc3QpLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGRpbWVuc2lvbnMoZWwpLndpZHRoOyB9KSApKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2xpZGVyUGFyYWxsYXggPSB7XHJcblxyXG4gICAgICAgIG1peGluczogW1BhcmFsbGF4XSxcclxuXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBzZWxJdGVtOiAnIWxpJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgICAgICBpdGVtOiBmdW5jdGlvbihyZWYsICRlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbEl0ZW0gPSByZWYuc2VsSXRlbTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkoc2VsSXRlbSwgJGVsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBldmVudHM6IFtcclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdpdGVtaW4gaXRlbW91dCcsXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByZWYudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmX2RldGFpbCA9IHJlZi5kZXRhaWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSByZWZfZGV0YWlsLnBlcmNlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gcmVmX2RldGFpbC5kdXJhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGltaW5nID0gcmVmX2RldGFpbC50aW1pbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpciA9IHJlZl9kZXRhaWwuZGlyO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmFzdGRvbS5yZWFkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BzRnJvbSA9IHRoaXMkMS5nZXRDc3MoZ2V0Q3VycmVudFBlcmNlbnQodHlwZSwgZGlyLCBwZXJjZW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wc1RvID0gdGhpcyQxLmdldENzcyhpc0luKHR5cGUpID8gLjUgOiBkaXIgPiAwID8gMSA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXN0ZG9tLndyaXRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzJDEuJGVsLCBwcm9wc0Zyb20pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5zdGFydCh0aGlzJDEuJGVsLCBwcm9wc1RvLCBkdXJhdGlvbiwgdGltaW5nKS5jYXRjaChub29wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RyYW5zaXRpb25jYW5jZWxlZCB0cmFuc2l0aW9uZW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLmNhbmNlbCh0aGlzLiRlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW10cmFuc2xhdGVpbiBpdGVtdHJhbnNsYXRlb3V0JyxcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWZfZGV0YWlsID0gcmVmLmRldGFpbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IHJlZl9kZXRhaWwucGVyY2VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlyID0gcmVmX2RldGFpbC5kaXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZhc3Rkb20ucmVhZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wcyA9IHRoaXMkMS5nZXRDc3MoZ2V0Q3VycmVudFBlcmNlbnQodHlwZSwgZGlyLCBwZXJjZW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhc3Rkb20ud3JpdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gY3NzKHRoaXMkMS4kZWwsIHByb3BzKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgXVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaXNJbih0eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIGVuZHNXaXRoKHR5cGUsICdpbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRQZXJjZW50KHR5cGUsIGRpciwgcGVyY2VudCkge1xyXG5cclxuICAgICAgICBwZXJjZW50IC89IDI7XHJcblxyXG4gICAgICAgIHJldHVybiAhaXNJbih0eXBlKVxyXG4gICAgICAgICAgICA/IGRpciA8IDBcclxuICAgICAgICAgICAgICAgID8gcGVyY2VudFxyXG4gICAgICAgICAgICAgICAgOiAxIC0gcGVyY2VudFxyXG4gICAgICAgICAgICA6IGRpciA8IDBcclxuICAgICAgICAgICAgICAgID8gMSAtIHBlcmNlbnRcclxuICAgICAgICAgICAgICAgIDogcGVyY2VudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgQW5pbWF0aW9ucyA9IGFzc2lnbih7fSwgQW5pbWF0aW9ucyQyLCB7XHJcblxyXG4gICAgICAgIGZhZGU6IHtcclxuXHJcbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMCwgekluZGV4OiAwfSxcclxuICAgICAgICAgICAgICAgICAgICB7ekluZGV4OiAtMX1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBwZXJjZW50OiBmdW5jdGlvbihjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIGNzcyhjdXJyZW50LCAnb3BhY2l0eScpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbihwZXJjZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxIC0gcGVyY2VudCwgekluZGV4OiAwfSxcclxuICAgICAgICAgICAgICAgICAgICB7ekluZGV4OiAtMX1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2NhbGU6IHtcclxuXHJcbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiBzY2FsZTNkKDEgKyAuNSksIHpJbmRleDogMH0sXHJcbiAgICAgICAgICAgICAgICAgICAge3pJbmRleDogLTF9XHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24oY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBjc3MoY3VycmVudCwgJ29wYWNpdHknKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24ocGVyY2VudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMSAtIHBlcmNlbnQsIHRyYW5zZm9ybTogc2NhbGUzZCgxICsgLjUgKiBwZXJjZW50KSwgekluZGV4OiAwfSxcclxuICAgICAgICAgICAgICAgICAgICB7ekluZGV4OiAtMX1cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHVsbDoge1xyXG5cclxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24oZGlyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyIDwgMFxyXG4gICAgICAgICAgICAgICAgICAgID8gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoMzApLCB6SW5kZXg6IC0xfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKCksIHpJbmRleDogMH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwKSwgekluZGV4OiAwfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKCksIHpJbmRleDogLTF9XHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uKGN1cnJlbnQsIG5leHQsIGRpcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpciA8IDBcclxuICAgICAgICAgICAgICAgICAgICA/IDEgLSB0cmFuc2xhdGVkKG5leHQpXHJcbiAgICAgICAgICAgICAgICAgICAgOiB0cmFuc2xhdGVkKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbihwZXJjZW50LCBkaXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXIgPCAwXHJcbiAgICAgICAgICAgICAgICAgICAgPyBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMCAqIHBlcmNlbnQpLCB6SW5kZXg6IC0xfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAgKiAoMSAtIHBlcmNlbnQpKSwgekluZGV4OiAwfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKC1wZXJjZW50ICogMTAwKSwgekluZGV4OiAwfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKDMwICogKDEgLSBwZXJjZW50KSksIHpJbmRleDogLTF9XHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwdXNoOiB7XHJcblxyXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbihkaXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXIgPCAwXHJcbiAgICAgICAgICAgICAgICAgICAgPyBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDApLCB6SW5kZXg6IDB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoKSwgekluZGV4OiAtMX1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzApLCB6SW5kZXg6IC0xfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKCksIHpJbmRleDogMH1cclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24oY3VycmVudCwgbmV4dCwgZGlyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyID4gMFxyXG4gICAgICAgICAgICAgICAgICAgID8gMSAtIHRyYW5zbGF0ZWQobmV4dClcclxuICAgICAgICAgICAgICAgICAgICA6IHRyYW5zbGF0ZWQoY3VycmVudCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uKHBlcmNlbnQsIGRpcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpciA8IDBcclxuICAgICAgICAgICAgICAgICAgICA/IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKHBlcmNlbnQgKiAxMDApLCB6SW5kZXg6IDB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMwICogKDEgLSBwZXJjZW50KSksIHpJbmRleDogLTF9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMwICogcGVyY2VudCksIHpJbmRleDogLTF9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwICogKDEgLSBwZXJjZW50KSksIHpJbmRleDogMH1cclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc2xpZGVzaG93ID0ge1xyXG5cclxuICAgICAgICBtaXhpbnM6IFtDbGFzcywgU2xpZGVzaG93LCBTbGlkZXJSZWFjdGl2ZV0sXHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIHJhdGlvOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIG1pbkhlaWdodDogTnVtYmVyLFxyXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IE51bWJlclxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcmF0aW86ICcxNjo5JyxcclxuICAgICAgICAgICAgbWluSGVpZ2h0OiBmYWxzZSxcclxuICAgICAgICAgICAgbWF4SGVpZ2h0OiBmYWxzZSxcclxuICAgICAgICAgICAgc2VsTGlzdDogJy51ay1zbGlkZXNob3ctaXRlbXMnLFxyXG4gICAgICAgICAgICBhdHRySXRlbTogJ3VrLXNsaWRlc2hvdy1pdGVtJyxcclxuICAgICAgICAgICAgc2VsTmF2OiAnLnVrLXNsaWRlc2hvdy1uYXYnLFxyXG4gICAgICAgICAgICBBbmltYXRpb25zOiBBbmltYXRpb25zXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcy5yYXRpby5zcGxpdCgnOicpLm1hcChOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gcmVmWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZlsxXTtcclxuXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHQgKiB0aGlzLmxpc3Qub2Zmc2V0V2lkdGggLyB3aWR0aCB8fCAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IE1hdGgubWF4KHRoaXMubWluSGVpZ2h0LCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IE1hdGgubWluKHRoaXMubWF4SGVpZ2h0LCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7aGVpZ2h0OiBoZWlnaHQgLSBib3hNb2RlbEFkanVzdCh0aGlzLmxpc3QsICdoZWlnaHQnLCAnY29udGVudC1ib3gnKX07XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcmVmLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPiAwICYmIGNzcyh0aGlzLmxpc3QsICdtaW5IZWlnaHQnLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Jlc2l6ZSddXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzb3J0YWJsZSA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbQ2xhc3MsIEFuaW1hdGVdLFxyXG5cclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBncm91cDogU3RyaW5nLFxyXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IE51bWJlcixcclxuICAgICAgICAgICAgY2xzSXRlbTogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbHNQbGFjZWhvbGRlcjogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbHNEcmFnOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGNsc0RyYWdTdGF0ZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbHNCYXNlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGNsc05vRHJhZzogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbHNFbXB0eTogU3RyaW5nLFxyXG4gICAgICAgICAgICBjbHNDdXN0b206IFN0cmluZyxcclxuICAgICAgICAgICAgaGFuZGxlOiBTdHJpbmdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGdyb3VwOiBmYWxzZSxcclxuICAgICAgICAgICAgdGhyZXNob2xkOiA1LFxyXG4gICAgICAgICAgICBjbHNJdGVtOiAndWstc29ydGFibGUtaXRlbScsXHJcbiAgICAgICAgICAgIGNsc1BsYWNlaG9sZGVyOiAndWstc29ydGFibGUtcGxhY2Vob2xkZXInLFxyXG4gICAgICAgICAgICBjbHNEcmFnOiAndWstc29ydGFibGUtZHJhZycsXHJcbiAgICAgICAgICAgIGNsc0RyYWdTdGF0ZTogJ3VrLWRyYWcnLFxyXG4gICAgICAgICAgICBjbHNCYXNlOiAndWstc29ydGFibGUnLFxyXG4gICAgICAgICAgICBjbHNOb0RyYWc6ICd1ay1zb3J0YWJsZS1ub2RyYWcnLFxyXG4gICAgICAgICAgICBjbHNFbXB0eTogJ3VrLXNvcnRhYmxlLWVtcHR5JyxcclxuICAgICAgICAgICAgY2xzQ3VzdG9tOiAnJyxcclxuICAgICAgICAgICAgaGFuZGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgcG9zOiB7fVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIFsnaW5pdCcsICdzdGFydCcsICdtb3ZlJywgJ2VuZCddLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZuID0gdGhpcyQxW2tleV07XHJcbiAgICAgICAgICAgICAgICB0aGlzJDFba2V5XSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduKHRoaXMkMS5wb3MsIGdldEV2ZW50UG9zKGUpKTtcclxuICAgICAgICAgICAgICAgICAgICBmbihlKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czoge1xyXG5cclxuICAgICAgICAgICAgbmFtZTogcG9pbnRlckRvd24sXHJcbiAgICAgICAgICAgIHBhc3NpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiAnaW5pdCdcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJGVsLnRCb2RpZXMgfHwgW3RoaXMuJGVsXSlbMF07XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpdGVtczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRyZW4odGhpcy50YXJnZXQpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaXNFbXB0eToge1xyXG5cclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkodGhpcy5pdGVtcyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHdhdGNoOiBmdW5jdGlvbihlbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMudGFyZ2V0LCB0aGlzLmNsc0VtcHR5LCBlbXB0eSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGhhbmRsZXM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHJlZiwgZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGFuZGxlID0gcmVmLmhhbmRsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZSA/ICQkKGhhbmRsZSwgZWwpIDogdGhpcy5pdGVtcztcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgd2F0Y2g6IGZ1bmN0aW9uKGhhbmRsZXMsIHByZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICBjc3MocHJldiwge3RvdWNoQWN0aW9uOiAnJywgdXNlclNlbGVjdDogJyd9KTtcclxuICAgICAgICAgICAgICAgICAgICBjc3MoaGFuZGxlcywge3RvdWNoQWN0aW9uOiBoYXNUb3VjaCA/ICdub25lJyA6ICcnLCB1c2VyU2VsZWN0OiAnbm9uZSd9KTsgLy8gdG91Y2hBY3Rpb24gc2V0IHRvICdub25lJyBjYXVzZXMgYSBwZXJmb3JtYW5jZSBkcm9wIGluIENocm9tZSA4MFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBpbW1lZGlhdGU6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOiB7XHJcblxyXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnIHx8ICFwYXJlbnQodGhpcy5wbGFjZWhvbGRlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVmX3BvcyA9IHJlZi5wb3M7XHJcbiAgICAgICAgICAgICAgICB2YXIgeCA9IHJlZl9wb3MueDtcclxuICAgICAgICAgICAgICAgIHZhciB5ID0gcmVmX3Bvcy55O1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZl9vcmlnaW4gPSByZWYub3JpZ2luO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldFRvcCA9IHJlZl9vcmlnaW4ub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldExlZnQgPSByZWZfb3JpZ2luLm9mZnNldExlZnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSByZWYucGxhY2Vob2xkZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuZHJhZywge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogeSAtIG9mZnNldFRvcCxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB4IC0gb2Zmc2V0TGVmdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNvcnRhYmxlID0gdGhpcy5nZXRTb3J0YWJsZShkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvcnRhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9IHNvcnRhYmxlLml0ZW1zO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpdGVtcy5zb21lKFRyYW5zaXRpb24uaW5Qcm9ncmVzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGZpbmRUYXJnZXQoaXRlbXMsIHt4OiB4LCB5OiB5fSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCAmJiAoIXRhcmdldCB8fCB0YXJnZXQgPT09IHBsYWNlaG9sZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXMgPSB0aGlzLmdldFNvcnRhYmxlKHBsYWNlaG9sZGVyKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnNlcnRUYXJnZXQgPSBmaW5kSW5zZXJ0VGFyZ2V0KHNvcnRhYmxlLnRhcmdldCwgdGFyZ2V0LCBwbGFjZWhvbGRlciwgeCwgeSwgc29ydGFibGUgPT09IHByZXZpb3VzICYmIGRhdGEubW92ZWQgIT09IHRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluc2VydFRhcmdldCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluc2VydFRhcmdldCAmJiBwbGFjZWhvbGRlciA9PT0gaW5zZXJ0VGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzb3J0YWJsZSAhPT0gcHJldmlvdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5yZW1vdmUocGxhY2Vob2xkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubW92ZWQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhLm1vdmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlLmluc2VydChwbGFjZWhvbGRlciwgaW5zZXJ0VGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoZWQuYWRkKHNvcnRhYmxlKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGV2ZW50czogWydtb3ZlJ11cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBlLmJ1dHRvbjtcclxuICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0UHJldmVudGVkID0gZS5kZWZhdWx0UHJldmVudGVkO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXMuaXRlbXMuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gd2l0aGluKHRhcmdldCwgZWwpOyB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHJlZlswXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYWNlaG9sZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgZGVmYXVsdFByZXZlbnRlZFxyXG4gICAgICAgICAgICAgICAgICAgIHx8IGJ1dHRvbiA+IDBcclxuICAgICAgICAgICAgICAgICAgICB8fCBpc0lucHV0KHRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICB8fCB3aXRoaW4odGFyZ2V0LCAoXCIuXCIgKyAodGhpcy5jbHNOb0RyYWcpKSlcclxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLmhhbmRsZSAmJiAhd2l0aGluKHRhcmdldCwgdGhpcy5oYW5kbGUpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hlZCA9IG5ldyBTZXQoW3RoaXNdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luID0gYXNzaWduKHt0YXJnZXQ6IHRhcmdldCwgaW5kZXg6IGluZGV4KHBsYWNlaG9sZGVyKX0sIHRoaXMucG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvbihkb2N1bWVudCwgcG9pbnRlck1vdmUsIHRoaXMubW92ZSk7XHJcbiAgICAgICAgICAgICAgICBvbihkb2N1bWVudCwgcG9pbnRlclVwLCB0aGlzLmVuZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWcgPSBhcHBlbmREcmFnKHRoaXMuJGNvbnRhaW5lciwgdGhpcy5wbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcy5wbGFjZWhvbGRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gcmVmLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wID0gcmVmLnRvcDtcclxuICAgICAgICAgICAgICAgIGFzc2lnbih0aGlzLm9yaWdpbiwge29mZnNldExlZnQ6IHRoaXMucG9zLnggLSBsZWZ0LCBvZmZzZXRUb3A6IHRoaXMucG9zLnkgLSB0b3B9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmRyYWcsIHRoaXMuY2xzRHJhZywgdGhpcy5jbHNDdXN0b20pO1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5wbGFjZWhvbGRlciwgdGhpcy5jbHNQbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLml0ZW1zLCB0aGlzLmNsc0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLmNsc0RyYWdTdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3N0YXJ0JywgW3RoaXMsIHRoaXMucGxhY2Vob2xkZXJdKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFja1Njcm9sbCh0aGlzLnBvcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGUpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdtb3ZlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKHRoaXMucG9zLnggLSB0aGlzLm9yaWdpbi54KSA+IHRoaXMudGhyZXNob2xkIHx8IE1hdGguYWJzKHRoaXMucG9zLnkgLSB0aGlzLm9yaWdpbi55KSA+IHRoaXMudGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydChlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIG9mZihkb2N1bWVudCwgcG9pbnRlck1vdmUsIHRoaXMubW92ZSk7XHJcbiAgICAgICAgICAgICAgICBvZmYoZG9jdW1lbnQsIHBvaW50ZXJVcCwgdGhpcy5lbmQpO1xyXG4gICAgICAgICAgICAgICAgb2ZmKHdpbmRvdywgJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1bnRyYWNrU2Nyb2xsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNvcnRhYmxlID0gdGhpcy5nZXRTb3J0YWJsZSh0aGlzLnBsYWNlaG9sZGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcyA9PT0gc29ydGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcmlnaW4uaW5kZXggIT09IGluZGV4KHRoaXMucGxhY2Vob2xkZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdtb3ZlZCcsIFt0aGlzLCB0aGlzLnBsYWNlaG9sZGVyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHNvcnRhYmxlLiRlbCwgJ2FkZGVkJywgW3NvcnRhYmxlLCB0aGlzLnBsYWNlaG9sZGVyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3JlbW92ZWQnLCBbdGhpcywgdGhpcy5wbGFjZWhvbGRlcl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdzdG9wJywgW3RoaXMsIHRoaXMucGxhY2Vob2xkZXJdKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZW1vdmUkMSh0aGlzLmRyYWcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoZWQuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbHNQbGFjZWhvbGRlciA9IHJlZi5jbHNQbGFjZWhvbGRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsc0l0ZW0gPSByZWYuY2xzSXRlbTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzJDEudG91Y2hlZC5mb3JFYWNoKGZ1bmN0aW9uIChzb3J0YWJsZSkgeyByZXR1cm4gcmVtb3ZlQ2xhc3Moc29ydGFibGUuaXRlbXMsIGNsc1BsYWNlaG9sZGVyLCBjbHNJdGVtKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaGVkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgdGhpcy5jbHNEcmFnU3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGluc2VydDogZnVuY3Rpb24oZWxlbWVudCwgdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5pdGVtcywgdGhpcy5jbHNJdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgPyBiZWZvcmUodGFyZ2V0LCBlbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIDogYXBwZW5kKHRoaXMkMS50YXJnZXQsIGVsZW1lbnQpOyB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZShpbnNlcnQpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghd2l0aGluKGVsZW1lbnQsIHRoaXMudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlJDEoZWxlbWVudCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldFNvcnRhYmxlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvcnRhYmxlID0gdGhpcy4kZ2V0Q29tcG9uZW50KGVsZW1lbnQsICdzb3J0YWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc29ydGFibGUgJiYgKHNvcnRhYmxlID09PSB0aGlzIHx8IHRoaXMuZ3JvdXAgIT09IGZhbHNlICYmIHNvcnRhYmxlLmdyb3VwID09PSB0aGlzLmdyb3VwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc29ydGFibGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoKGVsZW1lbnQgPSBwYXJlbnQoZWxlbWVudCkpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgdHJhY2tUaW1lcjtcclxuICAgIGZ1bmN0aW9uIHRyYWNrU2Nyb2xsKHBvcykge1xyXG5cclxuICAgICAgICB2YXIgbGFzdCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdHJhY2tUaW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gcG9zLng7XHJcbiAgICAgICAgICAgIHZhciB5ID0gcG9zLnk7XHJcbiAgICAgICAgICAgIHkgKz0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpc3QgPSAoRGF0ZS5ub3coKSAtIGxhc3QpICogLjM7XHJcbiAgICAgICAgICAgIGxhc3QgPSBEYXRlLm5vdygpO1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsUGFyZW50cyhkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHgsIHBvcy55KSkucmV2ZXJzZSgpLnNvbWUoZnVuY3Rpb24gKHNjcm9sbEVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9IHNjcm9sbEVsLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBzY3JvbGxFbC5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IG9mZnNldChnZXRWaWV3cG9ydCQxKHNjcm9sbEVsKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wID0gcmVmLnRvcDtcclxuICAgICAgICAgICAgICAgIHZhciBib3R0b20gPSByZWYuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRvcCA8IHkgJiYgdG9wICsgMzUgPiB5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsIC09IGRpc3Q7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvdHRvbSA+IHkgJiYgYm90dG9tIC0gMzUgPCB5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsICs9IGRpc3Q7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID4gMCAmJiBzY3JvbGwgPCBzY3JvbGxIZWlnaHQgLSBoZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3Aoc2Nyb2xsRWwsIHNjcm9sbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSwgMTUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bnRyYWNrU2Nyb2xsKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodHJhY2tUaW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwZW5kRHJhZyhjb250YWluZXIsIGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgY2xvbmUgPSBhcHBlbmQoY29udGFpbmVyLCBlbGVtZW50Lm91dGVySFRNTC5yZXBsYWNlKC8oXjwpKD86bGl8dHIpfCg/OmxpfHRyKShcXC8+JCkvZywgJyQxZGl2JDInKSk7XHJcblxyXG4gICAgICAgIGNzcyhjbG9uZSwgJ21hcmdpbicsICcwJywgJ2ltcG9ydGFudCcpO1xyXG4gICAgICAgIGNzcyhjbG9uZSwgYXNzaWduKHtcclxuICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICAgIHdpZHRoOiBlbGVtZW50Lm9mZnNldFdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGVsZW1lbnQub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgfSwgY3NzKGVsZW1lbnQsIFsncGFkZGluZ0xlZnQnLCAncGFkZGluZ1JpZ2h0JywgJ3BhZGRpbmdUb3AnLCAncGFkZGluZ0JvdHRvbSddKSkpO1xyXG5cclxuICAgICAgICBoZWlnaHQoY2xvbmUuZmlyc3RFbGVtZW50Q2hpbGQsIGhlaWdodChlbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjbG9uZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kVGFyZ2V0KGl0ZW1zLCBwb2ludCkge1xyXG4gICAgICAgIHJldHVybiBpdGVtc1tmaW5kSW5kZXgoaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBwb2ludEluUmVjdChwb2ludCwgaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7IH0pXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kSW5zZXJ0VGFyZ2V0KGxpc3QsIHRhcmdldCwgcGxhY2Vob2xkZXIsIHgsIHksIHNhbWVMaXN0KSB7XHJcblxyXG4gICAgICAgIGlmICghY2hpbGRyZW4obGlzdCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZWN0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmICghc2FtZUxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNIb3Jpem9udGFsKGxpc3QsIHBsYWNlaG9sZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHkgPCByZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICAgICAgICAgID8gdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgOiB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHBsYWNlaG9sZGVyUmVjdCA9IHBsYWNlaG9sZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHZhciBzYW1lUm93ID0gbGluZXNJbnRlcnNlY3QoXHJcbiAgICAgICAgICAgIFtyZWN0LnRvcCwgcmVjdC5ib3R0b21dLFxyXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJSZWN0LnRvcCwgcGxhY2Vob2xkZXJSZWN0LmJvdHRvbV1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB2YXIgcG9pbnRlclBvcyA9IHNhbWVSb3cgPyB4IDogeTtcclxuICAgICAgICB2YXIgbGVuZ3RoUHJvcCA9IHNhbWVSb3cgPyAnd2lkdGgnIDogJ2hlaWdodCc7XHJcbiAgICAgICAgdmFyIHN0YXJ0UHJvcCA9IHNhbWVSb3cgPyAnbGVmdCcgOiAndG9wJztcclxuICAgICAgICB2YXIgZW5kUHJvcCA9IHNhbWVSb3cgPyAncmlnaHQnIDogJ2JvdHRvbSc7XHJcblxyXG4gICAgICAgIHZhciBkaWZmID0gcGxhY2Vob2xkZXJSZWN0W2xlbmd0aFByb3BdIDwgcmVjdFtsZW5ndGhQcm9wXSA/IHJlY3RbbGVuZ3RoUHJvcF0gLSBwbGFjZWhvbGRlclJlY3RbbGVuZ3RoUHJvcF0gOiAwO1xyXG5cclxuICAgICAgICBpZiAocGxhY2Vob2xkZXJSZWN0W3N0YXJ0UHJvcF0gPCByZWN0W3N0YXJ0UHJvcF0pIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChkaWZmICYmIHBvaW50ZXJQb3MgPCByZWN0W3N0YXJ0UHJvcF0gKyBkaWZmKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRpZmYgJiYgcG9pbnRlclBvcyA+IHJlY3RbZW5kUHJvcF0gLSBkaWZmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNIb3Jpem9udGFsKGxpc3QsIHBsYWNlaG9sZGVyKSB7XHJcblxyXG4gICAgICAgIHZhciBzaW5nbGUgPSBjaGlsZHJlbihsaXN0KS5sZW5ndGggPT09IDE7XHJcblxyXG4gICAgICAgIGlmIChzaW5nbGUpIHtcclxuICAgICAgICAgICAgYXBwZW5kKGxpc3QsIHBsYWNlaG9sZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpdGVtcyA9IGNoaWxkcmVuKGxpc3QpO1xyXG4gICAgICAgIHZhciBpc0hvcml6b250YWwgPSBpdGVtcy5zb21lKGZ1bmN0aW9uIChlbCwgaSkge1xyXG4gICAgICAgICAgICB2YXIgcmVjdEEgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLnNsaWNlKGkgKyAxKS5zb21lKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY3RCID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIWxpbmVzSW50ZXJzZWN0KFtyZWN0QS5sZWZ0LCByZWN0QS5yaWdodF0sIFtyZWN0Qi5sZWZ0LCByZWN0Qi5yaWdodF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNpbmdsZSkge1xyXG4gICAgICAgICAgICByZW1vdmUkMShwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXNIb3Jpem9udGFsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpbmVzSW50ZXJzZWN0KGxpbmVBLCBsaW5lQikge1xyXG4gICAgICAgIHJldHVybiBsaW5lQVsxXSA+IGxpbmVCWzBdICYmIGxpbmVCWzFdID4gbGluZUFbMF07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9iajtcclxuXHJcbiAgICB2YXIgdG9vbHRpcCA9IHtcclxuXHJcbiAgICAgICAgbWl4aW5zOiBbQ29udGFpbmVyLCBUb2dnbGFibGUsIFBvc2l0aW9uXSxcclxuXHJcbiAgICAgICAgYXJnczogJ3RpdGxlJyxcclxuXHJcbiAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgZGVsYXk6IE51bWJlcixcclxuICAgICAgICAgICAgdGl0bGU6IFN0cmluZ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgcG9zOiAndG9wJyxcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBkZWxheTogMCxcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiBbJ3VrLWFuaW1hdGlvbi1zY2FsZS11cCddLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwLFxyXG4gICAgICAgICAgICBjbHM6ICd1ay1hY3RpdmUnLFxyXG4gICAgICAgICAgICBjbHNQb3M6ICd1ay10b29sdGlwJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJlZm9yZUNvbm5lY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9oYXNUaXRsZSA9IGhhc0F0dHIodGhpcy4kZWwsICd0aXRsZScpO1xyXG4gICAgICAgICAgICBhdHRyKHRoaXMuJGVsLCAndGl0bGUnLCAnJyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXJpYShmYWxzZSk7XHJcbiAgICAgICAgICAgIG1ha2VGb2N1c2FibGUodGhpcy4kZWwpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICBhdHRyKHRoaXMuJGVsLCAndGl0bGUnLCB0aGlzLl9oYXNUaXRsZSA/IHRoaXMudGl0bGUgOiBudWxsKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQodGhpcy50b29sdGlwIHx8IG51bGwpIHx8ICF0aGlzLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3VuYmluZCA9IG9uY2UoZG9jdW1lbnQsIChcInNob3cga2V5ZG93biBcIiArIHBvaW50ZXJEb3duKSwgdGhpcy5oaWRlLCBmYWxzZSwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudHlwZSA9PT0gcG9pbnRlckRvd24gJiYgIXdpdGhpbihlLnRhcmdldCwgdGhpcyQxLiRlbClcclxuICAgICAgICAgICAgICAgICAgICB8fCBlLnR5cGUgPT09ICdrZXlkb3duJyAmJiBlLmtleUNvZGUgPT09IDI3XHJcbiAgICAgICAgICAgICAgICAgICAgfHwgZS50eXBlID09PSAnc2hvdycgJiYgZS5kZXRhaWxbMF0gIT09IHRoaXMkMSAmJiBlLmRldGFpbFswXS4kbmFtZSA9PT0gdGhpcyQxLiRuYW1lOyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUaW1lciA9IHNldFRpbWVvdXQodGhpcy5fc2hvdywgdGhpcy5kZWxheSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBoaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyh0aGlzLiRlbCwgJ2lucHV0OmZvY3VzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2hvd1RpbWVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNUb2dnbGVkKHRoaXMudG9vbHRpcCB8fCBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy50b29sdGlwLCBmYWxzZSwgZmFsc2UpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS50b29sdGlwID0gcmVtb3ZlJDEodGhpcyQxLnRvb2x0aXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5fdW5iaW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIF9zaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAgPSBhcHBlbmQodGhpcy5jb250YWluZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgKFwiPGRpdiBjbGFzcz1cXFwiXCIgKyAodGhpcy5jbHNQb3MpICsgXCJcXFwiPiA8ZGl2IGNsYXNzPVxcXCJcIiArICh0aGlzLmNsc1BvcykgKyBcIi1pbm5lclxcXCI+XCIgKyAodGhpcy50aXRsZSkgKyBcIjwvZGl2PiA8L2Rpdj5cIilcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgb24odGhpcy50b29sdGlwLCAndG9nZ2xlZCcsIGZ1bmN0aW9uIChlLCB0b2dnbGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS51cGRhdGVBcmlhKHRvZ2dsZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRvZ2dsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnBvc2l0aW9uQXQodGhpcyQxLnRvb2x0aXAsIHRoaXMkMS4kZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzJDEub3JpZ2luID0gdGhpcyQxLmdldEF4aXMoKSA9PT0gJ3knXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKChmbGlwUG9zaXRpb24odGhpcyQxLmRpcikpICsgXCItXCIgKyAodGhpcyQxLmFsaWduKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoKHRoaXMkMS5hbGlnbikgKyBcIi1cIiArIChmbGlwUG9zaXRpb24odGhpcyQxLmRpcikpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLnRvb2x0aXAsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZUFyaWE6IGZ1bmN0aW9uKHRvZ2dsZWQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHIodGhpcy4kZWwsICdhcmlhLWV4cGFuZGVkJywgdG9nZ2xlZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiAoIG9iaiA9IHtcclxuXHJcbiAgICAgICAgICAgIGZvY3VzOiAnc2hvdycsXHJcbiAgICAgICAgICAgIGJsdXI6ICdoaWRlJ1xyXG5cclxuICAgICAgICB9LCBvYmpbKHBvaW50ZXJFbnRlciArIFwiIFwiICsgcG9pbnRlckxlYXZlKV0gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1RvdWNoKGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlLnR5cGUgPT09IHBvaW50ZXJFbnRlciA/ICdzaG93JyA6ICdoaWRlJ10oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgb2JqW3BvaW50ZXJEb3duXSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNUb3VjaChlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBvYmogKVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gbWFrZUZvY3VzYWJsZShlbCkge1xyXG4gICAgICAgIGlmICghaXNGb2N1c2FibGUoZWwpKSB7XHJcbiAgICAgICAgICAgIGF0dHIoZWwsICd0YWJpbmRleCcsICcwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciB1cGxvYWQgPSB7XHJcblxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGFsbG93OiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGNsc0RyYWdvdmVyOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGNvbmN1cnJlbnQ6IE51bWJlcixcclxuICAgICAgICAgICAgbWF4U2l6ZTogTnVtYmVyLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFN0cmluZyxcclxuICAgICAgICAgICAgbWltZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBtc2dJbnZhbGlkTWltZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBtc2dJbnZhbGlkTmFtZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBtc2dJbnZhbGlkU2l6ZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBtdWx0aXBsZTogQm9vbGVhbixcclxuICAgICAgICAgICAgbmFtZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IE9iamVjdCxcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB1cmw6IFN0cmluZ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgYWxsb3c6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbHNEcmFnb3ZlcjogJ3VrLWRyYWdvdmVyJyxcclxuICAgICAgICAgICAgY29uY3VycmVudDogMSxcclxuICAgICAgICAgICAgbWF4U2l6ZTogMCxcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIG1pbWU6IGZhbHNlLFxyXG4gICAgICAgICAgICBtc2dJbnZhbGlkTWltZTogJ0ludmFsaWQgRmlsZSBUeXBlOiAlcycsXHJcbiAgICAgICAgICAgIG1zZ0ludmFsaWROYW1lOiAnSW52YWxpZCBGaWxlIE5hbWU6ICVzJyxcclxuICAgICAgICAgICAgbXNnSW52YWxpZFNpemU6ICdJbnZhbGlkIEZpbGUgU2l6ZTogJXMgS2lsb2J5dGVzIE1heCcsXHJcbiAgICAgICAgICAgIG11bHRpcGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgbmFtZTogJ2ZpbGVzW10nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHt9LFxyXG4gICAgICAgICAgICB0eXBlOiAnJyxcclxuICAgICAgICAgICAgdXJsOiAnJyxcclxuICAgICAgICAgICAgYWJvcnQ6IG5vb3AsXHJcbiAgICAgICAgICAgIGJlZm9yZUFsbDogbm9vcCxcclxuICAgICAgICAgICAgYmVmb3JlU2VuZDogbm9vcCxcclxuICAgICAgICAgICAgY29tcGxldGU6IG5vb3AsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlQWxsOiBub29wLFxyXG4gICAgICAgICAgICBlcnJvcjogbm9vcCxcclxuICAgICAgICAgICAgZmFpbDogbm9vcCxcclxuICAgICAgICAgICAgbG9hZDogbm9vcCxcclxuICAgICAgICAgICAgbG9hZEVuZDogbm9vcCxcclxuICAgICAgICAgICAgbG9hZFN0YXJ0OiBub29wLFxyXG4gICAgICAgICAgICBwcm9ncmVzczogbm9vcFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGV2ZW50czoge1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVzKGUudGFyZ2V0LCAnaW5wdXRbdHlwZT1cImZpbGVcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWQoZS50YXJnZXQuZmlsZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkcm9wOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9wKGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2ZlciA9IGUuZGF0YVRyYW5zZmVyO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdHJhbnNmZXIgfHwgIXRyYW5zZmVyLmZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0RyYWdvdmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZCh0cmFuc2Zlci5maWxlcyk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkcmFnZW50ZXI6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIHN0b3AoZSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkcmFnb3ZlcjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcChlKTtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0RyYWdvdmVyKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGRyYWdsZWF2ZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgc3RvcChlKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0RyYWdvdmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtZXRob2RzOiB7XHJcblxyXG4gICAgICAgICAgICB1cGxvYWQ6IGZ1bmN0aW9uKGZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFmaWxlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3VwbG9hZCcsIFtmaWxlc10pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4U2l6ZSAmJiB0aGlzLm1heFNpemUgKiAxMDAwIDwgZmlsZXNbaV0uc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhaWwodGhpcy5tc2dJbnZhbGlkU2l6ZS5yZXBsYWNlKCclcycsIHRoaXMubWF4U2l6ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGxvdyAmJiAhbWF0Y2godGhpcy5hbGxvdywgZmlsZXNbaV0ubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWlsKHRoaXMubXNnSW52YWxpZE5hbWUucmVwbGFjZSgnJXMnLCB0aGlzLmFsbG93KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbWUgJiYgIW1hdGNoKHRoaXMubWltZSwgZmlsZXNbaV0udHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWlsKHRoaXMubXNnSW52YWxpZE1pbWUucmVwbGFjZSgnJXMnLCB0aGlzLm1pbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZXMgPSBbZmlsZXNbMF1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmVmb3JlQWxsKHRoaXMsIGZpbGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2h1bmtzID0gY2h1bmsoZmlsZXMsIHRoaXMuY29uY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXBsb2FkID0gZnVuY3Rpb24gKGZpbGVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIGRhdGEuYXBwZW5kKHRoaXMkMS5uYW1lLCBmaWxlKTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzJDEucGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKGtleSwgdGhpcyQxLnBhcmFtc1trZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFqYXgodGhpcyQxLnVybCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHRoaXMkMS5tZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogdGhpcyQxLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIChlbnYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeGhyID0gZW52LnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci51cGxvYWQgJiYgb24oeGhyLnVwbG9hZCwgJ3Byb2dyZXNzJywgdGhpcyQxLnByb2dyZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsnbG9hZFN0YXJ0JywgJ2xvYWQnLCAnbG9hZEVuZCcsICdhYm9ydCddLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIG9uKHhociwgdHlwZS50b0xvd2VyQ2FzZSgpLCB0aGlzJDFbdHlwZV0pOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzJDEuYmVmb3JlU2VuZChlbnYpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuY29tcGxldGUoeGhyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2h1bmtzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwbG9hZChjaHVua3Muc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5jb21wbGV0ZUFsbCh4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIHRoaXMkMS5lcnJvcihlKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB1cGxvYWQoY2h1bmtzLnNoaWZ0KCkpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBtYXRjaChwYXR0ZXJuLCBwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGgubWF0Y2gobmV3IFJlZ0V4cCgoXCJeXCIgKyAocGF0dGVybi5yZXBsYWNlKC9cXC8vZywgJ1xcXFwvJykucmVwbGFjZSgvXFwqXFwqL2csICcoXFxcXC9bXlxcXFwvXSspKicpLnJlcGxhY2UoL1xcKi9nLCAnW15cXFxcL10rJykucmVwbGFjZSgvKCg/IVxcXFwpKVxcPy9nLCAnJDEuJykpICsgXCIkXCIpLCAnaScpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaHVuayhmaWxlcywgc2l6ZSkge1xyXG4gICAgICAgIHZhciBjaHVua3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSArPSBzaXplKSB7XHJcbiAgICAgICAgICAgIHZhciBjaHVuayA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY2h1bmsucHVzaChmaWxlc1tpICsgal0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNodW5rcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY29tcG9uZW50cyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcclxuICAgICAgICBfX3Byb3RvX186IG51bGwsXHJcbiAgICAgICAgQ291bnRkb3duOiBjb3VudGRvd24sXHJcbiAgICAgICAgRmlsdGVyOiBmaWx0ZXIsXHJcbiAgICAgICAgTGlnaHRib3g6IGxpZ2h0Ym94LFxyXG4gICAgICAgIExpZ2h0Ym94UGFuZWw6IExpZ2h0Ym94UGFuZWwsXHJcbiAgICAgICAgTm90aWZpY2F0aW9uOiBub3RpZmljYXRpb24sXHJcbiAgICAgICAgUGFyYWxsYXg6IHBhcmFsbGF4LFxyXG4gICAgICAgIFNsaWRlcjogc2xpZGVyLFxyXG4gICAgICAgIFNsaWRlclBhcmFsbGF4OiBzbGlkZXJQYXJhbGxheCxcclxuICAgICAgICBTbGlkZXNob3c6IHNsaWRlc2hvdyxcclxuICAgICAgICBTbGlkZXNob3dQYXJhbGxheDogc2xpZGVyUGFyYWxsYXgsXHJcbiAgICAgICAgU29ydGFibGU6IHNvcnRhYmxlLFxyXG4gICAgICAgIFRvb2x0aXA6IHRvb2x0aXAsXHJcbiAgICAgICAgVXBsb2FkOiB1cGxvYWRcclxuICAgIH0pO1xyXG5cclxuICAgIGVhY2goY29tcG9uZW50cywgZnVuY3Rpb24gKGNvbXBvbmVudCwgbmFtZSkgeyByZXR1cm4gVUlraXQuY29tcG9uZW50KG5hbWUsIGNvbXBvbmVudCk7IH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIFVJa2l0O1xyXG5cclxufSkpKTsiXSwiZmlsZSI6InVpa2l0LmpzIn0=
