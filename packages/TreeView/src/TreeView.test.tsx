import {render, screen} from '@testing-library/react';
import {Tree} from './Tree';
import {TreeItem} from './TreeItem';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('@uistudio/treeview test suite', () => {

  const testTree = <Tree ariaLabel='Explorer'>
    <TreeItem content='Menu' ariaLevel={1}>
      <TreeItem content='SubMenu' ariaLevel={2}/>
      <TreeItem content='SubMenuTwo' ariaLevel={2}/>
      <TreeItem content='SubMenuThree' ariaLevel={2}/>
    </TreeItem>
    <TreeItem content='AnotherMenu' ariaLevel={2}/>
  </Tree>;

  // Tree has the correct attributes
  test('Tree has correct aria-label', async () => {
    render(testTree);
    const tree = screen.getByRole('tree');
    expect(tree).toBeInTheDocument();
    expect(tree).toHaveAttribute('aria-label', 'Explorer');
    expect(tree).toHaveAttribute('role', 'tree');
    expect(tree).toHaveClass('uis-tree');
  });

  // Tree has the correct attributes
  test('Tree has correct role', async () => {
    render(testTree);
    const tree = screen.getByRole('tree');
    expect(tree).toHaveAttribute('role', 'tree');
  });

  test('Tree has correct class', async () => {
    render(testTree);
    const tree = screen.getByRole('tree');
    expect(tree).toHaveAttribute('class', 'uis-tree');
  });

  test('Expandable TreeItem not expanded on render', async () => {
    render(testTree);
    const expandableTreeItem = screen.getByText('Menu').parentElement;
    expect(expandableTreeItem).toBeInTheDocument();
    expect(expandableTreeItem).toHaveAttribute('aria-expanded', 'false');
    expect(expandableTreeItem).toHaveClass('uis-tree-item');
    expect(expandableTreeItem).
        not.
        toHaveAttribute('class', 'uis-tree-item--expanded');
  });

  test(
      'Expandable TreeItem expands when clicked and renders all child treeitems and closes when clicked again',
      async () => {
        render(testTree);
        const expandableTreeItem = screen.getByText(
            'Menu').parentElement as HTMLElement;

        await userEvent.click(expandableTreeItem);
        // Check that the menu treeitem is expanded
        expect(expandableTreeItem).toHaveAttribute('aria-expanded', 'true');
        // Check that the menu treeitem has rendered children
        const menuTreeItemChildren = expandableTreeItem.querySelectorAll(
            '[role="treeitem"]');
        expect(menuTreeItemChildren.length).toBe(3);
        expect(menuTreeItemChildren[0]).toHaveTextContent('SubMenu');
        expect(menuTreeItemChildren[1]).toHaveTextContent('SubMenuTwo');
        expect(menuTreeItemChildren[2]).toHaveTextContent('SubMenuThree');
        // Close the menu treeitem
        await userEvent.click(expandableTreeItem);
        // Check that the menu treeitem is closed
        expect(expandableTreeItem).toHaveAttribute('aria-expanded', 'false');
        // Check that the menu treeitem has no rendered children
        const menuTreeItemChildren2 = expandableTreeItem.querySelectorAll(
            '[role="treeitem"]');
        expect(menuTreeItemChildren2.length).toBe(0);
      });

  test('Expanded TreeItem aria attributes are set correctly', async () => {
    render(testTree);
    const expandableTreeItem = screen.getByText(
        'Menu').parentElement as HTMLLIElement;
    await userEvent.click(expandableTreeItem);
    const menuTreeItemChildren = expandableTreeItem.querySelectorAll(
        '[role="treeitem"]');
    // All children should have aria-level of 2
    expect(menuTreeItemChildren?.forEach((item, index) => {
      // Test that the aria-posinset attribute is set correctly
      expect(item).toHaveAttribute('aria-posinset', (index + 1).toString());
      // Test that the aria-setsize attribute is set correctly
      expect(item).toHaveAttribute('aria-setsize', '3');
      // Test that the aria-level attribute is set correctly
      expect(item).toHaveAttribute('aria-level', '2');
      // Test that the aria-expanded attribute is set correctly
      expect(item).not.toHaveAttribute('aria-expanded');
      // expanded className are set correctly
      expect(item).not.toHaveClass('uis-tree-item--expanded');
    }));
  });
});