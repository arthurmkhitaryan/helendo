/*====================================
    Ajax Mail js
======================================*/

$(function () {

    // Get the form.
    var form = $('#contact-form');

    // Get the messages div.
    var formMessages = $('.form-messege');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#contact-form input,#contact-form textarea').val('');
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
    });

});


/*====================================*/


/*-------------------------------
    Countdown Js
--------------------------------*/

/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function (a) {
    "use strict";

    function b(a) {
        if (a instanceof Date) return a;
        if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a);
        throw new Error("Couldn't cast `" + a + "` to a date object.")
    }

    function c(a) {
        var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(b)
    }

    function d(a) {
        return function (b) {
            var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (d) for (var f = 0, g = d.length; f < g; ++f) {
                var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), j = c(h[0]), k = h[1] || "", l = h[3] || "",
                    m = null;
                h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && m < 10 && (m = "0" + m.toString()), b = b.replace(j, m.toString()))
            }
            return b = b.replace(/%%/, "%")
        }
    }

    function e(a, b) {
        var c = "s", d = "";
        return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), Math.abs(b) > 1 ? c : d
    }

    var f = [], g = [], h = {precision: 100, elapse: !1, defer: !1};
    g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));
    var i = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        d: "daysToWeek",
        w: "weeks",
        W: "weeksToMonth",
        H: "hours",
        M: "minutes",
        S: "seconds",
        D: "totalDays",
        I: "totalHours",
        N: "totalMinutes",
        T: "totalSeconds"
    }, j = function (b, c, d) {
        this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.options.defer === !1 && this.start()
    };
    a.extend(j.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var a = this;
            this.update(), this.interval = setInterval(function () {
                a.update.call(a)
            }, this.options.precision)
        }, stop: function () {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        }, toggle: function () {
            this.interval ? this.stop() : this.start()
        }, pause: function () {
            this.stop()
        }, resume: function () {
            this.start()
        }, remove: function () {
            this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        }, setFinalDate: function (a) {
            this.finalDate = b(a)
        }, update: function () {
            if (0 === this.$el.closest("html").length) return void this.remove();
            var b, c = void 0 !== a._data(this.el, "events"), d = new Date;
            b = this.finalDate.getTime() - d.getTime(), b = Math.ceil(b / 1e3), b = !this.options.elapse && b < 0 ? 0 : Math.abs(b), this.totalSecsLeft !== b && c && (this.totalSecsLeft = b, this.elapsed = d >= this.finalDate, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - d.getFullYear()),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                totalSeconds: this.totalSecsLeft
            }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")))
        }, dispatchEvent: function (b) {
            var c = a.Event(b + ".countdown");
            c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c)
        }
    }), a.fn.countdown = function () {
        var b = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var c = a(this).data("countdown-instance");
            if (void 0 !== c) {
                var d = f[c], e = b[0];
                j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))
            } else new j(this, b[0], b[1])
        })
    }
});


/*====================================*/


/* img zoom */

/*!
 * @name        easyzoom
 * @author      Matt Hinchliffe <>
 * @modified    Tuesday, February 14th, 2017
 * @version     2.5.0
 */
!function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function (a) {
        b(a)
    }) : "object" == typeof module && module.exports ? module.exports = a.EasyZoom = b(require("jquery")) : a.EasyZoom = b(a.jQuery)
}(this, function (a) {
    "use strict";

    function b(b, c) {
        this.$target = a(b), this.opts = a.extend({}, i, c, this.$target.data()), void 0 === this.isOpen && this._init()
    }

    var c, d, e, f, g, h, i = {
        loadingNotice: "Loading image",
        errorNotice: "The image could not be loaded",
        errorDuration: 2500,
        linkAttribute: "href",
        preventClicks: !0,
        beforeShow: a.noop,
        beforeHide: a.noop,
        onShow: a.noop,
        onHide: a.noop,
        onMove: a.noop
    };
    b.prototype._init = function () {
        this.$link = this.$target.find("a"), this.$image = this.$target.find("img"), this.$flyout = a('<div class="easyzoom-flyout" />'), this.$notice = a('<div class="easyzoom-notice" />'), this.$target.on({
            "mousemove.easyzoom touchmove.easyzoom": a.proxy(this._onMove, this),
            "mouseleave.easyzoom touchend.easyzoom": a.proxy(this._onLeave, this),
            "mouseenter.easyzoom touchstart.easyzoom": a.proxy(this._onEnter, this)
        }), this.opts.preventClicks && this.$target.on("click.easyzoom", function (a) {
            a.preventDefault()
        })
    }, b.prototype.show = function (a, b) {
        var g, h, i, j, k = this;
        if (this.opts.beforeShow.call(this) !== !1) {
            if (!this.isReady) return this._loadImage(this.$link.attr(this.opts.linkAttribute), function () {
                !k.isMouseOver && b || k.show(a)
            });
            this.$target.append(this.$flyout), g = this.$target.width(), h = this.$target.height(), i = this.$flyout.width(), j = this.$flyout.height(), c = this.$zoom.width() - i, d = this.$zoom.height() - j, c < 0 && (c = 0), d < 0 && (d = 0), e = c / g, f = d / h, this.isOpen = !0, this.opts.onShow.call(this), a && this._move(a)
        }
    }, b.prototype._onEnter = function (a) {
        var b = a.originalEvent.touches;
        this.isMouseOver = !0, b && 1 != b.length || (a.preventDefault(), this.show(a, !0))
    }, b.prototype._onMove = function (a) {
        this.isOpen && (a.preventDefault(), this._move(a))
    }, b.prototype._onLeave = function () {
        this.isMouseOver = !1, this.isOpen && this.hide()
    }, b.prototype._onLoad = function (a) {
        a.currentTarget.width && (this.isReady = !0, this.$notice.detach(), this.$flyout.html(this.$zoom), this.$target.removeClass("is-loading").addClass("is-ready"), a.data.call && a.data())
    }, b.prototype._onError = function () {
        var a = this;
        this.$notice.text(this.opts.errorNotice), this.$target.removeClass("is-loading").addClass("is-error"), this.detachNotice = setTimeout(function () {
            a.$notice.detach(), a.detachNotice = null
        }, this.opts.errorDuration)
    }, b.prototype._loadImage = function (b, c) {
        var d = new Image;
        this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)), this.$zoom = a(d).on("error", a.proxy(this._onError, this)).on("load", c, a.proxy(this._onLoad, this)), d.style.position = "absolute", d.src = b
    }, b.prototype._move = function (a) {
        if (0 === a.type.indexOf("touch")) {
            var b = a.touches || a.originalEvent.touches;
            g = b[0].pageX, h = b[0].pageY
        } else g = a.pageX || g, h = a.pageY || h;
        var i = this.$target.offset(), j = h - i.top, k = g - i.left, l = Math.ceil(j * f), m = Math.ceil(k * e);
        if (m < 0 || l < 0 || m > c || l > d) this.hide(); else {
            var n = l * -1, o = m * -1;
            this.$zoom.css({top: n, left: o}), this.opts.onMove.call(this, n, o)
        }
    }, b.prototype.hide = function () {
        this.isOpen && this.opts.beforeHide.call(this) !== !1 && (this.$flyout.detach(), this.isOpen = !1, this.opts.onHide.call(this))
    }, b.prototype.swap = function (b, c, d) {
        this.hide(), this.isReady = !1, this.detachNotice && clearTimeout(this.detachNotice), this.$notice.parent().length && this.$notice.detach(), this.$target.removeClass("is-loading is-ready is-error"), this.$image.attr({
            src: b,
            srcset: a.isArray(d) ? d.join() : d
        }), this.$link.attr(this.opts.linkAttribute, c)
    }, b.prototype.teardown = function () {
        this.hide(), this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error"), this.detachNotice && clearTimeout(this.detachNotice), delete this.$link, delete this.$zoom, delete this.$image, delete this.$notice, delete this.$flyout, delete this.isOpen, delete this.isReady
    }, a.fn.easyZoom = function (c) {
        return this.each(function () {
            var d = a.data(this, "easyZoom");
            d ? void 0 === d.isOpen && d._init() : a.data(this, "easyZoom", new b(this, c))
        })
    }
});


/*====================================*/


/*=================================
    fullPage 2.7.4
====================================*/


/*!
 * fullPage 2.7.4
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */


(function (c, k) {
    "function" === typeof define && define.amd ? define(["jquery"], function (m) {
        return k(m, c, c.document, c.Math)
    }) : "undefined" !== typeof exports ? module.exports = k(require("jquery"), c, c.document, c.Math) : k(jQuery, c, c.document, c.Math)
})("undefined" !== typeof window ? window : this, function (c, k, m, p, D) {
    var n = c(k), t = c(m);
    c.fn.fullpage = function (d) {
        function La() {
            d.css3 && (d.css3 = Ma());
            d.anchors.length || (d.anchors = c("[data-anchor]").map(function () {
                return c(this).data("anchor").toString()
            }).get());
            Na();
            e.setAllowScrolling(!0);
            q = n.height();
            e.setAutoScrolling(d.autoScrolling, "internal");
            var a = c(".fp-section.active").find(".fp-slide.active");
            a.length && (0 !== c(".fp-section.active").index(".fp-section") || 0 === c(".fp-section.active").index(".fp-section") && 0 !== a.index()) && T(a);
            ja();
            ka();
            n.on("load", function () {
                var a = k.location.hash.replace("#", "").split("/"), c = a[0], a = a[1];
                c && (d.animateAnchor ? U(c, a) : e.silentMoveTo(c, a))
            })
        }

        function Na() {
            h.css({height: "100%", position: "relative"});
            h.addClass("fullpage-wrapper");
            c("html").addClass("fp-enabled");
            h.removeClass("fp-destroyed");
            Oa();
            c(".fp-section").each(function (a) {
                var b = c(this), g = b.find(".fp-slide"), f = g.length;
                a || 0 !== c(".fp-section.active").length || b.addClass("active");
                b.css("height", q + "px");
                d.paddingTop && b.css("padding-top", d.paddingTop);
                d.paddingBottom && b.css("padding-bottom", d.paddingBottom);
                "undefined" !== typeof d.sectionsColor[a] && b.css("background-color", d.sectionsColor[a]);
                "undefined" !== typeof d.anchors[a] && b.attr("data-anchor", d.anchors[a]);
                "undefined" !== typeof d.anchors[a] && b.hasClass("active") &&
                V(d.anchors[a], a);
                d.menu && d.css3 && c(d.menu).closest(".fullpage-wrapper").length && c(d.menu).appendTo(r);
                0 < f ? Pa(b, g, f) : d.verticalCentered && la(b)
            });
            d.fixedElements && d.css3 && c(d.fixedElements).appendTo(r);
            d.navigation && Qa();
            d.scrollOverflow ? ("complete" === m.readyState && ma(), n.on("load", ma)) : na()
        }

        function Pa(a, b, g) {
            var f = 100 * g, e = 100 / g;
            b.wrapAll('<div class="fp-slidesContainer" />');
            b.parent().wrap('<div class="fp-slides" />');
            a.find(".fp-slidesContainer").css("width", f + "%");
            1 < g && (d.controlArrows && Ra(a),
            d.slidesNavigation && Sa(a, g));
            b.each(function (a) {
                c(this).css("width", e + "%");
                d.verticalCentered && la(c(this))
            });
            a = a.find(".fp-slide.active");
            a.length && (0 !== c(".fp-section.active").index(".fp-section") || 0 === c(".fp-section.active").index(".fp-section") && 0 !== a.index()) ? T(a) : b.eq(0).addClass("active")
        }

        function Oa() {
            c(d.sectionSelector).each(function () {
                c(this).addClass("fp-section")
            });
            c(d.slideSelector).each(function () {
                c(this).addClass("fp-slide")
            })
        }

        function Ra(a) {
            a.find(".fp-slides").after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>');
            "#fff" != d.controlArrowColor && (a.find(".fp-controlArrow.fp-next").css("border-color", "transparent transparent transparent " + d.controlArrowColor), a.find(".fp-controlArrow.fp-prev").css("border-color", "transparent " + d.controlArrowColor + " transparent transparent"));
            d.loopHorizontal || a.find(".fp-controlArrow.fp-prev").hide()
        }

        function Qa() {
            r.append('<div id="fp-nav"><ul></ul></div>');
            var a = c("#fp-nav");
            a.addClass(function () {
                return d.showActiveTooltip ? "fp-show-active " + d.navigationPosition : d.navigationPosition
            });
            for (var b = 0; b < c(".fp-section").length; b++) {
                var g = "";
                d.anchors.length && (g = d.anchors[b]);
                var g = '<li><a href="#' + g + '"><span></span></a>', f = d.navigationTooltips[b];
                "undefined" !== typeof f && "" !== f && (g += '<div class="fp-tooltip ' + d.navigationPosition + '">' + f + "</div>");
                g += "</li>";
                a.find("ul").append(g)
            }
            c("#fp-nav").css("margin-top", "-" + c("#fp-nav").height() / 2 + "px");
            c("#fp-nav").find("li").eq(c(".fp-section.active").index(".fp-section")).find("a").addClass("active")
        }

        function ma() {
            c(".fp-section").each(function () {
                var a =
                    c(this).find(".fp-slide");
                a.length ? a.each(function () {
                    I(c(this))
                }) : I(c(this))
            });
            na()
        }

        function na() {
            var a = c(".fp-section.active"), b = a.find("SLIDES_WRAPPER"), g = a.find(".fp-scrollable");
            b.length && (g = b.find(".fp-slide.active"));
            g.mouseover();
            J(a);
            oa(a);
            c.isFunction(d.afterLoad) && d.afterLoad.call(a, a.data("anchor"), a.index(".fp-section") + 1);
            c.isFunction(d.afterRender) && d.afterRender.call(h)
        }

        function pa() {
            var a;
            if (!d.autoScrolling || d.scrollBar) {
                for (var b = n.scrollTop(), g = 0, f = p.abs(b - m.querySelectorAll(".fp-section")[0].offsetTop),
                         e = m.querySelectorAll(".fp-section"), h = 0; h < e.length; ++h) {
                    var k = p.abs(b - e[h].offsetTop);
                    k < f && (g = h, f = k)
                }
                a = c(e).eq(g);
                if (!a.hasClass("active") && !a.hasClass("fp-auto-height")) {
                    W = !0;
                    b = c(".fp-section.active");
                    g = b.index(".fp-section") + 1;
                    f = X(a);
                    e = a.data("anchor");
                    h = a.index(".fp-section") + 1;
                    k = a.find(".fp-slide.active");
                    if (k.length) var l = k.data("anchor"), q = k.index();
                    u && (a.addClass("active").siblings().removeClass("active"), c.isFunction(d.onLeave) && d.onLeave.call(b, g, h, f), c.isFunction(d.afterLoad) && d.afterLoad.call(a,
                        e, h), J(a), V(e, h - 1), d.anchors.length && (y = e, Y(q, l, e, h)));
                    clearTimeout(Z);
                    Z = setTimeout(function () {
                        W = !1
                    }, 100)
                }
                d.fitToSection && (clearTimeout(aa), aa = setTimeout(function () {
                    u && d.fitToSection && (c(".fp-section.active").is(a) && requestAnimFrame(function () {
                        v = !0
                    }), z(a), requestAnimFrame(function () {
                        v = !1
                    }))
                }, d.fitToSectionDelay))
            }
        }

        function qa(a) {
            return a.find(".fp-slides").length ? a.find(".fp-slide.active").find(".fp-scrollable") : a.find(".fp-scrollable")
        }

        function K(a, b) {
            if (l.m[a]) {
                var d, c;
                "down" == a ? (d = "bottom", c = e.moveSectionDown) :
                    (d = "top", c = e.moveSectionUp);
                if (0 < b.length) if (d = "top" === d ? !b.scrollTop() : "bottom" === d ? b.scrollTop() + 1 + b.innerHeight() >= b[0].scrollHeight : void 0, d) c(); else return !0; else c()
            }
        }

        function Ta(a) {
            var b = a.originalEvent;
            if (!ra(a.target) && ba(b)) {
                d.autoScrolling && a.preventDefault();
                a = c(".fp-section.active");
                var g = qa(a);
                u && !w && (b = sa(b), E = b.y, L = b.x, a.find(".fp-slides").length && p.abs(M - L) > p.abs(F - E) ? p.abs(M - L) > n.width() / 100 * d.touchSensitivity && (M > L ? l.m.right && e.moveSlideRight() : l.m.left && e.moveSlideLeft()) : d.autoScrolling &&
                    p.abs(F - E) > n.height() / 100 * d.touchSensitivity && (F > E ? K("down", g) : E > F && K("up", g)))
            }
        }

        function ra(a, b) {
            b = b || 0;
            var g = c(a).parent();
            return b < d.normalScrollElementTouchThreshold && g.is(d.normalScrollElements) ? !0 : b == d.normalScrollElementTouchThreshold ? !1 : ra(g, ++b)
        }

        function ba(a) {
            return "undefined" === typeof a.pointerType || "mouse" != a.pointerType
        }

        function Ua(a) {
            a = a.originalEvent;
            d.fitToSection && x.stop();
            ba(a) && (a = sa(a), F = a.y, M = a.x)
        }

        function ta(a, b) {
            for (var d = 0, c = a.slice(p.max(a.length - b, 1)), e = 0; e < c.length; e++) d +=
                c[e];
            return p.ceil(d / b)
        }

        function A(a) {
            var b = (new Date).getTime();
            if (d.autoScrolling && !N) {
                a = a || k.event;
                var g = a.wheelDelta || -a.deltaY || -a.detail, f = p.max(-1, p.min(1, g)),
                    e = "undefined" !== typeof a.wheelDeltaX || "undefined" !== typeof a.deltaX,
                    e = p.abs(a.wheelDeltaX) < p.abs(a.wheelDelta) || p.abs(a.deltaX) < p.abs(a.deltaY) || !e;
                149 < B.length && B.shift();
                B.push(p.abs(g));
                d.scrollBar && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
                a = c(".fp-section.active");
                a = qa(a);
                g = b - ua;
                ua = b;
                200 < g && (B = []);
                u && (b = ta(B, 10), g = ta(B,
                    70), b >= g && e && (0 > f ? K("down", a) : K("up", a)));
                return !1
            }
            d.fitToSection && x.stop()
        }

        function va(a) {
            var b = c(".fp-section.active").find(".fp-slides"), g = b.find(".fp-slide").length;
            if (!(!b.length || w || 2 > g)) {
                var g = b.find(".fp-slide.active"), f = null,
                    f = "prev" === a ? g.prev(".fp-slide") : g.next(".fp-slide");
                if (!f.length) {
                    if (!d.loopHorizontal) return;
                    f = "prev" === a ? g.siblings(":last") : g.siblings(":first")
                }
                w = !0;
                G(b, f)
            }
        }

        function wa() {
            c(".fp-slide.active").each(function () {
                T(c(this), "internal")
            })
        }

        function z(a, b, g) {
            requestAnimFrame(function () {
                var f =
                    a.position();
                if ("undefined" !== typeof f) {
                    var e = a.hasClass("fp-auto-height") ? f.top - q + a.height() : f.top, f = {
                        element: a,
                        callback: b,
                        isMovementUp: g,
                        dest: f,
                        dtop: e,
                        yMovement: X(a),
                        anchorLink: a.data("anchor"),
                        sectionIndex: a.index(".fp-section"),
                        activeSlide: a.find(".fp-slide.active"),
                        activeSection: c(".fp-section.active"),
                        leavingSection: c(".fp-section.active").index(".fp-section") + 1,
                        localIsResizing: v
                    };
                    if (!(f.activeSection.is(a) && !v || d.scrollBar && n.scrollTop() === f.dtop && !a.hasClass("fp-auto-height"))) {
                        if (f.activeSlide.length) var h =
                            f.activeSlide.data("anchor"), k = f.activeSlide.index();
                        d.autoScrolling && d.continuousVertical && "undefined" !== typeof f.isMovementUp && (!f.isMovementUp && "up" == f.yMovement || f.isMovementUp && "down" == f.yMovement) && (f.isMovementUp ? c(".fp-section.active").before(f.activeSection.nextAll(".fp-section")) : c(".fp-section.active").after(f.activeSection.prevAll(".fp-section").get().reverse()), H(c(".fp-section.active").position().top), wa(), f.wrapAroundElements = f.activeSection, f.dest = f.element.position(), f.dtop = f.dest.top,
                            f.yMovement = X(f.element));
                        if (c.isFunction(d.onLeave) && !f.localIsResizing) {
                            if (!1 === d.onLeave.call(f.activeSection, f.leavingSection, f.sectionIndex + 1, f.yMovement)) return;
                            Va(f.activeSection)
                        }
                        a.addClass("active").siblings().removeClass("active");
                        J(a);
                        u = !1;
                        Y(k, h, f.anchorLink, f.sectionIndex);
                        Wa(f);
                        y = f.anchorLink;
                        V(f.anchorLink, f.sectionIndex)
                    }
                }
            })
        }

        function Wa(a) {
            if (d.css3 && d.autoScrolling && !d.scrollBar) xa("translate3d(0px, -" + a.dtop + "px, 0px)", !0), d.scrollingSpeed ? ca = setTimeout(function () {
                    da(a)
                }, d.scrollingSpeed) :
                da(a); else {
                var b = Xa(a);
                c(b.element).animate(b.options, d.scrollingSpeed, d.easing).promise().done(function () {
                    da(a)
                })
            }
        }

        function Xa(a) {
            var b = {};
            d.autoScrolling && !d.scrollBar ? (b.options = {top: -a.dtop}, b.element = ".fullpage-wrapper") : (b.options = {scrollTop: a.dtop}, b.element = "html, body");
            return b
        }

        function da(a) {
            a.wrapAroundElements && a.wrapAroundElements.length && (a.isMovementUp ? c(".fp-section:first").before(a.wrapAroundElements) : c(".fp-section:last").after(a.wrapAroundElements), H(c(".fp-section.active").position().top),
                wa());
            a.element.find(".fp-scrollable").mouseover();
            c.isFunction(d.afterLoad) && !a.localIsResizing && d.afterLoad.call(a.element, a.anchorLink, a.sectionIndex + 1);
            oa(a.element);
            u = !0;
            c.isFunction(a.callback) && a.callback.call(this)
        }

        function J(a) {
            var b = a.find(".fp-slide.active");
            b.length && (a = c(b));
            a.find("img[data-src], source[data-src], audio[data-src]").each(function () {
                c(this).attr("src", c(this).data("src"));
                c(this).removeAttr("data-src");
                c(this).is("source") && c(this).closest("video").get(0).load()
            })
        }

        function oa(a) {
            a.find("video, audio").each(function () {
                var a =
                    c(this).get(0);
                a.hasAttribute("autoplay") && "function" === typeof a.play && a.play()
            })
        }

        function Va(a) {
            a.find("video, audio").each(function () {
                var a = c(this).get(0);
                a.hasAttribute("data-ignore") || "function" !== typeof a.pause || a.pause()
            })
        }

        function ya() {
            if (!W && !d.lockAnchors) {
                var a = k.location.hash.replace("#", "").split("/"), b = a[0], a = a[1], c = "undefined" === typeof y,
                    f = "undefined" === typeof y && "undefined" === typeof a && !w;
                b.length && (b && b !== y && !c || f || !w && ea != a) && U(b, a)
            }
        }

        function Ya(a) {
            u && (a.pageY < O ? e.moveSectionUp() :
                a.pageY > O && e.moveSectionDown());
            O = a.pageY
        }

        function G(a, b) {
            var g = b.position(), f = b.index(), e = a.closest(".fp-section"), h = e.index(".fp-section"),
                k = e.data("anchor"), l = e.find(".fp-slidesNav"), m = fa(b), n = v;
            if (d.onSlideLeave) {
                var q = e.find(".fp-slide.active"), r = q.index(), t;
                t = r == f ? "none" : r > f ? "left" : "right";
                if (!n && "none" !== t && c.isFunction(d.onSlideLeave) && !1 === d.onSlideLeave.call(q, k, h + 1, r, t, f)) {
                    w = !1;
                    return
                }
            }
            b.addClass("active").siblings().removeClass("active");
            n || J(b);
            !d.loopHorizontal && d.controlArrows && (e.find(".fp-controlArrow.fp-prev").toggle(0 !==
                f), e.find(".fp-controlArrow.fp-next").toggle(!b.is(":last-child")));
            e.hasClass("active") && Y(f, m, k, h);
            var u = function () {
                n || c.isFunction(d.afterSlideLoad) && d.afterSlideLoad.call(b, k, h + 1, m, f);
                w = !1
            };
            d.css3 ? (g = "translate3d(-" + p.round(g.left) + "px, 0px, 0px)", za(a.find(".fp-slidesContainer"), 0 < d.scrollingSpeed).css(Aa(g)), ga = setTimeout(function () {
                u()
            }, d.scrollingSpeed, d.easing)) : a.animate({scrollLeft: p.round(g.left)}, d.scrollingSpeed, d.easing, function () {
                u()
            });
            l.find(".active").removeClass("active");
            l.find("li").eq(f).find("a").addClass("active")
        }

        function Ba() {
            ja();
            if (P) {
                var a = c(m.activeElement);
                a.is("textarea") || a.is("input") || a.is("select") || (a = n.height(), p.abs(a - ha) > 20 * p.max(ha, a) / 100 && (e.reBuild(!0), ha = a))
            } else clearTimeout(ia), ia = setTimeout(function () {
                e.reBuild(!0)
            }, 350)
        }

        function ja() {
            var a = d.responsive || d.responsiveWidth, b = d.responsiveHeight, c = a && n.width() < a,
                f = b && n.height() < b;
            a && b ? e.setResponsive(c || f) : a ? e.setResponsive(c) : b && e.setResponsive(f)
        }

        function za(a) {
            var b = "all " + d.scrollingSpeed + "ms " + d.easingcss3;
            a.removeClass("fp-notransition");
            return a.css({"-webkit-transition": b, transition: b})
        }

        function Za(a, b) {
            if (825 > a || 900 > b) {
                var c = p.min(100 * a / 825, 100 * b / 900).toFixed(2);
                r.css("font-size", c + "%")
            } else r.css("font-size", "100%")
        }

        function V(a, b) {
            d.menu && (c(d.menu).find(".active").removeClass("active"), c(d.menu).find('[data-menuanchor="' + a + '"]').addClass("active"));
            d.navigation && (c("#fp-nav").find(".active").removeClass("active"), a ? c("#fp-nav").find('a[href="#' + a + '"]').addClass("active") : c("#fp-nav").find("li").eq(b).find("a").addClass("active"))
        }

        function X(a) {
            var b = c(".fp-section.active").index(".fp-section");
            a = a.index(".fp-section");
            return b == a ? "none" : b > a ? "up" : "down"
        }

        function I(a) {
            a.css("overflow", "hidden");
            var b = a.closest(".fp-section"), c = a.find(".fp-scrollable"), f;
            c.length ? f = c.get(0).scrollHeight : (f = a.get(0).scrollHeight, d.verticalCentered && (f = a.find(".fp-tableCell").get(0).scrollHeight));
            b = q - parseInt(b.css("padding-bottom")) - parseInt(b.css("padding-top"));
            f > b ? c.length ? c.css("height", b + "px").parent().css("height", b + "px") : (d.verticalCentered ?
                a.find(".fp-tableCell").wrapInner('<div class="fp-scrollable" />') : a.wrapInner('<div class="fp-scrollable" />'), a.find(".fp-scrollable").slimScroll({
                allowPageScroll: !0,
                height: b + "px",
                size: "10px",
                alwaysVisible: !0
            })) : Ca(a);
            a.css("overflow", "")
        }

        function Ca(a) {
            a.find(".fp-scrollable").children().first().unwrap().unwrap();
            a.find(".slimScrollBar").remove();
            a.find(".slimScrollRail").remove()
        }

        function la(a) {
            a.addClass("fp-table").wrapInner('<div class="fp-tableCell" style="height:' + Da(a) + 'px;" />')
        }

        function Da(a) {
            var b =
                q;
            if (d.paddingTop || d.paddingBottom) b = a, b.hasClass("fp-section") || (b = a.closest(".fp-section")), a = parseInt(b.css("padding-top")) + parseInt(b.css("padding-bottom")), b = q - a;
            return b
        }

        function xa(a, b) {
            b ? za(h) : h.addClass("fp-notransition");
            h.css(Aa(a));
            setTimeout(function () {
                h.removeClass("fp-notransition")
            }, 10)
        }

        function Ea(a) {
            var b = c('.fp-section[data-anchor="' + a + '"]');
            b.length || (b = c(".fp-section").eq(a - 1));
            return b
        }

        function U(a, b) {
            var c = Ea(a);
            "undefined" === typeof b && (b = 0);
            a === y || c.hasClass("active") ? Fa(c,
                b) : z(c, function () {
                Fa(c, b)
            })
        }

        function Fa(a, b) {
            if ("undefined" !== typeof b) {
                var c = a.find(".fp-slides"), d;
                d = a.find(".fp-slides");
                var e = d.find('.fp-slide[data-anchor="' + b + '"]');
                e.length || (e = d.find(".fp-slide").eq(b));
                d = e;
                d.length && G(c, d)
            }
        }

        function Sa(a, b) {
            a.append('<div class="fp-slidesNav"><ul></ul></div>');
            var c = a.find(".fp-slidesNav");
            c.addClass(d.slidesNavPosition);
            for (var f = 0; f < b; f++) c.find("ul").append('<li><a href="#"><span></span></a></li>');
            c.css("margin-left", "-" + c.width() / 2 + "px");
            c.find("li").first().find("a").addClass("active")
        }

        function Y(a, b, c, f) {
            f = "";
            d.anchors.length && !d.lockAnchors && (a ? ("undefined" !== typeof c && (f = c), "undefined" === typeof b && (b = a), ea = b, Ga(f + "/" + b)) : ("undefined" !== typeof a && (ea = b), Ga(c)));
            ka()
        }

        function Ga(a) {
            if (d.recordHistory) location.hash = a; else if (P || Q) history.replaceState(D, D, "#" + a); else {
                var b = k.location.href.split("#")[0];
                k.location.replace(b + "#" + a)
            }
        }

        function fa(a) {
            var b = a.data("anchor");
            a = a.index();
            "undefined" === typeof b && (b = a);
            return b
        }

        function ka() {
            var a = c(".fp-section.active"), b = a.find(".fp-slide.active"),
                d = fa(a), f = fa(b);
            a.index(".fp-section");
            a = String(d);
            b.length && (a = a + "-" + f);
            a = a.replace("/", "-").replace("#", "");
            r[0].className = r[0].className.replace(RegExp("\\b\\s?fp-viewing-[^\\s]+\\b", "g"), "");
            r.addClass("fp-viewing-" + a)
        }

        function Ma() {
            var a = m.createElement("p"), b, c = {
                webkitTransform: "-webkit-transform",
                OTransform: "-o-transform",
                msTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                transform: "transform"
            };
            m.body.insertBefore(a, null);
            for (var d in c) a.style[d] !== D && (a.style[d] = "translate3d(1px,1px,1px)",
                b = k.getComputedStyle(a).getPropertyValue(c[d]));
            m.body.removeChild(a);
            return b !== D && 0 < b.length && "none" !== b
        }

        function $a() {
            if (P || Q) {
                var a = Ha();
                c(".fullpage-wrapper").off("touchstart " + a.down).on("touchstart " + a.down, Ua);
                c(".fullpage-wrapper").off("touchmove " + a.move).on("touchmove " + a.move, Ta)
            }
        }

        function ab() {
            if (P || Q) {
                var a = Ha();
                c(".fullpage-wrapper").off("touchstart " + a.down);
                c(".fullpage-wrapper").off("touchmove " + a.move)
            }
        }

        function Ha() {
            return k.PointerEvent ? {down: "pointerdown", move: "pointermove"} :
                {down: "MSPointerDown", move: "MSPointerMove"}
        }

        function sa(a) {
            var b = [];
            b.y = "undefined" !== typeof a.pageY && (a.pageY || a.pageX) ? a.pageY : a.touches[0].pageY;
            b.x = "undefined" !== typeof a.pageX && (a.pageY || a.pageX) ? a.pageX : a.touches[0].pageX;
            Q && ba(a) && d.scrollBar && (b.y = a.touches[0].pageY, b.x = a.touches[0].pageX);
            return b
        }

        function T(a, b) {
            e.setScrollingSpeed(0, "internal");
            "undefined" !== typeof b && (v = !0);
            G(a.closest(".fp-slides"), a);
            "undefined" !== typeof b && (v = !1);
            e.setScrollingSpeed(C.scrollingSpeed, "internal")
        }

        function H(a) {
            d.scrollBar ?
                h.scrollTop(a) : d.css3 ? xa("translate3d(0px, -" + a + "px, 0px)", !1) : h.css("top", -a)
        }

        function Aa(a) {
            return {"-webkit-transform": a, "-moz-transform": a, "-ms-transform": a, transform: a}
        }

        function Ia(a, b, c) {
            switch (b) {
                case "up":
                    l[c].up = a;
                    break;
                case "down":
                    l[c].down = a;
                    break;
                case "left":
                    l[c].left = a;
                    break;
                case "right":
                    l[c].right = a;
                    break;
                case "all":
                    "m" == c ? e.setAllowScrolling(a) : e.setKeyboardScrolling(a)
            }
        }

        function bb() {
            H(0);
            c("#fp-nav, .fp-slidesNav, .fp-controlArrow").remove();
            c(".fp-section").css({
                height: "", "background-color": "",
                padding: ""
            });
            c(".fp-slide").css({width: ""});
            h.css({height: "", position: "", "-ms-touch-action": "", "touch-action": ""});
            x.css({overflow: "", height: ""});
            c("html").removeClass("fp-enabled");
            c.each(r.get(0).className.split(/\s+/), function (a, b) {
                0 === b.indexOf("fp-viewing") && r.removeClass(b)
            });
            c(".fp-section, .fp-slide").each(function () {
                Ca(c(this));
                c(this).removeClass("fp-table active")
            });
            h.addClass("fp-notransition");
            h.find(".fp-tableCell, .fp-slidesContainer, .fp-slides").each(function () {
                c(this).replaceWith(this.childNodes)
            });
            x.scrollTop(0)
        }

        function R(a, b, c) {
            d[a] = b;
            "internal" !== c && (C[a] = b)
        }

        function S(a, b) {
            console && console[a] && console[a]("fullPage: " + b)
        }

        var x = c("html, body"), r = c("body"), e = c.fn.fullpage;
        d = c.extend({
            menu: !1,
            anchors: [],
            lockAnchors: !1,
            navigation: !1,
            navigationPosition: "right",
            navigationTooltips: [],
            showActiveTooltip: !1,
            slidesNavigation: !1,
            slidesNavPosition: "bottom",
            scrollBar: !1,
            css3: !0,
            scrollingSpeed: 700,
            autoScrolling: !0,
            fitToSection: !0,
            fitToSectionDelay: 1E3,
            easing: "easeInOutCubic",
            easingcss3: "ease",
            loopBottom: !1,
            loopTop: !1,
            loopHorizontal: !0,
            continuousVertical: !1,
            normalScrollElements: null,
            scrollOverflow: !1,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            keyboardScrolling: !0,
            animateAnchor: !0,
            recordHistory: !0,
            controlArrows: !0,
            controlArrowColor: "#fff",
            verticalCentered: !0,
            resize: !1,
            sectionsColor: [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0,
            responsiveWidth: 0,
            responsiveHeight: 0,
            sectionSelector: ".section",
            slideSelector: ".slide",
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null
        }, d);
        (function () {
            d.continuousVertical && (d.loopTop || d.loopBottom) && (d.continuousVertical = !1, S("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));
            d.scrollBar && d.scrollOverflow && S("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox");
            d.continuousVertical && d.scrollBar && (d.continuousVertical = !1, S("warn",
                "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));
            c.each(d.anchors, function (a, b) {
                (c("#" + b).length || c('[name="' + b + '"]').length) && S("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")
            })
        })();
        c.extend(c.easing, {
            easeInOutCubic: function (a, b, c, d, e) {
                return 1 > (b /= e / 2) ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
            }
        });
        c.extend(c.easing, {
            easeInQuart: function (a, b, c, d, e) {
                return d * (b /= e) * b * b * b + c
            }
        });
        e.setAutoScrolling =
            function (a, b) {
                R("autoScrolling", a, b);
                var g = c(".fp-section.active");
                d.autoScrolling && !d.scrollBar ? (x.css({
                    overflow: "hidden",
                    height: "100%"
                }), e.setRecordHistory(C.recordHistory, "internal"), h.css({
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                }), g.length && H(g.position().top)) : (x.css({
                    overflow: "visible",
                    height: "initial"
                }), e.setRecordHistory(!1, "internal"), h.css({
                    "-ms-touch-action": "",
                    "touch-action": ""
                }), H(0), g.length && x.scrollTop(g.position().top))
            };
        e.setRecordHistory = function (a, b) {
            R("recordHistory",
                a, b)
        };
        e.setScrollingSpeed = function (a, b) {
            R("scrollingSpeed", a, b)
        };
        e.setFitToSection = function (a, b) {
            R("fitToSection", a, b)
        };
        e.setLockAnchors = function (a) {
            d.lockAnchors = a
        };
        e.setMouseWheelScrolling = function (a) {
            if (a) {
                a = "";
                var b;
                k.addEventListener ? b = "addEventListener" : (b = "attachEvent", a = "on");
                var c = "onwheel" in m.createElement("div") ? "wheel" : m.onmousewheel !== D ? "mousewheel" : "DOMMouseScroll";
                if ("DOMMouseScroll" == c) m[b](a + "MozMousePixelScroll", A, !1); else m[b](a + c, A, !1)
            } else m.addEventListener ? (m.removeEventListener("mousewheel",
                A, !1), m.removeEventListener("wheel", A, !1), m.removeEventListener("MozMousePixelScroll", A, !1)) : m.detachEvent("onmousewheel", A)
        };
        e.setAllowScrolling = function (a, b) {
            "undefined" !== typeof b ? (b = b.replace(/ /g, "").split(","), c.each(b, function (b, c) {
                Ia(a, c, "m")
            })) : a ? (e.setMouseWheelScrolling(!0), $a()) : (e.setMouseWheelScrolling(!1), ab())
        };
        e.setKeyboardScrolling = function (a, b) {
            "undefined" !== typeof b ? (b = b.replace(/ /g, "").split(","), c.each(b, function (b, c) {
                Ia(a, c, "k")
            })) : d.keyboardScrolling = a
        };
        e.moveSectionUp = function () {
            var a =
                c(".fp-section.active").prev(".fp-section");
            a.length || !d.loopTop && !d.continuousVertical || (a = c(".fp-section").last());
            a.length && z(a, null, !0)
        };
        e.moveSectionDown = function () {
            var a = c(".fp-section.active").next(".fp-section");
            a.length || !d.loopBottom && !d.continuousVertical || (a = c(".fp-section").first());
            a.length && z(a, null, !1)
        };
        e.silentMoveTo = function (a, b) {
            requestAnimFrame(function () {
                e.setScrollingSpeed(0, "internal")
            });
            e.moveTo(a, b);
            requestAnimFrame(function () {
                e.setScrollingSpeed(C.scrollingSpeed, "internal")
            })
        };
        e.moveTo = function (a, b) {
            var c = Ea(a);
            "undefined" !== typeof b ? U(a, b) : 0 < c.length && z(c)
        };
        e.moveSlideRight = function () {
            va("next")
        };
        e.moveSlideLeft = function () {
            va("prev")
        };
        e.reBuild = function (a) {
            if (!h.hasClass("fp-destroyed")) {
                requestAnimFrame(function () {
                    v = !0
                });
                var b = n.width();
                q = n.height();
                d.resize && Za(q, b);
                c(".fp-section").each(function () {
                    var a = c(this).find(".fp-slides"), b = c(this).find(".fp-slide");
                    d.verticalCentered && c(this).find(".fp-tableCell").css("height", Da(c(this)) + "px");
                    c(this).css("height", q + "px");
                    d.scrollOverflow && (b.length ? b.each(function () {
                        I(c(this))
                    }) : I(c(this)));
                    1 < b.length && G(a, a.find(".fp-slide.active"))
                });
                (b = c(".fp-section.active").index(".fp-section")) && e.silentMoveTo(b + 1);
                requestAnimFrame(function () {
                    v = !1
                });
                c.isFunction(d.afterResize) && a && d.afterResize.call(h);
                c.isFunction(d.afterReBuild) && !a && d.afterReBuild.call(h)
            }
        };
        e.setResponsive = function (a) {
            var b = h.hasClass("fp-responsive");
            a ? b || (e.setAutoScrolling(!1, "internal"), e.setFitToSection(!1, "internal"), c("#fp-nav").hide(), h.addClass("fp-responsive")) :
                b && (e.setAutoScrolling(C.autoScrolling, "internal"), e.setFitToSection(C.autoScrolling, "internal"), c("#fp-nav").show(), h.removeClass("fp-responsive"))
        };
        var w = !1,
            P = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            Q = "ontouchstart" in k || 0 < navigator.msMaxTouchPoints || navigator.maxTouchPoints, h = c(this),
            q = n.height(), v = !1, Ja = !0, y, ea, u = !0, B = [], N, l = {m: {up: !0, down: !0, left: !0, right: !0}};
        l.k = c.extend(!0, {}, l.m);
        var C = c.extend(!0,
            {}, d), ia, ca, ga, Z, aa, Ka;
        c(this).length && La();
        var W = !1;
        n.on("scroll", pa);
        var F = 0, M = 0, E = 0, L = 0, ua = (new Date).getTime();
        k.requestAnimFrame = function () {
            return k.requestAnimationFrame || k.webkitRequestAnimationFrame || k.mozRequestAnimationFrame || k.oRequestAnimationFrame || k.msRequestAnimationFrame || function (a) {
                a()
            }
        }();
        n.on("hashchange", ya);
        t.keydown(function (a) {
            clearTimeout(Ka);
            var b = c(":focus");
            b.is("textarea") || b.is("input") || b.is("select") || !d.keyboardScrolling || !d.autoScrolling || (-1 < c.inArray(a.which, [40,
                38, 32, 33, 34]) && a.preventDefault(), N = a.ctrlKey, Ka = setTimeout(function () {
                var b = a.shiftKey;
                switch (a.which) {
                    case 38:
                    case 33:
                        l.k.up && e.moveSectionUp();
                        break;
                    case 32:
                        if (b && l.k.up) {
                            e.moveSectionUp();
                            break
                        }
                    case 40:
                    case 34:
                        l.k.down && e.moveSectionDown();
                        break;
                    case 36:
                        l.k.up && e.moveTo(1);
                        break;
                    case 35:
                        l.k.down && e.moveTo(c(".fp-section").length);
                        break;
                    case 37:
                        l.k.left && e.moveSlideLeft();
                        break;
                    case 39:
                        l.k.right && e.moveSlideRight()
                }
            }, 150))
        });
        t.keyup(function (a) {
            Ja && (N = a.ctrlKey)
        });
        c(k).blur(function () {
            N = Ja = !1
        });
        h.mousedown(function (a) {
            2 == a.which && (O = a.pageY, h.on("mousemove", Ya))
        });
        h.mouseup(function (a) {
            2 == a.which && h.off("mousemove")
        });
        var O = 0;
        t.on("click touchstart", "#fp-nav a", function (a) {
            a.preventDefault();
            a = c(this).parent().index();
            z(c(".fp-section").eq(a))
        });
        t.on("click touchstart", ".fp-slidesNav a", function (a) {
            a.preventDefault();
            a = c(this).closest(".fp-section").find(".fp-slides");
            var b = a.find(".fp-slide").eq(c(this).closest("li").index());
            G(a, b)
        });
        d.normalScrollElements && (t.on("mouseenter", d.normalScrollElements,
            function () {
                e.setMouseWheelScrolling(!1)
            }), t.on("mouseleave", d.normalScrollElements, function () {
            e.setMouseWheelScrolling(!0)
        }));
        c(".fp-section").on("click touchstart", ".fp-controlArrow", function () {
            c(this).hasClass("fp-prev") ? l.m.left && e.moveSlideLeft() : l.m.right && e.moveSlideRight()
        });
        n.resize(Ba);
        var ha = q;
        e.destroy = function (a) {
            e.setAutoScrolling(!1, "internal");
            e.setAllowScrolling(!1);
            e.setKeyboardScrolling(!1);
            h.addClass("fp-destroyed");
            clearTimeout(ga);
            clearTimeout(ca);
            clearTimeout(ia);
            clearTimeout(Z);
            clearTimeout(aa);
            n.off("scroll", pa).off("hashchange", ya).off("resize", Ba);
            t.off("click", "#fp-nav a").off("mouseenter", "#fp-nav li").off("mouseleave", "#fp-nav li").off("click", ".fp-slidesNav a").off("mouseover", d.normalScrollElements).off("mouseout", d.normalScrollElements);
            c(".fp-section").off("click", ".fp-controlArrow");
            clearTimeout(ga);
            clearTimeout(ca);
            a && bb()
        }
    }
});


/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */
!function (t, i, n, s) {
    var e = function (s, e) {
        this.elem = s, this.$elem = t(s), this.options = e, this.metadata = this.$elem.data("plugin-options"), this.$win = t(i), this.sections = {}, this.didScroll = !1, this.$doc = t(n), this.docHeight = this.$doc.height()
    };
    e.prototype = {
        defaults: {
            navItems: "a",
            currentClass: "current",
            changeHash: !1,
            easing: "swing",
            filter: "",
            scrollSpeed: 750,
            scrollThreshold: .5,
            begin: !1,
            end: !1,
            scrollChange: !1
        }, init: function () {
            return this.config = t.extend({}, this.defaults, this.options, this.metadata), this.$nav = this.$elem.find(this.config.navItems), "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)), this.$nav.on("click.onePageNav", t.proxy(this.handleClick, this)), this.getPositions(), this.bindInterval(), this.$win.on("resize.onePageNav", t.proxy(this.getPositions, this)), this
        }, adjustNav: function (t, i) {
            t.$elem.find("." + t.config.currentClass).removeClass(t.config.currentClass), i.addClass(t.config.currentClass)
        }, bindInterval: function () {
            var t, i = this;
            i.$win.on("scroll.onePageNav", function () {
                i.didScroll = !0
            }), i.t = setInterval(function () {
                t = i.$doc.height(), i.didScroll && (i.didScroll = !1, i.scrollChange()), t !== i.docHeight && (i.docHeight = t, i.getPositions())
            }, 250)
        }, getHash: function (t) {
            return t.attr("href").split("#")[1]
        }, getPositions: function () {
            var i, n, s, e = this;
            e.$nav.each(function () {
                i = e.getHash(t(this)), s = t("#" + i), s.length && (n = s.offset().top, e.sections[i] = Math.round(n))
            })
        }, getSection: function (t) {
            var i = null, n = Math.round(this.$win.height() * this.config.scrollThreshold);
            for (var s in this.sections) this.sections[s] - n < t && (i = s);
            return i
        }, handleClick: function (n) {
            var s = this, e = t(n.currentTarget), o = e.parent(), a = "#" + s.getHash(e);
            o.hasClass(s.config.currentClass) || (s.config.begin && s.config.begin(), s.adjustNav(s, o), s.unbindInterval(), s.scrollTo(a, function () {
                s.config.changeHash && (i.location.hash = a), s.bindInterval(), s.config.end && s.config.end()
            })), n.preventDefault()
        }, scrollChange: function () {
            var t, i = this.$win.scrollTop(), n = this.getSection(i);
            null !== n && (t = this.$elem.find('a[href$="#' + n + '"]').parent(), t.hasClass(this.config.currentClass) || (this.adjustNav(this, t), this.config.scrollChange && this.config.scrollChange(t)))
        }, scrollTo: function (i, n) {
            var s = t(i).offset().top;
            t("html, body").animate({scrollTop: s - this.config.scrollOffset}, this.config.scrollSpeed, this.config.easing, n)
        }, unbindInterval: function () {
            clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
        }
    }, e.defaults = e.prototype.defaults, t.fn.onePageNav = function (t) {
        return this.each(function () {
            new e(this, t).init()
        })
    }
}(jQuery, window, document);


/*====================================
    Smooth Scroll
======================================*/

/*!
 * Smooth Scroll - v1.4.13 - 2013-11-02
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT)
 */
(function (t) {
    function e(t) {
        return t.replace(/(:|\.)/g, "\\$1")
    }

    var l = "1.4.13", o = {}, s = {
        exclude: [],
        excludeWithin: [],
        offset: 0,
        direction: "top",
        scrollElement: null,
        scrollTarget: null,
        beforeScroll: function () {
        },
        afterScroll: function () {
        },
        easing: "swing",
        speed: 400,
        autoCoefficent: 2,
        preventDefault: !0
    }, n = function (e) {
        var l = [], o = !1, s = e.dir && "left" == e.dir ? "scrollLeft" : "scrollTop";
        return this.each(function () {
            if (this != document && this != window) {
                var e = t(this);
                e[s]() > 0 ? l.push(this) : (e[s](1), o = e[s]() > 0, o && l.push(this), e[s](0))
            }
        }), l.length || this.each(function () {
            "BODY" === this.nodeName && (l = [this])
        }), "first" === e.el && l.length > 1 && (l = [l[0]]), l
    };
    t.fn.extend({
        scrollable: function (t) {
            var e = n.call(this, {dir: t});
            return this.pushStack(e)
        }, firstScrollable: function (t) {
            var e = n.call(this, {el: "first", dir: t});
            return this.pushStack(e)
        }, smoothScroll: function (l, o) {
            if (l = l || {}, "options" === l) return o ? this.each(function () {
                var e = t(this), l = t.extend(e.data("ssOpts") || {}, o);
                t(this).data("ssOpts", l)
            }) : this.first().data("ssOpts");
            var s = t.extend({}, t.fn.smoothScroll.defaults, l), n = t.smoothScroll.filterPath(location.pathname);
            return this.unbind("click.smoothscroll").bind("click.smoothscroll", function (l) {
                var o = this, r = t(this), i = t.extend({}, s, r.data("ssOpts") || {}), c = s.exclude,
                    a = i.excludeWithin, f = 0, h = 0, u = !0, d = {},
                    p = location.hostname === o.hostname || !o.hostname,
                    m = i.scrollTarget || (t.smoothScroll.filterPath(o.pathname) || n) === n, S = e(o.hash);
                if (i.scrollTarget || p && m && S) {
                    for (; u && c.length > f;) r.is(e(c[f++])) && (u = !1);
                    for (; u && a.length > h;) r.closest(a[h++]).length && (u = !1)
                } else u = !1;
                u && (i.preventDefault && l.preventDefault(), t.extend(d, i, {
                    scrollTarget: i.scrollTarget || S,
                    link: o
                }), t.smoothScroll(d))
            }), this
        }
    }), t.smoothScroll = function (e, l) {
        if ("options" === e && "object" == typeof l) return t.extend(o, l);
        var s, n, r, i, c = 0, a = "offset", f = "scrollTop", h = {}, u = {};
        "number" == typeof e ? (s = t.extend({link: null}, t.fn.smoothScroll.defaults, o), r = e) : (s = t.extend({link: null}, t.fn.smoothScroll.defaults, e || {}, o), s.scrollElement && (a = "position", "static" == s.scrollElement.css("position") && s.scrollElement.css("position", "relative"))), f = "left" == s.direction ? "scrollLeft" : f, s.scrollElement ? (n = s.scrollElement, /^(?:HTML|BODY)$/.test(n[0].nodeName) || (c = n[f]())) : n = t("html, body").firstScrollable(s.direction), s.beforeScroll.call(n, s), r = "number" == typeof e ? e : l || t(s.scrollTarget)[a]() && t(s.scrollTarget)[a]()[s.direction] || 0, h[f] = r + c + s.offset, i = s.speed, "auto" === i && (i = h[f] || n.scrollTop(), i /= s.autoCoefficent), u = {
            duration: i,
            easing: s.easing,
            complete: function () {
                s.afterScroll.call(s.link, s)
            }
        }, s.step && (u.step = s.step), n.length ? n.stop().animate(h, u) : s.afterScroll.call(s.link, s)
    }, t.smoothScroll.version = l, t.smoothScroll.filterPath = function (t) {
        return t.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
    }, t.fn.smoothScroll.defaults = s
})(jQuery);


/*====================================*/

/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function () {
    function e() {
    }

    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, n = i[e] = i[e] || [];
            return n.indexOf(t) == -1 && n.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {}, n = i[e] = i[e] || {};
            return n[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return n != -1 && i.splice(n, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0), t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var r = i[o], s = n && n[r];
                s && (this.off(e, r), delete n[r]), r.apply(this, t)
            }
            return this
        }
    }, t.allOff = function () {
        delete this._events, delete this._onceEvents
    }, e
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e) {
        if (Array.isArray(e)) return e;
        var t = "object" == typeof e && "number" == typeof e.length;
        return t ? d.call(e) : [e]
    }

    function o(e, t, r) {
        if (!(this instanceof o)) return new o(e, t, r);
        var s = e;
        return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }

    var h = e.jQuery, a = e.console, d = Array.prototype.slice;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var u = {1: !0, 9: !0, 11: !0};
    return o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
            var o = n && n[2];
            o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
        }
    }, o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t)
    }, o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i)
    }, o.prototype.check = function () {
        function e(e, i, n) {
            setTimeout(function () {
                t.progress(e, i, n)
            })
        }

        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function (e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
    }, o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth
    }, r.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, o.makeJQueryPlugin = function (t) {
        t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) {
            var i = new o(this, e, t);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});

