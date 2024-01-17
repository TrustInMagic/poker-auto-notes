'use client';

import React from 'react';
import style from './Player.module.css';
import { player1, player2, player3, player4, player5 } from './player.config';

interface PlayerProps {
  position: number;
  searchPlayer: () => void;
}

function Player({ position, searchPlayer }: PlayerProps) {
  const [name, setName] = React.useState('');
  const [nameSaved, setNameSaved] = React.useState(false);

  let customStyle;

  switch (position) {
    case 1:
      customStyle = player1;
      break;
    case 2:
      customStyle = player2;
      break;
    case 3:
      customStyle = player3;
      break;
    case 4:
      customStyle = player4;
      break;
    case 5:
      customStyle = player5;
  }

  return (
    <div className={style.player} style={customStyle}>
      {!nameSaved ? (
        <div className={style.setter}>
          <input
            className={style['name-input']}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className={style['set-name']}
            onClick={() => {
              if (name) setNameSaved(true);
            }}
          >
            Set name
          </button>
        </div>
      ) : (
        <div className={style['name-set']}>
          <div className={style.name}>{name}</div>
          <button
            className={style['edit-name']}
            onClick={() => {
              setName('');
              setNameSaved(false);
            }}
          >
            Edit name
          </button>
        </div>
      )}
    </div>
  );
}

export default Player;
