import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { Students } from '../students';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  students: Students[] = [];
  proIndex = -1;
  id: number;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (!this.id) {
      this.proIndex = this.id;
    }
    this.addForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.maxLength(30)]],
      price: ['', Validators.required],
    });
  }

  private getFormControl(controlName: string) {
    return this.addForm.controls[controlName];
  }

  get fName() {
    return this.getFormControl('fName');
  }
  get lName() {
    return this.getFormControl('lName');
  }
  get email() {
    return this.getFormControl('email');
  }
  get price() {
    return this.getFormControl('price');
  }
  get sId() {
    return this.getFormControl('sId');
  }
  onSubmit() {

    this.studentService.createStudent(this.addForm.value)
      // .subscribe(data => console.log(data.fName));
      // this.studentService.createStudent(this.addForm.value)
      .subscribe(data => this.studentService.changeInsertedData(data));
    //   .subscribe(data => console.log(data.fName));
    this.router.navigate(['view']);


  }

  goToView() {
    this.router.navigate(['view']);
  }

}
