import AWS from "aws-sdk";
import { useState, useEffect, useRef } from "react";
import { status, getFiles, getFile } from './helper'

function App() {
    let fileInput = useRef();
    const [uploadFileStatus, setUploadFileStatus] = useState('');
    const [s3, setS3Instant] = useState(undefined);
    const [pharmaciesFilesList, setPharmaciesFilesList] = useState([]);
    const [mappedPharmaciesFilesList, setMappedPharmaciesFilesList] = useState([]);
    const [mappingLog, setMappingLog] = useState('');

    // Setup AWS Configs
    useEffect(() => {
      AWS.config.update({
        region: process.env.REACT_APP_AWS_REGION,
        credentials: new AWS.Credentials({
          accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
          secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
        }),
      });
      setS3Instant(new AWS.S3())
    }, [])
    
    useEffect(() => {
      if (uploadFileStatus === status.SUCCESS || uploadFileStatus === '') {
        getFiles(s3, 'pharmacies_mapped/', setMappedPharmaciesFilesList);
        getFiles(s3, 'pharmacies_files/', setPharmaciesFilesList);

        setInterval(() => {
          getFile(s3, 'mapping_logs/mapping_progress.txt', setMappingLog)
        }, 200);
      }
    }, [s3, uploadFileStatus]);

    const uploadFile = file => {
      const params = {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: `pharmacies_files/${file.name}`,
        Body: file
      };
      setUploadFileStatus(status.SUBMITTING);
      s3.putObject(params, async (err, data) => {
        if (err) {
          setUploadFileStatus(status.FAILED);
          console.error('Error uploading file:', err);
        } else {
          await s3.putObjectAcl(
            {
              Bucket: process.env.REACT_APP_BUCKET_NAME,
              Key: `pharmacies_files/${file.name}`,
              ACL: 'public-read',
            }
          ).promise();
          setUploadFileStatus(status.SUCCESS);
          console.log('File uploaded successfully:', data);
        }
      });
    }

  return (
    <div className="App">

      {/** Upload File */}
      <div style={{ marginBottom: '30px' }}>
        <div>
          <p id="pharmacies-files-title">Upload Pharmacy File:</p>
        </div>
        <input
            style={{ width: '100%' }}
            type="file"
            id="stock_csv"
            accept=".csv, .xlsx"
            ref={input => {
              fileInput = input;
            }}
            onChange={e => {
              uploadFile(e.currentTarget.files[0]);
            }}
          />
        <p style={{ fontSize: '15px' }}>{uploadFileStatus}</p>
      </div>

      {/** Mapping Log */}
      <div style={{ marginBottom: '20px' }}>
        <div>
          <p id="pharmacies-files-title">Mapping Log: <a href={`${process.env.REACT_APP_CDN_URL}/mapping_logs/mapping_progress.txt`}>(Log File)</a> </p>
        </div>
        
        <div
          style={{
            height: '130px',
            overflow: 'auto'
          }}
        >
        <p style={{
          fontSize: '15px', 
          margin: '0',
          display: 'flex',
          gap: '8px',
          whiteSpace: 'pre-line',
          }}>{mappingLog}</p>
        </div>
      </div>


      {/** Files */}
      <div id="tables-container">
        <div id="files-table">
          <div>
            <p id="pharmacies-files-title">Pharmacies:</p>
          </div>
          <div id="table-header">
            <p id="cell-header-file">File</p>
            <p id="cell-header-date">Date (by latest)</p>
          </div>
          <div>
            {pharmaciesFilesList?.map(file => (<div id="table-row" key={file.date}><div style={{ width: '100%' }}><a id="file-name" href={file.file} target="_blank">{file.name}</a></div><p id="file-date">{file.date}</p></div>))}
          </div>
        </div>
        <div id="files-table">
          <div>
            <p id="pharmacies-files-title">Pharmacies Mapped Files:</p>
          </div>
          <div id="table-header">
            <p id="cell-header-file">File</p>
            <p id="cell-header-date">Date (by latest)</p>
          </div>
          <div>
            {mappedPharmaciesFilesList?.map(file => (<div id="table-row" key={file.date}><div style={{ width: '100%' }}><a id="file-name" href={file.file} target="_blank">{file.name}</a></div><p id="file-date">{file.date}</p></div>))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;