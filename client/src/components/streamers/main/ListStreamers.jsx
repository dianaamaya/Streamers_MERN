import { useState, useEffect } from 'react'
import { useStreamerContext } from '../../../context/StreamerHookContext'
import { SingleStreamer } from './SingleStreamer'
import { Loading } from '../../Loading'
import { Pagination } from '../../Pagination'

const recordsPerPage = 10

export function ListStreams () {
  const { error, updateError, loading, streamersList, getStreamersList } = useStreamerContext()

  const [currentPage, setCurrentPage] = useState(1)
  const [currentStreamers, setCurrentStreamers] = useState([])
  const nPages = Math.ceil(streamersList?.length / recordsPerPage)

  useEffect(() => {
    const controller = new AbortController()
    getStreamersList(controller.signal)

    return () => {
      controller.abort()
      updateError('main', '')
    }
  }, [getStreamersList, updateError])

  useEffect(() => {
    if (streamersList?.length) {
      const indexOfLastRecord = currentPage * recordsPerPage
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
      const currentRecords = streamersList?.slice(indexOfFirstRecord, indexOfLastRecord)
      setCurrentStreamers(currentRecords)
    }
  }, [currentPage, streamersList])

  const RenderTitle = () => {
    return (<h1 className="block text-2xl font-medium pb-6 w-full">Streamers</h1>)
  }

  if (loading) return (<><RenderTitle /><Loading /></>)
  if (error?.main) return (<><RenderTitle /><p>{error.main}</p></>)

  return (<>
    <RenderTitle />
    {
      streamersList?.length
        ? (<div>
          <div className="grid sm:grid-clos-1 lg:grid-cols-2 gap-4">
            {
              currentStreamers?.map((streamer, idx) =>
                (<SingleStreamer key={idx} streamer={streamer}/>))
            }
          </div>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            />
        </div>)
        : (<p>
        There is no streamer created yet, fill out the form and list your favorite streamers!
      </p>)
    }
  </>)
}
