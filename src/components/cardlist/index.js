import React from "react";
import Card from "../card";

function CardList() {
  return (
    <div className="flex flex-row flex-wrap w-full p-12 items-center justify-between">
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </div>
  );
}

export default CardList;
