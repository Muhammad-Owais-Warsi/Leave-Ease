import React, { useEffect, useState, useRef } from 'react';
// import '../Styles/CustomCursor.css'; // Make sure to import the main CSS file

export default function Cursor() {
  const cursor = useRef(null)
  const changePosition = (e) => {
    cursor.current.style.top = `${e.clientY}px`;
    cursor.current.style.left = `${e.clientX}px`;
  }
  return (
    <div className="App" style={{ minHeight: "100vh", minWidth: "100vw" }} onMouseMove={changePosition}>
      <div className="cursor-style" ref={cursor}></div>
    </div>

  )
}
