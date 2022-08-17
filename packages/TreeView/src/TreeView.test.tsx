import {render, screen} from '@testing-library/react';
import {Tree} from './Tree';
import {TreeItem} from './TreeItem';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe(
    'Tree View with multiple expandable and non-expandable treeitems',
    () => {

      const testTree = <Tree ariaLabel='Explorer'>
        <TreeItem content='Menu' ariaLevel={1}>
          <TreeItem content='SubMenu' ariaLevel={2}/>
          <TreeItem content='SubMenuTwo' ariaLevel={2}/>
          <TreeItem content='SubMenuThree' ariaLevel={2}/>
        </TreeItem>
        <TreeItem content='AnotherMenu' ariaLevel={2}/>
      </Tree>;

      test('Tree component renders with the correct HTML attributes',
          async () => {
            render(testTree);
            const tree = screen.getByRole('tree');
            expect(tree).toBeInTheDocument();
            expect(tree).toHaveAttribute('aria-label', 'Explorer');
            expect(tree).toHaveClass('uis-tree');
            expect(tree).toHaveAttribute('role', 'tree');
          });

      test('Expandable TreeItem renders with the correct HTML attributes',
          async () => {
            render(testTree);
            const expandableTreeItem = screen.getByText('Menu').parentElement;
            expect(expandableTreeItem).toBeInTheDocument();
            expect(expandableTreeItem).
                toHaveAttribute('aria-expanded', 'false');
            expect(expandableTreeItem).toHaveClass('uis-tree-item');
            expect(expandableTreeItem).
                not.
                toHaveAttribute('class', 'uis-tree-item--expanded');
          });

      test(
          'Expandable TreeItem expands when clicked and collapses when clicked again. The HTML attributes for the expandable TreeItem and all its children are updated accordingly',
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

            // Make sure that the children of an expandable treeitem has the correct HTML attributes

            // All children should have aria-level of 2
            expect(menuTreeItemChildren?.forEach((item, index) => {
              // Test that the aria-posinset attribute is set correctly
              expect(item).
                  toHaveAttribute('aria-posinset', (index + 1).toString());
              // Test that the aria-setsize attribute is set correctly
              expect(item).toHaveAttribute('aria-setsize', '3');
              // Test that the aria-level attribute is set correctly
              expect(item).toHaveAttribute('aria-level', '2');
              // Test that the aria-expanded attribute is set correctly
              expect(item).not.toHaveAttribute('aria-expanded');
              // expanded className are set correctly
              expect(item).not.toHaveClass('uis-tree-item--expanded');
            }));

            // Close the menu treeitem
            await userEvent.click(expandableTreeItem);
            // Check that the menu treeitem is closed
            expect(expandableTreeItem).
                toHaveAttribute('aria-expanded', 'false');
            // Check that the menu treeitem has no rendered children
            const menuTreeItemChildren2 = expandableTreeItem.querySelectorAll(
                '[role="treeitem"]');
            expect(menuTreeItemChildren2.length).toBe(0);
          });

      test('Non-Expandable TreeItem renders with the correct HTML attributes',
          async () => {
            render(testTree);
            const nonExpandableTreeItem = screen.getByText(
                'AnotherMenu').parentElement;
            expect(nonExpandableTreeItem).toBeInTheDocument();
            expect(nonExpandableTreeItem).not.toHaveAttribute('aria-expanded');
            expect(nonExpandableTreeItem).toHaveClass('uis-tree-item');
            expect(nonExpandableTreeItem).
                not.
                toHaveAttribute('class', 'uis-tree-item--expanded');
          });

      test(
          'Expand collapse icons render correctly and update accordingly based on the expanded and collapsed state.',
          async () => {
            render(testTree);
            const expandableTreeItem = screen.getByText(
                'Menu').parentElement as HTMLElement;

            expect(screen.getByTestId('expand-icon')).toBeInTheDocument();
            await userEvent.click(expandableTreeItem);
            expect(screen.getByTestId('collapse-icon')).toBeInTheDocument();
          });

    });

