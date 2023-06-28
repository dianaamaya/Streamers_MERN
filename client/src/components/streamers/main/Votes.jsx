import { useStreamerContext } from '../../../context/StreamerHookContext'
import { ReactComponent as IconLike } from '../../../assets/general/like.svg'
import { ReactComponent as IconDislike } from '../../../assets/general/dislike.svg'
import PropTypes from 'prop-types'

export function Votes ({ streamer }) {
  const { updateStreamer } = useStreamerContext()

  const upvote = (e, streamerId) => {
    e.stopPropagation()
    updateStreamer(streamerId, true)
  }

  const downvote = (e, streamerId) => {
    e.stopPropagation()
    updateStreamer(streamerId, false)
  }

  return (
    <>
      <button
        className="bg-indigo-400 border border-indigo-400 text-white py-0 px-1 rounded-md mr-2 mt-2 relative pl-7 min-w-[58px] text-center"
        onClick={(e) => upvote(e, streamer._id)}>
          <IconLike className="w-4 h-4 inline-flex absolute top-1 left-2" />
          { streamer?.votes?.upvotes ?? 0 }
      </button>
      <button
        className="bg-zinc-50 border border-zinc-200 py-0 px-1 rounded-md mt-2 items-center relative pl-7 min-w-[58px] text-center"
        onClick={(e) => downvote(e, streamer._id)}>
          <IconDislike className="w-4 h-4 inline-flex absolute top-1.5 left-2" />
          { streamer?.votes?.downvotes ?? 0 }
      </button>
    </>
  )
}

Votes.propTypes = {
  streamer: PropTypes.object.isRequired
}
