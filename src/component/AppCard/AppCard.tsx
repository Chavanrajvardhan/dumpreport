import React from 'react'
import stylecss from './AppCard.module.css'
import Image from 'next/image'

const AppCard = ({ item }: { item: any }) => {
  return (
      <div className={stylecss.card}>
        <Image className={stylecss.image} src={"/jnj_logo-removebg-preview.png"} alt={"jaj_logo"} width={65} height={20} />
        <div className={stylecss.text}>
          <div className={stylecss.font1}>{item.applicationName}</div>
          <div className={stylecss.font2}>{item.applicationRole}</div>
          <div className={stylecss.font3}>{item.applicationDescription}</div>
        </div>
      </div>
   
    
  )
}
export default AppCard