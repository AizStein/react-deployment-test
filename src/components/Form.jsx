import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://backend-form-deployment-test.onrender.com/api/user"
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: input.name,
      email: input.email,
      password: input.password,
    };

    try {
      const res = await axios.post(
        "https://backend-form-deployment-test.onrender.com/api/user",
        userData
      );
      setInput({ name: "", email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={input.name}
            onChange={clickHandler}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={input.email}
            onChange={clickHandler}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={input.password}
            onChange={clickHandler}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;
