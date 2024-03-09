'use client';
import React from 'react';
import { Edges } from '@react-three/drei';

export type CabinetProps = {
  h: number;
  w: number;
  d: number;
  color: string;
  x?: number;
  y?: number;
  z?: number;
};
const Cabinet = ({ h, w, d, color, x = 0, y = 0, z = 0 }: CabinetProps) => {
  return (
    <mesh position={[x, y, z]}>
      <Edges />
      <meshStandardMaterial color={color} flatShading roughness={0.6} />
      <boxGeometry args={[w, h, d]} />
    </mesh>
  );
};
export default Cabinet;
