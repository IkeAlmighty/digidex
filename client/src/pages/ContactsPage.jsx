import { useState, useEffect } from "react";
import Contact from "./Contact";
import Navigation from "../components/Navigation";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchAndSetContacts() {
      const response = await fetch("/api/contacts");
      setContacts(await response.json());
    }

    fetchAndSetContacts();
  }, []);

  const handleAdd = async () => {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });

      if (res.ok) {
        const { created } = await res.json();
        setContacts([...contacts, created]);
        setNewContact({ name: "", email: "", phone: "" });
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
    <div>
      <Navigation />
      <h2>My Contacts</h2>

      <div className="max-w-[800px] mx-auto">
        <input
          placeholder="Name"
          value={newContact.name}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
        />
        <input
          placeholder="Email"
          value={newContact.email}
          onChange={(e) =>
            setNewContact({ ...newContact, email: e.target.value })
          }
        />
        <input
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) =>
            setNewContact({ ...newContact, phone: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add Contact</button>
      </div>

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
