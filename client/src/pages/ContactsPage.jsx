import { useState, useEffect } from "react";
import Contact from "../components/Contact";
import Navigation from "../components/Navigation";
import NewContact from "../components/NewContact";
import {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../api/contacts";
import Modal from "../components/Modal";
import ContactSearchBar from "../components/ContactSearchBar";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [displayedContacts, setDisplayedContacts] = useState([]);

  const [showNewContactComponent, setShowNewContactComponent] = useState(false);

  const [selectModeWaitTime, setSelectModeWaitTime] = useState(1000);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function fetchAndSetContacts() {
      const response = await getContacts();
      const _contacts = await response.json();
      const contactsByName = _contacts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setContacts(contactsByName);
      setDisplayedContacts(contactsByName);
    }

    fetchAndSetContacts();
  }, []);

  async function handleAdd(newContact) {
    try {
      const res = await addContact(newContact);

      if (res.ok) {
        const { created } = await res.json();
        setDisplayedContacts([created, ...contacts]);
        setContacts([created, ...contacts]);

        setShowNewContactComponent(false);
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
    setDisplayedContacts(contacts.filter((c) => c._id !== id));
    setContacts(contacts.filter((c) => c._id !== id));
  }

  async function handleUpdate(updatedData) {
    const res = await updateContact(updatedData);
    const updated = await res.json();
    setDisplayedContacts(
      contacts.map((c) => (c._id === updatedData._id ? updated : c))
    );
    setContacts(contacts.map((c) => (c._id === updatedData._id ? updated : c)));
  }

  function handleToolBarButton() {
    setShowNewContactComponent(!showNewContactComponent);
  }

  function handleSearchResults(results) {
    setDisplayedContacts([...new Set([...selected, ...results])]);
  }

  function handleSelect(contact) {
    if (selected.length + 1 === 1) setSelectModeWaitTime(0);

    setSelected([...selected, contact]);
  }

  function handleDeselect(contact) {
    if (selected.length - 1 === 0) setSelectModeWaitTime(1000);

    setSelected(selected.filter((c) => c !== contact));
  }

  return (
    <div className="page-container">
      <div className="sticky top-0">
        <Navigation>
          <div className="flex space-x-5">
            <button
              onClick={handleToolBarButton}
              className={`${showNewContactComponent && "rotate-45"} text-5xl`}
            >
              +
            </button>

            <ContactSearchBar
              onChange={handleSearchResults}
              dataset={contacts}
            />
          </div>
        </Navigation>
      </div>

      {showNewContactComponent && (
        <Modal>
          <NewContact onSubmit={handleAdd} />
        </Modal>
      )}

      <div>
        {displayedContacts.map((contact) => (
          <Contact
            key={contact._id}
            contact={contact}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onSelect={handleSelect}
            onDeselect={handleDeselect}
            selectModeWaitTime={selectModeWaitTime}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
