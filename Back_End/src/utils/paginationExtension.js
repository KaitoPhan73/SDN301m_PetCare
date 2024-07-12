"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters
}
function paginate(model, options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const page = (_a = options.page) !== null && _a !== void 0 ? _a : 1;
        const limit = (_b = options.limit) !== null && _b !== void 0 ? _b : 10;
        const { populate, minPrice, maxPrice } = options, restFilters = __rest(options, ["populate", "minPrice", "maxPrice"]);
        // Define filters using CustomFilters<T>
        const filters = Object.assign({}, restFilters);
        console.log("aacxcxc", filters);
        // Apply price range filters if minPrice or maxPrice are provided
        if (minPrice !== undefined || maxPrice !== undefined) {
            filters.price = {};
            if (minPrice !== undefined) {
                filters.price.$gte = minPrice;
            }
            if (maxPrice !== undefined) {
                filters.price.$lte = maxPrice;
            }
        }
        // Remove non-filter options from the query
        delete filters.page;
        delete filters.limit;
        delete filters.minPrice;
        delete filters.maxPrice;
        const filterObject = filters;
        for (const key in filterObject) {
            if (Object.prototype.hasOwnProperty.call(filterObject, key)) {
                // Convert "true" and "false" strings to boolean
                if (filterObject[key] === "true") {
                    filterObject[key] = true;
                }
                else if (filterObject[key] === "false") {
                    filterObject[key] = false;
                }
                // Apply regex for string values
                if (typeof filterObject[key] === "string") {
                    const escapedString = escapeRegExp(filterObject[key]);
                    filterObject[key] = { $regex: new RegExp(escapedString, "i") };
                }
            }
        }
        // Calculate number of documents to skip
        const skip = (page - 1) * limit;
        // Fetch items and total count in parallel
        const [items, total] = yield Promise.all([
            model
                .find(filters)
                .sort({ createdAt: -1 })
                .populate(populate instanceof Array ? populate : populate ? [populate] : [])
                .exec(),
            model.countDocuments(filters),
        ]);
        const paginatedItems = items.slice(skip, skip + limit);
        // Calculate total number of pages
        const totalPages = Math.ceil(total / limit);
        // Return paginated result
        return {
            items: paginatedItems,
            total,
            page,
            limit,
            totalPages,
        };
    });
}
exports.paginate = paginate;
