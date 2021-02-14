import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shape-commient',
  templateUrl: './shape-commient.component.html',
  styleUrls: ['./shape-commient.component.css']
})
export class ShapeCommientComponent implements OnInit {
  arrColor= ['#28c886','red','blue','#333','#1df'];
  constructor() { }

  ngOnInit(): void {
  }


  chooseRandom(){
    return this.arrColor[Math.floor(Math.random() * 5)];
  }

  genarteChar(name:string){
    return name.charAt(0).toUpperCase();
  }
}
