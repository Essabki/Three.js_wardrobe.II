        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x001122);
        const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // ========== CLICK ANIMATION SETUP ==========
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let drawer1Open = false;
        let drawer2Open = false;
        let leftDoorOpen = false;
        let rightDoorOpen = false;
        let thirdDoorOpen = false;
        const animationSpeed = 0.08;
////////////////////////////////////////////////////

        
        // =========================
        // TEXTURE (verticale)
        // =========================
        const textureLoader = new THREE.TextureLoader();
        const woodTexture = textureLoader.load('texture/wood/verticale.jpg');

        woodTexture.wrapS = THREE.RepeatWrapping;
        woodTexture.wrapT = THREE.RepeatWrapping;
        woodTexture.repeat.set(1, 1);

        // TEXTURE (orizzontale)
        // =========================
        const orizzontaletextureLoader = new THREE.TextureLoader();
        const orizzontalewoodTexture = textureLoader.load('texture/wood/orizzontale.jpg');

        orizzontalewoodTexture.wrapS = THREE.RepeatWrapping;
        orizzontalewoodTexture.wrapT = THREE.RepeatWrapping;
        orizzontalewoodTexture.repeat.set(1, 1);

        // =========================
       // =========================
// WARDROBE GROUP (ALL WARDROBE PARTS)
// =========================
const wardrobeGroup = new THREE.Group();

// BACK SIDE
const backMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture
});
const backGeometry = new THREE.BoxGeometry(24, 26, 0.1);
const back = new THREE.Mesh(backGeometry, backMaterial);
back.position.set(-4, 0, 0);
wardrobeGroup.add(back);

// LEFT SIDE
const leftMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture
});
const leftGeometry = new THREE.BoxGeometry(0.1, 26, 6); 
const left = new THREE.Mesh(leftGeometry, leftMaterial);
left.position.set(7.95, 0, 3); 
wardrobeGroup.add(left);

const rightGeometry = new THREE.BoxGeometry(0.1, 26, 6); 
const right = new THREE.Mesh(rightGeometry, leftMaterial);
right.position.set(-7.95, 0, 3); 
wardrobeGroup.add(right);

// THIRD SIDE
const third = right.clone();
third.position.set(-16,0,3);
wardrobeGroup.add(third);

// MIDELL
const midellGeometry = new THREE.BoxGeometry(0.1, 26, 6); 
const midell = new THREE.Mesh(midellGeometry, leftMaterial);
midell.position.set(0, 0, 3); 
wardrobeGroup.add(midell);

// FLOOR
const floorMaterial = new THREE.MeshStandardMaterial({
    map: orizzontalewoodTexture
});
const floorGeometry = new THREE.BoxGeometry(24, 0.1, 6);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.set(-4, -12.99, 3);
wardrobeGroup.add(floor);

// ROOF
const roofGeometry = new THREE.BoxGeometry(24, 0.1, 6);
const roof = new THREE.Mesh(roofGeometry, floorMaterial);
roof.position.set(-4, 12.99, 3);
wardrobeGroup.add(roof);

// DRAWER ROOF
const DRAWERroofGeometry = new THREE.BoxGeometry(23.99, 0.1, 6);
const DRAWERroof = new THREE.Mesh(DRAWERroofGeometry, floorMaterial);
DRAWERroof.position.set(-4, -7.25, 3);
wardrobeGroup.add(DRAWERroof);

// DRAWER GROUP 1
const drawerGroup = new THREE.Group();
// FRONT
const frontDGeometry = new THREE.BoxGeometry(8, 2.9, 0.01);
const frontD = new THREE.Mesh(frontDGeometry, floorMaterial);
frontD.position.set(0, 1.45, 3); 
drawerGroup.add(frontD);

// BACK
const backDGeometry = new THREE.BoxGeometry(8, 2.5, 0.01);
const backD = new THREE.Mesh(backDGeometry, floorMaterial);
backD.position.set(0, 1.25, -3);
drawerGroup.add(backD);

// LEFT
const leftDGeometry = new THREE.BoxGeometry(6, 2.5, 0.01);
const leftD = new THREE.Mesh(leftDGeometry, floorMaterial);
leftD.rotation.y = Math.PI / 2;
leftD.position.set(-4, 1.25, 0);
drawerGroup.add(leftD);

// RIGHT
const rightDGeometry = new THREE.BoxGeometry(6, 2.5, 0.01);
const rightD = new THREE.Mesh(rightDGeometry, floorMaterial);
rightD.rotation.y = Math.PI / 2;
rightD.position.set(4, 1.25, 0);
drawerGroup.add(rightD);

