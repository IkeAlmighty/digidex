import { useState } from "react";

export default function NewContact({ onSubmit }) {
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  async function handleAdd() {
    await onSubmit(newContact);
    setNewContact({ name: "", email: "", phone: "" });
  }

  return (
    <>
      <div className="[&>label]:m-1 [&>label]:p-1 text-center [&_input]:text-center [&>label]:block text-xl">
        <label>
          <input
            placeholder="Name"
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
          />
        </label>
        <label>
          <input
            placeholder="Email"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
          />
        </label>
        <label>
          <input
            placeholder="Phone"
            value={newContact.phone}
            onChange={(e) =>
              setNewContact({ ...newContact, phone: e.target.value })
            }
          />
        </label>

        <input type="button" value="Create Contact" onClick={handleAdd} />
      </div>
    </>
  );
}
