'use client';

import React from 'react';
import Player from '@/components/Player/Player';
import ScrollContent from '@/components/ScrollContent/ScrollContent';
import * as XLSX from 'xlsx';
import AddNotesSVG from '@/components/AddNotesSVG/AddNotesSVG';
import ResetSVG from '@/components/ResetSVG/ResetSVG';
import Tooltip from '@/components/Tooltip/Tooltip';

export type searchPlayerType = (name: string) => {
  status: string;
  notes: string;
};

interface PlayerData {
  [k: string]: {
    status: string;
    notes: string;
  };
}

export interface PlayerSearchResults {
  status: string;
  notes: string;
}

export default function Home() {
  const [playerData, setPlayerData] = React.useState<PlayerData>();
  const [allPlayers, setAllPlayers] = React.useState<string[]>([]);
  const [scrollContent, setScrollContent] = React.useState<string>('');
  const [uploadStatus, setUploadStatus] = React.useState(false);
  const [noteIconActive, setNoteIconActive] = React.useState<number>(0);
  const [tagMenuActive, setTagMenuActive] = React.useState<number>(0);
  const scrollRef = React.useRef(null);
  const [resetToggle, setResetToggle] = React.useState<boolean>(false);

  const processFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerData({});
    setAllPlayers([]);
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      let data;
      if (e.target) {
        data = e.target.result;
      }
      const dataRed = XLSX.read(data, { type: 'binary' });
      const wsname = dataRed.SheetNames[0];
      const ws = dataRed.Sheets[wsname];

      const dataToArray = XLSX.utils.sheet_to_json(ws, { header: 1 });
      parseArrayData(dataToArray as string[][]);
    };
    reader.readAsBinaryString(file);

    e.target.value = '';
  };

  const parseArrayData = (data: string[][]) => {
    const playerData = data.slice(1);
    const parsedPlayerData: PlayerData = {};

    playerData.forEach((entry) => {
      const playerName = entry[0]
        ?.replace(/\n/g, '/')
        ?.replace(/\s+/g, '')
        .toLowerCase();
      setAllPlayers((prev) => [...prev, playerName]);
      parsedPlayerData[playerName] = {
        status: entry[1],
        notes: entry[2],
      };
    });

    setPlayerData(parsedPlayerData);

    if (parsedPlayerData) {
      setUploadStatus(true);
    }
  };

  const searchPlayer: searchPlayerType = (name) => {
    if (playerData && playerData[name]) {
      return {
        status: playerData[name].status,
        notes: playerData[name].notes,
      };
    }
    return { status: 'undefined', notes: 'undefined' };
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNoteIconActive(0);
        setScrollContent('');
        setTagMenuActive(0);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setTagMenuActive(0);
      if (e.target !== scrollRef.current && noteIconActive !== 0) {
        setNoteIconActive(0);
        setScrollContent('');
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [noteIconActive]);

  const resetPlayers = () => {
    setResetToggle((prev) => !prev);
  };

  return (
    <div className='app'>
      <div className='top-bar-container'>
        <div className='notes-container'>
          <label htmlFor='notes' className='notes'>
            <Tooltip text='Add Notes'>
              <AddNotesSVG />
            </Tooltip>
          </label>
          <input
            type='file'
            className='add-notes'
            id='notes'
            onChange={processFile}
          />
        </div>
        <div className='reset' onClick={resetPlayers}>
          <Tooltip text='Reset'>
            <ResetSVG />
          </Tooltip>
        </div>
      </div>
      <div className='table'>
        <div className='status'>
          {uploadStatus ? 'Ready to roll!' : 'Please upload notes'}
        </div>
        <div
          ref={scrollRef}
          className='scroll'
          style={{
            opacity: scrollContent ? '100%' : '0%',
          }}
        >
          <ScrollContent content={scrollContent} />
          <div
            className='x'
            onClick={() => {
              setNoteIconActive(0);
              setScrollContent('');
            }}
          >
            ✖
          </div>
        </div>
        <Player
          position={1}
          searchPlayer={searchPlayer}
          allPlayers={allPlayers}
          setScrollContent={setScrollContent}
          setNoteIconActive={setNoteIconActive}
          noteIconActive={noteIconActive}
          setTagMenuActive={setTagMenuActive}
          tagMenuActive={tagMenuActive}
          reset={resetToggle}
        />
        <Player
          position={2}
          searchPlayer={searchPlayer}
          setScrollContent={setScrollContent}
          allPlayers={allPlayers}
          setNoteIconActive={setNoteIconActive}
          noteIconActive={noteIconActive}
          setTagMenuActive={setTagMenuActive}
          tagMenuActive={tagMenuActive}
          reset={resetToggle}
        />
        <Player
          position={3}
          searchPlayer={searchPlayer}
          setScrollContent={setScrollContent}
          allPlayers={allPlayers}
          setNoteIconActive={setNoteIconActive}
          noteIconActive={noteIconActive}
          setTagMenuActive={setTagMenuActive}
          tagMenuActive={tagMenuActive}
          reset={resetToggle}
        />
        <Player
          position={4}
          searchPlayer={searchPlayer}
          setScrollContent={setScrollContent}
          allPlayers={allPlayers}
          setNoteIconActive={setNoteIconActive}
          noteIconActive={noteIconActive}
          setTagMenuActive={setTagMenuActive}
          tagMenuActive={tagMenuActive}
          reset={resetToggle}
        />
        <Player
          position={5}
          searchPlayer={searchPlayer}
          setScrollContent={setScrollContent}
          allPlayers={allPlayers}
          setNoteIconActive={setNoteIconActive}
          noteIconActive={noteIconActive}
          setTagMenuActive={setTagMenuActive}
          tagMenuActive={tagMenuActive}
          reset={resetToggle}
        />
      </div>
    </div>
  );
}
