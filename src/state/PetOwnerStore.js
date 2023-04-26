import { makeObservable, observable, computed, action, autorun, runInAction } from "mobx";

export default class PetOwnerStore {
    pets = [];
    owners = [];

    constructor() {
        makeObservable(this, {
            pets: observable,
            owners: observable,
            totalOwners: computed,
            totalPets: computed,
            storeDetails: computed,
            getPetsByOwner: action,
            createPet: action,
            createOwner: action,
            updatePet: action,
            updateOwner: action,
            deletePet: action,
            deleteOwner: action,
            assignOwnerToPet: action
          });
        autorun(() => this.logStoreDetails());
        runInAction(() => this.prefetchData());
    }

    // Getters
    get totalPets() {
        return this.pets.length;
    }

    get totalOwners() {
        return this.owners.length;
    }

    get storeDetails () {
        return `We have ${this.totalPets} total pet${this.totalPets > 1 ? 's' : ''} and ${this.totalOwners} total owner${this.totalOwners > 1 ? 's' : ''}, so far!`
      }

    // Retrieve pets by owner id
    getPetsByOwner(ownerId) {
        return this.pets.filter((pet) => {
            return pet.owner && pet.owner.id === ownerId;
        });
    }

    createPet(pet = { id: 0, name: "", type: "", breed: "", owner: null }) {
        this.pets.push(pet);
        return this.pets;
    }

    updatePet(petId, update) {
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        if(petIndexAtId > -1 && update) {
            this.pets[petIndexAtId] = update;
        }
    }

    deletePet(petId) {
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        if (petIndexAtId > -1) {
          this.pets.splice(petIndexAtId, 1);
        }
    }

    createOwner(owner = { id: 0, firstName: "", lastName: "" }) {
        this.owners.push(owner);
        return this.owners;
    }

    updateOwner(ownerId, update) {
        const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);
        if (ownerIndexAtId > -1 && update) {
          this.owners[ownerIndexAtId] = update;
        }
    }

    deleteOwner(ownerId) {
        const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);
        if(ownerIndexAtId > -1) {
            this.owners.splice(ownerIndexAtId, 1);
        }
    }

    // Assign an owner to a pet by IDs
    assignOwnerToPet(ownerId, petId) {
        console.log(petId)
        console.log(ownerId)

        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);

        console.log(petIndexAtId)
        console.log(ownerIndexAtId)
        console.log(this.owners)

        if (petIndexAtId > -1 && ownerIndexAtId > -1) {
          this.pets[petIndexAtId].owner = this.owners[ownerIndexAtId];
        }
    }

    // Report current store status
    logStoreDetails() {
        console.log(this.storeDetails);
    }

    // Mock data fetching operation
    prefetchData = () => {
        const owners = [{ firstName: "Aleem", lastName: "Isiaka", id: 0 }];
        const pets = [
          {
            id: 0,
            name: "Lincy",
            breed: "Siamese",
            type: "Cat",
            ownerId: 0,
          },
        ];
    
        setTimeout(() => {
          console.log("Fetch complete update store");
          owners.map((pet) => this.createOwner(pet));
          pets.map((pet) => {
            this.createPet(pet);
            this.assignOwnerToPet(pet.ownerId, pet.id);
            return pet;
          });
        }, 1000);
      };    
}