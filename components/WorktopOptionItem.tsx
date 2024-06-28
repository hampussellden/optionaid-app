import React, { useState } from 'react';
import Button from './Button';
import { WorktopOption } from '@/app/types';
import { DeleteOutline } from '@mui/icons-material';
import { CountertopsOutlined } from '@mui/icons-material';
import Flex from '@/Containers/Flex';
import Text from './Text';
type WorktopOptionItemProps = {
  worktopOption: WorktopOption;
  loading?: boolean;
  handleRemoveExistingOption: (id: number) => void;
};

const WorktopOptionItem = (props: WorktopOptionItemProps) => {
  const worktopOption = props.worktopOption;
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Flex classNames="bg-static w-full rounded pl-1" align="center" justify="between">
      <Flex align="center" gap={2}>
        <CountertopsOutlined />
        <Text as="p" size="medium">
          {worktopOption.worktops?.worktop_types?.make}
        </Text>
        <Text as="p" size="medium">
          {worktopOption.worktops?.name}
        </Text>
        <Text as="p" size="medium">
          {worktopOption.price}:-
        </Text>
      </Flex>

      <Button
        icon={DeleteOutline}
        loading={loading}
        marginZero
        ariaLabel="Delete worktop option"
        onClick={() => {
          props.handleRemoveExistingOption(worktopOption.id), setLoading(true);
        }}
        accent
      />
    </Flex>
  );
};

export default WorktopOptionItem;