/*====================================*/

/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

!function (t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, o) {
            var n, s = "$()." + i + '("' + e + '")';
            return t.each(function (t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, o);
                n = void 0 === n ? l : n
            }), void 0 !== n ? n : t
        }

        function h(t, e) {
            t.each(function (t, o) {
                var n = a.data(o, i);
                n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n))
            })
        }

        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function (t) {
            if ("string" == typeof t) {
                var e = n.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t), this
        }, o(a))
    }

    function o(t) {
        !t || t && t.bridget || (t.bridget = i)
    }

    var n = Array.prototype.slice, s = t.console, r = "undefined" == typeof s ? function () {
    } : function (t) {
        s.error(t)
    };
    return o(e || t.jQuery), i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {
    }

    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}, o = i[t] = i[t] || {};
            return o[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = i.indexOf(e);
            return o != -1 && i.splice(o, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
                var s = i[n], r = o && o[s];
                r && (this.off(t, s), delete o[s]), s.apply(this, e)
            }
            return this
        }
    }, e.allOff = function () {
        delete this._events, delete this._onceEvents
    }, t
}), function (t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
    "use strict";

    function t(t) {
        var e = parseFloat(t), i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {
    }

    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; e < h; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }

    function o(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e
    }

    function n() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var n = o(e);
            r = 200 == Math.round(t(n.width)), s.isBoxSizeOuter = r, i.removeChild(e)
        }
    }

    function s(e) {
        if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = o(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                var f = u[l], c = s[f], m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight, y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth, z = a.borderTopWidth + a.borderBottomWidth, I = d && r,
                x = t(s.width);
            x !== !1 && (a.width = x + (I ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (I ? 0 : y + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + z), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }

    var r, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        },
        u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = u.length, d = !1;
    return s
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
    "use strict";
    var t = function () {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var o = e[i], n = o + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function (e, i) {
        return e[t](i)
    }
}), function (t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
    var i = {};
    i.extend = function (t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function (t, e) {
        return (t % e + e) % e
    };
    var o = Array.prototype.slice;
    i.makeArray = function (t) {
        if (Array.isArray(t)) return t;
        if (null === t || void 0 === t) return [];
        var e = "object" == typeof t && "number" == typeof t.length;
        return e ? o.call(t) : [t]
    }, i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function (t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function (t) {
            if (t instanceof HTMLElement) {
                if (!o) return void n.push(t);
                e(t, o) && n.push(t);
                for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var o = t.prototype[e], n = e + "Timeout";
        t.prototype[e] = function () {
            var t = this[n];
            clearTimeout(t);
            var e = arguments, s = this;
            this[n] = setTimeout(function () {
                o.apply(s, e), delete s[n]
            }, i)
        }
    }, i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function (t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function (e, o) {
        i.docReady(function () {
            var s = i.toDashed(o), r = "data-" + s, a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s), h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options", l = t.jQuery;
            h.forEach(function (t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void (n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var u = new e(t, i);
                l && l.data(t, o, u)
            })
        })
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function (t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function o(t, e) {
        t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
    }

    function n(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }

    var s = document.documentElement.style, r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[r], h = {
            transform: a,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        }, d = o.prototype = Object.create(t.prototype);
    d.constructor = o, d._create = function () {
        this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
    }, d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function () {
        this.size = e(this.element)
    }, d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
            var o = h[i] || i;
            e[o] = t[i]
        }
    }, d.getPosition = function () {
        var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"), o = t[e ? "left" : "right"], n = t[i ? "top" : "bottom"],
            s = parseFloat(o), r = parseFloat(n), a = this.layout.size;
        o.indexOf("%") != -1 && (s = s / 100 * a.width), n.indexOf("%") != -1 && (r = r / 100 * a.height), s = isNaN(s) ? 0 : s, r = isNaN(r) ? 0 : r, s -= e ? a.paddingLeft : a.paddingRight, r -= i ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = r
    }, d.layoutPosition = function () {
        var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"), n = i ? "paddingLeft" : "paddingRight", s = i ? "left" : "right",
            r = i ? "right" : "left", a = this.position.x + t[n];
        e[s] = this.getXValue(a), e[r] = "";
        var u = o ? "paddingTop" : "paddingBottom", h = o ? "top" : "bottom", d = o ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x, o = this.position.y, n = t == this.position.x && e == this.position.y;
        if (this.setPosition(t, e), n && !this.isTransitioning) return void this.layoutPosition();
        var s = t - i, r = e - o, a = {};
        a.transform = this.getTranslate(s, r), this.transition({
            to: a,
            onTransitionEnd: {transform: this.layoutPosition},
            isCleaning: !0
        })
    }, d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"), o = this.layout._getOption("originTop");
        return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
        this.position.x = parseFloat(t), this.position.y = parseFloat(e)
    }, d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + n(a);
    d.enableTransition = function () {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(u, this, !1)
        }
    }, d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function (t) {
        this.ontransitionend(t)
    };
    var f = {"-webkit-transform": "transform"};
    d.ontransitionend = function (t) {
        if (t.target === this.element) {
            var e = this._transn, o = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                var n = e.onEnd[o];
                n.call(this), delete e.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var c = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
    return d.removeTransitionStyles = function () {
        this.css(c)
    }, d.stagger = function (t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
    }, d.remove = function () {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function () {
        delete this.isHidden, this.css({display: ""});
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function () {
        this.isHidden = !0, this.css({display: ""});
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function () {
        this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
    }, d.destroy = function () {
        this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
    }, o
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, o, n, s) {
        return e(t, i, o, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function (t, e, i, o, n) {
    "use strict";

    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i) return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
        var n = ++l;
        this.element.outlayerGUID = n, f[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() {
            t.apply(this, arguments)
        }

        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], o = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var n = m[o] || 1;
        return i * n
    }

    var u = t.console, h = t.jQuery, d = function () {
    }, l = 0, f = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = {
        containerStyle: {position: "relative"},
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
        visibleStyle: {opacity: 1, transform: "scale(1)"}
    };
    var c = s.prototype;
    o.extend(c, e.prototype), c.option = function (t) {
        o.extend(this.options, t)
    }, c._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, c.reloadItems = function () {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function (t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = e[n], r = new i(s, this);
            o.push(r)
        }
        return o
    }, c._filterFindItemElements = function (t) {
        return o.filterFindElements(t, this.options.itemSelector)
    }, c.getItemElements = function () {
        return this.items.map(function (t) {
            return t.element
        })
    }, c.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function () {
        this.getSize()
    }, c.getSize = function () {
        this.size = i(this.element)
    }, c._getMeasurement = function (t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
    }, c.layoutItems = function (t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, c._getItemsForLayout = function (t) {
        return t.filter(function (t) {
            return !t.isIgnored
        })
    }, c._layoutItems = function (t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function (t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function () {
        return {x: 0, y: 0}
    }, c._processLayoutQueue = function (t) {
        this.updateStagger(), t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, c.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, c._positionItem = function (t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
    }, c._postLayout = function () {
        this.resizeContainer()
    }, c.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, c._emitCompleteOnItems = function (t, e) {
        function i() {
            n.dispatchEvent(t + "Complete", null, [e])
        }

        function o() {
            r++, r == s && i()
        }

        var n = this, s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function (e) {
            e.once(t, o)
        })
    }, c.dispatchEvent = function (t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o), h) if (this.$element = this.$element || h(this.element), e) {
            var n = h.Event(e);
            n.type = t, this.$element.trigger(n, i)
        } else this.$element.trigger(t, i)
    }, c.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, c.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, c.stamp = function (t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, c.unstamp = function (t) {
        t = this._find(t), t && t.forEach(function (t) {
            o.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, c._find = function (t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)
    }, c._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(), e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(), o = this._boundingRect, n = i(t), s = {
            left: e.left - o.left - n.marginLeft,
            top: e.top - o.top - n.marginTop,
            right: o.right - e.right - n.marginRight,
            bottom: o.bottom - e.bottom - n.marginBottom
        };
        return s
    }, c.handleEvent = o.handleEvent, c.bindResize = function () {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function () {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function () {
        this.resize()
    }, o.debounceMethod(s, "onresize", 100), c.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function () {
        var t = i(this.element), e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, c.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, c.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, c.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, c.reveal = function (t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, c.hide = function (t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, c.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, c.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e)
    }, c.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, c.getItems = function (t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, c.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
            t.remove(), o.removeFrom(this.items, t)
        }, this)
    }, c.destroy = function () {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, s.data = function (t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e]
    }, s.create = function (t, e) {
        var i = r(s);
        return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
    };
    var m = {ms: 1, s: 1e3};
    return s.Item = n, s
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function (t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }

    var i = e.prototype = Object.create(t.Item.prototype), o = i._create;
    i._create = function () {
        this.id = this.layout.itemGUID++, o.call(this), this.sortData = {}
    }, i.updateSortData = function () {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData, e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function () {
        n.apply(this, arguments), this.css({display: ""})
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function (t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }

    var o = i.prototype,
        n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return n.forEach(function (t) {
        o[t] = function () {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), o.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element), i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments)
    }, o.getColumnWidth = function () {
        this.getSegmentSize("column", "Width")
    }, o.getRowHeight = function () {
        this.getSegmentSize("row", "Height")
    }, o.getSegmentSize = function (t, e) {
        var i = t + e, o = "outer" + e;
        if (this._getMeasurement(i, o), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, o.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments)
    }, o.getSize = function () {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function (t, e) {
        function n() {
            i.apply(this, arguments)
        }

        return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return o._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, o.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0], i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter, n = this.containerWidth + this.gutter, s = n / o, r = o - n % o,
            a = r && r < 1 ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, o.getContainerWidth = function () {
        var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, o = e(i);
        this.containerWidth = o && o.innerWidth
    }, o._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth, i = e && e < 1 ? "round" : "ceil",
            o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
            x: this.columnWidth * s.col,
            y: s.y
        }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
        return r
    }, o._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t), i = Math.min.apply(Math, e);
        return {col: e.indexOf(i), y: i}
    }, o._getTopColGroup = function (t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
        return e
    }, o._getColGroupY = function (t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, o._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols, o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {col: i, y: this._getColGroupY(i, t)}
    }, o._manageStamp = function (t) {
        var i = e(t), o = this._getElementOffset(t), n = this._getOption("originLeft"), s = n ? o.left : o.right,
            r = s + i.outerWidth, a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, o._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {height: this.maxY};
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, o._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, o.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"), o = i.prototype, n = {_getElementOffset: !0, layout: !0, _getMeasurement: !0};
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function () {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var a = o._getOption;
    return o._getOption = function (t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
    "use strict";
    var e = t.create("fitRows"), i = e.prototype;
    return i._resetLayout = function () {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = {x: this.x, y: this.y};
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function () {
        return {height: this.maxY}
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
    "use strict";
    var e = t.create("vertical", {horizontalAlignment: 0}), i = e.prototype;
    return i._resetLayout = function () {
        this.y = 0
    }, i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment, i = this.y;
        return this.y += t.size.outerHeight, {x: e, y: i}
    }, i._getContainerSize = function () {
        return {height: this.y}
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function (i, o, n, s, r, a) {
        return e(t, i, o, n, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function (t, e, i, o, n, s, r) {
    function a(t, e) {
        return function (i, o) {
            for (var n = 0; n < t.length; n++) {
                var s = t[n], r = i.sortData[s], a = o.sortData[s];
                if (r > a || r < a) {
                    var u = void 0 !== e[s] ? e[s] : e, h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }

    var u = t.jQuery, h = String.prototype.trim ? function (t) {
        return t.trim()
    } : function (t) {
        return t.replace(/^\s+|\s+$/g, "")
    }, d = e.create("isotope", {layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0});
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function () {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in r.modes) this._initLayoutMode(t)
    }, l.reloadItems = function () {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, l._itemize = function () {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, l._initLayoutMode = function (t) {
        var e = r.modes[t], i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, l.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, l._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, l.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, l._init = l.arrange, l._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, l._getIsInstant = function () {
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, l._bindArrangeComplete = function () {
        function t() {
            e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }

        var e, i, o, n = this;
        this.once("layoutComplete", function () {
            e = !0, t()
        }), this.once("hideComplete", function () {
            i = !0, t()
        }), this.once("revealComplete", function () {
            o = !0, t()
        })
    }, l._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
            }
        }
        return {matches: i, needReveal: o, needHide: n}
    }, l._getFilterTest = function (t) {
        return u && this.options.isJQueryFiltering ? function (e) {
            return u(e.element).is(t);
        } : "function" == typeof t ? function (e) {
            return t(e.element)
        } : function (e) {
            return o(e.element, t)
        }
    }, l.updateSortData = function (t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, l._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }, l._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var o = t[i];
            o.updateSortData()
        }
    };
    var f = function () {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "), o = i[0], n = o.match(/^\[(.+)\]$/), s = n && n[1], r = e(s, o),
                a = d.sortDataParsers[i[1]];
            return t = a ? function (t) {
                return t && a(r(t))
            } : function (t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function (e) {
                return e.getAttribute(t)
            } : function (t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }

        return t
    }();
    d.sortDataParsers = {
        parseInt: function (t) {
            return parseInt(t, 10)
        }, parseFloat: function (t) {
            return parseFloat(t)
        }
    }, l._sort = function () {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, l._getIsSameSortBy = function (t) {
        for (var e = 0; e < t.length; e++) if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, l._mode = function () {
        var t = this.options.layoutMode, e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, l._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, l._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t)
    }, l._manageStamp = function (t) {
        this._mode()._manageStamp(t)
    }, l._getContainerSize = function () {
        return this._mode()._getContainerSize()
    }, l.needsResizeLayout = function () {
        return this._mode().needsResizeLayout()
    }, l.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, l.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, l._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, l.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = l.remove;
    return l.remove = function (t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }, l.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, l._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i, o
    }, l.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
            return t.element
        })
    }, d
});

/*====================================*/

/*
 jquery.instagramFeed

 @version 1.2.6

 @author Javier Sanahuja Liebana <bannss1@gmail.com>
 @contributor csanahuja <csanahuja@gmail.com>

 https://github.com/jsanahuja/jquery.instagramFeed

*/
(function (g) {
    function r(g) {
        return g.replace(/[&<>"'`=\/]/g, function (a) {
            return f[a]
        })
    }

    var m = {
        host: "https://www.instagram.com/",
        username: "",
        tag: "",
        container: "",
        display_profile: !0,
        display_biography: !0,
        display_gallery: !0,
        display_igtv: !1,
        get_data: !1,
        callback: null,
        styling: !0,
        items: 8,
        items_per_row: 4,
        margin: .5,
        image_size: 640
    }, n = {150: 0, 240: 1, 320: 2, 480: 3, 640: 4}, f = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;"
    };
    g.instagramFeed = function (f) {
        var a = g.fn.extend({},
            m, f);
        if ("" == a.username && "" == a.tag) return console.error("Instagram Feed: Error, no username or tag found."), !1;
        "undefined" !== typeof a.get_raw_json && (console.warn("Instagram Feed: get_raw_json is deprecated. See use get_data instead"), a.get_data = a.get_raw_json);
        if (!a.get_data && "" == a.container) return console.error("Instagram Feed: Error, no container found."), !1;
        if (a.get_data && null == a.callback) return console.error("Instagram Feed: Error, no callback defined to get the raw json"), !1;
        var l = "" == a.username;
        g.get(l ? a.host + "explore/tags/" + a.tag + "/" : a.host + a.username + "/", function (b) {
            try {
                b = b.split("window._sharedData = ")[1].split("\x3c/script>")[0]
            } catch (u) {
                console.error("Instagram Feed: It looks like the profile you are trying to fetch is age restricted. See https://github.com/jsanahuja/InstagramFeed/issues/26");
                return
            }
            b = JSON.parse(b.substr(0, b.length - 1));
            b = b.entry_data.ProfilePage || b.entry_data.TagPage;
            if ("undefined" === typeof b) console.error("Instagram Feed: It looks like YOUR network has been temporary banned because of too many requests. See https://github.com/jsanahuja/jquery.instagramFeed/issues/25");
            else if (b = b[0].graphql.user || b[0].graphql.hashtag, a.get_data) a.callback(b); else {
                var c = "", h = "", k = "", e = "", f = "";
                a.styling && (c = " style='text-align:center;'", h = " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'", k = " style='font-size:1.2em;'", e = " style='font-size:1em;'", f = " style='margin:" + a.margin + "% " + a.margin + "%;width:" + (100 - 2 * a.margin * a.items_per_row) / a.items_per_row + "%;float:left;'");
                var d = "";
                a.display_profile && (d = d + ("<div class='instagram_profile'" + c + ">") + ("<img class='instagram_profile_image' src='" +
                    b.profile_pic_url + "' alt='" + (l ? b.name + " tag pic" : b.username + " profile pic") + "'" + h + " />"), d = l ? d + ("<p class='instagram_tag'" + k + "><a href='https://www.instagram.com/explore/tags/" + a.tag + "' rel='noopener' target='_blank'>#" + a.tag + "</a></p>") : d + ("<p class='instagram_username'" + k + ">@" + b.full_name + " (<a href='https://www.instagram.com/" + a.username + "' rel='noopener' target='_blank'>@" + a.username + "</a>)</p>"), !l && a.display_biography && (d += "<p class='instagram_biography'" + e + ">" + b.biography + "</p>"), d += "</div>");
                k = "undefined" !== typeof n[a.image_size] ? n[a.image_size] : n[640];
                if (a.display_gallery) if ("undefined" !== typeof b.is_private && !0 === b.is_private) d += "<p class='instagram_private'><strong>This profile is private</strong></p>"; else {
                    e = (b.edge_owner_to_timeline_media || b.edge_hashtag_to_media).edges;
                    h = e.length > a.items ? a.items : e.length;
                    d += "<div class='instagram_gallery'>";
                    for (c = 0; c < h; c++) {
                        var m = "https://www.instagram.com/p/" + e[c].node.shortcode;
                        switch (e[c].node.__typename) {
                            case "GraphSidecar":
                                var p = "sidecar";
                                var q = e[c].node.thumbnail_resources[k].src;
                                break;
                            case "GraphVideo":
                                p = "video";
                                q = e[c].node.thumbnail_src;
                                break;
                            default:
                                p = "image", q = e[c].node.thumbnail_resources[k].src
                        }
                        var t = "undefined" !== typeof e[c].node.edge_media_to_caption.edges[0] && "undefined" !== typeof e[c].node.edge_media_to_caption.edges[0].node && "undefined" !== typeof e[c].node.edge_media_to_caption.edges[0].node.text && null !== e[c].node.edge_media_to_caption.edges[0].node.text ? e[c].node.edge_media_to_caption.edges[0].node.text : "undefined" !== typeof e[c].node.accessibility_caption &&
                        null !== e[c].node.accessibility_caption ? e[c].node.accessibility_caption : (l ? b.name : b.username) + " image " + c;
                        d += "<a href='" + m + "' class='instagram-" + p + "' rel='noopener' target='_blank'>";
                        d += "<img src='" + q + "' alt='" + r(t) + "'" + f + " />";
                        d += "</a>"
                    }
                    d += "</div>"
                }
                if (a.display_igtv && "undefined" !== typeof b.edge_felix_video_timeline && (b = b.edge_felix_video_timeline.edges, h = b.length > a.items ? a.items : b.length, 0 < b.length)) {
                    d += "<div class='instagram_igtv'>";
                    for (c = 0; c < h; c++) d += "<a href='https://www.instagram.com/p/" + b[c].node.shortcode +
                        "' rel='noopener' target='_blank'>", d += "<img src='" + b[c].node.thumbnail_src + "' alt='" + a.username + " instagram image " + c + "'" + f + " />", d += "</a>";
                    d += "</div>"
                }
                g(a.container).html(d)
            }
        }).fail(function (a) {
            console.error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: ", a.status)
        });
        return !0
    }
})(jQuery);

/*====================================*/


/*--
   - Magnific Popup
-------------------------*/


/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (a) {
    var b, c, d, e, f, g, h = "Close", i = "BeforeClose", j = "AfterClose", k = "BeforeAppend", l = "MarkupParse",
        m = "Open", n = "Change", o = "mfp", p = "." + o, q = "mfp-ready", r = "mfp-removing", s = "mfp-prevent-close",
        t = function () {
        }, u = !!window.jQuery, v = a(window), w = function (a, c) {
            b.ev.on(o + a + p, c)
        }, x = function (b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        }, y = function (c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        }, z = function (c) {
            return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
        }, A = function () {
            a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
        }, B = function () {
            var a = document.createElement("p").style, b = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== a.transition) return !0;
            for (; b.length;) if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    t.prototype = {
        constructor: t, init: function () {
            var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
        }, open: function (c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++) if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                    b.index = e;
                    break
                }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function () {
                b.close()
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function (a) {
                b._checkIfClose(a.target) && b.close()
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
            }
            y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }), b.st.enableEscapeKey && d.on("keyup" + p, function (a) {
                27 === a.keyCode && b.close()
            }), v.on("resize" + p, function () {
                b.updateSize()
            }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
            var k = b.wH = v.height(), n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function () {
                b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
            }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
        }, close: function () {
            b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function () {
                b._close()
            }, b.st.removalDelay)) : b._close())
        }, _close: function () {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var e = {marginRight: ""};
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        }, updateSize: function (a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth, d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        }, updateItemHTML: function () {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        }, appendContent: function (a, c) {
            b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        }, parseEl: function (c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {el: a(e)} : (d = e.type, e = {data: e, src: e.src}), e.el) {
                for (var f = b.types, g = 0; g < f.length; g++) if (e.el.hasClass("mfp-" + f[g])) {
                    d = f[g];
                    break
                }
                e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
        }, addGroup: function (a, c) {
            var d = function (d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        }, _openClick: function (c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g) if (a.isFunction(g)) {
                    if (!g.call(b)) return !0
                } else if (v.width() < g) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        }, updateStatus: function (a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {status: a, text: d};
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function (a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        }, _checkIfClose: function (c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick, e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e && a.contains(document, c)) return !0;
                return !1
            }
        }, _addClassToMFP: function (a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        }, _removeClassFromMFP: function (a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        }, _hasScrollBar: function (a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        }, _setFocus: function () {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        }, _onFocusIn: function (c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        }, _parseMarkup: function (b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function (c, d) {
                if (void 0 === d || d === !1) return !0;
                if (e = c.split("_"), e.length > 1) {
                    var f = b.find(p + "-" + e[0]);
                    if (f.length > 0) {
                        var g = e[1];
                        "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                    }
                } else b.find(p + "-" + c).html(d)
            })
        }, _getScrollbarSize: function () {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function (b, c) {
            return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function () {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function (b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function (c) {
        A();
        var d = a(this);
        if ("string" == typeof c) if ("open" === c) {
            var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup, g = parseInt(arguments[1], 10) || 0;
            f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({mfpEl: e}, d, f)
        } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1)); else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var C, D, E, F = "inline", G = function () {
        E && (D.after(E.addClass(C)).detach(), E = null)
    };
    a.magnificPopup.registerModule(F, {
        options: {hiddenClass: "hide", markup: "", tNotFound: "Content not found"},
        proto: {
            initInline: function () {
                b.types.push(F), w(h + "." + F, function () {
                    G()
                })
            }, getInline: function (c, d) {
                if (G(), c.src) {
                    var e = b.st.inline, f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var H, I = "ajax", J = function () {
        H && a(document.body).removeClass(H)
    }, K = function () {
        J(), b.req && b.req.abort()
    };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        }, proto: {
            initAjax: function () {
                b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
            }, getAjax: function (c) {
                H && a(document.body).addClass(H), b.updateStatus("loading");
                var d = a.extend({
                    url: c.src, success: function (d, e, f) {
                        var g = {data: d, xhr: f};
                        y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function () {
                            b.wrap.addClass(q)
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    }, error: function () {
                        J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d), ""
            }
        }
    });
    var L, M = function (c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        }, proto: {
            initImage: function () {
                var c = b.st.image, d = ".image";
                b.types.push("image"), w(m + d, function () {
                    "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                }), w(h + d, function () {
                    c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
                }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            }, resizeImage: function () {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            }, _onImageHasSize: function (a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            }, findImageSize: function (a) {
                var c = 0, d = a.img[0], e = function (f) {
                    L && clearInterval(L), L = setInterval(function () {
                        return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                    }, f)
                };
                e(1)
            }, getImage: function (c, d) {
                var e = 0, f = function () {
                    c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                }, g = function () {
                    c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                }, h = b.st.image, i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N, O = function () {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1, easing: "ease-in-out", duration: 300, opener: function (a) {
                return a.is("img") ? a : a.find("img")
            }
        }, proto: {
            initZoom: function () {
                var a, c = b.st.zoom, d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration, j = function (a) {
                        var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            d = "all " + c.duration / 1e3 + "s " + c.easing, e = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            }, f = "transition";
                        return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
                    }, k = function () {
                        b.content.css("visibility", "visible")
                    };
                    w("BuildControls" + d, function () {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                            f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function () {
                                f.css(b._getOffset(!0)), e = setTimeout(function () {
                                    k(), setTimeout(function () {
                                        f.remove(), a = f = null, y("ZoomAnimationEnded")
                                    }, 16)
                                }, g)
                            }, 16)
                        }
                    }), w(i + d, function () {
                        if (b._allowZoom()) {
                            if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                if (a = b._getItemToZoom(), !a) return;
                                f = j(a)
                            }
                            f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function () {
                                f.css(b._getOffset())
                            }, 16)
                        }
                    }), w(h + d, function () {
                        b._allowZoom() && (k(), f && f.remove(), a = null)
                    })
                }
            }, _allowZoom: function () {
                return "image" === b.currItem.type
            }, _getItemToZoom: function () {
                return b.currItem.hasSize ? b.currItem.img : !1
            }, _getOffset: function (c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset(), f = parseInt(d.css("padding-top"), 10), g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {width: d.width(), height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f};
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
            }
        }
    });
    var P = "iframe", Q = "//about:blank", R = function (a) {
        if (b.currTemplate[P]) {
            var c = b.currTemplate[P].find("iframe");
            c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
        }
    };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
            }
        }, proto: {
            initIframe: function () {
                b.types.push(P), w("BeforeChange", function (a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(h + "." + P, function () {
                    R()
                })
            }, getIframe: function (c, d) {
                var e = c.src, f = b.st.iframe;
                a.each(f.patterns, function () {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var S = function (a) {
        var c = b.items.length;
        return a > c - 1 ? a - c : 0 > a ? c + a : a
    }, T = function (a, b, c) {
        return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
    };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        }, proto: {
            initGallery: function () {
                var c = b.st.gallery, e = ".mfp-gallery";
                return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function () {
                    c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function () {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), d.on("keydown" + e, function (a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), w("UpdateStatus" + e, function (a, c) {
                    c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                }), w(l + e, function (a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + e, function () {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        e.click(function () {
                            b.prev()
                        }), f.click(function () {
                            b.next()
                        }), b.container.append(e.add(f))
                    }
                }), w(n + e, function () {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function () {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void w(h + e, function () {
                    d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
                })) : !1
            }, next: function () {
                b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
            }, prev: function () {
                b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
            }, goTo: function (a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            }, preloadNearbyImages: function () {
                var a, c = b.st.gallery.preload, d = Math.min(c[0], b.items.length), e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
            }, _preloadItem: function (c) {
                if (c = S(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
                        d.hasSize = !0
                    }).on("error.mfploader", function () {
                        d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function (a) {
                return a.src.replace(/\.\w+$/, function (a) {
                    return "@2x" + a
                })
            }, ratio: 1
        }, proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina, c = a.ratio;
                    c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function (a, b) {
                        b.img.css({"max-width": b.img[0].naturalWidth / c, width: "100%"})
                    }), w("ElementParse." + U, function (b, d) {
                        d.src = a.replaceSrc(d, c)
                    }))
                }
            }
        }
    }), A()
});


/*====================================*/

/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function (t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";

    function i(i, r, a) {
        function h(t, e, n) {
            var o, r = "$()." + i + '("' + e + '")';
            return t.each(function (t, h) {
                var u = a.data(h, i);
                if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
                var d = u[e];
                if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");
                var l = d.apply(u, n);
                o = void 0 === o ? l : o
            }), void 0 !== o ? o : t
        }

        function u(t, e) {
            t.each(function (t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o))
            })
        }

        a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function (t) {
            if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return h(this, t, e)
            }
            return u(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }

    var o = Array.prototype.slice, r = t.console, s = "undefined" == typeof r ? function () {
    } : function (t) {
        r.error(t)
    };
    return n(e || t.jQuery), i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {
    }

    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o], s = n && n[r];
                s && (this.off(t, r), delete n[r]), r.apply(this, e)
            }
            return this
        }
    }, e.allOff = function () {
        delete this._events, delete this._onceEvents
    }, t
}), function (t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
    "use strict";

    function t(t) {
        var e = parseFloat(t), i = -1 == t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function e() {
    }

    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; u > e; e++) {
            var i = h[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e
    }

    function o() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            s = 200 == Math.round(t(o.width)), r.isBoxSizeOuter = s, i.removeChild(e)
        }
    }

    function r(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var r = n(e);
            if ("none" == r.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
                var c = h[l], f = r[c], m = parseFloat(f);
                a[c] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight, g = a.paddingTop + a.paddingBottom,
                y = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth, z = a.borderTopWidth + a.borderBottomWidth, E = d && s,
                b = t(r.width);
            b !== !1 && (a.width = b + (E ? 0 : p + _));
            var x = t(r.height);
            return x !== !1 && (a.height = x + (E ? 0 : g + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + z), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a
        }
    }

    var s, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        },
        h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        u = h.length, d = !1;
    return r
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
    "use strict";
    var t = function () {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i], o = n + "MatchesSelector";
            if (t[o]) return o
        }
    }();
    return function (e, i) {
        return e[t](i)
    }
}), function (t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
    var i = {};
    i.extend = function (t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function (t, e) {
        return (t % e + e) % e
    };
    var n = Array.prototype.slice;
    i.makeArray = function (t) {
        if (Array.isArray(t)) return t;
        if (null === t || void 0 === t) return [];
        var e = "object" == typeof t && "number" == typeof t.length;
        return e ? n.call(t) : [t]
    }, i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1)
    }, i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function (t) {
            if (t instanceof HTMLElement) {
                if (!n) return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r])
            }
        }), o
    }, i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var n = t.prototype[e], o = e + "Timeout";
        t.prototype[e] = function () {
            var t = this[o];
            clearTimeout(t);
            var e = arguments, r = this;
            this[o] = setTimeout(function () {
                n.apply(r, e), delete r[o]
            }, i)
        }
    }, i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function (t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var o = t.console;
    return i.htmlInit = function (e, n) {
        i.docReady(function () {
            var r = i.toDashed(n), s = "data-" + r, a = document.querySelectorAll("[" + s + "]"),
                h = document.querySelectorAll(".js-" + r), u = i.makeArray(a).concat(i.makeArray(h)),
                d = s + "-options", l = t.jQuery;
            u.forEach(function (t) {
                var i, r = t.getAttribute(s) || t.getAttribute(d);
                try {
                    i = r && JSON.parse(r)
                } catch (a) {
                    return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + a))
                }
                var h = new e(t, i);
                l && l.data(t, n, h)
            })
        })
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function (t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
    }

    function o(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }

    var r = document.documentElement.style, s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
        h = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[s], u = {
            transform: a,
            transition: s,
            transitionDuration: s + "Duration",
            transitionProperty: s + "Property",
            transitionDelay: s + "Delay"
        }, d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function () {
        this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
    }, d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function () {
        this.size = e(this.element)
    }, d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
            var n = u[i] || i;
            e[n] = t[i]
        }
    }, d.getPosition = function () {
        var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"],
            r = parseFloat(n), s = parseFloat(o), a = this.layout.size;
        -1 != n.indexOf("%") && (r = r / 100 * a.width), -1 != o.indexOf("%") && (s = s / 100 * a.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= e ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = s
    }, d.layoutPosition = function () {
        var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", r = i ? "left" : "right",
            s = i ? "right" : "left", a = this.position.x + t[o];
        e[r] = this.getXValue(a), e[s] = "";
        var h = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", d = n ? "bottom" : "top",
            l = this.position.y + t[h];
        e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x, n = this.position.y, o = t == this.position.x && e == this.position.y;
        if (this.setPosition(t, e), o && !this.isTransitioning) return void this.layoutPosition();
        var r = t - i, s = e - n, a = {};
        a.transform = this.getTranslate(r, s), this.transition({
            to: a,
            onTransitionEnd: {transform: this.layoutPosition},
            isCleaning: !0
        })
    }, d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
        return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
        this.position.x = parseFloat(t), this.position.y = parseFloat(e)
    }, d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var n = this.element.offsetHeight;
            n = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + o(a);
    d.enableTransition = function () {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(h, this, !1)
        }
    }, d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function (t) {
        this.ontransitionend(t)
    };
    var c = {"-webkit-transform": "transform"};
    d.ontransitionend = function (t) {
        if (t.target === this.element) {
            var e = this._transn, n = c[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                var o = e.onEnd[n];
                o.call(this), delete e.onEnd[n]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var f = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
    return d.removeTransitionStyles = function () {
        this.css(f)
    }, d.stagger = function (t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
    }, d.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function () {
        delete this.isHidden, this.css({display: ""});
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function () {
        this.isHidden = !0, this.css({display: ""});
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function () {
        this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
    }, d.destroy = function () {
        this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
    }, n
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r) {
        return e(t, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function (t, e, i, n, o) {
    "use strict";

    function r(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
        var o = ++l;
        this.element.outlayerGUID = o, c[o] = this, this._create();
        var r = this._getOption("initLayout");
        r && this.layout()
    }

    function s(t) {
        function e() {
            t.apply(this, arguments)
        }

        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var o = m[n] || 1;
        return i * o
    }

    var h = t.console, u = t.jQuery, d = function () {
    }, l = 0, c = {};
    r.namespace = "outlayer", r.Item = o, r.defaults = {
        containerStyle: {position: "relative"},
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
        visibleStyle: {opacity: 1, transform: "scale(1)"}
    };
    var f = r.prototype;
    n.extend(f, e.prototype), f.option = function (t) {
        n.extend(this.options, t)
    }, f._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, f._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, f.reloadItems = function () {
        this.items = this._itemize(this.element.children)
    }, f._itemize = function (t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var r = e[o], s = new i(r, this);
            n.push(s)
        }
        return n
    }, f._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }, f.getItemElements = function () {
        return this.items.map(function (t) {
            return t.element
        })
    }, f.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, f._init = f.layout, f._resetLayout = function () {
        this.getSize()
    }, f.getSize = function () {
        this.size = i(this.element)
    }, f._getMeasurement = function (t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
    }, f.layoutItems = function (t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, f._getItemsForLayout = function (t) {
        return t.filter(function (t) {
            return !t.isIgnored
        })
    }, f._layoutItems = function (t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function (t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
            }, this), this._processLayoutQueue(i)
        }
    }, f._getItemLayoutPosition = function () {
        return {x: 0, y: 0}
    }, f._processLayoutQueue = function (t) {
        this.updateStagger(), t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, f.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, f._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, f._postLayout = function () {
        this.resizeContainer()
    }, f.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, f._getContainerSize = d, f._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, f._emitCompleteOnItems = function (t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [e])
        }

        function n() {
            s++, s == r && i()
        }

        var o = this, r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function (e) {
            e.once(t, n)
        })
    }, f.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), e) {
            var o = u.Event(e);
            o.type = t, this.$element.trigger(o, i)
        } else this.$element.trigger(t, i)
    }, f.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, f.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, f.stamp = function (t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, f.unstamp = function (t) {
        t = this._find(t), t && t.forEach(function (t) {
            n.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, f._find = function (t) {
        return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
    }, f._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, f._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(), e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, f._manageStamp = d, f._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t), r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom
        };
        return r
    }, f.handleEvent = n.handleEvent, f.bindResize = function () {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, f.unbindResize = function () {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, f.onresize = function () {
        this.resize()
    }, n.debounceMethod(r, "onresize", 100), f.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, f.needsResizeLayout = function () {
        var t = i(this.element), e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, f.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, f.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, f.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, f.reveal = function (t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, f.hide = function (t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, f.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, f.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e)
    }, f.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, f.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, f.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
            t.remove(), n.removeFrom(this.items, t)
        }, this)
    }, f.destroy = function () {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
    }, r.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e]
    }, r.create = function (t, e) {
        var i = s(r);
        return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
    };
    var m = {ms: 1, s: 1e3};
    return r.Item = o, r
}), function (t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return n._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, n.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0], i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, r = o / n, s = n - o % n,
            a = s && 1 > s ? "round" : "floor";
        r = Math[a](r), this.cols = Math.max(r, 1)
    }, n.getContainerWidth = function () {
        var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, n = e(i);
        this.containerWidth = n && n.innerWidth
    }, n._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil",
            n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = {
            x: this.columnWidth * r.col,
            y: r.y
        }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++) this.colYs[u] = a;
        return s
    }, n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t), i = Math.min.apply(Math, e);
        return {col: e.indexOf(i), y: i}
    }, n._getTopColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) e[n] = this._getColGroupY(n, t);
        return e
    }, n._getColGroupY = function (t, e) {
        if (2 > e) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols, n = t > 1 && i + t > this.cols;
        i = n ? 0 : i;
        var o = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, {col: i, y: this._getColGroupY(i, t)}
    }, n._manageStamp = function (t) {
        var i = e(t), n = this._getElementOffset(t), o = this._getOption("originLeft"), r = o ? n.left : n.right,
            s = r + i.outerWidth, a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
        for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {height: this.maxY};
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, n.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
});

