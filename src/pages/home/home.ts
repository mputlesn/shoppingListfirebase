import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AddListPage} from '../add-list/add-list';
import { createElement } from '@angular/core/src/view/element';
//import * as firebase from 'firebase/app'

declare var firebase;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
   itemList : any = [];
   //itemList = new Array() ;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    //firebase.database().ref('shoppingList/').on('value',this.getdata())
  
    firebase.database().ref('shoppingList/').on('value',(data)=>{
       
    //var itemList = [];
    var items = data.val();
    console.log(items);
    
    var keys = Object.keys(items);
    console.log(keys);

    for(var i = 0; i < keys.length; i++){
      var k = keys[i];
      console.log(keys[i]);
      
      var item = items[k].item;
      console.log(item);
      let obj = {
        key: k,
        item: item
      }

      this.itemList.push(obj);

      console.log(obj);
      console.log(this.itemList);
      
      // // create a new ion-item node element 
      // var li = document.createElement('ion-item');
      // // returns a duplicate of the node on which this method was called.
      // var clone = li.cloneNode();
      // //text/content
      // clone.textContent =  'key:'+ k +'  item:'+ item ;
      // //append the items in the html page
      // document.getElementById('shopList').appendChild(clone);
  
    }
    })
  }


  nextPage(){ 
    const prompt = this.alertCtrl.create({


      title: 'Add Shopping List Item',
      message: "add item",
      inputs: [
        {
          name: 'item',
          placeholder: 'Item'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.itemList = [];
            firebase.database().ref('shoppingList/').push({
              item: data.item
            });
            firebase.database().ref('shopping/').push({
              item: data.item
            });
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  alert(i){
    const prompt = this.alertCtrl.create({
      title: 'Edit ',
      message: "add item",
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            this.itemList = [];
            alert(i);
            return firebase.database().ref('shoppingList/').child(i).remove();
          }
        },
        {
          text: 'Update',
          handler: data => {

            const prompt = this.alertCtrl.create({


              title: 'Update Item',
              inputs: [
                {
                  name: 'updateItem',
                  placeholder: 'Item'
                },
              ],
              buttons: [
                {
                  text: 'Update',
                  handler: data => {
                    this.itemList = [];
                    var updates = {
                      item: data.updateItem
                    }
                    return firebase.database().ref('shoppingList/').child(i).update(updates)
                  }
                }
              ]
            });
            prompt.present();
          }
        }
      ]
    });
    prompt.present();
  }

}
