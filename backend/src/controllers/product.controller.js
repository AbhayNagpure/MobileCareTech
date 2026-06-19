import {Product} from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {

    const product  = await Product.create(req.body);

    res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
})

export const getAllProducts = asyncHandler(async (req, res) => {
    let query = { isAvailable: true };
    
    if (req.query.category && req.query.category !== 'ALL') {
        query.category = req.query.category;
    }

    if (req.query.excludeCategory) {
        query.category = { $ne: req.query.excludeCategory };
    }

    if (req.query.search) {
        query.$or = [
            { name: { $regex: req.query.search, $options: 'i' } },
            { brand: { $regex: req.query.search, $options: 'i' } }
        ];
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort({createdAt: -1}).skip(startIndex).limit(limit);

    res.status(200).json(
        new ApiResponse(200, {
            products,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        }, "Products fetched successfully")
    );
});

export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if(!product){
        throw new ApiError(404, "Product not found");
    }

    res.status(200).json(
        new ApiResponse(200, product, "product fetched successfuly")
    )

})

export const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if(!product) {
        throw new ApiError(404, "product not found")
    }

    res.status(200).json(
        new ApiResponse(200, product, "Product updated successfully")
    );


})

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {isAvailable: false},
        {new: true}
    );

    if(!product){
        throw new ApiError(404, "product not found");
    }

    res.status(200).json(
        new ApiResponse(200, null, "product removed from store successfully")
    )
    

})