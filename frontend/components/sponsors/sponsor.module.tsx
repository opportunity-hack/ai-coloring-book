import React from 'react'
import ReactiveButton from '../reactive-button/reactive-button.module';
import style from './sponsor.module.css'

const SponsorCRUD = (props: any) => {
  return (
    <>
      <div className={`${style.mainContainer}`}>
        <div className={`${style.inquiryContainer}`}>
          <h2 className={style.header}>{"Organization"}</h2>
          <div className={`${style.formSection}`}>
              <div className={style.column}>
                <input type="text" name="Organization" placeholder="Organization" className={style.rowItem}
                  value={props.formValue.firstName} 
                  onChange={props.setFormValueMethod}
                />
                <input type="text" name="About" placeholder="About" className={style.rowItem}
                  value={props.formValue.lastName} 
                  onChange={props.setFormValueMethod}
                />
              </div> 
              <div className={style.column}>
                <input type="text" name="Logo" placeholder="Logo" className={style.rowItem} />
                <input type="text" name="URL" placeholder="Website" className={style.rowItem} />
              </div>
              <ReactiveButton
                  title="Submit"
                  onClick={props.onChange}
                />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default SponsorCRUD;