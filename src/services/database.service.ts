import { Sequelize } from "sequelize-typescript";
import User from "../models/user.model";
import Movie from "../models/movie.model";
import Genre from "../models/genre.model";
import GenreMovie from "../models/genre.movie.model";

export default async function connectDatabase() {
  try {
    const database = new Sequelize({
      database: process.env.DATABASE_NAME,
      dialect: "mysql",
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD || "Root",
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT) || 3306,
      logging: false,
    });

    database.addModels([User, Movie, Genre, GenreMovie]);
    await database.sync();

    console.log("Database connected successfully");
    return database;
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    return null;
  }
}
