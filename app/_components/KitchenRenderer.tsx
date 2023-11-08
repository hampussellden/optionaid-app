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
  loading?: boolean;
};

const KitchenRenderer = (props: KitchenRendererProps) => {
  const [selectedBlueprint, setSelectedBlueprint] = useState<KitchenObject>(blueprints.wallKitchen);
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'SEK',
  });
  const handleBlueprintChange = (blueprint: KitchenObject) => {
    console.log('blueprint changed');
    setSelectedBlueprint(blueprint);
  };

  return (
    <Box grow noPaddingX>
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
        <MenuItem
          icon={HouseOutlined}
          text="U kitchen"
          onClick={() => handleBlueprintChange(blueprints.UKitchen)}
          active={selectedBlueprint === blueprints.UKitchen}
        />
      </ItemList>
      <KitchenScene
        blueprint={selectedBlueprint}
        frontColor={props.front?.color ? props.front.color : props.standardFront.color}
        worktopColor={props.worktop?.color ? props.worktop.color : props.standardWorktop.color}
      />
      <ItemList horizontal center>
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
      </ItemList>
    </Box>
  );
};

export default KitchenRenderer;
