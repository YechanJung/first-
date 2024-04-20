import React from 'react';
import styles from './Recommend.module.css';
import Navigation from '../nvaigation';

export default function Recommend ({recommend}) {
    return (
        <div className={styles.container}>
            <Navigation/>
            <h1 className={styles.title}>Recommendation</h1>
            <div className={styles.subtitle}>
                <p>{recommend}</p>
            </div>
        </div>
    )
}