'use client';
import React from 'react';
import { Edges } from '@react-three/drei';
import Cabinet from './Cabinet';

export type CupboardProps = {
  color: string;
  x?: number;
  y?: number;
  z?: number;
}
function Oven() {
  return(
    <mesh>
      <Edges/>
      <meshStandardMaterial color={'#c6c6c6'} />
      <boxGeometry args={[6,5.44,5.85]}  />
    </mesh>
  )
}


const Cupboard = ({x=0,y=0,z=0, color}:CupboardProps) => {
  return ( 
		<mesh position={[x,y,z]}>
      <meshStandardMaterial color={'#c6c6c6'} />
      <Cabinet h={7.04} w={6} d={5.85} color={color} y={6.24}/>
      <Oven />
      <Cabinet h={7.04} w={6} d={5.85} color={color} y={-6.24}/>
    </mesh>
	);
};
export default Cupboard;