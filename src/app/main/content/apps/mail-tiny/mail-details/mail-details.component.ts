import { Component, OnDestroy, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import { Mail } from '../mail.model';
import { Subscription } from 'rxjs/Subscription';
import { fuseAnimations } from '../../../../../core/animations';
import { MailContainer } from '../mail.container';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fuse-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.scss'],
  animations: fuseAnimations
})
export class FuseMailDetailsComponent implements OnInit {
  mail$: Observable<Mail>;

  mail: Mail;
  labels: any[];
  showDetails = false;

  constructor(
    private mailService: MailService,
    private mailContainer: MailContainer
  ) {
    this.mail$ = this.mailContainer.select(state => state.currentMail);
  }

  ngOnInit() {
    // Subscribe to update the current mail
    this.mail$.subscribe(mail => {
      this.mail = mail;
    });

    // Subscribe to update on label change
    this.mailContainer.select(state => state.labels).subscribe(labels => {
      this.labels = labels;
    });
  }

  toggleStar(event) {
    event.stopPropagation();

    this.mail.toggleStar();

    this.mailService.updateMail(this.mail);
  }

  toggleImportant(event) {
    event.stopPropagation();

    this.mail.toggleImportant();

    this.mailService.updateMail(this.mail);
  }
}
