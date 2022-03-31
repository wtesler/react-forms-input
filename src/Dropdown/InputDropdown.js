import React, {useState, useCallback, useEffect, useMemo} from 'react';
import './InputDropdown.css';
import {Icon} from "react-basic-icon";
import caretImage from "../Image/caret.svg";

const InputDropdown = props => {
  const {onChange, className, titleClass, optionClass, optionsClass, contentClass, valueClass, toggledValueClass} = props;

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [initialValue, setInitialValue] = useState('');
  const [options, setOptions] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (!props.options) {
      throw new Error("Dropdown needs options");
    }
    setOptions(props.options);

    const newInitialValue = props.initialValue;

    if (newInitialValue && newInitialValue !== initialValue) {
      setValue(newInitialValue);
      setInitialValue(newInitialValue);
    }
    if (props.title) {
      setTitle(props.title);
    }
  }, [props, initialValue]);

  const onValueClick = useCallback(() => {
    setShowOptions(!showOptions);
  }, [showOptions]);

  const onBlur = useCallback(() => {
    setShowOptions(false);
  }, []);

  const onOptionClick = useCallback((option, event) => {
    setValue(option);
    setShowOptions(false);

    if (onChange) {
      onChange(option);
    }

    event.stopPropagation();
  }, [onChange]);

  const optionsElements = useMemo(() => {
    if (!showOptions) {
      return [];
    }

    const elements = [];
    for (const option of options) {
      const element = (
        <div className={`${optionClass ? optionClass : ''} InputDropdownOption`}
             key={option}
             onClick={evt => onOptionClick(option, evt)}
             onMouseDown={evt => evt.preventDefault()}
        >
          {option}
        </div>
      )
      elements.push(element);
    }
    return elements;
  }, [options, onOptionClick, showOptions]);

  const internalToggleClass = useMemo(() => {
    return showOptions ? 'InputDropdownToggled' : '';
  }, [showOptions]);

  const externalToggleClass = useMemo(() => {
    return showOptions && toggledValueClass ? toggledValueClass : '';
  }, [showOptions, toggledValueClass]);

  return (
    <div className={`InputDropdownOuter ${className ? className : ''}`}>
      <div className={`InputDropdownTitle ${titleClass ? titleClass : ''}`}>{title}</div>
      <div className={`${contentClass ? contentClass : ''} InputDropdownContent`}>
        <div className={`InputDropdownValue ${internalToggleClass} ${valueClass ? valueClass : ''} ${externalToggleClass}`}
             onClick={onValueClick}
             onBlur={onBlur}
             tabIndex={'1'}
        >
          {value}
          <Icon className={`InputDropdownCaret ${internalToggleClass}`} src={caretImage}/>
        </div>
        <div className={`${optionsClass ? optionsClass : ''} InputDropdownOptions`}>
          {optionsElements}
        </div>
      </div>
    </div>
  );
}

export default InputDropdown;
