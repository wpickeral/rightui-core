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
    padding-bottom: 16px;
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

  .icon {
    display: flex;
    align-items: center;
    gap: 12px;
  }

`;

export default {
  title: 'Tree View',
  component: Tree,
  subcomponents: {TreeItem},
} as ComponentMeta<typeof Tree>;

const ChevronExpand = () => {
  return (
      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'
           fill='currentColor' className='bi bi-chevron-expand'
           viewBox='0 0 16 16'>
        <path fillRule='evenodd'
              d='M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z'/>
      </svg>);
};

const ChevronCollapse = () => {
  return (
      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'
           fill='currentColor' className='bi bi-arrows-collapse'
           viewBox='0 0 16 16'>
        <path fillRule='evenodd'
              d='M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z'/>
      </svg>
  );
};

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

export const WithIcons: ComponentStory<typeof Tree> = (args) => {

  const groups = (
      <div className='icon'>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'
             fill='currentColor' className='bi bi-people' viewBox='0 0 16 16'>
          <path
              d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'/>
        </svg>
        Groups
      </div>
  );

  const addUser = (
      <div className='icon'>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'
             fill='currentColor' className='bi bi-person-plus'
             viewBox='0 0 16 16'>
          <path
              d='M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/>
          <path fill-rule='evenodd'
                d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'/>
        </svg>
        Add User
      </div>
  );

  const deleteUser = (
      <div className='icon'>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'
             fill='currentColor' className='bi bi-person-x' viewBox='0 0 16 16'>
          <path
              d='M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/>
          <path fill-rule='evenodd'
                d='M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z'/>
        </svg>
        Delete User
      </div>
  );

  return (
      <StyledTree>
        <Tree labelElementType='h3' label='User Management'>
          <TreeItem content={groups} ariaLevel={1}>
            <TreeItem content={addUser} ariaLevel={2}/>
            <TreeItem content={deleteUser} ariaLevel={3}/>
          </TreeItem>
        </Tree>
      </StyledTree>
  );
};