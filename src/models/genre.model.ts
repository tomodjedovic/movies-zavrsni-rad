import {
  Model,
  Table,
  Column,
  Unique,
  AllowNull,
  NotEmpty,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import User from "./user.model";
import Movie from "./movie.model";
import GenreMovie from "./genre.movie.model";

@Table({
  tableName: "genres",
  paranoid: true,
  timestamps: true,
})
class Genre extends Model {
  @Unique @AllowNull(false) @NotEmpty @Column declare name: string;

  @ForeignKey(() => User)
  @Column
  declare creatorId: number;
  @BelongsTo(() => User)
  // @Column
  // declare creator: User;
  @BelongsToMany(() => Movie, () => GenreMovie)
  // movies: Movie[] = [];
  public static async doesGenreExists(name: string) {
    const count = await this.count({ where: { name } });
    return count > 0;
  }

  public get sanitize() {
    return {
      id: this.id,
      name: this.name,
      creatorId: this.creatorId,
    };
  }
}

export default Genre;
