import { useState } from 'react';

import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {

    return (

        <div className={styles['container']}>
            <div className={styles['loading-spinner']}>
            </div>
        </div>

    )

}