import React from 'react';
import './ColorButtons.css';
import classNames from 'classnames';
import { colors } from '../../constants';

const colorButtons = ({ color, onChangeColor }) => {

  const getColorButtonClass = (umbrellaColor) => {
    return classNames({
      ['Color-swatch']: true,
      [`Color-swatch--${umbrellaColor}`]: umbrellaColor,
      [`Color-active--${color}`]: color === umbrellaColor
    });
  }

  return (
    <div className='Swatch'>
      {
        colors.map(umbrellaColor => (
          <span
            key={umbrellaColor}
            className={getColorButtonClass(umbrellaColor)}
            onClick={(event) => onChangeColor(event, umbrellaColor)}
          >
          </span>
        ))
      }
    </div>
  );
};

export default colorButtons;