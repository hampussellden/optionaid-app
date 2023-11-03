'use client';
import React from 'react';
import { Edges } from '@react-three/drei';

export type FridgeProps = {
  h:number,
  w:number,
  d:number,
  x?: number;
  y?: number;
  z?: number;
}
const Fridge = ({h,w,d,x=0,y=0,z=0}:FridgeProps) => {
  return ( 
		<mesh position={[x,y,z]}>
      <Edges/>
      <meshStandardMaterial color={'#c6c6c6'} />
      <boxGeometry args={[w,h,d]} />
    </mesh>
	);
};
export default Fridge;