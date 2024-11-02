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

export const isUserAdmin = async () => {
  const authenticatedUser = await auth();

  if (
    !authenticatedUser ||
    !authenticatedUser.user ||
    !authenticatedUser.user.id
  ) {
    return;
  }

  const userId = authenticatedUser.user.id;

  // get the user
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.isAdmin;
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
        comments: {
          include: {
            user: true,
          },
        },
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
  }
};

export const activateProduct = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.status === "ACTIVE") {
      throw new Error("Product is already active");
    }

    if (product.status !== "PENDING") {
      throw new Error(
        `Product is not in 'PENDING' status and cannot be activated`
      );
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        status: "ACTIVE",
      },
    });

    await db.notification.create({
      data: {
        userId: product.userId,
        body: `Your product ${product.name} has been activated`,
        type: "ACTIVATED",
        status: "UNREAD",
        profilePicture: product.logo,
        productId: product.id,
      },
    });

    return product;
  } catch (error: any) {
    console.error("Error activating product:", error);
    return null;
  }
};

export const rejectProduct = async (productId: string, reason: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.status === "REJECTED") {
      throw new Error("Product is already rejected");
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        status: "REJECTED",
      },
    });

    await db.notification.create({
      data: {
        userId: product.userId,
        body: `Your product ${product.name} has been rejected. Reason : ${reason}`,
        type: "ACTIVATED",
        status: "UNREAD",
        profilePicture: product.logo,
        productId: product.id,
      },
    });

    return product;
  } catch (error: any) {
    console.error("Error rejecting product:", error);
    return null;
  }
};

export const upvoteProduct = async (productId: string) => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User id is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    const upvote = await db.upvote.findFirst({
      where: {
        productId,
        userId,
      },
    });

    const profilePicture = authenticatedUser.user.image || "";

    if (upvote) {
      await db.upvote.delete({
        where: {
          id: upvote.id,
        },
      });
    } else {
      await db.upvote.create({
        data: {
          productId,
          userId,
        },
      });

      const productOwner = await db.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          userId: true,
        },
      });

      if (productOwner && productOwner.userId !== userId) {
        await db.notification.create({
          data: {
            userId: productOwner.userId,
            body: `Your product received an upvote`,
            profilePicture: profilePicture,
            productId: productId,
            type: "UPVOTE",
            status: "UNREAD",
          },
        });
      }
    }

    return true;
  } catch (error) {
    console.log("Error upvoting product", error);
    throw error;
  }
};

export const commentOnProduct = async (
  productId: string,
  commentText: string
) => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User Id is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    //
    const profilePicture = authenticatedUser.user.image || "";

    await db.comment.create({
      data: {
        createdAt: new Date(),
        productId,
        userId,
        body: commentText,
        profilePicture: profilePicture,
      },
      include: {
        user: true,
      },
    });

    const productDetails = await db.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        userId: true,
        name: true,
      },
    });

    if (productDetails && productDetails?.userId !== productId) {
      await db.notification.create({
        data: {
          userId: productDetails.userId,
          body: `Someone commented on your product "${productDetails.name}"`,
          profilePicture: profilePicture,
          productId: productId,
          type: "COMMENT",
          status: "UNREAD",
        },
      });
    }
  } catch (error) {
    console.log("Error commenting on product", error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });

    return true;
  } catch (error) {
    console.log("Error while deleting a comment", error);
    throw Error;
  }
};
