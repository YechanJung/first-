import Link from 'next/link';
import styles from './Navigation.module.css';
import handler from './page/api/ip';

export default function Navigation() {
  return (
    <nav className={styles.container}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      {/* Add more links as needed */}
    </nav>
  );
}