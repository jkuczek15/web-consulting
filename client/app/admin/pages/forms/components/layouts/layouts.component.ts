import {Component} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'layouts',
  templateUrl: './layouts.html',
})
export class Layouts {

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:any = {
    // url: 'http://website.com/upload'
    url: '',
  };

  public fileUploaderOptions:any = {
    // url: 'http://website.com/upload'
    url: '',
  };
  
  constructor() {
  }

  ngOnInit() {
  }
}