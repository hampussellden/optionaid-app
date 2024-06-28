import React, { useState } from 'react';
import Button from './Button';
import { FrontOption } from '@/app/types';
import { DeleteOutline, SensorDoorOutlined } from '@mui/icons-material';
import Flex from '@/Containers/Flex';
import Text from './Text';
type FrontOptionItemProps = {
  frontOption: FrontOption;
  loading?: boolean;
  handleRemoveExistingOption: (id: number) => void;
};

const FrontOptionItem = (props: FrontOptionItemProps) => {
  const frontOption = props.frontOption;
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Flex classNames="bg-static w-full rounded pl-1" align="center" justify="between">
      <Flex gap={2} align="center">
        <SensorDoorOutlined />
        <Text as="p" size="medium">
          {frontOption.fronts?.front_types?.name} {frontOption.fronts?.name}
        </Text>
        <Text as="p" size="medium">
          {frontOption.price}:-
        </Text>
      </Flex>
      <Button
        icon={DeleteOutline}
        loading={loading}
        ariaLabel="Delete front option"
        onClick={() => {
          props.handleRemoveExistingOption(frontOption.id);
          setLoading(true);
        }}
        accent
      />
    </Flex>
  );
};

export default FrontOptionItem;
