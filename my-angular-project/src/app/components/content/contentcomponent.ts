import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  jsonData: any = [];
  login: string = '';

  dataCreate: string = '';
  filterValue: string = '';
  sumOfSelectedUsers: number = 0;
  selectedUsers: any[] = [];
  nameFilterValue:string = "";
  emailFilterValue:string = "";
  telephoneFilterValue:string = "";
  [key: string]: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data: any) => {
      this.jsonData = data;
      interface UserData {
        user_id: number;
        is_admin: boolean;
        is_ecp: boolean;
        status: string;
        id?: number;
        email?: string;
        create_at?: number;
        name?: string;
        phone?: number;
        update_at?: number;
      }

      interface User {
        id: number;
        name: string;
        email: string;
        phone: number;
        create_at: number;
        update_at: number;
      }

      const updatedData: UserData[] = this.jsonData.data.map((userDatum: UserData) => {
        const userInfo: User | undefined = this.jsonData.users.find((user: User) => user.id === userDatum.user_id);
        if (userInfo) {
          
          
          return {
            ...userDatum,
            id: userInfo.id,
            email: userInfo.email,
            create_at: userInfo.create_at,
            name: userInfo.name,
            phone: userInfo.phone,
            update_at: userInfo.update_at,
          };
        }
        return userDatum;
      });

      this.jsonData = updatedData;
      console.log(this.jsonData);

    });
  }
  showForm: boolean = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  updateSelectedUsers(event: any, user: any) {
    if (event.target.checked) {
      // Checkbox is selected, increment the sum
      this.sumOfSelectedUsers++;
    } else {
      // Checkbox is unselected, decrement the sum
      this.sumOfSelectedUsers--;
    }
  }

  selectAllCheckbox(event: any) {
    const checkboxes = document.querySelectorAll('.example-full-width tbody input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    if (event.target.checked) {
      checkboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = true;
        this.sumOfSelectedUsers++;
      });
    } else {
      checkboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = false;
        this.sumOfSelectedUsers = 0;
      });
    }
  }
  clearInput(filter: string) {
    this[filter] = "";
  }
  
  getUserData(userId: number) {
    return this.jsonData.data.find((user: { id: number; }) => user.id === userId);
  }
}
