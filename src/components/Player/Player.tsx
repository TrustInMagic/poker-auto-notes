import React from 'react';
import style from './Player.module.css';
import { player1, player2, player3, player4, player5 } from './player.config';
import Autocomplete from '../Autocomplete/Autocomplete';
import { searchPlayerType } from '@/app/page';
import NoteIcon from '../NoteIcon/NoteIcon';
import TagMenu from '../TagMenu/TagMenu';
import Timer from '../Timer/Timer';

interface PlayerProps {
  position: number;
  searchPlayer: searchPlayerType;
  allPlayers: string[];
  setScrollContent: React.Dispatch<React.SetStateAction<string>>;
  setNoteIconActive: React.Dispatch<React.SetStateAction<number>>;
  setTagMenuActive: React.Dispatch<React.SetStateAction<number>>;
  noteIconActive: number;
  tagMenuActive: number;
  reset: boolean;
}

function Player({
  position,
  searchPlayer,
  allPlayers,
  setScrollContent,
  setNoteIconActive,
  noteIconActive,
  tagMenuActive,
  setTagMenuActive,
  reset,
}: PlayerProps) {
  const [name, setName] = React.useState<string>('');
  const [nameSaved, setNameSaved] = React.useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = React.useState<
    string[]
  >([]);
  const [playerStatus, setPlayerStatus] = React.useState<string>('');
  const [playerNotes, setPlayerNotes] = React.useState<string>('');
  const [showTagMenu, setShowTagMenu] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [showTimer, setShowTimer] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const playerBox = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - playerBox.left;
    const y = e.clientY - playerBox.top;

    setTagMenuActive(position);
    setMenuPosition({ x, y });
    setShowTagMenu(true);
  };

  React.useEffect(() => {
    setName('');
    setNameSaved(false);
    setPlayerStatus('');
    setPlayerNotes('');
    setScrollContent('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  React.useEffect(() => {
    if (name) {
      setTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false);
        setShowTimer(true);
      }, 3000);
    } else {
      setShowTimer(false);
      setTyping(false);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [name]);

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
      onContextMenu={handleRightClick}
    >
      <div>
        <Autocomplete
          options={autocompleteOptions}
          setName={setName}
          setAutocompleteOptions={setAutocompleteOptions}
        />
      </div>
      <div>
        {playerNotes?.length > 1 && playerNotes !== 'undefined' ? (
          <NoteIcon
            setScrollContent={setScrollContent}
            playerNotes={playerNotes}
            noteIconActive={noteIconActive}
            setNoteIconActive={setNoteIconActive}
            position={position}
          />
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
                setPlayerStatus(status?.replace(/ /g, ''));
                setPlayerNotes(notes);
                setAutocompleteOptions([]);
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
      {showTagMenu && position === tagMenuActive && name && (
        <div
          style={{
            position: 'absolute',
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
            zIndex: 1000,
          }}
        >
          <TagMenu setPlayerStatus={setPlayerStatus} />
        </div>
      )}
      <Timer active={showTimer} />
    </div>
  );
}

export default Player;
