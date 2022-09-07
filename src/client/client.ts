import * as THREE from 'three';
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 34
camera.position.y = 20
camera.position.z = 20

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

loader.load(
    // resource URL
    './models/autumn_house/scene.gltf',
    // called when the resource is loaded
    ( gltf: GLTF ) => {

        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    },
    // called while loading is progressing
    ( xhr ) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    ( error ) => {
        console.log( 'An error happened' );
    }
);

const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
scene.add( ambientLight );

const dirLight = new THREE.DirectionalLight( 0xefefff, 0.3 );
dirLight.position.set( 30, 20, 25 );
scene.add( dirLight );

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const debugdivbody = document.getElementById("debugdivbody")

function animate() {
    requestAnimationFrame(animate)
    controls.update();

    if (debugdivbody)
    {
        debugdivbody.innerHTML = `
            Camera location:<br>
            X: ${camera.position.x}<br>
            Y: ${camera.position.y}<br>
            Z: ${camera.position.z}<br>
        `
    }

    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()
