// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import Human from '../assets/female.glb';

// const TryOn = ({ productImageUrl }) => {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         let mounted = true;

//         const init = async () => {
//             // Initialize Three.js scene
//             const scene = new THREE.Scene();
//             const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//             const renderer = new THREE.WebGLRenderer();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             containerRef.current.appendChild(renderer.domElement);

//             // Load human figure model
//             const humanModel = await loadGLTFModel(Human); // Use imported path
//             scene.add(humanModel);

//             // Add lighting
//             const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//             scene.add(ambientLight);
//             const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//             scene.add(directionalLight);

//             // Add camera controls
//             const controls = new OrbitControls(camera, renderer.domElement);
//             controls.enableDamping = true;
//             controls.dampingFactor = 0.25;
//             controls.rotateSpeed = 0.35;
//             controls.enableZoom = true;

//             // Set camera position
//             camera.position.set(0, 2, 5);

//             const animate = () => {
//                 if (!mounted) return;
//                 requestAnimationFrame(animate);
//                 renderer.render(scene, camera);
//                 controls.update();
//             };
//             animate();
//         };

//         init();

//         return () => {
//             mounted = false;
//         };
//     }, []);

//     const loadGLTFModel = (url) => {
//         return new Promise((resolve, reject) => {
//             const loader = new GLTFLoader();
//             loader.load(
//                 url,
//                 (gltf) => resolve(gltf.scene),
//                 undefined,
//                 (error) => reject(error)
//             );
//         });
//     };

//     return (
//         <div style={{ position: 'relative' }}>
//             <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
//             <img
//                 src={productImageUrl}
//                 alt="Dress"
//                 style={{
//                     position: 'absolute',
//                     top: '10%', // Adjust the top positioning as needed
//                     left: '10%', // Adjust the left positioning as needed
//                     width: '80%', // Adjust the width to fit the model
//                     height: '80%', // Adjust the height to fit the model
//                     objectFit: 'cover'
//                 }}
//             />
//         </div>
//     );
    
// };

// export default TryOn;


// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { Canvas } from '@react-three/fiber';
// import Human from '../assets/female.glb';
// import Image from '../assets/frok.jpg';

// const TryOn = () => {
//     const containerRef = useRef(null);
//     const rendererRef = useRef(null);
//     const productImageUrl = Image; // Replace with your dress image URL

//     useEffect(() => {
//         let mounted = true;

//         const init = async () => {
//             const scene = new THREE.Scene();
//             const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//             const renderer = new THREE.WebGLRenderer();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             rendererRef.current = renderer;
//             containerRef.current.appendChild(renderer.domElement);

//             try {
//                 // Load human model
//                 const humanModel = await loadGLTFModel(Human);
//                 scene.add(humanModel);

//                 // Load dress image texture
//                 const dressTexture = await loadTexture(productImageUrl);

//                 // Traverse through the model's children to find the dress mesh
//                 humanModel.traverse((child) => {
//                     if (child.isMesh && isDressMesh(child)) {
//                         // Remove current dress material
//                         child.material.dispose();
//                         // Apply the image texture to the dress mesh
//                         child.material = new THREE.MeshBasicMaterial({ map: dressTexture });
//                         child.material.needsUpdate = true;
//                     }
//                 });

//                 // Add lighting
//                 const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//                 scene.add(ambientLight);
//                 const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//                 scene.add(directionalLight);

//                 // Add camera controls
//                 const controls = new OrbitControls(camera, renderer.domElement);
//                 controls.enableDamping = true;
//                 controls.dampingFactor = 0.25;
//                 controls.rotateSpeed = 0.35;
//                 controls.enableZoom = true;

//                 camera.position.set(0, 2, 5);

//                 // Animation loop
//                 const animate = () => {
//                     if (!mounted) return;
//                     requestAnimationFrame(animate);
//                     renderer.render(scene, camera);
//                     controls.update();
//                 };
//                 animate();
//             } catch (error) {
//                 console.error('Error initializing scene:', error);
//             }
//         };

//         init();

//         return () => {
//             mounted = false;
//             if (rendererRef.current) {
//                 rendererRef.current.dispose();
//             }
//         };
//     }, []);

//     const loadGLTFModel = (url) => {
//         return new Promise((resolve, reject) => {
//             const loader = new GLTFLoader();
//             loader.load(
//                 url,
//                 (gltf) => resolve(gltf.scene),
//                 undefined,
//                 (error) => reject(error)
//             );
//         });
//     };

//     const loadTexture = (url) => {
//         return new Promise((resolve, reject) => {
//             const textureLoader = new THREE.TextureLoader();
//             textureLoader.load(
//                 url,
//                 (texture) => resolve(texture),
//                 undefined,
//                 (error) => reject(error)
//             );
//         });
//     };

//     const isDressMesh = (mesh) => {
//         // Check if the mesh has UV coordinates
//         if (!mesh.geometry.attributes.uv) {
//             return false; // Mesh doesn't have UV coordinates, so it's not the dress
//         }
    
//         // Access UV coordinates
//         const uv = mesh.geometry.attributes.uv.array;
    
//         // Define the range of UV coordinates that correspond to the dress area
//         const dressUmin = 0.1; // Minimum U coordinate for dress area
//         const dressUmax = 0.9; // Maximum U coordinate for dress area
//         const dressVmin = 0.1; // Minimum V coordinate for dress area
//         const dressVmax = 0.9; // Maximum V coordinate for dress area
    
//         // Sample UV coordinates (you might adjust these based on your model)
//         const sampleU = uv[0]; // Sample U coordinate of the first vertex
//         const sampleV = uv[2]; // Sample V coordinate of the first vertex
    
