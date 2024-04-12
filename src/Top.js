import React from "react";
import List from './List'
import Calendar from './Calendar'
export default function Top() {
  return (
    <div className="container">
      <List />
      <Calendar />
    </div>
  );
}
