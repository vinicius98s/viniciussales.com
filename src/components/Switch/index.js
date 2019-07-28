import React from 'react';
import PropTypes from 'prop-types';
import {
  SwitchWrapper,
  SwitchLabel,
  SwitchToggleTheme,
  SwitchSlider,
} from './styles';

const Switch = ({ handleOnToggle, checked, colorTheme }) => {
  return (
    <SwitchWrapper>
      <SwitchLabel
        active={colorTheme === 'light'}
        leftSideLabel
        colorTheme={colorTheme}
      >
        Light
      </SwitchLabel>
      <SwitchToggleTheme colorTheme={colorTheme}>
        <input onChange={handleOnToggle} type="checkbox" checked={checked} />
        <SwitchSlider colorTheme={colorTheme} />
      </SwitchToggleTheme>
      <SwitchLabel
        active={colorTheme === 'dark'}
        rightSideLabel
        colorTheme={colorTheme}
      >
        Dark
      </SwitchLabel>
    </SwitchWrapper>
  );
};

Switch.defaultProps = {
  checked: false,
  colorTheme: 'light',
};

Switch.propTypes = {
  handleOnToggle: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  colorTheme: PropTypes.string,
};

export default Switch;
