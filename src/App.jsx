import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'bulma';
import 'semantic-ui-css/semantic.min.css';
import getPeople from './api/people';
import './App.scss';
import Loader from './components/Loader/Loader';
import PeopleList from './components/peopleList/PeopleList';

const App = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const heroFromLocalStorage = JSON.parse(localStorage.getItem('people'));
    if (!heroFromLocalStorage) {
      getPeople().then((allHeroes) => {
        const prepearedHeroes = allHeroes.map((human) => ({
          ...human,
          id: uuidv4(),
        }));
        return prepearedHeroes;
      }).then((heroesWithId) => {
        setHeroes(heroesWithId);
        localStorage.setItem('people', JSON.stringify(heroesWithId));
        setLoading(false);
      });
    }
    setHeroes(heroFromLocalStorage);
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <h2> Star Wars heroes: </h2>

      {loading || !heroes
        ? <Loader />
        : (
          <div className="App__table heroes">
            <ul className="heroes__list">
              {heroes.map((human) => (
                <li className="heroes__item" key={human.id}>
                  <PeopleList
                    humanId={human.id}
                    name={human.name}
                    birth={human.birth_year}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default App;
