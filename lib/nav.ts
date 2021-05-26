import { TPrimaryNavEntry } from '../components/Nav';

const primaryNavEntries = [
  { id: 'class', label: 'Class' },
  { id: 'year', label: 'Year' },
  { id: 'venue', label: 'Venue' },
  { id: 'genre', label: 'Genre' },
];

export function calcPrimaryNavEntries(selectedId: string): TPrimaryNavEntry[] {
  return primaryNavEntries.map(({ id, label }) => ({
    id,
    label,
    isSelected: id === selectedId,
  }));
}
