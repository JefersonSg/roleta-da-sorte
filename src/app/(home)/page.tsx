'use client'

import Image from 'next/image';
import styles from './Page.module.css'
import React, { Suspense } from 'react';
import { checkCodeAndSetAward, reedemCode } from '@/actions/codes';
import './style.css'
import Ganhadores from '@/components/ganhadores';
import PopUpWin from '@/components/PopUpWin';

export default  function Page() {
    const [parar, setParar] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [name, setName] = React.useState('')
    const [code, setCode] = React.useState('')
    const [isLoading,setIsLoading] = React.useState(false)
    const [userSaved, setUserSaved] = React.useState(false)
    const [award, setAward] = React.useState(6)
    const [spin, setSpin] = React.useState(false)
    const [startPopUp,setStartPopUp] = React.useState(false)

    async function onSubmit() {
        if (!code || !name) {
            return setMessage('Preencha todos os campos')
        }

        if (code && !isLoading && !userSaved) {
            try {
                setIsLoading(true)
            const response: any = await checkCodeAndSetAward(code, name)

            if (response.message) {
                setMessage(response.message)
                setUserSaved(true)
                setIsLoading(false)
                setSpin(true)
                return
            }
            if (response.error) {
                setIsLoading(false)
                setUserSaved(false)
                setSpin(false)
                return setMessage(response.error)
            }
            if (!response) {
            setIsLoading(false)
                
            }
            
            } catch (error) {
                setIsLoading(false)
                setMessage('Erro ao resgatar o codigo')
                setUserSaved(false)
            }
        }
        if (userSaved) {
            setIsLoading(true)
            const response: any = await reedemCode(code)

            if (response) {
                setAward(response.message?.award)
                setSpin(false)
                setCode('')
                setIsLoading(false)
            }
            if (response.error) {
                setMessage(response.error)
                setUserSaved(false)
                setIsLoading(false)
                setSpin(false)
                setCode('')
            }
        }
    }
    React.useEffect(()=>{
        setTimeout(()=>{
            if (award && !spin) {
                setStartPopUp(true)
                setUserSaved(false)
                setIsLoading(false)
            }
        },5500)
    },[award, spin])
    return <main className={styles.container}>
        <h1>Sorteie o seu produto</h1>
        <div className={styles.roleta_container}>
        <Image className={styles.seta} alt='Seta da roleta' src={'/seta_roleta.svg'} width={25} height={70}/>

        <Suspense>
        <Image placeholder='empty' 
        className={`${styles.roleta}
        ${userSaved ? '' : styles.rodando}
        ${award > 0 ? 'premio'+ award : ''}`} 
        alt='Roleta' src={'/Roleta4.svg'} width={500}
        height={500}/>
        </Suspense>
        </div>
        <form action="" className={styles.formulario} onSubmit={(e)=>{
            e.preventDefault()
            onSubmit()
        }}>
            {!userSaved && <>
                <div className={styles.div_input}>
            <label htmlFor="name">Digite seu nome</label>
            <input id='name' name='name' placeholder='Mayse'  onChange={(e)=>{
            setName(e.target.value)
        }}/>
        </div>
                <div className={styles.div_input}>
        <label htmlFor="newCode">Insira o codigo</label>
        <input  id='newCode' placeholder='4444-AAAA' name='newCode' value={code} onChange={(e)=>{
            setCode(e.target.value)
        }}/>
        </div>

        </>
        }
        {userSaved && <p>Você tem {spin ? '1' : '0'} chance</p>}
        <button className={`${styles.botao_parar} ${isLoading ? styles.loading : ''}`} onClick={()=>{
            setParar(!parar)
        }}>{spin && isLoading ? 'Aguarde...' : spin ? 'Girar' : isLoading ? 'Aguarde...' : 'Resgatar'}</button>
        {message && <p>{message}</p>}
        </form>
        {startPopUp && <PopUpWin award={award} setAtivo={setStartPopUp}/>}
        <Suspense>
        <Ganhadores />
        </Suspense>
        </main>;
}