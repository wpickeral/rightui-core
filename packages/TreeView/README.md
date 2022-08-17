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

[View documentation](https://uistudio-core-storybook.vercel.app/?path=/docs/tree-view--aria-label)

## Styling

Helper classes are available for styling the component.

| class                         | description                                          |
|-------------------------------|------------------------------------------------------|
| `uis-tree`                    | The root node                                        |
| `uis-tree__label`             | The tree label if the `label` prop is not undefined  |
| `uis-tree-item`               | The treeitem container                               |
| `uis-tree-item__content`      | The treeitem content                                 |
| `uis-tree-item--focus`        | Available on the treeitem that has focus             |
| `uis-tree-item--selected`     | Available on the treeitem that is currently selected |
| `uis-tree-item--expanded`     | Available on expandable treeitems that are expanded. |
| `uis-tree-item-expand-icon`   | The expand icon                                      |
| `uis-tree-item-collapse-icon` | The collapse icon                                    |

## Accessibility

Follows the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices).