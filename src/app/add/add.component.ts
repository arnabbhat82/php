import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { Students } from '../students';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  students: Students[] = [];

  constructor(private formBuilder: FormBuilder, private studentService: StudentsService) { }
  addForm: FormGroup;
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  onSubmit() {
    this.studentService.createStudent(this.addForm.value)
      .subscribe(data => this.students.push(data));

  }

}
