import Link from "next/link";
// import { withServerSideProps } from "./hoc/withServerSideProps";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Our App</h1>
      <p className={styles.subtitle}>Click the button below to start</p>
      <Link href="/userinput" className={styles.link}>
        Start
      </Link>
    </div>
  );
}

export default Home;
