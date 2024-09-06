import React from "react";

const CommunityMenu = () => {
  return (
    <div className="absolute top-full transition-all duration-500 w-full">
      <div className="mt-4 p-2 bg-white text-foreground border rounded-md shadow-md w-fit">
        <div className="flex flex-col gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-2 flex items-center gap-4 cursor-pointer hover:bg-gray-50 rounded-md transition-all duration-300"
            >
              <div className={`p-2 rounded ${item.bgColor}`}>{item.icon}</div>
              <div className="flex flex-col items-start gap-1">
                <h1 className="text-sm">{item.title}</h1>
                <p className="text-xs text-foreground/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityMenu;

const items = [
  {
    icon: "🎙️",
    title: "Discussions",
    description: "Ask questions, find support, and connect",
    bgColor: "bg-blue-100",
  },
  {
    icon: "✏️",
    title: "Stories",
    description: "Tech news, interviews and tips from makers",
    bgColor: "bg-red-100",
  },
  {
    icon: "🔥",
    title: "Visit Streaks",
    description: "The most active community members",
    bgColor: "bg-green-100",
  },
];
