'use client'
import { useRef, useState, useEffect } from 'react'
import { IoIosPlayCircle, IoIosPause } from 'react-icons/io'

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasUserStarted, setHasUserStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(true)

  useEffect(() => {
    if (!isPaused && showPlayButton) {
      const timeout = setTimeout(() => setShowPlayButton(false), 3000)
      return () => clearTimeout(timeout)
    }
  }, [isPaused, showPlayButton])

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (!hasUserStarted) {
      video.currentTime = 0
      video.muted = false
      video.loop = true
      setHasUserStarted(true)
    }

    video.play().then(() => {
      setIsPaused(false)
    }).catch(() => {})
  }

  const handlePause = () => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    setIsPaused(true)
    setShowPlayButton(true)
  }

  return (
    <div className="absolute top-[680px] z-20 w-full max-w-3xl mx-auto aspect-video overflow-hidden rounded-xl shadow-lg group left-0 right-0">

      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/demo.mp4"
        className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
          !isPaused && hasUserStarted ? 'blur-0' : 'blur-md'
        }`}
        muted={!hasUserStarted}
        loop
        autoPlay
        playsInline
        onCanPlayThrough={() => setIsLoaded(true)}
      />

      {/* LOADER */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* PLAY BUTTON */}
      {isPaused && showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-500">
          <button onClick={handlePlay} aria-label="Play video">
            <div className="bg-gray-800/80 hover:bg-gray-700/80 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl backdrop-blur-sm">
              <IoIosPlayCircle className="text-3xl" />
              Watch demo video
            </div>
          </button>
        </div>
      )}

      {/* PAUSE BUTTON */}
      {!isPaused && hasUserStarted && (
        <div className="absolute top-4 right-4 z-30">
          <button onClick={handlePause} aria-label="Pause video">
            <div className="bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full shadow-xl backdrop-blur-sm transition">
              <IoIosPause className="text-2xl" />
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
