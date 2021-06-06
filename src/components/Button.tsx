import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void,
  children: ReactNode
}

export default function Button(props: Props) {
  const { children, onClick } = props

  return (
    <button
      type="button"
      className={[
        "flex items-center px-6 py-3 border border-transparent shadow-sm",
        "text-base font-medium rounded-md bg-white text-amber-700",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500",
      ].join(' ')}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  )
}
