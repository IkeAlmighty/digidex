import React, { useState } from "react";

const Contact = ({ contact, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(contact);

  function handleSave() {
    onUpdate(contact._id, form);
    setEditing(false);
  }

  return (
    <div className="b-1 [&_*]:my-1 [&_*]:p-1 [&_*]:mx-2 [&_button]:cursor-pointer [&_button]:text-[#ccc] [&_a]:text-[#ccc] [&_a]:cursor-pointer [&_input]:text-[#ccc] ">
      {editing ? (
        <div className=" ">
          <div>
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Email
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Phone
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
          <button onClick={() => onDelete(contact._id)}>Delete</button>
        </div>
      ) : (
        <div>
          <div>{contact.name}</div>
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
          <button onClick={() => setEditing(true)}>Edit</button>
          <a href={`sms:${contact.phone}`}>Text</a>
          <a href={`mailto:${contact.email}`}>Email</a>
          <a href={`tel:${contact.phone}`}>Call</a>
          <hr />
        </div>
      )}
    </div>
  );
};

export default Contact;
