import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loading...</h1>
      <div className={styles.spinner}></div>
    </div>
  );
}