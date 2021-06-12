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
