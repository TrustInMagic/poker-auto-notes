import React from 'react';
import style from './ScrollContent.module.css';

function ScrollContent({ content }: { content: string }) {
  const lines = content.split('\r\n');

  return (
    <ul>
      {content
        ? lines.map((line, i) => (
            <li key={i} className={style.line}>
              {line}
            </li>
          ))
        : ''}
    </ul>
  );
}

export default ScrollContent;
