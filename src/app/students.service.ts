import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from './students';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  students: Students[];

  constructor(private http: HttpClient) { }
  private productApiEndPoint =
    'http://www.chocomonks.com/edit_student.php';
  private insertedData = new Subject<Students>();
  currentInsertedData = this.insertedData.asObservable();

  getStudents(): Observable<Students[]> {
    return this.http.get<Students[]>('http://www.chocomonks.com/list.php');
  }

  gettById(sId: number) {
    return this.http.get<Students[]>('http://www.chocomonks.com/getById.php?id=' + sId);
  }

  deleteStudent(sId: number) {
    return this.http.delete<void>('http://www.chocomonks.com/delete.php?id=' + sId);
  }

  createStudent(student: Students) {
    // console.log(student);
    return this.http.post<Students>('http://www.chocomonks.com/insert.php', student);
  }

  changeInsertedData(dataRow: Students) {
    this.insertedData.next(dataRow);
  }

  updateStudent(student: Students) {
    return this.http.put('http://www.chocomonks.com/edit_student.php' + '?id=' + student.sId, student);
  }
  getStudentFromCart() {
    return JSON.parse(localStorage.getItem('student'));
  }
  addStudentToCart(students: any) {
    localStorage.setItem('student', JSON.stringify(students));
  }
  removeAllStudentFromCart() {
    return localStorage.removeItem('student');
  }

  editStudent(modifiedStudent: Students) {
    const { sId, ...studentRest } = modifiedStudent;
    // return this.http.patch(
    //   `${this.productApiEndPoint}?id=${sId}`,
    //   studentRest
    // ) as Observable<{ message: string }>;
    return this.http.patch('http://www.chocomonks.com/edit_student.php?id=' + sId, studentRest);

  }


}
