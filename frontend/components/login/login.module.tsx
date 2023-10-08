import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import ReactiveButton from '../reactive-button/reactive-button.module'

import style from './login.module.css'


const Login = (props: any) => {

    
  return (
    <>
      <div className={style.mainFormContainer}>
        {/* Greetings */}
        <div className={style.FormGreetings}>
          <h2 className={style.welcomeTitle}>SIGN IN</h2>
        </div>
        
        {/* User details form */}
        <div className={style.actualForm}>
     
            <input type="email" name="email" className={`${style.formGroup} ${style.inputItem} ${props.loginData.email.isInvalid ? style.invalidInput : ""}`} placeholder="Email" onChange={props.updateLoginFormData} value={props.loginData.email.value}/>
            <input type="password" name="password" className={ `${style.formGroup} ${style.inputItem} ${props.loginData.password.isInvalid ? style.invalidInput : ""}` } placeholder="Password" onChange={props.updateLoginFormData} value={props.loginData.password.value}/>


          {/* Submit form */}
          <div className={style.submitBtn}>
            <ReactiveButton title="LOGIN" onClick={props.onSubmit} customCSS={{width: "100%"}}/>
          </div>
    
        </div>
        
      </div>
      
    </>
  )
}

export default Login