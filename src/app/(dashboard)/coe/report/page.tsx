import React from 'react'
import styles from './page.module.css'

const page = () => {
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