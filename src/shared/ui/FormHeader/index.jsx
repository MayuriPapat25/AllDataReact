import React from 'react'

function FormHeader({ headerContent }) {
  return (
    <div className='mb-10'>
      <h1 className="h2 text-black mb-4">{headerContent.title}</h1>
      <p className="text-gray-600">{headerContent.description}</p>
    </div>
  )
}

export default FormHeader