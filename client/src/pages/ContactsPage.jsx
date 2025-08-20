import { useState, useEffect } from "react";
import Contact from "./Contact";
import Navigation from "../components/Navigation";
import NewContact from "../components/NewContact";
import {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../api/contacts";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  const [showNewContactComponent, setShowNewContactComponent] = useState(false);

  useEffect(() => {
    async function fetchAndSetContacts() {
      const response = await getContacts();
      setContacts(await response.json());
    }

    fetchAndSetContacts();
  }, []);

  async function handleAdd(newContact) {
    try {
      const res = await addContact(newContact);

      if (res.ok) {
        const { created } = await res.json();
        setContacts([...contacts, created]);
      } else {
        const { error } = await res.json();
        alert(error); // TODO: replace with toast notification
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    await deleteContact(id);
    setContacts(contacts.filter((c) => c._id !== id));
  }

  async function handleUpdate(updatedData) {
    const res = await updateContact(updatedData);
    const updated = await res.json();
    setContacts(contacts.map((c) => (c._id === updatedData._id ? updated : c)));
  }

  return (
    <div className="page-container">
      <Navigation />
      <h2>My Contacts</h2>
      <div className="text-center [&>button]:cursor-pointer text-7xl">
        <button
          onClick={() => setShowNewContactComponent(!showNewContactComponent)}
        >
          {showNewContactComponent ? "-" : "+"}
        </button>
      </div>
      {showNewContactComponent && <NewContact onSubmit={handleAdd} />}

      <div>
        {contacts.map((contact) => (
          <Contact
            key={contact._id}
            contact={contact}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
