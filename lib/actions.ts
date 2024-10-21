"use server";

import { auth } from "@/auth";
import { db } from "./db";

interface ProductData {
  name: string;
  slug: string;
  headline: string;
  description: string;
  logo: string;
  releaseDate: string;
  website: string;
  twitter: string;
  instagram: string;
  images: string[];
  category: string[];
  rank?: number;
}

export const createProduct = async ({
  name,
  slug,
  headline,
  description,
  logo,
  releaseDate,
  website,
  twitter,
  instagram,
  images,
  category,
}: ProductData): Promise<any> => {
  try {
    const authenticatedUser = await auth();

    if (!authenticatedUser) {
      throw new Error("You must be signed in to submit a Product");
    }

    const userId = authenticatedUser.user?.id;

    const product = await db.product.create({
      data: {
        name,
        rank: 0,
        slug,
        headline,
        description,
        logo,
        releaseDate,
        website,
        twitter,
        instagram,
        status: "PENDING",

        categories: {
          connectOrCreate: category.map((name) => ({
            where: {
              name,
            },
            create: {
              name,
            },
          })),
        },

        images: {
          createMany: {
            data: images.map((image) => ({ url: image })),
          },
        },

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateProduct = async (
  productId: string,
  {
    name,
    slug,
    headline,
    description,
    logo,
    releaseDate,
    website,
    twitter,
    instagram,
    images,
  }: ProductData
) => {
  try {
    const authenticatedUser = await auth();

    if (!authenticatedUser) {
      throw new Error("You must be signed in to update a product");
    }

    const userId = authenticatedUser.user?.id;

    const existingProduct = await db.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    if (existingProduct.userId !== userId) {
      throw new Error("You don't have permission to update this product");
    }

    const updatedProduct = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        slug,
        headline,
        description,
        logo,
        releaseDate,
        website,
        twitter,
        instagram,

        // Update images only if provided
        images:
          images.length > 0
            ? {
                deleteMany: {
                  productId, // Delete all existing images related to the product
                },
                createMany: {
                  data: images.map((image) => ({ url: image })),
                },
              }
            : undefined, // If no new images, skip this part
        status: "PENDING",
      },
    });

    return updatedProduct;
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw new Error(
      error.message || "Something went wrong while updating the product"
    );
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const authenticatedUser = await auth();

    if (!authenticatedUser) {
      throw new Error("You must be signed in to delete a product");
    }

    if (!authenticatedUser.user || !authenticatedUser.user.id) {
      throw new Error("User Id is missing or invalid");
    }

    const userId = authenticatedUser.user?.id;

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.userId !== userId) {
      throw new Error("You don't have permission to delete this product");
    }

    await db.product.delete({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    return true;
  } catch (error: any) {
    console.error("Error updating product:", error);
    throw new Error(
      error.message || "Something went wrong while updating the product"
    );
  }
};

export const getOwnerProducts = async () => {
  try {
    const authenticatedUser = await auth();

    if (!authenticatedUser) {
      return [];
    }

    const userId = authenticatedUser.user?.id;

    const products = await db.product.findMany({
      where: {
        userId: userId,
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching owner products:", error);
    return [];
  }
};

export const getProductById = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        categories: true,
        images: true,
      },
    });

    return product;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const users = await db.user.findMany();

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
};

export const getPendingProducts = async () => {
  try {
    const pendingProducts = await db.product.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        categories: true,
        images: true,
      },

      // get the most recent first
      orderBy: {
        createdAt: "desc",
      },
    });

    return pendingProducts;
  } catch (error) {
    console.error("Error fetching pending products:", error);
    throw new Error("Could not fetch pending products");
  }
};

export const getActiveProducts = async () => {
  try {
    const activeProducts = await db.product.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        categories: true,
        images: true,
      },

      //
      orderBy: {
        createdAt: "desc",
      },
    });

    return activeProducts;
  } catch (error) {
    console.log("Error fetching active products:", error);
    throw new Error("Could not fetch active products");
  }
};

export const getRejectedProducts = async () => {
  try {
    const rejectedProducts = await db.product.findMany({
      where: {
        status: "REJECTED",
      },
      include: {
        categories: true,
        images: true,
      },

      //
      orderBy: {
        createdAt: "desc",
      },
    });

    return rejectedProducts;
  } catch (error) {
    console.log("Error fetching active products:", error);
    throw new Error("Could not fetch active products");
  }
};

export const getTotalUpvotesCount = async () => {
  try {
    const totalUpvotes = await db.upvote.count({
      where: {
        product: {
          status: "ACTIVE",
        },
      },
    });

    return totalUpvotes;
  } catch (error) {
    console.log("Error fetching total upvotes:", error);
    throw new Error("Could not fetch total upvotes");
  }
};