//         // Check if the UV coordinates fall within the dress range
//         if (sampleU >= dressUmin && sampleU <= dressUmax && sampleV >= dressVmin && sampleV <= dressVmax) {
//             return true; // Mesh is part of the dress
//         } else {
//             return false; // Mesh is not part of the dress
//         }
//     };
    

//     return (
//         <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }} />
//     );
// };

// export default TryOn;



// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// import Dress2Image from '../assets/frok.jpg'; // Add more dress images as needed
// import Human from '../assets/female.glb';

// const TryOn = () => {
//     const containerRef = useRef(null);
//     const rendererRef = useRef(null);
  
//     useEffect(() => {
//       let mounted = true;
  
//       const init = async () => {
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         rendererRef.current = renderer;
//         containerRef.current.appendChild(renderer.domElement);
  
//         // Load the 3D model of the person
//         const personModel = await loadGLTFModel(Human);
//         scene.add(personModel);
  
//         // Load the 3D model of the clothing item
//         const clothingModel = await loadGLTFModel(Dress2Image);
//         // Position, rotate, and scale the clothing model to fit the person's body
//         clothingModel.position.set(0, 0, 0); // Adjust position as needed
//         clothingModel.rotation.set(0, 0, 0); // Adjust rotation as needed
//         clothingModel.scale.set(1, 1, 1); // Adjust scale as needed
//         scene.add(clothingModel);
  
//         // Add lighting
//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//         scene.add(ambientLight);
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//         scene.add(directionalLight);
  
//         // Add camera controls
//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.enableDamping = true;
//         controls.dampingFactor = 0.25;
//         controls.rotateSpeed = 0.35;
//         controls.enableZoom = true;
  
//         camera.position.set(0, 2, 5);
  
//         // Animation loop
//         const animate = () => {
//           if (!mounted) return;
//           requestAnimationFrame(animate);
//           renderer.render(scene, camera);
//           controls.update();
//         };
//         animate();
//       };
  
//       init();
  
//       return () => {
//         mounted = false;
//         if (rendererRef.current) {
//           rendererRef.current.dispose();
//         }
//       };
//     }, []);
  
//     const loadGLTFModel = (url) => {
//       return new Promise((resolve, reject) => {
//         const loader = new GLTFLoader();
//         loader.load(
//           url,
//           (gltf) => resolve(gltf.scene),
//           undefined,
//           (error) => reject(error)
//         );
//       });
//     };
  
//     return (
//       <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }} />
//     );
//   };
// export default TryOn;




import React, { useRef, useEffect,useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Human from '../assets/female.glb';
import dress from '../assets/frok2.png';

const tryon = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const imageRef = useRef(null);
    const scaleRef = useRef(1);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            // Create scene
            const scene = new THREE.Scene();
            sceneRef.current = scene;

            // Create camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 2, 5);
            cameraRef.current = camera;

            // Create renderer
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            rendererRef.current = renderer;
            containerRef.current.appendChild(renderer.domElement);

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            scene.add(directionalLight);

            // Load 3D model
            const loader = new GLTFLoader();
            loader.load(
                Human, // Replace with the path to your 3D model file
                (gltf) => {
                    scene.add(gltf.scene);

                    // Raycaster setup
                    const raycaster = new THREE.Raycaster();
                    const mouse = new THREE.Vector2();

                    // Mouse move event listener
                    function onMouseMove(event) {
                        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                    }
                    window.addEventListener('mousemove', onMouseMove, false);

                    // Double-click event listener
                    function onDoubleClick(event) {
                        if (event.button === 0) {
                            setIsFixed(prev => !prev); // Toggle the flag to indicate whether the image is fixed
                        }
                    }
                    window.addEventListener('dblclick', onDoubleClick, false);

                    // Render loop
                    const animate = () => {
                        if (!mounted) return;
                        requestAnimationFrame(animate);

                        // Update the picking ray with the camera and mouse position
                        raycaster.setFromCamera(mouse, camera);

                        // Calculate objects intersecting the picking ray
                        const intersects = raycaster.intersectObject(gltf.scene, true);

                        // If there's an intersection, position and scale the image at the intersection point
                        if (intersects.length > 0) {
                            const waistPosition = intersects[0].point;
                            if (!isFixed) {
                                imageRef.current.position.copy(waistPosition);
                                imageRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
                            }
                        }

                        renderer.render(scene, camera);
                    };
                    animate();
                },
                undefined,
                (error) => console.error('Error loading 3D model:', error)
            );

            // Add camera controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.rotateSpeed = 0.35;
            controls.enableZoom = true;

            // Add the image to the scene as a texture
            const textureLoader = new THREE.TextureLoader();
            const imageTexture = textureLoader.load(dress); // Replace with the path to your image file
            const imageMaterial = new THREE.MeshBasicMaterial({ map: imageTexture });
            const imageSize = 1; // Adjust the size of the image plane
            const imageGeometry = new THREE.PlaneGeometry(imageSize, imageSize);
            const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
            scene.add(imageMesh);
            imageRef.current = imageMesh;
        };

        init();

        return () => {
            mounted = false;
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };
    }, [isFixed]);

    const handleScaleChange = (event) => {
        scaleRef.current = parseFloat(event.target.value);
    };

    return (
        // <div>
        //     <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }} />
        //     <input type="range" min="0.1" max="2" step="0.1" defaultValue="1" onChange={handleScaleChange} />
        // </div>
        <div className="flex justify-center items-center h-screen bg-blue-100">
        <div ref={containerRef} className="w-full h-full " />
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                defaultValue="1"
                onChange={handleScaleChange}
                className="w-1/2"
            />
        </div>
    </div>
    );
};
export default tryon;


