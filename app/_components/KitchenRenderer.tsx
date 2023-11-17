import React, { useState } from 'react';
import KitchenScene from './KitchenScene';
import MenuItem from './MenuItem';
import {
  ChevronLeftRounded,
  CountertopsOutlined,
  CreditCardOutlined,
  HouseOutlined,
  LockRounded,
  SaveRounded,
  SensorDoorOutlined,
} from '@mui/icons-material';
import { Front, Worktop } from '../types';
import Button from './Button';
import Box from './Box';
import ItemList from './ItemList';
import { blueprints } from './Blueprints';
import { KitchenObject } from './Blueprints';

type KitchenRendererProps = {
  front: Front | undefined;
  worktop: Worktop | undefined;
  standardFront: Front;
  standardWorktop: Worktop;
  totalCost: number;
  apartmentId: number;
  saveChanges: () => void;
  saveAndLockChanges: () => void;
  loading?: boolean;
};

const KitchenRenderer = (props: KitchenRendererProps) => {
  const [selectedBlueprint, setSelectedBlueprint] = useState<KitchenObject>(blueprints.wallKitchen);
  const [confirmLock, setConfirmLock] = useState<boolean>(false);
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'SEK',
  });
  const handleBlueprintChange = (blueprint: KitchenObject) => {
    setSelectedBlueprint(blueprint);
  };

  return (
    <Box grow noPaddingX relative>
      <ItemList horizontal center>
        <MenuItem
          icon={HouseOutlined}
          text="Wall kitchen"
          active={selectedBlueprint === blueprints.wallKitchen}
          onClick={() => handleBlueprintChange(blueprints.wallKitchen)}
        />
        <MenuItem
          icon={HouseOutlined}
          text="L kitchen"
          onClick={() => handleBlueprintChange(blueprints.LKitchen)}
          active={selectedBlueprint === blueprints.LKitchen}
        />
        {/* 
          <MenuItem
          icon={HouseOutlined}
          text="U kitchen"
          onClick={() => handleBlueprintChange(blueprints.UKitchen)}
          active={selectedBlueprint === blueprints.UKitchen}
        />
          */}
      </ItemList>
      <KitchenScene
        blueprint={selectedBlueprint}
        frontColor={props.front?.color ? props.front.color : props.standardFront.color}
        worktopColor={props.worktop?.color ? props.worktop.color : props.standardWorktop.color}
      />
      <ItemList horizontal between>
        <div className="flex flex-row ml-2">
          <MenuItem
            icon={SensorDoorOutlined}
            text={
              props.front?.front_types
                ? props.front.front_types?.name + ' ' + props.front.name
                : props.standardFront.name
            }
            noHover
          />
          <MenuItem
            icon={CountertopsOutlined}
            text={
              props.worktop?.worktop_types
                ? props.worktop.worktop_types?.make + ' ' + props.worktop.name
                : props.standardWorktop.name
            }
            noHover
          />
          <MenuItem icon={CreditCardOutlined} text={formatter.format(props.totalCost)} noHover />
        </div>
        <div className="flex flex-row gap-2 mr-2">
          <Button text="Save Changes" icon={SaveRounded} onClick={props.saveChanges} loading={props.loading} />
          <Button text="Lock in changes" icon={LockRounded} onClick={() => setConfirmLock(true)} accent />
        </div>
      </ItemList>
      {confirmLock && (
        <div className="absolute w-full h-5/6 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-4 p-8 bg-background rounded">
            <p className="text-2xl font-bold text-text">Are you ready to confirm your changes?</p>
            <Button text="Confirm" icon={LockRounded} onClick={props.saveAndLockChanges} marginZero fullWidth />
            <Button
              text="Cancel"
              icon={ChevronLeftRounded}
              onClick={() => setConfirmLock(false)}
              marginZero
              fullWidth
              transparent
            />
          </div>
        </div>
      )}
    </Box>
  );
};

export default KitchenRenderer;