/*====================================*/

(function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory)
    } else if (typeof exports !== "undefined") {
        module.exports = factory(require("jquery"))
    } else {
        factory(jQuery)
    }
})(function ($) {
    "use strict";
    var Slick = window.Slick || {};
    Slick = function () {
        var instanceUid = 0;

        function Slick(element, settings) {
            var _ = this, dataSettings;
            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3e3,
                centerMode: false,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (slider, i) {
                    return $('<button type="button" />').text(i + 1)
                },
                dots: false,
                dotsClass: "slick-dots",
                draggable: true,
                easing: "linear",
                edgeFriction: .35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: false,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1e3
            };
            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };
            $.extend(_, _.initials);
            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = "hidden";
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = "visibilitychange";
            _.windowWidth = 0;
            _.windowTimer = null;
            dataSettings = $(element).data("slick") || {};
            _.options = $.extend({}, _.defaults, settings, dataSettings);
            _.currentSlide = _.options.initialSlide;
            _.originalSettings = _.options;
            if (typeof document.mozHidden !== "undefined") {
                _.hidden = "mozHidden";
                _.visibilityChange = "mozvisibilitychange"
            } else if (typeof document.webkitHidden !== "undefined") {
                _.hidden = "webkitHidden";
                _.visibilityChange = "webkitvisibilitychange"
            }
            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.instanceUid = instanceUid++;
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            _.registerBreakpoints();
            _.init(true)
        }

        return Slick
    }();
    Slick.prototype.activateADA = function () {
        var _ = this;
        _.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
    };
    Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
        var _ = this;
        if (typeof index === "boolean") {
            addBefore = index;
            index = null
        } else if (index < 0 || index >= _.slideCount) {
            return false
        }
        _.unload();
        if (typeof index === "number") {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack)
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index))
            } else {
                $(markup).insertAfter(_.$slides.eq(index))
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack)
            } else {
                $(markup).appendTo(_.$slideTrack)
            }
        }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slides.each(function (index, element) {
            $(element).attr("data-slick-index", index)
        });
        _.$slidesCache = _.$slides;
        _.reinit()
    };
    Slick.prototype.animateHeight = function () {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({height: targetHeight}, _.options.speed)
        }
    };
    Slick.prototype.animateSlide = function (targetLeft, callback) {
        var animProps = {}, _ = this;
        _.animateHeight();
        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({left: targetLeft}, _.options.speed, _.options.easing, callback)
            } else {
                _.$slideTrack.animate({top: targetLeft}, _.options.speed, _.options.easing, callback)
            }
        } else {
            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -_.currentLeft
                }
                $({animStart: _.currentLeft}).animate({animStart: targetLeft}, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function (now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = "translate(" + now + "px, 0px)";
                            _.$slideTrack.css(animProps)
                        } else {
                            animProps[_.animType] = "translate(0px," + now + "px)";
                            _.$slideTrack.css(animProps)
                        }
                    },
                    complete: function () {
                        if (callback) {
                            callback.call()
                        }
                    }
                })
            } else {
                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);
                if (_.options.vertical === false) {
                    animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)"
                } else {
                    animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)"
                }
                _.$slideTrack.css(animProps);
                if (callback) {
                    setTimeout(function () {
                        _.disableTransition();
                        callback.call()
                    }, _.options.speed)
                }
            }
        }
    };
    Slick.prototype.getNavTarget = function () {
        var _ = this, asNavFor = _.options.asNavFor;
        if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(_.$slider)
        }
        return asNavFor
    };
    Slick.prototype.asNavFor = function (index) {
        var _ = this, asNavFor = _.getNavTarget();
        if (asNavFor !== null && typeof asNavFor === "object") {
            asNavFor.each(function () {
                var target = $(this).slick("getSlick");
                if (!target.unslicked) {
                    target.slideHandler(index, true)
                }
            })
        }
    };
    Slick.prototype.applyTransition = function (slide) {
        var _ = this, transition = {};
        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + " " + _.options.speed + "ms " + _.options.cssEase
        } else {
            transition[_.transitionType] = "opacity " + _.options.speed + "ms " + _.options.cssEase
        }
        if (_.options.fade === false) {
            _.$slideTrack.css(transition)
        } else {
            _.$slides.eq(slide).css(transition)
        }
    };
    Slick.prototype.autoPlay = function () {
        var _ = this;
        _.autoPlayClear();
        if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed)
        }
    };
    Slick.prototype.autoPlayClear = function () {
        var _ = this;
        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer)
        }
    };
    Slick.prototype.autoPlayIterator = function () {
        var _ = this, slideTo = _.currentSlide + _.options.slidesToScroll;
        if (!_.paused && !_.interrupted && !_.focussed) {
            if (_.options.infinite === false) {
                if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
                    _.direction = 0
                } else if (_.direction === 0) {
                    slideTo = _.currentSlide - _.options.slidesToScroll;
                    if (_.currentSlide - 1 === 0) {
                        _.direction = 1
                    }
                }
            }
            _.slideHandler(slideTo)
        }
    };
    Slick.prototype.buildArrows = function () {
        var _ = this;
        if (_.options.arrows === true) {
            _.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow");
            _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow");
            if (_.slideCount > _.options.slidesToShow) {
                _.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                _.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows)
                }
                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows)
                }
                if (_.options.infinite !== true) {
                    _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")
                }
            } else {
                _.$prevArrow.add(_.$nextArrow).addClass("slick-hidden").attr({"aria-disabled": "true", tabindex: "-1"})
            }
        }
    };
    Slick.prototype.buildDots = function () {
        var _ = this, i, dot;
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$slider.addClass("slick-dotted");
            dot = $("<ul />").addClass(_.options.dotsClass);
            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($("<li />").append(_.options.customPaging.call(this, _, i)))
            }
            _.$dots = dot.appendTo(_.options.appendDots);
            _.$dots.find("li").first().addClass("slick-active")
        }
    };
    Slick.prototype.buildOut = function () {
        var _ = this;
        _.$slides = _.$slider.children(_.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
        _.slideCount = _.$slides.length;
        _.$slides.each(function (index, element) {
            $(element).attr("data-slick-index", index).data("originalStyling", $(element).attr("style") || "")
        });
        _.$slider.addClass("slick-slider");
        _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
        _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
        _.$slideTrack.css("opacity", 0);
        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1
        }
        $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading");
        _.setupInfinite();
        _.buildArrows();
        _.buildDots();
        _.updateDots();
        _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
        if (_.options.draggable === true) {
            _.$list.addClass("draggable")
        }
    };
    Slick.prototype.buildRows = function () {
        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection;
        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();
        if (_.options.rows > 0) {
            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement("div");
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement("div");
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target))
                        }
                    }
                    slide.appendChild(row)
                }
                newSlides.appendChild(slide)
            }
            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children().css({
                width: 100 / _.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    };
    Slick.prototype.checkResponsive = function (initial, forceUpdate) {
        var _ = this, breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();
        if (_.respondTo === "window") {
            respondToWidth = windowWidth
        } else if (_.respondTo === "slider") {
            respondToWidth = sliderWidth
        } else if (_.respondTo === "min") {
            respondToWidth = Math.min(windowWidth, sliderWidth)
        }
        if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
            targetBreakpoint = null;
            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint]
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint]
                        }
                    }
                }
            }
            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint = targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === "unslick") {
                            _.unslick(targetBreakpoint)
                        } else {
                            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide
                            }
                            _.refresh(initial)
                        }
                        triggerBreakpoint = targetBreakpoint
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === "unslick") {
                        _.unslick(targetBreakpoint)
                    } else {
                        _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide
                        }
                        _.refresh(initial)
                    }
                    triggerBreakpoint = targetBreakpoint
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint
                }
            }
            if (!initial && triggerBreakpoint !== false) {
                _.$slider.trigger("breakpoint", [_, triggerBreakpoint])
            }
        }
    };
    Slick.prototype.changeSlide = function (event, dontAnimate) {
        var _ = this, $target = $(event.currentTarget), indexOffset, slideOffset, unevenOffset;
        if ($target.is("a")) {
            event.preventDefault()
        }
        if (!$target.is("li")) {
            $target = $target.closest("li")
        }
        unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
        switch (event.data.message) {
            case"previous":
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate)
                }
                break;
            case"next":
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate)
                }
                break;
            case"index":
                var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger("focus");
                break;
            default:
                return
        }
    };
    Slick.prototype.checkNavigable = function (index) {
        var _ = this, navigables, prevNavigable;
        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1]
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break
                }
                prevNavigable = navigables[n]
            }
        }
        return index
    };
    Slick.prototype.cleanUpEvents = function () {
        var _ = this;
        if (_.options.dots && _.$dots !== null) {
            $("li", _.$dots).off("click.slick", _.changeSlide).off("mouseenter.slick", $.proxy(_.interrupt, _, true)).off("mouseleave.slick", $.proxy(_.interrupt, _, false));
            if (_.options.accessibility === true) {
                _.$dots.off("keydown.slick", _.keyHandler)
            }
        }
        _.$slider.off("focus.slick blur.slick");
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide);
            _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide);
            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off("keydown.slick", _.keyHandler);
                _.$nextArrow && _.$nextArrow.off("keydown.slick", _.keyHandler)
            }
        }
        _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler);
        _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler);
        _.$list.off("touchend.slick mouseup.slick", _.swipeHandler);
        _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler);
        _.$list.off("click.slick", _.clickHandler);
        $(document).off(_.visibilityChange, _.visibility);
        _.cleanUpSlideEvents();
        if (_.options.accessibility === true) {
            _.$list.off("keydown.slick", _.keyHandler)
        }
        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off("click.slick", _.selectHandler)
        }
        $(window).off("orientationchange.slick.slick-" + _.instanceUid, _.orientationChange);
        $(window).off("resize.slick.slick-" + _.instanceUid, _.resize);
        $("[draggable!=true]", _.$slideTrack).off("dragstart", _.preventDefault);
        $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition)
    };
    Slick.prototype.cleanUpSlideEvents = function () {
        var _ = this;
        _.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, true));
        _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, false))
    };
    Slick.prototype.cleanUpRows = function () {
        var _ = this, originalSlides;
        if (_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr("style");
            _.$slider.empty().append(originalSlides)
        }
    };
    Slick.prototype.clickHandler = function (event) {
        var _ = this;
        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault()
        }
    };
    Slick.prototype.destroy = function (refresh) {
        var _ = this;
        _.autoPlayClear();
        _.touchObject = {};
        _.cleanUpEvents();
        $(".slick-cloned", _.$slider).detach();
        if (_.$dots) {
            _.$dots.remove()
        }
        if (_.$prevArrow && _.$prevArrow.length) {
            _.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.remove()
            }
        }
        if (_.$nextArrow && _.$nextArrow.length) {
            _.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.remove()
            }
        }
        if (_.$slides) {
            _.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
                $(this).attr("style", $(this).data("originalStyling"))
            });
            _.$slideTrack.children(this.options.slide).detach();
            _.$slideTrack.detach();
            _.$list.detach();
            _.$slider.append(_.$slides)
        }
        _.cleanUpRows();
        _.$slider.removeClass("slick-slider");
        _.$slider.removeClass("slick-initialized");
        _.$slider.removeClass("slick-dotted");
        _.unslicked = true;
        if (!refresh) {
            _.$slider.trigger("destroy", [_])
        }
    };
    Slick.prototype.disableTransition = function (slide) {
        var _ = this, transition = {};
        transition[_.transitionType] = "";
        if (_.options.fade === false) {
            _.$slideTrack.css(transition)
        } else {
            _.$slides.eq(slide).css(transition)
        }
    };
    Slick.prototype.fadeSlide = function (slideIndex, callback) {
        var _ = this;
        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).css({zIndex: _.options.zIndex});
            _.$slides.eq(slideIndex).animate({opacity: 1}, _.options.speed, _.options.easing, callback)
        } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({opacity: 1, zIndex: _.options.zIndex});
            if (callback) {
                setTimeout(function () {
                    _.disableTransition(slideIndex);
                    callback.call()
                }, _.options.speed)
            }
        }
    };
    Slick.prototype.fadeSlideOut = function (slideIndex) {
        var _ = this;
        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing)
        } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({opacity: 0, zIndex: _.options.zIndex - 2})
        }
    };
    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
        var _ = this;
        if (filter !== null) {
            _.$slidesCache = _.$slides;
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
            _.reinit()
        }
    };
    Slick.prototype.focusHandler = function () {
        var _ = this;
        _.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function (event) {
            var $sf = $(this);
            setTimeout(function () {
                if (_.options.pauseOnFocus) {
                    if ($sf.is(":focus")) {
                        _.focussed = true;
                        _.autoPlay()
                    }
                }
            }, 0)
        }).on("blur.slick", "*", function (event) {
            var $sf = $(this);
            if (_.options.pauseOnFocus) {
                _.focussed = false;
                _.autoPlay()
            }
        })
    };
    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
        var _ = this;
        return _.currentSlide
    };
    Slick.prototype.getDotCount = function () {
        var _ = this;
        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;
        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                ++pagerQty
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount
        } else if (!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll)
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
            }
        }
        return pagerQty - 1
    };
    Slick.prototype.getLeft = function (slideIndex) {
        var _ = this, targetLeft, verticalHeight, verticalOffset = 0, targetSlide, coef;
        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);
        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
                coef = -1;
                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = verticalHeight * _.options.slidesToShow * coef
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
                        verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1
                    } else {
                        _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
                        verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
                verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight
            }
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0
        }
        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2)
        }
        if (_.options.vertical === false) {
            targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset
        } else {
            targetLeft = slideIndex * verticalHeight * -1 + verticalOffset
        }
        if (_.options.variableWidth === true) {
            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex)
            } else {
                targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow)
            }
            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1
                } else {
                    targetLeft = 0
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0
            }
            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex)
                } else {
                    targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow + 1)
                }
                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1
                    } else {
                        targetLeft = 0
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0
                }
                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2
            }
        }
        return targetLeft
    };
    Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
        var _ = this;
        return _.options[option]
    };
    Slick.prototype.getNavigableIndexes = function () {
        var _ = this, breakPoint = 0, counter = 0, indexes = [], max;
        if (_.options.infinite === false) {
            max = _.slideCount
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2
        }
        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
        }
        return indexes
    };
    Slick.prototype.getSlick = function () {
        return this
    };
    Slick.prototype.getSlideCount = function () {
        var _ = this, slidesTraversed, swipedSlide, swipeTarget, centerOffset;
        centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
        swipeTarget = _.swipeLeft * -1 + centerOffset;
        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find(".slick-slide").each(function (index, slide) {
                var slideOuterWidth, slideOffset, slideRightBoundary;
                slideOuterWidth = $(slide).outerWidth();
                slideOffset = slide.offsetLeft;
                if (_.options.centerMode !== true) {
                    slideOffset += slideOuterWidth / 2
                }
                slideRightBoundary = slideOffset + slideOuterWidth;
                if (swipeTarget < slideRightBoundary) {
                    swipedSlide = slide;
                    return false
                }
            });
            slidesTraversed = Math.abs($(swipedSlide).attr("data-slick-index") - _.currentSlide) || 1;
            return slidesTraversed
        } else {
            return _.options.slidesToScroll
        }
    };
    Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
        var _ = this;
        _.changeSlide({data: {message: "index", index: parseInt(slide)}}, dontAnimate)
    };
    Slick.prototype.init = function (creation) {
        var _ = this;
        if (!$(_.$slider).hasClass("slick-initialized")) {
            $(_.$slider).addClass("slick-initialized");
            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler()
        }
        if (creation) {
            _.$slider.trigger("init", [_])
        }
        if (_.options.accessibility === true) {
            _.initADA()
        }
        if (_.options.autoplay) {
            _.paused = false;
            _.autoPlay()
        }
    };
    Slick.prototype.initADA = function () {
        var _ = this, numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
                return val >= 0 && val < _.slideCount
            });
        _.$slides.add(_.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"});
        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find(".slick-cloned")).each(function (i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);
                $(this).attr({role: "tabpanel", id: "slick-slide" + _.instanceUid + i, tabindex: -1});
                if (slideControlIndex !== -1) {
                    var ariaButtonControl = "slick-slide-control" + _.instanceUid + slideControlIndex;
                    if ($("#" + ariaButtonControl).length) {
                        $(this).attr({"aria-describedby": ariaButtonControl})
                    }
                }
            });
            _.$dots.attr("role", "tablist").find("li").each(function (i) {
                var mappedSlideIndex = tabControlIndexes[i];
                $(this).attr({role: "presentation"});
                $(this).find("button").first().attr({
                    role: "tab",
                    id: "slick-slide-control" + _.instanceUid + i,
                    "aria-controls": "slick-slide" + _.instanceUid + mappedSlideIndex,
                    "aria-label": i + 1 + " of " + numDotGroups,
                    "aria-selected": null,
                    tabindex: "-1"
                })
            }).eq(_.currentSlide).find("button").attr({"aria-selected": "true", tabindex: "0"}).end()
        }
        for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
            if (_.options.focusOnChange) {
                _.$slides.eq(i).attr({tabindex: "0"})
            } else {
                _.$slides.eq(i).removeAttr("tabindex")
            }
        }
        _.activateADA()
    };
    Slick.prototype.initArrowEvents = function () {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.off("click.slick").on("click.slick", {message: "previous"}, _.changeSlide);
            _.$nextArrow.off("click.slick").on("click.slick", {message: "next"}, _.changeSlide);
            if (_.options.accessibility === true) {
                _.$prevArrow.on("keydown.slick", _.keyHandler);
                _.$nextArrow.on("keydown.slick", _.keyHandler)
            }
        }
    };
    Slick.prototype.initDotEvents = function () {
        var _ = this;
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $("li", _.$dots).on("click.slick", {message: "index"}, _.changeSlide);
            if (_.options.accessibility === true) {
                _.$dots.on("keydown.slick", _.keyHandler)
            }
        }
        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
            $("li", _.$dots).on("mouseenter.slick", $.proxy(_.interrupt, _, true)).on("mouseleave.slick", $.proxy(_.interrupt, _, false))
        }
    };
    Slick.prototype.initSlideEvents = function () {
        var _ = this;
        if (_.options.pauseOnHover) {
            _.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, true));
            _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, false))
        }
    };
    Slick.prototype.initializeEvents = function () {
        var _ = this;
        _.initArrowEvents();
        _.initDotEvents();
        _.initSlideEvents();
        _.$list.on("touchstart.slick mousedown.slick", {action: "start"}, _.swipeHandler);
        _.$list.on("touchmove.slick mousemove.slick", {action: "move"}, _.swipeHandler);
        _.$list.on("touchend.slick mouseup.slick", {action: "end"}, _.swipeHandler);
        _.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, _.swipeHandler);
        _.$list.on("click.slick", _.clickHandler);
        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
        if (_.options.accessibility === true) {
            _.$list.on("keydown.slick", _.keyHandler)
        }
        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on("click.slick", _.selectHandler)
        }
        $(window).on("orientationchange.slick.slick-" + _.instanceUid, $.proxy(_.orientationChange, _));
        $(window).on("resize.slick.slick-" + _.instanceUid, $.proxy(_.resize, _));
        $("[draggable!=true]", _.$slideTrack).on("dragstart", _.preventDefault);
        $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition);
        $(_.setPosition)
    };
    Slick.prototype.initUI = function () {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.show();
            _.$nextArrow.show()
        }
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.show()
        }
    };
    Slick.prototype.keyHandler = function (event) {
        var _ = this;
        if (!event.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({data: {message: _.options.rtl === true ? "next" : "previous"}})
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({data: {message: _.options.rtl === true ? "previous" : "next"}})
            }
        }
    };
    Slick.prototype.lazyLoad = function () {
        var _ = this, loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $("img[data-lazy]", imagesScope).each(function () {
                var image = $(this), imageSource = $(this).attr("data-lazy"), imageSrcSet = $(this).attr("data-srcset"),
                    imageSizes = $(this).attr("data-sizes") || _.$slider.attr("data-sizes"),
                    imageToLoad = document.createElement("img");
                imageToLoad.onload = function () {
                    image.animate({opacity: 0}, 100, function () {
                        if (imageSrcSet) {
                            image.attr("srcset", imageSrcSet);
                            if (imageSizes) {
                                image.attr("sizes", imageSizes)
                            }
                        }
                        image.attr("src", imageSource).animate({opacity: 1}, 200, function () {
                            image.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        });
                        _.$slider.trigger("lazyLoaded", [_, image, imageSource])
                    })
                };
                imageToLoad.onerror = function () {
                    image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    _.$slider.trigger("lazyLoadError", [_, image, imageSource])
                };
                imageToLoad.src = imageSource
            })
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++
            }
        }
        loadRange = _.$slider.find(".slick-slide").slice(rangeStart, rangeEnd);
        if (_.options.lazyLoad === "anticipated") {
            var prevSlide = rangeStart - 1, nextSlide = rangeEnd, $slides = _.$slider.find(".slick-slide");
            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++
            }
        }
        loadImages(loadRange);
        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find(".slick-slide");
            loadImages(cloneRange)
        } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find(".slick-cloned").slice(0, _.options.slidesToShow);
            loadImages(cloneRange)
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find(".slick-cloned").slice(_.options.slidesToShow * -1);
            loadImages(cloneRange)
        }
    };
    Slick.prototype.loadSlider = function () {
        var _ = this;
        _.setPosition();
        _.$slideTrack.css({opacity: 1});
        _.$slider.removeClass("slick-loading");
        _.initUI();
        if (_.options.lazyLoad === "progressive") {
            _.progressiveLazyLoad()
        }
    };
    Slick.prototype.next = Slick.prototype.slickNext = function () {
        var _ = this;
        _.changeSlide({data: {message: "next"}})
    };
    Slick.prototype.orientationChange = function () {
        var _ = this;
        _.checkResponsive();
        _.setPosition()
    };
    Slick.prototype.pause = Slick.prototype.slickPause = function () {
        var _ = this;
        _.autoPlayClear();
        _.paused = true
    };
    Slick.prototype.play = Slick.prototype.slickPlay = function () {
        var _ = this;
        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false
    };
    Slick.prototype.postSlide = function (index) {
        var _ = this;
        if (!_.unslicked) {
            _.$slider.trigger("afterChange", [_, index]);
            _.animating = false;
            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition()
            }
            _.swipeLeft = null;
            if (_.options.autoplay) {
                _.autoPlay()
            }
            if (_.options.accessibility === true) {
                _.initADA();
                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr("tabindex", 0).focus()
                }
            }
        }
    };
    Slick.prototype.prev = Slick.prototype.slickPrev = function () {
        var _ = this;
        _.changeSlide({data: {message: "previous"}})
    };
    Slick.prototype.preventDefault = function (event) {
        event.preventDefault()
    };
    Slick.prototype.progressiveLazyLoad = function (tryCount) {
        tryCount = tryCount || 1;
        var _ = this, $imgsToLoad = $("img[data-lazy]", _.$slider), image, imageSource, imageSrcSet, imageSizes,
            imageToLoad;
        if ($imgsToLoad.length) {
            image = $imgsToLoad.first();
            imageSource = image.attr("data-lazy");
            imageSrcSet = image.attr("data-srcset");
            imageSizes = image.attr("data-sizes") || _.$slider.attr("data-sizes");
            imageToLoad = document.createElement("img");
            imageToLoad.onload = function () {
                if (imageSrcSet) {
                    image.attr("srcset", imageSrcSet);
                    if (imageSizes) {
                        image.attr("sizes", imageSizes)
                    }
                }
                image.attr("src", imageSource).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                if (_.options.adaptiveHeight === true) {
                    _.setPosition()
                }
                _.$slider.trigger("lazyLoaded", [_, image, imageSource]);
                _.progressiveLazyLoad()
            };
            imageToLoad.onerror = function () {
                if (tryCount < 3) {
                    setTimeout(function () {
                        _.progressiveLazyLoad(tryCount + 1)
                    }, 500)
                } else {
                    image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                    _.$slider.trigger("lazyLoadError", [_, image, imageSource]);
                    _.progressiveLazyLoad()
                }
            };
            imageToLoad.src = imageSource
        } else {
            _.$slider.trigger("allImagesLoaded", [_])
        }
    };
    Slick.prototype.refresh = function (initializing) {
        var _ = this, currentSlide, lastVisibleIndex;
        lastVisibleIndex = _.slideCount - _.options.slidesToShow;
        if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
            _.currentSlide = lastVisibleIndex
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0
        }
        currentSlide = _.currentSlide;
        _.destroy(true);
        $.extend(_, _.initials, {currentSlide: currentSlide});
        _.init();
        if (!initializing) {
            _.changeSlide({data: {message: "index", index: currentSlide}}, false)
        }
    };
    Slick.prototype.registerBreakpoints = function () {
        var _ = this, breakpoint, currentBreakpoint, l, responsiveSettings = _.options.responsive || null;
        if ($.type(responsiveSettings) === "array" && responsiveSettings.length) {
            _.respondTo = _.options.respondTo || "window";
            for (breakpoint in responsiveSettings) {
                l = _.breakpoints.length - 1;
                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
                    while (l >= 0) {
                        if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                            _.breakpoints.splice(l, 1)
                        }
                        l--
                    }
                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings
                }
            }
            _.breakpoints.sort(function (a, b) {
                return _.options.mobileFirst ? a - b : b - a
            })
        }
    };
    Slick.prototype.reinit = function () {
        var _ = this;
        _.$slides = _.$slideTrack.children(_.options.slide).addClass("slick-slide");
        _.slideCount = _.$slides.length;
        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0
        }
        _.registerBreakpoints();
        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();
        _.checkResponsive(false, true);
        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on("click.slick", _.selectHandler)
        }
        _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
        _.setPosition();
        _.focusHandler();
        _.paused = !_.options.autoplay;
        _.autoPlay();
        _.$slider.trigger("reInit", [_])
    };
    Slick.prototype.resize = function () {
        var _ = this;
        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function () {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if (!_.unslicked) {
                    _.setPosition()
                }
            }, 50)
        }
    };
    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
        var _ = this;
        if (typeof index === "boolean") {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1
        } else {
            index = removeBefore === true ? --index : index
        }
        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false
        }
        _.unload();
        if (removeAll === true) {
            _.$slideTrack.children().remove()
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove()
        }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slidesCache = _.$slides;
        _.reinit()
    };
    Slick.prototype.setCSS = function (position) {
        var _ = this, positionProps = {}, x, y;
        if (_.options.rtl === true) {
            position = -position
        }
        x = _.positionProp == "left" ? Math.ceil(position) + "px" : "0px";
        y = _.positionProp == "top" ? Math.ceil(position) + "px" : "0px";
        positionProps[_.positionProp] = position;
        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps)
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = "translate(" + x + ", " + y + ")";
                _.$slideTrack.css(positionProps)
            } else {
                positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)";
                _.$slideTrack.css(positionProps)
            }
        }
    };
    Slick.prototype.setDimensions = function () {
        var _ = this;
        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({padding: "0px " + _.options.centerPadding})
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({padding: _.options.centerPadding + " 0px"})
            }
        }
        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();
        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children(".slick-slide").length))
        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5e3 * _.slideCount)
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children(".slick-slide").length))
        }
        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset)
    };
    Slick.prototype.setFade = function () {
        var _ = this, targetLeft;
        _.$slides.each(function (index, element) {
            targetLeft = _.slideWidth * index * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: "relative",
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                })
            } else {
                $(element).css({
                    position: "relative",
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                })
            }
        });
        _.$slides.eq(_.currentSlide).css({zIndex: _.options.zIndex - 1, opacity: 1})
    };
    Slick.prototype.setHeight = function () {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css("height", targetHeight)
        }
    };
    Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
        var _ = this, l, item, option, value, refresh = false, type;
        if ($.type(arguments[0]) === "object") {
            option = arguments[0];
            refresh = arguments[1];
            type = "multiple"
        } else if ($.type(arguments[0]) === "string") {
            option = arguments[0];
            value = arguments[1];
            refresh = arguments[2];
            if (arguments[0] === "responsive" && $.type(arguments[1]) === "array") {
                type = "responsive"
            } else if (typeof arguments[1] !== "undefined") {
                type = "single"
            }
        }
        if (type === "single") {
            _.options[option] = value
        } else if (type === "multiple") {
            $.each(option, function (opt, val) {
                _.options[opt] = val
            })
        } else if (type === "responsive") {
            for (item in value) {
                if ($.type(_.options.responsive) !== "array") {
                    _.options.responsive = [value[item]]
                } else {
                    l = _.options.responsive.length - 1;
                    while (l >= 0) {
                        if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
                            _.options.responsive.splice(l, 1)
                        }
                        l--
                    }
                    _.options.responsive.push(value[item])
                }
            }
        }
        if (refresh) {
            _.unload();
            _.reinit()
        }
    };
    Slick.prototype.setPosition = function () {
        var _ = this;
        _.setDimensions();
        _.setHeight();
        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide))
        } else {
            _.setFade()
        }
        _.$slider.trigger("setPosition", [_])
    };
    Slick.prototype.setProps = function () {
        var _ = this, bodyStyle = document.body.style;
        _.positionProp = _.options.vertical === true ? "top" : "left";
        if (_.positionProp === "top") {
            _.$slider.addClass("slick-vertical")
        } else {
            _.$slider.removeClass("slick-vertical")
        }
        if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true
            }
        }
        if (_.options.fade) {
            if (typeof _.options.zIndex === "number") {
                if (_.options.zIndex < 3) {
                    _.options.zIndex = 3
                }
            } else {
                _.options.zIndex = _.defaults.zIndex
            }
        }
        if (bodyStyle.OTransform !== undefined) {
            _.animType = "OTransform";
            _.transformType = "-o-transform";
            _.transitionType = "OTransition";
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = "MozTransform";
            _.transformType = "-moz-transform";
            _.transitionType = "MozTransition";
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = "webkitTransform";
            _.transformType = "-webkit-transform";
            _.transitionType = "webkitTransition";
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = "msTransform";
            _.transformType = "-ms-transform";
            _.transitionType = "msTransition";
            if (bodyStyle.msTransform === undefined) _.animType = false
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = "transform";
            _.transformType = "transform";
            _.transitionType = "transition"
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false)
    };
    Slick.prototype.setSlideClasses = function (index) {
        var _ = this, centerOffset, allSlides, indexOffset, remainder;
        allSlides = _.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
        _.$slides.eq(index).addClass("slick-current");
        if (_.options.centerMode === true) {
            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
            centerOffset = Math.floor(_.options.slidesToShow / 2);
            if (_.options.infinite === true) {
                if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
                    _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass("slick-active").attr("aria-hidden", "false")
                } else {
                    indexOffset = _.options.slidesToShow + index;
                    allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass("slick-active").attr("aria-hidden", "false")
                }
                if (index === 0) {
                    allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass("slick-center")
                } else if (index === _.slideCount - 1) {
                    allSlides.eq(_.options.slidesToShow).addClass("slick-center")
                }
            }
            _.$slides.eq(index).addClass("slick-center")
        } else {
            if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
                _.$slides.slice(index, index + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")
            } else if (allSlides.length <= _.options.slidesToShow) {
                allSlides.addClass("slick-active").attr("aria-hidden", "false")
            } else {
                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
                if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
                    allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass("slick-active").attr("aria-hidden", "false")
                } else {
                    allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")
                }
            }
        }
        if (_.options.lazyLoad === "ondemand" || _.options.lazyLoad === "anticipated") {
            _.lazyLoad()
        }
    };
    Slick.prototype.setupInfinite = function () {
        var _ = this, i, slideIndex, infiniteCount;
        if (_.options.fade === true) {
            _.options.centerMode = false
        }
        if (_.options.infinite === true && _.options.fade === false) {
            slideIndex = null;
            if (_.slideCount > _.options.slidesToShow) {
                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1
                } else {
                    infiniteCount = _.options.slidesToShow
                }
                for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr("id", "").attr("data-slick-index", slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass("slick-cloned")
                }
                for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr("id", "").attr("data-slick-index", slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass("slick-cloned")
                }
                _.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                    $(this).attr("id", "")
                })
            }
        }
    };
    Slick.prototype.interrupt = function (toggle) {
        var _ = this;
        if (!toggle) {
            _.autoPlay()
        }
        _.interrupted = toggle
    };
    Slick.prototype.selectHandler = function (event) {
        var _ = this;
        var targetElement = $(event.target).is(".slick-slide") ? $(event.target) : $(event.target).parents(".slick-slide");
        var index = parseInt(targetElement.attr("data-slick-index"));
        if (!index) index = 0;
        if (_.slideCount <= _.options.slidesToShow) {
            _.slideHandler(index, false, true);
            return
        }
        _.slideHandler(index)
    };
    Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null, _ = this, navTarget;
        sync = sync || false;
        if (_.animating === true && _.options.waitForAnimate === true) {
            return
        }
        if (_.options.fade === true && _.currentSlide === index) {
            return
        }
        if (sync === false) {
            _.asNavFor(index)
        }
        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);
        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide)
                    })
                } else {
                    _.postSlide(targetSlide)
                }
            }
            return
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide)
                    })
                } else {
                    _.postSlide(targetSlide)
                }
            }
            return
        }
        if (_.options.autoplay) {
            clearInterval(_.autoPlayTimer)
        }
        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll
            } else {
                animSlide = _.slideCount + targetSlide
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0
            } else {
                animSlide = targetSlide - _.slideCount
            }
        } else {
            animSlide = targetSlide
        }
        _.animating = true;
        _.$slider.trigger("beforeChange", [_, _.currentSlide, animSlide]);
        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;
        _.setSlideClasses(_.currentSlide);
        if (_.options.asNavFor) {
            navTarget = _.getNavTarget();
            navTarget = navTarget.slick("getSlick");
            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                navTarget.setSlideClasses(_.currentSlide)
            }
        }
        _.updateDots();
        _.updateArrows();
        if (_.options.fade === true) {
            if (dontAnimate !== true) {
                _.fadeSlideOut(oldSlide);
                _.fadeSlide(animSlide, function () {
                    _.postSlide(animSlide)
                })
            } else {
                _.postSlide(animSlide)
            }
            _.animateHeight();
            return
        }
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function () {
                _.postSlide(animSlide)
            })
        } else {
            _.postSlide(animSlide)
        }
    };
    Slick.prototype.startLoad = function () {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.hide();
            _.$nextArrow.hide()
        }
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.hide()
        }
        _.$slider.addClass("slick-loading")
    };
    Slick.prototype.swipeDirection = function () {
        var xDist, yDist, r, swipeAngle, _ = this;
        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);
        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle)
        }
        if (swipeAngle <= 45 && swipeAngle >= 0) {
            return _.options.rtl === false ? "left" : "right"
        }
        if (swipeAngle <= 360 && swipeAngle >= 315) {
            return _.options.rtl === false ? "left" : "right"
        }
        if (swipeAngle >= 135 && swipeAngle <= 225) {
            return _.options.rtl === false ? "right" : "left"
        }
        if (_.options.verticalSwiping === true) {
            if (swipeAngle >= 35 && swipeAngle <= 135) {
                return "down"
            } else {
                return "up"
            }
        }
        return "vertical"
    };
    Slick.prototype.swipeEnd = function (event) {
        var _ = this, slideCount, direction;
        _.dragging = false;
        _.swiping = false;
        if (_.scrolling) {
            _.scrolling = false;
            return false
        }
        _.interrupted = false;
        _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;
        if (_.touchObject.curX === undefined) {
            return false
        }
        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger("edge", [_, _.swipeDirection()])
        }
        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
            direction = _.swipeDirection();
            switch (direction) {
                case"left":
                case"down":
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
                    _.currentDirection = 0;
                    break;
                case"right":
                case"up":
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
                    _.currentDirection = 1;
                    break;
                default:
            }
            if (direction != "vertical") {
                _.slideHandler(slideCount);
                _.touchObject = {};
                _.$slider.trigger("swipe", [_, direction])
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {}
            }
        }
    };
    Slick.prototype.swipeHandler = function (event) {
        var _ = this;
        if (_.options.swipe === false || "ontouchend" in document && _.options.swipe === false) {
            return
        } else if (_.options.draggable === false && event.type.indexOf("mouse") !== -1) {
            return
        }
        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
        _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold
        }
        switch (event.data.action) {
            case"start":
                _.swipeStart(event);
                break;
            case"move":
                _.swipeMove(event);
                break;
            case"end":
                _.swipeEnd(event);
                break
        }
    };
    Slick.prototype.swipeMove = function (event) {
        var _ = this, edgeWasHit = false, curLeft, swipeDirection, swipeLength, positionOffset, touches,
            verticalSwipeLength;
        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false
        }
        curLeft = _.getLeft(_.currentSlide);
        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
        verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false
        }
        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength
        }
        swipeDirection = _.swipeDirection();
        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault()
        }
        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1
        }
        swipeLength = _.touchObject.swipeLength;
        _.touchObject.edgeHit = false;
        if (_.options.infinite === false) {
            if (_.currentSlide === 0 && swipeDirection === "right" || _.currentSlide >= _.getDotCount() && swipeDirection === "left") {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true
            }
        }
        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset
        } else {
            _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset
        }
        if (_.options.fade === true || _.options.touchMove === false) {
            return false
        }
        if (_.animating === true) {
            _.swipeLeft = null;
            return false
        }
        _.setCSS(_.swipeLeft)
    };
    Slick.prototype.swipeStart = function (event) {
        var _ = this, touches;
        _.interrupted = true;
        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false
        }
        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0]
        }
        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
        _.dragging = true
    };
    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
        var _ = this;
        if (_.$slidesCache !== null) {
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.appendTo(_.$slideTrack);
            _.reinit()
        }
    };
    Slick.prototype.unload = function () {
        var _ = this;
        $(".slick-cloned", _.$slider).remove();
        if (_.$dots) {
            _.$dots.remove()
        }
        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove()
        }
        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove()
        }
        _.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    };
    Slick.prototype.unslick = function (fromBreakpoint) {
        var _ = this;
        _.$slider.trigger("unslick", [_, fromBreakpoint]);
        _.destroy()
    };
    Slick.prototype.updateArrows = function () {
        var _ = this, centerOffset;
        centerOffset = Math.floor(_.options.slidesToShow / 2);
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
            _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
            if (_.currentSlide === 0) {
                _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
                _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
                _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")
            }
        }
    };
    Slick.prototype.updateDots = function () {
        var _ = this;
        if (_.$dots !== null) {
            _.$dots.find("li").removeClass("slick-active").end();
            _.$dots.find("li").eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass("slick-active")
        }
    };
    Slick.prototype.visibility = function () {
        var _ = this;
        if (_.options.autoplay) {
            if (document[_.hidden]) {
                _.interrupted = true
            } else {
                _.interrupted = false
            }
        }
    };
    $.fn.slick = function () {
        var _ = this, opt = arguments[0], args = Array.prototype.slice.call(arguments, 1), l = _.length, i, ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == "object" || typeof opt == "undefined") _[i].slick = new Slick(_[i], opt); else ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != "undefined") return ret
        }
        return _
    }
});


