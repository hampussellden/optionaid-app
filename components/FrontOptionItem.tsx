import React, { useState } from 'react';
import Button from './Button';
import { FrontOption } from '@/app/types';
import { DeleteOutline, SensorDoorOutlined } from '@mui/icons-material';
type FrontOptionItemProps = {
  frontOption: FrontOption;
  loading?: boolean;
  handleRemoveExistingOption: (id: number) => void;
};

const FrontOptionItem = (props: FrontOptionItemProps) => {
  const frontOption = props.frontOption;
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-row justify-between items-center gap-4 w-full max-w-sm">
      <div className="flex flex-row justify-between rounded bg-secondary py-2 px-4 w-full">
        <div className="flex flex-row items-center gap-1 mr-4">
          <SensorDoorOutlined />
          <p className="text-lg font-semibold">
            {frontOption.fronts?.front_types.name} {frontOption.fronts?.name}
          </p>
        </div>
        <p className="text-lg font-semibold">{frontOption.price}:-</p>
      </div>
      <Button
        icon={DeleteOutline}
        loading={loading}
        marginZero
        ariaLabel="Delete front option"
        onClick={() => {
          props.handleRemoveExistingOption(frontOption.id);
          setLoading(true);
        }}
        accent
      />
    </div>
  );
};

export default FrontOptionItem;
