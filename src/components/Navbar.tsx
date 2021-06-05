import React from 'react'

export default function Navbar() {
  return (
    <div className="flex flex-col p-2 bg-amber-600 text-white sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold text-white sm:text-4xl">
        Rixel
      </h1>
      <small className="text-lg font-bold">Make your images pixelated.</small>
    </div>
  )
}
