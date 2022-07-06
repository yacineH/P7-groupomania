import React from 'react'
import Pagintation from '@material-ui/lab/Pagination'

const PaginComp = ({ setPage, page, totalPages }) => {
  const handleChange = (page) => {
    setPage(page)
    window.scroll(0, 0)
  }

  return (
    <>
      <div style={{ marginTop: '45px' }}>
        <Pagintation
          onChange={(e) => handleChange(e.target.textContent)}
          style={{ display: 'flex', justifyContent: 'center' }}
          variant="outlined"
          count={totalPages}
        />
      </div>
    </>
  )
}

export default PaginComp
