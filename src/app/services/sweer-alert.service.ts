import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweerAlertService {
  constructor() { }
  alert_error(message: string = 'error'): void {
    Swal.mixin({}).fire({
      position: 'center',
      icon: 'error',
      title: message,
      text: status,
      showConfirmButton: false,
      timer: 2000,
      allowOutsideClick: false
      // footer: '<a href="">Why do I have this issue?</a>'
    });
  }

  alert_success(title: string = 'success'): void {
    Swal.mixin({}).fire({
      position: 'center',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000,
      allowOutsideClick: false
    });
  }

  alert_comfirm(
    title: string = 'Are you sure?',
    confirmTxt: string = 'บันทึก',
    text: string = '',
  ): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#325B8F',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmTxt,
      cancelButtonText: 'ยกเลิก',
      allowOutsideClick: false
    });
  }

  alert_warning(title: string): Promise<any> {
    return Swal.fire({
      title: title,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      icon: 'warning',
      allowOutsideClick: false,
      confirmButtonColor: '#325B8F',
      confirmButtonText: 'เข้าใจแล้ว',
    });
  }

  async alert_forgotPassword(): Promise<any> {
    const { value: email } = await Swal.fire({
      title: 'การกู้คืนบัญชี',
      input: 'email',
      inputLabel: 'อีเมลของคุณ',
      inputPlaceholder: 'กรอกที่อยู่อีเมลของคุณที่นี้',
      validationMessage: 'โปรดกรอกอีเมลของคุณ',
      confirmButtonColor: '#325B8F',
      // allowOutsideClick: false,
    });

    if (email) {
      return email;
      //  Swal.fire(`Entered email: ${email}`);
    }
  }
}
