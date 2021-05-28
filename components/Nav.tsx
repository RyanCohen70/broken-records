import * as React from 'react';
import Link from 'next/link';
import { calcPrimaryNavEntries } from '../lib/nav';

// ------------------------------------------------------------------------
export type TPrimaryNavEntry = {
  readonly id: string;
  readonly label: string;
  readonly isSelected: boolean;
  readonly path: string;
};

type TPrimaryNavEntryProps = TPrimaryNavEntry;

function PrimaryNavEntry({
  id,
  label,
  isSelected,
  path,
}: TPrimaryNavEntryProps) {
  const className = isSelected ? 'nav-menu1-item selected' : 'nav-menu1-item';
  return (
    <div className={className}>
      <Link href={path}>
        <a>{label}</a>
      </Link>
    </div>
  );
}

type TPrimaryNavProps = {
  readonly entries: TPrimaryNavEntry[];
  readonly selectedId: string;
};
function PrimaryNav({ entries, selectedId }: TPrimaryNavProps) {
  return (
    <div className='nav-menu1'>
      {entries.map(entry => (
        <PrimaryNavEntry
          key={entry.id}
          id={entry.id}
          label={entry.label}
          isSelected={selectedId === entry.id}
          path={entry.path}
        />
      ))}
    </div>
  );
}

// ------------------------------------------------------------------------
export type TSecondaryNavEntry = {
  readonly id: string;
  readonly label: string;
  readonly path: string;
  readonly isSelected: boolean;
};

type TSecondaryNavEntryProps = TSecondaryNavEntry;

function SecondaryNavEntry({
  label,
  isSelected,
  path,
}: TSecondaryNavEntryProps) {
  const className = isSelected ? 'nav-menu2-item selected' : 'nav-menu2-item';
  return (
    <div className={className}>
      <Link href={path}>
        <a>{label}</a>
      </Link>
    </div>
  );
}

type TSecondaryNavProps = {
  readonly entries: TSecondaryNavEntry[];
};

function SecondaryNav({ entries }: TSecondaryNavProps) {
  return (
    <div className='nav-menu2'>
      {entries.map(entry => (
        <SecondaryNavEntry
          key={entry.id}
          id={entry.id}
          label={entry.label}
          path={entry.path}
          isSelected={entry.isSelected}
        />
      ))}
    </div>
  );
}

// ------------------------------------------------------------------------

type TNavProps = {
  readonly secondaryNavEntries: TSecondaryNavEntry[];
  readonly primarySelectedId: string;
};
export function Nav({ secondaryNavEntries, primarySelectedId }: TNavProps) {
  return (
    <div className='column nav'>
      <PrimaryNav
        entries={calcPrimaryNavEntries(primarySelectedId)}
        selectedId={primarySelectedId}
      />
      <hr />
      <SecondaryNav entries={secondaryNavEntries} />
    </div>
  );
}
