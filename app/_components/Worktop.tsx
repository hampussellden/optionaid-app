'use client';
import React, { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

export type WorktopProps = {
  h: number;
  w: number;
  d: number;
  color: string;
  x?: number;
  y?: number;
  z?: number;
};
const Worktop = ({ h, w, d, color, x = 0, y = 0, z = 0 }: WorktopProps) => {
  return (
    <mesh position={[x, y, z]}>
      <Edges />
      <meshPhysicalMaterial color={color} flatShading roughness={0.2} metalness={0.2} clearcoat={0.5} />
      <boxGeometry args={[w, h, d]} />
    </mesh>
  );
};
export default Worktop;
