// This component is a dependency for the StudioBaseComponents-Tree View Component.
// The StudioBaseComponents-Tree View component follows the WAI-ARIA authoring practices.
import React, {ReactElement, useEffect, useRef} from 'react';
import {TreeItem} from './TreeItem';

export type TreeProps = {
    /**
     * The element to render for the label of the Tree View component.
     * @default span
     */
    labelElementType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    /**
     * The label for the Tree View component.
     */
    label?: string;
    /**
     * The aria-label for the Tree View component.
     */
    ariaLabel?: string;
    /**
     * One or more TreeItem components to render as children of the Tree component.
     */
    children: ReactElement<typeof TreeItem> | ReactElement<typeof TreeItem>[];
}

export function Tree({
                         labelElementType = 'h3',
                         label,
                         ariaLabel,
                         children,
                     }: TreeProps) {

    const treeRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (treeRef.current) {
            const tree = treeRef.current as Element;
            tree.firstElementChild?.setAttribute('tabindex', '0');
        }
    }, []);

    const visibleLabelProps = {id: 'rightui-treeview-label', className: 'uis-tree__label'}
    return (
        <>
            {label ?
                <>
                    {labelElementType === 'h1' &&
                        <h1 {...visibleLabelProps}>{label}</h1>}
                    {labelElementType === 'h2' &&
                        <h2 {...visibleLabelProps}>{label}</h2>}
                    {labelElementType === 'h3' &&
                        <h3 {...visibleLabelProps}>{label}</h3>}
                    {labelElementType === 'h4' &&
                        <h4 {...visibleLabelProps}>{label}</h4>}
                    {labelElementType === 'h5' &&
                        <h5 {...visibleLabelProps}>{label}</h5>}
                    {labelElementType === 'h6' &&
                        <h6 {...visibleLabelProps}>{label}</h6>}
                    {labelElementType === 'p' &&
                        <p {...visibleLabelProps}>{label}</p>}
                    {labelElementType === 'span' &&
                        <span {...visibleLabelProps}>{label}</span>}
                    {labelElementType === undefined &&
                        <h3 {...visibleLabelProps}>{label}</h3>}
                </>
                : null}

            <ul
                ref={treeRef}
                className='uis-tree'
                aria-labelledby={label ? 'rightui-treeview-label' : undefined}
                aria-label={ariaLabel ? ariaLabel : undefined}
                role='tree'>
                {children}
            </ul>
        </>
    );
}
