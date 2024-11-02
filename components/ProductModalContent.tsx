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
import { useState } from "react";
import ShareModal from "./ui/modal/ShareProductModal";
import ShareModalContent from "./ShareProductModalContent";
import { commentOnProduct } from "@/lib/actions";
import { Badge } from "./ui/badge";

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

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(currentProduct.commentData || []);

  const handleUpvoteClick = () => {
    // hasUpvoted = true;
  };

  const handleShareClick = () => {
    setShareModalVisible(true);
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

  const handleCommentChange = (event: any) => {
    setCommentText(event.target.value);
  };

  console.log(currentProduct.commentData);

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
          <h1 className="text-3xl font-semibold capitalize">
            {currentProduct.name}
          </h1>

          <div className="md:flex md:justify-between items-center">
            <p className="text-gray-600 text-xl font-light md:w-3/5">
              {currentProduct.headline}
            </p>

            <div className="flex items-center gap-2 pt-4">
              <button
                onClick={() => window.open(currentProduct.website, "_blank")}
                className="border rounded-md flex justify-center items-center py-5 px-8 cursor-pointer
                hover:bg-foreground/5 transition-all duration-300
                "
              >
                Visit
              </button>

              <button
                className={`rounded-md flex justify-center items-center p-5 gap-x-3 cursor-pointer bg-gradient-to-r w-full xl:w-56
                ${
                  hasUpvoted
                    ? "from-[#ff6154] to-[#ff4582] border-[#ff6154] text-white"
                    : "text-black border hover:bg-red-100 transition-all duration-300"
                }`}
                onClick={handleUpvoteClick}
              >
                <PiCaretUpFill
                  className={`text-xl ${
                    hasUpvoted ? "text-white" : "text-black"
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
                  className="bg-foreground/5 text-gray-600 px-4 py-2 text-xs md:text-sm lg:text-base font-medium rounded-md cursor-pointer hover:bg-foreground/10 transition-all duration-300 overflow-hidden h-fit"
                >
                  {category}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-x-6 py-4">
              <div className="text-md text-foreground/70 font-medium flex items-center gap-x-1 cursor-pointer hover:text-foreground/90 transition-all duration-300">
                <PiChatCircle />
                <p>Discuss</p>
              </div>

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
                  <AvatarImage src={authenticatedUser.user.image} />

                  <AvatarFallback>
                    <Avvvatars value={authenticatedUser.user.email} />
                  </AvatarFallback>
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
                <button
                  onClick={handleCommentSubmit}
                  className="px-3 py-2 text-sm text-foreground/80 border hover:border-[#ff6154] rounded-md transition-all duration-300"
                >
                  Comment
                </button>
              </div>
            </div>

            <div className="py-10 space-y-8">
              {comments.map((comment: any) => (
                <div key={comment.id} className="flex gap-4">
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
                          // onClick={() => handleDeleteComment(comment.id)}
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
    </div>
  );
};

export default ProductModalContent;
