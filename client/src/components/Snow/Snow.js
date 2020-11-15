import React, { useEffect, useRef } from 'react'
import SnowManager from './classes/SnowManager'
import useWindowSize from '../../hooks/useWindowSize'
import './snow.css'

export default function Snow({}) {
  const canvasRef = useRef()
  const snowManagerRef = useRef()

  const windowSize = useWindowSize()

  useEffect(() => {
    snowManagerRef.current = new SnowManager(canvasRef.current)
    snowManagerRef.current.start()
  }, [])

  useEffect(() => {
    snowManagerRef.current.resize(windowSize.width, windowSize.height)
  }, [windowSize])

  return <canvas className='snow' ref={canvasRef} />
}