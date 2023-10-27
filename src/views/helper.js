export const formatDateTime = (dateString, langCode) => {
  const day = new Date(`${dateString}`).toLocaleString(langCode, { day: '2-digit' });
  const month = new Date(`${dateString}`).toLocaleString(langCode, { month: 'long' });
  const year = new Date(`${dateString}`).toLocaleString(langCode, { year: 'numeric' });
  const time = new Date(`${dateString}`)?.toLocaleTimeString('en-EG', {
    hour: '2-digit',
    hour12: true,
    minute: '2-digit',
  });
  return `${day} ${month} ${year}, ${time}`;
};

export const getFiles = (s3Instant, directoryPrefix, callBack) => {
  s3Instant?.listObjects(
    { Bucket: process.env.REACT_APP_BUCKET_NAME, Prefix: directoryPrefix },
    (err, data) => {
      if (err) {
        console.error('Error listing objects:', err);
      } else {
        const temp = [];
        data.Contents.forEach((object) => {
          temp.push({ file: `${process.env.REACT_APP_CDN_URL}/${object.Key}`, name: String(object.Key).replace(directoryPrefix, ''), date: formatDateTime(object.LastModified, 'en-EG')});
        });
        temp.sort((objectA, objectB) => new Date(objectB.date) - new Date(objectA.date))
        callBack(temp);
      }
    });
}

export const getFile = (s3Instant, objectKey, callBack) => {
  const params = {
    Bucket: process.env.REACT_APP_BUCKET_NAME,
    Key: objectKey
  };
  
  s3Instant?.getObject(params, (err, data) => {
    if (err) {
      console.log('Error occurred while reading the file:', err);
    } else {
      const fileContent = data.Body.toString();
      callBack(fileContent);
    }
  });
}

export const status = {
  SUBMITTING: 'Uploading File ....',
  SUCCESS: 'File Uploaded Successfully !',
  FAILED: 'File Uploading Failed !',
}