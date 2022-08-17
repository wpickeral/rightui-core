// Button.stories.ts|tsx
import React, {useState} from 'react';
import styled from 'styled-components';

import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Switch} from './Switch';

const StyledWrapper = styled.div`

  .uis-switch {
    all: revert;
    display: flex;
    align-items: center;
    font-family: 'Roboto', sans-serif;
  }

  .uis-switch__button input[type="checkbox"] {
    display: none;
  }

  .uis-switch__button {
    border: none;
    border-radius: 40px;
    background-color: #bdc3c7;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 2px;
    margin-right: 14px;
  }


  .uis-switch__button.uis-switch__button--checked {
    background-color: #3498db;
  }

  .uis-switch__label {
    color: #4D4D4D;
    padding-bottom: 4px;
    font-size: 14px;
  }

  .uis-switch__toggle-indicator {
    transition: all 0.3s;
    display: block;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
  }

  .uis-switch__button--checked .uis-switch__toggle-indicator {
    background-color: white;
    transform: translateX(100%);
  }

  .uis-switch-label-description-container {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }

  .uis-switch__description {
    color: #707070;
    line-height: 1.4;
  }

  .uis-switch__button:hover {
    cursor: pointer;
  }

  .uis-switch__button:focus {
    cursor: pointer;
    outline: 2px solid #3498db;
    outline-offset: 5px;
  }
`;

export default {
  title: 'Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

export const LabelOnly: ComponentStory<typeof Switch> = (args) => {
  const [checked, setChecked] = useState(false);
  return (
      <StyledWrapper>
        <Switch {...args}
                checked={checked}
                label='Enable Notifications'
                onChecked={() => setChecked(prev => !prev)}/>
      </StyledWrapper>
  );
};

export const LabelAndDescription: ComponentStory<typeof Switch> = (args) => {
  const [checked, setChecked] = useState(false);
  return (
      <StyledWrapper>
        <Switch {...args}
                checked={checked}
                label='Enable Notifications'
                description='We will send you notifications about new features and updates.'
                onChecked={() => setChecked(prev => !prev)}/>
      </StyledWrapper>
  );
};