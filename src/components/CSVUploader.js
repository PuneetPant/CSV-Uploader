import React, { useState } from 'react';
import Papa from 'papaparse';
import "./CSVUploader.scss";

function CSVFileUploader({ handleSetCSVData }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];

    if (file && file.type === 'text/csv') {
      Papa.parse(file, {
        complete: (result) => {
          handleSetCSVData(result.data);
        },
        header: true,
      });
    } else {
      alert('Please upload CSV file only.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div
      className={`csvUploader ${isDragOver ? 'dragOver' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <p>Drag and drop a CSV file here</p>
    </div>
  );
}

export default CSVFileUploader;
