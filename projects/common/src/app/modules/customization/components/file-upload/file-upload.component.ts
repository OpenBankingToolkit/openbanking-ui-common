import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { UploadEvent, FileSystemFileEntry } from 'ngx-file-drop';

import { ForgerockMessagesService } from 'forgerock/src/app/services/forgerock-messages/forgerock-messages.service';

export interface FileUploadChangeObject {
  file: string;
  mime: string;
}

@Component({
  selector: 'forgerock-customization-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {
  @Output() change = new EventEmitter<FileUploadChangeObject>();

  constructor(private message: ForgerockMessagesService) {}

  ngOnInit() {}

  private isValidImageType(type: string) {
    return type === 'image/svg+xml';
  }

  private loadImageFile(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = (event: any) => {
      const imageType = file.type;
      if (this.isValidImageType(imageType)) {
        this.loadImage(event.target.result, imageType);
      } else {
        this.message.error('Filetype error: Only SVG is allowed');
      }
    };
    fileReader.readAsBinaryString(file);
  }

  private loadImage(file: string, mime: string) {
    this.change.emit({
      file,
      mime
    });
  }

  public dropped(event: UploadEvent) {
    const droppedFile = event.files[0];
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => this.loadImageFile(file));
    }
  }
}
