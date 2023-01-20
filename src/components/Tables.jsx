import { useContact } from "../Context/ContactContext";
import React from "react";
import Table from "./Table";

import { useNavigate } from "react-router-dom";
const Tables = () => {
  const { contacts, setContacts } = useContact();
  const navigate = useNavigate();
  const handleSort = () => {
    console.log(contacts);
    const sortedContacts = contacts.sort((a, b) => {
      if (
        a.name.toLowerCase().split(" ")[0] < b.name.toLowerCase().split(" ")[0]
      ) {
        return -1;
      }
      if (
        a.name.toLowerCase().split(" ")[0] < b.name.toLowerCase().split(" ")[0]
      ) {
        return 1;
      }
      return 0;
    });
    localStorage.setItem("contacts", JSON.stringify(sortedContacts));
    setContacts(sortedContacts);
    navigate("/");
  };

  return (
    <>
      <div className="container-fluid  mt-5 pb-5 ">
        <table
          style={{ borderSpacing: 0 }}
          className="table justify-content-center text-center "
        >
          <thead>
            <tr>
              <th>S.N</th>
              <th>
                Name{" "}
                <span onClick={() => handleSort()}>
                  <i
                    className="bi bi-caret-up-fill"
                    style={{ cursor: "pointer", color: "black" }}
                  ></i>
                </span>
              </th>
              <th>Email</th>

              <th className="pr-4">Phone</th>

              <th className="text-center pr-4" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <Table contact={contact} index={index} key={index} />
              ))
            ) : (
              <tr>
                <td colSpan={7}>No contacts</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tables;
