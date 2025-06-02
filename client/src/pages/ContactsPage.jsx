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
    fetch("/api/contacts")
      .then((res) => res.json())
      .then(setContacts)
      .catch(console.error);
  }, []);

  const handleAdd = async () => {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      const created = await res.json();
      setContacts([...contacts, created]);
      setNewContact({ name: "", email: "", phone: "" });
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
