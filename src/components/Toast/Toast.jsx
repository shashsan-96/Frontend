
import {toast ,Slide} from 'react-toastify'

export const notifyErr = (e) => {
    
    toast.error(e, {
      position: "top-right",
      autoClose: 6000,
      transition: Slide
    })
  }


  export  const notifyInfo = (e) => {
    
    toast.info(e, {
      position: "top-right",
      autoClose: 6000,
      transition: Slide
    })
  }

  export  const notifySuccess = (e) => {
    
    toast.success(e, {
      position: "top-right",
      autoClose: 6000,
      transition: Slide
    })
  }


  export const notifyWar = (e) => {
    
    toast.warning(e, {
      position: "top-right",
      autoClose: 6000,
      transition: Slide
    })
  }




