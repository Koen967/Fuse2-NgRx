import { Component, OnDestroy, OnInit } from '@angular/core';
import { MailService } from './mail.service';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { Mail } from './mail.model';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { Observable } from 'rxjs/Observable';
import { MailContainer } from './mail.container';

@Component({
  selector: 'fuse-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class FuseMailComponent implements OnInit {
  mails$: Observable<Mail[]>;
  currentMail$: Observable<Mail>;
  selectedMails$: Observable<Mail[]>;

  mails: Mail[];
  hasSelectedMails: boolean;
  isIndeterminate: boolean;
  folders: any[];
  filters: any[];
  labels: any[];
  searchInput: FormControl;
  currentMail: Mail;

  constructor(
    private mailService: MailService,
    private translationLoader: FuseTranslationLoaderService,
    private mailContainer: MailContainer
  ) {
    this.searchInput = new FormControl('');
    this.translationLoader.loadTranslations(english, turkish);
  }

  ngOnInit() {
    this.mails$ = this.mailContainer.select(state => state.mails);
    this.currentMail$ = this.mailContainer.select(state => state.currentMail);
    this.selectedMails$ = this.mailContainer.select(
      state => state.selectedMails
    );

    this.mails$.subscribe(mails => {
      this.mails = mails;
    });

    this.selectedMails$.subscribe(selectedMails => {
      console.log('Triggered selectedMail subscription');
      this.hasSelectedMails = selectedMails.length > 0;
      this.isIndeterminate =
        selectedMails.length !== this.mails.length && selectedMails.length > 0;
    });

    this.mailContainer.select(state => state.folders).subscribe(folders => {
      this.folders = folders;
    });

    this.mailContainer.select(state => state.filters).subscribe(filters => {
      this.filters = filters;
    });

    this.mailContainer.select(state => state.labels).subscribe(labels => {
      this.labels = labels;
    });

    this.currentMail$.subscribe(mail => {
      if (!mail) {
        this.currentMail = null;
      } else {
        this.currentMail = mail;
      }
    });

    this.searchInput.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.mailService.onSearchTextChanged.next(searchText);
      });
  }

  toggleSelectAll() {
    this.mailService.toggleSelectAll();
  }

  selectMails(filterParameter?, filterValue?) {
    this.mailService.selectMails(filterParameter, filterValue);
  }

  deselectMails() {
    this.mailService.deselectMails();
  }

  deSelectCurrentMail() {
    this.mailContainer.setCurrentMail(null);
  }

  toggleLabelOnSelectedMails(labelId) {
    this.mailService.toggleLabelOnSelectedMails(labelId);
  }

  setFolderOnSelectedMails(folderId) {
    this.mailService.setFolderOnSelectedMails(folderId);
  }
}
