// Button.stories.ts|tsx

import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Tree} from './Tree';
import {TreeItem} from './TreeItem';
import styled from 'styled-components';

const StyledTree = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    --font-color: hsl(0, 0%, 0%);
  }

  .uis-tree {
    list-style: none;
  }

  .uis-tree__label {
    padding-bottom: 12px;
    font-size: 14px;
    color: #4D4D4D;
  }

  .uis-tree-item {
    border-radius: 5px;
    font-size: 14px;
    outline: none;
    list-style: none;
  }

  .uis-tree-item__content {
    background-color: transparent;
    border: none;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 3px 8px;
    margin-bottom: 3px;
    border-radius: 5px;
  }

  .uis-tree-item__content:hover, .uis-tree-item--focus > .uis-tree-item__content {
    cursor: pointer;
    background-color: #cccccc50;
  }

  .uis-tree-item--selected > .uis-tree-item__content {
    background-color: #cccccc30;
  }

  .uis-tree-item__content svg {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }

  .uis-tree-item__content > svg {
    transition: transform 0.2s ease-in-out;
  }

  .uis-tree-item--expanded > .uis-tree-item__content > svg {
    transform: rotate(90deg);
  }
`;

export default {
  title: 'Tree View',
  component: Tree,
  subcomponents: {TreeItem},
} as ComponentMeta<typeof Tree>;

export const AriaLabel: ComponentStory<typeof Tree> = (args) => {

  return (
      <StyledTree>
        <Tree ariaLabel='Explorer'>
          <TreeItem content='Menu' ariaLevel={1}>
            <TreeItem content='Groups' ariaLevel={2}>
              <TreeItem content='Admins' ariaLevel={3}>
                <TreeItem content='Add Admin' ariaLevel={4}/>
                <TreeItem content='Delete Admin' ariaLevel={4}/>
              </TreeItem>
              <TreeItem content='Users' ariaLevel={3}>
                <TreeItem content='Add User' ariaLevel={4}/>
                <TreeItem content='Delete User' ariaLevel={4}/>
                <TreeItem content='Change Permissions' ariaLevel={4}/>
              </TreeItem>
            </TreeItem>
            <TreeItem content='Profile' ariaLevel={2}/>
          </TreeItem>
        </Tree>
      </StyledTree>
  );
};

export const VisibleLabel: ComponentStory<typeof Tree> = (args) => {

  return (
      <StyledTree>
        <Tree labelElementType='h3' label='Explorer'>
          <TreeItem content='Menu' ariaLevel={1}>
            <TreeItem content='Groups' ariaLevel={2}>
              <TreeItem content='Admins' ariaLevel={3}>
                <TreeItem content='Add Admin' ariaLevel={4}/>
                <TreeItem content='Delete Admin' ariaLevel={4}/>
              </TreeItem>
              <TreeItem content='Users' ariaLevel={3}>
                <TreeItem content='Add User' ariaLevel={4}/>
                <TreeItem content='Delete User' ariaLevel={4}/>
                <TreeItem content='Change Permissions' ariaLevel={4}/>
              </TreeItem>
            </TreeItem>
            <TreeItem content='Profile' ariaLevel={2}/>
          </TreeItem>
        </Tree>
      </StyledTree>
  );
};