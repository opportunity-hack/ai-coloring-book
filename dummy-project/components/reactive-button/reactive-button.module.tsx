import React from 'react'
import style from './reactive-button.module.css'

const ReactiveButton = (props: any) => {
  return (
    <div>
          <div className={`${style.buttonMain} ${props.customClassName}`} onClick={props.onClick} style={props.customCSS}>
              <span className={`${style.buttonTitle}`}>{props.title}</span>
          </div>
    </div>
  )
}

export default ReactiveButton;