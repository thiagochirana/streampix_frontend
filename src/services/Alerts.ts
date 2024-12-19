import Swal from 'sweetalert2'

const Alert = {
  install(app) {
    app.config.globalProperties.$Alert = {
      infoModal(title: string, msg: string) {
        Modal.fire({
          title: title,
          text: msg,
          icon: 'info',
        })
      },
      warnModal(title: string, msg: string) {
        Modal.fire({
          title: title,
          text: msg,
          icon: 'warning',
        })
      },
      errorModal(title: string, msg: string) {
        Modal.fire({
          title: title,
          text: msg,
          icon: 'error',
        })
      },
      infoToast(msg: string) {
        Toast.fire({
          text: msg,
          icon: 'success',
        })
      },
      warnToast(msg: string) {
        Toast.fire({
          text: msg,
          icon: 'warning',
        })
      },
      errorToast(msg: string) {
        Toast.fire({
          text: msg,
          icon: 'error',
        })
      },
    }
  },
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  showCloseButton: true,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
})

const Modal = Swal.mixin({
  confirmButtonText: 'Ok',
})

export default Alert
