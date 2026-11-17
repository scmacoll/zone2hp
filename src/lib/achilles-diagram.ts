// Geometry for the calf-raise diagram in the Achilles post, ported from the
// script in the client's zone-two-clinic-notes-02.html. `achillesFrame(0)` is
// the foot flat, `achillesFrame(1)` is up on the toes. The page renders frame 0
// at build time (so the diagram is complete without JavaScript and under
// reduced motion), and the post's script animates between the two by setting
// these same SVG attributes (attributes, not inline styles, so the CSP allows it).

type Point = [number, number];

export type AchillesFrame = {
  outline: string;
  tendon: string;
  mid: string;
  ins: string;
  calc: string;
  l1: { x1: string; y1: string };
  l2: { x1: string; y1: string };
};

const B: Point = [334, 292];
const f = (n: number) => n.toFixed(1);
const P = (q: Point) => `${f(q[0])} ${f(q[1])}`;

function unit(a: Point, b: Point): Point {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
}

function bez(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}

export function achillesFrame(a: number): AchillesFrame {
  const th = (a * 22 * Math.PI) / 180;
  const c = Math.cos(th);
  const s = Math.sin(th);
  const sx = 19 * a;
  const sy = -27 * a;
  const bul = 9 * a;
  const S = (p: Point): Point => [p[0] + sx, p[1] + sy];
  const F = (p: Point): Point => {
    const dx = p[0] - B[0];
    const dy = p[1] - B[1];
    return [B[0] + dx * c - dy * s, B[1] + dx * s + dy * c];
  };

  const ank = S([288, 222]);
  const D = F([304, 258]);
  const fd = unit(F([342, 280]), D);
  const sd = unit(S([282, 168]), ank);
  const c1: Point = [D[0] + fd[0] * 20, D[1] + fd[1] * 20];
  const c2: Point = [ank[0] + sd[0] * 24, ank[1] + sd[1] * 24];
  const back = S([206, 172]);
  const heelTop = F([224, 252]);
  const hu = unit(F([224, 252]), F([224, 232]));
  const bc2: Point = [heelTop[0] + hu[0] * 22, heelTop[1] + hu[1] * 22];

  const outline =
    `M${P(S([204, -40]))} C${P(S([166 - bul, 56]))} ${P(S([160 - bul, 128]))} ${P(back)}` +
    ` C${P(S([220, 189]))} ${P(bc2)} ${P(heelTop)}` +
    ` C${P(F([222, 286]))} ${P(F([238, 298]))} ${P(F([262, 298]))}` +
    ` L${P(F([334, 298]))} L392 298 C404 298 407 288 397 284 L342 278` +
    ` C${P(F([334, 276]))} ${P(F([318, 266]))} ${P(D)}` +
    ` C${P(c1)} ${P(c2)} ${P(ank)}` +
    ` C${P(S([282, 168]))} ${P(S([274, 92]))} ${P(S([268, -40]))} Z`;

  const t0 = S([218, 170]);
  const t1 = S([226, 198]);
  const t3 = F([234, 262]);
  const tu = unit(F([234, 262]), F([232, 240]));
  const t2: Point = [t3[0] + tu[0] * 24, t3[1] + tu[1] * 24];
  const m = bez(t0, t1, t2, t3, 0.45);
  const i = F([234, 264]);

  return {
    outline,
    tendon: `M${P(t0)} C${P(t1)} ${P(t2)} ${P(t3)}`,
    mid: `translate(${f(m[0])} ${f(m[1])})`,
    ins: `translate(${f(i[0])} ${f(i[1])})`,
    calc: `rotate(${f(a * 22)} 334 292)`,
    l1: { x1: f(m[0] - 7), y1: f(m[1]) },
    l2: { x1: f(i[0] - 6), y1: f(i[1]) },
  };
}

/** The client's timing: 3.6s loop, rest, rise, hold, lower, rest; smoothstep eased. */
export function achillesAmount(ms: number): number {
  const t = (ms % 3600) / 3600;
  let a: number;
  if (t < 0.15) a = 0;
  else if (t < 0.45) a = (t - 0.15) / 0.3;
  else if (t < 0.65) a = 1;
  else if (t < 0.95) a = 1 - (t - 0.65) / 0.3;
  else a = 0;
  return a * a * (3 - 2 * a);
}
