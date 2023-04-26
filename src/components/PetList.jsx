import React from 'react';
import { observer } from 'mobx-react-lite';

const PetList = ({ store }) => {
    const handleAddPet = () => {
        let name = prompt("Name of the pet").trim();
        let type = prompt("Type of the pet").trim();
        let breed = prompt("Breed of the pet").trim();
        let ownerId = parseInt(prompt("Owner's Id of the pet").trim(), 10);

        const pet = store.createPet({ id: store.totalPets, name, breed, type }).at(-1);
        store.assignOwnerToPet(ownerId, pet.id);
    };

    const handleUpdatePet = (pet) => {
        pet.name = prompt("Name of the pet", pet.name).trim();
        pet.type = prompt("Type of the pet", pet.type).trim();
        pet.breed = prompt("Breed of the pet", pet.breed).trim();
        const ownerId = parseInt(prompt("Owner's Id of the pet", pet.owner?.id).trim(), 10);
        store.updatePet(pet.id, pet);
        if (ownerId !== pet.owner?.id) {
          store.assignOwnerToPet(ownerId, pet.id);
        }
      };

      const handleDeletePet = (pet) => {
        store.deletePet(pet.id);
      };

    return(
        <>
            <div id="storeDetailsContainer">
                {store.storeDetails}
            </div>
            <div id="petListTableContainer">
                <table>
                <thead>
                    <tr>
                        <th>##</th>
                        <th>Pet Name</th>
                        <th>Pet Type</th>
                        <th>Pet Breed</th>
                        <th>Owner</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {store.pets.map((pet) => {
                        return (
                            <tr key={pet.id}>
                                <td>{pet.id}</td>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td>{pet.breed}</td>
                                <td>
                                    {pet.owner
                                        ? `${pet.owner?.firstName} ${pet.owner?.lastName}`
                                        : "---"}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeletePet(pet)}
                                        style={{ marginRight: "1rem" }}
                                    >
                                        Delete {pet.name}
                                    </button>
                                    <button onClick={() => handleUpdatePet(pet)}>
                                        Update {pet.name}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                </table>
            </div>
            <button style={{ marginTop: '0.75rem' }} onClick={handleAddPet}>Add New Pet</button>
        </>
    ) 
}

export default observer(PetList);