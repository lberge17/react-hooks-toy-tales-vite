import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then(r => {
      if (!r.ok) { throw new Error("failed to fetch") }
      return r.json()
    })
    .then(setToys)
    .catch(console.log)
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleLike(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({likes: toy.likes + 1})
    })
    .then(r => {
      if (!r.ok) { throw new Error("failed to update") }
      return r.json()
    })
    .then(toy => setToys(pToys => pToys.map(t => t.id === toy.id ? toy : t)))
    .catch(console.log)
  }

  function handleCreate(toy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toy)
    })
    .then(r => {
      if (!r.ok) { throw new Error("failed to fetch") }
      return r.json()
    })
    .then(t => setToys(pToys => [...pToys, t]))
    .catch(console.log)
  }

  function handleDelete(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
    .then((r) => {
      if (!r.ok) { throw new Error("failed to delete") }
      return r.json()
    })
    .then(() => {
      setToys(pToys => pToys.filter(t => t.id != toy.id))
    })
    .catch(console.log)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onCreate={handleCreate} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onLike={handleLike} onDelete={handleDelete} />
    </>
  );
}

export default App;
