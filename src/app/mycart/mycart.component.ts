import { Component, OnInit } from '@angular/core';
import { IAlert } from '../ialert';
import { StudentsService } from '../students.service';
import { Students } from '../students';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  dafualtQuantity = 1;
  studentAddedTocart: Students[];
  allTotal: number;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentAddedTocart = this.studentsService.getStudentFromCart();
    // tslint:disable-next-line: forin
    for (const i in this.studentAddedTocart) {
      this.studentAddedTocart[i].quantity = 1;
    }
    this.studentsService.removeAllStudentFromCart();
    this.studentsService.addStudentToCart(this.studentAddedTocart);
    this.calculteAllTotal(this.studentAddedTocart);
  }
  onAddQuantity(student: Students) {
    this.studentAddedTocart = this.studentsService.getStudentFromCart();
    this.studentAddedTocart.find(p => p.sId === student.sId).quantity = student.quantity + 1;
    this.studentsService.removeAllStudentFromCart();
    this.studentsService.addStudentToCart(this.studentAddedTocart);
    this.calculteAllTotal(this.studentAddedTocart);
  }

  onRemoveQuantity(student: Students) {
    this.studentAddedTocart = this.studentsService.getStudentFromCart();
    this.studentAddedTocart.find(p => p.sId === student.sId).quantity = student.quantity - 1;
    this.studentsService.removeAllStudentFromCart();
    this.studentsService.addStudentToCart(this.studentAddedTocart);
    this.calculteAllTotal(this.studentAddedTocart);
  }

  calculteAllTotal(allItems: Students[]) {
    let total = 0;
    // tslint:disable-next-line: forin
    for (const j in allItems) {
      total = total + (allItems[j].quantity * allItems[j].price);
    }
    this.allTotal = total;
  }

}
