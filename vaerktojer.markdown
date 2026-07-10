---
layout: page
title: Værktøjer
permalink: /vaerktojer/
lang: da
description: Nytteværktøjer til tegning og skalering.
---

<div class="tools-page">
  <h1>Værktøjer</h1>
  <p class="page-intro">Her finder du værktøjer, der kan hjælpe dig med din tegning. Brug dem frit — de er lavet til at gøre tegnearbejdet lettere.</p>

  <!-- ============================================ -->
  <!-- Proportional Compass Scale Generator         -->
  <!-- ============================================ -->
  <section class="tool-section">
    <div class="tool-header">
      <h2>Proportionalt Passerdiagram</h2>
      <p class="tool-description">
        Når du tegner efter foto eller skitse, kan det være svært at overføre proportioner korrekt.
        Med et proportionalt passerdiagram kan du måle afstande med en almindelig passer og derefter
        aflæse den skalerede værdi direkte på diagrammet. Hver linje repræsenterer en skaleringsfaktor
        (f.eks. 0,5x for halvering eller 2x for fordobling), og skæringskurverne viser, hvor dine
        målinger lander på de forskellige skalaer.
      </p>
      <p class="tool-howto">
        <strong>Sådan bruger du det:</strong>
        Udskriv diagrammet (SVG eller PDF) og læg det ved siden af dit motiv.
        Mål en afstand på motivet med din passer, placer passerbenene på 1x-linjen,
        og læs den skalerede afstand af på den ønskede faktor-linje.
        F.eks. vil en 100 mm afstand målt på 2x-linjen give dig 200 mm til dit lærred.
      </p>
    </div>

    <div class="proportional-compass">
      <div class="control-panel">
        <div class="control-group">
          <label for="arcWidth">Buebredde (grader)</label>
          <input type="number" id="arcWidth" value="60" min="5" max="180" step="1" aria-describedby="arcWidth-range">
          <span class="range-info" id="arcWidth-range">Interval: 5 – 180</span>
        </div>

        <div class="control-group">
          <label for="scaleLines">Antal Skaleringslinjer</label>
          <input type="number" id="scaleLines" value="6" min="2" max="20" step="1" aria-describedby="scaleLines-range">
          <span class="range-info" id="scaleLines-range">Interval: 2 – 20</span>
        </div>

        <div class="control-group">
          <label for="subdivisions">Underopdelinger pr. Linje</label>
          <input type="number" id="subdivisions" value="15" min="5" max="50" step="1" aria-describedby="subdivisions-range">
          <span class="range-info" id="subdivisions-range">Interval: 5 – 50</span>
        </div>

        <div class="control-group">
          <label for="minScale">Minimum Skaleringsfaktor</label>
          <input type="number" id="minScale" value="0.5" min="0.1" max="5.0" step="0.1" aria-describedby="minScale-range">
          <span class="range-info" id="minScale-range">Interval: 0,1 – 5,0</span>
        </div>

        <div class="control-group">
          <label for="maxScale">Maksimum Skaleringsfaktor</label>
          <input type="number" id="maxScale" value="2.5" min="0.5" max="10.0" step="0.1" aria-describedby="maxScale-range">
          <span class="range-info" id="maxScale-range">Interval: 0,5 – 10,0</span>
        </div>

        <div class="control-group">
          <label for="unitLength">1x Linjelængde (mm)</label>
          <input type="number" id="unitLength" value="100" min="10" max="500" step="1" aria-describedby="unitLength-range">
          <span class="range-info" id="unitLength-range">Interval: 10 – 500</span>
        </div>

        <div class="control-group">
          <label for="rotation">Rotationsforskydning (grader)</label>
          <input type="number" id="rotation" value="0" min="-180" max="180" step="1" aria-describedby="rotation-range">
          <span class="range-info" id="rotation-range">Interval: -180 til 180 (0 = 1x lodret)</span>
        </div>

        <hr class="section-divider">

        <div class="control-group" role="group" aria-label="Lineal synlighed">
          <div class="checkbox-row">
            <label><input type="checkbox" id="showRulerH" checked> Vandret Lineal</label>
          </div>
          <div class="checkbox-row">
            <label><input type="checkbox" id="showRulerV" checked> Lodret Lineal</label>
          </div>
        </div>

        <div class="export-buttons">
          <button class="export-btn" id="export-svg" aria-label="Download som SVG-fil">Eksporter SVG</button>
          <button class="export-btn" id="export-pdf" aria-label="Download som PDF-fil">Eksporter PDF</button>
        </div>
        <button class="export-btn" id="copy-svg" aria-label="Kopier SVG-kode til udklipstavlen">Kopier SVG til Udklipstavle</button>
      </div>

      <div class="preview-area" role="region" aria-label="Diagramforhåndsvisning">
        <div class="preview-container">
          <svg id="preview-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Proportionalt passerdiagram"></svg>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- jspdf for PDF export -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<script>
