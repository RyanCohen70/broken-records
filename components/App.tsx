import * as React from 'react';
import { Header } from './Header';
import { Nav, TPrimaryNavEntry } from './Nav';
import { Main } from './Main';

const primaryNavEntries: TPrimaryNavEntry[] = [
  { id: 'class', label: 'Class', isSelected: true },
  { id: 'year', label: 'Year', isSelected: false },
  { id: 'venue', label: 'Venue', isSelected: false },
  { id: 'genre', label: 'Genre', isSelected: false },
];

const secondaryNavEntries = {
  class: [
    { id: 'electronica', label: 'Electronica', isSelected: true },
    { id: 'ensemble-i', label: 'Ensemble I', isSelected: false },
    { id: 'ensemble-ii', label: 'Ensemble II', isSelected: false },
    { id: 'ensemble-plus', label: 'Ensemble Plus', isSelected: false },
    { id: 'scoring-the-game', label: 'Scoring the Game', isSelected: false },
    { id: 'viva-voce', label: 'Viva Voce', isSelected: false },
  ],
  year: [
    { id: '2019-20', label: '2019-20', isSelected: true },
    { id: '2018-19', label: '2018-19', isSelected: false },
    { id: '2017-18', label: '2017-18', isSelected: false },
  ],
  venue: [
    { id: 'venue-43', label: 'Venue 43 (fall 2019)', isSelected: true },
    { id: 'venue-42', label: 'Venue 42 (spring 2019)', isSelected: false },
    { id: 'venue-41', label: 'Venue 41 (fall 2018)', isSelected: false },
  ],
  genre: [
    { id: 'rock', label: 'Rock', isSelected: true },
    { id: 'country', label: 'Country', isSelected: false },
    { id: 'jazz', label: 'Jazz', isSelected: false },
    { id: 'pop', label: 'Pop', isSelected: false },
  ],
};

export function App() {
  return (
    <div>
      <Header />
      <div className='container'>
        <Main />
      </div>
    </div>
  );
}
