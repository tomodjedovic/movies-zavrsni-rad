import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getTokenKey } from "../middlewares/auth.middlewares";
import Movie from "../models/movie.model";
import { AuthRequest } from "../types/express.types";
import { TypeUser } from "../types/user.types";
import { Op } from "sequelize";
import GenreMovie from "../models/genre.movie.model";

export async function createMovie(req: AuthRequest, res: Response) {
  try {
    const {
      title,
      release_date,
      user_score,
      description,
      image,
      trailer,
      director,
      duration,
      genreId,
    } = req.body;
    // const token = req.headers.authorization;
    // if (!token) {
    //   return res.status(401).json({ message: "unauthorized, mising token" });
    // }
    // const payload = verify(token.replace("Bearer ", ""), getTokenKey());
    // if (!payload)
    //   return res.status(401).json({ message: "unauthorized,error " });
    // req.user = payload as TypeUser;

    const movie = await Movie.create({
      title,
      release_date,
      user_score,
      description,
      image,
      trailer,
      director,
      duration,
      // creatorId: req.user.id,
    });
    if (!movie) {
      return res
        .status(400)
        .json({ message: "error while creating movie. Please try again" });
    }
    if (genreId) {
      const genreMovie = await GenreMovie.create({
        movieId: movie.id,
        genreId: genreId,
      });
    }
    return res.status(201).json(movie.sanitize);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getMovies(req: Request, res: Response) {
  try {
    const { skip, take, search } = req.query;
    let takeMovies = 10;
    if (take && !isNaN(Number(take))) takeMovies = Number(take);

    let skipMovies = 0;
    if (skip && !isNaN(Number(skip))) skipMovies = Number(skip);

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

    const movies = await Movie.findAll({
      attributes: [
        "id",
        "title",
        "release_date",
        "user_score",
        "description",
        "image",
        "trailer",
        "director",
        "duration",
        "creatorId",
      ],
      limit: takeMovies,
      offset: skipMovies,
      where,
    });

    return res.json({ data: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getMovie(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id, {
      attributes: [
        "id",
        "title",
        "release_date",
        "user_score",
        "description",
        "image",
        "trailer",
        "director",
        "duration",
        "creatorId",
      ],
    });
    if (!movie) {
      return res.status(404).json({ message: "movie not found" });
    }
    return res.json(movie.sanitize);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteMovie(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    // const token = req.headers.authorization;
    // if (!token) {
    //   return res.status(401).json({ message: "unauthorized, mising token" });
    // }
    // const payload = verify(token.replace("Bearer ", ""), getTokenKey());
    // if (!payload)
    //   return res.status(401).json({ message: "unauthorized,error " });
    // req.user = payload as TypeUser;

    // if (movie.creatorId !== req.user.id) {
    //   return res.status(400).json({ message: "no credentails for deleting" });
    // }
    const deletedMovie = await Movie.destroy({ where: { id } });
    if (!deleteMovie)
      return res.status(404).json({ message: "movie not found" });
    return res.status(200).json({ message: `movie deleted sucsessfuly` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateMovie(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const {
      title,
      release_date,
      user_score,
      description,
      image,
      treiler,
      director,
      duration,
    } = req.body;

    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: "movie not found" });
    }
    // const token = req.headers.authorization;

    // if (!token) {
    //   return res.status(401).json({ message: "unauthorized, mising token" });
    // }
    // const payload = verify(token.replace("Bearer ", ""), getTokenKey());
    // if (!payload)
    //   return res.status(401).json({ message: "unauthorized,error " });
    // req.user = payload as TypeUser;

    // if (movie.creatorId !== req.user.id) {
    //   return res.status(400).json({ message: "no credentails for updating" });
    // }
    if (title) movie.title = title;
    if (release_date) movie.release_date = release_date;
    if (user_score) movie.user_score = user_score;
    if (description) movie.description = description;
    if (image) movie.image = image;
    if (treiler) movie.trailer = treiler;
    if (director) movie.director = director;
    if (duration) movie.duration = duration;
    await movie.save();
    return res.status(200).json({ message: "movie updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
}
