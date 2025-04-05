import { useCities } from '../hooks/useCities';
import './Table.css';

const Table = ({ data, loading, searchKey = ""}) => {

  const { data: cities, metadata } = data ?? { data: [], metadata: {} };

  return (
    <div className="table-container">
      <table className="sol-table">
        <thead>
          <tr>
            <th className='sn-col'>#</th>
            <th  className='name-col'>Place Name</th>
            <th  className='country-col'>Country</th>
          </tr>
        </thead>
      
         
            <tbody>
          { loading ? 
          <div className="loader">{searchKey?.trim()?.length ?<>Searching Results for&nbsp;<span className='current-item'>{searchKey}</span></> :"Loading..."}</div>
          :
              
              cities.length ?  cities?.map((city,index) => <tr key={city.id}>
                <td className='sn-col'>{index + 1}</td>
                <td className='name-col'>{city.name}</td>
                <td  className='country-col'><div className="country-flag-wrapper">
                  <img src={`https://flagsapi.com/${city.countryCode}/flat/24.png`} alt={city.countryCode} />
                  <p>{city.country}</p>
                  </div>
                  </td>
              </tr> ) :<div className='no-data'>No data found</div>}
            </tbody> 
             
      </table>
    </div>
  );
};

export default Table;