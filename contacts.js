const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const editedContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(editedContacts));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const idsArray = contacts.map((contact) => contact.id);
  const editedContacts = [
    ...contacts,
    { id: Math.max(...idsArray) + 1, name, email, phone },
  ];
  await fs.writeFile(contactsPath, JSON.stringify(editedContacts));
}

async function updateContact(id, updatedContact) {
  const contacts = await listContacts();
  const editedContacts = [
    ...contacts.filter((contact) => contact.id !== id),
    updatedContact,
  ];
  await fs.writeFile(contactsPath, JSON.stringify(editedContacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
