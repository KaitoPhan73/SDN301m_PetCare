import { Request, Response } from "express";
import { Service } from "../models";
import { IService } from "../types/service";
import { TPagination } from "../types/pagination";
import {
  getAll,
  getOne,
  insertOne,
  updateOne,
} from "../services/serviceService";

export module ServiceController {
  export const getAllService = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const { page: _, limit: __, ...otherQueries } = req.query;

      const options = {
        page,
        limit,
        ...otherQueries,
      };

      const result: TPagination<IService> = await getAll(options);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Service error" });
    }
  };

  export const getServiceById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id.trim();
      const service = await getOne(id);

      res.status(200).json(service);
    } catch (error) {
      console.error("Error fetching a service", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  export const insertService = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { description, name, price, images } = req.body;

      const data: IService = new Service({
        description,
        name,
        price,
        images,
      });

      const newService = await insertOne(data);

      res.status(201).json({
        message: "Creating new service successfully",
        service: newService,
      });
    } catch (error) {
      console.error("Error add new service ", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  export const updateServiceById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id.trim();
      const updateData = req.body;

      const service = await updateOne(id, updateData);

      if (service !== null) {
        res.status(200).json({ message: "Update service successfully" });
      } else {
        res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      console.error("Error update a service", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  export const deleteService = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id.trim();
      const deleteService = await Service.findByIdAndDelete(id);
      if (deleteService !== null) {
        res.status(200).json({ message: "Service deleted successfully" });
      } else {
        res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      console.error("Error deleting Service:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
}
