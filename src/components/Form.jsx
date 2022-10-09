import React from "react";
import { useState } from "react";

const Form = () => {
  const [dragon, setdragon] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  return (
    <div className="container mt-5">
      <h1 className="text-center">BASIC CRUD</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">List of dragons</h4>
          <ul className="list-group"></ul>
        </div>
        <div className="col-4">
          <h4 className="text-center"></h4>
          <form>
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Dragon"
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Description"
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Age"
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Size"
            />
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Color"
            />
            <button className="btn btn-primary btn-block">
              Add new Dragon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
