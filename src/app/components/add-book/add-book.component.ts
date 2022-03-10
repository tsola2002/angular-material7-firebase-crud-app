import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';
export interface Language {
  name: string;
}
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  // @ViewChild('chipList') chipList;
  // @ViewChild('resetBookForm') myNgForm;
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // selectedBindingType: string;
  // @ViewChild('chipList') chipList;
  // @ViewChild('resetBookForm') myNgForm;
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // selectedBindingType: string;
  bookForm!: FormGroup;
  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

  constructor(public fb: FormBuilder, private bookApi: BookService) { }

  ngOnInit(): void {
    this.bookApi.GetBookList();
    //this.submitBookForm();
  }

   /* Reactive book form */
  submitBookForm() {
    this.bookForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [this.languageArray]
    })
  }

}
