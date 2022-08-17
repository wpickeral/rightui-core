// This component is a dependency for the UIS-Tree View Component.
// The UIS-Tree View component follows the WAI-ARIA authoring practices

import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {classes, keyCode} from './lib';

export type TreeItemProps = {
  /**
   *  The margin-left value for the TreeItem. Controls how much the tree item is indented.
   */
  indent?: number;
  /**
   * The aria-level for the Tree Item component.
   * @see https://www.w3.org/TR/wai-aria-practices-1.1/#treeview
   */
  ariaLevel: number,
  /**
   * The content of the Tree Item component.
   */
  content: ReactNode;
  /**
   * One or more TreeItems to render as children of the TreeItem component.
   */
  children?: ReactElement<typeof TreeItem> | ReactElement<typeof TreeItem>[];
  /**
   * A callback function that is called when the TreeItem is selected.
   */
  onSelect?: (event: React.SyntheticEvent<HTMLLIElement, Event> | React.KeyboardEvent) => void;
  /**
   * A callback function that is called when the TreeItem is expanded.
   */
  onExpand?: (event: React.SyntheticEvent<HTMLLIElement, Event> | React.KeyboardEvent) => void;
}

export const ChevronRightSvg = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
      <svg {...props} xmlns='http://www.w3.org/2000/svg' height='18px'
           viewBox='0 0 24 24' width='18px' fill='currentColor'>
        <path d='M0 0h24v24H0V0z' fill='none'/>
        <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z'/>
      </svg>
  );
};

const unselectTreeItem = (treeItem: HTMLLIElement) => {
  treeItem.classList.remove(classes.treeItemSelected);
  treeItem.classList.remove(classes.treeItemFocus);
  treeItem.setAttribute('aria-selected', 'false');
  treeItem.setAttribute('tabindex', '-1');
};

// Multiselect is not supported. This function will unselect the previously selected tree item.
const findAndUnselectPreviouslySelectedTreeItem = (currentNode: HTMLLIElement) => {
  const treeItems = currentNode?.closest(classes.tree)?.
      querySelectorAll(classes.treeItem) as NodeListOf<HTMLLIElement>;

  const selectedTreeItemsArray = Array.from(treeItems);
  const selectedTreeItem = selectedTreeItemsArray.find(
      treeItem => treeItem.classList.contains(
          classes.treeItemSelected)) as HTMLLIElement;
  selectedTreeItem && unselectTreeItem(selectedTreeItem);
};
// Updates the DOM attributes of the currently selected tree item.
const selectTreeItem = (treeItem: HTMLLIElement, callback?: () => void) => {
  findAndUnselectPreviouslySelectedTreeItem(treeItem);

  treeItem?.classList.add(classes.treeItemSelected);
  treeItem.setAttribute('aria-selected', 'true');
  treeItem.setAttribute('tabindex', '0');
  treeItem?.classList.add(classes.treeItemFocus);
  treeItem.focus();

  if (callback) {
    callback();
  }
};

