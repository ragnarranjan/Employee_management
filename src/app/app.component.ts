import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';
import { AddEditComponentComponent } from './add-edit-component/add-edit-component.component';

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  fruit: string;
  date_of_birth: Date; // Explicitly set as Date type
  gender: 'Male' | 'Female' | 'Others'; // Restrict values to predefined options
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'date_of_birth',
    'gender',
  ];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private getemps: EmployeeService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<UserData>([]);
    this.getallemployeedata();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getallemployeedata() {
    this.getemps.getEmployees().subscribe(
      (res: UserData[]) => {
        this.dataSource.data = res;
        setTimeout(() => {
          if (this.paginator) this.dataSource.paginator = this.paginator;
          if (this.sort) this.dataSource.sort = this.sort;
        });
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openAddEditForm() {
    this._dialog.open(AddEditComponentComponent);
  }
}
