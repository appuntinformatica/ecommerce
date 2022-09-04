import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  sub!: Subscription;

  fileName = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onFileSelected(event: any) {
    console.log(event);
    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("file", file);

        this.sub = this.http.post(`${environment.serverUrl}/api/upload/uploadFile`, formData)
            .subscribe((data) => {
              console.log(data);
            });

    }
  }
}