// BASE
const baseGeometry = new THREE.BoxGeometry(8, 6, 0.01);
const base = new THREE.Mesh(baseGeometry, floorMaterial);
base.rotation.x = Math.PI / 2;
base.position.set(0, 0.06, 0);
drawerGroup.add(base);

// HANDLE
const handleTexture = textureLoader.load('texture/wood/bar.jpg');
const handleMaterial = new THREE.MeshStandardMaterial({
    map: handleTexture
});
const handleGeometry = new THREE.BoxGeometry(3, 0.3, 0.2);
const handle = new THREE.Mesh(handleGeometry, handleMaterial);
handle.position.set(0, 1.45, 3.1);
drawerGroup.add(handle);

drawerGroup.position.set(3.97, -10.1, 0);
drawerGroup.scale.set(0.98,1,1);
drawerGroup.position.z = 3; 
wardrobeGroup.add(drawerGroup);

// DRAWER GROUP 2
const drawerGroup2 = drawerGroup.clone();
drawerGroup2.position.set(3.97, -13, 3);
wardrobeGroup.add(drawerGroup2);

// SHELF
const shelfGeometry = new THREE.BoxGeometry(15.99, 6, 0.2);
const shelf = new THREE.Mesh(shelfGeometry, floorMaterial);
shelf.rotation.x = Math.PI / 2;
shelf.position.set(-8, 0, 3);
wardrobeGroup.add(shelf);

const shelf3 = shelf.clone();
shelf3.position.set(-8, 7, 3);
wardrobeGroup.add(shelf3);

const shelf6 = shelf.clone();
shelf6.position.set(-4, -7, 3);
//wardrobeGroup.add(shelf6);

// BAR
const loader = new THREE.TextureLoader();
const texture = loader.load('texture/wood/bar.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(3, 1);
const geometry = new THREE.CylinderGeometry(0.1, 0.1, 7.99, 90);
const material = new THREE.MeshStandardMaterial({ map: texture });
const bar = new THREE.Mesh(geometry, material);
bar.rotation.z = Math.PI / 2;
bar.position.set(4, 10, 3);
wardrobeGroup.add(bar);

// DOORS
const doorWidth = 8;
const doorHeight = 20.2;
const doorDepth = 0.01;
const doorMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture
});

// LEFT DOOR GROUP
const leftDoorGroup = new THREE.Group();
const leftDoor = new THREE.Mesh(
    new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth),
    doorMaterial
);
leftDoor.position.set(-doorWidth / 2, 0, 0);
leftDoorGroup.add(leftDoor);
const leftHandle = new THREE.Mesh(handleGeometry, material);
leftHandle.position.set(-3.3,0,0.1);
leftHandle.rotation.z =  Math.PI / 2 ;
leftHandle.scale.set(2,1,1);
leftDoor.add(leftHandle);
leftDoorGroup.position.set(7.99, 2.90, 6);
wardrobeGroup.add(leftDoorGroup);

// RIGHT DOOR GROUP
const rightDoorWidth = 8;
const rightDoorHeight = 26;
const rightDoorGroup = new THREE.Group();
const rightDoor = new THREE.Mesh(
    new THREE.BoxGeometry(rightDoorWidth, rightDoorHeight, doorDepth),
    doorMaterial
);
rightDoor.position.set(rightDoorWidth / 2, -2.9, 0);
rightDoorGroup.add(rightDoor);
const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial);
rightHandle.position.set(3.3, 2.9, 0.1);
rightHandle.rotation.z = Math.PI / 2;
rightHandle.scale.set(2, 1, 1);
rightDoor.add(rightHandle);
rightDoorGroup.position.set(-15.99, 2.90, 6);
wardrobeGroup.add(rightDoorGroup);

// THIRD DOOR GROUP
const thirdDoorWidth = 8;
const thirdDoorHeight = 26;
const thirdDoorGroup = new THREE.Group();
const thirdDoor = new THREE.Mesh(
    new THREE.BoxGeometry(thirdDoorWidth, thirdDoorHeight, doorDepth),
    doorMaterial
);
thirdDoor.position.set(thirdDoorWidth / 2, -2.9, 0);
thirdDoorGroup.add(thirdDoor);
const thirdHandle = new THREE.Mesh(handleGeometry, handleMaterial);
thirdHandle.position.set(3.3, -2.9, 0.1);
thirdHandle.rotation.z = Math.PI / 2;
thirdHandle.scale.set(2, 1, 1);
thirdDoor.add(thirdHandle);
thirdDoorGroup.position.set(0, -2.9, 6);
thirdDoorGroup.rotation.z = Math.PI / 1;
wardrobeGroup.add(thirdDoorGroup);

wardrobeGroup.position.set(4,0,0);
scene.add(wardrobeGroup);
  //////////////////////////////
