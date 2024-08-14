import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Genre from "./genre.model";
import Movie from "./movie.model";

@Table({
  tableName: "genresMovies",
})
class GenreMovie extends Model {
  @ForeignKey(() => Genre)
  @Column
  declare genreId: number;

  @ForeignKey(() => Movie)
  @Column
  declare movieId: number;
}

export default GenreMovie;
