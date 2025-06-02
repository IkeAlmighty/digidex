import React, { useState } from "react";

const Contact = ({ contact, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(contact);

  const handleSave = () => {
    onUpdate(contact._id, form);
    setEditing(false);
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
      {editing ? (
        <>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>
            <strong>{contact.name}</strong>
          </p>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(contact._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Contact;
