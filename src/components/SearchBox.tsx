import { useEffect, useRef } from 'react';
import './SearchBox.css';
interface SearchBoxProps {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  total: number;
}

export const SearchBox = (props: SearchBoxProps) => {
  const { placeholder = "Search places ...", disabled = false, onChange,total = 0 } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <div className='flex-row'>
   <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      className='search-box'
      onChange={handleChange}
    />
    <div>Total Results: <span className='current-item'>{total}</span></div>
    </div>
 
  );
};