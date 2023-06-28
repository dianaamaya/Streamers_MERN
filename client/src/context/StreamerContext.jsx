import { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { socket } from '../utilities/sockets'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import { BASIC_URL } from '../utilities/streamerConfigs'
export const StreamerContext = createContext()

export const StreamerProvider = ({ children }) => {
  const [streamersList, setStreamersList] = useState([])
  const [streamerDetails, setStreamerDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    main: '',
    detail: ''
  })

  const updateError = useCallback((key, errorMessage) => {
    setError((currentState) => ({
      ...currentState,
      [key]: errorMessage
    }))
  }, [])

  const getStreamersList = useCallback(async (signal) => {
    setError()
    setLoading(true)
    try {
      const { data } = await axios.get(`${BASIC_URL}/`, { signal })
      setStreamersList(data)
      setLoading(false)
    } catch (error) {
      if (error?.code !== 'ERR_CANCELED') {
        const errorMessage = error.response.data.error || 'Error getting streamers, please refresh the page or try again later'
        updateError('main', errorMessage)
        setLoading(false)
        toast.error('Error getting streamers')
      }
    }
  }, [setStreamersList, updateError])

  const getStreamerDetails = useCallback(async (signal, streamerId) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${BASIC_URL}/${streamerId}`, { signal })
      setStreamerDetails(data)
      setLoading(false)
    } catch (error) {
      if (error?.code !== 'ERR_CANCELED') {
        const errorMessage = error.response.data.error || 'Error getting the streamer'
        updateError('detail', errorMessage)
        setLoading(false)
        toast.error('Error getting the streamer')
      }
    }
  }, [setStreamerDetails, updateError])

  const updateStreamerList = useCallback((streamer) => {
    if (streamer.newStreamer) {
      setStreamersList((currentState) => [...currentState, streamer])
    } else {
      setStreamersList((currentState) => [
        ...currentState.map((current) => current._id === streamer._id
          ? streamer
          : current
        )
      ])
    }
  }, [setStreamersList])

  const createStreamer = async (streamer) => {
    try {
      const createdStreamer = await axios.post(BASIC_URL, streamer)

      createdStreamer.data.newStreamer = true
      updateStreamerList(createdStreamer.data)
      socket.emit('createdStreamer', createdStreamer.data)
      toast.success('Streamer created successfully')
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error(error?.response?.data?.error ?? 'Streamer could not be created')
      } else {
        toast.error('Streamer could not be created')
      }
    }
  }

  const updateStreamer = async (streamerId, upvote) => {
    try {
      const updatedStreamer = await axios.put(`${BASIC_URL}/${streamerId}/vote`, { upvote })

      updateStreamerList(updatedStreamer.data)
      socket.emit('updatedStreamer', updatedStreamer.data)
      toast.success('Streamer rating updated successfully')
    } catch (error) {
      toast.error('Streamer rating could not be updated')
    }
  }

  useEffect(() => {
    socket.on('updatedStreamer', updateStreamerList)
    socket.on('createdStreamer', updateStreamerList)

    return () => {
      socket.off('updatedStreamer', updateStreamerList)
      socket.off('createdStreamer', updateStreamerList)
    }
  }, [updateStreamerList])

  return (
      <StreamerContext.Provider
        value={{
          error,
          loading,
          streamersList,
          streamerDetails,
          updateError,
          getStreamerDetails,
          getStreamersList,
          createStreamer,
          updateStreamer
        }}
      >
        {children}
      </StreamerContext.Provider>
  )
}

StreamerProvider.propTypes = {
  children: PropTypes.node.isRequired
}
