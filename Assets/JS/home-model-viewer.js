import * as THREE from "three";
import { OrbitControls } from "three/addons/OrbitControls.js";
import { GLTFLoader } from "three/addons/GLTFLoader.js";

class HomeModelViewer {
  constructor(root) {
    this.root = root;
    this.canvas = root.querySelector("canvas");
    this.status = root.querySelector("[data-model-status]");
    this.modelSrc = root.dataset.modelSrc || "Assets/Model/maison.glb";
    this.isVisible = false;
    this.hasRequestedLoad = false;
    this.rafId = 0;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(24, 1, 0.01, 100);
    this.camera.position.set(-4, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true,
      powerPreference: "low-power"
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.autoRotate = false;
    this.controls.rotateSpeed = 0.7;
    this.controls.minDistance = 1.2;
    this.controls.maxDistance = 20;
    this.defaultPolar = Math.PI / 2;
    this.polarRange = THREE.MathUtils.degToRad(28);
    this.controls.minPolarAngle = this.defaultPolar - this.polarRange;
    this.controls.maxPolarAngle = this.defaultPolar + this.polarRange;

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xc8d2c2, 2.4));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
    keyLight.position.set(4, 6, 6);
    this.scene.add(keyLight);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.root);
    this.visibilityObserver = new IntersectionObserver((entries) => {
      this.isVisible = entries.some((entry) => entry.isIntersecting);
      if (this.isVisible) {
        this.requestModelLoad();
        this.start();
      }
    }, { threshold: 0.04 });
    this.visibilityObserver.observe(this.root);
    this.pageObserver = new MutationObserver(() => this.syncVisibility());
    this.pageObserver.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["hidden", "class"] });

    this.resize();
    this.renderOnce();
    this.syncVisibility();
  }

  setStatus(text) {
    if (this.status) this.status.textContent = text;
  }

  loadModel() {
    this.setStatus("Chargement du plan 3D...");
    new GLTFLoader().load(
      this.modelSrc,
      (gltf) => {
        this.model = gltf.scene;
        this.prepareModel(this.model);
        this.scene.add(this.model);
        this.root.classList.add("is-loaded");
        this.setStatus("");
        this.renderOnce();
        this.start();
      },
      undefined,
      () => {
        this.root.classList.add("has-error");
        this.setStatus("Plan 3D indisponible");
        this.renderOnce();
      }
    );
  }

  requestModelLoad() {
    if (this.hasRequestedLoad) return;
    this.hasRequestedLoad = true;
    const run = () => this.loadModel();
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 900 });
      return;
    }
    window.setTimeout(run, 160);
  }

  syncVisibility() {
    const { width, height } = this.root.getBoundingClientRect();
    if (width < 10 || height < 10) return;
    this.isVisible = true;
    this.requestModelLoad();
    this.start();
  }

  prepareModel(model) {
    const sourceBox = new THREE.Box3().setFromObject(model);
    const sourceSize = sourceBox.getSize(new THREE.Vector3());
    const sourceCenter = sourceBox.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(sourceSize.x, sourceSize.y, sourceSize.z) || 1;

    model.position.sub(sourceCenter);
    model.scale.setScalar(3.9 / maxAxis);

    model.traverse((child) => {
      if (!child.isMesh) return;
      child.frustumCulled = false;
      if (!child.material) return;
      child.material.side = THREE.DoubleSide;
      child.material.needsUpdate = true;
    });

    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const fitOffset = 1.68;
    const aspect = Math.max(0.2, this.camera.aspect || 1);
    const fitHeightDistance = (size.y * fitOffset) / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov * 0.5)));
    const fitWidthDistance = (Math.max(size.x, size.z) * fitOffset) / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov * 0.5)) * aspect);
    const defaultDistance = Math.max(fitHeightDistance, fitWidthDistance, 1);
    const defaultPolar = this.defaultPolar;
    const defaultAzimuth = -Math.PI / 2;
    const offset = new THREE.Vector3().setFromSphericalCoords(defaultDistance, defaultPolar, defaultAzimuth);

    this.controls.target.copy(center);
    this.camera.position.copy(center).add(offset);
    this.camera.near = Math.max(0.01, defaultDistance / 100);
    this.camera.far = defaultDistance * 100;
    this.camera.updateProjectionMatrix();
    this.controls.minDistance = defaultDistance;
    this.controls.maxDistance = defaultDistance;
    this.controls.minPolarAngle = defaultPolar - this.polarRange;
    this.controls.maxPolarAngle = defaultPolar + this.polarRange;
    this.controls.update();
  }

  resize() {
    const { width, height } = this.root.getBoundingClientRect();
    const safeWidth = Math.max(1, Math.floor(width));
    const safeHeight = Math.max(1, Math.floor(height));
    this.camera.aspect = safeWidth / safeHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(safeWidth, safeHeight, false);
    this.renderOnce();
  }

  renderOnce() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    if (this.rafId) return;
    const render = () => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.rafId = this.isVisible ? requestAnimationFrame(render) : 0;
    };
    this.rafId = requestAnimationFrame(render);
  }
}

document.querySelectorAll("[data-home-model-viewer]").forEach((root) => {
  new HomeModelViewer(root);
});
