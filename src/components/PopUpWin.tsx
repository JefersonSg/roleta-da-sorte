import React from 'react'
import styles from './popup.module.css'
import Image from 'next/image'

const PopUpWin = ({award, setAtivo}:{award:number, setAtivo: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <div className={styles.pop_up_win}>
        <span className={styles.fechar} onClick={()=>{
            setAtivo(false)
        }}>X</span>
        <div className={styles.premio}>
            <p className={styles.texto}>Parabens, você ganhou um prêmio!! 🎉🥳</p>
             <Image alt='imagem do premio' src={`${award ? `item${award}.svg `: 'item4.svg'}`} width={200} height={300}/>
            <p className={styles.texto2}>Tire um print e #compartilhe 🥰🥰</p>
            <button className={styles.resgatar} onClick={()=>{
                const message = encodeURIComponent(`Olá, ganhei o premio número ${award} na roleta.`)
                const phoneNumber = '5522992339289';
                const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
                window.open(whatsappURL, '_blank');
            }}>Resgatar</button>
        </div>
    </div>
  )
}

export default PopUpWin