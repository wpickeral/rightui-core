import {Switch} from './Switch';

import {render, screen} from '@testing-library/react';
import React from 'react';
import userEvent from "@testing-library/user-event";

describe('Switch', () => {

    test('it renders', () => {
        render(<Switch checked={false} onChecked={() => {
        }} label='Enable notifications'/>)

        expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    test('calls onChecked when clicked', async () => {
        const user = userEvent.setup();

        const handleChange = jest.fn();
        render(<Switch checked={false} onChecked={handleChange} label='Enable notifications'/>)

        const button = screen.getByRole('switch')
        await user.click(button);

        expect(handleChange).toHaveBeenCalledTimes(1);
    })

    test('it has the role of switch', () => {
        render(<Switch checked={false} onChecked={() => {
        }} label='Enable notifications'/>)

        expect(screen.getByRole('switch')).toBeInTheDocument();
    })

    test('it has and accessible label', () => {
        render(<Switch checked={false} onChecked={() => {
        }} label='Enable notifications'/>)

        expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
    })

    describe('when checked', () => {
        it('has aria-checked set to true', async () => {
            const user = userEvent.setup();

            render(<Switch checked={false} onChecked={() => {
            }} label='Enable notifications'/>)

            const button = screen.getByRole('switch')
            await user.click(button);

            expect(button).toHaveAttribute('aria-checked', 'true');
        })
    })

    describe('when unchecked', () => {
        it('has sate aria-checked set to true', async () => {
            const user = userEvent.setup();

            render(<Switch checked={false} onChecked={() => {
            }} label='Enable notifications'/>)

            const button = screen.getByRole('switch')
            await user.click(button);

            expect(button).toHaveAttribute('aria-checked', 'true');
        })
    })

    describe('When the switch element is a checkbox', () => {
        it('uses the HTML checked attribute instead of the aria-checked property', async () => {
            const user = userEvent.setup();

            render(<Switch checked={false} inputCheckbox={true} onChecked={() => {
            }} label='Enable notifications'/>)

            const button = screen.getByRole('switch')
            await user.click(button);

            expect(button).toHaveAttribute('checked');
        })
    })

    describe('When the switch includes additional descriptive static text', () => {
        it('has the property aria-describedby set to the id of the element containing the static text', () => {
            const description = 'Get notified when we post new blog posts'

            render(<Switch checked={false} description={description} onChecked={() => {
            }} label='Enable notifications'/>)

            const button = screen.getByRole('switch')
            const descriptionId = screen.getByText(description).getAttribute('id')

            expect(button).toHaveAttribute('aria-describedby', descriptionId)
        })
    })

    // Keyboard interaction
    describe('When the switch is focused', () => {
        it('can be toggled by pressing the space key', async () => {
            const user = userEvent.setup();

            render(<Switch checked={false} onChecked={() => {
            }} label='Enable notifications'/>)

            const button = screen.getByRole('switch')
            await user.type(button, '{space}');

            expect(button).toHaveAttribute('aria-checked', 'true');
        })
    })

    describe('When the switch is focused', () => {
        it('can be toggled by pressing the enter key', async () => {
            const user = userEvent.setup();

            render(<Switch checked={false} onChecked={() => {
            }} label='Enable notifications'/>)

            const button = screen.getByRole('switch')
            button.focus()
            await user.keyboard('{enter}');

            expect(button).toHaveAttribute('aria-checked', 'true');
        })
    })
})
