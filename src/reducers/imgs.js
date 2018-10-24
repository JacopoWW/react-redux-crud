import { SET_IMGS, ADD_IMG, PUT_IMG, DELETE_IMG } from '../constants';

function imgs(state = [], action = {}) {
  switch(action.type) {
    case SET_IMGS:
      return action.imgs;
    case ADD_IMG:
      return [...state, action.img]
    case PUT_IMG:
      state = state.map(it => {
        if (it._id === action.data._id) {
          return action.data
        } else {
          return it
        }
      })
      return state
    case DELETE_IMG:
      state = state.filter(it => it._id !== action.id)
      return state
    default: return state
  }
}

export default imgs;