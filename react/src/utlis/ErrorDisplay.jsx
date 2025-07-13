import React from 'react'

const ErrorsDisplay = ({errors}) => {
  return (
    <div>
        {errors && <ul style={{ listStyleType: 'none', padding: 0, color: 'red' }}>
          {Object.keys(errors).map((key)=>{
              return <li key={key}><small>{errors[key][0]}</small></li>
          })}
          </ul>
        }
    </div>
  )
}

export default ErrorsDisplay