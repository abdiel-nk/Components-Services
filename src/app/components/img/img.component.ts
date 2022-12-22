import { OnInit, Component, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
img: string = '';
@Input('img')
set changeImg(newImg: string){
  this.img = newImg;
  console.log('change just img =>' ,this.img);

}


@Input() alt: string= '';
@Output() loaded = new EventEmitter<string>();
imageDefault = './assets/default.jpg';
// counter = 0;
// counterFn: number | undefined;

constructor (){
  //bofere render
  //No Async
  console.log("constructor",'imgValue =>', this.img);
}
ngOnChanges(changes: SimpleChanges){
//before -during render
//changes inputs
console.log("ngOnchanges",'imgValue =>', this.img);
console.log('changes',changes);
}
//contador
ngOnInit(): void {
  //before render
  //Async - fetch - API - once time
  console.log('ngOnInit','imgValue =>', this.img);
  // this.counterFn= window.setInterval(()=>{
  //   this.counter += 1;
  //   console.log('run counter');
  // }, 1000);
  }

ngAfterViewInit() {
  //After render
  //Handler children
  console.log("ngAfterview",'imgValue =>', this.img);
}
//eliminar proceso o evento
ngOnDestroy() {
  // delete -- once time
  console.log("ngOnDestroy");
  // window.clearInterval(this.counterFn);
}


// cargar imagen
imgError(){
 this.img = this.imageDefault;
}
ImgLoad(){
  console.log('log hijo');
  this.loaded.emit(this.img);

}
}