/* ============================================================
   URL Hash State Management
   ============================================================ */
const PARAM_KEYS = ['arcWidth', 'scaleLines', 'subdivisions', 'minScale', 'maxScale', 'unitLength', 'rotation'];
const BOOL_PARAM_KEYS = ['showRulerH', 'showRulerV'];
const DEFAULTS = { arcWidth: 60, scaleLines: 6, subdivisions: 15, minScale: 0.5, maxScale: 2.5, unitLength: 100, rotation: 0, showRulerH: true, showRulerV: true };

function loadSettingsFromHash() {
    const hash = window.location.hash.slice(1);
    if (!hash) return null;
    const params = new URLSearchParams(hash);
    const settings = {};
    for (const key of PARAM_KEYS) {
        if (params.has(key)) {
            settings[key] = parseFloat(params.get(key));
        }
    }
    for (const key of BOOL_PARAM_KEYS) {
        if (params.has(key)) {
            settings[key] = params.get(key) === '1';
        }
    }
    return Object.keys(settings).length > 0 ? settings : null;
}

function saveSettingsToHash(settings) {
    const params = new URLSearchParams();
    for (const key of PARAM_KEYS) {
        params.set(key, settings[key]);
    }
    for (const key of BOOL_PARAM_KEYS) {
        params.set(key, settings[key] ? '1' : '0');
    }
    history.replaceState(null, '', '#' + params.toString());
}

const PARAM_BOUNDS = {
    arcWidth:     { min: 5,    max: 180 },
    scaleLines:   { min: 2,    max: 20 },
    subdivisions: { min: 5,    max: 50 },
    minScale:     { min: 0.1,  max: 5.0 },
    maxScale:     { min: 0.5,  max: 10.0 },
    unitLength:   { min: 10,   max: 500 },
    rotation:     { min: -180, max: 180 }
};

function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}

function getSettings() {
    const settings = {};
    const invalidKeys = new Set();

    for (const key of PARAM_KEYS) {
        const el = document.getElementById(key);
        const raw = parseFloat(el.value);
        const bounds = PARAM_BOUNDS[key];
        if (isNaN(raw)) {
            settings[key] = DEFAULTS[key];
            invalidKeys.add(key);
        } else if (bounds && (raw < bounds.min || raw > bounds.max)) {
            settings[key] = clamp(raw, bounds.min, bounds.max);
            invalidKeys.add(key);
        } else {
            settings[key] = raw;
        }
    }

    // Guarantee minScale <= maxScale by swapping when inverted
    if (settings.minScale > settings.maxScale) {
        const tmp = settings.minScale;
        settings.minScale = settings.maxScale;
        settings.maxScale = tmp;
        invalidKeys.add('minScale');
        invalidKeys.add('maxScale');
    }

    for (const key of BOOL_PARAM_KEYS) {
        const el = document.getElementById(key);
        settings[key] = el ? el.checked : DEFAULTS[key];
    }

    // Apply visual error feedback
    for (const key of PARAM_KEYS) {
        const el = document.getElementById(key);
        if (el) el.classList.toggle('invalid', invalidKeys.has(key));
    }

    return settings;
}

function applySettingsToUI(settings) {
    for (const key of PARAM_KEYS) {
        const el = document.getElementById(key);
        if (settings.hasOwnProperty(key)) {
            el.value = settings[key];
        }
    }
    for (const key of BOOL_PARAM_KEYS) {
        const el = document.getElementById(key);
        if (settings.hasOwnProperty(key) && el) {
            el.checked = settings[key];
        }
    }
}

/* ============================================================
   Geometry Engine
   ============================================================ */
