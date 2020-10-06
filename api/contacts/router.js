const { Router } = require("express");
const contacts = require("../../contacts");

const contactsRouter = Router();

contactsRouter.get("/", async function (req, res) {
  const list = await contacts.listContacts();
  res.json(list);
});

contactsRouter.get("/:contactId", async function (req, res) {
  const contact = await contacts.getContactById(+req.params.contactId);
  if (Object.keys(contact).length > 0) {
    res.json(contact);
    return;
  }
  res.status(404).json({ message: "Not found" });
});

contactsRouter.post("/", async function (req, res) {
  const { body } = req;
  if (
    Object.values(body).every(
      (field) => typeof field === "string" && field.length > 0
    )
  ) {
    const { name, email, phone } = body;
    const newContact = await contacts.addContact(name, email, phone);
    res.status(201).json(newContact);
    return;
  }
  res.status(400).json({ message: "Missing required name field" });
});

contactsRouter.delete("/:contactId", async function (req, res) {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(+contactId);

  if (Object.keys(contact).length > 0) {
    await contacts.removeContact(+contactId);
    res.json({ message: "Contact deleted" });
    return;
  }
  res.status(404).json({ message: "Not found" });
});

contactsRouter.patch("/:contactId", async function (req, res) {
  const { body } = req;
  const { contactId } = req.params;

  if (
    Object.values(body).some(
      (field) => typeof field === "string" && field.length > 0
    )
  ) {
    const contact = await contacts.getContactById(+contactId);

    if (Object.keys(contact).length > 0) {
      const updatedContact = {
        ...contact,
        ...body,
      };
      await contacts.updateContact(+contactId, updatedContact);
      res.json(updatedContact);
      return;
    }
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(400).json({ message: "Missing fields" });
});
module.exports = contactsRouter;
