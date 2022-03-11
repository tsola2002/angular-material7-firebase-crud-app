import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Language {
  name: string;
}
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editBookForm: FormGroup;
  BindingType: any = [
    'Paperback',
    'Case binding',
    'Perfect binding',
    'Saddle stitch binding',
    'Spiral binding',
  ];

  constructor(
    public fb: FormBuilder,
    private location: Location,
    private bookApi: BookService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    const paramId = '001';
    var id = this.actRoute.snapshot.paramMap.get(paramId);
    var finalId = id !== null ? id : null;
    
    console.log("PARAM ID", paramId);
    //this.bookApi 
    this.bookApi 
    .GetBook(paramId)
    .valueChanges()
    .subscribe((data) => {
      this.languageArray = data.languages;
      this.editBookForm.setValue(data);
      });
   }

  ngOnInit(): void {
    this.updateBookForm();
  }

  /* Load Update form */
  updateBookForm() {
    this.editBookForm = this.fb.group({
      key: ['', []],
      book_name: ['', [Validators.required]],
      // isbn_10: ['', [Validators.required]],
      // author_name: ['', [Validators.required]],
      // publication_date: ['', [Validators.required]],
      // binding_type: ['', [Validators.required]],
      // in_stock: ['Yes'],
      // languages: [''],
    });
  }

  /* Submit book */
  updateBook() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you wanna update?')) {
      this.bookApi.UpdateBook(id, this.editBookForm.value);
      this.router.navigate(['books-list']);
    }
  }

  /* Go to previous page */
  goBack() {
    this.location.back();
  }

  /* Date */
  // formatDate(e) {
  //   var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.editBookForm.get('publication_date').setValue(convertDate, {
  //     onlyself: true,
  //   });
  // }

  /* Remove language */
  remove(language: any): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }

   /* Add language */
  add(event: MatChipInputEvent): void {
    var input: any = event.input;
    var value: any = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editBookForm.controls[controlName].hasError(errorName);
  };

}
