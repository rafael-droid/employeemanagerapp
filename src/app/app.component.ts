import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "./employee.service";
import {UserService} from "./user.service";
import {NgForm} from "@angular/forms";
import {User} from "./User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] | undefined;
  public users: User[] | undefined;
  public editEmployee: Employee | null | undefined;
  public deleteEmployee: Employee | null | undefined  ;


  constructor(private employeeService: EmployeeService, private userService: UserService) {}

  ngOnInit() {
    this.getEmployees();
    this.getUsers();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
  public getUsers(): void{
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
  public onAddEmployee(addForm: NgForm): void{
    // @ts-ignore
    document.getElementById('add-employee-form').click();
  this.employeeService.addEmployees(addForm.value).subscribe(
    (response: Employee) =>{
      console.log(response);
      this.getEmployees();
    },
    (error:HttpErrorResponse) => {
      alert(error.message);
    }
  )
  }

  public onUpdateEmployee(employee: Employee): void{
    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee) =>{
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteEmloyee(employeeId: number): void{
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) =>{
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public onOpenModal(employee: Employee|null, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();

  }
}
