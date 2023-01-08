import { createSelector } from "reselect";
import { filter } from 'lodash';

const isEvenNum = (number) => number % 2 === 0

export default class ContactSelectors {
  static getContacts = (state) => state.contacts.contacts;

  static getSelectedContactId = (state) => state.contacts.selectedContactId;

  static getEvenChecked = (state) => state.contacts.evenCheck;

  static getQuery = (state) => state.contacts.query;

  static selectContactById = createSelector(
    [
      ContactSelectors.getContacts,
      ContactSelectors.getSelectedContactId
    ],
    (contacts, id) => contacts[id],
  );

  static getContactList = createSelector(
    [
      ContactSelectors.getContacts,
      ContactSelectors.getEvenChecked,
      ContactSelectors.getQuery,
    ],
    (contacts, evenCheck, query) => {
      let newContacts = Object.assign({}, contacts);
      if (query.email) {
        newContacts = filter(contacts, ({ email }) => {
          const regexEmail = new RegExp(query.email, 'gi');
          return email?.match(regexEmail);
        });
      }
      if (!evenCheck) return newContacts;
      return filter(newContacts, ({ id }) => isEvenNum(id));
    },
  );
}
