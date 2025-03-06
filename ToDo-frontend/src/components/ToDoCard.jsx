import { useState } from "react";



const ReadMore = ({ text, maxLength = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= maxLength) return <p className="text-black">{text}</p>;

  return (
    <p className="text-black">
      {expanded ? text : `${text.slice(0, maxLength)}... `}
      <span
        onClick={() => setExpanded(!expanded)}
        className="text-gray-500 hover:underline cursor-pointer"
      >
        {expanded ? "See Less" : "See More"}
      </span>
    </p>
  );
};

const ToDoCard = ({ task, onComplete }) => {
  return (
    <div
      className="bg-gray-300 p-4 rounded-lg flex flex-col sm:flex-row justify-between shadow-md w-full 
      transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      {/* Task Info */}
      <div className="flex-1">
        <h3 className="font-bold text-black truncate">{task.title}</h3>
        <ReadMore text={task.description} />
      </div>

      {/* Done Button */}
      <button
        onClick={onComplete}
        className="border border-black px-3 py-1 rounded-md hover:bg-gray-400 transition duration-200 
        mt-2 sm:mt-0 self-end sm:self-center"
      >
        Done
      </button>
    </div>
  );
};

export default ToDoCard;
