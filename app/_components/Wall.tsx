'use client';
import React, { useRef, useEffect } from 'react';
import { Edges } from '@react-three/drei';

export type WallProps = {
  h: number;
  w: number;
  d: number;
  color?: string;
  x?: number;
  y?: number;
  z?: number;
};
const Wall = ({ h, w, d, x = 0, y = 0, z = 0, color = '#f8f8f8' }: WallProps) => {
  return (
    <mesh position={[x, y, z]}>
      <Edges />
      <meshStandardMaterial color={color} flatShading roughness={0.8} />
      <boxGeometry args={[w, h, d]} />
    </mesh>
  );
};
export default Wall;
