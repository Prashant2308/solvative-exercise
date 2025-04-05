import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { SearchBox } from './components/SearchBox'
import Table from './components/Table'
import {defPayloadValues, useCities} from "./hooks/useCities"
import SelectBox from './components/SelectBox'
import Pagination from './components/Pagination'

function App() {
  const [tableFilters, setTableFilters] = useState(defPayloadValues)
  
  const { data, isLoading} = useCities(tableFilters);
  const handleSearchChange = useCallback(
    (() => {
      let timeoutId;
      return (searchValue: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setTableFilters(prev => ({
            ...prev,
            pageNumber:1,
            name: searchValue // on changing search value page number should be reset to 1
          }));
        }, 500);
      };
    })(),
    []
  )

  const handlePageSizeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableFilters(prev => ({
      ...prev,
      pageNumber:1,
      pageSize: Number(event.target.value) // on changing page size page number should be reset to 1
    }));
  }, []);
 const handlePageChange = useCallback((page: number) => {  
    setTableFilters(prev => ({
      ...prev,
      pageNumber: page
    }));
  }, []);
  console.log('da',data)
const totalPages = useMemo(() => {
  if (!data?.metadata?.totalCount) return 0;
  const pages = data.metadata.totalCount / tableFilters.pageSize;
  return Number.isInteger(pages) ? pages : Math.floor(pages) + 1;
}, [data?.metadata?.totalCount, tableFilters.pageSize,tableFilters.name]);
  return (
    <div className="app-container">
      <div className="controls">
        <SearchBox total={data?.metadata?.totalCount} onChange={handleSearchChange} />
      
      </div>
      <Table loading={isLoading} data={data} searchKey={tableFilters.name || ""} />
 {  data?.metadata?.totalCount > tableFilters.pageSize ?    <div className='footer'>
  <div />
      <Pagination current={tableFilters.pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
      <SelectBox handlePageSizeChange={handlePageSizeChange} pageSize={tableFilters.pageSize} />
      </div> : <></>}
     
    </div>
  )
}

export default App
