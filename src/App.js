import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//引入性能监视器stats.js,显示帧率
import Stats from "three/addons/libs/stats.module.js";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import './App.css';

//创建stats对象
const stats = new Stats();
//Stats.domElement:web页面上输出计算结果,一个div元素
document.body.appendChild(stats.domElement);

let camera = null; //相机
let scene = null; //场景
let renderer = null; //渲染器
let container = null; //three挂载对象
let controls = null; //控件

function App() {
  //let controls = null; //控件
  //初始加载场景
  const createtHREE = () => {
    //新建场景
    scene = new THREE.Scene();
    const color = '#114a83';
    scene.background = new THREE.Color(color);
    //新建一个相机（相当于眼睛，只有有了眼睛才能视物）
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 10000);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const spotLight = new THREE.SpotLight(0xffffff, 2.0);
    spotLight.angle = 0.15;
    spotLight.penumbra = 1;
    spotLight.castShadow = true;
    //设置阴影精细程度
    spotLight.shadow.mapSize = new THREE.Vector2(512, 512);
    //设置物体阴影的远点
    //spotLight.shadow.camera.far = 120;
    //设置物体阴影的近点
    //spotLight.shadow.camera.near = 40;
    spotLight.position.set(10, 10, 10);
    scene.add(spotLight);

    //辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // Make the camera further from the cube so we can see it better
    camera.position.set(0, 1, 2);
    camera.lookAt(0, 0, 0);
    
    // create a render and configure it with shadows
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    //开启renderer的阴影效果  
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = true;
    //renderer.toneMappingExposure = 1;
    container = document.getElementById("container");
    container.appendChild(renderer.domElement); //生成的渲染的实例, 这个要放到对应的dom容器里面

    controls = new OrbitControls(camera, renderer.domElement);
    //addPlan();
    addModel();
    animate();
  };

  const addPlan = () => {
    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(100, 20);
    const color = 'red' //#114a83';
    var planeMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(color),
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, -10, 0);
    plane.receiveShadow = true;
    scene.add(plane);
  };

  //生成几何体;
  const addModel = () => {
    // Load 3D model in GLB format
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./gltf/'); // use a full url path
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    let model;
    // model must put in public folder
    loader.load("./models/watch.glb", (gltf) => {
        model = gltf.scene;
        //model.castShadow = true;
        model.scale.set(0.003, 0.003, 0.003);
        model.position.set(0, 0.05, 0);
        model.rotation.set(-0.5, 0, 0);
        gltf.scene.traverse((child) => {
          if ( child.isMesh || child.isLight ) child.castShadow = true;
          if ( child.isMesh || child.isLight ) child.receiveShadow = true;
        });
        // gltf.scene.traverse((child) => {
        //   if ( child.isMesh ) {
        //       child.material.envMap = envMap; //reflection of the world
        //   }
        // });
        scene.add(gltf.scene);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  function animate() {
    stats.update();      //渲染循环中执行stats.update()来刷新时间
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  useEffect(() => {
    createtHREE();
  }, []);

  return (
    <div>
      <h3 class="title">Check out our best and cheapest watches</h3>
      <div id="container"></div>
    </div>
  );
}

export default App;
