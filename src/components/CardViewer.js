import React from "react";

export const CardViewer = ({ card = { name: "default" } }) => {
  const truncatedCardName = card.name.replace(/[\s,'-/."]/g, "").toLowerCase();
  // const cardImage = require(`/images/${truncatedCardName}.jpg`);

  return <img src={`/images/cards/${truncatedCardName}.jpg`} onError={() => console.log(`Missing image for: ${truncatedCardName}`)} />;
};
