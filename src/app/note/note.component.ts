import {Component, OnInit} from "@angular/core";
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
  }
  
  id: string;
  data: NotesData;
  
  noteContent: string | null = null;
  
  saved = true;
  
  timeout: any;
  
  contentUpdated(): void {
    this.saved = false;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      for (const note of this.data.notes) {
        if (note.id == this.id) {
          note.content = this.noteContent;
        }
      }
      setNotes(this.data);
      this.saved = true;
    }, 1000);
  }
}
