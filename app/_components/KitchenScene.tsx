import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Cabinet from './Cabinet';
import styles from './kithcenScene.module.css';
import { Mesh } from 'three';
import { Edges, CameraControls, Environment, PresentationControls } from '@react-three/drei';
import { CabinetProps } from './Cabinet';
import Worktop from './Worktop';
import Grip from './Grip';
import Fridge from './Fridge';
import Wall from './Wall';
import Cupboard from './Cupboard';

type KitchenSceneProps = {
  frontColor: string | undefined;
  worktopColor: string | undefined;
};

const standardFrontColor = '#c6c6c6';
const standardWorktopColor = '#b5895b';
const standardSetupCabinets: Omit<CabinetProps, 'color'>[] = [
  //measures are in dm
  //ground Cabinets
  {
    h: 7.04,
    w: 6.0,
    d: 5.85,
    y: -6.24,
    x: -12,
  },
  {
    h: 7.04,
    w: 6.0,
    d: 5.85,
    y: -6.24,
    x: -6,
  },
  {
    h: 7.04,
    w: 6.0,
    d: 5.85,
    y: -6.24,
    x: 0,
  },
  {
    h: 7.04,
    w: 6.0,
    d: 5.85,
    y: -6.24,
    x: 6,
  },
  {
    h: 7.04,
    w: 6.0,
    d: 5.85,
    y: -6.24,
    x: 12,
  },
  //Wall mounted cabinets
  {
    h: 7.04,
    w: 6.0,
    d: 3.3,
    x: -12,
    y: 6.24,
    z: 1.35,
  },
  {
    h: 7.04,
    w: 6.0,
    d: 3.3,
    x: -6,
    y: 6.24,
    z: 1.35,
  },
  {
    h: 7.04,
    w: 6.0,
    d: 3.3,
    x: 0,
    y: 6.24,
    z: 1.35,
  },
  {
    h: 7.04,
    w: 6.0,
    d: 3.3,
    x: 6,
    y: 6.24,
    z: 1.35,
  },
  {
    h: 7.04,
    w: 6.0,
    d: 3.3,
    x: 12,
    y: 6.24,
    z: 1.35,
  },
  //panels
  {
    h: 22.84,
    d: 6,
    w: 0.2,
    x: -15.1,
  },
  {
    h: 21.18,
    d: 6,
    w: 0.2,
    x: 15.1,
    y: 0.83,
  },
  {
    h: 22.84,
    d: 6,
    w: 0.2,
    x: -21.3,
  },
  {
    h: 21.18,
    d: 6,
    w: 0.2,
    y: 0.83,
    x: 21.3,
  },
  //kitchen plinths
  {
    h: 1.66,
    d: 5.65,
    w: 37,
    y: -10.59,
    x: 3.5,
  },
  //ceiling plinth
  {
    h: 1.66,
    d: 0.2,
    w: 30,
    y: 10.59,
    z: 0.1,
  },
  {
    h: 1.66,
    d: 0.2,
    w: 6,
    x: -18.2,
    y: 10.59,
    z: -2.6,
  },
  {
    h: 1.66,
    d: 0.2,
    w: 6,
    x: 18.2,
    y: 10.59,
    z: -2.6,
  },
  //filler pieces
  {
    h: 22.78,
    d: 0.2,
    w: 0.8,
    x: -21.6,
    z: -2.8,
  },
  {
    h: 21.18,
    d: 0.2,
    w: 0.6,
    x: 21.7,
    z: -2.8,
    y: 0.83,
  },
];
const walls = [
  //back Wall
  {
    h: 22.84,
    d: 0.1,
    w: 44,
    z: 3.09,
  },
  //floor
  {
    h: 0.1,
    d: 18,
    w: 45,
    y: -11.49,
    z: -5.85,
    color: '#b5895b',
  },
  //Side walls
  {
    h: 22.84,
    d: 7,
    w: 0.3,
    x: -22.15,
    z: -0.3,
    color: '#b5895b',
  },
  {
    h: 22.84,
    d: 15.5,
    w: 0.3,
    x: 22.15,
    z: -7.1,
    color: '#b5895b',
  },
];
const worktopMeasures = {
  h: 0.3,
  w: 30,
  d: 6,
  y: -2.57,
};

const grips = [
  //cabinets
  { x: -9.6, y: -3.12, z: -3 },
  { x: -8.4, y: -3.12, z: -3 },
  { x: 2.4, y: -3.12, z: -3 },
  { x: 8.4, y: -3.12, z: -3 },
  { x: 9.6, y: -3.12, z: -3 },
  //cupboard
  { x: 15.8, y: -3.12, z: -3 },
  { x: 15.8, y: 3.12, z: -3 },
  //wall mounted cabinets
  { x: -9.6, y: 3.12, z: -0.51 },
  { x: -8.4, y: 3.12, z: -0.51 },
  { x: 2.4, y: 3.12, z: -0.51 },
  { x: 8.4, y: 3.12, z: -0.51 },
  { x: 9.6, y: 3.12, z: -0.51 },
];
const KitchenScene = (props: KitchenSceneProps) => {
  const frontColor = props.frontColor;
  const worktopColor = props.worktopColor;
  const containerRef = useRef<Mesh>(null);

  return (
    <div className="rounded grow">
      <Canvas camera={{ position: [5, 5, -25] }} color="#c3c3c3">
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} />
        <PresentationControls
          snap
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 8, 0]}
          polar={[0, Math.PI / 8]}
          azimuth={[-Math.PI / 6, Math.PI / 6]}
        >
          <Edges />
          <Worktop {...worktopMeasures} color={worktopColor ? worktopColor : standardWorktopColor} />
          {standardSetupCabinets.map((cabinet, index) => (
            <Cabinet key={index} {...cabinet} color={frontColor ? frontColor : standardFrontColor} />
          ))}
          {grips.map((grip, index) => (
            <Grip key={index} {...grip} />
          ))}
          <Fridge h={21.18} w={6.0} d={5.85} x={-18.2} y={-0.83} />
          {walls.map((wall, index) => (
            <Wall {...wall} key={index} />
          ))}
          <Cupboard color={frontColor ? frontColor : standardFrontColor} x={18.2} />
        </PresentationControls>
        <Environment preset="city" background blur={0.4} />
      </Canvas>
    </div>
  );
};
/*
 */

export default KitchenScene;
