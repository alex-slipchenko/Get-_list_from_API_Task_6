import React from 'react';

function MoveBlock({ titleList = [] }) {
  return titleList.length ? (
    <ul>
      {titleList.map((intem) => (
        <li key={intem.id}>{intem.title}</li>
      ))}
    </ul>
  ) : null;
}

export default MoveBlock;