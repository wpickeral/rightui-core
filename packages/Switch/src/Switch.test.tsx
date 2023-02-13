import {Switch} from './Switch';

import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import userEvent from "@testing-library/user-event";

describe('Switch', () => {

    const Button = ({inputCheckbox, describedBy}: { inputCheckbox?: boolean, describedBy?: string }) => {
        return (
            <Switch inputCheckbox={inputCheckbox} description={describedBy} checked={false} onChecked={() => {
            }} label='Enable notifications'/>
        )
    }

    it('renders', () => {
        render(<Button/>);
        expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('has the role of switch', () => {
        render(<Button/>);
        expect(screen.getByRole('switch')).toBeInTheDocument();
    })

    it('has and accessible label', () => {
        render(<Button/>);
        expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
    })

    describe('when checked', () => {
        it('has sate aria-checked set to true', () => {
            render(<Button/>);
            const button = screen.getByRole('switch')
            fireEvent.click(button);
            expect(button).toHaveAttribute('aria-checked', 'true');
        })
    })

    describe('when unchecked', () => {
        it('has sate aria-checked set to true', () => {
            render(<Button/>);
            const button = screen.getByRole('switch')
            fireEvent.click(button);
            expect(button).toHaveAttribute('aria-checked', 'true');
        })
    })

    describe('When the switch element is a checkbox', () => {
        it('uses the HTML checked attribute instead of the aria-checked property', () => {
            render(<Button data-testid='switch-checkbox' inputCheckbox={true}/>);
            const button = screen.getByRole('switch')
            fireEvent.click(button);
            expect(button).toHaveAttribute('checked');
        })
    })

    describe('When the switch includes additional descriptive static text', () => {
        it('has the property aria-describedby set to the id of the element containing the static text', () => {
            const description = 'Get notified when we post new blog posts'
            render(<Button data-testid='switch-checkbox' describedBy={description}/>);
            const button = screen.getByRole('switch')
            const descriptionId = screen.getByText(description).getAttribute('id')
            expect(button).toHaveAttribute('aria-describedby', descriptionId)
        })
    })

    // Keyboard interaction
    describe('When the switch is focused', () => {
        it('can be toggled by pressing the space key', async () => {
            const user = userEvent.setup();
            render(<Button/>);
            const button = screen.getByRole('switch')
            await user.type(button, '{space}');
            expect(button).toHaveAttribute('aria-checked', 'true');
        })
    })

    describe('When the switch is focused', () => {
        it('can be toggled by pressing the enter key', async () => {
            const user = userEvent.setup();
            render(<Button/>);
            const button = screen.getByRole('switch')
            button.focus()
            await user.keyboard('{enter}');
            expect(button).toHaveAttribute('aria-checked', 'true');
        })
    })
})
