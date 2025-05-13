import React from 'react'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <>
    
        <div>



      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Page Not Found</p>
        <Link
          to="/login"
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Go to Home
        </Link>
      </div>


    </div>
    
    </>
  )
}

export default Pnf