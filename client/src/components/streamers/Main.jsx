import { CreateStream } from './main/CreateStreamer'
import { ListStreams } from './main/ListStreamers'
import { Layout } from '../Layout'

export function MainStream () {
  return (
    <Layout>
      <div className="md:flex md:flex-row-reverse md:items-start md:gap-12">
        <div className="sm:mt-0 md:mt-14 md:basis-1/2 p-4 border-2 rounded-lg border-indigo-400">
          <CreateStream />
        </div>
        <div className="mt-12 md:mt-0 md:basis-1/2 flex flex-col justify-between">
          <ListStreams />
        </div>
      </div>
    </Layout>
  )
}
