import React, { useState } from 'react';
import classNames from 'classnames';
import Button from './Button';
import { WorktopOption } from '@/app/types';
import { DeleteOutline } from '@mui/icons-material';
type WorktopOptionItemProps = {
  worktopOption: WorktopOption;
  onClick?: any;
  loading?: boolean;
  handleRemoveExistingOption: (id: number) => void;
};

const WorktopOptionItem = (props: WorktopOptionItemProps) => {
  const worktopOption = props.worktopOption;
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-row justify-between gap-4 min-w-1/2 w-fit" key={worktopOption.id}>
      <div className="flex flex-row justify-between rounded bg-secondary py-2 px-4 gap-4" key={worktopOption.id}>
        <p className="text-lg font-semibold">
          {worktopOption.worktops?.worktop_types.make} {worktopOption.worktops?.name}
        </p>
        <p className="text-lg font-semibold">{worktopOption.price}:-</p>
      </div>
      <Button
        text="Delete"
        icon={DeleteOutline}
        loading={loading}
        onClick={() => {
          props.onClick && props.onClick(), props.handleRemoveExistingOption(worktopOption.id), setLoading(true);
        }}
        accent
      />
    </div>
  );
};

export default WorktopOptionItem;
