import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import getRandomValues from "get-random-values";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {
  }
  
  ngOnInit(): void {
    this.data = getNotes();
  }
  
  data: NotesData;
  newNoteId = uuidv4();
}

export class Note {
  id: string;
  content: string;
}

// from https://stackoverflow.com/a/2117523/3171100
function uuidv4(): string {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  })
}

export type NotesData = {
  notes: Note[]
}

export function getNotes(): NotesData {
  try {
    return JSON.parse(localStorage["yellownotes"]);
  } catch (e) {
    localStorage["yellownotes"] = JSON.stringify({notes: []});
    return getNotes();
  }
}

export function setNotes(notesData: NotesData) {
  localStorage["yellownotes"] = JSON.stringify(notesData);
}
