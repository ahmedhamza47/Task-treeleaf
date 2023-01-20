import React from "react";
import { useContact } from "../Context/ContactContext";
import { Contact } from "./Contact";
import Table from "./Table";
export const Contacts = () => {
  const { contacts } = useContact();
  console.log("from contacts component ", contacts);

  return (
    <div className="bg-colors">
      <h1 className=" ml-5 pl-3 pt-5 pb-3" style={{ fontFamily: "Kanit" }}>
        {" "}
        User's Profile List{" "}
      </h1>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <div key={index} className="my-4">
            <Contact contact={contact} index={index} />
          </div>
        ))
      ) : (
        <p className="ml-5 pl-2"> No contacts to Show</p>
      )}
      <div className="height"></div>
    </div>
  );
};
