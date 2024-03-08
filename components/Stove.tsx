'use client';
import React from 'react';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

export type StoveProps = {
  x?: number;
  y?: number;
  z?: number;
  rotate?: boolean;
};
const Stove = ({ x = 0, y = 0, z = -10, rotate }: StoveProps) => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, 2);
  shape.lineTo(1, 2);
  shape.lineTo(1, 0);
  shape.lineTo(0, 0);

  const extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 2.4,
    bevelOffset: 0,
    bevelSegments: 2,
  };

  const rotY = rotate ? 0 : -Math.PI / 2;
  return (
    <mesh position={[x, y, z]} rotation={[-Math.PI / 2, 0, rotY]}>
      <Edges />
      <meshStandardMaterial color={'#000000'} />
      <extrudeGeometry args={[shape, extrudeSettings]} />
    </mesh>
  );
};
export default Stove;
