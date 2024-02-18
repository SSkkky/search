import { useEffect, useState, useRef } from 'react';
import './App.css';
import Section from './Section';

function App() {
  return (
    <div className="App">
      <Section keyword={'리액트 훅'}/>
      <Section keyword={'넥스트 라우팅'}/>
      <Section keyword={'HTML 기초'}/>
    </div>
  );
}

export default App;
