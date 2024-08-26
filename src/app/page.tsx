'use client';

import React from 'react';
import Player from '@/components/Player/Player';
import * as XLSX from 'xlsx';

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

  const processFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerData({});
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
    reader.readAsBinaryString(file as Blob);

    e.target.value = '';
  };

  const parseArrayData = (data: string[][]) => {
    const playerData = data.slice(1);
    const parsedPlayerData: PlayerData = {};

    playerData.forEach((entry) => {
      const playerName = entry[0]?.replace(/\s+/g, '').toLowerCase();
      setAllPlayers((prev) => [...prev, playerName]);
      parsedPlayerData[playerName] = {
        status: entry[1],
        notes: entry[2],
      };
    });

    setPlayerData(parsedPlayerData);
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

  return (
    <div className='app'>
      <div className='notes-container'>
        <label htmlFor='notes' className='notes'>
          Add notes
        </label>
        <input
          type='file'
          className='add-notes'
          id='notes'
          onChange={processFile}
        />
      </div>
      <div className='table'>
        <div
          className='scroll'
          style={{ visibility: scrollContent ? 'visible' : 'hidden' }}
        >
          {scrollContent}
        </div>
        <Player
          position={1}
          searchPlayer={searchPlayer}
          allPlayers={allPlayers}
          setScrollContent={setScrollContent}
        />
        <Player
          position={2}
          searchPlayer={searchPlayer}
          setScrollContent={setScrollContent}
          allPlayers={allPlayers}
        />
        <Player
          position={3}
          searchPlayer={searchPlayer}
          setScrollContent={setScrollContent}
          allPlayers={allPlayers}
        />
        <Player
          position={4}
          searchPlayer={searchPlayer}
          setScrollContent={setScrollContent}
          allPlayers={allPlayers}
        />
        <Player
          position={5}
          searchPlayer={searchPlayer}
          setScrollContent={setScrollContent}
          allPlayers={allPlayers}
        />
      </div>
    </div>
  );
}
