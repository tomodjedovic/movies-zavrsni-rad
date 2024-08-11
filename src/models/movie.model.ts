import { Model } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  NotEmpty,
  Table,
  Unique,
} from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "movies",
  paranoid: true,
  timestamps: true,
})
class Movie extends Model {
  @Unique @AllowNull(false) @NotEmpty @Column declare title: string;
  @Column declare release_date: Date;
  @Column declare user_score: number;
  @AllowNull(false) @NotEmpty @Column declare description: string;
  @Column declare image: string;
  @Column declare trailer: string;
  @AllowNull(false) @NotEmpty @Column declare director: string;
  @Column declare duration: string;
  @ForeignKey(() => User)
  @Column
  declare creatorId: number;
  @BelongsTo(() => User)
  @Column
  declare creator: User;
}

export default Movie;
