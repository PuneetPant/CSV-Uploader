import React, { useState } from 'react';
import CSVFileUploader from './components/CSVUploader';
import CSVInputUploader from './components/CSVInputUploader';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortText, setSortText] = useState("");

  const handleSetCSVData = (data) => {
    setCsvData(data)
  }
  const handleLoading = (state) => {
    setLoading(state);
  }

  const handleSort = () => {
    console.log(csvData[0]);
    if (csvData[0].hasOwnProperty(sortText)) {
      let sortArr = [...csvData];
      sortArr.sort((a, b) => {
        console.log(a[sortText])
        return typeof a[sortText] !== "undefined" ? a[sortText].localeCompare(b[sortText]) : 0;
      })
      setCsvData(sortArr);
    }
  }

  return (
    <div className='container'>
      <div className='uploadContainer'>
        <CSVFileUploader handleSetCSVData={handleSetCSVData} />
        <CSVInputUploader loading={loading} handleLoading={handleLoading} handleSetCSVData={handleSetCSVData} />
      </div>

      <label>
        Sort By : <input disabled={csvData.length === 0} type="text" value={sortText} onChange={(e) => setSortText(e.target.value)} />
        <button disabled={sortText.length === 0 || csvData.length === 0} onClick={handleSort}>Sort</button>
      </label>
      {
        !loading ?
          <table>
            <thead>
              <tr>
                {csvData[0] && Object.keys(csvData[0]).map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))
              }
            </tbody>
          </table> : <div>Loading your data...</div>
      }

    </div>
  );
}

export default App;
