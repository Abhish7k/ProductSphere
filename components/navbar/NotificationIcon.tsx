import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { PiBell } from "react-icons/pi";

interface NotificationIconProps {
  notifications?: any;
}

const NotificationIcon: React.FC<NotificationIconProps> = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <PiBell className="text-gray-600 text-xl mt-2" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NotificationIcon;
