/* No framework, external fonts, remote assets, or WebGL dependency.
 * The ambient scene is synthetic concept artwork — not paper output.
 * Geometry is projected from 3D and depth-sorted on a high-DPI 2D canvas.
 */
(() => {
  "use strict";
  document.getElementById("year").textContent = new Date().getFullYear();

  const dialog = document.getElementById("citation-dialog");
  const citationText = document.getElementById("citation-text");
  const copyStatus = document.getElementById("copy-status");
  let citationTrigger = null;
  document.querySelectorAll(".bibtex-button").forEach(button => {
    button.textContent = "BibTeX";
    button.addEventListener("click", () => {
      citationTrigger = button;
      citationText.value = button.dataset.bibtex;
      copyStatus.textContent = "";
      dialog.showModal();
    });
  });
  document.getElementById("close-citation").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => citationTrigger?.focus({ preventScroll: true }));
  document.getElementById("copy-citation").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(citationText.value);
      copyStatus.textContent = "Copied.";
    } catch {
      citationText.focus();
      citationText.select();
      copyStatus.textContent = "Press Ctrl+C / ⌘C to copy.";
    }
  });

  const canvas = document.getElementById("world-canvas");
  const ctx = canvas.getContext("2d");
  const playButton = document.getElementById("play-scene");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll(".paper-figure img[data-animated-src]").forEach(img => {
    const button = img.closest("figure").querySelector(".paper-motion-toggle");
    const title = img.closest("article").querySelector(".paper-short-title").textContent;
    let playing = !motionPreference.matches;
    const update = () => {
      img.src = playing ? img.dataset.animatedSrc : img.dataset.posterSrc;
      button.textContent = playing ? "Pause" : "Play";
      button.setAttribute("aria-pressed", String(playing));
      button.setAttribute("aria-label", `${playing ? "Pause" : "Play"} ${title} animation`);
    };
    button.hidden = false;
    button.addEventListener("click", () => { playing = !playing; update(); });
    motionPreference.addEventListener("change", event => {
      if (event.matches) { playing = false; update(); }
    });
    update();
  });
  const state = {
    time: 0, yaw: -0.64, pitch: 0.63,
    playing: !motionPreference.matches, visible: true
  };
  const palette = {
    building: "#b4bea8", tree: "#7f9870", road: "#a9b0a1",
    ground: "#dce0cf", orange: "#c96543", blue: "#6d8d96", cream: "#d1b785"
  };
  let width = 0, height = 0, scale = 1, cx = 0, cy = 0;
  let cosY = 1, sinY = 0, cosP = 1, sinP = 0;
  let animation = null, previousTime = 0, lastPaint = 0, needsPaint = true;
  let seed = 41;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const shadeCache = new Map();
  function shade(hex, amount) {
    const key = hex + amount;
    if (shadeCache.has(key)) return shadeCache.get(key);
    const value = Number.parseInt(hex.slice(1), 16);
    const rgb = [value >> 16, (value >> 8) & 255, value & 255]
      .map(channel => Math.max(0, Math.min(255, Math.round(channel + amount))));
    const result = `#${rgb.map(channel => channel.toString(16).padStart(2,"0")).join("")}`;
    shadeCache.set(key, result);
    return result;
  }
  const voxelBoxes = [];
  function building(x, z, w, d, h, color) {
    for (let ix = 0; ix < w; ix++) {
      for (let iz = 0; iz < d; iz++) {
        for (let iy = 0; iy < h; iy++) {
          if (ix !== 0 && ix !== w - 1 && iz !== 0 && iz !== d - 1 && iy !== h - 1) continue;
          if (iy === h - 1 && random() < 0.09) continue;
          voxelBoxes.push({
            x: x + ix, y: 0.18 + iy, z: z + iz, w: .94, h: .94, d: .94,
            color: shade(color, Math.round(random() * 6) - 3)
          });
        }
      }
    }
  }
  const buildings = [
    [-14, -11, 5, 5, 7], [-8, -13, 3, 5, 4], [-16, -4.8, 5, 2, 3],
    [6, -12, 5, 5, 10], [12, -10, 4, 4, 6], [7, -5.8, 3, 2, 3],
    [-13, 6, 6, 4, 5], [-16, 10.5, 5, 3, 3], [-9, 11, 3, 3, 6],
    [7, 7, 4, 4, 4], [12, 9, 4, 4, 6]
  ];
  buildings.forEach(([x, z, w, d, h], i) => building(x, z, w, d, h, i % 3 ? palette.building : "#a8b69e"));
  function tree(x, z, height) {
    const trunk = { x: x - .15, y: .1, z: z - .15, w: .3, h: height * .63, d: .3, color: "#9b9d80" };
    const crown = [
      { x: x - .95, y: height * .45, z: z - .95, w: 1.9, h: 1.25, d: 1.9, color: palette.tree },
      { x: x - .7, y: height * .45 + 1.15, z: z - .7, w: 1.4, h: .75, d: 1.4, color: "#91a47b" }
    ];
    voxelBoxes.push(trunk);
    crown.forEach(box => {
      for (let ix = 0; ix < box.w; ix += .65) {
        for (let iz = 0; iz < box.d; iz += .65) {
          voxelBoxes.push({ x: box.x + ix, y: box.y, z: box.z + iz, w: .6, h: box.h, d: .6, color: shade(box.color, Math.round(random() * 10) - 5) });
        }
      }
    });
  }
  [[-5.3,-10],[-5.3,-6],[-7,-5.3],[-13,-2.8],[5.3,-13],[5.3,-6],[13,-3.9],[-5.3,6],[-5.3,11],[-13,4.7],[5.3,6],[5.3,12],[12,5.3],[16,5.3]]
    .forEach(([x,z], i) => tree(x,z, 2.8 + (i % 3) * .35));

  function project(x, y, z) {
    const rx = x * cosY + z * sinY;
    const rz = -x * sinY + z * cosY;
    return [cx + rx * scale, cy + (rz * sinP - y * cosP) * scale, rz * cosP + y * sinP];
  }
  function path(vertices, fill, stroke, lineWidth = .5) {
    const first = project(...vertices[0]);
    ctx.beginPath();
    ctx.moveTo(first[0], first[1]);
    for (let i = 1; i < vertices.length; i++) {
      const p = project(...vertices[i]);
      ctx.lineTo(p[0], p[1]);
    }
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
  }
  function line(vertices, color, lineWidth = 1, dash = []) {
    ctx.beginPath();
    vertices.forEach((v, i) => {
      const p = project(...v);
      if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(dash);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  function plane(x, z, w, d, y, fill, stroke) {
    path([[x,y,z],[x+w,y,z],[x+w,y,z+d],[x,y,z+d]], fill, stroke);
  }
  function drawGround() {
    // Floating cutaway tile, with a lightly gridded semantic road surface.
    path([[-19,-.65,15],[19,-.65,15],[19,0,15],[-19,0,15]], "#c7cfbc");
    path([[19,-.65,-15],[19,-.65,15],[19,0,15],[19,0,-15]], "#d0d6c3");
    plane(-19,-15,38,30,0,palette.ground,"#bfc9b2");
    const road = palette.road;
    plane(-4,-15,8,30,.015,road);
    plane(-19,-3.8,38,7.6,.02,road);
    for (let x = -18; x < 19; x += 1.4) {
      line([[x,.03,-15],[x,.03,15]],"#b8c0ae70",.35);
    }
    for (let z = -14; z < 15; z += 1.4) {
      line([[-19,.03,z],[19,.03,z]],"#b8c0ae70",.35);
    }
    [[-4.1,-15,.16,11], [4,-15,.16,11],[-4.1,4,.16,11],[4,4,.16,11],[-19,-3.9,15,.16],[4,-3.9,15,.16],[-19,3.8,15,.16],[4,3.8,15,.16]]
      .forEach(([x,z,w,d]) => plane(x,z,w,d,.04,"#e1e4d7"));
    for (let z = -14; z < 15; z += 3) {
      if (Math.abs(z) < 5) continue;
      plane(-.045,z,.09,1.3,.05,"#edead4");
    }
    for (let x = -18; x < 19; x += 3) {
      if (Math.abs(x) < 5) continue;
      plane(x,-.045,1.3,.09,.05,"#edead4");
    }
    for (let i = -3; i <= 3; i++) {
      plane(i * .83 - .25,4.4,.48,1.15,.055,"#e2e4d7");
      plane(i * .83 - .25,-5.5,.48,1.15,.055,"#e2e4d7");
    }
    buildings.forEach(([x,z,w,d]) => path([[x,.06,z],[x+w,.06,z],[x+w+3,.06,z+d+2.2],[x+2,.06,z+d+2.2]],"#4c624b0c"));
    line([[1.7,.1,12],[1.7,.1,7],[1.7,.1,2],[2.5,.1,-1.6],[7,.1,-1.6],[14,.1,-1.6]],"#bd654c88",1.3,[4,4]);
    // Small survey marks tie the scene to a spatial coordinate system.
    [[-19,-15],[19,-15],[-19,15],[19,15]].forEach(([x,z]) => {
      line([[x-.6,.02,z],[x+.6,.02,z]],"#8d9c80",.7);
      line([[x,.02,z-.6],[x,.02,z+.6]],"#8d9c80",.7);
    });
  }
  function appendBoxFaces(box, faces) {
    const { x,y,z,w,h,d,color } = box;
    const a = [x,y,z], b = [x+w,y,z], c = [x+w,y,z+d], e = [x,y,z+d];
    const A = [x,y+h,z], B = [x+w,y+h,z], C = [x+w,y+h,z+d], E = [x,y+h,z+d];
    const visible = [
      [[A,B,C,E],shade(color,12)],
      [sinY < 0 ? [b,c,C,B] : [e,a,A,E],shade(color,-16)],
      [cosY > 0 ? [c,e,E,C] : [a,b,B,A],shade(color,-5)]
    ];
    visible.forEach(([v, fill]) => {
      const projected = v.map(p => project(...p));
      const depth = projected.reduce((sum,p) => sum + p[2],0) / 4;
      faces.push({ vertices: projected, depth, fill });
    });
  }
  function cars() {
    const t = state.time;
    const turnAngle = Math.max(0,Math.min(1,(t-1.6)/.6))*Math.PI/2;
    const ego = t < 1.6
      ? { x: 1.7, z: 9.5-t*5, horizontal: false }
      : t < 2.2
        ? { x: 4.8-3.1*Math.cos(turnAngle), z: 1.5-3.1*Math.sin(turnAngle), horizontal: t>1.9 }
        : { x: 4.8+(t-2.2)*7, z: -1.6, horizontal: true };
    return [
      { ...ego, color: palette.orange, ego: true },
      { x: -1.8, z: -9 + t * 3, color: palette.blue, horizontal: false },
      { x: -12 + t * 3, z: 1.8, color: palette.cream, horizontal: true },
      { x: 12 - t * 2.3, z: -1.8, color: "#7f938a", horizontal: true }
    ];
  }
  function carBoxes(car) {
    const { x,z,color,horizontal } = car;
    const w = horizontal ? 3.25 : 1.6, d = horizontal ? 1.6 : 3.25;
    const cabinW = horizontal ? 1.65 : 1.42, cabinD = horizontal ? 1.42 : 1.65;
    const boxes = [
      { x:x-w/2,y:.29,z:z-d/2,w,h:.73,d,color },
      { x:x-cabinW/2,y:1.02,z:z-cabinD/2,w:cabinW,h:.52,d:cabinD,color:shade(color,10) }
    ];
    for (const sign of [-1,1]) {
      for (const side of [-1,1]) {
        boxes.push({
          x: horizontal ? x + sign * .95 - .24 : x + side * .76 - .12,
          y:.15,
          z: horizontal ? z + side * .76 - .12 : z + sign * .95 - .24,
          w:horizontal ? .48 : .24,h:.4,d:horizontal ? .24 : .48,color:"#5a665b"
        });
      }
    }
    return boxes;
  }
  function drawFaces(sceneCars) {
    const faces = [];
    voxelBoxes.forEach(b => appendBoxFaces(b,faces));
    sceneCars.forEach(car => carBoxes(car).forEach(b => appendBoxFaces(b,faces)));
    faces.sort((a,b) => a.depth-b.depth);
    for (const face of faces) {
      const v = face.vertices;
      ctx.beginPath();
      ctx.moveTo(v[0][0],v[0][1]);
      for (let i = 1; i < 4; i++) ctx.lineTo(v[i][0],v[i][1]);
      ctx.closePath();
      ctx.fillStyle = face.fill;
      ctx.fill();
      ctx.strokeStyle = "#e1e5d533";
      ctx.lineWidth = .25;
      ctx.stroke();
    }
  }
  function render() {
    const yaw = state.yaw + Math.sin(state.time * Math.PI * 2 / 3) * .035;
    cosY = Math.cos(yaw); sinY = Math.sin(yaw);
    cosP = Math.cos(state.pitch); sinP = Math.sin(state.pitch);
    ctx.clearRect(0,0,width,height);
    const shadow = ctx.createRadialGradient(cx,cy+55,8,cx,cy+55,width*.44);
    shadow.addColorStop(0,"#80926816"); shadow.addColorStop(1,"#80926800");
    ctx.fillStyle = shadow; ctx.fillRect(0,0,width,height);
    drawGround();
    drawFaces(cars());
    needsPaint = false;
  }
  function updatePlayButton() {
    playButton.setAttribute("aria-pressed",String(state.playing));
    playButton.setAttribute("aria-label",state.playing ? "Pause background animation" : "Play background animation");
    playButton.firstElementChild.textContent = state.playing ? "Ⅱ" : "▷";
  }
  function frame(now) {
    animation = null;
    if (!state.visible || document.hidden) { previousTime = 0; return; }
    if (!previousTime) previousTime = now;
    const dt = Math.min((now-previousTime)/1000,.08);
    previousTime = now;
    if (state.playing) {
      state.time = (state.time + dt * .19) % 3;
    }
    if (needsPaint || (state.playing && now-lastPaint > 50)) {
      render();
      lastPaint = now;
    }
    if (state.playing) animation = requestAnimationFrame(frame);
  }
  function invalidate() {
    needsPaint = true;
    // Resizing clears the canvas. Paint static updates immediately, including
    // while offscreen; only continuous animation depends on visibility.
    if (width > 0 && height > 0) render();
    if (animation === null && state.playing && state.visible && !document.hidden) animation = requestAnimationFrame(frame);
  }
  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    // The blurred decorative layer does not need a full retina backing store.
    const dpr = Math.min(window.devicePixelRatio || 1,1.25);
    canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const compact = window.matchMedia("(max-width: 600px)").matches;
    scale = Math.min(width/(compact ? 28 : 44),height/29);
    cx = width*.69; cy = height*(compact ? .27 : .6);
    invalidate();
  }
  playButton.addEventListener("click", () => {
    state.playing = !state.playing;
    previousTime = 0;
    updatePlayButton(); invalidate();
  });
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    state.visible = entry.isIntersecting;
    previousTime = 0;
    if (state.visible) invalidate();
    else if (animation !== null) { cancelAnimationFrame(animation); animation = null; }
  },{ rootMargin: "80px" }).observe(canvas);
  document.addEventListener("visibilitychange",() => {
    previousTime = 0;
    if (document.hidden && animation !== null) { cancelAnimationFrame(animation); animation = null; }
    else invalidate();
  });
  motionPreference.addEventListener("change",event => {
    if (event.matches) { state.playing = false; updatePlayButton(); invalidate(); }
  });
  updatePlayButton(); resize();
})();
