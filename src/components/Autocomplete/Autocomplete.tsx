import React from 'react';
import style from './Autocomplete.module.css';

function Autocomplete({ options }: { options: string[] }) {
  return (
    <div className={style.autocomplete}>
      {options.map((option) => (
        <AutocompleteOption key={option} option={option} />
      ))}
    </div>
  );
}

function AutocompleteOption({ option }: { option: string }) {
  return <button className={style['autocomplete-option']}>{option}</button>;
}

export default Autocomplete;
