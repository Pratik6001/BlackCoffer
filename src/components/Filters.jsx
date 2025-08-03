import React, { useState, useEffect } from "react";
import { Funnel } from "lucide-react";

export default function FiltersAndControls({ data, setQuery }) {
  const { country, end_year, pestle, region, sector, source, topic } = data;

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [selectedPestle, setSelectedPestle] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  // Initialize date to today's date
  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];
    // setDate(formatted);
  }, []);

  // Filter values with query
  useEffect(() => {
    setQuery({
      country: selectedCountry,
      end_year: selectedEndYear,
      pestle: selectedPestle,
      region: selectedRegion,
      sector: selectedSector,
      source: selectedSource,
      topic: selectedTopic,
    });
  }, [
    selectedCountry,
    selectedEndYear,
    selectedPestle,
    selectedRegion,
    selectedSource,
    selectedTopic,
    selectedSector,
  ]);

  // Reset all filters
  const handleReset = () => {
    setSelectedCountry("");
    setSelectedEndYear("");
    setSelectedPestle("");
    setSelectedRegion("");
    setSelectedSector("");
    setSelectedSource("");
    setSelectedTopic("");
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        <div className="py-2 space-y-2 flex justify-between items-center">
          <h1 className="flex gap-2 items-center text-lg sm:text-xl font-semibold">
            <Funnel className="w-6 h-6" />
            Filters
          </h1>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {/* End Year */}
          <div>
            <label
              htmlFor="endyear"
              className="font-semibold block text-gray-700 mb-2"
            >
              End Year
            </label>
            <select
              id="endyear"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedEndYear}
              onChange={(e) => setSelectedEndYear(e.target.value)}
            >
              <option value="">Select year</option>
              {end_year?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Sector */}
          <div>
            <label
              htmlFor="sector"
              className="font-semibold block text-gray-700 mb-2"
            >
              Sector
            </label>
            <select
              id="sector"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
            >
              <option value="">Select sector</option>
              {sector?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div>
            <label
              htmlFor="topic"
              className="font-semibold block text-gray-700 mb-2"
            >
              Topic
            </label>
            <select
              id="topic"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">Select topic</option>
              {topic?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div>
            <label
              htmlFor="region"
              className="font-semibold block text-gray-700 mb-2"
            >
              Region
            </label>
            <select
              id="region"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">Select region</option>
              {region?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="font-semibold block text-gray-700 mb-2"
            >
              Country
            </label>
            <select
              id="country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select country</option>
              {country?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Source */}
          <div>
            <label
              htmlFor="source"
              className="font-semibold block text-gray-700 mb-2"
            >
              Source
            </label>
            <select
              id="source"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              <option value="">Select source</option>
              {source?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* PESTLE */}
          <div>
            <label
              htmlFor="pestle"
              className="font-semibold block text-gray-700 mb-2"
            >
              PESTLE
            </label>
            <select
              id="pestle"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPestle}
              onChange={(e) => setSelectedPestle(e.target.value)}
            >
              <option value="">Select PESTLE</option>
              {pestle?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