/*====================================*/

/**
 * Swiper 4.5.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 22, 2019
 */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, function () {
    "use strict";
    var f = "undefined" == typeof document ? {
        body: {}, addEventListener: function () {
        }, removeEventListener: function () {
        }, activeElement: {
            blur: function () {
            }, nodeName: ""
        }, querySelector: function () {
            return null
        }, querySelectorAll: function () {
            return []
        }, getElementById: function () {
            return null
        }, createEvent: function () {
            return {
                initEvent: function () {
                }
            }
        }, createElement: function () {
            return {
                children: [], childNodes: [], style: {}, setAttribute: function () {
                }, getElementsByTagName: function () {
                    return []
                }
            }
        }, location: {hash: ""}
    } : document, J = "undefined" == typeof window ? {
        document: f,
        navigator: {userAgent: ""},
        location: {},
        history: {},
        CustomEvent: function () {
            return this
        },
        addEventListener: function () {
        },
        removeEventListener: function () {
        },
        getComputedStyle: function () {
            return {
                getPropertyValue: function () {
                    return ""
                }
            }
        },
        Image: function () {
        },
        Date: function () {
        },
        screen: {},
        setTimeout: function () {
        },
        clearTimeout: function () {
        }
    } : window, l = function (e) {
        for (var t = 0; t < e.length; t += 1) this[t] = e[t];
        return this.length = e.length, this
    };

    function L(e, t) {
        var a = [], i = 0;
        if (e && !t && e instanceof l) return e;
        if (e) if ("string" == typeof e) {
            var s, r, n = e.trim();
            if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) {
                var o = "div";
                for (0 === n.indexOf("<li") && (o = "ul"), 0 === n.indexOf("<tr") && (o = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"), 0 === n.indexOf("<tbody") && (o = "table"), 0 === n.indexOf("<option") && (o = "select"), (r = f.createElement(o)).innerHTML = n, i = 0; i < r.childNodes.length; i += 1) a.push(r.childNodes[i])
            } else for (s = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split("#")[1])], i = 0; i < s.length; i += 1) s[i] && a.push(s[i])
        } else if (e.nodeType || e === J || e === f) a.push(e); else if (0 < e.length && e[0].nodeType) for (i = 0; i < e.length; i += 1) a.push(e[i]);
        return new l(a)
    }

    function r(e) {
        for (var t = [], a = 0; a < e.length; a += 1) -1 === t.indexOf(e[a]) && t.push(e[a]);
        return t
    }

    L.fn = l.prototype, L.Class = l, L.Dom7 = l;
    var t = {
        addClass: function (e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), a = 0; a < t.length; a += 1) for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[a]);
            return this
        }, removeClass: function (e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1) for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[a]);
            return this
        }, hasClass: function (e) {
            return !!this[0] && this[0].classList.contains(e)
        }, toggleClass: function (e) {
            for (var t = e.split(" "), a = 0; a < t.length; a += 1) for (var i = 0; i < this.length; i += 1) void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[a]);
            return this
        }, attr: function (e, t) {
            var a = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var i = 0; i < this.length; i += 1) if (2 === a.length) this[i].setAttribute(e, t); else for (var s in e) this[i][s] = e[s], this[i].setAttribute(s, e[s]);
            return this
        }, removeAttr: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        }, data: function (e, t) {
            var a;
            if (void 0 !== t) {
                for (var i = 0; i < this.length; i += 1) (a = this[i]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}), a.dom7ElementDataStorage[e] = t;
                return this
            }
            if (a = this[0]) {
                if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage) return a.dom7ElementDataStorage[e];
                var s = a.getAttribute("data-" + e);
                return s || void 0
            }
        }, transform: function (e) {
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransform = e, a.transform = e
            }
            return this
        }, transition: function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var a = this[t].style;
                a.webkitTransitionDuration = e, a.transitionDuration = e
            }
            return this
        }, on: function () {
            for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
            var i = t[0], r = t[1], n = t[2], s = t[3];

            function o(e) {
                var t = e.target;
                if (t) {
                    var a = e.target.dom7EventData || [];
                    if (a.indexOf(e) < 0 && a.unshift(e), L(t).is(r)) n.apply(t, a); else for (var i = L(t).parents(), s = 0; s < i.length; s += 1) L(i[s]).is(r) && n.apply(i[s], a)
                }
            }

            function l(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t)
            }

            "function" == typeof t[1] && (i = (e = t)[0], n = e[1], s = e[2], r = void 0), s || (s = !1);
            for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r) for (d = 0; d < p.length; d += 1) {
                    var h = p[d];
                    u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []), u.dom7LiveListeners[h].push({
                        listener: n,
                        proxyListener: o
                    }), u.addEventListener(h, o, s)
                } else for (d = 0; d < p.length; d += 1) {
                    var v = p[d];
                    u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[v] || (u.dom7Listeners[v] = []), u.dom7Listeners[v].push({
                        listener: n,
                        proxyListener: l
                    }), u.addEventListener(v, l, s)
                }
            }
            return this
        }, off: function () {
            for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
            var i = t[0], s = t[1], r = t[2], n = t[3];
            "function" == typeof t[1] && (i = (e = t)[0], r = e[1], n = e[2], s = void 0), n || (n = !1);
            for (var o = i.split(" "), l = 0; l < o.length; l += 1) for (var d = o[l], p = 0; p < this.length; p += 1) {
                var c = this[p], u = void 0;
                if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]), u && u.length) for (var h = u.length - 1; 0 <= h; h -= 1) {
                    var v = u[h];
                    r && v.listener === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1))
                }
            }
            return this
        }, trigger: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1) for (var r = a[s], n = 0; n < this.length; n += 1) {
                var o = this[n], l = void 0;
                try {
                    l = new J.CustomEvent(r, {detail: i, bubbles: !0, cancelable: !0})
                } catch (e) {
                    (l = f.createEvent("Event")).initEvent(r, !0, !0), l.detail = i
                }
                o.dom7EventData = e.filter(function (e, t) {
                    return 0 < t
                }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData
            }
            return this
        }, transitionEnd: function (t) {
            var a, i = ["webkitTransitionEnd", "transitionend"], s = this;

            function r(e) {
                if (e.target === this) for (t.call(this, e), a = 0; a < i.length; a += 1) s.off(i[a], r)
            }

            if (t) for (a = 0; a < i.length; a += 1) s.on(i[a], r);
            return this
        }, outerWidth: function (e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        }, outerHeight: function (e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        }, offset: function () {
            if (0 < this.length) {
                var e = this[0], t = e.getBoundingClientRect(), a = f.body, i = e.clientTop || a.clientTop || 0,
                    s = e.clientLeft || a.clientLeft || 0, r = e === J ? J.scrollY : e.scrollTop,
                    n = e === J ? J.scrollX : e.scrollLeft;
                return {top: t.top + r - i, left: t.left + n - s}
            }
            return null
        }, css: function (e, t) {
            var a;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (a = 0; a < this.length; a += 1) for (var i in e) this[a].style[i] = e[i];
                    return this
                }
                if (this[0]) return J.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
                return this
            }
            return this
        }, each: function (e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        }, html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        }, text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        }, is: function (e) {
            var t, a, i = this[0];
            if (!i || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (i.matches) return i.matches(e);
                if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
                if (i.msMatchesSelector) return i.msMatchesSelector(e);
                for (t = L(e), a = 0; a < t.length; a += 1) if (t[a] === i) return !0;
                return !1
            }
            if (e === f) return i === f;
            if (e === J) return i === J;
            if (e.nodeType || e instanceof l) {
                for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1) if (t[a] === i) return !0;
                return !1
            }
            return !1
        }, index: function () {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        }, eq: function (e) {
            if (void 0 === e) return this;
            var t, a = this.length;
            return new l(a - 1 < e ? [] : e < 0 ? (t = a + e) < 0 ? [] : [this[t]] : [this[e]])
        }, append: function () {
            for (var e, t = [], a = arguments.length; a--;) t[a] = arguments[a];
            for (var i = 0; i < t.length; i += 1) {
                e = t[i];
                for (var s = 0; s < this.length; s += 1) if ("string" == typeof e) {
                    var r = f.createElement("div");
                    for (r.innerHTML = e; r.firstChild;) this[s].appendChild(r.firstChild)
                } else if (e instanceof l) for (var n = 0; n < e.length; n += 1) this[s].appendChild(e[n]); else this[s].appendChild(e)
            }
            return this
        }, prepend: function (e) {
            var t, a;
            for (t = 0; t < this.length; t += 1) if ("string" == typeof e) {
                var i = f.createElement("div");
                for (i.innerHTML = e, a = i.childNodes.length - 1; 0 <= a; a -= 1) this[t].insertBefore(i.childNodes[a], this[t].childNodes[0])
            } else if (e instanceof l) for (a = 0; a < e.length; a += 1) this[t].insertBefore(e[a], this[t].childNodes[0]); else this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        }, next: function (e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([])
        }, nextAll: function (e) {
            var t = [], a = this[0];
            if (!a) return new l([]);
            for (; a.nextElementSibling;) {
                var i = a.nextElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return new l(t)
        }, prev: function (e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([])
            }
            return new l([])
        }, prevAll: function (e) {
            var t = [], a = this[0];
            if (!a) return new l([]);
            for (; a.previousElementSibling;) {
                var i = a.previousElementSibling;
                e ? L(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return new l(t)
        }, parent: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1) null !== this[a].parentNode && (e ? L(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
            return L(r(t))
        }, parents: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1) for (var i = this[a].parentNode; i;) e ? L(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
            return L(r(t))
        }, closest: function (e) {
            var t = this;
            return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        }, find: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1) for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1) t.push(i[s]);
            return new l(t)
        }, children: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1) for (var i = this[a].childNodes, s = 0; s < i.length; s += 1) e ? 1 === i[s].nodeType && L(i[s]).is(e) && t.push(i[s]) : 1 === i[s].nodeType && t.push(i[s]);
            return new l(r(t))
        }, remove: function () {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }, add: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var a, i;
            for (a = 0; a < e.length; a += 1) {
                var s = L(e[a]);
                for (i = 0; i < s.length; i += 1) this[this.length] = s[i], this.length += 1
            }
            return this
        }, styles: function () {
            return this[0] ? J.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(t).forEach(function (e) {
        L.fn[e] = t[e]
    });
    var e, a, i, s, ee = {
        deleteProps: function (e) {
            var t = e;
            Object.keys(t).forEach(function (e) {
                try {
                    t[e] = null
                } catch (e) {
                }
                try {
                    delete t[e]
                } catch (e) {
                }
            })
        }, nextTick: function (e, t) {
            return void 0 === t && (t = 0), setTimeout(e, t)
        }, now: function () {
            return Date.now()
        }, getTranslate: function (e, t) {
            var a, i, s;
            void 0 === t && (t = "x");
            var r = J.getComputedStyle(e, null);
            return J.WebKitCSSMatrix ? (6 < (i = r.transform || r.webkitTransform).split(",").length && (i = i.split(", ").map(function (e) {
                return e.replace(",", ".")
            }).join(", ")), s = new J.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = J.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = J.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
        }, parseUrlQuery: function (e) {
            var t, a, i, s, r = {}, n = e || J.location.href;
            if ("string" == typeof n && n.length) for (s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
                return "" !== e
            })).length, t = 0; t < s; t += 1) i = a[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(i[0])] = void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "";
            return r
        }, isObject: function (e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        }, extend: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
                var s = e[i];
                if (null != s) for (var r = Object.keys(Object(s)), n = 0, o = r.length; n < o; n += 1) {
                    var l = r[n], d = Object.getOwnPropertyDescriptor(s, l);
                    void 0 !== d && d.enumerable && (ee.isObject(a[l]) && ee.isObject(s[l]) ? ee.extend(a[l], s[l]) : !ee.isObject(a[l]) && ee.isObject(s[l]) ? (a[l] = {}, ee.extend(a[l], s[l])) : a[l] = s[l])
                }
            }
            return a
        }
    }, te = (i = f.createElement("div"), {
        touch: J.Modernizr && !0 === J.Modernizr.touch || !!(0 < J.navigator.maxTouchPoints || "ontouchstart" in J || J.DocumentTouch && f instanceof J.DocumentTouch),
        pointerEvents: !!(J.navigator.pointerEnabled || J.PointerEvent || "maxTouchPoints" in J.navigator && 0 < J.navigator.maxTouchPoints),
        prefixedPointerEvents: !!J.navigator.msPointerEnabled,
        transition: (a = i.style, "transition" in a || "webkitTransition" in a || "MozTransition" in a),
        transforms3d: J.Modernizr && !0 === J.Modernizr.csstransforms3d || (e = i.style, "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e),
        flexbox: function () {
            for (var e = i.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a += 1) if (t[a] in e) return !0;
            return !1
        }(),
        observer: "MutationObserver" in J || "WebkitMutationObserver" in J,
        passiveListener: function () {
            var e = !1;
            try {
                var t = Object.defineProperty({}, "passive", {
                    get: function () {
                        e = !0
                    }
                });
                J.addEventListener("testPassiveListener", null, t)
            } catch (e) {
            }
            return e
        }(),
        gestures: "ongesturestart" in J
    }), I = {
        isIE: !!J.navigator.userAgent.match(/Trident/g) || !!J.navigator.userAgent.match(/MSIE/g),
        isEdge: !!J.navigator.userAgent.match(/Edge/g),
        isSafari: (s = J.navigator.userAgent.toLowerCase(), 0 <= s.indexOf("safari") && s.indexOf("chrome") < 0 && s.indexOf("android") < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(J.navigator.userAgent)
    }, n = function (e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function (e) {
            t.on(e, t.params.on[e])
        })
    }, o = {components: {configurable: !0}};
    n.prototype.on = function (e, t, a) {
        var i = this;
        if ("function" != typeof t) return i;
        var s = a ? "unshift" : "push";
        return e.split(" ").forEach(function (e) {
            i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t)
        }), i
    }, n.prototype.once = function (a, i, e) {
        var s = this;
        if ("function" != typeof i) return s;

        function r() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            i.apply(s, e), s.off(a, r), r.f7proxy && delete r.f7proxy
        }

        return r.f7proxy = i, s.on(a, r, e)
    }, n.prototype.off = function (e, i) {
        var s = this;
        return s.eventsListeners && e.split(" ").forEach(function (a) {
            void 0 === i ? s.eventsListeners[a] = [] : s.eventsListeners[a] && s.eventsListeners[a].length && s.eventsListeners[a].forEach(function (e, t) {
                (e === i || e.f7proxy && e.f7proxy === i) && s.eventsListeners[a].splice(t, 1)
            })
        }), s
    }, n.prototype.emit = function () {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var a, i, s, r = this;
        return r.eventsListeners && ("string" == typeof e[0] || Array.isArray(e[0]) ? (a = e[0], i = e.slice(1, e.length), s = r) : (a = e[0].events, i = e[0].data, s = e[0].context || r), (Array.isArray(a) ? a : a.split(" ")).forEach(function (e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach(function (e) {
                    t.push(e)
                }), t.forEach(function (e) {
                    e.apply(s, i)
                })
            }
        })), r
    }, n.prototype.useModulesParams = function (a) {
        var i = this;
        i.modules && Object.keys(i.modules).forEach(function (e) {
            var t = i.modules[e];
            t.params && ee.extend(a, t.params)
        })
    }, n.prototype.useModules = function (i) {
        void 0 === i && (i = {});
        var s = this;
        s.modules && Object.keys(s.modules).forEach(function (e) {
            var a = s.modules[e], t = i[e] || {};
            a.instance && Object.keys(a.instance).forEach(function (e) {
                var t = a.instance[e];
                s[e] = "function" == typeof t ? t.bind(s) : t
            }), a.on && s.on && Object.keys(a.on).forEach(function (e) {
                s.on(e, a.on[e])
            }), a.create && a.create.bind(s)(t)
        })
    }, o.components.set = function (e) {
        this.use && this.use(e)
    }, n.installModule = function (t) {
        for (var e = [], a = arguments.length - 1; 0 < a--;) e[a] = arguments[a + 1];
        var i = this;
        i.prototype.modules || (i.prototype.modules = {});
        var s = t.name || Object.keys(i.prototype.modules).length + "_" + ee.now();
        return (i.prototype.modules[s] = t).proto && Object.keys(t.proto).forEach(function (e) {
            i.prototype[e] = t.proto[e]
        }), t.static && Object.keys(t.static).forEach(function (e) {
            i[e] = t.static[e]
        }), t.install && t.install.apply(i, e), i
    }, n.use = function (e) {
        for (var t = [], a = arguments.length - 1; 0 < a--;) t[a] = arguments[a + 1];
        var i = this;
        return Array.isArray(e) ? (e.forEach(function (e) {
            return i.installModule(e)
        }), i) : i.installModule.apply(i, [e].concat(t))
    }, Object.defineProperties(n, o);
    var d = {
        updateSize: function () {
            var e, t, a = this, i = a.$el;
            e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), ee.extend(a, {
                width: e,
                height: t,
                size: a.isHorizontal() ? e : t
            }))
        }, updateSlides: function () {
            var e = this, t = e.params, a = e.$wrapperEl, i = e.size, s = e.rtlTranslate, r = e.wrongRTL,
                n = e.virtual && t.virtual.enabled, o = n ? e.virtual.slides.length : e.slides.length,
                l = a.children("." + e.params.slideClass), d = n ? e.virtual.slides.length : l.length, p = [], c = [],
                u = [], h = t.slidesOffsetBefore;
            "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
            var v = t.slidesOffsetAfter;
            "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
            var f = e.snapGrid.length, m = e.snapGrid.length, g = t.spaceBetween, b = -h, w = 0, y = 0;
            if (void 0 !== i) {
                var x, T;
                "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * i), e.virtualSize = -g, s ? l.css({
                    marginLeft: "",
                    marginTop: ""
                }) : l.css({
                    marginRight: "",
                    marginBottom: ""
                }), 1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
                for (var E, S = t.slidesPerColumn, C = x / S, M = Math.floor(d / t.slidesPerColumn), z = 0; z < d; z += 1) {
                    T = 0;
                    var P = l.eq(z);
                    if (1 < t.slidesPerColumn) {
                        var k = void 0, $ = void 0, L = void 0;
                        "column" === t.slidesPerColumnFill ? (L = z - ($ = Math.floor(z / S)) * S, (M < $ || $ === M && L === S - 1) && S <= (L += 1) && (L = 0, $ += 1), k = $ + L * x / S, P.css({
                            "-webkit-box-ordinal-group": k,
                            "-moz-box-ordinal-group": k,
                            "-ms-flex-order": k,
                            "-webkit-order": k,
                            order: k
                        })) : $ = z - (L = Math.floor(z / C)) * C, P.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== L && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", $).attr("data-swiper-row", L)
                    }
                    if ("none" !== P.css("display")) {
                        if ("auto" === t.slidesPerView) {
                            var I = J.getComputedStyle(P[0], null), D = P[0].style.transform,
                                O = P[0].style.webkitTransform;
                            if (D && (P[0].style.transform = "none"), O && (P[0].style.webkitTransform = "none"), t.roundLengths) T = e.isHorizontal() ? P.outerWidth(!0) : P.outerHeight(!0); else if (e.isHorizontal()) {
                                var A = parseFloat(I.getPropertyValue("width")),
                                    H = parseFloat(I.getPropertyValue("padding-left")),
                                    N = parseFloat(I.getPropertyValue("padding-right")),
                                    G = parseFloat(I.getPropertyValue("margin-left")),
                                    B = parseFloat(I.getPropertyValue("margin-right")),
                                    X = I.getPropertyValue("box-sizing");
                                T = X && "border-box" === X ? A + G + B : A + H + N + G + B
                            } else {
                                var Y = parseFloat(I.getPropertyValue("height")),
                                    V = parseFloat(I.getPropertyValue("padding-top")),
                                    F = parseFloat(I.getPropertyValue("padding-bottom")),
                                    R = parseFloat(I.getPropertyValue("margin-top")),
                                    q = parseFloat(I.getPropertyValue("margin-bottom")),
                                    W = I.getPropertyValue("box-sizing");
                                T = W && "border-box" === W ? Y + R + q : Y + V + F + R + q
                            }
                            D && (P[0].style.transform = D), O && (P[0].style.webkitTransform = O), t.roundLengths && (T = Math.floor(T))
                        } else T = (i - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), l[z] && (e.isHorizontal() ? l[z].style.width = T + "px" : l[z].style.height = T + "px");
                        l[z] && (l[z].swiperSlideSize = T), u.push(T), t.centeredSlides ? (b = b + T / 2 + w / 2 + g, 0 === w && 0 !== z && (b = b - i / 2 - g), 0 === z && (b = b - i / 2 - g), Math.abs(b) < .001 && (b = 0), t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b)) : (t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b), b = b + T + g), e.virtualSize += T + g, w = T, y += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, i) + v, s && r && ("slide" === t.effect || "coverflow" === t.effect) && a.css({width: e.virtualSize + t.spaceBetween + "px"}), te.flexbox && !t.setWrapperSize || (e.isHorizontal() ? a.css({width: e.virtualSize + t.spaceBetween + "px"}) : a.css({height: e.virtualSize + t.spaceBetween + "px"})), 1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? a.css({width: e.virtualSize + t.spaceBetween + "px"}) : a.css({height: e.virtualSize + t.spaceBetween + "px"}), t.centeredSlides)) {
                    E = [];
                    for (var j = 0; j < p.length; j += 1) {
                        var U = p[j];
                        t.roundLengths && (U = Math.floor(U)), p[j] < e.virtualSize + p[0] && E.push(U)
                    }
                    p = E
                }
                if (!t.centeredSlides) {
                    E = [];
                    for (var K = 0; K < p.length; K += 1) {
                        var _ = p[K];
                        t.roundLengths && (_ = Math.floor(_)), p[K] <= e.virtualSize - i && E.push(_)
                    }
                    p = E, 1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - i)
                }
                if (0 === p.length && (p = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? s ? l.css({marginLeft: g + "px"}) : l.css({marginRight: g + "px"}) : l.css({marginBottom: g + "px"})), t.centerInsufficientSlides) {
                    var Z = 0;
                    if (u.forEach(function (e) {
                        Z += e + (t.spaceBetween ? t.spaceBetween : 0)
                    }), (Z -= t.spaceBetween) < i) {
                        var Q = (i - Z) / 2;
                        p.forEach(function (e, t) {
                            p[t] = e - Q
                        }), c.forEach(function (e, t) {
                            c[t] = e + Q
                        })
                    }
                }
                ee.extend(e, {
                    slides: l,
                    snapGrid: p,
                    slidesGrid: c,
                    slidesSizesGrid: u
                }), d !== o && e.emit("slidesLengthChange"), p.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), c.length !== m && e.emit("slidesGridLengthChange"), (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset()
            }
        }, updateAutoHeight: function (e) {
            var t, a = this, i = [], s = 0;
            if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), "auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView) for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
                var r = a.activeIndex + t;
                if (r > a.slides.length) break;
                i.push(a.slides.eq(r)[0])
            } else i.push(a.slides.eq(a.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1) if (void 0 !== i[t]) {
                var n = i[t].offsetHeight;
                s = s < n ? n : s
            }
            s && a.$wrapperEl.css("height", s + "px")
        }, updateSlidesOffset: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        }, updateSlidesProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this, a = t.params, i = t.slides, s = t.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                var r = -e;
                s && (r = e), i.removeClass(a.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n],
                        l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween);
                    if (a.watchSlidesVisibility) {
                        var d = -(r - o.swiperSlideOffset), p = d + t.slidesSizesGrid[n];
                        (0 <= d && d < t.size || 0 < p && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(n), i.eq(n).addClass(a.slideVisibleClass))
                    }
                    o.progress = s ? -l : l
                }
                t.visibleSlides = L(t.visibleSlides)
            }
        }, updateProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this, a = t.params, i = t.maxTranslate() - t.minTranslate(), s = t.progress, r = t.isBeginning,
                n = t.isEnd, o = r, l = n;
            0 === i ? n = r = !(s = 0) : (r = (s = (e - t.minTranslate()) / i) <= 0, n = 1 <= s), ee.extend(t, {
                progress: s,
                isBeginning: r,
                isEnd: n
            }), (a.watchSlidesProgress || a.watchSlidesVisibility) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !l && t.emit("reachEnd toEdge"), (o && !r || l && !n) && t.emit("fromEdge"), t.emit("progress", s)
        }, updateSlidesClasses: function () {
            var e, t = this, a = t.slides, i = t.params, s = t.$wrapperEl, r = t.activeIndex, n = t.realIndex,
                o = t.virtual && i.virtual.enabled;
            a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
            var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
            var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        }, updateActiveIndex: function (e) {
            var t, a = this, i = a.rtlTranslate ? a.translate : -a.translate, s = a.slidesGrid, r = a.snapGrid,
                n = a.params, o = a.activeIndex, l = a.realIndex, d = a.snapIndex, p = e;
            if (void 0 === p) {
                for (var c = 0; c < s.length; c += 1) void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
                n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
            }
            if ((t = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(p / n.slidesPerGroup)) >= r.length && (t = r.length - 1), p !== o) {
                var u = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                ee.extend(a, {
                    snapIndex: t,
                    realIndex: u,
                    previousIndex: o,
                    activeIndex: p
                }), a.emit("activeIndexChange"), a.emit("snapIndexChange"), l !== u && a.emit("realIndexChange"), a.emit("slideChange")
            } else t !== d && (a.snapIndex = t, a.emit("snapIndexChange"))
        }, updateClickedSlide: function (e) {
            var t = this, a = t.params, i = L(e.target).closest("." + a.slideClass)[0], s = !1;
            if (i) for (var r = 0; r < t.slides.length; r += 1) t.slides[r] === i && (s = !0);
            if (!i || !s) return t.clickedSlide = void 0, void (t.clickedIndex = void 0);
            t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = L(i).index(), a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    };
    var p = {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params, a = this.rtlTranslate, i = this.translate, s = this.$wrapperEl;
            if (t.virtualTranslate) return a ? -i : i;
            var r = ee.getTranslate(s[0], e);
            return a && (r = -r), r || 0
        }, setTranslate: function (e, t) {
            var a = this, i = a.rtlTranslate, s = a.params, r = a.$wrapperEl, n = a.progress, o = 0, l = 0;
            a.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.virtualTranslate || (te.transforms3d ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)") : r.transform("translate(" + o + "px, " + l + "px)")), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? o : l;
            var d = a.maxTranslate() - a.minTranslate();
            (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e), a.emit("setTranslate", a.translate, t)
        }, minTranslate: function () {
            return -this.snapGrid[0]
        }, maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    };
    var c = {
        setTransition: function (e, t) {
            this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        }, transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            var a = this, i = a.activeIndex, s = a.params, r = a.previousIndex;
            s.autoHeight && a.updateAutoHeight();
            var n = t;
            if (n || (n = r < i ? "next" : i < r ? "prev" : "reset"), a.emit("transitionStart"), e && i !== r) {
                if ("reset" === n) return void a.emit("slideResetTransitionStart");
                a.emit("slideChangeTransitionStart"), "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
            }
        }, transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            var a = this, i = a.activeIndex, s = a.previousIndex;
            a.animating = !1, a.setTransition(0);
            var r = t;
            if (r || (r = s < i ? "next" : i < s ? "prev" : "reset"), a.emit("transitionEnd"), e && i !== s) {
                if ("reset" === r) return void a.emit("slideResetTransitionEnd");
                a.emit("slideChangeTransitionEnd"), "next" === r ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
            }
        }
    };
    var u = {
        slideTo: function (e, t, a, i) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
            var s = this, r = e;
            r < 0 && (r = 0);
            var n = s.params, o = s.snapGrid, l = s.slidesGrid, d = s.previousIndex, p = s.activeIndex,
                c = s.rtlTranslate;
            if (s.animating && n.preventInteractionOnTransition) return !1;
            var u = Math.floor(r / n.slidesPerGroup);
            u >= o.length && (u = o.length - 1), (p || n.initialSlide || 0) === (d || 0) && a && s.emit("beforeSlideChangeStart");
            var h, v = -o[u];
            if (s.updateProgress(v), n.normalizeSlideIndex) for (var f = 0; f < l.length; f += 1) -Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
            if (s.initialized && r !== p) {
                if (!s.allowSlideNext && v < s.translate && v < s.minTranslate()) return !1;
                if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r) return !1
            }
            return h = p < r ? "next" : r < p ? "prev" : "reset", c && -v === s.translate || !c && v === s.translate ? (s.updateActiveIndex(r), n.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== n.effect && s.setTranslate(v), "reset" !== h && (s.transitionStart(a, h), s.transitionEnd(a, h)), !1) : (0 !== t && te.transition ? (s.setTransition(t), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function (e) {
                s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(a, h))
            }), s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.transitionEnd(a, h)), !0)
        }, slideToLoop: function (e, t, a, i) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
            var s = e;
            return this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, a, i)
        }, slideNext: function (e, t, a) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var i = this, s = i.params, r = i.animating;
            return s.loop ? !r && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)
        }, slidePrev: function (e, t, a) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var i = this, s = i.params, r = i.animating, n = i.snapGrid, o = i.slidesGrid, l = i.rtlTranslate;
            if (s.loop) {
                if (r) return !1;
                i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
            }

            function d(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }

            var p, c = d(l ? i.translate : -i.translate), u = n.map(function (e) {
                return d(e)
            }), h = (o.map(function (e) {
                return d(e)
            }), n[u.indexOf(c)], n[u.indexOf(c) - 1]);
            return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1), i.slideTo(p, e, t, a)
        }, slideReset: function (e, t, a) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a)
        }, slideToClosest: function (e, t, a) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var i = this, s = i.activeIndex, r = Math.floor(s / i.params.slidesPerGroup);
            if (r < i.snapGrid.length - 1) {
                var n = i.rtlTranslate ? i.translate : -i.translate, o = i.snapGrid[r];
                (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup)
            }
            return i.slideTo(s, e, t, a)
        }, slideToClickedSlide: function () {
            var e, t = this, a = t.params, i = t.$wrapperEl,
                s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView, r = t.clickedIndex;
            if (a.loop) {
                if (t.animating) return;
                e = parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), ee.nextTick(function () {
                    t.slideTo(r)
                })) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), ee.nextTick(function () {
                    t.slideTo(r)
                })) : t.slideTo(r)
            } else t.slideTo(r)
        }
    };
    var h = {
        loopCreate: function () {
            var i = this, e = i.params, t = i.$wrapperEl;
            t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
            var s = t.children("." + e.slideClass);
            if (e.loopFillGroupWithBlank) {
                var a = e.slidesPerGroup - s.length % e.slidesPerGroup;
                if (a !== e.slidesPerGroup) {
                    for (var r = 0; r < a; r += 1) {
                        var n = L(f.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                        t.append(n)
                    }
                    s = t.children("." + e.slideClass)
                }
            }
            "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = s.length), i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), i.loopedSlides += e.loopAdditionalSlides, i.loopedSlides > s.length && (i.loopedSlides = s.length);
            var o = [], l = [];
            s.each(function (e, t) {
                var a = L(t);
                e < i.loopedSlides && l.push(t), e < s.length && e >= s.length - i.loopedSlides && o.push(t), a.attr("data-swiper-slide-index", e)
            });
            for (var d = 0; d < l.length; d += 1) t.append(L(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
            for (var p = o.length - 1; 0 <= p; p -= 1) t.prepend(L(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass))
        }, loopFix: function () {
            var e, t = this, a = t.params, i = t.activeIndex, s = t.slides, r = t.loopedSlides, n = t.allowSlidePrev,
                o = t.allowSlideNext, l = t.snapGrid, d = t.rtlTranslate;
            t.allowSlidePrev = !0, t.allowSlideNext = !0;
            var p = -l[i] - t.getTranslate();
            i < r ? (e = s.length - 3 * r + i, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p)) : ("auto" === a.slidesPerView && 2 * r <= i || i >= s.length - r) && (e = -s.length + i + r, e += r, t.slideTo(e, 0, !1, !0) && 0 !== p && t.setTranslate((d ? -t.translate : t.translate) - p));
            t.allowSlidePrev = n, t.allowSlideNext = o
        }, loopDestroy: function () {
            var e = this.$wrapperEl, t = this.params, a = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), a.removeAttr("data-swiper-slide-index")
        }
    };
    var v = {
        setGrabCursor: function (e) {
            if (!(te.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
            }
        }, unsetGrabCursor: function () {
            te.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    };
    var m = {
        appendSlide: function (e) {
            var t = this, a = t.$wrapperEl, i = t.params;
            if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e) for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]); else a.append(e);
            i.loop && t.loopCreate(), i.observer && te.observer || t.update()
        }, prependSlide: function (e) {
            var t = this, a = t.params, i = t.$wrapperEl, s = t.activeIndex;
            a.loop && t.loopDestroy();
            var r = s + 1;
            if ("object" == typeof e && "length" in e) {
                for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
                r = s + e.length
            } else i.prepend(e);
            a.loop && t.loopCreate(), a.observer && te.observer || t.update(), t.slideTo(r, 0, !1)
        }, addSlide: function (e, t) {
            var a = this, i = a.$wrapperEl, s = a.params, r = a.activeIndex;
            s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children("." + s.slideClass));
            var n = a.slides.length;
            if (e <= 0) a.prependSlide(t); else if (n <= e) a.appendSlide(t); else {
                for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) {
                    var p = a.slides.eq(d);
                    p.remove(), l.unshift(p)
                }
                if ("object" == typeof t && "length" in t) {
                    for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
                    o = e < r ? r + t.length : r
                } else i.append(t);
                for (var u = 0; u < l.length; u += 1) i.append(l[u]);
                s.loop && a.loopCreate(), s.observer && te.observer || a.update(), s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1)
            }
        }, removeSlide: function (e) {
            var t = this, a = t.params, i = t.$wrapperEl, s = t.activeIndex;
            a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + a.slideClass));
            var r, n = s;
            if ("object" == typeof e && "length" in e) {
                for (var o = 0; o < e.length; o += 1) r = e[o], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
                n = Math.max(n, 0)
            } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);
            a.loop && t.loopCreate(), a.observer && te.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
        }, removeAllSlides: function () {
            for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
            this.removeSlide(e)
        }
    }, g = function () {
        var e = J.navigator.userAgent, t = {
                ios: !1,
                android: !1,
                androidChrome: !1,
                desktop: !1,
                windows: !1,
                iphone: !1,
                ipod: !1,
                ipad: !1,
                cordova: J.cordova || J.phonegap,
                phonegap: J.cordova || J.phonegap
            }, a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/), i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
            s = e.match(/(iPad).*OS\s([\d_]+)/), r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
            n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (a && (t.os = "windows", t.osVersion = a[2], t.windows = !0), i && !a && (t.os = "android", t.osVersion = i[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")), (s || n || r) && (t.os = "ios", t.ios = !0), n && !r && (t.osVersion = n[2].replace(/_/g, "."), t.iphone = !0), s && (t.osVersion = s[2].replace(/_/g, "."), t.ipad = !0), r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) {
            var o = t.osVersion.split("."), l = f.querySelector('meta[name="viewport"]');
            t.minimalUi = !t.webView && (r || n) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui")
        }
        return t.pixelRatio = J.devicePixelRatio || 1, t
    }();

    function b() {
        var e = this, t = e.params, a = e.el;
        if (!a || 0 !== a.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var i = e.allowSlideNext, s = e.allowSlidePrev, r = e.snapGrid;
            if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
                var n = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight()
            } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }
    }

    var w = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsInverse: !1,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        }, y = {
            update: d, translate: p, transition: c, slide: u, loop: h, grabCursor: v, manipulation: m, events: {
                attachEvents: function () {
                    var e = this, t = e.params, a = e.touchEvents, i = e.el, s = e.wrapperEl;
                    e.onTouchStart = function (e) {
                        var t = this, a = t.touchEventsData, i = t.params, s = t.touches;
                        if (!t.animating || !i.preventInteractionOnTransition) {
                            var r = e;
                            if (r.originalEvent && (r = r.originalEvent), a.isTouchEvent = "touchstart" === r.type, (a.isTouchEvent || !("which" in r) || 3 !== r.which) && !(!a.isTouchEvent && "button" in r && 0 < r.button || a.isTouched && a.isMoved)) if (i.noSwiping && L(r.target).closest(i.noSwipingSelector ? i.noSwipingSelector : "." + i.noSwipingClass)[0]) t.allowClick = !0; else if (!i.swipeHandler || L(r).closest(i.swipeHandler)[0]) {
                                s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX, s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
                                var n = s.currentX, o = s.currentY, l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection,
                                    d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;
                                if (!l || !(n <= d || n >= J.screen.width - d)) {
                                    if (ee.extend(a, {
                                        isTouched: !0,
                                        isMoved: !1,
                                        allowTouchCallbacks: !0,
                                        isScrolling: void 0,
                                        startMoving: void 0
                                    }), s.startX = n, s.startY = o, a.touchStartTime = ee.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, 0 < i.threshold && (a.allowThresholdMove = !1), "touchstart" !== r.type) {
                                        var p = !0;
                                        L(r.target).is(a.formElements) && (p = !1), f.activeElement && L(f.activeElement).is(a.formElements) && f.activeElement !== r.target && f.activeElement.blur();
                                        var c = p && t.allowTouchMove && i.touchStartPreventDefault;
                                        (i.touchStartForcePreventDefault || c) && r.preventDefault()
                                    }
                                    t.emit("touchStart", r)
                                }
                            }
                        }
                    }.bind(e), e.onTouchMove = function (e) {
                        var t = this, a = t.touchEventsData, i = t.params, s = t.touches, r = t.rtlTranslate, n = e;
                        if (n.originalEvent && (n = n.originalEvent), a.isTouched) {
                            if (!a.isTouchEvent || "mousemove" !== n.type) {
                                var o = "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX,
                                    l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY;
                                if (n.preventedByNestedSwiper) return s.startX = o, void (s.startY = l);
                                if (!t.allowTouchMove) return t.allowClick = !1, void (a.isTouched && (ee.extend(s, {
                                    startX: o,
                                    startY: l,
                                    currentX: o,
                                    currentY: l
                                }), a.touchStartTime = ee.now()));
                                if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop) if (t.isVertical()) {
                                    if (l < s.startY && t.translate <= t.maxTranslate() || l > s.startY && t.translate >= t.minTranslate()) return a.isTouched = !1, void (a.isMoved = !1)
                                } else if (o < s.startX && t.translate <= t.maxTranslate() || o > s.startX && t.translate >= t.minTranslate()) return;
                                if (a.isTouchEvent && f.activeElement && n.target === f.activeElement && L(n.target).is(a.formElements)) return a.isMoved = !0, void (t.allowClick = !1);
                                if (a.allowTouchCallbacks && t.emit("touchMove", n), !(n.targetTouches && 1 < n.targetTouches.length)) {
                                    s.currentX = o, s.currentY = l;
                                    var d, p = s.currentX - s.startX, c = s.currentY - s.startY;
                                    if (!(t.params.threshold && Math.sqrt(Math.pow(p, 2) + Math.pow(c, 2)) < t.params.threshold)) if (void 0 === a.isScrolling && (t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= p * p + c * c && (d = 180 * Math.atan2(Math.abs(c), Math.abs(p)) / Math.PI, a.isScrolling = t.isHorizontal() ? d > i.touchAngle : 90 - d > i.touchAngle)), a.isScrolling && t.emit("touchMoveOpposite", n), void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)), a.isScrolling) a.isTouched = !1; else if (a.startMoving) {
                                        t.allowClick = !1, n.preventDefault(), i.touchMoveStopPropagation && !i.nested && n.stopPropagation(), a.isMoved || (i.loop && t.loopFix(), a.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = !1, !i.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", n)), t.emit("sliderMove", n), a.isMoved = !0;
                                        var u = t.isHorizontal() ? p : c;
                                        s.diff = u, u *= i.touchRatio, r && (u = -u), t.swipeDirection = 0 < u ? "prev" : "next", a.currentTranslate = u + a.startTranslate;
                                        var h = !0, v = i.resistanceRatio;
                                        if (i.touchReleaseOnEdges && (v = 0), 0 < u && a.currentTranslate > t.minTranslate() ? (h = !1, i.resistance && (a.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + a.startTranslate + u, v))) : u < 0 && a.currentTranslate < t.maxTranslate() && (h = !1, i.resistance && (a.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - a.startTranslate - u, v))), h && (n.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), 0 < i.threshold) {
                                            if (!(Math.abs(u) > i.threshold || a.allowThresholdMove)) return void (a.currentTranslate = a.startTranslate);
                                            if (!a.allowThresholdMove) return a.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, a.currentTranslate = a.startTranslate, void (s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                                        }
                                        i.followFinger && ((i.freeMode || i.watchSlidesProgress || i.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && (0 === a.velocities.length && a.velocities.push({
                                            position: s[t.isHorizontal() ? "startX" : "startY"],
                                            time: a.touchStartTime
                                        }), a.velocities.push({
                                            position: s[t.isHorizontal() ? "currentX" : "currentY"],
                                            time: ee.now()
                                        })), t.updateProgress(a.currentTranslate), t.setTranslate(a.currentTranslate))
                                    }
                                }
                            }
                        } else a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n)
                    }.bind(e), e.onTouchEnd = function (e) {
                        var t = this, a = t.touchEventsData, i = t.params, s = t.touches, r = t.rtlTranslate,
                            n = t.$wrapperEl, o = t.slidesGrid, l = t.snapGrid, d = e;
                        if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void (a.startMoving = !1);
                        i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        var p, c = ee.now(), u = c - a.touchStartTime;
                        if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), u < 300 && 300 < c - a.lastClickTime && (a.clickTimeout && clearTimeout(a.clickTimeout), a.clickTimeout = ee.nextTick(function () {
                            t && !t.destroyed && t.emit("click", d)
                        }, 300)), u < 300 && c - a.lastClickTime < 300 && (a.clickTimeout && clearTimeout(a.clickTimeout), t.emit("doubleTap", d))), a.lastClickTime = ee.now(), ee.nextTick(function () {
                            t.destroyed || (t.allowClick = !0)
                        }), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void (a.startMoving = !1);
                        if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, i.freeMode) {
                            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                            if (p > -t.maxTranslate()) return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                            if (i.freeModeMomentum) {
                                if (1 < a.velocities.length) {
                                    var h = a.velocities.pop(), v = a.velocities.pop(), f = h.position - v.position,
                                        m = h.time - v.time;
                                    t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (150 < m || 300 < ee.now() - h.time) && (t.velocity = 0)
                                } else t.velocity = 0;
                                t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0;
                                var g = 1e3 * i.freeModeMomentumRatio, b = t.velocity * g, w = t.translate + b;
                                r && (w = -w);
                                var y, x, T = !1, E = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
                                if (w < t.maxTranslate()) i.freeModeMomentumBounce ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E), y = t.maxTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.maxTranslate(), i.loop && i.centeredSlides && (x = !0); else if (w > t.minTranslate()) i.freeModeMomentumBounce ? (w - t.minTranslate() > E && (w = t.minTranslate() + E), y = t.minTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.minTranslate(), i.loop && i.centeredSlides && (x = !0); else if (i.freeModeSticky) {
                                    for (var S, C = 0; C < l.length; C += 1) if (l[C] > -w) {
                                        S = C;
                                        break
                                    }
                                    w = -(w = Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) || "next" === t.swipeDirection ? l[S] : l[S - 1])
                                }
                                if (x && t.once("transitionEnd", function () {
                                    t.loopFix()
                                }), 0 !== t.velocity) g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity); else if (i.freeModeSticky) return void t.slideToClosest();
                                i.freeModeMomentumBounce && T ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function () {
                                    t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), t.setTranslate(y), n.transitionEnd(function () {
                                        t && !t.destroyed && t.transitionEnd()
                                    }))
                                })) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function () {
                                    t && !t.destroyed && t.transitionEnd()
                                }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
                            } else if (i.freeModeSticky) return void t.slideToClosest();
                            (!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                        } else {
                            for (var M = 0, z = t.slidesSizesGrid[0], P = 0; P < o.length; P += i.slidesPerGroup) void 0 !== o[P + i.slidesPerGroup] ? p >= o[P] && p < o[P + i.slidesPerGroup] && (z = o[(M = P) + i.slidesPerGroup] - o[P]) : p >= o[P] && (M = P, z = o[o.length - 1] - o[o.length - 2]);
                            var k = (p - o[M]) / z;
                            if (u > i.longSwipesMs) {
                                if (!i.longSwipes) return void t.slideTo(t.activeIndex);
                                "next" === t.swipeDirection && (k >= i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (k > 1 - i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M))
                            } else {
                                if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
                                "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M)
                            }
                        }
                    }.bind(e), e.onClick = function (e) {
                        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                    }.bind(e);
                    var r = "container" === t.touchEventsTarget ? i : s, n = !!t.nested;
                    if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                        if (te.touch) {
                            var o = !("touchstart" !== a.start || !te.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            r.addEventListener(a.start, e.onTouchStart, o), r.addEventListener(a.move, e.onTouchMove, te.passiveListener ? {
                                passive: !1,
                                capture: n
                            } : n), r.addEventListener(a.end, e.onTouchEnd, o)
                        }
                        (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !te.touch && g.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1), f.addEventListener("mousemove", e.onTouchMove, n), f.addEventListener("mouseup", e.onTouchEnd, !1))
                    } else r.addEventListener(a.start, e.onTouchStart, !1), f.addEventListener(a.move, e.onTouchMove, n), f.addEventListener(a.end, e.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0), e.on(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b, !0)
                }, detachEvents: function () {
                    var e = this, t = e.params, a = e.touchEvents, i = e.el, s = e.wrapperEl,
                        r = "container" === t.touchEventsTarget ? i : s, n = !!t.nested;
                    if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                        if (te.touch) {
                            var o = !("onTouchStart" !== a.start || !te.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            r.removeEventListener(a.start, e.onTouchStart, o), r.removeEventListener(a.move, e.onTouchMove, n), r.removeEventListener(a.end, e.onTouchEnd, o)
                        }
                        (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !te.touch && g.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1), f.removeEventListener("mousemove", e.onTouchMove, n), f.removeEventListener("mouseup", e.onTouchEnd, !1))
                    } else r.removeEventListener(a.start, e.onTouchStart, !1), f.removeEventListener(a.move, e.onTouchMove, n), f.removeEventListener(a.end, e.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0), e.off(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b)
                }
            }, breakpoints: {
                setBreakpoint: function () {
                    var e = this, t = e.activeIndex, a = e.initialized, i = e.loopedSlides;
                    void 0 === i && (i = 0);
                    var s = e.params, r = s.breakpoints;
                    if (r && (!r || 0 !== Object.keys(r).length)) {
                        var n = e.getBreakpoint(r);
                        if (n && e.currentBreakpoint !== n) {
                            var o = n in r ? r[n] : void 0;
                            o && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(function (e) {
                                var t = o[e];
                                void 0 !== t && (o[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                            });
                            var l = o || e.originalParams, d = l.direction && l.direction !== s.direction,
                                p = s.loop && (l.slidesPerView !== s.slidesPerView || d);
                            d && a && e.changeDirection(), ee.extend(e.params, l), ee.extend(e, {
                                allowTouchMove: e.params.allowTouchMove,
                                allowSlideNext: e.params.allowSlideNext,
                                allowSlidePrev: e.params.allowSlidePrev
                            }), e.currentBreakpoint = n, p && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", l)
                        }
                    }
                }, getBreakpoint: function (e) {
                    if (e) {
                        var t = !1, a = [];
                        Object.keys(e).forEach(function (e) {
                            a.push(e)
                        }), a.sort(function (e, t) {
                            return parseInt(e, 10) - parseInt(t, 10)
                        });
                        for (var i = 0; i < a.length; i += 1) {
                            var s = a[i];
                            this.params.breakpointsInverse ? s <= J.innerWidth && (t = s) : s >= J.innerWidth && !t && (t = s)
                        }
                        return t || "max"
                    }
                }
            }, checkOverflow: {
                checkOverflow: function () {
                    var e = this, t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update())
                }
            }, classes: {
                addClasses: function () {
                    var t = this.classNames, a = this.params, e = this.rtl, i = this.$el, s = [];
                    s.push("initialized"), s.push(a.direction), a.freeMode && s.push("free-mode"), te.flexbox || s.push("no-flexbox"), a.autoHeight && s.push("autoheight"), e && s.push("rtl"), 1 < a.slidesPerColumn && s.push("multirow"), g.android && s.push("android"), g.ios && s.push("ios"), (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && s.push("wp8-" + a.direction), s.forEach(function (e) {
                        t.push(a.containerModifierClass + e)
                    }), i.addClass(t.join(" "))
                }, removeClasses: function () {
                    var e = this.$el, t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            }, images: {
                loadImage: function (e, t, a, i, s, r) {
                    var n;

                    function o() {
                        r && r()
                    }

                    e.complete && s ? o() : t ? ((n = new J.Image).onload = o, n.onerror = o, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : o()
                }, preloadImages: function () {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }

                    e.imagesToLoad = e.$el.find("img");
                    for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                        var i = e.imagesToLoad[a];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                    }
                }
            }
        }, x = {}, T = function (u) {
            function h() {
                for (var e, t, s, a = [], i = arguments.length; i--;) a[i] = arguments[i];
                1 === a.length && a[0].constructor && a[0].constructor === Object ? s = a[0] : (t = (e = a)[0], s = e[1]), s || (s = {}), s = ee.extend({}, s), t && !s.el && (s.el = t), u.call(this, s), Object.keys(y).forEach(function (t) {
                    Object.keys(y[t]).forEach(function (e) {
                        h.prototype[e] || (h.prototype[e] = y[t][e])
                    })
                });
                var r = this;
                void 0 === r.modules && (r.modules = {}), Object.keys(r.modules).forEach(function (e) {
                    var t = r.modules[e];
                    if (t.params) {
                        var a = Object.keys(t.params)[0], i = t.params[a];
                        if ("object" != typeof i || null === i) return;
                        if (!(a in s && "enabled" in i)) return;
                        !0 === s[a] && (s[a] = {enabled: !0}), "object" != typeof s[a] || "enabled" in s[a] || (s[a].enabled = !0), s[a] || (s[a] = {enabled: !1})
                    }
                });
                var n = ee.extend({}, w);
                r.useModulesParams(n), r.params = ee.extend({}, n, x, s), r.originalParams = ee.extend({}, r.params), r.passedParams = ee.extend({}, s);
                var o = (r.$ = L)(r.params.el);
                if (t = o[0]) {
                    if (1 < o.length) {
                        var l = [];
                        return o.each(function (e, t) {
                            var a = ee.extend({}, s, {el: t});
                            l.push(new h(a))
                        }), l
                    }
                    t.swiper = r, o.data("swiper", r);
                    var d, p, c = o.children("." + r.params.wrapperClass);
                    return ee.extend(r, {
                        $el: o,
                        el: t,
                        $wrapperEl: c,
                        wrapperEl: c[0],
                        classNames: [],
                        slides: L(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                            return "horizontal" === r.params.direction
                        },
                        isVertical: function () {
                            return "vertical" === r.params.direction
                        },
                        rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
                        rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
                        wrongRTL: "-webkit-box" === c.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: r.params.allowSlideNext,
                        allowSlidePrev: r.params.allowSlidePrev,
                        touchEvents: (d = ["touchstart", "touchmove", "touchend"], p = ["mousedown", "mousemove", "mouseup"], te.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : te.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), r.touchEventsTouch = {
                            start: d[0],
                            move: d[1],
                            end: d[2]
                        }, r.touchEventsDesktop = {
                            start: p[0],
                            move: p[1],
                            end: p[2]
                        }, te.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: ee.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: r.params.allowTouchMove,
                        touches: {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0},
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), r.useModules(), r.params.init && r.init(), r
                }
            }

            u && (h.__proto__ = u);
            var e = {
                extendedDefaults: {configurable: !0},
                defaults: {configurable: !0},
                Class: {configurable: !0},
                $: {configurable: !0}
            };
            return ((h.prototype = Object.create(u && u.prototype)).constructor = h).prototype.slidesPerViewDynamic = function () {
                var e = this, t = e.params, a = e.slides, i = e.slidesGrid, s = e.size, r = e.activeIndex, n = 1;
                if (t.centeredSlides) {
                    for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) a[d] && !o && (n += 1, s < (l += a[d].swiperSlideSize) && (o = !0));
                    for (var p = r - 1; 0 <= p; p -= 1) a[p] && !o && (n += 1, s < (l += a[p].swiperSlideSize) && (o = !0))
                } else for (var c = r + 1; c < a.length; c += 1) i[c] - i[r] < s && (n += 1);
                return n
            }, h.prototype.update = function () {
                var a = this;
                if (a && !a.destroyed) {
                    var e = a.snapGrid, t = a.params;
                    t.breakpoints && a.setBreakpoint(), a.updateSize(), a.updateSlides(), a.updateProgress(), a.updateSlidesClasses(), a.params.freeMode ? (i(), a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || i(), t.watchOverflow && e !== a.snapGrid && a.checkOverflow(), a.emit("update")
                }

                function i() {
                    var e = a.rtlTranslate ? -1 * a.translate : a.translate,
                        t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
                    a.setTranslate(t), a.updateActiveIndex(), a.updateSlidesClasses()
                }
            }, h.prototype.changeDirection = function (a, e) {
                void 0 === e && (e = !0);
                var t = this, i = t.params.direction;
                return a || (a = "horizontal" === i ? "vertical" : "horizontal"), a === i || "horizontal" !== a && "vertical" !== a || ("vertical" === i && (t.$el.removeClass(t.params.containerModifierClass + "vertical wp8-vertical").addClass("" + t.params.containerModifierClass + a), (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + a)), "horizontal" === i && (t.$el.removeClass(t.params.containerModifierClass + "horizontal wp8-horizontal").addClass("" + t.params.containerModifierClass + a), (I.isIE || I.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + a)), t.params.direction = a, t.slides.each(function (e, t) {
                    "vertical" === a ? t.style.width = "" : t.style.height = ""
                }), t.emit("changeDirection"), e && t.update()), t
            }, h.prototype.init = function () {
                var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
            }, h.prototype.destroy = function (e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var a = this, i = a.params, s = a.$el, r = a.$wrapperEl, n = a.slides;
                return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"), a.initialized = !1, a.detachEvents(), i.loop && a.loopDestroy(), t && (a.removeClasses(), s.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), a.emit("destroy"), Object.keys(a.eventsListeners).forEach(function (e) {
                    a.off(e)
                }), !1 !== e && (a.$el[0].swiper = null, a.$el.data("swiper", null), ee.deleteProps(a)), a.destroyed = !0), null
            }, h.extendDefaults = function (e) {
                ee.extend(x, e)
            }, e.extendedDefaults.get = function () {
                return x
            }, e.defaults.get = function () {
                return w
            }, e.Class.get = function () {
                return u
            }, e.$.get = function () {
                return L
            }, Object.defineProperties(h, e), h
        }(n), E = {name: "device", proto: {device: g}, static: {device: g}},
        S = {name: "support", proto: {support: te}, static: {support: te}},
        C = {name: "browser", proto: {browser: I}, static: {browser: I}}, M = {
            name: "resize", create: function () {
                var e = this;
                ee.extend(e, {
                    resize: {
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        }, orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            }, on: {
                init: function () {
                    J.addEventListener("resize", this.resize.resizeHandler), J.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                }, destroy: function () {
                    J.removeEventListener("resize", this.resize.resizeHandler), J.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        }, z = {
            func: J.MutationObserver || J.WebkitMutationObserver, attach: function (e, t) {
                void 0 === t && (t = {});
                var a = this, i = new z.func(function (e) {
                    if (1 !== e.length) {
                        var t = function () {
                            a.emit("observerUpdate", e[0])
                        };
                        J.requestAnimationFrame ? J.requestAnimationFrame(t) : J.setTimeout(t, 0)
                    } else a.emit("observerUpdate", e[0])
                });
                i.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), a.observer.observers.push(i)
            }, init: function () {
                var e = this;
                if (te.observer && e.params.observer) {
                    if (e.params.observeParents) for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) e.observer.attach(t[a]);
                    e.observer.attach(e.$el[0], {childList: e.params.observeSlideChildren}), e.observer.attach(e.$wrapperEl[0], {attributes: !1})
                }
            }, destroy: function () {
                this.observer.observers.forEach(function (e) {
                    e.disconnect()
                }), this.observer.observers = []
            }
        }, P = {
            name: "observer",
            params: {observer: !1, observeParents: !1, observeSlideChildren: !1},
            create: function () {
                ee.extend(this, {
                    observer: {
                        init: z.init.bind(this),
                        attach: z.attach.bind(this),
                        destroy: z.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function () {
                    this.observer.init()
                }, destroy: function () {
                    this.observer.destroy()
                }
            }
        }, k = {
            update: function (e) {
                var t = this, a = t.params, i = a.slidesPerView, s = a.slidesPerGroup, r = a.centeredSlides,
                    n = t.params.virtual, o = n.addSlidesBefore, l = n.addSlidesAfter, d = t.virtual, p = d.from, c = d.to,
                    u = d.slides, h = d.slidesGrid, v = d.renderSlide, f = d.offset;
                t.updateActiveIndex();
                var m, g, b, w = t.activeIndex || 0;
                m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (g = Math.floor(i / 2) + s + o, b = Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o, b = s + l);
                var y = Math.max((w || 0) - b, 0), x = Math.min((w || 0) + g, u.length - 1),
                    T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);

                function E() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }

                if (ee.extend(t.virtual, {
                    from: y,
                    to: x,
                    offset: T,
                    slidesGrid: t.slidesGrid
                }), p === y && c === x && !e) return t.slidesGrid !== h && T !== f && t.slides.css(m, T + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: T,
                    from: y,
                    to: x,
                    slides: function () {
                        for (var e = [], t = y; t <= x; t += 1) e.push(u[t]);
                        return e
                    }()
                }), void E();
                var S = [], C = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove(); else for (var M = p; M <= c; M += 1) (M < y || x < M) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + M + '"]').remove();
                for (var z = 0; z < u.length; z += 1) y <= z && z <= x && (void 0 === c || e ? C.push(z) : (c < z && C.push(z), z < p && S.push(z)));
                C.forEach(function (e) {
                    t.$wrapperEl.append(v(u[e], e))
                }), S.sort(function (e, t) {
                    return t - e
                }).forEach(function (e) {
                    t.$wrapperEl.prepend(v(u[e], e))
                }), t.$wrapperEl.children(".swiper-slide").css(m, T + "px"), E()
            }, renderSlide: function (e, t) {
                var a = this, i = a.params.virtual;
                if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
                var s = i.renderSlide ? L(i.renderSlide.call(a, e, t)) : L('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s
            }, appendSlide: function (e) {
                if ("object" == typeof e && "length" in e) for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]); else this.virtual.slides.push(e);
                this.virtual.update(!0)
            }, prependSlide: function (e) {
                var t = this, a = t.activeIndex, i = a + 1, s = 1;
                if (Array.isArray(e)) {
                    for (var r = 0; r < e.length; r += 1) e[r] && t.virtual.slides.unshift(e[r]);
                    i = a + e.length, s = e.length
                } else t.virtual.slides.unshift(e);
                if (t.params.virtual.cache) {
                    var n = t.virtual.cache, o = {};
                    Object.keys(n).forEach(function (e) {
                        o[parseInt(e, 10) + s] = n[e]
                    }), t.virtual.cache = o
                }
                t.virtual.update(!0), t.slideTo(i, 0)
            }, removeSlide: function (e) {
                var t = this;
                if (null != e) {
                    var a = t.activeIndex;
                    if (Array.isArray(e)) for (var i = e.length - 1; 0 <= i; i -= 1) t.virtual.slides.splice(e[i], 1), t.params.virtual.cache && delete t.virtual.cache[e[i]], e[i] < a && (a -= 1), a = Math.max(a, 0); else t.virtual.slides.splice(e, 1), t.params.virtual.cache && delete t.virtual.cache[e], e < a && (a -= 1), a = Math.max(a, 0);
                    t.virtual.update(!0), t.slideTo(a, 0)
                }
            }, removeAllSlides: function () {
                var e = this;
                e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), e.slideTo(0, 0)
            }
        }, $ = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function () {
                var e = this;
                ee.extend(e, {
                    virtual: {
                        update: k.update.bind(e),
                        appendSlide: k.appendSlide.bind(e),
                        prependSlide: k.prependSlide.bind(e),
                        removeSlide: k.removeSlide.bind(e),
                        removeAllSlides: k.removeAllSlides.bind(e),
                        renderSlide: k.renderSlide.bind(e),
                        slides: e.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    if (e.params.virtual.enabled) {
                        e.classNames.push(e.params.containerModifierClass + "virtual");
                        var t = {watchSlidesProgress: !0};
                        ee.extend(e.params, t), ee.extend(e.originalParams, t), e.params.initialSlide || e.virtual.update()
                    }
                }, setTranslate: function () {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        }, D = {
            handle: function (e) {
                var t = this, a = t.rtlTranslate, i = e;
                i.originalEvent && (i = i.originalEvent);
                var s = i.keyCode || i.charCode;
                if (!t.allowSlideNext && (t.isHorizontal() && 39 === s || t.isVertical() && 40 === s)) return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && 37 === s || t.isVertical() && 38 === s)) return !1;
                if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (37 === s || 39 === s || 38 === s || 40 === s)) {
                        var r = !1;
                        if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                        var n = J.innerWidth, o = J.innerHeight, l = t.$el.offset();
                        a && (l.left -= t.$el[0].scrollLeft);
                        for (var d = [[l.left, l.top], [l.left + t.width, l.top], [l.left, l.top + t.height], [l.left + t.width, l.top + t.height]], p = 0; p < d.length; p += 1) {
                            var c = d[p];
                            0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0)
                        }
                        if (!r) return
                    }
                    t.isHorizontal() ? (37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (39 === s && !a || 37 === s && a) && t.slideNext(), (37 === s && !a || 39 === s && a) && t.slidePrev()) : (38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), 40 === s && t.slideNext(), 38 === s && t.slidePrev()), t.emit("keyPress", s)
                }
            }, enable: function () {
                this.keyboard.enabled || (L(f).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            }, disable: function () {
                this.keyboard.enabled && (L(f).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        }, O = {
            name: "keyboard", params: {keyboard: {enabled: !1, onlyInViewport: !0}}, create: function () {
                ee.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: D.enable.bind(this),
                        disable: D.disable.bind(this),
                        handle: D.handle.bind(this)
                    }
                })
            }, on: {
                init: function () {
                    this.params.keyboard.enabled && this.keyboard.enable()
                }, destroy: function () {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        };
    var A = {
        lastScrollTime: ee.now(),
        event: -1 < J.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function () {
            var e = "onwheel", t = e in f;
            if (!t) {
                var a = f.createElement("div");
                a.setAttribute(e, "return;"), t = "function" == typeof a[e]
            }
            return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature("", "") && (t = f.implementation.hasFeature("Events.wheel", "3.0")), t
        }() ? "wheel" : "mousewheel",
        normalize: function (e) {
            var t = 0, a = 0, i = 0, s = 0;
            return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
                spinX: t,
                spinY: a,
                pixelX: i,
                pixelY: s
            }
        },
        handleMouseEnter: function () {
            this.mouseEntered = !0
        },
        handleMouseLeave: function () {
            this.mouseEntered = !1
        },
        handle: function (e) {
            var t = e, a = this, i = a.params.mousewheel;
            if (!a.mouseEntered && !i.releaseOnEdges) return !0;
            t.originalEvent && (t = t.originalEvent);
            var s = 0, r = a.rtlTranslate ? -1 : 1, n = A.normalize(t);
            if (i.forceToAxis) if (a.isHorizontal()) {
                if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return !0;
                s = n.pixelX * r
            } else {
                if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return !0;
                s = n.pixelY
            } else s = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY;
            if (0 === s) return !0;
            if (i.invert && (s = -s), a.params.freeMode) {
                a.params.loop && a.loopFix();
                var o = a.getTranslate() + s * i.sensitivity, l = a.isBeginning, d = a.isEnd;
                if (o >= a.minTranslate() && (o = a.minTranslate()), o <= a.maxTranslate() && (o = a.maxTranslate()), a.setTransition(0), a.setTranslate(o), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!l && a.isBeginning || !d && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky && (clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = ee.nextTick(function () {
                    a.slideToClosest()
                }, 300)), a.emit("scroll", t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), o === a.minTranslate() || o === a.maxTranslate()) return !0
            } else {
                if (60 < ee.now() - a.mousewheel.lastScrollTime) if (s < 0) if (a.isEnd && !a.params.loop || a.animating) {
                    if (i.releaseOnEdges) return !0
                } else a.slideNext(), a.emit("scroll", t); else if (a.isBeginning && !a.params.loop || a.animating) {
                    if (i.releaseOnEdges) return !0
                } else a.slidePrev(), a.emit("scroll", t);
                a.mousewheel.lastScrollTime = (new J.Date).getTime()
            }
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
        },
        enable: function () {
            var e = this;
            if (!A.event) return !1;
            if (e.mousewheel.enabled) return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(A.event, e.mousewheel.handle), e.mousewheel.enabled = !0
        },
        disable: function () {
            var e = this;
            if (!A.event) return !1;
            if (!e.mousewheel.enabled) return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = L(e.params.mousewheel.eventsTarged)), t.off(A.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1)
        }
    }, H = {
        update: function () {
            var e = this, t = e.params.navigation;
            if (!e.params.loop) {
                var a = e.navigation, i = a.$nextEl, s = a.$prevEl;
                s && 0 < s.length && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && 0 < i.length && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
            }
        }, onPrevClick: function (e) {
            e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
        }, onNextClick: function (e) {
            e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
        }, init: function () {
            var e, t, a = this, i = a.params.navigation;
            (i.nextEl || i.prevEl) && (i.nextEl && (e = L(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = L(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && 0 < e.length && e.on("click", a.navigation.onNextClick), t && 0 < t.length && t.on("click", a.navigation.onPrevClick), ee.extend(a.navigation, {
                $nextEl: e,
                nextEl: e && e[0],
                $prevEl: t,
                prevEl: t && t[0]
            }))
        }, destroy: function () {
            var e = this, t = e.navigation, a = t.$nextEl, i = t.$prevEl;
            a && a.length && (a.off("click", e.navigation.onNextClick), a.removeClass(e.params.navigation.disabledClass)), i && i.length && (i.off("click", e.navigation.onPrevClick), i.removeClass(e.params.navigation.disabledClass))
        }
    }, N = {
        update: function () {
            var e = this, t = e.rtl, s = e.params.pagination;
            if (s.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var r, a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                    i = e.pagination.$el,
                    n = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides), n - 1 < r && (r -= n), r < 0 && "bullets" !== e.params.paginationType && (r = n + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                    var o, l, d, p = e.pagination.bullets;
                    if (s.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), i.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"), 1 < s.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = s.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = r - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) + o) / 2), p.removeClass(s.bulletActiveClass + " " + s.bulletActiveClass + "-next " + s.bulletActiveClass + "-next-next " + s.bulletActiveClass + "-prev " + s.bulletActiveClass + "-prev-prev " + s.bulletActiveClass + "-main"), 1 < i.length) p.each(function (e, t) {
                        var a = L(t), i = a.index();
                        i === r && a.addClass(s.bulletActiveClass), s.dynamicBullets && (o <= i && i <= l && a.addClass(s.bulletActiveClass + "-main"), i === o && a.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), i === l && a.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next"))
                    }); else if (p.eq(r).addClass(s.bulletActiveClass), s.dynamicBullets) {
                        for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1) p.eq(h).addClass(s.bulletActiveClass + "-main");
                        c.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), u.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next")
                    }
                    if (s.dynamicBullets) {
                        var v = Math.min(p.length, s.dynamicMainBullets + 4),
                            f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                            m = t ? "right" : "left";
                        p.css(e.isHorizontal() ? m : "top", f + "px")
                    }
                }
                if ("fraction" === s.type && (i.find("." + s.currentClass).text(s.formatFractionCurrent(r + 1)), i.find("." + s.totalClass).text(s.formatFractionTotal(n))), "progressbar" === s.type) {
                    var g;
                    g = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                    var b = (r + 1) / n, w = 1, y = 1;
                    "horizontal" === g ? w = b : y = b, i.find("." + s.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed)
                }
                "custom" === s.type && s.renderCustom ? (i.html(s.renderCustom(e, r + 1, n)), e.emit("paginationRender", e, i[0])) : e.emit("paginationUpdate", e, i[0]), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](s.lockClass)
            }
        }, render: function () {
            var e = this, t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                    i = e.pagination.$el, s = "";
                if ("bullets" === t.type) {
                    for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1) t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                    i.html(s), e.pagination.bullets = i.find("." + t.bulletClass)
                }
                "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
            }
        }, init: function () {
            var a = this, e = a.params.pagination;
            if (e.el) {
                var t = L(e.el);
                0 !== t.length && (a.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === a.$el.find(e.el).length && (t = a.$el.find(e.el)), "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), a.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), e.clickable && t.on("click", "." + e.bulletClass, function (e) {
                    e.preventDefault();
                    var t = L(this).index() * a.params.slidesPerGroup;
                    a.params.loop && (t += a.loopedSlides), a.slideTo(t)
                }), ee.extend(a.pagination, {$el: t, el: t[0]}))
            }
        }, destroy: function () {
            var e = this, t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var a = e.pagination.$el;
                a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", "." + t.bulletClass)
            }
        }
    }, G = {
        setTranslate: function () {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar, a = e.rtlTranslate, i = e.progress, s = t.dragSize, r = t.trackSize, n = t.$dragEl,
                    o = t.$el, l = e.params.scrollbar, d = s, p = (r - s) * i;
                a ? 0 < (p = -p) ? (d = s - p, p = 0) : r < -p + s && (d = r + p) : p < 0 ? (d = s + p, p = 0) : r < p + s && (d = r - p), e.isHorizontal() ? (te.transforms3d ? n.transform("translate3d(" + p + "px, 0, 0)") : n.transform("translateX(" + p + "px)"), n[0].style.width = d + "px") : (te.transforms3d ? n.transform("translate3d(0px, " + p + "px, 0)") : n.transform("translateY(" + p + "px)"), n[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(function () {
                    o[0].style.opacity = 0, o.transition(400)
                }, 1e3))
            }
        }, setTransition: function (e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
        }, updateSize: function () {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar, a = t.$dragEl, i = t.$el;
                a[0].style.width = "", a[0].style.height = "";
                var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, n = e.size / e.virtualSize,
                    o = n * (r / e.size);
                s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = 1 <= n ? "none" : "", e.params.scrollbar.hide && (i[0].style.opacity = 0), ee.extend(t, {
                    trackSize: r,
                    divider: n,
                    moveDivider: o,
                    dragSize: s
                }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
            }
        }, setDragPosition: function (e) {
            var t, a = this, i = a.scrollbar, s = a.rtlTranslate, r = i.$el, n = i.dragSize, o = i.trackSize;
            t = ((a.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - r.offset()[a.isHorizontal() ? "left" : "top"] - n / 2) / (o - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
            var l = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
            a.updateProgress(l), a.setTranslate(l), a.updateActiveIndex(), a.updateSlidesClasses()
        }, onDragStart: function (e) {
            var t = this, a = t.params.scrollbar, i = t.scrollbar, s = t.$wrapperEl, r = i.$el, n = i.$dragEl;
            t.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.emit("scrollbarDragStart", e)
        }, onDragMove: function (e) {
            var t = this.scrollbar, a = this.$wrapperEl, i = t.$el, s = t.$dragEl;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), a.transition(0), i.transition(0), s.transition(0), this.emit("scrollbarDragMove", e))
        }, onDragEnd: function (e) {
            var t = this, a = t.params.scrollbar, i = t.scrollbar.$el;
            t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = ee.nextTick(function () {
                i.css("opacity", 0), i.transition(400)
            }, 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest())
        }, enableDraggable: function () {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar, a = e.touchEventsTouch, i = e.touchEventsDesktop, s = e.params, r = t.$el[0],
                    n = !(!te.passiveListener || !s.passiveListeners) && {passive: !1, capture: !1},
                    o = !(!te.passiveListener || !s.passiveListeners) && {passive: !0, capture: !1};
                te.touch ? (r.addEventListener(a.start, e.scrollbar.onDragStart, n), r.addEventListener(a.move, e.scrollbar.onDragMove, n), r.addEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.addEventListener(i.start, e.scrollbar.onDragStart, n), f.addEventListener(i.move, e.scrollbar.onDragMove, n), f.addEventListener(i.end, e.scrollbar.onDragEnd, o))
            }
        }, disableDraggable: function () {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar, a = e.touchEventsTouch, i = e.touchEventsDesktop, s = e.params, r = t.$el[0],
                    n = !(!te.passiveListener || !s.passiveListeners) && {passive: !1, capture: !1},
                    o = !(!te.passiveListener || !s.passiveListeners) && {passive: !0, capture: !1};
                te.touch ? (r.removeEventListener(a.start, e.scrollbar.onDragStart, n), r.removeEventListener(a.move, e.scrollbar.onDragMove, n), r.removeEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n), f.removeEventListener(i.move, e.scrollbar.onDragMove, n), f.removeEventListener(i.end, e.scrollbar.onDragEnd, o))
            }
        }, init: function () {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar, a = e.$el, i = e.params.scrollbar, s = L(i.el);
                e.params.uniqueNavElements && "string" == typeof i.el && 1 < s.length && 1 === a.find(i.el).length && (s = a.find(i.el));
                var r = s.find("." + e.params.scrollbar.dragClass);
                0 === r.length && (r = L('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), ee.extend(t, {
                    $el: s,
                    el: s[0],
                    $dragEl: r,
                    dragEl: r[0]
                }), i.draggable && t.enableDraggable()
            }
        }, destroy: function () {
            this.scrollbar.disableDraggable()
        }
    }, B = {
        setTransform: function (e, t) {
            var a = this.rtl, i = L(e), s = a ? -1 : 1, r = i.attr("data-swiper-parallax") || "0",
                n = i.attr("data-swiper-parallax-x"), o = i.attr("data-swiper-parallax-y"),
                l = i.attr("data-swiper-parallax-scale"), d = i.attr("data-swiper-parallax-opacity");
            if (n || o ? (n = n || "0", o = o || "0") : this.isHorizontal() ? (n = r, o = "0") : (o = r, n = "0"), n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) {
                var p = d - (d - 1) * (1 - Math.abs(t));
                i[0].style.opacity = p
            }
            if (null == l) i.transform("translate3d(" + n + ", " + o + ", 0px)"); else {
                var c = l - (l - 1) * (1 - Math.abs(t));
                i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")")
            }
        }, setTranslate: function () {
            var i = this, e = i.$el, t = i.slides, s = i.progress, r = i.snapGrid;
            e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, t) {
                i.parallax.setTransform(t, s)
            }), t.each(function (e, t) {
                var a = t.progress;
                1 < i.params.slidesPerGroup && "auto" !== i.params.slidesPerView && (a += Math.ceil(e / 2) - s * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), L(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, t) {
                    i.parallax.setTransform(t, a)
                })
            })
        }, setTransition: function (s) {
            void 0 === s && (s = this.params.speed);
            this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (e, t) {
                var a = L(t), i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
                0 === s && (i = 0), a.transition(i)
            })
        }
    }, X = {
        getDistanceBetweenTouches: function (e) {
            if (e.targetTouches.length < 2) return 1;
            var t = e.targetTouches[0].pageX, a = e.targetTouches[0].pageY, i = e.targetTouches[1].pageX,
                s = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
        }, onGestureStart: function (e) {
            var t = this, a = t.params.zoom, i = t.zoom, s = i.gesture;
            if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !te.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                i.fakeGestureTouched = !0, s.scaleStart = X.getDistanceBetweenTouches(e)
            }
            s.$slideEl && s.$slideEl.length || (s.$slideEl = L(e.target).closest(".swiper-slide"), 0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), t.zoom.isScaling = !0) : s.$imageEl = void 0
        }, onGestureChange: function (e) {
            var t = this.params.zoom, a = this.zoom, i = a.gesture;
            if (!te.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                a.fakeGestureMoved = !0, i.scaleMove = X.getDistanceBetweenTouches(e)
            }
            i.$imageEl && 0 !== i.$imageEl.length && (a.scale = te.gestures ? e.scale * a.currentScale : i.scaleMove / i.scaleStart * a.currentScale, a.scale > i.maxRatio && (a.scale = i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, .5)), a.scale < t.minRatio && (a.scale = t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, .5)), i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
        }, onGestureEnd: function (e) {
            var t = this.params.zoom, a = this.zoom, i = a.gesture;
            if (!te.gestures) {
                if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !g.android) return;
                a.fakeGestureTouched = !1, a.fakeGestureMoved = !1
            }
            i.$imageEl && 0 !== i.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio), i.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (i.$slideEl = void 0))
        }, onTouchStart: function (e) {
            var t = this.zoom, a = t.gesture, i = t.image;
            a.$imageEl && 0 !== a.$imageEl.length && (i.isTouched || (g.android && e.preventDefault(), i.isTouched = !0, i.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, i.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        }, onTouchMove: function (e) {
            var t = this, a = t.zoom, i = a.gesture, s = a.image, r = a.velocity;
            if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) {
                s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = ee.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = ee.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                var n = s.width * a.scale, o = s.height * a.scale;
                if (!(n < i.slideWidth && o < i.slideHeight)) {
                    if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) {
                        if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void (s.isTouched = !1);
                        if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void (s.isTouched = !1)
                    }
                    e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                }
            }
        }, onTouchEnd: function () {
            var e = this.zoom, t = e.gesture, a = e.image, i = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void (a.isMoved = !1);
                a.isTouched = !1, a.isMoved = !1;
                var s = 300, r = 300, n = i.x * s, o = a.currentX + n, l = i.y * r, d = a.currentY + l;
                0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
                var p = Math.max(s, r);
                a.currentX = o, a.currentY = d;
                var c = a.width * e.scale, u = a.height * e.scale;
                a.minX = Math.min(t.slideWidth / 2 - c / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - u / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
            }
        }, onTransitionEnd: function () {
            var e = this.zoom, t = e.gesture;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
        }, toggle: function (e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        }, in: function (e) {
            var t, a, i, s, r, n, o, l, d, p, c, u, h, v, f, m, g = this, b = g.zoom, w = g.params.zoom, y = b.gesture,
                x = b.image;
            (y.$slideEl || (y.$slideEl = g.clickedSlide ? L(g.clickedSlide) : g.slides.eq(g.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, a = x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (f = y.$slideEl[0].offsetWidth, m = y.$slideEl[0].offsetHeight, i = y.$slideEl.offset().left + f / 2 - t, s = y.$slideEl.offset().top + m / 2 - a, o = y.$imageEl[0].offsetWidth, l = y.$imageEl[0].offsetHeight, d = o * b.scale, p = l * b.scale, h = -(c = Math.min(f / 2 - d / 2, 0)), v = -(u = Math.min(m / 2 - p / 2, 0)), (r = i * b.scale) < c && (r = c), h < r && (r = h), (n = s * b.scale) < u && (n = u), v < n && (n = v)) : n = r = 0, y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
        }, out: function () {
            var e = this, t = e.zoom, a = e.params.zoom, i = t.gesture;
            i.$slideEl || (i.$slideEl = e.clickedSlide ? L(e.clickedSlide) : e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0)
        }, enable: function () {
            var e = this, t = e.zoom;
            if (!t.enabled) {
                t.enabled = !0;
                var a = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
            }
        }, disable: function () {
            var e = this, t = e.zoom;
            if (t.enabled) {
                e.zoom.enabled = !1;
                var a = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
            }
        }
    }, Y = {
        loadInSlide: function (e, l) {
            void 0 === l && (l = !0);
            var d = this, p = d.params.lazy;
            if (void 0 !== e && 0 !== d.slides.length) {
                var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e),
                    t = c.find("." + p.elementClass + ":not(." + p.loadedClass + "):not(." + p.loadingClass + ")");
                !c.hasClass(p.elementClass) || c.hasClass(p.loadedClass) || c.hasClass(p.loadingClass) || (t = t.add(c[0])), 0 !== t.length && t.each(function (e, t) {
                    var i = L(t);
                    i.addClass(p.loadingClass);
                    var s = i.attr("data-background"), r = i.attr("data-src"), n = i.attr("data-srcset"),
                        o = i.attr("data-sizes");
                    d.loadImage(i[0], r || s, n, o, !1, function () {
                        if (null != d && d && (!d || d.params) && !d.destroyed) {
                            if (s ? (i.css("background-image", 'url("' + s + '")'), i.removeAttr("data-background")) : (n && (i.attr("srcset", n), i.removeAttr("data-srcset")), o && (i.attr("sizes", o), i.removeAttr("data-sizes")), r && (i.attr("src", r), i.removeAttr("data-src"))), i.addClass(p.loadedClass).removeClass(p.loadingClass), c.find("." + p.preloaderClass).remove(), d.params.loop && l) {
                                var e = c.attr("data-swiper-slide-index");
                                if (c.hasClass(d.params.slideDuplicateClass)) {
                                    var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                    d.lazy.loadInSlide(t.index(), !1)
                                } else {
                                    var a = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    d.lazy.loadInSlide(a.index(), !1)
                                }
                            }
                            d.emit("lazyImageReady", c[0], i[0])
                        }
                    }), d.emit("lazyImageLoad", c[0], i[0])
                })
            }
        }, load: function () {
            var i = this, t = i.$wrapperEl, a = i.params, s = i.slides, e = i.activeIndex,
                r = i.virtual && a.virtual.enabled, n = a.lazy, o = a.slidesPerView;

            function l(e) {
                if (r) {
                    if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                } else if (s[e]) return !0;
                return !1
            }

            function d(e) {
                return r ? L(e).attr("data-swiper-slide-index") : L(e).index()
            }

            if ("auto" === o && (o = 0), i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0), i.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each(function (e, t) {
                var a = r ? L(t).attr("data-swiper-slide-index") : L(t).index();
                i.lazy.loadInSlide(a)
            }); else if (1 < o) for (var p = e; p < e + o; p += 1) l(p) && i.lazy.loadInSlide(p); else i.lazy.loadInSlide(e);
            if (n.loadPrevNext) if (1 < o || n.loadPrevNextAmount && 1 < n.loadPrevNextAmount) {
                for (var c = n.loadPrevNextAmount, u = o, h = Math.min(e + u + Math.max(c, u), s.length), v = Math.max(e - Math.max(u, c), 0), f = e + o; f < h; f += 1) l(f) && i.lazy.loadInSlide(f);
                for (var m = v; m < e; m += 1) l(m) && i.lazy.loadInSlide(m)
            } else {
                var g = t.children("." + a.slideNextClass);
                0 < g.length && i.lazy.loadInSlide(d(g));
                var b = t.children("." + a.slidePrevClass);
                0 < b.length && i.lazy.loadInSlide(d(b))
            }
        }
    }, V = {
        LinearSpline: function (e, t) {
            var a, i, s, r, n, o = function (e, t) {
                for (i = -1, a = e.length; 1 < a - i;) e[s = a + i >> 1] <= t ? i = s : a = s;
                return a
            };
            return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
                return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
            }, this
        }, getInterpolateFunction: function (e) {
            var t = this;
            t.controller.spline || (t.controller.spline = t.params.loop ? new V.LinearSpline(t.slidesGrid, e.slidesGrid) : new V.LinearSpline(t.snapGrid, e.snapGrid))
        }, setTranslate: function (e, t) {
            var a, i, s = this, r = s.controller.control;

            function n(e) {
                var t = s.rtlTranslate ? -s.translate : s.translate;
                "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses()
            }

            if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof T && n(r[o]); else r instanceof T && t !== r && n(r)
        }, setTransition: function (t, e) {
            var a, i = this, s = i.controller.control;

            function r(e) {
                e.setTransition(t, i), 0 !== t && (e.transitionStart(), e.params.autoHeight && ee.nextTick(function () {
                    e.updateAutoHeight()
                }), e.$wrapperEl.transitionEnd(function () {
                    s && (e.params.loop && "slide" === i.params.controller.by && e.loopFix(), e.transitionEnd())
                }))
            }

            if (Array.isArray(s)) for (a = 0; a < s.length; a += 1) s[a] !== e && s[a] instanceof T && r(s[a]); else s instanceof T && e !== s && r(s)
        }
    }, F = {
        makeElFocusable: function (e) {
            return e.attr("tabIndex", "0"), e
        }, addElRole: function (e, t) {
            return e.attr("role", t), e
        }, addElLabel: function (e, t) {
            return e.attr("aria-label", t), e
        }, disableEl: function (e) {
            return e.attr("aria-disabled", !0), e
        }, enableEl: function (e) {
            return e.attr("aria-disabled", !1), e
        }, onEnterKey: function (e) {
            var t = this, a = t.params.a11y;
            if (13 === e.keyCode) {
                var i = L(e.target);
                t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is("." + t.params.pagination.bulletClass) && i[0].click()
            }
        }, notify: function (e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""), t.html(e))
        }, updateNavigation: function () {
            var e = this;
            if (!e.params.loop) {
                var t = e.navigation, a = t.$nextEl, i = t.$prevEl;
                i && 0 < i.length && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)), a && 0 < a.length && (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a))
            }
        }, updatePagination: function () {
            var i = this, s = i.params.a11y;
            i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function (e, t) {
                var a = L(t);
                i.a11y.makeElFocusable(a), i.a11y.addElRole(a, "button"), i.a11y.addElLabel(a, s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
            })
        }, init: function () {
            var e = this;
            e.$el.append(e.a11y.liveRegion);
            var t, a, i = e.params.a11y;
            e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, i.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), a && (e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, i.prevSlideMessage), a.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
        }, destroy: function () {
            var e, t, a = this;
            a.a11y.liveRegion && 0 < a.a11y.liveRegion.length && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterKey), t && t.off("keydown", a.a11y.onEnterKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass, a.a11y.onEnterKey)
        }
    }, R = {
        init: function () {
            var e = this;
            if (e.params.history) {
                if (!J.history || !J.history.pushState) return e.params.history.enabled = !1, void (e.params.hashNavigation.enabled = !0);
                var t = e.history;
                t.initialized = !0, t.paths = R.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || J.addEventListener("popstate", e.history.setHistoryPopState))
            }
        }, destroy: function () {
            this.params.history.replaceState || J.removeEventListener("popstate", this.history.setHistoryPopState)
        }, setHistoryPopState: function () {
            this.history.paths = R.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
        }, getPathValues: function () {
            var e = J.location.pathname.slice(1).split("/").filter(function (e) {
                return "" !== e
            }), t = e.length;
            return {key: e[t - 2], value: e[t - 1]}
        }, setHistory: function (e, t) {
            if (this.history.initialized && this.params.history.enabled) {
                var a = this.slides.eq(t), i = R.slugify(a.attr("data-history"));
                J.location.pathname.includes(e) || (i = e + "/" + i);
                var s = J.history.state;
                s && s.value === i || (this.params.history.replaceState ? J.history.replaceState({value: i}, null, i) : J.history.pushState({value: i}, null, i))
            }
        }, slugify: function (e) {
            return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        }, scrollToSlide: function (e, t, a) {
            var i = this;
            if (t) for (var s = 0, r = i.slides.length; s < r; s += 1) {
                var n = i.slides.eq(s);
                if (R.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
                    var o = n.index();
                    i.slideTo(o, e, a)
                }
            } else i.slideTo(0, e, a)
        }
    }, q = {
        onHashCange: function () {
            var e = this, t = f.location.hash.replace("#", "");
            if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                var a = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index();
                if (void 0 === a) return;
                e.slideTo(a)
            }
        }, setHash: function () {
            var e = this;
            if (e.hashNavigation.initialized && e.params.hashNavigation.enabled) if (e.params.hashNavigation.replaceState && J.history && J.history.replaceState) J.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""); else {
                var t = e.slides.eq(e.activeIndex), a = t.attr("data-hash") || t.attr("data-history");
                f.location.hash = a || ""
            }
        }, init: function () {
            var e = this;
            if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                e.hashNavigation.initialized = !0;
                var t = f.location.hash.replace("#", "");
                if (t) for (var a = 0, i = e.slides.length; a < i; a += 1) {
                    var s = e.slides.eq(a);
                    if ((s.attr("data-hash") || s.attr("data-history")) === t && !s.hasClass(e.params.slideDuplicateClass)) {
                        var r = s.index();
                        e.slideTo(r, 0, e.params.runCallbacksOnInit, !0)
                    }
                }
                e.params.hashNavigation.watchState && L(J).on("hashchange", e.hashNavigation.onHashCange)
            }
        }, destroy: function () {
            this.params.hashNavigation.watchState && L(J).off("hashchange", this.hashNavigation.onHashCange)
        }
    }, W = {
        run: function () {
            var e = this, t = e.slides.eq(e.activeIndex), a = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = ee.nextTick(function () {
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
            }, a)
        }, start: function () {
            var e = this;
            return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
        }, stop: function () {
            var e = this;
            return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
        }, pause: function (e) {
            var t = this;
            t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
        }
    }, j = {
        setTranslate: function () {
            for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                var i = e.slides.eq(a), s = -i[0].swiperSlideOffset;
                e.params.virtualTranslate || (s -= e.translate);
                var r = 0;
                e.isHorizontal() || (r = s, s = 0);
                var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                i.css({opacity: n}).transform("translate3d(" + s + "px, " + r + "px, 0px)")
            }
        }, setTransition: function (e) {
            var a = this, t = a.slides, i = a.$wrapperEl;
            if (t.transition(e), a.params.virtualTranslate && 0 !== e) {
                var s = !1;
                t.transitionEnd(function () {
                    if (!s && a && !a.destroyed) {
                        s = !0, a.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) i.trigger(e[t])
                    }
                })
            }
        }
    }, U = {
        setTranslate: function () {
            var e, t = this, a = t.$el, i = t.$wrapperEl, s = t.slides, r = t.width, n = t.height, o = t.rtlTranslate,
                l = t.size, d = t.params.cubeEffect, p = t.isHorizontal(), c = t.virtual && t.params.virtual.enabled,
                u = 0;
            d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({height: r + "px"})) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = L('<div class="swiper-cube-shadow"></div>'), a.append(e)));
            for (var h = 0; h < s.length; h += 1) {
                var v = s.eq(h), f = h;
                c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                var m = 90 * f, g = Math.floor(m / 360);
                o && (m = -m, g = Math.floor(-m / 360));
                var b = Math.max(Math.min(v[0].progress, 1), -1), w = 0, y = 0, x = 0;
                f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), p || (y = w, w = 0);
                var T = "rotateX(" + (p ? 0 : -m) + "deg) rotateY(" + (p ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                if (b <= 1 && -1 < b && (u = 90 * f + 90 * b, o && (u = 90 * -f - 90 * b)), v.transform(T), d.slideShadows) {
                    var E = p ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                        S = p ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                    0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0))
                }
            }
            if (i.css({
                "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                "transform-origin": "50% 50% -" + l / 2 + "px"
            }), d.shadow) if (p) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")"); else {
                var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                    M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
                    z = d.shadowScale, P = d.shadowScale / M, k = d.shadowOffset;
                e.transform("scale3d(" + z + ", 1, " + P + ") translate3d(0px, " + (n / 2 + k) + "px, " + -n / 2 / P + "px) rotateX(-90deg)")
            }
            var $ = I.isSafari || I.isUiWebView ? -l / 2 : 0;
            i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)")
        }, setTransition: function (e) {
            var t = this.$el;
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
        }
    }, K = {
        setTranslate: function () {
            for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
                var s = t.eq(i), r = s[0].progress;
                e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
                var n = -180 * r, o = 0, l = -s[0].swiperSlideOffset, d = 0;
                if (e.isHorizontal() ? a && (n = -n) : (d = l, o = -n, n = l = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
                    var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                        c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                    0 === p.length && (p = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === c.length && (c = L('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(c)), p.length && (p[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0))
                }
                s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
            }
        }, setTransition: function (e) {
            var a = this, t = a.slides, i = a.activeIndex, s = a.$wrapperEl;
            if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), a.params.virtualTranslate && 0 !== e) {
                var r = !1;
                t.eq(i).transitionEnd(function () {
                    if (!r && a && !a.destroyed) {
                        r = !0, a.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) s.trigger(e[t])
                    }
                })
            }
        }
    }, _ = {
        setTranslate: function () {
            for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.$wrapperEl, r = e.slidesSizesGrid, n = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : a / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, h = i.length; u < h; u += 1) {
                var v = i.eq(u), f = r[u], m = (d - v[0].swiperSlideOffset - f / 2) / f * n.modifier, g = o ? p * m : 0,
                    b = o ? 0 : p * m, w = -c * Math.abs(m), y = o ? 0 : n.stretch * m, x = o ? n.stretch * m : 0;
                Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(b) < .001 && (b = 0);
                var T = "translate3d(" + x + "px," + y + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg)";
                if (v.transform(T), v[0].style.zIndex = 1 - Math.abs(Math.round(m)), n.slideShadows) {
                    var E = o ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                        S = o ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                    0 === E.length && (E = L('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = L('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = 0 < m ? m : 0), S.length && (S[0].style.opacity = 0 < -m ? -m : 0)
                }
            }
            (te.pointerEvents || te.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%")
        }, setTransition: function (e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    }, Z = {
        init: function () {
            var e = this, t = e.params.thumbs, a = e.constructor;
            t.swiper instanceof a ? (e.thumbs.swiper = t.swiper, ee.extend(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), ee.extend(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })) : ee.isObject(t.swiper) && (e.thumbs.swiper = new a(ee.extend({}, t.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick)
        }, onThumbClick: function () {
            var e = this, t = e.thumbs.swiper;
            if (t) {
                var a = t.clickedIndex, i = t.clickedSlide;
                if (!(i && L(i).hasClass(e.params.thumbs.slideThumbActiveClass) || null == a)) {
                    var s;
                    if (s = t.params.loop ? parseInt(L(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a, e.params.loop) {
                        var r = e.activeIndex;
                        e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, r = e.activeIndex);
                        var n = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
                            o = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                        s = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
                    }
                    e.slideTo(s)
                }
            }
        }, update: function (e) {
            var t = this, a = t.thumbs.swiper;
            if (a) {
                var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView;
                if (t.realIndex !== a.realIndex) {
                    var s, r = a.activeIndex;
                    if (a.params.loop) {
                        a.slides.eq(r).hasClass(a.params.slideDuplicateClass) && (a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft, r = a.activeIndex);
                        var n = a.slides.eq(r).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                            o = a.slides.eq(r).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                        s = void 0 === n ? o : void 0 === o ? n : o - r == r - n ? r : o - r < r - n ? o : n
                    } else s = t.realIndex;
                    a.visibleSlidesIndexes.indexOf(s) < 0 && (a.params.centeredSlides ? s = r < s ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : r < s && (s = s - i + 1), a.slideTo(s, e ? 0 : void 0))
                }
                var l = 1, d = t.params.thumbs.slideThumbActiveClass;
                if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView), a.slides.removeClass(d), a.params.loop) for (var p = 0; p < l; p += 1) a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + p) + '"]').addClass(d); else for (var c = 0; c < l; c += 1) a.slides.eq(t.realIndex + c).addClass(d)
            }
        }
    }, Q = [E, S, C, M, P, $, O, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function () {
            var e = this;
            ee.extend(e, {
                mousewheel: {
                    enabled: !1,
                    enable: A.enable.bind(e),
                    disable: A.disable.bind(e),
                    handle: A.handle.bind(e),
                    handleMouseEnter: A.handleMouseEnter.bind(e),
                    handleMouseLeave: A.handleMouseLeave.bind(e),
                    lastScrollTime: ee.now()
                }
            })
        },
        on: {
            init: function () {
                this.params.mousewheel.enabled && this.mousewheel.enable()
            }, destroy: function () {
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function () {
            var e = this;
            ee.extend(e, {
                navigation: {
                    init: H.init.bind(e),
                    update: H.update.bind(e),
                    destroy: H.destroy.bind(e),
                    onNextClick: H.onNextClick.bind(e),
                    onPrevClick: H.onPrevClick.bind(e)
                }
            })
        },
        on: {
            init: function () {
                this.navigation.init(), this.navigation.update()
            }, toEdge: function () {
                this.navigation.update()
            }, fromEdge: function () {
                this.navigation.update()
            }, destroy: function () {
                this.navigation.destroy()
            }, click: function (e) {
                var t, a = this, i = a.navigation, s = i.$nextEl, r = i.$prevEl;
                !a.params.navigation.hideOnClick || L(e.target).is(r) || L(e.target).is(s) || (s ? t = s.hasClass(a.params.navigation.hiddenClass) : r && (t = r.hasClass(a.params.navigation.hiddenClass)), !0 === t ? a.emit("navigationShow", a) : a.emit("navigationHide", a), s && s.toggleClass(a.params.navigation.hiddenClass), r && r.toggleClass(a.params.navigation.hiddenClass))
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function (e) {
                    return e
                },
                formatFractionTotal: function (e) {
                    return e
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function () {
            var e = this;
            ee.extend(e, {
                pagination: {
                    init: N.init.bind(e),
                    render: N.render.bind(e),
                    update: N.update.bind(e),
                    destroy: N.destroy.bind(e),
                    dynamicBulletIndex: 0
                }
            })
        },
        on: {
            init: function () {
                this.pagination.init(), this.pagination.render(), this.pagination.update()
            }, activeIndexChange: function () {
                this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
            }, snapIndexChange: function () {
                this.params.loop || this.pagination.update()
            }, slidesLengthChange: function () {
                this.params.loop && (this.pagination.render(), this.pagination.update())
            }, snapGridLengthChange: function () {
                this.params.loop || (this.pagination.render(), this.pagination.update())
            }, destroy: function () {
                this.pagination.destroy()
            }, click: function (e) {
                var t = this;
                t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !L(e.target).hasClass(t.params.pagination.bulletClass) && (!0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass) ? t.emit("paginationShow", t) : t.emit("paginationHide", t), t.pagination.$el.toggleClass(t.params.pagination.hiddenClass))
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function () {
            var e = this;
            ee.extend(e, {
                scrollbar: {
                    init: G.init.bind(e),
                    destroy: G.destroy.bind(e),
                    updateSize: G.updateSize.bind(e),
                    setTranslate: G.setTranslate.bind(e),
                    setTransition: G.setTransition.bind(e),
                    enableDraggable: G.enableDraggable.bind(e),
                    disableDraggable: G.disableDraggable.bind(e),
                    setDragPosition: G.setDragPosition.bind(e),
                    onDragStart: G.onDragStart.bind(e),
                    onDragMove: G.onDragMove.bind(e),
                    onDragEnd: G.onDragEnd.bind(e),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init: function () {
                this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
            }, update: function () {
                this.scrollbar.updateSize()
            }, resize: function () {
                this.scrollbar.updateSize()
            }, observerUpdate: function () {
                this.scrollbar.updateSize()
            }, setTranslate: function () {
                this.scrollbar.setTranslate()
            }, setTransition: function (e) {
                this.scrollbar.setTransition(e)
            }, destroy: function () {
                this.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax", params: {parallax: {enabled: !1}}, create: function () {
            ee.extend(this, {
                parallax: {
                    setTransform: B.setTransform.bind(this),
                    setTranslate: B.setTranslate.bind(this),
                    setTransition: B.setTransition.bind(this)
                }
            })
        }, on: {
            beforeInit: function () {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
            }, init: function () {
                this.params.parallax.enabled && this.parallax.setTranslate()
            }, setTranslate: function () {
                this.params.parallax.enabled && this.parallax.setTranslate()
            }, setTransition: function (e) {
                this.params.parallax.enabled && this.parallax.setTransition(e)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function () {
            var i = this, t = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0}
            };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (e) {
                t[e] = X[e].bind(i)
            }), ee.extend(i, {zoom: t});
            var s = 1;
            Object.defineProperty(i.zoom, "scale", {
                get: function () {
                    return s
                }, set: function (e) {
                    if (s !== e) {
                        var t = i.zoom.gesture.$imageEl ? i.zoom.gesture.$imageEl[0] : void 0,
                            a = i.zoom.gesture.$slideEl ? i.zoom.gesture.$slideEl[0] : void 0;
                        i.emit("zoomChange", e, t, a)
                    }
                    s = e
                }
            })
        },
        on: {
            init: function () {
                this.params.zoom.enabled && this.zoom.enable()
            }, destroy: function () {
                this.zoom.disable()
            }, touchStart: function (e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            }, touchEnd: function (e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            }, doubleTap: function (e) {
                this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
            }, transitionEnd: function () {
                this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function () {
            ee.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: Y.load.bind(this),
                    loadInSlide: Y.loadInSlide.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
            }, init: function () {
                this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
            }, scroll: function () {
                this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
            }, resize: function () {
                this.params.lazy.enabled && this.lazy.load()
            }, scrollbarDragMove: function () {
                this.params.lazy.enabled && this.lazy.load()
            }, transitionStart: function () {
                var e = this;
                e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
            }, transitionEnd: function () {
                this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
            }
        }
    }, {
        name: "controller", params: {controller: {control: void 0, inverse: !1, by: "slide"}}, create: function () {
            var e = this;
            ee.extend(e, {
                controller: {
                    control: e.params.controller.control,
                    getInterpolateFunction: V.getInterpolateFunction.bind(e),
                    setTranslate: V.setTranslate.bind(e),
                    setTransition: V.setTransition.bind(e)
                }
            })
        }, on: {
            update: function () {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            }, resize: function () {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            }, observerUpdate: function () {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
            }, setTranslate: function (e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            }, setTransition: function (e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function () {
            var t = this;
            ee.extend(t, {a11y: {liveRegion: L('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')}}), Object.keys(F).forEach(function (e) {
                t.a11y[e] = F[e].bind(t)
            })
        },
        on: {
            init: function () {
                this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
            }, toEdge: function () {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            }, fromEdge: function () {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            }, paginationUpdate: function () {
                this.params.a11y.enabled && this.a11y.updatePagination()
            }, destroy: function () {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    }, {
        name: "history", params: {history: {enabled: !1, replaceState: !1, key: "slides"}}, create: function () {
            var e = this;
            ee.extend(e, {
                history: {
                    init: R.init.bind(e),
                    setHistory: R.setHistory.bind(e),
                    setHistoryPopState: R.setHistoryPopState.bind(e),
                    scrollToSlide: R.scrollToSlide.bind(e),
                    destroy: R.destroy.bind(e)
                }
            })
        }, on: {
            init: function () {
                this.params.history.enabled && this.history.init()
            }, destroy: function () {
                this.params.history.enabled && this.history.destroy()
            }, transitionEnd: function () {
                this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {hashNavigation: {enabled: !1, replaceState: !1, watchState: !1}},
        create: function () {
            var e = this;
            ee.extend(e, {
                hashNavigation: {
                    initialized: !1,
                    init: q.init.bind(e),
                    destroy: q.destroy.bind(e),
                    setHash: q.setHash.bind(e),
                    onHashCange: q.onHashCange.bind(e)
                }
            })
        },
        on: {
            init: function () {
                this.params.hashNavigation.enabled && this.hashNavigation.init()
            }, destroy: function () {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy()
            }, transitionEnd: function () {
                this.hashNavigation.initialized && this.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function () {
            var t = this;
            ee.extend(t, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: W.run.bind(t),
                    start: W.start.bind(t),
                    stop: W.stop.bind(t),
                    pause: W.pause.bind(t),
                    onTransitionEnd: function (e) {
                        t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
                    }
                }
            })
        },
        on: {
            init: function () {
                this.params.autoplay.enabled && this.autoplay.start()
            }, beforeTransitionStart: function (e, t) {
                this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
            }, sliderFirstMove: function () {
                this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
            }, destroy: function () {
                this.autoplay.running && this.autoplay.stop()
            }
        }
    }, {
        name: "effect-fade", params: {fadeEffect: {crossFade: !1}}, create: function () {
            ee.extend(this, {
                fadeEffect: {
                    setTranslate: j.setTranslate.bind(this),
                    setTransition: j.setTransition.bind(this)
                }
            })
        }, on: {
            beforeInit: function () {
                var e = this;
                if ("fade" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "fade");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    ee.extend(e.params, t), ee.extend(e.originalParams, t)
                }
            }, setTranslate: function () {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            }, setTransition: function (e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-cube",
        params: {cubeEffect: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94}},
        create: function () {
            ee.extend(this, {
                cubeEffect: {
                    setTranslate: U.setTranslate.bind(this),
                    setTransition: U.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                var e = this;
                if ("cube" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    ee.extend(e.params, t), ee.extend(e.originalParams, t)
                }
            }, setTranslate: function () {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            }, setTransition: function (e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-flip", params: {flipEffect: {slideShadows: !0, limitRotation: !0}}, create: function () {
            ee.extend(this, {
                flipEffect: {
                    setTranslate: K.setTranslate.bind(this),
                    setTransition: K.setTransition.bind(this)
                }
            })
        }, on: {
            beforeInit: function () {
                var e = this;
                if ("flip" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    ee.extend(e.params, t), ee.extend(e.originalParams, t)
                }
            }, setTranslate: function () {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            }, setTransition: function (e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {coverflowEffect: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0}},
        create: function () {
            ee.extend(this, {
                coverflowEffect: {
                    setTranslate: _.setTranslate.bind(this),
                    setTransition: _.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                var e = this;
                "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
            }, setTranslate: function () {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            }, setTransition: function (e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function () {
            ee.extend(this, {
                thumbs: {
                    swiper: null,
                    init: Z.init.bind(this),
                    update: Z.update.bind(this),
                    onThumbClick: Z.onThumbClick.bind(this)
                }
            })
        },
        on: {
            beforeInit: function () {
                var e = this.params.thumbs;
                e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
            }, slideChange: function () {
                this.thumbs.swiper && this.thumbs.update()
            }, update: function () {
                this.thumbs.swiper && this.thumbs.update()
            }, resize: function () {
                this.thumbs.swiper && this.thumbs.update()
            }, observerUpdate: function () {
                this.thumbs.swiper && this.thumbs.update()
            }, setTransition: function (e) {
                var t = this.thumbs.swiper;
                t && t.setTransition(e)
            }, beforeDestroy: function () {
                var e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy()
            }
        }
    }];
    return void 0 === T.use && (T.use = T.Class.use, T.installModule = T.Class.installModule), T.use(Q), T
});
//# sourceMappingURL=swiper.min.js.map


/*====================================*/


/*=================
    Wow Js
===================*/
/*! WOW - v1.1.3 - 2016-05-06
* Copyright (c) 2016 Matthieu Aussaguel;*/
(function () {
    var a, b, c, d, e, f = function (a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    }, g = [].indexOf || function (a) {
        for (var b = 0, c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
        return -1
    };
    b = function () {
        function a() {
        }

        return a.prototype.extend = function (a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function (a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.createEvent = function (a, b, c, d) {
            var e;
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
        }, a.prototype.emitEvent = function (a, b) {
            return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
        }, a.prototype.addEvent = function (a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function (a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function () {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function () {
        function a() {
            this.keys = [], this.values = []
        }

        return a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d) if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e) if (d = g[c], d === a) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function () {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }

        return a.notSupported = !0, a.prototype.observe = function () {
        }, a
    }()), d = this.getComputedStyle || function (a, b) {
        return this.getPropertyValue = function (b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function (a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function () {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }

        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, e.prototype.init = function () {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, e.prototype.start = function () {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function () {
                var a, c, d, e;
                for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                return e
            }.call(this), this.all = function () {
                var a, c, d, e;
                for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                return e
            }.call(this), this.boxes.length) if (this.disabled()) this.resetStyle(); else for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function (a) {
                return function (b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function () {
                        var a, b, c, d;
                        for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                        return d
                    }.call(a));
                    return g
                }
            }(this)).observe(document.body, {childList: !0, subtree: !0}) : void 0
        }, e.prototype.stop = function () {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, e.prototype.sync = function (b) {
            return a.notSupported ? this.doSync(this.element) : void 0
        }, e.prototype.doSync = function (a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                return f
            }
        }, e.prototype.show = function (a) {
            return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
        }, e.prototype.applyStyle = function (a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function (f) {
                return function () {
                    return f.customStyle(a, b, d, c, e)
                }
            }(this))
        }, e.prototype.animate = function () {
            return "requestAnimationFrame" in window ? function (a) {
                return window.requestAnimationFrame(a)
            } : function (a) {
                return a()
            }
        }(), e.prototype.resetStyle = function () {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e
        }, e.prototype.resetAnimation = function (a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
        }, e.prototype.customStyle = function (a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {animationDuration: c}), d && this.vendorSet(a.style, {animationDelay: d}), e && this.vendorSet(a.style, {animationIterationCount: e}), this.vendorSet(a.style, {animationName: b ? "none" : this.cachedAnimationName(a)}), a
        }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function (a, b) {
            var c, d, e, f;
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function () {
                var b, d, g, h;
                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h
            }.call(this));
            return d
        }, e.prototype.vendorCSS = function (a, b) {
            var c, e, f, g, h, i;
            for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
            return g
        }, e.prototype.animationName = function (a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText
            } catch (c) {
                b = d(a).getPropertyValue("animation-name")
            }
            return "none" === b ? "" : b
        }, e.prototype.cacheAnimationName = function (a) {
            return this.animationNameCache.set(a, this.animationName(a))
        }, e.prototype.cachedAnimationName = function (a) {
            return this.animationNameCache.get(a)
        }, e.prototype.scrollHandler = function () {
            return this.scrolled = !0
        }, e.prototype.scrollCallback = function () {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, e.prototype.offsetTop = function (a) {
            for (var b; void 0 === a.offsetTop;) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
            return b
        }, e.prototype.isVisible = function (a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, e.prototype.util = function () {
            return null != this._util ? this._util : this._util = new b
        }, e.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, e
    }()
}).call(this);


/*====================================*/

/*jquery.mb.YTPlayer 24-07-2020
 _ jquery.mb.components
 _ email: matbicoc@gmail.com
 _ Copyright (c) 2001-2020. Matteo Bicocchi (Pupunzi);
 _ blog: http://pupunzi.open-lab.com
 _ Open Lab s.r.l., Florence - Italy
 */

var ytp = ytp || {};

function onYouTubeIframeAPIReady() {
    ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}

let getYTPVideoID = function (e) {
    let r, t;
    return e.indexOf("youtu.be") > 0 || e.indexOf("youtube.com/embed") > 0 ? r = (t = (r = e.substr(e.lastIndexOf("/") + 1, e.length)).indexOf("?list=") > 0 ? r.substr(r.lastIndexOf("="), r.length) : null) ? r.substr(0, r.lastIndexOf("?")) : r : e.indexOf("http") > -1 ? (r = e.match(/[\\?&]v=([^&#]*)/)[1], t = e.indexOf("list=") > 0 ? e.match(/[\\?&]list=([^&#]*)/)[1] : null) : t = (r = e.length > 15 ? null : e) ? null : e, {
        videoID: r,
        playlistID: t
    }
};

function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        let e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)]
    }
}

!function (jQuery, ytp) {
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "3.3.4",
        build: "7525",
        author: "Matteo Bicocchi (pupunzi)",
        apiKey: "",
        defaults: {
            videoURL: null,
            containment: "body",
            ratio: "auto",
            fadeOnStartTime: 1e3,
            startAt: 0,
            stopAt: 0,
            autoPlay: !0,
            coverImage: !1,
            loop: !0,
            addRaster: !1,
            mask: !1,
            opacity: 1,
            quality: "default",
            vol: 50,
            mute: !1,
            showControls: !0,
            anchor: "center,center",
            showAnnotations: !1,
            cc_load_policy: !1,
            showYTLogo: !0,
            useOnMobile: !0,
            playOnlyIfVisible: !1,
            onScreenPercentage: 30,
            goFullScreenOnPlay: !1,
            stopMovieOnBlur: !0,
            realFullscreen: !0,
            optimizeDisplay: !0,
            abundance: .3,
            gaTrack: !0,
            remember_last_time: !1,
            addFilters: !1,
            onReady: function (e) {
            },
            onError: function (e, r) {
            },
            onEnd: function () {
            }
        },
        controls: {play: "P", pause: "p", mute: "M", unmute: "A", onlyYT: "O", showSite: "R", ytLogo: "Y"},
        controlBar: null,
        locationProtocol: "https:",
        defaultFilters: {
            grayscale: {value: 0, unit: "%"},
            hue_rotate: {value: 0, unit: "deg"},
            invert: {value: 0, unit: "%"},
            opacity: {value: 0, unit: "%"},
            saturate: {value: 0, unit: "%"},
            sepia: {value: 0, unit: "%"},
            brightness: {value: 0, unit: "%"},
            contrast: {value: 0, unit: "%"},
            blur: {value: 0, unit: "px"}
        },
        buildPlayer: function (options) {
            if (ytp.YTAPIReady || void 0 !== window.YT) setTimeout(function () {
                jQuery(document).trigger("YTAPIReady"), ytp.YTAPIReady = !0
            }, 100); else {
                jQuery("#YTAPI").remove();
                let e = jQuery("<script>").attr({
                    src: "https://www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                    id: "YTAPI"
                });
                jQuery("head").prepend(e)
            }

            function isIframe() {
                let e = !1;
                try {
                    self.location.href !== top.location.href && (e = !0)
                } catch (r) {
                    e = !0
                }
                return e
            }

            return console.time("YTPlayerInit"), console.time("YTPlayerStartPlay"), this.each(function () {
                let YTPlayer = this, $YTPlayer = jQuery(YTPlayer);
                $YTPlayer.hide(), YTPlayer.loop = 0, YTPlayer.state = 0, YTPlayer.filters = jQuery.extend(!0, {}, jQuery.mbYTPlayer.defaultFilters), YTPlayer.filtersEnabled = !0, YTPlayer.id = YTPlayer.id || "YTP_" + (new Date).getTime(), $YTPlayer.addClass("mb_YTPlayer");
                let property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                "object" != typeof property && (property = {}), YTPlayer.opt = jQuery.extend(!0, {}, jQuery.mbYTPlayer.defaults, YTPlayer.opt, options, property), YTPlayer.opt.elementId = YTPlayer.id, 0 === YTPlayer.opt.vol && (YTPlayer.opt.vol = 1, YTPlayer.opt.mute = !0), YTPlayer.opt.autoPlay && !1 === YTPlayer.opt.mute && jQuery.mbBrowser.chrome && (jQuery(document).one("mousedown.YTPstart", function () {
                    $YTPlayer.YTPPlay()
                }), console.info("YTPlayer info: On Webkit browsers you can not autoplay the video if the audio is on.")), YTPlayer.opt.loop && "boolean" == typeof YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999);
                let fullScreenAvailable = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
                YTPlayer.opt.realFullscreen = !(isIframe() || !fullScreenAvailable) && YTPlayer.opt.realFullscreen, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "1" : "3", YTPlayer.opt.cc_load_policy = YTPlayer.opt.cc_load_policy ? "1" : "0", YTPlayer.opt.coverImage = YTPlayer.opt.coverImage || YTPlayer.opt.backgroundImage, YTPlayer.opt.quality = "default", jQuery.mbBrowser.msie && jQuery.mbBrowser.version < 9 && (YTPlayer.opt.opacity = 1), YTPlayer.opt.containment = "self" === YTPlayer.opt.containment ? $YTPlayer : jQuery(YTPlayer.opt.containment), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1, YTPlayer.opt.ratio = "auto" === YTPlayer.opt.ratio ? 16 / 9 : YTPlayer.opt.ratio, YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio);
                let origContainmentBackground = YTPlayer.opt.containment.css("background-image");
                origContainmentBackground = "none" === origContainmentBackground ? null : origContainmentBackground, YTPlayer.orig_containment_background = origContainmentBackground, $YTPlayer.attr("id") || $YTPlayer.attr("id", "ytp_" + (new Date).getTime()), YTPlayer.playerID = "iframe_" + YTPlayer.id, YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0, YTPlayer.videoID = YTPlayer.opt.videoURL ? getYTPVideoID(YTPlayer.opt.videoURL).videoID : !!$YTPlayer.attr("href") && getYTPVideoID($YTPlayer.attr("href")).videoID, YTPlayer.playlistID = YTPlayer.opt.videoURL ? getYTPVideoID(YTPlayer.opt.videoURL).playlistID : !!$YTPlayer.attr("href") && getYTPVideoID($YTPlayer.attr("href")).playlistID;
                let start_from_last = 0;
                if (jQuery.mbCookie.get("YTPlayer_start_from" + YTPlayer.videoID) && (start_from_last = parseFloat(jQuery.mbCookie.get("YTPlayer_start_from" + YTPlayer.videoID))), YTPlayer.opt.remember_last_time && start_from_last && (YTPlayer.start_from_last = start_from_last, jQuery.mbCookie.remove("YTPlayer_start_from" + YTPlayer.videoID)), YTPlayer.isPlayer = $YTPlayer.is(YTPlayer.opt.containment), YTPlayer.isBackground = YTPlayer.opt.containment.is("body"), YTPlayer.isBackground && ytp.backgroundIsInited) return;
                if (YTPlayer.isPlayer && $YTPlayer.show(), YTPlayer.overlay = jQuery("<div/>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }).addClass("YTPOverlay"), $YTPlayer.changeCoverImage(), YTPlayer.wrapper = jQuery("<div/>").attr("id", "wrapper_" + YTPlayer.id).css({
                    position: "absolute",
                    zIndex: 0,
                    minWidth: "100%",
                    minHeight: "100%",
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    opacity: 0
                }).addClass("mbYTP_wrapper"), YTPlayer.isPlayer) {
                    let e = jQuery.browser.mobile ? "inlinePlayButtonMobile" : "inlinePlayButton";
                    YTPlayer.inlinePlayButton = jQuery("<div/>").addClass("inlinePlayButton").html(jQuery.mbYTPlayer.controls.play), $YTPlayer.append(YTPlayer.inlinePlayButton), YTPlayer.inlinePlayButton.on("click", function (e) {
                        $YTPlayer.YTPPlay(), YTPlayer.inlinePlayButton.hide(), YTPlayer.opt.goFullScreenOnPlay && $YTPlayer.YTPFullscreen(), e.stopPropagation()
                    }), YTPlayer.opt.autoPlay && YTPlayer.inlinePlayButton.hide(), YTPlayer.overlay.on("click", function () {
                        $YTPlayer.YTPTogglePlay(), YTPlayer.opt.goFullScreenOnPlay && $YTPlayer.YTPFullscreen()
                    }).css({cursor: "pointer"})
                }
                let playerBox = jQuery("<div/>").attr("id", YTPlayer.playerID).addClass("playerBox");
                if (playerBox.css({
                    position: "absolute",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    opacity: 1
                }), YTPlayer.wrapper.append(playerBox), playerBox.after(YTPlayer.overlay), YTPlayer.isPlayer && (YTPlayer.inlineWrapper = jQuery("<div/>").addClass("inline-YTPlayer"), YTPlayer.inlineWrapper.css({
                    position: "relative",
                    maxWidth: YTPlayer.opt.containment.css("width")
                }), YTPlayer.opt.containment.css({
                    position: "relative",
                    paddingBottom: "56.25%",
                    overflow: "hidden",
                    height: 0
                }), YTPlayer.opt.containment.wrap(YTPlayer.inlineWrapper)), YTPlayer.opt.containment.children().not("script, style").each(function () {
                    "static" === jQuery(this).css("position") && jQuery(this).css("position", "relative")
                }), YTPlayer.isBackground ? (jQuery("body").css({boxSizing: "border-box"}), YTPlayer.wrapper.css({
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 0
                })) : "static" === YTPlayer.opt.containment.css("position") && (YTPlayer.opt.containment.css({position: "relative"}), $YTPlayer.show()), YTPlayer.opt.containment.prepend(YTPlayer.wrapper), YTPlayer.isBackground || YTPlayer.overlay.on("mouseenter", function () {
                    YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.addClass("visible")
                }).on("mouseleave", function () {
                    YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.removeClass("visible")
                }), jQuery.mbBrowser.mobile && !YTPlayer.opt.useOnMobile) return YTPlayer.opt.coverImage && (YTPlayer.wrapper.css({
                    backgroundImage: "url(" + YTPlayer.opt.coverImage + ")",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    opacity: 1
                }), YTPlayer.wrapper.css({opacity: 1})), $YTPlayer;
                jQuery.mbBrowser.mobile && YTPlayer.opt.autoPlay && YTPlayer.opt.useOnMobile && jQuery("body").one("touchstart", function () {
                    YTPlayer.player.playVideo()
                }), jQuery(document).one("YTAPIReady", function () {
                    $YTPlayer.trigger("YTAPIReady_" + YTPlayer.id), ytp.YTAPIReady = !0
                }), YTPlayer.isOnScreen = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage), $YTPlayer.one("YTAPIReady_" + YTPlayer.id, function () {
                    let e = this, r = jQuery(e);
                    e.isBackground && ytp.backgroundIsInited || e.isInit || (e.isBackground && (ytp.backgroundIsInited = !0), e.opt.autoPlay = void 0 === e.opt.autoPlay ? !!e.isBackground : e.opt.autoPlay, e.opt.vol = e.opt.vol ? e.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(e), jQuery(e).on("YTPChanged", function (t) {
                        if (e.isInit) return;
                        e.isInit = !0;
                        let a = {
                            modestbranding: 1,
                            autoplay: 0,
                            controls: 0,
                            showinfo: 0,
                            rel: 0,
                            enablejsapi: 1,
                            version: 3,
                            playerapiid: e.playerID,
                            origin: "*",
                            allowfullscreen: !0,
                            wmode: "transparent",
                            iv_load_policy: e.opt.showAnnotations,
                            cc_load_policy: e.opt.cc_load_policy,
                            playsinline: jQuery.mbBrowser.mobile && !e.isPlayer ? 1 : 0,
                            html5: document.createElement("video").canPlayType ? 1 : 0
                        };
                        new YT.Player(e.playerID, {
                            playerVars: a, events: {
                                onReady: function (t) {
                                    e.player = t.target, e.player.loadVideoById({
                                        videoId: e.videoID.toString(),
                                        suggestedQuality: e.opt.quality
                                    }), r.trigger("YTPlayerIsReady_" + e.id)
                                }, onStateChange: function (r) {
                                    if ("function" != typeof r.target.getPlayerState) return;
                                    let t, a = r.target.getPlayerState();
                                    if (e.preventTrigger || e.isStarting) return void (e.preventTrigger = !1);
                                    switch (e.state = a, a) {
                                        case-1:
                                            t = "YTPUnstarted";
                                            break;
                                        case 0:
                                            t = "YTPRealEnd";
                                            break;
                                        case 1:
                                            t = "YTPPlay", e.controlBar.length && e.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.pause), e.isPlayer && e.inlinePlayButton.hide(), jQuery(document).off("mousedown.YTPstart");
                                            break;
                                        case 2:
                                            t = "YTPPause", e.controlBar.length && e.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play), e.isPlayer && e.inlinePlayButton.show();
                                            break;
                                        case 3:
                                            t = "YTPBuffering", e.controlBar.length && e.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play);
                                            break;
                                        case 5:
                                            t = "YTPCued"
                                    }
                                    let o = jQuery.Event(t);
                                    o.time = e.currentTime, jQuery(e).trigger(o)
                                }, onPlaybackQualityChange: function (r) {
                                    let t = r.target.getPlaybackQuality(), a = jQuery.Event("YTPQualityChange");
                                    a.quality = t, jQuery(e).trigger(a)
                                }, onError: function (t) {
                                    switch ("function" == typeof e.opt.onError && e.opt.onError(r, t), console.debug("error:", t), t.data) {
                                        case 2:
                                            console.error("video ID:: " + e.videoID + ": The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.");
                                            break;
                                        case 5:
                                            console.error("video ID:: " + e.videoID + ": The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.");
                                            break;
                                        case 100:
                                            console.error("video ID:: " + e.videoID + ": The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.");
                                            break;
                                        case 101:
                                        case 150:
                                            console.error("video ID:: " + e.videoID + ": The video doesn't exist or The owner does not allow it to be played in embedded players.")
                                    }
                                    e.isList && jQuery(e).YTPPlayNext()
                                }
                            }
                        }), r.on("YTPlayerIsReady_" + e.id, function () {
                            if (e.isReady) return this;
                            e.playerEl = e.player.getIframe(), jQuery(e.playerEl).unselectable(), r.optimizeDisplay(), jQuery(window).off("resize.YTP_" + e.id).on("resize.YTP_" + e.id, function () {
                                r.optimizeDisplay()
                            }), jQuery(window).off("orientationchange.YTP_" + e.id).on("orientationchange.YTP_" + e.id, function () {
                                r.optimizeDisplay()
                            }), e.opt.remember_last_time && jQuery(window).on("unload.YTP_" + e.id, function () {
                                let r = e.player.getCurrentTime();
                                jQuery.mbCookie.set("YTPlayer_start_from" + e.videoID, r, 0)
                            }), r.YTPCheckForState()
                        })
                    }))
                }), $YTPlayer.off("YTPTime.mask"), jQuery.mbYTPlayer.applyMask(YTPlayer), console.timeEnd("YTPlayerInit")
            })
        },
        isOnScreen: function (e, r) {
            r = r || 10;
            let t = e.wrapper, a = jQuery(window).scrollTop(), o = a + jQuery(window).height(),
                n = t.height() * r / 100, i = t.offset().top + n;
            return t.offset().top + (t.height() - n) <= o && i >= a
        },
        getDataFromAPI: function (e) {
            e.videoData = jQuery.mbStorage.get("YTPlayer_data_" + e.videoID), e.videoData ? (setTimeout(function () {
                e.dataReceived = !0;
                let r = jQuery.Event("YTPChanged");
                r.time = e.currentTime, r.videoId = e.videoID, r.opt = e.opt, jQuery(e).trigger(r);
                let t = jQuery.Event("YTPData");
                t.prop = {};
                for (let r in e.videoData) e.videoData.hasOwnProperty(r) && (t.prop[r] = e.videoData[r]);
                jQuery(e).trigger(t)
            }, e.opt.fadeOnStartTime), e.hasData = !0) : jQuery.mbYTPlayer.apiKey ? jQuery.getJSON("https://www.googleapis.com/youtube/v3/videos?id=" + e.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (r) {
                e.dataReceived = !0;
                let t = jQuery.Event("YTPChanged");
                t.time = e.currentTime, t.videoId = e.videoID, jQuery(e).trigger(t), r.items[0] ? (!function (r) {
                    e.videoData = {}, e.videoData.id = e.videoID, e.videoData.channelTitle = r.channelTitle, e.videoData.title = r.title, e.videoData.description = r.description.length < 400 ? r.description : r.description.substring(0, 400) + " ...", e.videoData.thumb_max = r.thumbnails.maxres ? r.thumbnails.maxres.url : null, e.videoData.thumb_high = r.thumbnails.high ? r.thumbnails.high.url : null, e.videoData.thumb_medium = r.thumbnails.medium ? r.thumbnails.medium.url : null, jQuery.mbStorage.set("YTPlayer_data_" + e.videoID, e.videoData)
                }(r.items[0].snippet), e.hasData = !0) : (e.videoData = {}, e.hasData = !1);
                let a = jQuery.Event("YTPData");
                a.prop = {};
                for (let r in e.videoData) a.prop[r] = e.videoData[r];
                jQuery(e).trigger(a)
            }).fail(function (r) {
                console.error("YT data error:: ", r), e.hasData = !1;
                let t = jQuery.Event("YTPChanged");
                t.time = e.currentTime, t.videoId = e.videoID, jQuery(e).trigger(t)
            }) : (setTimeout(function () {
                let r = jQuery.Event("YTPChanged");
                r.time = e.currentTime, r.videoId = e.videoID, jQuery(e).trigger(r)
            }, 10), e.videoData = null), e.opt.ratio = "auto" == e.opt.ratio ? 16 / 9 : e.opt.ratio, e.isPlayer && !e.opt.autoPlay && (e.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(e).append(e.loading), e.loading.fadeIn())
        },
        removeStoredData: function () {
            jQuery.mbStorage.remove()
        },
        getVideoData: function () {
            return this.get(0).videoData
        },
        getVideoID: function () {
            return this.get(0).videoID || !1
        },
        getPlaylistID: function () {
            return this.get(0).playlistID || !1
        },
        setVideoQuality: function (e) {
            return this
        },
        getVideoQuality: function () {
            return this.get(0).player.getPlaybackQuality()
        },
        playlist: function (e, r, t) {
            let a = this.get(0);
            return a.isList = !0, r && (e = jQuery.shuffle(e)), a.videoID || (a.videos = e, a.videoCounter = 1, a.videoLength = e.length, jQuery(a).data("property", e[0]), jQuery(a).YTPlayer()), "function" == typeof t && jQuery(a).on("YTPChanged", function () {
                t(a)
            }), jQuery(a).on("YTPEnd", function () {
                jQuery(a).YTPPlayNext()
            }), this
        },
        playNext: function () {
            let e = this.get(0);
            return e.videoCounter++, e.videoCounter > e.videoLength && (e.videoCounter = 1), jQuery(e).YTPPlayIndex(e.videoCounter), this
        },
        playPrev: function () {
            let e = this.get(0);
            return e.videoCounter--, e.videoCounter <= 0 && (e.videoCounter = e.videoLength), jQuery(e).YTPPlayIndex(e.videoCounter), this
        },
        playIndex: function (e) {
            let r = this.get(0);
            r.checkForStartAt && (clearInterval(r.checkForStartAt), clearInterval(r.getState)), r.videoCounter = e, r.videoCounter >= r.videoLength && (r.videoCounter = r.videoLength);
            let t = r.videos[r.videoCounter - 1];
            return jQuery(r).YTPChangeVideo(t), this
        },
        changeVideo: function (e) {
            let r = this, t = r.get(0);
            t.opt.startAt = 0, t.opt.stopAt = 0, t.opt.mask = !1, t.opt.mute = !0, t.opt.autoPlay = !0, t.opt.addFilters = !1, t.opt.coverImage = !1, t.hasData = !1, t.hasChanged = !0, t.player.loopTime = void 0, e && jQuery.extend(t.opt, e), t.videoID = getYTPVideoID(t.opt.videoURL).videoID, t.opt.loop && "boolean" == typeof t.opt.loop && (t.opt.loop = 9999), t.wrapper.css({background: "none"}), jQuery(t.playerEl).CSSAnimate({opacity: 0}, t.opt.fadeOnStartTime, function () {
                jQuery.mbYTPlayer.getDataFromAPI(t), r.YTPGetPlayer().loadVideoById({
                    videoId: t.videoID,
                    suggestedQuality: t.opt.quality
                }), r.YTPPause(), r.optimizeDisplay(), t.checkForStartAt && (clearInterval(t.checkForStartAt), clearInterval(t.getState)), r.YTPCheckForState()
            });
            let a = jQuery.Event("YTPChangeVideo");
            return a.time = t.currentTime, jQuery(t).trigger(a), jQuery.mbYTPlayer.applyMask(t), this
        },
        getPlayer: function () {
            let e = this.get(0);
            return e.isReady && e.player || null
        },
        playerDestroy: function () {
            let e = this.get(0);
            return e.isReady ? (ytp.YTAPIReady = !0, ytp.backgroundIsInited = !1, e.isInit = !1, e.videoID = null, e.isReady = !1, e.wrapper.remove(), jQuery("#controlBar_" + e.id).remove(), clearInterval(e.checkForStartAt), clearInterval(e.getState), this) : this
        },
        fullscreen: function (real) {
            let YTPlayer = this.get(0);
            void 0 === real && (real = eval(YTPlayer.opt.realFullscreen));
            let controls = jQuery("#controlBar_" + YTPlayer.id), fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isPlayer ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                let e = jQuery.mbBrowser.mozilla ? "mozfullscreenchange" : jQuery.mbBrowser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(e).on(e, function () {
                    RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen") ? jQuery(YTPlayer).trigger("YTPFullScreenStart") : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), videoWrapper.removeClass("YTPFullscreen"), videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({zIndex: 0}), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
                })
            }
            if (YTPlayer.isAlone) jQuery(document).off("mousemove.YTPlayer"), clearTimeout(YTPlayer.hideCursor), YTPlayer.overlay.css({cursor: "auto"}), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({zIndex: 0})), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1; else {
                function hideMouse() {
                    YTPlayer.overlay.css({cursor: "none"})
                }

                jQuery(document).on("mousemove.YTPlayer", function (e) {
                    YTPlayer.overlay.css({cursor: "auto"}), clearTimeout(YTPlayer.hideCursor), jQuery(e.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
                }), hideMouse(), real ? (videoWrapper.css({opacity: 0}), videoWrapper.addClass("YTPFullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function () {
                    videoWrapper.CSSAnimate({opacity: 1}, 2 * YTPlayer.opt.fadeOnStartTime), videoWrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
                }, YTPlayer.opt.fadeOnStartTime)) : videoWrapper.css({zIndex: 1e4}).CSSAnimate({opacity: 1}, 2 * YTPlayer.opt.fadeOnStartTime), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0
            }

            function RunPrefixMethod(e, r) {
                let t, a, o = ["webkit", "moz", "ms", "o", ""], n = 0;
                for (; n < o.length && !e[t];) {
                    if (t = r, "" == o[n] && (t = t.substr(0, 1).toLowerCase() + t.substr(1)), "undefined" != (a = typeof e[t = o[n] + t])) return o = [o[n]], "function" == a ? e[t]() : e[t];
                    n++
                }
            }

            function launchFullscreen(e) {
                RunPrefixMethod(e, "RequestFullScreen")
            }

            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
            }

            return this
        },
        toggleLoops: function () {
            let e = this.get(0), r = e.opt;
            return 1 == r.loop ? r.loop = 0 : (r.startAt ? e.player.seekTo(r.startAt) : e.player.playVideo(), r.loop = 1), this
        },
        play: function () {
            let e = this.get(0), r = jQuery(e);
            return e.isReady ? (setTimeout(function () {
                r.YTPSetAbundance(e.opt.abundance)
            }, 300), e.player.playVideo(), jQuery(e.playerEl).css({opacity: 1}), e.wrapper.css({backgroundImage: "none"}), e.wrapper.CSSAnimate({opacity: e.isAlone ? 1 : e.opt.opacity}, e.opt.fadeOnStartTime), jQuery("#controlBar_" + e.id).find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.pause), e.state = 1, this) : this
        },
        togglePlay: function (e) {
            let r = this.get(0);
            return r.isReady ? (1 == r.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof e && e(r.state), this) : this
        },
        stop: function () {
            let e = this.get(0);
            return e.isReady ? (jQuery("#controlBar_" + e.id).find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play), e.player.stopVideo(), this) : this
        },
        pause: function () {
            let e = this.get(0);
            return e.isReady ? (e.opt.abundance < .2 && this.YTPSetAbundance(.2), e.player.pauseVideo(), e.state = 2, this) : this
        },
        seekTo: function (e) {
            let r = this.get(0);
            return r.isReady ? (r.player.seekTo(e, !0), this) : this
        },
        getPlaybackRate: function () {
            let e = this.get(0);
            return e.isReady ? e.player.getPlaybackRate() : this
        },
        setPlaybackRate: function (e) {
            let r = this.get(0);
            return r.isReady ? (r.player.setPlaybackRate(e), this) : this
        },
        setVolume: function (e) {
            let r = this.get(0);
            return r.isReady ? (r.opt.vol = e, this.YTPUnmute(), r.player.setVolume(r.opt.vol), r.volumeBar && r.volumeBar.length && r.volumeBar.updateSliderVal(e), this) : this
        },
        getVolume: function () {
            let e = this.get(0);
            return e.isReady ? e.player.getVolume() : this
        },
        toggleVolume: function () {
            let e = this.get(0);
            return e.isReady ? (e.isMute ? (jQuery.mbBrowser.mobile || this.YTPSetVolume(e.opt.vol), this.YTPUnmute()) : this.YTPMute(), this) : this
        },
        mute: function () {
            let e = this.get(0);
            if (!e.isReady) return this;
            if (e.isMute) return this;
            e.player.mute(), e.isMute = !0, e.player.setVolume(0), e.volumeBar && e.volumeBar.length && e.volumeBar.width() > 10 && e.volumeBar.updateSliderVal(0), jQuery("#controlBar_" + e.id).find(".mb_YTPMuteUnmute").html(jQuery.mbYTPlayer.controls.unmute), jQuery(e).addClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.addClass("muted");
            let r = jQuery.Event("YTPMuted");
            return r.time = e.currentTime, e.preventTrigger || jQuery(e).trigger(r), this
        },
        unmute: function () {
            let e = this.get(0);
            if (!e.isReady) return this;
            if (!e.isMute) return this;
            e.player.unMute(), e.isMute = !1, jQuery(e).YTPSetVolume(e.opt.vol), e.volumeBar && e.volumeBar.length && e.volumeBar.updateSliderVal(e.opt.vol > 10 ? e.opt.vol : 10), jQuery("#controlBar_" + e.id).find(".mb_YTPMuteUnmute").html(jQuery.mbYTPlayer.controls.mute), jQuery(e).removeClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.removeClass("muted");
            let r = jQuery.Event("YTPUnmuted");
            return r.time = e.currentTime, e.preventTrigger || jQuery(e).trigger(r), this
        },
        applyFilter: function (e, r) {
            let t = this.get(0);
            if (!t.isReady) return this;
            t.filters[e].value = r, t.filtersEnabled && this.YTPEnableFilters()
        },
        applyFilters: function (e) {
            let r = this, t = r.get(0);
            if (!t.isReady) return jQuery(t).on("YTPReady", function () {
                r.YTPApplyFilters(e)
            }), this;
            for (let t in e) r.YTPApplyFilter(t, e[t]);
            r.trigger("YTPFiltersApplied")
        },
        toggleFilter: function (e, r) {
            let t = this.get(0);
            return t.isReady ? (t.filters[e].value ? t.filters[e].value = 0 : t.filters[e].value = r, t.filtersEnabled && jQuery(t).YTPEnableFilters(), this) : this
        },
        toggleFilters: function (e) {
            let r = this.get(0);
            return r.isReady ? (r.filtersEnabled ? (jQuery(r).trigger("YTPDisableFilters"), jQuery(r).YTPDisableFilters()) : (jQuery(r).YTPEnableFilters(), jQuery(r).trigger("YTPEnableFilters")), "function" == typeof e && e(r.filtersEnabled), this) : this
        },
        disableFilters: function () {
            let e = this.get(0);
            if (!e.isReady) return this;
            let r = jQuery(e.playerEl);
            return r.css("-webkit-filter", ""), r.css("filter", ""), e.filtersEnabled = !1, this
        },
        enableFilters: function () {
            let e = this.get(0);
            if (!e.isReady) return this;
            let r = jQuery(e.playerEl), t = "";
            for (let r in e.filters) e.filters[r].value && (t += r.replace("_", "-") + "(" + e.filters[r].value + e.filters[r].unit + ") ");
            return r.css("-webkit-filter", t), r.css("filter", t), e.filtersEnabled = !0, this
        },
        removeFilter: function (e, r) {
            let t = this, a = t.get(0);
            if (!a.isReady) return this;
            if ("function" == typeof e && (r = e, e = null), e) t.YTPApplyFilter(e, 0), "function" == typeof r && r(e); else {
                for (let e in a.filters) a.filters.hasOwnProperty(e) && (t.YTPApplyFilter(e, 0), "function" == typeof r && r(e));
                a.filters = jQuery.extend(!0, {}, jQuery.mbYTPlayer.defaultFilters)
            }
            let o = jQuery.Event("YTPFiltersApplied");
            return t.trigger(o), this
        },
        getFilters: function () {
            let e = this.get(0);
            return e.isReady ? e.filters : this
        },
        addMask: function (e) {
            let r = this.get(0);
            e || (e = r.actualMask);
            let t = jQuery("<img/>").attr("src", e).on("load", function () {
                r.overlay.CSSAnimate({opacity: 0}, r.opt.fadeOnStartTime, function () {
                    r.hasMask = !0, t.remove(), r.overlay.css({
                        backgroundImage: "url(" + e + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover"
                    }), r.overlay.CSSAnimate({opacity: 1}, r.opt.fadeOnStartTime)
                })
            });
            return this
        },
        removeMask: function () {
            let e = this.get(0);
            return e.overlay.CSSAnimate({opacity: 0}, e.opt.fadeOnStartTime, function () {
                e.hasMask = !1, e.overlay.css({
                    backgroundImage: "",
                    backgroundRepeat: "",
                    backgroundPosition: "",
                    backgroundSize: ""
                }), e.overlay.CSSAnimate({opacity: 1}, e.opt.fadeOnStartTime)
            }), this
        },
        applyMask: function (e) {
            let r = jQuery(e);
            if (r.off("YTPTime.mask"), e.opt.mask) if ("string" == typeof e.opt.mask) r.YTPAddMask(e.opt.mask), e.actualMask = e.opt.mask; else if ("object" == typeof e.opt.mask) {
                for (let r in e.opt.mask) e.opt.mask[r] && (img = jQuery("<img/>").attr("src", e.opt.mask[r]));
                e.opt.mask[0] && r.YTPAddMask(e.opt.mask[0]), r.on("YTPTime.mask", function (t) {
                    for (let a in e.opt.mask) t.time == a && (e.opt.mask[a] ? (r.YTPAddMask(e.opt.mask[a]), e.actualMask = e.opt.mask[a]) : r.YTPRemoveMask())
                })
            }
        },
        toggleMask: function () {
            let e = this.get(0), r = jQuery(e);
            return e.hasMask ? r.YTPRemoveMask() : r.YTPAddMask(), this
        },
        manageProgress: function () {
            let e = this.get(0), r = jQuery("#controlBar_" + e.id), t = r.find(".mb_YTPProgress"),
                a = r.find(".mb_YTPLoaded"), o = r.find(".mb_YTPseekbar"), n = t.outerWidth(),
                i = Math.floor(e.player.getCurrentTime()), l = Math.floor(e.player.getDuration()), s = i * n / l,
                u = 100 * e.player.getVideoLoadedFraction();
            return a.css({left: 0, width: u + "%"}), o.css({left: 0, width: s}), {totalTime: l, currentTime: i}
        },
        buildControls: function (YTPlayer) {
            if (jQuery("#controlBar_" + YTPlayer.id).remove(), !YTPlayer.opt.showControls) return void (YTPlayer.controlBar = !1);
            if (YTPlayer.opt.showYTLogo = YTPlayer.opt.showYTLogo || YTPlayer.opt.printUrl, jQuery("#controlBar_" + YTPlayer.id).length) return;
            YTPlayer.controlBar = jQuery("<div/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
                whiteSpace: "noWrap",
                position: YTPlayer.isBackground ? "fixed" : "absolute",
                zIndex: YTPlayer.isBackground ? 1e4 : 1e3
            }).hide().on("click", function (e) {
                e.stopPropagation()
            });
            let buttonBar = jQuery("<div/>").addClass("buttonBar"),
                playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlayPause ytpicon").on("click", function (e) {
                    e.stopPropagation(), jQuery(YTPlayer).YTPTogglePlay()
                }),
                MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").on("click", function (e) {
                    e.stopPropagation(), jQuery(YTPlayer).YTPToggleVolume()
                }), volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({display: "inline-block"});
            YTPlayer.volumeBar = volumeBar;
            let idx = jQuery("<span/>").addClass("mb_YTPTime"),
                vURL = YTPlayer.opt.videoURL ? YTPlayer.opt.videoURL : "";
            vURL.indexOf("http") < 0 && (vURL = "https://www.youtube.com/watch?v=" + YTPlayer.opt.videoURL);
            let movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
                    window.open(vURL, "viewOnYT")
                }),
                onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function (e) {
                    e.stopPropagation(), jQuery(YTPlayer).YTPFullscreen(YTPlayer.opt.realFullscreen)
                }),
                progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").on("click", function (e) {
                    e.stopPropagation(), timeBar.css({width: e.clientX - timeBar.offset().left}), YTPlayer.timeW = e.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({width: 0});
                    let r = Math.floor(YTPlayer.player.getDuration());
                    YTPlayer.goto = timeBar.outerWidth() * r / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({width: 0})
                }), loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
                timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
            progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), YTPlayer.opt.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realFullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
                initialval: YTPlayer.opt.vol,
                scale: 100,
                orientation: "h",
                callback: function (e) {
                    0 == e.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(e.value), YTPlayer.isMute || (YTPlayer.opt.vol = e.value)
                }
            })
        },
        changeCoverImage: function (e) {
            let r = this.get(0);
            if (r.opt.coverImage || r.orig_containment_background) {
                let t = e || (r.opt.coverImage ? "url(" + r.opt.coverImage + ") center center" : r.orig_containment_background);
                t && r.opt.containment.css({background: t, backgroundSize: "cover", backgroundAttachment: "fixed"})
            }
            return this
        },
        checkForState: function () {
            let YTPlayer = this.get(0), $YTPlayer = jQuery(YTPlayer);
            clearInterval(YTPlayer.getState);
            let interval = 100;
            if (!jQuery.contains(document, YTPlayer)) return $YTPlayer.YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt);
            jQuery.mbYTPlayer.checkForStart(YTPlayer), YTPlayer.getState = setInterval(function () {
                let $YTPlayer = jQuery(YTPlayer);
                if (!YTPlayer.isReady) return;
                let prog = jQuery(YTPlayer).YTPManageProgress(),
                    stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.currentTime != prog.currentTime) {
                    let e = jQuery.Event("YTPTime");
                    e.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(e)
                }
                if (YTPlayer.currentTime = prog.currentTime, YTPlayer.totalTime = YTPlayer.player.getDuration(), 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, YTPlayer.preventTrigger = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, YTPlayer.preventTrigger = !0, $YTPlayer.YTPPause())), YTPlayer.opt.playOnlyIfVisible) {
                    let e = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage);
                    e || 1 != YTPlayer.state ? e && !YTPlayer.isOnScreen && (YTPlayer.isOnScreen = !0, YTPlayer.player.playVideo()) : (YTPlayer.isOnScreen = !1, $YTPlayer.YTPPause())
                }
                if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), YTPlayer.player.getPlayerState() > 0 && (parseFloat(YTPlayer.player.getDuration() - YTPlayer.opt.fadeOnStartTime / 1e3) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) >= stopAt)) {
                    if (YTPlayer.isEnded) return;
                    if (YTPlayer.isEnded = !0, setTimeout(function () {
                        YTPlayer.isEnded = !1
                    }, 1e3), YTPlayer.isList) {
                        if (!YTPlayer.opt.loop || YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1) {
                            YTPlayer.player.loopTime = void 0, clearInterval(YTPlayer.getState);
                            let e = jQuery.Event("YTPEnd");
                            return e.time = YTPlayer.currentTime, void jQuery(YTPlayer).trigger(e)
                        }
                    } else if (!YTPlayer.opt.loop || YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1) return YTPlayer.player.loopTime = void 0, YTPlayer.state = 2, $YTPlayer.changeCoverImage(YTPlayer), jQuery(YTPlayer).YTPPause(), void YTPlayer.wrapper.CSSAnimate({opacity: 0}, YTPlayer.opt.fadeOnStartTime, function () {
                        YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play), $YTPlayer.changeCoverImage();
                        let e = jQuery.Event("YTPEnd");
                        e.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(e), YTPlayer.player.seekTo(YTPlayer.opt.startAt, !0)
                    });
                    YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1, YTPlayer.opt.startAt = YTPlayer.opt.startAt || 1, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, YTPlayer.player.seekTo(YTPlayer.opt.startAt, !0)
                }
            }, interval)
        },
        checkForStart: function (YTPlayer) {
            let $YTPlayer = jQuery(YTPlayer);
            if (!jQuery.contains(document, YTPlayer)) return void $YTPlayer.YTPPlayerDestroy();
            if (jQuery.mbYTPlayer.buildControls(YTPlayer), YTPlayer.overlay) if (YTPlayer.opt.addRaster) {
                let e = "dot" == YTPlayer.opt.addRaster ? "raster-dot" : "raster";
                YTPlayer.overlay.addClass(YTPlayer.isRetina ? e + " retina" : e)
            } else YTPlayer.overlay.removeClass(function (e, r) {
                let t = r.split(" "), a = [];
                return jQuery.each(t, function (e, r) {
                    /raster.*/.test(r) && a.push(r)
                }), a.push("retina"), a.join(" ")
            });
            YTPlayer.preventTrigger = !0, YTPlayer.state = 2, YTPlayer.preventTrigger = !0, YTPlayer.player.mute(), YTPlayer.player.playVideo(), YTPlayer.isStarting = !0;
            let startAt = YTPlayer.start_from_last ? YTPlayer.start_from_last : YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
            return YTPlayer.preventTrigger = !0, YTPlayer.checkForStartAt = setInterval(function () {
                YTPlayer.player.mute(), YTPlayer.player.seekTo(startAt, !0);
                let canPlayVideo = YTPlayer.player.getVideoLoadedFraction() >= startAt / YTPlayer.player.getDuration();
                if (jQuery.browser.mobile && (canPlayVideo = !0), YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= startAt && canPlayVideo) {
                    YTPlayer.start_from_last = null, YTPlayer.preventTrigger = !0, $YTPlayer.YTPPause(), clearInterval(YTPlayer.checkForStartAt), "function" == typeof YTPlayer.opt.onReady && YTPlayer.opt.onReady(YTPlayer), YTPlayer.isReady = !0, $YTPlayer.YTPRemoveFilter(), YTPlayer.opt.addFilters ? $YTPlayer.YTPApplyFilters(YTPlayer.opt.addFilters) : $YTPlayer.YTPApplyFilters(), $YTPlayer.YTPEnableFilters();
                    let YTPready = jQuery.Event("YTPReady");
                    if (YTPready.time = YTPlayer.currentTime, $YTPlayer.trigger(YTPready), YTPlayer.state = 2, YTPlayer.opt.mute ? $YTPlayer.YTPMute() : (YTPlayer.opt.autoPlay && (console.debug("To make the video 'auto-play' you must mute the audio according with the latest vendor policy"), YTPlayer.player.mute()), YTPlayer.player.unMute()), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) ? _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]) : "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()), YTPlayer.opt.autoPlay) {
                        let e = jQuery.Event("YTPStart");
                        e.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(e), YTPlayer.isStarting = !1, "mac" === jQuery.mbBrowser.os.name && jQuery.mbBrowser.safari && jQuery("body").one("mousedown.YTPstart", function () {
                            $YTPlayer.YTPPlay()
                        }), $YTPlayer.YTPPlay(), console.timeEnd("YTPlayerStartPlay")
                    } else YTPlayer.preventTrigger = !0, $YTPlayer.YTPPause(), YTPlayer.start_from_last && YTPlayer.player.seekTo(startAt, !0), setTimeout(function () {
                        YTPlayer.preventTrigger = !0, $YTPlayer.YTPPause(), YTPlayer.isPlayer || (YTPlayer.opt.coverImage ? (YTPlayer.wrapper.css({opacity: 0}), setTimeout(function () {
                            $YTPlayer.changeCoverImage()
                        }, YTPlayer.opt.fadeOnStartTime)) : (jQuery(YTPlayer.playerEl).CSSAnimate({opacity: 1}, YTPlayer.opt.fadeOnStartTime), YTPlayer.wrapper.CSSAnimate({opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity}, YTPlayer.opt.fadeOnStartTime))), YTPlayer.isStarting = !1
                    }, 500), YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play);
                    console.debug(), YTPlayer.isPlayer && !YTPlayer.opt.autoPlay && YTPlayer.loading && YTPlayer.loading.length && (YTPlayer.loading.html("Ready"), setTimeout(function () {
                        YTPlayer.loading.fadeOut()
                    }, 100)), YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.slideDown(1e3)
                }
                "mac" === jQuery.mbBrowser.os.name && jQuery.mbBrowser.safari && (YTPlayer.player.playVideo(), startAt >= 0 && YTPlayer.player.seekTo(startAt, !0))
            }, 100), $YTPlayer
        },
        getTime: function () {
            let e = this.get(0);
            return jQuery.mbYTPlayer.formatTime(e.currentTime)
        },
        getTotalTime: function () {
            let e = this.get(0);
            return jQuery.mbYTPlayer.formatTime(e.totalTime)
        },
        formatTime: function (e) {
            let r = Math.floor(e / 60), t = Math.floor(e - 60 * r);
            return (r <= 9 ? "0" + r : r) + " : " + (t <= 9 ? "0" + t : t)
        },
        setAnchor: function (e) {
            this.optimizeDisplay(e)
        },
        getAnchor: function () {
            return this.get(0).opt.anchor
        },
        setAbundance: function (e, r) {
            let t = this.get(0);
            return r && (t.opt.abundance = e), this.optimizeDisplay(t.opt.anchor, e), this
        },
        getAbundance: function () {
            return this.get(0).opt.abundance
        },
        setOption: function (e, r) {
            return this.get(0).opt[e] = r, this
        }
    }, jQuery.fn.optimizeDisplay = function (anchor, abundanceX) {
        let YTPlayer = this.get(0), vid = {}, el = YTPlayer.wrapper, iframe = jQuery(YTPlayer.playerEl);
        YTPlayer.opt.anchor = anchor || YTPlayer.opt.anchor, YTPlayer.opt.anchor = "undefined " != typeof YTPlayer.opt.anchor ? YTPlayer.opt.anchor : "center,center";
        let YTPAlign = YTPlayer.opt.anchor.split(","), ab = abundanceX || YTPlayer.opt.abundance;
        if (YTPlayer.opt.optimizeDisplay) {
            let abundance = el.height() * ab, win = {};
            win.width = el.outerWidth(), win.height = el.outerHeight() + abundance, YTPlayer.opt.ratio = "auto" === YTPlayer.opt.ratio ? 16 / 9 : YTPlayer.opt.ratio, YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio), vid.width = win.width + abundance, vid.height = Math.ceil(vid.width / YTPlayer.opt.ratio), vid.marginTop = Math.ceil(-(vid.height - win.height + abundance) / 2), vid.marginLeft = -abundance / 2;
            let lowest = vid.height < win.height;
            lowest && (vid.height = win.height + abundance, vid.width = Math.ceil(vid.height * YTPlayer.opt.ratio), vid.marginTop = -abundance / 2, vid.marginLeft = Math.ceil(-(vid.width - win.width) / 2));
            for (let e in YTPAlign) if (YTPAlign.hasOwnProperty(e)) {
                let r = YTPAlign[e].replace(/ /g, "");
                switch (r) {
                    case"top":
                        vid.marginTop = -abundance;
                        break;
                    case"bottom":
                        vid.marginTop = Math.ceil(-(vid.height - win.height) - abundance / 2);
                        break;
                    case"left":
                        vid.marginLeft = -abundance;
                        break;
                    case"right":
                        vid.marginLeft = Math.ceil(-(vid.width - win.width) + abundance / 2)
                }
            }
        } else vid.width = "100%", vid.height = "100%", vid.marginTop = 0, vid.marginLeft = 0;
        iframe.css({
            width: vid.width,
            height: vid.height,
            marginTop: vid.marginTop,
            marginLeft: vid.marginLeft,
            maxWidth: "initial"
        })
    }, jQuery.shuffle = function (e) {
        let r = e.slice(), t = r.length, a = t;
        for (; a--;) {
            let e = parseInt(Math.random() * t), o = r[a];
            r[a] = r[e], r[e] = o
        }
        return r
    }, jQuery.fn.unselectable = function () {
        return this.each(function () {
            jQuery(this).css({
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "user-select": "none"
            }).attr("unselectable", "on")
        })
    }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPCheckForState = jQuery.mbYTPlayer.checkForState, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPGetPlaylistID = jQuery.mbYTPlayer.getPlaylistID, jQuery.fn.YTPChangeVideo = jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeVideo, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPGetPlaybackRate = jQuery.mbYTPlayer.getPlaybackRate, jQuery.fn.YTPSetPlaybackRate = jQuery.mbYTPlayer.setPlaybackRate, jQuery.fn.changeCoverImage = jQuery.mbYTPlayer.changeCoverImage, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVolume = jQuery.mbYTPlayer.getVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPGetVideoQuality = jQuery.mbYTPlayer.getVideoQuality, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters, jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime, jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime, jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask, jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask, jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask, jQuery.fn.YTPGetAbundance = jQuery.mbYTPlayer.getAbundance, jQuery.fn.YTPSetAbundance = jQuery.mbYTPlayer.setAbundance, jQuery.fn.YTPSetAnchor = jQuery.mbYTPlayer.setAnchor, jQuery.fn.YTPGetAnchor = jQuery.mbYTPlayer.getAnchor, jQuery.fn.YTPSetOption = jQuery.mbYTPlayer.setOption
}(jQuery, ytp);
var nAgt = navigator.userAgent;

