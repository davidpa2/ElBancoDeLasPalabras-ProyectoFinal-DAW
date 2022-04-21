import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  center = {lat: 24, lng: 12};
  zoom = 15;
  display?: google.maps.LatLngLiteral;

  constructor() { }

  ngOnInit(): void {
  }
}