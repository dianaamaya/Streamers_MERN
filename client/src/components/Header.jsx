import { Link } from 'react-router-dom'
import streamerLogo from '../assets/streamer/logo.png'

export function Header () {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white z-10">
      <nav className="relative flex flex-wrap items-center justify-between px-8 py-3 mb-3 max-w-5xl mx-auto">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white tracking-widest"
              to="/"
            >
              <img
                alt=""
                src={streamerLogo}
                className="w-9 h-9 mr-4 inline-block rounded-full border-2 border-zinc-50" />
              Streamers App
            </Link>
          </div>
      </nav>
    </header>
  )
}
