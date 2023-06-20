import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import * as THREE from "three";

export default function Home() {
  // init

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.getElementById("threeDemo")!.appendChild(renderer.domElement);
  }, []);

  // animation
  function animation(time) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);
  }
  return (
    <Box>
      <Typography
        variant="body1"
        style={{ textAlign: "center", marginBottom: 8 }}
      >
        This is ThreeJS demo!
      </Typography>
      <Box
        id="threeDemo"
        style={{ width: "100%", minHeight: 400, transition: "all 200ms" }}
      ></Box>
    </Box>
  );
}