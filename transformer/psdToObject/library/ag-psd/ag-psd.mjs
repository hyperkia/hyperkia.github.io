/* esm.sh - ag-psd@30.1.0 */
import { Buffer as __Buffer$ } from "./buffer.mjs";
import * as __0$ from "./base64-js.mjs";
import * as __1$ from "./pako.mjs";
import * as __2$ from "./util.mjs";
var require = n => {
    const e = m => typeof m.default < "u" ? m.default : m,
        c = m => Object.assign({
            __esModule: true
        }, m);
    switch (n) {
        case "base64-js":
            return e(__0$);
        case "pako":
            return c(__1$);
        case "node:util":
            return e(__2$);
        default:
            console.error('module "' + n + '" not found');
            return null;
    }
};
var _a = Object.create;
var jr = Object.defineProperty;
var Ha = Object.getOwnPropertyDescriptor;
var ja = Object.getOwnPropertyNames;
var Wa = Object.getPrototypeOf,
    Xa = Object.prototype.hasOwnProperty;
var yn = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
    get: (n, t) => (typeof require < "u" ? require : n)[t]
}) : e)(function(e) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported')
});
var Ee = (e, n) => () => (n || e((n = {
    exports: {}
}).exports, n), n.exports);
var qa = (e, n, t, r) => {
    if (n && typeof n == "object" || typeof n == "function")
        for (let i of ja(n)) !Xa.call(e, i) && i !== t && jr(e, i, {
            get: () => n[i],
            enumerable: !(r = Ha(n, i)) || r.enumerable
        });
    return e
};
var Ya = (e, n, t) => (t = e != null ? _a(Wa(e)) : {}, qa(n || !e || !e.__esModule ? jr(t, "default", {
    value: e,
    enumerable: !0
}) : t, e));
var Xr = Ee(dt => {
    "use strict";
    Object.defineProperty(dt, "__esModule", {
        value: !0
    });
    dt.decodeJpeg = void 0;
    var Xn = new Int32Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]),
        it = 4017,
        at = 799,
        ot = 3406,
        st = 2276,
        lt = 1567,
        ut = 3784,
        Pn = 5793,
        ct = 2896,
        Za = 100,
        Wr = 64 * 1024 * 1024,
        qt = 0;

    function Dn(e) {
        var n = qt + e;
        if (n > Wr) {
            var t = Math.ceil((n - Wr) / 1024 / 1024);
            throw new Error("Max memory limit exceeded by at least ".concat(t, "MB"))
        }
        qt = n
    }

    function Ka(e, n) {
        for (var t = 16; t > 0 && !e[t - 1];) t--;
        for (var r = [{
                children: [],
                index: 0
            }], i = 0, a = r[0], o = 0; o < t; o++) {
            for (var s = 0; s < e[o]; s++) {
                for (a = r.pop(), a.children[a.index] = n[i]; a.index > 0;) {
                    if (r.length === 0) throw new Error("Could not recreate Huffman Table");
                    a = r.pop()
                }
                for (a.index++, r.push(a); r.length <= o;) {
                    var l = {
                        children: [],
                        index: 0
                    };
                    r.push(l), a.children[a.index] = l.children, a = l
                }
                i++
            }
            if (o + 1 < t) {
                var l = {
                    children: [],
                    index: 0
                };
                r.push(l), a.children[a.index] = l.children, a = l
            }
        }
        return r[0].children
    }

    function Ja(e, n, t, r, i, a, o, s, l) {
        var u = t.mcusPerLine,
            c = t.progressive,
            h = n,
            m = 0,
            S = 0;

        function y() {
            if (S > 0) return S--, m >> S & 1;
            if (m = e[n++], m == 255) {
                var $ = e[n++];
                if ($) throw new Error("unexpected marker: ".concat((m << 8 | $).toString(16)))
            }
            return S = 7, m >>> 7
        }

        function b($) {
            for (var Z = $;;) {
                if (Z = Z[y()], typeof Z == "number") return Z;
                if (Z === void 0) throw new Error("invalid huffman sequence")
            }
        }

        function P($) {
            for (var Z = 0; $ > 0;) Z = Z << 1 | y(), $--;
            return Z
        }

        function g($) {
            var Z = P($);
            return Z >= 1 << $ - 1 ? Z : Z + (-1 << $) + 1
        }

        function F($, Z) {
            var ue = b($.huffmanTableDC),
                he = ue === 0 ? 0 : g(ue);
            Z[0] = $.pred += he;
            for (var le = 1; le < 64;) {
                var ye = b($.huffmanTableAC),
                    Le = ye & 15,
                    Re = ye >> 4;
                if (Le === 0) {
                    if (Re < 15) break;
                    le += 16;
                    continue
                }
                le += Re;
                var en = Xn[le];
                Z[en] = g(Le), le++
            }
        }

        function C($, Z) {
            var ue = b($.huffmanTableDC),
                he = ue === 0 ? 0 : g(ue) << l;
            Z[0] = $.pred += he
        }

        function I($, Z) {
            Z[0] |= y() << l
        }
        var A = 0;

        function k($, Z) {
            if (A > 0) {
                A--;
                return
            }
            for (var ue = a, he = o; ue <= he;) {
                var le = b($.huffmanTableAC),
                    ye = le & 15,
                    Le = le >> 4;
                if (ye === 0) {
                    if (Le < 15) {
                        A = P(Le) + (1 << Le) - 1;
                        break
                    }
                    ue += 16;
                    continue
                }
                ue += Le;
                var Re = Xn[ue];
                Z[Re] = g(ye) * (1 << l), ue++
            }
        }
        var L = 0,
            M = 0;

        function V($, Z) {
            for (var ue = a, he = o, le = 0; ue <= he;) {
                var ye = Xn[ue],
                    Le = Z[ye] < 0 ? -1 : 1;
                switch (L) {
                    case 0:
                        var Re = b($.huffmanTableAC),
                            en = Re & 15;
                        if (le = Re >> 4, en === 0) le < 15 ? (A = P(le) + (1 << le), L = 4) : (le = 16, L = 1);
                        else {
                            if (en !== 1) throw new Error("invalid ACn encoding");
                            M = g(en), L = le ? 2 : 3
                        }
                        continue;
                    case 1:
                    case 2:
                        Z[ye] ? Z[ye] += (y() << l) * Le : (le--, le === 0 && (L = L == 2 ? 3 : 0));
                        break;
                    case 3:
                        Z[ye] ? Z[ye] += (y() << l) * Le : (Z[ye] = M << l, L = 0);
                        break;
                    case 4:
                        Z[ye] && (Z[ye] += (y() << l) * Le);
                        break
                }
                ue++
            }
            L === 4 && (A--, A === 0 && (L = 0))
        }

        function N($, Z, ue, he, le) {
            var ye = ue / u | 0,
                Le = ue % u,
                Re = ye * $.v + he,
                en = Le * $.h + le;
            $.blocks[Re] !== void 0 && Z($, $.blocks[Re][en])
        }

        function q($, Z, ue) {
            var he = ue / $.blocksPerLine | 0,
                le = ue % $.blocksPerLine;
            $.blocks[he] !== void 0 && Z($, $.blocks[he][le])
        }
        var J = r.length,
            D, O;
        c ? a === 0 ? O = s === 0 ? C : I : O = s === 0 ? k : V : O = F;
        var _ = 0,
            x;
        J == 1 ? x = r[0].blocksPerLine * r[0].blocksPerColumn : x = u * t.mcusPerColumn, i || (i = x);
        for (var W, ae, fe; _ < x;) {
            for (var Y = 0; Y < J; Y++) r[Y].pred = 0;
            if (A = 0, J == 1) {
                D = r[0];
                for (var ve = 0; ve < i; ve++) q(D, O, _), _++
            } else
                for (var ve = 0; ve < i; ve++) {
                    for (var Y = 0; Y < J; Y++) {
                        D = r[Y], W = D.h, ae = D.v;
                        for (var Me = 0; Me < ae; Me++)
                            for (var Oe = 0; Oe < W; Oe++) N(D, O, _, Me, Oe)
                    }
                    if (_++, _ === x) break
                }
            if (_ === x)
                do {
                    if (e[n] === 255 && e[n + 1] !== 0) break;
                    n += 1
                } while (n < e.length - 2);
            if (S = 0, fe = e[n] << 8 | e[n + 1], fe < 65280) throw new Error("marker was not found");
            if (fe >= 65488 && fe <= 65495) n += 2;
            else break
        }
        return n - h
    }

    function Qa(e) {
        var n = [],
            t = e.blocksPerLine,
            r = e.blocksPerColumn,
            i = t << 3,
            a = new Int32Array(64),
            o = new Uint8Array(64);

        function s(P, g, F) {
            for (var C = e.quantizationTable, I = F, A = 0; A < 64; A++) I[A] = P[A] * C[A];
            for (var A = 0; A < 8; ++A) {
                var k = 8 * A;
                if (I[1 + k] == 0 && I[2 + k] == 0 && I[3 + k] == 0 && I[4 + k] == 0 && I[5 + k] == 0 && I[6 + k] == 0 && I[7 + k] == 0) {
                    var L = Pn * I[0 + k] + 512 >> 10;
                    I[0 + k] = L, I[1 + k] = L, I[2 + k] = L, I[3 + k] = L, I[4 + k] = L, I[5 + k] = L, I[6 + k] = L, I[7 + k] = L;
                    continue
                }
                var M = Pn * I[0 + k] + 128 >> 8,
                    V = Pn * I[4 + k] + 128 >> 8,
                    N = I[2 + k],
                    q = I[6 + k],
                    J = ct * (I[1 + k] - I[7 + k]) + 128 >> 8,
                    D = ct * (I[1 + k] + I[7 + k]) + 128 >> 8,
                    O = I[3 + k] << 4,
                    _ = I[5 + k] << 4,
                    x = M - V + 1 >> 1;
                M = M + V + 1 >> 1, V = x, x = N * ut + q * lt + 128 >> 8, N = N * lt - q * ut + 128 >> 8, q = x, x = J - _ + 1 >> 1, J = J + _ + 1 >> 1, _ = x, x = D + O + 1 >> 1, O = D - O + 1 >> 1, D = x, x = M - q + 1 >> 1, M = M + q + 1 >> 1, q = x, x = V - N + 1 >> 1, V = V + N + 1 >> 1, N = x, x = J * st + D * ot + 2048 >> 12, J = J * ot - D * st + 2048 >> 12, D = x, x = O * at + _ * it + 2048 >> 12, O = O * it - _ * at + 2048 >> 12, _ = x, I[0 + k] = M + D, I[7 + k] = M - D, I[1 + k] = V + _, I[6 + k] = V - _, I[2 + k] = N + O, I[5 + k] = N - O, I[3 + k] = q + J, I[4 + k] = q - J
            }
            for (var A = 0; A < 8; ++A) {
                var W = A;
                if (I[8 + W] == 0 && I[16 + W] == 0 && I[24 + W] == 0 && I[32 + W] == 0 && I[40 + W] == 0 && I[48 + W] == 0 && I[56 + W] == 0) {
                    var ae = Pn * F[A + 0] + 8192 >> 14;
                    I[0 + W] = ae, I[8 + W] = ae, I[16 + W] = ae, I[24 + W] = ae, I[32 + W] = ae, I[40 + W] = ae, I[48 + W] = ae, I[56 + W] = ae;
                    continue
                }
                var M = Pn * I[0 + W] + 2048 >> 12,
                    V = Pn * I[32 + W] + 2048 >> 12,
                    N = I[16 + W],
                    q = I[48 + W],
                    J = ct * (I[8 + W] - I[56 + W]) + 2048 >> 12,
                    D = ct * (I[8 + W] + I[56 + W]) + 2048 >> 12,
                    O = I[24 + W],
                    _ = I[40 + W],
                    x = M - V + 1 >> 1;
                M = M + V + 1 >> 1, V = x, x = N * ut + q * lt + 2048 >> 12, N = N * lt - q * ut + 2048 >> 12, q = x, x = J - _ + 1 >> 1, J = J + _ + 1 >> 1, _ = x, x = D + O + 1 >> 1, O = D - O + 1 >> 1, D = x, x = M - q + 1 >> 1, M = M + q + 1 >> 1, q = x, x = V - N + 1 >> 1, V = V + N + 1 >> 1, N = x, x = J * st + D * ot + 2048 >> 12, J = J * ot - D * st + 2048 >> 12, D = x, x = O * at + _ * it + 2048 >> 12, O = O * it - _ * at + 2048 >> 12, _ = x, I[0 + W] = M + D, I[56 + W] = M - D, I[8 + W] = V + _, I[48 + W] = V - _, I[16 + W] = N + O, I[40 + W] = N - O, I[24 + W] = q + J, I[32 + W] = q - J
            }
            for (var A = 0; A < 64; ++A) {
                var fe = 128 + (I[A] + 8 >> 4);
                g[A] = fe < 0 ? 0 : fe > 255 ? 255 : fe
            }
        }
        Dn(i * r * 8);
        for (var l = 0; l < r; l++) {
            for (var u = l << 3, c = 0; c < 8; c++) n.push(new Uint8Array(i));
            for (var h = 0; h < t; h++) {
                s(e.blocks[l][h], o, a);
                for (var m = 0, S = h << 3, y = 0; y < 8; y++)
                    for (var b = n[u + y], c = 0; c < 8; c++) b[S + c] = o[m++]
            }
        }
        return n
    }

    function nn(e) {
        return e < 0 ? 0 : e > 255 ? 255 : e
    }

    function $a(e) {
        var n = {
                width: 0,
                height: 0,
                comments: [],
                adobe: void 0,
                components: [],
                exifBuffer: void 0,
                jfif: void 0
            },
            t = Za * 1e3 * 1e3,
            r = 0;

        function i() {
            var Ie = e[r] << 8 | e[r + 1];
            return r += 2, Ie
        }

        function a() {
            var Ie = i(),
                cn = e.subarray(r, r + Ie - 2);
            return r += cn.length, cn
        }

        function o(Ie) {
            var cn = 0,
                jn = 0;
            for (var Wn in Ie.components)
                if (Ie.components.hasOwnProperty(Wn)) {
                    var _e = Ie.components[Wn];
                    cn < _e.h && (cn = _e.h), jn < _e.v && (jn = _e.v)
                } var Or = Math.ceil(Ie.samplesPerLine / 8 / cn),
                Rr = Math.ceil(Ie.scanLines / 8 / jn);
            for (var Wn in Ie.components)
                if (Ie.components.hasOwnProperty(Wn)) {
                    var _e = Ie.components[Wn],
                        za = Math.ceil(Math.ceil(Ie.samplesPerLine / 8) * _e.h / cn),
                        Ga = Math.ceil(Math.ceil(Ie.scanLines / 8) * _e.v / jn),
                        Vr = Or * _e.h,
                        zr = Rr * _e.v,
                        Na = zr * Vr,
                        Gr = [];
                    Dn(Na * 256);
                    for (var Nr = 0; Nr < zr; Nr++) {
                        for (var _r = [], Hr = 0; Hr < Vr; Hr++) _r.push(new Int32Array(64));
                        Gr.push(_r)
                    }
                    _e.blocksPerLine = za, _e.blocksPerColumn = Ga, _e.blocks = Gr
                } Ie.maxH = cn, Ie.maxV = jn, Ie.mcusPerLine = Or, Ie.mcusPerColumn = Rr
        }
        var s = null,
            l = null,
            u = void 0,
            c = 0,
            h = [],
            m = [],
            S = [],
            y = [],
            b = i(),
            P = -1;
        if (b != 65496) throw new Error("SOI not found");
        for (b = i(); b != 65497;) {
            switch (b) {
                case 65280:
                    break;
                case 65504:
                case 65505:
                case 65506:
                case 65507:
                case 65508:
                case 65509:
                case 65510:
                case 65511:
                case 65512:
                case 65513:
                case 65514:
                case 65515:
                case 65516:
                case 65517:
                case 65518:
                case 65519:
                case 65534: {
                    var g = a();
                    if (b === 65534) {
                        for (var F = "", C = 0; C < g.byteLength; C++) F += String.fromCharCode(g[C]);
                        n.comments.push(F)
                    }
                    b === 65504 && g[0] === 74 && g[1] === 70 && g[2] === 73 && g[3] === 70 && g[4] === 0 && (s = {
                        version: {
                            major: g[5],
                            minor: g[6]
                        },
                        densityUnits: g[7],
                        xDensity: g[8] << 8 | g[9],
                        yDensity: g[10] << 8 | g[11],
                        thumbWidth: g[12],
                        thumbHeight: g[13],
                        thumbData: g.subarray(14, 14 + 3 * g[12] * g[13])
                    }), b === 65505 && g[0] === 69 && g[1] === 120 && g[2] === 105 && g[3] === 102 && g[4] === 0 && (n.exifBuffer = g.subarray(5, g.length)), b === 65518 && g[0] === 65 && g[1] === 100 && g[2] === 111 && g[3] === 98 && g[4] === 101 && g[5] === 0 && (l = {
                        version: g[6],
                        flags0: g[7] << 8 | g[8],
                        flags1: g[9] << 8 | g[10],
                        transformCode: g[11]
                    });
                    break
                }
                case 65499: {
                    for (var I = i(), A = I + r - 2; r < A;) {
                        var k = e[r++];
                        Dn(256);
                        var L = new Int32Array(64);
                        if (k >> 4 === 0)
                            for (var M = 0; M < 64; M++) {
                                var V = Xn[M];
                                L[V] = e[r++]
                            } else if (k >> 4 === 1)
                                for (var M = 0; M < 64; M++) {
                                    var V = Xn[M];
                                    L[V] = i()
                                } else throw new Error("DQT: invalid table spec");
                        h[k & 15] = L
                    }
                    break
                }
                case 65472:
                case 65473:
                case 65474: {
                    i(), u = {
                        extended: b === 65473,
                        progressive: b === 65474,
                        precision: e[r++],
                        scanLines: i(),
                        samplesPerLine: i(),
                        components: {},
                        componentsOrder: [],
                        maxH: 0,
                        maxV: 0,
                        mcusPerLine: 0,
                        mcusPerColumn: 0
                    };
                    var N = u.scanLines * u.samplesPerLine;
                    if (N > t) {
                        var q = Math.ceil((N - t) / 1e6);
                        throw new Error("maxResolutionInMP limit exceeded by ".concat(q, "MP"))
                    }
                    for (var J = e[r++], D = 0; D < J; D++) {
                        var O = e[r],
                            _ = e[r + 1] >> 4,
                            x = e[r + 1] & 15,
                            W = e[r + 2];
                        u.componentsOrder.push(O), u.components[O] = {
                            h: _,
                            v: x,
                            quantizationIdx: W,
                            blocksPerColumn: 0,
                            blocksPerLine: 0,
                            blocks: [],
                            pred: 0
                        }, r += 3
                    }
                    o(u), m.push(u);
                    break
                }
                case 65476: {
                    for (var ae = i(), D = 2; D < ae;) {
                        for (var fe = e[r++], Y = new Uint8Array(16), ve = 0, M = 0; M < 16; M++, r++) ve += Y[M] = e[r];
                        Dn(16 + ve);
                        for (var Me = new Uint8Array(ve), M = 0; M < ve; M++, r++) Me[M] = e[r];
                        D += 17 + ve;
                        var Oe = fe & 15,
                            $ = fe >> 4 === 0 ? y : S;
                        $[Oe] = Ka(Y, Me)
                    }
                    break
                }
                case 65501:
                    i(), c = i();
                    break;
                case 65500:
                    i(), i();
                    break;
                case 65498: {
                    i();
                    for (var Z = e[r++], ue = [], D = 0; D < Z; D++) {
                        var he = u.components[e[r++]],
                            le = e[r++];
                        he.huffmanTableDC = y[le >> 4], he.huffmanTableAC = S[le & 15], ue.push(he)
                    }
                    var ye = e[r++],
                        Le = e[r++],
                        Re = e[r++],
                        en = Ja(e, r, u, ue, c, ye, Le, Re >> 4, Re & 15);
                    r += en;
                    break
                }
                case 65535:
                    e[r] !== 255 && r--;
                    break;
                default: {
                    if (e[r - 3] == 255 && e[r - 2] >= 192 && e[r - 2] <= 254) {
                        r -= 3;
                        break
                    } else if (b === 224 || b == 225) {
                        if (P !== -1) throw new Error("first unknown JPEG marker at offset ".concat(P.toString(16), ", second unknown JPEG marker ").concat(b.toString(16), " at offset ").concat((r - 1).toString(16)));
                        P = r - 1;
                        var Br = i();
                        if (e[r + Br - 2] === 255) {
                            r += Br - 2;
                            break
                        }
                    }
                    throw new Error("unknown JPEG marker " + b.toString(16))
                }
            }
            b = i()
        }
        if (m.length != 1) throw new Error("only single frame JPEGs supported");
        for (var D = 0; D < m.length; D++) {
            var rt = m[D].components;
            for (var M in rt) rt[M].quantizationTable = h[rt[M].quantizationIdx], delete rt[M].quantizationIdx
        }
        n.width = u.samplesPerLine, n.height = u.scanLines, n.jfif = s, n.adobe = l, n.components = [];
        for (var D = 0; D < u.componentsOrder.length; D++) {
            var he = u.components[u.componentsOrder[D]];
            n.components.push({
                lines: Qa(he),
                scaleX: he.h / u.maxH,
                scaleY: he.v / u.maxV
            })
        }
        return n
    }

    function eo(e) {
        var n = 0,
            t = !1,
            r = e.width,
            i = e.height,
            a = r * i * e.components.length;
        Dn(a);
        var o = new Uint8Array(a);
        switch (e.components.length) {
            case 1: {
                for (var s = e.components[0], l = 0; l < i; l++)
                    for (var u = s.lines[0 | l * s.scaleY], c = 0; c < r; c++) {
                        var h = u[0 | c * s.scaleX];
                        o[n++] = h
                    }
                break
            }
            case 2: {
                for (var s = e.components[0], m = e.components[1], l = 0; l < i; l++)
                    for (var u = s.lines[0 | l * s.scaleY], S = m.lines[0 | l * m.scaleY], c = 0; c < r; c++) {
                        var y = u[0 | c * s.scaleX];
                        o[n++] = y;
                        var b = S[0 | c * m.scaleX];
                        o[n++] = b
                    }
                break
            }
            case 3: {
                t = !0, e.adobe && e.adobe.transformCode && (t = !0);
                for (var s = e.components[0], m = e.components[1], P = e.components[2], l = 0; l < i; l++)
                    for (var u = s.lines[0 | l * s.scaleY], S = m.lines[0 | l * m.scaleY], g = P.lines[0 | l * P.scaleY], c = 0; c < r; c++) {
                        var h = void 0,
                            F = void 0,
                            C = void 0,
                            I = void 0,
                            A = void 0,
                            k = void 0;
                        t ? (h = u[0 | c * s.scaleX], F = S[0 | c * m.scaleX], C = g[0 | c * P.scaleX], I = nn(h + 1.402 * (C - 128)), A = nn(h - .3441363 * (F - 128) - .71413636 * (C - 128)), k = nn(h + 1.772 * (F - 128))) : (I = u[0 | c * s.scaleX], A = S[0 | c * m.scaleX], k = g[0 | c * P.scaleX]), o[n++] = I, o[n++] = A, o[n++] = k
                    }
                break
            }
            case 4: {
                if (!e.adobe) throw new Error("Unsupported color mode (4 components)");
                t = !1, e.adobe && e.adobe.transformCode && (t = !0);
                for (var s = e.components[0], m = e.components[1], P = e.components[2], L = e.components[3], l = 0; l < i; l++)
                    for (var u = s.lines[0 | l * s.scaleY], S = m.lines[0 | l * m.scaleY], g = P.lines[0 | l * P.scaleY], M = L.lines[0 | l * L.scaleY], c = 0; c < r; c++) {
                        var h = void 0,
                            F = void 0,
                            C = void 0,
                            V = void 0,
                            N = void 0,
                            q = void 0,
                            J = void 0;
                        t ? (h = u[0 | c * s.scaleX], F = S[0 | c * m.scaleX], C = g[0 | c * P.scaleX], V = M[0 | c * L.scaleX], N = 255 - nn(h + 1.402 * (C - 128)), q = 255 - nn(h - .3441363 * (F - 128) - .71413636 * (C - 128)), J = 255 - nn(h + 1.772 * (F - 128))) : (N = u[0 | c * s.scaleX], q = S[0 | c * m.scaleX], J = g[0 | c * P.scaleX], V = M[0 | c * L.scaleX]), o[n++] = 255 - N, o[n++] = 255 - q, o[n++] = 255 - J, o[n++] = 255 - V
                    }
                break
            }
            default:
                throw new Error("Unsupported color mode")
        }
        return o
    }

    function no(e, n) {
        if (qt = 0, e.length === 0) throw new Error("Empty jpeg buffer");
        var t = $a(e);
        Dn(t.width * t.height * 4);
        var r = eo(t),
            i = n(t.width, t.height),
            a = i.width,
            o = i.height,
            s = i.data,
            l = 0,
            u = 0;
        switch (t.components.length) {
            case 1:
                for (var c = 0; c < o; c++)
                    for (var h = 0; h < a; h++) {
                        var m = r[l++];
                        s[u++] = m, s[u++] = m, s[u++] = m, s[u++] = 255
                    }
                break;
            case 3:
                for (var c = 0; c < o; c++)
                    for (var h = 0; h < a; h++) {
                        var S = r[l++],
                            y = r[l++],
                            b = r[l++];
                        s[u++] = S, s[u++] = y, s[u++] = b, s[u++] = 255
                    }
                break;
            case 4:
                for (var c = 0; c < o; c++)
                    for (var h = 0; h < a; h++) {
                        var P = r[l++],
                            g = r[l++],
                            m = r[l++],
                            F = r[l++],
                            S = 255 - nn(P * (1 - F / 255) + F),
                            y = 255 - nn(g * (1 - F / 255) + F),
                            b = 255 - nn(m * (1 - F / 255) + F);
                        s[u++] = S, s[u++] = y, s[u++] = b, s[u++] = 255
                    }
                break;
            default:
                throw new Error("Unsupported color mode")
        }
        return i
    }
    dt.decodeJpeg = no
});
var dn = Ee(G => {
    "use strict";
    Object.defineProperty(G, "__esModule", {
        value: !0
    });
    G.initializeCanvas = G.createImageData = G.createCanvas = G.createCanvasFromData = G.writeDataZipWithoutPrediction = G.writeDataRLE = G.writeDataRaw = G.decodeBitmap = G.imageDataToCanvas = G.resetImageData = G.hasAlpha = G.clamp = G.offsetForChannel = G.MaskParams = G.LayerMaskFlags = G.ColorSpace = G.createEnum = G.revMap = G.largeAdditionalInfoKeys = G.layerColors = G.toBlendMode = G.fromBlendMode = G.RAW_IMAGE_DATA = G.MOCK_HANDLERS = void 0;
    var to = yn("pako"),
        ro = Xr();
    G.MOCK_HANDLERS = !1;
    G.RAW_IMAGE_DATA = !1;
    G.fromBlendMode = {};
    G.toBlendMode = {
        pass: "pass through",
        norm: "normal",
        diss: "dissolve",
        dark: "darken",
        "mul ": "multiply",
        idiv: "color burn",
        lbrn: "linear burn",
        dkCl: "darker color",
        lite: "lighten",
        scrn: "screen",
        "div ": "color dodge",
        lddg: "linear dodge",
        lgCl: "lighter color",
        over: "overlay",
        sLit: "soft light",
        hLit: "hard light",
        vLit: "vivid light",
        lLit: "linear light",
        pLit: "pin light",
        hMix: "hard mix",
        diff: "difference",
        smud: "exclusion",
        fsub: "subtract",
        fdiv: "divide",
        "hue ": "hue",
        "sat ": "saturation",
        colr: "color",
        "lum ": "luminosity"
    };
    Object.keys(G.toBlendMode).forEach(function(e) {
        return G.fromBlendMode[G.toBlendMode[e]] = e
    });
    G.layerColors = ["none", "red", "orange", "yellow", "green", "blue", "violet", "gray"];
    G.largeAdditionalInfoKeys = ["LMsk", "Lr16", "Lr32", "Layr", "Mt16", "Mt32", "Mtrn", "Alph", "FMsk", "lnk2", "FEid", "FXid", "PxSD", "cinf"];

    function qr(e) {
        var n = {};
        return Object.keys(e).forEach(function(t) {
            return n[e[t]] = t
        }), n
    }
    G.revMap = qr;

    function io(e, n, t) {
        var r = qr(t),
            i = function(o) {
                var s = o.split(".")[1];
                if (s && !r[s]) throw new Error("Unrecognized value for enum: '".concat(o, "'"));
                return r[s] || n
            },
            a = function(o) {
                if (o && !t[o]) throw new Error("Invalid value for enum: '".concat(o, "'"));
                return "".concat(e, ".").concat(t[o] || t[n])
            };
        return {
            decode: i,
            encode: a
        }
    }
    G.createEnum = io;
    var ao;
    (function(e) {
        e[e.RGB = 0] = "RGB", e[e.HSB = 1] = "HSB", e[e.CMYK = 2] = "CMYK", e[e.Lab = 7] = "Lab", e[e.Grayscale = 8] = "Grayscale"
    })(ao = G.ColorSpace || (G.ColorSpace = {}));
    var oo;
    (function(e) {
        e[e.PositionRelativeToLayer = 1] = "PositionRelativeToLayer", e[e.LayerMaskDisabled = 2] = "LayerMaskDisabled", e[e.InvertLayerMaskWhenBlending = 4] = "InvertLayerMaskWhenBlending", e[e.LayerMaskFromRenderingOtherData = 8] = "LayerMaskFromRenderingOtherData", e[e.MaskHasParametersAppliedToIt = 16] = "MaskHasParametersAppliedToIt"
    })(oo = G.LayerMaskFlags || (G.LayerMaskFlags = {}));
    var so;
    (function(e) {
        e[e.UserMaskDensity = 1] = "UserMaskDensity", e[e.UserMaskFeather = 2] = "UserMaskFeather", e[e.VectorMaskDensity = 4] = "VectorMaskDensity", e[e.VectorMaskFeather = 8] = "VectorMaskFeather"
    })(so = G.MaskParams || (G.MaskParams = {}));

    function lo(e, n) {
        switch (e) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return n ? 3 : e + 1;
            case -1:
                return n ? 4 : 3;
            default:
                return e + 1
        }
    }
    G.offsetForChannel = lo;

    function uo(e, n, t) {
        return e < n ? n : e > t ? t : e
    }
    G.clamp = uo;

    function co(e) {
        for (var n = e.width * e.height * 4, t = 3; t < n; t += 4)
            if (e.data[t] !== 255) return !0;
        return !1
    }
    G.hasAlpha = co;

    function fo(e) {
        for (var n = e.data, t = n instanceof Float32Array ? 1 : n instanceof Uint16Array ? 65535 : 255, r = 0, i = n.length | 0; r < i; r = r + 4 | 0) n[r + 0] = 0, n[r + 1] = 0, n[r + 2] = 0, n[r + 3] = t
    }
    G.resetImageData = fo;

    function po(e) {
        var n = (0, G.createCanvas)(e.width, e.height),
            t;
        if (e.data instanceof Uint8ClampedArray) t = e;
        else {
            t = (0, G.createImageData)(e.width, e.height);
            var r = e.data,
                i = t.data;
            if (r instanceof Float32Array)
                for (var a = 0, o = r.length; a < o; a += 4) i[a + 0] = Math.round(Math.pow(r[a + 0], 1 / 2.2) * 255), i[a + 1] = Math.round(Math.pow(r[a + 1], 1 / 2.2) * 255), i[a + 2] = Math.round(Math.pow(r[a + 2], 1 / 2.2) * 255), i[a + 3] = Math.round(r[a + 3] * 255);
            else
                for (var s = r instanceof Uint16Array ? 8 : 0, a = 0, o = r.length; a < o; a++) i[a] = r[a] >>> s
        }
        return n.getContext("2d").putImageData(t, 0, 0), n
    }
    G.imageDataToCanvas = po;

    function ho(e, n, t, r) {
        if (!(e instanceof Uint8Array || e instanceof Uint8ClampedArray)) throw new Error("Invalid bit depth");
        for (var i = 0, a = 0, o = 0; i < r; i++)
            for (var s = 0; s < t;)
                for (var l = e[o++], u = 0; u < 8 && s < t; u++, s++, a += 4) {
                    var c = l & 128 ? 0 : 255;
                    l = l << 1, n[a + 0] = c, n[a + 1] = c, n[a + 2] = c, n[a + 3] = 255
                }
    }
    G.decodeBitmap = ho;

    function vo(e, n, t, r) {
        if (!(!t || !r)) {
            for (var i = new Uint8Array(t * r), a = 0; a < i.length; a++) i[a] = e.data[a * 4 + n];
            return i
        }
    }
    G.writeDataRaw = vo;

    function mo(e, n, t, r) {
        var i = n.data,
            a = n.width,
            o = n.height;
        if (!(!a || !o)) {
            for (var s = 4 * a | 0, l = 0, u = t.length * (r ? 4 : 2) * o | 0, c = 0, h = t; c < h.length; c++)
                for (var m = h[c], S = 0, y = m | 0; S < o; S++) {
                    var b = S * s | 0,
                        P = b + s | 0,
                        g = P + m - 4 | 0,
                        F = g - 4 | 0,
                        C = u;
                    for (y = b + m | 0; y < P; y = y + 4 | 0)
                        if (y < F) {
                            var I = i[y];
                            y = y + 4 | 0;
                            var A = i[y];
                            y = y + 4 | 0;
                            var k = i[y];
                            if (I === A && I === k) {
                                for (var L = 3; L < 128 && y < g && i[y + 4 | 0] === I;) L = L + 1 | 0, y = y + 4 | 0;
                                e[u++] = 1 - L, e[u++] = I
                            } else {
                                var M = u,
                                    V = !0,
                                    L = 1;
                                for (e[u++] = 0, e[u++] = I; y < g && L < 128;)
                                    if (y = y + 4 | 0, I = A, A = k, k = i[y], I === A && I === k) {
                                        y = y - 12 | 0, V = !1;
                                        break
                                    } else L++, e[u++] = I;
                                V && (L < 127 ? (e[u++] = A, e[u++] = k, L += 2) : L < 128 ? (e[u++] = A, L++, y = y - 4 | 0) : y = y - 8 | 0), e[M] = L - 1
                            }
                        } else y === g ? (e[u++] = 0, e[u++] = i[y]) : (e[u++] = 1, e[u++] = i[y], y = y + 4 | 0, e[u++] = i[y]);
                    var N = u - C;
                    r && (e[l++] = N >> 24 & 255, e[l++] = N >> 16 & 255), e[l++] = N >> 8 & 255, e[l++] = N & 255
                }
            return e.slice(0, u)
        }
    }
    G.writeDataRLE = mo;

    function go(e, n) {
        for (var t = e.data, r = e.width, i = e.height, a = r * i, o = new Uint8Array(a), s = [], l = 0, u = 0, c = n; u < c.length; u++) {
            for (var h = c[u], m = 0, S = h; m < a; m++, S += 4) o[m] = t[S];
            var y = (0, to.deflate)(o);
            s.push(y), l += y.byteLength
        }
        if (s.length > 0) {
            for (var y = new Uint8Array(l), h = 0, b = 0, P = s; b < P.length; b++) {
                var g = P[b];
                y.set(g, h), h += g.byteLength
            }
            return y
        } else return s[0]
    }
    G.writeDataZipWithoutPrediction = go;

    function yo(e) {
        var n = (0, G.createCanvas)(100, 100);
        try {
            var t = n.getContext("2d"),
                r = (0, ro.decodeJpeg)(e, function(i, a) {
                    return t.createImageData(i, a)
                });
            n.width = r.width, n.height = r.height, t.putImageData(r, 0, 0)
        } catch (i) {
            console.error("JPEG decompression error", i.message)
        }
        return n
    }
    G.createCanvasFromData = yo;
    var So = function() {
        throw new Error("Canvas not initialized, use initializeCanvas method to set up createCanvas method")
    };
    G.createCanvas = So;
    var Yt = void 0,
        bo = function(e, n) {
            return Yt || (Yt = (0, G.createCanvas)(1, 1)), Yt.getContext("2d").createImageData(e, n)
        };
    G.createImageData = bo;
    typeof document < "u" && (G.createCanvas = function(e, n) {
        var t = document.createElement("canvas");
        return t.width = e, t.height = n, t
    });

    function wo(e, n) {
        G.createCanvas = e, G.createImageData = n || G.createImageData
    }
    G.initializeCanvas = wo
});
var Jr = Ee(Ye => {
    "use strict";
    Object.defineProperty(Ye, "__esModule", {
        value: !0
    });
    Ye.decodeString = Ye.encodeString = Ye.encodeStringTo = Ye.stringLengthInBytes = void 0;

    function Zt(e) {
        return (e & 4294967168) === 0 ? 1 : (e & 4294965248) === 0 ? 2 : (e & 4294901760) === 0 ? 3 : 4
    }

    function Zr(e) {
        for (var n = 0, t = 0; t < e.length; t++) {
            var r = e.charCodeAt(t);
            if (r >= 55296 && r <= 56319) {
                if (t + 1 < e.length) {
                    var i = e.charCodeAt(t + 1);
                    (i & 64512) === 56320 && (t++, n += Zt(((r & 1023) << 10) + (i & 1023) + 65536))
                }
            } else n += Zt(r)
        }
        return n
    }
    Ye.stringLengthInBytes = Zr;

    function Yr(e, n, t) {
        var r = Zt(t);
        switch (r) {
            case 1:
                e[n] = t;
                break;
            case 2:
                e[n] = t >> 6 & 31 | 192, e[n + 1] = t & 63 | 128;
                break;
            case 3:
                e[n] = t >> 12 & 15 | 224, e[n + 1] = t >> 6 & 63 | 128, e[n + 2] = t & 63 | 128;
                break;
            default:
                e[n] = t >> 18 & 7 | 240, e[n + 1] = t >> 12 & 63 | 128, e[n + 2] = t >> 6 & 63 | 128, e[n + 3] = t & 63 | 128;
                break
        }
        return r
    }

    function Kr(e, n, t) {
        for (var r = 0; r < t.length; r++) {
            var i = t.charCodeAt(r);
            if (i >= 55296 && i <= 56319) {
                if (r + 1 < t.length) {
                    var a = t.charCodeAt(r + 1);
                    if ((a & 64512) === 56320) {
                        r++;
                        var o = ((i & 1023) << 10) + (a & 1023) + 65536;
                        n += Yr(e, n, o)
                    }
                }
            } else n += Yr(e, n, i)
        }
        return n
    }
    Ye.encodeStringTo = Kr;

    function Fo(e) {
        if (e.length > 1e3 && typeof TextEncoder < "u") return new TextEncoder().encode(e);
        var n = new Uint8Array(Zr(e));
        return Kr(n, 0, e), n
    }
    Ye.encodeString = Fo;

    function Un(e, n) {
        if (n >= e.length) throw Error("Invalid byte index");
        var t = e[n];
        if ((t & 192) === 128) return t & 63;
        throw Error("Invalid continuation byte")
    }

    function Io(e) {
        if (e.byteLength > 1e3 && typeof TextDecoder < "u") return new TextDecoder().decode(e);
        for (var n = [], t = 0; t < e.length;) {
            var r = e[t++],
                i = void 0;
            if ((r & 128) === 0) i = r;
            else if ((r & 224) === 192) {
                var a = Un(e, t++);
                if (i = (r & 31) << 6 | a, i < 128) throw Error("Invalid continuation byte")
            } else if ((r & 240) === 224) {
                var a = Un(e, t++),
                    o = Un(e, t++);
                if (i = (r & 15) << 12 | a << 6 | o, i < 2048) throw Error("Invalid continuation byte");
                if (i >= 55296 && i <= 57343) throw Error("Lone surrogate U+".concat(i.toString(16).toUpperCase(), " is not a scalar value"))
            } else if ((r & 248) === 240) {
                var a = Un(e, t++),
                    o = Un(e, t++),
                    s = Un(e, t++);
                if (i = (r & 15) << 18 | a << 12 | o << 6 | s, i < 65536 || i > 1114111) throw Error("Invalid continuation byte")
            } else throw Error("Invalid UTF-8 detected");
            i > 65535 && (i -= 65536, n.push(String.fromCharCode(i >>> 10 & 1023 | 55296)), i = 56320 | i & 1023), n.push(String.fromCharCode(i))
        }
        return n.join("")
    }
    Ye.decodeString = Io
});
var bt = Ee(w => {
    "use strict";
    var tn = w && w.__assign || function() {
            return tn = Object.assign || function(e) {
                for (var n, t = 1, r = arguments.length; t < r; t++) {
                    n = arguments[t];
                    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                }
                return e
            }, tn.apply(this, arguments)
        },
        Co = w && w.__rest || function(e, n) {
            var t = {};
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
            if (e != null && typeof Object.getOwnPropertySymbols == "function")
                for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) n.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (t[r[i]] = e[r[i]]);
            return t
        };
    Object.defineProperty(w, "__esModule", {
        value: !0
    });
    w.ESliceOrigin = w.ESliceVertAlign = w.ESliceHorzAlign = w.ESliceType = w.FrFl = w.FStl = w.ClrS = w.gradientInterpolationMethodType = w.stdTrackID = w.animInterpStyleEnum = w.GrdT = w.IGSr = w.BETE = w.BESs = w.bvlT = w.BESl = w.BlnM = w.warpStyle = w.Annt = w.Ornt = w.textGridding = w.frac = w.unitsValue = w.unitsPercentF = w.unitsPercent = w.unitsAngle = w.parseUnitsToNumber = w.parseUnitsOrNumber = w.parseUnits = w.parsePercentOrAngle = w.parsePercent = w.parseAngle = w.serializeColor = w.parseColor = w.serializeVectorContent = w.parseVectorContent = w.serializeTrackList = w.parseTrackList = w.parseEffects = w.serializeEffects = w.boundsToDescBounds = w.descBoundsToBounds = w.xyToHorzVrtc = w.horzVrtcToXY = w.writeVersionAndDescriptor = w.readVersionAndDescriptor = w.writeDescriptorStructure = w.readDescriptorStructure = w.readAsciiStringOrClassId = w.setLogErrors = void 0;
    w.presetKindType = w.prjM = w.FlMd = w.IntC = w.IntE = w.Drct = w.WndM = w.CntE = w.FlCl = w.ExtR = w.ExtT = w.DfsM = w.blurType = w.Lns = w.MztT = w.Chnl = w.Dstr = w.ZZTy = w.Wvtp = w.SphM = w.RplS = w.Cnvr = w.UndA = w.DspM = w.SmBQ = w.SmBM = w.BlrQ = w.BlrM = w.strokeStyleLineAlignment = w.strokeStyleLineJoinType = w.strokeStyleLineCapType = w.ESliceBGColorType = void 0;
    var X = dn(),
        te = fn(),
        ie = En();

    function Po(e) {
        var n = {};
        return Object.keys(e).forEach(function(t) {
            return n[e[t]] = t
        }), n
    }
    var qn = {
            "#Ang": "Angle",
            "#Rsl": "Density",
            "#Rlt": "Distance",
            "#Nne": "None",
            "#Prc": "Percent",
            "#Pxl": "Pixels",
            "#Mlm": "Millimeters",
            "#Pnt": "Points",
            RrPi: "Picas",
            RrIn: "Inches",
            RrCm: "Centimeters"
        },
        ft = Po(qn),
        Yn = !1;

    function Do(e) {
        Yn = e
    }
    w.setLogErrors = Do;

    function T(e, n) {
        return {
            name: e,
            classID: n
        }
    }
    var re = T("", "null"),
        Kt = !1,
        ii = {
            strokeStyleContent: T("", "solidColorLayer"),
            printProofSetup: T(Kt ? "\u6821\u6837\u8BBE\u7F6E" : "Proof Setup", "proofSetup"),
            Grad: T(Kt ? "\u6E10\u53D8" : "Gradient", "Grdn"),
            Trnf: T(Kt ? "\u53D8\u6362" : "Transform", "Trnf"),
            patternFill: T("", "patternFill"),
            ebbl: T("", "ebbl"),
            SoFi: T("", "SoFi"),
            GrFl: T("", "GrFl"),
            sdwC: T("", "RGBC"),
            hglC: T("", "RGBC"),
            "Clr ": T("", "RGBC"),
            tintColor: T("", "RGBC"),
            Ofst: T("", "Pnt "),
            ChFX: T("", "ChFX"),
            MpgS: T("", "ShpC"),
            DrSh: T("", "DrSh"),
            IrSh: T("", "IrSh"),
            OrGl: T("", "OrGl"),
            IrGl: T("", "IrGl"),
            TrnS: T("", "ShpC"),
            Ptrn: T("", "Ptrn"),
            FrFX: T("", "FrFX"),
            phase: T("", "Pnt "),
            frameStep: re,
            duration: re,
            workInTime: re,
            workOutTime: re,
            audioClipGroupList: re,
            bounds: T("", "Rctn"),
            customEnvelopeWarp: T("", "customEnvelopeWarp"),
            warp: T("", "warp"),
            "Sz  ": T("", "Pnt "),
            origin: T("", "Pnt "),
            autoExpandOffset: T("", "Pnt "),
            keyOriginShapeBBox: T("", "unitRect"),
            Vrsn: re,
            psVersion: re,
            docDefaultNewArtboardBackgroundColor: T("", "RGBC"),
            artboardRect: T("", "classFloatRect"),
            keyOriginRRectRadii: T("", "radii"),
            keyOriginBoxCorners: re,
            rectangleCornerA: T("", "Pnt "),
            rectangleCornerB: T("", "Pnt "),
            rectangleCornerC: T("", "Pnt "),
            rectangleCornerD: T("", "Pnt "),
            compInfo: re,
            quiltWarp: T("", "quiltWarp"),
            generatorSettings: re,
            crema: re,
            FrIn: re,
            blendOptions: re,
            FXRf: re,
            Lefx: re,
            time: re,
            animKey: re,
            timeScope: re,
            inTime: re,
            outTime: re,
            sheetStyle: re,
            translation: re,
            Skew: re,
            boundingBox: T("", "boundingBox"),
            "Lnk ": T("", "ExternalFileLink"),
            frameReader: T("", "FrameReader"),
            effectParams: T("", "motionTrackEffectParams"),
            Impr: T("None", "none"),
            Anch: T("", "Pnt "),
            "Fwd ": T("", "Pnt "),
            "Bwd ": T("", "Pnt "),
            FlrC: T("", "Pnt "),
            meshBoundaryPath: T("", "pathClass"),
            filterFX: T("", "filterFXStyle"),
            Fltr: T("", "rigidTransform"),
            FrgC: T("", "RGBC"),
            BckC: T("", "RGBC"),
            sdwM: T("Parameters", "adaptCorrectTones"),
            hglM: T("Parameters", "adaptCorrectTones"),
            customShape: T("", "customShape"),
            origFXRefPoint: re,
            FXRefPoint: re,
            ClMg: T("", "ClMg")
        },
        ai = {
            "Crv ": T("", "CrPt"),
            Clrs: T("", "Clrt"),
            Trns: T("", "TrnS"),
            keyDescriptorList: re,
            solidFillMulti: T("", "SoFi"),
            gradientFillMulti: T("", "GrFl"),
            dropShadowMulti: T("", "DrSh"),
            innerShadowMulti: T("", "IrSh"),
            frameFXMulti: T("", "FrFX"),
            FrIn: re,
            FSts: re,
            LaSt: re,
            sheetTimelineOptions: re,
            trackList: T("", "animationTrack"),
            globalTrackList: T("", "animationTrack"),
            keyList: re,
            audioClipGroupList: re,
            audioClipList: re,
            countObjectList: T("", "countObject"),
            countGroupList: T("", "countGroup"),
            slices: T("", "slice"),
            "Pts ": T("", "Pthp"),
            SbpL: T("", "SbpL"),
            pathComponents: T("", "PaCm"),
            filterFXList: T("", "filterFX"),
            puppetShapeList: T("", "puppetShape"),
            channelDenoise: T("", "channelDenoiseParams"),
            ShrP: T("", "Pnt "),
            layerSettings: re,
            list: re,
            Adjs: T("", "CrvA")
        },
        Qr = {
            TEXT: ["Txt ", "printerName", "Nm  ", "Idnt", "blackAndWhitePresetFileName", "LUT3DFileName", "presetFileName", "curvesPresetFileName", "mixerPresetFileName", "placed", "description", "reason", "artboardPresetName", "json", "clipID", "relPath", "fullPath", "mediaDescriptor", "Msge", "altTag", "url", "cellText", "preset", "KnNm", "FPth", "comment", "originalPath"],
            tdta: ["EngineData", "LUT3DFileData", "indexArray", "originalVertexArray", "deformedVertexArray", "LqMe"],
            long: ["TextIndex", "RndS", "Mdpn", "Smth", "Lctn", "strokeStyleVersion", "LaID", "Vrsn", "Cnt ", "Brgh", "Cntr", "means", "vibrance", "Strt", "bwPresetKind", "comp", "compID", "originalCompID", "curvesPresetKind", "mixerPresetKind", "uOrder", "vOrder", "PgNm", "totalPages", "Crop", "numerator", "denominator", "frameCount", "Annt", "keyOriginType", "unitValueQuadVersion", "keyOriginIndex", "major", "minor", "fix", "docDefaultNewArtboardBackgroundType", "artboardBackgroundType", "numModifyingFX", "deformNumRows", "deformNumCols", "FrID", "FrDl", "FsID", "LCnt", "AFrm", "AFSt", "numBefore", "numAfter", "Spcn", "minOpacity", "maxOpacity", "BlnM", "sheetID", "gblA", "globalAltitude", "descVersion", "frameReaderType", "LyrI", "zoomOrigin", "fontSize", "Rds ", "sliceID", "topOutset", "leftOutset", "bottomOutset", "rightOutset", "filterID", "meshQuality", "meshExpansion", "meshRigidity", "VrsM", "VrsN", "NmbG", "WLMn", "WLMx", "AmMn", "AmMx", "SclH", "SclV", "Lvl ", "TlNm", "TlOf", "FlRs", "Thsh", "ShrS", "ShrE", "FlRs", "Vrnc", "Strg", "ExtS", "ExtD", "HrzS", "VrtS", "NmbR", "EdgF", "Ang1", "Ang2", "Ang3", "Ang4", "lastAppliedComp", "capturedInfo"],
            enum: ["textGridding", "Ornt", "warpStyle", "warpRotate", "Inte", "Bltn", "ClrS", "BlrQ", "bvlT", "bvlS", "bvlD", "Md  ", "glwS", "GrdF", "GlwT", "RplS", "BlrM", "SmBM", "strokeStyleLineCapType", "strokeStyleLineJoinType", "strokeStyleLineAlignment", "strokeStyleBlendMode", "PntT", "Styl", "lookupType", "LUTFormat", "dataOrder", "tableOrder", "enableCompCore", "enableCompCoreGPU", "compCoreSupport", "compCoreGPUSupport", "Engn", "enableCompCoreThreads", "gs99", "FrDs", "trackID", "animInterpStyle", "horzAlign", "vertAlign", "bgColorType", "shapeOperation", "UndA", "Wvtp", "Drct", "WndM", "Edg ", "FlCl", "IntE", "IntC", "Cnvr", "Fl  ", "Dstr", "MztT", "Lns ", "ExtT", "DspM", "ExtR", "ZZTy", "SphM", "SmBQ", "placedLayerOCIOConversion", "gradientsInterpolationMethod"],
            bool: ["PstS", "printSixteenBit", "masterFXSwitch", "enab", "uglg", "antialiasGloss", "useShape", "useTexture", "uglg", "antialiasGloss", "useShape", "Vsbl", "useTexture", "Algn", "Rvrs", "Dthr", "Invr", "VctC", "ShTr", "layerConceals", "strokeEnabled", "fillEnabled", "strokeStyleScaleLock", "strokeStyleStrokeAdjust", "hardProof", "MpBl", "paperWhite", "useLegacy", "Auto", "Lab ", "useTint", "keyShapeInvalidated", "autoExpandEnabled", "autoNestEnabled", "autoPositionEnabled", "shrinkwrapOnSaveEnabled", "present", "showInDialog", "overprint", "sheetDisclosed", "lightsDisclosed", "meshesDisclosed", "materialsDisclosed", "hasMotion", "muted", "Effc", "selected", "autoScope", "fillCanvas", "cellTextIsHTML", "Smoo", "Clsp", "validAtPosition", "rigidType", "hasoptions", "filterMaskEnable", "filterMaskLinked", "filterMaskExtendWithWhite", "removeJPEGArtifact", "Mnch", "ExtF", "ExtM", "moreAccurate", "GpuY", "LIWy", "Cnty"],
            doub: ["warpValue", "warpPerspective", "warpPerspectiveOther", "Intr", "Wdth", "Hght", "strokeStyleMiterLimit", "strokeStyleResolution", "layerTime", "keyOriginResolution", "xx", "xy", "yx", "yy", "tx", "ty", "FrGA", "frameRate", "audioLevel", "rotation", "X   ", "Y   ", "redFloat", "greenFloat", "blueFloat", "imageResolution", "PuX0", "PuX1", "PuX2", "PuX3", "PuY0", "PuY1", "PuY2", "PuY3"],
            UntF: ["sdwO", "hglO", "lagl", "Lald", "srgR", "blur", "Sftn", "Opct", "Dstn", "Angl", "Ckmt", "Nose", "Inpr", "ShdN", "strokeStyleLineWidth", "strokeStyleLineDashOffset", "strokeStyleOpacity", "H   ", "Top ", "Left", "Btom", "Rght", "Rslt", "topRight", "topLeft", "bottomLeft", "bottomRight", "ClNs", "Shrp"],
            VlLs: ["Crv ", "Clrs", "Mnm ", "Mxm ", "Trns", "pathList", "strokeStyleLineDashSet", "FrLs", "slices", "LaSt", "Trnf", "nonAffineTransform", "keyDescriptorList", "guideIndeces", "gradientFillMulti", "solidFillMulti", "frameFXMulti", "innerShadowMulti", "dropShadowMulti", "FrIn", "FSts", "FsFr", "sheetTimelineOptions", "audioClipList", "trackList", "globalTrackList", "keyList", "audioClipList", "warpValues", "selectedPin", "Pts ", "SbpL", "pathComponents", "pinOffsets", "posFinalPins", "pinVertexIndices", "PinP", "PnRt", "PnOv", "PnDp", "filterFXList", "puppetShapeList", "ShrP", "channelDenoise", "Mtrx", "layerSettings", "list", "compList", "Adjs"],
            ObAr: ["meshPoints", "quiltSliceX", "quiltSliceY"],
            "obj ": ["null", "Chnl"],
            "Pth ": ["DspF"]
        },
        Uo = ["Rd  ", "Grn ", "Bl  ", "Yllw", "Ylw ", "Cyn ", "Mgnt", "Blck", "Gry ", "Lmnc", "A   ", "B   "],
        oi = {
            "Mnm ": "long",
            "Mxm ": "long",
            FrLs: "long",
            strokeStyleLineDashSet: "UntF",
            Trnf: "doub",
            nonAffineTransform: "doub",
            keyDescriptorList: "Objc",
            gradientFillMulti: "Objc",
            solidFillMulti: "Objc",
            frameFXMulti: "Objc",
            innerShadowMulti: "Objc",
            dropShadowMulti: "Objc",
            LaSt: "Objc",
            FrIn: "Objc",
            FSts: "Objc",
            FsFr: "long",
            blendOptions: "Objc",
            sheetTimelineOptions: "Objc",
            keyList: "Objc",
            warpValues: "doub",
            selectedPin: "long",
            "Pts ": "Objc",
            SbpL: "Objc",
            pathComponents: "Objc",
            pinOffsets: "doub",
            posFinalPins: "doub",
            pinVertexIndices: "long",
            PinP: "doub",
            PnRt: "long",
            PnOv: "bool",
            PnDp: "doub",
            filterFXList: "Objc",
            puppetShapeList: "Objc",
            ShrP: "Objc",
            channelDenoise: "Objc",
            Mtrx: "long",
            compList: "long",
            Chnl: "enum"
        },
        St = {};
    for (pt = 0, Jt = Object.keys(Qr); pt < Jt.length; pt++)
        for (Qt = Jt[pt], ht = 0, $t = Qr[Qt]; ht < $t.length; ht++) an = $t[ht], St[an] = Qt;
    var Qt, an, ht, $t, pt, Jt;
    for (vt = 0, er = Object.keys(ii); vt < er.length; vt++) an = er[vt], St[an] || (St[an] = "Objc");
    var an, vt, er;
    for (mt = 0, nr = Object.keys(ai); mt < nr.length; mt++) an = nr[mt], oi[an] = "Objc";
    var an, mt, nr;

    function Ao(e, n, t, r) {
        return e === "presetKind" ? typeof n == "string" ? "enum" : "long" : e === "null" && t === "slices" ? "TEXT" : e === "groupID" ? t === "slices" ? "long" : "TEXT" : e === "Sz  " ? "Wdth" in n ? "Objc" : "units" in n ? "UntF" : "doub" : e === "Type" ? typeof n == "string" ? "enum" : "long" : e === "AntA" ? typeof n == "string" ? "enum" : "bool" : (e === "Hrzn" || e === "Vrtc") && (r.Type === "keyType.Pstn" || r._classID === "Ofst") ? "long" : e === "Hrzn" || e === "Vrtc" || e === "Top " || e === "Left" || e === "Btom" || e === "Rght" ? t === "slices" ? "long" : typeof n == "number" ? "doub" : "UntF" : e === "Vrsn" ? typeof n == "number" ? "long" : "Objc" : e === "Rd  " || e === "Grn " || e === "Bl  " ? t === "artd" ? "long" : "doub" : e === "Trnf" ? Array.isArray(n) ? "VlLs" : "Objc" : St[e]
    }

    function Ze(e) {
        var n = (0, te.readInt32)(e);
        return (0, te.readAsciiString)(e, n || 4)
    }
    w.readAsciiStringOrClassId = Ze;

    function rn(e, n) {
        if (n.length === 4 && n !== "warp" && n !== "time" && n !== "hold" && n !== "list")(0, ie.writeInt32)(e, 0), (0, ie.writeSignature)(e, n);
        else {
            (0, ie.writeInt32)(e, n.length);
            for (var t = 0; t < n.length; t++)(0, ie.writeUint8)(e, n.charCodeAt(t))
        }
    }

    function rr(e, n) {
        for (var t = Sn(e), r = n ? {
                _name: t.name,
                _classID: t.classID
            } : {}, i = (0, te.readUint32)(e), a = 0; a < i; a++) {
            var o = Ze(e),
                s = (0, te.readSignature)(e),
                l = si(e, s, n);
            r[o] = l
        }
        return r
    }
    w.readDescriptorStructure = rr;

    function ir(e, n, t, r, i) {
        Yn && !t && console.log("Missing classId for: ", n, t, r), (0, ie.writeUnicodeStringWithPadding)(e, n), rn(e, t);
        var a = Object.keys(r),
            o = a.length;
        "_name" in r && o--, "_classID" in r && o--, (0, ie.writeUint32)(e, o);
        for (var s = 0, l = a; s < l.length; s++) {
            var u = l[s];
            if (!(u === "_name" || u === "_classID")) {
                var c = Ao(u, r[u], i, r),
                    h = ii[u];
                u === "bounds" && i === "text" ? h = T("", "bounds") : u === "origin" ? c = i === "slices" ? "enum" : "Objc" : (u === "Cyn " || u === "Mgnt" || u === "Ylw " || u === "Blck") && r._classID === "CMYC" ? c = "doub" : /^PN[a-z][a-z]$/.test(u) ? c = "TEXT" : /^PT[a-z][a-z]$/.test(u) ? c = "long" : /^PF[a-z][a-z]$/.test(u) || (u === "Rds " || u === "Thsh") && typeof r[u] == "number" && r._classID === "SmrB" ? c = "doub" : u === "ClSz" || u === "Rds " || u === "Amnt" ? c = typeof r[u] == "number" ? "long" : "UntF" : (u === "sdwM" || u === "hglM") && typeof r[u] == "string" || u === "blur" && typeof r[u] == "string" ? c = "enum" : u === "Hght" && typeof r[u] == "number" && r._classID === "Embs" || u === "Angl" && typeof r[u] == "number" && (r._classID === "Embs" || r._classID === "smartSharpen" || r._classID === "Twrl" || r._classID === "MtnB") ? c = "long" : u === "Angl" && typeof r[u] == "number" ? c = "doub" : u === "bounds" && i === "slices" ? (c = "Objc", h = T("", "Rct1")) : u === "Scl " ? typeof r[u] == "object" && "Hrzn" in r[u] ? (c = "Objc", h = re) : typeof r[u] == "number" ? c = "long" : c = "UntF" : u === "audioClipGroupList" && a.length === 1 ? c = "VlLs" : (u === "Strt" || u === "Brgh") && "H   " in r ? c = "doub" : u === "Wdth" && typeof r[u] == "object" ? c = "UntF" : u === "Ofst" && typeof r[u] == "number" ? c = "long" : u === "Strt" && typeof r[u] == "object" ? (c = "Objc", h = re) : Uo.indexOf(u) !== -1 ? c = t === "RGBC" && i !== "artd" ? "doub" : "long" : u === "profile" ? c = t === "printOutput" ? "TEXT" : "tdta" : u === "strokeStyleContent" ? r[u]["Clr "] ? h = T("", "solidColorLayer") : r[u].Grad ? h = T("", "gradientLayer") : r[u].Ptrn ? h = T("", "patternLayer") : Yn && console.log("Invalid strokeStyleContent value", r[u]) : u === "bounds" && i === "quiltWarp" && (h = T("", "classFloatRect")), h && h.classID === "RGBC" && "H   " in r[u] && (h = {
                    classID: "HSBC",
                    name: ""
                }), rn(e, u), (0, ie.writeSignature)(e, c || "long"), li(e, c || "long", r[u], u, h, i), Yn && !c && console.log("Missing descriptor field type for: '".concat(u, "' in"), r)
            }
        }
    }
    w.writeDescriptorStructure = ir;

    function si(e, n, t) {
        switch (n) {
            case "obj ":
                return xo(e);
            case "Objc":
            case "GlbO":
                return rr(e, t);
            case "VlLs": {
                for (var r = (0, te.readInt32)(e), i = [], a = 0; a < r; a++) {
                    var o = (0, te.readSignature)(e);
                    i.push(si(e, o, t))
                }
                return i
            }
            case "doub":
                return (0, te.readFloat64)(e);
            case "UntF": {
                var s = (0, te.readSignature)(e),
                    l = (0, te.readFloat64)(e);
                if (!qn[s]) throw new Error("Invalid units: ".concat(s));
                return {
                    units: qn[s],
                    value: l
                }
            }
            case "UnFl": {
                var s = (0, te.readSignature)(e),
                    l = (0, te.readFloat32)(e);
                if (!qn[s]) throw new Error("Invalid units: ".concat(s));
                return {
                    units: qn[s],
                    value: l
                }
            }
            case "TEXT":
                return (0, te.readUnicodeString)(e);
            case "enum": {
                var u = Ze(e),
                    l = Ze(e);
                return "".concat(u, ".").concat(l)
            }
            case "long":
                return (0, te.readInt32)(e);
            case "comp": {
                var c = (0, te.readUint32)(e),
                    h = (0, te.readUint32)(e);
                return {
                    low: c,
                    high: h
                }
            }
            case "bool":
                return !!(0, te.readUint8)(e);
            case "type":
            case "GlbC":
                return Sn(e);
            case "alis": {
                var m = (0, te.readInt32)(e);
                return (0, te.readAsciiString)(e, m)
            }
            case "tdta": {
                var S = (0, te.readInt32)(e);
                return (0, te.readBytes)(e, S)
            }
            case "ObAr": {
                (0, te.readInt32)(e), (0, te.readUnicodeString)(e), Ze(e);
                for (var y = (0, te.readInt32)(e), i = [], a = 0; a < y; a++) {
                    var b = Ze(e);
                    (0, te.readSignature)(e), (0, te.readSignature)(e);
                    for (var P = (0, te.readInt32)(e), g = [], F = 0; F < P; F++) g.push((0, te.readFloat64)(e));
                    i.push({
                        type: b,
                        values: g
                    })
                }
                return i
            }
            case "Pth ": {
                (0, te.readInt32)(e);
                var C = (0, te.readSignature)(e);
                (0, te.readInt32LE)(e);
                var I = (0, te.readInt32LE)(e),
                    A = (0, te.readUnicodeStringWithLengthLE)(e, I);
                return {
                    sig: C,
                    path: A
                }
            }
            default:
                throw new Error("Invalid TySh descriptor OSType: ".concat(n, " at ").concat(e.offset.toString(16)))
        }
    }
    var Eo = {
        meshPoints: "rationalPoint",
        quiltSliceX: "UntF",
        quiltSliceY: "UntF"
    };

    function li(e, n, t, r, i, a) {
        switch (n) {
            case "obj ":
                ko(e, r, t);
                break;
            case "Objc":
            case "GlbO": {
                if (typeof t != "object") throw new Error("Invalid struct value: ".concat(JSON.stringify(t), ", key: ").concat(r));
                if (!i) throw new Error("Missing ext type for: '".concat(r, "' (").concat(JSON.stringify(t), ")"));
                var o = t._name || i.name,
                    s = t._classID || i.classID;
                ir(e, o, s, t, a);
                break
            }
            case "VlLs":
                if (!Array.isArray(t)) throw new Error("Invalid list value: ".concat(JSON.stringify(t), ", key: ").concat(r));
                (0, ie.writeInt32)(e, t.length);
                for (var l = 0; l < t.length; l++) {
                    var u = oi[r];
                    (0, ie.writeSignature)(e, u || "long"), li(e, u || "long", t[l], "".concat(r, "[]"), ai[r], a), Yn && !u && console.log("Missing descriptor array type for: '".concat(r, "' in"), t)
                }
                break;
            case "doub":
                if (typeof t != "number") throw new Error("Invalid number value: ".concat(JSON.stringify(t), ", key: ").concat(r));
                (0, ie.writeFloat64)(e, t);
                break;
            case "UntF":
                if (!ft[t.units]) throw new Error("Invalid units: ".concat(t.units, " in ").concat(r));
                (0, ie.writeSignature)(e, ft[t.units]), (0, ie.writeFloat64)(e, t.value);
                break;
            case "UnFl":
                if (!ft[t.units]) throw new Error("Invalid units: ".concat(t.units, " in ").concat(r));
                (0, ie.writeSignature)(e, ft[t.units]), (0, ie.writeFloat32)(e, t.value);
                break;
            case "TEXT":
                (0, ie.writeUnicodeStringWithPadding)(e, t);
                break;
            case "enum": {
                if (typeof t != "string") throw new Error("Invalid enum value: ".concat(JSON.stringify(t), ", key: ").concat(r));
                var c = t.split("."),
                    h = c[0],
                    m = c[1];
                rn(e, h), rn(e, m);
                break
            }
            case "long":
                if (typeof t != "number") throw new Error("Invalid integer value: ".concat(JSON.stringify(t), ", key: ").concat(r));
                (0, ie.writeInt32)(e, t);
                break;
            case "bool":
                if (typeof t != "boolean") throw new Error("Invalid boolean value: ".concat(JSON.stringify(t), ", key: ").concat(r));
                (0, ie.writeUint8)(e, t ? 1 : 0);
                break;
            case "tdta":
                (0, ie.writeInt32)(e, t.byteLength), (0, ie.writeBytes)(e, t);
                break;
            case "ObAr": {
                (0, ie.writeInt32)(e, 16), (0, ie.writeUnicodeStringWithPadding)(e, "");
                var S = Eo[r];
                if (!S) throw new Error("Not implemented ObArType for: ".concat(r));
                rn(e, S), (0, ie.writeInt32)(e, t.length);
                for (var l = 0; l < t.length; l++) {
                    rn(e, t[l].type), (0, ie.writeSignature)(e, "UnFl"), (0, ie.writeSignature)(e, "#Pxl"), (0, ie.writeInt32)(e, t[l].values.length);
                    for (var y = 0; y < t[l].values.length; y++)(0, ie.writeFloat64)(e, t[l].values[y])
                }
                break
            }
            case "Pth ": {
                var b = 12 + t.path.length * 2;
                (0, ie.writeInt32)(e, b), (0, ie.writeSignature)(e, t.sig), (0, ie.writeInt32LE)(e, b), (0, ie.writeInt32LE)(e, t.path.length), (0, ie.writeUnicodeStringWithoutLengthLE)(e, t.path);
                break
            }
            default:
                throw new Error("Not implemented descriptor OSType: ".concat(n))
        }
    }

    function xo(e) {
        for (var n = (0, te.readInt32)(e), t = [], r = 0; r < n; r++) {
            var i = (0, te.readSignature)(e);
            switch (i) {
                case "prop": {
                    Sn(e);
                    var a = Ze(e);
                    t.push(a);
                    break
                }
                case "Clss":
                    t.push(Sn(e));
                    break;
                case "Enmr": {
                    Sn(e);
                    var o = Ze(e),
                        s = Ze(e);
                    t.push("".concat(o, ".").concat(s));
                    break
                }
                case "rele": {
                    Sn(e), t.push((0, te.readUint32)(e));
                    break
                }
                case "Idnt":
                    t.push((0, te.readInt32)(e));
                    break;
                case "indx":
                    t.push((0, te.readInt32)(e));
                    break;
                case "name": {
                    Sn(e), t.push((0, te.readUnicodeString)(e));
                    break
                }
                default:
                    throw new Error("Invalid descriptor reference type: ".concat(i))
            }
        }
        return t
    }

    function ko(e, n, t) {
        (0, ie.writeInt32)(e, t.length);
        for (var r = 0; r < t.length; r++) {
            var i = t[r],
                a = "unknown";
            switch (typeof i == "string" && (/^[a-z ]+\.[a-z ]+$/i.test(i) ? a = "Enmr" : a = "name"), (0, ie.writeSignature)(e, a), a) {
                case "Enmr": {
                    var o = i.split("."),
                        s = o[0],
                        l = o[1];
                    $r(e, "\0", s), rn(e, s), rn(e, l);
                    break
                }
                case "name": {
                    $r(e, "\0", "Lyr "), (0, ie.writeUnicodeString)(e, i + "\0");
                    break
                }
                default:
                    throw new Error("Invalid descriptor reference type: ".concat(a))
            }
        }
        return t
    }

    function Sn(e) {
        var n = (0, te.readUnicodeString)(e),
            t = Ze(e);
        return {
            name: n,
            classID: t
        }
    }

    function $r(e, n, t) {
        (0, ie.writeUnicodeString)(e, n), rn(e, t)
    }

    function Mo(e, n) {
        n === void 0 && (n = !1);
        var t = (0, te.readUint32)(e);
        if (t !== 16) throw new Error("Invalid descriptor version: ".concat(t));
        var r = rr(e, n);
        return r
    }
    w.readVersionAndDescriptor = Mo;

    function Lo(e, n, t, r, i) {
        i === void 0 && (i = ""), (0, ie.writeUint32)(e, 16), ir(e, n, t, r, i)
    }
    w.writeVersionAndDescriptor = Lo;

    function gt(e) {
        return {
            x: e.Hrzn,
            y: e.Vrtc
        }
    }
    w.horzVrtcToXY = gt;

    function yt(e) {
        return {
            Hrzn: e.x,
            Vrtc: e.y
        }
    }
    w.xyToHorzVrtc = yt;

    function To(e) {
        return {
            top: We(e["Top "]),
            left: We(e.Left),
            right: We(e.Rght),
            bottom: We(e.Btom)
        }
    }
    w.descBoundsToBounds = To;

    function Bo(e) {
        var n;
        return n = {
            Left: Ke(e.left, "bounds.left")
        }, n["Top "] = Ke(e.top, "bounds.top"), n.Rght = Ke(e.right, "bounds.right"), n.Btom = Ke(e.bottom, "bounds.bottom"), n
    }
    w.boundsToDescBounds = Bo;

    function ei(e) {
        var n = {
            enabled: !!e.enab,
            position: w.FStl.decode(e.Styl),
            fillType: w.FrFl.decode(e.PntT),
            blendMode: w.BlnM.decode(e["Md  "]),
            opacity: Ce(e.Opct),
            size: We(e["Sz  "])
        };
        return e.present !== void 0 && (n.present = e.present), e.showInDialog !== void 0 && (n.showInDialog = e.showInDialog), e.overprint !== void 0 && (n.overprint = e.overprint), e["Clr "] && (n.color = bn(e["Clr "])), e.Grad && (n.gradient = pi(e)), e.Ptrn && (n.pattern = hi(e)), n
    }

    function ni(e) {
        var n = {};
        return n.enab = !!e.enabled, e.present !== void 0 && (n.present = !!e.present), e.showInDialog !== void 0 && (n.showInDialog = !!e.showInDialog), n.Styl = w.FStl.encode(e.position), n.PntT = w.FrFl.encode(e.fillType), n["Md  "] = w.BlnM.encode(e.blendMode), n.Opct = Pe(e.opacity), n["Sz  "] = Ke(e.size, "size"), e.color && (n["Clr "] = wn(e.color)), e.gradient && (n = tn(tn({}, n), vi(e.gradient))), e.pattern && (n = tn(tn({}, n), mi(e.pattern))), e.overprint !== void 0 && (n.overprint = !!e.overprint), n
    }

    function ui(e, n, t) {
        for (var r, i, a, o = t ? {
                "Scl ": tr((r = e.scale) !== null && r !== void 0 ? r : 1),
                masterFXSwitch: !e.disabled
            } : {
                masterFXSwitch: !e.disabled,
                "Scl ": tr((i = e.scale) !== null && i !== void 0 ? i : 1)
            }, s = ["dropShadow", "innerShadow", "solidFill", "gradientOverlay", "stroke"], l = 0, u = s; l < u.length; l++) {
            var c = u[l];
            if (e[c] && !Array.isArray(e[c])) throw new Error("".concat(c, " should be an array"))
        }
        var h = function(C) {
                return !!C && C.length > 1 && t
            },
            m = function(C) {
                return !!C && C.length >= 1 && (!t || C.length === 1)
            };
        if (m(e.dropShadow) && (o.DrSh = ze(e.dropShadow[0], "dropShadow", n)), h(e.dropShadow) && (o.dropShadowMulti = e.dropShadow.map(function(C) {
                return ze(C, "dropShadow", n)
            })), m(e.innerShadow) && (o.IrSh = ze(e.innerShadow[0], "innerShadow", n)), h(e.innerShadow) && (o.innerShadowMulti = e.innerShadow.map(function(C) {
                return ze(C, "innerShadow", n)
            })), e.outerGlow && (o.OrGl = ze(e.outerGlow, "outerGlow", n)), h(e.solidFill) && (o.solidFillMulti = e.solidFill.map(function(C) {
                return ze(C, "solidFill", n)
            })), h(e.gradientOverlay) && (o.gradientFillMulti = e.gradientOverlay.map(function(C) {
                return ze(C, "gradientOverlay", n)
            })), h(e.stroke) && (o.frameFXMulti = e.stroke.map(function(C) {
                return ni(C)
            })), e.innerGlow && (o.IrGl = ze(e.innerGlow, "innerGlow", n)), e.bevel && (o.ebbl = ze(e.bevel, "bevel", n)), m(e.solidFill) && (o.SoFi = ze(e.solidFill[0], "solidFill", n)), e.patternOverlay && (o.patternFill = ze(e.patternOverlay, "patternOverlay", n)), m(e.gradientOverlay) && (o.GrFl = ze(e.gradientOverlay[0], "gradientOverlay", n)), e.satin && (o.ChFX = ze(e.satin, "satin", n)), m(e.stroke) && (o.FrFX = ni((a = e.stroke) === null || a === void 0 ? void 0 : a[0])), t) {
            o.numModifyingFX = 0;
            for (var S = 0, y = Object.keys(e); S < y.length; S++) {
                var c = y[S],
                    b = e[c];
                if (Array.isArray(b))
                    for (var P = 0, g = b; P < g.length; P++) {
                        var F = g[P];
                        F.enabled && o.numModifyingFX++
                    } else b.enabled && o.numModifyingFX++
            }
        }
        return o
    }
    w.serializeEffects = ui;

    function ci(e, n) {
        var t = {},
            r = e.masterFXSwitch,
            i = e.DrSh,
            a = e.dropShadowMulti,
            o = e.IrSh,
            s = e.innerShadowMulti,
            l = e.OrGl,
            u = e.IrGl,
            c = e.ebbl,
            h = e.SoFi,
            m = e.solidFillMulti,
            S = e.patternFill,
            y = e.GrFl,
            b = e.gradientFillMulti,
            P = e.ChFX,
            g = e.FrFX,
            F = e.frameFXMulti,
            C = e.numModifyingFX,
            I = Co(e, ["masterFXSwitch", "DrSh", "dropShadowMulti", "IrSh", "innerShadowMulti", "OrGl", "IrGl", "ebbl", "SoFi", "solidFillMulti", "patternFill", "GrFl", "gradientFillMulti", "ChFX", "FrFX", "frameFXMulti", "numModifyingFX"]);
        return r || (t.disabled = !0), e["Scl "] && (t.scale = Ce(e["Scl "])), i && (t.dropShadow = [Ve(i, n)]), a && (t.dropShadow = a.map(function(A) {
            return Ve(A, n)
        })), o && (t.innerShadow = [Ve(o, n)]), s && (t.innerShadow = s.map(function(A) {
            return Ve(A, n)
        })), l && (t.outerGlow = Ve(l, n)), u && (t.innerGlow = Ve(u, n)), c && (t.bevel = Ve(c, n)), h && (t.solidFill = [Ve(h, n)]), m && (t.solidFill = m.map(function(A) {
            return Ve(A, n)
        })), S && (t.patternOverlay = Ve(S, n)), y && (t.gradientOverlay = [Ve(y, n)]), b && (t.gradientOverlay = b.map(function(A) {
            return Ve(A, n)
        })), P && (t.satin = Ve(P, n)), g && (t.stroke = [ei(g)]), F && (t.stroke = F.map(function(A) {
            return ei(A)
        })), n && Object.keys(I).length > 1 && console.log("Unhandled effect keys:", I), t
    }
    w.parseEffects = ci;

    function ti(e, n) {
        for (var t = [], r = 0; r < e.length; r++) {
            var i = e[r],
                a = i.time,
                o = a.denominator,
                s = a.numerator,
                l = i.selected,
                u = i.animKey,
                c = {
                    numerator: s,
                    denominator: o
                },
                h = w.animInterpStyleEnum.decode(i.animInterpStyle);
            switch (u.Type) {
                case "keyType.Opct":
                    t.push({
                        interpolation: h,
                        time: c,
                        selected: l,
                        type: "opacity",
                        value: Ce(u.Opct)
                    });
                    break;
                case "keyType.Pstn":
                    t.push({
                        interpolation: h,
                        time: c,
                        selected: l,
                        type: "position",
                        x: u.Hrzn,
                        y: u.Vrtc
                    });
                    break;
                case "keyType.Trnf":
                    t.push({
                        interpolation: h,
                        time: c,
                        selected: l,
                        type: "transform",
                        scale: gt(u["Scl "]),
                        skew: gt(u.Skew),
                        rotation: u.rotation,
                        translation: gt(u.translation)
                    });
                    break;
                case "keyType.sheetStyle": {
                    var m = {
                        interpolation: h,
                        time: c,
                        selected: l,
                        type: "style"
                    };
                    u.sheetStyle.Lefx && (m.style = ci(u.sheetStyle.Lefx, n)), t.push(m);
                    break
                }
                case "keyType.globalLighting": {
                    t.push({
                        interpolation: h,
                        time: c,
                        selected: l,
                        type: "globalLighting",
                        globalAngle: u.gblA,
                        globalAltitude: u.globalAltitude
                    });
                    break
                }
                default:
                    throw new Error("Unsupported keyType value")
            }
        }
        return t
    }

    function ri(e) {
        for (var n = [], t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.time,
                a = r.selected,
                o = a === void 0 ? !1 : a,
                s = r.interpolation,
                l = w.animInterpStyleEnum.encode(s),
                u = void 0;
            switch (r.type) {
                case "opacity":
                    u = {
                        Type: "keyType.Opct",
                        Opct: Pe(r.value)
                    };
                    break;
                case "position":
                    u = {
                        Type: "keyType.Pstn",
                        Hrzn: r.x,
                        Vrtc: r.y
                    };
                    break;
                case "transform":
                    u = {
                        Type: "keyType.Trnf",
                        "Scl ": yt(r.scale),
                        Skew: yt(r.skew),
                        rotation: r.rotation,
                        translation: yt(r.translation)
                    };
                    break;
                case "style":
                    u = {
                        Type: "keyType.sheetStyle",
                        sheetStyle: {
                            Vrsn: 1,
                            blendOptions: {}
                        }
                    }, r.style && (u.sheetStyle = {
                        Vrsn: 1,
                        Lefx: ui(r.style, !1, !1),
                        blendOptions: {}
                    });
                    break;
                case "globalLighting": {
                    u = {
                        Type: "keyType.globalLighting",
                        gblA: r.globalAngle,
                        globalAltitude: r.globalAltitude
                    };
                    break
                }
                default:
                    throw new Error("Unsupported keyType value")
            }
            n.push({
                Vrsn: 1,
                animInterpStyle: l,
                time: i,
                animKey: u,
                selected: o
            })
        }
        return n
    }

    function Oo(e, n) {
        for (var t = [], r = 0; r < e.length; r++) {
            var i = e[r],
                a = {
                    type: w.stdTrackID.decode(i.trackID),
                    enabled: i.enab,
                    keys: ti(i.keyList, n)
                };
            i.effectParams && (a.effectParams = {
                fillCanvas: i.effectParams.fillCanvas,
                zoomOrigin: i.effectParams.zoomOrigin,
                keys: ti(i.effectParams.keyList, n)
            }), t.push(a)
        }
        return t
    }
    w.parseTrackList = Oo;

    function Ro(e) {
        for (var n = [], t = 0; t < e.length; t++) {
            var r = e[t];
            n.push(tn(tn({
                trackID: w.stdTrackID.encode(r.type),
                Vrsn: 1,
                enab: !!r.enabled,
                Effc: !!r.effectParams
            }, r.effectParams ? {
                effectParams: {
                    keyList: ri(r.keys),
                    fillCanvas: r.effectParams.fillCanvas,
                    zoomOrigin: r.effectParams.zoomOrigin
                }
            } : {}), {
                keyList: ri(r.keys)
            }))
        }
        return n
    }
    w.serializeTrackList = Ro;

    function Ve(e, n) {
        for (var t = {}, r = 0, i = Object.keys(e); r < i.length; r++) {
            var a = i[r],
                o = e[a];
            switch (a) {
                case "enab":
                    t.enabled = !!o;
                    break;
                case "uglg":
                    t.useGlobalLight = !!o;
                    break;
                case "AntA":
                    t.antialiased = !!o;
                    break;
                case "Algn":
                    t.align = !!o;
                    break;
                case "Dthr":
                    t.dither = !!o;
                    break;
                case "Invr":
                    t.invert = !!o;
                    break;
                case "Rvrs":
                    t.reverse = !!o;
                    break;
                case "Clr ":
                    t.color = bn(o);
                    break;
                case "hglC":
                    t.highlightColor = bn(o);
                    break;
                case "sdwC":
                    t.shadowColor = bn(o);
                    break;
                case "Styl":
                    t.position = w.FStl.decode(o);
                    break;
                case "Md  ":
                    t.blendMode = w.BlnM.decode(o);
                    break;
                case "hglM":
                    t.highlightBlendMode = w.BlnM.decode(o);
                    break;
                case "sdwM":
                    t.shadowBlendMode = w.BlnM.decode(o);
                    break;
                case "bvlS":
                    t.style = w.BESl.decode(o);
                    break;
                case "bvlD":
                    t.direction = w.BESs.decode(o);
                    break;
                case "bvlT":
                    t.technique = w.bvlT.decode(o);
                    break;
                case "GlwT":
                    t.technique = w.BETE.decode(o);
                    break;
                case "glwS":
                    t.source = w.IGSr.decode(o);
                    break;
                case "Type":
                    t.type = w.GrdT.decode(o);
                    break;
                case "gs99":
                    t.interpolationMethod = w.gradientInterpolationMethodType.decode(o);
                    break;
                case "Opct":
                    t.opacity = Ce(o);
                    break;
                case "hglO":
                    t.highlightOpacity = Ce(o);
                    break;
                case "sdwO":
                    t.shadowOpacity = Ce(o);
                    break;
                case "lagl":
                    t.angle = Zn(o);
                    break;
                case "Angl":
                    t.angle = Zn(o);
                    break;
                case "Lald":
                    t.altitude = Zn(o);
                    break;
                case "Sftn":
                    t.soften = We(o);
                    break;
                case "srgR":
                    t.strength = Ce(o);
                    break;
                case "blur":
                    t.size = We(o);
                    break;
                case "Nose":
                    t.noise = Ce(o);
                    break;
                case "Inpr":
                    t.range = Ce(o);
                    break;
                case "Ckmt":
                    t.choke = We(o);
                    break;
                case "ShdN":
                    t.jitter = Ce(o);
                    break;
                case "Dstn":
                    t.distance = We(o);
                    break;
                case "Scl ":
                    t.scale = Ce(o);
                    break;
                case "Ptrn":
                    t.pattern = {
                        name: o["Nm  "],
                        id: o.Idnt
                    };
                    break;
                case "phase":
                    t.phase = {
                        x: o.Hrzn,
                        y: o.Vrtc
                    };
                    break;
                case "Ofst":
                    t.offset = {
                        x: Ce(o.Hrzn),
                        y: Ce(o.Vrtc)
                    };
                    break;
                case "MpgS":
                case "TrnS":
                    t.contour = {
                        name: o["Nm  "],
                        curve: o["Crv "].map(function(s) {
                            return {
                                x: s.Hrzn,
                                y: s.Vrtc
                            }
                        })
                    };
                    break;
                case "Grad":
                    t.gradient = di(o);
                    break;
                case "useTexture":
                case "useShape":
                case "layerConceals":
                case "present":
                case "showInDialog":
                case "antialiasGloss":
                    t[a] = o;
                    break;
                case "_name":
                case "_classID":
                    break;
                default:
                    n && console.log("Invalid effect key: '".concat(a, "', value:"), o)
            }
        }
        return t
    }

    function ze(e, n, t) {
        var r = {
            enab: !1
        };
        n === "dropShadow" && (r.TrnS = {
            "Nm  ": "",
            "Crv ": []
        });
        for (var i = 0, a = Object.keys(e); i < a.length; i++) {
            var o = a[i],
                s = o,
                l = e[s];
            switch (s) {
                case "enabled":
                    r.enab = !!l;
                    break;
                case "useGlobalLight":
                    r.uglg = !!l;
                    break;
                case "antialiased":
                    r.AntA = !!l;
                    break;
                case "align":
                    r.Algn = !!l;
                    break;
                case "dither":
                    r.Dthr = !!l;
                    break;
                case "invert":
                    r.Invr = !!l;
                    break;
                case "reverse":
                    r.Rvrs = !!l;
                    break;
                case "color":
                    r["Clr "] = wn(l);
                    break;
                case "highlightColor":
                    r.hglC = wn(l);
                    break;
                case "shadowColor":
                    r.sdwC = wn(l);
                    break;
                case "position":
                    r.Styl = w.FStl.encode(l);
                    break;
                case "blendMode":
                    r["Md  "] = w.BlnM.encode(l);
                    break;
                case "highlightBlendMode":
                    r.hglM = w.BlnM.encode(l);
                    break;
                case "shadowBlendMode":
                    r.sdwM = w.BlnM.encode(l);
                    break;
                case "style":
                    r.bvlS = w.BESl.encode(l);
                    break;
                case "direction":
                    r.bvlD = w.BESs.encode(l);
                    break;
                case "technique":
                    n === "bevel" ? r.bvlT = w.bvlT.encode(l) : r.GlwT = w.BETE.encode(l);
                    break;
                case "source":
                    r.glwS = w.IGSr.encode(l);
                    break;
                case "type":
                    r.Type = w.GrdT.encode(l);
                    break;
                case "interpolationMethod":
                    r.gs99 = w.gradientInterpolationMethodType.encode(l);
                    break;
                case "opacity":
                    r.Opct = Pe(l);
                    break;
                case "highlightOpacity":
                    r.hglO = Pe(l);
                    break;
                case "shadowOpacity":
                    r.sdwO = Pe(l);
                    break;
                case "angle":
                    n === "gradientOverlay" || n === "patternFill" ? r.Angl = An(l) : r.lagl = An(l);
                    break;
                case "altitude":
                    r.Lald = An(l);
                    break;
                case "soften":
                    r.Sftn = Ke(l, s);
                    break;
                case "strength":
                    r.srgR = Pe(l);
                    break;
                case "size":
                    r.blur = Ke(l, s);
                    break;
                case "noise":
                    r.Nose = Pe(l);
                    break;
                case "range":
                    r.Inpr = Pe(l);
                    break;
                case "choke":
                    r.Ckmt = Ke(l, s);
                    break;
                case "jitter":
                    r.ShdN = Pe(l);
                    break;
                case "distance":
                    r.Dstn = Ke(l, s);
                    break;
                case "scale":
                    r["Scl "] = Pe(l);
                    break;
                case "pattern":
                    r.Ptrn = {
                        "Nm  ": l.name,
                        Idnt: l.id
                    };
                    break;
                case "phase":
                    r.phase = {
                        Hrzn: l.x,
                        Vrtc: l.y
                    };
                    break;
                case "offset":
                    r.Ofst = {
                        Hrzn: Pe(l.x),
                        Vrtc: Pe(l.y)
                    };
                    break;
                case "contour": {
                    r[n === "satin" ? "MpgS" : "TrnS"] = {
                        "Nm  ": l.name,
                        "Crv ": l.curve.map(function(u) {
                            return {
                                Hrzn: u.x,
                                Vrtc: u.y
                            }
                        })
                    };
                    break
                }
                case "gradient":
                    r.Grad = fi(l);
                    break;
                case "useTexture":
                case "useShape":
                case "layerConceals":
                case "present":
                case "showInDialog":
                case "antialiasGloss":
                    r[s] = l;
                    break;
                default:
                    t && console.log("Invalid effect key: '".concat(s, "', value:"), l)
            }
        }
        return r
    }

    function di(e) {
        if (e.GrdF === "GrdF.CstS") {
            var n = e.Intr || 4096;
            return {
                type: "solid",
                name: e["Nm  "],
                smoothness: e.Intr / 4096,
                colorStops: e.Clrs.map(function(t) {
                    return {
                        color: bn(t["Clr "]),
                        location: t.Lctn / n,
                        midpoint: t.Mdpn / 100
                    }
                }),
                opacityStops: e.Trns.map(function(t) {
                    return {
                        opacity: Ce(t.Opct),
                        location: t.Lctn / n,
                        midpoint: t.Mdpn / 100
                    }
                })
            }
        } else return {
            type: "noise",
            name: e["Nm  "],
            roughness: e.Smth / 4096,
            colorModel: w.ClrS.decode(e.ClrS),
            randomSeed: e.RndS,
            restrictColors: !!e.VctC,
            addTransparency: !!e.ShTr,
            min: e["Mnm "].map(function(t) {
                return t / 100
            }),
            max: e["Mxm "].map(function(t) {
                return t / 100
            })
        }
    }

    function fi(e) {
        var n, t;
        if (e.type === "solid") {
            var r = Math.round(((n = e.smoothness) !== null && n !== void 0 ? n : 1) * 4096);
            return {
                "Nm  ": e.name || "",
                GrdF: "GrdF.CstS",
                Intr: r,
                Clrs: e.colorStops.map(function(i) {
                    var a;
                    return {
                        "Clr ": wn(i.color),
                        Type: "Clry.UsrS",
                        Lctn: Math.round(i.location * r),
                        Mdpn: Math.round(((a = i.midpoint) !== null && a !== void 0 ? a : .5) * 100)
                    }
                }),
                Trns: e.opacityStops.map(function(i) {
                    var a;
                    return {
                        Opct: Pe(i.opacity),
                        Lctn: Math.round(i.location * r),
                        Mdpn: Math.round(((a = i.midpoint) !== null && a !== void 0 ? a : .5) * 100)
                    }
                })
            }
        } else return {
            GrdF: "GrdF.ClNs",
            "Nm  ": e.name || "",
            ShTr: !!e.addTransparency,
            VctC: !!e.restrictColors,
            ClrS: w.ClrS.encode(e.colorModel),
            RndS: e.randomSeed || 0,
            Smth: Math.round(((t = e.roughness) !== null && t !== void 0 ? t : 1) * 4096),
            "Mnm ": (e.min || [0, 0, 0, 0]).map(function(i) {
                return i * 100
            }),
            "Mxm ": (e.max || [1, 1, 1, 1]).map(function(i) {
                return i * 100
            })
        }
    }

    function pi(e) {
        var n = di(e.Grad);
        return n.style = w.GrdT.decode(e.Type), e.Dthr !== void 0 && (n.dither = e.Dthr), e.gradientsInterpolationMethod !== void 0 && (n.interpolationMethod = w.gradientInterpolationMethodType.decode(e.gradientsInterpolationMethod)), e.Rvrs !== void 0 && (n.reverse = e.Rvrs), e.Angl !== void 0 && (n.angle = Zn(e.Angl)), e["Scl "] !== void 0 && (n.scale = Ce(e["Scl "])), e.Algn !== void 0 && (n.align = e.Algn), e.Ofst !== void 0 && (n.offset = {
            x: Ce(e.Ofst.Hrzn),
            y: Ce(e.Ofst.Vrtc)
        }), n
    }

    function hi(e) {
        var n = {
            name: e.Ptrn["Nm  "],
            id: e.Ptrn.Idnt
        };
        return e.Lnkd !== void 0 && (n.linked = e.Lnkd), e.phase !== void 0 && (n.phase = {
            x: e.phase.Hrzn,
            y: e.phase.Vrtc
        }), n
    }

    function Vo(e) {
        if ("Grad" in e) return pi(e);
        if ("Ptrn" in e) return tn({
            type: "pattern"
        }, hi(e));
        if ("Clr " in e) return {
            type: "color",
            color: bn(e["Clr "])
        };
        throw new Error("Invalid vector content")
    }
    w.parseVectorContent = Vo;

    function vi(e) {
        var n = {};
        return e.dither !== void 0 && (n.Dthr = e.dither), e.interpolationMethod !== void 0 && (n.gradientsInterpolationMethod = w.gradientInterpolationMethodType.encode(e.interpolationMethod)), e.reverse !== void 0 && (n.Rvrs = e.reverse), e.angle !== void 0 && (n.Angl = An(e.angle)), n.Type = w.GrdT.encode(e.style), e.align !== void 0 && (n.Algn = e.align), e.scale !== void 0 && (n["Scl "] = Pe(e.scale)), e.offset && (n.Ofst = {
            Hrzn: Pe(e.offset.x),
            Vrtc: Pe(e.offset.y)
        }), n.Grad = fi(e), n
    }

    function mi(e) {
        var n = {
            Ptrn: {
                "Nm  ": e.name || "",
                Idnt: e.id || ""
            }
        };
        return e.linked !== void 0 && (n.Lnkd = !!e.linked), e.phase !== void 0 && (n.phase = {
            Hrzn: e.phase.x,
            Vrtc: e.phase.y
        }), n
    }

    function zo(e) {
        return e.type === "color" ? {
            key: "SoCo",
            descriptor: {
                "Clr ": wn(e.color)
            }
        } : e.type === "pattern" ? {
            key: "PtFl",
            descriptor: mi(e)
        } : {
            key: "GdFl",
            descriptor: vi(e)
        }
    }
    w.serializeVectorContent = zo;

    function bn(e) {
        if ("H   " in e) return {
            h: gi(e["H   "]),
            s: e.Strt,
            b: e.Brgh
        };
        if ("Rd  " in e) return {
            r: e["Rd  "],
            g: e["Grn "],
            b: e["Bl  "]
        };
        if ("Cyn " in e) return {
            c: e["Cyn "],
            m: e.Mgnt,
            y: e["Ylw "],
            k: e.Blck
        };
        if ("Gry " in e) return {
            k: e["Gry "]
        };
        if ("Lmnc" in e) return {
            l: e.Lmnc,
            a: e["A   "],
            b: e["B   "]
        };
        if ("redFloat" in e) return {
            fr: e.redFloat,
            fg: e.greenFloat,
            fb: e.blueFloat
        };
        throw new Error("Unsupported color descriptor")
    }
    w.parseColor = bn;

    function wn(e) {
        if (e) {
            if ("r" in e) return {
                _name: "",
                _classID: "RGBC",
                "Rd  ": e.r || 0,
                "Grn ": e.g || 0,
                "Bl  ": e.b || 0
            };
            if ("fr" in e) return {
                _name: "",
                _classID: "RGBC",
                redFloat: e.fr,
                greenFloat: e.fg,
                blueFloat: e.fb
            };
            if ("h" in e) return {
                _name: "",
                _classID: "HSBC",
                "H   ": An(e.h * 360),
                Strt: e.s || 0,
                Brgh: e.b || 0
            };
            if ("c" in e) return {
                _name: "",
                _classID: "CMYC",
                "Cyn ": e.c || 0,
                Mgnt: e.m || 0,
                "Ylw ": e.y || 0,
                Blck: e.k || 0
            };
            if ("l" in e) return {
                _name: "",
                _classID: "LABC",
                Lmnc: e.l || 0,
                "A   ": e.a || 0,
                "B   ": e.b || 0
            };
            if ("k" in e) return {
                _name: "",
                _classID: "GRYC",
                "Gry ": e.k
            };
            throw new Error("Invalid color value")
        } else return {
            _name: "",
            _classID: "RGBC",
            "Rd  ": 0,
            "Grn ": 0,
            "Bl  ": 0
        }
    }
    w.serializeColor = wn;

    function Zn(e) {
        if (e === void 0) return 0;
        if (e.units !== "Angle") throw new Error("Invalid units: ".concat(e.units));
        return e.value
    }
    w.parseAngle = Zn;

    function Ce(e) {
        if (e === void 0) return 1;
        if (e.units !== "Percent") throw new Error("Invalid units: ".concat(e.units));
        return e.value / 100
    }
    w.parsePercent = Ce;

    function gi(e) {
        if (e === void 0) return 1;
        if (e.units === "Percent") return e.value / 100;
        if (e.units === "Angle") return e.value / 360;
        throw new Error("Invalid units: ".concat(e.units))
    }
    w.parsePercentOrAngle = gi;

    function We(e) {
        var n = e.units,
            t = e.value;
        if (n !== "Pixels" && n !== "Millimeters" && n !== "Points" && n !== "None" && n !== "Picas" && n !== "Inches" && n !== "Centimeters" && n !== "Density") throw new Error("Invalid units: ".concat(JSON.stringify({
            units: n,
            value: t
        })));
        return {
            value: t,
            units: n
        }
    }
    w.parseUnits = We;

    function Go(e, n) {
        return n === void 0 && (n = "Pixels"), typeof e == "number" ? {
            value: e,
            units: n
        } : We(e)
    }
    w.parseUnitsOrNumber = Go;

    function No(e, n) {
        var t = e.units,
            r = e.value;
        if (t !== n) throw new Error("Invalid units: ".concat(JSON.stringify({
            units: t,
            value: r
        })));
        return r
    }
    w.parseUnitsToNumber = No;

    function An(e) {
        return {
            units: "Angle",
            value: e || 0
        }
    }
    w.unitsAngle = An;

    function Pe(e) {
        return {
            units: "Percent",
            value: Math.round((e || 0) * 100)
        }
    }
    w.unitsPercent = Pe;

    function tr(e) {
        return {
            units: "Percent",
            value: (e || 0) * 100
        }
    }
    w.unitsPercentF = tr;

    function Ke(e, n) {
        if (e == null) return {
            units: "Pixels",
            value: 0
        };
        if (typeof e != "object") throw new Error("Invalid value: ".concat(JSON.stringify(e), " (key: ").concat(n, ") (should have value and units)"));
        var t = e.units,
            r = e.value;
        if (typeof r != "number") throw new Error("Invalid value in ".concat(JSON.stringify(e), " (key: ").concat(n, ")"));
        if (t !== "Pixels" && t !== "Millimeters" && t !== "Points" && t !== "None" && t !== "Picas" && t !== "Inches" && t !== "Centimeters" && t !== "Density") throw new Error("Invalid units in ".concat(JSON.stringify(e), " (key: ").concat(n, ")"));
        return {
            units: t,
            value: r
        }
    }
    w.unitsValue = Ke;

    function _o(e) {
        var n = e.numerator,
            t = e.denominator;
        return {
            numerator: n,
            denominator: t
        }
    }
    w.frac = _o;
    w.textGridding = (0, X.createEnum)("textGridding", "none", {
        none: "None",
        round: "Rnd "
    });
    w.Ornt = (0, X.createEnum)("Ornt", "horizontal", {
        horizontal: "Hrzn",
        vertical: "Vrtc"
    });
    w.Annt = (0, X.createEnum)("Annt", "sharp", {
        none: "Anno",
        sharp: "antiAliasSharp",
        crisp: "AnCr",
        strong: "AnSt",
        smooth: "AnSm",
        platform: "antiAliasPlatformGray",
        platformLCD: "antiAliasPlatformLCD"
    });
    w.warpStyle = (0, X.createEnum)("warpStyle", "none", {
        none: "warpNone",
        arc: "warpArc",
        arcLower: "warpArcLower",
        arcUpper: "warpArcUpper",
        arch: "warpArch",
        bulge: "warpBulge",
        shellLower: "warpShellLower",
        shellUpper: "warpShellUpper",
        flag: "warpFlag",
        wave: "warpWave",
        fish: "warpFish",
        rise: "warpRise",
        fisheye: "warpFisheye",
        inflate: "warpInflate",
        squeeze: "warpSqueeze",
        twist: "warpTwist",
        cylinder: "warpCylinder",
        custom: "warpCustom"
    });
    w.BlnM = (0, X.createEnum)("BlnM", "normal", {
        normal: "Nrml",
        dissolve: "Dslv",
        darken: "Drkn",
        multiply: "Mltp",
        "color burn": "CBrn",
        "linear burn": "linearBurn",
        "darker color": "darkerColor",
        lighten: "Lghn",
        screen: "Scrn",
        "color dodge": "CDdg",
        "linear dodge": "linearDodge",
        "lighter color": "lighterColor",
        overlay: "Ovrl",
        "soft light": "SftL",
        "hard light": "HrdL",
        "vivid light": "vividLight",
        "linear light": "linearLight",
        "pin light": "pinLight",
        "hard mix": "hardMix",
        difference: "Dfrn",
        exclusion: "Xclu",
        subtract: "blendSubtraction",
        divide: "blendDivide",
        hue: "H   ",
        saturation: "Strt",
        color: "Clr ",
        luminosity: "Lmns",
        "linear height": "linearHeight",
        height: "Hght",
        subtraction: "Sbtr"
    });
    w.BESl = (0, X.createEnum)("BESl", "inner bevel", {
        "inner bevel": "InrB",
        "outer bevel": "OtrB",
        emboss: "Embs",
        "pillow emboss": "PlEb",
        "stroke emboss": "strokeEmboss"
    });
    w.bvlT = (0, X.createEnum)("bvlT", "smooth", {
        smooth: "SfBL",
        "chisel hard": "PrBL",
        "chisel soft": "Slmt"
    });
    w.BESs = (0, X.createEnum)("BESs", "up", {
        up: "In  ",
        down: "Out "
    });
    w.BETE = (0, X.createEnum)("BETE", "softer", {
        softer: "SfBL",
        precise: "PrBL"
    });
    w.IGSr = (0, X.createEnum)("IGSr", "edge", {
        edge: "SrcE",
        center: "SrcC"
    });
    w.GrdT = (0, X.createEnum)("GrdT", "linear", {
        linear: "Lnr ",
        radial: "Rdl ",
        angle: "Angl",
        reflected: "Rflc",
        diamond: "Dmnd"
    });
    w.animInterpStyleEnum = (0, X.createEnum)("animInterpStyle", "linear", {
        linear: "Lnr ",
        hold: "hold"
    });
    w.stdTrackID = (0, X.createEnum)("stdTrackID", "opacity", {
        opacity: "opacityTrack",
        style: "styleTrack",
        sheetTransform: "sheetTransformTrack",
        sheetPosition: "sheetPositionTrack",
        globalLighting: "globalLightingTrack"
    });
    w.gradientInterpolationMethodType = (0, X.createEnum)("gradientInterpolationMethodType", "perceptual", {
        perceptual: "Perc",
        linear: "Lnr ",
        classic: "Gcls",
        smooth: "Smoo"
    });
    w.ClrS = (0, X.createEnum)("ClrS", "rgb", {
        rgb: "RGBC",
        hsb: "HSBl",
        lab: "LbCl",
        hsl: "HSLC"
    });
    w.FStl = (0, X.createEnum)("FStl", "outside", {
        outside: "OutF",
        center: "CtrF",
        inside: "InsF"
    });
    w.FrFl = (0, X.createEnum)("FrFl", "color", {
        color: "SClr",
        gradient: "GrFl",
        pattern: "Ptrn"
    });
    w.ESliceType = (0, X.createEnum)("ESliceType", "image", {
        image: "Img ",
        noImage: "noImage"
    });
    w.ESliceHorzAlign = (0, X.createEnum)("ESliceHorzAlign", "default", {
        default: "default"
    });
    w.ESliceVertAlign = (0, X.createEnum)("ESliceVertAlign", "default", {
        default: "default"
    });
    w.ESliceOrigin = (0, X.createEnum)("ESliceOrigin", "userGenerated", {
        userGenerated: "userGenerated",
        autoGenerated: "autoGenerated",
        layer: "layer"
    });
    w.ESliceBGColorType = (0, X.createEnum)("ESliceBGColorType", "none", {
        none: "None",
        matte: "matte",
        color: "Clr "
    });
    w.strokeStyleLineCapType = (0, X.createEnum)("strokeStyleLineCapType", "butt", {
        butt: "strokeStyleButtCap",
        round: "strokeStyleRoundCap",
        square: "strokeStyleSquareCap"
    });
    w.strokeStyleLineJoinType = (0, X.createEnum)("strokeStyleLineJoinType", "miter", {
        miter: "strokeStyleMiterJoin",
        round: "strokeStyleRoundJoin",
        bevel: "strokeStyleBevelJoin"
    });
    w.strokeStyleLineAlignment = (0, X.createEnum)("strokeStyleLineAlignment", "inside", {
        inside: "strokeStyleAlignInside",
        center: "strokeStyleAlignCenter",
        outside: "strokeStyleAlignOutside"
    });
    w.BlrM = (0, X.createEnum)("BlrM", "ispinmage", {
        spin: "Spn ",
        zoom: "Zm  "
    });
    w.BlrQ = (0, X.createEnum)("BlrQ", "good", {
        draft: "Drft",
        good: "Gd  ",
        best: "Bst "
    });
    w.SmBM = (0, X.createEnum)("SmBM", "normal", {
        normal: "SBMN",
        "edge only": "SBME",
        "overlay edge": "SBMO"
    });
    w.SmBQ = (0, X.createEnum)("SmBQ", "medium", {
        low: "SBQL",
        medium: "SBQM",
        high: "SBQH"
    });
    w.DspM = (0, X.createEnum)("DspM", "stretch to fit", {
        "stretch to fit": "StrF",
        tile: "Tile"
    });
    w.UndA = (0, X.createEnum)("UndA", "repeat edge pixels", {
        "wrap around": "WrpA",
        "repeat edge pixels": "RptE"
    });
    w.Cnvr = (0, X.createEnum)("Cnvr", "rectangular to polar", {
        "rectangular to polar": "RctP",
        "polar to rectangular": "PlrR"
    });
    w.RplS = (0, X.createEnum)("RplS", "medium", {
        small: "Sml ",
        medium: "Mdm ",
        large: "Lrg "
    });
    w.SphM = (0, X.createEnum)("SphM", "normal", {
        normal: "Nrml",
        "horizontal only": "HrzO",
        "vertical only": "VrtO"
    });
    w.Wvtp = (0, X.createEnum)("Wvtp", "sine", {
        sine: "WvSn",
        triangle: "WvTr",
        square: "WvSq"
    });
    w.ZZTy = (0, X.createEnum)("ZZTy", "pond ripples", {
        "around center": "ArnC",
        "out from center": "OtFr",
        "pond ripples": "PndR"
    });
    w.Dstr = (0, X.createEnum)("Dstr", "uniform", {
        uniform: "Unfr",
        gaussian: "Gsn "
    });
    w.Chnl = (0, X.createEnum)("Chnl", "composite", {
        red: "Rd  ",
        green: "Grn ",
        blue: "Bl  ",
        composite: "Cmps"
    });
    w.MztT = (0, X.createEnum)("MztT", "fine dots", {
        "fine dots": "FnDt",
        "medium dots": "MdmD",
        "grainy dots": "GrnD",
        "coarse dots": "CrsD",
        "short lines": "ShrL",
        "medium lines": "MdmL",
        "long lines": "LngL",
        "short strokes": "ShSt",
        "medium strokes": "MdmS",
        "long strokes": "LngS"
    });
    w.Lns = (0, X.createEnum)("Lns ", "50-300mm zoom", {
        "50-300mm zoom": "Zm  ",
        "32mm prime": "Nkn ",
        "105mm prime": "Nkn1",
        "movie prime": "PnVs"
    });
    w.blurType = (0, X.createEnum)("blurType", "gaussian blur", {
        "gaussian blur": "GsnB",
        "lens blur": "lensBlur",
        "motion blur": "MtnB"
    });
    w.DfsM = (0, X.createEnum)("DfsM", "normal", {
        normal: "Nrml",
        "darken only": "DrkO",
        "lighten only": "LghO",
        anisotropic: "anisotropic"
    });
    w.ExtT = (0, X.createEnum)("ExtT", "blocks", {
        blocks: "Blks",
        pyramids: "Pyrm"
    });
    w.ExtR = (0, X.createEnum)("ExtR", "random", {
        random: "Rndm",
        "level-based": "LvlB"
    });
    w.FlCl = (0, X.createEnum)("FlCl", "background color", {
        "background color": "FlBc",
        "foreground color": "FlFr",
        "inverse image": "FlIn",
        "unaltered image": "FlSm"
    });
    w.CntE = (0, X.createEnum)("CntE", "upper", {
        lower: "Lwr ",
        upper: "Upr "
    });
    w.WndM = (0, X.createEnum)("WndM", "wind", {
        wind: "Wnd ",
        blast: "Blst",
        stagger: "Stgr"
    });
    w.Drct = (0, X.createEnum)("Drct", "from the right", {
        left: "Left",
        right: "Rght"
    });
    w.IntE = (0, X.createEnum)("IntE", "odd lines", {
        "odd lines": "ElmO",
        "even lines": "ElmE"
    });
    w.IntC = (0, X.createEnum)("IntC", "interpolation", {
        duplication: "CrtD",
        interpolation: "CrtI"
    });
    w.FlMd = (0, X.createEnum)("FlMd", "wrap around", {
        "set to transparent": "Bckg",
        "repeat edge pixels": "Rpt ",
        "wrap around": "Wrp "
    });
    w.prjM = (0, X.createEnum)("prjM", "fisheye", {
        fisheye: "fisP",
        perspective: "perP",
        auto: "auto",
        "full spherical": "fusP"
    });
    w.presetKindType = (0, X.createEnum)("presetKindType", "presetKindCustom", {
        custom: "presetKindCustom",
        default: "presetKindDefault"
    })
});
var sr = Ee(Je => {
    "use strict";
    var xn = Je && Je.__assign || function() {
        return xn = Object.assign || function(e) {
            for (var n, t = 1, r = arguments.length; t < r; t++) {
                n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }, xn.apply(this, arguments)
    };
    Object.defineProperty(Je, "__esModule", {
        value: !0
    });
    Je.resourceHandlersMap = Je.resourceHandlers = void 0;
    var Ho = yn("base64-js"),
        U = fn(),
        E = En(),
        De = dn(),
        Dt = Jr(),
        ne = bt();
    Je.resourceHandlers = [];
    Je.resourceHandlersMap = {};

    function K(e, n, t, r) {
        var i = {
            key: e,
            has: n,
            read: t,
            write: r
        };
        Je.resourceHandlers.push(i), Je.resourceHandlersMap[i.key] = i
    }
    var He = !1,
        wt = [void 0, "PPI", "PPCM"],
        Ft = [void 0, "Inches", "Centimeters", "Points", "Picas", "Columns"],
        yi = "0123456789abcdef";

    function Si(e) {
        return e <= 57 ? e - 48 : e - 87
    }

    function jo(e, n) {
        return Si(e.charCodeAt(n)) << 4 | Si(e.charCodeAt(n + 1))
    }

    function ar(e, n) {
        var t = (0, U.readBytes)(e, n);
        return (0, Dt.decodeString)(t)
    }

    function or(e, n) {
        var t = (0, Dt.encodeString)(n);
        (0, E.writeBytes)(e, t)
    }

    function Wo(e) {
        for (var n = (0, U.readUint8)(e), t = (0, U.readBytes)(e, n), r = !1, i = 0; i < t.byteLength; i++)
            if (t[i] & 128) {
                r = !0;
                break
            } if (r) {
            var a = new TextDecoder("gbk");
            return a.decode(t)
        } else return (0, Dt.decodeString)(t)
    }

    function Xo(e, n) {
        for (var t = "", r = 0, i = n.codePointAt(r++); i !== void 0; i = n.codePointAt(r++)) t += i > 127 ? "?" : String.fromCodePoint(i);
        var a = (0, Dt.encodeString)(t);
        (0, E.writeUint8)(e, a.byteLength), (0, E.writeBytes)(e, a)
    }
    De.MOCK_HANDLERS && K(1028, function(e) {
        return e._ir1028 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 1028", t()), n._ir1028 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1028)
    });
    K(1061, function(e) {
        return e.captionDigest !== void 0
    }, function(e, n) {
        for (var t = "", r = 0; r < 16; r++) {
            var i = (0, U.readUint8)(e);
            t += yi[i >> 4], t += yi[i & 15]
        }
        n.captionDigest = t
    }, function(e, n) {
        for (var t = 0; t < 16; t++)(0, E.writeUint8)(e, jo(n.captionDigest, t * 2))
    });
    K(1060, function(e) {
        return e.xmpMetadata !== void 0
    }, function(e, n, t) {
        n.xmpMetadata = ar(e, t())
    }, function(e, n) {
        or(e, n.xmpMetadata)
    });
    var It = (0, De.createEnum)("Inte", "perceptual", {
        perceptual: "Img ",
        saturation: "Grp ",
        "relative colorimetric": "Clrm",
        "absolute colorimetric": "AClr"
    });
    De.MOCK_HANDLERS && K(1085, function(e) {
        return e._ir1085 !== void 0
    }, function(e, n, t) {
        n._ir1085 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1085)
    });
    K(1082, function(e) {
        return e.printInformation !== void 0
    }, function(e, n) {
        var t, r, i = (0, ne.readVersionAndDescriptor)(e);
        n.printInformation = {
            printerName: i.printerName || "",
            renderingIntent: It.decode((t = i.Inte) !== null && t !== void 0 ? t : "Inte.Img ")
        };
        var a = n.printInformation;
        i.PstS !== void 0 && (a.printerManagesColors = i.PstS), i["Nm  "] !== void 0 && (a.printerProfile = i["Nm  "]), i.MpBl !== void 0 && (a.blackPointCompensation = i.MpBl), i.printSixteenBit !== void 0 && (a.printSixteenBit = i.printSixteenBit), i.hardProof !== void 0 && (a.hardProof = i.hardProof), i.printProofSetup && ("Bltn" in i.printProofSetup ? a.proofSetup = {
            builtin: i.printProofSetup.Bltn.split(".")[1]
        } : a.proofSetup = {
            profile: i.printProofSetup.profile,
            renderingIntent: It.decode((r = i.printProofSetup.Inte) !== null && r !== void 0 ? r : "Inte.Img "),
            blackPointCompensation: !!i.printProofSetup.MpBl,
            paperWhite: !!i.printProofSetup.paperWhite
        })
    }, function(e, n) {
        var t, r, i = n.printInformation,
            a = {};
        i.printerManagesColors ? a.PstS = !0 : (i.hardProof !== void 0 && (a.hardProof = !!i.hardProof), a.ClrS = "ClrS.RGBC", a["Nm  "] = (t = i.printerProfile) !== null && t !== void 0 ? t : "CIE RGB"), a.Inte = It.encode(i.renderingIntent), i.printerManagesColors || (a.MpBl = !!i.blackPointCompensation), a.printSixteenBit = !!i.printSixteenBit, a.printerName = i.printerName || "", i.proofSetup && "profile" in i.proofSetup ? a.printProofSetup = {
            profile: i.proofSetup.profile || "",
            Inte: It.encode(i.proofSetup.renderingIntent),
            MpBl: !!i.proofSetup.blackPointCompensation,
            paperWhite: !!i.proofSetup.paperWhite
        } : a.printProofSetup = {
            Bltn: !((r = i.proofSetup) === null || r === void 0) && r.builtin ? "builtinProof.".concat(i.proofSetup.builtin) : "builtinProof.proofCMYK"
        }, (0, ne.writeVersionAndDescriptor)(e, "", "printOutput", a)
    });
    De.MOCK_HANDLERS && K(1083, function(e) {
        return e._ir1083 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 1083", t()), n._ir1083 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1083)
    });
    K(1005, function(e) {
        return e.resolutionInfo !== void 0
    }, function(e, n) {
        var t = (0, U.readFixedPoint32)(e),
            r = (0, U.readUint16)(e),
            i = (0, U.readUint16)(e),
            a = (0, U.readFixedPoint32)(e),
            o = (0, U.readUint16)(e),
            s = (0, U.readUint16)(e);
        n.resolutionInfo = {
            horizontalResolution: t,
            horizontalResolutionUnit: wt[r] || "PPI",
            widthUnit: Ft[i] || "Inches",
            verticalResolution: a,
            verticalResolutionUnit: wt[o] || "PPI",
            heightUnit: Ft[s] || "Inches"
        }
    }, function(e, n) {
        var t = n.resolutionInfo;
        (0, E.writeFixedPoint32)(e, t.horizontalResolution || 0), (0, E.writeUint16)(e, Math.max(1, wt.indexOf(t.horizontalResolutionUnit))), (0, E.writeUint16)(e, Math.max(1, Ft.indexOf(t.widthUnit))), (0, E.writeFixedPoint32)(e, t.verticalResolution || 0), (0, E.writeUint16)(e, Math.max(1, wt.indexOf(t.verticalResolutionUnit))), (0, E.writeUint16)(e, Math.max(1, Ft.indexOf(t.heightUnit)))
    });
    var bi = ["centered", "size to fit", "user defined"];
    K(1062, function(e) {
        return e.printScale !== void 0
    }, function(e, n) {
        n.printScale = {
            style: bi[(0, U.readInt16)(e)],
            x: (0, U.readFloat32)(e),
            y: (0, U.readFloat32)(e),
            scale: (0, U.readFloat32)(e)
        }
    }, function(e, n) {
        var t = n.printScale,
            r = t.style,
            i = t.x,
            a = t.y,
            o = t.scale;
        (0, E.writeInt16)(e, Math.max(0, bi.indexOf(r))), (0, E.writeFloat32)(e, i || 0), (0, E.writeFloat32)(e, a || 0), (0, E.writeFloat32)(e, o || 0)
    });
    K(1006, function(e) {
        return e.alphaChannelNames !== void 0
    }, function(e, n, t) {
        if (n.alphaChannelNames)(0, U.skipBytes)(e, t());
        else
            for (n.alphaChannelNames = []; t() > 0;) {
                var r = Wo(e);
                n.alphaChannelNames.push(r)
            }
    }, function(e, n) {
        for (var t = 0, r = n.alphaChannelNames; t < r.length; t++) {
            var i = r[t];
            Xo(e, i)
        }
    });
    K(1045, function(e) {
        return e.alphaChannelNames !== void 0
    }, function(e, n, t) {
        for (n.alphaChannelNames = []; t() > 0;) n.alphaChannelNames.push((0, U.readUnicodeString)(e))
    }, function(e, n) {
        for (var t = 0, r = n.alphaChannelNames; t < r.length; t++) {
            var i = r[t];
            (0, E.writeUnicodeStringWithPadding)(e, i)
        }
    });
    De.MOCK_HANDLERS && K(1077, function(e) {
        return e._ir1077 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 1077", t()), n._ir1077 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1077)
    });
    K(1053, function(e) {
        return e.alphaIdentifiers !== void 0
    }, function(e, n, t) {
        for (n.alphaIdentifiers = []; t() >= 4;) n.alphaIdentifiers.push((0, U.readUint32)(e))
    }, function(e, n) {
        for (var t = 0, r = n.alphaIdentifiers; t < r.length; t++) {
            var i = r[t];
            (0, E.writeUint32)(e, i)
        }
    });
    K(1010, function(e) {
        return e.backgroundColor !== void 0
    }, function(e, n) {
        return n.backgroundColor = (0, U.readColor)(e)
    }, function(e, n) {
        return (0, E.writeColor)(e, n.backgroundColor)
    });
    K(1037, function(e) {
        return e.globalAngle !== void 0
    }, function(e, n) {
        return n.globalAngle = (0, U.readInt32)(e)
    }, function(e, n) {
        return (0, E.writeInt32)(e, n.globalAngle)
    });
    K(1049, function(e) {
        return e.globalAltitude !== void 0
    }, function(e, n) {
        return n.globalAltitude = (0, U.readUint32)(e)
    }, function(e, n) {
        return (0, E.writeUint32)(e, n.globalAltitude)
    });
    K(1011, function(e) {
        return e.printFlags !== void 0
    }, function(e, n) {
        n.printFlags = {
            labels: !!(0, U.readUint8)(e),
            cropMarks: !!(0, U.readUint8)(e),
            colorBars: !!(0, U.readUint8)(e),
            registrationMarks: !!(0, U.readUint8)(e),
            negative: !!(0, U.readUint8)(e),
            flip: !!(0, U.readUint8)(e),
            interpolate: !!(0, U.readUint8)(e),
            caption: !!(0, U.readUint8)(e),
            printFlags: !!(0, U.readUint8)(e)
        }
    }, function(e, n) {
        var t = n.printFlags;
        (0, E.writeUint8)(e, t.labels ? 1 : 0), (0, E.writeUint8)(e, t.cropMarks ? 1 : 0), (0, E.writeUint8)(e, t.colorBars ? 1 : 0), (0, E.writeUint8)(e, t.registrationMarks ? 1 : 0), (0, E.writeUint8)(e, t.negative ? 1 : 0), (0, E.writeUint8)(e, t.flip ? 1 : 0), (0, E.writeUint8)(e, t.interpolate ? 1 : 0), (0, E.writeUint8)(e, t.caption ? 1 : 0), (0, E.writeUint8)(e, t.printFlags ? 1 : 0)
    });
    K(1034, function(e) {
        return e.copyrighted !== void 0
    }, function(e, n) {
        n.copyrighted = !!(0, U.readUint8)(e)
    }, function(e, n) {
        (0, E.writeUint8)(e, n.copyrighted ? 1 : 0)
    });
    K(1035, function(e) {
        return e.url !== void 0
    }, function(e, n, t) {
        n.url = (0, U.readAsciiString)(e, t())
    }, function(e, n) {
        (0, E.writeAsciiString)(e, n.url)
    });
    De.MOCK_HANDLERS && K(1e4, function(e) {
        return e._ir10000 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 10000", t()), n._ir10000 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir10000)
    });
    De.MOCK_HANDLERS && K(1013, function(e) {
        return e._ir1013 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 1013", t()), n._ir1013 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1013)
    });
    De.MOCK_HANDLERS && K(1016, function(e) {
        return e._ir1016 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 1016", t()), n._ir1016 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1016)
    });
    K(1080, function(e) {
        return e.countInformation !== void 0
    }, function(e, n) {
        var t = (0, ne.readVersionAndDescriptor)(e);
        n.countInformation = t.countGroupList.map(function(r) {
            return {
                color: {
                    r: r["Rd  "],
                    g: r["Grn "],
                    b: r["Bl  "]
                },
                name: r["Nm  "],
                size: r["Rds "],
                fontSize: r.fontSize,
                visible: r.Vsbl,
                points: r.countObjectList.map(function(i) {
                    return {
                        x: i["X   "],
                        y: i["Y   "]
                    }
                })
            }
        })
    }, function(e, n) {
        var t = {
            Vrsn: 1,
            countGroupList: n.countInformation.map(function(r) {
                return {
                    "Rd  ": r.color.r,
                    "Grn ": r.color.g,
                    "Bl  ": r.color.b,
                    "Nm  ": r.name,
                    "Rds ": r.size,
                    fontSize: r.fontSize,
                    Vsbl: r.visible,
                    countObjectList: r.points.map(function(i) {
                        return {
                            "X   ": i.x,
                            "Y   ": i.y
                        }
                    })
                }
            })
        };
        (0, ne.writeVersionAndDescriptor)(e, "", "Cnt ", t)
    });
    K(1024, function(e) {
        return e.layerState !== void 0
    }, function(e, n) {
        return n.layerState = (0, U.readUint16)(e)
    }, function(e, n) {
        return (0, E.writeUint16)(e, n.layerState)
    });
    K(1026, function(e) {
        return e.layersGroup !== void 0
    }, function(e, n, t) {
        for (n.layersGroup = []; t() > 0;) n.layersGroup.push((0, U.readUint16)(e))
    }, function(e, n) {
        for (var t = 0, r = n.layersGroup; t < r.length; t++) {
            var i = r[t];
            (0, E.writeUint16)(e, i)
        }
    });
    K(1072, function(e) {
        return e.layerGroupsEnabledId !== void 0
    }, function(e, n, t) {
        for (n.layerGroupsEnabledId = []; t() > 0;) n.layerGroupsEnabledId.push((0, U.readUint8)(e))
    }, function(e, n) {
        for (var t = 0, r = n.layerGroupsEnabledId; t < r.length; t++) {
            var i = r[t];
            (0, E.writeUint8)(e, i)
        }
    });
    K(1069, function(e) {
        return e.layerSelectionIds !== void 0
    }, function(e, n) {
        var t = (0, U.readUint16)(e);
        for (n.layerSelectionIds = []; t--;) n.layerSelectionIds.push((0, U.readUint32)(e))
    }, function(e, n) {
        (0, E.writeUint16)(e, n.layerSelectionIds.length);
        for (var t = 0, r = n.layerSelectionIds; t < r.length; t++) {
            var i = r[t];
            (0, E.writeUint32)(e, i)
        }
    });
    K(1032, function(e) {
        return e.gridAndGuidesInformation !== void 0
    }, function(e, n) {
        var t = (0, U.readUint32)(e),
            r = (0, U.readUint32)(e),
            i = (0, U.readUint32)(e),
            a = (0, U.readUint32)(e);
        if (t !== 1) throw new Error("Invalid 1032 resource version: ".concat(t));
        n.gridAndGuidesInformation = {
            grid: {
                horizontal: r,
                vertical: i
            },
            guides: []
        };
        for (var o = 0; o < a; o++) n.gridAndGuidesInformation.guides.push({
            location: (0, U.readUint32)(e) / 32,
            direction: (0, U.readUint8)(e) ? "horizontal" : "vertical"
        })
    }, function(e, n) {
        var t = n.gridAndGuidesInformation,
            r = t.grid || {
                horizontal: 576,
                vertical: 576
            },
            i = t.guides || [];
        (0, E.writeUint32)(e, 1), (0, E.writeUint32)(e, r.horizontal), (0, E.writeUint32)(e, r.vertical), (0, E.writeUint32)(e, i.length);
        for (var a = 0, o = i; a < o.length; a++) {
            var s = o[a];
            (0, E.writeUint32)(e, s.location * 32), (0, E.writeUint8)(e, s.direction === "horizontal" ? 1 : 0)
        }
    });
    K(1065, function(e) {
        return e.layerComps !== void 0
    }, function(e, n) {
        var t = (0, ne.readVersionAndDescriptor)(e, !0);
        n.layerComps = {
            list: []
        };
        for (var r = 0, i = t.list; r < i.length; r++) {
            var a = i[r];
            n.layerComps.list.push({
                id: a.compID,
                name: a["Nm  "],
                capturedInfo: a.capturedInfo
            }), "comment" in a && (n.layerComps.list[n.layerComps.list.length - 1].comment = a.comment)
        }
        "lastAppliedComp" in t && (n.layerComps.lastApplied = t.lastAppliedComp)
    }, function(e, n) {
        for (var t = n.layerComps, r = {
                list: []
            }, i = 0, a = t.list; i < a.length; i++) {
            var o = a[i],
                s = {};
            s._classID = "Comp", s["Nm  "] = o.name, "comment" in o && (s.comment = o.comment), s.compID = o.id, s.capturedInfo = o.capturedInfo, r.list.push(s)
        }
        "lastApplied" in t && (r.lastAppliedComp = t.lastApplied), (0, ne.writeVersionAndDescriptor)(e, "", "CompList", r)
    });
    De.MOCK_HANDLERS && K(1092, function(e) {
        return e._ir1092 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 1092", t()), n._ir1092 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1092)
    });
    var wi = ["normal", void 0, void 0, void 0, void 0, void 0, void 0, "multiply", "screen", void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, "difference"];
    K(1078, function(e) {
        return e.onionSkins !== void 0
    }, function(e, n) {
        var t = (0, ne.readVersionAndDescriptor)(e);
        n.onionSkins = {
            enabled: t.enab,
            framesBefore: t.numBefore,
            framesAfter: t.numAfter,
            frameSpacing: t.Spcn,
            minOpacity: t.minOpacity / 100,
            maxOpacity: t.maxOpacity / 100,
            blendMode: wi[t.BlnM] || "normal"
        }
    }, function(e, n) {
        var t = n.onionSkins,
            r = {
                Vrsn: 1,
                enab: t.enabled,
                numBefore: t.framesBefore,
                numAfter: t.framesAfter,
                Spcn: t.frameSpacing,
                minOpacity: t.minOpacity * 100 | 0,
                maxOpacity: t.maxOpacity * 100 | 0,
                BlnM: Math.max(0, wi.indexOf(t.blendMode))
            };
        (0, ne.writeVersionAndDescriptor)(e, "", "null", r)
    });
    K(1075, function(e) {
        return e.timelineInformation !== void 0
    }, function(e, n) {
        var t, r, i = (0, ne.readVersionAndDescriptor)(e);
        n.timelineInformation = {
            enabled: i.enab,
            frameStep: (0, ne.frac)(i.frameStep),
            frameRate: i.frameRate,
            time: (0, ne.frac)(i.time),
            duration: (0, ne.frac)(i.duration),
            workInTime: (0, ne.frac)(i.workInTime),
            workOutTime: (0, ne.frac)(i.workOutTime),
            repeats: i.LCnt,
            hasMotion: i.hasMotion,
            globalTracks: (0, ne.parseTrackList)(i.globalTrackList, !!e.logMissingFeatures)
        }, !((r = (t = i.audioClipGroupList) === null || t === void 0 ? void 0 : t.audioClipGroupList) === null || r === void 0) && r.length && (n.timelineInformation.audioClipGroups = i.audioClipGroupList.audioClipGroupList.map(function(a) {
            return {
                id: a.groupID,
                muted: a.muted,
                audioClips: a.audioClipList.map(function(o) {
                    var s = o.clipID,
                        l = o.timeScope,
                        u = o.muted,
                        c = o.audioLevel,
                        h = o.frameReader;
                    return {
                        id: s,
                        start: (0, ne.frac)(l.Strt),
                        duration: (0, ne.frac)(l.duration),
                        inTime: (0, ne.frac)(l.inTime),
                        outTime: (0, ne.frac)(l.outTime),
                        muted: u,
                        audioLevel: c,
                        frameReader: {
                            type: h.frameReaderType,
                            mediaDescriptor: h.mediaDescriptor,
                            link: {
                                name: h["Lnk "]["Nm  "],
                                fullPath: h["Lnk "].fullPath,
                                relativePath: h["Lnk "].relPath
                            }
                        }
                    }
                })
            }
        }))
    }, function(e, n) {
        var t, r = n.timelineInformation,
            i = {
                Vrsn: 1,
                enab: r.enabled,
                frameStep: r.frameStep,
                frameRate: r.frameRate,
                time: r.time,
                duration: r.duration,
                workInTime: r.workInTime,
                workOutTime: r.workOutTime,
                LCnt: r.repeats,
                globalTrackList: (0, ne.serializeTrackList)(r.globalTracks),
                audioClipGroupList: {
                    audioClipGroupList: (t = r.audioClipGroups) === null || t === void 0 ? void 0 : t.map(function(a) {
                        return {
                            groupID: a.id,
                            muted: a.muted,
                            audioClipList: a.audioClips.map(function(o) {
                                return {
                                    clipID: o.id,
                                    timeScope: {
                                        Vrsn: 1,
                                        Strt: o.start,
                                        duration: o.duration,
                                        inTime: o.inTime,
                                        outTime: o.outTime
                                    },
                                    frameReader: {
                                        frameReaderType: o.frameReader.type,
                                        descVersion: 1,
                                        "Lnk ": {
                                            descVersion: 1,
                                            "Nm  ": o.frameReader.link.name,
                                            fullPath: o.frameReader.link.fullPath,
                                            relPath: o.frameReader.link.relativePath
                                        },
                                        mediaDescriptor: o.frameReader.mediaDescriptor
                                    },
                                    muted: o.muted,
                                    audioLevel: o.audioLevel
                                }
                            })
                        }
                    })
                },
                hasMotion: r.hasMotion
            };
        (0, ne.writeVersionAndDescriptor)(e, "", "null", i, "anim")
    });
    K(1076, function(e) {
        return e.sheetDisclosure !== void 0
    }, function(e, n) {
        var t = (0, ne.readVersionAndDescriptor)(e);
        n.sheetDisclosure = {}, t.sheetTimelineOptions && (n.sheetDisclosure.sheetTimelineOptions = t.sheetTimelineOptions.map(function(r) {
            return {
                sheetID: r.sheetID,
                sheetDisclosed: r.sheetDisclosed,
                lightsDisclosed: r.lightsDisclosed,
                meshesDisclosed: r.meshesDisclosed,
                materialsDisclosed: r.materialsDisclosed
            }
        }))
    }, function(e, n) {
        var t = n.sheetDisclosure,
            r = {
                Vrsn: 1
            };
        t.sheetTimelineOptions && (r.sheetTimelineOptions = t.sheetTimelineOptions.map(function(i) {
            return {
                Vrsn: 2,
                sheetID: i.sheetID,
                sheetDisclosed: i.sheetDisclosed,
                lightsDisclosed: i.lightsDisclosed,
                meshesDisclosed: i.meshesDisclosed,
                materialsDisclosed: i.materialsDisclosed
            }
        })), (0, ne.writeVersionAndDescriptor)(e, "", "null", r)
    });
    K(1054, function(e) {
        return e.urlsList !== void 0
    }, function(e, n) {
        var t = (0, U.readUint32)(e);
        n.urlsList = [];
        for (var r = 0; r < t; r++) {
            var i = (0, U.readSignature)(e);
            if (i !== "slic" && e.throwForMissingFeatures) throw new Error("Unknown long");
            var a = (0, U.readUint32)(e),
                o = (0, U.readUnicodeString)(e);
            n.urlsList.push({
                id: a,
                url: o,
                ref: "slice"
            })
        }
    }, function(e, n) {
        var t = n.urlsList;
        (0, E.writeUint32)(e, t.length);
        for (var r = 0; r < t.length; r++)(0, E.writeSignature)(e, "slic"), (0, E.writeUint32)(e, t[r].id), (0, E.writeUnicodeString)(e, t[r].url)
    });

    function Fi(e) {
        return {
            "Top ": e.top,
            Left: e.left,
            Btom: e.bottom,
            Rght: e.right
        }
    }

    function Ii(e) {
        return {
            top: e["Top "],
            left: e.Left,
            bottom: e.Btom,
            right: e.Rght
        }
    }

    function Ct(e, n) {
        return e[Math.max(0, Math.min(e.length - 1, n))]
    }
    var Ci = ["autoGenerated", "layer", "userGenerated"],
        Pi = ["noImage", "image"],
        Pt = ["default"];
    K(1050, function(e) {
        return e.slices ? e.slices.length : 0
    }, function(e, n) {
        var t = (0, U.readUint32)(e);
        if (t === 6) {
            n.slices || (n.slices = []);
            var r = (0, U.readInt32)(e),
                i = (0, U.readInt32)(e),
                a = (0, U.readInt32)(e),
                o = (0, U.readInt32)(e),
                s = (0, U.readUnicodeString)(e),
                l = (0, U.readUint32)(e);
            n.slices.push({
                bounds: {
                    top: r,
                    left: i,
                    bottom: a,
                    right: o
                },
                groupName: s,
                slices: []
            });
            for (var u = n.slices[n.slices.length - 1].slices, c = 0; c < l; c++) {
                var h = (0, U.readUint32)(e),
                    m = (0, U.readUint32)(e),
                    S = Ct(Ci, (0, U.readUint32)(e)),
                    y = S == "layer" ? (0, U.readUint32)(e) : 0,
                    b = (0, U.readUnicodeString)(e),
                    P = Ct(Pi, (0, U.readUint32)(e)),
                    g = (0, U.readInt32)(e),
                    F = (0, U.readInt32)(e),
                    C = (0, U.readInt32)(e),
                    I = (0, U.readInt32)(e),
                    A = (0, U.readUnicodeString)(e),
                    k = (0, U.readUnicodeString)(e),
                    L = (0, U.readUnicodeString)(e),
                    M = (0, U.readUnicodeString)(e),
                    V = !!(0, U.readUint8)(e),
                    N = (0, U.readUnicodeString)(e),
                    q = Ct(Pt, (0, U.readUint32)(e)),
                    J = Ct(Pt, (0, U.readUint32)(e)),
                    D = (0, U.readUint8)(e),
                    O = (0, U.readUint8)(e),
                    _ = (0, U.readUint8)(e),
                    x = (0, U.readUint8)(e),
                    W = D + O + _ + x === 0 ? "none" : D === 0 ? "matte" : "color";
                u.push({
                    id: h,
                    groupId: m,
                    origin: S,
                    associatedLayerId: y,
                    name: b,
                    target: k,
                    message: L,
                    altTag: M,
                    cellTextIsHTML: V,
                    cellText: N,
                    horizontalAlignment: q,
                    verticalAlignment: J,
                    type: P,
                    url: A,
                    bounds: {
                        top: F,
                        left: g,
                        bottom: I,
                        right: C
                    },
                    backgroundColorType: W,
                    backgroundColor: {
                        r: O,
                        g: _,
                        b: x,
                        a: D
                    }
                })
            }
            var ae = (0, ne.readVersionAndDescriptor)(e);
            ae.slices.forEach(function(fe) {
                var Y = u.find(function(ve) {
                    return fe.sliceID == ve.id
                });
                Y && (Y.topOutset = fe.topOutset, Y.leftOutset = fe.leftOutset, Y.bottomOutset = fe.bottomOutset, Y.rightOutset = fe.rightOutset)
            })
        } else if (t === 7 || t === 8) {
            var ae = (0, ne.readVersionAndDescriptor)(e);
            n.slices || (n.slices = []), n.slices.push({
                groupName: ae.baseName,
                bounds: Ii(ae.bounds),
                slices: ae.slices.map(function(Y) {
                    return xn(xn({}, Y["Nm  "] ? {
                        name: Y["Nm  "]
                    } : {}), {
                        id: Y.sliceID,
                        groupId: Y.groupID,
                        associatedLayerId: 0,
                        origin: ne.ESliceOrigin.decode(Y.origin),
                        type: ne.ESliceType.decode(Y.Type),
                        bounds: Ii(Y.bounds),
                        url: Y.url,
                        target: Y.null,
                        message: Y.Msge,
                        altTag: Y.altTag,
                        cellTextIsHTML: Y.cellTextIsHTML,
                        cellText: Y.cellText,
                        horizontalAlignment: ne.ESliceHorzAlign.decode(Y.horzAlign),
                        verticalAlignment: ne.ESliceVertAlign.decode(Y.vertAlign),
                        backgroundColorType: ne.ESliceBGColorType.decode(Y.bgColorType),
                        backgroundColor: Y.bgColor ? {
                            r: Y.bgColor["Rd  "],
                            g: Y.bgColor["Grn "],
                            b: Y.bgColor["Bl  "],
                            a: Y.bgColor.alpha
                        } : {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: 0
                        },
                        topOutset: Y.topOutset || 0,
                        leftOutset: Y.leftOutset || 0,
                        bottomOutset: Y.bottomOutset || 0,
                        rightOutset: Y.rightOutset || 0
                    })
                })
            })
        } else throw new Error("Invalid slices version (".concat(t, ")"))
    }, function(e, n, t) {
        var r = n.slices[t],
            i = r.bounds,
            a = r.groupName,
            o = r.slices;
        (0, E.writeUint32)(e, 6), (0, E.writeInt32)(e, i.top), (0, E.writeInt32)(e, i.left), (0, E.writeInt32)(e, i.bottom), (0, E.writeInt32)(e, i.right), (0, E.writeUnicodeString)(e, a), (0, E.writeUint32)(e, o.length);
        for (var s = 0; s < o.length; s++) {
            var l = o[s],
                u = l.backgroundColor,
                c = u.a,
                h = u.r,
                m = u.g,
                S = u.b;
            l.backgroundColorType === "none" ? c = h = m = S = 0 : l.backgroundColorType === "matte" && (c = 0, h = m = S = 255), (0, E.writeUint32)(e, l.id), (0, E.writeUint32)(e, l.groupId), (0, E.writeUint32)(e, Ci.indexOf(l.origin)), l.origin === "layer" && (0, E.writeUint32)(e, l.associatedLayerId), (0, E.writeUnicodeString)(e, l.name || ""), (0, E.writeUint32)(e, Pi.indexOf(l.type)), (0, E.writeInt32)(e, l.bounds.left), (0, E.writeInt32)(e, l.bounds.top), (0, E.writeInt32)(e, l.bounds.right), (0, E.writeInt32)(e, l.bounds.bottom), (0, E.writeUnicodeString)(e, l.url), (0, E.writeUnicodeString)(e, l.target), (0, E.writeUnicodeString)(e, l.message), (0, E.writeUnicodeString)(e, l.altTag), (0, E.writeUint8)(e, l.cellTextIsHTML ? 1 : 0), (0, E.writeUnicodeString)(e, l.cellText), (0, E.writeUint32)(e, Pt.indexOf(l.horizontalAlignment)), (0, E.writeUint32)(e, Pt.indexOf(l.verticalAlignment)), (0, E.writeUint8)(e, c), (0, E.writeUint8)(e, h), (0, E.writeUint8)(e, m), (0, E.writeUint8)(e, S)
        }
        var y = {
            bounds: Fi(i),
            slices: []
        };
        o.forEach(function(b) {
            var P = xn(xn({
                sliceID: b.id,
                groupID: b.groupId,
                origin: ne.ESliceOrigin.encode(b.origin),
                Type: ne.ESliceType.encode(b.type),
                bounds: Fi(b.bounds)
            }, b.name ? {
                "Nm  ": b.name
            } : {}), {
                url: b.url,
                null: b.target,
                Msge: b.message,
                altTag: b.altTag,
                cellTextIsHTML: b.cellTextIsHTML,
                cellText: b.cellText,
                horzAlign: ne.ESliceHorzAlign.encode(b.horizontalAlignment),
                vertAlign: ne.ESliceVertAlign.encode(b.verticalAlignment),
                bgColorType: ne.ESliceBGColorType.encode(b.backgroundColorType)
            });
            if (b.backgroundColorType === "color") {
                var g = b.backgroundColor,
                    F = g.r,
                    C = g.g,
                    I = g.b,
                    A = g.a;
                P.bgColor = {
                    "Rd  ": F,
                    "Grn ": C,
                    "Bl  ": I,
                    alpha: A
                }
            }
            P.topOutset = b.topOutset || 0, P.leftOutset = b.leftOutset || 0, P.bottomOutset = b.bottomOutset || 0, P.rightOutset = b.rightOutset || 0, y.slices.push(P)
        }), (0, ne.writeVersionAndDescriptor)(e, "", "null", y, "slices")
    });
    K(1064, function(e) {
        return e.pixelAspectRatio !== void 0
    }, function(e, n) {
        if ((0, U.readUint32)(e) > 2) throw new Error("Invalid pixelAspectRatio version");
        n.pixelAspectRatio = {
            aspect: (0, U.readFloat64)(e)
        }
    }, function(e, n) {
        (0, E.writeUint32)(e, 2), (0, E.writeFloat64)(e, n.pixelAspectRatio.aspect)
    });
    K(1041, function(e) {
        return e.iccUntaggedProfile !== void 0
    }, function(e, n) {
        n.iccUntaggedProfile = !!(0, U.readUint8)(e)
    }, function(e, n) {
        (0, E.writeUint8)(e, n.iccUntaggedProfile ? 1 : 0)
    });
    De.MOCK_HANDLERS && K(1039, function(e) {
        return e._ir1039 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 1039", t()), n._ir1039 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1039)
    });
    K(1044, function(e) {
        return e.idsSeedNumber !== void 0
    }, function(e, n) {
        return n.idsSeedNumber = (0, U.readUint32)(e)
    }, function(e, n) {
        return (0, E.writeUint32)(e, n.idsSeedNumber)
    });
    K(1036, function(e) {
        return e.thumbnail !== void 0 || e.thumbnailRaw !== void 0
    }, function(e, n, t) {
        var r = (0, U.readUint32)(e),
            i = (0, U.readUint32)(e),
            a = (0, U.readUint32)(e);
        (0, U.readUint32)(e), (0, U.readUint32)(e), (0, U.readUint32)(e);
        var o = (0, U.readUint16)(e),
            s = (0, U.readUint16)(e);
        if (r !== 1 || o !== 24 || s !== 1) {
            e.logMissingFeatures && e.log("Invalid thumbnail data (format: ".concat(r, ", bitsPerPixel: ").concat(o, ", planes: ").concat(s, ")")), (0, U.skipBytes)(e, t());
            return
        }
        var l = t(),
            u = (0, U.readBytes)(e, l);
        e.useRawThumbnail ? n.thumbnailRaw = {
            width: i,
            height: a,
            data: u
        } : u.byteLength && (n.thumbnail = (0, De.createCanvasFromData)(u))
    }, function(e, n) {
        var t, r = 0,
            i = 0,
            a = new Uint8Array(0);
        if (n.thumbnailRaw) r = n.thumbnailRaw.width, i = n.thumbnailRaw.height, a = n.thumbnailRaw.data;
        else try {
            var o = (t = n.thumbnail.toDataURL("image/jpeg", 1)) === null || t === void 0 ? void 0 : t.substring(23);
            o && (a = (0, Ho.toByteArray)(o), r = n.thumbnail.width, i = n.thumbnail.height)
        } catch {}
        var s = 24,
            l = Math.floor((r * s + 31) / 32) * 4,
            u = 1,
            c = l * i * u,
            h = a.length;
        (0, E.writeUint32)(e, 1), (0, E.writeUint32)(e, r), (0, E.writeUint32)(e, i), (0, E.writeUint32)(e, l), (0, E.writeUint32)(e, c), (0, E.writeUint32)(e, h), (0, E.writeUint16)(e, s), (0, E.writeUint16)(e, u), (0, E.writeBytes)(e, a)
    });
    K(1057, function(e) {
        return e.versionInfo !== void 0
    }, function(e, n, t) {
        var r = (0, U.readUint32)(e);
        if (r !== 1) throw new Error("Invalid versionInfo version");
        n.versionInfo = {
            hasRealMergedData: !!(0, U.readUint8)(e),
            writerName: (0, U.readUnicodeString)(e),
            readerName: (0, U.readUnicodeString)(e),
            fileVersion: (0, U.readUint32)(e)
        }, (0, U.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.versionInfo;
        (0, E.writeUint32)(e, 1), (0, E.writeUint8)(e, t.hasRealMergedData ? 1 : 0), (0, E.writeUnicodeString)(e, t.writerName), (0, E.writeUnicodeString)(e, t.readerName), (0, E.writeUint32)(e, t.fileVersion)
    });
    De.MOCK_HANDLERS && K(1058, function(e) {
        return e._ir1058 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 1058", t()), n._ir1058 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1058)
    });
    K(7e3, function(e) {
        return e.imageReadyVariables !== void 0
    }, function(e, n, t) {
        n.imageReadyVariables = ar(e, t())
    }, function(e, n) {
        or(e, n.imageReadyVariables)
    });
    K(7001, function(e) {
        return e.imageReadyDataSets !== void 0
    }, function(e, n, t) {
        n.imageReadyDataSets = ar(e, t())
    }, function(e, n) {
        or(e, n.imageReadyDataSets)
    });
    K(1088, function(e) {
        return e.pathSelectionState !== void 0
    }, function(e, n, t) {
        var r = (0, ne.readVersionAndDescriptor)(e);
        n.pathSelectionState = r.null
    }, function(e, n) {
        var t = {
            null: n.pathSelectionState
        };
        (0, ne.writeVersionAndDescriptor)(e, "", "null", t)
    });
    De.MOCK_HANDLERS && K(1025, function(e) {
        return e._ir1025 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 1025", t()), n._ir1025 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir1025)
    });
    var Di = (0, De.createEnum)("FrmD", "", {
        auto: "Auto",
        none: "None",
        dispose: "Disp"
    });
    K(4e3, function(e) {
        return e.animations !== void 0
    }, function(e, n, t) {
        var r = (0, U.readSignature)(e);
        if (r === "mani")(0, U.checkSignature)(e, "IRFR"), (0, U.readSection)(e, 1, function(a) {
            for (var o = function() {
                    (0, U.checkSignature)(e, "8BIM");
                    var s = (0, U.readSignature)(e);
                    (0, U.readSection)(e, 1, function(l) {
                        if (s === "AnDs") {
                            var u = (0, ne.readVersionAndDescriptor)(e);
                            n.animations = {
                                frames: u.FrIn.map(function(h) {
                                    return {
                                        id: h.FrID,
                                        delay: (h.FrDl || 0) / 100,
                                        dispose: h.FrDs ? Di.decode(h.FrDs) : "auto"
                                    }
                                }),
                                animations: u.FSts.map(function(h) {
                                    return {
                                        id: h.FsID,
                                        frames: h.FsFr,
                                        repeats: h.LCnt,
                                        activeFrame: h.AFrm || 0
                                    }
                                })
                            }
                        } else if (s === "Roll") {
                            var c = (0, U.readBytes)(e, l());
                            e.logDevFeatures && e.log("#4000 Roll", c)
                        } else e.logMissingFeatures && e.log("Unhandled subsection in #4000", s)
                    })
                }; a() > 0;) o()
        });
        else if (r === "mopt") {
            var i = (0, U.readBytes)(e, t());
            e.logDevFeatures && e.log("#4000 mopt", i)
        } else e.logMissingFeatures && e.log("Unhandled key in #4000:", r)
    }, function(e, n) {
        n.animations && ((0, E.writeSignature)(e, "mani"), (0, E.writeSignature)(e, "IRFR"), (0, E.writeSection)(e, 1, function() {
            (0, E.writeSignature)(e, "8BIM"), (0, E.writeSignature)(e, "AnDs"), (0, E.writeSection)(e, 1, function() {
                for (var t = {
                        FrIn: [],
                        FSts: []
                    }, r = 0; r < n.animations.frames.length; r++) {
                    var i = n.animations.frames[r],
                        a = {
                            FrID: i.id
                        };
                    i.delay && (a.FrDl = i.delay * 100 | 0), a.FrDs = Di.encode(i.dispose), t.FrIn.push(a)
                }
                for (var r = 0; r < n.animations.animations.length; r++) {
                    var o = n.animations.animations[r],
                        s = {
                            FsID: o.id,
                            AFrm: o.activeFrame | 0,
                            FsFr: o.frames,
                            LCnt: o.repeats | 0
                        };
                    t.FSts.push(s)
                }(0, ne.writeVersionAndDescriptor)(e, "", "null", t)
            })
        }))
    });
    De.MOCK_HANDLERS && K(4001, function(e) {
        return e._ir4001 !== void 0
    }, function(e, n, t) {
        if (De.MOCK_HANDLERS) {
            He && console.log("image resource 4001", t()), n._ir4001 = (0, U.readBytes)(e, t());
            return
        }
        var r = (0, U.readSignature)(e);
        if (r === "mfri") {
            var i = (0, U.readUint32)(e);
            if (i !== 2) throw new Error("Invalid mfri version");
            var a = (0, U.readUint32)(e),
                o = (0, U.readBytes)(e, a);
            e.logDevFeatures && e.log("mfri", o)
        } else if (r === "mset") {
            var s = (0, ne.readVersionAndDescriptor)(e);
            e.logDevFeatures && e.log("mset", s)
        } else e.logMissingFeatures && e.log("Unhandled key in #4001", r)
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir4001)
    });
    De.MOCK_HANDLERS && K(4002, function(e) {
        return e._ir4002 !== void 0
    }, function(e, n, t) {
        He && console.log("image resource 4002", t()), n._ir4002 = (0, U.readBytes)(e, t())
    }, function(e, n) {
        (0, E.writeBytes)(e, n._ir4002)
    })
});
var fn = Ee(B => {
    "use strict";
    var qo = B && B.__rest || function(e, n) {
        var t = {};
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
        if (e != null && typeof Object.getOwnPropertySymbols == "function")
            for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) n.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (t[r[i]] = e[r[i]]);
        return t
    };
    Object.defineProperty(B, "__esModule", {
        value: !0
    });
    B.readPattern = B.readColor = B.readSection = B.readDataRLE = B.readDataZip = B.createImageDataBitDepth = B.readAdditionalLayerInfo = B.readGlobalLayerMaskInfo = B.decodeLayerImageData = B.readLayerInfo = B.readPsd = B.checkSignature = B.skipBytes = B.readAsciiString = B.readUnicodeStringWithLengthLE = B.readUnicodeStringWithLength = B.readUnicodeString = B.readPascalString = B.validSignatureAt = B.readSignature = B.readBytes = B.readFixedPointPath32 = B.readFixedPoint32 = B.readFloat64 = B.readFloat32 = B.readUint32 = B.readInt32LE = B.readInt32 = B.readUint16LE = B.readUint16 = B.readInt16 = B.peekUint8 = B.readUint8 = B.warnOrThrow = B.createReader = B.supportedColorModes = void 0;
    var Yo = yn("pako"),
        Ue = dn(),
        Zo = Mt(),
        Ko = sr();
    B.supportedColorModes = [0, 1, 3, 2];
    var Jo = ["bitmap", "grayscale", "indexed", "RGB", "CMYK", "multichannel", "duotone", "lab"];

    function At(e) {
        for (var n = e.width * e.height * 4, t = 0; t < n; t += 4) {
            var r = e.data[t];
            e.data[t + 1] = r, e.data[t + 2] = r
        }
    }

    function fr(e, n, t) {
        var r = new DataView(e, n, t);
        return {
            view: r,
            offset: 0,
            strict: !1,
            debug: !1,
            large: !1,
            globalAlpha: !1,
            log: console.log
        }
    }
    B.createReader = fr;

    function Et(e, n) {
        if (e.strict) throw new Error(n);
        e.debug && e.log(n)
    }
    B.warnOrThrow = Et;

    function pe(e) {
        return e.offset += 1, e.view.getUint8(e.offset - 1)
    }
    B.readUint8 = pe;

    function xi(e) {
        return e.view.getUint8(e.offset)
    }
    B.peekUint8 = xi;

    function hn(e) {
        return e.offset += 2, e.view.getInt16(e.offset - 2, !1)
    }
    B.readInt16 = hn;

    function oe(e) {
        return e.offset += 2, e.view.getUint16(e.offset - 2, !1)
    }
    B.readUint16 = oe;

    function ki(e) {
        return e.offset += 2, e.view.getUint16(e.offset - 2, !0)
    }
    B.readUint16LE = ki;

    function Te(e) {
        return e.offset += 4, e.view.getInt32(e.offset - 4, !1)
    }
    B.readInt32 = Te;

    function Qo(e) {
        return e.offset += 4, e.view.getInt32(e.offset - 4, !0)
    }
    B.readInt32LE = Qo;

    function de(e) {
        return e.offset += 4, e.view.getUint32(e.offset - 4, !1)
    }
    B.readUint32 = de;

    function $o(e) {
        return e.offset += 4, e.view.getFloat32(e.offset - 4, !1)
    }
    B.readFloat32 = $o;

    function ur(e) {
        return e.offset += 8, e.view.getFloat64(e.offset - 8, !1)
    }
    B.readFloat64 = ur;

    function es(e) {
        return Te(e) / 65536
    }
    B.readFixedPoint32 = es;

    function ns(e) {
        return Te(e) / (1 << 24)
    }
    B.readFixedPointPath32 = ns;

    function Qe(e, n) {
        var t = e.view.byteOffset + e.offset;
        if (e.offset += n, t + n > e.view.buffer.byteLength) {
            if (Et(e, "Reading bytes exceeding buffer length"), n > 100 * 1024 * 1024) throw new Error("Reading past end of file");
            var r = new Uint8Array(n),
                i = Math.min(n, e.view.byteLength - t);
            return i > 0 && r.set(new Uint8Array(e.view.buffer, t, i)), r
        } else return new Uint8Array(e.view.buffer, t, n)
    }
    B.readBytes = Qe;

    function Kn(e) {
        return Bi(e, 4)
    }
    B.readSignature = Kn;

    function Mi(e, n) {
        var t = String.fromCharCode(e.view.getUint8(n)) + String.fromCharCode(e.view.getUint8(n + 1)) + String.fromCharCode(e.view.getUint8(n + 2)) + String.fromCharCode(e.view.getUint8(n + 3));
        return t == "8BIM" || t == "8B64"
    }
    B.validSignatureAt = Mi;

    function kt(e, n) {
        for (var t = pe(e), r = t ? Bi(e, t) : ""; ++t % n;) e.offset++;
        return r
    }
    B.readPascalString = kt;

    function Li(e) {
        var n = de(e);
        return Ti(e, n)
    }
    B.readUnicodeString = Li;

    function Ti(e, n) {
        for (var t = ""; n--;) {
            var r = oe(e);
            (r || n > 0) && (t += String.fromCharCode(r))
        }
        return t
    }
    B.readUnicodeStringWithLength = Ti;

    function ts(e, n) {
        for (var t = ""; n--;) {
            var r = ki(e);
            (r || n > 0) && (t += String.fromCharCode(r))
        }
        return t
    }
    B.readUnicodeStringWithLengthLE = ts;

    function rs(e, n) {
        for (var t = ""; n--;) t += String.fromCharCode(pe(e));
        return t
    }
    B.readAsciiString = rs;

    function Se(e, n) {
        e.offset += n
    }
    B.skipBytes = Se;

    function pr(e, n, t) {
        var r = e.offset,
            i = Kn(e);
        if (i !== n && i !== t) throw new Error("Invalid signature: '".concat(i, "' at 0x").concat(r.toString(16)))
    }
    B.checkSignature = pr;

    function Bi(e, n) {
        for (var t = Qe(e, n), r = "", i = 0; i < t.length; i++) r += String.fromCharCode(t[i]);
        return r
    }

    function is(e) {
        return e === "8BIM" || e === "MeSa" || e === "AgHg" || e === "PHUT" || e === "DCSR"
    }

    function as(e, n) {
        var t;
        n === void 0 && (n = {}), pr(e, "8BPS");
        var r = oe(e);
        if (r !== 1 && r !== 2) throw new Error("Invalid PSD file version: ".concat(r));
        Se(e, 6);
        var i = oe(e),
            a = de(e),
            o = de(e),
            s = oe(e),
            l = oe(e),
            u = r === 1 ? 3e4 : 3e5;
        if (o > u || a > u) throw new Error("Invalid size: ".concat(o, "x").concat(a));
        if (i > 16) throw new Error("Invalid channel count: ".concat(i));
        if (![1, 8, 16, 32].includes(s)) throw new Error("Invalid bitsPerChannel: ".concat(s));
        if (B.supportedColorModes.indexOf(l) === -1) throw new Error("Color mode not supported: ".concat((t = Jo[l]) !== null && t !== void 0 ? t : l));
        var c = {
            width: o,
            height: a,
            channels: i,
            bitsPerChannel: s,
            colorMode: l
        };
        Object.assign(e, n), e.large = r === 2, e.globalAlpha = !1, Xe(e, 1, function(g) {
            if (g()) {
                if (l === 2) {
                    if (g() != 768) throw new Error("Invalid color palette size");
                    c.palette = [];
                    for (var F = 0; F < 256; F++) c.palette.push({
                        r: pe(e),
                        g: 0,
                        b: 0
                    });
                    for (var F = 0; F < 256; F++) c.palette[F].g = pe(e);
                    for (var F = 0; F < 256; F++) c.palette[F].b = pe(e)
                }
                Se(e, g())
            }
        });
        var h = {};
        Xe(e, 1, function(g) {
            for (var F = function() {
                    zi(e, is);
                    var C = oe(e);
                    kt(e, 2), Xe(e, 2, function(I) {
                        var A = Ko.resourceHandlersMap[C],
                            k = C === 1036 && !!e.skipThumbnail;
                        if (A && !k) try {
                            A.read(e, h, I)
                        } catch (L) {
                            if (e.throwForMissingFeatures) throw L;
                            Se(e, I())
                        } else Se(e, I())
                    })
                }; g() > 0;) F()
        });
        var m = h.layersGroup,
            S = h.layerGroupsEnabledId,
            y = qo(h, ["layersGroup", "layerGroupsEnabledId"]);
        Object.keys(y) && (c.imageResources = y), Xe(e, 1, function(g) {
            if (Xe(e, 2, function(C) {
                    Oi(e, c, h), Se(e, C())
                }, void 0, e.large), g() > 0) {
                var F = Vi(e);
                F && (c.globalLayerMaskInfo = F)
            } else Se(e, g());
            for (; g() > 0;) {
                for (; g() && xi(e) === 0;) Se(e, 1);
                g() >= 12 ? hr(e, c, c, h) : Se(e, g())
            }
        }, void 0, e.large);
        var b = c.children && c.children.length,
            P = e.skipCompositeImageData && (e.skipLayerImageData || b);
        return P || fs(e, c), c
    }
    B.readPsd = as;

    function Oi(e, n, t) {
        var r, i, a = t.layersGroup,
            o = a === void 0 ? [] : a,
            s = t.layerGroupsEnabledId,
            l = s === void 0 ? [] : s,
            u = hn(e);
        u < 0 && (e.globalAlpha = !0, u = -u);
        for (var c = [], h = [], m = 0; m < u; m++) {
            var S = os(e, n, t),
                y = S.layer,
                b = S.channels;
            o[m] !== void 0 && (y.linkGroup = o[m]), l[m] !== void 0 && (y.linkGroupEnabled = !!l[m]), c.push(y), h.push(b)
        }
        for (var m = 0; m < u; m++) us(e, n, c[m], h[m]);
        n.children || (n.children = []);
        for (var P = [n], m = c.length - 1; m >= 0; m--) {
            var g = c[m],
                F = g.sectionDivider ? g.sectionDivider.type : 0;
            F === 1 || F === 2 ? (g.opened = F === 1, g.children = [], !((r = g.sectionDivider) === null || r === void 0) && r.key && (g.blendMode = (i = Ue.toBlendMode[g.sectionDivider.key]) !== null && i !== void 0 ? i : g.blendMode), P[P.length - 1].children.unshift(g), P.push(g)) : F === 3 ? P.pop() : P[P.length - 1].children.unshift(g)
        }
    }
    B.readLayerInfo = Oi;

    function os(e, n, t) {
        var r = {};
        r.top = Te(e), r.left = Te(e), r.bottom = Te(e), r.right = Te(e);
        for (var i = oe(e), a = [], o = 0; o < i; o++) {
            var s = hn(e),
                l = de(e);
            if (e.large) {
                if (l !== 0) throw new Error("Sizes larger than 4GB are not supported");
                l = de(e)
            }
            a.push({
                id: s,
                length: l
            })
        }
        pr(e, "8BIM");
        var u = Kn(e);
        if (!Ue.toBlendMode[u]) throw new Error("Invalid blend mode: '".concat(u, "'"));
        r.blendMode = Ue.toBlendMode[u], r.opacity = pe(e) / 255, r.clipping = pe(e) === 1;
        var c = pe(e);
        return r.transparencyProtected = (c & 1) !== 0, r.hidden = (c & 2) !== 0, c & 32 && (r.effectsOpen = !0), Se(e, 1), Xe(e, 1, function(h) {
            ss(e, r);
            var m = ls(e);
            for (m && (r.blendingRanges = m), r.name = kt(e, 1); h() > 4 && !Mi(e, e.offset);) e.offset++;
            for (; h() >= 12;) hr(e, r, n, t);
            Se(e, h())
        }), {
            layer: r,
            channels: a
        }
    }

    function ss(e, n) {
        return Xe(e, 1, function(t) {
            if (t()) {
                var r = {};
                n.mask = r, r.top = Te(e), r.left = Te(e), r.bottom = Te(e), r.right = Te(e), r.defaultColor = pe(e);
                var i = pe(e);
                if (r.positionRelativeToLayer = (i & 1) !== 0, r.disabled = (i & 2) !== 0, r.fromVectorData = (i & 8) !== 0, t() >= 18) {
                    var a = {};
                    n.realMask = a;
                    var o = pe(e);
                    a.positionRelativeToLayer = (o & 1) !== 0, a.disabled = (o & 2) !== 0, a.fromVectorData = (o & 8) !== 0, a.defaultColor = pe(e), a.top = Te(e), a.left = Te(e), a.bottom = Te(e), a.right = Te(e)
                }
                if (i & 16) {
                    var s = pe(e);
                    s & 1 && (r.userMaskDensity = pe(e) / 255), s & 2 && (r.userMaskFeather = ur(e)), s & 4 && (r.vectorMaskDensity = pe(e) / 255), s & 8 && (r.vectorMaskFeather = ur(e))
                }
                Se(e, t())
            }
        })
    }

    function Ut(e) {
        return [pe(e), pe(e), pe(e), pe(e)]
    }

    function ls(e) {
        return Xe(e, 1, function(n) {
            for (var t = Ut(e), r = Ut(e), i = []; n() > 0;) {
                var a = Ut(e),
                    o = Ut(e);
                i.push({
                    sourceRange: a,
                    destRange: o
                })
            }
            return {
                compositeGrayBlendSource: t,
                compositeGraphBlendDestinationRange: r,
                ranges: i
            }
        })
    }

    function us(e, n, t, r) {
        if (!e.skipLayerImageData) {
            var i = n.colorMode,
                a = i === void 0 ? 3 : i,
                o = n.bitsPerChannel,
                s = o === void 0 ? 8 : o;
            t.rawData = {
                colorMode: a,
                bitsPerChannel: s,
                channels: [],
                large: e.large
            };
            for (var l = 0, u = r; l < u.length; l++) {
                var c = u[l],
                    h = e.offset,
                    m = 0,
                    S = void 0;
                if (c.length === 1) throw new Error("Invalid channel length");
                if (c.length) {
                    if (m = oe(e), m > 3 && (e.offset -= 1, m = oe(e)), m > 3 && (e.offset -= 3, m = oe(e)), m > 3) throw new Error("Invalid compression: ".concat(m));
                    c.length > 2 && (S = Qe(e, c.length - 2))
                }
                e.offset = h + c.length, t.rawData.channels.push({
                    id: c.id,
                    compression: m,
                    data: S
                })
            }
            e.useRawData || Ri(t, !!e.useImageData, !!e.throwForMissingFeatures)
        }
    }

    function Ui(e, n) {
        for (var t = e.data, r = t instanceof Float32Array ? 1 : t instanceof Uint16Array ? 65535 : 255, i = (n ? 4 : 3) | 0, a = t.length | 0, o = (n ? 5 : 4) | 0, s = i; s < a; s = s + o | 0) t[s] = r
    }

    function Ri(e, n, t) {
        if (e.rawData) {
            var r = e.rawData,
                i = r.colorMode,
                a = r.bitsPerChannel,
                o = r.channels,
                s = r.large,
                l = (e.right || 0) - (e.left || 0),
                u = (e.bottom || 0) - (e.top || 0),
                c = i === 4,
                h, m = !1;
            if (l && u)
                if (c) {
                    if (a !== 8) throw new Error("bitsPerChannel Not supproted");
                    h = {
                        width: l,
                        height: u,
                        data: new Uint8ClampedArray(l * u * 5)
                    }
                } else h = xt(l, u, a);
            Ue.RAW_IMAGE_DATA && (e.imageDataRaw = [], e.imageDataRawCompression = []);
            for (var S = 0, y = o; S < y.length; S++) {
                var b = y[S],
                    P = b.id,
                    g = b.compression,
                    F = b.data;
                if (F) {
                    var C = fr(F.buffer, F.byteOffset, F.byteLength);
                    if (P === -2 || P === -3) {
                        var I = P === -2 ? e.mask : e.realMask;
                        if (!I) throw new Error("Missing layer ".concat(P === -2 ? "mask" : "real mask", " data"));
                        var A = (I.right || 0) - (I.left || 0),
                            k = (I.bottom || 0) - (I.top || 0);
                        if (A < 0 || k < 0 || A > 3e4 || k > 3e4) throw new Error("Invalid mask size");
                        if (A && k) {
                            var L = xt(A, k, a);
                            Ai(C, F.byteLength, L, g, A, k, a, 0, s, 4), Ue.RAW_IMAGE_DATA && (P === -2 ? (e.maskDataRawCompression = g, e.maskDataRaw = F) : (e.realMaskDataRawCompression = g, e.realMaskDataRaw = F)), At(L), Ui(L, !1), n ? I.imageData = L : I.canvas = (0, Ue.imageDataToCanvas)(L)
                        }
                    } else {
                        var M = (0, Ue.offsetForChannel)(P, c),
                            V = h;
                        if (M < 0 && (V = void 0, t)) throw new Error("Channel not supported: ".concat(P));
                        Ai(C, F.byteLength, V, g, l, u, a, M, s, c ? 5 : 4), Ue.RAW_IMAGE_DATA && (e.imageDataRawCompression[P] = g, e.imageDataRaw[P] = F), V && i === 1 && At(V)
                    }
                    P === -1 && (m = !0)
                }
            }
            if (h) {
                if (m || Ui(h, c), c) {
                    var N = h;
                    h = (0, Ue.createImageData)(N.width, N.height), Gi(N, h, !1)
                }
                n ? e.imageData = h : e.canvas = (0, Ue.imageDataToCanvas)(h)
            }
            delete e.rawData
        }
    }
    B.decodeLayerImageData = Ri;

    function Ai(e, n, t, r, i, a, o, s, l, u) {
        if (n)
            if (r === 0) {
                n !== i * a * Math.floor(o / 8) && e.log("Invalid length (".concat(n, ", ").concat(i * a * Math.floor(o / 8), ")"));
                var c = Qe(e, n);
                _i(c, t, o, u, s)
            } else if (r === 1) pn(e, t, i, a, o, u, [s], l);
        else if (r === 2) {
            var c = Qe(e, n);
            dr(c, t, i, a, o, u, s, !1)
        } else if (r === 3) {
            var c = Qe(e, n);
            dr(c, t, i, a, o, u, s, !0)
        } else throw new Error("Invalid Compression type: ".concat(r))
    }

    function Vi(e) {
        return Xe(e, 1, function(n) {
            if (n()) {
                var t = oe(e),
                    r = oe(e),
                    i = oe(e),
                    a = oe(e),
                    o = oe(e),
                    s = oe(e) / 255,
                    l = pe(e);
                return Se(e, n()), {
                    overlayColorSpace: t,
                    colorSpace1: r,
                    colorSpace2: i,
                    colorSpace3: a,
                    colorSpace4: o,
                    opacity: s,
                    kind: l
                }
            }
        })
    }
    B.readGlobalLayerMaskInfo = Vi;
    var cs = [0, 1, -1, 2, -2, 3, -3, 4, -4];

    function zi(e, n) {
        for (var t = e.offset, r = "", i = 0, a = cs; i < a.length; i++) {
            var o = a[i];
            try {
                e.offset = t + o, r = Kn(e)
            } catch {}
            if (n(r)) break
        }
        if (!n(r)) throw new Error("Invalid signature: '".concat(r, "' at 0x").concat(t.toString(16)));
        return r
    }

    function ds(e) {
        return e === "8BIM" || e === "8B64"
    }

    function hr(e, n, t, r) {
        var i = zi(e, ds),
            a = Kn(e),
            o = i === "8B64" || e.large && Ue.largeAdditionalInfoKeys.indexOf(a) !== -1;
        Xe(e, 2, function(s) {
            var l = Zo.infoHandlersMap[a];
            if (l) try {
                l.read(e, n, s, t, r)
            } catch (u) {
                if (e.throwForMissingFeatures) throw u
            } else e.logMissingFeatures && e.log("Unhandled additional info: ".concat(a)), Se(e, s());
            s() && (e.logMissingFeatures && e.log("Unread ".concat(s(), " bytes left for additional info: ").concat(a)), Se(e, s()))
        }, !1, o)
    }
    B.readAdditionalLayerInfo = hr;

    function xt(e, n, t, r) {
        if (r === void 0 && (r = 4), t === 1 || t === 8) return r === 4 ? (0, Ue.createImageData)(e, n) : {
            width: e,
            height: n,
            data: new Uint8ClampedArray(e * n * r)
        };
        if (t === 16) return {
            width: e,
            height: n,
            data: new Uint16Array(e * n * r)
        };
        if (t === 32) return {
            width: e,
            height: n,
            data: new Float32Array(e * n * r)
        };
        throw new Error("Invalid bitDepth (".concat(t, ")"))
    }
    B.createImageDataBitDepth = xt;

    function fs(e, n) {
        var t, r = oe(e),
            i = (t = n.bitsPerChannel) !== null && t !== void 0 ? t : 8;
        if (B.supportedColorModes.indexOf(n.colorMode) === -1) throw new Error("Color mode not supported: ".concat(n.colorMode));
        if (r !== 0 && r !== 1) throw new Error("Compression type not supported: ".concat(r));
        var a = xt(n.width, n.height, i);
        switch ((0, Ue.resetImageData)(a), n.colorMode) {
            case 0: {
                if (i !== 1) throw new Error("Invalid bitsPerChannel for bitmap color mode");
                var o = void 0;
                if (r === 0) o = Qe(e, Math.ceil(n.width / 8) * n.height);
                else if (r === 1) o = new Uint8Array(n.width * n.height), pn(e, {
                    data: o,
                    width: n.width,
                    height: n.height
                }, n.width, n.height, 8, 1, [0], e.large);
                else throw new Error("Bitmap compression not supported: ".concat(r));
                (0, Ue.decodeBitmap)(o, a.data, n.width, n.height);
                break
            }
            case 3:
            case 1: {
                var s = n.colorMode === 1 ? [0] : [0, 1, 2];
                if (n.channels && n.channels > 3)
                    for (var l = 3; l < n.channels; l++) s.push(l);
                else e.globalAlpha && s.push(3);
                if (r === 0)
                    for (var l = 0; l < s.length; l++) {
                        var u = Qe(e, n.width * n.height * Math.floor(i / 8));
                        _i(u, a, i, 4, s[l])
                    } else if (r === 1) {
                        var c = e.offset;
                        pn(e, a, n.width, n.height, i, 4, s, e.large), Ue.RAW_IMAGE_DATA && (n.imageDataRaw = new Uint8Array(e.view.buffer, e.view.byteOffset + c, e.offset - c))
                    } n.colorMode === 1 && At(a);
                break
            }
            case 2: {
                if (i !== 8) throw new Error("bitsPerChannel Not supproted");
                if (n.channels !== 1) throw new Error("Invalid channel count");
                if (!n.palette) throw new Error("Missing color palette");
                if (r === 0) throw new Error("Not implemented");
                if (r === 1) {
                    var h = {
                        width: a.width,
                        height: a.height,
                        data: new Uint8Array(a.width * a.height)
                    };
                    pn(e, h, n.width, n.height, i, 1, [0], e.large), ps(h, a, n.palette)
                } else throw new Error("Not implemented");
                break
            }
            case 4: {
                if (i !== 8) throw new Error("bitsPerChannel Not supproted");
                if (n.channels !== 4) throw new Error("Invalid channel count");
                var s = [0, 1, 2, 3];
                if (e.globalAlpha && s.push(4), r === 0) throw new Error("Not implemented");
                if (r === 1) {
                    var m = {
                            width: a.width,
                            height: a.height,
                            data: new Uint8Array(a.width * a.height * 5)
                        },
                        c = e.offset;
                    pn(e, m, n.width, n.height, i, 5, s, e.large), Gi(m, a, !0), Ue.RAW_IMAGE_DATA && (n.imageDataRaw = new Uint8Array(e.view.buffer, e.view.byteOffset + c, e.offset - c))
                } else throw new Error("Not implemented");
                break
            }
            default:
                throw new Error("Color mode not supported: ".concat(n.colorMode))
        }
        if (e.globalAlpha) {
            if (n.bitsPerChannel !== 8) throw new Error("bitsPerChannel Not supproted");
            for (var S = a.data, y = a.width * a.height * 4, l = 0; l < y; l += 4) {
                var b = S[l + 3];
                if (b != 0 && b != 255) {
                    var P = b / 255,
                        g = 1 / P,
                        F = 255 * (1 - g);
                    S[l + 0] = S[l + 0] * g + F, S[l + 1] = S[l + 1] * g + F, S[l + 2] = S[l + 2] * g + F
                }
            }
        }
        e.useImageData ? n.imageData = a : n.canvas = (0, Ue.imageDataToCanvas)(a)
    }

    function Gi(e, n, t) {
        for (var r = n.width * n.height * 4, i = e.data, a = n.data, o = 0, s = 0; s < r; o += 5, s += 4) {
            var l = i[o],
                u = i[o + 1],
                c = i[o + 2],
                h = i[o + 3];
            a[s] = (l * h | 0) / 255 | 0, a[s + 1] = (u * h | 0) / 255 | 0, a[s + 2] = (c * h | 0) / 255 | 0, a[s + 3] = t ? 255 - i[o + 4] : i[o + 4]
        }
    }

    function ps(e, n, t) {
        for (var r = e.width * e.height, i = e.data, a = n.data, o = 0, s = 0; o < r; o++, s += 4) {
            var l = t[i[o]];
            a[s + 0] = l.r, a[s + 1] = l.g, a[s + 2] = l.b, a[s + 3] = 255
        }
    }

    function hs(e, n) {
        if (e.byteLength / e.length !== n.byteLength / n.length) throw new Error("Invalid array types")
    }

    function Ni(e, n) {
        if (n === 8) return e;
        if (n === 16)
            if (e.byteOffset % 2) {
                var t = new Uint16Array(e.byteLength / 2);
                return new Uint8Array(t.buffer, t.byteOffset, t.byteLength).set(e), t
            } else return new Uint16Array(e.buffer, e.byteOffset, e.byteLength / 2);
        else if (n === 32)
            if (e.byteOffset % 4) {
                var t = new Float32Array(e.byteLength / 4);
                return new Uint8Array(t.buffer, t.byteOffset, t.byteLength).set(e), t
            } else return new Float32Array(e.buffer, e.byteOffset, e.byteLength / 4);
        else throw new Error("Invalid bitDepth (".concat(n, ")"))
    }

    function cr(e, n, t, r) {
        hs(e.data, n);
        for (var i = e.width * e.height, a = e.data, o = 0, s = t | 0; o < i; o++, s = s + r | 0) a[s] = n[o]
    }

    function _i(e, n, t, r, i) {
        if (t == 32)
            for (var a = 0; a < e.byteLength; a += 4) {
                var o = e[a + 0],
                    s = e[a + 1],
                    l = e[a + 2],
                    u = e[a + 3];
                e[a + 0] = u, e[a + 1] = l, e[a + 2] = s, e[a + 3] = o
            }
        var c = Ni(e, t);
        n && i < r && cr(n, c, i, r)
    }

    function lr(e, n, t, r) {
        for (var i = 0; i < t; i++)
            for (var a = i * n, o = 1, s = a + 1; o < n; o++, s++) e[s] = (e[s - 1] + e[s]) % r
    }

    function dr(e, n, t, r, i, a, o, s) {
        var l = (0, Yo.inflate)(e);
        if (n && o < a) {
            var u = Ni(l, i);
            if (i === 8) s && lr(l, t, r, 256), cr(n, l, o, a);
            else if (i === 16) s && lr(u, t, r, 65536), cr(n, u, o, a);
            else if (i === 32) {
                s && lr(l, t * 4, r, 256);
                for (var c = o, h = new Uint32Array(n.data.buffer, n.data.byteOffset, n.data.length), m = 0; m < r; m++)
                    for (var S = t * 4 * m, y = 0; y < t; y++, S++, c += a) {
                        var b = S + t,
                            P = b + t,
                            g = P + t;
                        h[c] = (l[S] << 24 | l[b] << 16 | l[P] << 8 | l[g]) >>> 0
                    }
            } else throw new Error("Invalid bitDepth")
        }
    }
    B.readDataZip = dr;

    function pn(e, n, t, r, i, a, o, s) {
        var l = n && n.data,
            u;
        if (s) {
            u = new Uint32Array(o.length * r);
            for (var c = 0, h = 0; c < o.length; c++)
                for (var m = 0; m < r; m++, h++) u[h] = de(e)
        } else {
            u = new Uint16Array(o.length * r);
            for (var c = 0, h = 0; c < o.length; c++)
                for (var m = 0; m < r; m++, h++) u[h] = oe(e)
        }
        if (i !== 1 && i !== 8) throw new Error("Invalid bit depth (".concat(i, ")"));
        for (var S = a - 1 | 0, y = 0, h = 0; y < o.length; y++) {
            var b = o[y] | 0,
                P = y > S || b > S;
            if (!l || P)
                for (var m = 0; m < r; m++, h++) Se(e, u[h]);
            else
                for (var m = 0, g = b | 0; m < r; m++, h++)
                    for (var F = u[h], C = Qe(e, F), I = 0, A = 0; I < F; I++) {
                        var k = C[I];
                        if (k > 128) {
                            var L = C[++I];
                            k = 256 - k | 0;
                            for (var M = 0; M <= k && A < t; M = M + 1 | 0, A = A + 1 | 0) l[g] = L, g = g + a | 0
                        } else if (k < 128)
                            for (var M = 0; M <= k && A < t; M = M + 1 | 0, A = A + 1 | 0) l[g] = C[++I], g = g + a | 0
                    }
        }
    }
    B.readDataRLE = pn;

    function Xe(e, n, t, r, i) {
        r === void 0 && (r = !0), i === void 0 && (i = !1);
        var a = de(e);
        if (i) {
            if (a !== 0) throw new Error("Sizes larger than 4GB are not supported");
            a = de(e)
        }
        if (!(a <= 0 && r)) {
            var o = e.offset + a;
            if (o > e.view.byteLength) throw new Error("Section exceeds file size");
            var s = t(function() {
                return o - e.offset
            });
            for (e.offset !== o && (e.offset > o ? Et(e, "Exceeded section limits") : Et(e, "Unread section data")); a % n;) a++, o++;
            return e.offset = o, s
        }
    }
    B.readSection = Xe;

    function vs(e) {
        var n = oe(e);
        switch (n) {
            case 0: {
                var t = oe(e) / 257,
                    r = oe(e) / 257,
                    i = oe(e) / 257;
                return Se(e, 2), {
                    r: t,
                    g: r,
                    b: i
                }
            }
            case 1: {
                var a = oe(e) / 65535,
                    o = oe(e) / 65535,
                    i = oe(e) / 65535;
                return Se(e, 2), {
                    h: a,
                    s: o,
                    b: i
                }
            }
            case 2: {
                var s = oe(e) / 257,
                    l = oe(e) / 257,
                    u = oe(e) / 257,
                    c = oe(e) / 257;
                return {
                    c: s,
                    m: l,
                    y: u,
                    k: c
                }
            }
            case 7: {
                var h = hn(e) / 1e4,
                    m = hn(e),
                    S = hn(e),
                    y = m < 0 ? m / 12800 : m / 12700,
                    i = S < 0 ? S / 12800 : S / 12700;
                return Se(e, 2), {
                    l: h,
                    a: y,
                    b: i
                }
            }
            case 8: {
                var c = oe(e) * 255 / 1e4;
                return Se(e, 6), {
                    k: c
                }
            }
            default:
                throw new Error("Invalid color space")
        }
    }
    B.readColor = vs;

    function ms(e) {
        for (var n = de(e); n % 4;) n++;
        var t = e.offset + n,
            r = de(e);
        if (r !== 1) throw new Error("Invalid pattern version: ".concat(r));
        var i = de(e),
            a = hn(e),
            o = hn(e);
        if (i !== 3 && i !== 1 && i !== 2) throw new Error("Unsupported pattern color mode: ".concat(i));
        var s = Li(e),
            l = kt(e, 1),
            u = [];
        if (i === 2) {
            for (var c = 0; c < 256; c++) u.push({
                r: pe(e),
                g: pe(e),
                b: pe(e)
            });
            Se(e, 4)
        }
        var h = de(e);
        if (h !== 3) throw new Error("Invalid pattern VMAL version: ".concat(h));
        de(e);
        for (var m = de(e), S = de(e), y = de(e), b = de(e), P = de(e), g = b - S, F = y - m, C = new Uint8Array(g * F * 4), c = 3; c < C.byteLength; c += 4) C[c] = 255;
        for (var c = 0, I = 0; c < P + 2; c++) {
            var A = de(e);
            if (A) {
                var k = de(e),
                    L = de(e),
                    M = de(e),
                    V = de(e),
                    N = de(e),
                    q = de(e),
                    J = oe(e),
                    D = pe(e),
                    O = k - 23,
                    _ = Qe(e, O);
                if (L !== 8 || J !== 8) throw new Error("16bit pixel depth not supported for patterns");
                var x = q - V,
                    W = N - M,
                    ae = V - S,
                    fe = M - m;
                if (D === 0) {
                    if (i === 3 && I < 3)
                        for (var Y = 0; Y < W; Y++)
                            for (var ve = 0; ve < x; ve++) {
                                var Me = ve + Y * x,
                                    Oe = (ae + ve + (Y + fe) * g) * 4;
                                C[Oe + I] = _[Me]
                            }
                    if (i === 1 && I < 1)
                        for (var $ = 0; $ < W; $++)
                            for (var Z = 0; Z < x; Z++) {
                                var Me = Z + $ * x,
                                    Oe = (ae + Z + ($ + fe) * g) * 4,
                                    ue = _[Me];
                                C[Oe + 0] = ue, C[Oe + 1] = ue, C[Oe + 2] = ue
                            }
                    if (i === 2) throw new Error("Indexed pattern color mode not implemented")
                } else if (D === 1) {
                    var he = {
                            data: C,
                            width: g,
                            height: F
                        },
                        le = {
                            data: new Uint8Array(x * W),
                            width: x,
                            height: W
                        },
                        ye = fr(_.buffer, _.byteOffset, _.byteLength);
                    if (i === 3 && I < 3 && (pn(ye, le, x, W, 8, 1, [0], !1), Ei(le, he, ae, fe, I)), i === 1 && I < 1 && (pn(ye, le, x, W, 8, 1, [0], !1), Ei(le, he, ae, fe, 0), At(he)), i === 2) throw new Error("Indexed pattern color mode not implemented")
                } else throw new Error("Invalid pattern compression mode");
                I++
            }
        }
        return e.offset = t, {
            id: l,
            name: s,
            x: a,
            y: o,
            bounds: {
                x: S,
                y: m,
                w: g,
                h: F
            },
            data: C
        }
    }
    B.readPattern = ms;

    function Ei(e, n, t, r, i) {
        for (var a = e.width, o = e.height, s = n.width, l = 0; l < o; l++)
            for (var u = 0; u < a; u++) {
                var c = u + l * a,
                    h = (t + u + (l + r) * s) * 4,
                    m = e.data[c];
                n.data[h + i] = m
            }
    }
});
var Xi = Ee(Bn => {
    "use strict";
    Object.defineProperty(Bn, "__esModule", {
        value: !0
    });
    Bn.writeEffects = Bn.readEffects = void 0;
    var ji = dn(),
        j = fn(),
        z = En(),
        Wi = [void 0, "outer bevel", "inner bevel", "emboss", "pillow emboss", "stroke emboss"];

    function kn(e) {
        return (0, j.checkSignature)(e, "8BIM"), ji.toBlendMode[(0, j.readSignature)(e)] || "normal"
    }

    function Ln(e, n) {
        (0, z.writeSignature)(e, "8BIM"), (0, z.writeSignature)(e, ji.fromBlendMode[n] || "norm")
    }

    function Mn(e) {
        return (0, j.readUint8)(e) / 255
    }

    function Tn(e, n) {
        (0, z.writeUint8)(e, Math.round(n * 255) | 0)
    }

    function gs(e) {
        var n = (0, j.readUint16)(e);
        if (n !== 0) throw new Error("Invalid effects layer version: ".concat(n));
        for (var t = (0, j.readUint16)(e), r = {}, i = 0; i < t; i++) {
            (0, j.checkSignature)(e, "8BIM");
            var a = (0, j.readSignature)(e);
            switch (a) {
                case "cmnS": {
                    var o = (0, j.readUint32)(e),
                        s = (0, j.readUint32)(e),
                        l = !!(0, j.readUint8)(e);
                    if ((0, j.skipBytes)(e, 2), o !== 7 || s !== 0 || !l) throw new Error("Invalid effects common state");
                    break
                }
                case "dsdw":
                case "isdw": {
                    var u = (0, j.readUint32)(e),
                        c = (0, j.readUint32)(e);
                    if (u !== 41 && u !== 51) throw new Error("Invalid shadow size: ".concat(u));
                    if (c !== 0 && c !== 2) throw new Error("Invalid shadow version: ".concat(c));
                    var o = (0, j.readFixedPoint32)(e);
                    (0, j.readFixedPoint32)(e);
                    var h = (0, j.readFixedPoint32)(e),
                        m = (0, j.readFixedPoint32)(e),
                        S = (0, j.readColor)(e),
                        y = kn(e),
                        b = !!(0, j.readUint8)(e),
                        P = !!(0, j.readUint8)(e),
                        g = Mn(e);
                    u >= 51 && (0, j.readColor)(e);
                    var F = {
                        size: {
                            units: "Pixels",
                            value: o
                        },
                        distance: {
                            units: "Pixels",
                            value: m
                        },
                        angle: h,
                        color: S,
                        blendMode: y,
                        enabled: b,
                        useGlobalLight: P,
                        opacity: g
                    };
                    a === "dsdw" ? r.dropShadow = [F] : r.innerShadow = [F];
                    break
                }
                case "oglw": {
                    var u = (0, j.readUint32)(e),
                        C = (0, j.readUint32)(e);
                    if (u !== 32 && u !== 42) throw new Error("Invalid outer glow size: ".concat(u));
                    if (C !== 0 && C !== 2) throw new Error("Invalid outer glow version: ".concat(C));
                    var o = (0, j.readFixedPoint32)(e);
                    (0, j.readFixedPoint32)(e);
                    var S = (0, j.readColor)(e),
                        y = kn(e),
                        b = !!(0, j.readUint8)(e),
                        g = Mn(e);
                    u >= 42 && (0, j.readColor)(e), r.outerGlow = {
                        size: {
                            units: "Pixels",
                            value: o
                        },
                        color: S,
                        blendMode: y,
                        enabled: b,
                        opacity: g
                    };
                    break
                }
                case "iglw": {
                    var u = (0, j.readUint32)(e),
                        I = (0, j.readUint32)(e);
                    if (u !== 32 && u !== 43) throw new Error("Invalid inner glow size: ".concat(u));
                    if (I !== 0 && I !== 2) throw new Error("Invalid inner glow version: ".concat(I));
                    var o = (0, j.readFixedPoint32)(e);
                    (0, j.readFixedPoint32)(e);
                    var S = (0, j.readColor)(e),
                        y = kn(e),
                        b = !!(0, j.readUint8)(e),
                        g = Mn(e);
                    u >= 43 && ((0, j.readUint8)(e), (0, j.readColor)(e)), r.innerGlow = {
                        size: {
                            units: "Pixels",
                            value: o
                        },
                        color: S,
                        blendMode: y,
                        enabled: b,
                        opacity: g
                    };
                    break
                }
                case "bevl": {
                    var u = (0, j.readUint32)(e),
                        A = (0, j.readUint32)(e);
                    if (u !== 58 && u !== 78) throw new Error("Invalid bevel size: ".concat(u));
                    if (A !== 0 && A !== 2) throw new Error("Invalid bevel version: ".concat(A));
                    var h = (0, j.readFixedPoint32)(e),
                        k = (0, j.readFixedPoint32)(e),
                        o = (0, j.readFixedPoint32)(e),
                        L = kn(e),
                        M = kn(e),
                        V = (0, j.readColor)(e),
                        N = (0, j.readColor)(e),
                        q = Wi[(0, j.readUint8)(e)] || "inner bevel",
                        J = Mn(e),
                        D = Mn(e),
                        b = !!(0, j.readUint8)(e),
                        P = !!(0, j.readUint8)(e),
                        O = (0, j.readUint8)(e) ? "down" : "up";
                    u >= 78 && ((0, j.readColor)(e), (0, j.readColor)(e)), r.bevel = {
                        size: {
                            units: "Pixels",
                            value: o
                        },
                        angle: h,
                        strength: k,
                        highlightBlendMode: L,
                        shadowBlendMode: M,
                        highlightColor: V,
                        shadowColor: N,
                        style: q,
                        highlightOpacity: J,
                        shadowOpacity: D,
                        enabled: b,
                        useGlobalLight: P,
                        direction: O
                    };
                    break
                }
                case "sofi": {
                    var o = (0, j.readUint32)(e),
                        _ = (0, j.readUint32)(e);
                    if (o !== 34) throw new Error("Invalid effects solid fill info size: ".concat(o));
                    if (_ !== 2) throw new Error("Invalid effects solid fill info version: ".concat(_));
                    var y = kn(e),
                        S = (0, j.readColor)(e),
                        g = Mn(e),
                        b = !!(0, j.readUint8)(e);
                    (0, j.readColor)(e), r.solidFill = [{
                        blendMode: y,
                        color: S,
                        opacity: g,
                        enabled: b
                    }];
                    break
                }
                default:
                    throw new Error("Invalid effect type: '".concat(a, "'"))
            }
        }
        return r
    }
    Bn.readEffects = gs;

    function Hi(e, n) {
        var t;
        (0, z.writeUint32)(e, 51), (0, z.writeUint32)(e, 2), (0, z.writeFixedPoint32)(e, n.size && n.size.value || 0), (0, z.writeFixedPoint32)(e, 0), (0, z.writeFixedPoint32)(e, n.angle || 0), (0, z.writeFixedPoint32)(e, n.distance && n.distance.value || 0), (0, z.writeColor)(e, n.color), Ln(e, n.blendMode), (0, z.writeUint8)(e, n.enabled ? 1 : 0), (0, z.writeUint8)(e, n.useGlobalLight ? 1 : 0), Tn(e, (t = n.opacity) !== null && t !== void 0 ? t : 1), (0, z.writeColor)(e, n.color)
    }

    function ys(e, n) {
        var t, r, i, a, o, s, l = (t = n.dropShadow) === null || t === void 0 ? void 0 : t[0],
            u = (r = n.innerShadow) === null || r === void 0 ? void 0 : r[0],
            c = n.outerGlow,
            h = n.innerGlow,
            m = n.bevel,
            S = (i = n.solidFill) === null || i === void 0 ? void 0 : i[0],
            y = 1;
        if (l && y++, u && y++, c && y++, h && y++, m && y++, S && y++, (0, z.writeUint16)(e, 0), (0, z.writeUint16)(e, y), (0, z.writeSignature)(e, "8BIM"), (0, z.writeSignature)(e, "cmnS"), (0, z.writeUint32)(e, 7), (0, z.writeUint32)(e, 0), (0, z.writeUint8)(e, 1), (0, z.writeZeros)(e, 2), l && ((0, z.writeSignature)(e, "8BIM"), (0, z.writeSignature)(e, "dsdw"), Hi(e, l)), u && ((0, z.writeSignature)(e, "8BIM"), (0, z.writeSignature)(e, "isdw"), Hi(e, u)), c && ((0, z.writeSignature)(e, "8BIM"), (0, z.writeSignature)(e, "oglw"), (0, z.writeUint32)(e, 42), (0, z.writeUint32)(e, 2), (0, z.writeFixedPoint32)(e, ((a = c.size) === null || a === void 0 ? void 0 : a.value) || 0), (0, z.writeFixedPoint32)(e, 0), (0, z.writeColor)(e, c.color), Ln(e, c.blendMode), (0, z.writeUint8)(e, c.enabled ? 1 : 0), Tn(e, c.opacity || 0), (0, z.writeColor)(e, c.color)), h && ((0, z.writeSignature)(e, "8BIM"), (0, z.writeSignature)(e, "iglw"), (0, z.writeUint32)(e, 43), (0, z.writeUint32)(e, 2), (0, z.writeFixedPoint32)(e, ((o = h.size) === null || o === void 0 ? void 0 : o.value) || 0), (0, z.writeFixedPoint32)(e, 0), (0, z.writeColor)(e, h.color), Ln(e, h.blendMode), (0, z.writeUint8)(e, h.enabled ? 1 : 0), Tn(e, h.opacity || 0), (0, z.writeUint8)(e, 0), (0, z.writeColor)(e, h.color)), m) {
            (0, z.writeSignature)(e, "8BIM"), (0, z.writeSignature)(e, "bevl"), (0, z.writeUint32)(e, 78), (0, z.writeUint32)(e, 2), (0, z.writeFixedPoint32)(e, m.angle || 0), (0, z.writeFixedPoint32)(e, m.strength || 0), (0, z.writeFixedPoint32)(e, ((s = m.size) === null || s === void 0 ? void 0 : s.value) || 0), Ln(e, m.highlightBlendMode), Ln(e, m.shadowBlendMode), (0, z.writeColor)(e, m.highlightColor), (0, z.writeColor)(e, m.shadowColor);
            var b = Wi.indexOf(m.style);
            (0, z.writeUint8)(e, b <= 0 ? 1 : b), Tn(e, m.highlightOpacity || 0), Tn(e, m.shadowOpacity || 0), (0, z.writeUint8)(e, m.enabled ? 1 : 0), (0, z.writeUint8)(e, m.useGlobalLight ? 1 : 0), (0, z.writeUint8)(e, m.direction === "down" ? 1 : 0), (0, z.writeColor)(e, m.highlightColor), (0, z.writeColor)(e, m.shadowColor)
        }
        S && ((0, z.writeSignature)(e, "8BIM"), (0, z.writeSignature)(e, "sofi"), (0, z.writeUint32)(e, 34), (0, z.writeUint32)(e, 2), Ln(e, S.blendMode), (0, z.writeColor)(e, S.color), Tn(e, S.opacity || 0), (0, z.writeUint8)(e, S.enabled ? 1 : 0), (0, z.writeColor)(e, S.color))
    }
    Bn.writeEffects = ys
});
var Zi = Ee(On => {
    "use strict";
    Object.defineProperty(On, "__esModule", {
        value: !0
    });
    On.serializeEngineData = On.parseEngineData = void 0;

    function qi(e) {
        return e === 32 || e === 10 || e === 13 || e === 9
    }

    function Yi(e) {
        return e >= 48 && e <= 57 || e === 46 || e === 45
    }

    function Ss(e) {
        var n = 0;

        function t() {
            for (; n < e.length && qi(e[n]);) n++
        }

        function r() {
            var F = e[n];
            return n++, F === 92 && (F = e[n], n++), F
        }

        function i() {
            var F = "";
            if (e[n] === 41) return n++, F;
            if (e[n] !== 254 || e[n + 1] !== 255) throw new Error("Invalid utf-16 BOM");
            for (n += 2; n < e.length && e[n] !== 41;) {
                var C = r(),
                    I = r(),
                    A = C << 8 | I;
                F += String.fromCharCode(A)
            }
            return n++, F
        }
        var a = null,
            o = [];

        function s(F) {
            o.length ? (l(F), o.push(F)) : (o.push(F), a = F)
        }

        function l(F) {
            if (!o.length) throw new Error("Invalid data");
            var C = o[o.length - 1];
            if (typeof C == "string") o[o.length - 2][C] = F, c();
            else if (Array.isArray(C)) C.push(F);
            else throw new Error("Invalid data")
        }

        function u(F) {
            o.length || s({});
            var C = o[o.length - 1];
            if (C && typeof C == "string") l(F === "nil" ? null : "/".concat(F));
            else if (C && typeof C == "object") o.push(F);
            else throw new Error("Invalid data")
        }

        function c() {
            if (!o.length) throw new Error("Invalid data");
            o.pop()
        }
        t();
        for (var h = e.length; h > 0 && e[h - 1] === 0;) h--;
        for (; n < h;) {
            var m = n,
                S = e[m];
            if (S === 60 && e[m + 1] === 60) n += 2, s({});
            else if (S === 62 && e[m + 1] === 62) n += 2, c();
            else if (S === 47) {
                n += 1;
                for (var y = n; n < e.length && !qi(e[n]);) n++;
                for (var b = "", P = y; P < n; P++) b += String.fromCharCode(e[P]);
                u(b)
            } else if (S === 40) n += 1, l(i());
            else if (S === 91) n += 1, s([]);
            else if (S === 93) n += 1, c();
            else if (S === 110 && e[m + 1] === 117 && e[m + 2] === 108 && e[m + 3] === 108) n += 4, l(null);
            else if (S === 116 && e[m + 1] === 114 && e[m + 2] === 117 && e[m + 3] === 101) n += 4, l(!0);
            else if (S === 102 && e[m + 1] === 97 && e[m + 2] === 108 && e[m + 3] === 115 && e[m + 4] === 101) n += 5, l(!1);
            else if (Yi(S)) {
                for (var g = ""; n < e.length && Yi(e[n]);) g += String.fromCharCode(e[n]), n++;
                l(parseFloat(g))
            } else n += 1, console.log("Invalid token '".concat(String.fromCharCode(S), "' (").concat(S, ") at ").concat(n));
            t()
        }
        return a
    }
    On.parseEngineData = Ss;
    var bs = ["Axis", "XY", "Zone", "WordSpacing", "FirstLineIndent", "GlyphSpacing", "StartIndent", "EndIndent", "SpaceBefore", "SpaceAfter", "LetterSpacing", "Values", "GridSize", "GridLeading", "PointBase", "BoxBounds", "TransformPoint0", "TransformPoint1", "TransformPoint2", "FontSize", "Leading", "HorizontalScale", "VerticalScale", "BaselineShift", "Tsume", "OutlineWidth", "AutoLeading"],
        ws = ["RunLengthArray"];

    function Fs(e, n) {
        n === void 0 && (n = !1);
        var t = new Uint8Array(1024),
            r = 0,
            i = 0;

        function a(F) {
            if (r >= t.length) {
                var C = new Uint8Array(t.length * 2);
                C.set(t), t = C
            }
            t[r] = F, r++
        }

        function o(F) {
            for (var C = 0; C < F.length; C++) a(F.charCodeAt(C))
        }

        function s() {
            if (n) o(" ");
            else
                for (var F = 0; F < i; F++) o("	")
        }

        function l(F, C) {
            s(), o("/".concat(F)), y(C, F, !0), n || o(`
`)
        }

        function u(F) {
            return F.toString()
        }

        function c(F) {
            return F.toFixed(5).replace(/(\d)0+$/g, "$1").replace(/^0+\.([1-9])/g, ".$1").replace(/^-0+\.0(\d)/g, "-.0$1")
        }

        function h(F, C) {
            var I = C && bs.indexOf(C) !== -1 || (F | 0) !== F;
            return I ? c(F) : u(F)
        }

        function m(F) {
            var C = Object.keys(F);
            return C.indexOf("98") !== -1 && C.unshift.apply(C, C.splice(C.indexOf("99"), 1)), C.indexOf("99") !== -1 && C.unshift.apply(C, C.splice(C.indexOf("99"), 1)), C
        }

        function S(F) {
            (F === 40 || F === 41 || F === 92) && a(92), a(F)
        }

        function y(F, C, I) {
            I === void 0 && (I = !1);

            function A() {
                I ? o(" ") : s()
            }
            if (F === null) A(), o(n ? "/nil" : "null");
            else if (typeof F == "number") A(), o(h(F, C));
            else if (typeof F == "boolean") A(), o(F ? "true" : "false");
            else if (typeof F == "string")
                if (A(), (C === "99" || C === "98") && F.charAt(0) === "/") o(F);
                else {
                    o("("), a(254), a(255);
                    for (var k = 0; k < F.length; k++) {
                        var L = F.charCodeAt(k);
                        S(L >> 8 & 255), S(L & 255)
                    }
                    o(")")
                }
            else if (Array.isArray(F))
                if (A(), F.every(function(W) {
                        return typeof W == "number"
                    })) {
                    o("[");
                    for (var M = ws.indexOf(C) !== -1, V = 0, N = F; V < N.length; V++) {
                        var q = N[V];
                        o(" "), o(M ? h(q) : c(q))
                    }
                    o(" ]")
                } else {
                    o("["), n || o(`
`);
                    for (var J = 0, D = F; J < D.length; J++) {
                        var q = D[J];
                        y(q, C), n || o(`
`)
                    }
                    s(), o("]")
                }
            else if (typeof F == "object") {
                I && !n && o(`
`), s(), o("<<"), n || o(`
`), i++;
                for (var O = 0, _ = m(F); O < _.length; O++) {
                    var x = _[O];
                    l(x, F[x])
                }
                i--, s(), o(">>")
            }
        }
        if (n) {
            if (typeof e == "object")
                for (var b = 0, P = m(e); b < P.length; b++) {
                    var g = P[b];
                    l(g, e[g])
                }
        } else o(`

`), y(e);
        return t.slice(0, r)
    }
    On.serializeEngineData = Fs
});
var aa = Ee(vn => {
    "use strict";
    var be = vn && vn.__assign || function() {
        return be = Object.assign || function(e) {
            for (var n, t = 1, r = arguments.length; t < r; t++) {
                n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }, be.apply(this, arguments)
    };
    Object.defineProperty(vn, "__esModule", {
        value: !0
    });
    vn.encodeEngineData = vn.decodeEngineData = void 0;
    var $i = {
            name: "MyriadPro-Regular",
            script: 0,
            type: 0,
            synthetic: 0
        },
        Lt = {
            justification: "left",
            firstLineIndent: 0,
            startIndent: 0,
            endIndent: 0,
            spaceBefore: 0,
            spaceAfter: 0,
            autoHyphenate: !0,
            hyphenatedWordSize: 6,
            preHyphen: 2,
            postHyphen: 2,
            consecutiveHyphens: 8,
            zone: 36,
            wordSpacing: [.8, 1, 1.33],
            letterSpacing: [0, 0, 0],
            glyphSpacing: [1, 1, 1],
            autoLeading: 1.2,
            leadingType: 0,
            hanging: !1,
            burasagari: !1,
            kinsokuOrder: 0,
            everyLineComposer: !1
        },
        Is = {
            font: $i,
            fontSize: 12,
            fauxBold: !1,
            fauxItalic: !1,
            autoLeading: !0,
            leading: 0,
            horizontalScale: 1,
            verticalScale: 1,
            tracking: 0,
            autoKerning: !0,
            kerning: 0,
            baselineShift: 0,
            fontCaps: 0,
            fontBaseline: 0,
            underline: !1,
            strikethrough: !1,
            ligatures: !0,
            dLigatures: !1,
            baselineDirection: 2,
            tsume: 0,
            styleRunAlignment: 2,
            language: 0,
            noBreak: !1,
            fillColor: {
                r: 0,
                g: 0,
                b: 0
            },
            strokeColor: {
                r: 0,
                g: 0,
                b: 0
            },
            fillFlag: !0,
            strokeFlag: !1,
            fillFirst: !0,
            yUnderline: 1,
            outlineWidth: 1,
            characterDirection: 0,
            hindiNumbers: !1,
            kashida: 1,
            diacriticPos: 2
        },
        Cs = {
            isOn: !1,
            show: !1,
            size: 18,
            leading: 22,
            color: {
                r: 0,
                g: 0,
                b: 255
            },
            leadingFillColor: {
                r: 0,
                g: 0,
                b: 255
            },
            alignLineHeightToGridFlags: !1
        },
        gr = ["justification", "firstLineIndent", "startIndent", "endIndent", "spaceBefore", "spaceAfter", "autoHyphenate", "hyphenatedWordSize", "preHyphen", "postHyphen", "consecutiveHyphens", "zone", "wordSpacing", "letterSpacing", "glyphSpacing", "autoLeading", "leadingType", "hanging", "burasagari", "kinsokuOrder", "everyLineComposer"],
        yr = ["font", "fontSize", "fauxBold", "fauxItalic", "autoLeading", "leading", "horizontalScale", "verticalScale", "tracking", "autoKerning", "kerning", "baselineShift", "fontCaps", "fontBaseline", "underline", "strikethrough", "ligatures", "dLigatures", "baselineDirection", "tsume", "styleRunAlignment", "language", "noBreak", "fillColor", "strokeColor", "fillFlag", "strokeFlag", "fillFirst", "yUnderline", "outlineWidth", "characterDirection", "hindiNumbers", "kashida", "diacriticPos"],
        ea = ["none", "crisp", "strong", "smooth", "sharp"],
        na = ["left", "right", "center", "justify-left", "justify-right", "justify-center", "justify-all"];

    function ta(e) {
        return e.substring(0, 1).toUpperCase() + e.substring(1)
    }

    function Ps(e) {
        var n = e.Values;
        switch (e.Type) {
            case 0:
                return {
                    k: n[1] * 255
                };
            case 1:
                return n[0] === 1 ? {
                    r: n[1] * 255,
                    g: n[2] * 255,
                    b: n[3] * 255
                } : {
                    r: n[1] * 255,
                    g: n[2] * 255,
                    b: n[3] * 255,
                    a: n[0] * 255
                };
            case 2:
                return {
                    c: n[1] * 255, m: n[2] * 255, y: n[3] * 255, k: n[4] * 255
                };
            default:
                throw new Error("Unknown color type in text layer")
        }
    }

    function mr(e) {
        if (e) {
            if ("r" in e) return {
                Type: 1,
                Values: ["a" in e ? e.a / 255 : 1, e.r / 255, e.g / 255, e.b / 255]
            };
            if ("c" in e) return {
                Type: 2,
                Values: [1, e.c / 255, e.m / 255, e.y / 255, e.k / 255]
            };
            if ("k" in e) return {
                Type: 0,
                Values: [1, e.k / 255]
            };
            throw new Error("Invalid color type in text layer")
        } else return {
            Type: 1,
            Values: [0, 0, 0, 0]
        }
    }

    function Ki(e, n) {
        if (!e || !n || e.length !== n.length) return !1;
        for (var t = 0; t < e.length; t++)
            if (e[t] !== n[t]) return !1;
        return !0
    }

    function Ji(e, n) {
        if (!e || !n) return !1;
        for (var t = 0, r = Object.keys(e); t < r.length; t++) {
            var i = r[t];
            if (e[i] !== n[i]) return !1
        }
        for (var a = 0, o = Object.keys(n); a < o.length; a++) {
            var i = o[a];
            if (e[i] !== n[i]) return !1
        }
        return !0
    }

    function Ds(e, n) {
        for (var t = 0; t < e.length; t++)
            if (e[t].name === n.name) return t;
        return e.push(n), e.length - 1
    }

    function ra(e, n, t) {
        for (var r = {}, i = 0, a = n; i < a.length; i++) {
            var o = a[i],
                s = ta(o);
            e[s] !== void 0 && (o === "justification" ? r[o] = na[e[s]] : o === "font" ? r[o] = t[e[s]] : o === "fillColor" || o === "strokeColor" ? r[o] = Ps(e[s]) : r[o] = e[s])
        }
        return r
    }

    function ia(e, n, t) {
        for (var r, i = {}, a = 0, o = n; a < o.length; a++) {
            var s = o[a],
                l = ta(s);
            e[s] !== void 0 && (s === "justification" ? i[l] = na.indexOf((r = e[s]) !== null && r !== void 0 ? r : "left") : s === "font" ? i[l] = Ds(t, e[s]) : s === "fillColor" || s === "strokeColor" ? i[l] = mr(e[s]) : i[l] = e[s])
        }
        return i
    }

    function Us(e, n) {
        return ra(e, gr, n)
    }

    function As(e, n) {
        return ra(e, yr, n)
    }

    function Tt(e, n) {
        return ia(e, gr, n)
    }

    function vr(e, n) {
        return ia(e, yr, n)
    }

    function Qi(e, n, t) {
        if (n.length) {
            for (var r = function(s) {
                    var l = n[0].style[s];
                    if (l !== void 0) {
                        var u = !1;
                        Array.isArray(l) ? u = n.every(function(b) {
                            return Ki(b.style[s], l)
                        }) : typeof l == "object" ? u = n.every(function(b) {
                            return Ji(b.style[s], l)
                        }) : u = n.every(function(b) {
                            return b.style[s] === l
                        }), u && (e[s] = l)
                    }
                    var c = e[s];
                    if (c !== void 0)
                        for (var h = 0, m = n; h < m.length; h++) {
                            var S = m[h],
                                y = !1;
                            Array.isArray(l) ? y = Ki(S.style[s], l) : typeof l == "object" ? y = Ji(S.style[s], l) : y = S.style[s] === l, y && delete S.style[s]
                        }
                }, i = 0, a = t; i < a.length; i++) {
                var o = a[i];
                r(o)
            }
            n.every(function(s) {
                return Object.keys(s.style).length === 0
            }) && (n.length = 0)
        }
    }

    function Es(e) {
        for (var n, t, r, i, a, o, s = e.EngineDict, l = e.ResourceDict, u = l.FontSet.map(function(k) {
                return {
                    name: k.Name,
                    script: k.Script,
                    type: k.FontType,
                    synthetic: k.Synthetic
                }
            }), c = s.Editor.Text.replace(/\r/g, `
`), h = 0;
            /\n$/.test(c);) c = c.substring(0, c.length - 1), h++;
        var m = {
                text: c,
                antiAlias: (n = ea[s.AntiAlias]) !== null && n !== void 0 ? n : "smooth",
                useFractionalGlyphWidths: !!s.UseFractionalGlyphWidths,
                superscriptSize: l.SuperscriptSize,
                superscriptPosition: l.SuperscriptPosition,
                subscriptSize: l.SubscriptSize,
                subscriptPosition: l.SubscriptPosition,
                smallCapSize: l.SmallCapSize
            },
            S = (o = (a = (i = (r = (t = s.Rendered) === null || t === void 0 ? void 0 : t.Shapes) === null || r === void 0 ? void 0 : r.Children) === null || i === void 0 ? void 0 : i[0]) === null || a === void 0 ? void 0 : a.Cookie) === null || o === void 0 ? void 0 : o.Photoshop;
        S && (m.shapeType = S.ShapeType === 1 ? "box" : "point", S.PointBase && (m.pointBase = S.PointBase), S.BoxBounds && (m.boxBounds = S.BoxBounds));
        var y = s.ParagraphRun;
        m.paragraphStyle = {}, m.paragraphStyleRuns = [];
        for (var b = 0; b < y.RunArray.length; b++) {
            var P = y.RunArray[b],
                g = y.RunLengthArray[b],
                F = Us(P.ParagraphSheet.Properties, u);
            m.paragraphStyleRuns.push({
                length: g,
                style: F
            })
        }
        for (var C = h; m.paragraphStyleRuns.length && C > 0; C--) --m.paragraphStyleRuns[m.paragraphStyleRuns.length - 1].length === 0 && m.paragraphStyleRuns.pop();
        Qi(m.paragraphStyle, m.paragraphStyleRuns, gr), m.paragraphStyleRuns.length || delete m.paragraphStyleRuns;
        var I = s.StyleRun;
        m.style = {}, m.styleRuns = [];
        for (var b = 0; b < I.RunArray.length; b++) {
            var A = I.RunLengthArray[b],
                F = As(I.RunArray[b].StyleSheet.StyleSheetData, u);
            F.font || (F.font = u[0]), m.styleRuns.push({
                length: A,
                style: F
            })
        }
        for (var C = h; m.styleRuns.length && C > 0; C--) --m.styleRuns[m.styleRuns.length - 1].length === 0 && m.styleRuns.pop();
        return Qi(m.style, m.styleRuns, yr), m.styleRuns.length || delete m.styleRuns, m
    }
    vn.decodeEngineData = Es;

    function xs(e) {
        var n, t, r, i, a, o, s, l, u, c, h, m, S = "".concat((e.text || "").replace(/\r?\n/g, "\r"), "\r"),
            y = [{
                name: "AdobeInvisFont",
                script: 0,
                type: 0,
                synthetic: 0
            }],
            b = ((n = e.style) === null || n === void 0 ? void 0 : n.font) || ((r = (t = e.styleRuns) === null || t === void 0 ? void 0 : t.find(function(Z) {
                return Z.style.font
            })) === null || r === void 0 ? void 0 : r.style.font) || $i,
            P = [],
            g = [],
            F = e.paragraphStyleRuns;
        if (F && F.length) {
            for (var C = S.length, I = 0, A = F; I < A.length; I++) {
                var k = A[I],
                    L = Math.min(k.length, C);
                C -= L, L && (C === 1 && k === F[F.length - 1] && (L++, C--), g.push(L), P.push({
                    ParagraphSheet: {
                        DefaultStyleSheet: 0,
                        Properties: Tt(be(be(be({}, Lt), e.paragraphStyle), k.style), y)
                    },
                    Adjustments: {
                        Axis: [1, 0, 1],
                        XY: [0, 0]
                    }
                }))
            }
            C && (g.push(C), P.push({
                ParagraphSheet: {
                    DefaultStyleSheet: 0,
                    Properties: Tt(be(be({}, Lt), e.paragraphStyle), y)
                },
                Adjustments: {
                    Axis: [1, 0, 1],
                    XY: [0, 0]
                }
            }))
        } else
            for (var M = 0, V = 0; M < S.length; M++) S.charCodeAt(M) === 13 && (g.push(M - V + 1), P.push({
                ParagraphSheet: {
                    DefaultStyleSheet: 0,
                    Properties: Tt(be(be({}, Lt), e.paragraphStyle), y)
                },
                Adjustments: {
                    Axis: [1, 0, 1],
                    XY: [0, 0]
                }
            }), V = M + 1);
        for (var N = vr(be(be({}, Is), {
                font: b
            }), y), q = e.styleRuns || [{
                length: S.length,
                style: e.style || {}
            }], J = [], D = [], O = S.length, _ = 0, x = q; _ < x.length; _++) {
            var W = x[_],
                L = Math.min(W.length, O);
            O -= L, L && (O === 1 && W === q[q.length - 1] && (L++, O--), D.push(L), J.push({
                StyleSheet: {
                    StyleSheetData: vr(be(be({
                        kerning: 0,
                        autoKerning: !0,
                        fillColor: {
                            r: 0,
                            g: 0,
                            b: 0
                        }
                    }, e.style), W.style), y)
                }
            }))
        }
        O && q.length && (D.push(O), J.push({
            StyleSheet: {
                StyleSheetData: vr(be({
                    kerning: 0,
                    autoKerning: !0,
                    fillColor: {
                        r: 0,
                        g: 0,
                        b: 0
                    }
                }, e.style), y)
            }
        }));
        var ae = be(be({}, Cs), e.gridInfo),
            fe = e.orientation === "vertical" ? 2 : 0,
            Y = e.orientation === "vertical" ? 1 : 0,
            ve = e.shapeType === "box" ? 1 : 0,
            Me = {
                ShapeType: ve
            };
        ve === 0 ? Me.PointBase = e.pointBase || [0, 0] : Me.BoxBounds = e.boxBounds || [0, 0, 0, 0], Me.Base = {
            ShapeType: ve,
            TransformPoint0: [1, 0],
            TransformPoint1: [0, 1],
            TransformPoint2: [0, 0]
        };
        var Oe = {
                KinsokuSet: [{
                    Name: "PhotoshopKinsokuHard",
                    NoStart: "\u3001\u3002\uFF0C\uFF0E\u30FB\uFF1A\uFF1B\uFF1F\uFF01\u30FC\u2015\u2019\u201D\uFF09\u3015\uFF3D\uFF5D\u3009\u300B\u300D\u300F\u3011\u30FD\u30FE\u309D\u309E\u3005\u3041\u3043\u3045\u3047\u3049\u3063\u3083\u3085\u3087\u308E\u30A1\u30A3\u30A5\u30A7\u30A9\u30C3\u30E3\u30E5\u30E7\u30EE\u30F5\u30F6\u309B\u309C?!)]},.:;\u2103\u2109\xA2\uFF05\u2030",
                    NoEnd: "\u2018\u201C\uFF08\u3014\uFF3B\uFF5B\u3008\u300A\u300C\u300E\u3010([{\uFFE5\uFF04\xA3\uFF20\xA7\u3012\uFF03",
                    Keep: "\u2015\u2025",
                    Hanging: "\u3001\u3002.,"
                }, {
                    Name: "PhotoshopKinsokuSoft",
                    NoStart: "\u3001\u3002\uFF0C\uFF0E\u30FB\uFF1A\uFF1B\uFF1F\uFF01\u2019\u201D\uFF09\u3015\uFF3D\uFF5D\u3009\u300B\u300D\u300F\u3011\u30FD\u30FE\u309D\u309E\u3005",
                    NoEnd: "\u2018\u201C\uFF08\u3014\uFF3B\uFF5B\u3008\u300A\u300C\u300E\u3010",
                    Keep: "\u2015\u2025",
                    Hanging: "\u3001\u3002.,"
                }],
                MojiKumiSet: [{
                    InternalName: "Photoshop6MojiKumiSet1"
                }, {
                    InternalName: "Photoshop6MojiKumiSet2"
                }, {
                    InternalName: "Photoshop6MojiKumiSet3"
                }, {
                    InternalName: "Photoshop6MojiKumiSet4"
                }],
                TheNormalStyleSheet: 0,
                TheNormalParagraphSheet: 0,
                ParagraphSheetSet: [{
                    Name: "Normal RGB",
                    DefaultStyleSheet: 0,
                    Properties: Tt(be(be({}, Lt), e.paragraphStyle), y)
                }],
                StyleSheetSet: [{
                    Name: "Normal RGB",
                    StyleSheetData: N
                }],
                FontSet: y.map(function(Z) {
                    return {
                        Name: Z.name,
                        Script: Z.script || 0,
                        FontType: Z.type || 0,
                        Synthetic: Z.synthetic || 0
                    }
                }),
                SuperscriptSize: (i = e.superscriptSize) !== null && i !== void 0 ? i : .583,
                SuperscriptPosition: (a = e.superscriptPosition) !== null && a !== void 0 ? a : .333,
                SubscriptSize: (o = e.subscriptSize) !== null && o !== void 0 ? o : .583,
                SubscriptPosition: (s = e.subscriptPosition) !== null && s !== void 0 ? s : .333,
                SmallCapSize: (l = e.smallCapSize) !== null && l !== void 0 ? l : .7
            },
            $ = {
                EngineDict: {
                    Editor: {
                        Text: S
                    },
                    ParagraphRun: {
                        DefaultRunData: {
                            ParagraphSheet: {
                                DefaultStyleSheet: 0,
                                Properties: {}
                            },
                            Adjustments: {
                                Axis: [1, 0, 1],
                                XY: [0, 0]
                            }
                        },
                        RunArray: P,
                        RunLengthArray: g,
                        IsJoinable: 1
                    },
                    StyleRun: {
                        DefaultRunData: {
                            StyleSheet: {
                                StyleSheetData: {}
                            }
                        },
                        RunArray: J,
                        RunLengthArray: D,
                        IsJoinable: 2
                    },
                    GridInfo: {
                        GridIsOn: !!ae.isOn,
                        ShowGrid: !!ae.show,
                        GridSize: (u = ae.size) !== null && u !== void 0 ? u : 18,
                        GridLeading: (c = ae.leading) !== null && c !== void 0 ? c : 22,
                        GridColor: mr(ae.color),
                        GridLeadingFillColor: mr(ae.color),
                        AlignLineHeightToGridFlags: !!ae.alignLineHeightToGridFlags
                    },
                    AntiAlias: ea.indexOf((h = e.antiAlias) !== null && h !== void 0 ? h : "sharp"),
                    UseFractionalGlyphWidths: (m = e.useFractionalGlyphWidths) !== null && m !== void 0 ? m : !0,
                    Rendered: {
                        Version: 1,
                        Shapes: {
                            WritingDirection: fe,
                            Children: [{
                                ShapeType: ve,
                                Procession: Y,
                                Lines: {
                                    WritingDirection: fe,
                                    Children: []
                                },
                                Cookie: {
                                    Photoshop: Me
                                }
                            }]
                        }
                    }
                },
                ResourceDict: be({}, Oe),
                DocumentResources: be({}, Oe)
            };
        return $
    }
    vn.encodeEngineData = xs
});
var sa = Ee(Bt => {
    "use strict";
    Object.defineProperty(Bt, "__esModule", {
        value: !0
    });
    Bt.decodeEngineData2 = void 0;
    var Sr = {
            0: {
                uproot: !0,
                children: {
                    0: {
                        name: "Type"
                    },
                    1: {
                        name: "Values"
                    }
                }
            }
        },
        wr = {
            0: {
                name: "Font"
            },
            1: {
                name: "FontSize"
            },
            2: {
                name: "FauxBold"
            },
            3: {
                name: "FauxItalic"
            },
            4: {
                name: "AutoLeading"
            },
            5: {
                name: "Leading"
            },
            6: {
                name: "HorizontalScale"
            },
            7: {
                name: "VerticalScale"
            },
            8: {
                name: "Tracking"
            },
            9: {
                name: "BaselineShift"
            },
            11: {
                name: "Kerning?"
            },
            12: {
                name: "FontCaps"
            },
            13: {
                name: "FontBaseline"
            },
            15: {
                name: "Strikethrough?"
            },
            16: {
                name: "Underline?"
            },
            18: {
                name: "Ligatures"
            },
            19: {
                name: "DLigatures"
            },
            23: {
                name: "Fractions"
            },
            24: {
                name: "Ordinals"
            },
            28: {
                name: "StylisticAlternates"
            },
            30: {
                name: "OldStyle?"
            },
            35: {
                name: "BaselineDirection"
            },
            38: {
                name: "Language"
            },
            52: {
                name: "NoBreak"
            },
            53: {
                name: "FillColor",
                children: Sr
            },
            54: {
                name: "StrokeColor",
                children: Sr
            },
            55: {
                children: {
                    99: {
                        uproot: !0
                    }
                }
            },
            79: {
                children: Sr
            }
        },
        br = {
            0: {
                name: "Justification"
            },
            1: {
                name: "FirstLineIndent"
            },
            2: {
                name: "StartIndent"
            },
            3: {
                name: "EndIndent"
            },
            4: {
                name: "SpaceBefore"
            },
            5: {
                name: "SpaceAfter"
            },
            7: {
                name: "AutoLeading"
            },
            9: {
                name: "AutoHyphenate"
            },
            10: {
                name: "HyphenatedWordSize"
            },
            11: {
                name: "PreHyphen"
            },
            12: {
                name: "PostHyphen"
            },
            13: {
                name: "ConsecutiveHyphens?"
            },
            14: {
                name: "Zone"
            },
            15: {
                name: "HypenateCapitalizedWords"
            },
            17: {
                name: "WordSpacing"
            },
            18: {
                name: "LetterSpacing"
            },
            19: {
                name: "GlyphSpacing"
            },
            32: {
                name: "StyleSheet",
                children: wr
            }
        },
        oa = {
            name: "StyleSheetData",
            children: wr
        },
        ks = {
            0: {
                name: "ResourceDict",
                children: {
                    1: {
                        name: "FontSet",
                        children: {
                            0: {
                                uproot: !0,
                                children: {
                                    0: {
                                        uproot: !0,
                                        children: {
                                            0: {
                                                uproot: !0,
                                                children: {
                                                    0: {
                                                        name: "Name"
                                                    },
                                                    2: {
                                                        name: "FontType"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    2: {
                        name: "2",
                        children: {}
                    },
                    3: {
                        name: "MojiKumiSet",
                        children: {
                            0: {
                                uproot: !0,
                                children: {
                                    0: {
                                        uproot: !0,
                                        children: {
                                            0: {
                                                name: "InternalName"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    4: {
                        name: "KinsokuSet",
                        children: {
                            0: {
                                uproot: !0,
                                children: {
                                    0: {
                                        uproot: !0,
                                        children: {
                                            0: {
                                                name: "Name"
                                            },
                                            5: {
                                                uproot: !0,
                                                children: {
                                                    0: {
                                                        name: "NoStart"
                                                    },
                                                    1: {
                                                        name: "NoEnd"
                                                    },
                                                    2: {
                                                        name: "Keep"
                                                    },
                                                    3: {
                                                        name: "Hanging"
                                                    },
                                                    4: {
                                                        name: "Name"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    5: {
                        name: "StyleSheetSet",
                        children: {
                            0: {
                                uproot: !0,
                                children: {
                                    0: {
                                        uproot: !0,
                                        children: {
                                            0: {
                                                name: "Name"
                                            },
                                            6: oa
                                        }
                                    }
                                }
                            }
                        }
                    },
                    6: {
                        name: "ParagraphSheetSet",
                        children: {
                            0: {
                                uproot: !0,
                                children: {
                                    0: {
                                        uproot: !0,
                                        children: {
                                            0: {
                                                name: "Name"
                                            },
                                            5: {
                                                name: "Properties",
                                                children: br
                                            },
                                            6: {
                                                name: "DefaultStyleSheet"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    8: {
                        name: "TextFrameSet",
                        children: {
                            0: {
                                uproot: !0,
                                children: {
                                    0: {
                                        name: "path",
                                        children: {
                                            0: {
                                                name: "name"
                                            },
                                            1: {
                                                name: "bezierCurve",
                                                children: {
                                                    0: {
                                                        name: "controlPoints"
                                                    }
                                                }
                                            },
                                            2: {
                                                name: "data",
                                                children: {
                                                    0: {
                                                        name: "type"
                                                    },
                                                    1: {
                                                        name: "orientation"
                                                    },
                                                    2: {
                                                        name: "frameMatrix"
                                                    },
                                                    4: {
                                                        name: "4"
                                                    },
                                                    6: {
                                                        name: "textRange"
                                                    },
                                                    7: {
                                                        name: "rowGutter"
                                                    },
                                                    8: {
                                                        name: "columnGutter"
                                                    },
                                                    9: {
                                                        name: "9"
                                                    },
                                                    10: {
                                                        name: "baselineAlignment",
                                                        children: {
                                                            0: {
                                                                name: "flag"
                                                            },
                                                            1: {
                                                                name: "min"
                                                            }
                                                        }
                                                    },
                                                    11: {
                                                        name: "pathData",
                                                        children: {
                                                            1: {
                                                                name: "1"
                                                            },
                                                            0: {
                                                                name: "reversed"
                                                            },
                                                            2: {
                                                                name: "2"
                                                            },
                                                            3: {
                                                                name: "3"
                                                            },
                                                            4: {
                                                                name: "spacing"
                                                            },
                                                            5: {
                                                                name: "5"
                                                            },
                                                            6: {
                                                                name: "6"
                                                            },
                                                            7: {
                                                                name: "7"
                                                            },
                                                            18: {
                                                                name: "18"
                                                            }
                                                        }
                                                    },
                                                    12: {
                                                        name: "12"
                                                    },
                                                    13: {
                                                        name: "13"
                                                    }
                                                }
                                            },
                                            3: {
                                                name: "3"
                                            },
                                            97: {
                                                name: "uuid"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    9: {
                        name: "Predefined",
                        children: {
                            0: {
                                children: {
                                    0: {
                                        uproot: !0
                                    }
                                }
                            },
                            1: {
                                children: {
                                    0: {
                                        uproot: !0
                                    }
                                }
                            }
                        }
                    }
                }
            },
            1: {
                name: "EngineDict",
                children: {
                    0: {
                        name: "0",
                        children: {
                            3: {
                                name: "SuperscriptSize"
                            },
                            4: {
                                name: "SuperscriptPosition"
                            },
                            5: {
                                name: "SubscriptSize"
                            },
                            6: {
                                name: "SubscriptPosition"
                            },
                            7: {
                                name: "SmallCapSize"
                            },
                            8: {
                                name: "UseFractionalGlyphWidths"
                            },
                            15: {
                                children: {
                                    0: {
                                        uproot: !0
                                    }
                                }
                            }
                        }
                    },
                    1: {
                        name: "Editors?",
                        children: {
                            0: {
                                name: "Editor",
                                children: {
                                    0: {
                                        name: "Text"
                                    },
                                    5: {
                                        name: "ParagraphRun",
                                        children: {
                                            0: {
                                                name: "RunArray",
                                                children: {
                                                    0: {
                                                        name: "ParagraphSheet",
                                                        children: {
                                                            0: {
                                                                uproot: !0,
                                                                children: {
                                                                    0: {
                                                                        name: "0"
                                                                    },
                                                                    5: {
                                                                        name: "5",
                                                                        children: br
                                                                    },
                                                                    6: {
                                                                        name: "6"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    1: {
                                                        name: "RunLength"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    6: {
                                        name: "StyleRun",
                                        children: {
                                            0: {
                                                name: "RunArray",
                                                children: {
                                                    0: {
                                                        name: "StyleSheet",
                                                        children: {
                                                            0: {
                                                                uproot: !0,
                                                                children: {
                                                                    6: oa
                                                                }
                                                            }
                                                        }
                                                    },
                                                    1: {
                                                        name: "RunLength"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            1: {
                                name: "FontVectorData ???"
                            }
                        }
                    },
                    2: {
                        name: "StyleSheet",
                        children: wr
                    },
                    3: {
                        name: "ParagraphSheet",
                        children: br
                    }
                }
            }
        };

    function Jn(e, n) {
        var t, r;
        if (e === null) return e;
        if (Array.isArray(e)) return e.map(function(l) {
            return Jn(l, n)
        });
        if (typeof e != "object") return e;
        for (var i = {}, a = 0, o = Object.keys(e); a < o.length; a++) {
            var s = o[a];
            if (n[s])
                if (n[s].uproot) {
                    s !== "99" && (i = Jn(e[s], (t = n[s].children) !== null && t !== void 0 ? t : {})), e[99] && (i._type = e[99]);
                    break
                } else i[n[s].name || s] = Jn(e[s], (r = n[s].children) !== null && r !== void 0 ? r : {});
            else s === "99" ? i._type = e[s] : i[s] = Jn(e[s], {})
        }
        return i
    }

    function Ms(e) {
        return Jn(e, ks)
    }
    Bt.decodeEngineData2 = Ms
});
var Mt = Ee(ge => {
    "use strict";
    var f = ge && ge.__assign || function() {
        return f = Object.assign || function(e) {
            for (var n, t = 1, r = arguments.length; t < r; t++) {
                n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }, f.apply(this, arguments)
    };
    Object.defineProperty(ge, "__esModule", {
        value: !0
    });
    ge.hasMultiEffects = ge.readVectorMask = ge.booleanOperations = ge.readBezierKnot = ge.infoHandlersMap = ge.infoHandlers = void 0;
    var la = yn("base64-js"),
        ua = Xi(),
        Ne = dn(),
        d = fn(),
        p = En(),
        v = bt(),
        Ur = Zi(),
        ca = aa(),
        Ls = sa(),
        Ge = "abcdefghijklmnopqrstuvwxyz";
    ge.infoHandlers = [];
    ge.infoHandlersMap = {};

    function R(e, n, t, r) {
        var i = {
            key: e,
            has: n,
            read: t,
            write: r
        };
        ge.infoHandlers.push(i), ge.infoHandlersMap[i.key] = i
    }

    function Vn(e, n) {
        ge.infoHandlersMap[e] = ge.infoHandlersMap[n]
    }

    function se(e) {
        return function(n) {
            return n[e] !== void 0
        }
    }

    function Fr(e) {
        if ((0, d.readUint32)(e)) throw new Error("Resource size above 4 GB limit at ".concat(e.offset.toString(16)));
        return (0, d.readUint32)(e)
    }

    function Ir(e, n) {
        (0, p.writeUint32)(e, 0), (0, p.writeUint32)(e, n)
    }
    R("TySh", se("text"), function(e, n, t) {
        if ((0, d.readInt16)(e) !== 1) throw new Error("Invalid TySh version");
        for (var r = [], i = 0; i < 6; i++) r.push((0, d.readFloat64)(e));
        if ((0, d.readInt16)(e) !== 50) throw new Error("Invalid TySh text version");
        var a = (0, v.readVersionAndDescriptor)(e);
        if ((0, d.readInt16)(e) !== 1) throw new Error("Invalid TySh warp version");
        var o = (0, v.readVersionAndDescriptor)(e);
        if (n.text = {
                transform: r,
                left: (0, d.readFloat32)(e),
                top: (0, d.readFloat32)(e),
                right: (0, d.readFloat32)(e),
                bottom: (0, d.readFloat32)(e),
                text: a["Txt "].replace(/\r/g, `
`),
                index: a.TextIndex || 0,
                gridding: v.textGridding.decode(a.textGridding),
                antiAlias: v.Annt.decode(a.AntA),
                orientation: v.Ornt.decode(a.Ornt),
                warp: {
                    style: v.warpStyle.decode(o.warpStyle),
                    value: o.warpValue || 0,
                    perspective: o.warpPerspective || 0,
                    perspectiveOther: o.warpPerspectiveOther || 0,
                    rotate: v.Ornt.decode(o.warpRotate)
                }
            }, a.bounds && (n.text.bounds = (0, v.descBoundsToBounds)(a.bounds)), a.boundingBox && (n.text.boundingBox = (0, v.descBoundsToBounds)(a.boundingBox)), a.EngineData) {
            var s = (0, Ur.parseEngineData)(a.EngineData),
                l = (0, ca.decodeEngineData)(s);
            n.text = f(f({}, n.text), l)
        }(0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.text,
            r = t.warp || {},
            i = t.transform || [1, 0, 0, 1, 0, 0],
            a = f(f(f({
                "Txt ": (t.text || "").replace(/\r?\n/g, "\r"),
                textGridding: v.textGridding.encode(t.gridding),
                Ornt: v.Ornt.encode(t.orientation),
                AntA: v.Annt.encode(t.antiAlias)
            }, t.bounds ? {
                bounds: (0, v.boundsToDescBounds)(t.bounds)
            } : {}), t.boundingBox ? {
                boundingBox: (0, v.boundsToDescBounds)(t.boundingBox)
            } : {}), {
                TextIndex: t.index || 0,
                EngineData: (0, Ur.serializeEngineData)((0, ca.encodeEngineData)(t))
            });
        (0, p.writeInt16)(e, 1);
        for (var o = 0; o < 6; o++)(0, p.writeFloat64)(e, i[o]);
        (0, p.writeInt16)(e, 50), (0, v.writeVersionAndDescriptor)(e, "", "TxLr", a, "text"), (0, p.writeInt16)(e, 1), (0, v.writeVersionAndDescriptor)(e, "", "warp", Nt(r)), (0, p.writeFloat32)(e, t.left), (0, p.writeFloat32)(e, t.top), (0, p.writeFloat32)(e, t.right), (0, p.writeFloat32)(e, t.bottom)
    });
    R("SoCo", function(e) {
        return e.vectorFill !== void 0 && e.vectorStroke === void 0 && e.vectorFill.type === "color"
    }, function(e, n) {
        var t = (0, v.readVersionAndDescriptor)(e);
        n.vectorFill = (0, v.parseVectorContent)(t)
    }, function(e, n) {
        var t = (0, v.serializeVectorContent)(n.vectorFill).descriptor;
        (0, v.writeVersionAndDescriptor)(e, "", "null", t)
    });
    R("GdFl", function(e) {
        return e.vectorFill !== void 0 && e.vectorStroke === void 0 && (e.vectorFill.type === "solid" || e.vectorFill.type === "noise")
    }, function(e, n, t) {
        var r = (0, v.readVersionAndDescriptor)(e);
        n.vectorFill = (0, v.parseVectorContent)(r), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = (0, v.serializeVectorContent)(n.vectorFill).descriptor;
        (0, v.writeVersionAndDescriptor)(e, "", "null", t)
    });
    R("PtFl", function(e) {
        return e.vectorFill !== void 0 && e.vectorStroke === void 0 && e.vectorFill.type === "pattern"
    }, function(e, n) {
        var t = (0, v.readVersionAndDescriptor)(e);
        n.vectorFill = (0, v.parseVectorContent)(t)
    }, function(e, n) {
        var t = (0, v.serializeVectorContent)(n.vectorFill).descriptor;
        (0, v.writeVersionAndDescriptor)(e, "", "null", t)
    });
    R("vscg", function(e) {
        return e.vectorFill !== void 0 && e.vectorStroke !== void 0
    }, function(e, n, t) {
        (0, d.readSignature)(e);
        var r = (0, v.readVersionAndDescriptor)(e);
        n.vectorFill = (0, v.parseVectorContent)(r), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = (0, v.serializeVectorContent)(n.vectorFill),
            r = t.descriptor,
            i = t.key;
        (0, p.writeSignature)(e, i), (0, v.writeVersionAndDescriptor)(e, "", "null", r)
    });

    function ga(e, n, t) {
        var r = (0, d.readFixedPointPath32)(e) * t,
            i = (0, d.readFixedPointPath32)(e) * n,
            a = (0, d.readFixedPointPath32)(e) * t,
            o = (0, d.readFixedPointPath32)(e) * n,
            s = (0, d.readFixedPointPath32)(e) * t,
            l = (0, d.readFixedPointPath32)(e) * n;
        return [i, r, o, a, l, s]
    }
    ge.readBezierKnot = ga;

    function Ts(e, n, t, r) {
        (0, p.writeFixedPointPath32)(e, n[1] / r), (0, p.writeFixedPointPath32)(e, n[0] / t), (0, p.writeFixedPointPath32)(e, n[3] / r), (0, p.writeFixedPointPath32)(e, n[2] / t), (0, p.writeFixedPointPath32)(e, n[5] / r), (0, p.writeFixedPointPath32)(e, n[4] / t)
    }
    ge.booleanOperations = ["exclude", "combine", "subtract", "intersect"];

    function ya(e, n, t, r, i) {
        for (var a = e.offset + i, o = n.paths, s = void 0; a - e.offset >= 26;) {
            var l = (0, d.readUint16)(e);
            switch (l) {
                case 0:
                case 3: {
                    (0, d.readUint16)(e);
                    var u = (0, d.readInt16)(e),
                        c = (0, d.readUint16)(e);
                    (0, d.skipBytes)(e, 18), s = {
                        open: l === 3,
                        knots: [],
                        fillRule: c === 2 ? "non-zero" : "even-odd"
                    }, u !== -1 && (s.operation = ge.booleanOperations[u]), o.push(s);
                    break
                }
                case 1:
                case 2:
                case 4:
                case 5:
                    s.knots.push({
                        linked: l === 1 || l === 4,
                        points: ga(e, t, r)
                    });
                    break;
                case 6:
                    (0, d.skipBytes)(e, 24);
                    break;
                case 7: {
                    var h = (0, d.readFixedPointPath32)(e),
                        m = (0, d.readFixedPointPath32)(e),
                        S = (0, d.readFixedPointPath32)(e),
                        y = (0, d.readFixedPointPath32)(e),
                        b = (0, d.readFixedPointPath32)(e);
                    (0, d.skipBytes)(e, 4), n.clipboard = {
                        top: h,
                        left: m,
                        bottom: S,
                        right: y,
                        resolution: b
                    };
                    break
                }
                case 8:
                    n.fillStartsWithAllPixels = !!(0, d.readUint16)(e), (0, d.skipBytes)(e, 22);
                    break;
                default:
                    throw new Error("Invalid vmsk section")
            }
        }
        return o
    }
    ge.readVectorMask = ya;
    R("vmsk", se("vectorMask"), function(e, n, t, r) {
        var i = r.width,
            a = r.height;
        if ((0, d.readUint32)(e) !== 3) throw new Error("Invalid vmsk version");
        n.vectorMask = {
            paths: []
        };
        var o = n.vectorMask,
            s = (0, d.readUint32)(e);
        o.invert = (s & 1) !== 0, o.notLink = (s & 2) !== 0, o.disable = (s & 4) !== 0, ya(e, o, i, a, t()), (0, d.skipBytes)(e, t())
    }, function(e, n, t) {
        var r = t.width,
            i = t.height,
            a = n.vectorMask,
            o = (a.invert ? 1 : 0) | (a.notLink ? 2 : 0) | (a.disable ? 4 : 0);
        (0, p.writeUint32)(e, 3), (0, p.writeUint32)(e, o), (0, p.writeUint16)(e, 6), (0, p.writeZeros)(e, 24);
        var s = a.clipboard;
        s && ((0, p.writeUint16)(e, 7), (0, p.writeFixedPointPath32)(e, s.top), (0, p.writeFixedPointPath32)(e, s.left), (0, p.writeFixedPointPath32)(e, s.bottom), (0, p.writeFixedPointPath32)(e, s.right), (0, p.writeFixedPointPath32)(e, s.resolution), (0, p.writeZeros)(e, 4)), (0, p.writeUint16)(e, 8), (0, p.writeUint16)(e, a.fillStartsWithAllPixels ? 1 : 0), (0, p.writeZeros)(e, 22);
        for (var l = 0, u = a.paths; l < u.length; l++) {
            var c = u[l];
            (0, p.writeUint16)(e, c.open ? 3 : 0), (0, p.writeUint16)(e, c.knots.length), (0, p.writeUint16)(e, c.operation ? ge.booleanOperations.indexOf(c.operation) : -1), (0, p.writeUint16)(e, c.fillRule === "non-zero" ? 2 : 1), (0, p.writeZeros)(e, 18);
            for (var h = c.open ? 4 : 1, m = c.open ? 5 : 2, S = 0, y = c.knots; S < y.length; S++) {
                var b = y[S],
                    P = b.linked,
                    g = b.points;
                (0, p.writeUint16)(e, P ? h : m), Ts(e, g, r, i)
            }
        }
    });
    Vn("vsms", "vmsk");
    R("vowv", se("vowv"), function(e, n) {
        n.vowv = (0, d.readUint32)(e)
    }, function(e, n) {
        (0, p.writeUint32)(e, n.vowv)
    });
    R("vogk", se("vectorOrigination"), function(e, n, t) {
        if ((0, d.readInt32)(e) !== 1) throw new Error("Invalid vogk version");
        var r = (0, v.readVersionAndDescriptor)(e);
        n.vectorOrigination = {
            keyDescriptorList: []
        };
        for (var i = 0, a = r.keyDescriptorList; i < a.length; i++) {
            var o = a[i],
                s = {};
            o.keyShapeInvalidated != null && (s.keyShapeInvalidated = o.keyShapeInvalidated), o.keyOriginType != null && (s.keyOriginType = o.keyOriginType), o.keyOriginResolution != null && (s.keyOriginResolution = o.keyOriginResolution), o.keyOriginShapeBBox && (s.keyOriginShapeBoundingBox = {
                top: (0, v.parseUnitsOrNumber)(o.keyOriginShapeBBox["Top "]),
                left: (0, v.parseUnitsOrNumber)(o.keyOriginShapeBBox.Left),
                bottom: (0, v.parseUnitsOrNumber)(o.keyOriginShapeBBox.Btom),
                right: (0, v.parseUnitsOrNumber)(o.keyOriginShapeBBox.Rght)
            });
            var l = o.keyOriginRRectRadii;
            l && (s.keyOriginRRectRadii = {
                topRight: (0, v.parseUnits)(l.topRight),
                topLeft: (0, v.parseUnits)(l.topLeft),
                bottomLeft: (0, v.parseUnits)(l.bottomLeft),
                bottomRight: (0, v.parseUnits)(l.bottomRight)
            });
            var u = o.keyOriginBoxCorners;
            u && (s.keyOriginBoxCorners = [{
                x: u.rectangleCornerA.Hrzn,
                y: u.rectangleCornerA.Vrtc
            }, {
                x: u.rectangleCornerB.Hrzn,
                y: u.rectangleCornerB.Vrtc
            }, {
                x: u.rectangleCornerC.Hrzn,
                y: u.rectangleCornerC.Vrtc
            }, {
                x: u.rectangleCornerD.Hrzn,
                y: u.rectangleCornerD.Vrtc
            }]);
            var c = o.Trnf;
            c && (s.transform = [c.xx, c.xy, c.yx, c.yy, c.tx, c.ty]), n.vectorOrigination.keyDescriptorList.push(s)
        }(0, d.skipBytes)(e, t())
    }, function(e, n) {
        for (var t = n.vectorOrigination, r = {
                keyDescriptorList: []
            }, i = 0; i < t.keyDescriptorList.length; i++) {
            var a = t.keyDescriptorList[i];
            r.keyDescriptorList.push({});
            var o = r.keyDescriptorList[r.keyDescriptorList.length - 1];
            a.keyOriginType != null && (o.keyOriginType = a.keyOriginType), a.keyOriginResolution != null && (o.keyOriginResolution = a.keyOriginResolution);
            var s = a.keyOriginRRectRadii;
            s && (o.keyOriginRRectRadii = {
                unitValueQuadVersion: 1,
                topRight: (0, v.unitsValue)(s.topRight, "topRight"),
                topLeft: (0, v.unitsValue)(s.topLeft, "topLeft"),
                bottomLeft: (0, v.unitsValue)(s.bottomLeft, "bottomLeft"),
                bottomRight: (0, v.unitsValue)(s.bottomRight, "bottomRight")
            });
            var l = a.keyOriginShapeBoundingBox;
            l && (o.keyOriginShapeBBox = {
                unitValueQuadVersion: 1,
                "Top ": (0, v.unitsValue)(l.top, "top"),
                Left: (0, v.unitsValue)(l.left, "left"),
                Btom: (0, v.unitsValue)(l.bottom, "bottom"),
                Rght: (0, v.unitsValue)(l.right, "right")
            });
            var u = a.keyOriginBoxCorners;
            u && u.length === 4 && (o.keyOriginBoxCorners = {
                rectangleCornerA: {
                    Hrzn: u[0].x,
                    Vrtc: u[0].y
                },
                rectangleCornerB: {
                    Hrzn: u[1].x,
                    Vrtc: u[1].y
                },
                rectangleCornerC: {
                    Hrzn: u[2].x,
                    Vrtc: u[2].y
                },
                rectangleCornerD: {
                    Hrzn: u[3].x,
                    Vrtc: u[3].y
                }
            });
            var c = a.transform;
            c && c.length === 6 && (o.Trnf = {
                xx: c[0],
                xy: c[1],
                yx: c[2],
                yy: c[3],
                tx: c[4],
                ty: c[5]
            }), a.keyShapeInvalidated != null && (o.keyShapeInvalidated = a.keyShapeInvalidated), o.keyOriginIndex = i
        }(0, p.writeInt32)(e, 1), (0, v.writeVersionAndDescriptor)(e, "", "null", r)
    });
    R("lmfx", function(e) {
        return e.effects !== void 0 && Er(e.effects)
    }, function(e, n, t) {
        var r = (0, d.readUint32)(e);
        if (r !== 0) throw new Error("Invalid lmfx version");
        var i = (0, v.readVersionAndDescriptor)(e);
        n.effects = (0, v.parseEffects)(i, !!e.logMissingFeatures), (0, d.skipBytes)(e, t())
    }, function(e, n, t, r) {
        var i = (0, v.serializeEffects)(n.effects, !!r.logMissingFeatures, !0);
        (0, p.writeUint32)(e, 0), (0, v.writeVersionAndDescriptor)(e, "", "null", i)
    });
    R("lrFX", se("effects"), function(e, n, t) {
        n.effects || (n.effects = (0, ua.readEffects)(e)), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        (0, ua.writeEffects)(e, n.effects)
    });
    R("luni", se("name"), function(e, n, t) {
        if (t() > 4) {
            var r = (0, d.readUint32)(e);
            t() >= r * 2 ? n.name = (0, d.readUnicodeStringWithLength)(e, r) : e.logDevFeatures && e.log("name in luni section is too long")
        } else e.logDevFeatures && e.log("empty luni section");
        (0, d.skipBytes)(e, t())
    }, function(e, n) {
        (0, p.writeUnicodeString)(e, n.name)
    });
    R("lnsr", se("nameSource"), function(e, n) {
        return n.nameSource = (0, d.readSignature)(e)
    }, function(e, n) {
        return (0, p.writeSignature)(e, n.nameSource)
    });
    R("lyid", se("id"), function(e, n) {
        n.id = (0, d.readUint32)(e)
    }, function(e, n, t, r) {
        for (var i = n.id; r.layerIds.has(i);) i += 100;
        (0, p.writeUint32)(e, i), r.layerIds.add(i), r.layerToId.set(n, i)
    });
    R("lsct", se("sectionDivider"), function(e, n, t) {
        n.sectionDivider = {
            type: (0, d.readUint32)(e)
        }, t() && ((0, d.checkSignature)(e, "8BIM"), n.sectionDivider.key = (0, d.readSignature)(e)), t() && (n.sectionDivider.subType = (0, d.readUint32)(e))
    }, function(e, n) {
        (0, p.writeUint32)(e, n.sectionDivider.type), n.sectionDivider.key && ((0, p.writeSignature)(e, "8BIM"), (0, p.writeSignature)(e, n.sectionDivider.key), n.sectionDivider.subType !== void 0 && (0, p.writeUint32)(e, n.sectionDivider.subType))
    });
    Vn("lsdk", "lsct");
    R("clbl", se("blendClippendElements"), function(e, n) {
        n.blendClippendElements = !!(0, d.readUint8)(e), (0, d.skipBytes)(e, 3)
    }, function(e, n) {
        (0, p.writeUint8)(e, n.blendClippendElements ? 1 : 0), (0, p.writeZeros)(e, 3)
    });
    R("infx", se("blendInteriorElements"), function(e, n) {
        n.blendInteriorElements = !!(0, d.readUint8)(e), (0, d.skipBytes)(e, 3)
    }, function(e, n) {
        (0, p.writeUint8)(e, n.blendInteriorElements ? 1 : 0), (0, p.writeZeros)(e, 3)
    });
    R("knko", se("knockout"), function(e, n) {
        n.knockout = !!(0, d.readUint8)(e), (0, d.skipBytes)(e, 3)
    }, function(e, n) {
        (0, p.writeUint8)(e, n.knockout ? 1 : 0), (0, p.writeZeros)(e, 3)
    });
    R("lmgm", se("layerMaskAsGlobalMask"), function(e, n) {
        n.layerMaskAsGlobalMask = !!(0, d.readUint8)(e), (0, d.skipBytes)(e, 3)
    }, function(e, n) {
        (0, p.writeUint8)(e, n.layerMaskAsGlobalMask ? 1 : 0), (0, p.writeZeros)(e, 3)
    });
    R("lspf", se("protected"), function(e, n) {
        var t = (0, d.readUint32)(e);
        n.protected = {
            transparency: (t & 1) !== 0,
            composite: (t & 2) !== 0,
            position: (t & 4) !== 0
        }, t & 8 && (n.protected.artboards = !0)
    }, function(e, n) {
        var t = (n.protected.transparency ? 1 : 0) | (n.protected.composite ? 2 : 0) | (n.protected.position ? 4 : 0) | (n.protected.artboards ? 8 : 0);
        (0, p.writeUint32)(e, t)
    });
    R("lclr", se("layerColor"), function(e, n) {
        var t = (0, d.readUint16)(e);
        (0, d.skipBytes)(e, 6), n.layerColor = Ne.layerColors[t]
    }, function(e, n) {
        var t = Ne.layerColors.indexOf(n.layerColor);
        (0, p.writeUint16)(e, t === -1 ? 0 : t), (0, p.writeZeros)(e, 6)
    });
    R("shmd", function(e) {
        return e.timestamp !== void 0 || e.animationFrames !== void 0 || e.animationFrameFlags !== void 0 || e.timeline !== void 0 || e.comps !== void 0
    }, function(e, n, t) {
        for (var r = (0, d.readUint32)(e), i = function(o) {
                (0, d.checkSignature)(e, "8BIM");
                var s = (0, d.readSignature)(e);
                (0, d.readUint8)(e), (0, d.skipBytes)(e, 3), (0, d.readSection)(e, 1, function(l) {
                    if (s === "cust") {
                        var u = (0, v.readVersionAndDescriptor)(e);
                        u.layerTime !== void 0 && (n.timestamp = u.layerTime)
                    } else if (s === "mlst") {
                        var u = (0, v.readVersionAndDescriptor)(e);
                        n.animationFrames = [];
                        for (var c = 0; c < u.LaSt.length; c++) {
                            var h = u.LaSt[c],
                                m = {
                                    frames: h.FrLs
                                };
                            h.enab !== void 0 && (m.enable = h.enab), h.Ofst && (m.offset = (0, v.horzVrtcToXY)(h.Ofst)), h.FXRf && (m.referencePoint = (0, v.horzVrtcToXY)(h.FXRf)), h.Lefx && (m.effects = (0, v.parseEffects)(h.Lefx, !!e.logMissingFeatures)), h.blendOptions && h.blendOptions.Opct && (m.opacity = (0, v.parsePercent)(h.blendOptions.Opct)), n.animationFrames.push(m)
                        }
                    } else if (s === "mdyn") {
                        (0, d.readUint16)(e);
                        var S = (0, d.readUint8)(e),
                            y = (0, d.readUint8)(e);
                        n.animationFrameFlags = {
                            propagateFrameOne: !S,
                            unifyLayerPosition: (y & 1) !== 0,
                            unifyLayerStyle: (y & 2) !== 0,
                            unifyLayerVisibility: (y & 4) !== 0
                        }
                    } else if (s === "tmln") {
                        var u = (0, v.readVersionAndDescriptor)(e),
                            b = u.timeScope,
                            P = {
                                start: (0, v.frac)(b.Strt),
                                duration: (0, v.frac)(b.duration),
                                inTime: (0, v.frac)(b.inTime),
                                outTime: (0, v.frac)(b.outTime),
                                autoScope: u.autoScope,
                                audioLevel: u.audioLevel
                            };
                        u.trackList && (P.tracks = (0, v.parseTrackList)(u.trackList, !!e.logMissingFeatures)), n.timeline = P
                    } else if (s === "cmls") {
                        var u = (0, v.readVersionAndDescriptor)(e);
                        n.comps = {
                            settings: []
                        }, u.origFXRefPoint && (n.comps.originalEffectsReferencePoint = {
                            x: u.origFXRefPoint.Hrzn,
                            y: u.origFXRefPoint.Vrtc
                        });
                        for (var g = 0, F = u.layerSettings; g < F.length; g++) {
                            var C = F[g];
                            n.comps.settings.push({
                                compList: C.compList
                            });
                            var I = n.comps.settings[n.comps.settings.length - 1];
                            "enab" in C && (I.enabled = C.enab), C.Ofst && (I.offset = {
                                x: C.Ofst.Hrzn,
                                y: C.Ofst.Vrtc
                            }), C.FXRefPoint && (I.effectsReferencePoint = {
                                x: C.FXRefPoint.Hrzn,
                                y: C.FXRefPoint.Vrtc
                            })
                        }
                    } else if (s === "extn") {
                        var u = (0, v.readVersionAndDescriptor)(e);
                        e.logMissingFeatures && e.log('Unhandled "shmd" section key', s)
                    } else e.logMissingFeatures && e.log('Unhandled "shmd" section key', s);
                    (0, d.skipBytes)(e, l())
                })
            }, a = 0; a < r; a++) i(a);
        (0, d.skipBytes)(e, t())
    }, function(e, n, t, r) {
        var i = n.animationFrames,
            a = n.animationFrameFlags,
            o = n.timestamp,
            s = n.timeline,
            l = n.comps,
            u = 0;
        i && u++, a && u++, s && u++, o !== void 0 && u++, l && u++, (0, p.writeUint32)(e, u), i && ((0, p.writeSignature)(e, "8BIM"), (0, p.writeSignature)(e, "mlst"), (0, p.writeUint8)(e, 0), (0, p.writeZeros)(e, 3), (0, p.writeSection)(e, 2, function() {
            for (var c, h = {
                    LaID: (c = n.id) !== null && c !== void 0 ? c : 0,
                    LaSt: []
                }, m = 0; m < i.length; m++) {
                var S = i[m],
                    y = {};
                S.enable !== void 0 && (y.enab = S.enable), y.FrLs = S.frames, S.offset && (y.Ofst = (0, v.xyToHorzVrtc)(S.offset)), S.referencePoint && (y.FXRf = (0, v.xyToHorzVrtc)(S.referencePoint)), S.effects && (y.Lefx = (0, v.serializeEffects)(S.effects, !1, !1)), S.opacity !== void 0 && (y.blendOptions = {
                    Opct: (0, v.unitsPercent)(S.opacity)
                }), h.LaSt.push(y)
            }(0, v.writeVersionAndDescriptor)(e, "", "null", h)
        }, !0)), a && ((0, p.writeSignature)(e, "8BIM"), (0, p.writeSignature)(e, "mdyn"), (0, p.writeUint8)(e, 0), (0, p.writeZeros)(e, 3), (0, p.writeSection)(e, 2, function() {
            (0, p.writeUint16)(e, 0), (0, p.writeUint8)(e, a.propagateFrameOne ? 0 : 15), (0, p.writeUint8)(e, (a.unifyLayerPosition ? 1 : 0) | (a.unifyLayerStyle ? 2 : 0) | (a.unifyLayerVisibility ? 4 : 0))
        })), s && ((0, p.writeSignature)(e, "8BIM"), (0, p.writeSignature)(e, "tmln"), (0, p.writeUint8)(e, 0), (0, p.writeZeros)(e, 3), (0, p.writeSection)(e, 2, function() {
            var c = {
                Vrsn: 1,
                timeScope: {
                    Vrsn: 1,
                    Strt: s.start,
                    duration: s.duration,
                    inTime: s.inTime,
                    outTime: s.outTime
                },
                autoScope: s.autoScope,
                audioLevel: s.audioLevel
            };
            s.tracks && (c.trackList = (0, v.serializeTrackList)(s.tracks));
            var h = r.layerToId.get(n) || n.id;
            if (!h) throw new Error("You need to provide layer.id value whan writing document with animations");
            c.LyrI = h, (0, v.writeVersionAndDescriptor)(e, "", "null", c, "anim")
        }, !0)), o !== void 0 && ((0, p.writeSignature)(e, "8BIM"), (0, p.writeSignature)(e, "cust"), (0, p.writeUint8)(e, 0), (0, p.writeZeros)(e, 3), (0, p.writeSection)(e, 2, function() {
            var c = {
                layerTime: o
            };
            (0, v.writeVersionAndDescriptor)(e, "", "metadata", c)
        }, !0)), l && ((0, p.writeSignature)(e, "8BIM"), (0, p.writeSignature)(e, "cmls"), (0, p.writeUint8)(e, 0), (0, p.writeZeros)(e, 3), (0, p.writeSection)(e, 2, function() {
            var c = r.layerToId.get(n) || n.id;
            if (!c) throw new Error("You need to provide layer.id value whan writing document with layer comps");
            var h = {};
            l.originalEffectsReferencePoint && (h.origFXRefPoint = {
                Hrzn: l.originalEffectsReferencePoint.x,
                Vrtc: l.originalEffectsReferencePoint.y
            }), h.LyrI = c, h.layerSettings = [];
            for (var m = 0, S = l.settings; m < S.length; m++) {
                var y = S[m],
                    b = {};
                y.enabled !== void 0 && (b.enab = y.enabled), y.offset && (b.Ofst = {
                    Hrzn: y.offset.x,
                    Vrtc: y.offset.y
                }), y.effectsReferencePoint && (b.FXRefPoint = {
                    Hrzn: y.effectsReferencePoint.x,
                    Vrtc: y.effectsReferencePoint.y
                }), b.compList = y.compList, h.layerSettings.push(b)
            }(0, v.writeVersionAndDescriptor)(e, "", "null", h)
        }, !0))
    });
    R("PxSc", function() {
        return !1
    }, function(e, n) {
        var t = (0, v.readVersionAndDescriptor)(e, !0);
        t.pixelSourceType === 1986285651 ? n.pixelSource = {
            type: "vdPS",
            origin: {
                x: t.origin.Hrzn,
                y: t.origin.Vrtc
            },
            interpretation: {
                interpretAlpha: t.interpretation.interpretAlpha.split(".")[1],
                profile: t.interpretation.profile
            },
            frameReader: {
                type: "QTFR",
                link: {
                    name: t.frameReader["Lnk "]["Nm  "],
                    fullPath: t.frameReader["Lnk "].fullPath,
                    originalPath: t.frameReader["Lnk "].originalPath,
                    relativePath: t.frameReader["Lnk "].relPath,
                    alias: t.frameReader["Lnk "].alis
                },
                mediaDescriptor: t.frameReader.mediaDescriptor
            },
            showAlteredVideo: t.showAlteredVideo
        } : e.log("Unknown pixelSourceType")
    }, function(e, n) {
        var t = n.pixelSource,
            r = {
                _name: "",
                _classID: "PixelSource",
                pixelSourceType: 1986285651,
                descVersion: 1,
                origin: {
                    Hrzn: t.origin.x,
                    Vrtc: t.origin.y
                },
                interpretation: {
                    _name: "",
                    _classID: "footageInterpretation",
                    Vrsn: 1,
                    interpretAlpha: "alphaInterpretation.".concat(t.interpretation.interpretAlpha),
                    profile: t.interpretation.profile
                },
                frameReader: {
                    _name: "",
                    _classID: "FrameReader",
                    frameReaderType: 1364477522,
                    descVersion: 1,
                    "Lnk ": {
                        _name: "",
                        _classID: "ExternalFileLink",
                        descVersion: 2,
                        "Nm  ": t.frameReader.link.name,
                        fullPath: t.frameReader.link.fullPath,
                        originalPath: t.frameReader.link.originalPath,
                        alis: t.frameReader.link.alias,
                        relPath: t.frameReader.link.relativePath
                    },
                    mediaDescriptor: t.frameReader.mediaDescriptor
                },
                showAlteredVideo: t.showAlteredVideo
            };
        (0, v.writeVersionAndDescriptor)(e, "", "PixelSource", r)
    });
    R("vstk", se("vectorStroke"), function(e, n, t) {
        var r = (0, v.readVersionAndDescriptor)(e);
        n.vectorStroke = {
            strokeEnabled: r.strokeEnabled,
            fillEnabled: r.fillEnabled,
            lineWidth: (0, v.parseUnits)(r.strokeStyleLineWidth),
            lineDashOffset: (0, v.parseUnits)(r.strokeStyleLineDashOffset),
            miterLimit: r.strokeStyleMiterLimit,
            lineCapType: v.strokeStyleLineCapType.decode(r.strokeStyleLineCapType),
            lineJoinType: v.strokeStyleLineJoinType.decode(r.strokeStyleLineJoinType),
            lineAlignment: v.strokeStyleLineAlignment.decode(r.strokeStyleLineAlignment),
            scaleLock: r.strokeStyleScaleLock,
            strokeAdjust: r.strokeStyleStrokeAdjust,
            lineDashSet: r.strokeStyleLineDashSet.map(v.parseUnits),
            blendMode: v.BlnM.decode(r.strokeStyleBlendMode),
            opacity: (0, v.parsePercent)(r.strokeStyleOpacity),
            content: (0, v.parseVectorContent)(r.strokeStyleContent),
            resolution: r.strokeStyleResolution
        }, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t, r, i, a = n.vectorStroke,
            o = {
                strokeStyleVersion: 2,
                strokeEnabled: !!a.strokeEnabled,
                fillEnabled: !!a.fillEnabled,
                strokeStyleLineWidth: a.lineWidth || {
                    value: 3,
                    units: "Points"
                },
                strokeStyleLineDashOffset: a.lineDashOffset || {
                    value: 0,
                    units: "Points"
                },
                strokeStyleMiterLimit: (t = a.miterLimit) !== null && t !== void 0 ? t : 100,
                strokeStyleLineCapType: v.strokeStyleLineCapType.encode(a.lineCapType),
                strokeStyleLineJoinType: v.strokeStyleLineJoinType.encode(a.lineJoinType),
                strokeStyleLineAlignment: v.strokeStyleLineAlignment.encode(a.lineAlignment),
                strokeStyleScaleLock: !!a.scaleLock,
                strokeStyleStrokeAdjust: !!a.strokeAdjust,
                strokeStyleLineDashSet: a.lineDashSet || [],
                strokeStyleBlendMode: v.BlnM.encode(a.blendMode),
                strokeStyleOpacity: (0, v.unitsPercent)((r = a.opacity) !== null && r !== void 0 ? r : 1),
                strokeStyleContent: (0, v.serializeVectorContent)(a.content || {
                    type: "color",
                    color: {
                        r: 0,
                        g: 0,
                        b: 0
                    }
                }).descriptor,
                strokeStyleResolution: (i = a.resolution) !== null && i !== void 0 ? i : 72
            };
        (0, v.writeVersionAndDescriptor)(e, "", "strokeStyle", o)
    });
    R("artb", se("artboard"), function(e, n, t) {
        var r = (0, v.readVersionAndDescriptor)(e),
            i = r.artboardRect;
        n.artboard = {
            rect: {
                top: i["Top "],
                left: i.Left,
                bottom: i.Btom,
                right: i.Rght
            },
            guideIndices: r.guideIndeces,
            presetName: r.artboardPresetName,
            color: (0, v.parseColor)(r["Clr "]),
            backgroundType: r.artboardBackgroundType
        }, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t, r = n.artboard,
            i = r.rect,
            a = {
                artboardRect: {
                    "Top ": i.top,
                    Left: i.left,
                    Btom: i.bottom,
                    Rght: i.right
                },
                guideIndeces: r.guideIndices || [],
                artboardPresetName: r.presetName || "",
                "Clr ": (0, v.serializeColor)(r.color),
                artboardBackgroundType: (t = r.backgroundType) !== null && t !== void 0 ? t : 1
            };
        (0, v.writeVersionAndDescriptor)(e, "", "artboard", a)
    });
    R("sn2P", se("usingAlignedRendering"), function(e, n) {
        return n.usingAlignedRendering = !!(0, d.readUint32)(e)
    }, function(e, n) {
        return (0, p.writeUint32)(e, n.usingAlignedRendering ? 1 : 0)
    });
    var Rn = ["unknown", "vector", "raster", "image stack"];

    function Sa(e) {
        var n, t, r, i, a, o, s = f(f({
            style: v.warpStyle.decode(e.warpStyle)
        }, e.warpValues ? {
            values: e.warpValues
        } : {
            value: e.warpValue || 0
        }), {
            perspective: e.warpPerspective || 0,
            perspectiveOther: e.warpPerspectiveOther || 0,
            rotate: v.Ornt.decode(e.warpRotate),
            bounds: e.bounds && {
                top: (0, v.parseUnitsOrNumber)(e.bounds["Top "]),
                left: (0, v.parseUnitsOrNumber)(e.bounds.Left),
                bottom: (0, v.parseUnitsOrNumber)(e.bounds.Btom),
                right: (0, v.parseUnitsOrNumber)(e.bounds.Rght)
            },
            uOrder: e.uOrder,
            vOrder: e.vOrder
        });
        (e.deformNumRows != null || e.deformNumCols != null) && (s.deformNumRows = e.deformNumRows, s.deformNumCols = e.deformNumCols);
        var l = e.customEnvelopeWarp;
        if (l) {
            s.customEnvelopeWarp = {
                meshPoints: []
            };
            for (var u = ((n = l.meshPoints.find(function(m) {
                    return m.type === "Hrzn"
                })) === null || n === void 0 ? void 0 : n.values) || [], c = ((t = l.meshPoints.find(function(m) {
                    return m.type === "Vrtc"
                })) === null || t === void 0 ? void 0 : t.values) || [], h = 0; h < u.length; h++) s.customEnvelopeWarp.meshPoints.push({
                x: u[h],
                y: c[h]
            });
            (l.quiltSliceX || l.quiltSliceY) && (s.customEnvelopeWarp.quiltSliceX = ((i = (r = l.quiltSliceX) === null || r === void 0 ? void 0 : r[0]) === null || i === void 0 ? void 0 : i.values) || [], s.customEnvelopeWarp.quiltSliceY = ((o = (a = l.quiltSliceY) === null || a === void 0 ? void 0 : a[0]) === null || o === void 0 ? void 0 : o.values) || [])
        }
        return s
    }

    function Ar(e) {
        var n, t;
        return e.deformNumCols != null || e.deformNumRows != null || ((n = e.customEnvelopeWarp) === null || n === void 0 ? void 0 : n.quiltSliceX) || ((t = e.customEnvelopeWarp) === null || t === void 0 ? void 0 : t.quiltSliceY)
    }

    function Nt(e) {
        var n = e.bounds,
            t = f(f({
                warpStyle: v.warpStyle.encode(e.style)
            }, e.values ? {
                warpValues: e.values
            } : {
                warpValue: e.value || 0
            }), {
                warpPerspective: e.perspective || 0,
                warpPerspectiveOther: e.perspectiveOther || 0,
                warpRotate: v.Ornt.encode(e.rotate),
                bounds: {
                    "Top ": (0, v.unitsValue)(n && n.top || {
                        units: "Pixels",
                        value: 0
                    }, "bounds.top"),
                    Left: (0, v.unitsValue)(n && n.left || {
                        units: "Pixels",
                        value: 0
                    }, "bounds.left"),
                    Btom: (0, v.unitsValue)(n && n.bottom || {
                        units: "Pixels",
                        value: 0
                    }, "bounds.bottom"),
                    Rght: (0, v.unitsValue)(n && n.right || {
                        units: "Pixels",
                        value: 0
                    }, "bounds.right")
                },
                uOrder: e.uOrder || 0,
                vOrder: e.vOrder || 0
            }),
            r = Ar(e);
        if (r) {
            var i = t;
            i.deformNumRows = e.deformNumRows || 0, i.deformNumCols = e.deformNumCols || 0
        }
        var a = e.customEnvelopeWarp;
        if (a) {
            var o = a.meshPoints || [];
            if (r) {
                var i = t;
                i.customEnvelopeWarp = {
                    _name: "",
                    _classID: "customEnvelopeWarp",
                    quiltSliceX: [{
                        type: "quiltSliceX",
                        values: a.quiltSliceX || []
                    }],
                    quiltSliceY: [{
                        type: "quiltSliceY",
                        values: a.quiltSliceY || []
                    }],
                    meshPoints: [{
                        type: "Hrzn",
                        values: o.map(function(l) {
                            return l.x
                        })
                    }, {
                        type: "Vrtc",
                        values: o.map(function(l) {
                            return l.y
                        })
                    }]
                }
            } else t.customEnvelopeWarp = {
                _name: "",
                _classID: "customEnvelopeWarp",
                meshPoints: [{
                    type: "Hrzn",
                    values: o.map(function(s) {
                        return s.x
                    })
                }, {
                    type: "Vrtc",
                    values: o.map(function(s) {
                        return s.y
                    })
                }]
            }
        }
        return t
    }
    R("PlLd", se("placedLayer"), function(e, n, t) {
        if ((0, d.readSignature)(e) !== "plcL") throw new Error("Invalid PlLd signature");
        if ((0, d.readInt32)(e) !== 3) throw new Error("Invalid PlLd version");
        var r = (0, d.readPascalString)(e, 1),
            i = (0, d.readInt32)(e),
            a = (0, d.readInt32)(e);
        (0, d.readInt32)(e);
        var o = (0, d.readInt32)(e);
        if (!Rn[o]) throw new Error("Invalid PlLd type");
        for (var s = [], l = 0; l < 8; l++) s.push((0, d.readFloat64)(e));
        var u = (0, d.readInt32)(e);
        if (u !== 0) throw new Error("Invalid Warp version ".concat(u));
        var c = (0, v.readVersionAndDescriptor)(e);
        n.placedLayer = n.placedLayer || {
            id: r,
            type: Rn[o],
            pageNumber: i,
            totalPages: a,
            transform: s,
            warp: Sa(c)
        }, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.placedLayer;
        if ((0, p.writeSignature)(e, "plcL"), (0, p.writeInt32)(e, 3), !t.id || typeof t.id != "string" || !/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(t.id)) throw new Error("Placed layer ID must be in a GUID format (example: 20953ddb-9391-11ec-b4f1-c15674f50bc4)");
        if ((0, p.writePascalString)(e, t.id, 1), (0, p.writeInt32)(e, 1), (0, p.writeInt32)(e, 1), (0, p.writeInt32)(e, 16), Rn.indexOf(t.type) === -1) throw new Error("Invalid placedLayer type");
        (0, p.writeInt32)(e, Rn.indexOf(t.type));
        for (var r = 0; r < 8; r++)(0, p.writeFloat64)(e, t.transform[r]);
        (0, p.writeInt32)(e, 0);
        var i = ba(t),
            a = Ar(i),
            o = a ? "quiltWarp" : "warp";
        (0, v.writeVersionAndDescriptor)(e, "", o, Nt(i), o)
    });

    function Bs(e) {
        return new Float32Array(e.buffer.slice(e.byteOffset), 0, e.byteLength / 4)
    }

    function Os(e) {
        return new Uint32Array(e.buffer.slice(e.byteOffset), 0, e.byteLength / 4)
    }

    function Cr(e) {
        return new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
    }

    function Gt(e) {
        for (var n = [], t = 0; t < e.length; t += 2) n.push({
            x: e[t],
            y: e[t + 1]
        });
        return n
    }

    function Qn(e) {
        for (var n = [], t = 0; t < e.length; t++) n.push(e[t].x, e[t].y);
        return n
    }

    function da(e) {
        return Gt(Bs(e))
    }

    function $n(e) {
        return {
            x: (0, v.parseUnits)(e.Hrzn),
            y: (0, v.parseUnits)(e.Vrtc)
        }
    }

    function et(e) {
        return {
            _name: "",
            _classID: "Pnt ",
            Hrzn: (0, v.unitsValue)(e.x, "x"),
            Vrtc: (0, v.unitsValue)(e.y, "y")
        }
    }

    function Rs(e, n) {
        var t = {
            name: e["Nm  "],
            opacity: (0, v.parsePercent)(e.blendOptions.Opct),
            blendMode: v.BlnM.decode(e.blendOptions["Md  "]),
            enabled: e.enab,
            hasOptions: e.hasoptions,
            foregroundColor: (0, v.parseColor)(e.FrgC),
            backgroundColor: (0, v.parseColor)(e.BckC)
        };
        if ("Fltr" in e) switch (e.Fltr._classID) {
            case "boxblur":
                return f(f({}, t), {
                    type: "box blur",
                    filter: {
                        radius: (0, v.parseUnits)(e.Fltr["Rds "])
                    }
                });
            case "GsnB":
                return f(f({}, t), {
                    type: "gaussian blur",
                    filter: {
                        radius: (0, v.parseUnits)(e.Fltr["Rds "])
                    }
                });
            case "MtnB":
                return f(f({}, t), {
                    type: "motion blur",
                    filter: {
                        angle: e.Fltr.Angl,
                        distance: (0, v.parseUnits)(e.Fltr.Dstn)
                    }
                });
            case "RdlB":
                return f(f({}, t), {
                    type: "radial blur",
                    filter: {
                        amount: e.Fltr.Amnt,
                        method: v.BlrM.decode(e.Fltr.BlrM),
                        quality: v.BlrQ.decode(e.Fltr.BlrQ)
                    }
                });
            case "shapeBlur":
                return f(f({}, t), {
                    type: "shape blur",
                    filter: {
                        radius: (0, v.parseUnits)(e.Fltr["Rds "]),
                        customShape: {
                            name: e.Fltr.customShape["Nm  "],
                            id: e.Fltr.customShape.Idnt
                        }
                    }
                });
            case "SmrB":
                return f(f({}, t), {
                    type: "smart blur",
                    filter: {
                        radius: e.Fltr["Rds "],
                        threshold: e.Fltr.Thsh,
                        quality: v.SmBQ.decode(e.Fltr.SmBQ),
                        mode: v.SmBM.decode(e.Fltr.SmBM)
                    }
                });
            case "surfaceBlur":
                return f(f({}, t), {
                    type: "surface blur",
                    filter: {
                        radius: (0, v.parseUnits)(e.Fltr["Rds "]),
                        threshold: e.Fltr.Thsh
                    }
                });
            case "Dspl":
                return f(f({}, t), {
                    type: "displace",
                    filter: {
                        horizontalScale: e.Fltr.HrzS,
                        verticalScale: e.Fltr.VrtS,
                        displacementMap: v.DspM.decode(e.Fltr.DspM),
                        undefinedAreas: v.UndA.decode(e.Fltr.UndA),
                        displacementFile: {
                            signature: e.Fltr.DspF.sig,
                            path: e.Fltr.DspF.path
                        }
                    }
                });
            case "Pnch":
                return f(f({}, t), {
                    type: "pinch",
                    filter: {
                        amount: e.Fltr.Amnt
                    }
                });
            case "Plr ":
                return f(f({}, t), {
                    type: "polar coordinates",
                    filter: {
                        conversion: v.Cnvr.decode(e.Fltr.Cnvr)
                    }
                });
            case "Rple":
                return f(f({}, t), {
                    type: "ripple",
                    filter: {
                        amount: e.Fltr.Amnt,
                        size: v.RplS.decode(e.Fltr.RplS)
                    }
                });
            case "Shr ":
                return f(f({}, t), {
                    type: "shear",
                    filter: {
                        shearPoints: e.Fltr.ShrP.map(function(s) {
                            return {
                                x: s.Hrzn,
                                y: s.Vrtc
                            }
                        }),
                        shearStart: e.Fltr.ShrS,
                        shearEnd: e.Fltr.ShrE,
                        undefinedAreas: v.UndA.decode(e.Fltr.UndA)
                    }
                });
            case "Sphr":
                return f(f({}, t), {
                    type: "spherize",
                    filter: {
                        amount: e.Fltr.Amnt,
                        mode: v.SphM.decode(e.Fltr.SphM)
                    }
                });
            case "Twrl":
                return f(f({}, t), {
                    type: "twirl",
                    filter: {
                        angle: e.Fltr.Angl
                    }
                });
            case "Wave":
                return f(f({}, t), {
                    type: "wave",
                    filter: {
                        numberOfGenerators: e.Fltr.NmbG,
                        type: v.Wvtp.decode(e.Fltr.Wvtp),
                        wavelength: {
                            min: e.Fltr.WLMn,
                            max: e.Fltr.WLMx
                        },
                        amplitude: {
                            min: e.Fltr.AmMn,
                            max: e.Fltr.AmMx
                        },
                        scale: {
                            x: e.Fltr.SclH,
                            y: e.Fltr.SclV
                        },
                        randomSeed: e.Fltr.RndS,
                        undefinedAreas: v.UndA.decode(e.Fltr.UndA)
                    }
                });
            case "ZgZg":
                return f(f({}, t), {
                    type: "zigzag",
                    filter: {
                        amount: e.Fltr.Amnt,
                        ridges: e.Fltr.NmbR,
                        style: v.ZZTy.decode(e.Fltr.ZZTy)
                    }
                });
            case "AdNs":
                return f(f({}, t), {
                    type: "add noise",
                    filter: {
                        amount: (0, v.parsePercent)(e.Fltr.Nose),
                        distribution: v.Dstr.decode(e.Fltr.Dstr),
                        monochromatic: e.Fltr.Mnch,
                        randomSeed: e.Fltr.FlRs
                    }
                });
            case "DstS":
                return f(f({}, t), {
                    type: "dust and scratches",
                    filter: {
                        radius: e.Fltr["Rds "],
                        threshold: e.Fltr.Thsh
                    }
                });
            case "Mdn ":
                return f(f({}, t), {
                    type: "median",
                    filter: {
                        radius: (0, v.parseUnits)(e.Fltr["Rds "])
                    }
                });
            case "denoise":
                return f(f({}, t), {
                    type: "reduce noise",
                    filter: {
                        preset: e.Fltr.preset,
                        removeJpegArtifact: e.Fltr.removeJPEGArtifact,
                        reduceColorNoise: (0, v.parsePercent)(e.Fltr.ClNs),
                        sharpenDetails: (0, v.parsePercent)(e.Fltr.Shrp),
                        channelDenoise: e.Fltr.channelDenoise.map(function(s) {
                            return f({
                                channels: s.Chnl.map(v.Chnl.decode),
                                amount: s.Amnt
                            }, s.EdgF ? {
                                preserveDetails: s.EdgF
                            } : {})
                        })
                    }
                });
            case "ClrH":
                return f(f({}, t), {
                    type: "color halftone",
                    filter: {
                        radius: e.Fltr["Rds "],
                        angle1: e.Fltr.Ang1,
                        angle2: e.Fltr.Ang2,
                        angle3: e.Fltr.Ang3,
                        angle4: e.Fltr.Ang4
                    }
                });
            case "Crst":
                return f(f({}, t), {
                    type: "crystallize",
                    filter: {
                        cellSize: e.Fltr.ClSz,
                        randomSeed: e.Fltr.FlRs
                    }
                });
            case "Mztn":
                return f(f({}, t), {
                    type: "mezzotint",
                    filter: {
                        type: v.MztT.decode(e.Fltr.MztT),
                        randomSeed: e.Fltr.FlRs
                    }
                });
            case "Msc ":
                return f(f({}, t), {
                    type: "mosaic",
                    filter: {
                        cellSize: (0, v.parseUnits)(e.Fltr.ClSz)
                    }
                });
            case "Pntl":
                return f(f({}, t), {
                    type: "pointillize",
                    filter: {
                        cellSize: e.Fltr.ClSz,
                        randomSeed: e.Fltr.FlRs
                    }
                });
            case "Clds":
                return f(f({}, t), {
                    type: "clouds",
                    filter: {
                        randomSeed: e.Fltr.FlRs
                    }
                });
            case "DfrC":
                return f(f({}, t), {
                    type: "difference clouds",
                    filter: {
                        randomSeed: e.Fltr.FlRs
                    }
                });
            case "Fbrs":
                return f(f({}, t), {
                    type: "fibers",
                    filter: {
                        variance: e.Fltr.Vrnc,
                        strength: e.Fltr.Strg,
                        randomSeed: e.Fltr.RndS
                    }
                });
            case "LnsF":
                return f(f({}, t), {
                    type: "lens flare",
                    filter: {
                        brightness: e.Fltr.Brgh,
                        position: {
                            x: e.Fltr.FlrC.Hrzn,
                            y: e.Fltr.FlrC.Vrtc
                        },
                        lensType: v.Lns.decode(e.Fltr["Lns "])
                    }
                });
            case "smartSharpen":
                return f(f({}, t), {
                    type: "smart sharpen",
                    filter: {
                        amount: (0, v.parsePercent)(e.Fltr.Amnt),
                        radius: (0, v.parseUnits)(e.Fltr["Rds "]),
                        threshold: e.Fltr.Thsh,
                        angle: e.Fltr.Angl,
                        moreAccurate: e.Fltr.moreAccurate,
                        blur: v.blurType.decode(e.Fltr.blur),
                        preset: e.Fltr.preset,
                        shadow: {
                            fadeAmount: (0, v.parsePercent)(e.Fltr.sdwM.Amnt),
                            tonalWidth: (0, v.parsePercent)(e.Fltr.sdwM.Wdth),
                            radius: e.Fltr.sdwM["Rds "]
                        },
                        highlight: {
                            fadeAmount: (0, v.parsePercent)(e.Fltr.hglM.Amnt),
                            tonalWidth: (0, v.parsePercent)(e.Fltr.hglM.Wdth),
                            radius: e.Fltr.hglM["Rds "]
                        }
                    }
                });
            case "UnsM":
                return f(f({}, t), {
                    type: "unsharp mask",
                    filter: {
                        amount: (0, v.parsePercent)(e.Fltr.Amnt),
                        radius: (0, v.parseUnits)(e.Fltr["Rds "]),
                        threshold: e.Fltr.Thsh
                    }
                });
            case "Dfs ":
                return f(f({}, t), {
                    type: "diffuse",
                    filter: {
                        mode: v.DfsM.decode(e.Fltr["Md  "]),
                        randomSeed: e.Fltr.FlRs
                    }
                });
            case "Embs":
                return f(f({}, t), {
                    type: "emboss",
                    filter: {
                        angle: e.Fltr.Angl,
                        height: e.Fltr.Hght,
                        amount: e.Fltr.Amnt
                    }
                });
            case "Extr":
                return f(f({}, t), {
                    type: "extrude",
                    filter: {
                        type: v.ExtT.decode(e.Fltr.ExtT),
                        size: e.Fltr.ExtS,
                        depth: e.Fltr.ExtD,
                        depthMode: v.ExtR.decode(e.Fltr.ExtR),
                        randomSeed: e.Fltr.FlRs,
                        solidFrontFaces: e.Fltr.ExtF,
                        maskIncompleteBlocks: e.Fltr.ExtM
                    }
                });
            case "Tls ":
                return f(f({}, t), {
                    type: "tiles",
                    filter: {
                        numberOfTiles: e.Fltr.TlNm,
                        maximumOffset: e.Fltr.TlOf,
                        fillEmptyAreaWith: v.FlCl.decode(e.Fltr.FlCl),
                        randomSeed: e.Fltr.FlRs
                    }
                });
            case "TrcC":
                return f(f({}, t), {
                    type: "trace contour",
                    filter: {
                        level: e.Fltr["Lvl "],
                        edge: v.CntE.decode(e.Fltr["Edg "])
                    }
                });
            case "Wnd ":
                return f(f({}, t), {
                    type: "wind",
                    filter: {
                        method: v.WndM.decode(e.Fltr.WndM),
                        direction: v.Drct.decode(e.Fltr.Drct)
                    }
                });
            case "Dntr":
                return f(f({}, t), {
                    type: "de-interlace",
                    filter: {
                        eliminate: v.IntE.decode(e.Fltr.IntE),
                        newFieldsBy: v.IntC.decode(e.Fltr.IntC)
                    }
                });
            case "Cstm":
                return f(f({}, t), {
                    type: "custom",
                    filter: {
                        scale: e.Fltr["Scl "],
                        offset: e.Fltr.Ofst,
                        matrix: e.Fltr.Mtrx
                    }
                });
            case "HghP":
                return f(f({}, t), {
                    type: "high pass",
                    filter: {
                        radius: (0, v.parseUnits)(e.Fltr["Rds "])
                    }
                });
            case "Mxm ":
                return f(f({}, t), {
                    type: "maximum",
                    filter: {
                        radius: (0, v.parseUnits)(e.Fltr["Rds "])
                    }
                });
            case "Mnm ":
                return f(f({}, t), {
                    type: "minimum",
                    filter: {
                        radius: (0, v.parseUnits)(e.Fltr["Rds "])
                    }
                });
            case "Ofst":
                return f(f({}, t), {
                    type: "offset",
                    filter: {
                        horizontal: e.Fltr.Hrzn,
                        vertical: e.Fltr.Vrtc,
                        undefinedAreas: v.FlMd.decode(e.Fltr["Fl  "])
                    }
                });
            case "rigidTransform":
                return f(f({}, t), {
                    type: "puppet",
                    filter: {
                        rigidType: e.Fltr.rigidType,
                        bounds: [{
                            x: e.Fltr.PuX0,
                            y: e.Fltr.PuY0
                        }, {
                            x: e.Fltr.PuX1,
                            y: e.Fltr.PuY1
                        }, {
                            x: e.Fltr.PuX2,
                            y: e.Fltr.PuY2
                        }, {
                            x: e.Fltr.PuX3,
                            y: e.Fltr.PuY3
                        }],
                        puppetShapeList: e.Fltr.puppetShapeList.map(function(s) {
                            return {
                                rigidType: s.rigidType,
                                originalVertexArray: da(s.originalVertexArray),
                                deformedVertexArray: da(s.deformedVertexArray),
                                indexArray: Array.from(Os(s.indexArray)),
                                pinOffsets: Gt(s.pinOffsets),
                                posFinalPins: Gt(s.posFinalPins),
                                pinVertexIndices: s.pinVertexIndices,
                                selectedPin: s.selectedPin,
                                pinPosition: Gt(s.PinP),
                                pinRotation: s.PnRt,
                                pinOverlay: s.PnOv,
                                pinDepth: s.PnDp,
                                meshQuality: s.meshQuality,
                                meshExpansion: s.meshExpansion,
                                meshRigidity: s.meshRigidity,
                                imageResolution: s.imageResolution,
                                meshBoundaryPath: {
                                    pathComponents: s.meshBoundaryPath.pathComponents.map(function(l) {
                                        return {
                                            shapeOperation: l.shapeOperation.split(".")[1],
                                            paths: l.SbpL.map(function(u) {
                                                return {
                                                    closed: u.Clsp,
                                                    points: u["Pts "].map(function(c) {
                                                        return {
                                                            anchor: $n(c.Anch),
                                                            forward: $n(c["Fwd "]),
                                                            backward: $n(c["Bwd "]),
                                                            smooth: c.Smoo
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }
                });
            case "PbPl": {
                for (var r = [], i = e.Fltr, a = 0; a < Ge.length && i["PN".concat(Ge[a], "a")]; a++)
                    for (var o = 0; o < Ge.length && i["PN".concat(Ge[a]).concat(Ge[o])]; o++) r.push({
                        name: i["PN".concat(Ge[a]).concat(Ge[o])],
                        value: i["PF".concat(Ge[a]).concat(Ge[o])]
                    });
                return f(f({}, t), {
                    type: "oil paint plugin",
                    filter: {
                        name: e.Fltr.KnNm,
                        gpu: e.Fltr.GpuY,
                        lighting: e.Fltr.LIWy,
                        parameters: r
                    }
                })
            }
            case "HsbP":
                return f(f({}, t), {
                    type: "hsb/hsl",
                    filter: {
                        inputMode: v.ClrS.decode(e.Fltr.Inpt),
                        rowOrder: v.ClrS.decode(e.Fltr.Otpt)
                    }
                });
            case "oilPaint":
                return f(f({}, t), {
                    type: "oil paint",
                    filter: {
                        lightingOn: e.Fltr.lightingOn,
                        stylization: e.Fltr.stylization,
                        cleanliness: e.Fltr.cleanliness,
                        brushScale: e.Fltr.brushScale,
                        microBrush: e.Fltr.microBrush,
                        lightDirection: e.Fltr.LghD,
                        specularity: e.Fltr.specularity
                    }
                });
            case "LqFy":
                return f(f({}, t), {
                    type: "liquify",
                    filter: {
                        liquifyMesh: e.Fltr.LqMe
                    }
                });
            case "perspectiveWarpTransform":
                return f(f({}, t), {
                    type: "perspective warp",
                    filter: {
                        vertices: e.Fltr.vertices.map($n),
                        warpedVertices: e.Fltr.warpedVertices.map($n),
                        quads: e.Fltr.quads.map(function(s) {
                            return s.indices
                        })
                    }
                });
            case "Crvs":
                return f(f({}, t), {
                    type: "curves",
                    filter: f({
                        presetKind: v.presetKindType.decode(e.Fltr.presetKind)
                    }, e.Fltr.Adjs ? {
                        adjustments: e.Fltr.Adjs.map(function(s) {
                            var l = s.Chnl.map(v.Chnl.decode);
                            if (s["Crv "]) return {
                                channels: l,
                                curve: s["Crv "].map(function(u) {
                                    var c = {
                                        x: u.Hrzn,
                                        y: u.Vrtc
                                    };
                                    return u.Cnty && (c.curved = !0), c
                                })
                            };
                            if (s.Mpng) return {
                                channels: l,
                                values: s.Mpng
                            };
                            throw new Error("Unknown curve adjustment")
                        })
                    } : {})
                });
            case "BrgC":
                return f(f({}, t), {
                    type: "brightness/contrast",
                    filter: {
                        brightness: e.Fltr.Brgh,
                        contrast: e.Fltr.Cntr,
                        useLegacy: !!e.Fltr.useLegacy
                    }
                });
            default:
                if (n.throwForMissingFeatures) throw new Error("Unknown filter classId: ".concat(e.Fltr._classID));
                return
        } else switch (e.filterID) {
            case 1098281575:
                return f(f({}, t), {
                    type: "average"
                });
            case 1114403360:
                return f(f({}, t), {
                    type: "blur"
                });
            case 1114403405:
                return f(f({}, t), {
                    type: "blur more"
                });
            case 1148416099:
                return f(f({}, t), {
                    type: "despeckle"
                });
            case 1180922912:
                return f(f({}, t), {
                    type: "facet"
                });
            case 1181902701:
                return f(f({}, t), {
                    type: "fragment"
                });
            case 1399353968:
                return f(f({}, t), {
                    type: "sharpen"
                });
            case 1399353925:
                return f(f({}, t), {
                    type: "sharpen edges"
                });
            case 1399353933:
                return f(f({}, t), {
                    type: "sharpen more"
                });
            case 1181639749:
                return f(f({}, t), {
                    type: "find edges"
                });
            case 1399616122:
                return f(f({}, t), {
                    type: "solarize"
                });
            case 1314149187:
                return f(f({}, t), {
                    type: "ntsc colors"
                });
            case 1231976050:
                return f(f({}, t), {
                    type: "invert"
                });
            default:
                if (n.throwForMissingFeatures) throw new Error("Unknown filterID: ".concat(e.filterID))
        }
    }

    function Vs(e, n) {
        return {
            enabled: e.enab,
            validAtPosition: e.validAtPosition,
            maskEnabled: e.filterMaskEnable,
            maskLinked: e.filterMaskLinked,
            maskExtendWithWhite: e.filterMaskExtendWithWhite,
            list: e.filterFXList.map(function(t) {
                return Rs(t, n)
            }).filter(function(t) {
                return !!t
            })
        }
    }

    function $e(e) {
        return (0, v.unitsValue)(e.radius, "radius")
    }

    function zs(e) {
        var n = {
            _name: "",
            _classID: "filterFX",
            "Nm  ": e.name,
            blendOptions: {
                _name: "",
                _classID: "blendOptions",
                Opct: (0, v.unitsPercentF)(e.opacity),
                "Md  ": v.BlnM.encode(e.blendMode)
            },
            enab: e.enabled,
            hasoptions: e.hasOptions,
            FrgC: (0, v.serializeColor)(e.foregroundColor),
            BckC: (0, v.serializeColor)(e.backgroundColor)
        };
        switch (e.type) {
            case "average":
                return f(f({}, n), {
                    filterID: 1098281575
                });
            case "blur":
                return f(f({}, n), {
                    filterID: 1114403360
                });
            case "blur more":
                return f(f({}, n), {
                    filterID: 1114403405
                });
            case "box blur":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Box Blur",
                        _classID: "boxblur",
                        "Rds ": $e(e.filter)
                    },
                    filterID: 697
                });
            case "gaussian blur":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Gaussian Blur",
                        _classID: "GsnB",
                        "Rds ": $e(e.filter)
                    },
                    filterID: 1198747202
                });
            case "motion blur":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Motion Blur",
                        _classID: "MtnB",
                        Angl: e.filter.angle,
                        Dstn: (0, v.unitsValue)(e.filter.distance, "distance")
                    },
                    filterID: 1299476034
                });
            case "radial blur":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Radial Blur",
                        _classID: "RdlB",
                        Amnt: e.filter.amount,
                        BlrM: v.BlrM.encode(e.filter.method),
                        BlrQ: v.BlrQ.encode(e.filter.quality)
                    },
                    filterID: 1382313026
                });
            case "shape blur":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Shape Blur",
                        _classID: "shapeBlur",
                        "Rds ": $e(e.filter),
                        customShape: {
                            _name: "",
                            _classID: "customShape",
                            "Nm  ": e.filter.customShape.name,
                            Idnt: e.filter.customShape.id
                        }
                    },
                    filterID: 702
                });
            case "smart blur":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Smart Blur",
                        _classID: "SmrB",
                        "Rds ": e.filter.radius,
                        Thsh: e.filter.threshold,
                        SmBQ: v.SmBQ.encode(e.filter.quality),
                        SmBM: v.SmBM.encode(e.filter.mode)
                    },
                    filterID: 1399681602
                });
            case "surface blur":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Surface Blur",
                        _classID: "surfaceBlur",
                        "Rds ": $e(e.filter),
                        Thsh: e.filter.threshold
                    },
                    filterID: 701
                });
            case "displace":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Displace",
                        _classID: "Dspl",
                        HrzS: e.filter.horizontalScale,
                        VrtS: e.filter.verticalScale,
                        DspM: v.DspM.encode(e.filter.displacementMap),
                        UndA: v.UndA.encode(e.filter.undefinedAreas),
                        DspF: {
                            sig: e.filter.displacementFile.signature,
                            path: e.filter.displacementFile.path
                        }
                    },
                    filterID: 1148416108
                });
            case "pinch":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Pinch",
                        _classID: "Pnch",
                        Amnt: e.filter.amount
                    },
                    filterID: 1349411688
                });
            case "polar coordinates":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Polar Coordinates",
                        _classID: "Plr ",
                        Cnvr: v.Cnvr.encode(e.filter.conversion)
                    },
                    filterID: 1349284384
                });
            case "ripple":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Ripple",
                        _classID: "Rple",
                        Amnt: e.filter.amount,
                        RplS: v.RplS.encode(e.filter.size)
                    },
                    filterID: 1383099493
                });
            case "shear":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Shear",
                        _classID: "Shr ",
                        ShrP: e.filter.shearPoints.map(function(l) {
                            return {
                                _name: "",
                                _classID: "Pnt ",
                                Hrzn: l.x,
                                Vrtc: l.y
                            }
                        }),
                        UndA: v.UndA.encode(e.filter.undefinedAreas),
                        ShrS: e.filter.shearStart,
                        ShrE: e.filter.shearEnd
                    },
                    filterID: 1399353888
                });
            case "spherize":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Spherize",
                        _classID: "Sphr",
                        Amnt: e.filter.amount,
                        SphM: v.SphM.encode(e.filter.mode)
                    },
                    filterID: 1399875698
                });
            case "twirl":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Twirl",
                        _classID: "Twrl",
                        Angl: e.filter.angle
                    },
                    filterID: 1417114220
                });
            case "wave":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Wave",
                        _classID: "Wave",
                        Wvtp: v.Wvtp.encode(e.filter.type),
                        NmbG: e.filter.numberOfGenerators,
                        WLMn: e.filter.wavelength.min,
                        WLMx: e.filter.wavelength.max,
                        AmMn: e.filter.amplitude.min,
                        AmMx: e.filter.amplitude.max,
                        SclH: e.filter.scale.x,
                        SclV: e.filter.scale.y,
                        UndA: v.UndA.encode(e.filter.undefinedAreas),
                        RndS: e.filter.randomSeed
                    },
                    filterID: 1466005093
                });
            case "zigzag":
                return f(f({}, n), {
                    Fltr: {
                        _name: "ZigZag",
                        _classID: "ZgZg",
                        Amnt: e.filter.amount,
                        NmbR: e.filter.ridges,
                        ZZTy: v.ZZTy.encode(e.filter.style)
                    },
                    filterID: 1516722791
                });
            case "add noise":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Add Noise",
                        _classID: "AdNs",
                        Dstr: v.Dstr.encode(e.filter.distribution),
                        Nose: (0, v.unitsPercentF)(e.filter.amount),
                        Mnch: e.filter.monochromatic,
                        FlRs: e.filter.randomSeed
                    },
                    filterID: 1097092723
                });
            case "despeckle":
                return f(f({}, n), {
                    filterID: 1148416099
                });
            case "dust and scratches":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Dust & Scratches",
                        _classID: "DstS",
                        "Rds ": e.filter.radius,
                        Thsh: e.filter.threshold
                    },
                    filterID: 1148417107
                });
            case "median":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Median",
                        _classID: "Mdn ",
                        "Rds ": $e(e.filter)
                    },
                    filterID: 1298427424
                });
            case "reduce noise":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Reduce Noise",
                        _classID: "denoise",
                        ClNs: (0, v.unitsPercentF)(e.filter.reduceColorNoise),
                        Shrp: (0, v.unitsPercentF)(e.filter.sharpenDetails),
                        removeJPEGArtifact: e.filter.removeJpegArtifact,
                        channelDenoise: e.filter.channelDenoise.map(function(l) {
                            return f({
                                _name: "",
                                _classID: "channelDenoiseParams",
                                Chnl: l.channels.map(function(u) {
                                    return v.Chnl.encode(u)
                                }),
                                Amnt: l.amount
                            }, l.preserveDetails ? {
                                EdgF: l.preserveDetails
                            } : {})
                        }),
                        preset: e.filter.preset
                    },
                    filterID: 633
                });
            case "color halftone":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Color Halftone",
                        _classID: "ClrH",
                        "Rds ": e.filter.radius,
                        Ang1: e.filter.angle1,
                        Ang2: e.filter.angle2,
                        Ang3: e.filter.angle3,
                        Ang4: e.filter.angle4
                    },
                    filterID: 1131180616
                });
            case "crystallize":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Crystallize",
                        _classID: "Crst",
                        ClSz: e.filter.cellSize,
                        FlRs: e.filter.randomSeed
                    },
                    filterID: 1131574132
                });
            case "facet":
                return f(f({}, n), {
                    filterID: 1180922912
                });
            case "fragment":
                return f(f({}, n), {
                    filterID: 1181902701
                });
            case "mezzotint":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Mezzotint",
                        _classID: "Mztn",
                        MztT: v.MztT.encode(e.filter.type),
                        FlRs: e.filter.randomSeed
                    },
                    filterID: 1299870830
                });
            case "mosaic":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Mosaic",
                        _classID: "Msc ",
                        ClSz: (0, v.unitsValue)(e.filter.cellSize, "cellSize")
                    },
                    filterID: 1299407648
                });
            case "pointillize":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Pointillize",
                        _classID: "Pntl",
                        ClSz: e.filter.cellSize,
                        FlRs: e.filter.randomSeed
                    },
                    filterID: 1349416044
                });
            case "clouds":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Clouds",
                        _classID: "Clds",
                        FlRs: e.filter.randomSeed
                    },
                    filterID: 1131177075
                });
            case "difference clouds":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Difference Clouds",
                        _classID: "DfrC",
                        FlRs: e.filter.randomSeed
                    },
                    filterID: 1147564611
                });
            case "fibers":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Fibers",
                        _classID: "Fbrs",
                        Vrnc: e.filter.variance,
                        Strg: e.filter.strength,
                        RndS: e.filter.randomSeed
                    },
                    filterID: 1180856947
                });
            case "lens flare":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Lens Flare",
                        _classID: "LnsF",
                        Brgh: e.filter.brightness,
                        FlrC: {
                            _name: "",
                            _classID: "Pnt ",
                            Hrzn: e.filter.position.x,
                            Vrtc: e.filter.position.y
                        },
                        "Lns ": v.Lns.encode(e.filter.lensType)
                    },
                    filterID: 1282306886
                });
            case "sharpen":
                return f(f({}, n), {
                    filterID: 1399353968
                });
            case "sharpen edges":
                return f(f({}, n), {
                    filterID: 1399353925
                });
            case "sharpen more":
                return f(f({}, n), {
                    filterID: 1399353933
                });
            case "smart sharpen":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Smart Sharpen",
                        _classID: "smartSharpen",
                        Amnt: (0, v.unitsPercentF)(e.filter.amount),
                        "Rds ": $e(e.filter),
                        Thsh: e.filter.threshold,
                        Angl: e.filter.angle,
                        moreAccurate: e.filter.moreAccurate,
                        blur: v.blurType.encode(e.filter.blur),
                        preset: e.filter.preset,
                        sdwM: {
                            _name: "Parameters",
                            _classID: "adaptCorrectTones",
                            Amnt: (0, v.unitsPercentF)(e.filter.shadow.fadeAmount),
                            Wdth: (0, v.unitsPercentF)(e.filter.shadow.tonalWidth),
                            "Rds ": e.filter.shadow.radius
                        },
                        hglM: {
                            _name: "Parameters",
                            _classID: "adaptCorrectTones",
                            Amnt: (0, v.unitsPercentF)(e.filter.highlight.fadeAmount),
                            Wdth: (0, v.unitsPercentF)(e.filter.highlight.tonalWidth),
                            "Rds ": e.filter.highlight.radius
                        }
                    },
                    filterID: 698
                });
            case "unsharp mask":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Unsharp Mask",
                        _classID: "UnsM",
                        Amnt: (0, v.unitsPercentF)(e.filter.amount),
                        "Rds ": $e(e.filter),
                        Thsh: e.filter.threshold
                    },
                    filterID: 1433301837
                });
            case "diffuse":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Diffuse",
                        _classID: "Dfs ",
                        "Md  ": v.DfsM.encode(e.filter.mode),
                        FlRs: e.filter.randomSeed
                    },
                    filterID: 1147564832
                });
            case "emboss":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Emboss",
                        _classID: "Embs",
                        Angl: e.filter.angle,
                        Hght: e.filter.height,
                        Amnt: e.filter.amount
                    },
                    filterID: 1164796531
                });
            case "extrude":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Extrude",
                        _classID: "Extr",
                        ExtS: e.filter.size,
                        ExtD: e.filter.depth,
                        ExtF: e.filter.solidFrontFaces,
                        ExtM: e.filter.maskIncompleteBlocks,
                        ExtT: v.ExtT.encode(e.filter.type),
                        ExtR: v.ExtR.encode(e.filter.depthMode),
                        FlRs: e.filter.randomSeed
                    },
                    filterID: 1165522034
                });
            case "find edges":
                return f(f({}, n), {
                    filterID: 1181639749
                });
            case "solarize":
                return f(f({}, n), {
                    filterID: 1399616122
                });
            case "tiles":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Tiles",
                        _classID: "Tls ",
                        TlNm: e.filter.numberOfTiles,
                        TlOf: e.filter.maximumOffset,
                        FlCl: v.FlCl.encode(e.filter.fillEmptyAreaWith),
                        FlRs: e.filter.randomSeed
                    },
                    filterID: 1416393504
                });
            case "trace contour":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Trace Contour",
                        _classID: "TrcC",
                        "Lvl ": e.filter.level,
                        "Edg ": v.CntE.encode(e.filter.edge)
                    },
                    filterID: 1416782659
                });
            case "wind":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Wind",
                        _classID: "Wnd ",
                        WndM: v.WndM.encode(e.filter.method),
                        Drct: v.Drct.encode(e.filter.direction)
                    },
                    filterID: 1466852384
                });
            case "de-interlace":
                return f(f({}, n), {
                    Fltr: {
                        _name: "De-Interlace",
                        _classID: "Dntr",
                        IntE: v.IntE.encode(e.filter.eliminate),
                        IntC: v.IntC.encode(e.filter.newFieldsBy)
                    },
                    filterID: 1148089458
                });
            case "ntsc colors":
                return f(f({}, n), {
                    filterID: 1314149187
                });
            case "invert":
                return f(f({}, n), {
                    filterID: 1231976050
                });
            case "custom":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Custom",
                        _classID: "Cstm",
                        "Scl ": e.filter.scale,
                        Ofst: e.filter.offset,
                        Mtrx: e.filter.matrix
                    },
                    filterID: 1131639917
                });
            case "high pass":
                return f(f({}, n), {
                    Fltr: {
                        _name: "High Pass",
                        _classID: "HghP",
                        "Rds ": $e(e.filter)
                    },
                    filterID: 1214736464
                });
            case "maximum":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Maximum",
                        _classID: "Mxm ",
                        "Rds ": $e(e.filter)
                    },
                    filterID: 1299737888
                });
            case "minimum":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Minimum",
                        _classID: "Mnm ",
                        "Rds ": $e(e.filter)
                    },
                    filterID: 1299082528
                });
            case "offset":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Offset",
                        _classID: "Ofst",
                        Hrzn: e.filter.horizontal,
                        Vrtc: e.filter.vertical,
                        "Fl  ": v.FlMd.encode(e.filter.undefinedAreas)
                    },
                    filterID: 1332114292
                });
            case "puppet":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Rigid Transform",
                        _classID: "rigidTransform",
                        null: ["Ordn.Trgt"],
                        rigidType: e.filter.rigidType,
                        puppetShapeList: e.filter.puppetShapeList.map(function(l) {
                            return {
                                _name: "",
                                _classID: "puppetShape",
                                rigidType: l.rigidType,
                                VrsM: 1,
                                VrsN: 0,
                                originalVertexArray: Cr(new Float32Array(Qn(l.originalVertexArray))),
                                deformedVertexArray: Cr(new Float32Array(Qn(l.deformedVertexArray))),
                                indexArray: Cr(new Uint32Array(l.indexArray)),
                                pinOffsets: Qn(l.pinOffsets),
                                posFinalPins: Qn(l.posFinalPins),
                                pinVertexIndices: l.pinVertexIndices,
                                PinP: Qn(l.pinPosition),
                                PnRt: l.pinRotation,
                                PnOv: l.pinOverlay,
                                PnDp: l.pinDepth,
                                meshQuality: l.meshQuality,
                                meshExpansion: l.meshExpansion,
                                meshRigidity: l.meshRigidity,
                                imageResolution: l.imageResolution,
                                meshBoundaryPath: {
                                    _name: "",
                                    _classID: "pathClass",
                                    pathComponents: l.meshBoundaryPath.pathComponents.map(function(u) {
                                        return {
                                            _name: "",
                                            _classID: "PaCm",
                                            shapeOperation: "shapeOperation.".concat(u.shapeOperation),
                                            SbpL: u.paths.map(function(c) {
                                                return {
                                                    _name: "",
                                                    _classID: "Sbpl",
                                                    Clsp: c.closed,
                                                    "Pts ": c.points.map(function(h) {
                                                        return {
                                                            _name: "",
                                                            _classID: "Pthp",
                                                            Anch: et(h.anchor),
                                                            "Fwd ": et(h.forward),
                                                            "Bwd ": et(h.backward),
                                                            Smoo: h.smooth
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                },
                                selectedPin: l.selectedPin
                            }
                        }),
                        PuX0: e.filter.bounds[0].x,
                        PuX1: e.filter.bounds[1].x,
                        PuX2: e.filter.bounds[2].x,
                        PuX3: e.filter.bounds[3].x,
                        PuY0: e.filter.bounds[0].y,
                        PuY1: e.filter.bounds[1].y,
                        PuY2: e.filter.bounds[2].y,
                        PuY3: e.filter.bounds[3].y
                    },
                    filterID: 991
                });
            case "oil paint plugin": {
                for (var t = {}, r = 0; r < e.filter.parameters.length; r++) {
                    var i = e.filter.parameters[r],
                        a = i.name,
                        o = i.value,
                        s = "".concat(Ge[Math.floor(r / Ge.length)]).concat(Ge[r % Ge.length]);
                    t["PN".concat(s)] = a, t["PT".concat(s)] = 0, t["PF".concat(s)] = o
                }
                return f(f({}, n), {
                    Fltr: f({
                        _name: "Oil Paint Plugin",
                        _classID: "PbPl",
                        KnNm: e.filter.name,
                        GpuY: e.filter.gpu,
                        LIWy: e.filter.lighting,
                        FPth: "1"
                    }, t),
                    filterID: 1348620396
                })
            }
            case "oil paint":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Oil Paint",
                        _classID: "oilPaint",
                        lightingOn: e.filter.lightingOn,
                        stylization: e.filter.stylization,
                        cleanliness: e.filter.cleanliness,
                        brushScale: e.filter.brushScale,
                        microBrush: e.filter.microBrush,
                        LghD: e.filter.lightDirection,
                        specularity: e.filter.specularity
                    },
                    filterID: 1122
                });
            case "liquify":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Liquify",
                        _classID: "LqFy",
                        LqMe: e.filter.liquifyMesh
                    },
                    filterID: 1282492025
                });
            case "perspective warp":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Perspective Warp",
                        _classID: "perspectiveWarpTransform",
                        vertices: e.filter.vertices.map(et),
                        warpedVertices: e.filter.warpedVertices.map(et),
                        quads: e.filter.quads.map(function(l) {
                            return {
                                indices: l
                            }
                        })
                    },
                    filterID: 442
                });
            case "curves":
                return f(f({}, n), {
                    Fltr: f({
                        _name: "Curves",
                        _classID: "Crvs",
                        presetKind: v.presetKindType.encode(e.filter.presetKind)
                    }, e.filter.adjustments ? {
                        Adjs: e.filter.adjustments.map(function(l) {
                            return "curve" in l ? {
                                _name: "",
                                _classID: "CrvA",
                                Chnl: l.channels.map(v.Chnl.encode),
                                "Crv ": l.curve.map(function(u) {
                                    return f({
                                        _name: "",
                                        _classID: "Pnt ",
                                        Hrzn: u.x,
                                        Vrtc: u.y
                                    }, u.curved ? {
                                        Cnty: !0
                                    } : {})
                                })
                            } : {
                                _name: "",
                                _classID: "CrvA",
                                Chnl: l.channels.map(v.Chnl.encode),
                                Mpng: l.values
                            }
                        })
                    } : {}),
                    filterID: 1131574899
                });
            case "brightness/contrast":
                return f(f({}, n), {
                    Fltr: {
                        _name: "Brightness/Contrast",
                        _classID: "BrgC",
                        Brgh: e.filter.brightness,
                        Cntr: e.filter.contrast,
                        useLegacy: !!e.filter.useLegacy
                    },
                    filterID: 1114793795
                });
            default:
                throw new Error("Unknow filter type: ".concat(e.type))
        }
    }

    function ba(e) {
        if (e.warp) return e.warp;
        if (!e.width || !e.height) throw new Error("You must provide width and height of the linked image in placedLayer");
        var n = e.width,
            t = e.height,
            r = 0,
            i = n / 3,
            a = n * 2 / 3,
            o = n,
            s = 0,
            l = t / 3,
            u = t * 2 / 3,
            c = t;
        return {
            style: "custom",
            value: 0,
            perspective: 0,
            perspectiveOther: 0,
            rotate: "horizontal",
            bounds: {
                top: {
                    value: 0,
                    units: "Pixels"
                },
                left: {
                    value: 0,
                    units: "Pixels"
                },
                bottom: {
                    value: t,
                    units: "Pixels"
                },
                right: {
                    value: n,
                    units: "Pixels"
                }
            },
            uOrder: 4,
            vOrder: 4,
            customEnvelopeWarp: {
                meshPoints: [{
                    x: r,
                    y: s
                }, {
                    x: i,
                    y: s
                }, {
                    x: a,
                    y: s
                }, {
                    x: o,
                    y: s
                }, {
                    x: r,
                    y: l
                }, {
                    x: i,
                    y: l
                }, {
                    x: a,
                    y: l
                }, {
                    x: o,
                    y: l
                }, {
                    x: r,
                    y: u
                }, {
                    x: i,
                    y: u
                }, {
                    x: a,
                    y: u
                }, {
                    x: o,
                    y: u
                }, {
                    x: r,
                    y: c
                }, {
                    x: i,
                    y: c
                }, {
                    x: a,
                    y: c
                }, {
                    x: o,
                    y: c
                }]
            }
        }
    }
    R("SoLd", se("placedLayer"), function(e, n, t) {
        if ((0, d.readSignature)(e) !== "soLD") throw new Error("Invalid SoLd type");
        var r = (0, d.readInt32)(e);
        if (r !== 4 && r !== 5) throw new Error("Invalid SoLd version");
        var i = (0, v.readVersionAndDescriptor)(e, !0);
        n.placedLayer = {
            id: i.Idnt,
            placed: i.placed,
            type: Rn[i.Type],
            pageNumber: i.PgNm,
            totalPages: i.totalPages,
            frameStep: (0, v.frac)(i.frameStep),
            duration: (0, v.frac)(i.duration),
            frameCount: i.frameCount,
            transform: i.Trnf,
            width: i["Sz  "].Wdth,
            height: i["Sz  "].Hght,
            resolution: (0, v.parseUnits)(i.Rslt),
            warp: Sa(i.quiltWarp || i.warp)
        }, i.nonAffineTransform && i.nonAffineTransform.some(function(a, o) {
            return a !== i.Trnf[o]
        }) && (n.placedLayer.nonAffineTransform = i.nonAffineTransform), i.Crop && (n.placedLayer.crop = i.Crop), i.comp && (n.placedLayer.comp = i.comp), i.compInfo && (n.placedLayer.compInfo = {
            compID: i.compInfo.compID,
            originalCompID: i.compInfo.originalCompID
        }), i.filterFX && (n.placedLayer.filter = Vs(i.filterFX, e)), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t, r;
        (0, p.writeSignature)(e, "soLD"), (0, p.writeInt32)(e, 4);
        var i = n.placedLayer;
        if (!i.id || typeof i.id != "string" || !/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(i.id)) throw new Error("Placed layer ID must be in a GUID format (example: 20953ddb-9391-11ec-b4f1-c15674f50bc4)");
        var a = f(f({
            Idnt: i.id,
            placed: (t = i.placed) !== null && t !== void 0 ? t : i.id,
            PgNm: i.pageNumber || 1,
            totalPages: i.totalPages || 1
        }, i.crop ? {
            Crop: i.crop
        } : {}), {
            frameStep: i.frameStep || {
                numerator: 0,
                denominator: 600
            },
            duration: i.duration || {
                numerator: 0,
                denominator: 600
            },
            frameCount: i.frameCount || 0,
            Annt: 16,
            Type: Rn.indexOf(i.type),
            Trnf: i.transform,
            nonAffineTransform: (r = i.nonAffineTransform) !== null && r !== void 0 ? r : i.transform,
            warp: Nt(ba(i)),
            "Sz  ": {
                _name: "",
                _classID: "Pnt ",
                Wdth: i.width || 0,
                Hght: i.height || 0
            },
            Rslt: i.resolution ? (0, v.unitsValue)(i.resolution, "resolution") : {
                units: "Density",
                value: 72
            }
        });
        if (i.filter && (a.filterFX = {
                _name: "",
                _classID: "filterFXStyle",
                enab: i.filter.enabled,
                validAtPosition: i.filter.validAtPosition,
                filterMaskEnable: i.filter.maskEnabled,
                filterMaskLinked: i.filter.maskLinked,
                filterMaskExtendWithWhite: i.filter.maskExtendWithWhite,
                filterFXList: i.filter.list.map(function(s) {
                    return zs(s)
                })
            }), i.warp && Ar(i.warp)) {
            var o = Nt(i.warp);
            a.quiltWarp = o, a.warp = {
                warpStyle: "warpStyle.warpNone",
                warpValue: o.warpValue,
                warpPerspective: o.warpPerspective,
                warpPerspectiveOther: o.warpPerspectiveOther,
                warpRotate: o.warpRotate,
                bounds: o.bounds,
                uOrder: o.uOrder,
                vOrder: o.vOrder
            }
        } else delete a.quiltWarp;
        i.comp && (a.comp = i.comp), i.compInfo && (a.compInfo = i.compInfo), (0, v.writeVersionAndDescriptor)(e, "", "null", a, a.quiltWarp ? "quiltWarp" : "warp")
    });
    Vn("SoLE", "SoLd");
    R("fxrp", se("referencePoint"), function(e, n) {
        n.referencePoint = {
            x: (0, d.readFloat64)(e),
            y: (0, d.readFloat64)(e)
        }
    }, function(e, n) {
        (0, p.writeFloat64)(e, n.referencePoint.x), (0, p.writeFloat64)(e, n.referencePoint.y)
    });
    R("Lr16", function() {
        return !1
    }, function(e, n, t, r, i) {
        (0, d.readLayerInfo)(e, r, i)
    }, function(e, n) {});
    R("Lr32", function() {
        return !1
    }, function(e, n, t, r, i) {
        (0, d.readLayerInfo)(e, r, i)
    }, function(e, n) {});
    R("LMsk", se("userMask"), function(e, n) {
        n.userMask = {
            colorSpace: (0, d.readColor)(e),
            opacity: (0, d.readUint16)(e) / 255
        };
        var t = (0, d.readUint8)(e);
        if (t !== 128) throw new Error("Invalid flag value");
        (0, d.skipBytes)(e, 1)
    }, function(e, n) {
        var t = n.userMask;
        (0, p.writeColor)(e, t.colorSpace), (0, p.writeUint16)(e, (0, Ne.clamp)(t.opacity, 0, 1) * 255), (0, p.writeUint8)(e, 128), (0, p.writeZeros)(e, 1)
    });
    Ne.MOCK_HANDLERS ? R("Patt", function(e) {
        return e._Patt !== void 0
    }, function(e, n, t) {
        n._Patt = (0, d.readBytes)(e, t())
    }, function(e, n) {
        return !1
    }) : R("Patt", function(e) {
        return !e
    }, function(e, n, t) {
        t() && (0, d.skipBytes)(e, t())
    }, function(e, n) {});
    Ne.MOCK_HANDLERS && R("CAI ", function(e) {
        return e._CAI_ !== void 0
    }, function(e, n, t) {
        n._CAI_ = (0, d.readBytes)(e, t())
    }, function(e, n) {
        (0, p.writeBytes)(e, n._CAI_)
    });
    Ne.MOCK_HANDLERS && R("OCIO", function(e) {
        return e._OCIO !== void 0
    }, function(e, n, t) {
        n._OCIO = (0, d.readBytes)(e, t())
    }, function(e, n) {
        (0, p.writeBytes)(e, n._OCIO)
    });
    Ne.MOCK_HANDLERS && R("GenI", function(e) {
        return e._GenI !== void 0
    }, function(e, n, t) {
        var r = (0, v.readVersionAndDescriptor)(e, !0);
        console.log("GenI", yn("node:util").inspect(r, !1, 99, !0)), n._GenI = (0, d.readBytes)(e, t())
    }, function(e, n) {
        (0, p.writeBytes)(e, n._GenI)
    });

    function fa(e) {
        var n = (0, d.readInt32)(e),
            t = (0, d.readInt32)(e),
            r = (0, d.readInt32)(e),
            i = (0, d.readInt32)(e);
        return {
            top: n,
            left: t,
            bottom: r,
            right: i
        }
    }

    function pa(e, n) {
        (0, p.writeInt32)(e, n.top), (0, p.writeInt32)(e, n.left), (0, p.writeInt32)(e, n.bottom), (0, p.writeInt32)(e, n.right)
    }
    R("Anno", function(e) {
        return e.annotations !== void 0
    }, function(e, n, t) {
        var r = (0, d.readUint16)(e),
            i = (0, d.readUint16)(e);
        if (r !== 2 || i !== 1) throw new Error("Invalid Anno version");
        for (var a = (0, d.readUint32)(e), o = [], s = 0; s < a; s++) {
            (0, d.readUint32)(e);
            var l = (0, d.readSignature)(e),
                u = !!(0, d.readUint8)(e);
            (0, d.readUint8)(e), (0, d.readUint16)(e);
            var c = fa(e),
                h = fa(e),
                m = (0, d.readColor)(e),
                S = (0, d.readPascalString)(e, 2),
                y = (0, d.readPascalString)(e, 2),
                b = (0, d.readPascalString)(e, 2);
            (0, d.readUint32)(e), (0, d.readSignature)(e);
            var P = (0, d.readUint32)(e),
                g = void 0;
            if (l === "txtA") P >= 2 && (0, d.readUint16)(e) === 65279 ? g = (0, d.readUnicodeStringWithLength)(e, (P - 2) / 2) : (e.offset -= 2, g = (0, d.readAsciiString)(e, P)), g = g.replace(/\r/g, `
`);
            else if (l === "sndA") g = (0, d.readBytes)(e, P);
            else throw new Error("Unknown annotation type");
            o.push({
                type: l === "txtA" ? "text" : "sound",
                open: u,
                iconLocation: c,
                popupLocation: h,
                color: m,
                author: S,
                name: y,
                date: b,
                data: g
            })
        }
        n.annotations = o, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.annotations;
        (0, p.writeUint16)(e, 2), (0, p.writeUint16)(e, 1), (0, p.writeUint32)(e, t.length);
        for (var r = 0, i = t; r < i.length; r++) {
            var a = i[r],
                o = a.type === "sound";
            if (o && !(a.data instanceof Uint8Array)) throw new Error("Sound annotation data should be Uint8Array");
            if (!o && typeof a.data != "string") throw new Error("Text annotation data should be string");
            var s = e.offset;
            (0, p.writeUint32)(e, 0), (0, p.writeSignature)(e, o ? "sndA" : "txtA"), (0, p.writeUint8)(e, a.open ? 1 : 0), (0, p.writeUint8)(e, 28), (0, p.writeUint16)(e, 1), pa(e, a.iconLocation), pa(e, a.popupLocation), (0, p.writeColor)(e, a.color), (0, p.writePascalString)(e, a.author || "", 2), (0, p.writePascalString)(e, a.name || "", 2), (0, p.writePascalString)(e, a.date || "", 2);
            var l = e.offset;
            (0, p.writeUint32)(e, 0), (0, p.writeSignature)(e, o ? "sndM" : "txtC"), (0, p.writeUint32)(e, 0);
            var u = e.offset;
            if (o)(0, p.writeBytes)(e, a.data);
            else {
                (0, p.writeUint16)(e, 65279);
                for (var c = a.data.replace(/\n/g, "\r"), h = 0; h < c.length; h++)(0, p.writeUint16)(e, c.charCodeAt(h))
            }
            e.view.setUint32(s, e.offset - s, !1), e.view.setUint32(l, e.offset - l, !1), e.view.setUint32(u - 4, e.offset - u, !1)
        }
    });

    function wa(e) {
        R(e, function(n) {
            var t = n;
            return !(!t.linkedFiles || !t.linkedFiles.length || e === "lnkE" && !t.linkedFiles.some(function(r) {
                return r.linkedFile
            }))
        }, function(n, t, r, i) {
            var a = t;
            for (a.linkedFiles = a.linkedFiles || []; r() > 8;) {
                var o = Fr(n),
                    s = n.offset,
                    l = (0, d.readSignature)(n),
                    u = (0, d.readInt32)(n),
                    c = (0, d.readPascalString)(n, 1),
                    h = (0, d.readUnicodeString)(n),
                    m = (0, d.readSignature)(n).trim(),
                    S = (0, d.readSignature)(n).trim(),
                    y = Fr(n),
                    b = (0, d.readUint8)(n),
                    P = b ? (0, v.readVersionAndDescriptor)(n) : void 0,
                    g = l === "liFE" ? (0, v.readVersionAndDescriptor)(n) : void 0,
                    F = {
                        id: c,
                        name: h
                    };
                if (m && (F.type = m), S && (F.creator = S), P && (F.descriptor = {
                        compInfo: {
                            compID: P.compInfo.compID,
                            originalCompID: P.compInfo.originalCompID
                        }
                    }), l === "liFE" && u > 3) {
                    var C = (0, d.readInt32)(n),
                        I = (0, d.readUint8)(n),
                        A = (0, d.readUint8)(n),
                        k = (0, d.readUint8)(n),
                        L = (0, d.readUint8)(n),
                        M = (0, d.readFloat64)(n),
                        V = Math.floor(M),
                        N = (M - V) * 1e3;
                    F.time = new Date(Date.UTC(C, I, A, k, L, V, N)).toISOString()
                }
                var q = l === "liFE" ? Fr(n) : 0;
                for (l === "liFA" && (0, d.skipBytes)(n, 8), l === "liFD" && (F.data = (0, d.readBytes)(n, y)), u >= 5 && (F.childDocumentID = (0, d.readUnicodeString)(n)), u >= 6 && (F.assetModTime = (0, d.readFloat64)(n)), u >= 7 && (F.assetLockedState = (0, d.readUint8)(n)), l === "liFE" && u === 2 && (F.data = (0, d.readBytes)(n, q)), n.skipLinkedFilesData && (F.data = void 0), e === "lnkE" && (F.linkedFile = {
                        fileSize: q,
                        name: g?.["Nm  "] || "",
                        fullPath: g?.fullPath || "",
                        originalPath: g?.originalPath || "",
                        relativePath: g?.relPath || ""
                    }), a.linkedFiles.push(F); o % 4;) o++;
                n.offset = s + o
            }(0, d.skipBytes)(n, r())
        }, function(n, t) {
            for (var r, i, a, o, s, l, u, c, h, m = t, S = 0, y = m.linkedFiles; S < y.length; S++) {
                var b = y[S];
                if (e === "lnkE" == !!b.linkedFile) {
                    var P = 2;
                    b.assetLockedState != null ? P = 7 : b.assetModTime != null ? P = 6 : b.childDocumentID != null ? P = 5 : e === "lnkE" && (P = 3), Ir(n, 0);
                    var g = n.offset;
                    if ((0, p.writeSignature)(n, e === "lnkE" ? "liFE" : b.data ? "liFD" : "liFA"), (0, p.writeInt32)(n, P), !b.id || typeof b.id != "string" || !/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(b.id)) throw new Error("Linked file ID must be in a GUID format (example: 20953ddb-9391-11ec-b4f1-c15674f50bc4)");
                    if ((0, p.writePascalString)(n, b.id, 1), (0, p.writeUnicodeStringWithPadding)(n, b.name || ""), (0, p.writeSignature)(n, b.type ? "".concat(b.type, "    ").substring(0, 4) : "    "), (0, p.writeSignature)(n, b.creator ? "".concat(b.creator, "    ").substring(0, 4) : "\0\0\0\0"), Ir(n, b.data ? b.data.byteLength : 0), b.descriptor && b.descriptor.compInfo) {
                        var F = {
                            compInfo: {
                                compID: b.descriptor.compInfo.compID,
                                originalCompID: b.descriptor.compInfo.originalCompID
                            }
                        };
                        (0, p.writeUint8)(n, 1), (0, v.writeVersionAndDescriptor)(n, "", "null", F)
                    } else(0, p.writeUint8)(n, 0);
                    if (e === "lnkE") {
                        var F = {
                            descVersion: 2,
                            "Nm  ": (i = (r = b.linkedFile) === null || r === void 0 ? void 0 : r.name) !== null && i !== void 0 ? i : "",
                            fullPath: (o = (a = b.linkedFile) === null || a === void 0 ? void 0 : a.fullPath) !== null && o !== void 0 ? o : "",
                            originalPath: (l = (s = b.linkedFile) === null || s === void 0 ? void 0 : s.originalPath) !== null && l !== void 0 ? l : "",
                            relPath: (c = (u = b.linkedFile) === null || u === void 0 ? void 0 : u.relativePath) !== null && c !== void 0 ? c : ""
                        };
                        (0, v.writeVersionAndDescriptor)(n, "", "ExternalFileLink", F);
                        var C = b.time ? new Date(b.time) : new Date;
                        (0, p.writeInt32)(n, C.getUTCFullYear()), (0, p.writeUint8)(n, C.getUTCMonth()), (0, p.writeUint8)(n, C.getUTCDate()), (0, p.writeUint8)(n, C.getUTCHours()), (0, p.writeUint8)(n, C.getUTCMinutes()), (0, p.writeFloat64)(n, C.getUTCSeconds() + C.getUTCMilliseconds() / 1e3)
                    }
                    b.data ? (0, p.writeBytes)(n, b.data) : Ir(n, ((h = b.linkedFile) === null || h === void 0 ? void 0 : h.fileSize) || 0), P >= 5 && (0, p.writeUnicodeStringWithPadding)(n, b.childDocumentID || ""), P >= 6 && (0, p.writeFloat64)(n, b.assetModTime || 0), P >= 7 && (0, p.writeUint8)(n, b.assetLockedState || 0);
                    var I = n.offset - g;
                    for (n.view.setUint32(g - 4, I, !1); I % 4;) I++, (0, p.writeUint8)(n, 0)
                }
            }
        })
    }
    wa("lnk2");
    wa("lnkE");
    Vn("lnkD", "lnk2");
    Vn("lnk3", "lnk2");
    R("pths", se("pathList"), function(e, n) {
        var t = (0, v.readVersionAndDescriptor)(e, !0);
        n.pathList = []
    }, function(e, n) {
        var t = {
            pathList: []
        };
        (0, v.writeVersionAndDescriptor)(e, "", "pathsDataClass", t)
    });
    R("lyvr", se("version"), function(e, n) {
        return n.version = (0, d.readUint32)(e)
    }, function(e, n) {
        return (0, p.writeUint32)(e, n.version)
    });
    R("lfxs", function() {
        return !1
    }, function(e, n, t) {
        var r = (0, d.readUint32)(e);
        if (r !== 0) throw new Error("Invalid lfxs version");
        var i = (0, v.readVersionAndDescriptor)(e);
        n.effects = (0, v.parseEffects)(i, !!e.logMissingFeatures), (0, d.skipBytes)(e, t())
    }, function(e, n, t, r) {
        var i = (0, v.serializeEffects)(n.effects, !!r.logMissingFeatures, !0);
        (0, p.writeUint32)(e, 0), (0, v.writeVersionAndDescriptor)(e, "", "null", i)
    });

    function xe(e) {
        return function(n) {
            return !!n.adjustment && n.adjustment.type === e
        }
    }
    R("brit", xe("brightness/contrast"), function(e, n, t) {
        n.adjustment || (n.adjustment = {
            type: "brightness/contrast",
            brightness: (0, d.readInt16)(e),
            contrast: (0, d.readInt16)(e),
            meanValue: (0, d.readInt16)(e),
            labColorOnly: !!(0, d.readUint8)(e),
            useLegacy: !0
        }), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t, r = n.adjustment;
        (0, p.writeInt16)(e, r.brightness || 0), (0, p.writeInt16)(e, r.contrast || 0), (0, p.writeInt16)(e, (t = r.meanValue) !== null && t !== void 0 ? t : 127), (0, p.writeUint8)(e, r.labColorOnly ? 1 : 0), (0, p.writeZeros)(e, 1)
    });

    function Ot(e) {
        var n = (0, d.readInt16)(e),
            t = (0, d.readInt16)(e),
            r = (0, d.readInt16)(e),
            i = (0, d.readInt16)(e),
            a = (0, d.readInt16)(e) / 100;
        return {
            shadowInput: n,
            highlightInput: t,
            shadowOutput: r,
            highlightOutput: i,
            midtoneInput: a
        }
    }

    function nt(e, n) {
        (0, p.writeInt16)(e, n.shadowInput), (0, p.writeInt16)(e, n.highlightInput), (0, p.writeInt16)(e, n.shadowOutput), (0, p.writeInt16)(e, n.highlightOutput), (0, p.writeInt16)(e, Math.round(n.midtoneInput * 100))
    }
    R("levl", xe("levels"), function(e, n, t) {
        if ((0, d.readUint16)(e) !== 2) throw new Error("Invalid levl version");
        n.adjustment = f(f({}, n.adjustment), {
            type: "levels",
            rgb: Ot(e),
            red: Ot(e),
            green: Ot(e),
            blue: Ot(e)
        }), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment,
            r = {
                shadowInput: 0,
                highlightInput: 255,
                shadowOutput: 0,
                highlightOutput: 255,
                midtoneInput: 1
            };
        (0, p.writeUint16)(e, 2), nt(e, t.rgb || r), nt(e, t.red || r), nt(e, t.blue || r), nt(e, t.green || r);
        for (var i = 0; i < 59; i++) nt(e, r)
    });

    function Rt(e) {
        for (var n = (0, d.readUint16)(e), t = [], r = 0; r < n; r++) {
            var i = (0, d.readInt16)(e),
                a = (0, d.readInt16)(e);
            t.push({
                input: a,
                output: i
            })
        }
        return t
    }

    function mn(e, n) {
        (0, p.writeUint16)(e, n.length);
        for (var t = 0, r = n; t < r.length; t++) {
            var i = r[t];
            (0, p.writeUint16)(e, i.output), (0, p.writeUint16)(e, i.input)
        }
    }
    R("curv", xe("curves"), function(e, n, t) {
        if ((0, d.readUint8)(e), (0, d.readUint16)(e) !== 1) throw new Error("Invalid curv version");
        (0, d.readUint16)(e);
        var r = (0, d.readUint16)(e),
            i = {
                type: "curves"
            };
        r & 1 && (i.rgb = Rt(e)), r & 2 && (i.red = Rt(e)), r & 4 && (i.green = Rt(e)), r & 8 && (i.blue = Rt(e)), n.adjustment = f(f({}, n.adjustment), i), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment,
            r = t.rgb,
            i = t.red,
            a = t.green,
            o = t.blue,
            s = 0,
            l = 0;
        r && r.length && (s |= 1, l++), i && i.length && (s |= 2, l++), a && a.length && (s |= 4, l++), o && o.length && (s |= 8, l++), (0, p.writeUint8)(e, 0), (0, p.writeUint16)(e, 1), (0, p.writeUint16)(e, 0), (0, p.writeUint16)(e, s), r && r.length && mn(e, r), i && i.length && mn(e, i), a && a.length && mn(e, a), o && o.length && mn(e, o), (0, p.writeSignature)(e, "Crv "), (0, p.writeUint16)(e, 4), (0, p.writeUint16)(e, 0), (0, p.writeUint16)(e, l), r && r.length && ((0, p.writeUint16)(e, 0), mn(e, r)), i && i.length && ((0, p.writeUint16)(e, 1), mn(e, i)), a && a.length && ((0, p.writeUint16)(e, 2), mn(e, a)), o && o.length && ((0, p.writeUint16)(e, 3), mn(e, o))
    });
    R("expA", xe("exposure"), function(e, n, t) {
        if ((0, d.readUint16)(e) !== 1) throw new Error("Invalid expA version");
        n.adjustment = f(f({}, n.adjustment), {
            type: "exposure",
            exposure: (0, d.readFloat32)(e),
            offset: (0, d.readFloat32)(e),
            gamma: (0, d.readFloat32)(e)
        }), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment;
        (0, p.writeUint16)(e, 1), (0, p.writeFloat32)(e, t.exposure), (0, p.writeFloat32)(e, t.offset), (0, p.writeFloat32)(e, t.gamma), (0, p.writeZeros)(e, 2)
    });
    R("vibA", xe("vibrance"), function(e, n, t) {
        var r = (0, v.readVersionAndDescriptor)(e);
        n.adjustment = {
            type: "vibrance"
        }, r.vibrance !== void 0 && (n.adjustment.vibrance = r.vibrance), r.Strt !== void 0 && (n.adjustment.saturation = r.Strt), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment,
            r = {};
        t.vibrance !== void 0 && (r.vibrance = t.vibrance), t.saturation !== void 0 && (r.Strt = t.saturation), (0, v.writeVersionAndDescriptor)(e, "", "null", r)
    });

    function Fn(e) {
        return {
            a: (0, d.readInt16)(e),
            b: (0, d.readInt16)(e),
            c: (0, d.readInt16)(e),
            d: (0, d.readInt16)(e),
            hue: (0, d.readInt16)(e),
            saturation: (0, d.readInt16)(e),
            lightness: (0, d.readInt16)(e)
        }
    }

    function In(e, n) {
        var t = n || {};
        (0, p.writeInt16)(e, t.a || 0), (0, p.writeInt16)(e, t.b || 0), (0, p.writeInt16)(e, t.c || 0), (0, p.writeInt16)(e, t.d || 0), (0, p.writeInt16)(e, t.hue || 0), (0, p.writeInt16)(e, t.saturation || 0), (0, p.writeInt16)(e, t.lightness || 0)
    }
    R("hue2", xe("hue/saturation"), function(e, n, t) {
        if ((0, d.readUint16)(e) !== 2) throw new Error("Invalid hue2 version");
        n.adjustment = f(f({}, n.adjustment), {
            type: "hue/saturation",
            master: Fn(e),
            reds: Fn(e),
            yellows: Fn(e),
            greens: Fn(e),
            cyans: Fn(e),
            blues: Fn(e),
            magentas: Fn(e)
        }), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment;
        (0, p.writeUint16)(e, 2), In(e, t.master), In(e, t.reds), In(e, t.yellows), In(e, t.greens), In(e, t.cyans), In(e, t.blues), In(e, t.magentas)
    });

    function Pr(e) {
        return {
            cyanRed: (0, d.readInt16)(e),
            magentaGreen: (0, d.readInt16)(e),
            yellowBlue: (0, d.readInt16)(e)
        }
    }

    function Dr(e, n) {
        (0, p.writeInt16)(e, n.cyanRed || 0), (0, p.writeInt16)(e, n.magentaGreen || 0), (0, p.writeInt16)(e, n.yellowBlue || 0)
    }
    R("blnc", xe("color balance"), function(e, n, t) {
        n.adjustment = {
            type: "color balance",
            shadows: Pr(e),
            midtones: Pr(e),
            highlights: Pr(e),
            preserveLuminosity: !!(0, d.readUint8)(e)
        }, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment;
        Dr(e, t.shadows || {}), Dr(e, t.midtones || {}), Dr(e, t.highlights || {}), (0, p.writeUint8)(e, t.preserveLuminosity ? 1 : 0), (0, p.writeZeros)(e, 1)
    });
    R("blwh", xe("black & white"), function(e, n, t) {
        var r = (0, v.readVersionAndDescriptor)(e);
        n.adjustment = {
            type: "black & white",
            reds: r["Rd  "],
            yellows: r.Yllw,
            greens: r["Grn "],
            cyans: r["Cyn "],
            blues: r["Bl  "],
            magentas: r.Mgnt,
            useTint: !!r.useTint,
            presetKind: r.bwPresetKind,
            presetFileName: r.blackAndWhitePresetFileName
        }, r.tintColor !== void 0 && (n.adjustment.tintColor = (0, v.parseColor)(r.tintColor)), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment,
            r = {
                "Rd  ": t.reds || 0,
                Yllw: t.yellows || 0,
                "Grn ": t.greens || 0,
                "Cyn ": t.cyans || 0,
                "Bl  ": t.blues || 0,
                Mgnt: t.magentas || 0,
                useTint: !!t.useTint,
                tintColor: (0, v.serializeColor)(t.tintColor),
                bwPresetKind: t.presetKind || 0,
                blackAndWhitePresetFileName: t.presetFileName || ""
            };
        (0, v.writeVersionAndDescriptor)(e, "", "null", r)
    });
    R("phfl", xe("photo filter"), function(e, n, t) {
        var r = (0, d.readUint16)(e);
        if (r !== 2 && r !== 3) throw new Error("Invalid phfl version");
        var i;
        r === 2 ? i = (0, d.readColor)(e) : i = {
            l: (0, d.readInt32)(e) / 100,
            a: (0, d.readInt32)(e) / 100,
            b: (0, d.readInt32)(e) / 100
        }, n.adjustment = {
            type: "photo filter",
            color: i,
            density: (0, d.readUint32)(e) / 100,
            preserveLuminosity: !!(0, d.readUint8)(e)
        }, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment;
        (0, p.writeUint16)(e, 2), (0, p.writeColor)(e, t.color || {
            l: 0,
            a: 0,
            b: 0
        }), (0, p.writeUint32)(e, (t.density || 0) * 100), (0, p.writeUint8)(e, t.preserveLuminosity ? 1 : 0), (0, p.writeZeros)(e, 3)
    });

    function Vt(e) {
        var n = (0, d.readInt16)(e),
            t = (0, d.readInt16)(e),
            r = (0, d.readInt16)(e);
        (0, d.skipBytes)(e, 2);
        var i = (0, d.readInt16)(e);
        return {
            red: n,
            green: t,
            blue: r,
            constant: i
        }
    }

    function tt(e, n) {
        var t = n || {};
        (0, p.writeInt16)(e, t.red), (0, p.writeInt16)(e, t.green), (0, p.writeInt16)(e, t.blue), (0, p.writeZeros)(e, 2), (0, p.writeInt16)(e, t.constant)
    }
    R("mixr", xe("channel mixer"), function(e, n, t) {
        if ((0, d.readUint16)(e) !== 1) throw new Error("Invalid mixr version");
        var r = n.adjustment = f(f({}, n.adjustment), {
            type: "channel mixer",
            monochrome: !!(0, d.readUint16)(e)
        });
        r.monochrome || (r.red = Vt(e), r.green = Vt(e), r.blue = Vt(e)), r.gray = Vt(e), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment;
        (0, p.writeUint16)(e, 1), (0, p.writeUint16)(e, t.monochrome ? 1 : 0), t.monochrome ? (tt(e, t.gray), (0, p.writeZeros)(e, 30)) : (tt(e, t.red), tt(e, t.green), tt(e, t.blue), tt(e, t.gray))
    });
    var ha = (0, Ne.createEnum)("colorLookupType", "3DLUT", {
            "3dlut": "3DLUT",
            abstractProfile: "abstractProfile",
            deviceLinkProfile: "deviceLinkProfile"
        }),
        va = (0, Ne.createEnum)("LUTFormatType", "look", {
            look: "LUTFormatLOOK",
            cube: "LUTFormatCUBE",
            "3dl": "LUTFormat3DL"
        }),
        zt = (0, Ne.createEnum)("colorLookupOrder", "rgb", {
            rgb: "rgbOrder",
            bgr: "bgrOrder"
        });
    R("clrL", xe("color lookup"), function(e, n, t) {
        if ((0, d.readUint16)(e) !== 1) throw new Error("Invalid clrL version");
        var r = (0, v.readVersionAndDescriptor)(e);
        n.adjustment = {
            type: "color lookup"
        };
        var i = n.adjustment;
        r.lookupType !== void 0 && (i.lookupType = ha.decode(r.lookupType)), r["Nm  "] !== void 0 && (i.name = r["Nm  "]), r.Dthr !== void 0 && (i.dither = r.Dthr), r.profile !== void 0 && (i.profile = r.profile), r.LUTFormat !== void 0 && (i.lutFormat = va.decode(r.LUTFormat)), r.dataOrder !== void 0 && (i.dataOrder = zt.decode(r.dataOrder)), r.tableOrder !== void 0 && (i.tableOrder = zt.decode(r.tableOrder)), r.LUT3DFileData !== void 0 && (i.lut3DFileData = r.LUT3DFileData), r.LUT3DFileName !== void 0 && (i.lut3DFileName = r.LUT3DFileName), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.adjustment,
            r = {};
        t.lookupType !== void 0 && (r.lookupType = ha.encode(t.lookupType)), t.name !== void 0 && (r["Nm  "] = t.name), t.dither !== void 0 && (r.Dthr = t.dither), t.profile !== void 0 && (r.profile = t.profile), t.lutFormat !== void 0 && (r.LUTFormat = va.encode(t.lutFormat)), t.dataOrder !== void 0 && (r.dataOrder = zt.encode(t.dataOrder)), t.tableOrder !== void 0 && (r.tableOrder = zt.encode(t.tableOrder)), t.lut3DFileData !== void 0 && (r.LUT3DFileData = t.lut3DFileData), t.lut3DFileName !== void 0 && (r.LUT3DFileName = t.lut3DFileName), (0, p.writeUint16)(e, 1), (0, v.writeVersionAndDescriptor)(e, "", "null", r)
    });
    R("nvrt", xe("invert"), function(e, n, t) {
        n.adjustment = {
            type: "invert"
        }, (0, d.skipBytes)(e, t())
    }, function() {});
    R("post", xe("posterize"), function(e, n, t) {
        n.adjustment = {
            type: "posterize",
            levels: (0, d.readUint16)(e)
        }, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t, r = n.adjustment;
        (0, p.writeUint16)(e, (t = r.levels) !== null && t !== void 0 ? t : 4), (0, p.writeZeros)(e, 2)
    });
    R("thrs", xe("threshold"), function(e, n, t) {
        n.adjustment = {
            type: "threshold",
            level: (0, d.readUint16)(e)
        }, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t, r = n.adjustment;
        (0, p.writeUint16)(e, (t = r.level) !== null && t !== void 0 ? t : 128), (0, p.writeZeros)(e, 2)
    });
    var ma = ["", "", "", "rgb", "hsb", "", "lab"];
    R("grdm", xe("gradient map"), function(e, n, t) {
        var r = (0, d.readUint16)(e);
        if (r !== 1 && r !== 3) throw new Error("Invalid grdm version");
        var i = {
            type: "gradient map",
            gradientType: "solid"
        };
        i.reverse = !!(0, d.readUint8)(e), i.dither = !!(0, d.readUint8)(e);
        var a = !!(0, d.readUint8)(e);
        if (e.offset--, a) {
            var o = (0, d.readSignature)(e);
            i.method = v.gradientInterpolationMethodType.decode(o)
        }
        i.name = (0, d.readUnicodeString)(e), i.colorStops = [], i.opacityStops = [];
        for (var s = (0, d.readUint16)(e), l = 0; l < s; l++) i.colorStops.push({
            location: (0, d.readUint32)(e),
            midpoint: (0, d.readUint32)(e) / 100,
            color: (0, d.readColor)(e)
        }), (0, d.skipBytes)(e, 2);
        for (var u = (0, d.readUint16)(e), l = 0; l < u; l++) i.opacityStops.push({
            location: (0, d.readUint32)(e),
            midpoint: (0, d.readUint32)(e) / 100,
            opacity: (0, d.readUint16)(e) / 255
        });
        var c = (0, d.readUint16)(e);
        if (c !== 2) throw new Error("Invalid grdm expansion count");
        var h = (0, d.readUint16)(e);
        i.smoothness = h / 4096;
        var m = (0, d.readUint16)(e);
        if (m !== 32) throw new Error("Invalid grdm length");
        i.gradientType = (0, d.readUint16)(e) ? "noise" : "solid", i.randomSeed = (0, d.readUint32)(e), i.addTransparency = !!(0, d.readUint16)(e), i.restrictColors = !!(0, d.readUint16)(e), i.roughness = (0, d.readUint32)(e) / 4096, i.colorModel = ma[(0, d.readUint16)(e)] || "rgb", i.min = [(0, d.readUint16)(e) / 32768, (0, d.readUint16)(e) / 32768, (0, d.readUint16)(e) / 32768, (0, d.readUint16)(e) / 32768], i.max = [(0, d.readUint16)(e) / 32768, (0, d.readUint16)(e) / 32768, (0, d.readUint16)(e) / 32768, (0, d.readUint16)(e) / 32768], (0, d.skipBytes)(e, t());
        for (var S = 0, y = i.colorStops; S < y.length; S++) {
            var b = y[S];
            b.location /= h
        }
        for (var P = 0, g = i.opacityStops; P < g.length; P++) {
            var b = g[P];
            b.location /= h
        }
        n.adjustment = i
    }, function(e, n) {
        var t, r, i, a = n.adjustment;
        (0, p.writeUint16)(e, a.method !== void 0 ? 3 : 1), (0, p.writeUint8)(e, a.reverse ? 1 : 0), (0, p.writeUint8)(e, a.dither ? 1 : 0), a.method !== void 0 && (0, p.writeSignature)(e, v.gradientInterpolationMethodType.encode(a.method)), (0, p.writeUnicodeStringWithPadding)(e, a.name || ""), (0, p.writeUint16)(e, a.colorStops && a.colorStops.length || 0);
        for (var o = Math.round(((t = a.smoothness) !== null && t !== void 0 ? t : 1) * 4096), s = 0, l = a.colorStops || []; s < l.length; s++) {
            var u = l[s];
            (0, p.writeUint32)(e, Math.round(u.location * o)), (0, p.writeUint32)(e, Math.round(u.midpoint * 100)), (0, p.writeColor)(e, u.color), (0, p.writeZeros)(e, 2)
        }(0, p.writeUint16)(e, a.opacityStops && a.opacityStops.length || 0);
        for (var c = 0, h = a.opacityStops || []; c < h.length; c++) {
            var u = h[c];
            (0, p.writeUint32)(e, Math.round(u.location * o)), (0, p.writeUint32)(e, Math.round(u.midpoint * 100)), (0, p.writeUint16)(e, Math.round(u.opacity * 255))
        }(0, p.writeUint16)(e, 2), (0, p.writeUint16)(e, o), (0, p.writeUint16)(e, 32), (0, p.writeUint16)(e, a.gradientType === "noise" ? 1 : 0), (0, p.writeUint32)(e, a.randomSeed || 0), (0, p.writeUint16)(e, a.addTransparency ? 1 : 0), (0, p.writeUint16)(e, a.restrictColors ? 1 : 0), (0, p.writeUint32)(e, Math.round(((r = a.roughness) !== null && r !== void 0 ? r : 1) * 4096));
        var m = ma.indexOf((i = a.colorModel) !== null && i !== void 0 ? i : "rgb");
        (0, p.writeUint16)(e, m === -1 ? 3 : m);
        for (var S = 0; S < 4; S++)(0, p.writeUint16)(e, Math.round((a.min && a.min[S] || 0) * 32768));
        for (var S = 0; S < 4; S++)(0, p.writeUint16)(e, Math.round((a.max && a.max[S] || 0) * 32768));
        (0, p.writeZeros)(e, 4)
    });

    function on(e) {
        return {
            c: (0, d.readInt16)(e),
            m: (0, d.readInt16)(e),
            y: (0, d.readInt16)(e),
            k: (0, d.readInt16)(e)
        }
    }

    function sn(e, n) {
        var t = n || {};
        (0, p.writeInt16)(e, t.c), (0, p.writeInt16)(e, t.m), (0, p.writeInt16)(e, t.y), (0, p.writeInt16)(e, t.k)
    }
    R("selc", xe("selective color"), function(e, n) {
        if ((0, d.readUint16)(e) !== 1) throw new Error("Invalid selc version");
        var t = (0, d.readUint16)(e) ? "absolute" : "relative";
        (0, d.skipBytes)(e, 8), n.adjustment = {
            type: "selective color",
            mode: t,
            reds: on(e),
            yellows: on(e),
            greens: on(e),
            cyans: on(e),
            blues: on(e),
            magentas: on(e),
            whites: on(e),
            neutrals: on(e),
            blacks: on(e)
        }
    }, function(e, n) {
        var t = n.adjustment;
        (0, p.writeUint16)(e, 1), (0, p.writeUint16)(e, t.mode === "absolute" ? 1 : 0), (0, p.writeZeros)(e, 8), sn(e, t.reds), sn(e, t.yellows), sn(e, t.greens), sn(e, t.cyans), sn(e, t.blues), sn(e, t.magentas), sn(e, t.whites), sn(e, t.neutrals), sn(e, t.blacks)
    });
    R("CgEd", function(e) {
        var n = e.adjustment;
        return n ? n.type === "brightness/contrast" && !n.useLegacy || (n.type === "levels" || n.type === "curves" || n.type === "exposure" || n.type === "channel mixer" || n.type === "hue/saturation") && n.presetFileName !== void 0 : !1
    }, function(e, n, t) {
        var r = (0, v.readVersionAndDescriptor)(e);
        if (r.Vrsn !== 1) throw new Error("Invalid CgEd version");
        "presetFileName" in r ? n.adjustment = f(f({}, n.adjustment), {
            presetKind: r.presetKind,
            presetFileName: r.presetFileName
        }) : "curvesPresetFileName" in r ? n.adjustment = f(f({}, n.adjustment), {
            presetKind: r.curvesPresetKind,
            presetFileName: r.curvesPresetFileName
        }) : "mixerPresetFileName" in r ? n.adjustment = f(f({}, n.adjustment), {
            presetKind: r.mixerPresetKind,
            presetFileName: r.mixerPresetFileName
        }) : n.adjustment = {
            type: "brightness/contrast",
            brightness: r.Brgh,
            contrast: r.Cntr,
            meanValue: r.means,
            useLegacy: !!r.useLegacy,
            labColorOnly: !!r["Lab "],
            auto: !!r.Auto
        }, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t, r, i, a, o = n.adjustment;
        if (o.type === "levels" || o.type === "exposure" || o.type === "hue/saturation") {
            var s = {
                Vrsn: 1,
                presetKind: (t = o.presetKind) !== null && t !== void 0 ? t : 1,
                presetFileName: o.presetFileName || ""
            };
            (0, v.writeVersionAndDescriptor)(e, "", "null", s)
        } else if (o.type === "curves") {
            var s = {
                Vrsn: 1,
                curvesPresetKind: (r = o.presetKind) !== null && r !== void 0 ? r : 1,
                curvesPresetFileName: o.presetFileName || ""
            };
            (0, v.writeVersionAndDescriptor)(e, "", "null", s)
        } else if (o.type === "channel mixer") {
            var s = {
                Vrsn: 1,
                mixerPresetKind: (i = o.presetKind) !== null && i !== void 0 ? i : 1,
                mixerPresetFileName: o.presetFileName || ""
            };
            (0, v.writeVersionAndDescriptor)(e, "", "null", s)
        } else if (o.type === "brightness/contrast") {
            var s = {
                Vrsn: 1,
                Brgh: o.brightness || 0,
                Cntr: o.contrast || 0,
                means: (a = o.meanValue) !== null && a !== void 0 ? a : 127,
                "Lab ": !!o.labColorOnly,
                useLegacy: !!o.useLegacy,
                Auto: !!o.auto
            };
            (0, v.writeVersionAndDescriptor)(e, "", "null", s)
        } else throw new Error("Unhandled CgEd case")
    });

    function Gs(e) {
        var n = [];

        function t(r) {
            var i;
            if (r.children)
                for (var a = 0, o = r.children; a < o.length; a++) {
                    var s = o[a];
                    ((i = s.text) === null || i === void 0 ? void 0 : i.index) !== void 0 && (n[s.text.index] = s), t(s)
                }
        }
        return t(e), n
    }
    R("Txt2", se("engineData"), function(e, n, t, r) {
        var i = (0, d.readBytes)(e, t());
        n.engineData = (0, la.fromByteArray)(i);
        var a = Gs(r),
            o = (0, Ur.parseEngineData)(i),
            s = (0, Ls.decodeEngineData2)(o),
            l = s.ResourceDict.TextFrameSet;
        if (l)
            for (var u = 0; u < l.length; u++) {
                var c = a[u];
                l[u].path && c?.text && (c.text.textPath = l[u].path)
            }
    }, function(e, n) {
        var t = (0, la.toByteArray)(n.engineData);
        (0, p.writeBytes)(e, t)
    });
    R("FEid", se("filterEffectsMasks"), function(e, n, t) {
        var r = (0, d.readInt32)(e);
        if (r < 1 || r > 3) throw new Error("Invalid filterEffects version ".concat(r));
        for (n.filterEffectsMasks = []; t() > 8;) {
            if ((0, d.readUint32)(e)) throw new Error("filterEffects: 64 bit length is not supported");
            var i = (0, d.readUint32)(e),
                a = e.offset + i,
                o = (0, d.readPascalString)(e, 1),
                s = (0, d.readInt32)(e);
            if (s !== 1) throw new Error("Invalid filterEffect version ".concat(s));
            if ((0, d.readUint32)(e)) throw new Error("filterEffect: 64 bit length is not supported");
            (0, d.readUint32)(e);
            for (var l = (0, d.readInt32)(e), u = (0, d.readInt32)(e), c = (0, d.readInt32)(e), h = (0, d.readInt32)(e), m = (0, d.readInt32)(e), S = (0, d.readInt32)(e), y = [], b = 0; b < S + 2; b++) {
                var P = (0, d.readInt32)(e);
                if (P) {
                    if ((0, d.readUint32)(e)) throw new Error("filterEffect: 64 bit length is not supported");
                    var g = (0, d.readUint32)(e);
                    if (!g) throw new Error("filterEffect: Empty channel");
                    var F = (0, d.readUint16)(e),
                        C = (0, d.readBytes)(e, g - 2);
                    y.push({
                        compressionMode: F,
                        data: C
                    })
                } else y.push(void 0)
            }
            if (n.filterEffectsMasks.push({
                    id: o,
                    top: l,
                    left: u,
                    bottom: c,
                    right: h,
                    depth: m,
                    channels: y
                }), e.offset < a && (0, d.readUint8)(e)) {
                var I = (0, d.readInt32)(e),
                    A = (0, d.readInt32)(e),
                    k = (0, d.readInt32)(e),
                    L = (0, d.readInt32)(e);
                if ((0, d.readUint32)(e)) throw new Error("filterEffect: 64 bit length is not supported");
                var M = (0, d.readUint32)(e),
                    F = (0, d.readUint16)(e),
                    C = (0, d.readBytes)(e, M - 2);
                n.filterEffectsMasks[n.filterEffectsMasks.length - 1].extra = {
                    top: I,
                    left: A,
                    bottom: k,
                    right: L,
                    compressionMode: F,
                    data: C
                }
            }
            e.offset = a;
            for (var V = i; V % 4;) e.offset++, V++
        }
    }, function(e, n) {
        var t;
        (0, p.writeInt32)(e, 3);
        for (var r = 0, i = n.filterEffectsMasks; r < i.length; r++) {
            var a = i[r];
            (0, p.writeUint32)(e, 0), (0, p.writeUint32)(e, 0);
            var o = e.offset;
            (0, p.writePascalString)(e, a.id, 1), (0, p.writeInt32)(e, 1), (0, p.writeUint32)(e, 0), (0, p.writeUint32)(e, 0);
            var s = e.offset;
            (0, p.writeInt32)(e, a.top), (0, p.writeInt32)(e, a.left), (0, p.writeInt32)(e, a.bottom), (0, p.writeInt32)(e, a.right), (0, p.writeInt32)(e, a.depth);
            var l = Math.max(0, a.channels.length - 2);
            (0, p.writeInt32)(e, l);
            for (var u = 0; u < l + 2; u++) {
                var c = a.channels[u];
                (0, p.writeInt32)(e, c ? 1 : 0), c && ((0, p.writeUint32)(e, 0), (0, p.writeUint32)(e, c.data.length + 2), (0, p.writeUint16)(e, c.compressionMode), (0, p.writeBytes)(e, c.data))
            }
            e.view.setUint32(s - 4, e.offset - s, !1);
            var h = (t = n.filterEffectsMasks[n.filterEffectsMasks.length - 1]) === null || t === void 0 ? void 0 : t.extra;
            h && ((0, p.writeUint8)(e, 1), (0, p.writeInt32)(e, h.top), (0, p.writeInt32)(e, h.left), (0, p.writeInt32)(e, h.bottom), (0, p.writeInt32)(e, h.right), (0, p.writeUint32)(e, 0), (0, p.writeUint32)(e, h.data.byteLength + 2), (0, p.writeUint16)(e, h.compressionMode), (0, p.writeBytes)(e, h.data));
            var m = e.offset - o;
            for (e.view.setUint32(o - 4, m, !1); m % 4;)(0, p.writeZeros)(e, 1), m++
        }
    });
    Vn("FXid", "FEid");
    R("FMsk", se("filterMask"), function(e, n) {
        n.filterMask = {
            colorSpace: (0, d.readColor)(e),
            opacity: (0, d.readUint16)(e) / 255
        }
    }, function(e, n) {
        var t;
        (0, p.writeColor)(e, n.filterMask.colorSpace), (0, p.writeUint16)(e, (0, Ne.clamp)((t = n.filterMask.opacity) !== null && t !== void 0 ? t : 1, 0, 1) * 255)
    });
    R("artd", function(e) {
        return e.artboards !== void 0
    }, function(e, n, t) {
        var r = (0, v.readVersionAndDescriptor)(e);
        n.artboards = {
            count: r["Cnt "],
            autoExpandOffset: {
                horizontal: r.autoExpandOffset.Hrzn,
                vertical: r.autoExpandOffset.Vrtc
            },
            origin: {
                horizontal: r.origin.Hrzn,
                vertical: r.origin.Vrtc
            },
            autoExpandEnabled: r.autoExpandEnabled,
            autoNestEnabled: r.autoNestEnabled,
            autoPositionEnabled: r.autoPositionEnabled,
            shrinkwrapOnSaveEnabled: !!r.shrinkwrapOnSaveEnabled,
            docDefaultNewArtboardBackgroundColor: (0, v.parseColor)(r.docDefaultNewArtboardBackgroundColor),
            docDefaultNewArtboardBackgroundType: r.docDefaultNewArtboardBackgroundType
        }, (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t, r, i, a, o, s = n.artboards,
            l = {
                "Cnt ": s.count,
                autoExpandOffset: s.autoExpandOffset ? {
                    Hrzn: s.autoExpandOffset.horizontal,
                    Vrtc: s.autoExpandOffset.vertical
                } : {
                    Hrzn: 0,
                    Vrtc: 0
                },
                origin: s.origin ? {
                    Hrzn: s.origin.horizontal,
                    Vrtc: s.origin.vertical
                } : {
                    Hrzn: 0,
                    Vrtc: 0
                },
                autoExpandEnabled: (t = s.autoExpandEnabled) !== null && t !== void 0 ? t : !0,
                autoNestEnabled: (r = s.autoNestEnabled) !== null && r !== void 0 ? r : !0,
                autoPositionEnabled: (i = s.autoPositionEnabled) !== null && i !== void 0 ? i : !0,
                shrinkwrapOnSaveEnabled: (a = s.shrinkwrapOnSaveEnabled) !== null && a !== void 0 ? a : !0,
                docDefaultNewArtboardBackgroundColor: (0, v.serializeColor)(s.docDefaultNewArtboardBackgroundColor),
                docDefaultNewArtboardBackgroundType: (o = s.docDefaultNewArtboardBackgroundType) !== null && o !== void 0 ? o : 1
            };
        (0, v.writeVersionAndDescriptor)(e, "", "null", l, "artd")
    });

    function Er(e) {
        return Object.keys(e).map(function(n) {
            return e[n]
        }).some(function(n) {
            return Array.isArray(n) && n.length > 1
        })
    }
    ge.hasMultiEffects = Er;
    R("lfx2", function(e) {
        return e.effects !== void 0 && !Er(e.effects)
    }, function(e, n, t) {
        var r = (0, d.readUint32)(e);
        if (r !== 0) throw new Error("Invalid lfx2 version");
        var i = (0, v.readVersionAndDescriptor)(e);
        n.effects = (0, v.parseEffects)(i, !!e.logMissingFeatures), (0, d.skipBytes)(e, t())
    }, function(e, n, t, r) {
        var i = (0, v.serializeEffects)(n.effects, !!r.logMissingFeatures, !0);
        (0, p.writeUint32)(e, 0), (0, v.writeVersionAndDescriptor)(e, "", "null", i)
    });
    R("cinf", se("compositorUsed"), function(e, n, t) {
        var r = (0, v.readVersionAndDescriptor)(e);

        function i(a) {
            return a.split(".")[1]
        }
        n.compositorUsed = {
            description: r.description,
            reason: r.reason,
            engine: i(r.Engn)
        }, r.Vrsn && (n.compositorUsed.version = r.Vrsn), r.psVersion && (n.compositorUsed.photoshopVersion = r.psVersion), r.enableCompCore && (n.compositorUsed.enableCompCore = i(r.enableCompCore)), r.enableCompCoreGPU && (n.compositorUsed.enableCompCoreGPU = i(r.enableCompCoreGPU)), r.enableCompCoreThreads && (n.compositorUsed.enableCompCoreThreads = i(r.enableCompCoreThreads)), r.compCoreSupport && (n.compositorUsed.compCoreSupport = i(r.compCoreSupport)), r.compCoreGPUSupport && (n.compositorUsed.compCoreGPUSupport = i(r.compCoreGPUSupport)), (0, d.skipBytes)(e, t())
    }, function(e, n) {
        var t = n.compositorUsed,
            r = {
                Vrsn: t.version || {
                    major: 1,
                    minor: 0,
                    fix: 0
                }
            };
        t.photoshopVersion && (r.psVersion = t.photoshopVersion), r.description = t.description, r.reason = t.reason, r.Engn = "Engn.".concat(t.engine), t.enableCompCore && (r.enableCompCore = "enable.".concat(t.enableCompCore)), t.enableCompCoreGPU && (r.enableCompCoreGPU = "enable.".concat(t.enableCompCoreGPU)), t.enableCompCoreThreads && (r.enableCompCoreThreads = "enable.".concat(t.enableCompCoreThreads)), t.compCoreSupport && (r.compCoreSupport = "reason.".concat(t.compCoreSupport)), t.compCoreGPUSupport && (r.compCoreGPUSupport = "reason.".concat(t.compCoreGPUSupport)), (0, v.writeVersionAndDescriptor)(e, "", "null", r)
    });
    R("extn", function(e) {
        return e._extn !== void 0
    }, function(e, n) {
        var t = (0, v.readVersionAndDescriptor)(e);
        Ne.MOCK_HANDLERS && (n._extn = t)
    }, function(e, n) {
        Ne.MOCK_HANDLERS && (0, v.writeVersionAndDescriptor)(e, "", "null", n._extn)
    });
    R("iOpa", se("fillOpacity"), function(e, n) {
        n.fillOpacity = (0, d.readUint8)(e) / 255, (0, d.skipBytes)(e, 3)
    }, function(e, n) {
        (0, p.writeUint8)(e, n.fillOpacity * 255), (0, p.writeZeros)(e, 3)
    });
    R("brst", se("channelBlendingRestrictions"), function(e, n, t) {
        for (n.channelBlendingRestrictions = []; t() > 4;) n.channelBlendingRestrictions.push((0, d.readInt32)(e))
    }, function(e, n) {
        for (var t = 0, r = n.channelBlendingRestrictions; t < r.length; t++) {
            var i = r[t];
            (0, p.writeInt32)(e, i)
        }
    });
    R("tsly", se("transparencyShapesLayer"), function(e, n) {
        n.transparencyShapesLayer = !!(0, d.readUint8)(e), (0, d.skipBytes)(e, 3)
    }, function(e, n) {
        (0, p.writeUint8)(e, n.transparencyShapesLayer ? 1 : 0), (0, p.writeZeros)(e, 3)
    })
});
var En = Ee(H => {
    "use strict";
    var gn = H && H.__assign || function() {
        return gn = Object.assign || function(e) {
            for (var n, t = 1, r = arguments.length; t < r; t++) {
                n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }, gn.apply(this, arguments)
    };
    Object.defineProperty(H, "__esModule", {
        value: !0
    });
    H.writeColor = H.writePsd = H.writeSection = H.writeUnicodeStringWithPadding = H.writeUnicodeString = H.writeUnicodeStringWithoutLengthLE = H.writeUnicodeStringWithoutLength = H.writePascalString = H.writeAsciiString = H.writeSignature = H.writeZeros = H.writeBytes = H.writeFixedPointPath32 = H.writeFixedPoint32 = H.writeFloat64 = H.writeFloat32 = H.writeUint32 = H.writeInt32LE = H.writeInt32 = H.writeUint16LE = H.writeUint16 = H.writeInt16 = H.writeUint8 = H.getWriterBufferNoCopy = H.getWriterBuffer = H.createWriter = void 0;
    var we = dn(),
        Ns = Mt(),
        _s = sr();

    function Hs(e) {
        e === void 0 && (e = 4096);
        var n = new ArrayBuffer(e),
            t = new DataView(n),
            r = 0;
        return {
            buffer: n,
            view: t,
            offset: r,
            tempBuffer: void 0
        }
    }
    H.createWriter = Hs;

    function js(e) {
        return e.buffer.slice(0, e.offset)
    }
    H.getWriterBuffer = js;

    function Ws(e) {
        return new Uint8Array(e.buffer, 0, e.offset)
    }
    H.getWriterBufferNoCopy = Ws;

    function ce(e, n) {
        var t = un(e, 1);
        e.view.setUint8(t, n)
    }
    H.writeUint8 = ce;

    function zn(e, n) {
        var t = un(e, 2);
        e.view.setInt16(t, n, !1)
    }
    H.writeInt16 = zn;

    function ee(e, n) {
        var t = un(e, 2);
        e.view.setUint16(t, n, !1)
    }
    H.writeUint16 = ee;

    function Pa(e, n) {
        var t = un(e, 2);
        e.view.setUint16(t, n, !0)
    }
    H.writeUint16LE = Pa;

    function Be(e, n) {
        var t = un(e, 4);
        e.view.setInt32(t, n, !1)
    }
    H.writeInt32 = Be;

    function Xs(e, n) {
        var t = un(e, 4);
        e.view.setInt32(t, n, !0)
    }
    H.writeInt32LE = Xs;

    function ln(e, n) {
        var t = un(e, 4);
        e.view.setUint32(t, n, !1)
    }
    H.writeUint32 = ln;

    function qs(e, n) {
        var t = un(e, 4);
        e.view.setFloat32(t, n, !1)
    }
    H.writeFloat32 = qs;

    function xr(e, n) {
        var t = un(e, 8);
        e.view.setFloat64(t, n, !1)
    }
    H.writeFloat64 = xr;

    function Ys(e, n) {
        Be(e, n * 65536)
    }
    H.writeFixedPoint32 = Ys;

    function Zs(e, n) {
        Be(e, n * (1 << 24))
    }
    H.writeFixedPointPath32 = Zs;

    function Ht(e, n) {
        if (n) {
            ka(e, e.offset + n.length);
            var t = new Uint8Array(e.buffer);
            t.set(n, e.offset), e.offset += n.length
        }
    }
    H.writeBytes = Ht;

    function Gn(e, n) {
        for (var t = 0; t < n; t++) ce(e, 0)
    }
    H.writeZeros = Gn;

    function Cn(e, n) {
        if (n.length !== 4) throw new Error("Invalid signature: '".concat(n, "'"));
        for (var t = 0; t < 4; t++) ce(e, n.charCodeAt(t))
    }
    H.writeSignature = Cn;

    function Ks(e, n) {
        for (var t = 0; t < n.length; t++) ce(e, n.charCodeAt(t))
    }
    H.writeAsciiString = Ks;

    function kr(e, n, t) {
        var r = n.length;
        if (r > 255) throw new Error("String too long");
        ce(e, r);
        for (var i = 0; i < r; i++) {
            var a = n.charCodeAt(i);
            ce(e, a < 128 ? a : 63)
        }
        for (; ++r % t;) ce(e, 0)
    }
    H.writePascalString = kr;

    function Da(e, n) {
        for (var t = 0; t < n.length; t++) ee(e, n.charCodeAt(t))
    }
    H.writeUnicodeStringWithoutLength = Da;

    function Js(e, n) {
        for (var t = 0; t < n.length; t++) Pa(e, n.charCodeAt(t))
    }
    H.writeUnicodeStringWithoutLengthLE = Js;

    function Qs(e, n) {
        ln(e, n.length), Da(e, n)
    }
    H.writeUnicodeString = Qs;

    function $s(e, n) {
        ln(e, n.length + 1);
        for (var t = 0; t < n.length; t++) ee(e, n.charCodeAt(t));
        ee(e, 0)
    }
    H.writeUnicodeStringWithPadding = $s;

    function Ua(e) {
        e === void 0 && (e = []);
        for (var n = 0, t = 0, r = e; t < r.length; t++) {
            var i = r[t];
            if (i.canvas || i.imageData) {
                var a = Mr(i),
                    o = a.width,
                    s = a.height;
                n = Math.max(n, 2 * s + 2 * o * s)
            }
            i.children && (n = Math.max(n, Ua(i.children)))
        }
        return n
    }

    function qe(e, n, t, r, i) {
        r === void 0 && (r = !1), i === void 0 && (i = !1), i && ln(e, 0);
        var a = e.offset;
        ln(e, 0), t();
        for (var o = e.offset - a - 4, s = o; s % n;) ce(e, 0), s++;
        r && (o = s), e.view.setUint32(a, o, !1)
    }
    H.writeSection = qe;

    function Aa(e) {
        var n;
        (n = e.children) === null || n === void 0 || n.forEach(Aa);
        var t = e.imageData;
        if (t && (t.data instanceof Uint32Array || t.data instanceof Uint16Array)) throw new Error("imageData has incorrect bitDepth");
        if ("mask" in e && e.mask) {
            var r = e.mask.imageData;
            if (r && (r.data instanceof Uint32Array || r.data instanceof Uint16Array)) throw new Error("mask imageData has incorrect bitDepth")
        }
    }

    function el(e, n, t) {
        var r;
        if (t === void 0 && (t = {}), !(+n.width > 0 && +n.height > 0)) throw new Error("Invalid document size");
        if ((n.width > 3e4 || n.height > 3e4) && !t.psb) throw new Error("Document size is too large (max is 30000x30000, use PSB format instead)");
        var i = (r = n.bitsPerChannel) !== null && r !== void 0 ? r : 8;
        if (i !== 8) throw new Error("bitsPerChannel other than 8 are not supported for writing");
        Aa(n);
        var a = gn({}, n.imageResources),
            o = gn(gn({}, t), {
                layerIds: new Set,
                layerToId: new Map
            });
        o.generateThumbnail && (a.thumbnail = ol(n));
        var s = n.imageData;
        if (!s && n.canvas && (s = n.canvas.getContext("2d").getImageData(0, 0, n.canvas.width, n.canvas.height)), s && (n.width !== s.width || n.height !== s.height)) throw new Error("Document canvas must have the same size as document");
        var l = !!s && (0, we.hasAlpha)(s),
            u = Math.max(Ua(n.children), 8 * n.width * n.height + 2 * n.height);
        e.tempBuffer = new Uint8Array(u), Cn(e, "8BPS"), ee(e, t.psb ? 2 : 1), Gn(e, 6), ee(e, l ? 4 : 3), ln(e, n.height), ln(e, n.width), ee(e, i), ee(e, 3), qe(e, 1, function() {
            var A, k, L;
            if (n.palette) {
                for (var M = 0; M < 256; M++) ce(e, ((A = n.palette[M]) === null || A === void 0 ? void 0 : A.r) || 0);
                for (var M = 0; M < 256; M++) ce(e, ((k = n.palette[M]) === null || k === void 0 ? void 0 : k.g) || 0);
                for (var M = 0; M < 256; M++) ce(e, ((L = n.palette[M]) === null || L === void 0 ? void 0 : L.b) || 0)
            }
        });
        var c = [];
        xa(c, n.children), c.length || c.push({}), a.layersGroup = c.map(function(A) {
            return A.linkGroup || 0
        }), a.layerGroupsEnabledId = c.map(function(A) {
            return A.linkGroupEnabled == !1 ? 0 : 1
        }), qe(e, 1, function() {
            for (var A = function(V) {
                    for (var N = V.has(a), q = N === !1 ? 0 : N === !0 ? 1 : N, J = function(O) {
                            Cn(e, "8BIM"), ee(e, V.key), kr(e, "", 2), qe(e, 2, function() {
                                return V.write(e, a, O)
                            })
                        }, D = 0; D < q; D++) J(D)
                }, k = 0, L = _s.resourceHandlers; k < L.length; k++) {
                var M = L[k];
                A(M)
            }
        }), qe(e, 2, function() {
            nl(e, c, n, l, o), il(e, n.globalLayerMaskInfo), Ea(e, n, n, o)
        }, void 0, !!o.psb);
        var h = l ? [0, 1, 2, 3] : [0, 1, 2],
            m = s ? s.width : n.width,
            S = s ? s.height : n.height,
            y = {
                data: new Uint8Array(m * S * 4),
                width: m,
                height: S
            };
        if (ee(e, 1), we.RAW_IMAGE_DATA && n.imageDataRaw) console.log("writing raw image data"), Ht(e, n.imageDataRaw);
        else {
            if (s && y.data.set(new Uint8Array(s.data.buffer, s.data.byteOffset, s.data.byteLength)), l)
                for (var b = y.width * y.height * 4, P = y.data, g = 0; g < b; g += 4) {
                    var F = P[g + 3];
                    if (F != 0 && F != 255) {
                        var C = F / 255,
                            I = 255 * (1 - C);
                        P[g + 0] = P[g + 0] * C + I, P[g + 1] = P[g + 1] * C + I, P[g + 2] = P[g + 2] * C + I
                    }
                }
            Ht(e, (0, we.writeDataRLE)(e.tempBuffer, y, h, !!t.psb))
        }
    }
    H.writePsd = el;

    function nl(e, n, t, r, i) {
        qe(e, 4, function() {
            var a;
            zn(e, r ? -n.length : n.length);
            for (var o = n.map(function(P, g) {
                    return sl(e.tempBuffer, P, g === 0, i)
                }), s = function(P) {
                    var g = P.layer,
                        F = P.top,
                        C = P.left,
                        I = P.bottom,
                        A = P.right,
                        k = P.channels;
                    Be(e, F), Be(e, C), Be(e, I), Be(e, A), ee(e, k.length);
                    for (var L = 0, M = k; L < M.length; L++) {
                        var V = M[L];
                        zn(e, V.channelId), i.psb && ln(e, 0), ln(e, V.length)
                    }
                    Cn(e, "8BIM"), Cn(e, we.fromBlendMode[g.blendMode] || "norm"), ce(e, Math.round((0, we.clamp)((a = g.opacity) !== null && a !== void 0 ? a : 1, 0, 1) * 255)), ce(e, g.clipping ? 1 : 0);
                    var N = 8;
                    g.transparencyProtected && (N |= 1), g.hidden && (N |= 2), (g.vectorMask || g.sectionDivider && g.sectionDivider.type !== 0 || g.adjustment) && (N |= 16), g.effectsOpen && (N |= 32), ce(e, N), ce(e, 0), qe(e, 1, function() {
                        tl(e, g, P), rl(e, g), kr(e, (g.name || "").substring(0, 255), 4), Ea(e, g, t, i)
                    })
                }, l = 0, u = o; l < u.length; l++) {
                var c = u[l];
                s(c)
            }
            for (var h = 0, m = o; h < m.length; h++)
                for (var c = m[h], S = 0, y = c.channels; S < y.length; S++) {
                    var b = y[S];
                    ee(e, b.compression), b.buffer && Ht(e, b.buffer)
                }
        }, !0, i.psb)
    }

    function tl(e, n, t) {
        var r = n.mask,
            i = n.realMask;
        qe(e, 1, function() {
            if (!(!r && !i)) {
                var a = 0,
                    o = 0,
                    s = 0;
                r && (r.userMaskDensity !== void 0 && (a |= 1), r.userMaskFeather !== void 0 && (a |= 2), r.vectorMaskDensity !== void 0 && (a |= 4), r.vectorMaskFeather !== void 0 && (a |= 8), r.disabled && (o |= 2), r.positionRelativeToLayer && (o |= 1), r.fromVectorData && (o |= 8), a && (o |= 16));
                var l = t.mask || {};
                if (Be(e, l.top || 0), Be(e, l.left || 0), Be(e, l.bottom || 0), Be(e, l.right || 0), ce(e, r && r.defaultColor || 0), ce(e, o), i) {
                    i.disabled && (s |= 2), i.positionRelativeToLayer && (s |= 1), i.fromVectorData && (s |= 8);
                    var u = t.realMask || {};
                    ce(e, s), ce(e, i.defaultColor || 0), Be(e, u.top || 0), Be(e, u.left || 0), Be(e, u.bottom || 0), Be(e, u.right || 0)
                }
                a && r && (ce(e, a), r.userMaskDensity !== void 0 && ce(e, Math.round(r.userMaskDensity * 255)), r.userMaskFeather !== void 0 && xr(e, r.userMaskFeather), r.vectorMaskDensity !== void 0 && ce(e, Math.round(r.vectorMaskDensity * 255)), r.vectorMaskFeather !== void 0 && xr(e, r.vectorMaskFeather)), Gn(e, 2)
            }
        })
    }

    function _t(e, n) {
        ce(e, n[0]), ce(e, n[1]), ce(e, n[2]), ce(e, n[3])
    }

    function rl(e, n) {
        qe(e, 1, function() {
            var t = n.blendingRanges;
            if (t) {
                _t(e, t.compositeGrayBlendSource), _t(e, t.compositeGraphBlendDestinationRange);
                for (var r = 0, i = t.ranges; r < i.length; r++) {
                    var a = i[r];
                    _t(e, a.sourceRange), _t(e, a.destRange)
                }
            }
        })
    }

    function il(e, n) {
        qe(e, 1, function() {
            n && (ee(e, n.overlayColorSpace), ee(e, n.colorSpace1), ee(e, n.colorSpace2), ee(e, n.colorSpace3), ee(e, n.colorSpace4), ee(e, n.opacity * 255), ce(e, n.kind), Gn(e, 3))
        })
    }

    function Ea(e, n, t, r) {
        for (var i = function(l) {
                var u = l.key;
                if (u === "Txt2" && r.invalidateTextLayers) return "continue";
                if (u === "vmsk" && r.psb && (u = "vsms"), l.has(n)) {
                    var c = r.psb && we.largeAdditionalInfoKeys.indexOf(u) !== -1,
                        h = u !== "Txt2" && u !== "cinf" && u !== "extn" && u !== "CAI " && u !== "OCIO",
                        m = u === "Txt2" || u === "luni" || u === "vmsk" || u === "artb" || u === "artd" || u === "vogk" || u === "SoLd" || u === "lnk2" || u === "vscg" || u === "vsms" || u === "GdFl" || u === "lmfx" || u === "lrFX" || u === "cinf" || u === "PlLd" || u === "Anno" || u === "CAI " || u === "OCIO" || u === "GenI" || u === "FEid" || u === "curv" || u === "CgEd" || u === "vibA" || u === "blwh" || u === "grdm";
                    Cn(e, c ? "8B64" : "8BIM"), Cn(e, u), qe(e, m ? 4 : 2, function() {
                        l.write(e, n, t, r)
                    }, h, c)
                }
            }, a = 0, o = Ns.infoHandlers; a < o.length; a++) {
            var s = o[a];
            i(s)
        }
    }

    function xa(e, n) {
        if (n)
            for (var t = 0, r = n; t < r.length; t++) {
                var i = r[t];
                if (i.children && i.canvas) throw new Error("Invalid layer, cannot have both 'canvas' and 'children' properties");
                if (i.children && i.imageData) throw new Error("Invalid layer, cannot have both 'imageData' and 'children' properties");
                i.children ? (e.push({
                    name: "</Layer group>",
                    sectionDivider: {
                        type: 3
                    }
                }), xa(e, i.children), e.push(gn(gn({}, i), {
                    blendMode: i.blendMode === "pass through" ? "normal" : i.blendMode,
                    sectionDivider: {
                        type: i.opened === !1 ? 2 : 1,
                        key: we.fromBlendMode[i.blendMode] || "pass",
                        subType: 0
                    }
                }))) : e.push(gn({}, i))
            }
    }

    function al(e, n) {
        var t = e.buffer.byteLength;
        do t *= 2; while (n > t);
        var r = new ArrayBuffer(t),
            i = new Uint8Array(r),
            a = new Uint8Array(e.buffer);
        i.set(a), e.buffer = r, e.view = new DataView(e.buffer)
    }

    function ka(e, n) {
        n > e.buffer.byteLength && al(e, n)
    }

    function un(e, n) {
        var t = e.offset;
        return ka(e, e.offset += n), t
    }

    function ol(e) {
        var n = (0, we.createCanvas)(10, 10),
            t = 1;
        e.width > e.height ? (n.width = 160, n.height = Math.floor(e.height * (n.width / e.width)), t = n.width / e.width) : (n.height = 160, n.width = Math.floor(e.width * (n.height / e.height)), t = n.height / e.height);
        var r = n.getContext("2d");
        return r.scale(t, t), e.imageData ? r.drawImage((0, we.imageDataToCanvas)(e.imageData), 0, 0) : e.canvas && r.drawImage(e.canvas, 0, 0), n
    }

    function Fa(e, n, t, r, i, a) {
        var o = r.top | 0,
            s = r.left | 0,
            l = r.right | 0,
            u = r.bottom | 0,
            c = Mr(r),
            h = c.width,
            m = c.height,
            S = r.imageData;
        if (!S && r.canvas && h && m && (S = r.canvas.getContext("2d").getImageData(0, 0, h, m)), S && (S.width !== h || S.height !== m)) throw new Error("Invalid imageData dimentions");
        l = s + h, u = o + m;
        var y, b;
        we.RAW_IMAGE_DATA && t[a ? "realMaskDataRaw" : "maskDataRaw"] ? (y = t[a ? "realMaskDataRaw" : "maskDataRaw"], b = t[a ? "realMaskDataRawCompression" : "maskDataRawCompression"]) : S ? i.compress ? (y = (0, we.writeDataZipWithoutPrediction)(S, [0]), b = 2) : (y = (0, we.writeDataRLE)(e, S, [0], !!i.psb), b = 1) : (y = new Uint8Array(0), b = 1), n.channels.push({
            channelId: a ? -3 : -2,
            compression: b,
            buffer: y,
            length: 2 + y.length
        }), n[a ? "realMask" : "mask"] = {
            top: o,
            left: s,
            right: l,
            bottom: u
        }
    }

    function sl(e, n, t, r) {
        var i = ul(e, n, t, r);
        return n.mask && Fa(e, i, n, n.mask, r, !1), n.realMask && Fa(e, i, n, n.realMask, r, !0), i
    }

    function Mr(e) {
        var n, t, r, i, a = e.canvas,
            o = e.imageData,
            s = (t = (n = o?.width) !== null && n !== void 0 ? n : a?.width) !== null && t !== void 0 ? t : 0,
            l = (i = (r = o?.height) !== null && r !== void 0 ? r : a?.height) !== null && i !== void 0 ? i : 0;
        return {
            width: s,
            height: l
        }
    }

    function ll(e, n, t, r, i) {
        if (e.data instanceof Uint32Array || e.data instanceof Uint16Array) throw new Error("imageData has incorrect bit depth");
        for (var a = (0, we.createImageData)(r, i), o = e.data, s = a.data, l = 0; l < i; l++)
            for (var u = 0; u < r; u++) {
                var c = (u + n + (l + t) * e.width) * 4,
                    h = (u + l * r) * 4;
                s[h] = o[c], s[h + 1] = o[c + 1], s[h + 2] = o[c + 2], s[h + 3] = o[c + 3]
            }
        return a
    }

    function ul(e, n, t, r) {
        var i, a = n.top | 0,
            o = n.left | 0,
            s = n.right | 0,
            l = n.bottom | 0,
            u = [{
                channelId: -1,
                compression: 0,
                buffer: void 0,
                length: 2
            }, {
                channelId: 0,
                compression: 0,
                buffer: void 0,
                length: 2
            }, {
                channelId: 1,
                compression: 0,
                buffer: void 0,
                length: 2
            }, {
                channelId: 2,
                compression: 0,
                buffer: void 0,
                length: 2
            }],
            c = Mr(n),
            h = c.width,
            m = c.height;
        if (!(n.canvas || n.imageData) || !h || !m) return s = o, l = a, {
            layer: n,
            top: a,
            left: o,
            right: s,
            bottom: l,
            channels: u
        };
        s = o + h, l = a + m;
        var S = n.imageData || n.canvas.getContext("2d").getImageData(0, 0, h, m);
        if (r.trimImageData) {
            var y = cl(S);
            if (y.left !== 0 || y.top !== 0 || y.right !== S.width || y.bottom !== S.height) {
                if (o += y.left, a += y.top, s -= S.width - y.right, l -= S.height - y.bottom, h = s - o, m = l - a, !h || !m) return {
                    layer: n,
                    top: a,
                    left: o,
                    right: s,
                    bottom: l,
                    channels: u
                };
                S = ll(S, y.left, y.top, h, m)
            }
        }
        var b = [0, 1, 2];
        return (!t || r.noBackground || n.mask || (0, we.hasAlpha)(S) || we.RAW_IMAGE_DATA && (!((i = n.imageDataRaw) === null || i === void 0) && i[-1])) && b.unshift(-1), u = b.map(function(P) {
            var g = (0, we.offsetForChannel)(P, !1),
                F, C;
            return we.RAW_IMAGE_DATA && n.imageDataRaw ? (F = n.imageDataRaw[P], C = n.imageDataRawCompression[P]) : r.compress ? (F = (0, we.writeDataZipWithoutPrediction)(S, [g]), C = 2) : (F = (0, we.writeDataRLE)(e, S, [g], !!r.psb), C = 1), {
                channelId: P,
                compression: C,
                buffer: F,
                length: 2 + F.length
            }
        }), {
            layer: n,
            top: a,
            left: o,
            right: s,
            bottom: l,
            channels: u
        }
    }

    function Ia(e, n, t, r) {
        for (var i = e.data, a = e.width, o = (n * a + t) * 4 + 3 | 0, s = o + (r - t) * 4 | 0, l = o; l < s; l = l + 4 | 0)
            if (i[l] !== 0) return !1;
        return !0
    }

    function Ca(e, n, t, r) {
        for (var i = e.data, a = e.width, o = a * 4 | 0, s = t * o + n * 4 + 3 | 0, l = t, u = s; l < r; l++, u = u + o | 0)
            if (i[u] !== 0) return !1;
        return !0
    }

    function cl(e) {
        for (var n = 0, t = 0, r = e.width, i = e.height; n < i && Ia(e, n, t, r);) n++;
        for (; i > n && Ia(e, i - 1, t, r);) i--;
        for (; t < r && Ca(e, t, n, i);) t++;
        for (; r > t && Ca(e, r - 1, n, i);) r--;
        return {
            top: n,
            left: t,
            right: r,
            bottom: i
        }
    }

    function dl(e, n) {
        n ? "r" in n ? (ee(e, 0), ee(e, Math.round(n.r * 257)), ee(e, Math.round(n.g * 257)), ee(e, Math.round(n.b * 257)), ee(e, 0)) : "fr" in n ? (ee(e, 0), ee(e, Math.round(n.fr * 255 * 257)), ee(e, Math.round(n.fg * 255 * 257)), ee(e, Math.round(n.fb * 255 * 257)), ee(e, 0)) : "l" in n ? (ee(e, 7), zn(e, Math.round(n.l * 1e4)), zn(e, Math.round(n.a < 0 ? n.a * 12800 : n.a * 12700)), zn(e, Math.round(n.b < 0 ? n.b * 12800 : n.b * 12700)), ee(e, 0)) : "h" in n ? (ee(e, 1), ee(e, Math.round(n.h * 65535)), ee(e, Math.round(n.s * 65535)), ee(e, Math.round(n.b * 65535)), ee(e, 0)) : "c" in n ? (ee(e, 2), ee(e, Math.round(n.c * 257)), ee(e, Math.round(n.m * 257)), ee(e, Math.round(n.y * 257)), ee(e, Math.round(n.k * 257))) : (ee(e, 8), ee(e, Math.round(n.k * 1e4 / 255)), Gn(e, 6)) : (ee(e, 0), Gn(e, 8))
    }
    H.writeColor = dl
});
var Ta = Ee(Nn => {
    "use strict";
    var jt = Nn && Nn.__assign || function() {
        return jt = Object.assign || function(e) {
            for (var n, t = 1, r = arguments.length; t < r; t++) {
                n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }, jt.apply(this, arguments)
    };
    Object.defineProperty(Nn, "__esModule", {
        value: !0
    });
    Nn.readAbr = void 0;
    var Q = bt(),
        Fe = fn(),
        fl = ["off", "fade", "pen pressure", "pen tilt", "stylus wheel", "initial direction", "direction", "initial rotation", "rotation"],
        Ma = ["round point", "round blunt", "round curve", "round angle", "round fan", "flat point", "flat blunt", "flat curve", "flat angle", "flat fan"],
        pl = ["erodible point", "erodible flat", "erodible round", "erodible square", "erodible triangle", "custom"],
        hl = {
            _: "brush",
            MixB: "mixer brush",
            SmTl: "smudge brush"
        };

    function ke(e) {
        return {
            control: fl[e.bVTy],
            steps: e.fStp,
            jitter: (0, Q.parsePercent)(e.jitter),
            minimum: (0, Q.parsePercent)(e["Mnm "])
        }
    }

    function La(e) {
        switch (e._classID) {
            case "computedBrush":
                return {
                    type: "computed", size: (0, Q.parseUnitsToNumber)(e.Dmtr, "Pixels"), angle: (0, Q.parseAngle)(e.Angl), roundness: (0, Q.parsePercent)(e.Rndn), spacingOn: e.Intr, spacing: (0, Q.parsePercent)(e.Spcn), flipX: e.flipX, flipY: e.flipY, hardness: (0, Q.parsePercent)(e.Hrdn)
                };
            case "sampledBrush":
                return {
                    type: "sampled", size: (0, Q.parseUnitsToNumber)(e.Dmtr, "Pixels"), angle: (0, Q.parseAngle)(e.Angl), roundness: (0, Q.parsePercent)(e.Rndn), spacingOn: e.Intr, spacing: (0, Q.parsePercent)(e.Spcn), flipX: e.flipX, flipY: e.flipY, name: e["Nm  "], sampledData: e.sampledData
                };
            case "dBrush":
                return {
                    type: "dynamic", shape: Ma[e["Shp "]], angle: (0, Q.parseAngle)(e.Angl), size: (0, Q.parseUnitsToNumber)(e.Dmtr, "Pixels"), density: (0, Q.parsePercent)(e.Dnst), length: (0, Q.parsePercent)(e.Lngt), clumping: (0, Q.parsePercent)(e.clumping), thickness: (0, Q.parsePercent)(e.thickness), stiffness: (0, Q.parsePercent)(e.stiffness), physics: e.physics, spacing: (0, Q.parsePercent)(e.Spcn), spacingOn: e.Intr, flipX: e.flipX, flipY: e.flipY
                };
            case "dTips":
                return jt(jt({
                    type: "tips",
                    angle: (0, Q.parseAngle)(e.Angl),
                    size: (0, Q.parseUnitsToNumber)(e.Dmtr, "Pixels"),
                    shape: Ma[e["Shp "]],
                    physics: e.physics,
                    spacing: (0, Q.parsePercent)(e.Spcn),
                    spacingOn: e.Intr,
                    flipX: e.flipX,
                    flipY: e.flipY,
                    tipsType: pl[e.dtipsType],
                    tipsLengthRatio: (0, Q.parsePercent)(e.dtipsLengthRatio),
                    tipsHardness: (0, Q.parsePercent)(e.dtipsHardness)
                }, e.dtipsGridSize && e.dtipsErodibleTipHeightMap ? {
                    tipsGridSize: e.dtipsGridSize,
                    tipsErodibleTipHeightMap: vl(e.dtipsErodibleTipHeightMap)
                } : {}), {
                    tipsAirbrushCutoffAngle: e.dtipsAirbrushCutoffAngle,
                    tipsAirbrushGranularity: (0, Q.parsePercent)(e.dtipsAirbrushGranularity),
                    tipsAirbrushStreakiness: (0, Q.parsePercent)(e.dtipsAirbrushStreakiness),
                    tipsAirbrushSplatSize: (0, Q.parsePercent)(e.dtipsAirbrushSplatSize),
                    tipsAirbrushSplatCount: e.dtipsAirbrushSplatCount
                });
            default:
                throw console.log(yn("node:util").inspect(e, !1, 99, !0)), new Error("Unknown brush classId: ".concat(e._classID))
        }
    }

    function vl(e) {
        for (var n = [], t = 0; t < e.byteLength; t++) n.push(e[t]);
        return n
    }

    function ml(e, n) {
        var t, r, i, a;
        n === void 0 && (n = {});
        var o = (0, Fe.createReader)(e.buffer, e.byteOffset, e.byteLength),
            s = (0, Fe.readInt16)(o),
            l = [],
            u = [],
            c = [];
        if (s === 1 || s === 2) throw new Error("Unsupported ABR version (".concat(s, ")"));
        if (s === 6 || s === 7 || s === 9 || s === 10) {
            var h = (0, Fe.readInt16)(o);
            if (h !== 1 && h !== 2) throw new Error("Unsupported ABR minor version");
            for (; o.offset < o.view.byteLength;) {
                (0, Fe.checkSignature)(o, "8BIM");
                var m = (0, Fe.readSignature)(o),
                    S = (0, Fe.readUint32)(o),
                    y = o.offset + S;
                switch (m) {
                    case "samp": {
                        for (; o.offset < y;) {
                            for (var b = (0, Fe.readUint32)(o); b & 3;) b++;
                            var P = o.offset + b,
                                g = (0, Fe.readPascalString)(o, 1);
                            (0, Fe.skipBytes)(o, h === 1 ? 10 : 264);
                            var F = (0, Fe.readInt32)(o),
                                C = (0, Fe.readInt32)(o),
                                I = (0, Fe.readInt32)(o) - F,
                                A = (0, Fe.readInt32)(o) - C;
                            if (A <= 0 || I <= 0) throw new Error("Invalid bounds");
                            var k = (0, Fe.readInt16)(o),
                                L = (0, Fe.readUint8)(o),
                                M = new Uint8Array(A * I);
                            if (k === 8)
                                if (L === 0) M.set((0, Fe.readBytes)(o, M.byteLength));
                                else if (L === 1)(0, Fe.readDataRLE)(o, {
                                width: A,
                                height: I,
                                data: M
                            }, A, I, k, 1, [0], !1);
                            else throw new Error("Invalid compression");
                            else if (k === 16)
                                if (L === 0)
                                    for (var V = 0; V < M.byteLength; V++) M[V] = (0, Fe.readUint16)(o) >> 8;
                                else throw L === 1 ? new Error("not implemented (16bit RLE)") : new Error("Invalid compression");
                            else throw new Error("Invalid depth");
                            l.push({
                                id: g,
                                bounds: {
                                    x: C,
                                    y: F,
                                    w: A,
                                    h: I
                                },
                                alpha: M
                            }), o.offset = P
                        }
                        break
                    }
                    case "desc": {
                        for (var N = (0, Q.readVersionAndDescriptor)(o, !0), q = 0, J = N.Brsh; q < J.length; q++) {
                            var D = J[q],
                                O = {
                                    name: D["Nm  "],
                                    shape: La(D.Brsh),
                                    spacing: (0, Q.parsePercent)(D.Spcn),
                                    wetEdges: D.Wtdg,
                                    noise: D.Nose,
                                    useBrushSize: D.useBrushSize
                                };
                            D.interpretation != null && (O.interpretation = D.interpretation), D.protectTexture != null && (O.protectTexture = D.protectTexture), D.useTipDynamics && (O.shapeDynamics = {
                                tiltScale: (0, Q.parsePercent)(D.tiltScale),
                                sizeDynamics: ke(D.szVr),
                                angleDynamics: ke(D.angleDynamics),
                                roundnessDynamics: ke(D.roundnessDynamics),
                                flipX: D.flipX,
                                flipY: D.flipY,
                                brushProjection: D.brushProjection,
                                minimumDiameter: (0, Q.parsePercent)(D.minimumDiameter),
                                minimumRoundness: (0, Q.parsePercent)(D.minimumRoundness)
                            }), D.useScatter && (O.scatter = {
                                count: D["Cnt "],
                                bothAxes: D.bothAxes,
                                countDynamics: ke(D.countDynamics),
                                scatterDynamics: ke(D.scatterDynamics)
                            }), D.useTexture && D.Txtr && (O.texture = {
                                id: D.Txtr.Idnt,
                                name: D.Txtr["Nm  "],
                                blendMode: Q.BlnM.decode(D.textureBlendMode),
                                depth: (0, Q.parsePercent)(D.textureDepth),
                                depthMinimum: (0, Q.parsePercent)(D.minimumDepth),
                                depthDynamics: ke(D.textureDepthDynamics),
                                scale: (0, Q.parsePercent)(D.textureScale),
                                invert: D.InvT,
                                brightness: D.textureBrightness,
                                contrast: D.textureContrast,
                                textureEachTip: !!D.TxtC
                            });
                            var _ = D.dualBrush;
                            _ && _.useDualBrush && (O.dualBrush = {
                                flip: _.Flip,
                                shape: La(_.Brsh),
                                blendMode: Q.BlnM.decode(_.BlnM),
                                useScatter: _.useScatter,
                                spacing: (0, Q.parsePercent)(_.Spcn),
                                count: _["Cnt "],
                                bothAxes: _.bothAxes,
                                countDynamics: ke(_.countDynamics),
                                scatterDynamics: ke(_.scatterDynamics)
                            }), D.useColorDynamics && (O.colorDynamics = {
                                foregroundBackground: ke(D.clVr),
                                hue: (0, Q.parsePercent)(D["H   "]),
                                saturation: (0, Q.parsePercent)(D.Strt),
                                brightness: (0, Q.parsePercent)(D.Brgh),
                                purity: (0, Q.parsePercent)(D.purity),
                                perTip: D.colorDynamicsPerTip
                            }), D.usePaintDynamics && (O.transfer = {
                                flowDynamics: ke(D.prVr),
                                opacityDynamics: ke(D.opVr),
                                wetnessDynamics: ke(D.wtVr),
                                mixDynamics: ke(D.mxVr)
                            }), D.useBrushPose && (O.brushPose = {
                                overrideAngle: D.overridePoseAngle,
                                overrideTiltX: D.overridePoseTiltX,
                                overrideTiltY: D.overridePoseTiltY,
                                overridePressure: D.overridePosePressure,
                                pressure: (0, Q.parsePercent)(D.brushPosePressure),
                                tiltX: D.brushPoseTiltX,
                                tiltY: D.brushPoseTiltY,
                                angle: D.brushPoseAngle
                            });
                            var x = D.toolOptions;
                            x && (O.toolOptions = {
                                type: hl[x._classID] || "brush",
                                brushPreset: x.brushPreset,
                                flow: (t = x.flow) !== null && t !== void 0 ? t : 100,
                                smooth: (r = x.Smoo) !== null && r !== void 0 ? r : 0,
                                mode: Q.BlnM.decode(x["Md  "] || "BlnM.Nrml"),
                                opacity: (i = x.Opct) !== null && i !== void 0 ? i : 100,
                                smoothing: !!x.smoothing,
                                smoothingValue: x.smoothingValue || 0,
                                smoothingRadiusMode: !!x.smoothingRadiusMode,
                                smoothingCatchup: !!x.smoothingCatchup,
                                smoothingCatchupAtEnd: !!x.smoothingCatchupAtEnd,
                                smoothingZoomCompensation: !!x.smoothingZoomCompensation,
                                pressureSmoothing: !!x.pressureSmoothing,
                                usePressureOverridesSize: !!x.usePressureOverridesSize,
                                usePressureOverridesOpacity: !!x.usePressureOverridesOpacity,
                                useLegacy: !!x.useLegacy
                            }, x.prVr && (O.toolOptions.flowDynamics = ke(x.prVr)), x.opVr && (O.toolOptions.opacityDynamics = ke(x.opVr)), x.szVr && (O.toolOptions.sizeDynamics = ke(x.szVr)), "wetness" in x && (O.toolOptions.wetness = x.wetness), "dryness" in x && (O.toolOptions.dryness = x.dryness), "mix" in x && (O.toolOptions.mix = x.mix), "autoFill" in x && (O.toolOptions.autoFill = x.autoFill), "autoClean" in x && (O.toolOptions.autoClean = x.autoClean), "loadSolidColorOnly" in x && (O.toolOptions.loadSolidColorOnly = x.loadSolidColorOnly), "sampleAllLayers" in x && (O.toolOptions.sampleAllLayers = x.sampleAllLayers), "SmdF" in x && (O.toolOptions.smudgeFingerPainting = x.SmdF), "SmdS" in x && (O.toolOptions.smudgeSampleAllLayers = x.SmdS), "Prs " in x && (O.toolOptions.strength = x["Prs "]), "SmdF" in x && (O.toolOptions.smudgeFingerPainting = x.SmdF), "SmdS" in x && (O.toolOptions.smudgeSampleAllLayers = x.SmdS)), u.push(O)
                        }
                        break
                    }
                    case "patt": {
                        for (; o.offset < y;) c.push((0, Fe.readPattern)(o));
                        o.offset = y;
                        break
                    }
                    case "phry": {
                        var N = (0, Q.readVersionAndDescriptor)(o);
                        n.logMissingFeatures && !((a = N.hierarchy) === null || a === void 0) && a.length;
                        break
                    }
                    default:
                        throw new Error("Invalid brush type: ".concat(m))
                }
                for (; S % 4;) o.offset++, S++
            }
        } else throw new Error("Unsupported ABR version (".concat(s, ")"));
        return {
            samples: l,
            patterns: c,
            brushes: u
        }
    }
    Nn.readAbr = ml
});
var Ba = Ee(_n => {
    "use strict";
    var Lr = _n && _n.__assign || function() {
        return Lr = Object.assign || function(e) {
            for (var n, t = 1, r = arguments.length; t < r; t++) {
                n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }, Lr.apply(this, arguments)
    };
    Object.defineProperty(_n, "__esModule", {
        value: !0
    });
    _n.readCsh = void 0;
    var gl = Mt(),
        je = fn();

    function yl(e) {
        var n = (0, je.createReader)(e.buffer, e.byteOffset, e.byteLength),
            t = {
                shapes: []
            };
        if ((0, je.checkSignature)(n, "cush"), (0, je.readUint32)(n) !== 2) throw new Error("Invalid version");
        for (var r = (0, je.readUint32)(n), i = 0; i < r; i++) {
            for (var a = (0, je.readUnicodeString)(n); n.offset % 4;) n.offset++;
            if ((0, je.readUint32)(n) !== 1) throw new Error("Invalid shape version");
            var o = (0, je.readUint32)(n),
                s = n.offset + o,
                l = (0, je.readPascalString)(n, 1),
                u = (0, je.readUint32)(n),
                c = (0, je.readUint32)(n),
                h = (0, je.readUint32)(n),
                m = (0, je.readUint32)(n),
                S = m - c,
                y = h - u,
                b = {
                    paths: []
                };
            (0, gl.readVectorMask)(n, b, S, y, s - n.offset), t.shapes.push(Lr({
                name: a,
                id: l,
                width: S,
                height: y
            }, b)), n.offset = s
        }
        return t
    }
    _n.readCsh = yl
});
var Oa = Ee(Ae => {
    "use strict";
    Object.defineProperty(Ae, "__esModule", {
        value: !0
    });
    Ae.Compression = Ae.ChannelID = Ae.LayerCompCapturedInfo = Ae.SectionDividerType = Ae.ColorMode = void 0;
    var Sl;
    (function(e) {
        e[e.Bitmap = 0] = "Bitmap", e[e.Grayscale = 1] = "Grayscale", e[e.Indexed = 2] = "Indexed", e[e.RGB = 3] = "RGB", e[e.CMYK = 4] = "CMYK", e[e.Multichannel = 7] = "Multichannel", e[e.Duotone = 8] = "Duotone", e[e.Lab = 9] = "Lab"
    })(Sl = Ae.ColorMode || (Ae.ColorMode = {}));
    var bl;
    (function(e) {
        e[e.Other = 0] = "Other", e[e.OpenFolder = 1] = "OpenFolder", e[e.ClosedFolder = 2] = "ClosedFolder", e[e.BoundingSectionDivider = 3] = "BoundingSectionDivider"
    })(bl = Ae.SectionDividerType || (Ae.SectionDividerType = {}));
    var wl;
    (function(e) {
        e[e.None = 0] = "None", e[e.Visibility = 1] = "Visibility", e[e.Position = 2] = "Position", e[e.Appearance = 4] = "Appearance"
    })(wl = Ae.LayerCompCapturedInfo || (Ae.LayerCompCapturedInfo = {}));
    var Fl;
    (function(e) {
        e[e.Color0 = 0] = "Color0", e[e.Color1 = 1] = "Color1", e[e.Color2 = 2] = "Color2", e[e.Color3 = 3] = "Color3", e[e.Transparency = -1] = "Transparency", e[e.UserMask = -2] = "UserMask", e[e.RealUserMask = -3] = "RealUserMask"
    })(Fl = Ae.ChannelID || (Ae.ChannelID = {}));
    var Il;
    (function(e) {
        e[e.RawData = 0] = "RawData", e[e.RleCompressed = 1] = "RleCompressed", e[e.ZipWithoutPrediction = 2] = "ZipWithoutPrediction", e[e.ZipWithPrediction = 3] = "ZipWithPrediction"
    })(Il = Ae.Compression || (Ae.Compression = {}))
});
var Va = Ee(me => {
    "use strict";
    var Cl = me && me.__createBinding || (Object.create ? (function(e, n, t, r) {
            r === void 0 && (r = t);
            var i = Object.getOwnPropertyDescriptor(n, t);
            (!i || ("get" in i ? !n.__esModule : i.writable || i.configurable)) && (i = {
                enumerable: !0,
                get: function() {
                    return n[t]
                }
            }), Object.defineProperty(e, r, i)
        }) : (function(e, n, t, r) {
            r === void 0 && (r = t), e[r] = n[t]
        })),
        Tr = me && me.__exportStar || function(e, n) {
            for (var t in e) t !== "default" && !Object.prototype.hasOwnProperty.call(n, t) && Cl(n, e, t)
        };
    Object.defineProperty(me, "__esModule", {
        value: !0
    });
    me.decodeLayerPixels = me.writePsdBuffer = me.writePsdUint8Array = me.writePsd = me.readPsd = me.byteArrayToBase64 = me.initializeCanvas = void 0;
    var Hn = En(),
        Wt = fn(),
        Pl = yn("base64-js");
    Tr(Ta(), me);
    Tr(Ba(), me);
    var Dl = dn();
    Object.defineProperty(me, "initializeCanvas", {
        enumerable: !0,
        get: function() {
            return Dl.initializeCanvas
        }
    });
    Tr(Oa(), me);
    me.byteArrayToBase64 = Pl.fromByteArray;

    function Ul(e, n) {
        var t = "buffer" in e ? (0, Wt.createReader)(e.buffer, e.byteOffset, e.byteLength) : (0, Wt.createReader)(e);
        return (0, Wt.readPsd)(t, n)
    }
    me.readPsd = Ul;

    function Al(e, n) {
        var t = (0, Hn.createWriter)();
        return (0, Hn.writePsd)(t, e, n), (0, Hn.getWriterBuffer)(t)
    }
    me.writePsd = Al;

    function Ra(e, n) {
        var t = (0, Hn.createWriter)();
        return (0, Hn.writePsd)(t, e, n), (0, Hn.getWriterBufferNoCopy)(t)
    }
    me.writePsdUint8Array = Ra;

    function El(e, n) {
        if (typeof __Buffer$ > "u") throw new Error("Buffer not supported on this platform");
        return __Buffer$.from(Ra(e, n))
    }
    me.writePsdBuffer = El;

    function xl(e, n) {
        (0, Wt.decodeLayerImageData)(e, n)
    }
    me.decodeLayerPixels = xl
});
var Xt = Ya(Va()),
    {
        __esModule: Yl,
        decodeLayerPixels: Zl,
        writePsdBuffer: Kl,
        writePsdUint8Array: Jl,
        writePsd: Ql,
        readPsd: $l,
        byteArrayToBase64: eu,
        initializeCanvas: nu,
        Compression: tu,
        ChannelID: ru,
        LayerCompCapturedInfo: iu,
        SectionDividerType: au,
        ColorMode: ou,
        readCsh: su,
        readAbr: lu
    } = Xt,
    uu = Xt.default ?? Xt;
export {
    ru as ChannelID, ou as ColorMode, tu as Compression, iu as LayerCompCapturedInfo, au as SectionDividerType, Yl as __esModule, eu as byteArrayToBase64, Zl as decodeLayerPixels, uu as
    default, nu as initializeCanvas, lu as readAbr, su as readCsh, $l as readPsd, Ql as writePsd, Kl as writePsdBuffer, Jl as writePsdUint8Array
};
//# sourceMappingURL=ag-psd.mjs.map