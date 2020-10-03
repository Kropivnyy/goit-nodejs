const argv = require("yargs").argv;
const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      await contacts.addContact(name, email, phone);
      const listAfterAddition = await contacts.listContacts();
      console.table(listAfterAddition);
      break;

    case "remove":
      await contacts.removeContact(id);
      const listAfterDeletion = await contacts.listContacts();
      console.table(listAfterDeletion);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
