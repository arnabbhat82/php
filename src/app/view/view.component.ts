import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Students } from '../students';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  students: Students[] = [];
  error: any;
  id: number;

  constructor(private studentsService: StudentsService, private router: Router) { }

  ngOnInit() {
    this.getStudents();
    this.getInsertedData();
  }
  getInsertedData(): void {
    this.studentsService.currentInsertedData.subscribe(data => this.students.push(data));
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
  editStudent(students: Students) {
    this.id = students.sId;
    console.log(students.sId);
    // , { queryParams: { id: students.sId } }
    this.router.navigate(['edit/' + this.id]);
  }

  goToAdd() {
    this.router.navigate(['add']);
  }

}
