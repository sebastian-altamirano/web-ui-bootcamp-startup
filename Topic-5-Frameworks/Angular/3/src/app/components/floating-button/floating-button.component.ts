import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "floating-button",
  templateUrl: "./floating-button.component.html",
  styleUrls: ["./floating-button.component.scss"]
})
export class FloatingButtonComponent implements OnInit {
  @Input() icon: string;

  constructor() {}

  ngOnInit() {}
}
