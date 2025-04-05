import React, { memo } from 'react'


/// default page size 5
function SelectBox({handlePageSizeChange,pageSize = 5}) {
  const pageSizes = [5, 6, 7, 8, 9, 10];
  return (
    <select className='select-box' onChange={handlePageSizeChange} value={pageSize}>
    {pageSizes.map(size => (
      <option key={size} value={size}>
        {size} per page
      </option>
    ))}
  </select>
  )
}

export default memo(SelectBox)