function isTouchSupported() {
    var e = nAgt.msMaxTouchPoints, r = "ontouchstart" in document.createElement("div");
    return !(!e && !r)
}

jQuery.browser = jQuery.browser || {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.androidStock = !1, jQuery.browser.msie = !1, jQuery.browser.edge = !1, jQuery.browser.ua = nAgt;
var getOS = function () {
    var e = {version: "Unknown version", name: "Unknown OS"};
    return -1 != navigator.appVersion.indexOf("Win") && (e.name = "Windows"), -1 != navigator.appVersion.indexOf("Mac") && 0 > navigator.appVersion.indexOf("Mobile") && (e.name = "Mac"), -1 != navigator.appVersion.indexOf("Linux") && (e.name = "Linux"), /Mac OS X/.test(nAgt) && !/Mobile/.test(nAgt) && (e.version = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1], e.version = e.version.replace(/_/g, ".").substring(0, 5)), /Windows/.test(nAgt) && (e.version = "Unknown.Unknown"), /Windows NT 5.1/.test(nAgt) && (e.version = "5.1"), /Windows NT 6.0/.test(nAgt) && (e.version = "6.0"), /Windows NT 6.1/.test(nAgt) && (e.version = "6.1"), /Windows NT 6.2/.test(nAgt) && (e.version = "6.2"), /Windows NT 10.0/.test(nAgt) && (e.version = "10.0"), /Linux/.test(nAgt) && /Linux/.test(nAgt) && (e.version = "Unknown.Unknown"), e.name = e.name.toLowerCase(), e.major_version = "Unknown", e.minor_version = "Unknown", "Unknown.Unknown" != e.version && (e.major_version = parseFloat(e.version.split(".")[0]), e.minor_version = parseFloat(e.version.split(".")[1])), e
}, nameOffset, verOffset, ix;
if (jQuery.browser.os = getOS(), jQuery.browser.hasTouch = isTouchSupported(), jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10), -1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4); else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident")) {
    jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
    var start = nAgt.indexOf("rv:") + 3, end = start + 4;
    jQuery.browser.fullVersion = nAgt.substring(start, end)
} else -1 != (verOffset = nAgt.indexOf("Edge")) ? (jQuery.browser.edge = !0, jQuery.browser.name = "Microsoft Edge", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5)) : -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 < nAgt.indexOf("mozilla/5.0") && -1 < nAgt.indexOf("android ") && -1 < nAgt.indexOf("applewebkit") && !(-1 < nAgt.indexOf("chrome")) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.browser.webkit = !0, jQuery.browser.androidStock = !0, jQuery.browser.name = "androidStock", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));

