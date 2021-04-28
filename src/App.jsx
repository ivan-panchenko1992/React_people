import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'bulma';
import 'semantic-ui-css/semantic.min.css';
import getPeople from './api/people';
import './App.scss';
import { PeopleList } from './components/peopleList';
import LoaderBall from './components/Loader/LoaderBall';

const App = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople().then((allPeople) => {
      const prepearedPeople = allPeople.map((human) => ({
        ...human,
        id: uuidv4(),
      }));
      setPeople(prepearedPeople);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <h2> people: </h2>

      {loading
        ? <LoaderBall />
        : (
          <div className="App-table">
            <ul className="App-table__list">
              {people.map((human) => (
                <li className="App-table__item" key={human.id}>
                  <PeopleList name={human.name} birth={human.birth_year} id={human.id} />
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default App;
