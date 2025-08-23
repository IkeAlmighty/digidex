import { useState, useRef } from "react";

const Contact = ({ contact, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(contact);

  const [expandedView, setExpandedView] = useState(false);

  const newTagInput = useRef();

  function handleSave() {
    onUpdate(form);
    setEditing(false);
  }

  function addTag() {
    setForm({ ...form, tags: [newTagInput.current.value, ...form.tags] });
    newTagInput.current.value = "";
  }

  function removeTag(tag) {
    setForm({
      ...form,
      tags: form.tags.filter((t) => t !== tag),
    });
  }

  return (
    <div className="b-1 [&_*]:my-1 [&_*]:p-1 [&_*]:mx-2 [&_button]:cursor-pointer [&_button]:text-[#ccc] [&_a]:text-[#ccc] [&_a]:cursor-pointer [&_input]:text-[#ccc]">
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

          <div>
            <div>Tags:</div>

            <div>
              {form.tags.map((tag) => {
                return (
                  <button
                    key={`${contact._id}${tag}`}
                    className="!text-black border-2 rounded !px-2 !py-1"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} x
                  </button>
                );
              })}
            </div>

            <div className="[&_*]:inline-block !mx-0">
              <input
                className="translate-y-0.5 w-[60%] border-2"
                type="text"
                placeholder="new tag..."
                ref={newTagInput}
                onKeyUp={(e) => e.key === "Enter" && addTag()}
              />
              <button
                className="text-3xl float-right -translate-y-1"
                onClick={addTag}
              >
                +
              </button>
            </div>
          </div>

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
          <button onClick={() => onDelete(contact._id)}>Delete</button>
        </div>
      ) : (
        <div>
          <div>{contact.name}</div>
          {expandedView && (
            <div>
              <div>{contact.email}</div>
              <div>{contact.phone}</div>
            </div>
          )}
          <div>
            {contact.tags.map((tag, index) => (
              <span
                key={`tags-noedit-${tag}${contact._id}`}
                className="text-[#ccc] inline-block !my-0 !py-0 !mx-0 !px-0 !mr-2 italic !cursor-text"
                disabled={true}
              >
                {tag}
                {contact.tags.length - 1 !== index && ","}
              </span>
            ))}
          </div>

          <div className="!p-0 !m-0 [&_*]:w-[50px] [&_*]:inline-block">
            <button className="!m-0" onClick={() => setEditing(true)}>
              Edit
            </button>
            {contact.phone && <a href={`sms:${contact.phone}`}>Text</a>}
            {contact.email && <a href={`mailto:${contact.email}`}>Email</a>}
            {contact.phone && <a href={`tel:${contact.phone}`}>Call</a>}
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default Contact;
