import React, { createContext, useState } from 'react'
export const addResponceContext = createContext()


const ContextApi = () => {
    const [addResponce,setAddResponce] = useState("")
  return (
    <>ContextApi</>
  )
}

export default ContextApi