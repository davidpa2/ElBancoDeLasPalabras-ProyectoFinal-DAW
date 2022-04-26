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

    this.userImg = this.user.img;

    this.editUserForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      surnamos: new FormControl(this.user.surnames, [Validators.required]),
      //tlf: new FormControl('', [Validators.required, Validators.pattern('(\d{3}\s\d{2}\s\d{2}\s\d{2})|(\d{3}\s\d{3}\s\d{3}\s\d{2})')]),
      tlf: new FormControl(this.user.tlf, [Validators.required]),
      //birthday: new FormControl('', [Validators.required, Validators.pattern('\d{2}/\d{2}/\d{4}')]),
      birthday: new FormControl(this.user.birthday, [Validators.required]),
      telegram: new FormControl(this.user.telegram, []),
      desc: new FormControl(this.user.description, [Validators.required]),
      email: new FormControl({ value: this.user.email, disabled: true }, [Validators.required]),
    })
  }

  get myForm() {
    return this.editUserForm.controls;
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

    if (this.editUserForm.valid) {
      this.userService.modifyUser(this.user.id, this.editUserForm.value.name, this.editUserForm.value.surnamos, this.editUserForm.value.desc,
        this.editUserForm.value.tlf, this.editUserForm.value.birthday, this.editUserForm.value.telegram, this.userImg).subscribe(data => {
          console.log(data);
          if (data['estado'] != "error") {
            console.log('Usuario modificado correctamente')
            this.userService.emitirNuevoCambioEnUsuarioAutenticado();
            this.router.navigate(['/profile']);
          }
        })
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
