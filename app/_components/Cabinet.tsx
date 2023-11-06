'use client';
import React, { useRef, useEffect } from 'react';
import {Mesh} from 'three'
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

export type CabinetProps = {
  h: number;
  w: number;
  d: number;
  color: string;
  x?: number;
  y?: number;
  z?: number;
}
const Cabinet = ({h,w,d,color,x=0,y=0,z=0}:CabinetProps) => {

  return ( 
		<mesh position={[x,y,z]}>
      <Edges/>
      <meshStandardMaterial color={'#000000'} />
      <boxGeometry args={[w, h, d]} />
      <meshBasicMaterial color={color} />
    </mesh>
	);
};
export default Cabinet;