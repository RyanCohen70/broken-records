import Layout from './layout';
import { Nav, TSecondaryNavEntry } from './Nav';

type TPageProps = {
  readonly pageType: 'class' | 'year' | 'venue' | 'genre';
  readonly secondaryNavEntries: TSecondaryNavEntry[];
  readonly children: React.ReactNode;
};

export default function Page({
  pageType,
  secondaryNavEntries,
  children,
}: TPageProps) {
  return (
    <Layout>
      <div className={`container type-${pageType}`}>
        <Nav
          primarySelectedId={pageType}
          secondaryNavEntries={secondaryNavEntries}
        />
        <div className='column main'>{children}</div>
      </div>
    </Layout>
  );
}
