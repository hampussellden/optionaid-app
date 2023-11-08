'use client';
import React from 'react';
import { Edges } from '@react-three/drei';

export type SinkProps = {
  x?: number;
  y?: number;
  z?: number;
  rotate?: boolean;
};
const Sink = ({ x = 0, y = 0, z = 0 }: SinkProps) => {
  return (
    <mesh position={[x, y, z]} rotation={[0, 0, 0]}>
      <Edges />
      <meshStandardMaterial color={'#3c3c3c'} />
      <cylinderGeometry args={[2.2, 0.4, 2]} />
    </mesh>
  );
};
export default Sink;
