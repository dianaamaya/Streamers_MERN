import { useNavigate } from 'react-router-dom'
import { ReactComponent as IconBack } from '../assets/general/back.svg'

export function NoMatch () {
  const navigate = useNavigate()

  return <div className='px-8 py-12 max-w-5xl mx-auto text-center'>
    <h1 className='text-2xl font-semibold mb-3'>You got lost!</h1>
    <h3>We are very sorry. The page you are looking for doesn’t exist (anymore).</h3>
    <button
      onClick={() => navigate('/')}
      className="bg-indigo-400 text-white px-4 py-2 rounded-md mt-8"
      >
        <IconBack className="w-6 inline-block pr-2 mb-1 fill-white" />
        Go Home Page
    </button>
  </div>
}
