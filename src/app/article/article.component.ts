import {Component, Input, Output, OnInit} from '@angular/core';
import {Article} from '../models/article';
import { EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article: Article;

  @Output()
  deletedArticle: EventEmitter<Article> = new EventEmitter();

  showView = true;

  constructor(private router: ActivatedRoute, private articleService: ArticleService) {
  }

  ngOnInit() {
    if (this.router.snapshot.paramMap.get('id')) {
      this.articleService.getArticleById(Number(this.router.snapshot.paramMap.get('id'))).subscribe(article => {
        this.article = article;
        this.showView = false;
      });
    }
  }

  delete() {
    this.deletedArticle.emit(this.article);
  }
}
