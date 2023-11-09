import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  alertaSucesso(mensagem: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: mensagem,
      showConfirmButton: false,
      timer: 1500
    })
  }

  confirmar(mensagem: string) {
    return Swal.fire({
      icon: 'question',
      title: mensagem,
      showConfirmButton: true,
      showCancelButton: true
    })
  }

  alertaSucesso2(mensagem: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: mensagem
    })
  }

  alertaErro(mensagem: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: mensagem
    })
  }
}
