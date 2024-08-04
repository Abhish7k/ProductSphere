import React from "react";

const LaunchesMenu = () => {
  return (
    <div className="absolute top-full transition-all duration-500">
      <div className="mt-4 p-2 bg-white text-foreground border rounded-md shadow-md">
        <div className="flex flex-col gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-2 flex items-center gap-4 cursor-pointer hover:bg-gray-50 rounded-md transition-all duration-300 "
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

export default LaunchesMenu;

const items = [
  {
    icon: "🗓️",
    title: "Coming Soon",
    description: " Check out launches that are coming soon",
    bgColor: "bg-green-100",
  },
  {
    icon: "🔮",
    title: "Launch archive",
    description: " Most-loved launches by the community",
    bgColor: "bg-orange-100",
  },
  {
    icon: "🧭",
    title: "Launch Guide",
    description: "Checklist and pro tips for launching",
    bgColor: "bg-blue-100",
  },
];
