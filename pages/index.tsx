import Layout from '../components/layout';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <section>
        <h2>View songs</h2>
        <ul>
          <li>
            <Link href='/courses'>
              <a>Courses</a>
            </Link>
          </li>
          <li>
            <Link href='/years'>
              <a>Years</a>
            </Link>
          </li>
          <li>
            <Link href='/venues'>
              <a>Venues</a>
            </Link>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
