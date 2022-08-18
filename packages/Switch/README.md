# @uistudio/switch

An unstyled, lightweight, keyboard-friendly switch component for your React app.

## Installation

`yarn add @uistudio/switch`

`npm i @uistudio/switch`

## Usage

```jsx 
import Switch from '@uistudio/switch';

const [isChecked, setIsChecked] = useState(false);

const App = () => (
  <Switch
    label='Enable Notifications'
    checked={isChecked}
    onChecked={(checked) => setIsChecked(checked)}
  />
);
```

## Example

View in [Sandbox](https://codesandbox.io/s/nifty-sun-7o2iev).

## Documentation

[View full documentation](https://uistudio-core-storybook-rkdhd7ec1-wpickeral.vercel.app/?path=/docs/switch--label-only)
