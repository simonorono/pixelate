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

import React, { ChangeEvent, useRef, useState } from 'react'

import Button from './components/Button'
import ErrorAlert from './components/ErrorAlert'
import Navbar from './components/Navbar'

const ERROR_TIMEOUT = 5000
const DEFAULT_CALLBACK = () => {}

const ERROR_INVALID_FILE = 'Invalid file'
const ERROR_NOT_IMAGE = 'Please select an image'
const ERROR_SAMPLE_NOT_NUMBER =
  'Sample must be a positive number with no decimals'

export default function App() {
  const [sample, setSample] = useState('10') // sensible default
  const [error, setError] = useState('')
  const [intervalId, setIntervalId] = useState(0)
  const [imageDataUrl, setImageDataUrl] = useState('')
  const [processing, setIfProcessing] = useState(false)

  const fileInput = useRef(null as HTMLInputElement | null)

  const showError = (error: string) => {
    setError(error)

    if (intervalId > 0) {
      clearInterval(intervalId)
      setIntervalId(0)
    }

    setIntervalId(setInterval(() => setError(''), ERROR_TIMEOUT))
  }

  type loadCanvasCallback = () => void | null

  const loadCanvas = (
    dataUrl: string,
    callback: loadCanvasCallback = DEFAULT_CALLBACK
  ) => {
    const image = new Image()
    image.src = dataUrl

    image.onload = () => {
      const canvas = document.getElementById('canvas')! as HTMLCanvasElement
      const context = canvas.getContext('2d')!
      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)

      callback()
    }
  }

  const loadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0)

    if (!file) {
      showError(ERROR_INVALID_FILE)
      return
    }

    if (!file.type.match('image/.*')) {
      showError(ERROR_NOT_IMAGE)
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      const dataUrl = reader.result as string
      setImageDataUrl(dataUrl)
      loadCanvas(dataUrl)
    }
  }

  const pixelate = () => {
    if (!sample.match('\\d+')) {
      showError(ERROR_SAMPLE_NOT_NUMBER)
      return
    }

    const sampleSize = Number(sample)

    if (sampleSize <= 0) {
      showError(ERROR_SAMPLE_NOT_NUMBER)
      return
    }

    if (!fileInput.current?.files?.length) {
      showError(ERROR_NOT_IMAGE)
      return
    }

    setIfProcessing(true)

    loadCanvas(imageDataUrl, () => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      const context = canvas.getContext('2d')!

      let pixelArray = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data

      for (let y = 0; y < canvas.height; y += sampleSize) {
        for (let x = 0; x < canvas.width; x += sampleSize) {
          const p = (x + y * canvas.width) * 4

          context.fillStyle = `rgba(${pixelArray[p]}, ${pixelArray[p + 1]}, ${
            pixelArray[p + 2]
          }, ${pixelArray[p + 3]})`
          context.fillRect(x, y, sampleSize, sampleSize)
        }
      }

      setIfProcessing(false)
    })
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = (
      document.getElementById('canvas') as HTMLCanvasElement
    ).toDataURL()
    a.download = 'result'
    a.click()
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto min-h-screen max-w-screen-lg space-y-4 bg-white p-4 pt-4">
        <p>1. Select your image (it won't be uploaded to any server):</p>

        <input
          className={'mx-auto block w-80 border border-black bg-white p-2'}
          onChange={loadFile}
          ref={fileInput}
          type={'file'}
        />

        <p>2. Set the sampling size (how big the "pixels" will be):</p>

        <input
          className={'mx-auto block w-80 border border-black p-2'}
          type={'number'}
          value={sample}
          min={1} // slow!
          onChange={ev => setSample(ev.target.value)}
        />

        <p>3. Click this button to pixelate your image:</p>

        <div className={'flex justify-center space-x-5'}>
          <Button disabled={processing} onClick={pixelate}>
            Pixelate
          </Button>
          <Button
            disabled={processing}
            onClick={() => loadCanvas(imageDataUrl)}
          >
            Reset
          </Button>
          <Button disabled={processing} onClick={download}>
            Download
          </Button>
        </div>

        <canvas id={'canvas'} className={'mx-auto mt-5'} />
      </div>

      <ErrorAlert error={error} />
    </div>
  )
}
