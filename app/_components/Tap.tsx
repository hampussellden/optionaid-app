'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

export type TapProps = {
  x?: number;
  y?: number;
  z?: number;
  rotate?: boolean;
};

const Tap = ({ x = 0, y = 0, z = -10, rotate }: TapProps) => {
  const rotZ = rotate ? -Math.PI / 2 : 0;

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2, 1, 2),
    new THREE.Vector3(2, 0, 1),
    new THREE.Vector3(2, 0, 0),
  ]);

  return (
    <mesh position={[x, y, z]} rotation={[-Math.PI / 2, 0, rotZ]}>
      <Edges />
      <meshStandardMaterial color={'#000000'} />
      <tubeGeometry args={[curve, 30, 0.1, 20]} />
    </mesh>
  );
};
export default Tap;
