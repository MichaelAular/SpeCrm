import React, { useState, useEffect, useRef } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useDropzone} from 'react-dropzone';
import styles from "./login.module.css";
import * as FirestoreProfileService from "../services/firebaseProfiles";
import * as FirestoreUploadService from "../services/firebaseFileUpload";
import { FileTable } from "@/components/tableFiles/table";

require('dayjs/locale/nl')

export function Tab_Files({
  profileID,
  currentProfile
}) {
  const [uploaded, setUploaded] = useState(false);
  const [currentFiles, setCurrentFiles] = useState(null);

  useEffect(() => {
    console.log(profileID);
    console.log(currentProfile);
  }, []);

  useEffect(() => {
    if (profileID && profileID !== "new_user") {
      FirestoreProfileService.getFiles(profileID)
      .then(data => {
        setCurrentFiles(data)
      })
      .catch(() => console.log("Error"));
    }
  }, [profileID]);

  const getFiles = () => {
    FirestoreProfileService.getFiles(profileID)
    .then(data => {
      setCurrentFiles(data)
    })
    .catch(() => console.log("Error"));
  }

  const handleUpload = async (e) => {
    e.preventDefault(); 
    
    // Now get the form data as you regularly would
    const formData = new FormData(e.currentTarget);
    const file =  formData.get("my-file");
    //setSelectedFile(file);
    console.log(file)
    const folder = `students/${[profileID]}/`;
    const filePath = await FirestoreUploadService.uploadFile(file, folder);
    const fileUrl = await FirestoreUploadService.getFile(filePath);
    const uploadDate = new Date();
    const docName = `${uploadDate.getUTCFullYear()}${uploadDate.getMonth()}${uploadDate.getDate()}_${file.name}`;
    var data = {
      fileName: file.name,
      uploadDate: uploadDate,
      fileLocation: fileUrl,
      byteSize: file.size
    }
    console.log(fileUrl)
    await FirestoreProfileService.saveFileLocation(data, profileID, docName);
    getFiles();
  }

  const deleteFile = async (e) => {
    FirestoreProfileService.deleteFileLocation(profileID, e);
    getFiles();
  }

  function Dropzone(props) {
    const {required, name} = props; 
  
    const hiddenInputRef = useRef(null);
  
    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
      onDrop: (incomingFiles) => {
        if (hiddenInputRef.current) {
          // Note the specific way we need to munge the file into the hidden input
          // https://stackoverflow.com/a/68182158/1068446
          const dataTransfer = new DataTransfer();
          incomingFiles.forEach((v) => {
            dataTransfer.items.add(v);
          });
          hiddenInputRef.current.files = dataTransfer.files;
        }
      }
    });
  
    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    return (
      <div className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          {/*
            Add a hidden file input 
            Best to use opacity 0, so that the required validation message will appear on form submission
          */}
          <input type ="file" name={name} required={required} style ={{opacity: 0}} ref={hiddenInputRef}/>
          <input {...getInputProps()} />
          <p>Drag & drop of klik hier om bestanden te uploaden. Max 1 per keer.</p>
        </div>
        <aside>
          <br></br>
          <h4>Bestand:</h4>
          <ul>{files}</ul>
          <br></br>
          <button type="submit" disabled={files.length == 0}
              className="urenRegistratieSaveBtn">
            Uploaden
          </button>
        </aside>
      </div>
    );
  }

  return (
    <div className={styles.mainCentered}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Documenten</h1>
          </Grid>
        </Grid>
        <Grid spacing={2}>
          <div container>
            <form onSubmit={handleUpload}>
              <Dropzone name ="my-file" required/>
            </form>
          </div>
        </Grid>
        <Grid spacing={2}>
          <Grid item xs={12}>
            <h2>Geupload</h2>
            <br></br>
            {currentFiles != null && (<FileTable files={currentFiles} deletedAction={deleteFile}/>)}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}