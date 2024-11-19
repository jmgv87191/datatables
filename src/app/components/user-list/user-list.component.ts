import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { Postmodel } from '../../models/postmodel';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Sort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  listPost!:Postmodel[];
  displayedColumns: string[] = ['userId', 'id', 'tittle', 'body'];
  listPostDataSource = new MatTableDataSource<Postmodel>([])
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  
  constructor( private _postService:PostService ){}
  
  ngOnInit(): void {
    this.getAllPost()
  }


  ngAfterViewInit(): void {
    this.listPostDataSource.paginator = this.paginator;
  }

  getAllPost(){
    this._postService.getAllPost().subscribe({
      next:(res)=>{
        console.log(res)
        this.listPost = res
        this.listPostDataSource = new MatTableDataSource<Postmodel>(res)
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  sortData(sort: Sort) {
    console.log(sort)
    const data = this.listPost.slice();
    if (!sort.active || sort.direction === '') {
      this.listPostDataSource = new MatTableDataSource<Postmodel>(data)
      this.listPostDataSource.paginator = this.paginator;

      return;
    }
    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userId':
          return compare(a.userId, b.userId, isAsc);
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'tittle':
          return compare(a.tittle, b.tittle, isAsc);
        case 'body':
          return compare(a.body, b.body, isAsc);
        default:
          return 0;
      }
    });
    this.listPostDataSource = new MatTableDataSource<Postmodel>(data)
    this.listPostDataSource.paginator = this.paginator;

  }
  
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}