function calculateScaleFactors(minScale, maxScale, count) {
    if (count <= 1) return [minScale];
    const step = (maxScale - minScale) / (count - 1);
    const factors = [];
    for (let i = 0; i < count; i++) {
        factors.push(minScale + i * step);
    }
    return factors;
}

function calculateReferenceLine(factors, lines, minScale, maxScale) {
    if (minScale > 1.0 || maxScale < 1.0) return null;

    const nearestExisting = lines.find(l => Math.abs(l.factor - 1.0) < 0.02);
    if (nearestExisting) return null;

    for (let i = 0; i < lines.length - 1; i++) {
        const a = lines[i], b = lines[i + 1];
        if (a.factor <= 1.0 && b.factor >= 1.0) {
            const t = (1.0 - a.factor) / (b.factor - a.factor);
            const angleDeg = a.angleDeg + t * (b.angleDeg - a.angleDeg);
            return { factor: 1.0, angleDeg, isReference: true };
        }
    }
    return null;
}

function calculateLineAngles(factors, arcWidth, rotation) {
    const M = factors.length;
    const halfArc = arcWidth / 2;

    if (M === 1) {
        return [{ factor: factors[0], angleDeg: rotation }];
    }

    const angleStep = arcWidth / (M - 1);
    return factors.map((factor, i) => ({
        factor,
        angleDeg: -halfArc + i * angleStep + rotation
    }));
}

function calculateSubdivisionPoints(lines, subdivisions, unitLength) {
    const result = lines.map(line => {
        const angleRad = (line.angleDeg - 90) * Math.PI / 180;
        const points = [];
        const totalLength = line.factor * unitLength;
        for (let s = 1; s <= subdivisions; s++) {
            const dist = (s / subdivisions) * totalLength;
            points.push({
                x: dist * Math.cos(angleRad),
                y: dist * Math.sin(angleRad)
            });
        }
        return { ...line, points };
    });
    return result;
}

/* ============================================================
   SVG Rendering
   ============================================================ */
function rf(n, decimals = 4) {
    if (typeof n !== 'number' || !isFinite(n)) return 0;
    const clamped = Math.max(-1e7, Math.min(1e7, n));
    return Number(clamped.toFixed(decimals));
}

function buildIntersectionCurvePath(linesWithPoints, sIndex, tx, ty, stepsPerSegment = 25) {
    const n = linesWithPoints.length;
    if (n < 2) return '';

    let path = '';

    for (let i = 0; i < n - 1; i++) {
        const lineA = linesWithPoints[i];
        const lineB = linesWithPoints[i + 1];
        const pA = lineA.points[sIndex];
        const pB = lineB.points[sIndex];
        const angleA = (lineA.angleDeg - 90) * Math.PI / 180;
        const angleB = (lineB.angleDeg - 90) * Math.PI / 180;
        const rA = Math.sqrt(pA.x * pA.x + pA.y * pA.y);
        const rB = Math.sqrt(pB.x * pB.x + pB.y * pB.y);

        for (let t = 0; t <= stepsPerSegment; t++) {
            const frac = t / stepsPerSegment;
            const angle = angleA + frac * (angleB - angleA);
            const r = rA + frac * (rB - rA);
            const rawX = r * Math.cos(angle);
            const rawY = r * Math.sin(angle);
            path += (path === '' ? 'M' : ' L') + ` ${tx(rawX)} ${ty(rawY)}`;
        }
    }

    return path;
}

/* ============================================================
   Ruler Rendering
   ============================================================ */
