import React, {useEffect, useState} from 'react';
import './InputHeader.css';

const InputHeader = props => {
  const [text, setText] = useState('');
  const [subtext, setSubtext] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    if (props.text) {
      setText(props.text);
    }
    if (props.subtext) {
      setSubtext(props.subtext);
    }
    if (props.className) {
      setClassName(props.className);
    }
  }, [props]);

  return (
    <div className={`InputHeaderOuter ${className}`}>
      <div className='InputHeaderText'>{text}</div>
      <div className='InputHeaderSubtext'>{subtext}</div>
    </div>
  );
}

export default InputHeader;
