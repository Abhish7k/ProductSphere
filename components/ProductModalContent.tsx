"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PiCaretUpFill,
  PiChatCircle,
  PiTrash,
  PiUploadSimple,
} from "react-icons/pi";
import CarouselComponent from "./CarouselComponent";
import { AvatarFallback, AvatarImage, AvatarShadcn } from "./ui/avatar";
import Avvvatars from "avvvatars-react";
import React, { useState } from "react";
import ShareModal from "./ui/modal/ShareProductModal";
import ShareModalContent from "./ShareProductModalContent";
import { commentOnProduct, deleteComment, upvoteProduct } from "@/lib/actions";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { FaCheck, FaExclamation } from "react-icons/fa";
import Modal from "./ui/modal/modal";
import AuthContent from "./navbar/AuthContent";

interface ProductModalContentProps {
  currentProduct: any;
  authenticatedUser: any;
  totalUpvotes: number;
  hasUpvoted: boolean;
  setTotalUpvotes: any;
  setHasUpvoted: any;
}

const ProductModalContent = ({
  currentProduct,
  authenticatedUser,
  totalUpvotes,
  hasUpvoted,
  setTotalUpvotes,
  setHasUpvoted,
}: ProductModalContentProps) => {
  const [shareModalModalVisible, setShareModalVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(currentProduct.commentData || []);

  const handleUpvoteClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (!authenticatedUser) {
      toast(
        <>
          <div className="flex items-center gap-4 mx-auto w-full">
            <FaExclamation className="text-red-500 text-xl" />

            <div className="text-md font-semibold">
              Please Sign in to upvote products.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );

      setShowLoginModal(true);
    }

    try {
      await upvoteProduct(currentProduct.id);

      setTotalUpvotes(hasUpvoted ? totalUpvotes - 1 : totalUpvotes + 1);

      setHasUpvoted(!hasUpvoted);

      toast(
        <>
          <div className="flex items-center gap-4 mx-auto w-full">
            <FaCheck className="text-green-500 text-xl" />

            <div className="text-md font-semibold">Product upvoted.</div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
    } catch (error) {
      console.log("Error while upvoting product:", error);
    }
  };

  const handleShareClick = () => {
    setShareModalVisible(true);
  };

  const handleCommentChange = (event: any) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      // call comment server action
      await commentOnProduct(currentProduct.id, commentText);

      // reset the comment textarea
      setCommentText("");

      setComments([
        ...comments,
        {
          user: authenticatedUser.user.name,
          body: commentText,
          profile: authenticatedUser.user.image,
          userId: authenticatedUser.user.id,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      // call delete comment server action
      await deleteComment(commentId);

      // remove the comment from the section
      setComments(comments.filter((comment: any) => comment.id !== commentId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full">
      <div className="md:w-[90%] mx-auto">
        <Image
          src={currentProduct.logo}
          alt="logo"
          width={200}
          height={200}
          className="h-20 w-20 border rounded-md bg-white shadow-md"
        />

        <div className="py-5 space-y-2">
          <h1 className="text-3xl font-semibold capitalize -mb-5">
            {currentProduct.name}
          </h1>

          <div className="md:flex md:justify-between items-center">
            <p className="text-gray-600 text-xl font-light md:w-3/5">
              {currentProduct.headline}
            </p>

            <div className="flex items-center gap-2 pt-4">
              <a
                href={currentProduct.website}
                target="_blank"
                className="border rounded-md flex justify-center items-center py-3 px-8 cursor-pointer hover:bg-neutral-50 transition-all duration-300 active:scale-90"
              >
                Visit
              </a>

              <button
                className={`rounded-md flex justify-center items-center px-8 py-3 gap-x-3 cursor-pointer bg-gradient-to-r w-full active:scale-90
                ${
                  hasUpvoted
                    ? "border border-indigo-500 hover:bg-indigo-50 transition-all"
                    : "text-black border hover:bg-indigo-50 transition-all duration-300"
                }`}
                onClick={handleUpvoteClick}
              >
                <PiCaretUpFill
                  className={`text-xl ${
                    hasUpvoted ? "text-indigo-500" : "text-black"
                  }`}
                />
                Upvote {totalUpvotes}
              </button>
            </div>
          </div>

          <h2 className="text-gray-600 py-10">{currentProduct.description}</h2>

          <div className="md:flex justify-between items-center pb-10">
            <div className="flex gap-x-2">
              {currentProduct.categories.map((category: any) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="bg-foreground/5 text-gray-600 px-4 py-2 text-xs md:text-sm lg:text-base font-medium rounded-md cursor-pointer hover:bg-foreground/10 transition-all duration-300 overflow-hidden h-fit active:scale-90"
                >
                  {category}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-x-6 py-4">
              <div
                onClick={handleShareClick}
                className="text-md text-foreground/70 font-medium flex items-center gap-x-1 cursor-pointer hover:text-foreground/90 transition-all duration-300"
              >
                <PiUploadSimple />
                <p>Share</p>
              </div>
            </div>
          </div>

          <CarouselComponent productImages={currentProduct.images} />

          <div className="py-10 ">
            <h1 className="font-semibold py-10">Community Feedback</h1>

            <div className="border-t border-b py-2">
              <div className="w-full flex items-center gap-4">
                <AvatarShadcn>
                  {authenticatedUser ? (
                    <>
                      <AvatarImage src={authenticatedUser.user.image} />

                      <AvatarFallback>
                        <Avvvatars value={authenticatedUser.user.email} />
                      </AvatarFallback>
                    </>
                  ) : (
                    <Avvvatars style="shape" value={currentProduct.name} />
                  )}
                </AvatarShadcn>

                <textarea
                  value={commentText}
                  onChange={handleCommentChange}
                  placeholder="What do you think about this product?"
                  className="w-full rounded-md p-4 focus:outline-none text-gray-600 placeholder:text-sm hidden md:block"
                  rows={1}
                />

                <textarea
                  value={commentText}
                  onChange={handleCommentChange}
                  placeholder="What do you think about this product?"
                  className="w-full rounded-md p-4 focus:outline-none text-gray-600 placeholder:text-sm block md:hidden"
                  rows={2}
                />
              </div>

              <div className="flex justify-end mt-4">
                {authenticatedUser ? (
                  <button
                    onClick={handleCommentSubmit}
                    className="px-3 py-2 text-sm text-foreground/80 border hover:border-[#ff6154] rounded-md transition-all duration-300 active:scale-90"
                  >
                    Comment
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-3 py-2 text-sm text-foreground/80 border hover:border-[#ff6154] rounded-md transition-all duration-300 active:scale-90"
                  >
                    Sign in to comment
                  </button>
                )}
              </div>
            </div>

            <div className="py-10 space-y-8">
              {comments.map((comment: any, idx: string) => (
                <div key={idx} className="flex gap-4">
                  <AvatarShadcn className="w-8 h-8">
                    <AvatarImage src={comment.profile} />

                    <AvatarFallback>
                      <Avvvatars value={comment.name} />
                    </AvatarFallback>
                  </AvatarShadcn>

                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col sm:flex-row gap-x-2 items-start sm:items-center transition-all">
                        <div className="flex gap-x-2">
                          <h1 className="text-gray-600 font-semibold cursor-pointer">
                            {comment.user}
                          </h1>
                          {comment.userId === currentProduct.userId && (
                            <Badge className="bg-[#88aaff] text-xs hover:bg-[#88aaff] px-2 py-0">
                              Creator
                            </Badge>
                          )}
                        </div>

                        <div className="text-gray-500 text-xs">
                          {new Date(comment.timestamp).toDateString()}
                        </div>
                      </div>

                      {(comment.userId === authenticatedUser?.user?.id ||
                        currentProduct.userId ===
                          authenticatedUser?.user?.id) && (
                        <PiTrash
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 hover:cursor-pointer"
                        />
                      )}
                    </div>

                    <div className="text-gray-600 text-sm mt-2">
                      {comment.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        visible={shareModalModalVisible}
        setVisible={setShareModalVisible}
      >
        <ShareModalContent currentProduct={currentProduct} />
      </ShareModal>

      <Modal visible={showLoginModal} setVisible={setShowLoginModal}>
        <AuthContent />
      </Modal>
    </div>
  );
};

export default ProductModalContent;
