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

import Link from "next/link";
import { PiGear, PiHeart, PiPackage } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

import { unstable_noStore as noStore } from "next/cache";

interface AvatarProps {
  authenticatedUser?: any;
}

const Avatar: React.FC<AvatarProps> = ({ authenticatedUser }) => {
  noStore();

  const handleMyUpvotes = () => {
    window.location.href = "/my-upvoted";
  };

  return (
    <div className="mr-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <AvatarShadcn>
            <AvatarImage src={authenticatedUser.user.image} />

            <AvatarFallback>
              <Avvvatars value={authenticatedUser.user.email} />
            </AvatarFallback>
          </AvatarShadcn>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mr-10">
          <DropdownMenuLabel className="pl-2 pr-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium leading-none capitalize">
                {authenticatedUser.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground max-w-40 truncate">
                {authenticatedUser.user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

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

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <div onClick={() => signOut()} className="flex items-center gap-2">
              <IoLogOutOutline className="text-xl" />
              Log out
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Avatar;
