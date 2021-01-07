/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import style from './FileUpload.module.scss';
import axios from 'axios';

function FileUpload(props) {

  const [Images, setImages] = useState([]);

  const onDrop = (files) => {

    if(files.length > 11) {
      return alert('please upload up to 10 files at once.');
    }

    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    files.map((file, index) => {
      formData.append('files', file);
    })

    axios.post('/api/product/uploadImages', formData, config).then(res => {
      if(res.data.success) {
        setImages([...Images, ...res.data.filePathList]);
        props.refreshFunction([...Images, ...res.data.filePathList]);
      } else {
        alert('Fail to upload image');
        console.log(res);
      }
    })
  }

  const deleteHandler = (image) => {
    // eslint-disable-next-line no-restricted-globals
    if(!confirm('delete this image ? ')) return; 
    axios.post('/api/product/deleteImage', {image}).then(res => {
      if(res.data.success) {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images];
        newImages.splice(currentIndex, 1);
        setImages(newImages);
        props.refreshFunction(newImages);
      } else {
        alert('Fail to delete image');
      }
    })
  };

  return (
    <div className={style.wrapper}>
      <Dropzone onDrop={onDrop}>
          {({getRootProps, getInputProps}) => (
            <div className={style.dropBox} {...getRootProps()}>
              <input {...getInputProps()} multiple/>
              <i className={`material-icons ${style.icon}`}>add</i>
            </div>
          )}
      </Dropzone>
      <div className={style.images}>
        {Images.map((image, index) => (
          <img 
            className={style.image} 
            src={`http://localhost:9090/${image}`}
            onClick={() => deleteHandler(image)} key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default FileUpload;
