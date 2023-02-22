// Design based on Aria Authoring Guidelines defined by W3C
// https://www.w3.org/WAI/ARIA/apg/patterns/switch/

import React, {useEffect} from 'react';

export type SwitchProps = {
  /**
   * If true, the switch is checked. If false, the switch is unchecked.
   */
  checked: boolean;
  /**
   * Label text to display next to the switch.
   */
  label: string;
  /**
   * The description for the switch.
   */
  description?: string;
  /**
   * A callback for when the switch is toggled. The callback will be called with the new checked state.
   */
  onChecked: (checked: boolean) => void;
  /**
   * If true, the switch will be rendered as an input element with the type="checkbox". A button element is used by default.
   */
  inputCheckbox?: boolean;
  /**
   * Props to pass to the input element.
   */
  inputCheckboxProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Props to pass to the button element.
   */
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export const Switch = ({
      checked = false,
      label,
      description,
      onChecked,
      inputCheckbox = false,
      inputCheckboxProps,
      buttonProps,
    }: SwitchProps) => {

      const [checkedState, setCheckedState] = React.useState(checked);

      function toggleCheckedState(e: React.MouseEvent<HTMLSpanElement>) {
        onChecked(!checkedState);
        setCheckedState(!checkedState);
      }

      // If the checked prop changes, update the checked state
      useEffect(() => {
        if (checked) {
          setCheckedState(true);
        } else {
          setCheckedState(false);
        }
      }, [checked]);

      return (
          <div className='rui-switch'>
            {label && !description ? (
                <>
                  {inputCheckbox ?
                      <div onClick={toggleCheckedState}
                           className={`rui-switch__button ${checkedState
                               ? 'rui-switch__button--checked'
                               : ''}`.trim()}>
                        <input
                            {...inputCheckboxProps}
                            aria-labelledby='rui-switch-label'
                            role='switch'
                            type='checkbox'
                            defaultChecked={checkedState}
                        />
                        <span className={`rui-switch__toggle-indicator`}
                              aria-hidden='true'/>
                      </div>
                      :
                      <button
                          {...buttonProps}
                          className={`rui-switch__button ${checkedState
                              ? 'rui-switch__button--checked'
                              : ''}`.trim()}
                          aria-labelledby='rui-switch-label'
                          role='switch'
                          type='button'
                          aria-checked={checkedState}
                          onClick={toggleCheckedState}>
            <span className={`rui-switch__toggle-indicator`}
                  aria-hidden='true'/>
                      </button>
                  }
                  <span
                      id='rui-switch-label'
                      className='rui-switch__label'
                      onClick={toggleCheckedState}>
            {label}
          </span>
                </>
            ) : null}

            {description && label ?
                <>
                  {inputCheckbox ?
                      <>
                        <div onClick={toggleCheckedState}
                             className={`rui-switch__button ${checkedState
                                 ? 'rui-switch__button--checked'
                                 : ''}`.trim()}>
                          <input
                              {...inputCheckboxProps}
                              aria-labelledby='rui-switch-label'
                              aria-describedby='rui-switch-description'
                              role='switch'
                              type='checkbox'
                              defaultChecked={checkedState}
                          />
                          <span className={`rui-switch__toggle-indicator`}
                                aria-hidden='true'/>
                        </div>
                        <div className='rui-switch-label-description-container'>
              <span
                  id='rui-switch-label'
                  className='rui-switch__label'
                  onClick={toggleCheckedState}>
            {label}
              </span>
                          <span
                              id='rui-switch-description'
                              className='rui-switch__description'
                              onClick={toggleCheckedState}>
            {description}
              </span>
                        </div>
                      </>
                      :
                      <>
                        <button className={`rui-switch__button ${checkedState
                            ? 'rui-switch__button--checked'
                            : ''}`.trim()}
                                aria-labelledby='rui-switch-label'
                                aria-describedby='rui-switch-description'
                                role='switch'
                                type='button'
                                aria-checked={checkedState}
                                onClick={toggleCheckedState}>
            <span className={`rui-switch__toggle-indicator`}
                  aria-hidden='true'/>
                        </button>
                        <div className='rui-switch-label-description-container'>
              <span
                  id='rui-switch-label'
                  className='rui-switch__label'
                  onClick={toggleCheckedState}>
            {label}
              </span>
                          <span
                              id='rui-switch-description'
                              className='rui-switch__description'
                              onClick={toggleCheckedState}>
            {description}
              </span>
                        </div>
                      </>
                  }
                </>
                : null}
          </div>
      );
    }
;
