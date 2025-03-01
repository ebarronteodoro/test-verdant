'use client'

import Header from '@/app/components/Header'
import styles from '@/app/styles/components/not-found.module.css'
import Image from 'next/image'

export default function NotFoundPage () {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          <strong>
            UPS
            <br />
            ...
          </strong>
          Página no encontrada
        </h1>
        <Image
          width={300}
          height={300}
          priority
          className={styles.image}
          src='/VERDI/StickersVerdi_Mesa de trabajo 1-07.png'
          alt='Imagen de Verdi'
        />
        <a href='/' className={styles.button}>
          Volver al inicio
        </a>
      </main>
    </>
  )
}
