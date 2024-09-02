'use client';

import React from 'react';
import style from './Player.module.css';
import { player1, player2, player3, player4, player5 } from './player.config';
import Autocomplete from '../Autocomplete/Autocomplete';
import { searchPlayerType } from '@/app/page';

interface PlayerProps {
  position: number;
  searchPlayer: searchPlayerType;
  allPlayers: string[];
  setScrollContent: React.Dispatch<React.SetStateAction<string>>;
}

function Player({
  position,
  searchPlayer,
  allPlayers,
  setScrollContent,
}: PlayerProps) {
  const [name, setName] = React.useState<string>('');
  const [nameSaved, setNameSaved] = React.useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = React.useState<
    string[]
  >([]);
  const [playerStatus, setPlayerStatus] = React.useState<string>('');
  const [playerNotes, setPlayerNotes] = React.useState<string>('');
  const [showScroll, setShowScroll] = React.useState(true);

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

  return (
    <div
      className={style.player}
      style={{
        ...customStyle,
        borderColor:
          playerStatus === 'fish'
            ? 'green'
            : playerStatus === 'reg'
            ? 'yellow'
            : playerStatus === 'agrofish'
            ? 'red'
            : 'white',
      }}
    >
      <div>
        <Autocomplete
          options={autocompleteOptions}
          setName={setName}
          setAutocompleteOptions={setAutocompleteOptions}
        />
      </div>
      <div>
        {playerNotes.length > 1 && playerNotes !== 'undefined' ? (
          <svg
            width='20px'
            height='20px'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{
              position: 'absolute',
              top: -25,
              left: -5,
              cursor: 'pointer',
            }}
            onClick={() => {
              setShowScroll((prev) => !prev);
              showScroll ? setScrollContent(playerNotes) : setScrollContent('');
            }}
          >
            <path
              d='M20 14V7C20 5.34315 18.6569 4 17 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H13.5M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20'
              stroke='#ffff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M8 8H16'
              stroke='#ffff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M8 12H12'
              stroke='#ffff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        ) : (
          ''
        )}
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
            value={name.toLowerCase()}
          />
          <button
            className={style['set-name']}
            onClick={() => {
              if (name) {
                setNameSaved(true);
                const { status, notes } = searchPlayer(name);
                setPlayerStatus(status.replace(/ /g, ''));
                setPlayerNotes(notes);
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
              setNameSaved(false);
              setShowScroll(false);
              setName('');
              setPlayerStatus('');
              setPlayerNotes('');
              setScrollContent('');
            }}
          >
            Change name
          </button>
        </div>
      )}
    </div>
  );
}

export default Player;
