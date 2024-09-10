import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AvatarShadcn,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import Avvvatars from "avvvatars-react";

import Image from "next/image";
import Link from "next/link";
import { PiGear, PiHeart, PiPackage } from "react-icons/pi";
import { signOut } from "next-auth/react";

interface AvatarProps {
  authenticatedUser?: any;
}

const Avatar: React.FC<AvatarProps> = ({ authenticatedUser }) => {
  console.log(authenticatedUser);

  const handleMyUpvotes = () => {
    window.location.href = "/my-upvoted";
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <AvatarShadcn>
            <AvatarImage src={authenticatedUser.user.image} />

            <AvatarFallback>
              <Avvvatars value={authenticatedUser.user.email} />
            </AvatarFallback>
          </AvatarShadcn>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link
              href="/my-products"
              className="flex gap-x-2 rounded-sm w-full cursor-pointer"
            >
              <PiPackage className="text-xl" />
              My Products
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div
              onClick={handleMyUpvotes}
              className="flex gap-x-2 rounded-sm w-full cursor-pointer"
            >
              <PiHeart className="text-xl" />
              Upvoted
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href="/settings"
              className="flex gap-x-2 rounded-sm w-full cursor-pointer"
            >
              <PiGear className="text-xl" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div onClick={() => signOut()}>Log out</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Avatar;
