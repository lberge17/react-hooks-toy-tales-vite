import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  const { name, image, likes } = toy
  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button onClick={() => onLike(toy)} className="like-btn">Like {"<3"}</button>
      <button onClick={() => onDelete(toy)} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
