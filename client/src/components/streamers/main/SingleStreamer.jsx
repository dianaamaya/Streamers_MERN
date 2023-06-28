import { useNavigate } from 'react-router-dom'
import streamerImage from '../../../assets/streamer/streamer.png'
import { Votes } from './Votes'
import { PlatformStreamer } from './PlatformStreamer'
import PropTypes from 'prop-types'

export function SingleStreamer ({ streamer }) {
  const navigate = useNavigate()

  const streamerDetailPage = (streamerId) => {
    navigate(`/detail/${streamerId}`)
  }

  return (
    <div
      className="flex cursor-pointer bg-indigo-50 rounded-md border-2 border-indigo-100 p-2 overflow-hidden"
      onClick={() => streamerDetailPage(streamer._id)}>
      <img alt="" src={streamerImage} className="flex-none w-20 h-20 lg:w-14 lg:h-14 rounded-full border-8 border-zinc-50" />
      <div className="pl-4 flex-1 w-[calc(100%-80px)]">
        <h3 className="block text-lg font-medium truncate">
          {streamer?.name}
        </h3>
        <PlatformStreamer
          small= {true}
          platformName={streamer?.platform?.toString()}/>
        <Votes streamer={streamer} />
      </div>
    </div>
  )
}

SingleStreamer.propTypes = {
  streamer: PropTypes.object.isRequired
}
