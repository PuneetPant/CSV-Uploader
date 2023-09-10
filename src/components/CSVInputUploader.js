import React from "react";
import Papa from 'papaparse';

const CSVInputUploader = ({ loading, handleLoading, handleSetCSVData }) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleLoading(true);
    Papa.parse(file, {
      complete: (result) => {
        handleSetCSVData(result.data);
        handleLoading(false);
      },
      header: true,
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={loading}
        className="csvInput"
      />
    </div>

  )
}
export default CSVInputUploader;
