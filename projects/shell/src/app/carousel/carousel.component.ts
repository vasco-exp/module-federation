import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  public slideIndex: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.slideIndex = 1;
    this.showSlides(1);
  }

  // Next/previous controls
  public plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  // Thumbnail image controls
  public currentSlide(n: number) {
    this.showSlides((this.slideIndex = n));
  }

  public showSlides(n: number) {
    var i;
    var slides = document.getElementsByClassName('mySlides');
    var dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      (slides[i] as any).style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    (slides[this.slideIndex - 1] as any).style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }
}
