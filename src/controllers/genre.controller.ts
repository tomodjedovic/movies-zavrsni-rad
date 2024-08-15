import { Request, Response } from "express";
import Genre from "../models/genre.model";
import { verify } from "jsonwebtoken";
import { getTokenKey } from "../middlewares/auth.middlewares";
import { AuthRequest } from "../types/express.types";
import { TypeUser } from "../types/user.types";
import { Op, where } from "sequelize";

export async function createGenre(req: AuthRequest, res: Response) {
  try {
    const { name } = req.body;
    // const token = req.headers.authorization;
    // if (!token) {
    //   return res.status(401).json({ message: "unauthorized, mising token" });
    // }
    // const payload = verify(token.replace("Bearer ", ""), getTokenKey());
    // if (!payload)
    //   return res.status(401).json({ message: "unauthorized,error " });
    // req.user = payload as TypeUser;

    const genre = await Genre.create({
      name: name,
      // creatorId: req.user.id,
    });

    if (!genre)
      return res
        .status(400)
        .json({ message: "Error while creating genre,please try again" });

    return res.status(201).json({ ...genre.sanitize });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllGenres(req: Request, res: Response) {
  try {
    const { skip, take, search } = req.query;
    let takeGenres = 10;
    if (take && !isNaN(Number(take))) takeGenres = Number(take);

    let skipGenres = 0;
    if (skip && !isNaN(Number(skip))) skipGenres = Number(skip);

    let where = {};
    if (search) {
      where = {
        [Op.or]: {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
      };
    }

    const genres = await Genre.findAll({
      attributes: ["id", "name", "creatorId"],
      limit: takeGenres,
      offset: skipGenres,
      where,
    });
    return res.json({ data: genres });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getGenreBuId(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id, {
      attributes: ["id", "name", "creatorId"],
    });
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    return res.json(genre.sanitize);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteGenre(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const genre = Genre.findByPk(id);
    // const token = req.headers.authorization;
    // if (!token) {
    //   return res.status(401).json({ message: "unauthorized, mising token" });
    // }
    // const payload = verify(token.replace("Bearer ", ""), getTokenKey());
    // if (!payload)
    //   return res.status(401).json({ message: "unauthorized,error " });
    // req.user = payload as TypeUser;

    // if (genre.creatorId !== req.user.id) {
    //   return res.status(400).json({ message: "no credentails for deleting" });
    // }
    const deletedGenre = await Genre.destroy({ where: { id } });
    if (!deletedGenre)
      return res.status(404).json({ message: "genre not found" });
    return res
      .status(200)
      .json({ message: `movie with id ${id} deleted sucsessfuly` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateGenre(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ message: "genre not found" });
    }
    // const token = req.headers.authorization;

    // if (!token) {
    //   return res.status(401).json({ message: "unauthorized, mising token" });
    // }
    // const payload = verify(token.replace("Bearer ", ""), getTokenKey());
    // if (!payload)
    //   return res.status(401).json({ message: "unauthorized,error " });
    // req.user = payload as TypeUser;

    // if (genre.creatorId !== req.user.id) {
    //   return res.status(400).json({ message: "no credentails for updating" });
    // }
    if (name) genre.name = name;

    await genre.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}
