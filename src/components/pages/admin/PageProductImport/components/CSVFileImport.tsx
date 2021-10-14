import React, { useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

// Windows appears the own mime type to .csv file. 
// Presigned URL contains text/csv mime restriction 
function convertCsvMimeType(type: string): string {
  const csvMimeTypes = [ 
    'text/comma-separated-values', 
    'text/csv', 
    'application/csv', 
    'application/excel', 
    'application/vnd.ms-excel', 
    'application/vnd.msexcel', 
    'text/anytext', 
    'text/plain'
  ];

  return csvMimeTypes.includes(type) ?
    ( console.info(`Type converting: ${type} => text/csv`), "text/csv") :
    type
}

type CSVFileImportProps = {
  url: string,
  title: string
};

export default function CSVFileImport({url, title}: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<File | null>();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    let files = e.target.files;
    if (!files?.length) return
    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile(null);
  };

  const uploadFile = async (e: any) => {
      // Get the presigned URL
      if(!file) {
        return;
      }

      const response = await axios({
        method: 'GET',
        url,
        params: {
          name: encodeURIComponent(file.name)
        },
        headers: {
          Authorization: `Basic ${localStorage.getItem('authorization_token')}`
        }
      })
      console.log('File to upload: ', file.name)
      console.log('Uploading to: ', response.data)
      const result = await fetch(response.data, {
        method: 'PUT',
        body: file,
        headers: {
          "Content-Type": convertCsvMimeType(file.type)
        }
      })
      console.log('Result: ', result)
      setFile(null);
    }
  ;

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
          <input type="file" onChange={onFileChange} accept=".csv"/>
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
