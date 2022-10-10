import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import swal from "sweetalert";

const Form = () => {
  //States
  const [dragonName, setDragonName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [listDragons, setListDragons] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "dragons"), (snapshot) => {
      setListDragons(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  const showAlert = (title, field, status) => {
    swal({
      title: title,
      text: field,
      icon: status,
      buttons: "Acept",
    });
  };

  //Methods
  //Save dragons
  const saveDragons = async (e) => {
    e.preventDefault();

    try {
      //Validations
      if (!dragonName.trim()) {
        const field = "Please insert dragon name";
        showAlert("Complete all the fields!", field, "error");
        return;
      }
      if (!description.trim()) {
        const field = "Please insert description about the dragon";
        showAlert("Complete all the fields!", field, "error");
        return;
      }
      if (!age.trim()) {
        const field = "Please insert age of the dragon";
        showAlert("Complete all the fields!", field, "error");
        return;
      }
      if (!size.trim()) {
        const field = "Please insert size of the dragon";
        showAlert("Complete all the fields!", field, "error");
        return;
      }
      if (!color.trim()) {
        const field = "Please insert color of the dragon";
        showAlert("Complete all the fields!", field, "error");
        return;
      }
      const data = await addDoc(collection(db, "dragons"), {
        dragonName: dragonName,
        description: description,
        age: age,
        size: size,
        color: color,
      });
      setListDragons([
        ...listDragons,
        {
          id: data.id,
          dragonName: dragonName,
          description: description,
          age: age,
          size: size,
          color: color,
        },
      ]);
      setDragonName("");
      setDescription("");
      setAge("");
      setSize("");
      setColor("");
      e.target.reset();
      showAlert(
        "Saved data!",
        "Your dragon has been successfully saved!",
        "success"
      );
    } catch (error) {
      console.log(error);
    }
  };

  //Get list of dragons
  const getListDragons = async (e) => {
    e.preventDefault();
    try {
      const data = await db.collection("dragons").get();
      const arrayData = data.docs.map((item) => ({
        id: item.id,
        ...item.date(),
      }));
      setListDragons(arrayData);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete dragon
  const deleteDragon = async (id) => {
    //console.log(id);
    try {
      await deleteDoc(doc(db, "dragons", id));
      showAlert(
        "Deleted data!",
        "Your dragon has been successfully deleted!",
        "success"
      );
    } catch (error) {
      console.log(error);
    }
  };
  //Return
  return (
    <div className="container mt-5">
      <h1 className="text-center">BASIC CRUD</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">List of dragons</h4>
          <ul className="list-group">
            {listDragons.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span className="lead">
                  {item.dragonName}-{item.description}-{item.age}-{item.size}-
                  {item.color}
                </span>
                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => deleteDragon(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center"></h4>
          <form onSubmit={saveDragons}>
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Dragon"
              value={dragonName}
              onChange={(e) => setDragonName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-block">
              Add new Dragon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
