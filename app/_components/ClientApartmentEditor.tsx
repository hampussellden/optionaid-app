'use client';
import React, { useEffect, useState } from 'react';
import { Apartment, KitchenType, Front, Worktop, FrontOption, WorktopOption } from '../types';
import { createClient } from '@/utils/supabase/client';
import MenuItem from './MenuItem';
import { CountertopsOutlined, CountertopsTwoTone, SensorDoorOutlined, SensorDoorTwoTone } from '@mui/icons-material';
import KitchenRenderer from './KitchenRenderer';
import ItemList from './ItemList';
import Box from './Box';

type ClientApartmentEditorProps = {
  apartment: Apartment;
  kitchenType: KitchenType;
  update: () => void;
};

const ClientApartmentEditor = (props: ClientApartmentEditorProps) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [frontOptions, setFrontOptions] = useState<FrontOption[]>([]);
  const [worktopOptions, setWorktopOptions] = useState<WorktopOption[]>([]);
  const [selectedFrontOption, setSelectedFrontOption] = useState<FrontOption | null>(null);
  const [selectedWorktopOption, setSelectedWorktopOption] = useState<WorktopOption | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [loadRender, setLoadRender] = useState<boolean>(false);

  const standardFrontOption: FrontOption = {
    id: 0,
    front_id: props.kitchenType.standard_front_id ?? null,
    kitchen_type_id: props.kitchenType.id,
    price: 0,
    fronts: props.kitchenType.fronts,
  };
  const standardWorktopOption: WorktopOption = {
    id: 0,
    kitchen_type_id: props.kitchenType.id,
    worktop_id: props.kitchenType.standard_worktop_id ?? null,
    price: 0,
    worktops: props.kitchenType.worktops,
  };
  useEffect(() => {
    setSelectedFrontOption(props.apartment.front_options ? props.apartment.front_options : null);
    setSelectedWorktopOption(props.apartment.worktop_options ? props.apartment.worktop_options : null);
    setTotalCost(props.apartment.total_cost);
  }, [props.apartment.worktop_options, props.apartment.front_options]);

  useEffect(() => {
    const fetchFrontOptionsAndWorktopOptions = async () => {
      const { data: frontOptions } = await supabase
        .from('front_options')
        .select('*,fronts(*,front_types(*))')
        .eq('kitchen_type_id', props.kitchenType.id);
      const { data: worktopOptions } = await supabase
        .from('worktop_options')
        .select('*,worktops(*,worktop_types(*))')
        .eq('kitchen_type_id', props.kitchenType.id);
      if (frontOptions && worktopOptions) {
        setFrontOptions(frontOptions as FrontOption[]);
        setWorktopOptions(worktopOptions as WorktopOption[]);
        setLoadRender(true);
      }
    };
    setLoadRender(false);
    fetchFrontOptionsAndWorktopOptions();
  }, [props.kitchenType]);

  useEffect(() => {
    var totalCost = 0;
    if (selectedFrontOption != null) {
      totalCost += selectedFrontOption?.price ?? 0;
    }
    if (selectedWorktopOption) {
      totalCost += selectedWorktopOption.price;
    }
    setTotalCost(totalCost);
  }, [selectedFrontOption, selectedWorktopOption]);

  const handleSelectFrontOption = (frontOption: FrontOption) => {
    setSelectedFrontOption(frontOption);
  };
  const handleSelectWorktopOption = (worktopOption: WorktopOption) => {
    setSelectedWorktopOption(worktopOption);
  };

  const handleSaveApartmentChanges = async () => {
    const updateApartment = async () => {
      const { data, error } = await supabase
        .from('apartments')
        .update({
          front_option_id: selectedFrontOption
            ? selectedFrontOption?.id == standardFrontOption.id
              ? null
              : selectedFrontOption?.id
            : null,
          worktop_option_id: selectedWorktopOption
            ? selectedWorktopOption.id == standardFrontOption.id
              ? null
              : selectedWorktopOption?.id
            : null,
          total_cost: totalCost,
        })
        .eq('id', props.apartment.id)
        .select();
      if (data) {
        setLoading(false);
        props.update();
      }
    };
    setLoading(true);
    updateApartment();
  };
  const handleSaveAndLockChanges = async () => {
    const saveApartmentChanges = async () => {
      const { data, error } = await supabase
        .from('apartments')
        .update({
          front_option_id: selectedFrontOption
            ? selectedFrontOption?.id == standardFrontOption.id
              ? null
              : selectedFrontOption?.id
            : null,
          worktop_option_id: selectedWorktopOption
            ? selectedWorktopOption.id == standardFrontOption.id
              ? null
              : selectedWorktopOption?.id
            : null,
          total_cost: totalCost,
          ready_for_order: true,
        })
        .eq('id', props.apartment.id)
        .select();
      if (data) setLoading(false);
    };
    setLoading(true);
    saveApartmentChanges();
  };

  return (
    <div className="flex flex-row gap-2 justify-between w-fill min-h-[85vh]">
      {props.apartment.ready_for_order ? (
        <Box grow center>
          <p className="font-bold text-2xl">
            Apartment is ready for order, no more changes can be made here. Contact your project manager if you need
            help
          </p>
        </Box>
      ) : frontOptions && worktopOptions ? (
        <Box>
          <ItemList>
            <MenuItem text="Fronts" icon={SensorDoorTwoTone} noHover />
            <ItemList indent>
              {frontOptions &&
                frontOptions.map((frontOption, i) => (
                  <>
                    {i == 0 && (
                      <MenuItem
                        text="Standard"
                        icon={SensorDoorOutlined}
                        onClick={() => handleSelectFrontOption(standardFrontOption)}
                        active={selectedFrontOption?.id == standardFrontOption.id ? true : false}
                      />
                    )}
                    {frontOption.fronts?.front_types && (
                      <MenuItem
                        key={frontOption.id}
                        text={frontOption.fronts.front_types?.name + ' ' + frontOption.fronts?.name}
                        icon={SensorDoorOutlined}
                        onClick={() => handleSelectFrontOption(frontOption)}
                        active={selectedFrontOption?.id == frontOption.id ? true : false}
                      />
                    )}
                  </>
                ))}
            </ItemList>
            <MenuItem text="Worktops" icon={CountertopsTwoTone} noHover />
            <ItemList indent>
              {worktopOptions &&
                worktopOptions.map((worktopOption, i) => (
                  <>
                    {i == 0 && (
                      <MenuItem
                        text="Standard"
                        icon={CountertopsOutlined}
                        onClick={() => handleSelectWorktopOption(standardWorktopOption)}
                        active={selectedWorktopOption?.id == standardWorktopOption.id ? true : false}
                      />
                    )}
                    {worktopOption.worktops?.worktop_types && (
                      <MenuItem
                        key={worktopOption.id}
                        text={worktopOption.worktops.worktop_types?.make + ' ' + worktopOption.worktops?.name}
                        icon={CountertopsOutlined}
                        onClick={() => handleSelectWorktopOption(worktopOption)}
                        active={selectedWorktopOption?.id == worktopOption.id ? true : false}
                      />
                    )}
                  </>
                ))}
            </ItemList>
          </ItemList>
        </Box>
      ) : (
        <div className="w-full flex justify-center items-center bg-static">
          <div
            className="inline-block h-40 w-40 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      )}
      {!props.apartment.ready_for_order &&
      frontOptions &&
      worktopOptions &&
      loadRender &&
      props.kitchenType.worktops?.worktop_types &&
      props.kitchenType.fronts?.front_types ? (
        <KitchenRenderer
          front={selectedFrontOption?.fronts ?? undefined}
          worktop={selectedWorktopOption?.worktops ?? undefined}
          standardFront={props.kitchenType?.fronts}
          standardWorktop={props.kitchenType?.worktops}
          totalCost={totalCost}
          apartmentId={props.apartment.id}
          saveChanges={handleSaveApartmentChanges}
          saveAndLockChanges={handleSaveAndLockChanges}
          loading={loading}
        />
      ) : (
        !props.apartment.ready_for_order && (
          <div className="w-full flex justify-center items-center bg-static">
            <div
              className="inline-block h-40 w-40 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>
        )
      )}
    </div>
  );
};

export default ClientApartmentEditor;
