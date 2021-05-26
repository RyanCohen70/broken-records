import * as React from 'react';
import Link from 'next/link';

// ------------------------------------------------------------------------
export type TPrimaryNavEntry = {
  id: string;
  label: string;
  isSelected: boolean;
};

type TPrimaryNavEntryProps = TPrimaryNavEntry & {
  onClick: (id: string) => void;
};

function PrimaryNavEntry({
  id,
  label,
  isSelected,
  onClick,
}: TPrimaryNavEntryProps) {
  const className = isSelected ? 'nav-menu1-item selected' : 'nav-menu1-item';
  return (
    <div className={className} onClick={() => onClick(id)}>
      {label}
    </div>
  );
}

type TPrimaryNavProps = {
  entries: TPrimaryNavEntry[];
  selectedId: string;
  onClick: (id: string) => void;
};
function PrimaryNav({ entries, selectedId, onClick }: TPrimaryNavProps) {
  return (
    <div className='nav-menu1'>
      {entries.map(entry => (
        <PrimaryNavEntry
          key={entry.id}
          onClick={onClick}
          id={entry.id}
          label={entry.label}
          isSelected={selectedId === entry.id}
        />
      ))}
    </div>
  );
}

// ------------------------------------------------------------------------
export type TSecondaryNavEntry = {
  id: string;
  label: string;
  path: string;
  isSelected: boolean;
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
  entries: TSecondaryNavEntry[];
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
  primaryNavEntries: TPrimaryNavEntry[];
  secondaryNavEntries: TSecondaryNavEntry[];
  primarySelectedId: string;
  onClickPrimary: (id: string) => void;
};
export function Nav({
  primaryNavEntries,
  secondaryNavEntries,
  primarySelectedId,
  onClickPrimary,
}: TNavProps) {
  return (
    <div className='column nav'>
      <PrimaryNav
        entries={primaryNavEntries}
        selectedId={primarySelectedId}
        onClick={onClickPrimary}
      />
      <hr />
      <SecondaryNav entries={secondaryNavEntries} />
    </div>
  );
}
