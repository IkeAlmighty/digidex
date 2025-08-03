import { useState, useEffect } from "react";
import Contact from "./Contact";
import Navigation from "../components/Navigation";
import NewContact from "../components/NewContact";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  const [showNewContactComponent, setShowNewContactComponent] = useState(false);

  useEffect(() => {
    async function fetchAndSetContacts() {
      const response = await fetch("/api/contacts");
      setContacts(await response.json());
    }

    fetchAndSetContacts();
  }, []);

  const handleAdd = async (newContact) => {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });

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
  };

  const handleDelete = async (id) => {
    await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    setContacts(contacts.filter((c) => c._id !== id));
  };

  const handleUpdate = async (id, updatedData) => {
    const res = await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const updated = await res.json();
    setContacts(contacts.map((c) => (c._id === id ? updated : c)));
  };

  return (
    <div class="mx-auto p-2 max-w-[800px]">
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