function renderRulerSVG(showRulerH, showRulerV, graphWidth, graphHeight, graphStartX, graphStartY) {
    let svg = '';
    const rulerStrokeColor = 'black';
    const rulerBaselineWidth = rf(0.2);
    const rulerCmTickWidth = rf(0.2);
    const rulerMmTickWidth = rf(0.15);
    const rulerLabelFontSize = rf(2.5);
    const mmTickLen = rf(1);
    const halfTickLen = rf(1.6);
    const cmTickLen = rf(3);

    if (showRulerH) {
        const rulerY = graphStartY;
        const graphEndX = graphStartX + graphWidth;
        svg += `<line x1="${rf(graphStartX)}" y1="${rulerY}" x2="${rf(graphEndX)}" y2="${rulerY}" stroke="${rulerStrokeColor}" stroke-width="${rulerBaselineWidth}"/>`;
        const totalMM = Math.ceil(graphWidth);
        for (let mm = 0; mm <= totalMM; mm += 10) {
            const x = rf(graphStartX + mm);
            svg += `<line x1="${x}" y1="${rulerY}" x2="${x}" y2="${rf(rulerY - cmTickLen)}" stroke="${rulerStrokeColor}" stroke-width="${rulerCmTickWidth}"/>`;
            svg += `<text x="${x}" y="${rf(rulerY - cmTickLen - 3)}" font-size="${rulerLabelFontSize}" fill="${rulerStrokeColor}" text-anchor="middle" dominant-baseline="auto">${mm / 10}</text>`;
            for (let m = 1; m < 10; m++) {
                const subX = rf(graphStartX + mm + m);
                if (subX > graphEndX) break;
                const subLen = (m === 5) ? halfTickLen : mmTickLen;
                svg += `<line x1="${subX}" y1="${rulerY}" x2="${subX}" y2="${rf(rulerY - subLen)}" stroke="${rulerStrokeColor}" stroke-width="${rulerMmTickWidth}"/>`;
            }
        }
    }

    if (showRulerV) {
        const rulerX = graphStartX;
        const graphEndY = graphStartY + graphHeight;
        svg += `<line x1="${rulerX}" y1="${rf(graphStartY)}" x2="${rulerX}" y2="${rf(graphEndY)}" stroke="${rulerStrokeColor}" stroke-width="${rulerBaselineWidth}"/>`;
        const totalMM = Math.ceil(graphHeight);
        for (let mm = 0; mm <= totalMM; mm += 10) {
            const y = rf(graphStartY + mm);
            svg += `<line x1="${rulerX}" y1="${y}" x2="${rf(rulerX - cmTickLen)}" y2="${y}" stroke="${rulerStrokeColor}" stroke-width="${rulerCmTickWidth}"/>`;
            svg += `<text x="${rf(rulerX - cmTickLen - 3)}" y="${y}" font-size="${rulerLabelFontSize}" fill="${rulerStrokeColor}" text-anchor="end" dominant-baseline="middle">${mm / 10}</text>`;
            for (let m = 1; m < 10; m++) {
                const subY = rf(graphStartY + mm + m);
                if (subY > graphEndY) break;
                const subLen = (m === 5) ? halfTickLen : mmTickLen;
                svg += `<line x1="${rulerX}" y1="${subY}" x2="${rf(rulerX - subLen)}" y2="${subY}" stroke="${rulerStrokeColor}" stroke-width="${rulerMmTickWidth}"/>`;
            }
        }
    }

    return svg;
}

