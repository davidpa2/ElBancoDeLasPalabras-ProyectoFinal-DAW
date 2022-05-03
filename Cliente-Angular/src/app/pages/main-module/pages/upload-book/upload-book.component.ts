import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.scss']
})
export class UploadBookComponent implements OnInit {

  submitted = false;
  idBook: any;
  stars: any;
  uploadBookForm!: FormGroup;
  bookImg!: string;
  user!: User;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.uploadBookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9,]+[^.]')]),
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.idBook = params['id'];
      }
    );
  }

  registerBook() {
    this.submitted = true;

    if (this.uploadBookForm.valid && this.stars) {
      this.bookService.uploadBook(this.uploadBookForm.value.title, this.uploadBookForm.value.author, this.uploadBookForm.value.description,
        this.stars, this.uploadBookForm.value.price, this.bookImg, this.user).subscribe(data => {
          if (data) {
            console.log(data);
          }
        })
    }
  }

  recuperarUsuarioLog() {
    this.user = JSON.parse(localStorage.getItem("authenticatedUser") || '{}')
    //console.log(localStorage.getItem("authenticatedUser"));
  }

  /**
* Método usado para convertir la imagen a 64bits
*/
  saveImage() {
    const inputImg: any = document.getElementById('inputImg');

    //El file reader sirve para leer un blob o un file
    const reader = new FileReader();
    //Leer la imagen del input y cargarla en un ArrayBuffer. Desemboca un evento loadend y su atributo result
    //contiene un ArrayBuffer con los datos del archivo
    reader.readAsArrayBuffer(inputImg.files[0]);
    //Tras cargar la imagen la convertimos a base64
    reader.onload = (e: any) => {
      //btoa() convierte a base 64 desde una cadena de datos binarios
      this.bookImg = btoa(
        // Uint8Array es un array tipado de datos binarios
        //reduce() Aplica una función a un acumulador y a cada valor de un array (de izquierda a derecha) lo reduce a un único valor.
        new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
    };
  }
}
