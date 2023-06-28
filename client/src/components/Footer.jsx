import moment from 'moment'

export function Footer () {
  return (
    <footer className="fixed bottom-0 w-full text-center bg-zinc-50 border border-bg-zinc-100 z-10">
      <div className="px-8 py-2 max-w-5xl mx-auto">
        Copyright © Streamers APP {moment().format('YYYY')}
      </div>
    </footer>
  )
}
