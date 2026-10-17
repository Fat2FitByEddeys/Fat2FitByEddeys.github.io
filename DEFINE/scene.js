/* =========================================================
   HERO SCENE — "chaos resolves into a defined form"
   Vanilla Three.js (ES module, loaded via import map — no
   bundler needed). Edit PALETTE / CONFIG below to restyle.
   ========================================================= */

import * as THREE from 'three';

const PALETTE = {
    signal: 0xc98a3e,
    ink: 0x3c2b21,
};

const CONFIG = {
    radius: 1.6,
    detail: 1,        // icosahedron subdivision — higher = more facets
    multiplier: 5,     // particles per base vertex
    jitter: 0.05,      // how loosely particles sit on the "defined" form
    pointSize: 0.075,
    cycleDuration: 9000,  // ms for one full chaos -> defined -> chaos loop
    autoRotateSpeed: 0.12,
    mouseInfluence: 0.35,
};

const canvas = document.getElementById('scene-canvas');
if (canvas && window.WebGLRenderingContext) {
    initScene(canvas);
} else if (canvas) {
    canvas.style.display = 'none';
}

function initScene(canvas) {
    const container = canvas.parentElement;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    function resize() {
        const w = container.clientWidth, h = container.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // ---- Group holding both the wireframe target shape and the particle cloud ----
    const group = new THREE.Group();
    group.position.set(1.4, 0, 0); // sits toward the right side of the hero
    scene.add(group);

    // ---- Base geometry: sharp, faceted icosahedron ----
    const icoGeom = new THREE.IcosahedronGeometry(CONFIG.radius, CONFIG.detail);

    // Crisp wireframe outline — the "target" defined shape, always visible
    const edgesGeom = new THREE.EdgesGeometry(icoGeom);
    const edgesMat = new THREE.LineBasicMaterial({
        color: PALETTE.signal, transparent: true, opacity: 0.85,
    });
    const edges = new THREE.LineSegments(edgesGeom, edgesMat);
    group.add(edges);

    // ---- Particle cloud: scattered "fragments" that converge onto the shape ----
    const basePositions = icoGeom.attributes.position.array;
    const vertexCount = basePositions.length / 3;
    const totalPoints = vertexCount * CONFIG.multiplier;

    const posDefined = new Float32Array(totalPoints * 3);
    const posChaos = new Float32Array(totalPoints * 3);
    const rand = new Float32Array(totalPoints);

    for (let i = 0; i < totalPoints; i++) {
        const srcIdx = (i % vertexCount) * 3;
        const j = CONFIG.jitter;

        posDefined[i * 3]     = basePositions[srcIdx]     + (Math.random() - 0.5) * j;
        posDefined[i * 3 + 1] = basePositions[srcIdx + 1] + (Math.random() - 0.5) * j;
        posDefined[i * 3 + 2] = basePositions[srcIdx + 2] + (Math.random() - 0.5) * j;

        const r = CONFIG.radius * (1.4 + Math.random() * 2.4);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        posChaos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        posChaos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        posChaos[i * 3 + 2] = r * Math.cos(phi);

        rand[i] = Math.random();
    }

    const pointsGeom = new THREE.BufferGeometry();
    pointsGeom.setAttribute('position', new THREE.BufferAttribute(posDefined, 3));
    pointsGeom.setAttribute('aChaos', new THREE.BufferAttribute(posChaos, 3));
    pointsGeom.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));

    const uniforms = {
        uMix: { value: 0.0 },
        uTime: { value: 0 },
        uSize: { value: CONFIG.pointSize },
        uSignal: { value: new THREE.Color(PALETTE.signal) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    };

    const pointsMat = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */`
            attribute vec3 aChaos;
            attribute float aRand;
            uniform float uMix;
            uniform float uTime;
            uniform float uSize;
            uniform float uPixelRatio;
            varying float vRand;

            void main() {
                vRand = aRand;
                vec3 chaosPos = aChaos + vec3(
                    sin(uTime * 0.6 + aRand * 20.0) * 0.06,
                    cos(uTime * 0.5 + aRand * 30.0) * 0.06,
                    sin(uTime * 0.4 + aRand * 10.0) * 0.06
                );
                vec3 pos = mix(chaosPos, position, uMix);
                vec4 mv = modelViewMatrix * vec4(pos, 1.0);
                gl_Position = projectionMatrix * mv;
                gl_PointSize = uSize * uPixelRatio * (500.0 / -mv.z);
            }
        `,
        fragmentShader: /* glsl */`
            uniform vec3 uSignal;
            varying float vRand;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                float alpha = smoothstep(0.5, 0.0, d);
                gl_FragColor = vec4(uSignal, alpha * (0.35 + vRand * 0.5));
            }
        `,
    });

    const points = new THREE.Points(pointsGeom, pointsMat);
    group.add(points);

    // ---- Mouse parallax ----
    const mouseTarget = { x: 0, y: 0 };
    window.addEventListener('pointermove', (e) => {
        mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ---- Stage labels (Scattered fragments / Structural draft / Defined form / Shipped product) ----
    const stageEls = document.querySelectorAll('.stage');

    function updateStages(progress) {
        const idx = Math.min(3, Math.floor(progress * 4));
        stageEls.forEach((el, i) => el.classList.toggle('active', i === idx));
    }

    // ---- Animation loop: auto chaos <-> defined cycle, no scroll dependency ----
    const clock = new THREE.Clock();
    const baseGroupX = group.position.x;

    function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    function tick() {
        const elapsed = clock.getElapsedTime();
        uniforms.uTime.value = elapsed;

        const phase = (elapsed * 1000 % CONFIG.cycleDuration) / CONFIG.cycleDuration * 2; // 0..2
        const progress = phase < 1 ? easeInOut(phase) : easeInOut(2 - phase);
        uniforms.uMix.value = progress;
        edgesMat.opacity = 0.35 + progress * 0.55;
        updateStages(progress);

        group.rotation.y += 0.006 * CONFIG.autoRotateSpeed * 16.6;
        group.rotation.x = Math.sin(elapsed * 0.15) * 0.1;

        const targetX = baseGroupX + mouseTarget.x * CONFIG.mouseInfluence;
        const targetY = mouseTarget.y * CONFIG.mouseInfluence * 0.6;
        group.position.x += (targetX - group.position.x) * 0.04;
        group.position.y += (targetY - group.position.y) * 0.04;

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    tick();
}
