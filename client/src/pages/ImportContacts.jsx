import Papa from "papaparse";
import { useState } from "react";
import { addContact, importContacts } from "../api/contacts";
import Navigation from "../components/Navigation.jsx";

export default function ImportContacts() {
  const [progress, setProgress] = useState(null);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      skipEmptyLines: true,
      header: true,
      complete: async (results) => {
        // then iterate through each row and add the relevant contact information:
        for (let i = 0; i < results.data.length; i++) {
          let contact = results.data[i];
          let name = `${contact["First Name"]} ${contact["Middle Name"]} ${contact["Last Name"]}`;
          let email = contact["E-mail 1 - Value"];
          let phone = contact["Phone 1 - Value"];

          await addContact({ name, email, phone });
          setProgress(`${Math.ceil((i / results.data.length) * 100)}%`);
        }
      },
      error: (error) => {
        console.log("Error parsing CSV: ", error);
      },
    });
  }

  return (
    <div className="page-container">
      <Navigation />

      <div className="my-3">
        Experimental! Import function only works with exported google contacts
        CSV file.
      </div>
      <input
        className="cursor-pointer border-2 rounded px-2"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <div>{progress}</div>

      <div>{progress === "100%" && "Contacts uploaded!"}</div>
    </div>
  );
}
