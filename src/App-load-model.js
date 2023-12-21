import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//引入性能监视器stats.js,显示帧率
import Stats from "three/addons/libs/stats.module.js";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

//创建stats对象
const stats = new Stats();
//Stats.domElement:web页面上输出计算结果,一个div元素
document.body.appendChild(stats.domElement);

let camera = null; //相机
let scene = null; //场景
let renderer = null; //渲染器
let container = null; //three挂载对象
//let controls = null; //控件

function App() {
  //let controls = null; //控件
  //初始加载场景
  const createtHREE = () => {
    //新建场景
    scene = new THREE.Scene();
    //新建一个相机（相当于眼睛，只有有了眼睛才能视物）
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    //辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // Make the camera further from the cube so we can see it better
    camera.position.set(0, 1, 2);
    camera.lookAt(0, 0, 0);
    // 生成渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container = document.getElementById("container");
    container.appendChild(renderer.domElement); //生成的渲染的实例, 这个要放到对应的dom容器里面
    //controls = new OrbitControls(camera, renderer.domElement);
    addModel();
    animate();
  };

  //生成几何体;
  const addModel = () => {
    // Load 3D model in GLB format
    const loader = new GLTFLoader();
    let model;
    // model must put in public folder
    loader.load("./models/building.glb", (gltf) => {
        model = gltf.scene;
        model.scale.set(3, 3, 3);
        model.position.z = -2;
        model.position.x = 2;
        model.position.y = 1;
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

  return <div id="container"></div>;
}

export default App;
