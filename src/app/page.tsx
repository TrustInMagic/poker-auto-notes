'use client';

import React from 'react';
import Player from '@/components/Player/Player';
import * as XLSX from 'xlsx';

export default function Home() {
  const [uploadedFile, setUploadedFile] = React.useState<string | unknown>('');

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

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setUploadedFile(dataParse as unknown);
    };
    reader.readAsBinaryString(file as Blob);
  };

  const searchPlayer = () => {};

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
