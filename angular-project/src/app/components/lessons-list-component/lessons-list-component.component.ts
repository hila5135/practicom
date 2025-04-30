import { Component, NgModule, OnInit } from '@angular/core';
import { Client, Lesson } from '../../api/api-client';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-lessons-list-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lessons-list-component.component.html',
  styleUrl: './lessons-list-component.component.css'
})
export class LessonsListComponentComponent implements OnInit {
  lessonPOST: Lesson = new Lesson();
  selectedFile: File | null = null;
  filesList: string[] = [];
  downloadingFileName: string | null = null;
  isUploading = false;
  uploadingMessage = '';
  constructor(private client: Client) {}
  ngOnInit(): void {
    this.getFiles();
  }
  createFileParameter(file: File): any {
    return {
      data: file,
      fileName: file.name,
      contentType: file.type
    };
  }
  uploadFile() {
    if (this.selectedFile) {
      const fileParam = this.createFileParameter(this.selectedFile);
      this.isUploading = true;
      this.uploadingMessage = '⏳ מעלה קובץ...';
      this.client.upload(fileParam).subscribe({
        next: () => {
          this.isUploading = false;
          this.uploadingMessage = '';
          alert('✅ הקובץ הועלה בהצלחה!');
        },
        error: (err: HttpErrorResponse) => {
          this.isUploading = false;
          this.uploadingMessage = '';
          alert('שגיאה בהעלאה: ' + err.message);
        }
      });
    }
    this.showUploadControls = false;
  }

  downloadFile(fileName: string) {
    this.downloadingFileName = fileName;
    this.client.download(fileName).subscribe({
      next: (blob: Blob) => {
        this.downloadingFileName = null;
  
        if (!blob || !(blob instanceof Blob)) {
          alert('הורדה נכשלה: לא התקבל קובץ תקני');
          return;
        }
  
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName || 'downloaded.mp3';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (err: HttpErrorResponse) => {
        this.downloadingFileName = null;
        alert('שגיאה בהורדה: ' + err.message);
      }
    });
  }
  
  getFiles() {
    this.client.files().subscribe({
      next: (files: string[]) => {
        this.filesList = files;
      },
      error: (err: HttpErrorResponse) => alert('שגיאה בטעינת קבצים: ' + err.message)
    });
  }
  showLessonForm = false;

toggleLessonForm() {
  this.showLessonForm = !this.showLessonForm;
}

  deleteFile(fileName: string) {
    this.client.delete(fileName).subscribe({
      next: () => {
        alert('הקובץ נמחק');
        this.getFiles();
      },
      error: (err: HttpErrorResponse) => alert('שגיאה במחיקה: ' + err.message)
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  showUploadControls = false;

toggleUploadControls() {
  this.showUploadControls = !this.showUploadControls;
}

  addLesson() {
    this.client.lessonPOST(this.lessonPOST).subscribe({
      next: (result: Lesson[]) => {
        alert('🎉 השיעור נוסף בהצלחה!');
        this.lessonPOST = Object.assign(new Lesson(), {
          lessonName: '',
          lessonTitle: '',
          lessonDuration: '',
          lessonReleaseDate: new Date().toISOString(),
          lessonUrl: '',
          lessonLecturerId: 0
        });
        this.showLessonForm = false;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          alert('⛔️ אתה לא רשום במערכת!');
        } else {
          alert('שגיאה בהוספה: ' + err.message);
        }
      }
    });
  }
}
