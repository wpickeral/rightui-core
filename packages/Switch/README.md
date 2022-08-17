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

## Documentation

[View documentation](https://uistudio-core-storybook-rkdhd7ec1-wpickeral.vercel.app/?path=/docs/switch--label-only)

## Styling

Helper classes are available for styling the component.

| class                                    | description                                                                                                   |
|------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `uis-switch`                             | The switch container                                                                                          |
| `uis_switch__button`                     | The switch button or input element                                                                            |
| `uis_switch__button--checked`            | The switch is enabled                                                                                         |
| `uis_switch__toggle--indicator`          | The switch toggle indicator                                                                                   |
| `uis-switch__label`                      | The switch label                                                                                              |
| `uis-switch__description`                | The switch description                                                                                        |
| `uis-switch-label-description-container` | The container for the label and description. Only available if the label and description props are available. |

## Accessibility

Follows the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#switch).