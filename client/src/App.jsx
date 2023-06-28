import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StreamerProvider } from './context/StreamerContext'
import { MainStream } from './components/streamers/Main'
import { DetailStream } from './components/streamers/Detail'
import { NoMatch } from './components/NoMatch'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App () {
  return (
    <>
      <BrowserRouter>
        <Header />
        <StreamerProvider>
          <Routes>
            <Route
              path="/"
              element={<MainStream />} />
            <Route
              path="/detail/:id"
              element={<DetailStream />} />
            <Route
              path="*"
              element={<NoMatch />} />
          </Routes>
        </StreamerProvider>
      </BrowserRouter>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
