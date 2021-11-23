import React from "react";

export const CardViewer = ({ card = { imgName: "default" } }) => {
  // const cardImage = require(`/images/${truncatedCardName}.jpg`);

  return <img src={`/images/cards/${card.imgName}.jpg`} onError={() => console.log(`Missing image for: ${card.imgName}`)} />;
};
