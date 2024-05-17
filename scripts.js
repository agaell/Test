document.addEventListener('DOMContentLoaded', () => {
    if (navigator.xr) {
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
            if (supported) {
                initAR();
                alert('AR supported on this device.');
            } else {
                alert('AR not supported on this device.');
            }
        });
    } else {
        alert('WebXR not supported in this browser.');
    }
});

function initAR() {
    const container = document.getElementById('container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -0.5);
    scene.add(cube);

    function animate() {
        renderer.setAnimationLoop(render);
    }

    function render() {
        renderer.render(scene, camera);
    }

    const button = document.createElement('button');
    button.style.display = 'block';
    button.style.margin = 'auto';
    button.textContent = 'Enter AR';
    document.body.appendChild(button);

    button.addEventListener('click', () => {
        button.style.display = 'none';
        navigator.xr.requestSession('immersive-ar').then(onSessionStarted);
    });

    function onSessionStarted(session) {
        renderer.xr.setSession(session);
        animate();
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
