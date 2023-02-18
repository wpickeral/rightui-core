import {Tree} from './Tree';
import {TreeItem} from './TreeItem';
import React from 'react';
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'

function TestTree() {
    return (
        <Tree ariaLabel='Explorer'>
            <TreeItem content='Menu' ariaLevel={1} data-testid='menu-test-id'>
                <TreeItem content='SubMenu' ariaLevel={2}/>
            </TreeItem>
            <TreeItem content='AnotherMenu' ariaLevel={2}/>
        </Tree>
    );
}


const user = userEvent.setup();

test('it renders', () => {
    render(<TestTree/>);
    expect(screen.getByRole('tree')).toBeInTheDocument();
})

test('all tree nodes are focusable', async () => {
    render(<TestTree/>);
    expect(screen.getByText('Menu').closest('li')).toHaveAttribute('tabindex', '0');
    screen.getAllByRole('treeitem').forEach(treeitem => {
        expect(treeitem.closest('li')).toHaveAttribute('tabindex')
    })
})

test('Sub treeitems are collapsed on initial render', () => {
    render(<TestTree/>);
    expect(screen.queryByText('SubMenu')).not.toBeInTheDocument()
})

test('Each element serving as a tree node has role treeitem', () => {
    render(<TestTree/>);
    const treeitems = screen.getAllByRole('treeitem');
    expect(treeitems.length).toBe(2);
})

test('All tree nodes are contained in or owned by an element with role tree', () => {
    render(<TestTree/>);
    const treeitems = screen.getAllByRole('treeitem');
    treeitems.forEach(treeitem => {
        const tree = treeitem.closest('[role="tree"]')
        expect(tree).toHaveAttribute('aria-label', 'Explorer')
    })
})

test('Sub Tree is not expanded on render', async () => {

    render(<TestTree/>);
    const menu = screen.getByText('Menu');

    await userEvent.click(menu);

    expect(screen.queryByText('SubMenu')).toBeInTheDocument();
})
test('Sub tree is not visible on render', () => {

    render(<TestTree/>);

    expect(screen.queryByText('SubMenu')).not.toBeInTheDocument();
})

test('Sub tree is visible visible after the menu is clicked', async () => {

    render(<TestTree/>);
    const menu = screen.getByText('Menu');
    await userEvent.click(menu);

    expect(screen.queryByText('SubMenu')).toBeInTheDocument();
})

test('Each parent node contains or owns an element with role group.', async () => {

    render(<TestTree/>);
    const menu = screen.getByText('Menu');

    await userEvent.click(menu);

    expect(screen.queryByText('SubMenu')).toBeInTheDocument();
})

test('Each element with role treeitem that serves as a parent node has aria-expanded set to false when the node is in a closed state.', () => {

    render(<TestTree/>);
    const menu = screen.getByText('Menu');
    expect(menu.closest('li')).toHaveAttribute('aria-expanded', 'false');
})

test('Each element with role treeitem that serves as a parent node has aria-expanded set to true when the node is in an open state', async () => {

    render(<TestTree/>);
    const menu = screen.getByText('Menu');
    await userEvent.click(menu);

    expect(menu.closest('li')).toHaveAttribute('aria-expanded', 'true');
})

test('end nodes have no aria-expanded attribute', () => {
    render(<TestTree/>);
    const menu = screen.getByText('AnotherMenu');
    expect(menu.closest('li')).not.toHaveAttribute('aria-expanded');
})

test('a node that is selected has aria-selected set to true', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu');
    await userEvent.click(menu);

    expect(menu.closest('li')).toHaveAttribute('aria-selected', 'true');
})

test('a node that is not selected has aria-selected set to false', () => {
    render(<TestTree/>);
    const menu = screen.getByText('AnotherMenu');

    expect(menu.closest('li')).toHaveAttribute('aria-selected', 'false');
})

test('aria-checked is not present on any element', () => {
    render(<TestTree/>);
    const menu = screen.queryAllByRole('treeitem');
    menu.forEach(item => {
        expect(item.closest('li')).not.toHaveAttribute('aria-checked');
    })
})

// Multi select is not supported
test('no more than one node in a tree can be selected at a time', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu');
    const anotherMenu = screen.getByText('AnotherMenu');
    await userEvent.click(menu);
    await userEvent.click(anotherMenu);

    expect(menu.closest('li')).toHaveAttribute('aria-selected', 'false');
    expect(anotherMenu.closest('li')).toHaveAttribute('aria-selected', 'true');
})

test('the element with the role tree has a visible label referenced by aria-labelledby or aria-label', () => {
    render(<TestTree/>);
    const tree = screen.getByRole('tree');
    expect(tree).toHaveAttribute('aria-label', 'Explorer');
})

test('the element with the role tree has a visible label', () => {
    render(<Tree label='Explorer'>
        <TreeItem content='Menu' ariaLevel={1}>
            <TreeItem content='SubMenu' ariaLevel={2}/>
        </TreeItem>
        <TreeItem content='AnotherMenu' ariaLevel={2}/>
    </Tree>)
    const tree = screen.queryByLabelText('Explorer');
    expect(tree).toBeInTheDocument();
})


