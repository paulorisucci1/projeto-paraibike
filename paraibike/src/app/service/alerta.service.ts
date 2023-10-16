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
}
