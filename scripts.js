import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
let camera, scene, renderer, controls;

init();
animate();

function init() {
    const container = document.getElementById('container');

    // Создание камеры
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 0.1);

    // Создание сцены
    scene = new THREE.Scene();

    // Загрузка панорамного изображения
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('https://live.staticflickr.com/3289/2294472375_1e4766bc20_c_d.jpg', () => {
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    });

    // Рендерер
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Управление через датчики устройства
    const controls = new OrbitControls( camera, renderer.domElement );

    // Обработка изменения размера окна
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Обновление контролов
    renderer.render(scene, camera); // Отрисовка сцены
}
