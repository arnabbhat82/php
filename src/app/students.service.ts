import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from './students';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  students: Students[];

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Students[]> {
    return this.http.get<Students[]>('http://www.chocomonks.com/list.php');
  }

  deleteStudent(sId: number) {
    return this.http.delete<Students[]>('http://www.chocomonks.com/delete.php?id=' + sId);
  }

  createStudent(student: Students[]) {
    return this.http.post('http://www.chocomonks.com/insert.php', student);
  }

}
