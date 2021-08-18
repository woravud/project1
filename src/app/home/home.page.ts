import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../pages/cart-modal/cart-modal.page';
import { CartService } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart',{static: false, read: ElementRef})fab: ElementRef;

  constructor(private cartServce: CartService, private modalCtrl: ModalController,public alertCtrl: AlertController) {}
  
  ngOnInit() {
    this.products = this.cartServce.getProducts();
    this.cart = this.cartServce.getCart();
    this.cartItemCount = this.cartServce.getCartItemCount();
  }

  addToCart(product) {
   
    this.cartServce.addProduct(product);
  }

  async openCart() {
   

     let modal = await this.modalCtrl.create({
       component: CartModalPage,
       cssClass: 'cart-modal'
     });
   

     modal.present(); 
  }
  async showConfirm() {
    const confirm = await this.alertCtrl.create({
      header : 'ต้องการจะดำเนินการต่อหรือไม่',
      message: 'ต้องการจะดำเนินการต่อหรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ดำเนินการ',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}

 


