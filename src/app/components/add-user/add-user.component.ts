import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {

  
  phoneNumberInvalid = false;

  newUser = {
    gender: 'man' 
  };

  
  user: User = new User();
  submitted = false;
  
  constructor(private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute){ 

  }
/*pour récupérer les détails de l'utilisateur avec l'ID spécifié*/
  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent){
      const id = this._activatedRoute.snapshot.paramMap.get('id');
      if (id !== null) {
        const idNumber = +id;
      this._userService.getUser(idNumber).subscribe(
        data => this.user = data
      )

      }
  }  
  }

  saveUser(){

    this.submitted =true;
    /* not vide */

    if(!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.occupation || !this.user.phoneNumber ){
      
      console.log('Please fill in all mandatory fields');
    return;
    }
    
/* number =8*/
    if (this.user.phoneNumber && this.user.phoneNumber.toString().replace(/-/g, '').length !== 8) {
      this.phoneNumberInvalid = true;
      return;
    }

    
    
    this._userService.saveUser(this.user).subscribe(
      data => {

        console.log('response',data);
        this._router.navigateByUrl("/users");
      }
    )
  }

  deleteUser(id: number){
    this._userService.deleteUser(id).subscribe(
      data => {
        console.log('deleted response',data);
        this._router.navigateByUrl('/users');
      }
    )
  }

  cancel() {
    this._router.navigateByUrl('/users'); 
  }
  
 
  
}
