import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {getNotes, Note, NotesData, setNotes} from "../home/home.component";

@Component({
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.data = getNotes();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id == null) throw new Error("id is null");
      this.id = id;
      
      for (const note of this.data.notes) {
        if (note.id == id) {
          this.noteContent = note.content;
        }
      }
    });
    
    this.textarea.nativeElement.focus();
  }
  
  id: string;
  data: NotesData;
  
  noteContent = "";
  
  saved = true;
  
  @ViewChild("textarea", {static: true})
  textarea: ElementRef;
  
  timeout: any;
  
  contentUpdated(): void {
    this.saved = false;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.noteContent == "") {
        // delete the note
        for (const i in this.data.notes) {
          if (this.data.notes[i].id == this.id) {
            this.data.notes.splice(Number(i), 1);
          }
        }
      } else {
        // update the note
        let found = false;
        for (const note of this.data.notes) {
          if (note.id == this.id) {
            note.content = this.noteContent;
            found = true;
          }
        }
        if (!found) {
          this.data.notes.push({
            id: this.id,
            content: this.noteContent
          });
        }
      }
      
      setNotes(this.data);
      this.saved = true;
    }, 200);
  }
}
