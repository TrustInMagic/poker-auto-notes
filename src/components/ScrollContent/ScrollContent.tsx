import React from 'react';
import style from './ScrollContent.module.css';

function ScrollContent({ content }: { content: string }) {
  const lines = content.split(/[\r\n]+|; ?/);
  const trimmedLines: string[] = [];

  lines.forEach((line) => (line.length > 0 ? trimmedLines.push(line) : ''));

  console.log(trimmedLines);

  return (
    <ul>
      {content
        ? trimmedLines.map((line, i) => (
            <li key={i} className={style.line}>
              {line}
            </li>
          ))
        : ''}
    </ul>
  );
}

export default ScrollContent;
