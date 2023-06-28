import PropTypes from 'prop-types'

export function Pagination ({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  return (
    <nav className="mt-12 text-center">
      <ul className='flex items-center justify-center flex-wrap space-x-1'>
        <li className='mb-6'>
          <a href='#'
            onClick={prevPage}
            className={`px-4 py-2 ${currentPage === 1 ? 'cursor-not-allowed bg-gray-100 text-gray-500' : 'cursor-pointer hover:bg-indigo-400 hover:text-white'}  border border-gray-200 rounded-md`}>
            Previous
          </a>
        </li>
        {pageNumbers.map(pgNumber => (
          <li key={pgNumber} className='mb-6'>
            <a href='#'
              onClick={() => setCurrentPage(pgNumber)}
              className= {`cursor-pointer px-4 py-2 rounded-md ${currentPage === pgNumber ? 'bg-indigo-400 text-white' : 'text-gray-700 bg-gray-50 border border-gray-200'} hover:bg-indigo-400 hover:text-white`} >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className='mb-6'>
          <a href='#'
            onClick={nextPage}
            className={`cursor-pointer px-4 py-2 ${currentPage === nPages ? 'cursor-not-allowed bg-gray-100 text-gray-500' : 'cursor-pointer hover:bg-indigo-400 hover:text-white'} border border-indigo-100 rounded-md hover:bg-indigo-400 hover:text-white`}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  nPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
}
