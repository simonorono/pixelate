/**
 * Copyright 2021 Simón Oroño
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export default function Button(props: Props) {
  const { children, disabled, onClick } = props

  return (
    <button
      type="button"
      disabled={disabled || false}
      className={[
        disabled
          ? 'cursor-wait bg-neutral-300 text-black'
          : 'bg-white text-amber-700',
        'rounded-md border px-6 py-3 font-medium shadow-sm',
      ].join(' ')}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  )
}
