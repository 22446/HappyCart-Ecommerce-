import { Component, inject } from '@angular/core';
import { OrdersService } from '../../Core/services/orders.service';
import { jwtDecode } from 'jwt-decode';
import { IAllOrdersUser } from '../../Core/Interfaces/iall-orders-user';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {
 private _OrdersService = inject(OrdersService)
 AllUserData:IAllOrdersUser[]= []
 DecodedUserData!:any

 UserData():void{
  if(localStorage.getItem("userToken")!==null){
    this.DecodedUserData= jwtDecode(localStorage.getItem("userToken")!)
    
    console.log("user",this.DecodedUserData.id)
  }
}

 ngOnInit(): void {
  this.UserData()
  this._OrdersService.getAllUserOrders(this.DecodedUserData.id).subscribe({
    next:(res)=>{
      this.AllUserData=res
      console.log(this.AllUserData)
    }
  })
  
 }
}
