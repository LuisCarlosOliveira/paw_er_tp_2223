import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Post } from '../models/post.model';
import { Thread } from '../models/thread.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: string = '';
  postResults: Post[] = [];
  threadResults: Thread[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  searchPosts(): void {
    this.searchService.searchPosts(this.searchTerm).subscribe((response: Post[]) => {
      this.postResults = response;
      console.log(this.postResults);
    });
  }

  searchThreads(): void {
    this.searchService.searchThreads(this.searchTerm).subscribe((response: Thread[]) => {
      this.threadResults = response;
      console.log(this.threadResults);
    });
  }
}



