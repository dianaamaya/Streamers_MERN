import { useForm } from 'react-hook-form'
import { useStreamerContext } from '../../../context/StreamerHookContext'
import { ReactComponent as IconSend } from '../../../assets/general/send.svg'
import { platforms } from '../../../utilities/streamerConfigs'

export function CreateStream () {
  const { createStreamer } = useStreamerContext()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit((formData) => {
    createStreamer(formData)
    reset()
  })

  return (
    <form onSubmit={onSubmit}>
        <h2 className="block text-lg font-medium pb-6 text-center">Create a new streamer</h2>
        <h3 className="block text-md font-small pb-6">
            Is your favorite streamer not on the list?
            What are you waiting for to add him/her!
        </h3>
        <div>
          <label htmlFor="input-name">Name</label>
          <input
            id="input-name"
            className="block border rounded-md w-full px-4 py-2 basis-5/6 focus:outline-none"
            type="text"
            placeholder="Write the streamer name..."
            {...register('name', { required: true, maxLength: 50 })}
          />
        </div>
        {errors.name && errors.name.type === 'required' && (
          <p className="text-rose-800 py-1">
            * Name is required
          </p>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <p className="text-rose-800 py-1">
            * Max length exceeded (50 characters)
          </p>
        )}

        <div className="mt-4">
          <label htmlFor="input-platform">Platform</label>
          <select
           id="input-platform"
           className='block border rounded-md w-full px-4 py-2 basis-5/6 focus:outline-none'
           defaultValue={''}
           {...register('platform', { required: true })} >
            <option value="" disabled>Select the streaming platform...</option>
            {
              platforms.map((platform, idx) =>
                (<option key={idx} value={platform}>{platform}</option>))
            }
          </select>
        </div>
        {errors.platform && errors.platform.type === 'required' && (
          <p className="text-rose-800 py-1">
            * Platform is required
          </p>
        )}

        <div className="mt-4">
          <label htmlFor="input-description">Description</label>
          <textarea
            id="input-description"
            className="block border rounded-md w-full px-4 py-2 basis-5/6 focus:outline-none"
            placeholder="Write the streamer description..."
            {...register('description', { required: true, maxLength: 300 })}
          />
        </div>
        {errors.description && errors.description.type === 'required' && (
          <p className="text-rose-800 py-1">
            * Description is required
          </p>
        )}
        {errors.description && errors.description.type === 'maxLength' && (
          <p className="text-rose-800 py-1">
            * Max length exceeded (300 characters)
          </p>
        )}

        <button
            className="bg-indigo-400 text-white px-4 py-2 rounded-md mt-8 w-full"
            type="submit"
          >
            <IconSend className="w-6 inline-block pr-2" />
            Send
          </button>
      </form>
  )
}
