import { createSelector } from "reselect";
import { filter } from 'lodash';

const isEvenNum = (number) => number % 2 === 0

export default class ContactSelectors {
  static getContacts = (state) => state.contacts.contacts;

  static getSelectedContactId = (state) => state.contacts.selectedContactId;

  static getEvenChecked = (state) => state.contacts.evenCheck;

  static selectContactById = createSelector(
    [
      ContactSelectors.getContacts,
      ContactSelectors.getSelectedContactId
    ],
    (contacts, id) => contacts[id],
  );

  static getContactList = createSelector(
    [ContactSelectors.getContacts, ContactSelectors.getEvenChecked],
    (contacts, evenCheck) => {
      console.log('change params', evenCheck);
      if (!evenCheck) return contacts;
      return filter(contacts, ({ id }) => isEvenNum(id));
    },
  );
}
