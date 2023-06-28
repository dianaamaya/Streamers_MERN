import PropTypes from 'prop-types'

export function Layout ({ children }) {
  return (
    <main className="px-8 py-12 mb-12 max-w-5xl mx-auto">
      {children}
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
