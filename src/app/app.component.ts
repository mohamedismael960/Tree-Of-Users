import { Component, OnInit } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
  state
} from "@angular/animations";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger("myTrigger", [
      state(
        "fadeInFlash",
        style({
          opacity: "1"
        })
      ),
      transition("void => *", [
        style({ opacity: "0", transform: "translateY(20px)" }),
        animate("500ms")
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  nodes: any = [];
  data:any= [];
  users:any = [];
  final_nodes:any = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('../assets/users.json').subscribe((data:any)=>{
      this.users = data;
      this.makeStructrue();
    })
  }
  makeStructrue(){
    this.nodes[this.users[0].code]={ children : []}
    this.final_nodes = {
      code: this.users[0].code,
      name:this.users[0].name,
      imagePath:this.users[0].imagePath,
      children : []
    }    
      for(let index = 1; index < this.users.length; index++) {
        let codes = this.users[index].code.split('.');
        for (let i = 1; i < codes.length; i++) {
          if(i== codes.length -1){
            this.data[codes[i]]={name:this.users[index].name, imagePath:this.users[index].imagePath}          
          }
          !this.nodes[codes[i-1]] ? this.nodes[codes[i-1]] = {children : []} : null;
          !this.nodes[codes[i-1]].children.includes(codes[i]) ? this.nodes[codes[i-1]].children.push(codes[i]) : null
        }
      }
      this.final_nodes = [this.final_nodes];
      console.log(this.final_nodes);
      
    setTimeout(() => {
       this.getChildren(this.final_nodes[0],this.nodes[this.final_nodes[0].code].children );
    }, 2000);
  }
  getChildren(node: any, children: []){
    for (let index = 0; index < children.length; index++) {
      node.children[index]={
        code: children[index],
        children: [],
        name: this.data[children[index]].name,
        imagePath: this.data[children[index]].imagePath,
      }
      
      if(this.nodes[children[index]]) {
        setTimeout(() => {
          this.getChildren(node.children[index],this.nodes[children[index]].children )
        }, 2000);
      }
    }
  }
}
