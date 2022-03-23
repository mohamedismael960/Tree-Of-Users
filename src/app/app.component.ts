import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  nodes: any = [];
  data:any= [];
  users=[
    {
    "name": "ahmed",
    "code": "0001",
    "imagePath": "{replaceWithImagePath}"
    },
    {
    "name": "mohamed",
    "code": "0001.0003.0004.0002",
    "imagePath": "{replaceWithImagePath}"
    },
    {
    "name": "ali",
    "code": "0001.0003",
    "imagePath": "{replaceWithImagePath}"
    },
    {
    "name": "ibrahim",
    "code": "0001.0003.0004",
    "imagePath": "{replaceWithImagePath}"
    },
    {
    "name": "mahmoud",
    "code": "0001.0010.0005",
    "imagePath": "{replaceWithImagePath}"
    },{
    "name": "samy",
    "code": "0001.0010.0006",
    "imagePath": "{replaceWithImagePath}"
    },{
    "name": "hany",
    "code": "0001.0003.0004.0007",
    "imagePath": "{replaceWithImagePath}"
    },{
    "name": "samir",
    "code": "0001.0010.0005.0008",
    "imagePath": "{replaceWithImagePath}"
    },{
    "name": "khalid",
    "code": "0001.0010.0006.0009",
    "imagePath": "{replaceWithImagePath}"
    },{
    "name": "abdullah",
    "code": "0001.0010",
    "imagePath": "{replaceWithImagePath}"
    }
    ]
  final_nodes:any;

  constructor() { }

  ngOnInit(): void {
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
      this.getChildren(this.final_nodes,this.nodes[this.final_nodes.code].children );
      this.final_nodes = [this.final_nodes];
    console.log(this.final_nodes);
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
        }, 3000);
      }
    }
  }
}
