import React, { useState } from 'react';
import classNames from 'classnames';
import KitchenScene from './KitchenScene';
type KitchenRendererProps = {
    frontColor: string | undefined;
    worktopColor:string | undefined;
    standardFrontColor: string;
    standardWorktopColor: string;
}


const  KitchenRenderer = (props: KitchenRendererProps) => {
    const [, set] = useState();



    return (
        <div className='bg-primary rounded p-4 grow flex'>
          <KitchenScene frontColor={props.frontColor ? props.frontColor : props.standardFrontColor} worktopColor={props.worktopColor ? props.worktopColor : props.standardWorktopColor}/>
        </div>
    );
};

export default KitchenRenderer;