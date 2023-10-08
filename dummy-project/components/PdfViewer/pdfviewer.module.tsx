import React from 'react'
import ReactiveButton from '../reactive-button/reactive-button.module';
import styles from './pdfviewer.module.css'
// import { Document } from 'react-pdf'

const PdfViewer = (props: any) => {
  return (
      <>
      <div className={styles.pdfContainer}>
          <div className={styles.title}>Here's a Book Generated for you ;)</div>
          <iframe src="https://drive.google.com/file/d/1aY3VvwdMplMoCOwnjO2sox8PA3Cxxbq6/preview" width="400" height="400" allow="autoplay"></iframe>
          <div className={styles.button}><ReactiveButton title="Publish!"></ReactiveButton></div>
        </div>
        
    </>
  )
}

export default PdfViewer;