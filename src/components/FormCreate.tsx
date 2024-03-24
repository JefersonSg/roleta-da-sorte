'use client';
import { createCode } from '@/actions/codes';
import styles from './styles.module.css';

import React from 'react';

const FormCreate = () => {
  const [secret, setSecret] = React.useState('');
  const [newCode, setNewCode] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  async function handleSubmit() {
    if (!newCode || !secret) {
      return setMessage('Preencha todos os campos');
    }
    if (!isLoading) {
      setMessage('');
      setIsLoading(true);

      try {
        const response: any = await createCode(newCode, secret);
        if (response.message) {
          setMessage(response.message);
          setIsLoading(false);
          setNewCode('');
        }
        if (response.error) {
          setMessage(response.error);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setMessage('Erro ao criar o codigo');
        setIsLoading(false);
      }
    }
  }
  return (
    <form
      action=""
      className={styles.create_container}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label htmlFor="secret">Codigo secreto</label>
        <input
          type="text"
          name="secret"
          id="secret"
          value={secret}
          onChange={(e) => {
            setSecret(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="code">Novo codigo</label>
        <input
          type="text"
          name="code"
          id="code"
          value={newCode}
          onChange={(e) => {
            setNewCode(e.target.value);
          }}
        />
      </div>
      <button
        className={`${styles.button_create} ${isLoading ? styles.loading : ''}`}
      >
        {isLoading ? 'Criando...' : 'Criar'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default FormCreate;
