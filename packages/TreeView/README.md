# @rightui/treeview

An unstyled, lightweight, keyboard-friendly Tree View component for your React app.

## Installation

`yarn add @rightui/treeview`

`npm i @rightui/treeview`

## Usage

```jsx 
import {Tree, TreeItem} from '@rightui/treeview';

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

## Example

Checkout the component in [Sandbox](https://codesandbox.io/s/silly-panka-hdqyr8?file=/src/App.js).

## Documentation

[View full documentation](https://rightui-core-storybook.vercel.app/?path=/docs/tree-view--with-visible-label)

## Accessibility

Follows the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).



