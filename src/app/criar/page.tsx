import FormCreate from '@/components/FormCreate';
import styles from './styles.module.css';
import Link from 'next/link';

export default function page() {
  return (
    <main className={styles.container}>
      <Link href={'/'}>Voltar </Link>
      <h1>Crie um novo codigo</h1>
      <FormCreate />
    </main>
  );
}
