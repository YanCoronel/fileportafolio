! function(a, b) {
    function c(a) {
        this.callback = a, this.ticking = !1
    }

    function d(b) {
        return b && "undefined" != typeof a && (b === a || b.nodeType)
    }

    function e(a) {
        if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
        var b, c, f = a || {};
        for (c = 1; c < arguments.length; c++) {
            var g = arguments[c] || {};
            for (b in g) f[b] = "object" != typeof f[b] || d(f[b]) ? f[b] || g[b] : e(f[b], g[b])
        }
        return f
    }

    function f(a) {
        return a === Object(a) ? a : {
            down: a,
            up: a
        }
    }

    function g(a, b) {
        b = e(b, g.options), this.lastKnownScrollY = 0, this.elem = a, this.debouncer =
            new c(this.update.bind(this)), this.tolerance = f(b.tolerance), this.classes = b.classes, this.offset = b.offset, this.scroller = b.scroller, this.initialised = !1, this.onPin = b.onPin, this.onUnpin = b.onUnpin, this.onTop = b.onTop, this.onNotTop = b.onNotTop
    }
    var h = {
        bind: !! function() {}.bind,
        classList: "classList" in b.documentElement,
        rAF: !!(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame)
    };
    a.requestAnimationFrame = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame,
        c.prototype = {
            constructor: c,
            update: function() {
                this.callback && this.callback(), this.ticking = !1
            },
            requestTick: function() {
                this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
            },
            handleEvent: function() {
                this.requestTick()
            }
        }, g.prototype = {
            constructor: g,
            init: function() {
                return g.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
            },
            destroy: function() {
                var a = this.classes;
                this.initialised = !1, this.elem.classList.remove(a.unpinned, a.pinned, a.top, a.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
            },
            attachEvent: function() {
                this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
            },
            unpin: function() {
                var a = this.elem.classList,
                    b = this.classes;
                (a.contains(b.pinned) || !a.contains(b.unpinned)) && (a.add(b.unpinned), a.remove(b.pinned), this.onUnpin && this.onUnpin.call(this))
            },
            pin: function() {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.unpinned) && (a.remove(b.unpinned), a.add(b.pinned), this.onPin && this.onPin.call(this))
            },
            top: function() {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.top) || (a.add(b.top), a.remove(b.notTop), this.onTop && this.onTop.call(this))
            },
            notTop: function() {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.notTop) || (a.add(b.notTop), a.remove(b.top), this.onNotTop && this.onNotTop.call(this))
            },
            getScrollY: function() {
                return void 0 !== this.scroller.pageYOffset ?
                    this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (b.documentElement || b.body.parentNode || b.body).scrollTop
            },
            getViewportHeight: function() {
                return a.innerHeight || b.documentElement.clientHeight || b.body.clientHeight
            },
            getDocumentHeight: function() {
                var a = b.body,
                    c = b.documentElement;
                return Math.max(a.scrollHeight, c.scrollHeight, a.offsetHeight, c.offsetHeight, a.clientHeight, c.clientHeight)
            },
            getElementHeight: function(a) {
                return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight)
            },
            getScrollerHeight: function() {
                return this.scroller === a || this.scroller === b.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
            },
            isOutOfBounds: function(a) {
                var b = 0 > a,
                    c = a + this.getViewportHeight() > this.getScrollerHeight();
                return b || c
            },
            toleranceExceeded: function(a, b) {
                return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b]
            },
            shouldUnpin: function(a, b) {
                var c = a > this.lastKnownScrollY,
                    d = a >= this.offset;
                return c && d && b
            },
            shouldPin: function(a, b) {
                var c = a < this.lastKnownScrollY,
                    d = a <= this.offset;
                return c &&
                    b || d
            },
            update: function() {
                var a = this.getScrollY(),
                    b = a > this.lastKnownScrollY ? "down" : "up",
                    c = this.toleranceExceeded(a, b);
                this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(), this.lastKnownScrollY = a)
            }
        }, g.options = {
            tolerance: {
                up: 0,
                down: 0
            },
            offset: 0,
            scroller: a,
            classes: {
                pinned: "headroom--pinned",
                unpinned: "headroom--unpinned",
                top: "headroom--top",
                notTop: "headroom--not-top",
                initial: "headroom"
            }
        }, g.cutsTheMustard = "undefined" != typeof h &&
        h.rAF && h.bind && h.classList, a.Headroom = g
}(window, document);
! function(a) {
    a && (a.fn.headroom = function(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("headroom"),
                e = "object" == typeof b && b;
            e = a.extend(!0, {}, Headroom.options, e), d || (d = new Headroom(this, e), d.init(), c.data("headroom", d)), "string" == typeof b && d[b]()
        })
    }, a("[data-headroom]").each(function() {
        var b = a(this);
        b.headroom(b.data())
    }))
}(window.Zepto || window.jQuery);
! function(a) {
    var b = function(b, c) {
        this.settings = c, this.checkSettings(), this.imgAnalyzerTimeout = null, this.entries = null, this.buildingRow = {
                entriesBuff: [],
                width: 0,
                aspectRatio: 0
            }, this.lastAnalyzedIndex = -1, this.yield = {
                every: 2,
                flushed: 0
            }, this.border = c.border >= 0 ? c.border : c.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges(), this.offY = this.border, this.spinner = {
                phase: 0,
                timeSlot: 150,
                $el: a('<div class="spinner"><span></span><span></span><span></span></div>'),
                intervalId: null
            },
            this.checkWidthIntervalId = null, this.galleryWidth = b.width(), this.$gallery = b
    };
    b.prototype.getSuffix = function(a, b) {
            var c, d;
            for (c = a > b ? a : b, d = 0; d < this.suffixRanges.length; d++)
                if (c <= this.suffixRanges[d]) return this.settings.sizeRangeSuffixes[this.suffixRanges[d]];
            return this.settings.sizeRangeSuffixes[this.suffixRanges[d - 1]]
        }, b.prototype.removeSuffix = function(a, b) {
            return a.substring(0, a.length - b.length)
        }, b.prototype.endsWith = function(a, b) {
            return -1 !== a.indexOf(b, a.length - b.length)
        }, b.prototype.getUsedSuffix =
        function(a) {
            for (var b in this.settings.sizeRangeSuffixes)
                if (this.settings.sizeRangeSuffixes.hasOwnProperty(b)) {
                    if (0 === this.settings.sizeRangeSuffixes[b].length) continue;
                    if (this.endsWith(a, this.settings.sizeRangeSuffixes[b])) return this.settings.sizeRangeSuffixes[b]
                }
            return ""
        }, b.prototype.newSrc = function(a, b, c) {
            var d = a.match(this.settings.extension),
                e = null != d ? d[0] : "",
                f = a.replace(this.settings.extension, "");
            return f = this.removeSuffix(f, this.getUsedSuffix(f)), f += this.getSuffix(b, c) + e
        }, b.prototype.showImg =
        function(a, b) {
            this.settings.cssAnimation ? (a.addClass("entry-visible"), b && b()) : a.stop().fadeTo(this.settings.imagesAnimationDuration, 1, b)
        }, b.prototype.extractImgSrcFromImage = function(a) {
            var b = "undefined" != typeof a.data("safe-src") ? a.data("safe-src") : a.attr("src");
            return a.data("jg.originalSrc", b), b
        }, b.prototype.imgFromEntry = function(a) {
            var b = a.find("> img");
            return 0 === b.length && (b = a.find("> a > img")), 0 === b.length ? null : b
        }, b.prototype.captionFromEntry = function(a) {
            var b = a.find("> .caption");
            return 0 ===
                b.length ? null : b
        }, b.prototype.displayEntry = function(b, c, d, e, f, g) {
            b.width(e), b.height(g), b.css("top", d), b.css("left", c);
            var h = this.imgFromEntry(b);
            if (null !== h) {
                h.css("width", e), h.css("height", f), h.css("margin-left", -e / 2), h.css("margin-top", -f / 2);
                var i = h.attr("src"),
                    j = this.newSrc(i, e, f);
                h.one("error", function() {
                    h.attr("src", h.data("jg.originalSrc"))
                });
                var k = function() {
                    i !== j && h.attr("src", j)
                };
                "skipped" === b.data("jg.loaded") ? this.onImageEvent(i, a.proxy(function() {
                        this.showImg(b, k), b.data("jg.loaded", !0)
                    },
                    this)) : this.showImg(b, k)
            } else this.showImg(b);
            this.displayEntryCaption(b)
        }, b.prototype.displayEntryCaption = function(b) {
            var c = this.imgFromEntry(b);
            if (null !== c && this.settings.captions) {
                var d = this.captionFromEntry(b);
                if (null == d) {
                    var e = c.attr("alt");
                    "undefined" == typeof e && (e = b.attr("title")), "undefined" != typeof e && (d = a('<div class="caption">' + e + "</div>"), b.append(d), b.data("jg.createdCaption", !0))
                }
                null !== d && (this.settings.cssAnimation || d.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity),
                    this.addCaptionEventsHandlers(b))
            } else this.removeCaptionEventsHandlers(b)
        }, b.prototype.onEntryMouseEnterForCaption = function(b) {
            var c = this.captionFromEntry(a(b.currentTarget));
            this.settings.cssAnimation ? c.addClass("caption-visible").removeClass("caption-hidden") : c.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.visibleOpacity)
        }, b.prototype.onEntryMouseLeaveForCaption = function(b) {
            var c = this.captionFromEntry(a(b.currentTarget));
            this.settings.cssAnimation ?
                c.removeClass("caption-visible").removeClass("caption-hidden") : c.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.nonVisibleOpacity)
        }, b.prototype.addCaptionEventsHandlers = function(b) {
            var c = b.data("jg.captionMouseEvents");
            "undefined" == typeof c && (c = {
                mouseenter: a.proxy(this.onEntryMouseEnterForCaption, this),
                mouseleave: a.proxy(this.onEntryMouseLeaveForCaption, this)
            }, b.on("mouseenter", void 0, void 0, c.mouseenter), b.on("mouseleave", void 0, void 0, c.mouseleave), b.data("jg.captionMouseEvents",
                c))
        }, b.prototype.removeCaptionEventsHandlers = function(a) {
            var b = a.data("jg.captionMouseEvents");
            "undefined" != typeof b && (a.off("mouseenter", void 0, b.mouseenter), a.off("mouseleave", void 0, b.mouseleave), a.removeData("jg.captionMouseEvents"))
        }, b.prototype.prepareBuildingRow = function(a) {
            var b, c, d, e, f, g = !0,
                h = 0,
                i = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
                j = i / this.buildingRow.aspectRatio,
                k = this.buildingRow.width / i > this.settings.justifyThreshold;
            if (a && "hide" ===
                this.settings.lastRow && !k) {
                for (b = 0; b < this.buildingRow.entriesBuff.length; b++) c = this.buildingRow.entriesBuff[b], this.settings.cssAnimation ? c.removeClass("entry-visible") : c.stop().fadeTo(0, 0);
                return -1
            }
            for (a && !k && "nojustify" === this.settings.lastRow && (g = !1), b = 0; b < this.buildingRow.entriesBuff.length; b++) c = this.buildingRow.entriesBuff[b], d = c.data("jg.width") / c.data("jg.height"), g ? (e = b === this.buildingRow.entriesBuff.length - 1 ? i : j * d, f = j) : (e = this.settings.rowHeight * d, f = this.settings.rowHeight), i -= Math.round(e),
                c.data("jg.jwidth", Math.round(e)), c.data("jg.jheight", Math.ceil(f)), (0 === b || h > f) && (h = f);
            return this.settings.fixedHeight && h > this.settings.rowHeight && (h = this.settings.rowHeight), {
                minHeight: h,
                justify: g
            }
        }, b.prototype.clearBuildingRow = function() {
            this.buildingRow.entriesBuff = [], this.buildingRow.aspectRatio = 0, this.buildingRow.width = 0
        }, b.prototype.flushRow = function(a) {
            var b, c, d, e = this.settings,
                f = this.border;
            if (d = this.prepareBuildingRow(a), c = d.minHeight, a && "hide" === e.lastRow && -1 === c) return void this.clearBuildingRow();
            this.maxRowHeight.percentage ? this.maxRowHeight.value * e.rowHeight < c && (c = this.maxRowHeight.value * e.rowHeight) : this.maxRowHeight.value > 0 && this.maxRowHeight.value < c && (c = this.maxRowHeight.value);
            for (var g = 0; g < this.buildingRow.entriesBuff.length; g++) b = this.buildingRow.entriesBuff[g], this.displayEntry(b, f, this.offY, b.data("jg.jwidth"), b.data("jg.jheight"), c), f += b.data("jg.jwidth") + e.margins;
            this.$gallery.height(this.offY + c + this.border + (this.isSpinnerActive() ? this.getSpinnerHeight() : 0)), (!a || c <= this.settings.rowHeight &&
                d.justify) && (this.offY += c + this.settings.margins, this.clearBuildingRow(), this.$gallery.trigger("jg.rowflush"))
        }, b.prototype.checkWidth = function() {
            this.checkWidthIntervalId = setInterval(a.proxy(function() {
                var a = parseInt(this.$gallery.width(), 10);
                this.galleryWidth !== a && (this.galleryWidth = a, this.rewind(), this.startImgAnalyzer(!0))
            }, this), this.settings.refreshTime)
        }, b.prototype.isSpinnerActive = function() {
            return null != this.spinner.intervalId
        }, b.prototype.getSpinnerHeight = function() {
            return this.spinner.$el.innerHeight()
        },
        b.prototype.stopLoadingSpinnerAnimation = function() {
            clearInterval(this.spinner.intervalId), this.spinner.intervalId = null, this.$gallery.height(this.$gallery.height() - this.getSpinnerHeight()), this.spinner.$el.detach()
        }, b.prototype.startLoadingSpinnerAnimation = function() {
            var a = this.spinner,
                b = a.$el.find("span");
            clearInterval(a.intervalId), this.$gallery.append(a.$el), this.$gallery.height(this.offY + this.getSpinnerHeight()), a.intervalId = setInterval(function() {
                a.phase < b.length ? b.eq(a.phase).fadeTo(a.timeSlot,
                    1) : b.eq(a.phase - b.length).fadeTo(a.timeSlot, 0), a.phase = (a.phase + 1) % (2 * b.length)
            }, a.timeSlot)
        }, b.prototype.rewind = function() {
            this.lastAnalyzedIndex = -1, this.offY = this.border, this.clearBuildingRow()
        }, b.prototype.hideBuildingRowImages = function() {
            for (var a = 0; a < this.buildingRow.entriesBuff.length; a++) this.settings.cssAnimation ? this.buildingRow.entriesBuff[a].removeClass("entry-visible") : this.buildingRow.entriesBuff[a].stop().fadeTo(0, 0)
        }, b.prototype.updateEntries = function(b) {
            return this.entries = this.$gallery.find(this.settings.selector).toArray(),
                0 === this.entries.length ? !1 : (this.settings.filter ? this.modifyEntries(this.filterArray, b) : this.modifyEntries(this.resetFilters, b), a.isFunction(this.settings.sort) ? this.modifyEntries(this.sortArray, b) : this.settings.randomize && this.modifyEntries(this.shuffleArray, b), !0)
        }, b.prototype.insertToGallery = function(b) {
            var c = this;
            a.each(b, function() {
                a(this).appendTo(c.$gallery)
            })
        }, b.prototype.shuffleArray = function(a) {
            var b, c, d;
            for (b = a.length - 1; b > 0; b--) c = Math.floor(Math.random() * (b + 1)), d = a[b], a[b] = a[c], a[c] = d;
            return this.insertToGallery(a), a
        }, b.prototype.sortArray = function(a) {
            return a.sort(this.settings.sort), this.insertToGallery(a), a
        }, b.prototype.resetFilters = function(b) {
            for (var c = 0; c < b.length; c++) a(b[c]).removeClass("jg-filtered");
            return b
        }, b.prototype.filterArray = function(b) {
            var c = this.settings;
            return "string" === a.type(c.filter) ? b.filter(function(b) {
                var d = a(b);
                return d.is(c.filter) ? (d.removeClass("jg-filtered"), !0) : (d.addClass("jg-filtered"), !1)
            }) : a.isFunction(c.filter) ? b.filter(c.filter) : void 0
        }, b.prototype.modifyEntries =
        function(a, b) {
            var c = b ? this.entries.splice(this.lastAnalyzedIndex + 1, this.entries.length - this.lastAnalyzedIndex - 1) : this.entries;
            c = a.call(this, c), this.entries = b ? this.entries.concat(c) : c
        }, b.prototype.destroy = function() {
            clearInterval(this.checkWidthIntervalId), a.each(this.entries, a.proxy(function(b, c) {
                var d = a(c);
                d.css("width", ""), d.css("height", ""), d.css("top", ""), d.css("left", ""), d.data("jg.loaded", void 0), d.removeClass("jg-entry");
                var e = this.imgFromEntry(d);
                e.css("width", ""), e.css("height", ""), e.css("margin-left",
                    ""), e.css("margin-top", ""), e.attr("src", e.data("jg.originalSrc")), e.data("jg.originalSrc", void 0), this.removeCaptionEventsHandlers(d);
                var f = this.captionFromEntry(d);
                d.data("jg.createdCaption") ? (d.data("jg.createdCaption", void 0), null != f && f.remove()) : null != f && f.fadeTo(0, 1)
            }, this)), this.$gallery.css("height", ""), this.$gallery.removeClass("justified-gallery"), this.$gallery.data("jg.controller", void 0)
        }, b.prototype.analyzeImages = function(b) {
            for (var c = this.lastAnalyzedIndex + 1; c < this.entries.length; c++) {
                var d =
                    a(this.entries[c]);
                if (d.data("jg.loaded") === !0 || "skipped" === d.data("jg.loaded")) {
                    var e = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
                        f = d.data("jg.width") / d.data("jg.height");
                    if (e / (this.buildingRow.aspectRatio + f) < this.settings.rowHeight && (this.flushRow(!1), ++this.yield.flushed >= this.yield.every)) return void this.startImgAnalyzer(b);
                    this.buildingRow.entriesBuff.push(d), this.buildingRow.aspectRatio += f, this.buildingRow.width += f * this.settings.rowHeight, this.lastAnalyzedIndex =
                        c
                } else if ("error" !== d.data("jg.loaded")) return
            }
            this.buildingRow.entriesBuff.length > 0 && this.flushRow(!0), this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(), this.stopImgAnalyzerStarter(), this.$gallery.trigger(b ? "jg.resize" : "jg.complete")
        }, b.prototype.stopImgAnalyzerStarter = function() {
            this.yield.flushed = 0, null !== this.imgAnalyzerTimeout && clearTimeout(this.imgAnalyzerTimeout)
        }, b.prototype.startImgAnalyzer = function(a) {
            var b = this;
            this.stopImgAnalyzerStarter(), this.imgAnalyzerTimeout = setTimeout(function() {
                    b.analyzeImages(a)
                },
                .001)
        }, b.prototype.onImageEvent = function(b, c, d) {
            if (c || d) {
                var e = new Image,
                    f = a(e);
                c && f.one("load", function() {
                    f.off("load error"), c(e)
                }), d && f.one("error", function() {
                    f.off("load error"), d(e)
                }), e.src = b
            }
        }, b.prototype.init = function() {
            var b = !1,
                c = !1,
                d = this;
            a.each(this.entries, function(e, f) {
                var g = a(f),
                    h = d.imgFromEntry(g);
                if (g.addClass("jg-entry"), g.data("jg.loaded") !== !0 && "skipped" !== g.data("jg.loaded"))
                    if (null !== d.settings.rel && g.attr("rel", d.settings.rel), null !== d.settings.target && g.attr("target", d.settings.target),
                        null !== h) {
                        var i = d.extractImgSrcFromImage(h);
                        if (h.attr("src", i), d.settings.waitThumbnailsLoad === !1) {
                            var j = parseInt(h.attr("width"), 10),
                                k = parseInt(h.attr("height"), 10);
                            if (!isNaN(j) && !isNaN(k)) return g.data("jg.width", j), g.data("jg.height", k), g.data("jg.loaded", "skipped"), c = !0, d.startImgAnalyzer(!1), !0
                        }
                        g.data("jg.loaded", !1), b = !0, d.isSpinnerActive() || d.startLoadingSpinnerAnimation(), d.onImageEvent(i, function(a) {
                                g.data("jg.width", a.width), g.data("jg.height", a.height), g.data("jg.loaded", !0), d.startImgAnalyzer(!1)
                            },
                            function() {
                                g.data("jg.loaded", "error"), d.startImgAnalyzer(!1)
                            })
                    } else g.data("jg.loaded", !0), g.data("jg.width", g.width() | g.css("width") | 1), g.data("jg.height", g.height() | g.css("height") | 1)
            }), b || c || this.startImgAnalyzer(!1), this.checkWidth()
        }, b.prototype.checkOrConvertNumber = function(b, c) {
            if ("string" === a.type(b[c]) && (b[c] = parseFloat(b[c])), "number" !== a.type(b[c])) throw c + " must be a number";
            if (isNaN(b[c])) throw "invalid number for " + c;
        }, b.prototype.checkSizeRangesSuffixes = function() {
            if ("object" !== a.type(this.settings.sizeRangeSuffixes)) throw "sizeRangeSuffixes must be defined and must be an object";
            var b = [];
            for (var c in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(c) && b.push(c);
            for (var d = {
                    0: ""
                }, e = 0; e < b.length; e++)
                if ("string" === a.type(b[e])) try {
                    var f = parseInt(b[e].replace(/^[a-z]+/, ""), 10);
                    d[f] = this.settings.sizeRangeSuffixes[b[e]]
                } catch (g) {
                    throw "sizeRangeSuffixes keys must contains correct numbers (" + g + ")";
                } else d[b[e]] = this.settings.sizeRangeSuffixes[b[e]];
            this.settings.sizeRangeSuffixes = d
        }, b.prototype.retrieveMaxRowHeight = function() {
            var b = {};
            if ("string" ===
                a.type(this.settings.maxRowHeight)) this.settings.maxRowHeight.match(/^[0-9]+%$/) ? (b.value = parseFloat(this.settings.maxRowHeight.match(/^([0-9])+%$/)[1]) / 100, b.percentage = !1) : (b.value = parseFloat(this.settings.maxRowHeight), b.percentage = !0);
            else {
                if ("number" !== a.type(this.settings.maxRowHeight)) throw "maxRowHeight must be a number or a percentage";
                b.value = this.settings.maxRowHeight, b.percentage = !1
            }
            if (isNaN(b.value)) throw "invalid number for maxRowHeight";
            return b.percentage ? b.value < 100 && (b.value = 100) :
                b.value > 0 && b.value < this.settings.rowHeight && (b.value = this.settings.rowHeight), b
        }, b.prototype.checkSettings = function() {
            if (this.checkSizeRangesSuffixes(), this.checkOrConvertNumber(this.settings, "rowHeight"), this.checkOrConvertNumber(this.settings, "margins"), this.checkOrConvertNumber(this.settings, "border"), "nojustify" !== this.settings.lastRow && "justify" !== this.settings.lastRow && "hide" !== this.settings.lastRow) throw 'lastRow must be "nojustify", "justify" or "hide"';
            if (this.checkOrConvertNumber(this.settings,
                    "justifyThreshold"), this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) throw "justifyThreshold must be in the interval [0,1]";
            if ("boolean" !== a.type(this.settings.cssAnimation)) throw "cssAnimation must be a boolean";
            if ("boolean" !== a.type(this.settings.captions)) throw "captions must be a boolean";
            if (this.checkOrConvertNumber(this.settings.captionSettings, "animationDuration"), this.checkOrConvertNumber(this.settings.captionSettings, "visibleOpacity"), this.settings.captionSettings.visibleOpacity <
                0 || this.settings.captionSettings.visibleOpacity > 1) throw "captionSettings.visibleOpacity must be in the interval [0, 1]";
            if (this.checkOrConvertNumber(this.settings.captionSettings, "nonVisibleOpacity"), this.settings.captionSettings.nonVisibleOpacity < 0 || this.settings.captionSettings.nonVisibleOpacity > 1) throw "captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
            if ("boolean" !== a.type(this.settings.fixedHeight)) throw "fixedHeight must be a boolean";
            if (this.checkOrConvertNumber(this.settings,
                    "imagesAnimationDuration"), this.checkOrConvertNumber(this.settings, "refreshTime"), "boolean" !== a.type(this.settings.randomize)) throw "randomize must be a boolean";
            if ("string" !== a.type(this.settings.selector)) throw "selector must be a string";
            if (this.settings.sort !== !1 && !a.isFunction(this.settings.sort)) throw "sort must be false or a comparison function";
            if (this.settings.filter !== !1 && !a.isFunction(this.settings.sort) && "string" !== a.type(this.settings.filter)) throw "filter must be false, a string or a filter function";
        }, b.prototype.retrieveSuffixRanges = function() {
            var a = [];
            for (var b in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(b) && a.push(parseInt(b, 10));
            return a.sort(function(a, b) {
                return a > b ? 1 : b > a ? -1 : 0
            }), a
        }, b.prototype.updateSettings = function(b) {
            this.settings = a.extend({}, this.settings, b), this.checkSettings(), this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges()
        },
        a.fn.justifiedGallery = function(c) {
            return this.each(function(d, e) {
                var f = a(e);
                f.addClass("justified-gallery");
                var g = f.data("jg.controller");
                if ("undefined" == typeof g) {
                    if ("undefined" != typeof c && null !== c && "object" !== a.type(c)) throw "The argument must be an object";
                    g = new b(f, a.extend({}, a.fn.justifiedGallery.defaults, c)), f.data("jg.controller", g)
                } else if ("norewind" === c) g.hideBuildingRowImages();
                else {
                    if ("destroy" === c) return void g.destroy();
                    g.updateSettings(c), g.rewind()
                }
                g.updateEntries("norewind" === c) &&
                    g.init()
            })
        }, a.fn.justifiedGallery.defaults = {
            sizeRangeSuffixes: {},
            rowHeight: 120,
            maxRowHeight: "200%",
            margins: 1,
            border: -1,
            lastRow: "nojustify",
            justifyThreshold: .75,
            fixedHeight: !1,
            waitThumbnailsLoad: !0,
            captions: !0,
            cssAnimation: !1,
            imagesAnimationDuration: 500,
            captionSettings: {
                animationDuration: 500,
                visibleOpacity: .7,
                nonVisibleOpacity: 0
            },
            rel: null,
            target: null,
            extension: /\.[^.\\/]+$/,
            refreshTime: 100,
            randomize: !1,
            sort: !1,
            filter: !1,
            selector: "> a, > div:not(.spinner)"
        }
}(jQuery);
(function($, window, undefined) {
    var Modernizr = window.Modernizr,
        $body = $("body");
    $.DLMenu = function(options, element) {
        this.$el = $(element);
        this._init(options)
    };
    $.DLMenu.defaults = {
        animationClasses: {
            classin: "dl-animate-in",
            classout: "dl-animate-out"
        },
        onLevelClick: function(el, name) {
            return false
        },
        onLinkClick: function(el, ev) {
            return false
        },
        backLabel: "Back",
        useActiveItemAsBackLabel: false,
        useActiveItemAsLink: false,
        resetOnClose: true
    };
    $.DLMenu.prototype = {
        _init: function(options) {
            this.options = $.extend(true, {}, $.DLMenu.defaults,
                options);
            this._config();
            var animEndEventNames = {
                    "WebkitAnimation": "webkitAnimationEnd",
                    "OAnimation": "oAnimationEnd",
                    "msAnimation": "MSAnimationEnd",
                    "animation": "animationend"
                },
                transEndEventNames = {
                    "WebkitTransition": "webkitTransitionEnd",
                    "MozTransition": "transitionend",
                    "OTransition": "oTransitionEnd",
                    "msTransition": "MSTransitionEnd",
                    "transition": "transitionend"
                };
            this.animEndEventName = animEndEventNames[Modernizr.prefixed("animation")] + ".dlmenu";
            this.transEndEventName = transEndEventNames[Modernizr.prefixed("transition")] +
                ".dlmenu";
            this.supportAnimations = Modernizr.cssanimations;
            this.supportTransitions = Modernizr.csstransitions;
            this._initEvents()
        },
        _config: function() {
            this.open = false;
            this.$trigger = this.$el.children(".dl-trigger");
            this.$menu = this.$el.children("ul.dl-menu");
            this.$menuitems = this.$menu.find("li:not(.dl-back)");
            this.$el.find("ul.dl-submenu").prepend('<li class="dl-back"><a href="#"><i class="submenu-icon-back"></i> ' + this.options.backLabel + "</a></li>");
            this.$back = this.$menu.find("li.dl-back");
            if (this.options.useActiveItemAsBackLabel) this.$back.each(function() {
                var $this =
                    $(this),
                    parentLabel = $this.parents("li:first").find("a:first").text();
                $this.find("a").html(parentLabel)
            });
            if (this.options.useActiveItemAsLink) this.$el.find("ul.dl-submenu").prepend(function() {
                var parentli = $(this).parents("li:not(.dl-back):first").find("a:first");
                return '<li class="dl-parent"><a href="' + parentli.attr("href") + '">' + parentli.text() + "</a></li>"
            })
        },
        _initEvents: function() {
            var self = this;
            this.$trigger.on("click.dlmenu", function() {
                if (self.open) self._closeMenu();
                else {
                    self._openMenu();
                    $body.off("click").children().on("click.dlmenu",
                        function() {
                            self._closeMenu()
                        })
                }
                return false
            });
            this.$menuitems.on("click.dlmenu", function(event) {
                event.stopPropagation();
                var $item = $(this),
                    $submenu = $item.children("ul.dl-submenu");
                if ($submenu.length > 0 && !$(event.currentTarget).hasClass("dl-subviewopen")) {
                    var $flyin = $submenu.clone().css("opacity", 0).insertAfter(self.$menu),
                        onAnimationEndFn = function() {
                            self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classout).addClass("dl-subview");
                            $item.addClass("dl-subviewopen").parents(".dl-subviewopen:first").removeClass("dl-subviewopen").addClass("dl-subview");
                            $flyin.remove()
                        };
                    setTimeout(function() {
                        $flyin.addClass(self.options.animationClasses.classin);
                        self.$menu.addClass(self.options.animationClasses.classout);
                        if (self.supportAnimations) self.$menu.on(self.animEndEventName, onAnimationEndFn);
                        else onAnimationEndFn.call();
                        self.options.onLevelClick($item, $item.children("a:first").text())
                    });
                    return false
                } else self.options.onLinkClick($item, event)
            });
            this.$back.on("click.dlmenu", function(event) {
                var $this = $(this),
                    $submenu = $this.parents("ul.dl-submenu:first"),
                    $item =
                    $submenu.parent(),
                    $flyin = $submenu.clone().insertAfter(self.$menu);
                var onAnimationEndFn = function() {
                    self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classin);
                    $flyin.remove()
                };
                setTimeout(function() {
                    $flyin.addClass(self.options.animationClasses.classout);
                    self.$menu.addClass(self.options.animationClasses.classin);
                    if (self.supportAnimations) self.$menu.on(self.animEndEventName, onAnimationEndFn);
                    else onAnimationEndFn.call();
                    $item.removeClass("dl-subviewopen");
                    var $subview = $this.parents(".dl-subview:first");
                    if ($subview.is("li")) $subview.addClass("dl-subviewopen");
                    $subview.removeClass("dl-subview")
                });
                return false
            })
        },
        closeMenu: function() {
            if (this.open) this._closeMenu()
        },
        _closeMenu: function() {
            var self = this,
                onTransitionEndFn = function() {
                    self.$menu.off(self.transEndEventName);
                    if (self.options.resetOnClose) self._resetMenu()
                };
            this.$menu.removeClass("dl-menuopen");
            this.$menu.addClass("dl-menu-toggle");
            this.$trigger.removeClass("dl-active");
            if (this.supportTransitions) this.$menu.on(this.transEndEventName, onTransitionEndFn);
            else onTransitionEndFn.call();
            this.open = false
        },
        openMenu: function() {
            if (!this.open) this._openMenu()
        },
        _openMenu: function() {
            var self = this;
            $body.off("click").on("click.dlmenu", function() {
                self._closeMenu()
            });
            this.$menu.addClass("dl-menuopen dl-menu-toggle").on(this.transEndEventName, function() {
                $(this).removeClass("dl-menu-toggle")
            });
            this.$trigger.addClass("dl-active");
            this.open = true
        },
        _resetMenu: function() {
            this.$menu.removeClass("dl-subview");
            this.$menuitems.removeClass("dl-subview dl-subviewopen")
        }
    };
    var logError =
        function(message) {
            if (window.console) window.console.error(message)
        };
    $.fn.dlmenu = function(options) {
        if (typeof options === "string") {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var instance = $.data(this, "dlmenu");
                if (!instance) {
                    logError("cannot call methods on dlmenu prior to initialization; " + "attempted to call method '" + options + "'");
                    return
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    logError("no such method '" + options + "' for dlmenu instance");
                    return
                }
                instance[options].apply(instance,
                    args)
            })
        } else this.each(function() {
            var instance = $.data(this, "dlmenu");
            if (instance) instance._init();
            else instance = $.data(this, "dlmenu", new $.DLMenu(options, this))
        });
        return this
    }
})(jQuery, window);
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(n, e, t, u, a) {
        return jQuery.easing[jQuery.easing.def](n, e, t, u, a)
    },
    easeInQuad: function(n, e, t, u, a) {
        return u * (e /= a) * e + t
    },
    easeOutQuad: function(n, e, t, u, a) {
        return -u * (e /= a) * (e - 2) + t
    },
    easeInOutQuad: function(n, e, t, u, a) {
        return (e /= a / 2) < 1 ? u / 2 * e * e + t : -u / 2 * (--e * (e - 2) - 1) + t
    },
    easeInCubic: function(n, e, t, u, a) {
        return u * (e /= a) * e * e + t
    },
    easeOutCubic: function(n, e, t, u, a) {
        return u * ((e = e / a - 1) * e * e + 1) + t
    },
    easeInOutCubic: function(n,
        e, t, u, a) {
        return (e /= a / 2) < 1 ? u / 2 * e * e * e + t : u / 2 * ((e -= 2) * e * e + 2) + t
    },
    easeInQuart: function(n, e, t, u, a) {
        return u * (e /= a) * e * e * e + t
    },
    easeOutQuart: function(n, e, t, u, a) {
        return -u * ((e = e / a - 1) * e * e * e - 1) + t
    },
    easeInOutQuart: function(n, e, t, u, a) {
        return (e /= a / 2) < 1 ? u / 2 * e * e * e * e + t : -u / 2 * ((e -= 2) * e * e * e - 2) + t
    },
    easeInQuint: function(n, e, t, u, a) {
        return u * (e /= a) * e * e * e * e + t
    },
    easeOutQuint: function(n, e, t, u, a) {
        return u * ((e = e / a - 1) * e * e * e * e + 1) + t
    },
    easeInOutQuint: function(n, e, t, u, a) {
        return (e /= a / 2) < 1 ? u / 2 * e * e * e * e * e + t : u / 2 * ((e -= 2) * e * e * e * e + 2) + t
    },
    easeInSine: function(n,
        e, t, u, a) {
        return -u * Math.cos(e / a * (Math.PI / 2)) + u + t
    },
    easeOutSine: function(n, e, t, u, a) {
        return u * Math.sin(e / a * (Math.PI / 2)) + t
    },
    easeInOutSine: function(n, e, t, u, a) {
        return -u / 2 * (Math.cos(Math.PI * e / a) - 1) + t
    },
    easeInExpo: function(n, e, t, u, a) {
        return 0 == e ? t : u * Math.pow(2, 10 * (e / a - 1)) + t
    },
    easeOutExpo: function(n, e, t, u, a) {
        return e == a ? t + u : u * (-Math.pow(2, -10 * e / a) + 1) + t
    },
    easeInOutExpo: function(n, e, t, u, a) {
        return 0 == e ? t : e == a ? t + u : (e /= a / 2) < 1 ? u / 2 * Math.pow(2, 10 * (e - 1)) + t : u / 2 * (-Math.pow(2, -10 * --e) + 2) + t
    },
    easeInCirc: function(n, e, t, u, a) {
        return -u *
            (Math.sqrt(1 - (e /= a) * e) - 1) + t
    },
    easeOutCirc: function(n, e, t, u, a) {
        return u * Math.sqrt(1 - (e = e / a - 1) * e) + t
    },
    easeInOutCirc: function(n, e, t, u, a) {
        return (e /= a / 2) < 1 ? -u / 2 * (Math.sqrt(1 - e * e) - 1) + t : u / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
    },
    easeInElastic: function(n, e, t, u, a) {
        var r = 1.70158,
            i = 0,
            s = u;
        if (0 == e) return t;
        if (1 == (e /= a)) return t + u;
        if (i || (i = .3 * a), s < Math.abs(u)) {
            s = u;
            var r = i / 4
        } else var r = i / (2 * Math.PI) * Math.asin(u / s);
        return -(s * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * a - r) * Math.PI / i)) + t
    },
    easeOutElastic: function(n, e, t, u, a) {
        var r = 1.70158,
            i = 0,
            s = u;
        if (0 == e) return t;
        if (1 == (e /= a)) return t + u;
        if (i || (i = .3 * a), s < Math.abs(u)) {
            s = u;
            var r = i / 4
        } else var r = i / (2 * Math.PI) * Math.asin(u / s);
        return s * Math.pow(2, -10 * e) * Math.sin(2 * (e * a - r) * Math.PI / i) + u + t
    },
    easeInOutElastic: function(n, e, t, u, a) {
        var r = 1.70158,
            i = 0,
            s = u;
        if (0 == e) return t;
        if (2 == (e /= a / 2)) return t + u;
        if (i || (i = .3 * a * 1.5), s < Math.abs(u)) {
            s = u;
            var r = i / 4
        } else var r = i / (2 * Math.PI) * Math.asin(u / s);
        return 1 > e ? -.5 * s * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * a - r) * Math.PI / i) + t : s * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e * a - r) * Math.PI /
            i) * .5 + u + t
    },
    easeInBack: function(n, e, t, u, a, r) {
        return void 0 == r && (r = 1.70158), u * (e /= a) * e * ((r + 1) * e - r) + t
    },
    easeOutBack: function(n, e, t, u, a, r) {
        return void 0 == r && (r = 1.70158), u * ((e = e / a - 1) * e * ((r + 1) * e + r) + 1) + t
    },
    easeInOutBack: function(n, e, t, u, a, r) {
        return void 0 == r && (r = 1.70158), (e /= a / 2) < 1 ? u / 2 * e * e * (((r *= 1.525) + 1) * e - r) + t : u / 2 * ((e -= 2) * e * (((r *= 1.525) + 1) * e + r) + 2) + t
    },
    easeInBounce: function(n, e, t, u, a) {
        return u - jQuery.easing.easeOutBounce(n, a - e, 0, u, a) + t
    },
    easeOutBounce: function(n, e, t, u, a) {
        return (e /= a) < 1 / 2.75 ? 7.5625 * u * e * e + t :
            2 / 2.75 > e ? u * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : 2.5 / 2.75 > e ? u * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : u * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
    },
    easeInOutBounce: function(n, e, t, u, a) {
        return a / 2 > e ? .5 * jQuery.easing.easeInBounce(n, 2 * e, 0, u, a) + t : .5 * jQuery.easing.easeOutBounce(n, 2 * e - a, 0, u, a) + .5 * u + t
    }
});
if (typeof Object.create !== "function") Object.create = function(e) {
    function t() {}
    t.prototype = e;
    return new t
};
(function(e, t, n, r) {
    var i = {
        init: function(n, r) {
            this.options = e.extend({}, e.fn.singlePageNav.defaults, n);
            this.container = r;
            this.$container = e(r);
            this.$links = this.$container.find("a");
            if (this.options.filter !== "") this.$links = this.$links.filter(this.options.filter);
            this.$window = e(t);
            this.$htmlbody = e("html, body");
            this.$links.on("click.singlePageNav", e.proxy(this.handleClick, this));
            this.didScroll = false;
            this.checkPosition();
            this.setTimer()
        },
        handleClick: function(t) {
            var n = this,
                r = t.currentTarget,
                i = e(r.hash);
            t.preventDefault();
            if (i.length) {
                n.clearTimer();
                if (typeof n.options.beforeStart === "function") n.options.beforeStart();
                n.setActiveLink(r.hash);
                n.scrollTo(i, function() {
                    if (n.options.updateHash && history.pushState) history.pushState(null, null, r.hash);
                    n.setTimer();
                    if (typeof n.options.onComplete === "function") n.options.onComplete()
                })
            }
        },
        scrollTo: function(e, t) {
            var n = this;
            var r = n.getCoords(e).top;
            var i = false;
            n.$htmlbody.stop().animate({
                scrollTop: r
            }, {
                duration: n.options.speed,
                easing: n.options.easing,
                complete: function() {
                    if (typeof t ===
                        "function" && !i) t();
                    i = true
                }
            })
        },
        setTimer: function() {
            var e = this;
            e.$window.on("scroll.singlePageNav", function() {
                e.didScroll = true
            });
            e.timer = setInterval(function() {
                if (e.didScroll) {
                    e.didScroll = false;
                    e.checkPosition()
                }
            }, 250)
        },
        clearTimer: function() {
            clearInterval(this.timer);
            this.$window.off("scroll.singlePageNav");
            this.didScroll = false
        },
        checkPosition: function() {
            var e = this.$window.scrollTop();
            var t = this.getCurrentSection(e);
            this.setActiveLink(t)
        },
        getCoords: function(e) {
            return {
                top: Math.round(e.offset().top) - this.options.offset
            }
        },
        setActiveLink: function(e) {
            var t = this.$container.find("a[href$='" + e + "']");
            if (!t.hasClass(this.options.currentClass)) {
                this.$links.removeClass(this.options.currentClass);
                t.addClass(this.options.currentClass)
            }
        },
        getCurrentSection: function(t) {
            var n, r, i, s;
            for (n = 0; n < this.$links.length; n++) {
                r = this.$links[n].hash;
                if (e(r).length) {
                    i = this.getCoords(e(r));
                    if (t >= i.top - this.options.threshold) s = r
                }
            }
            return s || this.$links[0].hash
        }
    };
    e.fn.singlePageNav = function(e) {
        return this.each(function() {
            var t = Object.create(i);
            t.init(e,
                this)
        })
    };
    e.fn.singlePageNav.defaults = {
        offset: 0,
        threshold: 120,
        speed: 400,
        currentClass: "current",
        easing: "swing",
        updateHash: false,
        filter: "",
        onComplete: false,
        beforeStart: false
    }
})(jQuery, window, document);
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    function b(b) {
        var c = {},
            d = /^jQuery\d+$/;
        return a.each(b.attributes, function(a, b) {
            b.specified && !d.test(b.name) && (c[b.name] = b.value)
        }), c
    }

    function c(b, c) {
        var d = this,
            f = a(d);
        if (d.value == f.attr("placeholder") && f.hasClass(m.customClass))
            if (f.data("placeholder-password")) {
                if (f = f.hide().nextAll('input[type="password"]:first').show().attr("id", f.removeAttr("id").data("placeholder-id")), b === !0) return f[0].value = c;
                f.focus()
            } else d.value =
                "", f.removeClass(m.customClass), d == e() && d.select()
    }

    function d() {
        var d, e = this,
            f = a(e),
            g = this.id;
        if ("" === e.value) {
            if ("password" === e.type) {
                if (!f.data("placeholder-textinput")) {
                    try {
                        d = f.clone().attr({
                            type: "text"
                        })
                    } catch (h$0) {
                        d = a("<input>").attr(a.extend(b(this), {
                            type: "text"
                        }))
                    }
                    d.removeAttr("name").data({
                        "placeholder-password": f,
                        "placeholder-id": g
                    }).bind("focus.placeholder", c), f.data({
                        "placeholder-textinput": d,
                        "placeholder-id": g
                    }).before(d)
                }
                f = f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id",
                    g).show()
            }
            f.addClass(m.customClass), f[0].value = f.attr("placeholder")
        } else f.removeClass(m.customClass)
    }

    function e() {
        try {
            return document.activeElement
        } catch (a$1) {}
    }
    var f, g, h = "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
        i = "placeholder" in document.createElement("input") && !h,
        j = "placeholder" in document.createElement("textarea") && !h,
        k = a.valHooks,
        l = a.propHooks;
    if (i && j) g = a.fn.placeholder = function() {
        return this
    }, g.input = g.textarea = !0;
    else {
        var m = {};
        g = a.fn.placeholder = function(b) {
            var e = {
                customClass: "placeholder"
            };
            m = a.extend({}, e, b);
            var f = this;
            return f.filter((i ? "textarea" : ":input") + "[placeholder]").not("." + m.customClass).bind({
                "focus.placeholder": c,
                "blur.placeholder": d
            }).data("placeholder-enabled", !0).trigger("blur.placeholder"), f
        }, g.input = i, g.textarea = j, f = {
            get: function(b) {
                var c = a(b),
                    d = c.data("placeholder-password");
                return d ? d[0].value : c.data("placeholder-enabled") && c.hasClass(m.customClass) ? "" : b.value
            },
            set: function(b, f) {
                var g = a(b),
                    h = g.data("placeholder-password");
                return h ? h[0].value =
                    f : g.data("placeholder-enabled") ? ("" === f ? (b.value = f, b != e() && d.call(b)) : g.hasClass(m.customClass) ? c.call(b, !0, f) || (b.value = f) : b.value = f, g) : b.value = f
            }
        }, i || (k.input = f, l.value = f), j || (k.textarea = f, l.value = f), a(function() {
            a(document).delegate("form", "submit.placeholder", function() {
                var b = a("." + m.customClass, this).each(c);
                setTimeout(function() {
                    b.each(d)
                }, 10)
            })
        }), a(window).bind("beforeunload.placeholder", function() {
            a("." + m.customClass).each(function() {
                this.value = ""
            })
        })
    }
});
! function(l, o, e) {
    l.fn.scrollUp = function(o) {
        l.data(e.body, "scrollUp") || (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o))
    }, l.fn.scrollUp.init = function(r) {
        var s, t, c, i, n, a, d, p = l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r),
            f = !1;
        switch (d = p.scrollTrigger ? l(p.scrollTrigger) : l("<a/>", {
                id: p.scrollName,
                href: "#top"
            }), p.scrollTitle && d.attr("title", p.scrollTitle), d.appendTo("body"), p.scrollImg || p.scrollTrigger || d.html(p.scrollText), d.css({
                display: "none",
                position: "fixed",
                zIndex: p.zIndex
            }), p.activeOverlay &&
            l("<div/>", {
                id: p.scrollName + "-active"
            }).css({
                position: "absolute",
                top: p.scrollDistance + "px",
                width: "100%",
                borderTop: "1px dotted" + p.activeOverlay,
                zIndex: p.zIndex
            }).appendTo("body"), p.animation) {
            case "fade":
                s = "fadeIn", t = "fadeOut", c = p.animationSpeed;
                break;
            case "slide":
                s = "slideDown", t = "slideUp", c = p.animationSpeed;
                break;
            default:
                s = "show", t = "hide", c = 0
        }
        i = "top" === p.scrollFrom ? p.scrollDistance : l(e).height() - l(o).height() - p.scrollDistance, n = l(o).scroll(function() {
            l(o).scrollTop() > i ? f || (d[s](c), f = !0) : f && (d[t](c),
                f = !1)
        }), p.scrollTarget ? "number" == typeof p.scrollTarget ? a = p.scrollTarget : "string" == typeof p.scrollTarget && (a = Math.floor(l(p.scrollTarget).offset().top)) : a = 0, d.click(function(o) {
            o.preventDefault(), l("html, body").animate({
                scrollTop: a
            }, p.scrollSpeed, p.easingType)
        })
    }, l.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "fade",
        animationSpeed: 200,
        scrollTrigger: !1,
        scrollTarget: !1,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
    }, l.fn.scrollUp.destroy = function(r) {
        l.removeData(e.body, "scrollUp"), l("#" + l.fn.scrollUp.settings.scrollName).remove(), l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(), l.fn.jquery.split(".")[1] >= 7 ? l(o).off("scroll", r) : l(o).unbind("scroll", r)
    }, l.scrollUp = l.fn.scrollUp
}(jQuery, window, document);
(function($) {
    var eventNamespace = "waitForImages";
    $.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"]
    };
    $.expr[":"].uncached = function(obj) {
        if (!$(obj).is('img[src!=""]')) return false;
        var img = new Image;
        img.src = obj.src;
        return !img.complete
    };
    $.fn.waitForImages = function(finishedCallback, eachCallback, waitForAll) {
        var allImgsLength = 0;
        var allImgsLoaded = 0;
        if ($.isPlainObject(arguments[0])) {
            waitForAll = arguments[0].waitForAll;
            eachCallback = arguments[0].each;
            finishedCallback = arguments[0].finished
        }
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;
        waitForAll = !!waitForAll;
        if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) throw new TypeError("An invalid callback was supplied.");
        return this.each(function() {
            var obj = $(this);
            var allImgs = [];
            var hasImgProperties = $.waitForImages.hasImageProperties || [];
            var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            if (waitForAll) obj.find("*").addBack().each(function() {
                var element = $(this);
                if (element.is("img:uncached")) allImgs.push({
                    src: element.attr("src"),
                    element: element[0]
                });
                $.each(hasImgProperties, function(i, property) {
                    var propertyValue = element.css(property);
                    var match;
                    if (!propertyValue) return true;
                    while (match = matchUrl.exec(propertyValue)) allImgs.push({
                        src: match[2],
                        element: element[0]
                    })
                })
            });
            else obj.find("img:uncached").each(function() {
                allImgs.push({
                    src: this.src,
                    element: this
                })
            });
            allImgsLength = allImgs.length;
            allImgsLoaded = 0;
            if (allImgsLength === 0) finishedCallback.call(obj[0]);
            $.each(allImgs, function(i, img) {
                var image = new Image;
                $(image).on("load." + eventNamespace +
                    " error." + eventNamespace,
                    function(event) {
                        allImgsLoaded++;
                        eachCallback.call(img.element, allImgsLoaded, allImgsLength, event.type == "load");
                        if (allImgsLoaded == allImgsLength) {
                            finishedCallback.call(obj[0]);
                            return false
                        }
                    });
                image.src = img.src
            })
        })
    }
})(jQuery);
! function(t) {
    function a(a, e) {
        var l, s, d, i = a.data("width"),
            c = a.data("height"),
            u = a.data("ratio") ? a.data("ratio") : e.default_ratio,
            o = a.data("youtube-id"),
            n = [],
            p = a.text() ? a.text() : e.loading_text,
            h = a.data("parameters") || "";
        u = u.split(":"), "number" == typeof i && "number" == typeof c ? (a.width(i), l = c + "px") : "number" == typeof i ? (a.width(i), l = i * u[1] / u[0] + "px") : (i = a.width(), 0 == i && (i = a.parent().width()), l = u[1] / u[0] * 100 + "%"), n.push('<div class="ytp-thumbnail">'), n.push('<div class="ytp-large-play-button"'), 640 >= i && n.push(' style="transform: scale(0.563888888888889);"'),
            n.push(">"), n.push("<svg>"), n.push('<path fill-rule="evenodd" clip-rule="evenodd" fill="#1F1F1F" class="ytp-large-play-button-svg" d="M84.15,26.4v6.35c0,2.833-0.15,5.967-0.45,9.4c-0.133,1.7-0.267,3.117-0.4,4.25l-0.15,0.95c-0.167,0.767-0.367,1.517-0.6,2.25c-0.667,2.367-1.533,4.083-2.6,5.15c-1.367,1.4-2.967,2.383-4.8,2.95c-0.633,0.2-1.316,0.333-2.05,0.4c-0.767,0.1-1.3,0.167-1.6,0.2c-4.9,0.367-11.283,0.617-19.15,0.75c-2.434,0.034-4.883,0.067-7.35,0.1h-2.95C38.417,59.117,34.5,59.067,30.3,59c-8.433-0.167-14.05-0.383-16.85-0.65c-0.067-0.033-0.667-0.117-1.8-0.25c-0.9-0.133-1.683-0.283-2.35-0.45c-2.066-0.533-3.783-1.5-5.15-2.9c-1.033-1.067-1.9-2.783-2.6-5.15C1.317,48.867,1.133,48.117,1,47.35L0.8,46.4c-0.133-1.133-0.267-2.55-0.4-4.25C0.133,38.717,0,35.583,0,32.75V26.4c0-2.833,0.133-5.95,0.4-9.35l0.4-4.25c0.167-0.966,0.417-2.05,0.75-3.25c0.7-2.333,1.567-4.033,2.6-5.1c1.367-1.434,2.967-2.434,4.8-3c0.633-0.167,1.333-0.3,2.1-0.4c0.4-0.066,0.917-0.133,1.55-0.2c4.9-0.333,11.283-0.567,19.15-0.7C35.65,0.05,39.083,0,42.05,0L45,0.05c2.467,0,4.933,0.034,7.4,0.1c7.833,0.133,14.2,0.367,19.1,0.7c0.3,0.033,0.833,0.1,1.6,0.2c0.733,0.1,1.417,0.233,2.05,0.4c1.833,0.566,3.434,1.566,4.8,3c1.066,1.066,1.933,2.767,2.6,5.1c0.367,1.2,0.617,2.284,0.75,3.25l0.4,4.25C84,20.45,84.15,23.567,84.15,26.4z M33.3,41.4L56,29.6L33.3,17.75V41.4z"></path>'),
            n.push('<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="33.3,41.4 33.3,17.75 56,29.6"></polygon>'), n.push("</svg>"), n.push("</div>"), n.push("</div>"), n.push('<div class="html5-info-bar">'), n.push('<div class="html5-title">'), n.push('<div class="html5-title-text-wrapper">'), n.push('<a id="lazyYT-title-', o, '" class="html5-title-text" target="_blank" tabindex="3100" href="//www.youtube.com/watch?v=', o, '">'), n.push(p), n.push("</a>"), n.push("</div>"), n.push("</div>"), n.push("</div>"),
            a.css({
                "padding-bottom": l
            }).html(n.join("")), d = i > 640 ? "maxresdefault.jpg" : i > 480 ? "sddefault.jpg" : i > 320 ? "hqdefault.jpg" : i > 120 ? "mqdefault.jpg" : 0 == i ? "hqdefault.jpg" : "default.jpg", s = a.find(".ytp-thumbnail").css({
                "background-image": ["url(//img.youtube.com/vi/", o, "/", d, ")"].join("")
            }).addClass("lazyYT-image-loaded").on("click", function(t) {
                t.preventDefault(), !a.hasClass("lazyYT-video-loaded") && s.hasClass("lazyYT-image-loaded") && a.html('<iframe src="//www.youtube.com/embed/' + o + "?autoplay=1&" + h + '" frameborder="0" allowfullscreen></iframe>').addClass("lazyYT-video-loaded")
            }),
            t.getJSON("//gdata.youtube.com/feeds/api/videos/" + o + "?v=2&alt=json", function(t) {
                a.find("#lazyYT-title-" + o).text(t.entry.title.$t)
            })
    }
    t.fn.lazyYT = function(e) {
        var l = {
                loading_text: "Loading...",
                default_ratio: "16:9",
                callback: null,
                container_class: "lazyYT-container"
            },
            s = t.extend(l, e);
        return this.each(function() {
            var e = t(this).addClass(s.container_class);
            a(e, s)
        })
    }
}(jQuery);
window.Modernizr = function(a, b, c) {
        function z(a) {
            j.cssText = a
        }

        function A(a, b) {
            return z(m.join(a + ";") + (b || ""))
        }

        function B(a, b) {
            return typeof a === b
        }

        function C(a, b) {
            return !!~("" + a).indexOf(b)
        }

        function D(a, b) {
            for (var d in a) {
                var e = a[d];
                if (!C(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
            }
            return !1
        }

        function E(a, b, d) {
            for (var e in a) {
                var f = b[a[e]];
                if (f !== c) return d === !1 ? a[e] : B(f, "function") ? f.bind(d || b) : f
            }
            return !1
        }

        function F(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                e = (a + " " + o.join(d + " ") + d).split(" ");
            return B(b,
                "string") || B(b, "undefined") ? D(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), E(e, b, c))
        }
        var d = "2.6.2",
            e = {},
            f = !0,
            g = b.documentElement,
            h = "modernizr",
            i = b.createElement(h),
            j = i.style,
            k, l = {}.toString,
            m = " -webkit- -moz- -o- -ms- ".split(" "),
            n = "Webkit Moz O ms",
            o = n.split(" "),
            p = n.toLowerCase().split(" "),
            q = {},
            r = {},
            s = {},
            t = [],
            u = t.slice,
            v, w = function(a, c, d, e) {
                var f, i, j, k, l = b.createElement("div"),
                    m = b.body,
                    n = m || b.createElement("body");
                if (parseInt(d, 10))
                    while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
                return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
            },
            x = {}.hasOwnProperty,
            y;
        !B(x, "undefined") && !B(x.call, "undefined") ? y = function(a, b) {
                return x.call(a, b)
            } : y = function(a, b) {
                return b in a && B(a.constructor.prototype[b], "undefined")
            }, Function.prototype.bind ||
            (Function.prototype.bind = function(b) {
                var c = this;
                if (typeof c != "function") throw new TypeError;
                var d = u.call(arguments, 1),
                    e = function() {
                        if (this instanceof e) {
                            var a = function() {};
                            a.prototype = c.prototype;
                            var f = new a,
                                g = c.apply(f, d.concat(u.call(arguments)));
                            return Object(g) === g ? g : f
                        }
                        return c.apply(b, d.concat(u.call(arguments)))
                    };
                return e
            }), q.touch = function() {
                var c;
                return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : w(["@media (", m.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""),
                    function(a) {
                        c = a.offsetTop === 9
                    }), c
            }, q.cssanimations = function() {
                return F("animationName")
            }, q.csstransitions = function() {
                return F("transition")
            };
        for (var G in q) y(q, G) && (v = G.toLowerCase(), e[v] = q[G](), t.push((e[v] ? "" : "no-") + v));
        return e.addTest = function(a, b) {
                if (typeof a == "object")
                    for (var d in a) y(a, d) && e.addTest(d, a[d]);
                else {
                    a = a.toLowerCase();
                    if (e[a] !== c) return e;
                    b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
                }
                return e
            }, z(""), i = k = null,
            function(a, b) {
                function k(a,
                    b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
                }

                function l() {
                    var a = r.elements;
                    return typeof a == "string" ? a.split(" ") : a
                }

                function m(a) {
                    var b = i[a[g]];
                    return b || (b = {}, h++, a[g] = h, i[h] = b), b
                }

                function n(a, c, f) {
                    c || (c = b);
                    if (j) return c.createElement(a);
                    f || (f = m(c));
                    var g;
                    return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren &&
                        !d.test(a) ? f.frag.appendChild(g) : g
                }

                function o(a, c) {
                    a || (a = b);
                    if (j) return a.createDocumentFragment();
                    c = c || m(a);
                    var d = c.frag.cloneNode(),
                        e = 0,
                        f = l(),
                        g = f.length;
                    for (; e < g; e++) d.createElement(f[e]);
                    return d
                }

                function p(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                        return r.shivMethods ? n(c, a, b) : b.createElem(c)
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
                        l().join().replace(/\w+/g, function(a) {
                            return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                        }) + ");return n}")(r, b.frag)
                }

                function q(a) {
                    a || (a = b);
                    var c = m(a);
                    return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a
                }
                var c = a.html5 || {},
                    d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    f, g = "_html5shiv",
                    h = 0,
                    i = {},
                    j;
                (function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = a.childNodes.length == 1 || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                        }()
                    } catch (c$2) {
                        f = !0, j = !0
                    }
                })();
                var r = {
                    elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: c.shivCSS !== !1,
                    supportsUnknownElements: j,
                    shivMethods: c.shivMethods !== !1,
                    type: "default",
                    shivDocument: q,
                    createElement: n,
                    createDocumentFragment: o
                };
                a.html5 = r, q(b)
            }(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.testProp = function(a) {
                return D([a])
            }, e.testAllProps = F, e.testStyles = w, e.prefixed = function(a, b, c) {
                return b ? F(a, b, c) : F(a, "pfx")
            }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : ""), e
    }(this, this.document),
    function(a, b, c) {
        function d(a) {
            return "[object Function]" ==
                o.call(a)
        }

        function e(a) {
            return "string" == typeof a
        }

        function f() {}

        function g(a) {
            return !a || "loaded" == a || "complete" == a || "uninitialized" == a
        }

        function h() {
            var a = p.shift();
            q = 1, a ? a.t ? m(function() {
                ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
            }, 0) : (a(), h()) : q = 0
        }

        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                    "img" != a && m(function() {
                        t.removeChild(l)
                    }, 50);
                    for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
                }
            }
            var j = j || B.errorTimeout,
                l = b.createElement(a),
                o = 0,
                r = 0,
                u = {
                    t: d,
                    s: c,
                    e: f,
                    a: i,
                    x: j
                };
            1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
                k.call(this, r)
            }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
        }

        function j(a, b, c, d, f) {
            return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
        }

        function k() {
            var a = B;
            return a.loader = {
                load: j,
                i: 0
            }, a
        }
        var l = b.documentElement,
            m = a.setTimeout,
            n = b.getElementsByTagName("script")[0],
            o = {}.toString,
            p = [],
            q = 0,
            r = "MozAppearance" in l.style,
            s = r && !!b.createRange().compareNode,
            t = s ? l : n.parentNode,
            l = a.opera && "[object Opera]" == o.call(a.opera),
            l = !!b.attachEvent && !l,
            u = r ? "object" : l ? "script" : "img",
            v = l ? "script" : u,
            w = Array.isArray || function(a) {
                return "[object Array]" == o.call(a)
            },
            x = [],
            y = {},
            z = {
                timeout: function(a, b) {
                    return b.length && (a.timeout = b[0]), a
                }
            },
            A, B;
        B = function(a) {
            function b(a) {
                var a = a.split("!"),
                    b = x.length,
                    c = a.pop(),
                    d = a.length,
                    c = {
                        url: c,
                        origUrl: c,
                        prefixes: a
                    },
                    e, f, g;
                for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
                for (f = 0; f < b; f++) c = x[f](c);
                return c
            }

            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                    k(), e && e(i.origUrl,
                        h, g), j && j(i.origUrl, h, g), y[i.url] = 2
                })))
            }

            function h(a, b) {
                function c(a, c) {
                    if (a)
                        if (e(a)) c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l()
                        }), g(a, j, b, 0, h);
                        else {
                            if (Object(a) === a)
                                for (n in m = function() {
                                        var b = 0,
                                            c;
                                        for (c in a) a.hasOwnProperty(c) && b++;
                                        return b
                                    }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                    var a = [].slice.call(arguments);
                                    k.apply(this, a), l()
                                } : j[n] = function(a) {
                                    return function() {
                                        var b = [].slice.call(arguments);
                                        a && a.apply(this, b), l()
                                    }
                                }(k[n])), g(a[n], j, b, n, h))
                        }
                    else !c && l()
                }
                var h = !!a.test,
                    i = a.load || a.both,
                    j = a.callback || f,
                    k = j,
                    l = a.complete || f,
                    m, n;
                c(h ? a.yep : a.nope, !!i), i && c(i)
            }
            var i, j, l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (w(a))
                for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l)
        }, B.addPrefix = function(a, b) {
            z[a] = b
        }, B.addFilter = function(a) {
            x.push(a)
        }, B.errorTimeout = 1E4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
            b.removeEventListener("DOMContentLoaded",
                A, 0), b.readyState = "complete"
        }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
            var k = b.createElement("script"),
                l, o, e = e || B.errorTimeout;
            k.src = a;
            for (o in d) k.setAttribute(o, d[o]);
            c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
                !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
            }, m(function() {
                l || (l = 1, c(1))
            }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
        }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
            var e = b.createElement("link"),
                j, c = i ? h : c || f;
            e.href = a,
                e.rel = "stylesheet", e.type = "text/css";
            for (j in d) e.setAttribute(j, d[j]);
            g || (n.parentNode.insertBefore(e, n), m(c, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    };
(function(e, t, n, r) {
    function o(t, n) {
        this.el = t;
        this.$el = e(this.el);
        this.options = e.extend({}, s, n);
        this._defaults = s;
        this._name = i;
        this.init()
    }
    var i = "nivoLightbox",
        s = {
            effect: "fade",
            theme: "default",
            keyboardNav: true,
            clickOverlayToClose: true,
            onInit: function() {},
            beforeShowLightbox: function() {},
            afterShowLightbox: function(e) {},
            beforeHideLightbox: function() {},
            afterHideLightbox: function() {},
            onPrev: function(e) {},
            onNext: function(e) {},
            errorMessage: "The requested content cannot be loaded. Please try again later."
        };
    o.prototype = {
        init: function() {
            var t = this;
            if (!e("html").hasClass("nivo-lightbox-notouch")) e("html").addClass("nivo-lightbox-notouch");
            if ("ontouchstart" in n) e("html").removeClass("nivo-lightbox-notouch");
            this.$el.on("click", function(e) {
                t.showLightbox(e)
            });
            if (this.options.keyboardNav) e("body").off("keyup").on("keyup", function(n) {
                var r = n.keyCode ? n.keyCode : n.which;
                if (r == 27) t.destructLightbox();
                if (r == 37) e(".nivo-lightbox-prev").trigger("click");
                if (r == 39) e(".nivo-lightbox-next").trigger("click")
            });
            this.options.onInit.call(this)
        },
        showLightbox: function(t) {
            var n = this,
                r = this.$el;
            var i = this.checkContent(r);
            if (!i) return;
            t.preventDefault();
            this.options.beforeShowLightbox.call(this);
            var s = this.constructLightbox();
            if (!s) return;
            var o = s.find(".nivo-lightbox-content");
            if (!o) return;
            e("body").addClass("nivo-lightbox-body-effect-" + this.options.effect);
            this.processContent(o, r);
            if (this.$el.attr("data-lightbox-gallery")) {
                var u = e('[data-lightbox-gallery="' + this.$el.attr("data-lightbox-gallery") + '"]');
                e(".nivo-lightbox-nav").show();
                e(".nivo-lightbox-prev").off("click").on("click",
                    function(t) {
                        t.preventDefault();
                        var i = u.index(r);
                        r = u.eq(i - 1);
                        if (!e(r).length) r = u.last();
                        n.processContent(o, r);
                        n.options.onPrev.call(this, [r])
                    });
                e(".nivo-lightbox-next").off("click").on("click", function(t) {
                    t.preventDefault();
                    var i = u.index(r);
                    r = u.eq(i + 1);
                    if (!e(r).length) r = u.first();
                    n.processContent(o, r);
                    n.options.onNext.call(this, [r])
                })
            }
            setTimeout(function() {
                s.addClass("nivo-lightbox-open");
                n.options.afterShowLightbox.call(this, [s])
            }, 1)
        },
        checkContent: function(e) {
            var t = this,
                n = e.attr("href"),
                r = n.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            if (n.match(/\.(jpeg|jpg|gif|png)$/i) !== null) return true;
            else if (r) return true;
            else if (e.attr("data-lightbox-type") == "ajax") return true;
            else if (n.substring(0, 1) == "#" && e.attr("data-lightbox-type") == "inline") return true;
            else if (e.attr("data-lightbox-type") == "iframe") return true;
            return false
        },
        processContent: function(n, r) {
            var i = this,
                s = r.attr("href"),
                o = s.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            n.html("").addClass("nivo-lightbox-loading");
            if (this.isHidpi() && r.attr("data-lightbox-hidpi")) s =
                r.attr("data-lightbox-hidpi");
            if (s.match(/\.(jpeg|jpg|gif|png)$/i) !== null) {
                var u = e("<img>  ", {
                    src: s
                });

                //var content = e("<div>CAUSA</div>");

                u.one("load", function() {
                    var r = e('<div class="nivo-lightbox-image content__image__text" />');
                    r.append(u);
                    //r.append(content);
                    n.html(r).removeClass("nivo-lightbox-loading");
                    r.css({
                        "line-height": e(".nivo-lightbox-content").height() + "px",
                        height: e(".nivo-lightbox-content").height() + "px"
                    });
                    e(t).resize(function() {
                        r.css({
                            "line-height": e(".nivo-lightbox-content").height() + "px",
                            height: e(".nivo-lightbox-content").height() + "px"
                        })
                    })
                }).each(function() {
                    if (this.complete) e(this).load()
                });
                u.error(function() {
                    var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                    n.html(t).removeClass("nivo-lightbox-loading")
                })
            } else if (o) {
                var a = "",
                    f = "nivo-lightbox-video";
                if (o[1] == "youtube") {
                    a = "//www.youtube.com/embed/" + o[4];
                    f = "nivo-lightbox-youtube"
                }
                if (o[1] == "youtu") {
                    a = "//www.youtube.com/embed/" + o[3];
                    f = "nivo-lightbox-youtube"
                }
                if (o[1] == "vimeo") {
                    a = "//player.vimeo.com/video/" + o[3];
                    f = "nivo-lightbox-vimeo"
                }
                if (a) {
                    var l = e("<iframe>", {
                        src: a,
                        "class": f,
                        frameborder: 0,
                        vspace: 0,
                        hspace: 0,
                        scrolling: "auto"
                    });
                    n.html(l);
                    l.load(function() {
                        n.removeClass("nivo-lightbox-loading")
                    })
                }
            } else if (r.attr("data-lightbox-type") == "ajax") e.ajax({
                url: s,
                cache: false,
                success: function(r) {
                    var i = e('<div class="nivo-lightbox-ajax" />');
                    i.append(r);
                    n.html(i).removeClass("nivo-lightbox-loading");
                    if (i.outerHeight() < n.height()) i.css({
                        position: "relative",
                        top: "50%",
                        "margin-top": -(i.outerHeight() / 2) + "px"
                    });
                    e(t).resize(function() {
                        if (i.outerHeight() < n.height()) i.css({
                            position: "relative",
                            top: "50%",
                            "margin-top": -(i.outerHeight() /
                                2) + "px"
                        })
                    })
                },
                error: function() {
                    var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                    n.html(t).removeClass("nivo-lightbox-loading")
                }
            });
            else if (s.substring(0, 1) == "#" && r.attr("data-lightbox-type") == "inline")
                if (e(s).length) {
                    var c = e('<div class="nivo-lightbox-inline" />');
                    c.append(e(s).clone().show());
                    n.html(c).removeClass("nivo-lightbox-loading");
                    if (c.outerHeight() < n.height()) c.css({
                        position: "relative",
                        top: "50%",
                        "margin-top": -(c.outerHeight() / 2) + "px"
                    });
                    e(t).resize(function() {
                        if (c.outerHeight() <
                            n.height()) c.css({
                            position: "relative",
                            top: "50%",
                            "margin-top": -(c.outerHeight() / 2) + "px"
                        })
                    })
                } else {
                    var h = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                    n.html(h).removeClass("nivo-lightbox-loading")
                }
            else if (r.attr("data-lightbox-type") == "iframe") {
                var p = e("<iframe>", {
                    src: s,
                    "class": "nivo-lightbox-item",
                    frameborder: 0,
                    vspace: 0,
                    hspace: 0,
                    scrolling: "auto"
                });
                n.html(p);
                p.load(function() {
                    n.removeClass("nivo-lightbox-loading")
                })
            } else return false;
            if (r.attr("title")) {
                var d = e("<span>", {
                    "class": "nivo-lightbox-title"
                });
                d.text(r.attr("title"));
                e(".nivo-lightbox-title-wrap").html(d)
            } else e(".nivo-lightbox-title-wrap").html("")
        },
        constructLightbox: function() {
            if (e(".nivo-lightbox-overlay").length) return e(".nivo-lightbox-overlay");
            var t = e("<div>", {
                "class": "nivo-lightbox-overlay nivo-lightbox-theme-" + this.options.theme + " nivo-lightbox-effect-" + this.options.effect
            });
            var n = e("<div>", {
                "class": "nivo-lightbox-wrap"
            });
            var r = e("<div>", {
                "class": "nivo-lightbox-content"
            });
            var i = e('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>');
            var s = e('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>');
            var o = e("<div>", {
                "class": "nivo-lightbox-title-wrap"
            });
            var u = 0;
            if (u) t.addClass("nivo-lightbox-ie");
            n.append(r);
            n.append(o);
            t.append(n);
            t.append(i);
            t.append(s);
            e("body").append(t);
            var a = this;
            if (a.options.clickOverlayToClose) t.on("click", function(t) {
                if (t.target === this || e(t.target).hasClass("nivo-lightbox-content") || e(t.target).hasClass("nivo-lightbox-image")) a.destructLightbox()
            });
            s.on("click", function(e) {
                e.preventDefault();
                a.destructLightbox()
            });
            return t
        },
        destructLightbox: function() {
            var t = this;
            this.options.beforeHideLightbox.call(this);
            e(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open");
            e(".nivo-lightbox-nav").hide();
            e("body").removeClass("nivo-lightbox-body-effect-" + t.options.effect);
            var n = 0;
            if (n) {
                e(".nivo-lightbox-overlay iframe").attr("src", " ");
                e(".nivo-lightbox-overlay iframe").remove()
            }
            e(".nivo-lightbox-prev").off("click");
            e(".nivo-lightbox-next").off("click");
            e(".nivo-lightbox-content").empty();
            this.options.afterHideLightbox.call(this)
        },
        isHidpi: function() {
            var e = "(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";
            if (t.devicePixelRatio > 1) return true;
            if (t.matchMedia && t.matchMedia(e).matches) return true;
            return false
        }
    };
    e.fn[i] = function(t) {
        return this.each(function() {
            if (!e.data(this, i)) e.data(this, i, new o(this, t))
        })
    }
})(jQuery, window, document);
(function(e) {
    if (typeof define === "function" && define.amd) define(["jquery"], e);
    else e(jQuery)
})(function(e) {
    var t = {
        from: 0,
        to: 0,
        runningInterval: null,
        stepInterval: null,
        stepCount: null,
        stepUnit: null,
        format: "%counter%",
        "class": "numinate",
        precision: 0,
        autoStart: true,
        autoRemove: false,
        onCreate: null,
        onStart: null,
        onStep: null,
        onStop: null,
        onComplete: null,
        onRemove: null
    };
    var n = function(e, t) {
        if (!t.runningInterval && !t.stepInterval) return window.console.error("No interval was provided.");
        var n = Math.abs(t.from - t.to);
        if (!t.stepCount &&
            !t.stepUnit) return window.console.error("Provide either stepCount or stepUnit value.");
        if (t.stepUnit && t.stepCount) t.to = t.from + t.stepUnit * t.stepCount;
        if (!t.stepCount) t.stepCount = n / t.stepUnit;
        if (!t.stepUnit) t.stepUnit = n / t.stepCount;
        if (t.runningInterval) t.stepInterval = t.runningInterval / t.stepCount;
        if (n && t.stepUnit > n) {
            t.stepUnit = n;
            t.stepCount = 1
        }
        if (t.stepInterval < 10) {
            var r = 10 / t.stepInterval;
            t.stepInterval *= r;
            t.stepUnit *= r;
            t.stepCount /= r
        }
        this.textBackup = e.text();
        this.element = e;
        this.options = t;
        this.stepper =
            null;
        this.current = t.from;
        this.finished = false;
        this.element.addClass(t["class"]);
        this.fire("onCreate");
        if (this.options.autoStart) this.start()
    };
    n.prototype = {
        constructor: n,
        fire: function(t) {
            if (e.isFunction(this.options[t])) this.options[t](this.element, this.options, this.current)
        },
        stop: function() {
            if (!this.stepper || this.finished) return;
            this.stepper = clearInterval(this.stepper);
            this.fire("onStop")
        },
        start: function() {
            if (this.stepper || this.finished) return;
            this.render();
            this.stepper = setInterval(e.proxy(this.step,
                this), this.options.stepInterval);
            this.fire("onStart")
        },
        step: function() {
            if (!(this.options.from + this.options.to)) this.current += this.options.stepUnit;
            else if (this.options.from < this.options.to) this.current += this.options.stepUnit;
            else if (this.options.from > this.options.to) this.current -= this.options.stepUnit;
            if (this.options.from < this.options.to) {
                if (this.current > this.options.to) return this.completed()
            } else if (this.options.from > this.options.to)
                if (this.current < this.options.to) return this.completed();
            this.fire("onStep");
            this.render()
        },
        completed: function() {
            var e = Math.abs(this.options.from - this.options.to);
            if (e && this.options.current !== this.options.to) {
                this.current = this.options.to;
                this.render()
            }
            this.stop();
            this.finished = true;
            this.fire("onComplete");
            if (this.options.autoRemove) this.remove()
        },
        remove: function() {
            this.fire("onRemove");
            e.removeData(this.element, "numinate");
            this.element.text(this.textBackup ? this.textBackup : "");
            this.element.removeClass(this.options["class"])
        },
        render: function() {
            this.element.text(this.options.format.replace(/\%counter\%/,
                this.current.toFixed(this.options.precision)))
        },
        restart: function() {
            this.finished = false;
            this.current = this.options.from;
            this.stop();
            this.start()
        }
    };
    e.fn.numinate = function(r) {
        var i;
        if (typeof r == "object") {
            r = e.extend(true, {}, t, r);
            i = "init"
        } else if (typeof r == "string") i = r;
        return this.each(function() {
            var t = e(this);
            if (i == "init") t.data("numinate", new n(t, r));
            else t.data("numinate")[i]()
        })
    };
    e.fn.numinate.defaults = t;
    e.fn.numinate.Plugin = n
});
"function" != typeof Object.create && (Object.create = function(a) {
        function b() {}
        return b.prototype = a, new b
    }),
    function(a, b, c, d) {
        var e = {
            init: function(b, c) {
                var d = this;
                d.$elem = a(c), d.options = a.extend({}, a.fn.owlCarousel.options, d.$elem.data(), b), d.userOptions = b, d.loadContent()
            },
            loadContent: function() {
                function d(a) {
                    if ("function" == typeof b.options.jsonSuccess) b.options.jsonSuccess.apply(this, [a]);
                    else {
                        var c = "";
                        for (var d in a.owl) c += a.owl[d].item;
                        b.$elem.html(c)
                    }
                    b.logIn()
                }
                var b = this;
                if ("function" == typeof b.options.beforeInit &&
                    b.options.beforeInit.apply(this, [b.$elem]), "string" == typeof b.options.jsonPath) {
                    var c = b.options.jsonPath;
                    a.getJSON(c, d)
                } else b.logIn()
            },
            logIn: function(a) {
                var b = this;
                b.$elem.data("owl-originalStyles", b.$elem.attr("style")).data("owl-originalClasses", b.$elem.attr("class")), b.$elem.css({
                    opacity: 0
                }), b.orignalItems = b.options.items, b.checkBrowser(), b.wrapperWidth = 0, b.checkVisible, b.setVars()
            },
            setVars: function() {
                var a = this;
                return 0 !== a.$elem.children().length && (a.baseClass(), a.eventTypes(), a.$userItems =
                    a.$elem.children(), a.itemsAmount = a.$userItems.length, a.wrapItems(), a.$owlItems = a.$elem.find(".owl-item"), a.$owlWrapper = a.$elem.find(".owl-wrapper"), a.playDirection = "next", a.prevItem = 0, a.prevArr = [0], a.currentItem = 0, a.customEvents(), void a.onStartup())
            },
            onStartup: function() {
                var a = this;
                a.updateItems(), a.calculateAll(), a.buildControls(), a.updateControls(), a.response(), a.moveEvents(), a.stopOnHover(), a.owlStatus(), a.options.transitionStyle !== !1 && a.transitionTypes(a.options.transitionStyle), a.options.autoPlay ===
                    !0 && (a.options.autoPlay = 5E3), a.play(), a.$elem.find(".owl-wrapper").css("display", "block"), a.$elem.is(":visible") ? a.$elem.css("opacity", 1) : a.watchVisibility(), a.onstartup = !1, a.eachMoveUpdate(), "function" == typeof a.options.afterInit && a.options.afterInit.apply(this, [a.$elem])
            },
            eachMoveUpdate: function() {
                var a = this;
                a.options.lazyLoad === !0 && a.lazyLoad(), a.options.autoHeight === !0 && a.autoHeight(), a.onVisibleItems(), "function" == typeof a.options.afterAction && a.options.afterAction.apply(this, [a.$elem])
            },
            updateVars: function() {
                var a =
                    this;
                "function" == typeof a.options.beforeUpdate && a.options.beforeUpdate.apply(this, [a.$elem]), a.watchVisibility(), a.updateItems(), a.calculateAll(), a.updatePosition(), a.updateControls(), a.eachMoveUpdate(), "function" == typeof a.options.afterUpdate && a.options.afterUpdate.apply(this, [a.$elem])
            },
            reload: function(a) {
                var b = this;
                setTimeout(function() {
                    b.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var a = this;
                return a.$elem.is(":visible") === !1 && (a.$elem.css({
                        opacity: 0
                    }), clearInterval(a.autoPlayInterval), clearInterval(a.checkVisible),
                    void(a.checkVisible = setInterval(function() {
                        a.$elem.is(":visible") && (a.reload(), a.$elem.animate({
                            opacity: 1
                        }, 200), clearInterval(a.checkVisible))
                    }, 500)))
            },
            wrapItems: function() {
                var a = this;
                a.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), a.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), a.wrapperOuter = a.$elem.find(".owl-wrapper-outer"), a.$elem.css("display", "block")
            },
            baseClass: function() {
                var a = this,
                    b = a.$elem.hasClass(a.options.baseClass),
                    c = a.$elem.hasClass(a.options.theme);
                b || a.$elem.addClass(a.options.baseClass), c || a.$elem.addClass(a.options.theme)
            },
            updateItems: function() {
                var b = this;
                if (b.options.responsive === !1) return !1;
                if (b.options.singleItem === !0) return b.options.items = b.orignalItems = 1, b.options.itemsCustom = !1, b.options.itemsDesktop = !1, b.options.itemsDesktopSmall = !1, b.options.itemsTablet = !1, b.options.itemsTabletSmall = !1, b.options.itemsMobile = !1, !1;
                var c = a(b.options.responsiveBaseWidth).width();
                if (c > (b.options.itemsDesktop[0] || b.orignalItems) && (b.options.items = b.orignalItems),
                    "undefined" != typeof b.options.itemsCustom && b.options.itemsCustom !== !1) {
                    b.options.itemsCustom.sort(function(a, b) {
                        return a[0] - b[0]
                    });
                    for (var d in b.options.itemsCustom) "undefined" != typeof b.options.itemsCustom[d] && b.options.itemsCustom[d][0] <= c && (b.options.items = b.options.itemsCustom[d][1])
                } else c <= b.options.itemsDesktop[0] && b.options.itemsDesktop !== !1 && (b.options.items = b.options.itemsDesktop[1]), c <= b.options.itemsDesktopSmall[0] && b.options.itemsDesktopSmall !== !1 && (b.options.items = b.options.itemsDesktopSmall[1]),
                    c <= b.options.itemsTablet[0] && b.options.itemsTablet !== !1 && (b.options.items = b.options.itemsTablet[1]), c <= b.options.itemsTabletSmall[0] && b.options.itemsTabletSmall !== !1 && (b.options.items = b.options.itemsTabletSmall[1]), c <= b.options.itemsMobile[0] && b.options.itemsMobile !== !1 && (b.options.items = b.options.itemsMobile[1]);
                b.options.items > b.itemsAmount && b.options.itemsScaleUp === !0 && (b.options.items = b.itemsAmount)
            },
            response: function() {
                var d, c = this;
                if (c.options.responsive !== !0) return !1;
                var e = a(b).width();
                c.resizer =
                    function() {
                        a(b).width() !== e && (c.options.autoPlay !== !1 && clearInterval(c.autoPlayInterval), clearTimeout(d), d = setTimeout(function() {
                            e = a(b).width(), c.updateVars()
                        }, c.options.responsiveRefreshRate))
                    }, a(b).resize(c.resizer)
            },
            updatePosition: function() {
                var a = this;
                a.jumpTo(a.currentItem), a.options.autoPlay !== !1 && a.checkAp()
            },
            appendItemsSizes: function() {
                var b = this,
                    c = 0,
                    d = b.itemsAmount - b.options.items;
                b.$owlItems.each(function(e) {
                    var f = a(this);
                    f.css({
                            width: b.itemWidth
                        }).data("owl-item", Number(e)), e % b.options.items !==
                        0 && e !== d || e > d || (c += 1), f.data("owl-roundPages", c)
                })
            },
            appendWrapperSizes: function() {
                var c, a = this,
                    b = a.$owlItems.length * a.itemWidth;
                c = "rtl" == a.options.direction ? {
                    right: 0,
                    direction: "rtl"
                } : {
                    left: 0
                }, a.$owlWrapper.css({
                    width: b
                }), a.$owlWrapper.css(c), a.appendItemsSizes()
            },
            calculateAll: function() {
                var a = this;
                a.calculateWidth(), a.appendWrapperSizes(), a.loops(), a.max()
            },
            calculateWidth: function() {
                var a = this;
                a.itemWidth = Math.round(a.$elem.width() / a.options.items)
            },
            max: function() {
                var a = this,
                    b = (a.itemsAmount * a.itemWidth -
                        a.options.items * a.itemWidth) * -1;
                return a.options.items > a.itemsAmount ? (a.maximumItem = 0, b = 0, a.maximumPixels = 0) : (a.maximumItem = a.itemsAmount - a.options.items, a.maximumPixels = b), b
            },
            min: function() {
                return 0
            },
            loops: function() {
                var b = this;
                b.positionsInArray = [0], b.pagesInArray = [];
                for (var c = 0, d = 0, e = 0; e < b.itemsAmount; e++)
                    if (d += b.itemWidth, b.positionsInArray.push(-d), b.options.scrollPerPage === !0) {
                        var f = a(b.$owlItems[e]),
                            g = f.data("owl-roundPages");
                        g !== c && (b.pagesInArray[c] = b.positionsInArray[e], c = g)
                    }
            },
            buildControls: function() {
                var b =
                    this;
                b.options.navigation !== !0 && b.options.pagination !== !0 || (b.owlControls = a('<div class="owl-controls"/>').toggleClass("clickable", !b.browser.isTouch).appendTo(b.$elem)), b.options.pagination === !0 && b.buildPagination(), b.options.navigation === !0 && b.buildButtons()
            },
            buildButtons: function() {
                var b = this,
                    c = a('<div class="owl-buttons"/>');
                b.owlControls.append(c), b.buttonPrev = a("<div/>", {
                    "class": "owl-prev",
                    html: b.options.navigationText[0] || ""
                }), b.buttonNext = a("<div/>", {
                    "class": "owl-next",
                    html: b.options.navigationText[1] ||
                        ""
                }), c.append(b.buttonPrev).append(b.buttonNext), c.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(a) {
                    a.preventDefault()
                }), c.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(c) {
                    c.preventDefault(), a(this).hasClass("owl-next") ? b.next() : b.prev()
                })
            },
            buildPagination: function() {
                var b = this;
                b.paginationWrapper = a('<div class="owl-pagination"/>'), b.owlControls.append(b.paginationWrapper), b.paginationWrapper.on("touchend.owlControls mouseup.owlControls",
                    ".owl-page",
                    function(c) {
                        c.preventDefault(), Number(a(this).data("owl-page")) !== b.currentItem && b.goTo(Number(a(this).data("owl-page")), !0)
                    })
            },
            updatePagination: function() {
                var b = this;
                if (b.options.pagination === !1) return !1;
                b.paginationWrapper.html("");
                for (var c = 0, d = b.itemsAmount - b.itemsAmount % b.options.items, e = 0; e < b.itemsAmount; e++)
                    if (e % b.options.items === 0) {
                        if (c += 1, d === e) var f = b.itemsAmount - b.options.items;
                        var g = a("<div/>", {
                                "class": "owl-page"
                            }),
                            h = a("<span></span>", {
                                text: b.options.paginationNumbers === !0 ?
                                    c : "",
                                "class": b.options.paginationNumbers === !0 ? "owl-numbers" : ""
                            });
                        g.append(h), g.data("owl-page", d === e ? f : e), g.data("owl-roundPages", c), b.paginationWrapper.append(g)
                    }
                b.checkPagination()
            },
            checkPagination: function() {
                var b = this;
                return b.options.pagination !== !1 && void b.paginationWrapper.find(".owl-page").each(function(c, d) {
                    a(this).data("owl-roundPages") === a(b.$owlItems[b.currentItem]).data("owl-roundPages") && (b.paginationWrapper.find(".owl-page").removeClass("active"), a(this).addClass("active"))
                })
            },
            checkNavigation: function() {
                var a =
                    this;
                return a.options.navigation !== !1 && void(a.options.rewindNav === !1 && (0 === a.currentItem && 0 === a.maximumItem ? (a.buttonPrev.addClass("disabled"), a.buttonNext.addClass("disabled")) : 0 === a.currentItem && 0 !== a.maximumItem ? (a.buttonPrev.addClass("disabled"), a.buttonNext.removeClass("disabled")) : a.currentItem === a.maximumItem ? (a.buttonPrev.removeClass("disabled"), a.buttonNext.addClass("disabled")) : 0 !== a.currentItem && a.currentItem !== a.maximumItem && (a.buttonPrev.removeClass("disabled"), a.buttonNext.removeClass("disabled"))))
            },
            updateControls: function() {
                var a = this;
                a.updatePagination(), a.checkNavigation(), a.owlControls && (a.options.items >= a.itemsAmount ? a.owlControls.hide() : a.owlControls.show())
            },
            destroyControls: function() {
                var a = this;
                a.owlControls && a.owlControls.remove()
            },
            next: function(a) {
                var b = this;
                if (b.isTransition) return !1;
                if (b.currentItem += b.options.scrollPerPage === !0 ? b.options.items : 1, b.currentItem > b.maximumItem + (1 == b.options.scrollPerPage ? b.options.items - 1 : 0)) {
                    if (b.options.rewindNav !== !0) return b.currentItem = b.maximumItem, !1;
                    b.currentItem = 0, a = "rewind"
                }
                b.goTo(b.currentItem, a)
            },
            prev: function(a) {
                var b = this;
                if (b.isTransition) return !1;
                if (b.options.scrollPerPage === !0 && b.currentItem > 0 && b.currentItem < b.options.items ? b.currentItem = 0 : b.currentItem -= b.options.scrollPerPage === !0 ? b.options.items : 1, b.currentItem < 0) {
                    if (b.options.rewindNav !== !0) return b.currentItem = 0, !1;
                    b.currentItem = b.maximumItem, a = "rewind"
                }
                b.goTo(b.currentItem, a)
            },
            goTo: function(a, b, c) {
                var d = this;
                if (d.isTransition) return !1;
                if ("function" == typeof d.options.beforeMove &&
                    d.options.beforeMove.apply(this, [d.$elem]), a >= d.maximumItem ? a = d.maximumItem : a <= 0 && (a = 0), d.currentItem = d.owl.currentItem = a, d.options.transitionStyle !== !1 && "drag" !== c && 1 === d.options.items && d.browser.support3d === !0) return d.swapSpeed(0), d.browser.support3d === !0 ? d.transition3d(d.positionsInArray[a]) : d.css2slide(d.positionsInArray[a], 1), d.afterGo(), d.singleItemTransition(), !1;
                var e = d.positionsInArray[a];
                d.browser.support3d === !0 ? (d.isCss3Finish = !1, b === !0 ? (d.swapSpeed("paginationSpeed"), setTimeout(function() {
                    d.isCss3Finish = !0
                }, d.options.paginationSpeed)) : "rewind" === b ? (d.swapSpeed(d.options.rewindSpeed), setTimeout(function() {
                    d.isCss3Finish = !0
                }, d.options.rewindSpeed)) : (d.swapSpeed("slideSpeed"), setTimeout(function() {
                    d.isCss3Finish = !0
                }, d.options.slideSpeed)), d.transition3d(e)) : b === !0 ? d.css2slide(e, d.options.paginationSpeed) : "rewind" === b ? d.css2slide(e, d.options.rewindSpeed) : d.css2slide(e, d.options.slideSpeed), d.afterGo()
            },
            jumpTo: function(a) {
                var b = this;
                "function" == typeof b.options.beforeMove && b.options.beforeMove.apply(this, [b.$elem]), a >= b.maximumItem || a === -1 ? a = b.maximumItem : a <= 0 && (a = 0), b.swapSpeed(0), b.browser.support3d === !0 ? b.transition3d(b.positionsInArray[a]) : b.css2slide(b.positionsInArray[a], 1), b.currentItem = b.owl.currentItem = a, b.afterGo()
            },
            afterGo: function() {
                var a = this;
                a.prevArr.push(a.currentItem), a.prevItem = a.owl.prevItem = a.prevArr[a.prevArr.length - 2], a.prevArr.shift(0), a.prevItem !== a.currentItem && (a.checkPagination(), a.checkNavigation(), a.eachMoveUpdate(), a.options.autoPlay !== !1 && a.checkAp()), "function" == typeof a.options.afterMove &&
                    a.prevItem !== a.currentItem && a.options.afterMove.apply(this, [a.$elem])
            },
            stop: function() {
                var a = this;
                a.apStatus = "stop", clearInterval(a.autoPlayInterval)
            },
            checkAp: function() {
                var a = this;
                "stop" !== a.apStatus && a.play()
            },
            play: function() {
                var a = this;
                return a.apStatus = "play", a.options.autoPlay !== !1 && (clearInterval(a.autoPlayInterval), void(a.autoPlayInterval = setInterval(function() {
                    a.next(!0)
                }, a.options.autoPlay)))
            },
            swapSpeed: function(a) {
                var b = this;
                "slideSpeed" === a ? b.$owlWrapper.css(b.addCssSpeed(b.options.slideSpeed)) :
                    "paginationSpeed" === a ? b.$owlWrapper.css(b.addCssSpeed(b.options.paginationSpeed)) : "string" != typeof a && b.$owlWrapper.css(b.addCssSpeed(a))
            },
            addCssSpeed: function(a) {
                return {
                    "-webkit-transition": "all " + a + "ms ease",
                    "-moz-transition": "all " + a + "ms ease",
                    "-o-transition": "all " + a + "ms ease",
                    transition: "all " + a + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(a) {
                var b = this;
                return a = "rtl" == b.options.direction ? -a :
                    a, {
                        "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",
                        "-moz-transform": "translate3d(" + a + "px, 0px, 0px)",
                        "-o-transform": "translate3d(" + a + "px, 0px, 0px)",
                        "-ms-transform": "translate3d(" + a + "px, 0px, 0px)",
                        transform: "translate3d(" + a + "px, 0px,0px)"
                    }
            },
            transition3d: function(a) {
                var b = this;
                b.$owlWrapper.css(b.doTranslate(a))
            },
            css2move: function(a) {
                var c, b = this;
                c = "rtl" == b.options.direction ? {
                    right: a
                } : {
                    left: a
                }, b.$owlWrapper.css(c)
            },
            css2slide: function(a, b) {
                var d, c = this;
                d = "rtl" == c.options.direction ? {
                        right: a
                    } : {
                        left: a
                    },
                    c.isCssFinish = !1, c.$owlWrapper.stop(!0, !0).animate(d, {
                        duration: b || c.options.slideSpeed,
                        complete: function() {
                            c.isCssFinish = !0
                        }
                    })
            },
            checkBrowser: function() {
                var a = this,
                    d = "translate3d(0px, 0px, 0px)",
                    e = c.createElement("div");
                e.style.cssText = "  -moz-transform:" + d + "; -ms-transform:" + d + "; -o-transform:" + d + "; -webkit-transform:" + d + "; transform:" + d;
                var f = /translate3d\(0px, 0px, 0px\)/g,
                    g = e.style.cssText.match(f),
                    h = null !== g && 1 === g.length,
                    i = "ontouchstart" in b || navigator.msMaxTouchPoints;
                a.browser = {
                    support3d: h,
                    isTouch: i
                }
            },
            moveEvents: function() {
                var a = this;
                a.options.mouseDrag === !1 && a.options.touchDrag === !1 || (a.gestures(), a.disabledEvents())
            },
            eventTypes: function() {
                var a = this,
                    b = ["s", "e", "x"];
                a.ev_types = {}, a.options.mouseDrag === !0 && a.options.touchDrag === !0 ? b = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : a.options.mouseDrag === !1 && a.options.touchDrag === !0 ? b = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : a.options.mouseDrag === !0 && a.options.touchDrag ===
                    !1 && (b = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), a.ev_types.start = b[0], a.ev_types.move = b[1], a.ev_types.end = b[2]
            },
            disabledEvents: function() {
                var b = this;
                b.$elem.on("dragstart.owl", function(a) {
                    a.preventDefault()
                }), b.$elem.on("mousedown.disableTextSelect", function(b) {
                    return a(b.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function g(a) {
                    return a.touches ? {
                        x: a.touches[0].pageX,
                        y: a.touches[0].pageY
                    } : a.pageX !== d ? {
                        x: a.pageX,
                        y: a.pageY
                    } : {
                        x: a.clientX,
                        y: a.clientY
                    }
                }

                function h(b) {
                    "on" ===
                    b ? (a(c).on(e.ev_types.move, j), a(c).on(e.ev_types.end, k)) : "off" === b && (a(c).off(e.ev_types.move), a(c).off(e.ev_types.end))
                }

                function i(c) {
                    var c = c.originalEvent || c || b.event;
                    if (3 === c.which) return !1;
                    if (!(e.itemsAmount <= e.options.items)) {
                        if (e.isCssFinish === !1 && !e.options.dragBeforeAnimFinish) return !1;
                        if (e.isCss3Finish === !1 && !e.options.dragBeforeAnimFinish) return !1;
                        e.options.autoPlay !== !1 && clearInterval(e.autoPlayInterval), e.browser.isTouch === !0 || e.$owlWrapper.hasClass("grabbing") || e.$owlWrapper.addClass("grabbing"),
                            e.newPosX = 0, e.newRelativeX = 0, a(this).css(e.removeTransition());
                        var d = a(this).position();
                        "rtl" == e.options.direction ? (positionRight = e.$owlItems.eq(0).width() * e.currentItem, f.relativePos = positionRight, f.offsetX = -g(c).x + positionRight) : (f.relativePos = d.left, f.offsetX = g(c).x - d.left), f.offsetY = g(c).y - d.top, h("on"), f.sliding = !1, f.targetElement = c.target || c.srcElement
                    }
                }

                function j(d) {
                    var d = d.originalEvent || d || b.event;
                    "rtl" == e.options.direction ? (e.newPosX = -g(d).x - f.offsetX, e.newPosY = g(d).y - f.offsetY, e.newRelativeX =
                        e.newPosX + f.relativePos) : (e.newPosX = g(d).x - f.offsetX, e.newPosY = g(d).y - f.offsetY, e.newRelativeX = e.newPosX - f.relativePos), "function" == typeof e.options.startDragging && f.dragging !== !0 && 0 !== e.newRelativeX && (f.dragging = !0, e.options.startDragging.apply(e, [e.$elem])), (e.newRelativeX > 8 || e.newRelativeX < -8 && e.browser.isTouch === !0) && (d.preventDefault ? d.preventDefault() : d.returnValue = !1, f.sliding = !0), (e.newPosY > 10 || e.newPosY < -10) && f.sliding === !1 && a(c).off("touchmove.owl");
                    var h = function() {
                            return e.newRelativeX /
                                5
                        },
                        i = function() {
                            return e.maximumPixels + e.newRelativeX / 5
                        };
                    e.newPosX = Math.max(Math.min(e.newPosX, h()), i()), e.browser.support3d === !0 ? e.transition3d(e.newPosX) : e.css2move(e.newPosX)
                }

                function k(c) {
                    var c = c.originalEvent || c || b.event;
                    if (c.target = c.target || c.srcElement, f.dragging = !1, e.browser.isTouch !== !0 && e.$owlWrapper.removeClass("grabbing"), "rtl" == e.options.direction ? e.newRelativeX < 0 ? e.dragDirection = e.owl.dragDirection = "right" : e.dragDirection = e.owl.dragDirection = "left" : e.newRelativeX < 0 ? e.dragDirection =
                        e.owl.dragDirection = "left" : e.dragDirection = e.owl.dragDirection = "right", 0 !== e.newRelativeX) {
                        var d = e.getNewPosition();
                        if (e.goTo(d, !1, "drag"), f.targetElement === c.target && e.browser.isTouch !== !0) {
                            a(c.target).on("click.disable", function(b) {
                                b.stopImmediatePropagation(), b.stopPropagation(), b.preventDefault(), a(c.target).off("click.disable")
                            });
                            var g = a._data(c.target, "events").click,
                                i = g.pop();
                            g.splice(0, 0, i)
                        }
                    }
                    h("off")
                }
                var e = this,
                    f = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                e.isCssFinish = !0, e.$elem.on(e.ev_types.start, ".owl-wrapper", i)
            },
            getNewPosition: function() {
                var b, a = this;
                return b = a.closestItem(), b > a.maximumItem ? (a.currentItem = a.maximumItem, b = a.maximumItem) : a.newPosX >= 0 && (b = 0, a.currentItem = 0), b
            },
            closestItem: function() {
                var b = this,
                    c = b.options.scrollPerPage === !0 ? b.pagesInArray : b.positionsInArray,
                    d = b.newPosX,
                    e = null;
                return a.each(c, function(f, g) {
                    d - b.itemWidth / 20 > c[f + 1] && d - b.itemWidth / 20 < g && "left" === b.moveDirection() ?
                        (e = g, b.options.scrollPerPage === !0 ? b.currentItem = a.inArray(e, b.positionsInArray) : b.currentItem = f) : d + b.itemWidth / 20 < g && d + b.itemWidth / 20 > (c[f + 1] || c[f] - b.itemWidth) && "right" === b.moveDirection() && (b.options.scrollPerPage === !0 ? (e = c[f + 1] || c[c.length - 1], b.currentItem = a.inArray(e, b.positionsInArray)) : (e = c[f + 1], b.currentItem = f + 1))
                }), b.currentItem
            },
            moveDirection: function() {
                var b, a = this;
                return a.newRelativeX < 0 ? (b = "right", a.playDirection = "next") : (b = "left", a.playDirection = "prev"), b
            },
            customEvents: function() {
                var a =
                    this;
                a.$elem.on("owl.next", function() {
                    a.next()
                }), a.$elem.on("owl.prev", function() {
                    a.prev()
                }), a.$elem.on("owl.play", function(b, c) {
                    a.options.autoPlay = c, a.play(), a.hoverStatus = "play"
                }), a.$elem.on("owl.stop", function() {
                    a.stop(), a.hoverStatus = "stop"
                }), a.$elem.on("owl.goTo", function(b, c) {
                    a.goTo(c)
                }), a.$elem.on("owl.jumpTo", function(b, c) {
                    a.jumpTo(c)
                })
            },
            stopOnHover: function() {
                var a = this;
                a.options.stopOnHover === !0 && a.browser.isTouch !== !0 && a.options.autoPlay !== !1 && (a.$elem.on("mouseover", function() {
                        a.stop()
                    }),
                    a.$elem.on("mouseout", function() {
                        "stop" !== a.hoverStatus && a.play()
                    }))
            },
            lazyLoad: function() {
                var b = this;
                if (b.options.lazyLoad === !1) return !1;
                for (var c = 0; c < b.itemsAmount; c++) {
                    var e = a(b.$owlItems[c]);
                    if ("loaded" !== e.data("owl-loaded")) {
                        var h, f = e.data("owl-item"),
                            g = e.find(".lazyOwl");
                        "string" == typeof g.data("src") ? (e.data("owl-loaded") === d && (g.hide(), e.addClass("loading").data("owl-loaded", "checked")), h = b.options.lazyFollow !== !0 || f >= b.currentItem, h && f < b.currentItem + b.options.items && g.length && b.lazyPreload(e,
                            g)) : e.data("owl-loaded", "loaded")
                    }
                }
            },
            lazyPreload: function(a, b) {
                function f() {
                    d += 1, c.completeImg(b.get(0)) || e === !0 ? g() : d <= 100 ? setTimeout(f, 100) : g()
                }

                function g() {
                    a.data("owl-loaded", "loaded").removeClass("loading"), b.removeAttr("data-src"), "fade" === c.options.lazyEffect ? b.fadeIn(400) : b.show(), "function" == typeof c.options.afterLazyLoad && c.options.afterLazyLoad.apply(this, [c.$elem])
                }
                var c = this,
                    d = 0;
                if ("DIV" === b.prop("tagName")) {
                    b.css("background-image", "url(" + b.data("src") + ")");
                    var e = !0
                } else b[0].src = b.data("src");
                f()
            },
            autoHeight: function() {
                function f() {
                    e += 1, b.completeImg(c.get(0)) ? g() : e <= 100 ? setTimeout(f, 100) : b.wrapperOuter.css("height", "")
                }

                function g() {
                    var c = a(b.$owlItems[b.currentItem]).height();
                    b.wrapperOuter.css("height", c + "px"), b.wrapperOuter.hasClass("autoHeight") || setTimeout(function() {
                        b.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }
                var b = this,
                    c = a(b.$owlItems[b.currentItem]).find("img");
                if (c.get(0) !== d) {
                    var e = 0;
                    f()
                } else g()
            },
            completeImg: function(a) {
                return !!a.complete && ("undefined" == typeof a.naturalWidth ||
                    0 != a.naturalWidth)
            },
            onVisibleItems: function() {
                var b = this;
                b.options.addClassActive === !0 && b.$owlItems.removeClass("active"), b.visibleItems = [];
                for (var c = b.currentItem; c < b.currentItem + b.options.items; c++) b.visibleItems.push(c), b.options.addClassActive === !0 && a(b.$owlItems[c]).addClass("active");
                b.owl.visibleItems = b.visibleItems
            },
            transitionTypes: function(a) {
                var b = this;
                b.outClass = "owl-" + a + "-out", b.inClass = "owl-" + a + "-in"
            },
            singleItemTransition: function() {
                function h(a, b) {
                    return {
                        position: "relative",
                        left: a + "px"
                    }
                }
                var a = this;
                a.isTransition = !0;
                var b = a.outClass,
                    c = a.inClass,
                    d = a.$owlItems.eq(a.currentItem),
                    e = a.$owlItems.eq(a.prevItem),
                    f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem],
                    g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2;
                a.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": g + "px",
                    "-moz-perspective-origin": g + "px",
                    "perspective-origin": g + "px"
                });
                var i = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
                e.css(h(f, 10)).addClass(b).on(i, function() {
                    a.endPrev = !0, e.off(i), a.clearTransStyle(e, b)
                }), d.addClass(c).on(i, function() {
                    a.endCurrent = !0, d.off(i), a.clearTransStyle(d, c)
                })
            },
            clearTransStyle: function(a, b) {
                var c = this;
                a.css({
                    position: "",
                    left: ""
                }).removeClass(b), c.endPrev && c.endCurrent && (c.$owlWrapper.removeClass("owl-origin"), c.endPrev = !1, c.endCurrent = !1, c.isTransition = !1)
            },
            owlStatus: function() {
                var a = this;
                a.owl = {
                    userOptions: a.userOptions,
                    baseElement: a.$elem,
                    userItems: a.$userItems,
                    owlItems: a.$owlItems,
                    currentItem: a.currentItem,
                    prevItem: a.prevItem,
                    visibleItems: a.visibleItems,
                    isTouch: a.browser.isTouch,
                    browser: a.browser,
                    dragDirection: a.dragDirection
                }
            },
            clearEvents: function() {
                var d = this;
                d.$elem.off(".owl owl mousedown.disableTextSelect"), a(c).off(".owl owl"), a(b).off("resize", d.resizer)
            },
            unWrap: function() {
                var a = this;
                0 !== a.$elem.children().length && (a.$owlWrapper.unwrap(), a.$userItems.unwrap().unwrap(), a.owlControls && a.owlControls.remove()), a.clearEvents(), a.$elem.attr("style", a.$elem.data("owl-originalStyles") || "").attr("class", a.$elem.data("owl-originalClasses"))
            },
            destroy: function() {
                var a =
                    this;
                a.stop(), clearInterval(a.checkVisible), a.unWrap(), a.$elem.removeData()
            },
            reinit: function(b) {
                var c = this,
                    d = a.extend({}, c.userOptions, b);
                c.unWrap(), c.init(d, c.$elem)
            },
            addItem: function(a, b) {
                var e, c = this;
                return !!a && (0 === c.$elem.children().length ? (c.$elem.append(a), c.setVars(), !1) : (c.unWrap(), e = b === d || b === -1 ? -1 : b, e >= c.$userItems.length || e === -1 ? c.$userItems.eq(-1).after(a) : c.$userItems.eq(e).before(a), void c.setVars()))
            },
            removeItem: function(a) {
                var c, b = this;
                return 0 !== b.$elem.children().length && (c = a ===
                    d || a === -1 ? -1 : a, b.unWrap(), b.$userItems.eq(c).remove(), void b.setVars())
            }
        };
        a.fn.owlCarousel = function(b) {
            return this.each(function() {
                if (a(this).data("owl-init") === !0) return !1;
                a(this).data("owl-init", !0);
                var c = Object.create(e);
                c.init(b, this), a.data(this, "owlCarousel", c)
            })
        }, a.fn.owlCarousel.options = {
            direction: "ltr",
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1E3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: b,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document);
! function() {
    function a() {}

    function b(a) {
        return f.retinaImageSuffix + a
    }

    function c(a, c) {
        if (this.path = a || "", "undefined" != typeof c && null !== c) this.at_2x_path = c, this.perform_check = !1;
        else {
            if (void 0 !== document.createElement) {
                var d = document.createElement("a");
                d.href = this.path, d.pathname = d.pathname.replace(g, b), this.at_2x_path = d.href
            } else {
                var e = this.path.split("?");
                e[0] = e[0].replace(g, b), this.at_2x_path = e.join("?")
            }
            this.perform_check = !0
        }
    }

    function d(a) {
        this.el = a, this.path = new c(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
        var b = this;
        this.path.check_2x_variant(function(a) {
            a && b.swap()
        })
    }
    var e = "undefined" == typeof exports ? window : exports,
        f = {
            retinaImageSuffix: "",
            check_mime_type: !0,
            force_original_dimensions: !0
        };
    e.Retina = a, a.configure = function(a) {
        null === a && (a = {});
        for (var b in a) a.hasOwnProperty(b) && (f[b] = a[b])
    }, a.init = function(a) {
        null === a && (a = e);
        var b = a.onload || function() {};
        a.onload = function() {
            var a, c, e = document.getElementsByTagName("img"),
                f = [];
            for (a = 0; a < e.length; a += 1) c = e[a], c.getAttributeNode("data-no-retina") || f.push(new d(c));
            b()
        }
    }, a.isRetina = function() {
        var a = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
        return e.devicePixelRatio > 1 ? !0 : e.matchMedia && e.matchMedia(a).matches ? !0 : !1
    };
    var g = /\.\w+$/;
    e.RetinaImagePath = c, c.confirmed_paths = [], c.prototype.is_external = function() {
            return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
        }, c.prototype.check_2x_variant = function(a) {
            var b, d = this;
            return this.is_external() ? a(!1) :
                this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in c.confirmed_paths ? a(!0) : (b = new XMLHttpRequest, b.open("HEAD", this.at_2x_path), b.onreadystatechange = function() {
                    if (4 !== b.readyState) return a(!1);
                    if (b.status >= 200 && b.status <= 399) {
                        if (f.check_mime_type) {
                            var e = b.getResponseHeader("Content-Type");
                            if (null === e || !e.match(/^image/i)) return a(!1)
                        }
                        return c.confirmed_paths.push(d.at_2x_path), a(!0)
                    }
                    return a(!1)
                }, b.send(), void 0) : a(!0)
        }, e.RetinaImage = d, d.prototype.swap =
        function(a) {
            function b() {
                c.el.complete ? (f.force_original_dimensions && (c.el.setAttribute("width", c.el.offsetWidth), c.el.setAttribute("height", c.el.offsetHeight)), c.el.setAttribute("src", a)) : setTimeout(b, 5)
            }
            "undefined" == typeof a && (a = this.path.at_2x_path);
            var c = this;
            b()
        }, a.isRetina() && a.init(e)
}();
! function() {
    function e(e) {
        e.fn.swiper = function(a) {
            var s;
            return e(this).each(function() {
                var e = new t(this, a);
                s || (s = e)
            }), s
        }
    }
    var a, t = function(e, s) {
        function r() {
            return "horizontal" === v.params.direction
        }

        function i(e) {
            return Math.floor(e)
        }

        function n() {
            v.autoplayTimeoutId = setTimeout(function() {
                v.params.loop ? (v.fixLoop(), v._slideNext()) : v.isEnd ? s.autoplayStopOnLast ? v.stopAutoplay() : v._slideTo(0) : v._slideNext()
            }, v.params.autoplay)
        }

        function o(e, t) {
            var s = a(e.target);
            if (!s.is(t))
                if ("string" == typeof t) s = s.parents(t);
                else if (t.nodeType) {
                var r;
                return s.parents().each(function(e, a) {
                    a === t && (r = t)
                }), r ? t : void 0
            }
            return 0 === s.length ? void 0 : s[0]
        }

        function l(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver,
                s = new t(function(e) {
                    e.forEach(function(e) {
                        v.onResize(!0), v.emit("onObserverUpdate", v, e)
                    })
                });
            s.observe(e, {
                attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
                childList: "undefined" == typeof a.childList ? !0 : a.childList,
                characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
            }), v.observers.push(s)
        }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!v.params.allowSwipeToNext && (r() && 39 === a || !r() && 40 === a)) return !1;
            if (!v.params.allowSwipeToPrev && (r() && 37 === a || !r() && 38 === a)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (v.container.parents(".swiper-slide").length >
                        0 && 0 === v.container.parents(".swiper-slide-active").length) return;
                    var s = {
                            left: window.pageXOffset,
                            top: window.pageYOffset
                        },
                        i = window.innerWidth,
                        n = window.innerHeight,
                        o = v.container.offset();
                    v.rtl && (o.left = o.left - v.container[0].scrollLeft);
                    for (var l = [
                            [o.left, o.top],
                            [o.left + v.width, o.top],
                            [o.left, o.top + v.height],
                            [o.left + v.width, o.top + v.height]
                        ], p = 0; p < l.length; p++) {
                        var d = l[p];
                        d[0] >= s.left && d[0] <= s.left + i && d[1] >= s.top && d[1] <= s.top + n && (t = !0)
                    }
                    if (!t) return
                }
                r() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() :
                    e.returnValue = !1), (39 === a && !v.rtl || 37 === a && v.rtl) && v.slideNext(), (37 === a && !v.rtl || 39 === a && v.rtl) && v.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && v.slideNext(), 38 === a && v.slidePrev())
            }
        }

        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = v.mousewheel.event,
                t = 0;
            if (e.detail) t = -e.detail;
            else if ("mousewheel" === a)
                if (v.params.mousewheelForceToAxis)
                    if (r()) {
                        if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
                        t = e.wheelDeltaX
                    } else {
                        if (!(Math.abs(e.wheelDeltaY) >
                                Math.abs(e.wheelDeltaX))) return;
                        t = e.wheelDeltaY
                    }
            else t = e.wheelDelta;
            else if ("DOMMouseScroll" === a) t = -e.detail;
            else if ("wheel" === a)
                if (v.params.mousewheelForceToAxis)
                    if (r()) {
                        if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                        t = -e.deltaX
                    } else {
                        if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                        t = -e.deltaY
                    }
            else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
            if (v.params.mousewheelInvert && (t = -t), v.params.freeMode) {
                var s = v.getWrapperTranslate() + t * v.params.mousewheelSensitivity;
                if (s > 0 && (s = 0), s <
                    v.maxTranslate() && (s = v.maxTranslate()), v.setWrapperTransition(0), v.setWrapperTranslate(s), v.updateProgress(), v.updateActiveIndex(), v.params.freeModeSticky && (clearTimeout(v.mousewheel.timeout), v.mousewheel.timeout = setTimeout(function() {
                        v.slideReset()
                    }, 300)), 0 === s || s === v.maxTranslate()) return
            } else {
                if ((new window.Date).getTime() - v.mousewheel.lastScrollTime > 60)
                    if (0 > t)
                        if (v.isEnd && !v.params.loop || v.animating) {
                            if (v.params.mousewheelReleaseOnEdges) return !0
                        } else v.slideNext();
                else if (v.isBeginning && !v.params.loop ||
                    v.animating) {
                    if (v.params.mousewheelReleaseOnEdges) return !0
                } else v.slidePrev();
                v.mousewheel.lastScrollTime = (new window.Date).getTime()
            }
            return v.params.autoplay && v.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }

        function u(e, t) {
            e = a(e);
            var s, i, n;
            s = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), n = e.attr("data-swiper-parallax-y"), i || n ? (i = i || "0", n = n || "0") : r() ? (i = s, n = "0") : (n = s, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t + "%" : i * t + "px", n = n.indexOf("%") >= 0 ? parseInt(n,
                10) * t + "%" : n * t + "px", e.transform("translate3d(" + i + ", " + n + ",0px)")
        }

        function c(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }
        if (!(this instanceof t)) return new t(e, s);
        var m = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                iOSEdgeSwipeDetection: !1,
                iOSEdgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeSticky: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                },
                cube: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                },
                fade: {
                    crossFade: !1
                },
                parallax: !1,
                scrollbar: null,
                scrollbarHide: !0,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                mousewheelSensitivity: 1,
                hashnav: !1,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                slideClass: "swiper-slide",
                slideActiveClass: "swiper-slide-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slidePrevClass: "swiper-slide-prev",
                wrapperClass: "swiper-wrapper",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                buttonDisabledClass: "swiper-button-disabled",
                paginationHiddenClass: "swiper-pagination-hidden",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            },
            f = s && s.virtualTranslate;
        s = s || {};
        for (var h in m)
            if ("undefined" == typeof s[h]) s[h] = m[h];
            else if ("object" == typeof s[h])
            for (var g in m[h]) "undefined" == typeof s[h][g] && (s[h][g] = m[h][g]);
        var v = this;
        if (v.version = "3.1.0", v.params = s, v.classNames = [], "undefined" != typeof a && "undefined" != typeof Dom7 && (a = Dom7), ("undefined" != typeof a || (a = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (v.$ = a, v.container = a(e), 0 !== v.container.length)) {
            if (v.container.length > 1) return void v.container.each(function() {
                new t(this,
                    s)
            });
            v.container[0].swiper = v, v.container.data("swiper", v), v.classNames.push("swiper-container-" + v.params.direction), v.params.freeMode && v.classNames.push("swiper-container-free-mode"), v.support.flexbox || (v.classNames.push("swiper-container-no-flexbox"), v.params.slidesPerColumn = 1), (v.params.parallax || v.params.watchSlidesVisibility) && (v.params.watchSlidesProgress = !0), ["cube", "coverflow"].indexOf(v.params.effect) >= 0 && (v.support.transforms3d ? (v.params.watchSlidesProgress = !0, v.classNames.push("swiper-container-3d")) :
                    v.params.effect = "slide"), "slide" !== v.params.effect && v.classNames.push("swiper-container-" + v.params.effect), "cube" === v.params.effect && (v.params.resistanceRatio = 0, v.params.slidesPerView = 1, v.params.slidesPerColumn = 1, v.params.slidesPerGroup = 1, v.params.centeredSlides = !1, v.params.spaceBetween = 0, v.params.virtualTranslate = !0, v.params.setWrapperSize = !1), "fade" === v.params.effect && (v.params.slidesPerView = 1, v.params.slidesPerColumn = 1, v.params.slidesPerGroup = 1, v.params.watchSlidesProgress = !0, v.params.spaceBetween =
                    0, "undefined" == typeof f && (v.params.virtualTranslate = !0)), v.params.grabCursor && v.support.touch && (v.params.grabCursor = !1), v.wrapper = v.container.children("." + v.params.wrapperClass), v.params.pagination && (v.paginationContainer = a(v.params.pagination), v.params.paginationClickable && v.paginationContainer.addClass("swiper-pagination-clickable")), v.rtl = r() && ("rtl" === v.container[0].dir.toLowerCase() || "rtl" === v.container.css("direction")), v.rtl && v.classNames.push("swiper-container-rtl"), v.rtl && (v.wrongRTL = "-webkit-box" ===
                    v.wrapper.css("display")), v.params.slidesPerColumn > 1 && v.classNames.push("swiper-container-multirow"), v.device.android && v.classNames.push("swiper-container-android"), v.container.addClass(v.classNames.join(" ")), v.translate = 0, v.progress = 0, v.velocity = 0, v.lockSwipeToNext = function() {
                    v.params.allowSwipeToNext = !1
                }, v.lockSwipeToPrev = function() {
                    v.params.allowSwipeToPrev = !1
                }, v.lockSwipes = function() {
                    v.params.allowSwipeToNext = v.params.allowSwipeToPrev = !1
                }, v.unlockSwipeToNext = function() {
                    v.params.allowSwipeToNext = !0
                }, v.unlockSwipeToPrev = function() {
                    v.params.allowSwipeToPrev = !0
                }, v.unlockSwipes = function() {
                    v.params.allowSwipeToNext = v.params.allowSwipeToPrev = !0
                }, v.params.grabCursor && (v.container[0].style.cursor = "move", v.container[0].style.cursor = "-webkit-grab", v.container[0].style.cursor = "-moz-grab", v.container[0].style.cursor = "grab"), v.imagesToLoad = [], v.imagesLoaded = 0, v.loadImage = function(e, a, t, s) {
                    function r() {
                        s && s()
                    }
                    var i;
                    e.complete && t ? r() : a ? (i = new window.Image, i.onload = r, i.onerror = r, i.src = a) : r()
                }, v.preloadImages =
                function() {
                    function e() {
                        "undefined" != typeof v && null !== v && (void 0 !== v.imagesLoaded && v.imagesLoaded++, v.imagesLoaded === v.imagesToLoad.length && (v.params.updateOnImagesReady && v.update(), v.emit("onImagesReady", v)))
                    }
                    v.imagesToLoad = v.container.find("img");
                    for (var a = 0; a < v.imagesToLoad.length; a++) v.loadImage(v.imagesToLoad[a], v.imagesToLoad[a].currentSrc || v.imagesToLoad[a].getAttribute("src"), !0, e)
                }, v.autoplayTimeoutId = void 0, v.autoplaying = !1, v.autoplayPaused = !1, v.startAutoplay = function() {
                    return "undefined" !=
                        typeof v.autoplayTimeoutId ? !1 : v.params.autoplay ? v.autoplaying ? !1 : (v.autoplaying = !0, v.emit("onAutoplayStart", v), void n()) : !1
                }, v.stopAutoplay = function(e) {
                    v.autoplayTimeoutId && (v.autoplayTimeoutId && clearTimeout(v.autoplayTimeoutId), v.autoplaying = !1, v.autoplayTimeoutId = void 0, v.emit("onAutoplayStop", v))
                }, v.pauseAutoplay = function(e) {
                    v.autoplayPaused || (v.autoplayTimeoutId && clearTimeout(v.autoplayTimeoutId), v.autoplayPaused = !0, 0 === e ? (v.autoplayPaused = !1, n()) : v.wrapper.transitionEnd(function() {
                        v && (v.autoplayPaused = !1, v.autoplaying ? n() : v.stopAutoplay())
                    }))
                }, v.minTranslate = function() {
                    return -v.snapGrid[0]
                }, v.maxTranslate = function() {
                    return -v.snapGrid[v.snapGrid.length - 1]
                }, v.updateContainerSize = function() {
                    var e, a;
                    e = "undefined" != typeof v.params.width ? v.params.width : v.container[0].clientWidth, a = "undefined" != typeof v.params.height ? v.params.height : v.container[0].clientHeight, 0 === e && r() || 0 === a && !r() || (e = e - parseInt(v.container.css("padding-left"), 10) - parseInt(v.container.css("padding-right"), 10), a = a - parseInt(v.container.css("padding-top"),
                        10) - parseInt(v.container.css("padding-bottom"), 10), v.width = e, v.height = a, v.size = r() ? v.width : v.height)
                }, v.updateSlidesSize = function() {
                    v.slides = v.wrapper.children("." + v.params.slideClass), v.snapGrid = [], v.slidesGrid = [], v.slidesSizesGrid = [];
                    var e, a = v.params.spaceBetween,
                        t = -v.params.slidesOffsetBefore,
                        s = 0,
                        n = 0;
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * v.size), v.virtualSize = -a, v.slides.css(v.rtl ? {
                        marginLeft: "",
                        marginTop: ""
                    } : {
                        marginRight: "",
                        marginBottom: ""
                    });
                    var o;
                    v.params.slidesPerColumn >
                        1 && (o = Math.floor(v.slides.length / v.params.slidesPerColumn) === v.slides.length / v.params.slidesPerColumn ? v.slides.length : Math.ceil(v.slides.length / v.params.slidesPerColumn) * v.params.slidesPerColumn);
                    var l, p = v.params.slidesPerColumn,
                        d = o / p,
                        u = d - (v.params.slidesPerColumn * d - v.slides.length);
                    for (e = 0; e < v.slides.length; e++) {
                        l = 0;
                        var c = v.slides.eq(e);
                        if (v.params.slidesPerColumn > 1) {
                            var m, f, h;
                            "column" === v.params.slidesPerColumnFill ? (f = Math.floor(e / p), h = e - f * p, (f > u || f === u && h === p - 1) && ++h >= p && (h = 0, f++), m = f + h * o / p, c.css({
                                "-webkit-box-ordinal-group": m,
                                "-moz-box-ordinal-group": m,
                                "-ms-flex-order": m,
                                "-webkit-order": m,
                                order: m
                            })) : (h = Math.floor(e / d), f = e - h * d), c.css({
                                "margin-top": 0 !== h && v.params.spaceBetween && v.params.spaceBetween + "px"
                            }).attr("data-swiper-column", f).attr("data-swiper-row", h)
                        }
                        "none" !== c.css("display") && ("auto" === v.params.slidesPerView ? (l = r() ? c.outerWidth(!0) : c.outerHeight(!0), v.params.roundLengths && (l = i(l))) : (l = (v.size - (v.params.slidesPerView - 1) * a) / v.params.slidesPerView, v.params.roundLengths && (l = i(l)), r() ? v.slides[e].style.width = l + "px" :
                            v.slides[e].style.height = l + "px"), v.slides[e].swiperSlideSize = l, v.slidesSizesGrid.push(l), v.params.centeredSlides ? (t = t + l / 2 + s / 2 + a, 0 === e && (t = t - v.size / 2 - a), Math.abs(t) < .001 && (t = 0), n % v.params.slidesPerGroup === 0 && v.snapGrid.push(t), v.slidesGrid.push(t)) : (n % v.params.slidesPerGroup === 0 && v.snapGrid.push(t), v.slidesGrid.push(t), t = t + l + a), v.virtualSize += l + a, s = l, n++)
                    }
                    v.virtualSize = Math.max(v.virtualSize, v.size) + v.params.slidesOffsetAfter;
                    var g;
                    if (v.rtl && v.wrongRTL && ("slide" === v.params.effect || "coverflow" === v.params.effect) &&
                        v.wrapper.css({
                            width: v.virtualSize + v.params.spaceBetween + "px"
                        }), (!v.support.flexbox || v.params.setWrapperSize) && v.wrapper.css(r() ? {
                            width: v.virtualSize + v.params.spaceBetween + "px"
                        } : {
                            height: v.virtualSize + v.params.spaceBetween + "px"
                        }), v.params.slidesPerColumn > 1 && (v.virtualSize = (l + v.params.spaceBetween) * o, v.virtualSize = Math.ceil(v.virtualSize / v.params.slidesPerColumn) - v.params.spaceBetween, v.wrapper.css({
                            width: v.virtualSize + v.params.spaceBetween + "px"
                        }), v.params.centeredSlides)) {
                        for (g = [], e = 0; e < v.snapGrid.length; e++) v.snapGrid[e] <
                            v.virtualSize + v.snapGrid[0] && g.push(v.snapGrid[e]);
                        v.snapGrid = g
                    }
                    if (!v.params.centeredSlides) {
                        for (g = [], e = 0; e < v.snapGrid.length; e++) v.snapGrid[e] <= v.virtualSize - v.size && g.push(v.snapGrid[e]);
                        v.snapGrid = g, Math.floor(v.virtualSize - v.size) > Math.floor(v.snapGrid[v.snapGrid.length - 1]) && v.snapGrid.push(v.virtualSize - v.size)
                    }
                    0 === v.snapGrid.length && (v.snapGrid = [0]), 0 !== v.params.spaceBetween && v.slides.css(r() ? v.rtl ? {
                            marginLeft: a + "px"
                        } : {
                            marginRight: a + "px"
                        } : {
                            marginBottom: a + "px"
                        }), v.params.watchSlidesProgress &&
                        v.updateSlidesOffset()
                }, v.updateSlidesOffset = function() {
                    for (var e = 0; e < v.slides.length; e++) v.slides[e].swiperSlideOffset = r() ? v.slides[e].offsetLeft : v.slides[e].offsetTop
                }, v.updateSlidesProgress = function(e) {
                    if ("undefined" == typeof e && (e = v.translate || 0), 0 !== v.slides.length) {
                        "undefined" == typeof v.slides[0].swiperSlideOffset && v.updateSlidesOffset();
                        var a = -e;
                        v.rtl && (a = e);
                        v.container[0].getBoundingClientRect(), r() ? "left" : "top", r() ? "right" : "bottom";
                        v.slides.removeClass(v.params.slideVisibleClass);
                        for (var t =
                                0; t < v.slides.length; t++) {
                            var s = v.slides[t],
                                i = (a - s.swiperSlideOffset) / (s.swiperSlideSize + v.params.spaceBetween);
                            if (v.params.watchSlidesVisibility) {
                                var n = -(a - s.swiperSlideOffset),
                                    o = n + v.slidesSizesGrid[t],
                                    l = n >= 0 && n < v.size || o > 0 && o <= v.size || 0 >= n && o >= v.size;
                                l && v.slides.eq(t).addClass(v.params.slideVisibleClass)
                            }
                            s.progress = v.rtl ? -i : i
                        }
                    }
                }, v.updateProgress = function(e) {
                    "undefined" == typeof e && (e = v.translate || 0);
                    var a = v.maxTranslate() - v.minTranslate();
                    0 === a ? (v.progress = 0, v.isBeginning = v.isEnd = !0) : (v.progress =
                        (e - v.minTranslate()) / a, v.isBeginning = v.progress <= 0, v.isEnd = v.progress >= 1), v.isBeginning && v.emit("onReachBeginning", v), v.isEnd && v.emit("onReachEnd", v), v.params.watchSlidesProgress && v.updateSlidesProgress(e), v.emit("onProgress", v, v.progress)
                }, v.updateActiveIndex = function() {
                    var e, a, t, s = v.rtl ? v.translate : -v.translate;
                    for (a = 0; a < v.slidesGrid.length; a++) "undefined" != typeof v.slidesGrid[a + 1] ? s >= v.slidesGrid[a] && s < v.slidesGrid[a + 1] - (v.slidesGrid[a + 1] - v.slidesGrid[a]) / 2 ? e = a : s >= v.slidesGrid[a] && s < v.slidesGrid[a +
                        1] && (e = a + 1) : s >= v.slidesGrid[a] && (e = a);
                    (0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / v.params.slidesPerGroup), t >= v.snapGrid.length && (t = v.snapGrid.length - 1), e !== v.activeIndex && (v.snapIndex = t, v.previousIndex = v.activeIndex, v.activeIndex = e, v.updateClasses())
                }, v.updateClasses = function() {
                    v.slides.removeClass(v.params.slideActiveClass + " " + v.params.slideNextClass + " " + v.params.slidePrevClass);
                    var e = v.slides.eq(v.activeIndex);
                    if (e.addClass(v.params.slideActiveClass), e.next("." + v.params.slideClass).addClass(v.params.slideNextClass),
                        e.prev("." + v.params.slideClass).addClass(v.params.slidePrevClass), v.bullets && v.bullets.length > 0) {
                        v.bullets.removeClass(v.params.bulletActiveClass);
                        var t;
                        v.params.loop ? (t = Math.ceil(v.activeIndex - v.loopedSlides) / v.params.slidesPerGroup, t > v.slides.length - 1 - 2 * v.loopedSlides && (t -= v.slides.length - 2 * v.loopedSlides), t > v.bullets.length - 1 && (t -= v.bullets.length)) : t = "undefined" != typeof v.snapIndex ? v.snapIndex : v.activeIndex || 0, v.paginationContainer.length > 1 ? v.bullets.each(function() {
                                a(this).index() === t && a(this).addClass(v.params.bulletActiveClass)
                            }) :
                            v.bullets.eq(t).addClass(v.params.bulletActiveClass)
                    }
                    v.params.loop || (v.params.prevButton && (v.isBeginning ? (a(v.params.prevButton).addClass(v.params.buttonDisabledClass), v.params.a11y && v.a11y && v.a11y.disable(a(v.params.prevButton))) : (a(v.params.prevButton).removeClass(v.params.buttonDisabledClass), v.params.a11y && v.a11y && v.a11y.enable(a(v.params.prevButton)))), v.params.nextButton && (v.isEnd ? (a(v.params.nextButton).addClass(v.params.buttonDisabledClass), v.params.a11y && v.a11y && v.a11y.disable(a(v.params.nextButton))) :
                        (a(v.params.nextButton).removeClass(v.params.buttonDisabledClass), v.params.a11y && v.a11y && v.a11y.enable(a(v.params.nextButton)))))
                }, v.updatePagination = function() {
                    if (v.params.pagination && v.paginationContainer && v.paginationContainer.length > 0) {
                        for (var e = "", a = v.params.loop ? Math.ceil((v.slides.length - 2 * v.loopedSlides) / v.params.slidesPerGroup) : v.snapGrid.length, t = 0; a > t; t++) e += v.params.paginationBulletRender ? v.params.paginationBulletRender(t, v.params.bulletClass) : "<" + v.params.paginationElement + ' class="' +
                            v.params.bulletClass + '"></' + v.params.paginationElement + ">";
                        v.paginationContainer.html(e), v.bullets = v.paginationContainer.find("." + v.params.bulletClass), v.params.paginationClickable && v.params.a11y && v.a11y && v.a11y.initPagination()
                    }
                }, v.update = function(e) {
                    function a() {
                        s = Math.min(Math.max(v.translate, v.maxTranslate()), v.minTranslate()), v.setWrapperTranslate(s), v.updateActiveIndex(), v.updateClasses()
                    }
                    if (v.updateContainerSize(), v.updateSlidesSize(), v.updateProgress(), v.updatePagination(), v.updateClasses(),
                        v.params.scrollbar && v.scrollbar && v.scrollbar.set(), e) {
                        var t, s;
                        v.controller && v.controller.spline && (v.controller.spline = void 0), v.params.freeMode ? a() : (t = ("auto" === v.params.slidesPerView || v.params.slidesPerView > 1) && v.isEnd && !v.params.centeredSlides ? v.slideTo(v.slides.length - 1, 0, !1, !0) : v.slideTo(v.activeIndex, 0, !1, !0), t || a())
                    }
                }, v.onResize = function(e) {
                    var a = v.params.allowSwipeToPrev,
                        t = v.params.allowSwipeToNext;
                    if (v.params.allowSwipeToPrev = v.params.allowSwipeToNext = !0, v.updateContainerSize(), v.updateSlidesSize(),
                        ("auto" === v.params.slidesPerView || v.params.freeMode || e) && v.updatePagination(), v.params.scrollbar && v.scrollbar && v.scrollbar.set(), v.controller && v.controller.spline && (v.controller.spline = void 0), v.params.freeMode) {
                        var s = Math.min(Math.max(v.translate, v.maxTranslate()), v.minTranslate());
                        v.setWrapperTranslate(s), v.updateActiveIndex(), v.updateClasses()
                    } else v.updateClasses(), ("auto" === v.params.slidesPerView || v.params.slidesPerView > 1) && v.isEnd && !v.params.centeredSlides ? v.slideTo(v.slides.length - 1, 0, !1, !0) :
                        v.slideTo(v.activeIndex, 0, !1, !0);
                    v.params.allowSwipeToPrev = a, v.params.allowSwipeToNext = t
                };
            var w = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? w = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (w = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), v.touchEvents = {
                    start: v.support.touch || !v.params.simulateTouch ? "touchstart" : w[0],
                    move: v.support.touch || !v.params.simulateTouch ? "touchmove" : w[1],
                    end: v.support.touch || !v.params.simulateTouch ? "touchend" : w[2]
                }, (window.navigator.pointerEnabled ||
                    window.navigator.msPointerEnabled) && ("container" === v.params.touchEventsTarget ? v.container : v.wrapper).addClass("swiper-wp8-" + v.params.direction), v.initEvents = function(e) {
                    var t = e ? "off" : "on",
                        r = e ? "removeEventListener" : "addEventListener",
                        i = "container" === v.params.touchEventsTarget ? v.container[0] : v.wrapper[0],
                        n = v.support.touch ? i : document,
                        o = v.params.nested ? !0 : !1;
                    v.browser.ie ? (i[r](v.touchEvents.start, v.onTouchStart, !1), n[r](v.touchEvents.move, v.onTouchMove, o), n[r](v.touchEvents.end, v.onTouchEnd, !1)) : (v.support.touch &&
                        (i[r](v.touchEvents.start, v.onTouchStart, !1), i[r](v.touchEvents.move, v.onTouchMove, o), i[r](v.touchEvents.end, v.onTouchEnd, !1)), !s.simulateTouch || v.device.ios || v.device.android || (i[r]("mousedown", v.onTouchStart, !1), document[r]("mousemove", v.onTouchMove, o), document[r]("mouseup", v.onTouchEnd, !1))), window[r]("resize", v.onResize), v.params.nextButton && (a(v.params.nextButton)[t]("click", v.onClickNext), v.params.a11y && v.a11y && a(v.params.nextButton)[t]("keydown", v.a11y.onEnterKey)), v.params.prevButton && (a(v.params.prevButton)[t]("click",
                        v.onClickPrev), v.params.a11y && v.a11y && a(v.params.prevButton)[t]("keydown", v.a11y.onEnterKey)), v.params.pagination && v.params.paginationClickable && (a(v.paginationContainer)[t]("click", "." + v.params.bulletClass, v.onClickIndex), v.params.a11y && v.a11y && a(v.paginationContainer)[t]("keydown", "." + v.params.bulletClass, v.a11y.onEnterKey)), (v.params.preventClicks || v.params.preventClicksPropagation) && i[r]("click", v.preventClicks, !0)
                }, v.attachEvents = function(e) {
                    v.initEvents()
                }, v.detachEvents = function() {
                    v.initEvents(!0)
                },
                v.allowClick = !0, v.preventClicks = function(e) {
                    v.allowClick || (v.params.preventClicks && e.preventDefault(), v.params.preventClicksPropagation && v.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                }, v.onClickNext = function(e) {
                    e.preventDefault(), (!v.isEnd || v.params.loop) && v.slideNext()
                }, v.onClickPrev = function(e) {
                    e.preventDefault(), (!v.isBeginning || v.params.loop) && v.slidePrev()
                }, v.onClickIndex = function(e) {
                    e.preventDefault();
                    var t = a(this).index() * v.params.slidesPerGroup;
                    v.params.loop && (t += v.loopedSlides),
                        v.slideTo(t)
                }, v.updateClickedSlide = function(e) {
                    var t = o(e, "." + v.params.slideClass),
                        s = !1;
                    if (t)
                        for (var r = 0; r < v.slides.length; r++) v.slides[r] === t && (s = !0);
                    if (!t || !s) return v.clickedSlide = void 0, void(v.clickedIndex = void 0);
                    if (v.clickedSlide = t, v.clickedIndex = a(t).index(), v.params.slideToClickedSlide && void 0 !== v.clickedIndex && v.clickedIndex !== v.activeIndex) {
                        var i, n = v.clickedIndex;
                        if (v.params.loop)
                            if (i = a(v.clickedSlide).attr("data-swiper-slide-index"), n > v.slides.length - v.params.slidesPerView) v.fixLoop(), n =
                                v.wrapper.children("." + v.params.slideClass + '[data-swiper-slide-index="' + i + '"]').eq(0).index(), setTimeout(function() {
                                    v.slideTo(n)
                                }, 0);
                            else if (n < v.params.slidesPerView - 1) {
                            v.fixLoop();
                            var l = v.wrapper.children("." + v.params.slideClass + '[data-swiper-slide-index="' + i + '"]');
                            n = l.eq(l.length - 1).index(), setTimeout(function() {
                                v.slideTo(n)
                            }, 0)
                        } else v.slideTo(n);
                        else v.slideTo(n)
                    }
                };
            var y, x, b, T, S, C, M, P, z, I = "input, select, textarea, button",
                E = Date.now(),
                k = [];
            v.animating = !1, v.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var D, G;
            if (v.onTouchStart = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), D = "touchstart" === e.type, D || !("which" in e) || 3 !== e.which) {
                        if (v.params.noSwiping && o(e, "." + v.params.noSwipingClass)) return void(v.allowClick = !0);
                        if (!v.params.swipeHandler || o(e, v.params.swipeHandler)) {
                            var t = v.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                s = v.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(v.device.ios && v.params.iOSEdgeSwipeDetection && t <=
                                    v.params.iOSEdgeSwipeThreshold)) {
                                if (y = !0, x = !1, T = void 0, G = void 0, v.touches.startX = t, v.touches.startY = s, b = Date.now(), v.allowClick = !0, v.updateContainerSize(), v.swipeDirection = void 0, v.params.threshold > 0 && (M = !1), "touchstart" !== e.type) {
                                    var r = !0;
                                    a(e.target).is(I) && (r = !1), document.activeElement && a(document.activeElement).is(I) && document.activeElement.blur(), r && e.preventDefault()
                                }
                                v.emit("onTouchStart", v, e)
                            }
                        }
                    }
                }, v.onTouchMove = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), !(D && "mousemove" === e.type || e.preventedByNestedSwiper)) {
                        if (v.params.onlyExternal) return v.allowClick = !1, void(y && (v.touches.startX = v.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, v.touches.startY = v.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, b = Date.now()));
                        if (D && document.activeElement && e.target === document.activeElement && a(e.target).is(I)) return x = !0, void(v.allowClick = !1);
                        if (v.emit("onTouchMove", v, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (v.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, v.touches.currentY = "touchmove" ===
                                e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof T) {
                                var t = 180 * Math.atan2(Math.abs(v.touches.currentY - v.touches.startY), Math.abs(v.touches.currentX - v.touches.startX)) / Math.PI;
                                T = r() ? t > v.params.touchAngle : 90 - t > v.params.touchAngle
                            }
                            if (T && v.emit("onTouchMoveOpposite", v, e), "undefined" == typeof G && v.browser.ieTouch && (v.touches.currentX !== v.touches.startX || v.touches.currentY !== v.touches.startY) && (G = !0), y) {
                                if (T) return void(y = !1);
                                if (G || !v.browser.ieTouch) {
                                    v.allowClick = !1, v.emit("onSliderMove", v, e),
                                        e.preventDefault(), v.params.touchMoveStopPropagation && !v.params.nested && e.stopPropagation(), x || (s.loop && v.fixLoop(), C = v.getWrapperTranslate(), v.setWrapperTransition(0), v.animating && v.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), v.params.autoplay && v.autoplaying && (v.params.autoplayDisableOnInteraction ? v.stopAutoplay() : v.pauseAutoplay()), z = !1, v.params.grabCursor && (v.container[0].style.cursor = "move", v.container[0].style.cursor = "-webkit-grabbing",
                                            v.container[0].style.cursor = "-moz-grabbin", v.container[0].style.cursor = "grabbing")), x = !0;
                                    var i = v.touches.diff = r() ? v.touches.currentX - v.touches.startX : v.touches.currentY - v.touches.startY;
                                    i *= v.params.touchRatio, v.rtl && (i = -i), v.swipeDirection = i > 0 ? "prev" : "next", S = i + C;
                                    var n = !0;
                                    if (i > 0 && S > v.minTranslate() ? (n = !1, v.params.resistance && (S = v.minTranslate() - 1 + Math.pow(-v.minTranslate() + C + i, v.params.resistanceRatio))) : 0 > i && S < v.maxTranslate() && (n = !1, v.params.resistance && (S = v.maxTranslate() + 1 - Math.pow(v.maxTranslate() -
                                            C - i, v.params.resistanceRatio))), n && (e.preventedByNestedSwiper = !0), !v.params.allowSwipeToNext && "next" === v.swipeDirection && C > S && (S = C), !v.params.allowSwipeToPrev && "prev" === v.swipeDirection && S > C && (S = C), v.params.followFinger) {
                                        if (v.params.threshold > 0) {
                                            if (!(Math.abs(i) > v.params.threshold || M)) return void(S = C);
                                            if (!M) return M = !0, v.touches.startX = v.touches.currentX, v.touches.startY = v.touches.currentY, S = C, void(v.touches.diff = r() ? v.touches.currentX - v.touches.startX : v.touches.currentY - v.touches.startY)
                                        }(v.params.freeMode ||
                                            v.params.watchSlidesProgress) && v.updateActiveIndex(), v.params.freeMode && (0 === k.length && k.push({
                                            position: v.touches[r() ? "startX" : "startY"],
                                            time: b
                                        }), k.push({
                                            position: v.touches[r() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), v.updateProgress(S), v.setWrapperTranslate(S)
                                    }
                                }
                            }
                        }
                    }
                }, v.onTouchEnd = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), v.emit("onTouchEnd", v, e), y) {
                        v.params.grabCursor && x && y && (v.container[0].style.cursor = "move", v.container[0].style.cursor = "-webkit-grab", v.container[0].style.cursor =
                            "-moz-grab", v.container[0].style.cursor = "grab");
                        var t = Date.now(),
                            s = t - b;
                        if (v.allowClick && (v.updateClickedSlide(e), v.emit("onTap", v, e), 300 > s && t - E > 300 && (P && clearTimeout(P), P = setTimeout(function() {
                                v && (v.params.paginationHide && v.paginationContainer.length > 0 && !a(e.target).hasClass(v.params.bulletClass) && v.paginationContainer.toggleClass(v.params.paginationHiddenClass), v.emit("onClick", v, e))
                            }, 300)), 300 > s && 300 > t - E && (P && clearTimeout(P), v.emit("onDoubleTap", v, e))), E = Date.now(), setTimeout(function() {
                                v && (v.allowClick = !0)
                            }, 0), !y || !x || !v.swipeDirection || 0 === v.touches.diff || S === C) return void(y = x = !1);
                        y = x = !1;
                        var r;
                        if (r = v.params.followFinger ? v.rtl ? v.translate : -v.translate : -S, v.params.freeMode) {
                            if (r < -v.minTranslate()) return void v.slideTo(v.activeIndex);
                            if (r > -v.maxTranslate()) return void v.slideTo(v.slides.length < v.snapGrid.length ? v.snapGrid.length - 1 : v.slides.length - 1);
                            if (v.params.freeModeMomentum) {
                                if (k.length > 1) {
                                    var i = k.pop(),
                                        n = k.pop(),
                                        o = i.position - n.position,
                                        l = i.time - n.time;
                                    v.velocity = o / l, v.velocity = v.velocity / 2, Math.abs(v.velocity) <
                                        .02 && (v.velocity = 0), (l > 150 || (new window.Date).getTime() - i.time > 300) && (v.velocity = 0)
                                } else v.velocity = 0;
                                k.length = 0;
                                var p = 1E3 * v.params.freeModeMomentumRatio,
                                    d = v.velocity * p,
                                    u = v.translate + d;
                                v.rtl && (u = -u);
                                var c, m = !1,
                                    f = 20 * Math.abs(v.velocity) * v.params.freeModeMomentumBounceRatio;
                                if (u < v.maxTranslate()) v.params.freeModeMomentumBounce ? (u + v.maxTranslate() < -f && (u = v.maxTranslate() - f), c = v.maxTranslate(), m = !0, z = !0) : u = v.maxTranslate();
                                else if (u > v.minTranslate()) v.params.freeModeMomentumBounce ? (u - v.minTranslate() >
                                    f && (u = v.minTranslate() + f), c = v.minTranslate(), m = !0, z = !0) : u = v.minTranslate();
                                else if (v.params.freeModeSticky) {
                                    var h, g = 0;
                                    for (g = 0; g < v.snapGrid.length; g += 1)
                                        if (v.snapGrid[g] > -u) {
                                            h = g;
                                            break
                                        }
                                    u = Math.abs(v.snapGrid[h] - u) < Math.abs(v.snapGrid[h - 1] - u) || "next" === v.swipeDirection ? v.snapGrid[h] : v.snapGrid[h - 1], v.rtl || (u = -u)
                                }
                                if (0 !== v.velocity) p = Math.abs(v.rtl ? (-u - v.translate) / v.velocity : (u - v.translate) / v.velocity);
                                else if (v.params.freeModeSticky) return void v.slideReset();
                                v.params.freeModeMomentumBounce && m ? (v.updateProgress(c),
                                        v.setWrapperTransition(p), v.setWrapperTranslate(u), v.onTransitionStart(), v.animating = !0, v.wrapper.transitionEnd(function() {
                                            v && z && (v.emit("onMomentumBounce", v), v.setWrapperTransition(v.params.speed), v.setWrapperTranslate(c), v.wrapper.transitionEnd(function() {
                                                v && v.onTransitionEnd()
                                            }))
                                        })) : v.velocity ? (v.updateProgress(u), v.setWrapperTransition(p), v.setWrapperTranslate(u), v.onTransitionStart(), v.animating || (v.animating = !0, v.wrapper.transitionEnd(function() {
                                        v && v.onTransitionEnd()
                                    }))) : v.updateProgress(u),
                                    v.updateActiveIndex()
                            }
                            return void((!v.params.freeModeMomentum || s >= v.params.longSwipesMs) && (v.updateProgress(), v.updateActiveIndex()))
                        }
                        var w, T = 0,
                            M = v.slidesSizesGrid[0];
                        for (w = 0; w < v.slidesGrid.length; w += v.params.slidesPerGroup) "undefined" != typeof v.slidesGrid[w + v.params.slidesPerGroup] ? r >= v.slidesGrid[w] && r < v.slidesGrid[w + v.params.slidesPerGroup] && (T = w, M = v.slidesGrid[w + v.params.slidesPerGroup] - v.slidesGrid[w]) : r >= v.slidesGrid[w] && (T = w, M = v.slidesGrid[v.slidesGrid.length - 1] - v.slidesGrid[v.slidesGrid.length -
                            2]);
                        var I = (r - v.slidesGrid[T]) / M;
                        if (s > v.params.longSwipesMs) {
                            if (!v.params.longSwipes) return void v.slideTo(v.activeIndex);
                            "next" === v.swipeDirection && v.slideTo(I >= v.params.longSwipesRatio ? T + v.params.slidesPerGroup : T), "prev" === v.swipeDirection && v.slideTo(I > 1 - v.params.longSwipesRatio ? T + v.params.slidesPerGroup : T)
                        } else {
                            if (!v.params.shortSwipes) return void v.slideTo(v.activeIndex);
                            "next" === v.swipeDirection && v.slideTo(T + v.params.slidesPerGroup), "prev" === v.swipeDirection && v.slideTo(T)
                        }
                    }
                }, v._slideTo = function(e,
                    a) {
                    return v.slideTo(e, a, !0, !0)
                }, v.slideTo = function(e, a, t, s) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), v.snapIndex = Math.floor(e / v.params.slidesPerGroup), v.snapIndex >= v.snapGrid.length && (v.snapIndex = v.snapGrid.length - 1);
                    var i = -v.snapGrid[v.snapIndex];
                    v.params.autoplay && v.autoplaying && (s || !v.params.autoplayDisableOnInteraction ? v.pauseAutoplay(a) : v.stopAutoplay()), v.updateProgress(i);
                    for (var n = 0; n < v.slidesGrid.length; n++) - Math.floor(100 * i) >= Math.floor(100 * v.slidesGrid[n]) &&
                        (e = n);
                    if (!v.params.allowSwipeToNext && i < v.translate && i < v.minTranslate()) return !1;
                    if (!v.params.allowSwipeToPrev && i > v.translate && i > v.maxTranslate() && (v.activeIndex || 0) !== e) return !1;
                    if ("undefined" == typeof a && (a = v.params.speed), v.previousIndex = v.activeIndex || 0, v.activeIndex = e, i === v.translate) return v.updateClasses(), !1;
                    v.updateClasses(), v.onTransitionStart(t);
                    r() ? i : 0, r() ? 0 : i;
                    return 0 === a ? (v.setWrapperTransition(0), v.setWrapperTranslate(i), v.onTransitionEnd(t)) : (v.setWrapperTransition(a), v.setWrapperTranslate(i),
                        v.animating || (v.animating = !0, v.wrapper.transitionEnd(function() {
                            v && v.onTransitionEnd(t)
                        }))), !0
                }, v.onTransitionStart = function(e) {
                    "undefined" == typeof e && (e = !0), v.lazy && v.lazy.onTransitionStart(), e && (v.emit("onTransitionStart", v), v.activeIndex !== v.previousIndex && v.emit("onSlideChangeStart", v))
                }, v.onTransitionEnd = function(e) {
                    v.animating = !1, v.setWrapperTransition(0), "undefined" == typeof e && (e = !0), v.lazy && v.lazy.onTransitionEnd(), e && (v.emit("onTransitionEnd", v), v.activeIndex !== v.previousIndex && v.emit("onSlideChangeEnd",
                        v)), v.params.hashnav && v.hashnav && v.hashnav.setHash()
                }, v.slideNext = function(e, a, t) {
                    if (v.params.loop) {
                        if (v.animating) return !1;
                        v.fixLoop();
                        v.container[0].clientLeft;
                        return v.slideTo(v.activeIndex + v.params.slidesPerGroup, a, e, t)
                    }
                    return v.slideTo(v.activeIndex + v.params.slidesPerGroup, a, e, t)
                }, v._slideNext = function(e) {
                    return v.slideNext(!0, e, !0)
                }, v.slidePrev = function(e, a, t) {
                    if (v.params.loop) {
                        if (v.animating) return !1;
                        v.fixLoop();
                        v.container[0].clientLeft;
                        return v.slideTo(v.activeIndex - 1, a, e, t)
                    }
                    return v.slideTo(v.activeIndex -
                        1, a, e, t)
                }, v._slidePrev = function(e) {
                    return v.slidePrev(!0, e, !0)
                }, v.slideReset = function(e, a, t) {
                    return v.slideTo(v.activeIndex, a, e)
                }, v.setWrapperTransition = function(e, a) {
                    v.wrapper.transition(e), "slide" !== v.params.effect && v.effects[v.params.effect] && v.effects[v.params.effect].setTransition(e), v.params.parallax && v.parallax && v.parallax.setTransition(e), v.params.scrollbar && v.scrollbar && v.scrollbar.setTransition(e), v.params.control && v.controller && v.controller.setTransition(e, a), v.emit("onSetTransition", v,
                        e)
                }, v.setWrapperTranslate = function(e, a, t) {
                    var s = 0,
                        i = 0,
                        n = 0;
                    r() ? s = v.rtl ? -e : e : i = e, v.params.virtualTranslate || v.wrapper.transform(v.support.transforms3d ? "translate3d(" + s + "px, " + i + "px, " + n + "px)" : "translate(" + s + "px, " + i + "px)"), v.translate = r() ? s : i, a && v.updateActiveIndex(), "slide" !== v.params.effect && v.effects[v.params.effect] && v.effects[v.params.effect].setTranslate(v.translate), v.params.parallax && v.parallax && v.parallax.setTranslate(v.translate), v.params.scrollbar && v.scrollbar && v.scrollbar.setTranslate(v.translate),
                        v.params.control && v.controller && v.controller.setTranslate(v.translate, t), v.emit("onSetTranslate", v, v.translate)
                }, v.getTranslate = function(e, a) {
                    var t, s, r, i;
                    return "undefined" == typeof a && (a = "x"), v.params.virtualTranslate ? v.rtl ? -v.translate : v.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? i = new window.WebKitCSSMatrix("none" === r.webkitTransform ? "" : r.webkitTransform) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(",
                        "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? i.m41 : parseFloat(16 === t.length ? t[12] : t[4])), "y" === a && (s = window.WebKitCSSMatrix ? i.m42 : parseFloat(16 === t.length ? t[13] : t[5])), v.rtl && s && (s = -s), s || 0)
                }, v.getWrapperTranslate = function(e) {
                    return "undefined" == typeof e && (e = r() ? "x" : "y"), v.getTranslate(v.wrapper[0], e)
                }, v.observers = [], v.initObservers = function() {
                    if (v.params.observeParents)
                        for (var e = v.container.parents(), a = 0; a < e.length; a++) l(e[a]);
                    l(v.container[0], {
                            childList: !1
                        }),
                        l(v.wrapper[0], {
                            attributes: !1
                        })
                }, v.disconnectObservers = function() {
                    for (var e = 0; e < v.observers.length; e++) v.observers[e].disconnect();
                    v.observers = []
                }, v.createLoop = function() {
                    v.wrapper.children("." + v.params.slideClass + "." + v.params.slideDuplicateClass).remove();
                    var e = v.wrapper.children("." + v.params.slideClass);
                    "auto" !== v.params.slidesPerView || v.params.loopedSlides || (v.params.loopedSlides = e.length), v.loopedSlides = parseInt(v.params.loopedSlides || v.params.slidesPerView, 10), v.loopedSlides = v.loopedSlides + v.params.loopAdditionalSlides,
                        v.loopedSlides > e.length && (v.loopedSlides = e.length);
                    var t, s = [],
                        r = [];
                    for (e.each(function(t, i) {
                            var n = a(this);
                            t < v.loopedSlides && r.push(i), t < e.length && t >= e.length - v.loopedSlides && s.push(i), n.attr("data-swiper-slide-index", t)
                        }), t = 0; t < r.length; t++) v.wrapper.append(a(r[t].cloneNode(!0)).addClass(v.params.slideDuplicateClass));
                    for (t = s.length - 1; t >= 0; t--) v.wrapper.prepend(a(s[t].cloneNode(!0)).addClass(v.params.slideDuplicateClass))
                }, v.destroyLoop = function() {
                    v.wrapper.children("." + v.params.slideClass + "." + v.params.slideDuplicateClass).remove(),
                        v.slides.removeAttr("data-swiper-slide-index")
                }, v.fixLoop = function() {
                    var e;
                    v.activeIndex < v.loopedSlides ? (e = v.slides.length - 3 * v.loopedSlides + v.activeIndex, e += v.loopedSlides, v.slideTo(e, 0, !1, !0)) : ("auto" === v.params.slidesPerView && v.activeIndex >= 2 * v.loopedSlides || v.activeIndex > v.slides.length - 2 * v.params.slidesPerView) && (e = -v.slides.length + v.activeIndex + v.loopedSlides, e += v.loopedSlides, v.slideTo(e, 0, !1, !0))
                }, v.appendSlide = function(e) {
                    if (v.params.loop && v.destroyLoop(), "object" == typeof e && e.length)
                        for (var a =
                                0; a < e.length; a++) e[a] && v.wrapper.append(e[a]);
                    else v.wrapper.append(e);
                    v.params.loop && v.createLoop(), v.params.observer && v.support.observer || v.update(!0)
                }, v.prependSlide = function(e) {
                    v.params.loop && v.destroyLoop();
                    var a = v.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++) e[t] && v.wrapper.prepend(e[t]);
                        a = v.activeIndex + e.length
                    } else v.wrapper.prepend(e);
                    v.params.loop && v.createLoop(), v.params.observer && v.support.observer || v.update(!0), v.slideTo(a, 0, !1)
                }, v.removeSlide = function(e) {
                    v.params.loop &&
                        (v.destroyLoop(), v.slides = v.wrapper.children("." + v.params.slideClass));
                    var a, t = v.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var s = 0; s < e.length; s++) a = e[s], v.slides[a] && v.slides.eq(a).remove(), t > a && t--;
                        t = Math.max(t, 0)
                    } else a = e, v.slides[a] && v.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
                    v.params.loop && v.createLoop(), v.params.observer && v.support.observer || v.update(!0), v.params.loop ? v.slideTo(t + v.loopedSlides, 0, !1) : v.slideTo(t, 0, !1)
                }, v.removeAllSlides = function() {
                    for (var e = [], a = 0; a < v.slides.length; a++) e.push(a);
                    v.removeSlide(e)
                }, v.effects = {
                    fade: {
                        setTranslate: function() {
                            for (var e = 0; e < v.slides.length; e++) {
                                var a = v.slides.eq(e),
                                    t = a[0].swiperSlideOffset,
                                    s = -t;
                                v.params.virtualTranslate || (s -= v.translate);
                                var i = 0;
                                r() || (i = s, s = 0);
                                var n = v.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({
                                    opacity: n
                                }).transform("translate3d(" + s + "px, " + i + "px, 0px)")
                            }
                        },
                        setTransition: function(e) {
                            if (v.slides.transition(e), v.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                v.slides.transitionEnd(function() {
                                    if (!a &&
                                        v) {
                                        a = !0, v.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) v.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    },
                    cube: {
                        setTranslate: function() {
                            var e, t = 0;
                            v.params.cube.shadow && (r() ? (e = v.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), v.wrapper.append(e)), e.css({
                                height: v.width + "px"
                            })) : (e = v.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), v.container.append(e))));
                            for (var s = 0; s < v.slides.length; s++) {
                                var i = v.slides.eq(s),
                                    n = 90 * s,
                                    o = Math.floor(n / 360);
                                v.rtl && (n = -n, o = Math.floor(-n / 360));
                                var l = Math.max(Math.min(i[0].progress, 1), -1),
                                    p = 0,
                                    d = 0,
                                    u = 0;
                                s % 4 === 0 ? (p = 4 * -o * v.size, u = 0) : (s - 1) % 4 === 0 ? (p = 0, u = 4 * -o * v.size) : (s - 2) % 4 === 0 ? (p = v.size + 4 * o * v.size, u = v.size) : (s - 3) % 4 === 0 && (p = -v.size, u = 3 * v.size + 4 * v.size * o), v.rtl && (p = -p), r() || (d = p, p = 0);
                                var c = "rotateX(" + (r() ? 0 : -n) + "deg) rotateY(" + (r() ? n : 0) + "deg) translate3d(" + p + "px, " + d + "px, " + u + "px)";
                                if (1 >= l && l > -1 && (t = 90 * s + 90 * l, v.rtl && (t = 90 * -s - 90 *
                                        l)), i.transform(c), v.params.cube.slideShadows) {
                                    var m = i.find(r() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        f = i.find(r() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (r() ? "left" : "top") + '"></div>'), i.append(m)), 0 === f.length && (f = a('<div class="swiper-slide-shadow-' + (r() ? "right" : "bottom") + '"></div>'), i.append(f));
                                    i[0].progress;
                                    m.length && (m[0].style.opacity = -i[0].progress), f.length && (f[0].style.opacity = i[0].progress)
                                }
                            }
                            if (v.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" +
                                        v.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + v.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + v.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + v.size / 2 + "px"
                                }), v.params.cube.shadow)
                                if (r()) e.transform("translate3d(0px, " + (v.width / 2 + v.params.cube.shadowOffset) + "px, " + -v.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + v.params.cube.shadowScale + ")");
                                else {
                                    var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                        g = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                        w = v.params.cube.shadowScale,
                                        y = v.params.cube.shadowScale /
                                        g,
                                        x = v.params.cube.shadowOffset;
                                    e.transform("scale3d(" + w + ", 1, " + y + ") translate3d(0px, " + (v.height / 2 + x) + "px, " + -v.height / 2 / y + "px) rotateX(-90deg)")
                                }
                            var b = v.isSafari || v.isUiWebView ? -v.size / 2 : 0;
                            v.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (r() ? 0 : t) + "deg) rotateY(" + (r() ? -t : 0) + "deg)")
                        },
                        setTransition: function(e) {
                            v.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), v.params.cube.shadow && !r() &&
                                v.container.find(".swiper-cube-shadow").transition(e)
                        }
                    },
                    coverflow: {
                        setTranslate: function() {
                            for (var e = v.translate, t = r() ? -e + v.width / 2 : -e + v.height / 2, s = r() ? v.params.coverflow.rotate : -v.params.coverflow.rotate, i = v.params.coverflow.depth, n = 0, o = v.slides.length; o > n; n++) {
                                var l = v.slides.eq(n),
                                    p = v.slidesSizesGrid[n],
                                    d = l[0].swiperSlideOffset,
                                    u = (t - d - p / 2) / p * v.params.coverflow.modifier,
                                    c = r() ? s * u : 0,
                                    m = r() ? 0 : s * u,
                                    f = -i * Math.abs(u),
                                    h = r() ? 0 : v.params.coverflow.stretch * u,
                                    g = r() ? v.params.coverflow.stretch * u : 0;
                                Math.abs(g) <
                                    .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(f) < .001 && (f = 0), Math.abs(c) < .001 && (c = 0), Math.abs(m) < .001 && (m = 0);
                                var w = "translate3d(" + g + "px," + h + "px," + f + "px)  rotateX(" + m + "deg) rotateY(" + c + "deg)";
                                if (l.transform(w), l[0].style.zIndex = -Math.abs(Math.round(u)) + 1, v.params.coverflow.slideShadows) {
                                    var y = l.find(r() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        x = l.find(r() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === y.length && (y = a('<div class="swiper-slide-shadow-' + (r() ? "left" : "top") +
                                        '"></div>'), l.append(y)), 0 === x.length && (x = a('<div class="swiper-slide-shadow-' + (r() ? "right" : "bottom") + '"></div>'), l.append(x)), y.length && (y[0].style.opacity = u > 0 ? u : 0), x.length && (x[0].style.opacity = -u > 0 ? -u : 0)
                                }
                            }
                            if (v.browser.ie) {
                                var b = v.wrapper[0].style;
                                b.perspectiveOrigin = t + "px 50%"
                            }
                        },
                        setTransition: function(e) {
                            v.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, v.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function(e,
                        t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== v.slides.length)) {
                            var s = v.slides.eq(e),
                                r = s.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !s.hasClass("swiper-lazy") || s.hasClass("swiper-lazy-loaded") || s.hasClass("swiper-lazy-loading") || r.add(s[0]), 0 !== r.length && r.each(function() {
                                var e = a(this);
                                e.addClass("swiper-lazy-loading");
                                var r = e.attr("data-background"),
                                    i = e.attr("data-src");
                                v.loadImage(e[0], i || r, !1, function() {
                                    if (r ? (e.css("background-image", "url(" + r + ")"),
                                            e.removeAttr("data-background")) : (e.attr("src", i), e.removeAttr("data-src")), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), s.find(".swiper-lazy-preloader, .preloader").remove(), v.params.loop && t) {
                                        var a = s.attr("data-swiper-slide-index");
                                        if (s.hasClass(v.params.slideDuplicateClass)) {
                                            var n = v.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + v.params.slideDuplicateClass + ")");
                                            v.lazy.loadImageInSlide(n.index(), !1)
                                        } else {
                                            var o = v.wrapper.children("." + v.params.slideDuplicateClass +
                                                '[data-swiper-slide-index="' + a + '"]');
                                            v.lazy.loadImageInSlide(o.index(), !1)
                                        }
                                    }
                                    v.emit("onLazyImageReady", v, s[0], e[0])
                                }), v.emit("onLazyImageLoad", v, s[0], e[0])
                            })
                        }
                    },
                    load: function() {
                        var e;
                        if (v.params.watchSlidesVisibility) v.wrapper.children("." + v.params.slideVisibleClass).each(function() {
                            v.lazy.loadImageInSlide(a(this).index())
                        });
                        else if (v.params.slidesPerView > 1)
                            for (e = v.activeIndex; e < v.activeIndex + v.params.slidesPerView; e++) v.slides[e] && v.lazy.loadImageInSlide(e);
                        else v.lazy.loadImageInSlide(v.activeIndex);
                        if (v.params.lazyLoadingInPrevNext)
                            if (v.params.slidesPerView > 1) {
                                for (e = v.activeIndex + v.params.slidesPerView; e < v.activeIndex + v.params.slidesPerView + v.params.slidesPerView; e++) v.slides[e] && v.lazy.loadImageInSlide(e);
                                for (e = v.activeIndex - v.params.slidesPerView; e < v.activeIndex; e++) v.slides[e] && v.lazy.loadImageInSlide(e)
                            } else {
                                var t = v.wrapper.children("." + v.params.slideNextClass);
                                t.length > 0 && v.lazy.loadImageInSlide(t.index());
                                var s = v.wrapper.children("." + v.params.slidePrevClass);
                                s.length > 0 && v.lazy.loadImageInSlide(s.index())
                            }
                    },
                    onTransitionStart: function() {
                        v.params.lazyLoading && (v.params.lazyLoadingOnTransitionStart || !v.params.lazyLoadingOnTransitionStart && !v.lazy.initialImageLoaded) && v.lazy.load()
                    },
                    onTransitionEnd: function() {
                        v.params.lazyLoading && !v.params.lazyLoadingOnTransitionStart && v.lazy.load()
                    }
                }, v.scrollbar = {
                    set: function() {
                        if (v.params.scrollbar) {
                            var e = v.scrollbar;
                            e.track = a(v.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)),
                                e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = r() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = v.size / v.virtualSize, e.moveDivider = e.divider * (e.trackSize / v.size), e.dragSize = e.trackSize * e.divider, r() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.track[0].style.display = e.divider >= 1 ? "none" : "", v.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    },
                    setTranslate: function() {
                        if (v.params.scrollbar) {
                            var e, a = v.scrollbar,
                                t = (v.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * v.progress, v.rtl && r() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), r() ? (a.drag.transform(v.support.transforms3d ? "translate3d(" + e + "px, 0, 0)" : "translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (a.drag.transform(v.support.transforms3d ? "translate3d(0px, " + e + "px, 0)" : "translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), v.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity =
                                1, a.timeout = setTimeout(function() {
                                    a.track[0].style.opacity = 0, a.track.transition(400)
                                }, 1E3))
                        }
                    },
                    setTransition: function(e) {
                        v.params.scrollbar && v.scrollbar.drag.transition(e)
                    }
                }, v.controller = {
                    LinearSpline: function(e, a) {
                        this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var t, s;
                        this.x.length;
                        this.interpolate = function(e) {
                            return e ? (s = r(this.x, e), t = s - 1, (e - this.x[t]) * (this.y[s] - this.y[t]) / (this.x[s] - this.x[t]) + this.y[t]) : 0
                        };
                        var r = function() {
                            var e, a, t;
                            return function(s, r) {
                                for (a = -1, e = s.length; e - a > 1;) s[t = e + a >> 1] <= r ?
                                    a = t : e = t;
                                return e
                            }
                        }()
                    },
                    getInterpolateFunction: function(e) {
                        v.controller.spline || (v.controller.spline = v.params.loop ? new v.controller.LinearSpline(v.slidesGrid, e.slidesGrid) : new v.controller.LinearSpline(v.snapGrid, e.snapGrid))
                    },
                    setTranslate: function(e, a) {
                        function s(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -v.translate : v.translate, "slide" === v.params.controlBy && (v.controller.getInterpolateFunction(a), i = -v.controller.spline.interpolate(-e)), i && "container" !== v.params.controlBy || (r = (a.maxTranslate() -
                                a.minTranslate()) / (v.maxTranslate() - v.minTranslate()), i = (e - v.minTranslate()) * r + a.minTranslate()), v.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, v), a.updateActiveIndex()
                        }
                        var r, i, n = v.params.control;
                        if (v.isArray(n))
                            for (var o = 0; o < n.length; o++) n[o] !== a && n[o] instanceof t && s(n[o]);
                        else n instanceof t && a !== n && s(n)
                    },
                    setTransition: function(e, a) {
                        function s(a) {
                            a.setWrapperTransition(e, v), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
                                i && (a.params.loop &&
                                    "slide" === v.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                            }))
                        }
                        var r, i = v.params.control;
                        if (v.isArray(i))
                            for (r = 0; r < i.length; r++) i[r] !== a && i[r] instanceof t && s(i[r]);
                        else i instanceof t && a !== i && s(i)
                    }
                }, v.hashnav = {
                    init: function() {
                        if (v.params.hashnav) {
                            v.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)
                                for (var a = 0, t = 0, s = v.slides.length; s > t; t++) {
                                    var r = v.slides.eq(t),
                                        i = r.attr("data-hash");
                                    if (i === e && !r.hasClass(v.params.slideDuplicateClass)) {
                                        var n = r.index();
                                        v.slideTo(n, a, v.params.runCallbacksOnInit, !0)
                                    }
                                }
                        }
                    },
                    setHash: function() {
                        v.hashnav.initialized && v.params.hashnav && (document.location.hash = v.slides.eq(v.activeIndex).attr("data-hash") || "")
                    }
                }, v.disableKeyboardControl = function() {
                    a(document).off("keydown", p)
                }, v.enableKeyboardControl = function() {
                    a(document).on("keydown", p)
                }, v.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, v.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"), v.mousewheel.event = "wheel"
                } catch (L) {}
                v.mousewheel.event || void 0 === document.onmousewheel || (v.mousewheel.event =
                    "mousewheel"), v.mousewheel.event || (v.mousewheel.event = "DOMMouseScroll")
            }
            v.disableMousewheelControl = function() {
                return v.mousewheel.event ? (v.container.off(v.mousewheel.event, d), !0) : !1
            }, v.enableMousewheelControl = function() {
                return v.mousewheel.event ? (v.container.on(v.mousewheel.event, d), !0) : !1
            }, v.parallax = {
                setTranslate: function() {
                    v.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        u(this, v.progress)
                    }), v.slides.each(function() {
                        var e = a(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var a = Math.min(Math.max(e[0].progress, -1), 1);
                            u(this, a)
                        })
                    })
                },
                setTransition: function(e) {
                    "undefined" == typeof e && (e = v.params.speed), v.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var t = a(this),
                            s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (s = 0), t.transition(s)
                    })
                }
            }, v._plugins = [];
            for (var B in v.plugins) {
                var O = v.plugins[B](v,
                    v.params[B]);
                O && v._plugins.push(O)
            }
            return v.callPlugins = function(e) {
                for (var a = 0; a < v._plugins.length; a++) e in v._plugins[a] && v._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, v.emitterEventListeners = {}, v.emit = function(e) {
                v.params[e] && v.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (v.emitterEventListeners[e])
                    for (a = 0; a < v.emitterEventListeners[e].length; a++) v.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5]);
                v.callPlugins && v.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, v.on = function(e, a) {
                return e = c(e), v.emitterEventListeners[e] || (v.emitterEventListeners[e] = []), v.emitterEventListeners[e].push(a), v
            }, v.off = function(e, a) {
                var t;
                if (e = c(e), "undefined" == typeof a) return v.emitterEventListeners[e] = [], v;
                if (v.emitterEventListeners[e] && 0 !== v.emitterEventListeners[e].length) {
                    for (t = 0; t < v.emitterEventListeners[e].length; t++) v.emitterEventListeners[e][t] === a && v.emitterEventListeners[e].splice(t,
                        1);
                    return v
                }
            }, v.once = function(e, a) {
                e = c(e);
                var t = function() {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), v.off(e, t)
                };
                return v.on(e, t), v
            }, v.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function(e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function(e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function(e) {
                    13 === e.keyCode && (a(e.target).is(v.params.nextButton) ?
                        (v.onClickNext(e), v.a11y.notify(v.isEnd ? v.params.lastSlideMessage : v.params.nextSlideMessage)) : a(e.target).is(v.params.prevButton) && (v.onClickPrev(e), v.a11y.notify(v.isBeginning ? v.params.firstSlideMessage : v.params.prevSlideMessage)), a(e.target).is("." + v.params.bulletClass) && a(e.target)[0].click())
                },
                liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var a = v.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function() {
                    if (v.params.nextButton) {
                        var e =
                            a(v.params.nextButton);
                        v.a11y.makeFocusable(e), v.a11y.addRole(e, "button"), v.a11y.addLabel(e, v.params.nextSlideMessage)
                    }
                    if (v.params.prevButton) {
                        var t = a(v.params.prevButton);
                        v.a11y.makeFocusable(t), v.a11y.addRole(t, "button"), v.a11y.addLabel(t, v.params.prevSlideMessage)
                    }
                    a(v.container).append(v.a11y.liveRegion)
                },
                initPagination: function() {
                    v.params.pagination && v.params.paginationClickable && v.bullets && v.bullets.length && v.bullets.each(function() {
                        var e = a(this);
                        v.a11y.makeFocusable(e), v.a11y.addRole(e, "button"),
                            v.a11y.addLabel(e, v.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function() {
                    v.a11y.liveRegion && v.a11y.liveRegion.length > 0 && v.a11y.liveRegion.remove()
                }
            }, v.init = function() {
                v.params.loop && v.createLoop(), v.updateContainerSize(), v.updateSlidesSize(), v.updatePagination(), v.params.scrollbar && v.scrollbar && v.scrollbar.set(), "slide" !== v.params.effect && v.effects[v.params.effect] && (v.params.loop || v.updateProgress(), v.effects[v.params.effect].setTranslate()), v.params.loop ? v.slideTo(v.params.initialSlide +
                        v.loopedSlides, 0, v.params.runCallbacksOnInit) : (v.slideTo(v.params.initialSlide, 0, v.params.runCallbacksOnInit), 0 === v.params.initialSlide && (v.parallax && v.params.parallax && v.parallax.setTranslate(), v.lazy && v.params.lazyLoading && (v.lazy.load(), v.lazy.initialImageLoaded = !0))), v.attachEvents(), v.params.observer && v.support.observer && v.initObservers(), v.params.preloadImages && !v.params.lazyLoading && v.preloadImages(), v.params.autoplay && v.startAutoplay(), v.params.keyboardControl && v.enableKeyboardControl && v.enableKeyboardControl(),
                    v.params.mousewheelControl && v.enableMousewheelControl && v.enableMousewheelControl(), v.params.hashnav && v.hashnav && v.hashnav.init(), v.params.a11y && v.a11y && v.a11y.init(), v.emit("onInit", v)
            }, v.cleanupStyles = function() {
                v.container.removeClass(v.classNames.join(" ")).removeAttr("style"), v.wrapper.removeAttr("style"), v.slides && v.slides.length && v.slides.removeClass([v.params.slideVisibleClass, v.params.slideActiveClass, v.params.slideNextClass, v.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),
                    v.paginationContainer && v.paginationContainer.length && v.paginationContainer.removeClass(v.params.paginationHiddenClass), v.bullets && v.bullets.length && v.bullets.removeClass(v.params.bulletActiveClass), v.params.prevButton && a(v.params.prevButton).removeClass(v.params.buttonDisabledClass), v.params.nextButton && a(v.params.nextButton).removeClass(v.params.buttonDisabledClass), v.params.scrollbar && v.scrollbar && (v.scrollbar.track && v.scrollbar.track.length && v.scrollbar.track.removeAttr("style"), v.scrollbar.drag &&
                        v.scrollbar.drag.length && v.scrollbar.drag.removeAttr("style"))
            }, v.destroy = function(e, a) {
                v.detachEvents(), v.stopAutoplay(), v.params.loop && v.destroyLoop(), a && v.cleanupStyles(), v.disconnectObservers(), v.params.keyboardControl && v.disableKeyboardControl && v.disableKeyboardControl(), v.params.mousewheelControl && v.disableMousewheelControl && v.disableMousewheelControl(), v.params.a11y && v.a11y && v.a11y.destroy(), v.emit("onDestroy"), e !== !1 && (v = null)
            }, v.init(), v
        }
    };
    t.prototype = {
        isSafari: function() {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function() {
            var e = navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                r = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: t || r || s,
                android: a
            }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in
                    e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
                    if (a[t] in e) return !0
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var s = ["jQuery", "Zepto", "Dom7"], r = 0; r <
        s.length; r++) window[s[r]] && e(window[s[r]]);
    var i;
    i = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, i && ("transitionEnd" in i.fn || (i.fn.transitionEnd = function(e) {
        function a(i) {
            if (i.target === this)
                for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a)
        }
        var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            r = this;
        if (e)
            for (t = 0; t < s.length; t++) r.on(s[t], a);
        return this
    }), "transform" in i.fn || (i.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
            var t =
                this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in i.fn || (i.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define &&
    define.amd && define([], function() {
        return window.Swiper
    });
(function() {
    var a, b, c, d, e, f = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        g = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    b = function() {
        function a() {}
        return a.prototype.extend = function(a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function(a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.addEvent = function(a, b, c) {
            return null != a.addEventListener ?
                a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function(a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
        function a() {
            this.keys = [], this.values = []
        }
        return a.prototype.get = function(a) {
            var b, c, d,
                e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function(a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" !=
                typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return a.notSupported = !0, a.prototype.observe = function() {}, a
    }()), d = this.getComputedStyle || function(a) {
        return this.getPropertyValue = function(b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function() {
        function e(a) {
            null == a && (a = {}), this.scrollCallback =
                f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), this.animationNameCache = new c
        }
        return e.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null
            }, e.prototype.init = function() {
                var a;
                return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded",
                    this.start), this.finished = []
            }, e.prototype.start = function() {
                var b, c, d, e;
                if (this.stopped = !1, this.boxes = function() {
                        var a, c, d, e;
                        for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                        return e
                    }.call(this), this.all = function() {
                        var a, c, d, e;
                        for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                        return e
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
                return this.disabled() ||
                    (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? (new a(function(a) {
                        return function(b) {
                            var c, d, e, f, g;
                            for (g = [], e = 0, f = b.length; f > e; e++) d = b[e], g.push(function() {
                                var a, b, e, f;
                                for (e = d.addedNodes || [], f = [], a = 0, b = e.length; b > a; a++) c = e[a], f.push(this.doSync(c));
                                return f
                            }.call(a));
                            return g
                        }
                    }(this))).observe(document.body, {
                        childList: !0,
                        subtree: !0
                    }) : void 0
            }, e.prototype.stop = function() {
                return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
            }, e.prototype.sync = function() {
                return a.notSupported ? this.doSync(this.element) : void 0
            }, e.prototype.doSync = function(a) {
                var b, c, d, e, f;
                if (null == a && (a = this.element), 1 === a.nodeType) {
                    for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b),
                        this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                    return f
                }
            }, e.prototype.show = function(a) {
                return this.applyStyle(a), a.className = "" + a.className + " " + this.config.animateClass, null != this.config.callback ? this.config.callback(a) : void 0
            }, e.prototype.applyStyle = function(a, b) {
                var c, d, e;
                return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                    return function() {
                        return f.customStyle(a,
                            b, d, c, e)
                    }
                }(this))
            }, e.prototype.animate = function() {
                return "requestAnimationFrame" in window ? function(a) {
                    return window.requestAnimationFrame(a)
                } : function(a) {
                    return a()
                }
            }(), e.prototype.resetStyle = function() {
                var a, b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
                return e
            }, e.prototype.customStyle = function(a, b, c, d, e) {
                return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                    animationDuration: c
                }), d && this.vendorSet(a.style, {
                    animationDelay: d
                }), e && this.vendorSet(a.style, {
                    animationIterationCount: e
                }), this.vendorSet(a.style, {
                    animationName: b ? "none" : this.cachedAnimationName(a)
                }), a
            }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
                var c, d, e, f;
                f = [];
                for (c in b) d = b[c], a["" + c] = d, f.push(function() {
                    var b, f, g, h;
                    for (g = this.vendors, h = [], b = 0, f = g.length; f > b; b++) e = g[b], h.push(a["" + e + c.charAt(0).toUpperCase() + c.substr(1)] = d);
                    return h
                }.call(this));
                return f
            }, e.prototype.vendorCSS = function(a, b) {
                var c, e, f, g, h, i;
                for (e =
                    d(a), c = e.getPropertyCSSValue(b), i = this.vendors, g = 0, h = i.length; h > g; g++) f = i[g], c = c || e.getPropertyCSSValue("-" + f + "-" + b);
                return c
            }, e.prototype.animationName = function(a) {
                var b;
                try {
                    b = this.vendorCSS(a, "animation-name").cssText
                } catch (c$3) {
                    b = d(a).getPropertyValue("animation-name")
                }
                return "none" === b ? "" : b
            }, e.prototype.cacheAnimationName = function(a) {
                return this.animationNameCache.set(a, this.animationName(a))
            }, e.prototype.cachedAnimationName = function(a) {
                return this.animationNameCache.get(a)
            }, e.prototype.scrollHandler =
            function() {
                return this.scrolled = !0
            }, e.prototype.scrollCallback = function() {
                var a;
                return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                    var b, c, d, e;
                    for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                    return e
                }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
            }, e.prototype.offsetTop = function(a) {
                for (var b; void 0 === a.offsetTop;) a = a.parentNode;
                for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
                return b
            }, e.prototype.isVisible = function(a) {
                var b,
                    c, d, e, f;
                return c = a.getAttribute("data-wow-offset") || this.config.offset, f = window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
            }, e.prototype.util = function() {
                return null != this._util ? this._util : this._util = new b
            }, e.prototype.disabled = function() {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, e
    }()
}).call(this);
! function(t, i, e, s) {
    function o(i, e) {
        var h = this;
        "object" == typeof e && (delete e.refresh, delete e.render, t.extend(this, e)), this.$element = t(i), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
        var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
        return r.length < 1 && r.push("center"), 1 == r.length && r.push(r[0]), ("top" == r[0] || "bottom" == r[0] || "left" == r[1] || "right" == r[1]) && (r = [r[1], r[0]]), this.positionX != s && (r[0] = this.positionX.toLowerCase()), this.positionY != s && (r[1] = this.positionY.toLowerCase()),
            h.positionX = r[0], h.positionY = r[1], "left" != this.positionX && "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? (this.iosFix && !this.$element.is("img") && this.$element.css({
                backgroundImage: "url(" +
                    this.imageSrc + ")",
                backgroundSize: "cover",
                backgroundPosition: this.position
            }), this) : navigator.userAgent.match(/(Android)/) ? (this.androidFix && !this.$element.is("img") && this.$element.css({
                backgroundImage: "url(" + this.imageSrc + ")",
                backgroundSize: "cover",
                backgroundPosition: this.position
            }), this) : (this.$mirror = t("<div />").prependTo("body"), this.$slider = t("<img />").prependTo(this.$mirror), this.$mirror.addClass("parallax-mirror").css({
                    visibility: "hidden",
                    zIndex: this.zIndex,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    overflow: "hidden"
                }),
                this.$slider.addClass("parallax-slider").one("load", function() {
                    h.naturalHeight && h.naturalWidth || (h.naturalHeight = this.naturalHeight || this.height || 1, h.naturalWidth = this.naturalWidth || this.width || 1), h.aspectRatio = h.naturalWidth / h.naturalHeight, o.isSetup || o.setup(), o.sliders.push(h), o.isFresh = !1, o.requestRender()
                }), this.$slider[0].src = this.imageSrc, void((this.naturalHeight && this.naturalWidth || this.$slider[0].complete) && this.$slider.trigger("load")))
    }

    function h(s) {
        return this.each(function() {
            var h = t(this),
                r = "object" == typeof s && s;
            this == i || this == e || h.is("body") ? o.configure(r) : h.data("px.parallax") || (r = t.extend({}, h.data(), r), h.data("px.parallax", new o(this, r))), "string" == typeof s && o[s]()
        })
    }! function() {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0; s < e.length && !i.requestAnimationFrame; ++s) i.requestAnimationFrame = i[e[s] + "RequestAnimationFrame"], i.cancelAnimationFrame = i[e[s] + "CancelAnimationFrame"] || i[e[s] + "CancelRequestAnimationFrame"];
        i.requestAnimationFrame || (i.requestAnimationFrame = function(e) {
            var s = (new Date).getTime(),
                o = Math.max(0, 16 - (s - t)),
                h = i.setTimeout(function() {
                    e(s + o)
                }, o);
            return t = s + o, h
        }), i.cancelAnimationFrame || (i.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }(), t.extend(o.prototype, {
        speed: .2,
        bleed: 0,
        zIndex: -100,
        iosFix: !0,
        androidFix: !0,
        position: "center",
        overScrollFix: !1,
        refresh: function() {
            this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom =
                this.boxOffsetTop + this.boxHeight;
            var t = o.winHeight,
                i = o.docHeight,
                e = Math.min(this.boxOffsetTop, i - t),
                s = Math.max(this.boxOffsetTop + this.boxHeight - t, 0),
                h = this.boxHeight + (e - s) * (1 - this.speed) | 0,
                r = (this.boxOffsetTop - e) * (1 - this.speed) | 0;
            if (h * this.aspectRatio >= this.boxWidth) {
                this.imageWidth = h * this.aspectRatio | 0, this.imageHeight = h, this.offsetBaseTop = r;
                var n = this.imageWidth - this.boxWidth;
                this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -n : isNaN(this.positionX) ? -n / 2 | 0 : Math.max(this.positionX, -n)
            } else {
                this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0;
                var n = this.imageHeight - h;
                this.offsetBaseTop = "top" == this.positionY ? r : "bottom" == this.positionY ? r - n : isNaN(this.positionY) ? r - n / 2 | 0 : r + Math.max(this.positionY, -n)
            }
        },
        render: function() {
            var t = o.scrollTop,
                i = o.scrollLeft,
                e = this.overScrollFix ? o.overScroll : 0,
                s = t + o.winHeight;
            this.visibility = this.boxOffsetBottom > t && this.boxOffsetTop < s ? "visible" : "hidden", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft -
                i, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed), this.$mirror.css({
                    transform: "translate3d(0px, 0px, 0px)",
                    visibility: this.visibility,
                    top: this.mirrorTop - e,
                    left: this.mirrorLeft,
                    height: this.boxHeight,
                    width: this.boxWidth
                }), this.$slider.css({
                    transform: "translate3d(0px, 0px, 0px)",
                    position: "absolute",
                    top: this.offsetTop,
                    left: this.offsetLeft,
                    height: this.imageHeight,
                    width: this.imageWidth,
                    maxWidth: "none"
                })
        }
    }), t.extend(o, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1 << 30,
        docWidth: 1 <<
            30,
        sliders: [],
        isReady: !1,
        isFresh: !1,
        isBusy: !1,
        setup: function() {
            if (!this.isReady) {
                var s = t(e),
                    h = t(i);
                h.on("scroll.px.parallax load.px.parallax", function() {
                    var t = o.docHeight - o.winHeight,
                        i = o.docWidth - o.winWidth;
                    o.scrollTop = Math.max(0, Math.min(t, h.scrollTop())), o.scrollLeft = Math.max(0, Math.min(i, h.scrollLeft())), o.overScroll = Math.max(h.scrollTop() - t, Math.min(h.scrollTop(), 0)), o.requestRender()
                }).on("resize.px.parallax load.px.parallax", function() {
                    o.winHeight = h.height(), o.winWidth = h.width(), o.docHeight =
                        s.height(), o.docWidth = s.width(), o.isFresh = !1, o.requestRender()
                }), this.isReady = !0
            }
        },
        configure: function(i) {
            "object" == typeof i && (delete i.refresh, delete i.render, t.extend(this.prototype, i))
        },
        refresh: function() {
            t.each(this.sliders, function() {
                this.refresh()
            }), this.isFresh = !0
        },
        render: function() {
            this.isFresh || this.refresh(), t.each(this.sliders, function() {
                this.render()
            })
        },
        requestRender: function() {
            var t = this;
            this.isBusy || (this.isBusy = !0, i.requestAnimationFrame(function() {
                t.render(), t.isBusy = !1
            }))
        }
    });
    var r =
        t.fn.parallax;
    t.fn.parallax = h, t.fn.parallax.Constructor = o, t.fn.parallax.noConflict = function() {
        return t.fn.parallax = r, this
    }, t(e).on("ready.px.parallax.data-api", function() {
        t('[data-parallax="scroll"]').parallax()
    })
}(jQuery, window, document);