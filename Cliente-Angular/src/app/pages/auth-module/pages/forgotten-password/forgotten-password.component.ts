import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendMailService } from 'src/app/services/send-mail.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/interfaces';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  recoveryForm!: FormGroup;
  codeForm!: FormGroup;
  recoveryPassForm!: FormGroup;
  submitted = false;
  submitted2 = false;
  submitted3 = false;
  existsMail = true;
  user!: User;
  sended = false;
  codeMode = false;
  recoveryMode = false;
  recoveryKey = null;
  correctCode = true;
  showPass = false;
  notEqualsPass = false;

  constructor(private userService: UserService, private mailService: SendMailService, private router: Router) { }

  ngOnInit(): void {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')])
    })
    this.codeForm = new FormGroup({
      key: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    })
    this.recoveryPassForm = new FormGroup({
      pass: new FormControl('', [Validators.required]),
      pass2: new FormControl('', [Validators.required])
    })
  }

  /**
   * Obtener el código de verificación del usuario que lo está pidiendo
   */
  passRecoveryMail() {
    this.existsMail = true;
    this.submitted = true;

    if (this.recoveryForm.valid) {
      //Primero hay que asegurarse de que existe un usuario con el mail que se está pidiendo
      this.userService.getUserByMail(this.recoveryForm.value.email).subscribe(data => {
        if (data['user']) {
          this.user = data['user'];
          this.sended = true;
          this.mailService.passRecoveryMail(this.recoveryForm.value.email, data['user'].id).subscribe(data2 => {
            this.recoveryKey = data2['key'];
          })
        } else {
          this.existsMail = false;
        }
      })
    }
  }

  /**
   * Comprobar que el código de recuperación coincide con el del usuario
   */
  checkKey() {
    this.submitted2 = true;
    if (this.codeForm.valid) {
      if (this.codeForm.value.key == this.recoveryKey) {
        this.recoveryMode = true;
      } else {
        this.correctCode = false;
      }
    }
  }

  /**
   * Método que se encarda de actualizar la contraseña una vez se ha verificado identidad
   */
  newPassword() {
    this.submitted3 = true;
    this.notEqualsPass = false;

    if (this.recoveryPassForm.valid) {
      if (this.recoveryPassForm.value.pass == this.recoveryPassForm.value.pass2) {
        this.userService.updatePassword(this.user.id, Md5.hashStr(this.recoveryPassForm.value.pass)).subscribe(data => {
          if (data['estado'] == 'correcto') {
            this.router.navigate(['/auth/login'], { queryParams: { newPass: true } });
          }
        })
      } else {
        this.notEqualsPass = true;
      }
    }
  }

  get myForm() {
    return this.recoveryForm.controls;
  }
  get myForm2() {
    return this.codeForm.controls;
  }
  get myForm3() {
    return this.recoveryPassForm.controls;
  }

  codeModeTrue() {
    this.codeMode = true;
  }

  codeModeFalse() {
    this.codeMode = false;
    this.sended = false;
  }
}