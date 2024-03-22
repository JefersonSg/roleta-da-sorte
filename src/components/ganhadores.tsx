'use client'

import React from 'react'
import styles from './ganhadores.module.css'
import { getCodesUsed } from '@/actions/codes'
import Image from 'next/image';
interface Ganhador {
    id: string;
    code: string;
    award: number;
    used: boolean;
    user: string;
}
const Ganhadores = () => {
    const [ganhadores, setGanhadores] = React.useState<Ganhador[]>([])

    React.useEffect(()=>{
       async function getUsers() {
        const response : any = await getCodesUsed()

        if (response) {
            setGanhadores(response)
        }
        }

       void getUsers()
    },[])

  return (
    
    <div className={styles.ganhadores_container}>
        <h2>Veja os ultimos 5 ganhadores</h2>

        <div className={styles.ganhadores}>
            { ganhadores?.map(
                (ganhador, index) =>

                index <= 4 && <div className={styles.ganhador} key={ganhador.id}>
               <p className={styles.name}>{ganhador.user}</p>
               <div className={`${styles.premio} ${ganhador.award === 6? styles.premioBest : ''}`}>
                   <Image alt='imagem do premio ganho' src={`/item${ganhador.award}.svg`} width={100} height={140}/>
               </div>
           </div>
            )}
        </div>
    </div>
  )
}

export default Ganhadores