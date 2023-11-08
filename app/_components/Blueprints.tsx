type BoxObject = {
  h: number;
  w: number;
  d: number;
  x?: number;
  y?: number;
  z?: number;
  color?: string;
};

type PlacementObject = {
  x: number;
  y: number;
  z: number;
  rotate?: boolean;
};

export type KitchenObject = {
  cabinets: BoxObject[];
  panels: BoxObject[];
  worktops: BoxObject[];
  walls: BoxObject[];
  grips: PlacementObject[];
  fridge?: BoxObject;
  cupboard?: { x?: number; y?: number; z?: number; rotate?: boolean };
  tap?: PlacementObject;
  sink?: PlacementObject;
  stove?: PlacementObject;
};

type Blueprints = {
  [key: string]: KitchenObject;
};

export const blueprints: Blueprints = {
  wallKitchen: {
    cabinets: [
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
      //Island cabinets
      {
        h: 7.04,
        w: 6.0,
        d: 5.85,
        y: -6.24,
        z: -16,
        x: 18.6,
      },
      {
        h: 7.04,
        w: 6.0,
        d: 5.85,
        y: -6.24,
        z: -16,
        x: 12.6,
      },
      {
        h: 7.04,
        w: 6.0,
        d: 5.85,
        y: -6.24,
        z: -16,
        x: 6.6,
      },
    ],
    panels: [
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
      {
        h: 1.66,
        d: 5.65,
        w: 18.45,
        y: -10.59,
        z: -16,
        x: 13,
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
        h: 21.18,
        d: 0.2,
        w: 0.6,
        x: 21.7,
        z: -2.8,
        y: 0.83,
      },
    ],
    worktops: [
      {
        h: 0.3,
        w: 30,
        d: 6,
        y: -2.57,
      },
      {
        h: 0.3,
        w: 18.75,
        d: 6.2,
        y: -2.57,
        z: -16,
        x: 12,
      },
    ],
    walls: [
      //back Wall
      {
        h: 22.84,
        d: 0.1,
        w: 100,
        z: 3.09,
        color: '#3c3c3c',
      },
      //floor
      {
        h: 0.1,
        d: 100,
        w: 100,
        y: -11.49,
        z: -5.85,
        color: '#403218',
      },
      //Side walls
      {
        h: 22.84,
        d: 100,
        w: 0.3,
        x: 22.15,
        z: -7.1,
        color: '#3c3c3c',
      },
    ],
    grips: [
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
      //island
      { x: 16.4, y: -3.12, z: -19 },
      { x: 9, y: -3.12, z: -19 },
      { x: 10.2, y: -3.12, z: -19 },
      { x: 16.4, y: -3.12, z: -12.85 },
      { x: 9, y: -3.12, z: -12.85 },
      { x: 10.2, y: -3.12, z: -12.85 },
    ],
    fridge: {
      h: 21.18,
      w: 6.0,
      d: 5.85,
      x: -18.2,
      y: -0.83,
    },
    cupboard: {
      x: 18.2,
    },
    sink: {
      x: -6,
      z: -0.3,
      y: -3.3,
    },
    tap: {
      x: -9.2,
      z: 2.1,
      y: -2.35,
    },
    stove: {
      x: 5,
      z: -0.5,
      y: -4,
    },
  },
  LKitchen: {
    cabinets: [
      {
        h: 7.04,
        w: 6.0,
        d: 5.85,
        y: -6.24,
        x: -18,
        z: 3,
      },
      {
        h: 7.04,
        w: 6.0,
        d: 5.85,
        y: -6.24,
        x: -12,
        z: 3,
      },
      {
        h: 7.04,
        w: 6.0,
        d: 5.85,
        y: -6.24,
        x: -6,
        z: 3,
      },
      {
        h: 7.04,
        w: 6.0,
        d: 5.85,
        y: -6.24,
        x: 0,
        z: 3,
      },
      {
        h: 7.04,
        w: 5.85,
        d: 10.5,
        y: -6.24,
        x: 6.5,
        z: -2.275,
      },
      {
        h: 7.04,
        w: 5.85,
        d: 6,
        y: -6.24,
        x: 6.5,
        z: -10.5,
      },
      {
        h: 7.04,
        w: 5.85,
        d: 6,
        y: -6.24,
        x: 6.5,
        z: -16.5,
      },
      //Wall mounted cabinets
      {
        h: 7.04,
        w: 6.0,
        d: 3.3,
        x: -18,
        y: 6.24,
        z: 4.35,
      },
      {
        h: 7.04,
        w: 6.0,
        d: 3.3,
        x: -12,
        y: 6.24,
        z: 4.35,
      },
      {
        h: 7.04,
        w: 6.0,
        d: 3.3,
        x: -6,
        y: 6.24,
        z: 4.35,
      },
      {
        h: 7.04,
        w: 8.7,
        d: 3.3,
        y: 6.24,
        x: 1.35,
        z: 4.35,
      },
      {
        h: 7.04,
        w: 3.3,
        d: 6,
        y: 6.24,
        x: 7.85,
        z: 1.5,
      },
      {
        h: 7.04,
        w: 3.3,
        d: 6,
        y: 6.24,
        x: 7.85,
        z: -4.5,
      },
      {
        h: 7.04,
        w: 3.3,
        d: 6,
        y: 6.24,
        x: 7.85,
        z: -10.5,
      },
      {
        h: 7.04,
        w: 3.3,
        d: 6,
        y: 6.24,
        x: 7.85,
        z: -16.5,
      },
    ],
    panels: [
      //panels
      {
        h: 22.84,
        d: 6,
        w: 0.2,
        x: -21.1,
        z: 3,
      },
      {
        h: 22.84,
        d: 6,
        w: 0.2,
        x: -27.3,
        z: 3,
      },
      {
        h: 21.18,
        d: 0.2,
        w: 6,
        x: 6.5,
        y: 0.83,
        z: -19.6,
      },
      {
        h: 22.84,
        d: 0.2,
        w: 6,
        x: 6.5,
        z: -25.7,
      },
      //kitchen plinths
      {
        h: 1.66,
        d: 5.65,
        w: 25.5,
        y: -10.59,
        x: -9,
        z: 3,
      },
      {
        h: 1.66,
        d: 28.2,
        w: 5.65,
        y: -10.59,
        z: -11.5,
        x: 6.65,
      },
      //ceiling plinth
      {
        h: 1.66,
        d: 0.2,
        w: 30.5,
        y: 10.6,
        z: 3.2,
        x: -5.754,
      },
      {
        h: 1.66,
        d: 25,
        w: 0.2,
        y: 10.6,
        z: -8.5,
        x: 6.5,
      },
      {
        h: 1.66,
        d: 6,
        w: 0.2,
        y: 10.6,
        z: -22.7,
        x: 4.5,
      },
      {
        h: 1.66,
        d: 0.2,
        w: 6,
        y: 10.6,
        z: 0.35,
        x: -24.21,
      },
      //filler pieces
      {
        h: 22.78,
        d: 0.2,
        w: 0.8,
        x: -27.8,
        z: 1.8,
      },
      {
        h: 7.04,
        d: 0.2,
        w: 0.5,
        x: 3.25,
        z: 0.2,
        y: -6.24,
      },
      {
        h: 7.04,
        d: 0.2,
        w: 0.5,
        x: 5.95,
        z: 2.8,
        y: 6.24,
      },
    ],
    worktops: [
      {
        h: 0.3,
        w: 36,
        d: 6,
        y: -2.57,
        z: 3,
        x: -3,
      },
      {
        h: 0.3,
        w: 6,
        d: 19.6,
        y: -2.57,
        z: -9.7,
        x: 6.5,
      },
    ],
    walls: [
      {
        h: 22.84,
        d: 0.1,
        w: 100,
        z: 6.09,
        color: '#3c3c3c',
      },
      //floor
      {
        h: 0.1,
        d: 100,
        w: 100,
        y: -11.49,
        z: -2.85,
        color: '#403218',
      },
      //Side walls
      {
        h: 22.84,
        d: 100,
        w: 0.3,
        x: 9.65,
        z: -4.1,
        color: '#3c3c3c',
      },
    ],
    grips: [
      //Base cabinets
      { x: -9.6, y: -3.12, z: 0 },
      { x: -8.4, y: -3.12, z: 0 },
      { x: -2.6, y: -3.12, z: 0 },
      { x: 8.4, y: -3.12, z: 0 },
      { x: 9.6, y: -3.12, z: 0 },
      { x: -15.6, y: -3.12, z: 0 },
      { x: 3.45, y: -3.12, z: -7, rotate: true },
      { x: 3.45, y: -3.12, z: -8, rotate: true },
      { x: 3.45, y: -3.12, z: -14, rotate: true },
      //cupboard
      { x: 3.45, y: -3.12, z: -20.2, rotate: true },
      { x: 3.45, y: 3.12, z: -20.2, rotate: true },
      //wall mounted cabinets
      { x: -15.6, y: 3.12, z: 2.49 },
      { x: -9.6, y: 3.12, z: 2.49 },
      { x: -8.4, y: 3.12, z: 2.49 },
      { x: -2.6, y: 3.12, z: 2.49 },
      { x: 6, y: 3.12, z: -0.9, rotate: true },
      { x: 6, y: 3.12, z: -6.9, rotate: true },
      { x: 6, y: 3.12, z: -7.9, rotate: true },
      { x: 6, y: 3.12, z: -13.9, rotate: true },
    ],
    fridge: {
      h: 21.18,
      w: 6.0,
      d: 5.85,
      x: -24.2,
      y: -0.83,
      z: 3,
    },
    cupboard: {
      x: 6.5,
      z: -22.7,
      rotate: true,
    },
    sink: {
      x: -12,
      z: 2.7,
      y: -3.3,
    },
    tap: {
      x: -15.5,
      z: 4.8,
      y: -2.35,
    },
    stove: {
      x: 6.2,
      z: -9.4,
      y: -4,
      rotate: true,
    },
  },
};
