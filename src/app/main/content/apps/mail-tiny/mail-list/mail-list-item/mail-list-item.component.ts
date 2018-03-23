import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Mail } from '../../mail.model';
import { MailService } from '../../mail.service';
import { Subscription } from 'rxjs/Subscription';
import { MailContainer } from '../../mail.container';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fuse-mail-list-item',
  templateUrl: './mail-list-item.component.html',
  styleUrls: ['./mail-list-item.component.scss']
})
export class FuseMailListItemComponent implements OnInit {
  @Input() mail: Mail;
  labels: any[] = [];
  @HostBinding('class.selected') selected: boolean;

  selectedMails$: Observable<Mail[]>;

  constructor(
    private mailService: MailService,
    private mailContainer: MailContainer
  ) {
    this.selectedMails$ = mailContainer.select(state => state.selectedMails);
  }

  ngOnInit() {
    // Set the initial values
    this.mail = new Mail(this.mail);

    // Subscribe to update on selected mail change
    this.selectedMails$.subscribe(selectedMails => {
      this.selected = false;

      if (selectedMails.length > 0) {
        for (const mail of selectedMails) {
          if (mail.id === this.mail.id) {
            this.selected = true;
            break;
          }
        }
      }
    });

    // Subscribe to update on label change
    this.mailContainer.select(state => state.labels).subscribe(labels => {
      this.labels = labels;
    });
  }

  onSelectedChange() {
    this.mailService.toggleSelectedMail(this.mail);
  }

  /**
   * Toggle star
   * @param event
   */
  toggleStar(event) {
    event.stopPropagation();

    this.mail.toggleStar();

    this.mailService.updateMail(this.mail);
  }

  /**
   * Toggle Important
   * @param event
   */
  toggleImportant(event) {
    event.stopPropagation();

    this.mail.toggleImportant();

    this.mailService.updateMail(this.mail);
  }
}
