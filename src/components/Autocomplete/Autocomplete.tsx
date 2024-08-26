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
  return (
    <div className={style.autocomplete}>
      {options.map((option) => (
        <AutocompleteOption
          key={option}
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
