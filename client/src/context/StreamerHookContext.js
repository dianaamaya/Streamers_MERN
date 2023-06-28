import { useContext } from 'react'
import { StreamerContext } from './StreamerContext'

export const useStreamerContext = () => {
  const context = useContext(StreamerContext)
  if (!context) throw new Error('useStreamer must be used within a StreamerProvider')
  return context
}
