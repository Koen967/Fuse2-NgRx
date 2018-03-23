import { Container } from '@tinystate/core';
import { Mail } from './mail.model';
import { Injectable } from '@angular/core';

export interface MailState {
  mails: Mail[];
  selectedMails: Mail[];
  currentMail: Mail;
  folders: any[];
  filters: any[];
  labels: any[];
}

@Injectable()
export class MailContainer extends Container<MailState> {
  getInitialState(): MailState {
    return {
      mails: [],
      selectedMails: [],
      currentMail: null,
      folders: [],
      filters: [],
      labels: []
    };
  }

  setMails(allMails: Mail[]) {
    this.setState(state => ({ mails: allMails }));
  }

  setCurrentMail(mail: Mail) {
    this.setState(state => ({ currentMail: mail }));
  }

  setSelectedMails(mails: Mail[]) {
    this.setState(state => ({ selectedMails: mails }));
  }

  setFolders(folders: any[]) {
    this.setState(state => ({ folders: folders }));
  }

  setFilters(filters: any[]) {
    this.setState(state => ({ filters: filters }));
  }

  setLabels(labels: any[]) {
    this.setState(state => ({ labels: labels }));
  }

  addSelectedMail(selectedMails: Mail[], mail: Mail) {
    const newMails = selectedMails;
    newMails.push(mail);
    this.setState(state => ({ selectedMails: newMails }));
  }

  removeSelectedMail(selectedMails: Mail[], mail: Mail) {
    const newMails = selectedMails;
    const removedMailId = newMails.indexOf(mail);
    console.log(removedMailId);
    newMails.splice(removedMailId, 1);
    this.setState(state => ({ selectedMails: newMails }));
  }

  addMail(mail: Mail) {
    this.setState(state => {
      return {
        ...state,
        ...state.mails,
        mail
      };
    });
  }
}
