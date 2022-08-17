import {Switch} from './Switch';
import {render, screen} from '@testing-library/react';
import React from 'react';

test('Switch renders with button element', () => {

  render(<Switch checked={false} onChecked={() => {}}
                 buttonProps={{
                   id: 'test-switch-button'
                 }}
                 label='Enable notifications'
  />);

  const button = screen.getByRole('switch');

  const label = screen.getByText('Enable notifications');

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('aria-checked', 'false');
  expect(button).toHaveAttribute('aria-labelledby', 'uis-switch-label');
  expect(button).
    not.
    toHaveAttribute('aria-describedby', 'uis-switch-description');
  expect(button).toHaveAttribute('class', 'uis-switch__button');
  expect(button).not.toHaveAttribute('class', 'uis-switch__button--checked');
  expect(button).toHaveAttribute('id', 'test-switch-button');
  expect(label).toBeInTheDocument();
});

test('Switch (button) renders label and description', () => {

  render(<Switch checked={false} onChecked={() => {}}
                 label='Enable notifications'
                 description='Enable notifications to get notified of updates'
  />);

  const button = screen.getByRole('switch');
  const label = screen.getByText('Enable notifications');
  const description = screen.getByText(
    'Enable notifications to get notified of updates');

  expect(button).toHaveAttribute('aria-describedby', 'uis-switch-description');
  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test('Switch renders with input[type="checkbox] element', () => {

  render(<Switch checked={false} onChecked={() => {}}
                 inputCheckbox
                 inputCheckboxProps={{
                   name: 'enable-notifications',
                   value: 'yes'
                 }}
                 label='Enable notifications' />);

  const checkbox = screen.getByRole('switch');
  const label = screen.getByText('Enable notifications');

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toHaveAttribute('type', 'checkbox');
  expect(checkbox).toHaveAttribute('aria-labelledby', 'uis-switch-label');
  expect(checkbox).toHaveAttribute('name', 'enable-notifications');
  expect(checkbox).toHaveAttribute('value', 'yes');
  expect(checkbox).not.toHaveAttribute('checked');

  expect(label).toBeInTheDocument();
});

test('Switch (input[type="checkbox"]) renders label and description', () => {

  render(<Switch checked={false} onChecked={() => {}}
                 inputCheckbox
                 label='Enable notifications'
                 description='Enable notifications to get notified of updates'
  />);

  const button = screen.getByRole('switch');
  const label = screen.getByText('Enable notifications');
  const description = screen.getByText(
    'Enable notifications to get notified of updates');

  expect(button).toHaveAttribute('aria-describedby', 'uis-switch-description');
  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});