import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import style from './UploadPage.module.scss';
import FileUpload from './Sections/FileUpload/FileUpload';
import { continents } from '../Constants';

function UploadPage(props) {

  const user = useSelector(state => state.user);

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);

  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value)
  }

  const descriptionChangeHandler = (event) => {
      setDescription(event.currentTarget.value)
  }

  const priceChangeHandler = (event) => {
      setPrice(event.currentTarget.value)
  }

  const continentChangeHandler = (event) => {
      setContinent(event.currentTarget.value)
  }

  const updateImages = (newImages) => {
      setImages(newImages)
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(user.userData && !user.userData.isAuth) {
      return alert('Please Login First');
    }

    if(!Title || !Description || !Continent || Images.length === 0) {
        return alert('Please first fill all the fields');
    }

    const variables = {
      writer: user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continents: Continent
    }

    axios.post('/api/product/uploadProduct', variables).then(res => {
      if(res.data.success) {
        alert('video uploaded successfully');
        setTimeout(() => {}, 3000);
        props.history.push('/shop/home');
      } else {
        alert('failed to upload video');
      }
    })
  }


  return (
    <div className={`overflow-y ${style.wrapper}`}>
      <div className={style['wrapper-title']}>
        <h2>여행 상품 업로드</h2>
      </div>
      <hr />
      <form onSubmit={onSubmit}>
        <br/>
        <FileUpload refreshFunction={updateImages}/>
        
        <br/><br/>
        <label>Title</label>
        <input type="text" onChange={titleChangeHandler} value={Title}/>

        <br/><br/>
        <label>Description</label>
        <textarea onChange={descriptionChangeHandler} value={Description}/>

        <br/><br/>
        <label>Price($)</label>
        <textarea onChange={priceChangeHandler} value={Price}/>

        <br/><br/>
        <select onChange={continentChangeHandler} value={Continent}>
          {continents.map((item, index) => (
            <option key={index} value={item._id}>{item.name}</option>
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

export default UploadPage;
