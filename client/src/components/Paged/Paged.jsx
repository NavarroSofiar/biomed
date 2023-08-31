import React from 'react'
import './Paged.modules.css';

const Paged = ({ jobsPerPage, currentPage, setCurrentPage, allJobs, totalPages }) => {
  
  const pageNumber = [];


  let round = 0;
  round = Math.ceil(allJobs / (jobsPerPage))
 

  //Math.ceil round up all the jobs, about the countries I want per page
  for (let i = 1; i <= round; i++) {
    pageNumber.push(i)
  }
  const prevClick = () => {
    setCurrentPage(currentPage - 1)
  }

  const nextClick = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <nav>
      <ul className="pageNumbers">
        <button className={currentPage <= 1 ? 'movesBtn' : 'movesBtnAct'} disabled={currentPage <= 1} onClick={prevClick} >Prev</button>
        {pageNumber &&
          pageNumber.map(number =>
            <li key={number} >
              <div className={number === currentPage ? 'btnUnSelect' : 'btnStyle'} onClick={() => totalPages(number)}>{number}</div>
            </li>
          )}
        <button className={currentPage >= round ? 'movesBtn' : 'movesBtnAct'} disabled={currentPage >= round} onClick={nextClick} >Next</button>
      </ul>
    </nav>
  )
}

export default Paged;
