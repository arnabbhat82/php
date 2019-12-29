import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Students } from '../students';
import { Router } from '@angular/router';
import { IAlert } from '../ialert';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  students: Students[] = [];
  studentAddedTocart: Students[];
  error: any;
  id: number;
  public alerts: Array<IAlert> = [];
  cartItemCount = 0;
  @Output() cartEvent = new EventEmitter<number>();

  constructor(private studentsService: StudentsService, private router: Router, private sharedService: SharedService) { }

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
  OnAddCart(students: Students) {
    // console.log(students);
    this.studentAddedTocart = this.studentsService.getStudentFromCart();
    // console.log(this.studentAddedTocart);
    if (this.studentAddedTocart == null) {
      this.studentAddedTocart = [];
      this.studentAddedTocart.push(students);
      // console.log(students);
      this.studentsService.addStudentToCart(this.studentAddedTocart);
      this.alerts.push({
        id: 1,
        type: 'success',
        message: 'Product added to cart.'
      });
      setTimeout(() => {
        this.closeAlert(this.alerts);
      }, 3000);
    } else {
      const tempStudent = this.studentAddedTocart.find(p => p.sId === students.sId);
      if (tempStudent == null) {
        this.studentAddedTocart.push(students);
        this.studentsService.addStudentToCart(this.studentAddedTocart);
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Product added to cart.'
        });
        // setTimeout(function(){ }, 2000);
        setTimeout(() => {
          this.closeAlert(this.alerts);
        }, 3000);
      } else {
        this.alerts.push({
          id: 2,
          type: 'warning',
          message: 'Product already exist in cart.'
        });
        setTimeout(() => {
          this.closeAlert(this.alerts);
        }, 3000);
      }
    }

    this.cartItemCount = this.studentAddedTocart.length;
    // console.log(this.cartItemCount);
    this.sharedService.updateCartCount(this.cartItemCount);
  }
  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  goToAdd() {
    this.router.navigate(['add']);
  }

}