//GLB
// heel
const loaderheel = new GLTFLoader();

loaderheel.load('./texture/glb/classic_high_heel_pumps.glb', (gltf) => {
    const heel = gltf.scene;
    // Scale skin (adjust as needed)
    heel.scale.set(0.3, 0.3, 0.3);

    // Put skin ON TOP of desk
    heel.position.set(5, -5.8, 4);
    heel.rotation.y = Math.PI / 2; // turn sid
    scene.add(heel);
});




// wood_clothes
const loaderwood_clothes= new GLTFLoader();

loaderwood_clothes.load('./texture/glb/hangers_and_tee-shirt.glb', (gltf) => {
    const wood_clothes = gltf.scene;
    // Scale skin (adjust as needed)
    wood_clothes.scale.set(1, 1, 1.6);

    wood_clothes.position.set(8, 8.9, 3);
    wood_clothes.rotation.y = Math.PI / 2; // turn sid
    scene.add(wood_clothes);
});

 // hundbag2

 const loaderhundbag2= new GLTFLoader();

loaderhundbag2.load('./texture/glb/hundbag2.glb', (gltf) => {
    const hundbag2 = gltf.scene;
    // Scale skin (adjust as needed)
    hundbag2.scale.set(10, 10, 10);

    hundbag2.position.set(6, -5.3, 3);
    hundbag2.rotation.y = Math.PI / 2; // turn sid
    scene.add(hundbag2);
});
 /////////////////////////////

        // ========== CLICK HANDLER ==========
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    // Check drawers first
    const drawerIntersects = raycaster.intersectObjects([drawerGroup, drawerGroup2], true);
    if (drawerIntersects.length > 0) {
        const obj = drawerIntersects[0].object;
        if (drawerGroup.children.includes(obj)) {
            drawer1Open = !drawer1Open;
        } else if (drawerGroup2.children.includes(obj)) {
            drawer2Open = !drawer2Open;
        }
        return;
    }

    // Check doors
    const doorIntersects = raycaster.intersectObjects([leftDoorGroup, rightDoorGroup, thirdDoorGroup], true);
    if (doorIntersects.length > 0) {
        const obj = doorIntersects[0].object;
        if (leftDoorGroup.children.includes(obj)) {
            leftDoorOpen = !leftDoorOpen;
        } else if (rightDoorGroup.children.includes(obj)) {
            rightDoorOpen = !rightDoorOpen;
        } else if (thirdDoorGroup.children.includes(obj)) {
            thirdDoorOpen = !thirdDoorOpen;
        }
    }
}
// FLOOR SCENE  
        const bottomFloorMaterial = new THREE.MeshStandardMaterial({
    map: orizzontalewoodTexture
});

const bottomFloorGeometry = new THREE.BoxGeometry(20, 0.5, 10);
const bottomFloor = new THREE.Mesh(bottomFloorGeometry, bottomFloorMaterial);
bottomFloor.position.set(0, -13, 3);
bottomFloor.receiveShadow = true;
//scene.add(bottomFloor);
///////////////////////////////////////////////////
        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.zoomToCursor = true;
        controls.enablePan = true; 
        controls.screenSpacePanning = true;
        controls.minDistance = 2;
        controls.maxDistance = 50;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(0, 1, 0);
        controls.update();
        camera.position.set(0, 0, 22);

        window.addEventListener('click', onMouseClick);

        // ========== ANIMATION LOOP ==========
        function animate() {
            requestAnimationFrame(animate);
            
            // DRAWERS
            drawerGroup.position.z = THREE.MathUtils.lerp(
                drawerGroup.position.z, 
                drawer1Open ? 8 : 3,
                animationSpeed
            );
            
            drawerGroup2.position.z = THREE.MathUtils.lerp(
                drawerGroup2.position.z, 
                drawer2Open ? 8 : 3,
                animationSpeed
            );

            // 👉 DOORS ROTATE AROUND EDGE HINGE!
// DOORS ROTATE AROUND EDGE HINGE!
leftDoorGroup.rotation.y = THREE.MathUtils.lerp(
    leftDoorGroup.rotation.y,
    leftDoorOpen ? Math.PI / 2 : 0,
    animationSpeed
);

rightDoorGroup.rotation.y = THREE.MathUtils.lerp(
    rightDoorGroup.rotation.y,
    rightDoorOpen ? -Math.PI / 2 : 0,
    animationSpeed
);

thirdDoorGroup.rotation.y = THREE.MathUtils.lerp(
    thirdDoorGroup.rotation.y,
    thirdDoorOpen ? -Math.PI / -2 : 0,  // ← Opens LEFT (not inside)
    animationSpeed
);

            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });