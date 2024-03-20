import React, { useState, useEffect } from "react";

function GetBlock({ titleList = [] }) {

  return titleList.length ? (
    <ul>
      {titleList.map((intem) => (
        <li key={intem.id}>{intem.title}</li>
      ))}
    </ul>
  ) : null;
}

export default GetBlock;


