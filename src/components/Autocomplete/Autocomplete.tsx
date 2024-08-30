import React from 'react';
import style from './Autocomplete.module.css';

interface AutocompleteProps {
  options: string[];
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAutocompleteOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

interface AutocompleteOptionProps {
  option: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAutocompleteOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

function Autocomplete({
  options,
  setName,
  setAutocompleteOptions,
}: AutocompleteProps) {
  const autocompleteRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!autocompleteRef.current) return;
    else {
      const isHovered = autocompleteRef.current.matches(':hover');

      if (!isHovered) return;
      if (e.key === '5') {
        autocompleteRef.current.scrollBy({
          top: -50,
          behavior: 'smooth',
        });
      } else if (e.key === '4') {
        autocompleteRef.current.scrollBy({
          top: 50,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div
      className={style.autocomplete}
      ref={autocompleteRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {options.map((option, i) => (
        <AutocompleteOption
          key={i}
          option={option}
          setName={setName}
          setAutocompleteOptions={setAutocompleteOptions}
        />
      ))}
    </div>
  );
}

function AutocompleteOption({
  option,
  setName,
  setAutocompleteOptions,
}: AutocompleteOptionProps) {
  return (
    <button
      className={style['autocomplete-option']}
      onClick={(e) => {
        setName((e.target as HTMLButtonElement).textContent || '');
        setAutocompleteOptions([]);
      }}
    >
      {option}
    </button>
  );
}

export default Autocomplete;
