(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var q,
    ba = function (a) {
      var b = 0;
      return function () {
        return b < a.length
          ? {
              done: !1,
              value: a[b++],
            }
          : {
              done: !0,
            };
      };
    },
    ca =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a;
          },
    ia = function (a) {
      a = [
        "object" == typeof globalThis && globalThis,
        a,
        "object" == typeof window && window,
        "object" == typeof self && self,
        "object" == typeof global && global,
      ];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c;
      }
      throw Error("a");
    },
    ja = ia(this),
    t = function (a, b) {
      if (b)
        a: {
          var c = ja;
          a = a.split(".");
          for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e];
          }
          a = a[a.length - 1];
          d = c[a];
          b = b(d);
          b != d &&
            null != b &&
            ca(c, a, {
              configurable: !0,
              writable: !0,
              value: b,
            });
        }
    };
  t("Symbol", function (a) {
    if (a) return a;
    var b = function (e, f) {
      this.g = e;
      ca(this, "description", {
        configurable: !0,
        writable: !0,
        value: f,
      });
    };
    b.prototype.toString = function () {
      return this.g;
    };
    var c = 0,
      d = function (e) {
        if (this instanceof d) throw new TypeError("b");
        return new b("jscomp_symbol_" + (e || "") + "_" + c++, e);
      };
    return d;
  });
  t("Symbol.iterator", function (a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (
      var b =
          "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
            " "
          ),
        c = 0;
      c < b.length;
      c++
    ) {
      var d = ja[b[c]];
      "function" === typeof d &&
        "function" != typeof d.prototype[a] &&
        ca(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return ka(ba(this));
          },
        });
    }
    return a;
  });
  var ka = function (a) {
      a = {
        next: a,
      };
      a[Symbol.iterator] = function () {
        return this;
      };
      return a;
    },
    u = function (a) {
      var b =
        "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
      return b
        ? b.call(a)
        : {
            next: ba(a),
          };
    },
    la =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    na;
  if ("function" == typeof Object.setPrototypeOf) na = Object.setPrototypeOf;
  else {
    var ra;
    a: {
      var sa = {
          a: !0,
        },
        ta = {};
      try {
        ta.__proto__ = sa;
        ra = ta.a;
        break a;
      } catch (a) {}
      ra = !1;
    }
    na = ra
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError("c`" + a);
          return a;
        }
      : null;
  }
  var va = na,
    v = function (a, b) {
      a.prototype = la(b.prototype);
      a.prototype.constructor = a;
      if (va) va(a, b);
      else
        for (var c in b)
          if ("prototype" != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d);
            } else a[c] = b[c];
      a.Sa = b.prototype;
    },
    wa = function () {
      this.s = !1;
      this.i = null;
      this.j = void 0;
      this.g = 1;
      this.O = this.H = 0;
      this.o = null;
    },
    Aa = function (a) {
      if (a.s) throw new TypeError("e");
      a.s = !0;
    };
  wa.prototype.N = function (a) {
    this.j = a;
  };
  var Ba = function (a, b) {
    a.o = {
      vd: b,
      xd: !0,
    };
    a.g = a.H || a.O;
  };
  wa.prototype.return = function (a) {
    this.o = {
      return: a,
    };
    this.g = this.O;
  };
  var Ca = function (a, b, c) {
      a.g = c;
      return {
        value: b,
      };
    },
    Fa = function (a) {
      a.g = 0;
      a.H = 0;
    },
    Ga = function (a) {
      a.H = 0;
      a.o = null;
    },
    Ha = function (a) {
      this.g = new wa();
      this.i = a;
    },
    Ka = function (a, b) {
      Aa(a.g);
      var c = a.g.i;
      if (c)
        return Ia(
          a,
          "return" in c
            ? c["return"]
            : function (d) {
                return {
                  value: d,
                  done: !0,
                };
              },
          b,
          a.g.return
        );
      a.g.return(b);
      return Ja(a);
    },
    Ia = function (a, b, c, d) {
      try {
        var e = b.call(a.g.i, c);
        if (!(e instanceof Object)) throw new TypeError("d`" + e);
        if (!e.done) return (a.g.s = !1), e;
        var f = e.value;
      } catch (g) {
        return (a.g.i = null), Ba(a.g, g), Ja(a);
      }
      a.g.i = null;
      d.call(a.g, f);
      return Ja(a);
    },
    Ja = function (a) {
      for (; a.g.g; )
        try {
          var b = a.i(a.g);
          if (b)
            return (
              (a.g.s = !1),
              {
                value: b.value,
                done: !1,
              }
            );
        } catch (c) {
          (a.g.j = void 0), Ba(a.g, c);
        }
      a.g.s = !1;
      if (a.g.o) {
        b = a.g.o;
        a.g.o = null;
        if (b.xd) throw b.vd;
        return {
          value: b.return,
          done: !0,
        };
      }
      return {
        value: void 0,
        done: !0,
      };
    },
    Ma = function (a) {
      this.next = function (b) {
        Aa(a.g);
        a.g.i ? (b = Ia(a, a.g.i.next, b, a.g.N)) : (a.g.N(b), (b = Ja(a)));
        return b;
      };
      this.throw = function (b) {
        Aa(a.g);
        a.g.i
          ? (b = Ia(a, a.g.i["throw"], b, a.g.N))
          : (Ba(a.g, b), (b = Ja(a)));
        return b;
      };
      this.return = function (b) {
        return Ka(a, b);
      };
      this[Symbol.iterator] = function () {
        return this;
      };
    },
    Na = function (a) {
      function b(d) {
        return a.next(d);
      }
      function c(d) {
        return a.throw(d);
      }
      return new Promise(function (d, e) {
        function f(g) {
          g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e);
        }
        f(a.next());
      });
    },
    Oa = function (a) {
      return Na(new Ma(new Ha(a)));
    };
  t("Promise", function (a) {
    function b() {
      this.g = null;
    }
    function c(g) {
      return g instanceof e
        ? g
        : new e(function (h) {
            h(g);
          });
    }
    if (a) return a;
    b.prototype.i = function (g) {
      if (null == this.g) {
        this.g = [];
        var h = this;
        this.j(function () {
          h.s();
        });
      }
      this.g.push(g);
    };
    var d = ja.setTimeout;
    b.prototype.j = function (g) {
      d(g, 0);
    };
    b.prototype.s = function () {
      for (; this.g && this.g.length; ) {
        var g = this.g;
        this.g = [];
        for (var h = 0; h < g.length; ++h) {
          var k = g[h];
          g[h] = null;
          try {
            k();
          } catch (l) {
            this.o(l);
          }
        }
      }
      this.g = null;
    };
    b.prototype.o = function (g) {
      this.j(function () {
        throw g;
      });
    };
    var e = function (g) {
      this.g = 0;
      this.j = void 0;
      this.i = [];
      this.N = !1;
      var h = this.o();
      try {
        g(h.resolve, h.reject);
      } catch (k) {
        h.reject(k);
      }
    };
    e.prototype.o = function () {
      function g(l) {
        return function (m) {
          k || ((k = !0), l.call(h, m));
        };
      }
      var h = this,
        k = !1;
      return {
        resolve: g(this.U),
        reject: g(this.s),
      };
    };
    e.prototype.U = function (g) {
      if (g === this) this.s(new TypeError("f"));
      else if (g instanceof e) this.ha(g);
      else {
        a: switch (typeof g) {
          case "object":
            var h = null != g;
            break a;
          case "function":
            h = !0;
            break a;
          default:
            h = !1;
        }
        h ? this.ya(g) : this.H(g);
      }
    };
    e.prototype.ya = function (g) {
      var h = void 0;
      try {
        h = g.then;
      } catch (k) {
        this.s(k);
        return;
      }
      "function" == typeof h ? this.oa(h, g) : this.H(g);
    };
    e.prototype.s = function (g) {
      this.O(2, g);
    };
    e.prototype.H = function (g) {
      this.O(1, g);
    };
    e.prototype.O = function (g, h) {
      if (0 != this.g) throw Error("g`" + g + "`" + h + "`" + this.g);
      this.g = g;
      this.j = h;
      2 === this.g && this.V();
      this.$();
    };
    e.prototype.V = function () {
      var g = this;
      d(function () {
        if (g.T()) {
          var h = ja.console;
          "undefined" !== typeof h && h.error(g.j);
        }
      }, 1);
    };
    e.prototype.T = function () {
      if (this.N) return !1;
      var g = ja.CustomEvent,
        h = ja.Event,
        k = ja.dispatchEvent;
      if ("undefined" === typeof k) return !0;
      "function" === typeof g
        ? (g = new g("unhandledrejection", {
            cancelable: !0,
          }))
        : "function" === typeof h
        ? (g = new h("unhandledrejection", {
            cancelable: !0,
          }))
        : ((g = ja.document.createEvent("CustomEvent")),
          g.initCustomEvent("unhandledrejection", !1, !0, g));
      g.promise = this;
      g.reason = this.j;
      return k(g);
    };
    e.prototype.$ = function () {
      if (null != this.i) {
        for (var g = 0; g < this.i.length; ++g) f.i(this.i[g]);
        this.i = null;
      }
    };
    var f = new b();
    e.prototype.ha = function (g) {
      var h = this.o();
      g.vb(h.resolve, h.reject);
    };
    e.prototype.oa = function (g, h) {
      var k = this.o();
      try {
        g.call(h, k.resolve, k.reject);
      } catch (l) {
        k.reject(l);
      }
    };
    e.prototype.then = function (g, h) {
      function k(p, x) {
        return "function" == typeof p
          ? function (y) {
              try {
                l(p(y));
              } catch (A) {
                m(A);
              }
            }
          : x;
      }
      var l,
        m,
        r = new e(function (p, x) {
          l = p;
          m = x;
        });
      this.vb(k(g, l), k(h, m));
      return r;
    };
    e.prototype.catch = function (g) {
      return this.then(void 0, g);
    };
    e.prototype.vb = function (g, h) {
      function k() {
        switch (l.g) {
          case 1:
            g(l.j);
            break;
          case 2:
            h(l.j);
            break;
          default:
            throw Error("h`" + l.g);
        }
      }
      var l = this;
      null == this.i ? f.i(k) : this.i.push(k);
      this.N = !0;
    };
    e.resolve = c;
    e.reject = function (g) {
      return new e(function (h, k) {
        k(g);
      });
    };
    e.race = function (g) {
      return new e(function (h, k) {
        for (var l = u(g), m = l.next(); !m.done; m = l.next())
          c(m.value).vb(h, k);
      });
    };
    e.all = function (g) {
      var h = u(g),
        k = h.next();
      return k.done
        ? c([])
        : new e(function (l, m) {
            function r(y) {
              return function (A) {
                p[y] = A;
                x--;
                0 == x && l(p);
              };
            }
            var p = [],
              x = 0;
            do
              p.push(void 0),
                x++,
                c(k.value).vb(r(p.length - 1), m),
                (k = h.next());
            while (!k.done);
          });
    };
    return e;
  });
  var Pa = function (a, b, c) {
    if (null == a) throw new TypeError("i`" + c);
    if (b instanceof RegExp) throw new TypeError("j`" + c);
    return a + "";
  };
  t("Array.prototype.find", function (a) {
    return a
      ? a
      : function (b, c) {
          a: {
            var d = this;
            d instanceof String && (d = String(d));
            for (var e = d.length, f = 0; f < e; f++) {
              var g = d[f];
              if (b.call(c, g, f, d)) {
                b = g;
                break a;
              }
            }
            b = void 0;
          }
          return b;
        };
  });
  t("String.prototype.startsWith", function (a) {
    return a
      ? a
      : function (b, c) {
          var d = Pa(this, b, "startsWith");
          b += "";
          var e = d.length,
            f = b.length;
          c = Math.max(0, Math.min(c | 0, d.length));
          for (var g = 0; g < f && c < e; ) if (d[c++] != b[g++]) return !1;
          return g >= f;
        };
  });
  t("Object.is", function (a) {
    return a
      ? a
      : function (b, c) {
          return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
        };
  });
  t("Array.prototype.includes", function (a) {
    return a
      ? a
      : function (b, c) {
          var d = this;
          d instanceof String && (d = String(d));
          var e = d.length;
          c = c || 0;
          for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0;
          }
          return !1;
        };
  });
  t("String.prototype.includes", function (a) {
    return a
      ? a
      : function (b, c) {
          return -1 !== Pa(this, b, "includes").indexOf(b, c || 0);
        };
  });
  t("Array.prototype.fill", function (a) {
    return a
      ? a
      : function (b, c, d) {
          var e = this.length || 0;
          0 > c && (c = Math.max(0, e + c));
          if (null == d || d > e) d = e;
          d = Number(d);
          0 > d && (d = Math.max(0, e + d));
          for (c = Number(c || 0); c < d; c++) this[c] = b;
          return this;
        };
  });
  var Qa = function (a) {
    return a ? a : Array.prototype.fill;
  };
  t("Int8Array.prototype.fill", Qa);
  t("Uint8Array.prototype.fill", Qa);
  t("Uint8ClampedArray.prototype.fill", Qa);
  t("Int16Array.prototype.fill", Qa);
  t("Uint16Array.prototype.fill", Qa);
  t("Int32Array.prototype.fill", Qa);
  t("Uint32Array.prototype.fill", Qa);
  t("Float32Array.prototype.fill", Qa);
  t("Float64Array.prototype.fill", Qa);
  var Ra = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    },
    Wa =
      "function" == typeof Object.assign
        ? Object.assign
        : function (a, b) {
            for (var c = 1; c < arguments.length; c++) {
              var d = arguments[c];
              if (d) for (var e in d) Ra(d, e) && (a[e] = d[e]);
            }
            return a;
          };
  t("Object.assign", function (a) {
    return a || Wa;
  });
  t("Promise.prototype.finally", function (a) {
    return a
      ? a
      : function (b) {
          return this.then(
            function (c) {
              return Promise.resolve(b()).then(function () {
                return c;
              });
            },
            function (c) {
              return Promise.resolve(b()).then(function () {
                throw c;
              });
            }
          );
        };
  });
  var Xa = function (a, b) {
    a instanceof String && (a += "");
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var f = c++;
            return {
              value: b(f, a[f]),
              done: !1,
            };
          }
          d = !0;
          return {
            done: !0,
            value: void 0,
          };
        },
      };
    e[Symbol.iterator] = function () {
      return e;
    };
    return e;
  };
  t("Array.prototype.entries", function (a) {
    return a
      ? a
      : function () {
          return Xa(this, function (b, c) {
            return [b, c];
          });
        };
  });
  t("Array.prototype.keys", function (a) {
    return a
      ? a
      : function () {
          return Xa(this, function (b) {
            return b;
          });
        };
  });
  t("Array.prototype.values", function (a) {
    return a
      ? a
      : function () {
          return Xa(this, function (b, c) {
            return c;
          });
        };
  });
  t("WeakMap", function (a) {
    function b() {}
    function c(k) {
      var l = typeof k;
      return ("object" === l && null !== k) || "function" === l;
    }
    function d(k) {
      if (!Ra(k, f)) {
        var l = new b();
        ca(k, f, {
          value: l,
        });
      }
    }
    function e(k) {
      var l = Object[k];
      l &&
        (Object[k] = function (m) {
          if (m instanceof b) return m;
          Object.isExtensible(m) && d(m);
          return l(m);
        });
    }
    if (
      (function () {
        if (!a || !Object.seal) return !1;
        try {
          var k = Object.seal({}),
            l = Object.seal({}),
            m = new a([
              [k, 2],
              [l, 3],
            ]);
          if (2 != m.get(k) || 3 != m.get(l)) return !1;
          m.delete(k);
          m.set(l, 4);
          return !m.has(k) && 4 == m.get(l);
        } catch (r) {
          return !1;
        }
      })()
    )
      return a;
    var f = "$jscomp_hidden_" + Math.random();
    e("freeze");
    e("preventExtensions");
    e("seal");
    var g = 0,
      h = function (k) {
        this.g = (g += Math.random() + 1).toString();
        if (k) {
          k = u(k);
          for (var l; !(l = k.next()).done; )
            (l = l.value), this.set(l[0], l[1]);
        }
      };
    h.prototype.set = function (k, l) {
      if (!c(k)) throw Error("k");
      d(k);
      if (!Ra(k, f)) throw Error("l`" + k);
      k[f][this.g] = l;
      return this;
    };
    h.prototype.get = function (k) {
      return c(k) && Ra(k, f) ? k[f][this.g] : void 0;
    };
    h.prototype.has = function (k) {
      return c(k) && Ra(k, f) && Ra(k[f], this.g);
    };
    h.prototype.delete = function (k) {
      return c(k) && Ra(k, f) && Ra(k[f], this.g) ? delete k[f][this.g] : !1;
    };
    return h;
  });
  t("Map", function (a) {
    if (
      (function () {
        if (
          !a ||
          "function" != typeof a ||
          !a.prototype.entries ||
          "function" != typeof Object.seal
        )
          return !1;
        try {
          var h = Object.seal({
              x: 4,
            }),
            k = new a(u([[h, "s"]]));
          if (
            "s" != k.get(h) ||
            1 != k.size ||
            k.get({
              x: 4,
            }) ||
            k.set(
              {
                x: 4,
              },
              "t"
            ) != k ||
            2 != k.size
          )
            return !1;
          var l = k.entries(),
            m = l.next();
          if (m.done || m.value[0] != h || "s" != m.value[1]) return !1;
          m = l.next();
          return m.done ||
            4 != m.value[0].x ||
            "t" != m.value[1] ||
            !l.next().done
            ? !1
            : !0;
        } catch (r) {
          return !1;
        }
      })()
    )
      return a;
    var b = new WeakMap(),
      c = function (h) {
        this.i = {};
        this.g = f();
        this.size = 0;
        if (h) {
          h = u(h);
          for (var k; !(k = h.next()).done; )
            (k = k.value), this.set(k[0], k[1]);
        }
      };
    c.prototype.set = function (h, k) {
      h = 0 === h ? 0 : h;
      var l = d(this, h);
      l.list || (l.list = this.i[l.id] = []);
      l.Ba
        ? (l.Ba.value = k)
        : ((l.Ba = {
            next: this.g,
            Ma: this.g.Ma,
            head: this.g,
            key: h,
            value: k,
          }),
          l.list.push(l.Ba),
          (this.g.Ma.next = l.Ba),
          (this.g.Ma = l.Ba),
          this.size++);
      return this;
    };
    c.prototype.delete = function (h) {
      h = d(this, h);
      return h.Ba && h.list
        ? (h.list.splice(h.index, 1),
          h.list.length || delete this.i[h.id],
          (h.Ba.Ma.next = h.Ba.next),
          (h.Ba.next.Ma = h.Ba.Ma),
          (h.Ba.head = null),
          this.size--,
          !0)
        : !1;
    };
    c.prototype.clear = function () {
      this.i = {};
      this.g = this.g.Ma = f();
      this.size = 0;
    };
    c.prototype.has = function (h) {
      return !!d(this, h).Ba;
    };
    c.prototype.get = function (h) {
      return (h = d(this, h).Ba) && h.value;
    };
    c.prototype.entries = function () {
      return e(this, function (h) {
        return [h.key, h.value];
      });
    };
    c.prototype.keys = function () {
      return e(this, function (h) {
        return h.key;
      });
    };
    c.prototype.values = function () {
      return e(this, function (h) {
        return h.value;
      });
    };
    c.prototype.forEach = function (h, k) {
      for (var l = this.entries(), m; !(m = l.next()).done; )
        (m = m.value), h.call(k, m[1], m[0], this);
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    var d = function (h, k) {
        var l = k && typeof k;
        "object" == l || "function" == l
          ? b.has(k)
            ? (l = b.get(k))
            : ((l = "" + ++g), b.set(k, l))
          : (l = "p_" + k);
        var m = h.i[l];
        if (m && Ra(h.i, l))
          for (h = 0; h < m.length; h++) {
            var r = m[h];
            if ((k !== k && r.key !== r.key) || k === r.key)
              return {
                id: l,
                list: m,
                index: h,
                Ba: r,
              };
          }
        return {
          id: l,
          list: m,
          index: -1,
          Ba: void 0,
        };
      },
      e = function (h, k) {
        var l = h.g;
        return ka(function () {
          if (l) {
            for (; l.head != h.g; ) l = l.Ma;
            for (; l.next != l.head; )
              return (
                (l = l.next),
                {
                  done: !1,
                  value: k(l),
                }
              );
            l = null;
          }
          return {
            done: !0,
            value: void 0,
          };
        });
      },
      f = function () {
        var h = {};
        return (h.Ma = h.next = h.head = h);
      },
      g = 0;
    return c;
  });
  t("Set", function (a) {
    if (
      (function () {
        if (
          !a ||
          "function" != typeof a ||
          !a.prototype.entries ||
          "function" != typeof Object.seal
        )
          return !1;
        try {
          var c = Object.seal({
              x: 4,
            }),
            d = new a(u([c]));
          if (
            !d.has(c) ||
            1 != d.size ||
            d.add(c) != d ||
            1 != d.size ||
            d.add({
              x: 4,
            }) != d ||
            2 != d.size
          )
            return !1;
          var e = d.entries(),
            f = e.next();
          if (f.done || f.value[0] != c || f.value[1] != c) return !1;
          f = e.next();
          return f.done ||
            f.value[0] == c ||
            4 != f.value[0].x ||
            f.value[1] != f.value[0]
            ? !1
            : e.next().done;
        } catch (g) {
          return !1;
        }
      })()
    )
      return a;
    var b = function (c) {
      this.g = new Map();
      if (c) {
        c = u(c);
        for (var d; !(d = c.next()).done; ) this.add(d.value);
      }
      this.size = this.g.size;
    };
    b.prototype.add = function (c) {
      c = 0 === c ? 0 : c;
      this.g.set(c, c);
      this.size = this.g.size;
      return this;
    };
    b.prototype.delete = function (c) {
      c = this.g.delete(c);
      this.size = this.g.size;
      return c;
    };
    b.prototype.clear = function () {
      this.g.clear();
      this.size = 0;
    };
    b.prototype.has = function (c) {
      return this.g.has(c);
    };
    b.prototype.entries = function () {
      return this.g.entries();
    };
    b.prototype.values = function () {
      return this.g.values();
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function (c, d) {
      var e = this;
      this.g.forEach(function (f) {
        return c.call(d, f, f, e);
      });
    };
    return b;
  });
  t("Number.MIN_SAFE_INTEGER", function () {
    return -9007199254740991;
  });
  t("Object.values", function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d;
          for (d in b) Ra(b, d) && c.push(b[d]);
          return c;
        };
  });
  t("Math.hypot", function (a) {
    return a
      ? a
      : function (b) {
          if (2 > arguments.length)
            return arguments.length ? Math.abs(arguments[0]) : 0;
          var c, d, e;
          for (c = e = 0; c < arguments.length; c++)
            e = Math.max(e, Math.abs(arguments[c]));
          if (1e100 < e || 1e-100 > e) {
            if (!e) return e;
            for (c = d = 0; c < arguments.length; c++) {
              var f = Number(arguments[c]) / e;
              d += f * f;
            }
            return Math.sqrt(d) * e;
          }
          for (c = d = 0; c < arguments.length; c++)
            (f = Number(arguments[c])), (d += f * f);
          return Math.sqrt(d);
        };
  });
  var Ya = Ya || {},
    w = this || self,
    Za = /^[\w+/_-]+[=]{0,2}$/,
    $a = null,
    ab = function (a) {
      return (a = a.querySelector && a.querySelector("script[nonce]")) &&
        (a = a.nonce || a.getAttribute("nonce")) &&
        Za.test(a)
        ? a
        : "";
    },
    bb = function () {},
    cb = function (a) {
      a.Pb = void 0;
      a.W = function () {
        return a.Pb ? a.Pb : (a.Pb = new a());
      };
    },
    db = function (a) {
      var b = typeof a;
      b = "object" != b ? b : a ? (Array.isArray(a) ? "array" : b) : "null";
      return "array" == b || ("object" == b && "number" == typeof a.length);
    },
    eb = function (a) {
      var b = typeof a;
      return ("object" == b && null != a) || "function" == b;
    },
    fb = function (a, b, c) {
      return a.call.apply(a.bind, arguments);
    },
    kb = function (a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function () {
          var e = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(e, d);
          return a.apply(b, e);
        };
      }
      return function () {
        return a.apply(b, arguments);
      };
    },
    lb = function (a, b, c) {
      Function.prototype.bind &&
      -1 != Function.prototype.bind.toString().indexOf("native code")
        ? (lb = fb)
        : (lb = kb);
      return lb.apply(null, arguments);
    },
    mb = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return function () {
        var d = c.slice();
        d.push.apply(d, arguments);
        return a.apply(this, d);
      };
    },
    nb = function (a, b) {
      a = a.split(".");
      var c = w;
      a[0] in c ||
        "undefined" == typeof c.execScript ||
        c.execScript("var " + a[0]);
      for (var d; a.length && (d = a.shift()); )
        a.length || void 0 === b
          ? c[d] && c[d] !== Object.prototype[d]
            ? (c = c[d])
            : (c = c[d] = {})
          : (c[d] = b);
    },
    ob = function (a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.Sa = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      a.Jd = function (d, e, f) {
        for (
          var g = Array(arguments.length - 2), h = 2;
          h < arguments.length;
          h++
        )
          g[h - 2] = arguments[h];
        return b.prototype[e].apply(d, g);
      };
    },
    pb = function (a) {
      return a;
    };
  var qb;
  var tb = Array.prototype.indexOf
      ? function (a, b) {
          return Array.prototype.indexOf.call(a, b, void 0);
        }
      : function (a, b) {
          if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length
              ? -1
              : a.indexOf(b, 0);
          for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    ub = Array.prototype.forEach
      ? function (a, b, c) {
          Array.prototype.forEach.call(a, b, c);
        }
      : function (a, b, c) {
          for (
            var d = a.length,
              e = "string" === typeof a ? a.split("") : a,
              f = 0;
            f < d;
            f++
          )
            f in e && b.call(c, e[f], f, a);
        };
  function vb(a, b) {
    for (
      var c = "string" === typeof a ? a.split("") : a, d = a.length - 1;
      0 <= d;
      --d
    )
      d in c && b.call(void 0, c[d], d, a);
  }
  function wb(a) {
    a: {
      var b = xb;
      for (
        var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0;
        e < c;
        e++
      )
        if (e in d && b.call(void 0, d[e], e, a)) {
          b = e;
          break a;
        }
      b = -1;
    }
    return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
  }
  function yb(a, b) {
    b = tb(a, b);
    var c;
    (c = 0 <= b) && zb(a, b);
    return c;
  }
  function zb(a, b) {
    return 1 == Array.prototype.splice.call(a, b, 1).length;
  }
  function Ab(a, b) {
    var c = 0;
    vb(a, function (d, e) {
      b.call(void 0, d, e, a) && zb(a, e) && c++;
    });
  }
  function Bb(a) {
    return Array.prototype.concat.apply([], arguments);
  }
  function Cb(a) {
    for (var b = Math.random, c = a.length - 1; 0 < c; c--) {
      var d = Math.floor(b() * (c + 1)),
        e = a[c];
      a[c] = a[d];
      a[d] = e;
    }
  }
  var Db = function (a, b, c) {
    return a + c * (b - a);
  };
  var Eb = function (a, b) {
      this.x = void 0 !== a ? a : 0;
      this.y = void 0 !== b ? b : 0;
    },
    Fb = function (a, b) {
      var c = a.x - b.x;
      a = a.y - b.y;
      return c * c + a * a;
    };
  q = Eb.prototype;
  q.ceil = function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  };
  q.floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  };
  q.round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };
  q.translate = function (a, b) {
    a instanceof Eb
      ? ((this.x += a.x), (this.y += a.y))
      : ((this.x += Number(a)), "number" === typeof b && (this.y += b));
    return this;
  };
  q.scale = function (a, b) {
    this.x *= a;
    this.y *= "number" === typeof b ? b : a;
    return this;
  };
  var Gb = function (a, b, c) {
      this.g = a;
      this.j = b;
      this.i = c;
    },
    Jb = function (a, b) {
      if (0 == b) return 0;
      if (1 == b) return 1;
      var c = Db(0, a.g, b),
        d = Db(a.g, a.i, b);
      a = Db(a.i, 1, b);
      c = Db(c, d, b);
      d = Db(d, a, b);
      return Db(c, d, b);
    },
    Kb = function (a, b) {
      var c = b - 0;
      if (0 >= c) return 0;
      if (1 <= c) return 1;
      for (var d = 0, e = 1, f = 0, g = 0; 8 > g; g++) {
        f = Jb(a, c);
        var h = (Jb(a, c + 1e-6) - f) / 1e-6;
        if (1e-6 > Math.abs(f - b)) return c;
        if (1e-6 > Math.abs(h)) break;
        else f < b ? (d = c) : (e = c), (c -= (f - b) / h);
      }
      for (g = 0; 1e-6 < Math.abs(f - b) && 8 > g; g++)
        f < b ? ((d = c), (c = (c + e) / 2)) : ((e = c), (c = (c + d) / 2)),
          (f = Jb(a, c));
      return c;
    };
  var Lb = function (a, b, c) {
      var d = new Gb(a, b, c);
      return function (e) {
        e = Kb(d, e);
        if (0 == e) e = 0;
        else if (1 == e) e = 1;
        else {
          var f = Db(0, d.j, e),
            g = Db(d.j, 1, e),
            h = Db(1, 1, e);
          f = Db(f, g, e);
          g = Db(g, h, e);
          e = Db(f, g, e);
        }
        return e;
      };
    },
    Mb = Lb(0.25, 0.1, 0.25),
    Nb = Lb(0.4, 0, 1);
  var Qb = function (a) {
      var b = new Image();
      b.onerror =
        b.onload =
        b.onabort =
          function () {
            delete Ob[Pb];
          };
      Ob[Pb] = b;
      b.src = "/gen_204?atyp=i&ct=doodle&cad=" + a + "&zx=" + Date.now();
      Pb++;
    },
    Ob = [],
    Pb = 0;
  var Rb = function (a, b, c) {
      for (var d in a) b.call(c, a[d], d, a);
    },
    Sb =
      "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
        " "
      ),
    Tb = function (a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < Sb.length; f++)
          (c = Sb[f]),
            Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    };
  var Ub,
    Vb = function () {
      if (void 0 === Ub) {
        var a = null,
          b = w.trustedTypes;
        if (b && b.createPolicy) {
          try {
            a = b.createPolicy("goog#html", {
              createHTML: pb,
              createScript: pb,
              createScriptURL: pb,
            });
          } catch (c) {
            w.console && w.console.error(c.message);
          }
          Ub = a;
        } else Ub = a;
      }
      return Ub;
    };
  var Yb = function (a, b) {
    this.g = (a === Wb && b) || "";
    this.i = Xb;
  };
  Yb.prototype.ab = !0;
  Yb.prototype.$a = function () {
    return this.g;
  };
  var ec = function (a) {
      return a instanceof Yb && a.constructor === Yb && a.i === Xb
        ? a.g
        : "type_error:Const";
    },
    Xb = {},
    Wb = {};
  var fc =
      /[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]/,
    gc =
      /^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc]/,
    hc = /^http:\/\/.*/,
    ic = /\s+/,
    jc = /[\d\u06f0-\u06f9]/;
  var lc = function (a, b) {
    this.g = b === kc ? a : "";
  };
  q = lc.prototype;
  q.ab = !0;
  q.$a = function () {
    return this.g.toString();
  };
  q.Ob = !0;
  q.Mb = function () {
    return 1;
  };
  q.toString = function () {
    return this.g + "";
  };
  var mc = function (a) {
      return a instanceof lc && a.constructor === lc
        ? a.g
        : "type_error:TrustedResourceUrl";
    },
    qc = function () {
      var a = {},
        b = ec(new Yb(Wb, "//google-doodles.appspot.com/?"));
      if (!nc.test(b)) throw Error("m`" + b);
      var c = b.replace(oc, function (d, e) {
        if (!Object.prototype.hasOwnProperty.call(a, e))
          throw Error("n`" + e + "`" + b + "`" + JSON.stringify(a));
        d = a[e];
        return d instanceof Yb ? ec(d) : encodeURIComponent(String(d));
      });
      return pc(c);
    },
    oc = /%{(\w+)}/g,
    nc =
      /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i,
    rc = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/,
    tc = function (a) {
      var b = qc();
      b = rc.exec(mc(b).toString());
      var c = b[3] || "";
      return pc(b[1] + sc("?", b[2] || "", a) + sc("#", c, void 0));
    },
    kc = {},
    pc = function (a) {
      var b = Vb();
      a = b ? b.createScriptURL(a) : a;
      return new lc(a, kc);
    },
    sc = function (a, b, c) {
      if (null == c) return b;
      if ("string" === typeof c) return c ? a + encodeURIComponent(c) : "";
      for (var d in c)
        if (Object.prototype.hasOwnProperty.call(c, d)) {
          var e = c[d];
          e = Array.isArray(e) ? e : [e];
          for (var f = 0; f < e.length; f++) {
            var g = e[f];
            null != g &&
              (b || (b = a),
              (b +=
                (b.length > a.length ? "&" : "") +
                encodeURIComponent(d) +
                "=" +
                encodeURIComponent(String(g))));
          }
        }
      return b;
    };
  var uc = String.prototype.trim
      ? function (a) {
          return a.trim();
        }
      : function (a) {
          return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
        },
    vc = /&/g,
    wc = /</g,
    xc = />/g,
    yc = /"/g,
    zc = /'/g,
    Ac = /\x00/g,
    Bc = /[\x00&<>"']/,
    Cc = function (a, b) {
      return -1 != a.indexOf(b);
    },
    Dc = function (a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    };
  var Fc = function (a, b) {
    this.g = b === Ec ? a : "";
  };
  q = Fc.prototype;
  q.ab = !0;
  q.$a = function () {
    return this.g.toString();
  };
  q.Ob = !0;
  q.Mb = function () {
    return 1;
  };
  q.toString = function () {
    return this.g.toString();
  };
  var Gc = function (a) {
      return a instanceof Fc && a.constructor === Fc
        ? a.g
        : "type_error:SafeUrl";
    },
    Hc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    Ic = function (a) {
      if (a instanceof Fc) return a;
      a = "object" == typeof a && a.ab ? a.$a() : String(a);
      Hc.test(a) || (a = "about:invalid#zClosurez");
      return new Fc(a, Ec);
    },
    Ec = {};
  var Jc;
  a: {
    var Kc = w.navigator;
    if (Kc) {
      var Lc = Kc.userAgent;
      if (Lc) {
        Jc = Lc;
        break a;
      }
    }
    Jc = "";
  }
  var Uc = function (a, b, c) {
    this.g = c === Tc ? a : "";
    this.i = b;
  };
  q = Uc.prototype;
  q.Ob = !0;
  q.Mb = function () {
    return this.i;
  };
  q.ab = !0;
  q.$a = function () {
    return this.g.toString();
  };
  q.toString = function () {
    return this.g.toString();
  };
  var Vc = function (a) {
      return a instanceof Uc && a.constructor === Uc
        ? a.g
        : "type_error:SafeHtml";
    },
    Xc = function (a) {
      if (a instanceof Uc) return a;
      var b = "object" == typeof a,
        c = null;
      b && a.Ob && (c = a.Mb());
      a = b && a.ab ? a.$a() : String(a);
      Bc.test(a) &&
        (-1 != a.indexOf("&") && (a = a.replace(vc, "&amp;")),
        -1 != a.indexOf("<") && (a = a.replace(wc, "&lt;")),
        -1 != a.indexOf(">") && (a = a.replace(xc, "&gt;")),
        -1 != a.indexOf('"') && (a = a.replace(yc, "&quot;")),
        -1 != a.indexOf("'") && (a = a.replace(zc, "&#39;")),
        -1 != a.indexOf("\x00") && (a = a.replace(Ac, "&#0;")));
      return Wc(a, c);
    },
    Tc = {},
    Wc = function (a, b) {
      var c = Vb();
      a = c ? c.createHTML(a) : a;
      return new Uc(a, b, Tc);
    },
    Yc = new Uc((w.trustedTypes && w.trustedTypes.emptyHTML) || "", 0, Tc);
  var Zc = (function (a) {
      var b = !1,
        c;
      return function () {
        b || ((c = a()), (b = !0));
        return c;
      };
    })(function () {
      var a = document.createElement("div"),
        b = document.createElement("div");
      b.appendChild(document.createElement("div"));
      a.appendChild(b);
      b = a.firstChild.firstChild;
      a.innerHTML = Vc(Yc);
      return !b.parentElement;
    }),
    $c = function (a, b) {
      a.src = mc(b);
      (b = a.ownerDocument && a.ownerDocument.defaultView) && b != w
        ? (b = ab(b.document))
        : (null === $a && ($a = ab(w.document)), (b = $a));
      b && a.setAttribute("nonce", b);
    },
    ad = function (a) {
      a = a instanceof Fc ? a : Ic(a);
      return w.open(Gc(a), "");
    };
  var bd = function (a, b) {
    this.i = {};
    this.g = [];
    this.j = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) throw Error("o");
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else if (a)
      if (a instanceof bd)
        for (c = a.Ka(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
      else for (d in a) this.set(d, a[d]);
  };
  bd.prototype.Ga = function () {
    cd(this);
    for (var a = [], b = 0; b < this.g.length; b++) a.push(this.i[this.g[b]]);
    return a;
  };
  bd.prototype.Ka = function () {
    cd(this);
    return this.g.concat();
  };
  bd.prototype.remove = function (a) {
    return dd(this.i, a)
      ? (delete this.i[a], this.j--, this.g.length > 2 * this.j && cd(this), !0)
      : !1;
  };
  var cd = function (a) {
    if (a.j != a.g.length) {
      for (var b = 0, c = 0; b < a.g.length; ) {
        var d = a.g[b];
        dd(a.i, d) && (a.g[c++] = d);
        b++;
      }
      a.g.length = c;
    }
    if (a.j != a.g.length) {
      var e = {};
      for (c = b = 0; b < a.g.length; )
        (d = a.g[b]), dd(e, d) || ((a.g[c++] = d), (e[d] = 1)), b++;
      a.g.length = c;
    }
  };
  bd.prototype.get = function (a, b) {
    return dd(this.i, a) ? this.i[a] : b;
  };
  bd.prototype.set = function (a, b) {
    dd(this.i, a) || (this.j++, this.g.push(a));
    this.i[a] = b;
  };
  bd.prototype.forEach = function (a, b) {
    for (var c = this.Ka(), d = 0; d < c.length; d++) {
      var e = c[d],
        f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  var dd = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  };
  var ed = function (a) {
      if (a.Ga && "function" == typeof a.Ga) return a.Ga();
      if ("string" === typeof a) return a.split("");
      if (db(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b;
      }
      b = [];
      c = 0;
      for (d in a) b[c++] = a[d];
      return b;
    },
    fd = function (a, b) {
      if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0);
      else if (db(a) || "string" === typeof a) ub(a, b, void 0);
      else {
        if (a.Ka && "function" == typeof a.Ka) var c = a.Ka();
        else if (a.Ga && "function" == typeof a.Ga) c = void 0;
        else if (db(a) || "string" === typeof a) {
          c = [];
          for (var d = a.length, e = 0; e < d; e++) c.push(e);
        } else for (e in ((c = []), (d = 0), a)) c[d++] = e;
        d = ed(a);
        e = d.length;
        for (var f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a);
      }
    };
  var gd =
      /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
    hd = function (a, b) {
      if (a) {
        a = a.split("&");
        for (var c = 0; c < a.length; c++) {
          var d = a[c].indexOf("="),
            e = null;
          if (0 <= d) {
            var f = a[c].substring(0, d);
            e = a[c].substring(d + 1);
          } else f = a[c];
          b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
        }
      }
    };
  var id = function (a, b) {
    this.j = this.N = this.s = "";
    this.O = null;
    this.o = this.i = "";
    this.H = !1;
    var c;
    a instanceof id
      ? ((this.H = void 0 !== b ? b : a.H),
        jd(this, a.s),
        (this.N = a.N),
        (this.j = a.j),
        kd(this, a.O),
        (this.i = a.i),
        ld(this, md(a.g)),
        (this.o = a.o))
      : a && (c = String(a).match(gd))
      ? ((this.H = !!b),
        jd(this, c[1] || "", !0),
        (this.N = nd(c[2] || "")),
        (this.j = nd(c[3] || "", !0)),
        kd(this, c[4]),
        (this.i = nd(c[5] || "", !0)),
        ld(this, c[6] || "", !0),
        (this.o = nd(c[7] || "")))
      : ((this.H = !!b), (this.g = new od(null, this.H)));
  };
  id.prototype.toString = function () {
    var a = [],
      b = this.s;
    b && a.push(pd(b, qd, !0), ":");
    var c = this.j;
    if (c || "file" == b)
      a.push("//"),
        (b = this.N) && a.push(pd(b, qd, !0), "@"),
        a.push(
          encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")
        ),
        (c = this.O),
        null != c && a.push(":", String(c));
    if ((c = this.i))
      this.j && "/" != c.charAt(0) && a.push("/"),
        a.push(pd(c, "/" == c.charAt(0) ? rd : sd, !0));
    (c = this.g.toString()) && a.push("?", c);
    (c = this.o) && a.push("#", pd(c, td));
    return a.join("");
  };
  id.prototype.resolve = function (a) {
    var b = new id(this),
      c = !!a.s;
    c ? jd(b, a.s) : (c = !!a.N);
    c ? (b.N = a.N) : (c = !!a.j);
    c ? (b.j = a.j) : (c = null != a.O);
    var d = a.i;
    if (c) kd(b, a.O);
    else if ((c = !!a.i)) {
      if ("/" != d.charAt(0))
        if (this.j && !this.i) d = "/" + d;
        else {
          var e = b.i.lastIndexOf("/");
          -1 != e && (d = b.i.substr(0, e + 1) + d);
        }
      e = d;
      if (".." == e || "." == e) d = "";
      else if (Cc(e, "./") || Cc(e, "/.")) {
        d = 0 == e.lastIndexOf("/", 0);
        e = e.split("/");
        for (var f = [], g = 0; g < e.length; ) {
          var h = e[g++];
          "." == h
            ? d && g == e.length && f.push("")
            : ".." == h
            ? ((1 < f.length || (1 == f.length && "" != f[0])) && f.pop(),
              d && g == e.length && f.push(""))
            : (f.push(h), (d = !0));
        }
        d = f.join("/");
      } else d = e;
    }
    c ? (b.i = d) : (c = "" !== a.g.toString());
    c ? ld(b, md(a.g)) : (c = !!a.o);
    c && (b.o = a.o);
    return b;
  };
  var jd = function (a, b, c) {
      a.s = c ? nd(b, !0) : b;
      a.s && (a.s = a.s.replace(/:$/, ""));
    },
    kd = function (a, b) {
      if (b) {
        b = Number(b);
        if (isNaN(b) || 0 > b) throw Error("p`" + b);
        a.O = b;
      } else a.O = null;
    },
    ld = function (a, b, c) {
      b instanceof od
        ? ((a.g = b), ud(a.g, a.H))
        : (c || (b = pd(b, vd)), (a.g = new od(b, a.H)));
    },
    nd = function (a, b) {
      return a
        ? b
          ? decodeURI(a.replace(/%25/g, "%2525"))
          : decodeURIComponent(a)
        : "";
    },
    pd = function (a, b, c) {
      return "string" === typeof a
        ? ((a = encodeURI(a).replace(b, wd)),
          c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
          a)
        : null;
    },
    wd = function (a) {
      a = a.charCodeAt(0);
      return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
    },
    qd = /[#\/\?@]/g,
    sd = /[#\?:]/g,
    rd = /[#\?]/g,
    vd = /[#\?@]/g,
    td = /#/g,
    od = function (a, b) {
      this.i = this.g = null;
      this.j = a || null;
      this.o = !!b;
    },
    xd = function (a) {
      a.g ||
        ((a.g = new bd()),
        (a.i = 0),
        a.j &&
          hd(a.j, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
          }));
    };
  od.prototype.add = function (a, b) {
    xd(this);
    this.j = null;
    a = yd(this, a);
    var c = this.g.get(a);
    c || this.g.set(a, (c = []));
    c.push(b);
    this.i += 1;
    return this;
  };
  od.prototype.remove = function (a) {
    xd(this);
    a = yd(this, a);
    return dd(this.g.i, a)
      ? ((this.j = null), (this.i -= this.g.get(a).length), this.g.remove(a))
      : !1;
  };
  var zd = function (a, b) {
    xd(a);
    b = yd(a, b);
    return dd(a.g.i, b);
  };
  q = od.prototype;
  q.forEach = function (a, b) {
    xd(this);
    this.g.forEach(function (c, d) {
      ub(
        c,
        function (e) {
          a.call(b, e, d, this);
        },
        this
      );
    }, this);
  };
  q.Ka = function () {
    xd(this);
    for (var a = this.g.Ga(), b = this.g.Ka(), c = [], d = 0; d < b.length; d++)
      for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c;
  };
  q.Ga = function (a) {
    xd(this);
    var b = [];
    if ("string" === typeof a)
      zd(this, a) && (b = Bb(b, this.g.get(yd(this, a))));
    else {
      a = this.g.Ga();
      for (var c = 0; c < a.length; c++) b = Bb(b, a[c]);
    }
    return b;
  };
  q.set = function (a, b) {
    xd(this);
    this.j = null;
    a = yd(this, a);
    zd(this, a) && (this.i -= this.g.get(a).length);
    this.g.set(a, [b]);
    this.i += 1;
    return this;
  };
  q.get = function (a, b) {
    if (!a) return b;
    a = this.Ga(a);
    return 0 < a.length ? String(a[0]) : b;
  };
  q.toString = function () {
    if (this.j) return this.j;
    if (!this.g) return "";
    for (var a = [], b = this.g.Ka(), c = 0; c < b.length; c++) {
      var d = b[c],
        e = encodeURIComponent(String(d));
      d = this.Ga(d);
      for (var f = 0; f < d.length; f++) {
        var g = e;
        "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
        a.push(g);
      }
    }
    return (this.j = a.join("&"));
  };
  var md = function (a) {
      var b = new od();
      b.j = a.j;
      a.g && ((b.g = new bd(a.g)), (b.i = a.i));
      return b;
    },
    yd = function (a, b) {
      b = String(b);
      a.o && (b = b.toLowerCase());
      return b;
    },
    ud = function (a, b) {
      b &&
        !a.o &&
        (xd(a),
        (a.j = null),
        a.g.forEach(function (c, d) {
          var e = d.toLowerCase();
          if (d != e && (this.remove(d), this.remove(e), 0 < c.length)) {
            this.j = null;
            d = this.g;
            var f = d.set;
            e = yd(this, e);
            var g = c.length;
            if (0 < g) {
              for (var h = Array(g), k = 0; k < g; k++) h[k] = c[k];
              g = h;
            } else g = [];
            f.call(d, e, g);
            this.i += c.length;
          }
        }, a));
      a.o = b;
    };
  var Ad = navigator.userAgent,
    Bd = new id(location.href),
    Cd = "sdoodles" == document.documentElement.id,
    Dd = "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints,
    Ed =
      Ad.includes("iPad") || Ad.includes("iPhone") || Ad.includes("iPod") || Dd,
    Fd = Ad.toLowerCase().includes("gsa") || Ad.includes("GoogleApp"),
    Gd = Fd && Ed,
    Hd = Fd && !Ed,
    Id =
      Ed ||
      Ad.includes("Android") ||
      Ad.includes("Mobile") ||
      Ad.includes("Silk") ||
      Ad.includes("UCBrowser") ||
      Ad.includes("UCWEB");
  Ad.includes("GT-I9300") && Ad.includes("Chrome");
  var Jd = Bd.i.includes("/logos/") && Bd.i.includes(".html"),
    Ld = function () {
      return !!document.getElementById("fkbx") || Kd();
    },
    Kd = function () {
      var a = Bd.g.get("ntp");
      return "1" == a || "2" == a;
    },
    Md = function () {
      return (
        "1" == Bd.g.get("fpdoodle") && !!document.getElementById("fpdoodle")
      );
    },
    Nd = function () {
      return !!document.querySelector("body#iframedoodle");
    },
    Ud = !Id && !Cd && !Ld() && !Md() && !Jd;
  !Dd || Cd || Ld() || Md();
  var z = function (a, b) {
      for (var c = [], d = 1; d < arguments.length; ++d)
        c[d - 1] = arguments[d];
      if (a)
        for (d = 0; d < c.length; d += 2) {
          var e = c[d],
            f = c[d + 1],
            g = a.style;
          g && e in g ? (g[e] = f) : e in a && (a[e] = f);
        }
    },
    Vd = Date.now,
    Wd = function () {
      return self.performance.now();
    },
    Xd = ["Moz", "ms", "O", "webkit"],
    Yd = function (a, b, c) {
      if (a) {
        for (var d = u(Xd), e = d.next(); !e.done; e = d.next())
          a.style[e.value + b] = c;
        a.style[b.charAt(0).toLowerCase() + b.substr(1)] = c;
      }
    },
    Zd = ["", "moz", "ms", "o", "webkit"],
    $d = function (a, b) {
      if (!a) return null;
      for (var c = u(Zd), d = c.next(); !d.done; d = c.next()) {
        d = d.value;
        var e = b;
        0 < d.length && (e = b.charAt(0).toUpperCase() + b.substr(1));
        d += e;
        if ("undefined" != typeof a[d]) return d;
      }
      return null;
    },
    ae = function (a, b) {
      var c;
      return (c =
        window.google && void 0 !== window.google.doodle
          ? window.google.doodle
          : null) && void 0 != c[a]
        ? c[a]
        : b;
    },
    be = function () {
      var a = ae("doodle_args", {}).is_dogfood;
      return null != a ? a : !1;
    },
    ce = ae("alt", ""),
    de = ae("hl", "en"),
    ee = ae("gl", ""),
    ge = function (a, b, c) {
      var d =
        Math.max(0, c - 230) + (document.querySelector("div.og-pdp") ? 36 : 12);
      z(a, "width", b + "px", "height", c + "px");
      fe(d);
    },
    fe = function (a) {
      a += "px";
      var b = document.getElementById("lga");
      b && z(b, "marginBottom", a);
      Ld() ||
        ((b = document.getElementById("searchform")) &&
          z(b, "transform", "translateY(" + a + ")"),
        (a = new UIEvent("resize", {
          bubbles: !1,
          Kd: !1,
          view: window,
          detail: 0,
        })),
        window.dispatchEvent(a));
    },
    he = null,
    ie = null,
    je = null,
    ke = function () {
      je ||
        (window.google && window.google.kEI && window.google.kEI.length
          ? (je = window.google.kEI)
          : Nd() && zd(Bd.g, "ei") && (je = Bd.g.get("ei")));
      return je;
    },
    le = function () {
      if (!he) {
        var a = document.getElementById("hplogoved");
        a
          ? (he = a.getAttribute("data-ved"))
          : Nd() && zd(Bd.g, "ved") && (he = Bd.g.get("ved"));
      }
      return he;
    };
  var me = function (a, b, c, d, e) {
      d = void 0 === d ? Mb : d;
      e = void 0 === e ? Wd : e;
      this.H = a;
      this.O = b;
      this.$ = {};
      this.duration = c;
      this.T = d;
      this.s = e;
      this.g = null;
      this.i = !1;
    },
    oe = function (a) {
      var b = Math.min(Math.max(ne(a) / a.duration, 0), 1);
      a.i && (b = 1 - b);
      for (var c in a.H)
        if (a.O.hasOwnProperty(c)) {
          var d = a.$,
            e = c;
          var f = a.H[c];
          var g = a.O[c],
            h = a.T;
          h = void 0 === h ? Mb : h;
          f += h(b) * (g - f);
          d[e] = f;
        }
      return a.$;
    },
    pe = function (a) {
      return ne(a) >= a.duration;
    },
    ne = function (a) {
      return null === a.g ? 0 : a.s() - a.g;
    };
  me.prototype.start = function () {
    this.g = this.s();
    this.i = !1;
  };
  me.prototype.reset = function () {
    this.g = null;
  };
  var qe = function (a, b, c, d, e, f) {
    d = void 0 === d ? Mb : d;
    e = void 0 === e ? !1 : e;
    f = void 0 === f ? !1 : f;
    me.call(this, a, b, c, d, function () {
      return g.j;
    });
    var g = this;
    this.j = 0;
    this.N = f;
    this.o = e;
  };
  v(qe, me);
  qe.prototype.reset = function () {
    me.prototype.reset.call(this);
    this.j = 0;
  };
  var re = function () {};
  re.prototype.j = function () {
    return !0;
  };
  var se = function () {};
  v(se, re);
  se.prototype.i = function () {
    return !1;
  };
  var te = function (a) {
    this.o = 0;
    this.g = a;
  };
  v(te, re);
  te.prototype.i = function (a, b) {
    var c = this.g;
    if (6 > c.length) return !1;
    for (var d = !1, e = 0, f = c.length - 2; e < c.length; f = e, e += 2) {
      var g = c[e],
        h = c[e + 1],
        k = c[f];
      f = c[f + 1];
      a < g != a < k && b > h + ((a - g) * (f - h)) / (k - g) && (d = !d);
    }
    return d;
  };
  var ue = function (a, b, c, d) {
      this.g = 0;
      this.i = a;
      this.o = void 0 === c ? 3 : c;
      this.j = b;
      this.s = void 0 === d ? 2e3 : d;
    },
    we = function (a, b, c, d) {
      c = void 0 === c ? function () {} : c;
      d = (void 0 === d ? 0 : d) ? "//www.google.com" : "";
      d = new id(a.i.startsWith("/") ? "" + d + a.i : d + "/async/" + a.i);
      ld(d, b);
      d = d.toString();
      a.g++;
      c(a.g);
      return ve(a, d)
        .catch(function (e) {
          return a.g < a.o
            ? a.j(a.s * Math.pow(2, a.g - 1)).then(function () {
                return we(a, b, c);
              })
            : Promise.reject(e);
        })
        .finally(function () {
          return (a.g = 0);
        });
    },
    ve = function (a, b) {
      var c = new XMLHttpRequest();
      c.open("GET", b);
      return new Promise(function (d, e) {
        c.send();
        c.onreadystatechange = function () {
          if (4 == c.readyState)
            if (200 == c.status && c.responseText)
              a: {
                var f = c.responseText;
                f.startsWith(")]}'\n") && (f = f.substring(5));
                var g = {};
                try {
                  g = JSON.parse(f);
                } catch (h) {
                  e(f);
                  break a;
                }
                g.hasOwnProperty(a.i) && (g = g[a.i]);
                g.hasOwnProperty("__err__") ? e(g.__err__) : d(g);
              }
            else e(c);
        };
      });
    };
  var xe = function (a, b, c) {
    ue.call(
      this,
      a,
      function (d) {
        return new Promise(function (e) {
          return setTimeout(e, d);
        });
      },
      void 0 === b ? 3 : b,
      void 0 === c ? 2e3 : c
    );
  };
  v(xe, ue);
  var ye = function (a) {
    this.i = a;
    this.s = !1;
    this.o = [];
  };
  ye.prototype.j = function () {
    if (!this.s) {
      this.s = !0;
      for (var a = u(this.o), b = a.next(); !b.done; b = a.next())
        (b = b.value), b();
    }
  };
  ye.prototype.preload = function () {};
  var ze = function (a, b) {
    a.s ? b() : a.o.push(b);
  };
  var Ae = function (a) {
    Ae[" "](a);
    return a;
  };
  Ae[" "] = bb;
  var Ce = function (a) {
    var b = Be;
    return Object.prototype.hasOwnProperty.call(b, 9) ? b[9] : (b[9] = a(9));
  };
  var De = Cc(Jc, "Opera"),
    Ee = Cc(Jc, "Trident") || Cc(Jc, "MSIE"),
    Fe = Cc(Jc, "Edge"),
    Ge =
      Cc(Jc, "Gecko") &&
      !(Cc(Jc.toLowerCase(), "webkit") && !Cc(Jc, "Edge")) &&
      !(Cc(Jc, "Trident") || Cc(Jc, "MSIE")) &&
      !Cc(Jc, "Edge"),
    He = Cc(Jc.toLowerCase(), "webkit") && !Cc(Jc, "Edge"),
    Ie;
  a: {
    var Je = "",
      Ke = (function () {
        var a = Jc;
        if (Ge) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (Fe) return /Edge\/([\d\.]+)/.exec(a);
        if (Ee) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (He) return /WebKit\/(\S+)/.exec(a);
        if (De) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
    Ke && (Je = Ke ? Ke[1] : "");
    if (Ee) {
      var Le,
        Me = w.document;
      Le = Me ? Me.documentMode : void 0;
      if (null != Le && Le > parseFloat(Je)) {
        Ie = String(Le);
        break a;
      }
    }
    Ie = Je;
  }
  var Ne = Ie,
    Be = {},
    Oe = function () {
      return Ce(function () {
        for (
          var a = 0,
            b = uc(String(Ne)).split("."),
            c = uc("9").split("."),
            d = Math.max(b.length, c.length),
            e = 0;
          0 == a && e < d;
          e++
        ) {
          var f = b[e] || "",
            g = c[e] || "";
          do {
            f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
            g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
            if (0 == f[0].length && 0 == g[0].length) break;
            a =
              Dc(
                0 == f[1].length ? 0 : parseInt(f[1], 10),
                0 == g[1].length ? 0 : parseInt(g[1], 10)
              ) ||
              Dc(0 == f[2].length, 0 == g[2].length) ||
              Dc(f[2], g[2]);
            f = f[3];
            g = g[3];
          } while (0 == a);
        }
        return 0 <= a;
      });
    };
  var Pe = (function () {
    if (!w.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
      b = Object.defineProperty({}, "passive", {
        get: function () {
          a = !0;
        },
      });
    try {
      w.addEventListener("test", bb, b), w.removeEventListener("test", bb, b);
    } catch (c) {}
    return a;
  })();
  function Qe(a) {
    a && "function" == typeof a.wb && a.wb();
  }
  var B = function () {
    this.ya = this.ya;
    this.$ = this.$;
  };
  B.prototype.ya = !1;
  B.prototype.wb = function () {
    this.ya || ((this.ya = !0), this.j());
  };
  var Re = function (a, b) {
    b = mb(Qe, b);
    a.ya ? b() : (a.$ || (a.$ = []), a.$.push(b));
  };
  B.prototype.j = function () {
    if (this.$) for (; this.$.length; ) this.$.shift()();
  };
  var Se = function (a, b) {
    this.type = a;
    this.i = this.target = b;
    this.defaultPrevented = this.j = !1;
  };
  Se.prototype.stopPropagation = function () {
    this.j = !0;
  };
  Se.prototype.preventDefault = function () {
    this.defaultPrevented = !0;
  };
  var Te = function (a) {
      return He ? "webkit" + a : De ? "o" + a.toLowerCase() : a.toLowerCase();
    },
    Ue = Te("AnimationEnd"),
    Ve = Te("TransitionEnd");
  var Xe = function (a, b) {
    Se.call(this, a ? a.type : "");
    this.relatedTarget = this.i = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.g = null;
    if (a) {
      var c = (this.type = a.type),
        d =
          a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : null;
      this.target = a.target || a.srcElement;
      this.i = b;
      if ((b = a.relatedTarget)) {
        if (Ge) {
          a: {
            try {
              Ae(b.nodeName);
              var e = !0;
              break a;
            } catch (f) {}
            e = !1;
          }
          e || (b = null);
        }
      } else
        "mouseover" == c
          ? (b = a.fromElement)
          : "mouseout" == c && (b = a.toElement);
      this.relatedTarget = b;
      d
        ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
          (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
          (this.screenX = d.screenX || 0),
          (this.screenY = d.screenY || 0))
        : ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
          (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
          (this.screenX = a.screenX || 0),
          (this.screenY = a.screenY || 0));
      this.button = a.button;
      this.keyCode = a.keyCode || 0;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType =
        "string" === typeof a.pointerType
          ? a.pointerType
          : We[a.pointerType] || "";
      this.state = a.state;
      this.g = a;
      a.defaultPrevented && Xe.Sa.preventDefault.call(this);
    }
  };
  ob(Xe, Se);
  var We = {
    2: "touch",
    3: "pen",
    4: "mouse",
  };
  Xe.prototype.stopPropagation = function () {
    Xe.Sa.stopPropagation.call(this);
    this.g.stopPropagation
      ? this.g.stopPropagation()
      : (this.g.cancelBubble = !0);
  };
  Xe.prototype.preventDefault = function () {
    Xe.Sa.preventDefault.call(this);
    var a = this.g;
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  };
  var Ye = "closure_listenable_" + ((1e6 * Math.random()) | 0),
    Ze = function (a) {
      return !(!a || !a[Ye]);
    };
  var $e = 0;
  var af = function (a, b, c, d, e) {
      this.listener = a;
      this.g = null;
      this.src = b;
      this.type = c;
      this.capture = !!d;
      this.yb = e;
      this.key = ++$e;
      this.kb = this.ub = !1;
    },
    bf = function (a) {
      a.kb = !0;
      a.listener = null;
      a.g = null;
      a.src = null;
      a.yb = null;
    };
  var cf = function (a) {
    this.src = a;
    this.g = {};
    this.i = 0;
  };
  cf.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.g[f];
    a || ((a = this.g[f] = []), this.i++);
    var g = df(a, b, d, e);
    -1 < g
      ? ((b = a[g]), c || (b.ub = !1))
      : ((b = new af(b, this.src, f, !!d, e)), (b.ub = c), a.push(b));
    return b;
  };
  cf.prototype.remove = function (a, b, c, d) {
    a = a.toString();
    if (!(a in this.g)) return !1;
    var e = this.g[a];
    b = df(e, b, c, d);
    return -1 < b
      ? (bf(e[b]), zb(e, b), 0 == e.length && (delete this.g[a], this.i--), !0)
      : !1;
  };
  var ef = function (a, b) {
      var c = b.type;
      c in a.g &&
        yb(a.g[c], b) &&
        (bf(b), 0 == a.g[c].length && (delete a.g[c], a.i--));
    },
    ff = function (a, b, c, d, e) {
      a = a.g[b.toString()];
      b = -1;
      a && (b = df(a, c, d, e));
      return -1 < b ? a[b] : null;
    },
    df = function (a, b, c, d) {
      for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.kb && f.listener == b && f.capture == !!c && f.yb == d) return e;
      }
      return -1;
    };
  var gf = "closure_lm_" + ((1e6 * Math.random()) | 0),
    hf = {},
    jf = 0,
    lf = function (a, b, c, d, e) {
      if (d && d.once) return kf(a, b, c, d, e);
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) lf(a, b[f], c, d, e);
        return null;
      }
      c = mf(c);
      return Ze(a)
        ? nf(a, b, c, eb(d) ? !!d.capture : !!d, e)
        : of(a, b, c, !1, d, e);
    },
    of = function (a, b, c, d, e, f) {
      if (!b) throw Error("r");
      var g = eb(e) ? !!e.capture : !!e,
        h = pf(a);
      h || (a[gf] = h = new cf(a));
      c = h.add(b, c, d, g, f);
      if (c.g) return c;
      d = qf();
      c.g = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener)
        Pe || (e = g),
          void 0 === e && (e = !1),
          a.addEventListener(b.toString(), d, e);
      else if (a.attachEvent) a.attachEvent(rf(b.toString()), d);
      else if (a.addListener && a.removeListener) a.addListener(d);
      else throw Error("s");
      jf++;
      return c;
    },
    qf = function () {
      var a = sf,
        b = function (c) {
          return a.call(b.src, b.listener, c);
        };
      return b;
    },
    kf = function (a, b, c, d, e) {
      if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++) kf(a, b[f], c, d, e);
        return null;
      }
      c = mf(c);
      return Ze(a)
        ? a.i.add(String(b), c, !0, eb(d) ? !!d.capture : !!d, e)
        : of(a, b, c, !0, d, e);
    },
    tf = function (a, b, c, d, e) {
      if (Array.isArray(b))
        for (var f = 0; f < b.length; f++) tf(a, b[f], c, d, e);
      else
        (d = eb(d) ? !!d.capture : !!d),
          (c = mf(c)),
          Ze(a)
            ? a.i.remove(String(b), c, d, e)
            : a && (a = pf(a)) && (b = ff(a, b, c, d, e)) && uf(b);
    },
    uf = function (a) {
      if ("number" !== typeof a && a && !a.kb) {
        var b = a.src;
        if (Ze(b)) ef(b.i, a);
        else {
          var c = a.type,
            d = a.g;
          b.removeEventListener
            ? b.removeEventListener(c, d, a.capture)
            : b.detachEvent
            ? b.detachEvent(rf(c), d)
            : b.addListener && b.removeListener && b.removeListener(d);
          jf--;
          (c = pf(b))
            ? (ef(c, a), 0 == c.i && ((c.src = null), (b[gf] = null)))
            : bf(a);
        }
      }
    },
    rf = function (a) {
      return a in hf ? hf[a] : (hf[a] = "on" + a);
    },
    sf = function (a, b) {
      if (a.kb) a = !0;
      else {
        b = new Xe(b, this);
        var c = a.listener,
          d = a.yb || a.src;
        a.ub && uf(a);
        a = c.call(d, b);
      }
      return a;
    },
    pf = function (a) {
      a = a[gf];
      return a instanceof cf ? a : null;
    },
    vf = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0),
    mf = function (a) {
      if ("function" === typeof a) return a;
      a[vf] ||
        (a[vf] = function (b) {
          return a.handleEvent(b);
        });
      return a[vf];
    };
  var wf = function () {
    B.call(this);
    this.i = new cf(this);
    this.Ua = this;
    this.oa = null;
  };
  ob(wf, B);
  wf.prototype[Ye] = !0;
  wf.prototype.addEventListener = function (a, b, c, d) {
    lf(this, a, b, c, d);
  };
  wf.prototype.removeEventListener = function (a, b, c, d) {
    tf(this, a, b, c, d);
  };
  var yf = function (a, b) {
    var c,
      d = a.oa;
    if (d) for (c = []; d; d = d.oa) c.push(d);
    a = a.Ua;
    d = b.type || b;
    if ("string" === typeof b) b = new Se(b, a);
    else if (b instanceof Se) b.target = b.target || a;
    else {
      var e = b;
      b = new Se(d, a);
      Tb(b, e);
    }
    e = !0;
    if (c)
      for (var f = c.length - 1; !b.j && 0 <= f; f--) {
        var g = (b.i = c[f]);
        e = xf(g, d, !0, b) && e;
      }
    b.j ||
      ((g = b.i = a),
      (e = xf(g, d, !0, b) && e),
      b.j || (e = xf(g, d, !1, b) && e));
    if (c)
      for (f = 0; !b.j && f < c.length; f++)
        (g = b.i = c[f]), (e = xf(g, d, !1, b) && e);
  };
  wf.prototype.j = function () {
    wf.Sa.j.call(this);
    if (this.i) {
      var a = this.i,
        b = 0,
        c;
      for (c in a.g) {
        for (var d = a.g[c], e = 0; e < d.length; e++) ++b, bf(d[e]);
        delete a.g[c];
        a.i--;
      }
    }
    this.oa = null;
  };
  var nf = function (a, b, c, d, e) {
      return a.i.add(String(b), c, !1, d, e);
    },
    xf = function (a, b, c, d) {
      b = a.i.g[String(b)];
      if (!b) return !0;
      b = b.concat();
      for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f];
        if (g && !g.kb && g.capture == c) {
          var h = g.listener,
            k = g.yb || g.src;
          g.ub && ef(a.i, g);
          e = !1 !== h.call(k, d) && e;
        }
      }
      return e && !d.defaultPrevented;
    };
  var zf = function () {};
  zf.prototype.g = null;
  zf.prototype.getOptions = function () {
    var a;
    (a = this.g) ||
      ((a = {}), Af(this) && ((a[0] = !0), (a[1] = !0)), (a = this.g = a));
    return a;
  };
  var Bf,
    Cf = function () {};
  ob(Cf, zf);
  var Df = function (a) {
      return (a = Af(a)) ? new ActiveXObject(a) : new XMLHttpRequest();
    },
    Af = function (a) {
      if (
        !a.i &&
        "undefined" == typeof XMLHttpRequest &&
        "undefined" != typeof ActiveXObject
      ) {
        for (
          var b = [
              "MSXML2.XMLHTTP.6.0",
              "MSXML2.XMLHTTP.3.0",
              "MSXML2.XMLHTTP",
              "Microsoft.XMLHTTP",
            ],
            c = 0;
          c < b.length;
          c++
        ) {
          var d = b[c];
          try {
            return new ActiveXObject(d), (a.i = d);
          } catch (e) {}
        }
        throw Error("t");
      }
      return a.i;
    };
  Bf = new Cf();
  var Ef = function (a, b) {
    this.width = a;
    this.height = b;
  };
  q = Ef.prototype;
  q.aspectRatio = function () {
    return this.width / this.height;
  };
  q.ceil = function () {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  q.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  q.round = function () {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  q.scale = function (a, b) {
    this.width *= a;
    this.height *= "number" === typeof b ? b : a;
    return this;
  };
  var Ff = function (a, b) {
      b = String(b);
      "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
      return a.createElement(b);
    },
    Gf = function () {
      this.g = w.document || document;
    };
  var Hf = function (a, b, c) {
    if ("function" === typeof a) c && (a = lb(a, c));
    else if (a && "function" == typeof a.handleEvent) a = lb(a.handleEvent, a);
    else throw Error("v");
    return 2147483647 < Number(b) ? -1 : w.setTimeout(a, b || 0);
  };
  var If = function (a) {
    wf.call(this);
    this.headers = new bd();
    this.T = a || null;
    this.o = !1;
    this.O = this.g = null;
    this.ha = "";
    this.s = this.V = this.H = this.U = !1;
    this.Aa = 0;
    this.N = null;
    this.wa = "";
    this.Ea = this.Qa = !1;
  };
  ob(If, wf);
  var Jf = /^https?$/i,
    Kf = ["POST", "PUT"],
    Lf = [],
    Nf = function (a, b) {
      var c = new If();
      Lf.push(c);
      b && nf(c, "complete", b);
      c.i.add("ready", c.Xa, !0, void 0, void 0);
      Mf(c, a, void 0, void 0, void 0);
      return c;
    };
  If.prototype.Xa = function () {
    this.wb();
    yb(Lf, this);
  };
  var Mf = function (a, b, c, d, e) {
      if (a.g) throw Error("w`" + a.ha + "`" + b);
      c = c ? c.toUpperCase() : "GET";
      a.ha = b;
      a.U = !1;
      a.o = !0;
      a.g = a.T ? Df(a.T) : Df(Bf);
      a.O = a.T ? a.T.getOptions() : Bf.getOptions();
      a.g.onreadystatechange = lb(a.Oa, a);
      try {
        (a.V = !0), a.g.open(c, String(b), !0), (a.V = !1);
      } catch (g) {
        Of(a);
        return;
      }
      b = d || "";
      var f = new bd(a.headers);
      e &&
        fd(e, function (g, h) {
          f.set(h, g);
        });
      e = wb(f.Ka());
      d = w.FormData && b instanceof w.FormData;
      !(0 <= tb(Kf, c)) ||
        e ||
        d ||
        f.set(
          "Content-Type",
          "application/x-www-form-urlencoded;charset=utf-8"
        );
      f.forEach(function (g, h) {
        this.g.setRequestHeader(h, g);
      }, a);
      a.wa && (a.g.responseType = a.wa);
      "withCredentials" in a.g &&
        a.g.withCredentials !== a.Qa &&
        (a.g.withCredentials = a.Qa);
      try {
        Pf(a),
          0 < a.Aa &&
            ((a.Ea = Qf(a.g)),
            a.Ea
              ? ((a.g.timeout = a.Aa), (a.g.ontimeout = lb(a.Ja, a)))
              : (a.N = Hf(a.Ja, a.Aa, a))),
          (a.H = !0),
          a.g.send(b),
          (a.H = !1);
      } catch (g) {
        Of(a);
      }
    },
    Qf = function (a) {
      return (
        Ee && Oe() && "number" === typeof a.timeout && void 0 !== a.ontimeout
      );
    },
    xb = function (a) {
      return "content-type" == a.toLowerCase();
    };
  If.prototype.Ja = function () {
    "undefined" != typeof Ya && this.g && (yf(this, "timeout"), this.abort(8));
  };
  var Of = function (a) {
      a.o = !1;
      a.g && ((a.s = !0), a.g.abort(), (a.s = !1));
      Rf(a);
      Sf(a);
    },
    Rf = function (a) {
      a.U || ((a.U = !0), yf(a, "complete"), yf(a, "error"));
    };
  If.prototype.abort = function () {
    this.g &&
      this.o &&
      ((this.o = !1),
      (this.s = !0),
      this.g.abort(),
      (this.s = !1),
      yf(this, "complete"),
      yf(this, "abort"),
      Sf(this));
  };
  If.prototype.j = function () {
    this.g &&
      (this.o && ((this.o = !1), (this.s = !0), this.g.abort(), (this.s = !1)),
      Sf(this, !0));
    If.Sa.j.call(this);
  };
  If.prototype.Oa = function () {
    this.ya || (this.V || this.H || this.s ? Tf(this) : this.Ya());
  };
  If.prototype.Ya = function () {
    Tf(this);
  };
  var Tf = function (a) {
      if (
        a.o &&
        "undefined" != typeof Ya &&
        (!a.O[1] || 4 != (a.g ? a.g.readyState : 0) || 2 != Uf(a))
      )
        if (a.H && 4 == (a.g ? a.g.readyState : 0)) Hf(a.Oa, 0, a);
        else if ((yf(a, "readystatechange"), 4 == (a.g ? a.g.readyState : 0))) {
          a.o = !1;
          try {
            Vf(a) ? (yf(a, "complete"), yf(a, "success")) : Rf(a);
          } finally {
            Sf(a);
          }
        }
    },
    Sf = function (a, b) {
      if (a.g) {
        Pf(a);
        var c = a.g,
          d = a.O[0] ? bb : null;
        a.g = null;
        a.O = null;
        b || yf(a, "ready");
        try {
          c.onreadystatechange = d;
        } catch (e) {}
      }
    },
    Pf = function (a) {
      a.g && a.Ea && (a.g.ontimeout = null);
      a.N && (w.clearTimeout(a.N), (a.N = null));
    },
    Vf = function (a) {
      var b = Uf(a);
      a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
          var c = !0;
          break a;
        default:
          c = !1;
      }
      if (!c) {
        if ((b = 0 === b))
          (a = String(a.ha).match(gd)[1] || null),
            !a &&
              w.self &&
              w.self.location &&
              ((a = w.self.location.protocol), (a = a.substr(0, a.length - 1))),
            (b = !Jf.test(a ? a.toLowerCase() : ""));
        c = b;
      }
      return c;
    },
    Uf = function (a) {
      try {
        return 2 < (a.g ? a.g.readyState : 0) ? a.g.status : -1;
      } catch (b) {
        return -1;
      }
    },
    cg = function (a) {
      try {
        return a.g ? a.g.responseXML : null;
      } catch (b) {
        return null;
      }
    };
  var dg = function (a, b) {
      this.s = a;
      this.o = b;
      this.g = null;
      this.$ = [];
      this.j = null;
      this.N = this.H = !1;
      this.O = [];
      this.i = null;
    },
    jg = function (a) {
      var b = eg.W();
      if (fg && !b.g) {
        b.g = new (window.AudioContext || window.webkitAudioContext)();
        b.j = b.g.createGain();
        b.j.connect(b.g.destination);
        for (var c in b.s) b.s[c].H = b.g;
        for (var d in b.o) gg(b.o[d], b.g, b.j);
        b.g.onstatechange = function () {
          hg(b);
        };
        hg(b);
        ig(b);
        kf(
          a,
          ["click", "pointerup", "mouseup", "touchend"],
          function () {
            b.g.resume();
            ig(b);
          },
          !0
        );
      }
    },
    hg = function (a) {
      if ("running" == a.g.state && !a.N) {
        a.N = !0;
        for (var b = 0; b < a.O.length; b++) a.O[b]();
      }
    },
    kg = function (a) {
      a.i = a.g.createBufferSource();
      var b = a.g.createBuffer(1, 1, 22050);
      a.i.buffer = b;
      a.i.connect(a.g.destination);
      a.i.start(0);
      a = u(a.$);
      for (b = a.next(); !b.done; b = a.next()) (b = b.value), b();
    },
    ig = function (a) {
      a.g &&
        (null == a.i
          ? kg(a)
          : void 0 === a.i.playbackState
          ? kg(a)
          : a.i.playbackState !== a.i.PLAYING_STATE &&
            a.i.playbackState !== a.i.FINISHED_STATE &&
            kg(a));
    };
  dg.prototype.destroy = function () {
    this.g.close();
    this.g = null;
  };
  dg.prototype.reset = function () {
    for (var a in this.s) this.s[a].o = [];
    for (var b in this.o) lg(this.o[b]);
  };
  var mg = function () {
    var a = eg.W();
    a.j && a.j.gain.setValueAtTime(0, a.g.currentTime);
    a.H = !0;
  };
  dg.prototype.isMuted = function () {
    return this.H && !!this.j && 0 == this.j.gain.value;
  };
  var fg =
      !(!window.AudioContext && !window.webkitAudioContext) &&
      !!window.GainNode,
    E = function (a, b) {
      this.$ = ng.Zb;
      this.N = a;
      this.H = b;
      this.i = {};
      this.j = this.s = this.g = this.o = null;
      this.O = 0;
    },
    gg = function (a, b, c) {
      a.g = b;
      a.s = c;
    },
    og = function (a) {
      if (a.g)
        for (var b in a.i) {
          var c = a.i[b];
          !c.Cd && 1e3 * a.g.currentTime > c.kc + a.H && delete a.i[b];
        }
    };
  E.prototype.play = function (a, b, c, d, e, f) {
    a = void 0 === a ? 0 : a;
    b = void 0 === b ? !1 : b;
    c = void 0 === c ? 0 : c;
    e = void 0 === e ? !1 : e;
    if (!this.g || !this.s) return -1;
    og(this);
    f = void 0 === f ? this.g.currentTime + a / 1e3 : f;
    d ||
      ((d = this.g.createBufferSource()),
      d.playbackRate.setValueAtTime(1, this.g.currentTime));
    !this.o && this.g.createGain && (this.o = this.g.createGain());
    this.j && d.connect(this.j);
    this.o
      ? (this.j ? this.j.connect(this.o) : d.connect(this.o),
        this.o.connect(this.s))
      : this.j
      ? this.j.connect(this.s)
      : d.connect(this.s);
    this.j = null;
    d.loop = b;
    try {
      d.buffer = this.$.N;
    } catch (h) {
      return -1;
    }
    a = this.N / 1e3;
    var g = this.H / 1e3 / d.playbackRate.value;
    b
      ? ((d.loopStart = a + (e ? c / 1e3 : 0)),
        (d.loopEnd = a + g),
        d.start(f, a + c / 1e3))
      : d.start(f, a + c / 1e3, g);
    e = this.O++;
    this.i[e] = {
      node: d,
      kc: 1e3 * f - c,
      Cd: b,
    };
    return e;
  };
  var lg = function (a, b) {
      og(a);
      if (void 0 !== b) {
        if (a.i[b]) {
          try {
            a.i[b].node.stop(0);
          } catch (d) {}
          var c = (1e3 * a.g.currentTime - a.i[b].kc) % a.H;
          delete a.i[b];
          return [c];
        }
        return [];
      }
      b = [];
      for (c in a.i) b = b.concat(lg(a, c));
      return b;
    },
    pg = document.createElement("audio"),
    qg =
      "function" === typeof pg.canPlayType && "" != pg.canPlayType("audio/mpeg")
        ? ".mp3"
        : ".ogg",
    rg = function (a, b) {
      ye.call(this, a + b + qg);
      this.H = this.N = null;
      this.g = 0;
    };
  v(rg, ye);
  rg.prototype.preload = function (a, b) {
    var c = this,
      d = new Promise(function (f) {
        ze(c, f);
      });
    a && ze(this, a);
    if (0 != this.g) return Promise.resolve();
    if (!this.H)
      return Promise.reject("Must call Audio.init before preloading audio.");
    var e = new XMLHttpRequest();
    e.open("GET", this.i, !0);
    e.responseType = "arraybuffer";
    e.onload = function () {
      c.H.decodeAudioData(e.response, function (f) {
        f && ((c.N = f), (c.g = 3), c.j());
      });
      c.g = 2;
    };
    b &&
      (e.onprogress = function (f) {
        f.lengthComputable && b(f.loaded / f.total);
      });
    e.send();
    this.g = 1;
    return d;
  };
  var vg = function (a, b) {
      var c = void 0 === c ? !0 : c;
      var d, e, f, g;
      return Oa(function (h) {
        switch (h.g) {
          case 1:
            return (d = "string" === typeof a ? a : a.value), Ca(h, sg(d), 2);
          case 2:
            var k;
            if (!(k = h.j))
              if (document.execCommand) {
                "string" === typeof a
                  ? (tg ||
                      ((tg = document.createElement("input")),
                      (tg.readOnly = !0),
                      z(
                        tg,
                        "position",
                        "absolute",
                        "opacity",
                        0,
                        "left",
                        0,
                        "top",
                        0,
                        "pointerEvents",
                        "none"
                      ),
                      document.body.appendChild(tg)),
                    (tg.value = a),
                    (k = tg))
                  : (k = a);
                k !== document.activeElement && k.focus();
                var l = k.contentEditable,
                  m = k.readOnly;
                k.contentEditable = !0;
                k.readOnly = !1;
                var r = document.createRange();
                r.selectNodeContents(k);
                var p = window.getSelection();
                p.removeAllRanges();
                p.addRange(r);
                try {
                  k.select(), k.setSelectionRange(0, k.value.length);
                } catch (y) {}
                k.contentEditable = l;
                k.readOnly = m;
                try {
                  var x = document.execCommand("copy");
                } catch (y) {
                  x = !1;
                }
                window.getSelection().removeAllRanges();
                k.blur();
                b && b !== document.activeElement && b.focus();
                tg && tg.remove();
                k = x;
              } else k = !1;
            if ((e = k)) {
              h.g = 3;
              break;
            }
            if (!(f = c)) {
              h.g = 4;
              break;
            }
            return Ca(h, ug(), 5);
          case 5:
            f = h.j;
          case 4:
            if (!(g = f)) {
              h.g = 6;
              break;
            }
            return Ca(h, sg(d), 7);
          case 7:
            g = h.j;
          case 6:
            e = g;
          case 3:
            return e ? h.return(Promise.resolve()) : h.return(Promise.reject());
        }
      });
    },
    sg = function (a) {
      return Oa(function (b) {
        return navigator.clipboard && navigator.clipboard.writeText
          ? b.return(
              navigator.clipboard.writeText(a).then(
                function () {
                  return !0;
                },
                function () {
                  return !1;
                }
              )
            )
          : b.return(!1);
      });
    },
    wg = function (a) {
      return Oa(function (b) {
        switch (a.state) {
          case "granted":
            return b.return(!0);
          case "denied":
            return b.return(!1);
        }
        return b.return(
          new Promise(function (c) {
            a.onchange = function () {
              return c(wg(a));
            };
          })
        );
      });
    },
    ug = function () {
      var a;
      return Oa(function (b) {
        if (1 == b.g) {
          if (!navigator.permissions || !navigator.permissions.query)
            return b.return(!1);
          a = wg;
          return Ca(
            b,
            navigator.permissions.query({
              name: "clipboard-write",
            }),
            2
          );
        }
        return b.return(a(b.j));
      });
    },
    tg = null;
  var xg = function (a, b) {
    var c = void 0 === c ? 52 : c;
    var d = c * (window.devicePixelRatio || 1),
      e = document.createElement("canvas");
    e.width = d;
    e.height = d;
    var f = e.getContext("2d");
    f.fillStyle = "rgba(0,0,0,.3)";
    f.arc(d / 2, d / 2, d / 2, 0, 2 * Math.PI);
    f.fill();
    f.strokeStyle = "#fff";
    f.lineWidth = (d / 52) * 3.5;
    var g = (d / 52) * 2;
    f.beginPath();
    f.moveTo(d / 4 + g, d / 4 + g);
    f.lineTo((3 * d) / 4 - g, (3 * d) / 4 - g);
    f.stroke();
    f.beginPath();
    f.moveTo((3 * d) / 4 - g, d / 4 + g);
    f.lineTo(d / 4 + g, (3 * d) / 4 - g);
    f.stroke();
    this.g = e;
    this.g.style.top = "10px";
    this.g.style.right = "10px";
    this.g.style.width = c + "px";
    this.g.style.height = c + "px";
    this.g.style.cursor = "pointer";
    this.g.style.position = "absolute";
    this.g.style.pointerEvents = "all";
    this.g.style.background = "transparent";
    this.g.style.display = "none";
    this.g.setAttribute("role", "button");
    this.g.setAttribute("aria-label", "Close");
    this.g.tabIndex = 0;
    lf(this.g, "click", b);
    a.appendChild(this.g);
  };
  var yg = function () {
      return Nd() ? "1" != Bd.g.get("scta") : !Ld();
    },
    zg = function () {
      if (Nd()) throw "";
      return Ud || Ld();
    },
    Ag = function () {
      if (Nd()) throw "";
      return Md() || Jd || (Id && !Dd);
    },
    Bg = function () {
      return Nd()
        ? "1" == Bd.g.get("ccta")
        : (Md() && !Ld()) || (Jd && Id && !Ud);
    };
  var Dg = function (a) {
      var b = this;
      this.o = a;
      this.j = [];
      this.g = null;
      this.T = this.$ = 0;
      this.ya = this.H = !1;
      this.N = [];
      this.O = this.U = 1;
      this.V = [this.o];
      this.s = !1;
      lf(window, "resize", function () {
        Cg(b);
      });
      Cg(this);
    },
    Cg = function (a, b) {
      void 0 !== b && (a.s = b);
      b = a.o.getBoundingClientRect();
      var c = a.s ? b.width : b.height;
      a.U = a.o.width / (a.s ? b.height : b.width);
      a.O = a.o.height / c;
    },
    Fg = function (a, b) {
      a.j.push(new Eg(b));
    };
  Dg.prototype.handleEvent = function (a) {
    var b = a.g;
    var c = void 0;
    b = (b = b || window.event)
      ? (c =
          c ||
          (b.targetTouches && b.targetTouches[0]) ||
          (b.changedTouches && b.changedTouches[0])) && void 0 !== c.pageX
        ? [c.pageX, c.pageY]
        : void 0 !== b.clientX
        ? [
            b.clientX +
              ("rtl" == document.dir ? -1 : 1) *
                (document.body.scrollLeft ||
                  document.documentElement.scrollLeft ||
                  0),
            b.clientY +
              (document.body.scrollTop ||
                document.documentElement.scrollTop ||
                0),
          ]
        : void 0 !== b.pageX
        ? [b.pageX, b.pageY]
        : [0, 0]
      : [0, 0];
    c = this.o.getBoundingClientRect();
    if (this.s) {
      var d = c.right - b[0];
      b[0] = b[1] - c.top;
      b[1] = d;
    } else (b[0] -= c.left), (b[1] -= c.top);
    b[0] *= this.U;
    b[1] *= this.O;
    c = b[1];
    this.$ = b[0];
    this.T = c;
    a = a.type;
    if (!this.ya || 0 != a.indexOf("mouse")) {
      b = {
        touchstart: "mousedown",
        touchend: "mouseup",
        touchmove: "mousemove",
      };
      a in b && ((this.ya = !0), (a = b[a]));
      c = a;
      a = this.$;
      b = this.T;
      if (!this.H && "mousedown" == c)
        for (this.H = !0, d = 0; d < this.N.length; d++) this.N[d]();
      if ("mousedown" == c) {
        if (!this.i)
          for (c = 0; c < this.j.length; c++)
            if (((d = this.j[c]), d.i.i(a, b))) {
              this.i = d;
              d.g("mousedown", a, b);
              break;
            }
      } else if ("mouseup" == c)
        this.i
          ? (this.i.g("mouseup", a, b), (this.i = null))
          : this.g && this.g.g("mouseup", a, b);
      else if ("mousemove" == c || "areamove" == c) {
        d = null;
        for (var e = 0; e < this.j.length; e++) {
          var f = this.j[e];
          if (f.i.i(a, b)) {
            d = f;
            break;
          }
        }
        this.g != d &&
          (this.g && this.g.g("mouseout", a, b),
          d && d.g("mouseover", a, b),
          (this.g = d));
        if ("mousemove" == c)
          for (
            this.i && this.i.g("mousemove", a, b), c = 0;
            c < this.j.length;
            c++
          )
            (d = this.j[c]),
              d != this.i && d.i.i(a, b) && d.g("mousemove", a, b);
      } else
        "mouseout" == c
          ? (this.g && this.g.g("mouseout", a, b), (this.g = this.i = null))
          : "contextmenu" == c && this.g && this.g.g("contextmenu", a, b);
      a = this.g && this.g.i.j() ? "pointer" : "default";
      for (b = 0; (c = this.V[b]); b++) z(c, "cursor", a);
    }
  };
  var Eg = function (a) {
      this.i = Gg;
      this.g = a;
    },
    Gg = (function () {
      var a = new se();
      a.i = function () {
        return !0;
      };
      a.j = function () {
        return !1;
      };
      return a;
    })();
  var Ig = function () {
    B.call(this);
    this.T = !0;
    this.O = !1;
    this.s = [];
    this.N = !1;
    this.i = this.H = this.g = 0;
    this.o = Hg;
  };
  v(Ig, B);
  var Lg = function (a, b) {
      b = new Jg(b);
      Kg(a, b);
    },
    Kg = function (a, b) {
      a.s.push(b);
      a.N = !0;
    },
    Og = function (a) {
      if (a.T) a.O = !1;
      else {
        a.O = !0;
        Mg(a);
        a.N &&
          (a.s.sort(function (e, f) {
            return e.g == f.g ? f.i - e.i : e.g - f.g;
          }),
          (a.N = !1));
        for (var b = 0, c, d = 0; (c = a.s[d]); d++)
          if (c.g <= a.g) Ng(c) && Kg(a, c), b++;
          else break;
        a.s.splice(0, b);
        a.g++;
        requestAnimationFrame(function () {
          Og(a);
        });
      }
    },
    Mg = function (a) {
      var b = new Date().getTime();
      30 < a.g &&
        a.H &&
        (b - a.H >= 1.05 * a.o ? a.i++ : (a.i >>= 1),
        20 < a.i && ((a.o = Math.min(50, 1.2 * a.o)), (a.i = 0)));
      a.H = b;
    };
  Ig.prototype.start = function () {
    this.T = !1;
    this.O || Og(this);
  };
  Ig.prototype.j = function () {
    this.reset();
    B.prototype.j.call(this);
  };
  Ig.prototype.reset = function () {
    this.T = !0;
    this.s = [];
    this.g = 0;
    this.N = !1;
    this.o = Hg;
    this.H = this.i = 0;
  };
  cb(Ig);
  var Hg = 1e3 / 60,
    Jg = function (a) {
      var b = void 0;
      b = void 0 === b ? null : b;
      this.i = 1e3 / 60;
      this.j = a;
      this.g = Ig.W().g;
      this.s = 0;
      this.o = b;
    },
    Ng = function (a) {
      var b = a.j(a.s);
      a.s++;
      a.g = Ig.W().g + a.i / Ig.W().o;
      !b && a.o && a.o();
      return b;
    };
  Jg.prototype.cancel = function () {
    this.j = function () {
      return !1;
    };
  };
  var Pg = function (a) {
    return 3 * a * a - 2 * a * a * a;
  };
  var Qg = function (a, b) {
    b = void 0 === b ? function () {} : b;
    B.call(this);
    this.g = !1;
    this.H = b;
    this.ka = a;
    this.s = "1" == Bd.g.get("ntp");
    this.i = function () {
      return !1;
    };
    this.o = null;
    zg() && (this.ka.style.willChange = "width,height");
  };
  v(Qg, B);
  var Sg = function (a, b) {
      b = void 0 === b ? function () {} : b;
      var c = void 0 === c ? !1 : c;
      var d = void 0 === d ? 0 : d;
      var e = void 0 === e ? !1 : e;
      if (a.ka && zg() && !a.g) {
        var f = a.ka;
        if (Kd()) Rg(a, b);
        else {
          document.getElementById("fkbx") &&
            z(f.parentElement, "width", "100%");
          var g = f.offsetHeight,
            h = f.offsetWidth;
          d = Math.min(960, f.parentElement.clientWidth) - 2 * d;
          e = e ? 540 : d / (960 / 540);
          var k = Ig.W(),
            l = Wd(),
            m = new me(
              {
                height: g,
                width: h,
              },
              {
                height: e,
                width: d,
              },
              400,
              Pg,
              function () {
                return l;
              }
            );
          m.start();
          a.g = !0;
          a.i = function (r) {
            l = void 0 !== r ? l + r : Wd();
            r = oe(m);
            ge(f, Math.round(r.width), Math.round(r.height));
            a.H();
            return pe(m)
              ? (b(),
                (a.ka.style.willChange = "unset"),
                (a.i = function () {
                  return !1;
                }),
                !1)
              : !0;
          };
          c ||
            Lg(k, function () {
              return a.i();
            });
        }
      }
    },
    Rg = function (a, b) {
      var c, d, e;
      Oa(function (f) {
        if (1 == f.g) return Ca(f, Tg(a), 2);
        c = {
          cmd: "resizeDoodle",
          width: "960px",
          height: "540px",
          duration: "400ms",
        };
        "1" == Bd.g.get("ntp")
          ? window.parent.postMessage(c, "chrome-search://local-ntp")
          : window.top.postMessage(c, "chrome://new-tab-page");
        a.g = !0;
        d = !1;
        e = function () {
          a.s && a.ka.classList.remove("expanderHide");
          d = !0;
          b();
        };
        a.o = setTimeout(e, 500);
        window.addEventListener("message", function (g) {
          "resizeComplete" === g.data.Ld &&
            (null !== a.o && (clearTimeout(a.o), (a.o = null)), d || e());
        });
        return f.return();
      });
    },
    Tg = function (a) {
      if (!a.s) return Promise.resolve();
      a.ka.classList.add("expanderHide");
      return new Promise(function (b) {
        setTimeout(b, 200);
      });
    };
  Qg.prototype.j = function () {
    B.prototype.j.call(this);
    this.reset();
    this.ka = null;
  };
  Qg.prototype.reset = function () {
    this.g &&
      (z(this.ka, "width", "", "height", ""),
      fe(0),
      (this.ka.style.width = ""),
      (this.ka.style.height = ""));
    this.g = !1;
  };
  var Wg = function (a) {
      var b = [Ug],
        c,
        d;
      new Promise(function (f, g) {
        c = f;
        d = g;
      });
      if (window.WebFontConfig && b) {
        b = u(b);
        for (var e = b.next(); !e.done; e = b.next())
          (e = e.value), Vg(e) && a && a(e, "");
      } else
        nb("WebFontConfig.active", c),
          nb("WebFontConfig.inactive", d),
          nb("WebFontConfig.google.families", b),
          a && nb("WebFontConfig.fontactive", a),
          (a = Ff(document, "SCRIPT")),
          $c(
            a,
            pc(
              ec(
                new Yb(
                  Wb,
                  ("https:" == document.location.protocol ? "https" : "http") +
                    "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
                )
              )
            )
          ),
          (a.type = "text/javascript"),
          (a.async = !0),
          (document.getElementById("xjsc") || document.body).appendChild(a);
    },
    Vg = function (a) {
      a = a.toLowerCase().replace(/ /g, "");
      for (
        var b = u(document.documentElement.classList.values()), c = b.next();
        !c.done;
        c = b.next()
      )
        if (c.value.search("wf-" + a + "-w+-active")) return !0;
      return !1;
    };
  var Xg = function (a) {
    B.call(this);
    this.i = a;
    this.g = {};
  };
  ob(Xg, B);
  var Yg = [],
    G = function (a, b, c, d, e) {
      Array.isArray(c) || (c && (Yg[0] = c.toString()), (c = Yg));
      for (var f = 0; f < c.length; f++) {
        var g = lf(b, c[f], d || a.handleEvent, e || !1, a.i || a);
        if (!g) break;
        a.g[g.key] = g;
      }
    },
    $g = function (a, b, c, d, e) {
      Zg(a, b, c, d, e);
    },
    Zg = function (a, b, c, d, e, f) {
      if (Array.isArray(c))
        for (var g = 0; g < c.length; g++) Zg(a, b, c[g], d, e, f);
      else
        (b = kf(b, c, d || a.handleEvent, e, f || a.i || a)) &&
          (a.g[b.key] = b);
    },
    ah = function (a, b, c, d, e, f) {
      if (Array.isArray(c))
        for (var g = 0; g < c.length; g++) ah(a, b, c[g], d, e, f);
      else
        (d = d || a.handleEvent),
          (e = eb(e) ? !!e.capture : !!e),
          (f = f || a.i || a),
          (d = mf(d)),
          (e = !!e),
          (c = Ze(b)
            ? ff(b.i, String(c), d, e, f)
            : b
            ? (b = pf(b))
              ? ff(b, c, d, e, f)
              : null
            : null),
          c && (uf(c), delete a.g[c.key]);
    },
    bh = function (a) {
      Rb(
        a.g,
        function (b, c) {
          this.g.hasOwnProperty(c) && uf(b);
        },
        a
      );
      a.g = {};
    };
  Xg.prototype.j = function () {
    Xg.Sa.j.call(this);
    bh(this);
  };
  Xg.prototype.handleEvent = function () {
    throw Error("x");
  };
  var ch = Ed && navigator.userAgent.includes("OS 12_"),
    dh = function () {
      this.U = this.V = this.T = this.ka = this.i = null;
      this.ha = !1;
      this.N = null;
      this.H = this.O = this.o = this.s = !1;
      this.g = !0;
      this.$ = this.ya = !1;
      this.j = null;
    };
  dh.prototype.reset = function () {
    this.U = this.V = this.T = this.ka = this.i = null;
    this.ha = !1;
    this.N = null;
    this.H = this.O = this.o = this.s = !1;
    this.g = !0;
    this.$ = this.ya = !1;
    this.j = null;
  };
  var gh = function (a) {
      a.j = "landscape-primary";
      document[eh] && fh(a);
    },
    fh = function (a) {
      a.j &&
        (window.screen.lockOrientation && window.screen.lockOrientation(a.j),
        window.screen.orientation &&
          window.screen.orientation.lock &&
          window.screen.orientation.lock(a.j).catch(bb));
    },
    ih = function (a) {
      a.s && (a.$ ? (hh.call(document), (a.$ = !1)) : (a.N.call(a.ka), fh(a)));
    },
    kh = function (a, b, c, d) {
      var e = !0;
      e = void 0 === e ? !0 : e;
      a.ka = b;
      a.i = [];
      a.T = void 0 === d ? function () {} : d;
      a.H = !0;
      a.N = b[$d(b, "requestFullscreen")];
      b = !!(document[$d(document, "fullscreenEnabled")] && a.N && hh);
      if (Nd()) throw "";
      d = Ed ? !1 : (Md() && !(Gd || Hd)) || (Jd && Id);
      a.s = d && b;
      a.o = e && Ag();
      a.O = !e && Ag();
      a.g = !0;
      if (a.s || a.o)
        z(document.body, "margin", "0"),
          z(a.ka, "overflow", "visible", "width", "100%", "height", "100%"),
          (document.body.scrollLeft = 0),
          c ? G(c, window, "scroll", jh) : lf(window, "scroll", jh, !0);
    },
    lh = function (a, b) {
      a.i.push(b);
      a.g = !0;
    };
  dh.prototype.close = function () {
    this.$ = !0;
    ih(this);
  };
  var mh = function (a, b) {
    var c = document.createElement("div");
    c.style.pointerEvents = "none";
    c.style.position = "absolute";
    c.style.top = "0";
    c.style.left = "0";
    c.style.width = "100%";
    c.style.height = "100%";
    c.style.direction = "ltr";
    c.dataset.width = a.toString();
    c.dataset.height = b.toString();
    return c;
  };
  cb(dh);
  var eh = $d(document, "fullscreenElement"),
    hh = document[$d(document, "exitFullscreen")],
    jh = function (a) {
      a.preventDefault();
      a.stopPropagation();
      return !1;
    };
  var nh = [5, 6, 7, 8, 9, 11, 12, 16],
    oh = 0,
    ph = 0,
    qh = !1,
    rh = {},
    sh = [],
    th = function (a) {
      rh.c = a;
      H(1);
    },
    H = function (a) {
      var b = Date.now();
      rh.dt = b - ph;
      ph = b;
      0 == a && (oh = b);
      rh.e = a;
      rh.t = 0 == oh ? -1 : Math.floor(b - oh);
      rh.m = Id ? 1 : 0;
      b = window.document;
      b = "CSS1Compat" == b.compatMode ? b.documentElement : b.body;
      b = new Ef(b.clientWidth, b.clientHeight);
      rh.w = b.width > b.height ? 1 : 0;
      b = [];
      for (var c in rh) rh.hasOwnProperty(c) && b.push(c + ":" + rh[c]);
      c = b.join(",");
      b = 10 == a;
      var d = 0 <= nh.indexOf(a);
      Ld() && (c += "&ntp=1");
      b
        ? (b = le()) && (c += "&ved=" + b)
        : d &&
          (ie ||
            ((b = document.getElementById("hplogoshareved"))
              ? (ie = b.getAttribute("data-ved"))
              : Nd() && zd(Bd.g, "sved") && (ie = Bd.g.get("sved"))),
          (b = ie) && (c += "&ved=" + b));
      -1 == c.search("&ei=") && ((c += "&ei="), (b = ke()) && (c += b));
      for (
        window.google && window.google.log
          ? window.google.log("doodle", c)
          : Qb(c);
        0 < sh.length;

      )
        delete rh[sh.pop()];
      qh || 0 != a || Bg() || ((qh = !0), H(10));
    };
  var yh = function (a, b, c) {
    B.call(this);
    this.V = a;
    this.wa = b;
    this.Aa = c;
    this.T = Vd();
    this.ha = $d(document, "hidden");
    this.i = (this.O = $d(document, "visibilityState"))
      ? this.O.replace(/state$/i, "change").toLowerCase()
      : null;
    this.s = uh(this);
    this.H = !1;
    this.N = this.s;
    this.U = new Xg();
    Re(this, this.U);
    vh(this);
    wh(this);
    xh(this);
  };
  v(yh, B);
  var wh = function (a) {
      G(
        a.U,
        document,
        "mousedown mouseout touchstart mouseup mousemove touchend touchmove contextmenu keypress keydown keyup".split(
          " "
        ),
        function () {
          return zh(a);
        },
        !0
      );
    },
    vh = function (a) {
      a.i
        ? Ah(a)
        : Hd &&
          Bh(a, function () {
            Ah(a);
          });
    },
    Ah = function (a) {
      a.g = function () {
        a.s = uh(a);
        a.s ? Ch(a) : zh(a);
      };
      var b = window.agsa_ext;
      a.i
        ? document.addEventListener(a.i, a.g, !1)
        : b &&
          b.registerPageVisibilityListener &&
          (google.doodle || (google.doodle = {}),
          (google.doodle.pvc = function () {
            a.g && a.g();
          }),
          b.registerPageVisibilityListener("google.doodle.pvc();"));
    },
    Bh = function (a, b) {
      window.agsa_ext
        ? b()
        : (a.oa = setTimeout(function () {
            vh(a);
          }, 100));
    };
  yh.prototype.j = function () {
    clearTimeout(this.o);
    clearTimeout(this.oa);
    this.g &&
      (this.i && document.removeEventListener
        ? document.removeEventListener(this.i, this.g, !1)
        : window.agsa_ext &&
          window.agsa_ext.registerPageVisibilityListener &&
          (this.g = null));
    B.prototype.j.call(this);
  };
  var uh = function (a) {
      if (!a.ha && !a.O && window.agsa_ext && window.agsa_ext.getPageVisibility)
        return "hidden" == window.agsa_ext.getPageVisibility();
      var b = document[a.O];
      return document[a.ha] || "hidden" == b;
    },
    Ch = function (a) {
      var b = a.s || a.H;
      a.N && !b
        ? ((a.N = !1), a.Aa(), xh(a))
        : !a.N && b && ((a.N = !0), a.wa());
    },
    xh = function (a) {
      a.o && clearTimeout(a.o);
      a.o = setTimeout(function () {
        a.o = null;
        a.H = Vd() - a.T >= a.V;
        a.H || xh(a);
        Ch(a);
      }, Math.max(100, a.V - (Vd() - a.T)));
    },
    zh = function (a) {
      a.T = Vd();
      a.H = !1;
      Ch(a);
    };
  var Dh = function (a) {
    ye.call(this, a);
    this.image = new Image();
  };
  v(Dh, ye);
  Dh.prototype.preload = function () {
    var a = this;
    if (this.image.src) return Promise.resolve(this.image);
    var b,
      c = new Promise(function (e) {
        return (b = e);
      }),
      d = function () {
        a.j();
        b(a.image);
      };
    this.image.crossOrigin = "Anonymous";
    this.image.decode
      ? ((this.image.src = this.i),
        this.image.decode().then(d, function () {
          a.image.removeAttribute("crossOrigin");
          a.image.src = a.i;
          a.image.decode().then(d, function (e) {
            console.error(e);
            d();
          });
        }))
      : ((this.image.onload = d),
        (this.image.onerror = function () {
          a.image.removeAttribute("crossOrigin");
          a.image.removeAttribute("onerror");
          a.image.src = a.image.src;
        }),
        (this.image.src = this.i));
    (this.image.complete || "complete" == this.image.readyState) && d();
    return c;
  };
  var Eh = function (a, b) {
    var c = {},
      d = [];
    a = u(a);
    for (var e = a.next(); !e.done; e = a.next()) {
      e = e.value;
      var f = new Dh(e);
      d.push(f.preload());
      c[e] = f.image;
    }
    Promise.all(d).then(function () {
      return b(c);
    });
  };
  function Fh(a) {
    return a.constructor === Uint8Array
      ? a
      : a.constructor === ArrayBuffer
      ? new Uint8Array(a)
      : a.constructor === Array
      ? new Uint8Array(a)
      : a.constructor === String
      ? Gh(a)
      : a instanceof Uint8Array
      ? new Uint8Array(a.buffer, a.byteOffset, a.byteLength)
      : new Uint8Array(0);
  }
  var Ih = function (a) {
      this.i = null;
      this.g = this.H = this.s = 0;
      this.o = !1;
      a && Hh(this, a);
    },
    Hh = function (a, b) {
      a.i = Fh(b);
      a.s = 0;
      a.H = a.i.length;
      a.g = a.s;
    };
  Ih.prototype.reset = function () {
    this.g = this.s;
  };
  var Jh = function (a) {
    var b = a.i;
    var c = b[a.g + 0];
    var d = c & 127;
    if (128 > c) return (a.g += 1), d;
    c = b[a.g + 1];
    d |= (c & 127) << 7;
    if (128 > c) return (a.g += 2), d;
    c = b[a.g + 2];
    d |= (c & 127) << 14;
    if (128 > c) return (a.g += 3), d;
    c = b[a.g + 3];
    d |= (c & 127) << 21;
    if (128 > c) return (a.g += 4), d;
    c = b[a.g + 4];
    d |= (c & 15) << 28;
    if (128 > c) return (a.g += 5), d >>> 0;
    a.g += 5;
    128 <= b[a.g++] &&
      128 <= b[a.g++] &&
      128 <= b[a.g++] &&
      128 <= b[a.g++] &&
      a.g++;
    return d;
  };
  Ih.prototype.j = function () {
    return Jh(this);
  };
  Ih.prototype.N = function () {
    return this.j();
  };
  var Kh = [];
  var Lh = function (a) {
    if (Kh.length) {
      var b = Kh.pop();
      a && Hh(b, a);
      a = b;
    } else a = new Ih(a);
    this.g = a;
    this.i = this.o = -1;
    this.j = !1;
  };
  Lh.prototype.reset = function () {
    this.g.reset();
    this.i = this.o = -1;
  };
  var Mh = function (a) {
      var b = a.g;
      (b = b.g == b.H) ||
        (b = a.j) ||
        ((b = a.g), (b = b.o || 0 > b.g || b.g > b.H));
      if (b) return !1;
      b = Jh(a.g);
      var c = b & 7;
      if (0 != c && 5 != c && 1 != c && 2 != c && 3 != c && 4 != c)
        return (a.j = !0), !1;
      a.o = b >>> 3;
      a.i = c;
      return !0;
    },
    Nh = function (a) {
      switch (a.i) {
        case 0:
          if (0 != a.i) Nh(a);
          else {
            for (a = a.g; a.i[a.g] & 128; ) a.g++;
            a.g++;
          }
          break;
        case 1:
          1 != a.i ? Nh(a) : ((a = a.g), (a.g += 8));
          break;
        case 2:
          if (2 != a.i) Nh(a);
          else {
            var b = Jh(a.g);
            a = a.g;
            a.g += b;
          }
          break;
        case 5:
          5 != a.i ? Nh(a) : ((a = a.g), (a.g += 4));
          break;
        case 3:
          b = a.o;
          do {
            if (!Mh(a)) {
              a.j = !0;
              break;
            }
            if (4 == a.i) {
              a.o != b && (a.j = !0);
              break;
            }
            Nh(a);
          } while (1);
          break;
        default:
          a.j = !0;
      }
    },
    Oh = function (a, b) {
      var c = Jh(a.g);
      c = a.g.g + c;
      for (var d = []; a.g.g < c; ) d.push(b.call(a.g));
      return d;
    };
  var Ph = function () {
    this.g = [];
  };
  Ph.prototype.length = function () {
    return this.g.length;
  };
  Ph.prototype.end = function () {
    var a = this.g;
    this.g = [];
    return a;
  };
  var Qh = function (a, b) {
      for (; 127 < b; ) a.g.push((b & 127) | 128), (b >>>= 7);
      a.g.push(b);
    },
    Rh = function (a, b) {
      if (0 <= b) Qh(a, b);
      else {
        for (var c = 0; 9 > c; c++) a.g.push((b & 127) | 128), (b >>= 7);
        a.g.push(1);
      }
    };
  var Sh = {},
    Th = null,
    Gh = function (a) {
      var b = a.length,
        c = (3 * b) / 4;
      c % 3
        ? (c = Math.floor(c))
        : Cc("=.", a[b - 1]) && (c = Cc("=.", a[b - 2]) ? c - 2 : c - 1);
      var d = new Uint8Array(c),
        e = 0;
      Uh(a, function (f) {
        d[e++] = f;
      });
      return d.subarray(0, e);
    },
    Uh = function (a, b) {
      function c(k) {
        for (; d < a.length; ) {
          var l = a.charAt(d++),
            m = Th[l];
          if (null != m) return m;
          if (!/^[\s\xa0]*$/.test(l)) throw Error("y`" + l);
        }
        return k;
      }
      Vh();
      for (var d = 0; ; ) {
        var e = c(-1),
          f = c(0),
          g = c(64),
          h = c(64);
        if (64 === h && -1 === e) break;
        b((e << 2) | (f >> 4));
        64 != g &&
          (b(((f << 4) & 240) | (g >> 2)), 64 != h && b(((g << 6) & 192) | h));
      }
    },
    Vh = function () {
      if (!Th) {
        Th = {};
        for (
          var a =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
                ""
              ),
            b = ["+/=", "+/", "-_=", "-_.", "-_"],
            c = 0;
          5 > c;
          c++
        ) {
          var d = a.concat(b[c].split(""));
          Sh[c] = d;
          for (var e = 0; e < d.length; e++) {
            var f = d[e];
            void 0 === Th[f] && (Th[f] = e);
          }
        }
      }
    };
  var Wh = function () {
      this.j = [];
      this.i = 0;
      this.g = new Ph();
    },
    Xh = function (a, b) {
      Qh(a.g, 8 * b + 2);
      b = a.g.end();
      a.j.push(b);
      a.i += b.length;
      b.push(a.i);
      return b;
    },
    Yh = function (a, b) {
      var c = b.pop();
      for (c = a.i + a.g.length() - c; 127 < c; )
        b.push((c & 127) | 128), (c >>>= 7), a.i++;
      b.push(c);
      a.i++;
    };
  Wh.prototype.reset = function () {
    this.j = [];
    this.g.end();
    this.i = 0;
  };
  var Zh = function (a, b, c) {
    if (null != c && c.length) {
      b = Xh(a, b);
      for (var d = 0; d < c.length; d++) Rh(a.g, c[d]);
      Yh(a, b);
    }
  };
  var $h = function () {},
    ai = "function" == typeof Uint8Array,
    di = function (a, b, c) {
      a.s = null;
      b || (b = []);
      a.N = void 0;
      a.j = -1;
      a.g = b;
      a: {
        if ((b = a.g.length)) {
          --b;
          var d = a.g[b];
          if (
            !(
              null === d ||
              "object" != typeof d ||
              Array.isArray(d) ||
              (ai && d instanceof Uint8Array)
            )
          ) {
            a.o = b - a.j;
            a.i = d;
            break a;
          }
        }
        a.o = Number.MAX_VALUE;
      }
      a.H = {};
      if (c)
        for (b = 0; b < c.length; b++)
          (d = c[b]),
            d < a.o
              ? ((d += a.j), (a.g[d] = a.g[d] || bi))
              : (ci(a), (a.i[d] = a.i[d] || bi));
    },
    bi = [],
    ci = function (a) {
      var b = a.o + a.j;
      a.g[b] || (a.i = a.g[b] = {});
    },
    J = function (a, b) {
      if (b < a.o) {
        b += a.j;
        var c = a.g[b];
        return c !== bi ? c : (a.g[b] = []);
      }
      if (a.i) return (c = a.i[b]), c === bi ? (a.i[b] = []) : c;
    },
    ei = function (a, b, c) {
      a = J(a, b);
      return null == a ? c : a;
    },
    fi = function (a, b, c, d) {
      c !== d
        ? b < a.o
          ? (a.g[b + a.j] = c)
          : (ci(a), (a.i[b] = c))
        : b < a.o
        ? (a.g[b + a.j] = null)
        : (ci(a), delete a.i[b]);
    },
    gi = function (a) {
      if (a.s)
        for (var b in a.s) {
          var c = a.s[b];
          if (Array.isArray(c))
            for (var d = 0; d < c.length; d++) c[d] && gi(c[d]);
          else c && gi(c);
        }
      return a.g;
    };
  $h.prototype.toString = function () {
    return gi(this).toString();
  };
  var hi = function (a) {
    di(this, a, null);
  };
  ob(hi, $h);
  var ii = function () {
    var a = void 0 === a ? !1 : a;
    if (le() && ke()) return Promise.resolve();
    var b = "_fmt:jspb,doodle:174786555,slot:0,type:3,cta:1";
    Ld() && (b += ",ntp:1");
    if (le() || a) b += ",impr:0";
    a = new od();
    a.add("async", b);
    return we(new xe("ddllog", 1), a, void 0, !1)
      .then(function (c) {
        c = new hi(c);
        if (!le() && J(c, 2)) {
          var d = J(c, 2);
          he = new id(d).g.get("ved", "");
        }
        !ke() && J(c, 3) && (je = J(c, 3));
      })
      .catch(function () {
        return Promise.resolve();
      });
  };
  var ji = {
    ad: ["ca"],
    ae: ["ar", "en", "fa", "hi", "ur"],
    af: ["ps", "fa"],
    ag: ["en"],
    ai: ["en"],
    al: ["sq", "en"],
    am: ["hy", "ru"],
    ao: ["pt-PT"],
    ar: ["es-419", "es"],
    as: ["en"],
    at: ["de"],
    au: ["en"],
    az: ["az", "ru"],
    ba: ["bs", "hr", "sr"],
    bd: ["bn", "en"],
    be: ["nl", "de", "en", "fr"],
    bf: ["fr"],
    bg: ["bg"],
    bh: ["ar", "en"],
    bi: ["fr"],
    bj: ["fr"],
    bn: ["ms", "en", "zh-CN"],
    bo: ["es-419", "es"],
    br: ["pt-BR", "en"],
    bs: ["en"],
    bt: ["en"],
    bw: ["tn", "en"],
    by: ["be", "ru"],
    bz: ["en", "es", "es-419"],
    ca: ["en", "fr", "fr-CA"],
    cd: ["fr", "sw"],
    cf: ["fr"],
    cg: ["fr"],
    ch: ["de", "en", "fr", "it"],
    ci: ["fr"],
    ck: ["en"],
    cl: ["es-419", "es"],
    cm: ["fr", "en"],
    cn: ["zh-CN"],
    co: ["es-419", "es"],
    cr: ["es-419", "en", "es"],
    cu: ["es-419", "es"],
    cv: ["pt-PT"],
    cy: ["en", "el", "tr"],
    cz: ["cs"],
    de: ["de", "en", "fr"],
    dj: ["fr", "ar", "so"],
    dk: ["da"],
    dm: ["en"],
    do: ["es-419", "es"],
    dz: ["fr", "ar"],
    ec: ["es-419", "es"],
    ee: ["et", "ru"],
    eg: ["ar", "en"],
    es: ["es", "ca", "en", "eu", "gl"],
    et: ["am", "en", "so"],
    fi: ["fi", "sv"],
    fj: ["en"],
    fr: ["fr"],
    ga: ["fr"],
    ge: ["ka", "en"],
    gg: ["en", "fr"],
    gh: ["en"],
    gi: ["en", "es", "it", "pt-PT"],
    gl: ["da", "en"],
    gm: ["en", "wo"],
    gr: ["el"],
    gt: ["es-419", "es"],
    gy: ["en"],
    hk: ["zh-TW", "en", "zh-CN", "zh-HK"],
    hn: ["es-419", "es"],
    hr: ["hr"],
    ht: ["fr", "en", "ht"],
    hu: ["hu"],
    id: ["id", "en", "nl"],
    ie: ["en-GB", "ga"],
    il: ["iw", "ar", "en"],
    im: ["en"],
    in: "en bn gu hi kn ml mr ne or pa ta te".split(" "),
    iq: ["ar", "en"],
    is: ["is", "en"],
    it: ["it", "en"],
    je: ["en", "fr"],
    jm: ["en"],
    jo: ["ar", "en"],
    jp: ["ja"],
    ke: ["sw", "en"],
    kg: ["ky", "ru"],
    kh: ["km", "en"],
    ki: ["en"],
    kr: ["ko"],
    kw: ["ar", "en"],
    kz: ["kk", "ru"],
    la: ["lo", "en"],
    lb: ["ar", "en", "fr", "hy"],
    lk: ["en", "si", "ta"],
    ls: ["st", "en", "zu"],
    lt: ["lt"],
    lu: ["de", "fr"],
    lv: ["lv", "lt", "ru"],
    ly: ["ar", "en", "it"],
    ma: ["fr", "ar"],
    md: ["ro", "ro-MD", "ru"],
    me: ["sr-ME", "bs", "sr"],
    mg: ["mg", "fr"],
    mk: ["mk"],
    ml: ["fr"],
    mm: ["my", "en"],
    mn: ["mn"],
    mt: ["mt", "en"],
    mu: ["en", "fr"],
    mv: ["en"],
    mw: ["ny", "en"],
    mx: ["es-419", "es"],
    my: ["en", "ms"],
    mz: ["pt-PT", "ny", "sn", "sw"],
    na: ["en", "af", "de"],
    ne: ["fr"],
    ng: ["en"],
    ni: ["es-419", "en", "es"],
    nl: ["nl", "en"],
    no: ["no", "nn"],
    np: ["ne", "en"],
    nr: ["en"],
    nu: ["en"],
    nz: ["en-GB"],
    om: ["ar", "en"],
    pa: ["es-419", "en", "es"],
    pe: ["es-419", "es"],
    pg: ["en"],
    ph: ["en"],
    pk: ["en", "pa", "ur"],
    pl: ["pl"],
    pn: ["en"],
    pr: ["es-419", "en", "es"],
    ps: ["ar", "en"],
    pt: ["pt-PT"],
    py: ["es-419", "es"],
    qa: ["ar", "en"],
    ro: ["ro", "de", "hu"],
    rs: ["sr", "sr-Latn"],
    ru: ["ru"],
    rw: ["en", "fr", "sw"],
    sa: ["ar", "en"],
    sb: ["en"],
    sc: ["crs", "en", "fr"],
    se: ["sv"],
    sg: ["en", "ms", "ta", "zh-CN"],
    si: ["sl"],
    sk: ["sk", "hu"],
    sl: ["en"],
    sm: ["it"],
    sn: ["fr", "wo"],
    so: ["so", "ar", "en"],
    sr: ["nl", "en"],
    st: ["pt-PT"],
    sv: ["es-419", "es"],
    td: ["fr", "ar"],
    tg: ["fr"],
    th: ["th", "en"],
    tj: ["tg", "ru"],
    tl: ["pt-PT", "en", "id"],
    tm: ["tk", "ru", "uz"],
    tn: ["ar", "fr"],
    to: ["en"],
    tr: ["tr"],
    tt: "en es es-419 fr hi zh-TW".split(" "),
    tw: ["zh-TW", "en"],
    tz: ["sw", "en"],
    ua: ["uk", "ru"],
    ug: ["en"],
    uk: ["en-GB"],
    us: ["en", "es", "es-419", "zh-CN"],
    uy: ["es-419", "es"],
    uz: ["uz", "ru"],
    vc: ["en"],
    ve: ["es-419", "es"],
    vi: ["en"],
    vn: ["vi", "en", "fr", "zh-TW"],
    vu: ["en", "fr"],
    ws: ["en"],
    za: ["en", "af", "st", "tn", "zu"],
    zm: ["en", "ny", "sn"],
    zw: ["en", "ny", "sn", "tn", "zu"],
  };
  var ki = function () {
    this.g = this.i = null;
  };
  ki.prototype.load = function (a, b, c, d) {
    var e = this;
    a = li(this, a, b, c);
    if (null == a) return Promise.resolve();
    var f = d + "messages." + a + ".nocache.json",
      g = new If();
    g.wa = "text";
    return new Promise(function (h, k) {
      nf(g, "success", function () {
        try {
          var l = g.g ? g.g.responseText : "";
        } catch (m) {
          l = "";
        }
        e.i = JSON.parse(l.substring(5));
        h();
      });
      nf(g, "error", k);
      Mf(g, f);
    });
  };
  var L = function (a) {
      var b = ki.W();
      if (null == b.i) throw Error("z");
      a = void 0 === b.i[a] ? "" : b.i[a];
      for (var c = (b = 0), d = !1, e = a.split(ic), f = 0; f < e.length; f++) {
        var g = e[f];
        gc.test(g)
          ? (b++, c++)
          : hc.test(g)
          ? (d = !0)
          : fc.test(g)
          ? c++
          : jc.test(g) && (d = !0);
      }
      b = 0 == c ? (d ? 1 : 0) : 0.4 < b / c ? -1 : 1;
      return 1 == b
        ? "\u202a" + a + "\u202c"
        : -1 == b
        ? "\u202b" + a + "\u202c"
        : a;
    },
    li = function (a, b, c, d) {
      var e = b + "-" + c;
      if (d.includes(e)) return (a.g = b), e;
      if (b && d.includes(b)) return (a.g = b);
      if (c && ji[c])
        for (b = u(ji[c]), c = b.next(); !c.done; c = b.next())
          if (((c = c.value), d.includes(c))) return (a.g = c), a.g;
      return d.includes("en") ? ((a.g = "en"), a.g) : (a.g = null);
    };
  cb(ki);
  var mi = function (a, b) {
    b = void 0 === b ? 50 : b;
    B.call(this);
    this.o = a;
    this.H = b;
    this.s = 0;
    this.i = this.g = !1;
    this.o = a;
  };
  v(mi, B);
  mi.prototype.start = function () {
    this.s = Date.now();
    var a = !this.i && !this.g;
    this.i = !1;
    this.g = !0;
    a && ni(this);
  };
  var ni = function (a) {
      a.i
        ? (a.i = !1)
        : (requestAnimationFrame(function () {
            return ni(a);
          }),
          oi(a));
    },
    oi = function (a) {
      var b = Date.now(),
        c = b - a.s;
      0 > c || ((c = a.H ? Math.min(c, a.H) : c), (a.s = b), a.o(c));
    };
  mi.prototype.j = function () {
    this.g && ((this.i = !0), (this.g = !1));
    B.prototype.j.call(this);
  };
  var pi = function (a) {
      if (Ed) {
        a = u(a);
        for (var b = a.next(); !b.done; b = a.next())
          lf(
            b.value,
            "touchmove",
            function (c) {
              1 !== c.scale && c.preventDefault();
            },
            {
              passive: !1,
            }
          );
      }
    },
    qi = null,
    si = function (a) {
      Ld() &&
        (ri(),
        (qi = lf(window, "resize", function () {
          a.o(50);
        })));
    },
    ri = function () {
      Ld() && qi && (uf(qi), (qi = null));
    };
  var ti = function (a) {
      return 0 == a.indexOf("//") ? "https:" + a : a;
    },
    ui = function () {
      return null != window.agsa_ext && null != window.agsa_ext.share;
    },
    wi = function (a, b, c) {
      c = void 0 === c ? ce : c;
      a = ti(a);
      return vi("mailto:", {
        subject: c,
        body: b + "\n" + a,
      });
    },
    vi = function (a, b) {
      var c = new od(),
        d;
      for (d in b) c.add(d, b[d]);
      a = new id(a);
      ld(a, c);
      return a.toString();
    },
    xi = function (a, b) {
      return Oa(function (c) {
        if (be()) return c.return(Promise.reject());
        H(16);
        return c.return(vg(a, b));
      });
    };
  var yi = function () {
    this.g = {};
    this.i = 0;
    this.j = document.body;
  };
  yi.prototype.reset = function () {
    for (var a in this.g) zi(this, a);
    this.g = {};
  };
  var zi = function (a, b) {
      if ((a = a.g[b]))
        a.nb && (clearTimeout(a.nb), (a.nb = 0)),
          a.Na &&
            (a.Na.parentNode && a.Na.parentNode.removeChild(a.Na),
            (a.Na = null)),
          (a.Rb = null),
          (a.Za = null);
    },
    Bi = function (a, b, c, d) {
      var e = 2e3;
      e = void 0 === e ? 4e3 : e;
      var f = a.g[b];
      if (f) {
        if (f.mb) {
          c && c(f.mb);
          return;
        }
        if (f.nb) return;
      } else
        f = {
          Za: d,
          Bd: b,
          Na: null,
          Rb: c,
          nb: 0,
          mb: null,
        };
      f.Na || (f.Na = document.createElement("script"));
      c = "c" + ++a.i;
      Ai[c] = function (g) {
        var h = yi.W(),
          k = f;
        k.mb = g.id;
        k.mb ? k.Rb && k.Rb(k.mb) : k.Za && k.Za();
        zi(h, k.Bd);
      };
      c = tc({
        callback: "google.doodle.lsc." + c,
        url: b,
      });
      $c(f.Na, c);
      f.nb = setTimeout(function () {
        f.Za && f.Za();
        zi(yi.W(), b);
      }, e);
      a.j.appendChild(f.Na);
      a.g[b] = f;
    };
  cb(yi);
  var Ai = {};
  nb("google.doodle.lsc", Ai);
  var Ci = function (a, b) {
      this.g = [];
      this.i = [];
      b = u(b);
      for (var c = b.next(); !c.done; c = b.next()) {
        var d = c.value;
        c = new Dh(a + d.filename);
        d = d.size;
        this.g.push(c);
        this.i.push(d);
      }
    },
    Di = function (a) {
      return "number" === typeof a ? a : a[0];
    };
  Ci.prototype.preload = function (a, b) {
    var c = this.g[Di(a)];
    return new Promise(function (d) {
      ze(c, d);
      c.preload();
    }).then(function () {
      return b && b();
    });
  };
  var Ei = function (a, b, c, d, e) {
      var f = c[1],
        g = c[2],
        h = c[3],
        k = c[4];
      var l = f;
      var m = g;
      var r = h;
      var p = k;
      var x = h;
      var y = k;
      if (l < f) {
        var A = f - l;
        l = f;
        r -= A;
        d += A;
        x -= A;
      }
      m < g && ((A = g - m), (m = g), (p -= A), (e += A), (y -= A));
      l + r > f + h && ((f = l + r - (f + h)), (r -= f), (x -= f));
      m + p > g + k && ((g = m + p - (g + k)), (p -= g), (y -= g));
      a = a.g[Di(c)];
      if (!a.s) throw Error("A");
      0 < r && 0 < p && b.drawImage(a.image, l, m, r, p, d, e, x, y);
    },
    Gi = function (a, b, c, d, e) {
      e = void 0 === e ? 1 : e;
      c = void 0 === c ? 0 : c;
      d = void 0 === d ? 0 : d;
      var f = e;
      f = void 0 === f ? 1 : f;
      var g = b[5] || 1;
      return (
        "url(" +
        a.g[Di(b)].i +
        ") " +
        (-((f * b[1]) / g + (void 0 === c ? 0 : c)) +
          "px " +
          -((f * b[2]) / g + (void 0 === d ? 0 : d)) +
          "px/") +
        Fi(a, b, e) +
        " no-repeat"
      );
    },
    N = function (a, b, c) {
      return Gi(a, b, 0, 0, c / Math.max(b[3], b[4]));
    },
    Fi = function (a, b, c) {
      c = void 0 === c ? 1 : c;
      var d = b[5] || 1;
      a = a.i[Di(b)];
      return (c * a[0]) / d + "px " + (c * a[1]) / d + "px";
    },
    Hi = function (a) {
      var b = O.W(),
        c = document.createElement("div");
      z(c, "position", "absolute");
      z(
        c,
        "userSelect",
        "none",
        "MozUserSelect",
        "none",
        "webkitUserSelect",
        "none",
        "webkitTapHighlightColor",
        "rgba(0,0,0,0)"
      );
      c.unselectable = "on";
      var d = a[3],
        e = a[4],
        f = a[5] || 1;
      f &&
        1 != f &&
        b.i[Di(a)] &&
        ((d = Math.floor(d / f)), (e = Math.floor(e / f)));
      z(c, "width", d + "px", "height", e + "px");
      a = [c, Gi(b, a), Fi(b, a)];
      b = a[0];
      c = a[2];
      z(b, "background", a[1]);
      c && z(b, "backgroundSize", c);
      return b;
    };
  var Ii = function (a) {
    ye.call(this, a);
    this.H = this.g = this.N = null;
  };
  v(Ii, ye);
  Ii.prototype.preload = function () {
    var a = this,
      b,
      c = new Promise(function (d) {
        return (b = d);
      });
    if (this.N || this.g) return Promise.resolve();
    this.g = Nf(this.i, function () {
      a.j();
      b();
    });
    return c;
  };
  Ii.prototype.j = function () {
    var a = this;
    this.g &&
      Vf(this.g) &&
      ((this.N = cg(this.g)),
      this.g.wb(),
      (this.g = null),
      (this.H = new Image()),
      (this.H.onload = function () {
        return ye.prototype.j.call(a);
      }),
      (this.H.src =
        "data:image/svg+xml;utf-8," +
        encodeURIComponent(new XMLSerializer().serializeToString(this.N))));
  };
  var Ji = function (a, b) {
    this.g = b.map(function (c) {
      return new Ii(a + c);
    });
  };
  Ji.prototype.preload = function (a, b) {
    var c = "number" == typeof a ? this.g[a] : this.g[a[0]];
    return new Promise(function (d) {
      ze(c, d);
      c.preload();
    }).then(function () {
      return b && b();
    });
  };
  function Ki(a, b, c, d) {
    var e = void 0 === e ? 10 : e;
    for (
      a.style.fontSize = b + "px";
      (a.offsetWidth > c || a.offsetHeight > d) && b > e;

    )
      b--, (a.style.fontSize = b + "px");
  }
  var Li = function () {
      this.i = this.j = !1;
    },
    Mi = function (a, b) {
      a.j || (a.Ab(), (a.j = !0));
      a.Da() ? a.i || (a.Qb(), (a.i = !0)) : a.hb(b);
    };
  q = Li.prototype;
  q.Da = function () {
    return !0;
  };
  q.Ab = function () {};
  q.hb = function () {};
  q.Qb = function () {};
  q.reset = function () {
    this.i = this.j = !1;
  };
  var Ni = function (a) {
    Li.call(this);
    this.o = a;
    this.g = !1;
  };
  v(Ni, Li);
  Ni.prototype.Ab = function () {
    var a = this;
    Li.prototype.Ab.call(this);
    this.o.then(function () {
      return (a.g = !0);
    });
  };
  Ni.prototype.Da = function () {
    return this.g;
  };
  var Oi = function (a) {
    Li.call(this);
    this.g = a;
  };
  v(Oi, Li);
  Oi.prototype.Qb = function () {
    Li.prototype.Qb.call(this);
    this.g();
  };
  var Pi = function (a, b) {
    Li.call(this);
    this.g = a;
    this.o = b;
  };
  v(Pi, Li);
  Pi.prototype.Ab = function () {
    this.g.start();
  };
  Pi.prototype.hb = function (a) {
    var b = this.g;
    null !== b.g &&
      ((b.j += a),
      pe(b) &&
        (b.N && !b.i
          ? null === b.g ||
            b.i ||
            ((a = Math.min(b.duration, ne(b))),
            (b.g = b.s() - (b.duration - a)),
            (b.i = !0))
          : b.o && b.i && (b.i = !1),
        b.N || b.o)) &&
      ((b.g = 0), (b.j %= b.duration));
    this.o(oe(this.g));
  };
  Pi.prototype.Da = function () {
    return !this.g.o && pe(this.g);
  };
  Pi.prototype.reset = function () {
    Li.prototype.reset.call(this);
    this.g.reset();
  };
  var Qi = function (a) {
    Li.call(this);
    this.o = a;
    this.g = 0;
  };
  v(Qi, Li);
  Qi.prototype.hb = function (a) {
    this.g += a;
  };
  Qi.prototype.Da = function () {
    return this.g >= this.o;
  };
  Qi.prototype.reset = function () {
    Li.prototype.reset.call(this);
    this.g = 0;
  };
  var Ri = function (a, b) {
    b = void 0 === b ? !1 : b;
    Li.call(this);
    this.g = a;
    this.o = b;
    this.s = a.slice();
  };
  v(Ri, Li);
  Ri.prototype.Da = function () {
    return !this.g.length;
  };
  Ri.prototype.hb = function (a) {
    if (0 < this.g.length && 0 < a) {
      var b = this.g[0];
      Mi(b, a);
      b.Da() && this.g.length && this.g[0] === b && this.g.shift();
    }
    this.Da() && this.o && this.reset();
  };
  Ri.prototype.reset = function () {
    Li.prototype.reset.call(this);
    this.g = this.s.slice();
    for (var a = u(this.g), b = a.next(); !b.done; b = a.next())
      b.value.reset();
  };
  var Si = function (a) {
    Li.call(this);
    this.g = a;
  };
  v(Si, Li);
  Si.prototype.Da = function () {
    for (var a = u(this.g), b = a.next(); !b.done; b = a.next())
      if (!b.value.Da()) return !1;
    return !0;
  };
  Si.prototype.hb = function (a) {
    if (!this.Da())
      for (var b = u(this.g), c = b.next(); !c.done; c = b.next())
        Mi(c.value, a);
  };
  Si.prototype.reset = function () {
    Li.prototype.reset.call(this);
    for (var a = u(this.g), b = a.next(); !b.done; b = a.next())
      b.value.reset();
  };
  var eg = function () {
    dg.call(this, ng, P);
  };
  v(eg, dg);
  var ng = {};
  ng.Zb = new rg("./", "sounds");
  var P = {};
  P.mc = new E(0, 240);
  P.nc = new E(1240, 249.22900390625);
  P.oc = new E(2489.22900390625, 237.23399353027344);
  P.qc = new E(3726.462890625, 243.58299255371094);
  P.tc = new E(4970.044921875, 354.6940002441406);
  P.uc = new E(6324.73876953125, 1158.050048828125);
  P.Ca = new E(8482.7890625, 67.75499725341797);
  P.wc = new E(9550.5439453125, 96.16799926757812);
  P.xc = new E(10646.7119140625, 118.54900360107422);
  P.yc = new E(11765.2607421875, 117.14299774169922);
  P.zc = new E(12882.404296875, 243.89999389648438);
  P.Ac = new E(14126.3037109375, 225.6009979248047);
  P.Bc = new E(15351.9052734375, 327.0069885253906);
  P.Cc = new E(16678.912109375, 336.4169921875);
  P.Dc = new E(18015.328125, 2926.59912109375);
  P.Ec = new E(21941.927734375, 249.2969970703125);
  P.Fc = new E(23191.224609375, 282.5849914550781);
  P.Gc = new E(24473.810546875, 275.510009765625);
  P.Hc = new E(25749.3203125, 219.04800415039062);
  P.Ic = new E(26968.3671875, 182.33599853515625);
  P.Xb = new E(28150.703125, 239.88699340820312);
  P.Lc = new E(29390.58984375, 489.13800048828125);
  P.Yb = new E(30879.728515625, 752.7659912109375);
  P.Jb = new E(32632.494140625, 1376.824951171875);
  P.Mc = new E(35009.3203125, 117.14299774169922);
  P.Nc = new E(36126.46484375, 245.48800659179688);
  P.Oc = new E(37371.94921875, 223.89999389648438);
  P.Pc = new E(38595.8515625, 152.5399932861328);
  P.Qc = new E(39748.390625, 260);
  P.Rc = new E(41008.390625, 160.13600158691406);
  P.Sc = new E(42168.52734375, 216.55299377441406);
  P.Tc = new E(43385.078125, 103.6729965209961);
  P.Uc = new E(44488.75390625, 181.9949951171875);
  P.Vc = new E(45670.74609375, 187.39199829101562);
  P.Wc = new E(46858.140625, 171.81399536132812);
  P.Xc = new E(48029.953125, 254.67100524902344);
  P.Yc = new E(49284.625, 220);
  P.Zc = new E(50504.625, 231.04299926757812);
  P.$c = new E(51735.66796875, 344.0820007324219);
  P.hd = new E(53079.75, 365.9179992675781);
  P.jd = new E(54445.66796875, 372.8340148925781);
  P.kd = new E(55818.50390625, 428.2309875488281);
  P.ld = new E(57246.734375, 269.6600036621094);
  P.nd = new E(58516.39453125, 364.0360107421875);
  P.od = new E(59880.4296875, 250);
  cb(eg);
  var Ti =
    "en af sq am ar hy az eu be bn bs bg my ca zh-HK zh-CN zh-TW hr cs da nl en-GB et fa fil fi fr fr-ca gl ka de el gu iw hi hu is id it ja kn kk km ko ky lo lv lt mk ms ml mr mn ne no pl pt-BR pt-PT pa ro ru sr si-LK sk sl es-419 es sw sv ta te th tr uk ur uz vi zu".split(
      " "
    );
  var Ui = {},
    Vi = function () {
      throw Error("B");
    };
  Vi.prototype.bc = null;
  Vi.prototype.toString = function () {
    return this.Sb;
  };
  var Wi = function () {
    Vi.call(this);
  };
  ob(Wi, Vi);
  Wi.prototype.hc = Ui;
  var Xi = (function (a) {
      function b(c) {
        this.Sb = c;
      }
      b.prototype = a.prototype;
      return function (c, d) {
        c = new b(String(c));
        void 0 !== d && (c.bc = d);
        return c;
      };
    })(Wi),
    Q = function (a) {
      if (null != a && a.hc === Ui) {
        var b = String;
        a = String(a.Sb).replace(Yi, "").replace(Zi, "&lt;");
        b = b(a).replace($i, aj);
      } else b = String(a).replace(bj, aj);
      return b;
    },
    cj = {
      "\x00": "&#0;",
      "\t": "&#9;",
      "\n": "&#10;",
      "\x0B": "&#11;",
      "\f": "&#12;",
      "\r": "&#13;",
      " ": "&#32;",
      '"': "&quot;",
      "&": "&amp;",
      "'": "&#39;",
      "-": "&#45;",
      "/": "&#47;",
      "<": "&lt;",
      "=": "&#61;",
      ">": "&gt;",
      "`": "&#96;",
      "\u0085": "&#133;",
      "\u00a0": "&#160;",
      "\u2028": "&#8232;",
      "\u2029": "&#8233;",
    },
    aj = function (a) {
      return cj[a];
    },
    bj = /[\x00\x22\x26\x27\x3c\x3e]/g,
    $i = /[\x00\x22\x27\x3c\x3e]/g,
    Yi = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    Zi = /</g;
  var ej = function (a) {
      var b = a(dj, void 0);
      a = qb || (qb = new Gf());
      a = Ff(a.g, "DIV");
      if (eb(b))
        if (b instanceof Vi) {
          if (b.hc !== Ui) throw Error("C");
          b = Wc(b.toString(), b.bc || null);
        } else b = Xc("zSoyz");
      else b = Xc(String(b));
      if (Zc()) for (; a.lastChild; ) a.removeChild(a.lastChild);
      a.innerHTML = Vc(b);
      1 == a.childNodes.length &&
        ((b = a.firstChild), 1 == b.nodeType && (a = b));
      return a;
    },
    dj = {};
  var fj = function () {
      return Xi(
        '<div class="' +
          Q("ddlmdsb-o") +
          '"><div class="' +
          Q("ddlmdsb-q") +
          '"></div><div class="' +
          Q("ddlmdsb-r") +
          '"></div><div class="' +
          Q("ddlmdsb-s") +
          '"></div><div class="' +
          Q("ddlmdsb-t") +
          '"></div><div class="' +
          Q("ddlmdsb-u") +
          '"></div></div>'
      );
    },
    gj = function () {
      return Xi(
        '<span class="' +
          Q("ddlmdsb-k") +
          '"><div class="' +
          Q("ddlmdsb-l") +
          '"><div class="' +
          Q("ddlmdsb-m") +
          '"></div></div></span>'
      );
    },
    hj = function () {
      return Xi(
        '<div class="' +
          Q("ddlmdsb-y") +
          '"><div class="' +
          Q("ddlmdsb-B") +
          '"></div><div class="' +
          Q("introElements") +
          '"><div class="' +
          Q("ddlmdsb-E") +
          '"><div class="' +
          Q("ddlmdsb-F") +
          '"></div><div class="' +
          Q("ddlmdsb-G") +
          '"></div><div class="' +
          Q("ddlmdsb-H") +
          '"></div><div class="' +
          Q("ddlmdsb-I") +
          '"></div><div class="' +
          Q("ddlmdsb-J") +
          '"></div><div class="' +
          Q("ddlmdsb-K") +
          '"></div><div class="' +
          Q("ddlmdsb-L") +
          '"></div><div class="' +
          Q("ddlmdsb-M") +
          '"></div><div class="' +
          Q("ddlmdsb-N") +
          '"></div></div><div class="' +
          Q("ddlmdsb-C") +
          '"></div><div class="' +
          Q("ddlmdsb-D") +
          '"></div></div></div>'
      );
    },
    ij = function () {
      return Xi(
        '<span class="' +
          Q("ddlmdsb-hb") +
          '"><canvas class="' +
          Q("ddlmdsb-gb") +
          '"></canvas><div class="' +
          Q("ddlmdsb-jb") +
          '"><div class="' +
          Q("ddlmdsb-kb") +
          '"><button class="' +
          Q("ddlmdsb-mb") +
          '"></button><button class="' +
          Q("ddlmdsb-nb") +
          '"></button><button class="' +
          Q("ddlmdsb-lb") +
          '"></button></div><div class="' +
          Q("ddlmdsb-ob") +
          '"><button class="' +
          Q("ddlmdsb-pb") +
          '"></button></div><div class="' +
          Q("ddlmdsb-ib") +
          '"><div class="' +
          Q("ddlmdsb-tb") +
          '"><div class="' +
          Q("ddlmdsb-ub") +
          '"></div><div class="' +
          Q("ddlmdsb-vb") +
          '"></div><div class="' +
          Q("ddlmdsb-wb") +
          '"></div></div><div class="' +
          Q("ddlmdsb-xb") +
          '"><button class="' +
          Q("clear") +
          '"></button><button class="' +
          Q("undo") +
          '"></button></div><div class="' +
          Q("ddlmdsb-yb") +
          '"><button class="' +
          Q("ddlmdsb-zb") +
          '"></button><div class="' +
          Q("ddlmdsb-Bb") +
          '"></div><button class="' +
          Q("ddlmdsb-Ab") +
          '"></button></div></div><div class="' +
          Q("ddlmdsb-Q") +
          '"><div class="' +
          Q("ddlmdsb-R") +
          '"><button class="' +
          Q("ddlmdsb-V") +
          '"></button><div class="' +
          Q("ddlmdsb-W") +
          '"></div></div></div></div></span>'
      );
    },
    jj = function () {
      return Xi(
        '<div class="' +
          Q("ddlmdsb-Y") +
          '"><div class="' +
          Q("ddlmdsb-ab") +
          '"></div><div class="' +
          Q("ddlmdsb-bb") +
          '"></div><button class="' +
          Q("ddlmdsb-cb") +
          '"><span></span></button><button class="' +
          Q("ddlmdsb-db") +
          '"><span></span></button></div>'
      );
    },
    kj = function () {
      return Xi(
        '<span class="' +
          Q("ddlmdsb-Fb") +
          '"><div class="' +
          Q("ddlmdsb-Gb") +
          '"><canvas class="' +
          Q("ddlmdsb-Hb") +
          '"></canvas><div class="' +
          Q("ddlmdsb-Kb") +
          '"><span class="' +
          Q("ddlmdsb-Nb") +
          '"></span></div></div></span>'
      );
    },
    lj = function () {
      return Xi(
        '<div class="' +
          Q("ddlmdsb-Ob") +
          '"><span class="' +
          Q("ddlmdsb-Pb") +
          '"><button class="' +
          Q("ddlmdsb-Qb") +
          '"></button><div class="' +
          Q("ddlmdsb-Tb") +
          '"><span class="' +
          Q("ddlmdsb-Ub") +
          '"></span><span class="' +
          Q("ddlmdsb-Vb") +
          '"></span></div><span class="' +
          Q("ddlmdsb-Wb") +
          '"><button class="' +
          Q("searchButton") +
          '"></button></span></span></div>'
      );
    },
    mj = function () {
      return Xi(
        '<div class="' +
          Q("ddlmdsb-Ob") +
          '"><span class="' +
          Q("ddlmdsb-Pb") +
          '"><button class="' +
          Q("ddlmdsb-Qb") +
          '"></button><div class="' +
          Q("ddlmdsb-Sb") +
          '"><button class="' +
          Q("searchButton") +
          '"></button><button class="' +
          Q("facebookButton") +
          '" style="display:none"></button><button class="' +
          Q("twitterButton") +
          '"></button><a class="' +
          Q("ddlmdsb-Rb") +
          '" style="display:none"></a></div></span><div class="' +
          Q("ddlmdsb-Xb") +
          '" style="display:none"><div class="' +
          Q("ddlmdsb-cc") +
          '"><span></span></div><button class="' +
          Q("ddlmdsb-Yb") +
          '"></button><input class="' +
          Q("ddlmdsb-Zb") +
          '" readonly/></div></div>'
      );
    },
    nj = function () {
      return Xi(
        '<div class="' +
          Q("ddlmdsb-rc") +
          '"><div class="' +
          Q("ddlmdsb-ub") +
          '"></div><div class="' +
          Q("ddlmdsb-vb") +
          '"></div><div class="' +
          Q("ddlmdsb-wb") +
          '"></div></div>'
      );
    },
    oj = function () {
      return Xi(
        '<div class="' +
          Q("ddlmdsb-gc") +
          '"><div class="' +
          Q("ddlmdsb-qc") +
          '"></div></div>'
      );
    },
    pj = function () {
      return Xi(
        '<div class="' +
          Q("ddlmdsb-ec") +
          '"><div class="' +
          Q("ddlmdsb-fc") +
          '"><canvas class="' +
          Q("ddlmdsb-hc") +
          '"></canvas><div class="' +
          Q("ddlmdsb-jc") +
          '"><div class="' +
          Q("ddlmdsb-ic") +
          '"><button class="' +
          Q("ddlmdsb-nc") +
          '"><span class="' +
          Q("ddlmdsb-Ub") +
          '"></span><span class="' +
          Q("ddlmdsb-Vb") +
          '"></span></button><button class="' +
          Q("ddlmdsb-oc") +
          '"><span></span></button></div></div><div class="' +
          Q("ddlmdsb-v") +
          '"></div></div></div>'
      );
    };
  var qj = function () {
      this.g = ej(nj);
    },
    rj = function (a) {
      a.g.classList.remove("ddlmdsb-uc");
      a.g.classList.add("ddlmdsb-sc");
    },
    sj = function (a) {
      a.g.classList.remove("ddlmdsb-sc");
      a.g.classList.add("ddlmdsb-uc");
    };
  qj.prototype.remove = function () {
    this.g.parentElement && this.g.parentElement.removeChild(this.g);
  };
  var O = function () {
    Ci.call(this, "./", tj);
  };
  v(O, Ci);
  cb(O);
  var tj = [
      {
        filename: "loader-sprite.png",
        size: [154, 103],
      },
      {
        filename: "main-sprite.png",
        size: [1663, 1789],
      },
    ],
    uj = [1, 622, 1585, 102, 102],
    Kj = [1, 1096, 1473, 180, 81],
    Lj = [1, 1422, 1583, 102, 102],
    Mj = [1, 993, 1176, 295, 81],
    Nj = [1, 203, 1430, 103, 102],
    Oj = [1, 516, 1530, 103, 102],
    Pj = [1, 203, 1535, 103, 102],
    Qj = [1, 709, 111, 410, 294],
    Rj = [1, 1386, 695, 216, 81],
    Sj = [1, 1246, 1389, 215, 81],
    Tj = [1, 1096, 1557, 103, 102],
    Uj = [1, 1527, 1583, 102, 102],
    Vj = [1, 1279, 1473, 140, 158],
    Wj = [0, 92, 0, 35, 73],
    Xj = [1, 1122, 227, 112, 36],
    Yj = [1, 1408, 1688, 72, 68],
    Zj = [1, 1605, 750, 50, 57],
    ak = [1, 640, 1231, 28, 30],
    bk = [1, 632, 1741, 44, 44],
    ck = [1, 1122, 381, 23, 23],
    dk = [1, 1246, 1319, 41, 41],
    ek = [1, 1524, 779, 50, 37],
    fk = [1, 640, 1197, 30, 31],
    gk = [1, 640, 1160, 34, 34],
    hk = [1, 1246, 1260, 41, 56],
    ik = [1, 1624, 1688, 39, 37],
    jk = [0, 130, 0, 24, 24],
    kk = [0, 130, 27, 24, 24],
    lk = [0, 130, 54, 24, 24],
    mk = [0, 0, 0, 89, 63],
    nk = [0, 0, 66, 88, 37],
    ok = [1, 1250, 0, 411, 479],
    pk = [1, 1059, 408, 163, 66],
    qk = [1, 893, 1372, 93, 81],
    rk = [1, 1386, 779, 66, 44],
    sk = [1, 1455, 779, 66, 44],
    tk = [1, 0, 0, 706, 110],
    uk = [1, 1557, 1688, 64, 73],
    vk = [1, 709, 0, 538, 108],
    wk = [
      [1, 313, 1424, 200, 221],
      [1, 313, 1424, 200, 221],
      [1, 313, 1424, 200, 221],
      [1, 0, 1430, 200, 221],
      [1, 0, 1430, 200, 221],
      [1, 0, 1430, 200, 221],
      [1, 893, 1473, 200, 221],
      [1, 893, 1473, 200, 221],
      [1, 893, 1473, 200, 221],
    ],
    xk = [
      [1, 680, 1108, 310, 261],
      [1, 680, 1108, 310, 261],
      [1, 680, 1108, 310, 261],
      [1, 680, 1108, 310, 261],
      [1, 327, 1160, 310, 261],
      [1, 327, 1160, 310, 261],
      [1, 327, 1160, 310, 261],
      [1, 327, 1160, 310, 261],
      [1, 0, 1166, 310, 261],
      [1, 0, 1166, 310, 261],
      [1, 0, 1166, 310, 261],
      [1, 0, 1166, 310, 261],
    ],
    yk = [
      [1, 1386, 482, 250, 210],
      [1, 1386, 482, 250, 210],
      [1, 1386, 482, 250, 210],
      [1, 1386, 482, 250, 210],
      [1, 1291, 1176, 250, 210],
      [1, 1291, 1176, 250, 210],
      [1, 1291, 1176, 250, 210],
      [1, 1291, 1176, 250, 210],
      [1, 993, 1260, 250, 210],
      [1, 993, 1260, 250, 210],
      [1, 993, 1260, 250, 210],
      [1, 993, 1260, 250, 210],
      [1, 640, 1372, 250, 210],
      [1, 640, 1372, 250, 210],
      [1, 640, 1372, 250, 210],
    ],
    zk = [
      [1, 0, 113, 350, 350],
      [1, 0, 113, 350, 350],
      [1, 0, 113, 350, 350],
      [1, 0, 113, 350, 350],
      [1, 0, 113, 350, 350],
      [1, 0, 113, 350, 350],
      [1, 353, 113, 350, 350],
      [1, 353, 113, 350, 350],
      [1, 353, 113, 350, 350],
      [1, 353, 113, 350, 350],
      [1, 353, 113, 350, 350],
      [1, 353, 113, 350, 350],
      [1, 706, 408, 350, 350],
      [1, 706, 408, 350, 350],
      [1, 706, 408, 350, 350],
      [1, 706, 408, 350, 350],
      [1, 706, 408, 350, 350],
      [1, 706, 408, 350, 350],
      [1, 0, 466, 350, 350],
      [1, 0, 466, 350, 350],
      [1, 0, 466, 350, 350],
      [1, 0, 466, 350, 350],
      [1, 0, 466, 350, 350],
      [1, 0, 466, 350, 350],
    ],
    Ak = [
      [1, 353, 466, 324, 344],
      [1, 353, 466, 324, 344],
      [1, 353, 466, 324, 344],
      [1, 353, 466, 324, 344],
      [1, 353, 466, 324, 344],
      [1, 1059, 482, 324, 344],
      [1, 1059, 482, 324, 344],
      [1, 1059, 482, 324, 344],
      [1, 680, 761, 324, 344],
      [1, 680, 761, 324, 344],
      [1, 353, 813, 324, 344],
      [1, 0, 819, 324, 344],
      [1, 353, 813, 324, 344],
      [1, 0, 819, 324, 344],
      [1, 353, 813, 324, 344],
      [1, 0, 819, 324, 344],
      [1, 1007, 829, 324, 344],
      [1, 1007, 829, 324, 344],
      [1, 1334, 829, 324, 344],
      [1, 1334, 829, 324, 344],
      [1, 1334, 829, 324, 344],
    ];
  var Bk = "bn gu hi kn km ml mr ne or pa ta te".split(" "),
    Ug = (function () {
      switch (de) {
        case "ja":
          return "Noto Sans JP";
        case "ko":
          return "Noto Sans KR";
        case "zh-CN":
          return "Noto Sans SC";
        case "zh-HK":
          return "Noto Sans HK";
        case "zh-TW":
          return "Noto Sans TC";
      }
      return Bk.includes(de) ? "Noto Sans" : "Pangolin";
    })(),
    Ck = '"' + Ug + '",sans-serif',
    Dk =
      "https://" +
      window.location.hostname +
      "/webhp?fpdoodle=1&doodle=174786555-";
  // link
  var S = function (a, b) {
      b = void 0 === b ? document : b;
      return b.querySelector("." + a);
    },
    Ek = function (a) {
      var b = S("ddlmdsb-eb");
      a.style.backgroundColor = b.style.backgroundColor;
      a.width = b.width - 12;
      a.height = b.height - 85 + 17;
      a.style.width = a.width + "px";
      a.style.height = 1.06 * a.height + "px";
    },
    Fk = function (a) {
      return Oa(function (b) {
        return b.return(
          new Promise(function (c) {
            setTimeout(c, a);
          })
        );
      });
    },
    Gk = function (a, b, c) {
      c =
        void 0 === c
          ? function () {
              return !0;
            }
          : c;
      var d, e, f;
      return Oa(function (g) {
        if (1 == g.g) {
          if (!(0 < b && c())) {
            g.g = 3;
            return;
          }
          d = Date.now();
          return Ca(g, Fk(100), 4);
        }
        return 3 != g.g
          ? ((e = Date.now() - d),
            (b -= e),
            (f = a()),
            !1 !== f ? (g = g.return(f)) : ((g.g = 1), (g = void 0)),
            g)
          : g.return(!1);
      });
    },
    Hk = function () {
      try {
        var a = window.location;
        var b = a instanceof id ? new id(a) : new id(a, void 0);
      } catch (c) {
        return "";
      }
      (a = b.g.get("doodle")) || (a = b.o);
      if (!a) return "";
      b = a.indexOf("-");
      if (-1 === b) return "";
      b = a.substr(b + 1);
      return 51200 < b.length
        ? (console.error(
            "encoded spec was too large: " + b.length + " characters"
          ),
          "")
        : b;
    };
  var Ik = O.W(),
    Jk = function (a) {
      this.N = a;
      this.g = ej(jj);
      this.H = this.s = this.o = null;
    },
    Mk = function (a, b) {
      Kk(a);
      a.s = lf(a.i, "click", function () {
        P.Ca.play();
        Lk(a);
      });
      a.H = lf(a.j, "click", function () {
        P.Ca.play();
        Lk(a);
        b();
      });
      a.N.appendChild(a.g);
      a.g.classList.add("ddlmdsb-Z");
      Ki(a.i.firstChild, 25, 115, 50);
      Ki(a.j.firstChild, 25, 145, 50);
    },
    Lk = function (a) {
      Nk(a);
      a.g.classList.remove("ddlmdsb-Z");
      uf(a.o);
      a.o = lf(a.g, Ve, function () {
        Kk(a);
      });
    },
    Kk = function (a) {
      Nk(a);
      a.g.parentElement && a.g.parentElement.removeChild(a.g);
    },
    Nk = function (a) {
      uf(a.H);
      uf(a.s);
      uf(a.o);
    };
  var Ok = [P.mc, P.nc, P.oc, P.qc],
    Pk = [P.Ec, P.Fc, P.Gc, P.Hc, P.Ic],
    Qk = [P.ld, P.nd, P.od],
    Rk = [P.Pc, P.Qc, P.Rc, P.Sc, P.Tc],
    Sk = [P.Xc, P.Yc, P.Zc],
    Tk = [P.wc, P.xc, P.yc],
    Uk = [P.Bc, P.Cc],
    Vk = [P.Mc, P.Nc, P.Oc],
    Wk = [P.Uc, P.Vc, P.Wc];
  var Yk = function (a, b, c, d) {
      var e = this;
      this.g = a;
      this.i = Hi(mk);
      this.i.classList.add("ddlmdsb-vc");
      this.o = Hi(nk);
      this.o.classList.add("ddlmdsb-wc");
      this.j = Hi(Wj);
      this.j.classList.add("ddlmdsb-xc");
      setTimeout(function () {
        e.g.classList.add("ddlmdsb-zc");
      }, 10);
      a.appendChild(this.i);
      a.appendChild(this.o);
      a.appendChild(this.j);
      a.classList.add("ddlmdsb-Bc");
      a.classList.add("ddlmdsb-Cc");
      if (d)
        setTimeout(function () {
          return c();
        }, 1e3);
      else {
        var f = !1;
        $g(
          b,
          this.g,
          ["mousedown", "touchstart"],
          function () {
            f || ((f = !0), c());
          },
          !0
        );
        Xk(this);
      }
    },
    Zk = function (a) {
      a.g.classList.remove("ddlmdsb-yc");
      a.i.classList.remove("ddlmdsb-Ac");
    },
    Xk = function (a) {
      yg() &&
        (a.g.classList.add("ddlmdsb-yc"), a.i.classList.add("ddlmdsb-Ac"));
    },
    al = function (a) {
      var b,
        c = new Promise(function (e) {
          return (b = e);
        }),
        d = document.getElementById("hplogocta");
      d.classList.add("ddlmdsb-Dc");
      $k &&
        (document.getElementById("hplogo").classList.add("ddlmdsb-Ec"),
        document.getElementById("hplogo").classList.remove("fpdoodleready"));
      a.g.classList.remove("ddlmdsb-zc");
      setTimeout(function () {
        a.i.remove();
        a.j.remove();
        a.o.remove();
        a.g.classList.remove("ddlmdsb-Bc");
        d.style.background = "#fff";
        d.classList.remove("ddlmdsb-Dc");
        b();
      }, 500);
      return c;
    },
    $k = Ld();
  var bl = function (a) {
      this.g = this.i = 0;
      this.j = a;
    },
    cl = function (a, b) {
      a.i++;
      a.g += b;
      1e4 <= a.g && (a.j((a.i / a.g) * 1e3), (a.i = 0), (a.g = 0));
    };
  for (
    var dl = new Map([
        [1, [[1, 1202, 1557, 73, 68]]],
        [2, [[1, 203, 1640, 92, 75]]],
        [3, [[1, 86, 1654, 83, 80]]],
        [4, [[1, 298, 1648, 90, 92]]],
        [5, [[1, 516, 1424, 104, 103]]],
        [6, [[1, 0, 1654, 83, 86]]],
        [7, [[1, 1544, 1176, 108, 108]]],
        [8, [[1, 1122, 266, 110, 112]]],
        [9, [[1, 1305, 1634, 100, 110]]],
        [10, [[1, 1202, 1634, 100, 124]]],
        [11, [[1, 1483, 1688, 71, 63]]],
        [12, [[1, 1464, 1389, 180, 191]]],
        [14, [[1, 391, 1648, 85, 85]]],
        [13, [[1, 727, 1585, 100, 137]]],
        [15, [[1, 1122, 111, 120, 113]]],
        [16, [[1, 1544, 1287, 100, 89]]],
        [17, [[1, 516, 1635, 100, 82]]],
        [18, [[1, 1096, 1662, 72, 120]]],
        [19, yk],
        [20, wk],
        [21, xk],
        [22, zk],
        [23, Ak],
        [24, yk],
        [25, wk],
        [26, xk],
        [27, zk],
        [28, Ak],
      ]),
      el = new Map([
        [1, 0.85],
        [2, 0.85],
        [3, 0.85],
        [4, 0.62],
        [5, 0.62],
        [6, 0.62],
        [7, 0.475],
        [8, 0.475],
        [9, 0.475],
        [10, 1],
        [11, 1],
        [12, 0.65],
        [14, 0.6],
        [13, 1],
        [15, 1],
        [16, 0.775],
        [17, 0.775],
        [18, 0.775],
        [19, 0.925],
        [20, 1],
        [21, 0.65],
        [22, 0.55],
        [23, 0.7],
        [24, 0.925 * 0.4],
        [25, 0.4],
        [26, 0.26],
        [27, 0.55 * 0.4],
        [28, 0.7 * 0.4],
      ]),
      fl = u(el.entries()),
      gl = fl.next();
    !gl.done;
    gl = fl.next()
  ) {
    var hl = gl.value;
    hl[1] *= 0.8;
  }
  function U(a, b, c) {
    c = void 0 === c ? {} : c;
    var d = void 0 === c.va ? dl.get(a[0])[0] : c.va,
      e = void 0 === c.La ? 0 : c.La,
      f = void 0 === c.ta ? 0 : c.ta,
      g = void 0 === c.Gd ? 0 : c.Gd,
      h = void 0 === c.Id ? 0 : c.Id,
      k = void 0 === c.Fd ? 0 : c.Fd,
      l = void 0 === c.Hd ? 0 : c.Hd,
      m = void 0 === c.count ? 1 : c.count,
      r = void 0 === c.Dd ? !1 : c.Dd;
    return {
      Ed: d,
      $b: b,
      zd: function () {
        for (var p = [], x = null, y = 0; y < m; ++y) {
          var A = ((Math.random() * (f - e) + e) * Math.PI) / 180,
            W = k + (Math.random() - 0.5) * g,
            xa = l + (Math.random() - 0.5) * h;
          (r && null !== x) || (x = Math.floor(Math.random() * a.length));
          p.push({
            yd: a[x],
            x: W,
            y: xa,
            rotation: A,
          });
        }
        return p;
      },
    };
  }
  var V = new Set();
  V.add(
    U([11], Rk, {
      va: [1, 823, 1738, 48, 48],
      La: -30,
      ta: 30,
    })
  );
  V.add(
    U([7, 8, 9], Ok, {
      va: [1, 530, 1720, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([1, 2, 3], Pk, {
      va: [1, 721, 1725, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([23], Sk, {
      va: [1, 172, 1718, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([28], Sk, {
      va: [1, 479, 1720, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([14], Wk, {
      va: [1, 772, 1725, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([19], Rk, {
      va: [1, 391, 1736, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([24], Rk, {
      va: [1, 86, 1737, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([15], Rk, {
      va: [1, 581, 1741, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([4, 5, 6], Ok, {
      va: [1, 1007, 761, 48, 48],
      La: -90,
      ta: 90,
    })
  );
  V.add(
    U([20], Pk, {
      va: [1, 830, 1585, 48, 48],
      La: -30,
      ta: 30,
    })
  );
  V.add(
    U([25], Pk, {
      va: [1, 830, 1636, 48, 48],
      La: -30,
      ta: 30,
    })
  );
  V.add(
    U([13], Uk, {
      va: [1, 830, 1687, 48, 48],
      La: -90,
      ta: 90,
    })
  );
  V.add(
    U([12], Uk, {
      va: [1, 619, 1690, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([16, 17, 18], Vk, {
      va: [1, 670, 1690, 48, 48],
      La: -90,
      ta: 90,
    })
  );
  V.add(
    U([22], Qk, {
      va: [1, 881, 1697, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([27], Qk, {
      va: [1, 932, 1697, 48, 48],
      ta: 360,
    })
  );
  V.add(
    U([21], Qk, {
      va: [1, 983, 1697, 48, 48],
      La: -30,
      ta: 30,
    })
  );
  V.add(
    U([26], Qk, {
      va: [1, 1034, 1697, 48, 48],
      La: -30,
      ta: 30,
    })
  );
  V.add(
    U([10], Tk, {
      va: [1, 223, 1718, 48, 48],
      ta: 360,
    })
  );
  var jl = function (a) {
    di(this, a, il);
  };
  ob(jl, $h);
  var il = [2, 3, 4, 6],
    kl = function (a) {
      a = ei(a, 5, "");
      return null == a || a instanceof Uint8Array
        ? a
        : "string" === typeof a
        ? Gh(a)
        : null;
    };
  var ll = O.W(),
    ml = new Map();
  var nl = function (a, b) {
    this.x = a;
    this.y = b;
  };
  ob(nl, Eb);
  nl.prototype.scale = Eb.prototype.scale;
  nl.prototype.add = function (a) {
    this.x += a.x;
    this.y += a.y;
    return this;
  };
  var ol = O.W(),
    pl = function (a, b, c) {
      this.translate = a = void 0 === a ? new nl(0, 0) : a;
      this.rotation = void 0 === b ? 0 : b;
      this.scale = void 0 === c ? 1 : c;
    };
  pl.prototype.apply = function (a) {
    a.translate(this.translate.x, this.translate.y);
    a.rotate(this.rotation);
    a.scale(this.scale, this.scale);
  };
  var ql = function () {
      this.g = new pl();
    },
    rl = function () {
      ql.apply(this, arguments);
    };
  v(rl, ql);
  rl.prototype.j = function (a, b) {
    var c = Nb(a.i),
      d = Math.sqrt(Math.pow(sl(a) / 2, 2) + Math.pow(tl(a) / 2, 2));
    a = Math.max(0, -a.g.translate.y);
    this.g.translate.x = 0;
    this.g.translate.y = c * (b.height + a + d + 10);
    this.g.rotation = c * Math.PI * 2;
    this.g.scale = 1;
    return this.g;
  };
  var ul = function () {
    this.g = new pl();
    this.i = new nl(0, 0);
  };
  v(ul, ql);
  ul.prototype.j = function (a, b) {
    var c = Nb(a.i),
      d = Math.sqrt(Math.pow(b.height, 2) + Math.pow(b.width, 2));
    this.i.x = -b.width / 2;
    this.i.y = -b.height / 2;
    this.i.add(a.g.translate);
    a = this.i;
    d = a.scale(1 / Math.hypot(a.x, a.y)).scale(c * d);
    this.g.translate.x = d.x;
    this.g.translate.y = d.y;
    this.g.rotation = c * Math.PI * 4;
    this.g.scale = 1 - c;
    return this.g;
  };
  var vl = new ul(),
    wl = new rl(),
    xl = function (a, b, c, d, e) {
      d = void 0 === d ? 0 : d;
      e = void 0 === e ? 0 : e;
      var f = void 0 === f ? 1 : f;
      this.$ = a;
      this.H = dl.get(a);
      this.T = ml.get(a);
      this.g = new pl(
        new nl(b, c),
        d,
        f * el.get(a) * (0.97 + 0.06 * Math.random())
      );
      this.o = Math.abs(e) % this.H.length;
      this.O = 83 * this.o;
      this.j = !1;
      this.i = 0;
      this.s = 750;
      this.N = wl;
    },
    yl = function (a, b) {
      return (
        Math.pow(a.g.translate.x - b.width / 2, 2) +
          Math.pow(a.g.translate.y - b.height / 2, 2) <=
        Math.pow(sl(a) / 2, 2) +
          Math.pow(tl(a) / 2, 2) +
          (Math.pow(b.width / 2, 2) + Math.pow(b.height / 2, 2))
      );
    },
    zl = function (a, b) {
      a.O += b;
      a.o = 0 < a.O ? Math.floor(a.O / 83) % a.H.length : 0;
      a.i = a.j ? Math.min(1, a.i + b / a.s) : Math.max(0, a.i - b / a.s);
    },
    Al = function (a, b, c) {
      c = void 0 === c ? !0 : c;
      b.save();
      if (a.i) {
        var d = a.N.j(a, b.canvas);
        var e = a.g;
        d.translate.add(e.translate);
        d.rotation += e.rotation;
        d.scale *= e.scale;
      } else d = a.g;
      var f = d;
      f.apply(b);
      25 === a.$ && b.scale(-1, 1);
      d = a.H[a.o];
      e = d[3];
      var g = d[4];
      if (c) {
        a = a.T[a.o];
        c = new nl(0.5 / f.scale, 1.5 / f.scale);
        var h = -f.rotation;
        f = Math.cos(h);
        h = Math.sin(h);
        var k = c.y * f + c.x * h;
        c.x = c.x * f - c.y * h;
        c.y = k;
        b.translate(c.x, c.y);
        b.drawImage(a, -e / 2, -g / 2);
        b.translate(-c.x, -c.y);
      }
      Ei(ol, b, d, -e / 2, -g / 2);
      b.restore();
    },
    Bl = function (a) {
      a.s = 750;
      a.j = !0;
    },
    Cl = function (a, b) {
      b = void 0 === b ? a.N : b;
      a.N = b;
      a.s = 1600;
      a.j = !0;
    },
    Dl = function (a) {
      a.s = 750;
      a.j = !1;
    },
    sl = function (a) {
      return a.H[a.o][3] * a.g.scale;
    },
    tl = function (a) {
      return a.H[a.o][4] * a.g.scale;
    };
  var Fl = function (a) {
      this.N = a;
      this.i = a.$b;
      Cb(this.i);
      this.o = 0;
      this.g = new nl(-500, -500);
      this.H = new nl(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      this.j = [];
      this.s = !1;
      El(this);
    },
    Gl = function (a) {
      var b = a.i[a.o];
      a.o = (a.o + 1) % a.i.length;
      return b;
    },
    Hl = function (a, b) {
      if (a.s) {
        b.save();
        b.translate(a.g.x, a.g.y);
        a = u(a.j);
        for (var c = a.next(); !c.done; c = a.next()) Al(c.value, b);
        b.restore();
      }
    },
    El = function (a) {
      var b = a.N.zd();
      a.j = [];
      b = u(b);
      for (var c = b.next(); !c.done; c = b.next())
        (c = c.value), a.j.push(new xl(c.yd, c.x, c.y, c.rotation));
    },
    Il = function (a) {
      a.H.x = a.g.x;
      a.H.y = a.g.y;
      var b = a.j;
      El(a);
      return b;
    };
  for (
    var Jl = ["#faf8f4", "#3a8a69", "#ffce39", "#785fa2"],
      Kl = Jl[0],
      Ll = document.createElement("div"),
      Ml = 0;
    Ml < Jl.length;
    ++Ml
  )
    (Ll.style.backgroundColor = Jl[Ml]), (Jl[Ml] = Ll.style.backgroundColor);
  var Nl = ["ddlmdsb-mb", "ddlmdsb-nb", "ddlmdsb-lb"],
    Ol = function (a) {
      B.call(this);
      this.i = a;
      this.g = [];
      this.o = new Xg(this);
      Re(this, this.o);
    };
  v(Ol, B);
  var Ql = function (a, b) {
      var c = Jl[b] || Kl;
      (b = a.g.find(function (d) {
        return d.style.backgroundColor === c;
      }))
        ? Pl(a, b)
        : (a.i.style.backgroundColor = c);
    },
    Rl = function (a) {
      for (
        var b = a.i.style.backgroundColor, c = 0, d = 0;
        c < Jl.length;
        ++c
      ) {
        var e = Jl[c];
        e !== b && (a.g[d++].style.backgroundColor = e);
      }
    },
    Sl = function (a) {
      for (var b = u(Nl), c = b.next(); !c.done; c = b.next())
        G(a.o, S(c.value), "click", function () {
          P.Ca.play();
          P.Lc.play();
          var d = a.g;
          Pl(a, d[d.length - 1]);
          H(101);
        });
    },
    Pl = function (a, b) {
      var c = a.g[0],
        d = a.g.indexOf(b),
        e = a.i.style.backgroundColor;
      a.i.style.backgroundColor = b.style.backgroundColor;
      for (b = d; 0 < b; --b)
        a.g[b].style.backgroundColor = a.g[b - 1].style.backgroundColor;
      c.style.backgroundColor = e;
    };
  Ol.prototype.reset = function () {
    this.i.style.backgroundColor = Kl;
    Rl(this);
  };
  var Ul = function () {
    Ji.call(this, "./", Tl);
  };
  v(Ul, Ji);
  cb(Ul);
  var Tl = ["svg-sprite.svg"];
  /*


 JavaScript Zlib and Deflate Library

 The MIT License

 Copyright (c) 2011 imaya

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
*/
  var Y =
    "undefined" !== typeof Uint8Array &&
    "undefined" !== typeof Uint16Array &&
    "undefined" !== typeof Uint32Array;
  var Wl = function (a, b) {
      this.index = "number" === typeof b ? b : 0;
      this.j = 0;
      this.i =
        a instanceof (Y ? Uint8Array : Array)
          ? a
          : new (Y ? Uint8Array : Array)(32768);
      if (2 * this.i.length <= this.index) throw Error("D");
      this.i.length <= this.index && Vl(this);
    },
    Vl = function (a) {
      var b = a.i,
        c,
        d = b.length,
        e = new (Y ? Uint8Array : Array)(d << 1);
      if (Y) e.set(b);
      else for (c = 0; c < d; ++c) e[c] = b[c];
      return (a.i = e);
    };
  Wl.prototype.g = function (a, b, c) {
    var d = this.i,
      e = this.index,
      f = this.j,
      g = d[e];
    c &&
      1 < b &&
      (a =
        8 < b
          ? ((Xl[a & 255] << 24) |
              (Xl[(a >>> 8) & 255] << 16) |
              (Xl[(a >>> 16) & 255] << 8) |
              Xl[(a >>> 24) & 255]) >>
            (32 - b)
          : Xl[a] >> (8 - b));
    if (8 > b + f) (g = (g << b) | a), (f += b);
    else
      for (c = 0; c < b; ++c)
        (g = (g << 1) | ((a >> (b - c - 1)) & 1)),
          8 === ++f &&
            ((f = 0),
            (d[e++] = Xl[g]),
            (g = 0),
            e === d.length && (d = Vl(this)));
    d[e] = g;
    this.i = d;
    this.j = f;
    this.index = e;
  };
  var Yl = function (a) {
      var b = a.i,
        c = a.index;
      0 < a.j && ((b[c] <<= 8 - a.j), (b[c] = Xl[b[c]]), c++);
      Y ? (a = b.subarray(0, c)) : ((b.length = c), (a = b));
      return a;
    },
    Zl = new (Y ? Uint8Array : Array)(256),
    $l;
  for ($l = 0; 256 > $l; ++$l) {
    var am = $l,
      bm = am,
      cm = 7;
    for (am >>>= 1; am; am >>>= 1) (bm <<= 1), (bm |= am & 1), --cm;
    Zl[$l] = ((bm << cm) & 255) >>> 0;
  }
  var Xl = Zl;
  /*


 zlib.heap.js

 The MIT License

 Copyright (c) 2011 imaya

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
*/
  var dm = function () {
    this.g = new (Y ? Uint16Array : Array)(1144);
    this.length = 0;
  };
  dm.prototype.push = function (a, b) {
    var c = this.g;
    var d = this.length;
    c[this.length++] = b;
    for (c[this.length++] = a; 0 < d; )
      if (((a = 2 * (((d - 2) / 4) | 0)), c[d] > c[a]))
        (b = c[d]),
          (c[d] = c[a]),
          (c[a] = b),
          (b = c[d + 1]),
          (c[d + 1] = c[a + 1]),
          (c[a + 1] = b),
          (d = a);
      else break;
    return this.length;
  };
  var em = function (a) {
    var b = a.g,
      c;
    var d = b[0];
    var e = b[1];
    a.length -= 2;
    b[0] = b[a.length];
    b[1] = b[a.length + 1];
    for (c = 0; ; ) {
      var f = 2 * c + 2;
      if (f >= a.length) break;
      f + 2 < a.length && b[f + 2] > b[f] && (f += 2);
      if (b[f] > b[c]) {
        var g = b[c];
        b[c] = b[f];
        b[f] = g;
        g = b[c + 1];
        b[c + 1] = b[f + 1];
        b[f + 1] = g;
      } else break;
      c = f;
    }
    return {
      index: e,
      value: d,
      length: a.length,
    };
  };
  var fm = function (a, b) {
      this.Kb = 2;
      this.i = 0;
      this.j = Y && a instanceof Array ? new Uint8Array(a) : a;
      this.op = 0;
      b &&
        (b.lazy && (this.i = b.lazy),
        "number" === typeof b.compressionType && (this.Kb = b.compressionType),
        b.outputBuffer &&
          (this.g =
            Y && b.outputBuffer instanceof Array
              ? new Uint8Array(b.outputBuffer)
              : b.outputBuffer),
        "number" === typeof b.outputIndex && (this.op = b.outputIndex));
      this.g || (this.g = new (Y ? Uint8Array : Array)(32768));
    },
    gm = [],
    hm;
  for (hm = 0; 288 > hm; hm++)
    switch (!0) {
      case 143 >= hm:
        gm.push([hm + 48, 8]);
        break;
      case 255 >= hm:
        gm.push([hm - 144 + 400, 9]);
        break;
      case 279 >= hm:
        gm.push([hm - 256, 7]);
        break;
      case 287 >= hm:
        gm.push([hm - 280 + 192, 8]);
        break;
      default:
        throw Error("E`" + hm);
    }
  var im = function (a, b) {
      this.length = a;
      this.g = b;
    },
    jm,
    km = (function () {
      function a(e) {
        switch (!0) {
          case 3 === e:
            return [257, e - 3, 0];
          case 4 === e:
            return [258, e - 4, 0];
          case 5 === e:
            return [259, e - 5, 0];
          case 6 === e:
            return [260, e - 6, 0];
          case 7 === e:
            return [261, e - 7, 0];
          case 8 === e:
            return [262, e - 8, 0];
          case 9 === e:
            return [263, e - 9, 0];
          case 10 === e:
            return [264, e - 10, 0];
          case 12 >= e:
            return [265, e - 11, 1];
          case 14 >= e:
            return [266, e - 13, 1];
          case 16 >= e:
            return [267, e - 15, 1];
          case 18 >= e:
            return [268, e - 17, 1];
          case 22 >= e:
            return [269, e - 19, 2];
          case 26 >= e:
            return [270, e - 23, 2];
          case 30 >= e:
            return [271, e - 27, 2];
          case 34 >= e:
            return [272, e - 31, 2];
          case 42 >= e:
            return [273, e - 35, 3];
          case 50 >= e:
            return [274, e - 43, 3];
          case 58 >= e:
            return [275, e - 51, 3];
          case 66 >= e:
            return [276, e - 59, 3];
          case 82 >= e:
            return [277, e - 67, 4];
          case 98 >= e:
            return [278, e - 83, 4];
          case 114 >= e:
            return [279, e - 99, 4];
          case 130 >= e:
            return [280, e - 115, 4];
          case 162 >= e:
            return [281, e - 131, 5];
          case 194 >= e:
            return [282, e - 163, 5];
          case 226 >= e:
            return [283, e - 195, 5];
          case 257 >= e:
            return [284, e - 227, 5];
          case 258 === e:
            return [285, e - 258, 0];
          default:
            throw Error("H`" + e);
        }
      }
      var b = [],
        c;
      for (c = 3; 258 >= c; c++) {
        var d = a(c);
        b[c] = (d[2] << 24) | (d[1] << 16) | d[0];
      }
      return b;
    })();
  jm = Y ? new Uint32Array(km) : km;
  var mm = function (a, b) {
      function c(W, xa) {
        var n = W.g,
          F = [],
          ea = 0;
        var oa = jm[W.length];
        F[ea++] = oa & 65535;
        F[ea++] = (oa >> 16) & 255;
        F[ea++] = oa >> 24;
        switch (!0) {
          case 1 === n:
            n = [0, n - 1, 0];
            break;
          case 2 === n:
            n = [1, n - 2, 0];
            break;
          case 3 === n:
            n = [2, n - 3, 0];
            break;
          case 4 === n:
            n = [3, n - 4, 0];
            break;
          case 6 >= n:
            n = [4, n - 5, 1];
            break;
          case 8 >= n:
            n = [5, n - 7, 1];
            break;
          case 12 >= n:
            n = [6, n - 9, 2];
            break;
          case 16 >= n:
            n = [7, n - 13, 2];
            break;
          case 24 >= n:
            n = [8, n - 17, 3];
            break;
          case 32 >= n:
            n = [9, n - 25, 3];
            break;
          case 48 >= n:
            n = [10, n - 33, 4];
            break;
          case 64 >= n:
            n = [11, n - 49, 4];
            break;
          case 96 >= n:
            n = [12, n - 65, 5];
            break;
          case 128 >= n:
            n = [13, n - 97, 5];
            break;
          case 192 >= n:
            n = [14, n - 129, 6];
            break;
          case 256 >= n:
            n = [15, n - 193, 6];
            break;
          case 384 >= n:
            n = [16, n - 257, 7];
            break;
          case 512 >= n:
            n = [17, n - 385, 7];
            break;
          case 768 >= n:
            n = [18, n - 513, 8];
            break;
          case 1024 >= n:
            n = [19, n - 769, 8];
            break;
          case 1536 >= n:
            n = [20, n - 1025, 9];
            break;
          case 2048 >= n:
            n = [21, n - 1537, 9];
            break;
          case 3072 >= n:
            n = [22, n - 2049, 10];
            break;
          case 4096 >= n:
            n = [23, n - 3073, 10];
            break;
          case 6144 >= n:
            n = [24, n - 4097, 11];
            break;
          case 8192 >= n:
            n = [25, n - 6145, 11];
            break;
          case 12288 >= n:
            n = [26, n - 8193, 12];
            break;
          case 16384 >= n:
            n = [27, n - 12289, 12];
            break;
          case 24576 >= n:
            n = [28, n - 16385, 13];
            break;
          case 32768 >= n:
            n = [29, n - 24577, 13];
            break;
          default:
            throw Error("I");
        }
        oa = n;
        F[ea++] = oa[0];
        F[ea++] = oa[1];
        F[ea++] = oa[2];
        ea = 0;
        for (n = F.length; ea < n; ++ea) l[m++] = F[ea];
        p[F[0]]++;
        x[F[3]]++;
        r = W.length + xa - 1;
        k = null;
      }
      var d,
        e,
        f,
        g,
        h = {},
        k,
        l = Y ? new Uint16Array(2 * b.length) : [],
        m = 0,
        r = 0,
        p = new (Y ? Uint32Array : Array)(286),
        x = new (Y ? Uint32Array : Array)(30),
        y = a.i;
      if (!Y) {
        for (e = 0; 285 >= e; ) p[e++] = 0;
        for (e = 0; 29 >= e; ) x[e++] = 0;
      }
      p[256] = 1;
      var A = 0;
      for (d = b.length; A < d; ++A) {
        e = g = 0;
        for (f = 3; e < f && A + e !== d; ++e) g = (g << 8) | b[A + e];
        void 0 === h[g] && (h[g] = []);
        e = h[g];
        if (0 < r--) e.push(A);
        else {
          for (; 0 < e.length && 32768 < A - e[0]; ) e.shift();
          if (A + 3 >= d) {
            k && c(k, -1);
            e = 0;
            for (f = d - A; e < f; ++e) (g = b[A + e]), (l[m++] = g), ++p[g];
            break;
          }
          0 < e.length
            ? ((f = lm(b, A, e)),
              k
                ? k.length < f.length
                  ? ((g = b[A - 1]), (l[m++] = g), ++p[g], c(f, 0))
                  : c(k, -1)
                : f.length < y
                ? (k = f)
                : c(f, 0))
            : k
            ? c(k, -1)
            : ((g = b[A]), (l[m++] = g), ++p[g]);
          e.push(A);
        }
      }
      l[m++] = 256;
      p[256]++;
      a.s = p;
      a.o = x;
      return Y ? l.subarray(0, m) : l;
    },
    lm = function (a, b, c) {
      var d = 0,
        e = a.length;
      var f = 0;
      var g = c.length;
      a: for (; f < g; f++) {
        var h = c[g - f - 1];
        var k = 3;
        if (3 < d) {
          for (k = d; 3 < k; k--) if (a[h + k - 1] !== a[b + k - 1]) continue a;
          k = d;
        }
        for (; 258 > k && b + k < e && a[h + k] === a[b + k]; ) ++k;
        if (k > d) {
          var l = h;
          d = k;
        }
        if (258 === k) break;
      }
      return new im(d, b - l);
    },
    om = function (a, b) {
      var c = a.length,
        d = new dm(),
        e = new (Y ? Uint8Array : Array)(c),
        f;
      if (!Y) for (f = 0; f < c; f++) e[f] = 0;
      for (f = 0; f < c; ++f) 0 < a[f] && d.push(f, a[f]);
      a = Array(d.length / 2);
      var g = new (Y ? Uint32Array : Array)(d.length / 2);
      if (1 === a.length) return (e[em(d).index] = 1), e;
      f = 0;
      for (c = d.length / 2; f < c; ++f) (a[f] = em(d)), (g[f] = a[f].value);
      b = nm(g, g.length, b);
      f = 0;
      for (c = a.length; f < c; ++f) e[a[f].index] = b[f];
      return e;
    },
    nm = function (a, b, c) {
      function d(y) {
        var A = k[y][l[y]];
        A === b ? (d(y + 1), d(y + 1)) : --g[A];
        ++l[y];
      }
      var e = new (Y ? Uint16Array : Array)(c),
        f = new (Y ? Uint8Array : Array)(c),
        g = new (Y ? Uint8Array : Array)(b),
        h = Array(c),
        k = Array(c),
        l = Array(c),
        m = (1 << c) - b,
        r = 1 << (c - 1),
        p;
      e[c - 1] = b;
      for (p = 0; p < c; ++p)
        m < r ? (f[p] = 0) : ((f[p] = 1), (m -= r)),
          (m <<= 1),
          (e[c - 2 - p] = ((e[c - 1 - p] / 2) | 0) + b);
      e[0] = f[0];
      h[0] = Array(e[0]);
      k[0] = Array(e[0]);
      for (p = 1; p < c; ++p)
        e[p] > 2 * e[p - 1] + f[p] && (e[p] = 2 * e[p - 1] + f[p]),
          (h[p] = Array(e[p])),
          (k[p] = Array(e[p]));
      for (m = 0; m < b; ++m) g[m] = c;
      for (r = 0; r < e[c - 1]; ++r) (h[c - 1][r] = a[r]), (k[c - 1][r] = r);
      for (m = 0; m < c; ++m) l[m] = 0;
      1 === f[c - 1] && (--g[0], ++l[c - 1]);
      for (p = c - 2; 0 <= p; --p) {
        c = m = 0;
        var x = l[p + 1];
        for (r = 0; r < e[p]; r++)
          (c = h[p + 1][x] + h[p + 1][x + 1]),
            c > a[m]
              ? ((h[p][r] = c), (k[p][r] = b), (x += 2))
              : ((h[p][r] = a[m]), (k[p][r] = m), ++m);
        l[p] = 0;
        1 === f[p] && d(p);
      }
      return g;
    },
    pm = function (a) {
      var b = new (Y ? Uint16Array : Array)(a.length),
        c = [],
        d = [],
        e = 0,
        f,
        g;
      var h = 0;
      for (f = a.length; h < f; h++) c[a[h]] = (c[a[h]] | 0) + 1;
      h = 1;
      for (f = 16; h <= f; h++) (d[h] = e), (e += c[h] | 0), (e <<= 1);
      h = 0;
      for (f = a.length; h < f; h++)
        for (e = d[a[h]], d[a[h]] += 1, c = b[h] = 0, g = a[h]; c < g; c++)
          (b[h] = (b[h] << 1) | (e & 1)), (e >>>= 1);
      return b;
    };
  /*


 JavaScript Inflate Library

 The MIT License

 Copyright (c) 2012 imaya

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
*/
  var qm = function (a) {
    var b = a.length,
      c = 0,
      d = Number.POSITIVE_INFINITY,
      e,
      f,
      g;
    for (f = 0; f < b; ++f) a[f] > c && (c = a[f]), a[f] < d && (d = a[f]);
    var h = 1 << c;
    var k = new (Y ? Uint32Array : Array)(h);
    var l = 1;
    var m = 0;
    for (e = 2; l <= c; ) {
      for (f = 0; f < b; ++f)
        if (a[f] === l) {
          var r = 0;
          var p = m;
          for (g = 0; g < l; ++g) (r = (r << 1) | (p & 1)), (p >>= 1);
          p = (l << 16) | f;
          for (g = r; g < h; g += e) k[g] = p;
          ++m;
        }
      ++l;
      m <<= 1;
      e <<= 1;
    }
    return [k, c, d];
  };
  var rm = function (a) {
      var b;
      this.O = [];
      this.N = 32768;
      this.i = this.s = this.j = this.T = 0;
      this.o = Y ? new Uint8Array(a) : a;
      this.U = !1;
      this.$ = 1;
      this.ya = !1;
      if (b || !(b = {}))
        b.index && (this.j = b.index),
          b.bufferSize && (this.N = b.bufferSize),
          b.bufferType && (this.$ = b.bufferType),
          b.resize && (this.ya = b.resize);
      switch (this.$) {
        case 0:
          this.op = 32768;
          this.g = new (Y ? Uint8Array : Array)(32768 + this.N + 258);
          break;
        case 1:
          this.op = 0;
          this.g = new (Y ? Uint8Array : Array)(this.N);
          this.Ra = this.wd;
          this.ac = this.rd;
          this.Lb = this.ud;
          break;
        default:
          throw Error("J");
      }
    },
    sm,
    tm = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  sm = Y ? new Uint16Array(tm) : tm;
  var um,
    vm = [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
      67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258,
    ];
  um = Y ? new Uint16Array(vm) : vm;
  var wm,
    xm = [
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
      5, 5, 5, 0, 0, 0,
    ];
  wm = Y ? new Uint8Array(xm) : xm;
  var ym,
    zm = [
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513,
      769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
    ];
  ym = Y ? new Uint16Array(zm) : zm;
  var Am,
    Bm = [
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
      11, 11, 12, 12, 13, 13,
    ];
  Am = Y ? new Uint8Array(Bm) : Bm;
  var Cm,
    Dm = new (Y ? Uint8Array : Array)(288),
    Em,
    Fm;
  Em = 0;
  for (Fm = Dm.length; Em < Fm; ++Em)
    Dm[Em] = 143 >= Em ? 8 : 255 >= Em ? 9 : 279 >= Em ? 7 : 8;
  Cm = qm(Dm);
  var Gm,
    Hm = new (Y ? Uint8Array : Array)(30),
    Im,
    Jm;
  Im = 0;
  for (Jm = Hm.length; Im < Jm; ++Im) Hm[Im] = 5;
  Gm = qm(Hm);
  var Km = function (a, b) {
      for (var c = a.s, d = a.i, e = a.o, f = a.j, g = e.length; d < b; ) {
        if (f >= g) throw Error("L");
        c |= e[f++] << d;
        d += 8;
      }
      a.s = c >>> b;
      a.i = d - b;
      a.j = f;
      return c & ((1 << b) - 1);
    },
    Lm = function (a, b) {
      var c = a.s,
        d = a.i,
        e = a.o,
        f = a.j,
        g = e.length,
        h = b[0];
      for (b = b[1]; d < b && !(f >= g); ) (c |= e[f++] << d), (d += 8);
      e = h[c & ((1 << b) - 1)];
      g = e >>> 16;
      a.s = c >> g;
      a.i = d - g;
      a.j = f;
      return e & 65535;
    },
    Mm = function (a) {
      function b(h, k, l) {
        var m = this.ha,
          r;
        for (r = 0; r < h; ) {
          var p = Lm(this, k);
          switch (p) {
            case 16:
              for (p = 3 + Km(this, 2); p--; ) l[r++] = m;
              break;
            case 17:
              for (p = 3 + Km(this, 3); p--; ) l[r++] = 0;
              m = 0;
              break;
            case 18:
              for (p = 11 + Km(this, 7); p--; ) l[r++] = 0;
              m = 0;
              break;
            default:
              m = l[r++] = p;
          }
        }
        this.ha = m;
        return l;
      }
      var c = Km(a, 5) + 257,
        d = Km(a, 5) + 1,
        e = Km(a, 4) + 4,
        f = new (Y ? Uint8Array : Array)(sm.length),
        g;
      for (g = 0; g < e; ++g) f[sm[g]] = Km(a, 3);
      if (!Y) for (g = e, e = f.length; g < e; ++g) f[sm[g]] = 0;
      e = qm(f);
      f = new (Y ? Uint8Array : Array)(c);
      g = new (Y ? Uint8Array : Array)(d);
      a.ha = 0;
      a.Lb(qm(b.call(a, c, e, f)), qm(b.call(a, d, e, g)));
    };
  q = rm.prototype;
  q.Lb = function (a, b) {
    var c = this.g,
      d = this.op;
    this.V = a;
    for (var e = c.length - 258, f, g, h; 256 !== (f = Lm(this, a)); )
      if (256 > f)
        d >= e && ((this.op = d), (c = this.Ra()), (d = this.op)), (c[d++] = f);
      else
        for (
          f -= 257,
            h = um[f],
            0 < wm[f] && (h += Km(this, wm[f])),
            f = Lm(this, b),
            g = ym[f],
            0 < Am[f] && (g += Km(this, Am[f])),
            d >= e && ((this.op = d), (c = this.Ra()), (d = this.op));
          h--;

        )
          c[d] = c[d++ - g];
    for (; 8 <= this.i; ) (this.i -= 8), this.j--;
    this.op = d;
  };
  q.ud = function (a, b) {
    var c = this.g,
      d = this.op;
    this.V = a;
    for (var e = c.length, f, g, h; 256 !== (f = Lm(this, a)); )
      if (256 > f) d >= e && ((c = this.Ra()), (e = c.length)), (c[d++] = f);
      else
        for (
          f -= 257,
            h = um[f],
            0 < wm[f] && (h += Km(this, wm[f])),
            f = Lm(this, b),
            g = ym[f],
            0 < Am[f] && (g += Km(this, Am[f])),
            d + h > e && ((c = this.Ra()), (e = c.length));
          h--;

        )
          c[d] = c[d++ - g];
    for (; 8 <= this.i; ) (this.i -= 8), this.j--;
    this.op = d;
  };
  q.Ra = function () {
    var a = new (Y ? Uint8Array : Array)(this.op - 32768),
      b = this.op - 32768,
      c,
      d = this.g;
    if (Y) a.set(d.subarray(32768, a.length));
    else {
      var e = 0;
      for (c = a.length; e < c; ++e) a[e] = d[e + 32768];
    }
    this.O.push(a);
    this.T += a.length;
    if (Y) d.set(d.subarray(b, b + 32768));
    else for (e = 0; 32768 > e; ++e) d[e] = d[b + e];
    this.op = 32768;
    return d;
  };
  q.wd = function (a) {
    var b = (this.o.length / this.j + 1) | 0,
      c = this.o,
      d = this.g;
    a &&
      ("number" === typeof a.jc && (b = a.jc),
      "number" === typeof a.qd && (b += a.qd));
    2 > b
      ? ((a = (c.length - this.j) / this.V[2]),
        (a = ((a / 2) * 258) | 0),
        (a = a < d.length ? d.length + a : d.length << 1))
      : (a = d.length * b);
    Y ? ((a = new Uint8Array(a)), a.set(d)) : (a = d);
    return (this.g = a);
  };
  q.ac = function () {
    var a = 0,
      b = this.g,
      c = this.O,
      d = new (Y ? Uint8Array : Array)(this.T + (this.op - 32768)),
      e,
      f;
    if (0 === c.length)
      return Y ? this.g.subarray(32768, this.op) : this.g.slice(32768, this.op);
    var g = 0;
    for (e = c.length; g < e; ++g) {
      var h = c[g];
      var k = 0;
      for (f = h.length; k < f; ++k) d[a++] = h[k];
    }
    g = 32768;
    for (e = this.op; g < e; ++g) d[a++] = b[g];
    this.O = [];
    return (this.H = d);
  };
  q.rd = function () {
    var a = this.op;
    if (Y)
      if (this.ya) {
        var b = new Uint8Array(a);
        b.set(this.g.subarray(0, a));
      } else b = this.g.subarray(0, a);
    else this.g.length > a && (this.g.length = a), (b = this.g);
    return (this.H = b);
  };
  /*


 zlib.js
 JavaScript Zlib and Deflate Library

 The MIT License

 Copyright (c) 2011 imaya

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
*/
  var Nm = O.W();
  Ul.W();
  var Om = [P.$c, P.hd, P.jd, P.kd],
    Pm = function (a, b, c) {
      B.call(this);
      var d = this;
      this.s = a;
      this.Qa = null;
      this.Ua = new Ol(a);
      this.Jc = b;
      this.Wb = !1;
      this.i = null;
      this.g = [];
      this.Ja = [];
      this.N = [];
      this.Oa = 0;
      this.O = [];
      this.H = this.V = !1;
      this.T = this.Vb = this.Ub = 0;
      this.ha = this.Ea = this.Aa = null;
      this.Ya = this.Cb = !0;
      this.Gb = 0;
      this.Xa = new nl(0, 0);
      this.o = new Xg(this);
      Re(this, this.o);
      this.Db = new Jk(c);
      this.wa = 0;
      this.U = !1;
      this.oa = 0;
      this.Eb = !0;
      this.Kc = new bl(function (e) {
        24 > e ? (d.Fb = !1) : 55 < e && (d.Fb = !0);
      });
      this.Fb = !0;
    };
  v(Pm, B);
  var Tm = function (a) {
      if (!a.Wb) {
        a.Wb = !0;
        a.Ea = S("ddlmdsb-Bb");
        Qm(a);
        a.s.classList.add("ddlmdsb-eb");
        S("ddlmdsb-yb").style.background = N(Nm, tk, 530);
        var b = S("ddlmdsb-zb");
        b.style.background = N(Nm, sk, 64);
        b.title = L("Previous Button Hover");
        b = S("ddlmdsb-Ab");
        b.style.background = N(Nm, rk, 64);
        b.title = L("Next Button Hover");
        Rm(a);
        b = S("ddlmdsb-pb");
        b.style.background = N(Nm, Vj, 124);
        b.title = L("Erase Button Hover");
        b = S("clear");
        b.style.background = N(Nm, Lj, 72);
        b.title = L("Clear All Button Hover");
        b = S("undo");
        b.style.background = N(Nm, Uj, 72);
        b.title = L("Undo Button Hover");
        S("ddlmdsb-W").innerText = L("Send Button");
        b = a.Ua;
        Sl(b);
        var c = b.i.style.backgroundColor;
        Jl.includes(c) || (c = Kl);
        b.i.style.backgroundColor = c;
        c = Jl.length - Nl.length - 1;
        for (var d = 0; d < c; ++d) b.g.push(document.createElement("button"));
        c = u(Nl);
        for (d = c.next(); !d.done; d = c.next())
          (d = S(d.value)), (d.title = L("BG Color Button Hover")), b.g.push(d);
        Rl(b);
        b = a.Db;
        S("ddlmdsb-ab", b.g).style.background = N(Ik, Yj, 54);
        S("ddlmdsb-bb", b.g).innerText = L("Clear Confirm");
        b.i = S("ddlmdsb-cb", b.g);
        b.i.firstChild.innerText = L("Clear Confirm - Cancel");
        b.i.style.background = N(Ik, Kj, 135);
        b.j = S("ddlmdsb-db", b.g);
        b.j.firstChild.innerText = L("Clear Confirm - Start Over");
        b.j.style.background = N(Ik, Sj, 161);
        Sm(a);
      }
    },
    Qm = function (a) {
      var b = document.createElement("div");
      b.classList.add("ddlmdsb-Cb");
      a.Ea.style.height = "64px";
      for (
        var c = 0, d = {}, e = u(V), f = e.next();
        !f.done;
        d = {
          Pa: d.Pa,
          Wa: d.Wa,
          ob: d.ob,
        },
          f = e.next()
      ) {
        d.Wa = f.value;
        f = document.createElement("input");
        f.type = "radio";
        f.id = "tbt" + String(c);
        f.name = "tool";
        f.value = "";
        d.Pa = document.createElement("label");
        d.Pa.classList.add("ddlmdsb-Eb");
        d.Pa.htmlFor = "tbt" + String(c);
        d.ob = (function (h) {
          return function () {
            Rm(a);
            Um(a, h.Pa);
            if (a.i instanceof Fl) {
              var k = a.i,
                l = h.Wa;
              k.i = l.$b;
              Cb(k.i);
              k.o = 0;
              k.N = l;
              El(k);
            } else a.i = new Fl(h.Wa);
          };
        })(d);
        G(
          a.o,
          d.Pa,
          "click",
          (function (h) {
            return function () {
              P.Ca.play();
              h.ob();
            };
          })(d)
        );
        a.i || d.ob();
        var g = document.createElement("div");
        g.classList.add("ddlmdsb-Db");
        g.style.background = N(Nm, d.Wa.Ed, 48);
        d.Pa.appendChild(g);
        b.appendChild(f);
        b.appendChild(d.Pa);
        c++;
      }
      a.Ea.appendChild(b);
    },
    Sm = function (a) {
      Vm(a);
      Wm(a);
      G(a.o, S("undo"), "click", function () {
        Om[a.Gb].play();
        a.Gb = (a.Gb + 1) % Om.length;
        Xm(a);
      });
      G(a.o, S("clear"), "click", function () {
        Ym(a);
        H(103);
      });
      G(a.o, S("ddlmdsb-pb"), "click", function () {
        P.Ca.play();
        a.H
          ? Rm(a)
          : ((a.H = !0),
            (a.i = null),
            S("ddlmdsb-pb").classList.add("ddlmdsb-qb"),
            Um(a, null));
        H(102);
      });
    },
    Wm = function (a) {
      G(a.o, a.s, "contextmenu", function (b) {
        b.stopPropagation();
        b.preventDefault();
      });
      G(a.o, a.s, "mouseleave", function () {
        a.i && !a.V && (a.i.s = !1);
      });
      G(a.o, a.s, ["mouseenter", "mousemove", "touchmove"], function () {
        if (a.i && !a.H) {
          var b = !Id,
            c = a.V && Fb(a.Xa, a.i.g) > Math.pow(8, 2);
          if (c) {
            var d = document.querySelector(".ddlmdsb-d");
            d && d.classList.add("ddlmdsb-e");
            S("ddlmdsb-ob").classList.add("ddlmdsb-e");
            S("ddlmdsb-kb").classList.add("ddlmdsb-e");
          }
          if (b || c) a.i.s = !0;
        }
      });
      G(
        a.o,
        document,
        ["mouseleave", "mouseup", "touchend", "touchcancel"],
        function (b) {
          b = b.type;
          if (a.V) {
            a.V = !1;
            var c = document.querySelector(".ddlmdsb-d");
            c && c.classList.remove("ddlmdsb-e");
            S("ddlmdsb-ob").classList.remove("ddlmdsb-e");
            S("ddlmdsb-kb").classList.remove("ddlmdsb-e");
          }
          a.i && (Id || "mouseup" !== b) && (a.i.s = !1);
          a.Oa && (a.Ja.push(a.Oa), (a.Oa = 0));
          a.O.length && (a.N.push(a.O), a.Ja.push(a.O), (a.O = []));
        }
      );
      Fg(a.Jc, function (b, c, d) {
        if (a.i) {
          var e = a.i;
          e.g.x = c;
          e.g.y = d;
        }
        a.Ub = c;
        a.Vb = d;
        if ("mousemove" === b) {
          if (a.V)
            if (a.H) Zm(a, c, d);
            else {
              if ((b = a.i)) {
                b = a.i;
                c = 0;
                d = u(b.j);
                for (e = d.next(); !e.done; e = d.next())
                  (e = e.value), (c = Math.max((sl(e) + tl(e)) / 2, c));
                b = Math.pow(0.94 * c, 2) < Fb(b.g, b.H);
              }
              b && $m(a);
            }
        } else "mousedown" === b && ((a.V = !0), a.H ? Zm(a, c, d) : a.i && ((a.Xa.x = c), (a.Xa.y = d), $m(a)));
      });
    },
    Um = function (a, b) {
      a.ha && (a.ha.style.background = "");
      a.ha = b;
      a.ha && (a.ha.style.background = N(Nm, qk, 68));
    },
    Ym = function (a) {
      P.Ca.play();
      Mk(a.Db, function () {
        if (a.g.length) {
          P.uc.play();
          for (var b = u(a.g), c = b.next(); !c.done; c = b.next())
            Cl(c.value, vl);
          b = a.g.map(function (d, e) {
            return {
              Ia: d,
              index: e,
            };
          });
          a.N.push(b);
          a.Ja.push(b);
          a.g = [];
          a.U = !0;
        }
      });
    },
    Xm = function (a) {
      P.Ca.play();
      if (0 < a.Ja.length) {
        var b = a.Ja.pop();
        if (b instanceof Array) {
          for (var c = u(b), d = c.next(); !d.done; d = c.next())
            (d = d.value), Dl(d.Ia), a.g.splice(d.index, 0, d.Ia);
          a.oa = 750;
          yb(a.N, b);
        } else {
          b = a.g.splice(-b).map(function (e, f) {
            return {
              Ia: e,
              index: f,
            };
          });
          c = u(b);
          for (d = c.next(); !d.done; d = c.next()) Bl(d.value.Ia);
          a.N.push(b);
        }
      }
    },
    Vm = function (a) {
      var b = getComputedStyle(S("ddlmdsb-zb")).direction,
        c = function () {
          a.Aa = new Pi(
            new qe(
              {
                v: a.Ea.scrollLeft,
              },
              {
                v: 340 * a.T,
              },
              700,
              Mb
            ),
            function (d) {
              a.Ea.scrollLeft = "ltr" === b ? d.v : -d.v;
            }
          );
        };
      G(a.o, S("ddlmdsb-zb"), "click", function () {
        H(104);
        P.Xb.play();
        var d = Math.ceil(V.size / 5);
        d = (d + a.T - 1) % d;
        d !== a.T && ((a.T = d), c());
      });
      G(a.o, S("ddlmdsb-Ab"), "click", function () {
        H(105);
        P.Xb.play();
        var d = Math.ceil(V.size / 5);
        d = (d + a.T + 1) % d;
        d !== a.T && ((a.T = d), c());
      });
    },
    Rm = function (a) {
      a.H = !1;
      S("ddlmdsb-pb").classList.remove("ddlmdsb-qb");
    },
    Zm = function (a, b, c) {
      b = an(a, b, c);
      -1 !== b &&
        (a.Cb &&
          ([P.zc, P.Ac][Math.floor(2 * Math.random())].play(),
          (a.Cb = !1),
          setTimeout(function () {
            a.Cb = !0;
          }, 400)),
        (c = a.g[b]),
        Cl(c, wl),
        a.O.push({
          index: b,
          Ia: c,
        }),
        zb(a.g, b),
        (a.U = !0));
    },
    an = function (a, b, c) {
      for (var d = a.g.length - 1; 0 <= d; d--) {
        var e = a.g[d],
          f = b,
          g = c,
          h = sl(e) + 25,
          k = tl(e) + 25,
          l =
            Math.pow(e.g.translate.x - f, 2) + Math.pow(e.g.translate.y - g, 2);
        if (l > Math.pow(h / 2, 2) + Math.pow(k / 2, 2)) f = !1;
        else if (l < Math.pow(Math.min(h, k) / 2, 2)) f = !0;
        else {
          h = sl(e) + 25;
          k = tl(e) + 25;
          l = e.g.translate.x - h / 2;
          var m = e.g.translate.y - k / 2;
          h = new te([l, m, l + h, m, l + h, m + k, l, m + k]);
          k = e.g.rotation;
          e = e.g.translate;
          e = void 0 === e ? new Eb(h.g[0], h.g[1]) : e;
          for (l = 0; l < h.g.length - 1; l += 2) {
            var r = (m = new Eb(h.g[l], h.g[l + 1])),
              p = -1 * h.o + k,
              x = e || new Eb(0, 0),
              y = r.x,
              A = r.y,
              W = Math.cos(p);
            p = Math.sin(p);
            r.x = (y - x.x) * W - (A - x.y) * p + x.x;
            r.y = (y - x.x) * p + (A - x.y) * W + x.y;
            h.g[l] = m.x;
            h.g[l + 1] = m.y;
          }
          h.o = k;
          f = h.i(f, g);
        }
        if (f) return d;
      }
      return -1;
    },
    $m = function (a) {
      var b = 1e3 <= a.g.length;
      a.Ya &&
        ((a.Ya = !1),
        b ? P.tc.play() : Gl(a.i).play(),
        setTimeout(
          function () {
            a.Ya = !0;
          },
          b ? 400 : 100
        ));
      if (!b) {
        var c = Il(a.i);
        b = a.i.g;
        c = u(c);
        for (var d = c.next(); !d.done; d = c.next())
          (d = d.value),
            d.g.translate.add(b),
            yl(d, a.s) && (a.Oa++, a.g.push(d));
        a.U = !0;
      }
    },
    bn = function (a, b) {
      cl(a.Kc, b);
      a.Aa && (Mi(a.Aa, b), a.Aa.Da() && (a.Aa = null));
      for (var c = u(a.N), d = c.next(); !d.done; d = c.next()) {
        var e = u(d.value);
        for (d = e.next(); !d.done; d = e.next()) zl(d.value.Ia, b);
      }
      c = u(a.O);
      for (d = c.next(); !d.done; d = c.next()) zl(d.value.Ia, b);
      a.wa += b;
      if (!(0 >= a.oa && 83 > a.wa)) {
        a.oa -= b;
        b = u(a.g);
        for (c = b.next(); !c.done; c = b.next()) zl(c.value, a.wa);
        Ab(a.N, function (f) {
          return f.every(function (g) {
            g = g.Ia;
            return (g.j && 1 <= g.i) || (!g.j && 0 >= g.i);
          });
        });
        a.wa = 0;
        a.U = !0;
      }
    },
    cn = function (a, b, c) {
      c = void 0 === c ? !0 : c;
      if (a.Eb) {
        if (a.U) {
          a.U = !1;
          b.clearRect(0, -17, b.canvas.width + 6, b.canvas.height + 17);
          for (var d = u(a.g), e = d.next(); !e.done; e = d.next())
            Al(e.value, b, a.Fb);
        }
        if (c && a.Qa) {
          b = a.Qa;
          b.clearRect(0, 0, b.canvas.width, b.canvas.height);
          c = u(a.N);
          for (d = c.next(); !d.done; d = c.next())
            for (e = u(d.value), d = e.next(); !d.done; d = e.next())
              Al(d.value.Ia, b, !1);
          c = u(a.O);
          for (d = c.next(); !d.done; d = c.next()) Al(d.value.Ia, b, !1);
          a.i
            ? 1e3 <= a.g.length
              ? ((b.globalAlpha = 0.6), Hl(a.i, b), (b.globalAlpha = 1))
              : Hl(a.i, b)
            : a.H &&
              ((b.fillStyle = "rgba(244, 86, 166, 0.5)"),
              b.beginPath(),
              b.arc(a.Ub, a.Vb, 16, 0, 2 * Math.PI),
              b.closePath(),
              b.fill());
        }
      }
    },
    dn = function (a) {
      var b = 400 + Math.min(7e3, 52 * Math.pow(a.g.length, 0.7)),
        c = b + 1500;
      a.oa = c;
      for (var d = 0; d < a.g.length; ++d) {
        var e = d / a.g.length,
          f = a.g[d];
        e = (1 - (1 - e) * (1 - e)) * b;
        f.j = !1;
        f.i = 1 + e / 1500;
        f.s = 1500;
        f.N = vl;
      }
      return c;
    };
  Pm.prototype.reset = function () {
    this.g = [];
    this.Ua.reset();
  };
  Pm.prototype.size = function () {
    return this.g.length;
  };
  var Z = function (a, b) {
    B.call(this);
    this.Aa = ej(b);
    a.appendChild(this.Aa);
    this.O = this.N = !1;
    this.Ea = null;
    this.g = [];
  };
  v(Z, B);
  Z.prototype.T = function () {};
  var en = function (a) {
    a.N || ((a.g.length = 0), a.Fa(), (a.N = !0));
  };
  q = Z.prototype;
  q.Fa = function () {
    this.Aa.style.display = "initial";
  };
  q.Ha = function () {
    this.Aa.style.display = "none";
  };
  q.Hb = function () {
    return this.O;
  };
  q.Ib = function (a) {
    for (var b = 0; b < this.g.length; b++) {
      var c = this.g[b];
      Mi(c, a);
      c.Da() && this.g.splice(b--, 1);
    }
  };
  q.rb = function () {};
  var fn = function (a, b) {
    Z.call(this, a, ij);
    this.o = b;
    this.H = null;
    this.s = S("ddlmdsb-R");
    this.i = S("ddlmdsb-jb");
    Re(this, this.o);
  };
  v(fn, Z);
  fn.prototype.T = function () {
    Tm(this.o);
    this.H = S("ddlmdsb-eb");
  };
  fn.prototype.Fa = function () {
    this.H.classList.add("ddlmdsb-fb");
    P.Jb.play();
    this.s.style.background = N(O.W(), Qj, 181);
    this.s.classList.remove("ddlmdsb-U");
    switch (this.Ea) {
      case 1:
        this.i.classList.remove("ddlmdsb-T");
        this.i.classList.add("ddlmdsb-S");
        this.i.classList.add("ddlmdsb-sb");
        break;
      case 3:
        gn(this);
    }
    Z.prototype.Fa.call(this);
    var a = this.o;
    if (!a.Qa) {
      var b = S("ddlmdsb-gb");
      b.width = a.s.width;
      b.style.height =
        (b.height = a.s.height - S("ddlmdsb-ib").clientHeight + 12) + "px";
      a.Qa = b.getContext("2d");
    }
  };
  var gn = function (a) {
    a.g.push(
      new Ri([
        new Qi(500),
        new Oi(function () {
          a.i.classList.remove("ddlmdsb-T");
          a.i.classList.add("ddlmdsb-S");
          a.i.classList.add("ddlmdsb-rb");
          a.s.classList.remove("shareOut");
          a.s.classList.add("shareIn");
        }),
      ])
    );
  };
  fn.prototype.Ha = function () {};
  fn.prototype.Ib = function (a) {
    Z.prototype.Ib.call(this, a);
    bn(this.o, a);
  };
  fn.prototype.rb = function (a) {
    cn(this.o, a);
  };
  var hn = O.W(),
    kn = function (a) {
      Z.call(this, a, hj);
      S("ddlmdsb-C").innerText = L("Title");
      S("ddlmdsb-D").innerText = L("Intro Prompt");
      jn("ddlmdsb-F", ak);
      jn("ddlmdsb-G", bk);
      jn("ddlmdsb-H", ck);
      jn("ddlmdsb-I", dk);
      jn("ddlmdsb-J", ek);
      jn("ddlmdsb-K", fk);
      jn("ddlmdsb-L", gk);
      jn("ddlmdsb-M", hk);
      jn("ddlmdsb-N", ik);
    };
  v(kn, Z);
  var jn = function (a, b) {
    a = S(a);
    a.style.background = Gi(hn, b);
    a.style.height = b[4] + "px";
    a.style.width = b[3] + "px";
  };
  kn.prototype.Fa = function () {
    Z.prototype.Fa.call(this);
    var a = S("ddlmdsb-l"),
      b = S("ddlmdsb-E");
    a.classList.add("ddlmdsb-A");
    this.g.push(
      new Ri([
        new Qi(500),
        new Oi(function () {
          P.Yb.play();
        }),
        new Qi(300),
        new Oi(function () {
          P.Dc.play();
        }),
        new Qi(300),
        new Oi(function () {
          b.classList.add("ddlmdsb-O");
        }),
        new Qi(800),
        new Oi(function () {
          b.classList.add("ddlmdsb-P");
        }),
        new Qi(2300),
        new Oi(function () {
          var c = new qj();
          a.appendChild(c.g);
          c.g.classList.remove("ddlmdsb-uc");
          c.g.classList.add("ddlmdsb-tc");
        }),
        new Qi(500),
      ])
    );
  };
  kn.prototype.Ha = function () {
    Z.prototype.Ha.call(this);
    S("ddlmdsb-k").style.display = "none";
  };
  kn.prototype.Hb = function () {
    return !this.N || !this.g.length;
  };
  var mn = function (a, b, c) {
      this.s = a;
      this.j = void 0 === b ? function () {} : b;
      this.o = void 0 === c ? function () {} : c;
      a = ln(this, a);
      b = a.sd;
      this.g = a.Ad;
      this.ka = b;
      this.i = null;
    },
    pn = function (a) {
      return Oa(function (b) {
        if (1 == b.g) return document.body.appendChild(a.g), Ca(b, Fk(0), 2);
        a.g.style.transition = "500ms";
        nn(a);
        a.g.classList.add("ddlmdsb-j");
        a.i = lf(document, "keydown", function (c) {
          27 == c.keyCode && on(a);
        });
        return Ca(b, Fk(500), 0);
      });
    },
    on = function (a) {
      return Oa(function (b) {
        if (1 == b.g)
          return (
            uf(a.i),
            Yd(a.g, "Transition", "0ms"),
            a.g.classList.remove("ddlmdsb-j"),
            a.o(),
            Ca(b, Fk(0), 2)
          );
        document.body.removeChild(a.g);
        b.g = 0;
      });
    },
    ln = function (a, b) {
      var c = document.createElement("div");
      c.classList.add("ddlmdsb-g");
      var d = document.createElement("div");
      d.classList.add("ddlmdsb-h");
      d.style.maxWidth = "960px";
      d.style.maxHeight = "540px";
      c.appendChild(d);
      b.classList.add("ddlmdsb-i");
      b.style.width = "960px";
      b.style.height = "540px";
      b.style.position = "relative";
      b.style.left = "50%";
      b.style.top = "50%";
      d.appendChild(b);
      window.addEventListener("resize", function () {
        return nn(a);
      });
      b = new xg(b, function () {
        return on(a);
      });
      b.g.style.display = "block";
      c.appendChild(b.g);
      return {
        Ad: c,
        sd: d,
      };
    },
    nn = function (a) {
      var b = a.s,
        c = a.ka;
      Yd(
        b,
        "Transform",
        "scale(" +
          Math.min(
            c.clientHeight / b.clientHeight,
            c.clientWidth / b.clientWidth
          ) +
          ") translate(-50%,-50%)"
      );
      a.j();
    };
  var qn = O.W(),
    rn = function (a, b) {
      Z.call(this, a, fj);
      S("ddlmdsb-q").innerText = L("Loading");
      S("ddlmdsb-r").style.background = N(qn, jk, 32);
      S("ddlmdsb-s").style.background = N(qn, kk, 32);
      S("ddlmdsb-t").style.background = N(qn, lk, 32);
      b && (S("ddlmdsb-u").style.background = N(O.W(), Xj, 100));
    };
  v(rn, Z);
  rn.prototype.Fa = function () {
    Z.prototype.Fa.call(this);
    S("ddlmdsb-k").style.display = "initial";
    S("ddlmdsb-l").classList.add("ddlmdsb-n");
    var a = O.W().preload(1),
      b = Ul.W().preload(0),
      c = new Promise(function (d) {
        for (
          var e = [
              "cardboard_bottom.png",
              "cardboard_middle.jpg",
              "cardboard_top.png",
            ],
            f = 0;
          f < e.length;
          ++f
        )
          e[f] = "./" + e[f];
        Eh(e, d);
      });
    a = new Si([
      new Ni(
        Promise.all([
          ng.Zb.preload(),
          a.then(function () {
            return new Promise(function (d) {
              setTimeout(function () {
                if (!ml.size)
                  for (
                    var e = u(dl.keys()), f = e.next();
                    !f.done;
                    f = e.next()
                  ) {
                    f = f.value;
                    var g = ml,
                      h = g.set,
                      k = dl.get(f),
                      l = [];
                    k = u(k);
                    for (var m = k.next(); !m.done; m = k.next()) {
                      m = m.value;
                      var r = document.createElement("canvas");
                      r.width = m[3];
                      r.height = m[4];
                      var p = r.getContext("2d");
                      p.globalAlpha = 0.5;
                      p.shadowOffsetX = r.width;
                      p.shadowOffsetY = 0;
                      p.shadowBlur = 2;
                      p.shadowColor = "#362f27";
                      Ei(ll, p, m, -r.width, 0);
                      l.push(r);
                    }
                    h.call(g, f, l);
                  }
                d();
              }, 800);
            });
          }),
          b,
          c,
        ])
      ),
      new Qi(2500),
    ]);
    this.g.push(a);
  };
  rn.prototype.Ha = function () {
    var a = this,
      b = S("ddlmdsb-l");
    b.classList.add("ddlmdsb-p");
    var c = new Ri([
      new Ni(
        new Promise(function (d) {
          kf(b, Ue, d);
        })
      ),
      new Oi(function () {
        Z.prototype.Ha.call(a);
      }),
    ]);
    this.g.push(c);
  };
  rn.prototype.Hb = function () {
    return !this.N || !this.g.length;
  };
  rn.prototype.j = function () {
    var a = O.W();
    a = u(a.g);
    for (var b = a.next(); !b.done; b = a.next()) b.value.o = [];
    a = Ul.W();
    a = u(a.g);
    for (b = a.next(); !b.done; b = a.next()) b.value.o = [];
    Z.prototype.j.call(this);
  };
  O.W();
  var sn = function () {
      this.g = ej(oj);
      this.i = S("ddlmdsb-qc", this.g);
      this.g.style.background = N(O.W(), Qj, 181);
    },
    tn = function (a) {
      a.g.parentElement && Ki(a.i, 36, 145, 60);
    };
  sn.prototype.close = function () {
    this.g.classList.remove("ddlmdsb-pc");
    this.g.style.background = N(O.W(), Qj, 181);
  };
  sn.prototype.remove = function () {
    this.g.parentElement && this.g.parentElement.removeChild(this.g);
  };
  var un = O.W(),
    vn = function (a) {
      this.g = ej(a);
      this.i = "";
      this.j = L("Share Text");
    };
  q = vn.prototype;
  q.Va = function (a) {
    var b = S("ddlmdsb-Qb", this.g);
    wn(b, uj, 76);
    b.title = L("Back Button Hover");
    lf(b, "click", function () {
      P.Ca.play();
      a();
    });
    b = S("searchButton", this.g);
    b.style.background = N(un, Pj, 76);
    b.title = L("Search Button Hover");
    lf(b, "click", function () {
      window.open("http://google.com/search?q=mother's day 2025");
      // H(3);
      // var c = google.doodle ? google.doodle.url : "";
      // if (c) {
      //     var d;
      //     (d = (d = !Gd) || Kd()) ? ad(c) : (d = window.top.location,
      //     c = c instanceof Fc ? c : Ic(c),
      //     console.log(c),

      //     d.assign(Gc(c)))
      // }
    });
  };
  q.tb = function (a) {
    this.i = a;
  };
  q.remove = function () {
    this.g.parentElement && this.g.parentElement.removeChild(this.g);
  };
  q.Tb = function () {};
  q.lc = function () {
    return !1;
  };
  q.Nb = function () {};
  var wn = function (a, b, c) {
      a.style.background = N(un, b, c);
    },
    xn = function () {
      vn.call(this, mj);
      this.o = S("ddlmdsb-Zb", this.g);
    };
  v(xn, vn);
  xn.prototype.Va = function (a) {
    var b = this;
    vn.prototype.Va.call(this, a);
    a = S("facebookButton", this.g);
    wn(a, Oj, 76);
    a.title = "Facebook";
    lf(a, "click", function () {
      H(5);
      var c = b.i;
      be() ||
        ((c = ti(c)),
        (c = vi("https://www.facebook.com/dialog/share", {
          app_id: "738026486351791",
          href: c,
          hashtag: "#GoogleDoodle",
        })),
        ad(c),
        H(5));
    });
    a = S("twitterButton", this.g);
    wn(a, Tj, 76);
    a.title = "Twitter";
    lf(a, "click", function () {
      H(6);
      var c = b.i;
      be() ||
        ((c = ti(c)),
        (c = "text=" + encodeURIComponent(b.j + "\n" + c)),
        ad("http://twitter.com/intent/tweet?" + c),
        H(6));
    });
    a = S("ddlmdsb-Rb", this.g);
    wn(a, Nj, 76);
    a.title = L("E-mail Button Hover");
    lf(a, "click", function (c) {
      return yn(b, c);
    });
    wn(S("ddlmdsb-Xb", this.g), vk, 404);
    a = S("ddlmdsb-Yb", this.g);
    wn(a, uk, 55);
    a.title = L("Copy link hover");
    lf(a, "click", function () {
      H(16);
      P.Ca.play();
      zn(b);
    });
    a = S("ddlmdsb-cc", this.g);
    wn(a, pk, 122);
    a.firstChild.innerText = L("Copy link confirmation");
  };
  xn.prototype.tb = function (a) {
    vn.prototype.tb.call(this, a);
    this.o.value = a;
    a = S("ddlmdsb-Rb", this.g);
    var b = L("Title");
    b = wi(this.i, this.j, b);
    b = b instanceof Fc ? b : Ic(b);
    a.href = Gc(b);
    a.target = "_blank";
  };
  var zn = function (a) {
      Oa(function (b) {
        xi(a.o, S("ddlmdsb-Yb", a.g)).then(
          function () {
            An(a);
          },
          function () {}
        );
        b.g = 0;
      });
    },
    An = function (a) {
      var b = S("ddlmdsb-cc", a.g);
      b.classList.add("ddlmdsb-dc");
      Ki(b.firstChild, 20, 105, 45);
      b.addEventListener(Ue, function () {
        b.classList.remove("ddlmdsb-dc");
      });
    },
    yn = function (a, b) {
      var c, d, e, f, g;
      return Oa(function (h) {
        switch (h.g) {
          case 1:
            H(8);
            c = L("Title");
            d = ad(wi(a.i, a.j, c));
            if (!d) return h.return();
            b.preventDefault();
            e = !1;
            f = function () {
              return !e;
            };
            g = function () {
              e = !0;
              window.blur();
              d.focus();
            };
            h.H = 2;
            return Ca(
              h,
              Gk(
                function () {
                  return "loading" === d.document.readyState;
                },
                2e3,
                f
              ),
              4
            );
          case 4:
            return Ca(
              h,
              Gk(
                function () {
                  return "loading" !== d.document.readyState;
                },
                2e4,
                f
              ),
              5
            );
          case 5:
            "about:blank" === d.location.href
              ? ((e = !0), d.close(), (d = null), window.focus())
              : g();
            Fa(h);
            break;
          case 2:
            Ga(h), g(), (h.g = 0);
        }
      });
    },
    Bn = function () {
      vn.call(this, lj);
    };
  v(Bn, vn);
  Bn.prototype.Va = function (a) {
    var b = this;
    vn.prototype.Va.call(this, a);
    a = L("Share Button");
    var c = S("ddlmdsb-Tb", this.g);
    wn(c, Rj, 162);
    c.title = a;
    wn(S("ddlmdsb-Ub", this.g), Zj, 43);
    S("ddlmdsb-Vb", this.g).innerText = a;
    lf(c, "click", function () {
      H(17);
      b.Nb();
    });
  };
  Bn.prototype.Tb = function () {
    this.g.parentElement && Ki(S("ddlmdsb-Vb", this.g), 26, 90, 60);
  };
  Bn.prototype.lc = function () {
    return !0;
  };
  Bn.prototype.Nb = function () {
    if ((Ed || Hd) && navigator.share)
      try {
        navigator.share({
          text: this.j,
          url: this.i,
        });
        return;
      } catch (c) {}
    if (Gd && !Jd) {
      var a = this.i,
        b = this.j;
      be() ||
        (H(9),
        (a = ti(a)),
        (window.location =
          "http://www.google.com/doodles/_SHARE?description=" +
          encodeURIComponent(b) +
          "&url=" +
          encodeURIComponent(a)));
    } else
      ui() &&
        ((a = this.i),
        (b = this.j),
        !be() && ui() && (H(15), window.agsa_ext.share(b + " " + a, null)));
  };
  function Cn() {
    return ((Ed || Hd) && navigator.share) || (Gd && !Jd) || ui()
      ? new Bn()
      : new xn();
  }
  var Dn = O.W(),
    En = function (a, b) {
      Z.call(this, a, pj);
      this.H = b;
      this.o = S("ddlmdsb-ec");
      this.ha = S("ddlmdsb-hc");
      this.Ja = this.ha.getContext("2d");
      this.oa = new qj();
      sj(this.oa);
      a = this.i = new sn();
      b = L("Title");
      a.i.innerText = b;
      tn(a);
      this.V = S("ddlmdsb-nc");
      this.V.style.background = N(Dn, Rj, 162);
      S("ddlmdsb-Ub", this.V).style.background = N(Dn, Zj, 43);
      S("ddlmdsb-Vb", this.V).innerText = L("Share Button");
      this.wa = S("ddlmdsb-oc");
      this.wa.firstChild.innerText = L("Receive Create Button");
      this.wa.style.background = N(Dn, Mj, 221);
      this.U = Cn();
      this.s = new Xg(this);
      Re(this, this.s);
      this.Oa = S("ddlmdsb-v");
      this.Oa.style.background = N(O.W(), Xj, 100);
    };
  v(En, Z);
  En.prototype.T = function () {
    var a = this;
    Z.prototype.T.call(this);
    G(this.s, this.V, "click", function () {
      P.Ca.play();
      a.U.lc()
        ? a.U.Nb()
        : (a.o.classList.remove("ddlmdsb-lc"), a.o.classList.add("ddlmdsb-mc"));
    });
    G(this.s, this.wa, "click", function () {
      H(4);
      P.Ca.play();
      a.H.reset();
      a.O = !0;
    });
    var b = S("ddlmdsb-fc");
    b.insertBefore(this.oa.g, b.firstChild);
    b.appendChild(this.i.g);
    S("ddlmdsb-jc").appendChild(this.U.g);
    Tm(this.H);
    this.U.Va(function () {
      a.o.classList.remove("ddlmdsb-mc");
      a.o.classList.add("ddlmdsb-lc");
    });
  };
  En.prototype.Fa = function () {
    var a = this;
    this.g.push(
      new Ri([
        new Qi(300),
        new Oi(function () {
          P.Jb.play();
          Ek(a.ha);
          a.H.Eb = !1;
          $g(a.s, a.ha, Ue, function () {
            var c = dn(a.H);
            a.H.Eb = !0;
            a.g.push(
              new Ri([
                new Qi(c),
                new Oi(function () {
                  S("ddlmdsb-jc").classList.add("ddlmdsb-kc");
                }),
              ])
            );
          });
          a.o.classList.remove("ddlmdsb-x");
          if (a.i.g.parentElement) {
            var b = 0;
            G(a.s, a.i.g, Ue, function () {
              ++b;
              if (1 === b) {
                var c = a.i;
                c.g.classList.add("ddlmdsb-pc");
                c.g.style.background = N(O.W(), ok, 200);
              } else a.i.remove(), ah(a.s, a.i.g, Ue);
            });
          }
          a.o.classList.add("ddlmdsb-w");
          rj(a.oa);
          Z.prototype.Fa.call(a);
          tn(a.i);
          Ki(a.V.lastChild, 25, 80, 50);
          Ki(a.wa.firstChild, 25, 220, 50);
        }),
      ])
    );
  };
  En.prototype.Ha = function () {
    var a = this;
    this.o.classList.remove("ddlmdsb-w");
    this.o.classList.add("ddlmdsb-x");
    sj(this.oa);
    $g(this.s, this.ha, Ue, function () {
      Z.prototype.Ha.call(a);
    });
  };
  En.prototype.rb = function () {
    var a = this.H,
      b = this.Ja;
    b.translate(-6, 17);
    cn(a, b, !1);
    b.translate(6, -17);
  };
  var Fn = O.W(),
    Gn = function (a, b) {
      Z.call(this, a, kj);
      this.V = b;
      this.o = S("ddlmdsb-Hb");
      this.U = this.o.getContext("2d");
      this.s = S("ddlmdsb-Kb");
      this.H = S("ddlmdsb-Nb");
      this.i = Cn();
    };
  v(Gn, Z);
  Gn.prototype.T = function () {
    var a = this;
    this.s.style.background = N(Fn, ok, 308);
    this.H.innerText = L("Title");
    S("ddlmdsb-Gb").appendChild(this.i.g);
    this.i.Va(function () {
      H(4);
      a.O = !0;
    });
  };
  Gn.prototype.Fa = function () {
    var a = this;
    Ek(this.o);
    this.o.classList.remove("ddlmdsb-Jb");
    this.s.classList.remove("ddlmdsb-Mb");
    this.i.g.classList.remove("ddlmdsb-bc");
    Z.prototype.Fa.call(this);
    this.i.Tb();
    Ki(this.H, 36, 210, 90);
    this.g.push(
      new Ri([
        new Oi(function () {
          a.i.g.classList.add("ddlmdsb-ac");
        }),
        new Qi(250),
        new Oi(function () {
          P.Yb.play();
          a.o.classList.add("ddlmdsb-Ib");
          a.s.classList.add("ddlmdsb-Lb");
        }),
      ])
    );
  };
  Gn.prototype.Ha = function () {
    var a = this;
    this.g.push(
      new Ri([
        new Oi(function () {
          a.o.classList.remove("ddlmdsb-Ib");
          a.o.classList.add("ddlmdsb-Jb");
          a.s.classList.remove("ddlmdsb-Lb");
          a.s.classList.add("ddlmdsb-Mb");
        }),
        new Qi(250),
        new Oi(function () {
          a.i.g.classList.remove("ddlmdsb-ac");
          a.i.g.classList.add("ddlmdsb-bc");
        }),
        new Qi(1e3),
        new Oi(function () {
          Z.prototype.Ha.call(a);
        }),
      ])
    );
  };
  Gn.prototype.rb = function () {
    var a = this.V,
      b = this.U;
    b.translate(-6, 17);
    cn(a, b, !1);
    b.translate(6, -17);
  };
  var Hn = function (a, b, c, d) {
    B.call(this);
    this.N = a;
    this.i = 0;
    this.s = new Pm(b, c, a);
    this.H = d;
    this.o = new Map();
    this.g = null;
    this.O = !1;
    this.V = this.U = "";
    this.T = new Xg(this);
    Re(this, this.T);
    a = u(this.o.values());
    for (b = a.next(); !b.done; b = a.next()) Re(this, b.value);
  };
  v(Hn, B);
  var Jn = function (a) {
      G(a.T, S("ddlmdsb-V"), "click", async function () {
        try {
            const canvas = document.getElementsByClassName("ddlmdsb-gb");
            const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
          const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/png")
          );
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          alert("Canvas copied to clipboard!");
        } catch (err) {
          console.error("Failed to copy canvas:", err);
          alert(
            "Failed to copy canvas. Clipboard API may not be supported or needs HTTPS."
          );
        }
        3 !== a.i && (P.Ca.play(), In(a));
      });
    },
    Kn = function (a, b) {
      return new Promise(function (c) {
        a.U === b
          ? c(a.V)
          : Bi(
              yi.W(),
              b,
              function (d) {
                a.U = b;
                a.V = d;
                c(d);
              },
              function () {
                c(b);
              }
            );
      });
    },
    Ln = function (a, b, c) {
      var d;
      Oa(function (e) {
        if (1 == e.g) return Ca(e, Kn(a, Dk + c), 2);
        d = e.j;
        d = d.startsWith("//") ? "https:" + d : d;
        b.U.tb(d);
        e.g = 0;
      });
    },
    In = function (a) {
      var b, c, d;
      Oa(function (e) {
        if (1 == e.g) {
          if (a.O) return e.return();
          yi.W().reset();
          a.O = !0;
          var f = a.s,
            g = new jl();
          fi(
            g,
            1,
            Math.min(
              Math.max(Jl.indexOf(f.Ua.i.style.backgroundColor), 0),
              Jl.length
            ),
            0
          );
          var h = 150 > f.g.length,
            k = new Uint8Array(f.g.length);
          fi(g, 5, k, "");
          for (var l = 0; l < f.g.length; ++l) {
            var m = f.g[l],
              r = l,
              p = m.$;
            J(g, 2).push(p);
            var x = Math.round(m.g.translate.x);
            J(g, 3).push(x);
            var y = Math.round(m.g.translate.y);
            J(g, 4).push(y);
            var A = kl(g),
              W = 2 * Math.PI;
            A[r] = Math.round(((((m.g.rotation % W) + W) % W) * 255) / W);
            if (h) {
              var xa = Math.round(m.o);
              J(g, 6).push(xa);
            }
          }
          var n = new Wh();
          var F = ei(g, 1, 0);
          if (0 !== F && null != F) {
            var ea = F;
            null != ea && (Qh(n.g, 8), Rh(n.g, ea));
          }
          F = J(g, 2);
          if (0 < F.length) {
            var oa = F;
            if (null != oa && oa.length) {
              for (var Od = Xh(n, 2), Da = 0; Da < oa.length; Da++)
                Rh(n.g, oa[Da]);
              Yh(n, Od);
            }
          }
          F = J(g, 3);
          0 < F.length && Zh(n, 3, F);
          F = J(g, 4);
          0 < F.length && Zh(n, 4, F);
          F = kl(g);
          if (0 < F.length && null != F) {
            var D = Fh(F);
            Qh(n.g, 42);
            Qh(n.g, D.length);
            var K = n.g.end();
            n.j.push(K);
            n.j.push(D);
            n.i += K.length + D.length;
          }
          F = J(g, 6);
          0 < F.length && Zh(n, 6, F);
          for (
            var aa = new Uint8Array(n.i + n.g.length()),
              X = n.j,
              fa = X.length,
              ua = 0,
              ma = 0;
            ma < fa;
            ma++
          ) {
            var Mc = X[ma];
            aa.set(Mc, ua);
            ua += Mc.length;
          }
          var Wf = n.g.end();
          aa.set(Wf, ua);
          n.j = [aa];
          var C = new fm(aa, {
              Kb: 90 > f.g.length ? 1 : 2,
            }),
            M,
            T = C.j;
          switch (C.Kb) {
            case 0:
              var Sa = 0;
              for (M = T.length; Sa < M; ) {
                var Ta = Y
                  ? T.subarray(Sa, Sa + 65535)
                  : T.slice(Sa, Sa + 65535);
                Sa += Ta.length;
                var Nc = void 0,
                  Zb = void 0,
                  Oc = void 0,
                  $b = void 0,
                  rb = C,
                  pa = Ta,
                  Xf = Sa === M,
                  ha = rb.g,
                  I = rb.op;
                if (Y) {
                  for (
                    ha = new Uint8Array(rb.g.buffer);
                    ha.length <= I + pa.length + 5;

                  )
                    ha = new Uint8Array(ha.length << 1);
                  ha.set(rb.g);
                }
                ha[I++] = (Xf ? 1 : 0) | 0;
                $b = pa.length;
                Oc = (~$b + 65536) & 65535;
                ha[I++] = $b & 255;
                ha[I++] = ($b >>> 8) & 255;
                ha[I++] = Oc & 255;
                ha[I++] = (Oc >>> 8) & 255;
                if (Y)
                  ha.set(pa, I), (I += pa.length), (ha = ha.subarray(0, I));
                else {
                  Zb = 0;
                  for (Nc = pa.length; Zb < Nc; ++Zb) ha[I++] = pa[Zb];
                  ha.length = I;
                }
                rb.op = I;
                rb.g = ha;
              }
              break;
            case 1:
              var gb = new Wl(Y ? new Uint8Array(C.g.buffer) : C.g, C.op);
              gb.g(1, 1, !0);
              gb.g(1, 2, !0);
              var hb = mm(C, T),
                Pc;
              var Ua = 0;
              for (Pc = hb.length; Ua < Pc; Ua++) {
                var Pd = hb[Ua];
                Wl.prototype.g.apply(gb, gm[Pd]);
                if (256 < Pd)
                  gb.g(hb[++Ua], hb[++Ua], !0),
                    gb.g(hb[++Ua], 5),
                    gb.g(hb[++Ua], hb[++Ua], !0);
                else if (256 === Pd) break;
              }
              var Rn = Yl(gb);
              C.g = Rn;
              C.op = C.g.length;
              break;
            case 2:
              var ya = new Wl(Y ? new Uint8Array(C.g.buffer) : C.g, C.op),
                ac,
                bc,
                cc,
                Sn = [
                  16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1,
                  15,
                ],
                Yf = Array(19),
                qa,
                vj;
              ya.g(1, 1, !0);
              ya.g(2, 2, !0);
              var Hb = mm(C, T);
              var Qd = om(C.s, 15);
              var Tn = pm(Qd);
              var Rd = om(C.o, 7);
              var Un = pm(Rd);
              for (ac = 286; 257 < ac && 0 === Qd[ac - 1]; ac--);
              for (bc = 30; 1 < bc && 0 === Rd[bc - 1]; bc--);
              var wj = ac,
                xj = bc,
                Va = new (Y ? Uint32Array : Array)(wj + xj),
                R,
                ib,
                Qc,
                La = new (Y ? Uint32Array : Array)(316),
                Ea,
                jb = new (Y ? Uint8Array : Array)(19);
              for (R = ib = 0; R < wj; R++) Va[ib++] = Qd[R];
              for (R = 0; R < xj; R++) Va[ib++] = Rd[R];
              if (!Y) for (R = 0, Qc = jb.length; R < Qc; ++R) jb[R] = 0;
              R = Ea = 0;
              for (Qc = Va.length; R < Qc; R += ib) {
                for (ib = 1; R + ib < Qc && Va[R + ib] === Va[R]; ++ib);
                var da = ib;
                if (0 === Va[R])
                  if (3 > da) for (; 0 < da--; ) (La[Ea++] = 0), jb[0]++;
                  else
                    for (; 0 < da; ) {
                      var za = 138 > da ? da : 138;
                      za > da - 3 && za < da && (za = da - 3);
                      10 >= za
                        ? ((La[Ea++] = 17), (La[Ea++] = za - 3), jb[17]++)
                        : ((La[Ea++] = 18), (La[Ea++] = za - 11), jb[18]++);
                      da -= za;
                    }
                else if (((La[Ea++] = Va[R]), jb[Va[R]]++, da--, 3 > da))
                  for (; 0 < da--; ) (La[Ea++] = Va[R]), jb[Va[R]]++;
                else
                  for (; 0 < da; )
                    (za = 6 > da ? da : 6),
                      za > da - 3 && za < da && (za = da - 3),
                      (La[Ea++] = 16),
                      (La[Ea++] = za - 3),
                      jb[16]++,
                      (da -= za);
              }
              var Zf = Y ? La.subarray(0, Ea) : La.slice(0, Ea);
              var $f = om(jb, 7);
              for (qa = 0; 19 > qa; qa++) Yf[qa] = $f[Sn[qa]];
              for (cc = 19; 4 < cc && 0 === Yf[cc - 1]; cc--);
              var Vn = pm($f);
              ya.g(ac - 257, 5, !0);
              ya.g(bc - 1, 5, !0);
              ya.g(cc - 4, 4, !0);
              for (qa = 0; qa < cc; qa++) ya.g(Yf[qa], 3, !0);
              qa = 0;
              for (vj = Zf.length; qa < vj; qa++) {
                var Rc = Zf[qa];
                ya.g(Vn[Rc], $f[Rc], !0);
                if (16 <= Rc) {
                  qa++;
                  switch (Rc) {
                    case 16:
                      var ag = 2;
                      break;
                    case 17:
                      ag = 3;
                      break;
                    case 18:
                      ag = 7;
                      break;
                    default:
                      throw Error("G`" + Rc);
                  }
                  ya.g(Zf[qa], ag, !0);
                }
              }
              var yj = [Tn, Qd],
                zj = [Un, Rd],
                Aj;
              var Wn = yj[0];
              var Xn = yj[1];
              var Yn = zj[0];
              var Zn = zj[1];
              var sb = 0;
              for (Aj = Hb.length; sb < Aj; ++sb) {
                var Sd = Hb[sb];
                ya.g(Wn[Sd], Xn[Sd], !0);
                if (256 < Sd) {
                  ya.g(Hb[++sb], Hb[++sb], !0);
                  var Bj = Hb[++sb];
                  ya.g(Yn[Bj], Zn[Bj], !0);
                  ya.g(Hb[++sb], Hb[++sb], !0);
                } else if (256 === Sd) break;
              }
              var $n = Yl(ya);
              C.g = $n;
              C.op = C.g.length;
              break;
            default:
              throw Error("F");
          }
          var dc = C.g;
          var bg = 3;
          void 0 === bg && (bg = 0);
          Vh();
          for (var Td = Sh[bg], Cj = [], Ib = 0; Ib < dc.length; Ib += 3) {
            var Dj = dc[Ib],
              Ej = Ib + 1 < dc.length,
              Fj = Ej ? dc[Ib + 1] : 0,
              Gj = Ib + 2 < dc.length,
              Hj = Gj ? dc[Ib + 2] : 0,
              ao = Dj >> 2,
              bo = ((Dj & 3) << 4) | (Fj >> 4),
              Ij = ((Fj & 15) << 2) | (Hj >> 6),
              Jj = Hj & 63;
            Gj || ((Jj = 64), Ej || (Ij = 64));
            Cj.push(Td[ao], Td[bo], Td[Ij] || "", Td[Jj] || "");
          }
          b = Kn(a, Dk + Cj.join(""));
          c = a.g;
          P.Jb.play();
          Lk(c.o.Db);
          c.H.classList.remove("ddlmdsb-fb");
          c.i.classList.remove("ddlmdsb-S");
          c.i.classList.remove("ddlmdsb-sb");
          c.i.classList.remove("ddlmdsb-rb");
          c.i.classList.add("ddlmdsb-T");
          c.s.classList.add("ddlmdsb-U");
          c.s.style.background = N(O.W(), ok, 211);
          return Ca(e, b, 2);
        }
        var Sc = (d = e.j);
        a.O = !1;
        Sc = Sc.startsWith("//") ? "https:" + Sc : Sc;
        a.o.get(3).i.tb(Sc);
        2 === a.i && (a.g.O = !0);
        e.g = 0;
      });
    };
  Hn.prototype.start = function () {
    var a = !!this.H,
      b = ej(gj);
    this.N.appendChild(b);
    b = S("ddlmdsb-l");
    this.o.set(1, new kn(b));
    this.o.set(0, new rn(b, a));
    a = new En(this.N, this.s);
    this.o.set(4, a);
    this.o.set(2, new fn(this.N, this.s));
    this.o.set(3, new Gn(this.N, this.s));
    this.g = this.o.get(this.i);
    en(this.g);
    this.H && Ln(this, a, this.H);
  };
  var Pn = function (a, b) {
    B.call(this);
    var c = this;
    !Md() || Id || Ld() || b.classList.add("ddlmdsb-c");
    this.g = document.createElement("canvas");
    this.g.width = 960;
    this.g.height = 540;
    this.g.classList.add("ddlmdsb-f");
    this.ka = a;
    this.Aa = this.g.getContext("2d");
    this.o = new mi(function (k) {
      c.T && c.T.i(k);
      c.wa();
      var l = c.O;
      if (l.s || l.o || l.O) {
        var m = !!document[eh],
          r = window.innerWidth,
          p = window.innerHeight;
        (0 == window.scrollX && 0 == window.scrollY) || window.scrollTo(0, 0);
        if (r != l.V || p != l.U || m != l.ha || l.g) {
          l.ya = r < p;
          for (var x = !1, y = 0; y < l.i.length; ++y) {
            var A = l.i[y],
              W = A.width || parseInt(A.dataset.width, 10),
              xa = A.height || parseInt(A.dataset.height, 10);
            if (l.o) {
              if (Nd()) throw "";
              Ag() && Id && !Ud && !Gd && 0 == y && (x = W < xa != l.ya);
              var n = x ? Math.min(r / xa, p / W) : Math.min(r / W, p / xa),
                F = n * W,
                ea = n * xa,
                oa = l.H ? "scale(" + n + ") " : "";
              if (x) {
                n = (r - ea) / 2 + ea;
                var Od = (p - F) / 2;
                oa += "rotate(90deg)";
              } else (n = (r - F) / 2), (Od = (p - ea) / 2);
              W = l.H ? W : F;
              xa = l.H ? xa : ea;
              Yd(A, "TransformOrigin", "0 0");
              Yd(A, "Transform", oa);
              z(
                A,
                "position",
                "absolute",
                "width",
                W + "px",
                "height",
                xa + "px",
                "left",
                n + "px",
                "top",
                Od + "px"
              );
            } else Ed && z(A, "height", p + "px");
          }
          ch &&
            ((y = document.documentElement),
            (A = y.getBoundingClientRect()),
            (A.width == r && A.height == p) ||
              z(y, "width", r + "px", "height", p + "px"));
          !l.O &&
            !Ad.includes("CriOS") &&
            0 < r &&
            document.body.clientWidth !== r &&
            (document.body.clientWidth < document.body.scrollWidth &&
              z(
                document.body,
                "width",
                Math.min(document.body.scrollWidth, r) + "px"
              ),
            document.body.clientWidth > r &&
              z(document.body, "width", r + "px"));
          z(l.ka, "height", "100%", "width", "100%");
          l.T(x);
          l.V = r;
          l.U = p;
          l.ha = m;
          l.g = !1;
        }
      }
      c.V.g.style.display = document[eh] ? "block" : "none";
      l = c.Bb;
      if (l.g) {
        m = u(l.o.values());
        for (r = m.next(); !r.done; r = m.next()) r.value.Ib(k);
        if (l.g.Hb()) {
          k = l.i;
          switch (l.i) {
            case 0:
              Jn(l);
              m = u(l.o.values());
              for (r = m.next(); !r.done; r = m.next()) r.value.T();
              if ((m = l.H)) {
                r = l.s;
                try {
                  for (var Da = Gh(l.H), D, K = new rm(Da); !K.U; ) {
                    x = p = Da = void 0;
                    y = K;
                    var aa = Km(y, 3);
                    aa & 1 && (y.U = !0);
                    aa >>>= 1;
                    switch (aa) {
                      case 0:
                        var X = y.o,
                          fa = y.j,
                          ua = y.g,
                          ma = y.op,
                          Mc = X.length,
                          Wf = ua.length;
                        y.s = 0;
                        y.i = 0;
                        if (fa + 1 >= Mc) throw Error("M");
                        x = X[fa++] | (X[fa++] << 8);
                        if (fa + 1 >= Mc) throw Error("N");
                        p = X[fa++] | (X[fa++] << 8);
                        if (x === ~p) throw Error("O");
                        if (fa + x > X.length) throw Error("L");
                        switch (y.$) {
                          case 0:
                            for (; ma + x > ua.length; ) {
                              Da = Wf - ma;
                              x -= Da;
                              if (Y)
                                ua.set(X.subarray(fa, fa + Da), ma),
                                  (ma += Da),
                                  (fa += Da);
                              else for (; Da--; ) ua[ma++] = X[fa++];
                              y.op = ma;
                              ua = y.Ra();
                              ma = y.op;
                            }
                            break;
                          case 1:
                            for (; ma + x > ua.length; )
                              ua = y.Ra({
                                jc: 2,
                              });
                            break;
                          default:
                            throw Error("J");
                        }
                        if (Y)
                          ua.set(X.subarray(fa, fa + x), ma),
                            (ma += x),
                            (fa += x);
                        else for (; x--; ) ua[ma++] = X[fa++];
                        y.j = fa;
                        y.op = ma;
                        y.g = ua;
                        break;
                      case 1:
                        y.Lb(Cm, Gm);
                        break;
                      case 2:
                        Mm(y);
                        break;
                      default:
                        throw Error("K`" + aa);
                    }
                  }
                  D = K.ac();
                  if (204800 < D.length) throw Error("P`" + D.length);
                  for (var C = new jl(), M = new Lh(D); Mh(M) && 4 != M.i; )
                    switch (M.o) {
                      case 1:
                        var T = M.g.j();
                        fi(C, 1, T, 0);
                        break;
                      case 2:
                        if (2 == M.i) var Sa = Oh(M, M.g.N);
                        else {
                          var Ta = M.g;
                          K = 128;
                          for (X = D = aa = 0; 4 > X && 128 <= K; X++)
                            (K = Ta.i[Ta.g++]), (aa |= (K & 127) << (7 * X));
                          128 <= K &&
                            ((K = Ta.i[Ta.g++]),
                            (aa |= (K & 127) << 28),
                            (D |= (K & 127) >> 4));
                          if (128 <= K)
                            for (X = 0; 5 > X && 128 <= K; X++)
                              (K = Ta.i[Ta.g++]),
                                (D |= (K & 127) << (7 * X + 3));
                          if (128 > K) {
                            K = aa >>> 0;
                            aa = D >>> 0;
                            if ((D = aa & 2147483648))
                              (K = (~K + 1) >>> 0),
                                (aa = ~aa >>> 0),
                                0 == K && (aa = (aa + 1) >>> 0);
                            K = 4294967296 * aa + (K >>> 0);
                            var Nc = D ? -K : K;
                          } else (Ta.o = !0), (Nc = void 0);
                          Sa = [Nc];
                        }
                        T = Sa;
                        for (D = 0; D < T.length; D++) {
                          var Zb = T[D];
                          J(C, 2).push(Zb);
                        }
                        break;
                      case 3:
                        T = 2 == M.i ? Oh(M, M.g.j) : [M.g.j()];
                        for (D = 0; D < T.length; D++) {
                          var Oc = T[D];
                          J(C, 3).push(Oc);
                        }
                        break;
                      case 4:
                        T = 2 == M.i ? Oh(M, M.g.j) : [M.g.j()];
                        for (D = 0; D < T.length; D++) {
                          var $b = T[D];
                          J(C, 4).push($b);
                        }
                        break;
                      case 5:
                        D = M;
                        var rb = Jh(D.g);
                        var pa = D.g;
                        D = rb;
                        if (0 > D || pa.g + D > pa.i.length)
                          (pa.o = !0), (T = new Uint8Array(0));
                        else {
                          var Xf = pa.i.subarray(pa.g, pa.g + D);
                          pa.g += D;
                          T = Xf;
                        }
                        fi(C, 5, T, "");
                        break;
                      case 6:
                        T = 2 == M.i ? Oh(M, M.g.j) : [M.g.j()];
                        for (D = 0; D < T.length; D++) {
                          var ha = T[D];
                          J(C, 6).push(ha);
                        }
                        break;
                      default:
                        Nh(M);
                    }
                  Ql(r.Ua, ei(C, 1, 0));
                  var I = J(C, 2);
                  if (0 === I.length) m = !1;
                  else {
                    if (2025 < I.length) throw Error("Q`" + I.length);
                    var gb = J(C, 3),
                      hb = J(C, 4),
                      Pc = J(C, 6),
                      Ua = kl(C);
                    for (C = 0; C < I.length; ++C)
                      r.g.push(
                        new xl(
                          I[C],
                          gb[C],
                          hb[C],
                          (Ua[C] / 255) * 2 * Math.PI,
                          Pc.length ? Pc[C] : Math.floor(1e3 * Math.random())
                        )
                      );
                    m = !0;
                  }
                } catch (Pd) {
                  (r.g = []), (m = !1);
                }
              }
              m ? ((l.i = 4), th(5)) : ((l.i = 1), th(2));
              break;
            case 4:
              l.i = 1;
              th(2);
              break;
            case 1:
              l.i = 2;
              th(3);
              break;
            case 2:
              l.i = 3;
              I = l.s.size();
              rh.d1 = I;
              !sh.includes("d1") && sh.push("d1");
              H(2);
              th(4);
              break;
            case 3:
              (l.i = 2), th(3);
          }
          I = l.g;
          I.N && ((I.g.length = 0), I.Ha(), (I.N = !1));
          l.g = l.o.get(l.i);
          l.g.Ea = k;
          l.g.O = !1;
          en(l.g);
        }
      }
      I = c.Bb;
      I.g && I.g.rb(c.Aa);
    });
    var d = document.createElement("style");
    d.innerText =
      '.ddlmdsb-a{left:50%;overflow:hidden;pointer-events:none;position:absolute;top:50%;-webkit-transform-origin:0 0;-ms-transform-origin:0 0;-o-transform-origin:0 0;transform-origin:0 0;text-align:center}.ddlmdsb-b{left:0;top:0}#fpdoodle .ddlmdsb-c{max-width:960px;max-height:540px;margin:auto}.ddlmdsb-a input{font-family:inherit}.ddlmdsb-d.ddlmdsb-e{pointer-events:none;display:none;opacity:0}.ddlmdsb-d{z-index:1000;-webkit-transition:opacity 300ms;-o-transition:opacity 300ms;transition:opacity 300ms}.ddlmdsb-f{position:absolute;left:0;top:0;width:100%;height:100%}.ddlmdsb-g{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;opacity:0;z-index:1000;background-color:rgba(0,0,0,0.8);visibility:hidden}.ddlmdsb-h{position:relative;height:90%;width:90%}.ddlmdsb-i{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;-o-transform-origin:0 0;transform-origin:0 0}.ddlmdsb-j{opacity:1;visibility:visible}@keyframes fadeInAnim{from{opacity:0}to{opacity:1}}@keyframes fadeOutAnim{from{opacity:1}to{opacity:0}}.ddlmdsb-k{display:none}.ddlmdsb-l{position:absolute;top:0;left:0;display:-ms-grid;display:grid;background:rgb(124,100,157);width:100%;height:100%;will-change:transform}.ddlmdsb-m{position:absolute;top:0;left:0;display:-ms-grid;display:grid;background:url(./paper.png);width:100%;height:100%}.ddlmdsb-n{-webkit-animation:loaderFocusAnim 0.8s forwards ease-out;-o-animation:loaderFocusAnim 0.8s forwards ease-out;animation:loaderFocusAnim 0.8s forwards ease-out}@keyframes loaderFocusAnim{from{-webkit-transform:translateY(960px);-ms-transform:translateY(960px);-o-transform:translateY(960px);transform:translateY(960px)}to{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}}.ddlmdsb-o{opacity:0;margin:auto;will-change:opacity}.ddlmdsb-n .ddlmdsb-o{-webkit-animation:fadeInAnim 0.5s forwards ease-out;-o-animation:fadeInAnim 0.5s forwards ease-out;animation:fadeInAnim 0.5s forwards ease-out;-webkit-animation-delay:0.8s;-o-animation-delay:0.8s;animation-delay:0.8s}.ddlmdsb-p .ddlmdsb-o{-webkit-animation:fadeOutAnim 0.5s forwards ease-out;-o-animation:fadeOutAnim 0.5s forwards ease-out;animation:fadeOutAnim 0.5s forwards ease-out}.ddlmdsb-o div{display:inline-block}.ddlmdsb-q{font-size:36px;color:#fff;margin-right:10px}.ddlmdsb-r,.ddlmdsb-s,.ddlmdsb-t{display:inline-block;margin:0 0 -10px 15px;height:32px;width:32px}.ddlmdsb-r{-webkit-animation:loader1Anim 0.68s steps(3,start) infinite;-o-animation:loader1Anim 0.68s steps(3,start) infinite;animation:loader1Anim 0.68s steps(3,start) infinite}@keyframes loader1Anim{0%,23.52%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}41.16%,47.04%{-webkit-transform:translateY(-14px);-ms-transform:translateY(-14px);-o-transform:translateY(-14px);transform:translateY(-14px)}64.68%,100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}}.ddlmdsb-s{-webkit-animation:loader2Anim 0.68s steps(3,start) infinite;-o-animation:loader2Anim 0.68s steps(3,start) infinite;animation:loader2Anim 0.68s steps(3,start) infinite}@keyframes loader2Anim{0%,35.28%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}52.92%,58.8%{-webkit-transform:translateY(-14px);-ms-transform:translateY(-14px);-o-transform:translateY(-14px);transform:translateY(-14px)}76.44%,100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}}.ddlmdsb-t{-webkit-animation:loader3Anim 0.68s steps(3,start) infinite;-o-animation:loader3Anim 0.68s steps(3,start) infinite;animation:loader3Anim 0.68s steps(3,start) infinite}@keyframes loader3Anim{0%,47.04%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}64.68%,70.56%{-webkit-transform:translateY(-14px);-ms-transform:translateY(-14px);-o-transform:translateY(-14px);transform:translateY(-14px)}88.20%,100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}}.ddlmdsb-u{position:absolute;bottom:28px;right:36px;height:32px;width:100px;opacity:0.4;z-index:0}.ddlmdsb-v{position:absolute;bottom:28px;right:36px;height:32px;width:100px;opacity:0;z-index:0}.ddlmdsb-w .ddlmdsb-v{-webkit-animation:logoFocusAnim 0.5s forwards ease-out;-o-animation:logoFocusAnim 0.5s forwards ease-out;animation:logoFocusAnim 0.5s forwards ease-out;-webkit-animation-delay:0.8s;-o-animation-delay:0.8s;animation-delay:0.8s}@keyframes logoFocusAnim{from{opacity:0}to{opacity:0.4}}.ddlmdsb-x .ddlmdsb-v{-webkit-animation:googleLogoReceiveOut 0.5s ease-out forwards;-o-animation:googleLogoReceiveOut 0.5s ease-out forwards;animation:googleLogoReceiveOut 0.5s ease-out forwards}@keyframes googleLogoReceiveOut{from{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}to{-webkit-transform:translateY(128px);-ms-transform:translateY(128px);-o-transform:translateY(128px);transform:translateY(128px)}}.ddlmdsb-y{display:none}.ddlmdsb-z{display:none}.ddlmdsb-y{position:absolute;top:0;left:0;width:100%;height:100%;background:none;-webkit-transform:translateY(960px);-ms-transform:translateY(960px);-o-transform:translateY(960px);transform:translateY(960px)}.ddlmdsb-A .ddlmdsb-y{-webkit-animation:introContentsInAnim 0.5s forwards ease-out;-o-animation:introContentsInAnim 0.5s forwards ease-out;animation:introContentsInAnim 0.5s forwards ease-out;-webkit-animation-delay:0.5s;-o-animation-delay:0.5s;animation-delay:0.5s}@keyframes introContentsInAnim{from{-webkit-transform:translateY(960px);-ms-transform:translateY(960px);-o-transform:translateY(960px);transform:translateY(960px)}to{-webkit-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}}.ddlmdsb-B{margin:auto;width:196px;height:140px;background:#f3bc4c;-webkit-transform:skew(-7deg,4deg) rotate(-6deg);-ms-transform:skew(-7deg,4deg) rotate(-6deg);-o-transform:skew(-7deg,4deg) rotate(-6deg);transform:skew(-7deg,4deg) rotate(-6deg);-webkit-box-shadow:1px 6px 5px 2px rgba(0,0,0,.22);-moz-box-shadow:1px 6px 5px 2px rgba(0,0,0,.22);box-shadow:1px 6px 5px 2px rgba(0,0,0,.22);margin-top:148px}.ddlmdsb-B:after{content:" ";position:absolute;display:block;width:100%;height:100%;top:0;left:0;z-index:-1;background:#f3bc4c;-webkit-transform-origin:top left;-ms-transform-origin:top left;-o-transform-origin:top left;transform-origin:top left;-webkit-transform:skew(4deg,1deg);-ms-transform:skew(4deg,1deg);-o-transform:skew(4deg,1deg);transform:skew(4deg,1deg)}.ddlmdsb-C{font-size:36px;color:#fff;margin-top:40px}.ddlmdsb-D{font-size:28px;color:#fff;margin-top:10px}.ddlmdsb-E div{position:absolute;filter:drop-shadow(0px 1px 1px #3e295f)}.ddlmdsb-F,.ddlmdsb-G,.ddlmdsb-H,.ddlmdsb-I,.ddlmdsb-J,.ddlmdsb-K,.ddlmdsb-L,.ddlmdsb-M,.ddlmdsb-N{visibility:hidden;will-change:transform}.ddlmdsb-F{top:280px;left:327px}.ddlmdsb-O .ddlmdsb-F{-webkit-animation:intro1EntranceAnim 200ms steps(8,end) forwards;-o-animation:intro1EntranceAnim 200ms steps(8,end) forwards;animation:intro1EntranceAnim 200ms steps(8,end) forwards;visibility:visible}@keyframes intro1EntranceAnim{0%{-webkit-transform:translate(60px,-30px) scale(0.5);-ms-transform:translate(60px,-30px) scale(0.5);-o-transform:translate(60px,-30px) scale(0.5);transform:translate(60px,-30px) scale(0.5)}75%{-webkit-transform:translate(-6px,3px) scale(0.875);-ms-transform:translate(-6px,3px) scale(0.875);-o-transform:translate(-6px,3px) scale(0.875);transform:translate(-6px,3px) scale(0.875)}100%{-webkit-transform:translate(0px,0px) scale(1.0);-ms-transform:translate(0px,0px) scale(1.0);-o-transform:translate(0px,0px) scale(1.0);transform:translate(0px,0px) scale(1.0)}}.ddlmdsb-P .ddlmdsb-F{-webkit-animation:intro1HeartAnim 200ms steps(4,end) forwards;-o-animation:intro1HeartAnim 200ms steps(4,end) forwards;animation:intro1HeartAnim 200ms steps(4,end) forwards;-webkit-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s}@keyframes intro1HeartAnim{from{-webkit-transform:translate(0px,0px);-ms-transform:translate(0px,0px);-o-transform:translate(0px,0px);transform:translate(0px,0px)}to{-webkit-transform:translate(140px,-40px);-ms-transform:translate(140px,-40px);-o-transform:translate(140px,-40px);transform:translate(140px,-40px)}}.ddlmdsb-G{top:198px;left:310px}.ddlmdsb-O .ddlmdsb-G{-webkit-animation:intro2EntranceAnim 200ms steps(8,end) forwards;-o-animation:intro2EntranceAnim 200ms steps(8,end) forwards;animation:intro2EntranceAnim 200ms steps(8,end) forwards;visibility:visible}@keyframes intro2EntranceAnim{0%{-webkit-transform:translate(60px,0px) scale(0.5);-ms-transform:translate(60px,0px) scale(0.5);-o-transform:translate(60px,0px) scale(0.5);transform:translate(60px,0px) scale(0.5)}75%{-webkit-transform:translate(-6px,0px) scale(0.875);-ms-transform:translate(-6px,0px) scale(0.875);-o-transform:translate(-6px,0px) scale(0.875);transform:translate(-6px,0px) scale(0.875)}100%{-webkit-transform:translate(0px,0px) scale(1.0);-ms-transform:translate(0px,0px) scale(1.0);-o-transform:translate(0px,0px) scale(1.0);transform:translate(0px,0px) scale(1.0)}}.ddlmdsb-P .ddlmdsb-G{-webkit-animation:intro2HeartAnim 200ms steps(4,end) forwards;-o-animation:intro2HeartAnim 200ms steps(4,end) forwards;animation:intro2HeartAnim 200ms steps(4,end) forwards;-webkit-animation-delay:0.1s;-o-animation-delay:0.1s;animation-delay:0.1s}@keyframes intro2HeartAnim{from{-webkit-transform:translate(0px,0px);-ms-transform:translate(0px,0px);-o-transform:translate(0px,0px);transform:translate(0px,0px)}to{-webkit-transform:translate(120px,10px);-ms-transform:translate(120px,10px);-o-transform:translate(120px,10px);transform:translate(120px,10px)}}.ddlmdsb-H{top:140px;left:330px}.ddlmdsb-O .ddlmdsb-H{-webkit-animation:intro3EntranceAnim 200ms steps(8,end) forwards;-o-animation:intro3EntranceAnim 200ms steps(8,end) forwards;animation:intro3EntranceAnim 200ms steps(8,end) forwards;visibility:visible}@keyframes intro3EntranceAnim{0%{-webkit-transform:translate(60px,30px) scale(0.5);-ms-transform:translate(60px,30px) scale(0.5);-o-transform:translate(60px,30px) scale(0.5);transform:translate(60px,30px) scale(0.5)}75%{-webkit-transform:translate(-6px,-3px) scale(0.875);-ms-transform:translate(-6px,-3px) scale(0.875);-o-transform:translate(-6px,-3px) scale(0.875);transform:translate(-6px,-3px) scale(0.875)}100%{-webkit-transform:translate(0px,0px) scale(1.0);-ms-transform:translate(0px,0px) scale(1.0);-o-transform:translate(0px,0px) scale(1.0);transform:translate(0px,0px) scale(1.0)}}.ddlmdsb-P .ddlmdsb-H{-webkit-animation:intro3HeartAnim 200ms steps(4,end) forwards;-o-animation:intro3HeartAnim 200ms steps(4,end) forwards;animation:intro3HeartAnim 200ms steps(4,end) forwards;-webkit-animation-delay:0.2s;-o-animation-delay:0.2s;animation-delay:0.2s}@keyframes intro3HeartAnim{from{-webkit-transform:translate(0px,0px);-ms-transform:translate(0px,0px);-o-transform:translate(0px,0px);transform:translate(0px,0px)}to{-webkit-transform:translate(90px,60px);-ms-transform:translate(90px,60px);-o-transform:translate(90px,60px);transform:translate(90px,60px)}}.ddlmdsb-I{top:80px;left:373px}.ddlmdsb-O .ddlmdsb-I{-webkit-animation:intro4EntranceAnim 200ms steps(8,end) forwards;-o-animation:intro4EntranceAnim 200ms steps(8,end) forwards;animation:intro4EntranceAnim 200ms steps(8,end) forwards;visibility:visible}@keyframes intro4EntranceAnim{0%{-webkit-transform:translate(40px,60px) scale(0.5);-ms-transform:translate(40px,60px) scale(0.5);-o-transform:translate(40px,60px) scale(0.5);transform:translate(40px,60px) scale(0.5)}75%{-webkit-transform:translate(-4px,-6px) scale(0.875);-ms-transform:translate(-4px,-6px) scale(0.875);-o-transform:translate(-4px,-6px) scale(0.875);transform:translate(-4px,-6px) scale(0.875)}100%{-webkit-transform:translate(0px,0px) scale(1.0);-ms-transform:translate(0px,0px) scale(1.0);-o-transform:translate(0px,0px) scale(1.0);transform:translate(0px,0px) scale(1.0)}}.ddlmdsb-P .ddlmdsb-I{-webkit-animation:intro4HeartAnim 200ms steps(4,end) forwards;-o-animation:intro4HeartAnim 200ms steps(4,end) forwards;animation:intro4HeartAnim 200ms steps(4,end) forwards;-webkit-animation-delay:0.3s;-o-animation-delay:0.3s;animation-delay:0.3s}@keyframes intro4HeartAnim{from{-webkit-transform:translate(0px,0px);-ms-transform:translate(0px,0px);-o-transform:translate(0px,0px);transform:translate(0px,0px)}to{-webkit-transform:translate(50px,90px);-ms-transform:translate(50px,90px);-o-transform:translate(50px,90px);transform:translate(50px,90px)}}.ddlmdsb-J{top:78px;left:454px}.ddlmdsb-O .ddlmdsb-J{-webkit-animation:intro5EntranceAnim 200ms steps(8,end) forwards;-o-animation:intro5EntranceAnim 200ms steps(8,end) forwards;animation:intro5EntranceAnim 200ms steps(8,end) forwards;visibility:visible}@keyframes intro5EntranceAnim{0%{-webkit-transform:translate(0px,60px) scale(0.5);-ms-transform:translate(0px,60px) scale(0.5);-o-transform:translate(0px,60px) scale(0.5);transform:translate(0px,60px) scale(0.5)}75%{-webkit-transform:translate(0px,-6px) scale(0.875);-ms-transform:translate(0px,-6px) scale(0.875);-o-transform:translate(0px,-6px) scale(0.875);transform:translate(0px,-6px) scale(0.875)}100%{-webkit-transform:translate(0px,0px) scale(1.0);-ms-transform:translate(0px,0px) scale(1.0);-o-transform:translate(0px,0px) scale(1.0);transform:translate(0px,0px) scale(1.0)}}.ddlmdsb-P .ddlmdsb-J{-webkit-animation:intro5HeartAnim 200ms steps(4,end) forwards;-o-animation:intro5HeartAnim 200ms steps(4,end) forwards;animation:intro5HeartAnim 200ms steps(4,end) forwards;-webkit-animation-delay:0.4s;-o-animation-delay:0.4s;animation-delay:0.4s}@keyframes intro5HeartAnim{from{-webkit-transform:translate(0px,0px);-ms-transform:translate(0px,0px);-o-transform:translate(0px,0px);transform:translate(0px,0px)}to{-webkit-transform:translate(1px,102px);-ms-transform:translate(1px,102px);-o-transform:translate(1px,102px);transform:translate(1px,102px)}}.ddlmdsb-K{top:77px;left:549px}.ddlmdsb-O .ddlmdsb-K{-webkit-animation:intro6EntranceAnim 200ms steps(8,end) forwards;-o-animation:intro6EntranceAnim 200ms steps(8,end) forwards;animation:intro6EntranceAnim 200ms steps(8,end) forwards;visibility:visible}@keyframes intro6EntranceAnim{0%{-webkit-transform:translate(-40px,60px) scale(0.5);-ms-transform:translate(-40px,60px) scale(0.5);-o-transform:translate(-40px,60px) scale(0.5);transform:translate(-40px,60px) scale(0.5)}75%{-webkit-transform:translate(4px,-6px) scale(0.875);-ms-transform:translate(4px,-6px) scale(0.875);-o-transform:translate(4px,-6px) scale(0.875);transform:translate(4px,-6px) scale(0.875)}100%{-webkit-transform:translate(0px,0px) scale(1.0);-ms-transform:translate(0px,0px) scale(1.0);-o-transform:translate(0px,0px) scale(1.0);transform:translate(0px,0px) scale(1.0)}}.ddlmdsb-P .ddlmdsb-K{-webkit-animation:intro6HeartAnim 200ms steps(4,end) forwards;-o-animation:intro6HeartAnim 200ms steps(4,end) forwards;animation:intro6HeartAnim 200ms steps(4,end) forwards;-webkit-animation-delay:0.5s;-o-animation-delay:0.5s;animation-delay:0.5s}@keyframes intro6HeartAnim{from{-webkit-transform:translate(0px,0px);-ms-transform:translate(0px,0px);-o-transform:translate(0px,0px);transform:translate(0px,0px)}to{-webkit-transform:translate(-86px,127px);-ms-transform:translate(-86px,127px);-o-transform:translate(-86px,127px);transform:translate(-86px,127px)}}.ddlmdsb-L{top:128px;left:610px}.ddlmdsb-O .ddlmdsb-L{-webkit-animation:intro7EntranceAnim 200ms steps(8,end) forwards;-o-animation:intro7EntranceAnim 200ms steps(8,end) forwards;animation:intro7EntranceAnim 200ms steps(8,end) forwards;visibility:visible}@keyframes intro7EntranceAnim{0%{-webkit-transform:translate(-70px,30px) scale(0.5);-ms-transform:translate(-70px,30px) scale(0.5);-o-transform:translate(-70px,30px) scale(0.5);transform:translate(-70px,30px) scale(0.5)}75%{-webkit-transform:translate(7px,-3px) scale(0.875);-ms-transform:translate(7px,-3px) scale(0.875);-o-transform:translate(7px,-3px) scale(0.875);transform:translate(7px,-3px) scale(0.875)}100%{-webkit-transform:translate(0px,0px) scale(1.0);-ms-transform:translate(0px,0px) scale(1.0);-o-transform:translate(0px,0px) scale(1.0);transform:translate(0px,0px) scale(1.0)}}.ddlmdsb-P .ddlmdsb-L{-webkit-animation:intro7HeartAnim 200ms steps(4,end) forwards;-o-animation:intro7HeartAnim 200ms steps(4,end) forwards;animation:intro7HeartAnim 200ms steps(4,end) forwards;-webkit-animation-delay:0.6s;-o-animation-delay:0.6s;animation-delay:0.6s}@keyframes intro7HeartAnim{from{-webkit-transform:translate(0px,0px);-ms-transform:translate(0px,0px);-o-transform:translate(0px,0px);transform:translate(0px,0px)}to{-webkit-transform:translate(-108px,41px);-ms-transform:translate(-108px,41px);-o-transform:translate(-108px,41px);transform:translate(-108px,41px)}}.ddlmdsb-M{top:190px;left:610px}.ddlmdsb-O .ddlmdsb-M{-webkit-animation:intro8EntranceAnim 200ms steps(8,end) forwards;-o-animation:intro8EntranceAnim 200ms steps(8,end) forwards;animation:intro8EntranceAnim 200ms steps(8,end) forwards;visibility:visible}@keyframes intro8EntranceAnim{0%{-webkit-transform:translate(-70px,0px) scale(0.5);-ms-transform:translate(-70px,0px) scale(0.5);-o-transform:translate(-70px,0px) scale(0.5);transform:translate(-70px,0px) scale(0.5)}75%{-webkit-transform:translate(7px,0px) scale(0.875);-ms-transform:translate(7px,0px) scale(0.875);-o-transform:translate(7px,0px) scale(0.875);transform:translate(7px,0px) scale(0.875)}100%{-webkit-transform:translate(0px,0px) scale(1.0);-ms-transform:translate(0px,0px) scale(1.0);-o-transform:translate(0px,0px) scale(1.0);transform:translate(0px,0px) scale(1.0)}}.ddlmdsb-P .ddlmdsb-M{-webkit-animation:intro8HeartAnim 200ms steps(4,end) forwards;-o-animation:intro8HeartAnim 200ms steps(4,end) forwards;animation:intro8HeartAnim 200ms steps(4,end) forwards;-webkit-animation-delay:0.7s;-o-animation-delay:0.7s;animation-delay:0.7s}@keyframes intro8HeartAnim{from{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-o-transform:translateX(0px);transform:translateX(0px)}to{-webkit-transform:translateX(-113px);-ms-transform:translateX(-113px);-o-transform:translateX(-113px);transform:translateX(-113px)}}.ddlmdsb-N{top:261px;left:609px}.ddlmdsb-O .ddlmdsb-N{-webkit-animation:intro9EntranceAnim 200ms steps(8,end) forwards;-o-animation:intro9EntranceAnim 200ms steps(8,end) forwards;animation:intro9EntranceAnim 200ms steps(8,end) forwards;visibility:visible}@keyframes intro9EntranceAnim{0%{-webkit-transform:translate(-70px,-20px) scale(0.5);-ms-transform:translate(-70px,-20px) scale(0.5);-o-transform:translate(-70px,-20px) scale(0.5);transform:translate(-70px,-20px) scale(0.5)}75%{-webkit-transform:translate(7px,2px) scale(0.875);-ms-transform:translate(7px,2px) scale(0.875);-o-transform:translate(7px,2px) scale(0.875);transform:translate(7px,2px) scale(0.875)}100%{-webkit-transform:translate(0px,0px) scale(1.0);-ms-transform:translate(0px,0px) scale(1.0);-o-transform:translate(0px,0px) scale(1.0);transform:translate(0px,0px) scale(1.0)}}.ddlmdsb-P .ddlmdsb-N{-webkit-animation:intro9HeartAnim 200ms steps(4,end) forwards;-o-animation:intro9HeartAnim 200ms steps(4,end) forwards;animation:intro9HeartAnim 200ms steps(4,end) forwards;-webkit-animation-delay:0.8s;-o-animation-delay:0.8s;animation-delay:0.8s}@keyframes intro9HeartAnim{from{-webkit-transform:translate(0px,0px);-ms-transform:translate(0px,0px);-o-transform:translate(0px,0px);transform:translate(0px,0px)}to{-webkit-transform:translate(-131px,-42px);-ms-transform:translate(-131px,-42px);-o-transform:translate(-131px,-42px);transform:translate(-131px,-42px)}}.ddlmdsb-Q{position:absolute;bottom:-4px;right:16px;pointer-events:all;filter:drop-shadow(0px 2px 2px #362f2799);will-change:transform}.ddlmdsb-R{width:181px;height:131px;padding:0;-webkit-transform:rotate(-3deg);-ms-transform:rotate(-3deg);-o-transform:rotate(-3deg);transform:rotate(-3deg);will-change:transform}.ddlmdsb-R:hover{-webkit-transform:rotate(-7deg);-ms-transform:rotate(-7deg);-o-transform:rotate(-7deg);transform:rotate(-7deg)}.ddlmdsb-S .ddlmdsb-Q{-webkit-animation-delay:1s;-o-animation-delay:1s;animation-delay:1s;-webkit-animation:shareInAnim 1s forwards ease-in-out;-o-animation:shareInAnim 1s forwards ease-in-out;animation:shareInAnim 1s forwards ease-in-out}.ddlmdsb-T .ddlmdsb-Q{-webkit-animation:shareOutAnim 0.7s forwards ease-in-out;-o-animation:shareOutAnim 0.7s forwards ease-in-out;animation:shareOutAnim 0.7s forwards ease-in-out}@keyframes shareInAnim{from{-webkit-transform:translateX(216px);-ms-transform:translateX(216px);-o-transform:translateX(216px);transform:translateX(216px)}to{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-o-transform:translateX(0px);transform:translateX(0px)}}@keyframes shareOutAnim{from{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-o-transform:translateX(0px);transform:translateX(0px)}to{-webkit-transform:translateX(216px);-ms-transform:translateX(216px);-o-transform:translateX(216px);transform:translateX(216px)}}.ddlmdsb-U{padding-top:78px;-webkit-transform:rotate(-7deg);-ms-transform:rotate(-7deg);-o-transform:rotate(-7deg);transform:rotate(-7deg)}.ddlmdsb-V{background:none;border:none;cursor:pointer;outline:none;width:181px;height:130px;padding:0}.ddlmdsb-W{position:absolute;pointer-events:none;left:20px;bottom:30px;max-width:146px;color:#563c8a;font-size:30px;text-overflow:ellipsis;overflow:hidden}.ddlmdsb-X{display:none;background:#aea;padding:10px;pointer-events:all}.ddlmdsb-Y{position:absolute;top:0;left:0;pointer-events:all;background-color:rgba(28,11,57,0.75);width:100%;height:100%;opacity:0;-webkit-animation:fadeInAnim 0.2s ease-in-out;-o-animation:fadeInAnim 0.2s ease-in-out;animation:fadeInAnim 0.2s ease-in-out;-webkit-transition:opacity 0.4s ease-in-out;-o-transition:opacity 0.4s ease-in-out;transition:opacity 0.4s ease-in-out;will-change:opacity}.ddlmdsb-Y button{color:#fff;margin:20px;border:none;outline:none;font-family:unset;font-size:25px;height:61px;filter:drop-shadow(0px 1px 1px rgba(62,41,95,0.75))}.ddlmdsb-Y button:hover{-webkit-transform:scale(1.05);-ms-transform:scale(1.05);-o-transform:scale(1.05);transform:scale(1.05);filter:drop-shadow(0px 2px 2px rgba(62,41,95,0.75))}.ddlmdsb-Z{opacity:1}.ddlmdsb-ab{margin:140px auto 0;width:54px;height:51px}.ddlmdsb-bb{color:#fff;margin-top:14px;font-family:unset;font-size:28px}.ddlmdsb-cb{width:135px}.ddlmdsb-db{width:161px}.ddlmdsb-eb{background:url(./paper.png);pointer-events:none;-webkit-transition:background-color 200ms ease-out;-o-transition:background-color 200ms ease-out;transition:background-color 200ms ease-out}.ddlmdsb-eb.ddlmdsb-fb{pointer-events:all}.ddlmdsb-gb{position:absolute;top:0;left:0;width:960px}.ddlmdsb-hb{display:none}.ddlmdsb-ib input[type="radio"]{display:none}.ddlmdsb-jb{width:960px;height:540px;position:relative;overflow:hidden;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:center;justify-content:center;-webkit-align-items:center;align-items:center}.ddlmdsb-kb{position:absolute;top:-35px;left:-60px;will-change:transform,opacity;-webkit-transition:opacity 300ms;-o-transition:opacity 300ms;transition:opacity 300ms}.ddlmdsb-kb.ddlmdsb-e{opacity:0}.ddlmdsb-S .ddlmdsb-kb{-webkit-animation-delay:1.5s;-o-animation-delay:1.5s;animation-delay:1.5s;-webkit-animation:bgPickerInAnim 1s forwards ease-in-out;-o-animation:bgPickerInAnim 1s forwards ease-in-out;animation:bgPickerInAnim 1s forwards ease-in-out}.ddlmdsb-T .ddlmdsb-kb{-webkit-animation:bgPickerOutAnim 0.7s forwards ease-in-out;-o-animation:bgPickerOutAnim 0.7s forwards ease-in-out;animation:bgPickerOutAnim 0.7s forwards ease-in-out}@keyframes bgPickerInAnim{from{-webkit-transform:translateX(-140px) rotate(-25deg);-ms-transform:translateX(-140px) rotate(-25deg);-o-transform:translateX(-140px) rotate(-25deg);transform:translateX(-140px) rotate(-25deg)}to{-webkit-transform:translateX(0px) rotate(-25deg);-ms-transform:translateX(0px) rotate(-25deg);-o-transform:translateX(0px) rotate(-25deg);transform:translateX(0px) rotate(-25deg)}}@keyframes bgPickerOutAnim{from{-webkit-transform:translateX(0px) rotate(-25deg);-ms-transform:translateX(0px) rotate(-25deg);-o-transform:translateX(0px) rotate(-25deg);transform:translateX(0px) rotate(-25deg)}to{-webkit-transform:translateX(-140px) rotate(-25deg);-ms-transform:translateX(-140px) rotate(-25deg);-o-transform:translateX(-140px) rotate(-25deg);transform:translateX(-140px) rotate(-25deg)}}.ddlmdsb-kb button{background:url(./paper.png);border:none;outline:none;pointer-events:all;position:absolute;width:150px;height:150px;filter:drop-shadow(0px 1px 1px #362f27a0)}@media (hover:hover){.ddlmdsb-kb:hover .ddlmdsb-lb{-webkit-transform:translateY(50px) scale(1.05);-ms-transform:translateY(50px) scale(1.05);-o-transform:translateY(50px) scale(1.05);transform:translateY(50px) scale(1.05)}}.ddlmdsb-mb{top:-30px;left:-30px}.ddlmdsb-nb{top:-15px;left:-50px}.ddlmdsb-lb{top:0;left:-70px;will-change:transform}.ddlmdsb-ob{position:absolute;bottom:60px;left:-26px;pointer-events:all;will-change:transform,opacity;-webkit-transition:opacity 300ms;-o-transition:opacity 300ms;transition:opacity 300ms}.ddlmdsb-ob.ddlmdsb-e{opacity:0}.ddlmdsb-S .ddlmdsb-ob{-webkit-animation-delay:1s;-o-animation-delay:1s;animation-delay:1s;-webkit-animation:deleteInAnim 1s forwards ease-in-out;-o-animation:deleteInAnim 1s forwards ease-in-out;animation:deleteInAnim 1s forwards ease-in-out}.ddlmdsb-T .ddlmdsb-ob{-webkit-animation:deleteOutAnim 0.7s forwards ease-in-out;-o-animation:deleteOutAnim 0.7s forwards ease-in-out;animation:deleteOutAnim 0.7s forwards ease-in-out}@keyframes deleteInAnim{from{-webkit-transform:translateX(-174px);-ms-transform:translateX(-174px);-o-transform:translateX(-174px);transform:translateX(-174px)}to{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-o-transform:translateX(0px);transform:translateX(0px)}}@keyframes deleteOutAnim{from{-webkit-transform:translateX(0px);-ms-transform:translateX(0px);-o-transform:translateX(0px);transform:translateX(0px)}to{-webkit-transform:translateX(-174px);-ms-transform:translateX(-174px);-o-transform:translateX(-174px);transform:translateX(-174px)}}.ddlmdsb-pb{border:none;outline:none;width:110px;height:124px;padding:0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);filter:drop-shadow(0px 1px 1px #49494966)}.ddlmdsb-pb:hover{-webkit-transform:rotate(45deg) translateY(-4px);-ms-transform:rotate(45deg) translateY(-4px);-o-transform:rotate(45deg) translateY(-4px);transform:rotate(45deg) translateY(-4px)}.ddlmdsb-pb:active{-webkit-transform:rotate(45deg) scale(0.92) translateY(-4px);-ms-transform:rotate(45deg) scale(0.92) translateY(-4px);-o-transform:rotate(45deg) scale(0.92) translateY(-4px);transform:rotate(45deg) scale(0.92) translateY(-4px)}.ddlmdsb-qb{-webkit-transform:rotate(45deg) translateY(-12px);-ms-transform:rotate(45deg) translateY(-12px);-o-transform:rotate(45deg) translateY(-12px);transform:rotate(45deg) translateY(-12px)}.ddlmdsb-qb:hover{-webkit-transform:rotate(45deg) translateY(-16px);-ms-transform:rotate(45deg) translateY(-16px);-o-transform:rotate(45deg) translateY(-16px);transform:rotate(45deg) translateY(-16px)}.ddlmdsb-qb:active{-webkit-transform:rotate(45deg) translateY(-16px) scale(0.92);-ms-transform:rotate(45deg) translateY(-16px) scale(0.92);-o-transform:rotate(45deg) translateY(-16px) scale(0.92);transform:rotate(45deg) translateY(-16px) scale(0.92)}.ddlmdsb-ib{width:100%;height:112px;padding:16px;position:absolute;bottom:-5px;left:0;overflow:visible;pointer-events:all;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex;will-change:transform}.ddlmdsb-rb .ddlmdsb-ib{-webkit-animation:cardboardInAnim 0.8s forwards ease-in-out;-o-animation:cardboardInAnim 0.8s forwards ease-in-out;animation:cardboardInAnim 0.8s forwards ease-in-out}.ddlmdsb-sb .ddlmdsb-ib{-webkit-animation:cardboardInAnim 0.5s forwards ease-out;-o-animation:cardboardInAnim 0.5s forwards ease-out;animation:cardboardInAnim 0.5s forwards ease-out}.ddlmdsb-T .ddlmdsb-ib{-webkit-animation:cardboardOutAnim 0.7s forwards ease-in-out;-o-animation:cardboardOutAnim 0.7s forwards ease-in-out;animation:cardboardOutAnim 0.7s forwards ease-in-out}@keyframes cardboardInAnim{from{-webkit-transform:translateY(-600px);-ms-transform:translateY(-600px);-o-transform:translateY(-600px);transform:translateY(-600px)}to{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}}@keyframes cardboardOutAnim{from{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}to{-webkit-transform:translateY(-600px);-ms-transform:translateY(-600px);-o-transform:translateY(-600px);transform:translateY(-600px)}}.ddlmdsb-tb{position:absolute;left:0;top:0}.ddlmdsb-ub{width:960px;height:13px;background:url(./cardboard_top.png)}.ddlmdsb-vb{width:960px;height:690px;background:url(./cardboard_middle.jpg)}.ddlmdsb-wb{width:960px;height:8px;background:url(./cardboard_bottom.png)}.ddlmdsb-xb{display:inline-block;position:relative;top:11px;margin-left:12px}.ddlmdsb-xb button{display:inline-block;height:72px;width:72px;margin-right:16px;position:relative;border:0;cursor:pointer;outline:none;filter:drop-shadow(0px 1px 1px #362f27)}.ddlmdsb-xb button:hover{-webkit-transform:rotate(-6deg);-ms-transform:rotate(-6deg);-o-transform:rotate(-6deg);transform:rotate(-6deg)}.ddlmdsb-xb button:active{-webkit-transform:rotate(-8deg) scale(0.9);-ms-transform:rotate(-8deg) scale(0.9);-o-transform:rotate(-8deg) scale(0.9);transform:rotate(-8deg) scale(0.9)}.ddlmdsb-yb{display:inline-block;width:530px;height:82px;position:relative;top:5px}.ddlmdsb-zb,.ddlmdsb-Ab{height:42px;width:64px;display:inline-block;position:absolute;top:20px;border:0;cursor:pointer;outline:none}.ddlmdsb-zb{left:23px}.ddlmdsb-zb:hover{-webkit-transform:translateX(-2px);-ms-transform:translateX(-2px);-o-transform:translateX(-2px);transform:translateX(-2px)}.ddlmdsb-Ab{right:21px}.ddlmdsb-Ab:hover{-webkit-transform:translateX(2px);-ms-transform:translateX(2px);-o-transform:translateX(2px);transform:translateX(2px)}.ddlmdsb-Bb{width:340px;overflow:hidden;position:relative;margin:0 auto;top:11px;left:5px}.ddlmdsb-Cb{width:auto;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:flex-start;justify-content:flex-start;height:100%}.ddlmdsb-Bb input[type="radio"],input:hover+label .ddlmdsb-Db{-webkit-transform:rotate(-7deg);-ms-transform:rotate(-7deg);-o-transform:rotate(-7deg);transform:rotate(-7deg);filter:drop-shadow(0px 1px 1px #362f27)}input:checked+label .ddlmdsb-Db{-webkit-transform:rotate(-7deg);-ms-transform:rotate(-7deg);-o-transform:rotate(-7deg);transform:rotate(-7deg);filter:drop-shadow(0px 1px 1px #362f27)}.ddlmdsb-Eb{height:100%;padding:5px 10px;cursor:pointer}.ddlmdsb-Db{height:48px;width:48px}.ddlmdsb-Fb{display:none}.ddlmdsb-Gb{display:-ms-grid;display:grid;width:100%;height:100%}.ddlmdsb-Hb{background:url(./paper.png);pointer-events:none;position:absolute;filter:drop-shadow(0px 2px 2px #362f2799);left:-140px;top:0;-webkit-transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);-ms-transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);-o-transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);will-change:transform}.ddlmdsb-Ib{-webkit-animation:shareCanvasInAnim 0.7s forwards ease-in-out;-o-animation:shareCanvasInAnim 0.7s forwards ease-in-out;animation:shareCanvasInAnim 0.7s forwards ease-in-out}@keyframes shareCanvasInAnim{from{-webkit-transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);-ms-transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);-o-transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);transform:translateY(-600px) rotateZ(3.5deg) scale(0.55)}to{-webkit-transform:translateY(0px) rotateZ(3.5deg) scale(0.55);-ms-transform:translateY(0px) rotateZ(3.5deg) scale(0.55);-o-transform:translateY(0px) rotateZ(3.5deg) scale(0.55);transform:translateY(0px) rotateZ(3.5deg) scale(0.55)}}.ddlmdsb-Jb{-webkit-animation:shareCanvasOutAnim 0.7s forwards ease-in-out;-o-animation:shareCanvasOutAnim 0.7s forwards ease-in-out;animation:shareCanvasOutAnim 0.7s forwards ease-in-out}@keyframes shareCanvasOutAnim{from{-webkit-transform:translateY(0px) rotateZ(3.5deg) scale(0.55);-ms-transform:translateY(0px) rotateZ(3.5deg) scale(0.55);-o-transform:translateY(0px) rotateZ(3.5deg) scale(0.55);transform:translateY(0px) rotateZ(3.5deg) scale(0.55)}to{-webkit-transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);-ms-transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);-o-transform:translateY(-600px) rotateZ(3.5deg) scale(0.55);transform:translateY(-600px) rotateZ(3.5deg) scale(0.55)}}.ddlmdsb-Kb{filter:drop-shadow(0px 2px 2px #362f2799);-webkit-transform:rotateZ(-4deg) scale(1.15);-ms-transform:rotateZ(-4deg) scale(1.15);-o-transform:rotateZ(-4deg) scale(1.15);transform:rotateZ(-4deg) scale(1.15);position:absolute;width:262px;height:308px;top:84px;left:1000px;will-change:transform}.ddlmdsb-Lb{-webkit-animation:sendEnvelopeInAnim 0.7s forwards ease-in-out;-o-animation:sendEnvelopeInAnim 0.7s forwards ease-in-out;animation:sendEnvelopeInAnim 0.7s forwards ease-in-out}@keyframes sendEnvelopeInAnim{from{-webkit-transform:translateX(0px) rotateZ(-4deg) scale(1.15);-ms-transform:translateX(0px) rotateZ(-4deg) scale(1.15);-o-transform:translateX(0px) rotateZ(-4deg) scale(1.15);transform:translateX(0px) rotateZ(-4deg) scale(1.15)}to{-webkit-transform:translateX(-412px) rotateZ(-4deg) scale(1.15);-ms-transform:translateX(-412px) rotateZ(-4deg) scale(1.15);-o-transform:translateX(-412px) rotateZ(-4deg) scale(1.15);transform:translateX(-412px) rotateZ(-4deg) scale(1.15)}}.ddlmdsb-Mb{-webkit-animation:sendEnvelopeOutAnim 0.7s forwards ease-in-out;-o-animation:sendEnvelopeOutAnim 0.7s forwards ease-in-out;animation:sendEnvelopeOutAnim 0.7s forwards ease-in-out}@keyframes sendEnvelopeOutAnim{from{-webkit-transform:translateX(-412px) rotateZ(-4deg) scale(1.15);-ms-transform:translateX(-412px) rotateZ(-4deg) scale(1.15);-o-transform:translateX(-412px) rotateZ(-4deg) scale(1.15);transform:translateX(-412px) rotateZ(-4deg) scale(1.15)}to{-webkit-transform:translateX(0px) rotateZ(-4deg) scale(1.15);-ms-transform:translateX(0px) rotateZ(-4deg) scale(1.15);-o-transform:translateX(0px) rotateZ(-4deg) scale(1.15);transform:translateX(0px) rotateZ(-4deg) scale(1.15)}}.ddlmdsb-Nb{text-align:left;display:inline-block;position:absolute;bottom:36px;left:25px;max-width:210px;font-size:36px;color:#563c8a;-webkit-transform:rotate(-6deg);-ms-transform:rotate(-6deg);-o-transform:rotate(-6deg);transform:rotate(-6deg)}.ddlmdsb-Ob{position:absolute;bottom:-80px;left:10px;width:100%;pointer-events:all;will-change:transform}.ddlmdsb-Pb{display:inline-block;vertical-align:middle}.ddlmdsb-Pb button,.ddlmdsb-Pb a{border:none;outline:none;padding:0;margin:0 10px;cursor:pointer;width:76px;height:76px;vertical-align:middle;filter:drop-shadow(0px 1px 1px #362f27);-webkit-transition:transform 100ms ease-in-out;-o-transition:transform 100ms ease-in-out;transition:transform 100ms ease-in-out}.ddlmdsb-Pb button:hover,.ddlmdsb-Pb a:hover{-webkit-transform:rotate(-8deg);-ms-transform:rotate(-8deg);-o-transform:rotate(-8deg);transform:rotate(-8deg)}.ddlmdsb-Pb button:active,.ddlmdsb-Pb a:active{-webkit-transform:rotate(-8deg) scale(0.9);-ms-transform:rotate(-8deg) scale(0.9);-o-transform:rotate(-8deg) scale(0.9);transform:rotate(-8deg) scale(0.9)}.ddlmdsb-Pb button.ddlmdsb-Qb{position:absolute;left:0;bottom:5px}.ddlmdsb-Rb{display:inline-block}.ddlmdsb-Sb{margin-left:100px}.ddlmdsb-Tb{width:162px;height:61px;margin-bottom:12px}.ddlmdsb-Tb:active{-webkit-transform:scale(0.9);-ms-transform:scale(0.9);-o-transform:scale(0.9);transform:scale(0.9)}.ddlmdsb-Ub{position:relative;float:left;left:15px;top:8px;width:38px;height:43px}.ddlmdsb-Vb{font-size:26px;color:white;line-height:60px;max-width:90px}.ddlmdsb-Wb{position:absolute;right:10px;bottom:0}.ddlmdsb-Xb{position:relative;display:inline-block;text-align:left;width:404px;height:81px;margin-left:5px;bottom:3px;vertical-align:middle}.ddlmdsb-Yb{border:none;outline:none;cursor:pointer;position:absolute;top:15px;left:30px;width:48px;height:55px}.ddlmdsb-Zb{position:absolute;font-size:22px;color:#563c8a;line-height:81px;left:90px;width:280px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;background:none;outline:none;border:none}.ddlmdsb-ac{-webkit-animation:shareFooterInAnim 800ms forwards ease-in-out;-o-animation:shareFooterInAnim 800ms forwards ease-in-out;animation:shareFooterInAnim 800ms forwards ease-in-out}@keyframes shareFooterInAnim{0%,75%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}100%{-webkit-transform:translateY(-90px);-ms-transform:translateY(-90px);-o-transform:translateY(-90px);transform:translateY(-90px)}}.ddlmdsb-bc{-webkit-animation:shareFooterOutAnim 800ms forwards ease-in-out;-o-animation:shareFooterOutAnim 800ms forwards ease-in-out;animation:shareFooterOutAnim 800ms forwards ease-in-out}@keyframes shareFooterOutAnim{0%{-webkit-transform:translateY(-90px);-ms-transform:translateY(-90px);-o-transform:translateY(-90px);transform:translateY(-90px)}25%,100%{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}}.ddlmdsb-cc{display:none;position:absolute;width:122px;height:50px;top:-50px;left:-18px;font-size:20px;color:white;line-height:50px;text-align:center;filter:drop-shadow(0px 1px 1px #362f27bf)}.ddlmdsb-dc{display:initial;-webkit-animation:showCopyToastAnim 2s forwards ease-in-out;-o-animation:showCopyToastAnim 2s forwards ease-in-out;animation:showCopyToastAnim 2s forwards ease-in-out}@keyframes showCopyToastAnim{0%{opacity:0}10%,90%{opacity:1}100%{opacity:0}}.ddlmdsb-ec{display:none;overflow:hidden}.ddlmdsb-fc{position:absolute;top:0;left:0;background-color:transparent;width:100%;height:100%}.ddlmdsb-w .ddlmdsb-fc{background-color:rgb(124,100,157)}.ddlmdsb-w .ddlmdsb-gc{left:375px;bottom:540px;-webkit-animation:receiveEnvelopeInPart1Anim 1600ms ease-out forwards,receiveEnvelopeInPart2Anim 1200ms ease-in forwards;-o-animation:receiveEnvelopeInPart1Anim 1600ms ease-out forwards,receiveEnvelopeInPart2Anim 1200ms ease-in forwards;animation:receiveEnvelopeInPart1Anim 1600ms ease-out forwards,receiveEnvelopeInPart2Anim 1200ms ease-in forwards;-webkit-animation-delay:0.6s,2s;-o-animation-delay:0.6s,2s;animation-delay:0.6s,2s}@keyframes receiveEnvelopeInPart1Anim{0%{-webkit-transform:translateY(0px) scale(1.5);-ms-transform:translateY(0px) scale(1.5);-o-transform:translateY(0px) scale(1.5);transform:translateY(0px) scale(1.5)}45%,100%{-webkit-transform:translateY(380px) scale(1.5);-ms-transform:translateY(380px) scale(1.5);-o-transform:translateY(380px) scale(1.5);transform:translateY(380px) scale(1.5)}}@keyframes receiveEnvelopeInPart2Anim{0%,55%{-webkit-transform:translateY(380px) scale(1.5);-ms-transform:translateY(380px) scale(1.5);-o-transform:translateY(380px) scale(1.5);transform:translateY(380px) scale(1.5)}100%{-webkit-transform:translateY(900px) scale(1.5);-ms-transform:translateY(900px) scale(1.5);-o-transform:translateY(900px) scale(1.5);transform:translateY(900px) scale(1.5)}}.ddlmdsb-hc{-webkit-transform:scale(0.83);-ms-transform:scale(0.83);-o-transform:scale(0.83);transform:scale(0.83);position:relative;top:5000px;left:0;margin-left:auto;margin-right:auto;background:url(./paper.png);pointer-events:none;-webkit-box-shadow:1px 1px 5px #0007;-moz-box-shadow:1px 1px 5px #0007;box-shadow:1px 1px 5px #0007;z-index:1}.ddlmdsb-w .ddlmdsb-hc{-webkit-animation:receiveCanvasIn 0.8s ease-out forwards;-o-animation:receiveCanvasIn 0.8s ease-out forwards;animation:receiveCanvasIn 0.8s ease-out forwards;-webkit-animation-delay:3.2s;-o-animation-delay:3.2s;animation-delay:3.2s}.ddlmdsb-x .ddlmdsb-hc{-webkit-animation:receiveCanvasOut 0.8s forwards;-o-animation:receiveCanvasOut 0.8s forwards;animation:receiveCanvasOut 0.8s forwards}@keyframes receiveCanvasIn{0%{top:540px}100%{top:-20px}}@keyframes receiveCanvasOut{0%{top:-20px}100%{top:740px}}.ddlmdsb-ic{pointer-events:all;width:50%}.ddlmdsb-jc{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:absolute;left:0;bottom:0;width:200%;-webkit-transition:left 500ms ease-in-out;-o-transition:left 500ms ease-in-out;transition:left 500ms ease-in-out;-webkit-transform:translateY(128px);-ms-transform:translateY(128px);-o-transform:translateY(128px);transform:translateY(128px);will-change:transform;z-index:1}.ddlmdsb-jc .ddlmdsb-Ob{bottom:0;left:50%;width:50%}.ddlmdsb-kc{-webkit-animation:receiveFooterIn 0.5s ease-in forwards;-o-animation:receiveFooterIn 0.5s ease-in forwards;animation:receiveFooterIn 0.5s ease-in forwards}.ddlmdsb-x .ddlmdsb-jc{-webkit-animation:receiveFooterOut 0.5s ease-out forwards;-o-animation:receiveFooterOut 0.5s ease-out forwards;animation:receiveFooterOut 0.5s ease-out forwards}.ddlmdsb-lc .ddlmdsb-jc{left:0}.ddlmdsb-mc .ddlmdsb-jc{left:-100%}@keyframes receiveFooterIn{from{-webkit-transform:translateY(128px);-ms-transform:translateY(128px);-o-transform:translateY(128px);transform:translateY(128px)}to{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}}@keyframes receiveFooterOut{from{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}to{-webkit-transform:translateY(128px);-ms-transform:translateY(128px);-o-transform:translateY(128px);transform:translateY(128px)}}.ddlmdsb-ic button{color:#fff;margin:20px;border:none;outline:none;font-family:unset;font-size:25px;height:61px;text-align:center;filter:drop-shadow(0px 1px 1px rgba(54,47,39,0.75))}.ddlmdsb-ic button:hover{-webkit-transform:scale(1.05);-ms-transform:scale(1.05);-o-transform:scale(1.05);transform:scale(1.05);filter:drop-shadow(0px 2px 2px rgba(54,47,39,0.75))}.ddlmdsb-nc{width:162px}.ddlmdsb-oc{width:221px}.ddlmdsb-gc{position:absolute;background-origin:content-box;padding:0;width:170px;height:122px;filter:drop-shadow(0px 2px 2px #362f2799);text-align:left}.ddlmdsb-pc{padding-top:78px}.ddlmdsb-qc{text-align:left;display:inline-block;position:relative;top:45px;left:15px;max-width:145px;font-size:36px;color:#563c8a;-webkit-transform:rotate(-6deg);-ms-transform:rotate(-6deg);-o-transform:rotate(-6deg);transform:rotate(-6deg)}.ddlmdsb-rc{position:absolute;left:0;bottom:-50px;will-change:transform}.ddlmdsb-sc{-webkit-animation:cardboardFillAnim 0.8s forwards ease-in-out;-o-animation:cardboardFillAnim 0.8s forwards ease-in-out;animation:cardboardFillAnim 0.8s forwards ease-in-out}.ddlmdsb-tc{-webkit-animation:cardboardFillFastAnim 0.5s forwards ease-in;-o-animation:cardboardFillFastAnim 0.5s forwards ease-in;animation:cardboardFillFastAnim 0.5s forwards ease-in}.ddlmdsb-uc{-webkit-animation:cardboardBelowBottomAnim 0.8s forwards ease-in-out;-o-animation:cardboardBelowBottomAnim 0.8s forwards ease-in-out;animation:cardboardBelowBottomAnim 0.8s forwards ease-in-out}@keyframes cardboardFillAnim{from{-webkit-transform:translateY(-750px);-ms-transform:translateY(-750px);-o-transform:translateY(-750px);transform:translateY(-750px)}to{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}}@keyframes cardboardFillFastAnim{from{-webkit-transform:translateY(-750px);-ms-transform:translateY(-750px);-o-transform:translateY(-750px);transform:translateY(-750px)}to{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}}@keyframes cardboardBelowBottomAnim{from{-webkit-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px)}to{-webkit-transform:translateY(-750px);-ms-transform:translateY(-750px);-o-transform:translateY(-750px);transform:translateY(-750px)}}@keyframes cta-animation{0%{-webkit-transform:scale(0.544);-ms-transform:scale(0.544);-o-transform:scale(0.544);transform:scale(0.544)}10%{-webkit-transform:scale(0.544);-ms-transform:scale(0.544);-o-transform:scale(0.544);transform:scale(0.544)}30%{-webkit-transform:scale(0.66);-ms-transform:scale(0.66);-o-transform:scale(0.66);transform:scale(0.66)}40%{-webkit-transform:scale(0.66) rotate(-10deg);-ms-transform:scale(0.66) rotate(-10deg);-o-transform:scale(0.66) rotate(-10deg);transform:scale(0.66) rotate(-10deg)}60%{-webkit-transform:scale(0.66) rotate(10deg);-ms-transform:scale(0.66) rotate(10deg);-o-transform:scale(0.66) rotate(10deg);transform:scale(0.66) rotate(10deg)}70%{-webkit-transform:scale(0.66);-ms-transform:scale(0.66);-o-transform:scale(0.66);transform:scale(0.66)}90%{-webkit-transform:scale(0.544);-ms-transform:scale(0.544);-o-transform:scale(0.544);transform:scale(0.544)}100%{-webkit-transform:scale(0.544);-ms-transform:scale(0.544);-o-transform:scale(0.544);transform:scale(0.544)}}@keyframes scissors-animation{0%{-webkit-transform:scale(0.72) rotate(30deg);-ms-transform:scale(0.72) rotate(30deg);-o-transform:scale(0.72) rotate(30deg);transform:scale(0.72) rotate(30deg)}60%{-webkit-transform:scale(0.72) rotate(-30deg);-ms-transform:scale(0.72) rotate(-30deg);-o-transform:scale(0.72) rotate(-30deg);transform:scale(0.72) rotate(-30deg)}}@keyframes glue-animation{0%{-webkit-transform:scale(0.68) rotate(-10deg);-ms-transform:scale(0.68) rotate(-10deg);-o-transform:scale(0.68) rotate(-10deg);transform:scale(0.68) rotate(-10deg)}60%{-webkit-transform:scale(0.68) rotate(10deg);-ms-transform:scale(0.68) rotate(10deg);-o-transform:scale(0.68) rotate(10deg);transform:scale(0.68) rotate(10deg)}}.ddlmdsb-vc,.ddlmdsb-wc,.ddlmdsb-xc{position:absolute;opacity:0;-webkit-transition:opacity 500ms;-o-transition:opacity 500ms;transition:opacity 500ms;pointer-events:all}.ddlmdsb-vc{top:98px;left:115px;-webkit-transform:scale(0.66);-ms-transform:scale(0.66);-o-transform:scale(0.66);transform:scale(0.66)}.ddlmdsb-wc{top:144px;left:271px;-webkit-transform:scale(0.72);-ms-transform:scale(0.72);-o-transform:scale(0.72);transform:scale(0.72)}.ddlmdsb-xc{top:11px;left:256px;-webkit-transform:scale(0.68);-ms-transform:scale(0.68);-o-transform:scale(0.68);transform:scale(0.68)}.ddlmdsb-yc.ddlmdsb-zc:hover .ddlmdsb-wc{-webkit-animation:scissors-animation 1s steps(1,end) infinite;-o-animation:scissors-animation 1s steps(1,end) infinite;animation:scissors-animation 1s steps(1,end) infinite;-webkit-animation-direction:alternate;-o-animation-direction:alternate;animation-direction:alternate}.ddlmdsb-yc.ddlmdsb-zc:hover .ddlmdsb-xc{-webkit-animation:glue-animation 1s steps(1,end) infinite;-o-animation:glue-animation 1s steps(1,end) infinite;animation:glue-animation 1s steps(1,end) infinite;-webkit-animation-direction:alternate;-o-animation-direction:alternate;animation-direction:alternate}.ddlmdsb-Ac{-webkit-animation:cta-animation 3s linear infinite;-o-animation:cta-animation 3s linear infinite;animation:cta-animation 3s linear infinite}.ddlmdsb-zc .ddlmdsb-vc,.ddlmdsb-zc .ddlmdsb-wc,.ddlmdsb-zc .ddlmdsb-xc{opacity:1}.ddlmdsb-Bc{pointer-events:all;cursor:pointer}.ddlmdsb-Cc{position:relative;left:0;top:0;width:100%;height:100%}#hplogocta,#hplogo{-webkit-transition:opacity 500ms;-o-transition:opacity 500ms;transition:opacity 500ms}#hplogocta.ddlmdsb-Dc,#hplogo.ddlmdsb-Ec{opacity:0}';
    a.appendChild(d);
    this.oa = new yh(
      6e4,
      function () {
        var k = c.o;
        k.g && ((k.g = !1), (k.i = !0));
        mg();
      },
      function () {
        return Mn(c);
      }
    );
    Re(this, this.oa);
    this.s = new Dg(this.g);
    this.H = new Xg(this);
    Re(this, this.H);
    d = Hk();
    var e = !!d && Md() && !Ld(),
      f = !Ld() && zg();
    this.Ta = (e || f) && !Id;
    this.O = dh.W();
    kh(this.O, a, this.H, function (k) {
      Cg(c.s, k);
    });
    gh(this.O);
    this.N = mh(this.g.width, this.g.height);
    this.N.appendChild(this.g);
    this.Ta ||
      ((b.dataset.width = "500"),
      (b.dataset.height = "200"),
      lh(this.O, b),
      lh(this.O, this.N));
    this.i = document.createElement("div");
    this.i.className = "ddlmdsb-a";
    this.Ta && this.i.classList.add("ddlmdsb-b");
    this.i.style.width = "960px";
    this.i.style.height = "540px";
    this.i.style.fontFamily = Ck;
    this.N.appendChild(this.i);
    this.Ta || a.appendChild(this.N);
    var g = document.createElement("div");
    b.appendChild(g);
    var h = -1;
    this.wa = function () {
      if (!c.Ta) {
        var k = c.N.offsetHeight / 540;
        k !== h &&
          ((h = k),
          (c.i.style.transform = "scale(" + k + ") translate3d(-50%,-50%,0)"),
          Cg(c.s));
      }
    };
    this.wa();
    this.V = new xg(this.i, function () {
      return c.O.close();
    });
    this.V.g.classList.add("ddlmdsb-d");
    this.Bb = new Hn(this.i, this.g, this.s, d);
    Re(this, this.Bb);
    this.T = null;
    this.ha = !1;
    Nn(this);
    this.U = new Yk(
      g,
      this.H,
      function () {
        var k = function () {
          return Oa(function (l) {
            c.ka.title = "";
            c.Ta ||
              (document.getElementById("hplogo").classList.remove("ddlmdsb-Ec"),
              document.getElementById("hplogo").classList.add("fpdoodleready"),
              g.remove());
            th(0);
            H(0);
            if (!(0.1 < Math.random())) {
              a: {
                try {
                  if (
                    "object" === typeof WebAssembly &&
                    "function" === typeof WebAssembly.instantiate
                  ) {
                    var m = Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0),
                      r = new WebAssembly.Module(m);
                    var p =
                      r instanceof WebAssembly.Module &&
                      new WebAssembly.Instance(r) instanceof
                        WebAssembly.Instance;
                    break a;
                  }
                } catch (x) {}
                p = !1;
              }
              rh.d2 = p ? "true" : "false";
              !sh.includes("d2") && sh.push("d2");
              H(106);
            }
            c.Bb.start();
            l.g = 0;
          });
        };
        c.Ta
          ? On(c, k)
          : al(c.U).then(function () {
              On(c, k);
            });
      },
      e
    );
  };
  v(Pn, B);
  var Qn = function (a) {
      return new mn(
        a.N,
        function () {
          return Cg(a.s);
        },
        function () {
          var b = a.o;
          b.g && ((b.g = !1), (b.i = !0));
          mg();
          Xk(a.U);
        }
      );
    },
    co = function (a) {
      a.T = new Qg(a.ka, function () {
        return Cg(a.s);
      });
      Re(a, a.T);
    },
    On = function (a, b) {
      yg() || a.o.start();
      a.ha = !0;
      if (a.Ta) {
        var c = Qn(a);
        Zk(a.U);
        pn(c).then(b);
        G(a.H, a.ka, "click", function () {
          return Oa(function (d) {
            if (1 == d.g) return Zk(a.U), Ca(d, pn(c), 2);
            Mn(a);
            d.g = 0;
          });
        });
      } else
        zg()
          ? (co(a),
            Sg(a.T, function () {
              Cg(a.s);
              b();
            }))
          : b();
    },
    Mn = function (a) {
      a.ha || yg() ? (ri(), a.o.start()) : (a.o.o(50), si(a.o));
      a = eg.W();
      a.j && a.j.gain.setValueAtTime(1, a.g.currentTime);
      a.H = !1;
    };
  Pn.prototype.start = function () {
    this.ka.classList.add("fpdoodleready");
    yg() ? this.o.start() : (this.o.o(50), si(this.o));
  };
  var Nn = function (a) {
      pi([document, a.ka, a.N, a.i, a.g]);
      G(
        a.H,
        a.g,
        ["mousedown", "touchstart"],
        function (b) {
          return a.s.handleEvent(b);
        },
        !0
      );
      G(
        a.H,
        document,
        ["mousemove", "touchmove", "mouseup", "touchend", "contextmenu"],
        function (b) {
          return a.s.handleEvent(b);
        },
        !0
      );
      G(a.H, a.ka, "touchend", function () {
        ih(a.O);
        zh(a.oa);
      });
    },
    eo = null,
    fo = function () {
      var a = document.getElementById("hplogo"),
        b = document.getElementById("hplogocta");
      if (a && b) {
        ph = Date.now();
        rh.d = "174786555";
        !qh && Bg() && ((qh = !0), H(10));
        var c = new Promise(function (d) {
          Wg(d);
        });
        jg(a);
        c = [
          ii(),
          ki.W().load(de, ee, Ti, "./"),
          O.W().preload(0),
          new Dh("./paper.png").preload(),
          c,
        ];
        Promise.all(c).then(function () {
          eo = new Pn(a, b);
          eo.start();
        });
      }
    };
  (function (a, b) {
    window.google &&
      google.doodle &&
      (b && nb("google.doodle.cpDestroy", b),
      nb("google.doodle.cpInit", function () {
        b && b();
        a();
      }));
  })(fo, function () {
    Qe(eo);
  });
  fo();
}).call(this);
