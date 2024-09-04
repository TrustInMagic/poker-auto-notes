import React from 'react';
import style from './TagMenu.module.css';

interface TagMenuProps {
  setPlayerStatus: React.Dispatch<React.SetStateAction<string>>;
}

function TagMenu({ setPlayerStatus }: TagMenuProps) {
  return (
    <div className={style.menu}>
      <TagMenuOption
        option={'reg'}
        color={'yellow'}
        setPlayerStatus={setPlayerStatus}
      />
      <TagMenuOption
        option={'fish'}
        color={'green'}
        setPlayerStatus={setPlayerStatus}
      />
      <TagMenuOption
        option={'agrofish'}
        color={'red'}
        setPlayerStatus={setPlayerStatus}
      />
    </div>
  );
}

interface TagMenuOptionProps {
  option: string;
  setPlayerStatus: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}

function TagMenuOption({ option, setPlayerStatus, color }: TagMenuOptionProps) {
  return (
    <div
      className={style['player-type']}
      onClick={() => setPlayerStatus(option)}
    >
      <div className={style.color} style={{ backgroundColor: color }} />
      <div
        className={style.option}
        onClick={() => setPlayerStatus(option?.replace(/ /g, '').toLowerCase())}
      >
        {option}
      </div>
    </div>
  );
}

export default TagMenu;
