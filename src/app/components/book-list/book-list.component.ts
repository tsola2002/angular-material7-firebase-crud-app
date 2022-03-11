import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// book inteface used to read data from backend
import { Book } from 'src/app/shared/book';
// book service to communicate with backend API
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  BookData: any = [];
  displayedColumns: any[] = [
    //'key',
    'book_name',
    // 'author_name', 
    // 'publication_date',
    // 'in_stock',
    'action'
  ];
  noData: boolean = false;

  constructor(private bookApi: BookService) {
    this.bookApi.GetBookList()
      .snapshotChanges().subscribe(books => {
        books.forEach(item => {
          let a = item.payload.toJSON();
          console.log("PAYLOAD JSON", a);
          //a['key'] = item.key;
          this.BookData.push(a as Book)
        })
        // Data Table
        this.dataSource = new MatTableDataSource(this.BookData);
        // pagination
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0)
      })
   }

  ngOnInit(): void {
    this.dataState();
  }

  dataState() {
    this.bookApi.GetBookList().valueChanges().subscribe(data => {
      if (data.length <= 0) {
        this.noData = true;
        // console.log("NO DATASTATE", this.noData);
      } else {
        this.noData = false;
        // console.log("THERES DATA", this.noData);
      }
    })
  }

  /* Delete */
  deleteBook(index: number, e:any){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.bookApi.DeleteBook(e.key)
    }
  }


}
