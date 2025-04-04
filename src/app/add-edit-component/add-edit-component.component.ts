import {Component, Inject, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { EmployeeService } from '../services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-add-edit-component',
  templateUrl: './add-edit-component.component.html',
  styleUrls: ['./add-edit-component.component.scss']
})
export class AddEditComponentComponent implements OnInit {

  empform :FormGroup;

  constructor(private _fb: FormBuilder, private dialogRef:DialogRef<AddEditComponentComponent>,
          private empservice : EmployeeService,@Inject (MAT_DIALOG_DATA) public data:any)
          {
            this.empform = this._fb.group({
                first_name: ['', Validators.required],
                last_name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                date_of_birth: ['', Validators.required],
                gender: ['', Validators.required]
            });
  }
  ngOnInit(): void {
    this.empform.patchValue(this.data);
  }


  OnformSubmit() {
    if (this.empform.valid) 
      {
      let empformdata = this.empform.value;
      this.empservice.addemployee(empformdata).subscribe({
        next:(res) =>{
          console.log("---->>>",res)
        },
        error:(err) =>{
          console.log("errrrrr",err)
        }
      }
      )
      this.dialogRef.close()
      window.location.reload();
      
    } else {
      this.empform.markAllAsTouched(); // Highlight all errors
    }
  }


  cancel(){
      this.dialogRef.close(); // Simply close the dialog
    }
  }
