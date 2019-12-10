import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Students } from '../students';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  students: Students[];
  error: any;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe(
      (res: Students[]) => {
        this.students = res;
        console.log(this.students);
      },
      (err) => {
        this.error = err;
      }
    );
  }
  delete(students: Students): void {
    this.studentsService.deleteStudent(students.sId)
      .subscribe(data => {
        this.students = this.students.filter(u => u !== students);
      });
    console.log(students.sId);
  }

}
