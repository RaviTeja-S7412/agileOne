/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  sidebarShow: true,
}

export default (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}
