// Design based on Aria Authoring Guidelines defined by W3C
// https://www.w3.org/WAI/ARIA/apg/patterns/switch/

import React, {useEffect} from 'react';

export type SwitchProps = {
  /**
   * If true, the switch is checked. If false, the switch is unchecked.
   */
  checked: boolean;
  /**
   * The label for the switch.
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
   * Props to pass to the input element. Accepts an object with any props that can be passed to the input element.
   */
  inputCheckboxProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Props to pass to the button element. Accepts an object with any props that can be passed to the button element.
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
          <div className='uis-switch'>
            {label && !description ? (
                <>
                  {inputCheckbox ?
                      <div onClick={toggleCheckedState}
                           className={`uis-switch__button ${checkedState
                               ? 'uis-switch__button--checked'
                               : ''}`.trim()}>
                        <input
                            {...inputCheckboxProps}
                            aria-labelledby='uis-switch-label'
                            role='switch'
                            type='checkbox'
                            defaultChecked={checkedState}
                        />
                        <span className={`uis-switch__toggle-indicator`}
                              aria-hidden='true'/>
                      </div>
                      :
                      <button
                          {...buttonProps}
                          className={`uis-switch__button ${checkedState
                              ? 'uis-switch__button--checked'
                              : ''}`.trim()}
                          aria-labelledby='uis-switch-label'
                          role='switch'
                          type='button'
                          aria-checked={checkedState}
                          onClick={toggleCheckedState}>
            <span className={`uis-switch__toggle-indicator`}
                  aria-hidden='true'/>
                      </button>
                  }
                  <span
                      id='uis-switch-label'
                      className='uis-switch__label'
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
                             className={`uis-switch__button ${checkedState
                                 ? 'uis-switch__button--checked'
                                 : ''}`.trim()}>
                          <input
                              {...inputCheckboxProps}
                              aria-labelledby='uis-switch-label'
                              aria-describedby='uis-switch-description'
                              role='switch'
                              type='checkbox'
                              defaultChecked={checkedState}
                          />
                          <span className={`uis-switch__toggle-indicator`}
                                aria-hidden='true'/>
                        </div>
                        <div className='uis-switch-label-description-container'>
              <span
                  id='uis-switch-label'
                  className='uis-switch__label'
                  onClick={toggleCheckedState}>
            {label}
              </span>
                          <span
                              id='uis-switch-description'
                              className='uis-switch__description'
                              onClick={toggleCheckedState}>
            {description}
              </span>
                        </div>
                      </>
                      :
                      <>
                        <button className={`uis-switch__button ${checkedState
                            ? 'uis-switch__button--checked'
                            : ''}`.trim()}
                                aria-labelledby='uis-switch-label'
                                aria-describedby='uis-switch-description'
                                role='switch'
                                type='button'
                                aria-checked={checkedState}
                                onClick={toggleCheckedState}>
            <span className={`uis-switch__toggle-indicator`}
                  aria-hidden='true'/>
                        </button>
                        <div className='uis-switch-label-description-container'>
              <span
                  id='uis-switch-label'
                  className='uis-switch__label'
                  onClick={toggleCheckedState}>
            {label}
              </span>
                          <span
                              id='uis-switch-description'
                              className='uis-switch__description'
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