test('each node has aria-level set to the level of the node in the tree structure', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu');
    expect(menu.closest('li')).toHaveAttribute('aria-level', '1');

    await userEvent.click(menu);
    const subMenu = screen.getByText('SubMenu');
    expect(subMenu.closest('li')).toHaveAttribute('aria-level', '2');
})

test('each node has aria-posinset set to the numerical position of the node among its siblings', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu');
    expect(menu.closest('li')).toHaveAttribute('aria-posinset', '1');

    await userEvent.click(menu);
    const subMenu = screen.getByText('SubMenu');
    expect(subMenu.closest('li')).toHaveAttribute('aria-posinset', '1');
})

test('each node has aria-setsize set to the number of siblings in the node\'s parent node', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu');
    expect(menu.closest('li')).toHaveAttribute('aria-setsize', '2');

    await userEvent.click(menu);
    const subMenu = screen.getByText('SubMenu');
    expect(subMenu.closest('li')).toHaveAttribute('aria-setsize', '1');
})

// Keyboard Interaction
test('When focus is on a closed node, pressing the right arrow key opens the node; focus does not move.', async () => {

    render(<TestTree/>);
    const menu = screen.getByText('Menu').closest('li')

    menu?.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.queryByText('SubMenu')).toBeInTheDocument();
    expect(menu).toHaveFocus();
})
test('When focus is on an open node, right arrow moves focus to the first child node.', async () => {

    render(<TestTree/>);
    const menu = screen.getByText('Menu').closest('li')

    menu?.focus();

    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowRight}');
    expect(screen.queryByText('SubMenu')).toBeInTheDocument();
    expect(screen.getByText('SubMenu').closest('[role=treeitem]')).toHaveFocus();
})

test('When focus is on an end node, right arrow does nothing.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('AnotherMenu').closest('li')

    menu?.focus();

    await user.keyboard('{ArrowRight}');
    expect(menu).toHaveFocus();
})


test('When focus is on a open node, pressing the left arrow key closes the node; focus does not move.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu').closest('li')

    menu?.focus();
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowLeft}');
    expect(screen.queryByText('SubMenu')).not.toBeInTheDocument();
    expect(menu).toHaveFocus();
})

test('When focus is on a child node that is also either and end node or a closed node, pressing the left arrow key moves focus to its parent node.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu').closest('li')

    menu?.focus();
    await user.keyboard('{ArrowRight}');

    const subMenu = screen.getByText('SubMenu').closest('li')
    await user.keyboard('{ArrowLeft}');

    await user.keyboard('{ArrowLeft}');
    expect(subMenu).not.toBeInTheDocument();
    expect(menu).toHaveFocus();
})

test('When focus is on a root node that is also either an end node or a closed node, pressing the left arrow key does nothing.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('AnotherMenu').closest('li')

    menu?.focus();
    await user.keyboard('{ArrowLeft}');
    expect(menu).toHaveFocus();
})

test('Down arrow moves focus to the next node that is focusable without opening or closing a node.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu').closest('li')

    menu?.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('AnotherMenu').closest('li')).toHaveFocus();
})

test('Up arrow moves focus to the previous node that is focusable without opening or closing a node.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('AnotherMenu').closest('li')

    menu?.focus();
    await user.keyboard('{ArrowUp}');
    expect(screen.getByText('Menu').closest('li')).toHaveFocus();
})

test('Home key moves focus to first node without opening or closing a node.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('AnotherMenu').closest('li')

    menu?.focus();
    await user.keyboard('{Home}');
    expect(screen.getByText('Menu').closest('li')).toHaveFocus();
})

test('End key moves focus to last node without opening or closing a node.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu').closest('li')

    menu?.focus();
    await user.keyboard('{End}');
    expect(screen.getByText('AnotherMenu').closest('li')).toHaveFocus();
})

test('Enter or Space key activates the focused node. ', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu').closest('li')

    menu?.focus();
    await user.keyboard('{Enter}');
    expect(menu).toHaveAttribute('aria-selected', 'true');
})

test('type-ahead: type a character, focus moves to the next node with a name that starts with that character.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu').closest('li')

    menu?.focus();
    await user.keyboard('A');
    expect(screen.getByText('AnotherMenu').closest('li')).toHaveFocus();
})

test('type-ahead: Search wraps to first node if matching name is not found among the nodes that follow the focused node.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('AnotherMenu').closest('li')

    menu?.focus();
    await user.keyboard('B');
    expect(screen.getByText('Menu').closest('li')).toHaveFocus();
})

test('type-ahead: Search ignores nodes that are descendants of closed nodes.', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('Menu').closest('li')

    menu?.focus();
    await user.keyboard('S');
    expect(menu).toHaveFocus();
})

test('Asterisk (*) key expands all closed nodes that are descendants of the focused node. Focus does not move', async () => {
    render(<TestTree/>);
    const menu = screen.getByText('AnotherMenu').closest('li')

    menu?.focus();
    await user.keyboard('*');
    expect(screen.getByText('SubMenu')).toBeInTheDocument();
    expect(menu).toHaveFocus();
})


