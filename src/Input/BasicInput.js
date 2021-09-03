import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import './BasicInput.css';

const BasicInput = props => {
  const {maxChars, onChange, mapFunc, className, titleClass, textClass} = props;

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [initialValue, setInitialValue] = useState('');
  const [type, setType] = useState('text');
  const [name, setName] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [isMultiline, setIsMultiline] = useState(false);
  const [minHeight, setMinHeight] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    if (props.initialValue && props.initialValue !== initialValue) {
      setValue(props.initialValue);
      setInitialValue(props.initialValue);
    }
    if (props.title) {
      setTitle(props.title);
    }
    if (props.type) {
      setType(props.type);
    }
    if (props.name) {
      setName(props.name);
    }
    if (props.placeholder) {
      setPlaceholder(props.placeholder);
    }
    if (props.isMultiline) {
      setIsMultiline(props.isMultiline);
    }
    if (props.minHeight) {
      setMinHeight(props.minHeight);
    }
  }, [props, initialValue]);

  const onInputChange = useCallback((event) => {
    let value = event.target.value;

    if (maxChars && value.length > maxChars) {
      value = value.substring(0, maxChars);
    }

    if (mapFunc) {
      value = mapFunc(value);
    }

    setValue(value);

    if (onChange) {
      onChange(value);
    }
  }, [maxChars, onChange, mapFunc]);

  /**
   * Can be either an input or textarea.
   */
  const inputElement = useMemo(() => {
    const inputClass = 'BasicInputInput';

    const style = {};
    let ele;
    const inputProps = {
      name: name,
      value: value,
      onChange: onInputChange,
      placeholder: placeholder,
      ref: inputRef,
      spellCheck: false,
      autoComplete: 'on',
      maxLength: maxChars,
      style: style,
      size: '1'
    }

    const textClassName = textClass ? textClass : '';
    const inputClassName = `${inputClass} ${textClassName}`;

    if (isMultiline) {
      ele = 'textarea';
      inputProps.className = `${inputClassName} BasicInputTextArea`;
      if (minHeight) {
        style.minHeight = minHeight;
      }
    } else {
      ele = 'input'
      inputProps.className = `${inputClassName}`;
      inputProps.type = type;
    }

    return (
      React.createElement(
        ele,
        inputProps
      )
    );
  }, [inputRef, name, type, value, placeholder, onInputChange, isMultiline, maxChars, minHeight, textClass]);

  return (
    <div className={`BasicInputOuter ${className ? className : ''}`}>
      <div className={`BasicInputTitle ${titleClass ? titleClass : ''}`}>{title}</div>
      {inputElement}
    </div>
  );
}

export default BasicInput;
