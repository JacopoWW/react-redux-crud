import { SET_IMGS, ADD_IMG, PUT_IMG, DELETE_IMG } from '../constants'
import axios from 'axios';
import { apiUrl } from '../config.json'

export const imgsApiUrl = apiUrl + '/imgs'


export const setImgs = (imgs) => {
  return {
    type: SET_IMGS,
    imgs
  }
}
export const addImg = (img) => {
  return {
    type: ADD_IMG,
    img
  }
};

export const delImg = (id) => {
  return {
    type: DELETE_IMG,
    id
  }
}

export const putImg = (data) => {
  return {
    type: PUT_IMG,
    data
  }
}


export const fetchImgs = () => {
  return async dispatch => {
    const {data: imgs} = await axios.get(imgsApiUrl)
    dispatch(setImgs(imgs))
  }
};

export const saveImg = (data) => {
  return async (dispatch) => {
    const {data: img} = await axios.post(imgsApiUrl, data)
    dispatch(addImg(img))
  }
}

export const updateImg = (img) => {
  return async (dispatch) => {
    const { data } = await axios.put(`${imgsApiUrl}/${img._id}`, img)
    dispatch(putImg(data))
  }
}

export const getImg = (id) => {
  return axios.get(`${imgsApiUrl}/${id}`)
}

export const deleteImg = (id) => {
  return async (dispatch) => {
    await axios.delete(`${imgsApiUrl}/${id}`)
    dispatch(delImg(id))
  }
}




