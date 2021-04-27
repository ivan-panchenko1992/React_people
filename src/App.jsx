import './App.css';
import React, { useState, useEffect } from 'react';
import getPeople from './api/people';

function App() {
  const [people, setPeople] = useState([]);
  const [comments, setComment] = useState([]);

  useEffect(() => {
    getPeople().then((result) => setPeople(result));
  }, []);

  return (
    <div className="App">
      <h2> people: </h2>
      <ul className="people">
        {people.map((human) => (
          <li className="people__item">
            <div>
              <h3>{human.name}</h3>
              <p>{human.birth_year}</p>
            </div>
            <button></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