function uncamel(e) {
    return e.replace(/([A-Z])/g, function (e) {
        return "-" + e.toLowerCase()
    })
}

function setUnit(e, r) {
    return "string" != typeof e || e.match(/^[\-0-9\.]+jQuery/) ? "" + e + r : e
}

function setFilter(e, r, t) {
    var a = uncamel(r), o = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
    e[o + "filter"] = e[o + "filter"] || "", t = setUnit(t > jQuery.CSS.filters[r].max ? jQuery.CSS.filters[r].max : t, jQuery.CSS.filters[r].unit), e[o + "filter"] += a + "(" + t + ") ", delete e[r]
}

-1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion, jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && 765 < jQuery(window).width(), jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), jQuery.mbBrowser = jQuery.browser, jQuery.browser.versionCompare = function (e, r) {
    if ("stringstring" != typeof e + typeof r) return !1;
    for (var t = e.split("."), a = r.split("."), o = 0, n = Math.max(t.length, a.length); o < n; o++) {
        if (t[o] && !a[o] && 0 < parseInt(t[o]) || parseInt(t[o]) > parseInt(a[o])) return 1;
        if (a[o] && !t[o] && 0 < parseInt(a[o]) || parseInt(t[o]) < parseInt(a[o])) return -1
    }
    return 0
}, jQuery.support.CSStransition = function () {
    var e = (document.body || document.documentElement).style;
    return void 0 !== e.transition || void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.MsTransition || void 0 !== e.OTransition
}(), jQuery.CSS = {
    name: "mb.CSSAnimate",
    author: "Matteo Bicocchi",
    version: "2.0.0",
    transitionEnd: "transitionEnd",
    sfx: "",
    filters: {
        blur: {min: 0, max: 100, unit: "px"},
        brightness: {min: 0, max: 400, unit: "%"},
        contrast: {min: 0, max: 400, unit: "%"},
        grayscale: {min: 0, max: 100, unit: "%"},
        hueRotate: {min: 0, max: 360, unit: "deg"},
        invert: {min: 0, max: 100, unit: "%"},
        saturate: {min: 0, max: 400, unit: "%"},
        sepia: {min: 0, max: 100, unit: "%"}
    },
    normalizeCss: function (e) {
        var r = jQuery.extend(!0, {}, e);
        for (var t in jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-"), jQuery.CSS.sfx = "", r) {
            if ("transform" === t && (r[jQuery.CSS.sfx + "transform"] = r[t], delete r[t]), "transform-origin" === t && (r[jQuery.CSS.sfx + "transform-origin"] = e[t], delete r[t]), "filter" !== t || jQuery.browser.mozilla || (r[jQuery.CSS.sfx + "filter"] = e[t], delete r[t]), "blur" === t && setFilter(r, "blur", e[t]), "brightness" === t && setFilter(r, "brightness", e[t]), "contrast" === t && setFilter(r, "contrast", e[t]), "grayscale" === t && setFilter(r, "grayscale", e[t]), "hueRotate" === t && setFilter(r, "hueRotate", e[t]), "invert" === t && setFilter(r, "invert", e[t]), "saturate" === t && setFilter(r, "saturate", e[t]), "sepia" === t && setFilter(r, "sepia", e[t]), "x" === t) {
                var a = jQuery.CSS.sfx + "transform";
                r[a] = r[a] || "", r[a] += " translateX(" + setUnit(e[t], "px") + ")", delete r[t]
            }
            "y" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " translateY(" + setUnit(e[t], "px") + ")", delete r[t]), "z" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " translateZ(" + setUnit(e[t], "px") + ")", delete r[t]), "rotate" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " rotate(" + setUnit(e[t], "deg") + ")", delete r[t]), "rotateX" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " rotateX(" + setUnit(e[t], "deg") + ")", delete r[t]), "rotateY" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " rotateY(" + setUnit(e[t], "deg") + ")", delete r[t]), "rotateZ" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " rotateZ(" + setUnit(e[t], "deg") + ")", delete r[t]), "scale" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " scale(" + setUnit(e[t], "") + ")", delete r[t]), "scaleX" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " scaleX(" + setUnit(e[t], "") + ")", delete r[t]), "scaleY" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " scaleY(" + setUnit(e[t], "") + ")", delete r[t]), "scaleZ" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " scaleZ(" + setUnit(e[t], "") + ")", delete r[t]), "skew" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " skew(" + setUnit(e[t], "deg") + ")", delete r[t]), "skewX" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " skewX(" + setUnit(e[t], "deg") + ")", delete r[t]), "skewY" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " skewY(" + setUnit(e[t], "deg") + ")", delete r[t]), "perspective" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " perspective(" + setUnit(e[t], "px") + ")", delete r[t])
        }
        return r
    },
    getProp: function (e) {
        var r, t = [];
        for (r in e) 0 > t.indexOf(r) && t.push(uncamel(r));
        return t.join(",")
    },
    animate: function (e, r, t, a, o) {
        return this.each(function () {
            function n() {
                i.called = !0, i.CSSAIsRunning = !1, l.off(jQuery.CSS.transitionEnd + "." + i.id), clearTimeout(i.timeout), l.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof o && o.apply(i), "function" == typeof i.CSSqueue && (i.CSSqueue(), i.CSSqueue = null)
            }

            var i = this, l = jQuery(this);
            i.id = i.id || "CSSA_" + (new Date).getTime();
            var s = s || {type: "noEvent"};
            if (i.CSSAIsRunning && i.eventType == s.type && !jQuery.browser.msie && 9 >= jQuery.browser.version) i.CSSqueue = function () {
                l.CSSAnimate(e, r, t, a, o)
            }; else if (i.CSSqueue = null, i.eventType = s.type, 0 !== l.length && e) {
                if (e = jQuery.normalizeCss(e), i.CSSAIsRunning = !0, "function" == typeof r && (o = r, r = jQuery.fx.speeds._default), "function" == typeof t && (a = t, t = 0), "string" == typeof t && (o = t, t = 0), "function" == typeof a && (o = a, a = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof r) for (var u in jQuery.fx.speeds) {
                    if (r == u) {
                        r = jQuery.fx.speeds[u];
                        break
                    }
                    r = jQuery.fx.speeds._default
                }
                if (r || (r = jQuery.fx.speeds._default), "string" == typeof o && (a = o, o = null), jQuery.support.CSStransition) {
                    var y = {
                        default: "ease",
                        in: "ease-in",
                        out: "ease-out",
                        "in-out": "ease-in-out",
                        snap: "cubic-bezier(0,1,.5,1)",
                        easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                        easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                        easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                        easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                        easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                        easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                        easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                        easeInOutExpo: "cubic-bezier(1,0,0,1)",
                        easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                        easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                        easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                        easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                        easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                        easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                        easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                        easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                        easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                        easeInSine: "cubic-bezier(.47,0,.745,.715)",
                        easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                        easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                        easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                        easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                        easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
                    };
                    y[a] && (a = y[a]), l.off(jQuery.CSS.transitionEnd + "." + i.id), y = jQuery.CSS.getProp(e);
                    var d = {};
                    jQuery.extend(d, e), d[jQuery.CSS.sfx + "transition-property"] = y, d[jQuery.CSS.sfx + "transition-duration"] = r + "ms", d[jQuery.CSS.sfx + "transition-delay"] = t + "ms", d[jQuery.CSS.sfx + "transition-timing-function"] = a, setTimeout(function () {
                        l.one(jQuery.CSS.transitionEnd + "." + i.id, n), l.css(d)
                    }, 1), i.timeout = setTimeout(function () {
                        i.called || !o ? (i.called = !1, i.CSSAIsRunning = !1) : (l.css(jQuery.CSS.sfx + "transition", ""), o.apply(i), i.CSSAIsRunning = !1, "function" == typeof i.CSSqueue && (i.CSSqueue(), i.CSSqueue = null))
                    }, r + t + 10)
                } else {
                    for (y in e) "transform" === y && delete e[y], "filter" === y && delete e[y], "transform-origin" === y && delete e[y], "auto" === e[y] && delete e[y], "x" === y && (s = e[y], e[u = "left"] = s, delete e[y]), "y" === y && (s = e[y], e[u = "top"] = s, delete e[y]), "-ms-transform" !== y && "-ms-filter" !== y || delete e[y];
                    l.delay(t).animate(e, r, o)
                }
            }
        })
    }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function (e) {
    return this.each(function () {
        var r = jQuery(this), t = jQuery.normalizeCss(e);
        r.css(t)
    })
}, function (e) {
    e.simpleSlider = {
        defaults: {initialval: 0, maxVal: 100, orientation: "h", readonly: !1, callback: !1},
        events: {
            start: e.browser.mobile ? "touchstart" : "mousedown",
            end: e.browser.mobile ? "touchend" : "mouseup",
            move: e.browser.mobile ? "touchmove" : "mousemove"
        },
        init: function (r) {
            return this.each(function () {
                var t = this, a = e(t);
                a.addClass("simpleSlider"), t.opt = {}, e.extend(t.opt, e.simpleSlider.defaults, r), e.extend(t.opt, a.data());
                var o = "h" == t.opt.orientation ? "horizontal" : "vertical";
                o = e("<div/>").addClass("level").addClass(o), a.prepend(o), t.level = o, a.css({cursor: "default"}), "auto" == t.opt.maxVal && (t.opt.maxVal = e(t).outerWidth()), a.updateSliderVal(), t.opt.readonly || (a.on(e.simpleSlider.events.start, function (r) {
                    e.browser.mobile && (r = r.changedTouches[0]), t.canSlide = !0, a.updateSliderVal(r), "h" == t.opt.orientation ? a.css({cursor: "col-resize"}) : a.css({cursor: "row-resize"}), e.browser.mobile || (r.preventDefault(), r.stopPropagation())
                }), e(document).on(e.simpleSlider.events.move, function (r) {
                    e.browser.mobile && (r = r.changedTouches[0]), t.canSlide && (e(document).css({cursor: "default"}), a.updateSliderVal(r), e.browser.mobile || (r.preventDefault(), r.stopPropagation()))
                }).on(e.simpleSlider.events.end, function () {
                    e(document).css({cursor: "auto"}), t.canSlide = !1, a.css({cursor: "auto"})
                }))
            })
        },
        updateSliderVal: function (r) {
            var t = this.get(0);
            if (t.opt) {
                t.opt.initialval = "number" == typeof t.opt.initialval ? t.opt.initialval : t.opt.initialval(t);
                var a = e(t).outerWidth(), o = e(t).outerHeight();
                t.x = "object" == typeof r ? r.clientX + document.body.scrollLeft - this.offset().left : "number" == typeof r ? r * a / t.opt.maxVal : t.opt.initialval * a / t.opt.maxVal, t.y = "object" == typeof r ? r.clientY + document.body.scrollTop - this.offset().top : "number" == typeof r ? (t.opt.maxVal - t.opt.initialval - r) * o / t.opt.maxVal : t.opt.initialval * o / t.opt.maxVal, t.y = this.outerHeight() - t.y, t.scaleX = t.x * t.opt.maxVal / a, t.scaleY = t.y * t.opt.maxVal / o, t.outOfRangeX = t.scaleX > t.opt.maxVal ? t.scaleX - t.opt.maxVal : 0 > t.scaleX ? t.scaleX : 0, t.outOfRangeY = t.scaleY > t.opt.maxVal ? t.scaleY - t.opt.maxVal : 0 > t.scaleY ? t.scaleY : 0, t.outOfRange = "h" == t.opt.orientation ? t.outOfRangeX : t.outOfRangeY, t.value = void 0 !== r ? "h" == t.opt.orientation ? t.x >= this.outerWidth() ? t.opt.maxVal : 0 >= t.x ? 0 : t.scaleX : t.y >= this.outerHeight() ? t.opt.maxVal : 0 >= t.y ? 0 : t.scaleY : "h" == t.opt.orientation ? t.scaleX : t.scaleY, "h" == t.opt.orientation ? t.level.width(Math.floor(100 * t.x / a) + "%") : t.level.height(Math.floor(100 * t.y / o)), "h" === t.opt.orientation && (t.x >= this.outerWidth() || 0 >= t.x) || "h" !== t.opt.orientation && (t.y >= this.outerHeight() || 0 >= t.y) || "function" == typeof t.opt.callback && t.opt.callback(t)
            }
        }
    }, e.fn.simpleSlider = e.simpleSlider.init, e.fn.updateSliderVal = e.simpleSlider.updateSliderVal
}(jQuery), function (e) {
    e.mbCookie = {
        set: function (e, r, t, a) {
            "object" == typeof r && (r = JSON.stringify(r)), a = a ? "; domain=" + a : "";
            var o = new Date, n = "";
            0 < t && (o.setTime(o.getTime() + 864e5 * t), n = "; expires=" + o.toGMTString()), document.cookie = e + "=" + r + n + "; path=/" + a
        }, get: function (e) {
            e += "=";
            for (var r = document.cookie.split(";"), t = 0; t < r.length; t++) {
                for (var a = r[t]; " " == a.charAt(0);) a = a.substring(1, a.length);
                if (0 == a.indexOf(e)) try {
                    return JSON.parse(a.substring(e.length, a.length))
                } catch (r) {
                    return a.substring(e.length, a.length)
                }
            }
            return null
        }, remove: function (r) {
            e.mbCookie.set(r, "", -1)
        }
    }, e.mbStorage = {
        set: function (e, r) {
            "object" == typeof r && (r = JSON.stringify(r)), localStorage.setItem(e, r)
        }, get: function (e) {
            if (!localStorage[e]) return null;
            try {
                return JSON.parse(localStorage[e])
            } catch (r) {
                return localStorage[e]
            }
        }, remove: function (e) {
            e ? localStorage.removeItem(e) : localStorage.clear()
        }
    }
}(jQuery);