const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err.message);
    }
    // Получаем контакты
    const contacts = JSON.parse(data);
    console.log(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    //Получаем контакт по id
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => id === Number(contactId));
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    // Удаляем контакт по id
    const contacts = JSON.parse(data).filter(({ id }) => id !== Number(contactId));
    const deleteContact = JSON.parse(data).find(({ id }) => id === Number(contactId));
    if (deleteContact) {
      fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log("Контакт удален", deleteContact);
        return;
      });
    } else {
      console.log("Такого контакта нет");
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    // Создаем контакт и добавляем в массив
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };
    const contacts = JSON.parse(data);
    const newContacts = [newContact, ...contacts];

    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("Новый контакт", newContact);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
