import React, { ChangeEvent, useState } from 'react'

import Button from './components/Button'
import ErrorAlert from './components/ErrorAlert'
import Navbar from './components/Navbar'

const ERROR_TIMEOUT = 5000
const DEFAULT_CALLBACK = () => {
}

export default function App() {
  const [sample, setSample] = useState('10') // sensible default
  const [error, setError] = useState('')
  const [intervalId, setIntervalId] = useState(0)
  const [imageDataUrl, setImageDataUrl] = useState('')

  const showError = (error: string) => {
    setError(error)

    if (intervalId > 0) {
      clearInterval(intervalId)
      setIntervalId(0)
    }

    setIntervalId(setInterval(() => setError(''), ERROR_TIMEOUT))
  }

  type loadCanvasCallback = () => void|null

  const loadCanvas = (dataUrl: string, callback: loadCanvasCallback = DEFAULT_CALLBACK) => {
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
      showError('Invalid file')
      return
    }

    if (!file.type.match('image\/.*')) {
      showError('Please select an image')
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
      showError('Sample must be an integer number')
      return
    }

    const sampleSize = Number(sample)

    if (sampleSize <= 0) {
      showError('Sample must be higher than 0')
      return
    }

    loadCanvas(imageDataUrl, () => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      const context = canvas.getContext('2d')!

      let pixelArray = context.getImageData(0, 0, canvas.width, canvas.height).data

      for (let y = 0; y < canvas.height; y += sampleSize) {
        for (let x = 0; x < canvas.width; x += sampleSize) {
          const p = (x + (y * canvas.width)) * 4;

          context.fillStyle = `rgba(${pixelArray[p]}, ${pixelArray[p + 1]}, ${pixelArray[p + 2]}, ${pixelArray[p + 3]})`
          context.fillRect(x, y, sampleSize, sampleSize)
        }
      }
    })
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = (document.getElementById('canvas') as HTMLCanvasElement).toDataURL()
    a.download = 'result'
    a.click()
  }

  return (
    <div className={'min-h-screen'}>
      <Navbar/>

      <div className={'mx-auto max-w-screen-lg mt-4 space-y-4 p-2 sm:p-0'}>
        <p>1. Select your image (it won't be uploaded to any server):</p>

        <input
          className={'block mx-auto border border-black bg-white p-2 w-80'}
          type={'file'}
          onChange={loadFile}
        />

        <p>2. Set the sampling size (how big the "pixels" will be):</p>

        <input
          className={'block mx-auto border border-black p-2 w-80'}
          type={'number'}
          value={sample}
          min={1} // slow!
          onChange={ev => setSample(ev.target.value)}
        />

        <p>3. Click this button to pixelate your image:</p>

        <div className={'flex justify-center space-x-5'}>
          <Button onClick={pixelate}>
            Pixelate
          </Button>
          <Button onClick={() => loadCanvas(imageDataUrl)}>
            Reset
          </Button>
          <Button onClick={download}>
            Download
          </Button>
        </div>
      </div>

      <canvas id={'canvas'} className={'mx-auto mt-5'}/>

      <ErrorAlert error={error}/>
    </div>
  )
}
