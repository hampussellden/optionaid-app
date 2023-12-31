'use client';
import React from 'react';
import { Edges } from '@react-three/drei';

export type GripProps = {
  x?: number;
  y?: number;
  z?: number;
  rotate?: boolean;
};
const Grip = ({ x = 0, y = 0, z = 0, rotate }: GripProps) => {
  const rotZ = rotate ? -Math.PI / 2 : 0;
  return (
    <mesh position={[x, y, z]} rotation={[-Math.PI / 2, 0, rotZ]}>
      <Edges />
      <meshStandardMaterial color={'#000000'} />
      <cylinderGeometry args={[0.2, 0.2, 0.35]} />
    </mesh>
  );
};
export default Grip;
