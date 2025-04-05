import React from 'react'
import "./Pagination.css"


function Pagination({ current = 1, totalPages = 0, onPageChange }) {
  const handlePrevClick = () => {
    if (current > 1)  onPageChange(current - 1);
  };

  const handleNextClick = () => {
    if (current < totalPages) onPageChange(current + 1);
    
  };


  return (
    <div className="pagination-wrapper">
      <button
        onClick={handlePrevClick}
        disabled={current <= 1}

      >
       {"<< Prev"}
      </button>
      
  <span className="current-page">Page <span className='current-item'>{current}</span> of {totalPages}</span>

        
      <button
        onClick={handleNextClick}
        disabled={current >= totalPages}
   
      >
        {"Next >>"}
      </button>
    </div>
  );
}

export default React.memo(Pagination);
