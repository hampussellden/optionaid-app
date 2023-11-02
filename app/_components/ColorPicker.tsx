import {Sketch} from '@uiw/react-color';
import { useState } from 'react';
import Button from './Button';
import { ColorLensOutlined } from '@mui/icons-material';

export type ColorPickerProps = {
  onClick: (color:string | null) => void;
}
const ColorPicker = (props: ColorPickerProps) => {
  const [hex, setHex] = useState("#fff");
  return (
    <div className='flex flex-row gap-4'>
      <Sketch
        style={{ marginLeft: 20 }}
        color={hex}
        onChange={(color) => {
        setHex(color.hex);
        }}
      />
      <div className='flex flex-col gap-2 justify-end'>
          <Button onClick={() => props.onClick(hex)} text='set color' icon={ColorLensOutlined} marginZero fullWidth/>
          <Button onClick={() => props.onClick(null)} text='reset color picker' icon={ColorLensOutlined} marginZero transparent fullWidth/>
        </div>
      </div>
  );
}
export default ColorPicker;