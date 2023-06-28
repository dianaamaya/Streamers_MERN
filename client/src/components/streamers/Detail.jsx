import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useStreamerContext } from '../../context/StreamerHookContext'
import { Layout } from '../Layout'
import { Votes } from './main/Votes'
import streamerImage from '../../assets/streamer/streamer.png'
import { ReactComponent as IconBack } from '../../assets/general/back.svg'
import { PlatformStreamer } from './main/PlatformStreamer'
import { Loading } from '../Loading'

export function DetailStream () {
  const { id } = useParams()
  const { error, updateError, loading, streamerDetails, getStreamerDetails } = useStreamerContext()

  useEffect(() => {
    const controller = new AbortController()
    getStreamerDetails(controller.signal, id)

    return () => {
      controller.abort()
      updateError('detail', '')
    }
  }, [id, getStreamerDetails, updateError])

  if (loading) return (<Layout><Loading /></Layout>)

  if (error?.detail) return (<Navigate replace to="/404" />)

  return (
    <Layout>
      <Link
        className="text-md text-purple-700 font-bold uppercase leading-relaxed inline-block mr-4 py-2"
        to="/" >
          <IconBack className="w-6 inline-block pr-2 mb-1" />
          All Streamers
      </Link>
      <img
        src={streamerImage}
        alt=""
        className="w-full h-[56.25vw] max-h-[700px] min-h-[480px] object-cover rounded-md" />

      <div className="flex justify-between items-top">
        <h1 className="text-2xl font-bold break-all pr-4">{streamerDetails?.name}</h1>
        <div className="min-w-max flex justify-between items-top gap-4">
          <PlatformStreamer platformName={streamerDetails?.platform?.toString()}/>
          <div className="min-w-max">
            {
              streamerDetails ? <Votes streamer={streamerDetails} /> : null
            }
          </div>
        </div>
      </div>
      <p className="break-all mt-4">{streamerDetails?.description}</p>
    </Layout>
  )
}
