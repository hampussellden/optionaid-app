import React, { useState } from 'react';
import classNames from 'classnames';
import Button from './Button';
import { FrontOption } from '@/app/types';
import { DeleteOutline} from '@mui/icons-material';
type FrontOptionItemProps = {
    frontOption: FrontOption;
    onClick?: any;
    loading?: boolean;
    handleRemoveExistingOption: (id:number) => void;
}


const FrontOptionItem = (props: FrontOptionItemProps) => {
    const frontOption = props.frontOption;
    const [loading, setLoading] = useState<boolean>(false);
    return (
      <div className='flex flex-row justify-between gap-4 min-w-1/2 w-fit' key={frontOption.id}>
      <div className='flex flex-row justify-between rounded bg-secondary py-2 px-4 gap-4' key={frontOption.id}>
        <p className='text-lg font-semibold'>{frontOption.fronts?.front_types.name} {frontOption.fronts?.name}</p>
        <p className='text-lg font-semibold'>{frontOption.price}:-</p>
      </div>
      <Button icon={DeleteOutline} text='Delete' loading={loading} onClick={() => {
        props.onClick && props.onClick(),
        props.handleRemoveExistingOption(frontOption.id),
        setLoading(true)
        }}/>
    </div>
    );
};

export default FrontOptionItem;