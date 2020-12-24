import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SubNavBar from "../../SubNavBar/SubNavBar";

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

  const [funcMenus, setFuncMenus] = useState([
    'upload',
    'subScription'
  ]);
  
  const user = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(0);
  const [Categories, setCategories] = useState(0);
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
      filepath: FilePath,
      category: Categories,
      duration: Duration,
      thumbnail: Thumbnail
    }

    axios.post('/api/video/uploadVideo', variables).then(res => {
      console.log(res.data);
      if(res.data.success) {
        alert('video uploaded successfully');
        setTimeout(() => {}, 3000);
        props.history.push('/video');
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
    formData.append('file', files[0]);
    axios.post('/api/video/uploadfiles', formData, config).then(res => {
      if(res.data.success) {
        let variable = {
          filePath: res.data.filePath,
          fileName: res.data.fileName
        }
        setFilePath(res.data.filePath);
        
        //gerenate thumbnail with this filepath ! 
        axios.post('/api/video/thumbnail', variable).then(res => {
          if(res.data.success) {
            setDuration(res.data.fileDuration);
            setThumbnail(res.data.thumbFilepath);
          } else {
            alert('Failed to make the thumbnails');
          }
          console.log(res);
        });
      } else {
        alert('failed to save the video in server');
      }
    })
  }

  return (
    <div>
      <SubNavBar funcMenus={funcMenus} />
      <div className='views-sub'>
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
                    <input type="text" {...getInputProps()}/>
                    <i className="material-icons">add</i>
                  </div>
                )}
            </Dropzone>
            {Thumbnail !== '' &&
              <div>
                <img src={`http://localhost:9090/${Thumbnail}`} alt='haha' />
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

          <br/><br/>
          <button onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default withRouter(VideoUploadPage);
