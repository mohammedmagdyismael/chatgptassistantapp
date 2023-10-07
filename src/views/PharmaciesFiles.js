import AWS from "aws-sdk";
import { useState, useEffect } from "react";

function App() {

    console.log(process.env.REACT_APP_AWS_S3_ACCESS_KEY)

    const [files, setFilesList] = useState([]);
    const formatDateTime = (dateString, langCode) => {
      const day = new Date(`${dateString}Z`).toLocaleString(langCode, { day: '2-digit' });
      const month = new Date(`${dateString}Z`).toLocaleString(langCode, { month: 'long' });
      const year = new Date(`${dateString}Z`).toLocaleString(langCode, { year: 'numeric' });
      const time = new Date(`${dateString}Z`)?.toLocaleTimeString('en-EG', {
        hour: '2-digit',
        hour12: true,
        minute: '2-digit',
      });
      return `${day} ${month} ${year}, ${time}`;
    };

    useEffect(() => {
      AWS.config.update({
        region: process.env.REACT_APP_AWS_REGION,
        credentials: new AWS.Credentials({
          accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
          secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
        }),
      });
      const s3 = new AWS.S3();
      
      s3.listObjects(
        { Bucket: process.env.REACT_APP_BUCKET_NAME, Prefix: process.env.REACT_APP_BUCKET_PREFIX_NAME },
        (err, data) => {
          if (err) {
            console.error('Error listing objects:', err);
          } else {
            const temp = [];
            data.Contents.forEach((object) => {
              temp.push({ file: `${process.env.REACT_APP_CDN_URL}/${object.Key}`, name: object.Key, date: formatDateTime(object.LastModified, 'en-EG')});
            });
            setFilesList(temp);
          }
        });
    }, []);

  return (
    <div className="App">
      <div>
        <p id="pharmacies-files-title">Pharmacies Mapped Files:</p>
      </div>
      <div id="table-header">
        <p id="cell-header">File</p>
        <p id="cell-header">Date</p>
      </div>
      <div>
        {files?.map(file => (<div id="table-row" key={file.date}><a id="file-name" href={file.file} target="_blank">{file.name}</a><p id="file-date">{file.date}</p></div>))}
      </div>
    </div>
  );
}

export default App;