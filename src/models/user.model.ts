import {
  Column,
  Table,
  Model,
  Unique,
  AllowNull,
  NotEmpty,
  HasMany,
} from "sequelize-typescript";
import Movie from "./movie.model";

@Table({
  tableName: "users",
  paranoid: true,
  timestamps: true,
})
class User extends Model {
  @Unique @AllowNull(false) @NotEmpty @Column declare name: string;
  @AllowNull(false) @NotEmpty @Column declare password: string;
  @AllowNull(false) @NotEmpty @Column declare email: string;
  // @HasMany(() => Movie)
  // movies: Movie[]=[]

  public static async doesNameExists(name: string) {
    const count = await this.count({ where: { name } });
    return count > 0;
  }

  public get sanitize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}

export default User;
