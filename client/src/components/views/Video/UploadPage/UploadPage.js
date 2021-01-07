import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './UploadPage.module.scss';

const Private = [
  {value: 0, label: 'Private'},
  {value: 1, label: 'Public'}
]

const Categories = [
  {value: 0, label: 'Film & Animation'},
  {value: 1, label: 'Autos & Vehicles'},
  {value: 2, label: 'Music'},
  {value: 3, label: 'Pets & Animals'},
  {value: 4, label: 'Sports'},

]

function VideoUploadPage(props) {

  const user = useSelector(state => state.user);

  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Privacy, setPrivacy] = useState(0);
  const [Category, setCategory] = useState(0);
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
    setCategory(event.currentTarget.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(user.userData && !user.userData.isAuth) {
      return alert('Please Login First');
    }

    if(Title === '' || 
      Description === '' ||
      Category === '' ||
      FilePath === '' ||
      Duration === '' ||
      Thumbnail === '' ) {
        return alert('Please first fill all the fields');
    }

    const variables = {
      writer: user.userData._id,
      title: Title,
      description: Description,
      privacy: Privacy,
      filepath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: Thumbnail
    }

    axios.post('/api/video/uploadVideo', variables).then(res => {
      if(res.data.success) {
        alert('video uploaded successfully');
        setTimeout(() => {}, 3000);
        props.history.push('/video/home');
      } else {
        alert('failed to upload video');
        console.log(res.data.err);
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
        });
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
      <hr />
      <br/>
      <form onSubmit={onSubmit}>
        <div className={style.drop}>
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}
            >
              {({getRootProps, getInputProps}) => (
                <div className={style['drop-box']} {...getRootProps()}>
                  <input type="text" {...getInputProps()}/>
                  <i className={`material-icons ${style['drop-icon']}`}>add</i>
                </div>
              )}
          </Dropzone>
          {Thumbnail !== '' &&
            <img
              className={style['drop-image']} 
              src={`http://localhost:9090/${Thumbnail}`} 
              alt='haha' 
            />
          }
        </div>
        <br/><br/>
        <label>Title</label>
        <input type="text" onChange={handleChangeTitle} value={Title}/>

        <br/><br/>
        <label>Description</label>
        <textarea onChange={handleChangeDescription} value={Description}/>

        <br/><br/>
        <select onChange={handleChangeOne} value={Privacy}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br/><br/>
        <select onChange={handleChangeTwo} value={Category}>
          {Categories.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br/><br/>
        <button onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default withRouter(VideoUploadPage);
