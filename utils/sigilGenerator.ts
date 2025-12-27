type StyleOpts = {
  stroke: string;
  fill: string;
  strokeWidth: number;
};

type ElementDef = {
  colors: string[];
};

const ELEMENT_DEFINITIONS: Record<string, ElementDef> = {
  Fire: { colors: ["#FFFFFF", "#FF8C00", "#FF0000"] },
  Water: { colors: ["#FFFFFF", "#ADEFFF", "#80C0E0"] },
  Earth: { colors: ["#F0E68C", "#D2B48C", "#B8860B"] },
  Thunder: { colors: ["#FFFFFF", "#F4E361", "#9D6BFF"] },
  Light: { colors: ["#FFFFFF", "#FFFFE0", "#FFD700"] },
  Nature: { colors: ["#FFFF00", "#ADFF2F", "#00FF00"] },
  Spirit: { colors: ["#FFFFFF", "#A0D0FF", "#E0F0FF"] },
  Plasma: { colors: ["#FFFFFF", "#00FFFF", "#FF00FF"] },
  Cosmic: { colors: ["#FFFFFF", "#FFFFAA", "#AAFFFF"] },
};

const STROKE_BASE_WIDTH = 1.5;
const W_RES = 2;
const MAX_DEPTH = 6;

function R(min: number, max?: number): number {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

function RC<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function svgElm(name: string): SVGElement {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function style(stroke: string, fill: string, strokeWidth: number): StyleOpts {
  return { stroke, fill, strokeWidth };
}

function applyStyle(elm: SVGElement, styleOpts?: StyleOpts) {
  if (styleOpts) {
    if (styleOpts.stroke !== "none") elm.setAttribute("stroke", styleOpts.stroke);
    if (styleOpts.strokeWidth !== undefined && !isNaN(styleOpts.strokeWidth)) {
      elm.setAttribute("stroke-width", styleOpts.strokeWidth.toString());
    }
    elm.setAttribute("fill", styleOpts.fill);
  }
}

function addChild(parent: SVGElement, child: SVGElement | SVGElement[] | null) {
  if (!child) return parent;
  if (Array.isArray(child)) {
    child.forEach((item) => {
      if (item) parent.appendChild(item);
    });
  } else {
    parent.appendChild(child);
  }
  return parent;
}

function circle(r: number, styleOpts?: StyleOpts): SVGElement {
  const elm = svgElm("circle");
  elm.setAttribute("r", r.toString());
  applyStyle(elm, styleOpts);
  return elm;
}

function rect(w: number, h: number, styleOpts?: StyleOpts): SVGElement {
  const elm = svgElm("rect");
  elm.setAttribute("x", (-w / 2).toString());
  elm.setAttribute("y", (-h / 2).toString());
  elm.setAttribute("width", w.toString());
  elm.setAttribute("height", h.toString());
  applyStyle(elm, styleOpts);
  return elm;
}

function npoly(r: number, n: number, s: number, styleOpts?: StyleOpts): SVGElement {
  const elm = svgElm("polygon");
  const points: string[] = [];
  let c = 0;
  if (n <= 0) n = 3;
  if (s <= 0) s = 1;
  let actualPoints = 0;
  for (let i = 0; i < n && actualPoints < 50; i++) {
    const x = r * Math.cos((Math.PI * 2 * c) / n);
    const y = r * Math.sin((Math.PI * 2 * c) / n);
    points.push(x + "," + y);
    c = (c + s) % n;
    actualPoints++;
  }
  elm.setAttribute("points", points.join(" "));
  applyStyle(elm, styleOpts);
  return elm;
}

function group(child?: SVGElement | SVGElement[]): SVGElement {
  const elm = svgElm("g");
  if (child) addChild(elm, child);
  return elm;
}

function translate(x: number, y: number, child: SVGElement | SVGElement[]): SVGElement {
  const elm = svgElm("g");
  elm.setAttribute("transform", `translate(${x},${y})`);
  addChild(elm, child);
  return elm;
}

function rotate(deg: number, child: SVGElement | SVGElement[]): SVGElement {
  const elm = svgElm("g");
  elm.setAttribute("transform", `rotate(${deg})`);
  addChild(elm, child);
  return elm;
}

function scale(x: number, y: number, child: SVGElement | SVGElement[]): SVGElement {
  const elm = svgElm("g");
  elm.setAttribute("transform", `scale(${x},${y})`);
  addChild(elm, child);
  return elm;
}

function randomShape(size: number, styleOpts: StyleOpts): SVGElement {
  const r = R(0, 1);
  if (r > 0.7) return circle(size, styleOpts);
  else if (r > 0.4) return rect(size * Math.sqrt(1.9), size * Math.sqrt(1.9), styleOpts);
  else return npoly(size, 3 + Math.floor(R(0, 10)), 1 + Math.floor(R(0, 4)), styleOpts);
}

function generatePattern(
  depth: number,
  ls: number,
  gradientId: string
): SVGElement | SVGElement[] | null {
  const r_decision = R(0, 1);
  const strokeStyleToUse = `url(#${gradientId})`;
  const currentStrokeValue = Math.max(
    0.05,
    (Math.floor(R(0, STROKE_BASE_WIDTH * 10) + 1) / 10) / W_RES / ls
  );
  const st = style(strokeStyleToUse, "none", currentStrokeValue);

  if (depth >= MAX_DEPTH) {
    return randomShape(100, st);
  }

  if (r_decision > 0.7) {
    const s = R(0.8, 1.0);
    const baseShape = randomShape(100, st);
    const innerElm = generatePattern(depth + 1, ls * s, gradientId);
    return scale(s, s, group([baseShape, innerElm as SVGElement]));
  } else if (r_decision > 0.5) {
    const elmGroup = group([]);
    const rspace = R(5, 15);
    let r = 100;
    const count = Math.floor(R(1, 3));
    const npn = 3 + Math.floor(R(0, 8));
    const nps = 1 + Math.floor(R(0, npn / 2));
    const mode = Math.floor(R(0, 3));

    for (let i = 0; i < count; i++) {
      if (r <= 10) break;
      const bebelStrokeValue = Math.max(
        0.05,
        (Math.floor(R(0, STROKE_BASE_WIDTH * 10) + 1) / 10) / W_RES / (ls * (r / 100))
      );
      const bebel_st = style(strokeStyleToUse, "none", bebelStrokeValue);
      switch (mode) {
        case 0: addChild(elmGroup, circle(r, bebel_st)); break;
        case 1: addChild(elmGroup, rect(r * Math.sqrt(1.9), r * Math.sqrt(1.9), bebel_st)); break;
        case 2: addChild(elmGroup, npoly(r, npn, nps, bebel_st)); break;
      }
      r -= rspace;
    }
    const nscale = Math.max(0.1, r / 100);
    if (nscale > 0.1 && r > 10) {
      const innerGen = generatePattern(depth + 1, ls * nscale, gradientId);
      if (innerGen) addChild(elmGroup, scale(nscale, nscale, [innerGen as SVGElement]));
    }
    return elmGroup;
  } else if (r_decision > 0.3) {
    const s_angle = Math.floor(R(0, 8)) * 45;
    const innerElm = generatePattern(depth + 1, ls, gradientId);
    if (innerElm) return rotate(s_angle, group([innerElm as SVGElement]));
    return null;
  } else if (r_decision > 0.05 && depth < MAX_DEPTH - 1) {
    const ratio = R(0.35, 0.65);
    const st1 = style(
      strokeStyleToUse,
      "none",
      Math.max(0.05, (Math.floor(R(0, STROKE_BASE_WIDTH * 10) + 1) / 10) / W_RES / (ls * ratio))
    );
    const s1_shape = randomShape(100 * ratio, st1);
    const s1_inner = generatePattern(depth + 1, ls * ratio, gradientId);
    
    const s1_group = group([s1_shape]);
    if(s1_inner) addChild(s1_group, s1_inner as SVGElement);
    
    const s1 = translate(
      -100 + ratio * 100,
      0,
      [scale(ratio, ratio, s1_group)]
    );

    const st2 = style(
      strokeStyleToUse,
      "none",
      Math.max(0.05, (Math.floor(R(0, STROKE_BASE_WIDTH * 10) + 1) / 10) / W_RES / (ls * (1 - ratio)))
    );
    const s2_shape = randomShape(100 * (1 - ratio), st2);
    const s2_inner = generatePattern(depth + 1, ls * (1 - ratio), gradientId);
    
    const s2_group = group([s2_shape]);
    if(s2_inner) addChild(s2_group, s2_inner as SVGElement);

    const s2 = translate(
      100 - (1 - ratio) * 100,
      0,
      [scale(1 - ratio, 1 - ratio, s2_group)]
    );
    return group([s1, s2]);
  } else {
    const base = group();
    const petalGeneratedSize = R(0.1, 0.4);
    const numPetals = 1 << Math.floor(R(1, 3));
    const petalScaleFactor = petalGeneratedSize;
    const petalDepth = Math.min(depth + 1, MAX_DEPTH - 1);
    const petalStyle = style(
      strokeStyleToUse,
      "none",
      Math.max(0.05, (Math.floor(R(0, STROKE_BASE_WIDTH * 10) + 1) / 10) / W_RES / (ls * petalScaleFactor))
    );
    const petalShape = randomShape(100, petalStyle);
    const innerPetalShape = generatePattern(petalDepth, ls * petalScaleFactor * 0.7, gradientId);
    
    const completePetal = group([petalShape]);
    if (innerPetalShape) addChild(completePetal, scale(0.7, 0.7, [innerPetalShape as SVGElement]));
    
    const scaledPetal = scale(petalScaleFactor, petalScaleFactor, [completePetal]);
    
    for (let i = 0; i < numPetals; i++) {
      const clonedPetal = scaledPetal.cloneNode(true) as SVGElement;
      const distanceToCenter = 100 * (1 - petalScaleFactor * 0.6);
      const rotatedElm = rotate((360 * i) / numPetals, [translate(0, -distanceToCenter, [clonedPetal])]);
      addChild(base, rotatedElm);
    }
    
    const centerScaleRatio = Math.max(0.1, 1 - petalScaleFactor * numPetals * 0.3);
    if (centerScaleRatio > 0.1 && depth < MAX_DEPTH - 1) {
      const centerStyle = style(
        strokeStyleToUse,
        "none",
        Math.max(0.05, (Math.floor(R(0, STROKE_BASE_WIDTH * 10) + 1) / 10) / W_RES / (ls * centerScaleRatio))
      );
      addChild(base, scale(centerScaleRatio, centerScaleRatio, [randomShape(100, centerStyle)]));
      const centerElm = generatePattern(depth + 1, ls * centerScaleRatio * 0.6, gradientId);
      if (centerElm) addChild(base, scale(centerScaleRatio * 0.6, centerScaleRatio * 0.6, [centerElm as SVGElement]));
    }
    return base;
  }
}

function getShapePerimeter(el: SVGElement): number {
  const tagName = el.tagName.toLowerCase();

  if (tagName === "circle") {
    const r = parseFloat(el.getAttribute("r") || "0");
    return 2 * Math.PI * r;
  } else if (tagName === "rect") {
    const w = parseFloat(el.getAttribute("width") || "0");
    const h = parseFloat(el.getAttribute("height") || "0");
    return 2 * (w + h);
  } else if (tagName === "polygon") {
    const points = (el.getAttribute("points") || "").trim().split(/\s+|,/);
    let dist = 0;
    const pArr: number[] = [];
    for (let i = 0; i < points.length; i++) {
      const val = parseFloat(points[i]);
      if (!isNaN(val)) pArr.push(val);
    }
    if (pArr.length < 4) return 0;
    for (let i = 0; i < pArr.length; i += 2) {
      const x1 = pArr[i];
      const y1 = pArr[i + 1];
      const nextIndex = (i + 2) % pArr.length;
      const x2 = pArr[nextIndex];
      const y2 = pArr[nextIndex + 1];
      const dx = x2 - x1;
      const dy = y2 - y1;
      dist += Math.sqrt(dx * dx + dy * dy);
    }
    return dist;
  }
  return 100;
}

function animateSigil(targetSvg: SVGSVGElement) {
  const shapes = targetSvg.querySelectorAll("circle, rect, polygon");
  let delayCounter = 0;

  shapes.forEach((node, index) => {
    const shape = node as SVGElement;
    if (index === 0 && shape.tagName.toLowerCase() === "rect" && shape.getAttribute("width") == "240") return;

    const len = getShapePerimeter(shape);
    shape.style.strokeDasharray = len.toString();
    shape.style.strokeDashoffset = len.toString();
    shape.style.animation = `drawStroke 1.5s ease-out forwards`;
    shape.style.animationDelay = `${delayCounter}s`;

    delayCounter += 0.05;
  });
}

export function drawToSVG(svgEl: SVGSVGElement, uniqueId: string) {
  svgEl.innerHTML = "";

  const elementKeys = Object.keys(ELEMENT_DEFINITIONS);
  const chosenKey = RC(elementKeys);
  const element = ELEMENT_DEFINITIONS[chosenKey];

  const c1 = element.colors[0];
  const c2 = element.colors[1];
  const c3 = element.colors[2];

  let defs: SVGElement | null = svgEl.querySelector("defs");
  
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svgEl.appendChild(defs);
  }

  const validDefs = defs as SVGElement;
  const gradientId = `grad-${uniqueId}-${Date.now()}`;
  const radialGradient = svgElm("radialGradient");
  radialGradient.setAttribute("id", gradientId);
  radialGradient.setAttribute("cx", "50%");
  radialGradient.setAttribute("cy", "50%");
  radialGradient.setAttribute("r", "50%");
  radialGradient.setAttribute("fx", "50%");
  radialGradient.setAttribute("fy", "50%");

  const stop1 = svgElm("stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", c1);
  radialGradient.appendChild(stop1);

  const stop2 = svgElm("stop");
  stop2.setAttribute("offset", "50%");
  stop2.setAttribute("stop-color", c2);
  radialGradient.appendChild(stop2);

  const stop3 = svgElm("stop");
  stop3.setAttribute("offset", "100%");
  stop3.setAttribute("stop-color", c3);
  radialGradient.appendChild(stop3);

  validDefs.appendChild(radialGradient);

  const strokeStyleToUse = `url(#${gradientId})`;
  const frameStrokeW = Math.max(0.1, STROKE_BASE_WIDTH / 2);
  addChild(svgEl, circle(100, style(strokeStyleToUse, "none", frameStrokeW * 2)));
  addChild(svgEl, circle(92, style(strokeStyleToUse, "none", frameStrokeW * 1.2)));

  const mainPatternGroup = svgElm("g");
  const patternAreaRadius = 85;
  const patternScaleFactor = patternAreaRadius / 100;

  const mainPatternContent = generatePattern(0, 1, gradientId);

  if (mainPatternContent) {
    if(Array.isArray(mainPatternContent)) {
       const grp = group(mainPatternContent);
       addChild(mainPatternGroup, scale(patternScaleFactor, patternScaleFactor, [grp]));
    } else {
       addChild(mainPatternGroup, scale(patternScaleFactor, patternScaleFactor, [mainPatternContent]));
    }
  }
  addChild(svgEl, mainPatternGroup);

  animateSigil(svgEl);
}