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

import React from 'react'

export default function Navbar() {
  return (
    <div className="flex flex-col bg-amber-600 p-2 text-white sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold text-white sm:text-4xl">Rixel</h1>
      <small className="text-lg font-bold">Make your images pixelated.</small>
    </div>
  )
}
