import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, TagsService, UserService } from '../shared';

import * as Typed from 'typed.js';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) { }

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = new ArticleListConfig();
  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {

    var options = {
      strings: ["Hi I'm Winston.^800 I am a Computer Science graduate from Simon Fraser University in Vancouver, BC.",
       "Hi I'm Winston. I have experience in Angular 5, Node.js, Express.js, C++, C# and Unity Engine."],
      typeSpeed: 36
    }

    var typed = new Typed("#typed-strings", options);

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('all');
        } else {
          this.setListTo('all');
        }
      }
    );

    this.tagsService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      });
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    if (type === 'links') {
      this.router.navigateByUrl('/profile/winston');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = { type: type, filters: filters };
  }
}
