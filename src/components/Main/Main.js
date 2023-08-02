import React from "react";
import { Container } from "@mui/material";
import Header from "../../features/todos/Header";
import Content from "../../features/todos/Content";
import FilterBar from "../../features/filter/FilterBar";

function Main() {
  return (
    <Container sx={{ width: "60%", mt: "2rem" }}>
      <Header />

      <FilterBar />

      <Content />
    </Container>
  );
}

export default Main;
