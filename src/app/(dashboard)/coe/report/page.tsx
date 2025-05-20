'use client'

import React, { use, useContext, useEffect } from 'react'
import styles from './page.module.css'
import { LoadingContext } from '../../../(dashboard)/layout'; // Import the context from your layout


const page = () => {
      const { loading, setLoading } = useContext(LoadingContext);
  
      useEffect(() => {
        setLoading(false); // Set loading to false when the component mounts
       
      }, [setLoading]);
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.heading}>Report</h1>
          <div className={styles.card} style={{ padding: "30px" }}>


            <p style={{ fontSize: '20px', fontWeight: '600', marginLeft: '-15px' }}> Please click on the report menu and select desired report from the menu</p>


          </div>


        </main>
      </div>

    </>
  )
}

export default page