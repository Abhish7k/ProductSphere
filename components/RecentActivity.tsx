import Image from "next/image";
import React from "react";
import { AvatarFallback, AvatarImage, AvatarShadcn } from "./ui/avatar";
import Avvvatars from "avvvatars-react";

interface Props {
  users: any;
}

export const RecentActivity: React.FC<Props> = ({ users }) => {
  return (
    <div className="space-y-4">
      {users.map((user: any) => (
        <div key={user.id} className="flex items-center gap-x-6 w-full">
          <div className="text-2xl">🎉</div>

          <AvatarShadcn>
            <AvatarImage src={user.image} />

            <AvatarFallback>
              <Avvvatars value={user.email} />
            </AvatarFallback>
          </AvatarShadcn>

          <div className=" text-gray-500">{user.name} has joined</div>

          <div className="text-xs text-gray-800">
            {new Date(user.createdAt).toDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};
