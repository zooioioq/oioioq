/*
Responsivej$         
A small javascript library for web responsive design. It allow to handle dynamic
css and media queries and some javascript reactive functions.

Author Alessandro Saiani - mail : alessandro@responsivejs.com
Copyright (C) 2013 Alessandro Saiani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
  
Version 1.0 beta
http://www.responsivejs.com
 
 */

(function (window) {
    //define private variables.
    var r$, //singleton return object.
        $settings = {},//settings json object.
        $breakpoints = [],//breakpoint array.
        $rules = [],//media query colletion.
        $dynamics = [],//dynamic collection.
        enabled = false,//enable or disabled r$.
        tempPageTitle = null,//temp debug page title.
        $delegates = [];//delegates array.

    function r$Constructor(window) {
        this.settings({
            //indent rendered media query.
            indent: false,
            //id of style node with static media query/css.
            staticWrapper: 'staticMediaQueries',
            //id of style node with dynamic rendering.
            dynamicWrapper: 'dynamicMediaQueries',
            //indicates if use media query rendering or only css rendering.
            useMediaQuery: true,
            //enable or disable debug mode.
            debug: false,
            //max width supported.
            maxWidth: 2048,//QXCGA
            //min width supported.
            minWidth: 200, //CGA
            //default step in interpolation functions.
            defaultStep: 32
        });
        //add listener to tablet/mobile orientationchange event.
        addEventHandler("orientationchange", window, function () { r$.fireEvents(); });
        addEventHandler("resize", window, function () {
            r$.fireEvents();
        });
    }

    //return r$ version.
    r$Constructor.prototype.getVersion = function () {
        return "1.0";
    };

    //enable r$ functionalities during resize/orientation change events.
    r$Constructor.prototype.fireEvents = function () {
        //if not enabled return.
        if (!enabled) return;
        var w = getDeviceWidth();

        //evalues delegates.
        for (var i = 0; i < $delegates.length; i++) {
            if ($delegates[i].Condition(w)) {
                $delegates[i].Action(w);
            }
        }

        //render dynamic css.
        renderDynamic(w);

        if (!$settings.useMediaQuery) {
            r$.render();
        }

        //display debug info.
        if ($settings.debug) {
            if (tempPageTitle == null)
                tempPageTitle = document.title;
            document.title = w + 'px - ' + tempPageTitle;
        }
    };

    //initialize delegates for width range function.
    r$Constructor.prototype.whenInRange = function (min, max) {
        return new whenBody(min, max);
    };

    //register global function.
    r$Constructor.prototype.register = function (name, func) {
        $delegates.push({
            Name: name,
            Action: func,
            Condition: function () { return true; }
        });
    };

    //unregister global function.
    r$Constructor.prototype.unregister = function (name) {
        var temp = [];
        for (var i = 0; i < $delegates.length; i++) {
            if ($delegates[i].Name == name)
                continue;
            temp.push($delegates[i]);
        }
        $delegates = temp;
    };

    //add a dynamic template for a width interval and some data.
    r$Constructor.prototype.dynamic = function (template, data, range) {
        var r = range != undefined ? range : [[this.settings().minWidth, this.settings().maxWidth]];
        $dynamics.push({
            Interval: r,
            Template: template,
            Func: data
        });
    };

    //render a js template with data.
    r$Constructor.prototype.template = function (str, data) {
        var tmplCache = {};
        var err;
        try {
            var func = tmplCache[str];
            if (!func) {
                var strFunc =
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +
                        "with(obj){p.push('" +
                        str.replace(/[\r\t\n]/g, " ")
                            .replace(/'(?=[^#]*#>)/g, "\t")
                            .split("'").join("\\'")
                            .split("\t").join("'")
                            .replace(/<#=(.+?)#>/g, "',$1,'")
                            .split("<#").join("');")
                            .split("#>").join("p.push('")
                        + "');}return p.join('');";

                func = new Function("obj", strFunc);
                tmplCache[str] = func;
            }
            return func(data);
        } catch (e) { err = e.message; }
        return "< # ERROR: " + err.toString() + " # >";
    };

    //return or set breakpoints.
    r$Constructor.prototype.breakpoints = function (/**/) {
        var args = arguments;
        if (args.length == 1 && isArray(args[0]))
            args = args[0];
        if (args.length == 0)
            return $breakpoints;
        var min = -1;
        for (var i = 0; i < args.length; i++) {
            if (args[i] <= min) {
                return $breakpoints;
            }
        }
        $breakpoints = args;
        return $breakpoints;
    };

    //reset internal definitions and data. disable r$.
    r$Constructor.prototype.reset = function () {
        $breakpoints = [];
        $rules = [];
        $dynamics = [];
        $delegates = [];
        this.stop();
    };

    //return or set setting json object.
    r$Constructor.prototype.settings = function (setting) {
        if (setting == undefined)
            return $settings;
        $settings = setting;
        return $settings;
    };

    //enable r$ functionalities and rendering.
    r$Constructor.prototype.start = function () {
        if (enabled) return;
        enabled = true;

        if ($settings.useMediaQuery) {
            r$.render();
        }
        r$.fireEvents();
    };

    //render static css rules.
    r$Constructor.prototype.render = function () {
        var indent = r$.settings().indent;
        var renderMediaQuery = function (min, max, css, indent) {
            var mstr = '';

            if (min != null && max == null)
                mstr = "@media only screen and (min-width: " + min + "px)" + " { " + (indent ? "\r\n" : "");
            if (min == null && max != null)
                mstr = "@media only screen and (max-width: " + max + "px)" + " { " + (indent ? "\r\n" : "");
            if (min != null && max != null)
                mstr = "@media only screen and (min-width: " + min + "px) and (max-width: " + (max) + "px) " + " { " + (indent ? "\r\n" : "");
            mstr = mstr + css + (indent ? "}\r\n" : "}");
            return mstr;
        };
        var renderStyle = function (selector, properties, values, indent, linestart) {
            var ret = linestart + selector + '{' + (indent ? "\r\n" : "");

            for (var k = 0; k < properties.length; k++)
                ret = ret + linestart + (indent ? "\t" : "") + properties[k].Name + ":" + values[k] + " !important;" + (indent ? "\r\n" : "");

            ret = ret + linestart + '}' + (indent ? "\r\n" : "");
            return ret;
        };

        var html = '';
        if (r$.settings().useMediaQuery) {

            var queries = group($rules, function (r) {
                if (r.Min != null && r.Max != null)
                    return r.Min + "_" + r.Max;
                if (r.Min != null)
                    return r.Min + "_max";
                if (r.Max != null)
                    return "min_" + r.Max;
                return "_";
            });

            queries = queries.sort(function (a, b) {
                var minA = a.Items[0].min != null ? a.Items[0].min : a.Items[0].max;
                var minB = b.Items[0].min != null ? b.Items[0].min : b.Items[0].max;

                if (minA == minB) {
                    if (a.Items[0].max == null) return -1;
                    if (b.Items[0].max == null) return 1;
                    return a.Items[0].max - b.Items[0].max;
                }

                return minA - minB;
            });

            for (var i = 0; i < queries.length; i++) {
                var q = queries[i].Items[0];

                var css = '';
                var ruleGroup = group(queries[i].Items, function (w) {
                    return w.Selector;
                });

                for (var j = 0; j < ruleGroup.length; j++) {
                    var p = [];
                    var v = [];
                    for (var k = 0; k < ruleGroup[j].Items.length; k++) {
                        p.push(ruleGroup[j].Items[k].Property);
                        v.push(ruleGroup[j].Items[k].Value + ruleGroup[j].Items[k].Unit);
                    }
                    css = css + renderStyle(ruleGroup[j].Key, p, v, indent, (indent ? '\t\t' : ''));
                }
                html = html + renderMediaQuery(q.Min, q.Max, css, indent);
            }


        } else {
            var w = getDeviceWidth();
            var current = [];
            for (var i = 0; i < $rules.length; i++) {
                if ($rules[i].Min == null && $rules[i].Max >= w) {
                    current.push($rules[i]);
                }
                else
                    if ($rules[i].Min <= w && $rules[i].Max == null) {
                        current.push($rules[i]);
                    }
                    else
                        if ($rules[i].Min <= w && $rules[i].Max >= w)
                            current.push($rules[i]);
            }

            var g = group(current, function (i) {
                return i.Selector;
            });

            for (i = 0; i < g.length; i++) {
                var p = [];
                var v = [];
                for (var k = 0; k < g[i].Items.length; k++) {
                    p.push(g[i].Items[k].Property);
                    v.push(g[i].Items[k].Value + g[i].Items[k].Unit);
                }
                html = html + renderStyle(g[i].Key, p, v, indent, '');
            }
        }

        var inner = html;
        var wrp = document.getElementById(this.settings().staticWrapper);
        if (wrp == null) {
            if (document.body == null) return;
            wrp = document.createElement('style');
            wrp.setAttribute('id', $settings.staticWrapper);
            document.body.appendChild(wrp);
        } else {
            wrp.innerHTML = '';
        }
        wrp.appendChild(document.createTextNode(inner));

    };

    //disable r$.
    r$Constructor.prototype.stop = function () {
        if (!enabled) return;
        enabled = false;
        var wrp = document.getElementById(this.settings().staticWrapper);
        var dwrp = document.getElementById(this.settings().dynamicWrapper);

        if (wrp != null) document.body.removeChild(wrp);
        if (dwrp != null) document.body.removeChild(dwrp);
    };

    //refresh css rules.
    r$Constructor.prototype.update = function () {
        if (!enabled) return;
        render();
    };

    //extend r$ prototype.
    r$Constructor.prototype.extend = function (/**/) {
        var args = arguments;
        if (args.length == 1 && isArray(args[0]))
            args = args[0];

        for (var i = 0; i < args.length; i++) {
            args[i](r$Constructor.prototype);
        }
    };

    r$Constructor.prototype.set = function (name, unit) {
        return new cssProperty(name, unit);
    };
    
    r$Constructor.prototype.onCondition = function (condition) {
        return new conditionBody(condition);
    };

    /* CLASSES */

    var conditionBody = (function () {

        function conditionBodyClass(condition) {
            this.Condition = condition;
        }

        conditionBodyClass.prototype.do = function (action, name) {
            var n = name != undefined ? name : '';
            $delegates.push({
                Name: n,
                Action: action,
                Condition: this.Condition
            });
        };

        return conditionBodyClass;
    })();

    var whenBody = (function () {
        function whenBodyClass(min, max) {
            this.min = min == undefined ? null : min;
            this.max = max == undefined ? null : max;
        }

        whenBodyClass.prototype.do = function (func, name) {
            var n = name != undefined ? name : '';
            $delegates.push({
                Name: n,
                Action: func,
                Condition: function (w) {
                    if (this.min != null && w < this.min) return false;
                    if (this.max != null && w > this.max) return false;
                    return true;
                }
            });
        };

        return whenBodyClass;
    })();


    var cssProperty = (function () {
        function cssPropertyFactory(name, unit) {
            if (name == undefined || name == '')
                throw new Error('Invalid Property Name');
            this.Name = name;
            this.Unit = unit == undefined ? '' : unit;
        }

        cssPropertyFactory.prototype.values = function (/**/) {
            var args = arguments;
            if (args.length == 1 && isArray(args[0]))
                args = args[0];

            if (args.length != r$.breakpoints().length) {
                throw new Error('Wrong Values Array size');
            }

            return new cssBody(this, r$.breakpoints(), args, this.Unit);
        };

        cssPropertyFactory.prototype.custom = function (/**/) {
            var args = arguments;
            if (args.length == 1 && isArray(args[0]))
                args = args[0];
            var nB = [];
            var nV = [];
            for (var i = 0; i < args.length; i++) {
                nB.push(args[i][0]);
                nV.push(args[i][1]);
            }
            return new cssBody(this, nB, nV, this.Unit);
        };

        cssPropertyFactory.prototype.as = function (func, delta, min, max, partial) {
            var start = min != undefined ? min : r$.settings().minWidth;
            var end = max != undefined ? max : r$.settings().maxWidth;
            var d = delta == undefined ? 10 : delta;
            var p = partial != undefined ? partial : false;
            var u = this.Unit != undefined ? this.Unit : '';
            var values = [];
            for (var x = start; x <= end; x++) {
                var val = func(x);
                if (!isNumber(val))
                    throw new Error('as function does not return numeric value : ' + val);
                values.push({
                    W: x,
                    Y: val
                });
            }

            var currentW = 0;
            var list = [];
            for (x = 0; x < values.length; x++) {
                if (!p && x == 0) {
                    list.push(new cssRule(null, values[x].W, this, values[x].Y, u));
                }

                if (values[x].W != values[currentW].W) {

                    if (Math.abs(values[x].Y - values[currentW].Y) > d) {
                        list.push(new cssRule(values[currentW].W, values[x].W, this, values[x].Y, u));

                        currentW = x;
                    }
                }

                if (!p && x == values.length - 1) {
                    list.push(new cssRule(values[x].W, null, this, values[x].Y, u));
                }
            }
            return new cssRuleCollection(list);
        };

        return cssPropertyFactory;
    })();

    var cssBody = (function () {
        function cssBodyFactory(property, breakpoints, values, unit) {
            if (property == undefined) throw new Error('Invalid Property');
            if (breakpoints == undefined || breakpoints.length == 0) throw new Error('Invalid Breakpoints array');
            if (values == undefined || values.length == 0) throw new Error('Invalid Values array');
            this.Property = property;
            this.Breakpoints = breakpoints;
            this.Values = values;
            this.Unit = unit;
        }

        cssBodyFactory.prototype.linear = function (step) {
            var s = (step == undefined) ? r$.settings().defaultStep : step;
            var list = [];
            for (var i = 0; i < this.Breakpoints.length; i++) {
                if (i == 0) {
                    list.push(new cssRule(null, this.Breakpoints[i], this.Property, this.Values[i], this.Unit));
                }
                if (i == this.Breakpoints.length - 1) {
                    list.push(new cssRule(this.Breakpoints[i], null, this.Property, this.Values[i], this.Unit));

                } else {
                    if (this.Values[i] == this.Values[i + 1]) {
                        list.push(new cssRule(this.Breakpoints[i], this.Breakpoints[i + 1], this.Property, this.Values[i], this.Unit));
                    } else {
                        if ((this.Breakpoints[i + 1] - 1) != this.Breakpoints[i]) {
                            for (var k = this.Breakpoints[i]; k < this.Breakpoints[i + 1]; k = k + s) {
                                if (k + s > this.Breakpoints[i + 1])
                                    list.push(new cssRule(k, this.Breakpoints[i + 1], this.Property, linearInterpolation(k, this.Breakpoints[i], this.Breakpoints[i + 1], this.Values[i], this.Values[i + 1]), this.Unit));
                                else
                                    list.push(new cssRule(k, k + s, this.Property, linearInterpolation(k, this.Breakpoints[i], this.Breakpoints[i + 1], this.Values[i], this.Values[i + 1]), this.Unit));
                            }
                        }
                    }
                }
            }
            return new cssRuleCollection(list);

        };

        cssBodyFactory.prototype.linearInt = function (step) {
            var coll = this.linear(step);
            var list = [];
            for (var i = 0; i < coll.List.length; i++) {
                coll.List[i].Value = Math.round(coll.List[i].Value);
                list.push(coll.List[i]);
            }
            return new cssRuleCollection(list);
        };

        cssBodyFactory.prototype.interval = function () {
            var list = [];
            for (var i = 0; i < this.Breakpoints.length; i++) {
                if (i == 0) {
                    list.push(new cssRule(null, this.Breakpoints[i], this.Property, this.Values[i], this.Unit));
                }
                if (i == this.Breakpoints.length - 1) {
                    list.push(new cssRule(this.Breakpoints[i], null, this.Property, this.Values[i], this.Unit));
                } else {
                    list.push(new cssRule(this.Breakpoints[i], this.Breakpoints[i + 1], this.Property, this.Values[i], this.Unit));
                }
            }
            return new cssRuleCollection(list);
        };

        function linearInterpolation(current, min, max, minVal, maxVal) {
            if (current <= min) return minVal;
            if (current >= max) return maxVal;
            try {
                parseColor(minVal);
                return interpolateColor(current, min, max, minVal, maxVal);

            } catch (err) {
                var m = (maxVal - minVal) / (max - min);

                return (m * (current - min) + minVal).toFixed(4);
            }
        }

        return cssBodyFactory;
    })();

    var cssRule = (function () {
        function cssRuleFactory(min, max, property, value, unit) {
            this.Min = min;
            this.Max = max;
            this.Property = property;
            this.Unit = unit;
            this.Value = value;
        }

        cssRuleFactory.prototype.applyTo = function (/**/) {
            var args = arguments;
            if (args.length == 1 && isArray(args[0]))
                args = args[0];

            for (var i = 0; i < args.length; i++)
                $rules.push({
                    Min: this.Min,
                    Max: this.Max,
                    Selector: args[i],
                    Property: this.Property,
                    Value: this.Value,
                    Unit: this.Unit
                });
        };

        return cssRuleFactory;
    })();

    var cssRuleCollection = (function () {
        function cssRuleCollectionFactory(list) {
            this.List = list;
        }

        cssRuleCollectionFactory.prototype.applyTo = function (/**/) {
            var args = arguments;
            if (args.length == 1 && isArray(args[0]))
                args = args[0];

            for (var i = 0; i < args.length; i++)
                for (var j = 0; j < this.List.length; j++)
                    $rules.push({
                        Min: this.List[j].Min,
                        Max: this.List[j].Max,
                        Selector: args[i],
                        Property: this.List[j].Property,
                        Value: this.List[j].Value,
                        Unit: this.List[j].Unit
                    });
        };

        return cssRuleCollectionFactory;
    })();


    /* PRIVATE FUNCTIONS */


    function isArray(obj) {
        return (typeof obj !== 'undefined' &&
                obj && obj.constructor === Array);
    }

    function addEventHandler(evnt, elem, func) {
        if (elem.addEventListener) // W3C DOM
            elem.addEventListener(evnt, func, false);
        else if (elem.attachEvent) { // IE DOM
            var r = elem.attachEvent("on" + evnt, func);
            return r;
        }
        return null;
    }

    function getDeviceWidth() {
        if (typeof (window.innerWidth) == 'number') {
            //Non-IE
            return window.innerWidth;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            //IE 6+ in 'standards compliant mode'
            return document.documentElement.clientWidth;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            //IE 4 compatible
            return document.body.clientWidth;
        }
        return 0;
    }

    function parseColor(color) {
        var cache, p = parseInt , color = color.replace(/\s\s*/g, '') ;
        if (cache = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color))
            cache = [p(cache[1], 16), p(cache[2], 16), p(cache[3], 16)];
        else if (cache = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color))
            cache = [p(cache[1], 16) * 17, p(cache[2], 16) * 17, p(cache[3], 16) * 17];
        else if (cache = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color))
            cache = [+cache[1], +cache[2], +cache[3], +cache[4]];
        else if (cache = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color))
            cache = [+cache[1], +cache[2], +cache[3]];
        isNaN(cache[3]) && (cache[3] = 1);
        return cache.slice(0, 3 + !supportsRGBA());
    }

    function supportsRGBA() {
        if (!('result' in arguments.callee)) {
            var scriptElement = document.getElementsByTagName('script')[0];
            var prevColor = scriptElement.style.color;
            var testColor = 'rgba(0, 0, 0, 0.5)';
            if (prevColor == testColor) {
                arguments.callee.result = true;
            }
            else {
                try {
                    scriptElement.style.color = testColor;
                } catch (e) { }
                arguments.callee.result = scriptElement.style.color != prevColor;
                scriptElement.style.color = prevColor;
            }
        }
        return arguments.callee.result;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function interpolateColor(current, min, max, minVal, maxVal) {
        var minColor = parseColor(minVal);
        var maxColor = parseColor(maxVal);
        var rm = (maxColor[0] - minColor[0]) / (max - min);
        var r = minColor[0] + Math.round(rm * (current - min));
        var gm = (maxColor[0] - minColor[1]) / (max - min);
        var g = minColor[1] + Math.round(gm * (current - min));
        var bm = (maxColor[2] - minColor[2]) / (max - min);
        var b = minColor[2] + Math.round(bm * (current - min));
        return rgbToHex(r, g, b);
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function group(array, getkey) {
        var groups = [];
        var keys = [];
        for (var i = 0; i < array.length; i++) {
            if (!contains(keys, getkey(array[i]))) {
                var key = getkey(array[i]);
                keys.push(key);

                var items = [];
                for (var k = 0; k < array.length; k++) {
                    if (getkey(array[k]) == key)
                        items.push(array[k]);
                }

                groups.push({
                    Key: key,
                    Items: items
                });
            }
        }
        return groups;
    }

    function contains(array, item) {
        if (array == null || item == null) return false;
        for (var i = 0; i < array.length; i++) {
            if (array[i] == item)
                return true;
        }
        return false;
    }

    function renderDynamic(w) {
        function isInRange(k, intervals) {
            for (var j = 0; j < intervals.length; j++) {
                if (intervals[j][0] <= k && intervals[j][1] >= k)
                    return true;
            }
            return false;
        }

        if ($dynamics.length == 0) return;

        var html = '';
        for (var i = 0; i < $dynamics.length; i++) {
            if (isInRange(w, $dynamics[i].Interval)) {
                html = html + r$.template($dynamics[i].Template, $dynamics[i].Func(w));
            }
        }
        var wrp = document.getElementById(r$.settings().dynamicWrapper);
        if (wrp == null) {
            if (document.body == null) return;
            wrp = document.createElement('style');
            wrp.setAttribute('id', $settings.dynamicWrapper);
            document.body.appendChild(wrp);
        } else {
            wrp.innerHTML = '';
        }
        wrp.appendChild(document.createTextNode(html));
    }

    window.r$ = r$ = new r$Constructor(window);
})(window);