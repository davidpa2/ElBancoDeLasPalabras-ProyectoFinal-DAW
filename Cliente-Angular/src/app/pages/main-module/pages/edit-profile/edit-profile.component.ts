import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user!: User;
  editUserForm!: FormGroup;
  submitted = false;
  userImg!: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.recuperarUsuarioLog();

    this.initFormGroup(this.user);

    this.userService.cambiosEnUserAutenticado.subscribe(data => {
      console.log('Hay un cambio en el usuario autenticado', data);
      //this.user = this.userService.authenticatedUser;
      this.user = data;
      this.initFormGroup(data);
    });

    this.userImg = this.user.img;
  }

  get myForm() {
    return this.editUserForm.controls;
  }

  /**
   * Inicializar el furmulario con los valores que nos pasen
   * @param user 
   */
  initFormGroup(user: User) {
    this.editUserForm = new FormGroup({
      name: new FormControl(user.name, [Validators.required]),
      surnamos: new FormControl(user.surnames, [Validators.required]),
      tlf: new FormControl(user.tlf, [Validators.required, Validators.pattern('[0-9]{3} [0-9]{3} [0-9]{3}')]),
      //tlf: new FormControl(this.user.tlf, [Validators.required, Validators.pattern('([0-9]{3}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2})|([0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{2})')]),
      birthday: new FormControl(user.birthday, [Validators.required, Validators.pattern('[0-9]{2}\/[0-9]{2}\/[0-9]{4}')]),
      telegram: new FormControl(user.telegram, []),
      desc: new FormControl(user.description, [Validators.required]),
      email: new FormControl({ value: user.email, disabled: true }),
    })
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    //console.log(localStorage.getItem("authenticatedUser"));
  }

  /**
   * Guardar cambios del usuario
   */
  saveChanges() {
    console.log(this.user.id);
    this.submitted = true;

    if (this.editUserForm.valid) {
      this.userService.modifyUser(this.user.id, this.editUserForm.value.name, this.editUserForm.value.surnamos, this.editUserForm.value.desc,
        this.editUserForm.value.birthday, this.editUserForm.value.tlf, this.editUserForm.value.telegram, this.userImg).subscribe(data => {
          console.log(data);
          if (data['estado'] != "error") {
            console.log('Usuario modificado correctamente')
            this.userService.emitirNuevoCambioEnUsuarioAutenticado();
            this.router.navigate(['/profile'], { queryParams: { change: true } });
          }
        })
    } else {
      console.log('Inválido');

    }

  }

  /**
 * Método usado para convertir la imagen a 64bits
 */
  saveImage() {
    const inputImg: any = document.getElementById('fotoCocheInput');

    //El file reader sirve para leer un blob o un file
    const reader = new FileReader();
    //Leer la imagen del input y cargarla en un ArrayBuffer. Desemboca un evento loadend y su atributo result
    //contiene un ArrayBuffer con los datos del archivo
    reader.readAsArrayBuffer(inputImg.files[0]);
    //Tras cargar la imagen la convertimos a base64
    reader.onload = (e: any) => {
      //btoa() convierte a base 64 desde una cadena de datos binarios
      this.userImg = btoa(
        // Uint8Array es un array tipado de datos binarios
        //reduce() Aplica una función a un acumulador y a cada valor de un array (de izquierda a derecha) lo reduce a un único valor.
        new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      this.user.img = this.userImg;
    };
  }
}
