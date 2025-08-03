import React, { useState } from "react";
import {
  ChartColumnDecreasing,
  Package,
  TrendingDown,
  Users,
  X,
} from "lucide-react";
// import NetMovementAnalysis from "./Analysis";

export default function Metrics({ averages, total }) {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Opening Balance */}
      <div className="bg-white p-6  space-y-2 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
        <h1 className="font-semibold ">Average Intensity</h1>
        <div>
          <p className="font-bold text-lg">
            {averages?.intensity !== undefined
              ? averages.intensity.toFixed(1)
              : "N/A"}
          </p>
          <p className="text-gray-500 text-sm">Mean intensity score</p>
        </div>
      </div>
      <div className="bg-white p-6  space-y-2 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
        <h1 className="font-semibold ">Average Likelihood</h1>
        <div>
          <p className="font-bold text-lg">
            {averages?.likelihood !== undefined
              ? averages.likelihood.toFixed(1)
              : "N/A"}
          </p>
          <p className="text-gray-500 text-sm">Mean likelihood</p>
        </div>
      </div>
      <div className="bg-white p-6  space-y-2 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
        <h1 className="font-semibold ">Average Relevance</h1>
        <div>
          <p className="font-bold text-lg">
            {averages?.relevance !== undefined
              ? averages.relevance.toFixed(1)
              : "N/A"}
          </p>
          <p className="text-gray-500 text-sm">Mean relevance score</p>
        </div>
      </div>
      <div className="bg-white p-6  space-y-2 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
        <h1 className="font-semibold ">Total Records</h1>
        <div>
          <p className="font-bold text-lg">{total ? total : "N/A"}</p>
          <p className="text-gray-500 text-sm">Filtered dataset size</p>
        </div>
      </div>
    </div>
  );
}
