import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  
  users: User[] = [
   
  ];
  
  noUsersFound: boolean = false;
  filters = {
    keyword: '' ,
    sortBy:'Name'
  }


  constructor(private _userService: UserService){ }
  ngOnInit(): void {
    this.ListUsers();

  }
  deleteUser(id:number){
    this._userService.deleteUser(id).subscribe(
      data => {
        console.log('deleted response',data);
        this.ListUsers();
      }
    )
  }
  
  ListUsers(){
    this._userService.getUsers().subscribe(
      data => {this.users = this.filterUsers(data);
        this.users.forEach(user => user.showDetails = false);
        this.noUsersFound = this.users.length === 0;}

        
    )
  }

  filterUsers(users: User[]){
    return users.filter((e)=>{
      
      return e.firstName ?.toLowerCase().includes(this.filters.keyword.toLowerCase());
    }).sort((a,b) => {
      if (this.filters.sortBy === 'Name') {
        return a.firstName.toLowerCase()<b.firstName.toLowerCase() ? -1 :1 ;
        
      } else if (this.filters.sortBy === 'Age'){
        
        return a.age<b.age ? -1:1;
        
      }
      return 0;
    })  
  }
  showUserDetails(user: User) {
    this.users.forEach(u => u.showDetails = false); // Hide details of other users
    user.showDetails = !user.showDetails;
  }
  toggleUserDetails(user: User) {
    user.showDetails = !user.showDetails;
  }

}
