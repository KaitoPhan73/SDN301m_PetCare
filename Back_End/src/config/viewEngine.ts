import { Express } from "express";
import path from "path";
import express from "express";

const configViewEngine = (app: Express) => {
  console.log(">>> check __dirname:", path.join("./src", "views"));
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");

  app.use(express.static(path.join("./src", "public")));
};

export default configViewEngine;
