import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Private = [
  {value: 0, label: 'Private'},
  {value: 1, label: 'Public'}
]

const Category = [
  {value: 0, label: 'Film & Animation'},
  {value: 1, label: 'Autos & Vehicles'},
  {value: 2, label: 'Music'},
  {value: 3, label: 'Pets & Animals'},
  {value: 4, label: 'Sports'},

]
function VideoUploadPage(props) {

  const user = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(0);
  const [Categories, setCategories] = useState('Film & Animation');
  const [FilePath, setFilePath] = useState('');
  const [Duration, setDuration] = useState('');
  const [Thumbnail, setThumbnail] = useState('');

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  }

  const handleChangeDescription = (event) => {
    setDescription(event.currentTarget.value);
  }

  const handleChangeOne = (event) => {
    setPrivacy(event.currentTarget.value);
  }

  const handleChangeTwo = (event) => {
    setCategories(event.currentTarget.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(user.userData && !user.userData.isAuth) {
      return alert('Please Lo in First');
    }

    if(title === '' || 
      Description === '' ||
      Categories === '' ||
      FilePath === '' ||
      Duration === '' ||
      Thumbnail === '' ) {
        return alert('Please first fill all the fields');
    }

    const variables = {
      writer: user.userData._id,
      title: title,
      description: Description,
      privacy: privacy,
      filePath: FilePath,
      category: Categories,
      duration: Duration,
      thumbnail: Thumbnail
    }

    axios.post('/api/video/uploadVideo', variables).then(response => {
      if(response.data.success) {
        alert('video uploaded successfully');
        props.history.push('/');
      } else {
        alert('failed to upload video');
      }
    })
  }

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0])

    axios.post('/api/video/uploadfiles', formData, config).then(response => {
      if(response.data.success) {
        let variable = {
          filePath: response.data.filepath,
          fileName: response.data.fileName
        }
        setFilePath(response.data.filePath);

        //generate thumnail with this filepath!
        axios.post('/api/video/thumbnail', variable).then(response => {
          if(response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnail(response.data.thumbFilepath);
          } else {
            alert('Failed to make the thumbnails');
          }
        })
      } else {
        alert('failed to save the video in server');
      }
    })
  }

  return (
    <div>
      <div>
        Upload Video
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}
            >
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input type="text" {...getInputProps}/>
                  <i className="material-icons">add</i>
                </div>
              )}
          </Dropzone>
          {Thumbnail !== '' &&
            <div>
              <img src={`http://localhost:5000/${Thumbnail}`} alt='haha' />
            </div>
          }
        </div>
        <br/><br/>
        <label>Title</label>
        <input type="text" onChange={handleChangeTitle} value={title}/>

        <br/><br/>
        <label>Description</label>
        <textarea onChange={handleChangeDescription} value={Description}/>

        <br/><br/>
        <select onChange={handleChangeOne}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br/><br/>
        <select onChange={handleChangeTwo}>
          {Category.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <button onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default VideoUploadPage