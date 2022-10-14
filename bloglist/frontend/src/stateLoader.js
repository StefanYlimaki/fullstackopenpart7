
export const loadState = () => {
  try {
    let state = localStorage.getItem('state')
    if(state === null) {
      return null
    }
    return JSON.parse(state)
  } catch (error) {
    console.log(error)
  }
}

export const saveState = (state) => {
  try {
    let serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  }
  catch (error) {
    console.log(error)
  }
}