function renderSVG(settings, forExport = false) {
    const { arcWidth, scaleLines, subdivisions, minScale, maxScale, unitLength, rotation, showRulerH, showRulerV } = settings;

    const factors = calculateScaleFactors(minScale, maxScale, scaleLines);
    const lines = calculateLineAngles(factors, arcWidth, rotation);
    const linesWithPoints = calculateSubdivisionPoints(lines, subdivisions, unitLength);

    const refLine = calculateReferenceLine(factors, lines, minScale, maxScale);
    const refLineWithPoints = refLine
        ? calculateSubdivisionPoints([refLine], subdivisions, unitLength)[0]
        : null;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    let hasPoints = false;
    const allLinesForBBox = refLineWithPoints
        ? linesWithPoints.concat([refLineWithPoints])
        : linesWithPoints;
    for (const line of allLinesForBBox) {
        for (const p of line.points) {
            if (!isFinite(p.x) || !isFinite(p.y)) continue;
            if (!hasPoints) {
                minX = maxX = p.x;
                minY = maxY = p.y;
                hasPoints = true;
            } else {
                if (p.x < minX) minX = p.x;
                if (p.x > maxX) maxX = p.x;
                if (p.y < minY) minY = p.y;
                if (p.y > maxY) maxY = p.y;
            }
        }
    }
    if (hasPoints) {
        minX = Math.min(minX, 0);
        maxX = Math.max(maxX, 0);
        minY = Math.min(minY, 0);
        maxY = Math.max(maxY, 0);
    } else {
        minX = -50; maxX = 50; minY = -50; maxY = 50;
    }

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    const cmTickLen = rf(3);
    const rulerLabelFontSize = rf(2.5);
    const rulerHHeight = showRulerH ? (cmTickLen + rulerLabelFontSize + 3) : 0;
    const rulerVWidth = showRulerV ? (cmTickLen + rulerLabelFontSize + 5) : 0;
    const PADDING = Math.max(contentWidth, contentHeight) * 0.05;
    const graphWidth = rf(contentWidth + PADDING * 2);
    const graphHeight = rf(contentHeight + PADDING * 2);
    const finalWidth = rf(graphWidth + rulerVWidth);
    const finalHeight = rf(graphHeight + rulerHHeight);

    const graphOffsetX = rulerVWidth;
    const graphOffsetY = rulerHHeight;
    const offsetX = PADDING - minX + graphOffsetX;
    const offsetY = PADDING - minY + graphOffsetY;

    function tx(x) { return rf(x + offsetX); }
    function ty(y) { return rf(y + offsetY); }

    const primaryLineWidth = rf(0.35);
    const secondaryLineWidth = rf(0.18);
    const primaryTickWidth = rf(0.25);
    const secondaryTickWidth = rf(0.15);
    const tickLenNormal = rf(1.6);
    const tickLenFifth = rf(2.4);
    const fontSize = rf(3.75);
    const labelDist = rf(4);
    const originRadius = rf(1.6);

    const dimAttr = forExport
        ? ` width="${finalWidth}" height="${finalHeight}"`
        : ` width="100%" height="100%"`;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${finalWidth} ${finalHeight}"${dimAttr}>`;

    svg += `<rect x="0" y="0" width="${finalWidth}" height="${finalHeight}" fill="white"/>`;

    for (let s = 1; s <= subdivisions; s++) {
        if (linesWithPoints.length < 2) continue;

        const path = buildIntersectionCurvePath(linesWithPoints, s - 1, tx, ty, 25);
        if (path) {
            svg += `<path d="${path}" fill="none" stroke="black" stroke-width="${secondaryTickWidth}"/>`;
        }
    }

    function renderScaleLine(line, isPrimary) {
        const originX = tx(0), originY = ty(0);
        const lastPoint = line.points[line.points.length - 1];
        const endX = tx(lastPoint.x), endY = ty(lastPoint.y);

        const lineW = isPrimary ? primaryLineWidth : secondaryLineWidth;
        const tickW = isPrimary ? primaryTickWidth : secondaryTickWidth;

        let out = `<line x1="${originX}" y1="${originY}" x2="${endX}" y2="${endY}" stroke="black" stroke-width="${lineW}" stroke-linecap="butt"/>`;

        const angleRad = (line.angleDeg - 90) * Math.PI / 180;
        const perpAngle = angleRad + Math.PI / 2;

        for (let s = 1; s <= subdivisions; s++) {
            const p = line.points[s - 1];
            const px = tx(p.x), py = ty(p.y);
            const tickLen = (s % 5 === 0) ? tickLenFifth : tickLenNormal;
            const t1x = rf(px + tickLen * Math.cos(perpAngle));
            const t1y = rf(py + tickLen * Math.sin(perpAngle));
            const t2x = rf(px - tickLen * Math.cos(perpAngle));
            const t2y = rf(py - tickLen * Math.sin(perpAngle));
            out += `<line x1="${t1x}" y1="${t1y}" x2="${t2x}" y2="${t2y}" stroke="black" stroke-width="${tickW}" stroke-linecap="butt"/>`;
        }

        const lx = rf(endX + labelDist * Math.cos(angleRad));
        const ly = rf(endY + labelDist * Math.sin(angleRad));
        const label = line.factor === 1.0 ? '1x' : line.factor.toFixed(1) + 'x';
        const fontWeight = isPrimary ? ' font-weight="bold"' : '';
        out += `<text x="${lx}" y="${ly}" font-size="${fontSize}" fill="black" text-anchor="middle" dominant-baseline="middle"${fontWeight}>${label}</text>`;
        return out;
    }

    for (const line of linesWithPoints) {
        svg += renderScaleLine(line, false);
    }

    if (refLineWithPoints) {
        svg += renderScaleLine(refLineWithPoints, true);
    }

    svg += `<circle cx="${tx(0)}" cy="${ty(0)}" r="${originRadius}" fill="black"/>`;

    const graphStartX = rulerVWidth;
    const graphStartY = rulerHHeight;
    svg += renderRulerSVG(showRulerH, showRulerV, graphWidth, graphHeight, graphStartX, graphStartY);

    svg += `</svg>`;
    return svg;
}

