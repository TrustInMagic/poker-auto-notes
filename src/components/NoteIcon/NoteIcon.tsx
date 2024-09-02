import React from 'react';

interface NoteIconProps {
  setScrollContent: React.Dispatch<React.SetStateAction<string>>;
  playerNotes: string;
  setNoteIconActive: React.Dispatch<React.SetStateAction<number>>;
  noteIconActive: number;
  position: number;
}

function NoteIcon({
  setScrollContent,
  playerNotes,
  noteIconActive,
  setNoteIconActive,
  position,
}: NoteIconProps) {
  let isActive = noteIconActive === position;

  return (
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
        setScrollContent(playerNotes);
        setNoteIconActive(position);
      }}
    >
      <path
        d='M20 14V7C20 5.34315 18.6569 4 17 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H13.5M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20'
        stroke={isActive ? '#90ffff' : '#ffff'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 8H16'
        stroke={isActive ? '#90ffff' : '#ffff'}
        strokeWidth={isActive ? '4' : '2'}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 12H12'
        stroke={isActive ? '#90ffff' : '#ffff'}
        strokeWidth={isActive ? '3' : '2'}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default NoteIcon;
