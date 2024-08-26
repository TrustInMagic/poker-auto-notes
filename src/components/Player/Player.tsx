'use client';

import React from 'react';
import style from './Player.module.css';
import { player1, player2, player3, player4, player5 } from './player.config';
import { PlayerSearchResults } from '@/app/page';
import Autocomplete from '../Autocomplete/Autocomplete';

interface PlayerProps {
  position: number;
  searchPlayer: (name: string) => PlayerSearchResults;
  allPlayers: string[];
}

function Player({ position, searchPlayer, allPlayers }: PlayerProps) {
  const [name, setName] = React.useState('');
  const [nameSaved, setNameSaved] = React.useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = React.useState<
    string[]
  >([]);
  const [playerStatus, setPlayerStatus] = React.useState('unknown');
  const [playerNotes, setPlayerNotes] = React.useState('unknown');

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

  const autocomplete = (query: string) => {
    allPlayers.forEach((playerName) => {
      if (playerName?.startsWith(query)) {
        setAutocompleteOptions((prev) => [...prev, playerName]);
      }
    });
  };

  console.log(autocompleteOptions);

  return (
    <div className={style.player} style={customStyle}>
      <div>
        <Autocomplete options={autocompleteOptions} />
      </div>
      {!nameSaved ? (
        <div className={style.setter}>
          <input
            className={style['name-input']}
            onChange={(e) => {
              const inputName = e.target.value;
              setAutocompleteOptions([]);
              setName(inputName);
              if (inputName) autocomplete(inputName);
            }}
          />
          <button
            className={style['set-name']}
            onClick={() => {
              if (name) {
                setNameSaved(true);
                const { status, notes } = searchPlayer(name);
                setPlayerStatus(status);
                setPlayerNotes(notes);
                console.log(status, notes);
              }
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
