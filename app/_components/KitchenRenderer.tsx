import React, { useState } from 'react';
import classNames from 'classnames';
import KitchenScene from './KitchenScene';
import MenuItem from './MenuItem';
import {
  CountertopsOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  HouseOutlined,
  SaveRounded,
  SensorDoorOutlined,
} from '@mui/icons-material';
import { Front, Worktop } from '../types';
import Button from './Button';

type KitchenRendererProps = {
  front: Front | undefined;
  worktop: Worktop | undefined;
  standardFront: Front;
  standardWorktop: Worktop;
  totalCost: number;
  apartmentId: number;
  saveChanges: () => void;
  loading?: boolean;
};

const KitchenRenderer = (props: KitchenRendererProps) => {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'SEK',
  });

  return (
    <div className="bg-static rounded grow flex flex-col">
      <div className="flex flex-row gap-4 justify-center py-2">
        <MenuItem icon={HouseOutlined} text="Wall kitchen" active />
        <MenuItem icon={HouseOutlined} text="L kitchen" />
        <MenuItem icon={HouseOutlined} text="U kitchen" />
      </div>
      <KitchenScene
        frontColor={props.front?.color ? props.front.color : props.standardFront.color}
        worktopColor={props.worktop?.color ? props.worktop.color : props.standardWorktop.color}
      />
      <div className="flex flex-row gap-4 justify-center py-2">
        <MenuItem
          icon={SensorDoorOutlined}
          text={props.front?.name ? props.front.name : props.standardFront.name}
          noHover
        />
        <MenuItem
          icon={CountertopsOutlined}
          text={props.worktop?.name ? props.worktop.name : props.standardWorktop.name}
          noHover
        />
        <MenuItem icon={CreditCardOutlined} text={formatter.format(props.totalCost)} noHover />
        <Button text="Save Changes" icon={SaveRounded} onClick={props.saveChanges} loading={props.loading} />
      </div>
    </div>
  );
};

export default KitchenRenderer;
