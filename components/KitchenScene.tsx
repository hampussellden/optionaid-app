import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Cabinet from './Cabinet';
import { Mesh } from 'three';
import { Edges, Environment, PresentationControls } from '@react-three/drei';
import Worktop from './Worktop';
import Grip from './Grip';
import Fridge from './Fridge';
import Wall from './Wall';
import Cupboard from './Cupboard';
import { KitchenObject } from './Blueprints';
import Tap from './Tap';
import Sink from './Sink';
import Stove from './Stove';
type KitchenSceneProps = {
  frontColor: string;
  worktopColor: string;
  blueprint: KitchenObject;
};

const KitchenScene = (props: KitchenSceneProps) => {
  const frontColor = props.frontColor;
  const worktopColor = props.worktopColor;
  const worktopMeasures = props.blueprint.worktops;
  const standardSetupCabinets = props.blueprint.cabinets;
  const walls = props.blueprint.walls;
  const grips = props.blueprint.grips;
  const panels = props.blueprint.panels;
  const fridge = props.blueprint.fridge;
  const cupboard = props.blueprint.cupboard;
  const tap = props.blueprint.tap;
  const sink = props.blueprint.sink;
  const stove = props.blueprint.stove;

  return (
    <div className="rounded grow">
      <Canvas camera={{ position: [0, 5, -25] }} color="#c3c3c3">
        <ambientLight intensity={5} color={'#fff7db'} />
        <directionalLight position={[8, 8, -5]} intensity={2} />
        <PresentationControls
          global
          zoom={0.95}
          rotation={[0, -Math.PI / 6, 0]}
          polar={[-Math.PI / 12.5, Math.PI / 10]}
          azimuth={[-Math.PI / 5, Math.PI / 8]}
        >
          <Edges />
          <Tap {...tap} />
          <Sink {...sink} />
          <Stove {...stove} />
          {worktopMeasures.map((worktop, index) => (
            <Worktop key={index} {...worktop} color={worktopColor} />
          ))}
          {standardSetupCabinets.map((cabinet, index) => (
            <Cabinet key={index} {...cabinet} color={frontColor} />
          ))}
          {panels.map((panel, index) => (
            <Cabinet key={index} {...panel} color={frontColor} />
          ))}
          {grips.map((grip, index) => (
            <Grip key={index} {...grip} />
          ))}
          {walls.map((wall, index) => (
            <Wall {...wall} key={index} />
          ))}
          {fridge && <Fridge {...fridge} />}
          {cupboard && <Cupboard color={frontColor} {...cupboard} />}
          {false && <Cupboard color={frontColor} x={18.2} />}
        </PresentationControls>
        <Environment preset="sunset" background blur={0.8} />
      </Canvas>
    </div>
  );
};
export default KitchenScene;
