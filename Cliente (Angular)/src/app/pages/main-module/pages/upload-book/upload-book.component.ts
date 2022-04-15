import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.scss']
})
export class UploadBookComponent implements OnInit {

  idBook: any;
  stars: any;

  constructor(private route: ActivatedRoute) { }



  ngOnInit(): void {
    //this.idBook = this.route.snapshot.params.id;
    this.route.params.subscribe(
      (params: Params) => {
        this.idBook = params['id'];
      }
    );
  }
}
