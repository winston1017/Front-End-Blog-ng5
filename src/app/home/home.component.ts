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
      strings: ['Here is my <a href="assets/ResumeC.pdf">[&nbsp;<strong>RESUMÉ</strong>&nbsp;]</a>.'],
      typeSpeed: 30,
      startDelay: 11200,
      showCursor: false,
    };

    var typed = new Typed("#typed-strings", options);

    var typed22 = new Typed('#typed-strings22', {
      stringsElement: '#typed22',
      typeSpeed: 30,
      backSpeed: 12
    });

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
