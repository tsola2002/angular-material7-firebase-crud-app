import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';
import { MatChipInputEvent } from '@angular/material/chips';
// import { MatDatepickerModule } from '@angular/material/datepicker';
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
  @ViewChild('chipList') chipList;
  @ViewChild('resetBookForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  bookForm!: FormGroup;
  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

  
  ngOnInit(): void {
    this.bookApi.GetBookList();
    this.submitBookForm();
  }

  constructor(public fb: FormBuilder, private bookApi: BookService) { }


   /* Reactive book form */
  submitBookForm() {
    this.bookForm = this.fb.group({
      book_name: ['', [Validators.required]],
      // isbn_10: ['', [Validators.required]],
      // author_name: ['', [Validators.required]],
      // publication_date: ['', [Validators.required]],
      // binding_type: ['', [Validators.required]],
      // in_stock: ['Yes'],
      // languages: [this.languageArray]
    })
  }

  /* Submit book */
  submitBook() {
    if (this.bookForm.valid){
      this.bookApi.AddBook(this.bookForm.value)
      this.resetForm();
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.bookForm.controls[controlName].hasError(errorName);
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Date */
  formatDate(e:any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    // this.bookForm.get('publication_date').setValue(convertDate, {
    //   onlyself: true
    // })
  }

  /* Remove dynamic languages */
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }

  /* Reset form */
  resetForm() {
    this.languageArray = [];
    this.bookForm.reset();
    Object.keys(this.bookForm.controls).forEach(key => {
      this.bookForm.controls[key].setErrors(null)
    });
  }

  

}