export function TreeItem({
  children,
  content,
  onSelect,
  onExpand,
  ariaLevel,
  indent = 16,
}: TreeItemProps) {

  const treeItemRef = useRef<HTMLLIElement | null>(null);

  const [expanded, setExpanded] = useState(false);

  const isRootNode = (node: HTMLLIElement) => node.parentElement?.getAttribute(
      'role') === 'tree';

  const isExpandable = (node: HTMLLIElement) => node.getAttribute(
      'aria-expanded') !== null;

  const isNodeExpanded = (node: HTMLLIElement) => isExpandable(node) &&
      node.getAttribute('aria-expanded') === 'true';

  const isEndNode = (node: HTMLLIElement) => node.querySelector('ul') === null;

  const toggleChildTreeItem = (
      e: Event | React.SyntheticEvent<HTMLLIElement>,
      callback?: () => void) => {
    if (expanded) {
      setExpanded(false);
      treeItemRef.current?.classList.remove('uis-tree-item--expanded');
    } else {
      setExpanded(true);
      treeItemRef.current?.setAttribute('aria-expanded', 'true');
      treeItemRef.current?.classList.add('uis-tree-item--expanded');
    }
    if (callback) {
      callback();
    }
  };
  const unFocusLastTreeItemWithFocus = () => {
    const closestTreeItem = treeItemRef.current?.closest(
        classes.tree) as HTMLLIElement;
    closestTreeItem?.querySelectorAll(classes.treeItem)?.forEach((treeItem) => {
      if (treeItem.getAttribute('tabindex') === '0') {
        treeItem.setAttribute('tabindex', '-1');
        treeItem.classList.remove(classes.treeItemFocus);
        return;
      }
    });
  };

  const moveFocusToTreeItem = (treeItem: HTMLLIElement) => {
    if (treeItem) {
      unFocusLastTreeItemWithFocus();
      treeItem.setAttribute('tabindex', '0');
      treeItem.classList.add(classes.treeItemFocus);
      treeItem.focus();
    }
  };
  const moveFocusToNextTreeItem = (
      e: React.KeyboardEvent, array: HTMLLIElement[],
      direction: 'down' | 'up') => {
    if (array.length > 0) {
      const index = array.indexOf(e.currentTarget as HTMLLIElement);
      let treeItem: HTMLLIElement;
      direction === 'down'
          ? treeItem = array[index + 1]
          : treeItem = array[index - 1];
      moveFocusToTreeItem(treeItem);
    }
  };
  const moveFocusToFirstParentTreeItem = (
      e: React.KeyboardEvent, array: HTMLLIElement[]) => {
    e.preventDefault();
    if (array.length > 0) {
      const parentNode = e.currentTarget.parentElement?.parentElement as HTMLLIElement;
      moveFocusToTreeItem(parentNode);
    }
  };
  const moveFocusToFirstChildNode = (
      e: React.KeyboardEvent, array: HTMLLIElement[]) => {
    if (array.length > 0) {
      const index = array.indexOf(e.currentTarget as HTMLLIElement);
      const treeItem = array[index + 1] as HTMLLIElement;
      moveFocusToTreeItem(treeItem);
    }
  };
  const handleDownArrowKey = (
      e: React.KeyboardEvent, array: HTMLLIElement[]) => {
    if (e.key === keyCode.DOWN) {
      if (isNodeExpanded(e.currentTarget as HTMLLIElement)) {
        moveFocusToFirstChildNode(e, array);
      } else {
        moveFocusToNextTreeItem(e, array, 'down');
      }
    }
  };
  const handleUpArrowKey = (
      e: React.KeyboardEvent, array: HTMLLIElement[]) => {
    if (e.key === keyCode.UP) {
      moveFocusToNextTreeItem(e, array, 'up');
    }
  };
  const handleRightArrowKey = (
      e: React.KeyboardEvent<HTMLLIElement>,
      array: HTMLLIElement[]) => {

    if (e.key === keyCode.RIGHT) {
      const treeItem = e.currentTarget as HTMLLIElement;

      // When focus is on a closed node, opens the node; focus does not move.
      const caseOne = isEndNode(treeItem);
      // When focus is on an open node, moves focus to the first child node.
      const caseTwo = isNodeExpanded(treeItem);
      // When focus is on an end node, does nothing.
      const caseThree = isEndNode(treeItem);

      switch (true) {
        case caseOne:
          toggleChildTreeItem(e, () => onExpand && onExpand(e));
          break;
        case caseTwo:
          moveFocusToFirstChildNode(e, array);
          break;
        case caseThree:
          break;
        default:
      }
    }
  };
  const handleLeftArrowKey = (
      e: React.KeyboardEvent<HTMLLIElement>, array: HTMLLIElement[]) => {
    if (e.key === keyCode.LEFT) {

      const treeItem = e.currentTarget as HTMLLIElement;

      // When focus is on an open node, closes the node.
      const caseOne = isNodeExpanded(treeItem);
      // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
      const caseTwo = treeItem.parentElement?.getAttribute('role') !== 'tree' &&
          (isEndNode(treeItem) || !isNodeExpanded(treeItem));
      // When focus is on a root node that is also either an end node or a closed node, does nothing.
      const caseThree = isRootNode(treeItem) &&
          (isEndNode(treeItem) || !isNodeExpanded(treeItem));

      switch (true) {
        case caseOne:
          toggleChildTreeItem(e, () => onExpand && onExpand(e));
          break;
        case caseTwo:
          moveFocusToFirstParentTreeItem(e, array);
          break;
        case caseThree:
          break;
        default:
      }
    }
  };

  // Moves focus to first node without opening or closing a node.
  const handleHomeKey = (
      e: React.KeyboardEvent, array: HTMLLIElement[]) => {
    if (e.key === keyCode.HOME) {
      const homeTreeItem = array[0] as HTMLLIElement;
      moveFocusToTreeItem(homeTreeItem);
    }
  };

  // Moves focus to the last node that can be focused without expanding any nodes that are closed.
  const handleEndKey = (e: React.KeyboardEvent, array: HTMLLIElement[]) => {
    if (e.key === keyCode.END) {
      const endTreeItem = array[array.length - 1] as HTMLLIElement;
      moveFocusToTreeItem(endTreeItem);
    }
  };

  // Expands all closed sibling nodes that are at the same level as the focused node. Focus does not move.
  const handleAsteriskKey = (e: React.KeyboardEvent) => {
    if (e.key === keyCode.ASTERISK) {
      const nodeWithFocus = e.currentTarget as HTMLLIElement;
      // First we need to find out which level the event was fired on. We use this information to get the location of the focused node.
      const currentLevel = nodeWithFocus.closest('ul')?.
          firstElementChild?.
          getAttribute('aria-level');
      // Then we need to get all the siblings of the focused node. We use the aria-level to only get the siblings at the same level.
      const siblingNodes = e.currentTarget.parentElement?.querySelectorAll(
          `.uis-tree-item[aria-level="${currentLevel}"]`);
      // Then we need to get all the closed siblings of the focused node that are at the same level.
      siblingNodes?.forEach((node: Element) => {
        // Then we need to get all the closed siblings of the focused node that are at the same level.
        if (node.getAttribute('aria-expanded') === 'false') {
          // Finally, we need to expand the sibling nodes.
          const button = node as HTMLButtonElement;
          button.click();
        }
      });
      selectTreeItem(nodeWithFocus, () => onSelect && onSelect(e));
    }
  };

  const getNextTreeItemThatStartsWithChar = (
      currentNode: HTMLLIElement, char: string) => {

    let treeItems: ArrayLike<HTMLLIElement> | NodeListOf<HTMLLIElement> | undefined;
    if (expanded) {
      // If expanded, the next treeitem is the first child treeitem of the current node.
      treeItems = currentNode?.querySelectorAll(classes.treeItem);
    } else {
      // if not expanded, the next treeitem is the next sibling treeitem of the current node.
      treeItems = currentNode?.parentElement?.querySelectorAll(
          classes.treeItem);
    }

    if (treeItems) {
      const matchingChildren = Array.from(treeItems).filter(
          treeItem => treeItem.textContent?.toLowerCase().
              startsWith(char.toLowerCase()));
      const indexOfCurrentNode = matchingChildren?.indexOf(currentNode);

      return matchingChildren?.[indexOfCurrentNode +
      1];
    }

  };

  const searchWrap = (query: string, currentNode: HTMLLIElement) => {
    // Search wraps to first node if a matching name is not found among the nodes that follow the focused node.
    const allTreeItems = currentNode?.closest(classes.tree)?.
        querySelectorAll(classes.treeItem) as NodeListOf<HTMLLIElement>;

    const matchingNodes = Array.from(allTreeItems).
        filter(
            treeItem => treeItem?.textContent?.toLowerCase().startsWith(query));

    const indexOfCurrentNode = matchingNodes.indexOf(currentNode);

    const nextMatchingNode = matchingNodes[indexOfCurrentNode + 1];

    if (nextMatchingNode) {
      moveFocusToTreeItem(nextMatchingNode as HTMLLIElement);
    } else {
      moveFocusToTreeItem(matchingNodes[0] as HTMLLIElement);
    }
  };

  const handleAtoZKey = (e: React.KeyboardEvent) => {
    if (!Object.values(keyCode).includes(e.key)) {
      const query = e.key;
      const currentNode = e.currentTarget as HTMLLIElement;
      // Focus moves to the next node with a name that starts with the typed character.
      const nextMatchingTreeItem = getNextTreeItemThatStartsWithChar(
          currentNode,
          query);

      if (nextMatchingTreeItem) {
        moveFocusToTreeItem(nextMatchingTreeItem as HTMLLIElement);
      } else {
        searchWrap(query, currentNode);
      }
    }
  };

  const handleEnterOrSpaceKey = (
      e: React.KeyboardEvent) => {
    if (e.key === keyCode.ENTER || e.key === keyCode.SPACE) {
      const nodeWithFocus = e.currentTarget as HTMLLIElement;
      selectTreeItem(nodeWithFocus, () => onSelect && onSelect(e));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    e.stopPropagation();
    const treeItems = treeItemRef?.current?.closest(classes.tree)?.
        querySelectorAll(classes.treeItem) as ArrayLike<HTMLLIElement>;
    const treeItemsArr = Array.from(treeItems) as HTMLLIElement[];
    handleHomeKey(e, treeItemsArr);
    handleEndKey(e, treeItemsArr);
    handleAsteriskKey(e);
    handleAtoZKey(e);
    handleAtoZKey(e);
    handleDownArrowKey(e, treeItemsArr);
    handleUpArrowKey(e, treeItemsArr);
    handleRightArrowKey(e, treeItemsArr);
    handleLeftArrowKey(e, treeItemsArr);
    handleEnterOrSpaceKey(e);
  };

  const handleClick = (e: React.SyntheticEvent<HTMLLIElement>) => {
    e.stopPropagation();
    // We want to make sure any nodes that got focus using keyboard navigation are removed.
    // Selection does not follow focus for this library
    unFocusLastTreeItemWithFocus();
    selectTreeItem(e.currentTarget as HTMLLIElement,
        () => onSelect && onSelect(e));
    children && toggleChildTreeItem(e, () => onExpand && onExpand(e));
  };
  useEffect(() => {

    if (treeItemRef.current) {
      const getAriaSetSize = () => {
        if (treeItemRef.current) {
          return treeItemRef.current.closest('ul')?.
              childElementCount.
              toString();
        }
      };

      const getAriaPosinset = (node: HTMLLIElement) => {
        if (treeItemRef.current) {
          const arr = treeItemRef?.current?.closest('ul')?.
              querySelectorAll(classes.treeItem) as ArrayLike<HTMLLIElement>;
          return Array.from(arr).indexOf(node) + 1;
        }
      };

      const setSize = getAriaSetSize();
      const posinset = getAriaPosinset(treeItemRef.current);

      setSize && treeItemRef.current.setAttribute('aria-setsize', setSize);
      posinset &&
      treeItemRef.current.setAttribute('aria-posinset', posinset.toString()); // not zero based
    }
  }, []);

  return (
      <li
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          ref={treeItemRef}
          className='uis-tree-item'
          role='treeitem'
          aria-level={ariaLevel}
          aria-expanded={children ? expanded : undefined}
          aria-selected='false'
      >
        {/*terminal node*/}
        {!children && <div className='uis-tree-item__content'>{content}</div>}

        {/*subtrees*/}
        {children && (
            <>
              <div className='uis-tree-item__content'>
                {content}
                <ChevronRightSvg
                    data-testid='uis-tree-item-chevron-right'
                    className='uis-tree-item-chevron-right'
                    aria-hidden='true'/>
              </div>
              {expanded && <ul
                style={{marginLeft: indent}}
                className='uis-tree--subtree'
                role='group'>{children}</ul>}
            </>
        )}
      </li>
  );
}