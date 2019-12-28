import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { Students } from '../students';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  students: Students[] = [];
  proIndex = -1;
  id: number;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentsService,
    private router: Router,
    private routes: ActivatedRoute
  ) { }

  ngOnInit() {
    const routeParams = this.routes.snapshot.params;
    this.studentService.gettById(routeParams.id)
      .subscribe((data: any) => {
        console.log(data);
        this.addForm.patchValue(data);
      });
    this.addForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.maxLength(30)]],
      price: ['', Validators.required],
      sId: [''],
    });
  }

  // getStd(): void {
  //   this.studentService.getStudent(this.id)
  //     .subscribe(student => {
  //       this.addForm.setValue({
  //         fName: student.fName,
  //         lName: student.lName,
  //         email: student.email,
  //         price: student.price,
  //         sId: student.sId
  //       });
  //       console.log(student);
  //     });
  // }

  onSubmit() {
    this.studentService.editStudent(this.addForm.value).subscribe(() => {
      this.router.navigate(['view']);
    },
      error => {
        alert(error);
      }
    );
    console.log(this.addForm.value);
  }
  update() {
    // console.log(this.addForm.value);
    this.studentService.updateStudent(this.addForm.value).subscribe(() => {
      this.router.navigate(['view']);
    });
  }

  goToView() {
    this.router.navigate(['view']);
  }

}