/* ============================================================
   Export Functions
   ============================================================ */
function exportSVG() {
    const settings = getSettings();
    const svgString = renderSVG(settings, true);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proportional-compass.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function copySVGToClipboard() {
    const btn = document.getElementById('copy-svg');
    const original = btn.textContent;
    try {
        const settings = getSettings();
        const svgString = renderSVG(settings, true);
        await navigator.clipboard.writeText(svgString);
        btn.textContent = 'Kopieret!';
        btn.classList.add('copied');
    } catch (err) {
        btn.textContent = 'Kopiering mislykkedes';
        console.error('Clipboard copy failed:', err);
    } finally {
        setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('copied');
        }, 1500);
    }
}

async function exportPDF() {
    const btn = document.getElementById('export-pdf');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Genererer...';

    let url = null;
    try {
        const settings = getSettings();
        const svgString = renderSVG(settings, true);

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        const svgEl = doc.querySelector('svg');
        const viewBox = svgEl.getAttribute('viewBox').split(' ').map(Number);
        const w = viewBox[2], h = viewBox[3];

        const landscape = w > h;
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: landscape ? 'landscape' : 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const dpr = Math.max(1, window.devicePixelRatio || 1);
        const rasterScale = Math.max(4, Math.round(dpr * 4));
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(w * rasterScale);
        canvas.height = Math.ceil(h * rasterScale);
        const ctx = canvas.getContext('2d');
        ctx.scale(rasterScale, rasterScale);

        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        url = URL.createObjectURL(blob);

        await new Promise((resolve, reject) => {
            const img = new Image();
            const timeoutId = setTimeout(() => {
                reject(new Error('SVG image load timed out after 10 seconds'));
            }, 10000);
            img.onload = () => {
                clearTimeout(timeoutId);
                ctx.drawImage(img, 0, 0, w, h);
                resolve();
            };
            img.onerror = () => {
                clearTimeout(timeoutId);
                reject(new Error('Failed to load SVG as image for PDF export'));
            };
            img.src = url;
        });

        const imgData = canvas.toDataURL('image/png');
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();

        const margin = 10;
        const availW = pageW - margin * 2;
        const availH = pageH - margin * 2;
        const scale = Math.min(availW / w, availH / h);
        const drawW = w * scale;
        const drawH = h * scale;
        const x = (pageW - drawW) / 2;
        const y = (pageH - drawH) / 2;

        pdf.addImage(imgData, 'PNG', x, y, drawW, drawH);
        pdf.save('proportional-compass.pdf');
    } catch (err) {
        console.error('PDF export failed:', err);
        alert('PDF-eksport mislykkedes: ' + err.message);
    } finally {
        if (url) URL.revokeObjectURL(url);
        btn.disabled = false;
        btn.textContent = original;
    }
}

/* ============================================================
   Event Handling & Initialization
   ============================================================ */
function updatePreview() {
    const settings = getSettings();
    saveSettingsToHash(settings);
    const svgString = renderSVG(settings);
    const container = document.querySelector('.preview-container');
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const newSvg = doc.querySelector('svg');
    const oldSvg = document.getElementById('preview-svg');
    if (oldSvg && oldSvg.parentNode === container) {
        container.replaceChild(newSvg, oldSvg);
    } else {
        container.appendChild(newSvg);
    }
    newSvg.id = 'preview-svg';
}

function init() {
    const hashSettings = loadSettingsFromHash();
    if (hashSettings) {
        applySettingsToUI(hashSettings);
    }

    for (const key of PARAM_KEYS) {
        const el = document.getElementById(key);
        el.addEventListener('input', updatePreview);
    }
    for (const key of BOOL_PARAM_KEYS) {
        const el = document.getElementById(key);
        el.addEventListener('change', updatePreview);
    }

    document.getElementById('export-svg').addEventListener('click', exportSVG);
    document.getElementById('export-pdf').addEventListener('click', exportPDF);
    document.getElementById('copy-svg').addEventListener('click', copySVGToClipboard);

    updatePreview();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
</script>
