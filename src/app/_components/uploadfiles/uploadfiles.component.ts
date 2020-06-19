import { Component, OnInit } from '@angular/core';
import { UploadfileserviceService } from 'src/app/_services/uploadfileservice.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress: number = 0;
  message: string = '';

  filesInfos: Observable<any>;

  constructor(private uploadFileService: UploadfileserviceService) { }

  ngOnInit() {
    this.filesInfos = this.uploadFileService.getFiles();//Here we get all files details, when the page is loaded.
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);

    this.uploadFileService.upload(this.currentFile).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);//The progress will be calculated basing on event.loaded and event.total.
      }
      else if (event instanceof HttpResponse) {
        this.message = event.body.message;

        this.filesInfos = this.uploadFileService.getFiles();//If the transmission is done, the event will be a HttpResponse object. At this time, we call uploadService.getFiles() to get the files information and assign the result to "filesInfos" variable.
      }
    },
      error => {
        this.progress = 0;
        this.message = 'Could not upload the file: ' + this.currentFile.name + '!  [File is too large!]';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

}

// We use selectedFiles for accessing current File as the first Item. Then we call uploadService.upload() method on the currentFile.

// The progress will be calculated basing on event.loaded and event.total.

// If the transmission is done, the event will be a HttpResponse object. At this time, we call uploadService.getFiles() to get the files’ information and assign the result to fileInfos variable.
