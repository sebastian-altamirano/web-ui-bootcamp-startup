import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'youtubeVideo',
})
export class YoutubeVideoPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(videoURL) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoURL}`
    );
  }
}
