import React from "react";
import IntensityBarChart from "./charts/IntensityBarChart";
import LikelihoodByTopicChart from "./charts/LikelihoodChart";
import RelevanceByRegionChart from "./charts/RelevanceByRegionChart";
import RegionPieChart from "./charts/RegionPieChart";
import CountryChoropleth from "./charts/CountryChart";
import TopicBarChart from "./charts/TopicChart";
import AreaChartByYear from "./charts/YearChart";

export default function Card({ data }) {
  return (
    <>
      <div className="flex justify-center gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 space-y-4">
          <div>
            <h1 className="font-semibold">Intensity by Sector</h1>
            <p className="text-gray-500">
              Distribution of intensity values across different sectors
            </p>
          </div>
          <div>
            <IntensityBarChart data={data} />
          </div>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 space-y-4">
          <div>
            <h1 className="font-semibold">Likelihood by Topic</h1>
            <p className="text-gray-500">
              Distribution of likelihood values across various topics
            </p>
          </div>
          <div>
            <LikelihoodByTopicChart data={data} />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 space-y-4">
          <div>
            <h1 className="font-semibold">Relevance by Region</h1>
            <p className="text-gray-500">
              Relevance scores visualized by global regions
            </p>
          </div>
          <div>
            <RelevanceByRegionChart data={data} />
          </div>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 space-y-4">
          <div>
            <h1 className="font-semibold">
              Country by Intensity, Relevance, or Likelihood
            </h1>
            <p className="text-gray-500">
              Choropleth view of countries by intensity, relevance, or
              likelihood
            </p>
          </div>
          <div>
            <CountryChoropleth data={data} />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 space-y-4">
          <div>
            <h1 className="font-semibold">Topic by Year</h1>
            <p className="text-gray-500">Frequency of topics over the years</p>
          </div>
          <div>
            <TopicBarChart data={data} />
          </div>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 space-y-4">
          <div>
            <h1 className="font-semibold">Year by Intensity</h1>
            <p className="text-gray-500">
              Trend of intensity values over different years
            </p>
          </div>
          <div>
            <AreaChartByYear data={data} />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 space-y-4">
          <div>
            <h1 className="font-semibold">Region</h1>
            <p className="text-gray-500">
              Pie chart representation of all regions
            </p>
          </div>
          <div>
            <RegionPieChart data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
