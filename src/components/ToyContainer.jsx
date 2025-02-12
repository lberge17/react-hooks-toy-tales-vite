import { useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLike, onDelete }) {
  return (
    <div id="toy-collection">{toys.map(t => <ToyCard toy={t} key={t.id} onDelete={onDelete} onLike={onLike} />)}</div>
  );
}

export default ToyContainer;
