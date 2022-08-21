# @uistudio/treeview

An unstyled, lightweight, keyboard-friendly Tree View component for your React app.

## Installation

`yarn add @uistudio/treeview`

`npm i @uistudio/treeview`

## Usage

```jsx 
import { Tree, TreeItem } from '@uistudio/treeview';

const App = () => (
  <Tree label='Menu'>
    <TreeItem content="Options" ariaLevel={1}>
      <TreeItem content="Option 1" ariaLevel={2}/>
      <TreeItem content="Option 2" ariaLevel={2}/>
    </TreeItem>
    <TreeItem content="Settings" ariaLevel={1}/>
  </Tree>
);
```

## Documentation

[View full documentation](https://uistudio-core-storybook.vercel.app/?path=/docs/tree-view--with-visible-label)

## Accessibility

Follows the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices).
