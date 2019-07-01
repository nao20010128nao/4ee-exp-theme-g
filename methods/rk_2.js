// ルンゲ・クッタ法 二次用
// 注意: このプログラムは⊿tの項をfuncとして括り出している。
// その部分はfunctions/secondorderlag.jsを参照されたい。
const BN = require("bignumber.js");
module.exports = function*(func, x, y, t, h, len) {
  x = new BN(x);
  y = new BN(y);
  t = new BN(t);
  h = new BN(h);
  len = new BN(len);
  const hd2 = h.div(2);
  //console.log(x,t,h,len)
  const iter = +len.div(h);
  yield [t, x, y];
  for (let i = 1; i <= iter; i++) {
    const oldX = x,
      oldY = y,
      furtherT = t.plus(hd2),
      nextT = t.plus(h);
    // k[1234]はx、m[1234]はyに対応する
    const k1 = h.times(func(x, y, t));
    const m1 = h.times(x);
    const k2 = h.times(func(x.plus(k1.div(2)), y.plus(m1.div(2)), furtherT));
    const m2 = h.times(k1.div(2).plus(x));
    const k3 = h.times(func(x.plus(k2.div(2)), y.plus(m2.div(2)), furtherT));
    const m3 = h.times(k2.div(2).plus(x));
    const k4 = h.times(func(x.plus(k3), y.plus(m3), nextT));
    const m4 = h.times(k3.plus(x));
    x = oldX.plus(BN.sum(k1, k2.times(2), k3.times(2), k4).div(6));
    y = oldY.plus(BN.sum(m1, m2.times(2), m3.times(2), m4).div(6));

    t = t.plus(h);
    yield [t, x, y];
  }
};