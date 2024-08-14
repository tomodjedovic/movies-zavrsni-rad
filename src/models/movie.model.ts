import {
  Model,
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  NotEmpty,
  Table,
  Unique,
  BelongsToMany,
} from "sequelize-typescript";
import User from "./user.model";
import Genre from "./genre.model";
import GenreMovie from "./genre.movie.model";

@Table({
  tableName: "movies",
  paranoid: true,
  timestamps: true,
})
class Movie extends Model {
  @Unique @AllowNull(false) @NotEmpty @Column declare title: string;
  @AllowNull(false) @NotEmpty @Column declare release_date: Date;
  @AllowNull(false) @NotEmpty @Column declare user_score: number;
  @AllowNull(false) @NotEmpty @Column declare description: string;
  @AllowNull(false) @NotEmpty @Column declare image: string;
  @AllowNull(false) @NotEmpty @Column declare trailer: string;
  @AllowNull(false) @NotEmpty @Column declare director: string;
  @AllowNull(false) @NotEmpty @Column declare duration: string;
  @ForeignKey(() => User)
  @AllowNull(false)
  @NotEmpty
  @Column
  declare creatorId: number;
  @BelongsTo(() => User)
  // @Column
  // declare creator: User;
  // @BelongsToMany(() => Genre, () => GenreMovie)
  // movieGenres: Genre[] = [];
  public static async doesMovieExists(title: string) {
    const count = await this.count({ where: { title } });
    return count > 0;
  }

  public get sanitize() {
    return {
      id: this.id,
      title: this.title,
      release_date: this.release_date,
      user_scor: this.user_score,
      description: this.description,
      image: this.image,
      trailer: this.trailer,
      director: this.director,
      duration: this.duration,
      creatorId: this.creatorId,
    };
  }
}

export default Movie;
