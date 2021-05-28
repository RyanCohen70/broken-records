import { TPrimaryNavEntry } from '../components/Nav';

const primaryNavEntries = [
  { id: 'class', label: 'Class', path: '/courses' },
  { id: 'year', label: 'Year', path: '/years' },
  { id: 'venue', label: 'Venue', path: '/venues' },
  { id: 'genre', label: 'Genre', path: '/genres' },
];

export function calcPrimaryNavEntries(selectedId: string): TPrimaryNavEntry[] {
  return primaryNavEntries.map(({ id, label, path }) => ({
    id,
    label,
    path,
    isSelected: id === selectedId,
  }));
}
