import { platforms } from '../../../utilities/streamerConfigs'
import PropTypes from 'prop-types'

export function PlatformStreamer ({ platformName, small = false }) {
  const platformPath = platforms.includes(platformName)
    ? `/src/assets/platforms/${platformName.toString().toLowerCase()}.png`
    : ''
  return (platformPath
    ? <img
        src={platformPath}
        alt=""
        className={`mt-2 ${small ? 'w-10' : 'w-20'} h-[25px] min-w-max object-cover rounded-md`} />
    : null
  )
}

PlatformStreamer.propTypes = {
  platformName: PropTypes.string,
  small: PropTypes.bool
}
