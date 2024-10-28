const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const floorGeometry = new THREE.BoxGeometry(10, 0.1, 10);
const wallGeometry = new THREE.BoxGeometry(0.1, 2, 10);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

// Floor
const floor = new THREE.Mesh(floorGeometry, material);
floor.position.y = -0.5;
scene.add(floor);

// Walls
const wall1 = new THREE.Mesh(wallGeometry, material);
wall1.position.set(-5, 1, 0);
scene.add(wall1);

const wall2 = new THREE.Mesh(wallGeometry, material);
wall2.position.set(5, 1, 0);
scene.add(wall2);

const wall3 = new THREE.Mesh(wallGeometry, material);
wall3.rotation.y = Math.PI / 2; // Rotate to face front
wall3.position.set(0, 1, -5);
scene.add(wall3);

const wall4 = new THREE.Mesh(wallGeometry, material);
wall4.rotation.y = Math.PI / 2; // Rotate to face back
wall4.position.set(0, 1, 5);
scene.add(wall4);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

const listener = new THREE.AudioListener();
camera.add(listener);

const audioLoader = new THREE.AudioLoader();
const audio = new THREE.Audio(listener);

// Load an audio file and set it as the audio object's buffer
audioLoader.load('path/to/your/audio/file.mp3', function (buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(true);
    audio.setVolume(0.5); // Adjust as needed
    audio.play();
});

audio.position.set(0, 1, 0); // Place it in the room
scene.add(audio);

function updateAudioVolume() {
    const distance = camera.position.distanceTo(audio.position);
    const maxDistance = 10; // Adjust this based on your room scale
    const volume = Math.max(0, 1 - distance / maxDistance); // Volume decreases with distance
    audio.setVolume(volume);
}

const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1.5, 5); // Start position

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    updateAudioVolume(); // Update audio volume based on distance
    renderer.render(scene, camera);
}
animate();

