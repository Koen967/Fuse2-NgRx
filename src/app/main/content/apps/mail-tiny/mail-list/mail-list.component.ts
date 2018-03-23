import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mail } from '../mail.model';
import { ActivatedRoute } from '@angular/router';
import { MailService } from '../mail.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { fuseAnimations } from '../../../../../core/animations';
import { MailContainer } from '../mail.container';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fuse-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss'],
  animations: fuseAnimations
})
export class FuseMailListComponent implements OnInit {
  mails$: Observable<Mail[]>;
  currentMail$: Observable<Mail>;

  mails: Mail[] = [];
  currentMail: Mail;

  constructor(
    private route: ActivatedRoute,
    private mailService: MailService,
    private location: Location,
    private mailContainer: MailContainer
  ) {
    this.mails$ = mailContainer.select(state => state.mails);
    this.currentMail$ = mailContainer.select(state => state.currentMail);
  }

  ngOnInit() {
    // Subscribe to update mails on changes
    this.mails$.subscribe(mails => {
      this.mails = mails;
    });

    // Subscribe to update current mail on changes
    this.currentMail$.subscribe(currentMail => {
      if (!currentMail) {
        // Set the current mail id to null to deselect the current mail
        this.currentMail = null;

        // Handle the location changes
        const labelHandle = this.route.snapshot.params.labelHandle,
          filterHandle = this.route.snapshot.params.filterHandle,
          folderHandle = this.route.snapshot.params.folderHandle;

        if (labelHandle) {
          this.location.go('apps/mail-tiny/label/' + labelHandle);
        } else if (filterHandle) {
          this.location.go('apps/mail-tiny/filter/' + filterHandle);
        } else {
          this.location.go('apps/mail-tiny/' + folderHandle);
        }
      } else {
        this.currentMail = currentMail;
      }
    });
  }

  /**
   * Read mail
   * @param mailId
   */
  readMail(mailId) {
    const labelHandle = this.route.snapshot.params.labelHandle,
      filterHandle = this.route.snapshot.params.filterHandle,
      folderHandle = this.route.snapshot.params.folderHandle;

    if (labelHandle) {
      this.location.go('apps/mail-tiny/label/' + labelHandle + '/' + mailId);
    } else if (filterHandle) {
      this.location.go('apps/mail-tiny/filter/' + filterHandle + '/' + mailId);
    } else {
      this.location.go('apps/mail-tiny/' + folderHandle + '/' + mailId);
    }

    // Set current mail
    this.mailService.setCurrentMail(mailId);
  }
}
