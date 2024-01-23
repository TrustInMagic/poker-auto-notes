'use client';

import React from 'react';
import Player from '@/components/Player/Player';
import * as XLSX from 'xlsx';

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

  const processFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }

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
  };

  const parseArrayData = (data: string[][]) => {
    const playerData = data.slice(1);
    const parsedPlayerData: PlayerData = {};

    playerData.forEach((entry) => {
      console.log(entry[0]);
      parsedPlayerData[entry[0]] = {
        status: entry[1],
        notes: entry[2],
      };
    });

    setPlayerData(parsedPlayerData);
  };

  const searchPlayer = (name: string): PlayerSearchResults => {
    if (playerData && playerData[name]) {
      return {
        status: playerData[name].status,
        notes: playerData[name].notes,
      };
    }
    return { status: 'undefined', notes: 'undefined' };
  };

  console.log(playerData)

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
        <Player position={1} searchPlayer={searchPlayer} />
        <Player position={2} searchPlayer={searchPlayer} />
        <Player position={3} searchPlayer={searchPlayer} />
        <Player position={4} searchPlayer={searchPlayer} />
        <Player position={5} searchPlayer={searchPlayer} />
      </div>
    </div>
  );
}
