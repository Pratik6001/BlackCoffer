import React, { useEffect, useState } from "react";
import FiltersAndControls from "./Filters";
import Metrics from "./Metrics";
import Card from "./card";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [averages, setAverages] = useState({});
  const [selector, setSelector] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState({
    country: "",
    topic: "",
    region: "",
    sector: "",
    end_year: "",
    source: "",
    pestle: "",
  });
  console.log(query, "getting all the querys");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/data/unique-filters`
        );
        setSelector(response.data);
      } catch (error) {
        console.error("Error fetching unique filters:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchfilterdata = async () => {
      try {
        setError("");

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/data/filter-data`,
          {
            params: query,
            withCredentials: true,
          }
        );

        setData(response.data.data);
        setAverages(response.data.averages);

        if (response.data.message) {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching filtered data:", error);

        if (error.response && error.response.status === 404) {
          setError(
            error.response.data.message || "No data found for selected filters."
          );
          setData([]);
          setAverages({});
        } else {
          setError("Something went wrong. Please try again later.");
        }
      }
    };

    fetchfilterdata();
  }, [query]);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  console.log(error, "getting");

  const sampleData = [
    {
      start_year: 2017,
      intensity: 16,
      topic: "market",
      title: "...",
      relevance: 4,
      likelihood: 4,
    },
    {
      start_year: 2017,
      intensity: 5,
      topic: "policy",
      relevance: 2,
      likelihood: 2,
    },
    {
      start_year: 2018,
      intensity: 12,
      topic: "security",
      relevance: 3,
      likelihood: 2,
    },
  ];
  return (
    <div className="w-full flex justify-center gap-8 py-6">
      <div className="w-full grid gap-8">
        <FiltersAndControls data={selector} setQuery={setQuery} />
        {error && (
          <div className="bg-red-100 text-red-800 border border-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <Metrics averages={averages} total={data.length} />
        <Card data={data} />
      </div>
    </div>
  );
}
