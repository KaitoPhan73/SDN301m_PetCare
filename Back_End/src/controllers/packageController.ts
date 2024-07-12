import {Request, Response} from "express";
import {Package} from "../models";
import {TPagination} from "../types/pagination";
import {IPackage} from "../types/package";
import {getAll, getOne, insertOne, updateOne,} from "../services/packageService";

export module PackageController {
    export const getAllPackage = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;

            const {page: _, limit: __, ...otherQueries} = req.query;

            const options = {
                page,
                limit,
                ...otherQueries,
            };

            const result: TPagination<IPackage> = await getAll(options);

            res.status(200).json(result);
            return
        } catch (error) {
            res.status(500).json({message: "Package error"});
            return
        }
    };

    export const getPackageById = async (
        req: Request,
        res: Response
    ) => {
        try {
            const id = req.params.id.trim();
            const Package = await getOne(id);

            return res.status(200).json(Package);
        } catch (error) {
            console.error("Error fetching a Package", error);
            return res.status(500).json({message: "Server Error"});
        }
    };

    export const insertPackage = async (
        req: Request,
        res: Response
    ) => {
        try {
            const data: IPackage = req.body;
            const newPackage = await insertOne(data);

            res.status(201).json({
                message: "Creating new Package successfully",
                Package: newPackage,
            });
            return;
        } catch (error) {
            console.error("Error add new Package ", error);
            res.status(500).json({message: "Server Error"});
            return
        }
    };

    export const updatePackageById = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const id = req.params.id.trim();
            const updateData = req.body;

            const Package = await updateOne(id, updateData);

            if (Package !== null) {
                res.status(200).json({message: "Update Package successfully"});
            } else {
                res.status(404).json({message: "Package not found"});
            }
        } catch (error) {
            console.error("Error update a Package", error);
            res.status(500).json({message: "Server Error"});
        }
    };

    export const deletePackage = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const id = req.params.id.trim();
            const deletePackage = await Package.findByIdAndDelete(id);
            if (deletePackage !== null) {
                res.status(200).json({message: "Package deleted successfully"});
            } else {
                res.status(404).json({message: "Package not found"});
            }
        } catch (error) {
            console.error("Error deleting Package:", error);
            res.status(500).json({message: "Server error"});
        }
    };
}
