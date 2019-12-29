import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemCount: any;

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
  }
  goToCart() {
    this.router.navigate(['cart']);
  }

}
