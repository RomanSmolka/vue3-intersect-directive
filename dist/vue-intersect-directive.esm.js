import { nextTick } from 'vue';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// --------------------------------------------------------------------------
// Intersect
// --------------------------------------------------------------------------
var Intersect = /** @class */ (function () {
    function Intersect() {
    }
    /**
     *
     */
    Intersect.prototype.bind = function (el, binding) {
        return __awaiter(this, void 0, void 0, function () {
            var observerOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nextTick()
                        //
                    ];
                    case 1:
                        _a.sent();
                        observerOptions = __assign({}, binding.value.observerOptions);
                        this.interSectionObserver = new IntersectionObserver(this.onIntersectChange.bind(this), observerOptions);
                        this.interSectionObserver.observe(el);
                        //
                        this.el = el;
                        this.options = {
                            true: binding.value.true,
                            false: binding.value.false,
                            disposeWhen: binding.value.disposeWhen,
                        };
                        this.callback = binding.value.onChange;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     */
    Intersect.prototype.unbind = function (el, binding) {
        if (this.interSectionObserver) {
            this.interSectionObserver.unobserve(el);
        }
    };
    /**
     *
     */
    Intersect.prototype.onIntersectChange = function (entries, observer) {
        var entry = entries[0];
        if (!entry)
            return;
        //
        if (entry.isIntersecting) {
            if (this.options.true)
                this.addStyleOptions(this.options.true);
            if (this.options.false)
                this.removeStyleOptions(this.options.false);
        }
        else {
            if (this.options.true)
                this.removeStyleOptions(this.options.true);
            if (this.options.false)
                this.addStyleOptions(this.options.false);
        }
        //
        if (this.callback) {
            this.callback(entry.isIntersecting, this.el, this.options);
        }
        //
        if (this.options.disposeWhen !== undefined) {
            var shouldDispose = entry.isIntersecting === this.options.disposeWhen;
            if (shouldDispose)
                this.unbind(this.el);
        }
    };
    /**
     *
     */
    Intersect.prototype.addStyleOptions = function (options) {
        var _a;
        if (Array.isArray(options)) {
            (_a = this.el.classList).add.apply(_a, options);
        }
        else {
            for (var _i = 0, _b = Object.keys(options); _i < _b.length; _i++) {
                var prop = _b[_i];
                this.el.style[prop] = options[prop];
            }
        }
    };
    /**
     *
     */
    Intersect.prototype.removeStyleOptions = function (options) {
        var _a;
        if (Array.isArray(options)) {
            (_a = this.el.classList).remove.apply(_a, options);
        }
        else {
            for (var _i = 0, _b = Object.keys(options); _i < _b.length; _i++) {
                var prop = _b[_i];
                this.el.style.removeProperty(prop);
            }
        }
    };
    return Intersect;
}());

var intersectMap = new Map();
/**
 *
 */
var mounted = function (el, binding) {
    var intersect = new Intersect();
    intersectMap.set(el, intersect);
    intersect.bind(el, binding);
};
/**
 *
 */
var unmounted = function (el, binding) {
    var intersect = intersectMap.get(el);
    if (intersect) {
        intersect.unbind(el, binding);
    }
};
/**
 *
 */
var IntersectDirective = {
    mounted: mounted,
    unmounted: unmounted,
    getSSRProps: function () { return ({}); } // no SSR support
};

var install = function (app) {
    app.directive('intersect', IntersectDirective);
};
var VueIntersect = {
    install: install,
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueIntersect.install);
}

export { IntersectDirective, VueIntersect as default };
