import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client, Lecturer, LecturerDTO } from '../../api/api-client';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lecturer-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:  './lecturer-component.component.html',
  styleUrls: ['./lecturer-component.component.css']
})

export class LecturerComponent implements OnInit {
  lecturers: Lecturer[] = [];
  newLecturer: LecturerDTO = new LecturerDTO();
  editMode: number | null = null; // מחזיק את ה-id של המרצה שנמצא בעריכה
  editLecturer: LecturerDTO = new LecturerDTO();

  constructor(private client: Client) {}

  ngOnInit(): void {
    this.getLecturers();
  }

  getLecturers(): void {
    this.client.lecturerAll().subscribe({
      next: (res: Lecturer[]) => {
        this.lecturers = res;
      },
      error: (err: HttpErrorResponse) => {
        alert('שגיאה בטעינת מרצים: ' + err.message);
      }
    });
  }

  addLecturer(): void {
    this.client.lecturerPOST(this.newLecturer).subscribe({
      next: () => {
        alert('🎉 המרצה נוסף בהצלחה!');
        this.newLecturer = new LecturerDTO();
        this.getLecturers();
      },
      error: (err: HttpErrorResponse) => {
        alert('שגיאה בהוספה: ' + err.message);
      }
    });
  }

  deleteLecturer(id: number): void {
    if (!confirm('האם למחוק את המרצה?')) return;

    this.client.lecturerDELETE(id).subscribe({
      next: () => {
        alert('🗑️ המרצה נמחק');
        this.getLecturers();
      },
      error: (err: HttpErrorResponse) => {
        alert('שגיאה במחיקה: ' + err.message);
      }
    });
  }

  startEdit(lecturer: Lecturer): void {
    this.editMode = lecturer.lecturerId!;
    this.editLecturer = new LecturerDTO();
    this.editLecturer.lecturerName = lecturer.lecturerName;  }

  cancelEdit(): void {
    this.editMode = null;
    this.editLecturer = new LecturerDTO();
  }

  saveEdit(id: number): void {
    this.client.lecturerPUT(id, this.editLecturer).subscribe({
      next: () => {
        alert('✅ המרצה עודכן');
        this.cancelEdit();
        this.getLecturers();
      },
      error: (err: HttpErrorResponse) => {
        alert('שגיאה בעדכון: ' + err.message);
      }
    });
  }
}
