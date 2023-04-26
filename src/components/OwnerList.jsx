import { observer } from "mobx-react-lite";
import React from "react";

const OwnerList = ({ store }) => {
  const handleAddOwner = () => {
    const firstName = prompt("First Name?");
    const lastName = prompt("Last Name?");
    store.createOwner({ id: store.totalOwners, firstName, lastName });
  };

  const handleUpdateOwner = (owner) => {
    owner.firstName = prompt("First Name?", owner.firstName);
    owner.lastName = prompt("Last Name?", owner.lastName);
    store.updateOwner(owner.id, owner);
  };

  const handleDeleteOwner = (owner) => {
    store.deleteOwner(owner.id);
  };

  return (
    <div className="pet-owner-app">
      <table>
        <thead>
          <tr>
            <th>##</th>
            <th>First Name</th>
            <th>last Name</th>
            <th>Owner</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {store.owners.map((owner) => {
            return (
              <tr key={owner.id}>
                <td>{owner.id}</td>
                <td>{owner.firstName}</td>
                <td>{owner.lastName}</td>
                <td>
                  <button
                    onClick={() => handleDeleteOwner(owner)}
                    style={{ marginRight: "1rem" }}
                  >
                    Delete {owner.firstName}
                  </button>
                  <button onClick={() => handleUpdateOwner(owner)}>
                    Update {owner.firstName}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleAddOwner}>Add New owner</button>
    </div>
  );
}

export default observer(OwnerList);