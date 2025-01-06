import React from "react";
import "./FilterPanel.css";

import { FaHeart, FaList } from "react-icons/fa6";

interface FilterPanelProps {
  searchName: string;
  setSearchName: (value: string) => void;
  minJobs: number;
  setMinJobs: (value: number) => void;
  maxJobs: number;
  setMaxJobs: (value: number) => void;
  selectedCities: string[];
  setSelectedCities: (value: string[]) => void;
  cities: string[];
  showSaved: boolean;
  setShowSaved: (value: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchName,
  setSearchName,
  minJobs,
  setMinJobs,
  maxJobs,
  setMaxJobs,
  selectedCities,
  setSelectedCities,
  cities,
  showSaved,
  setShowSaved,
}) => {
  const toggleCity = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((selected) => selected !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleMinJobsChange = (value: number) => {
    const limitedValue = Math.max(0, Math.min(500000, value)); // Limit between 0 and 500000
    setMinJobs(limitedValue);
  };
  
  const handleMaxJobsChange = (value: number) => {
    const limitedValue = Math.max(1, Math.min(500000, value)); // Limit between 1 and 500000
    setMaxJobs(limitedValue);
  };
  
  const handleMinJobsBlur = () => {
    if (minJobs >= maxJobs) {
      setMinJobs(maxJobs - 1); // Ensure minJobs is less than maxJobs
    }
  };
  
  const handleMaxJobsBlur = () => {
    if (maxJobs <= minJobs) {
      setMaxJobs(minJobs + 1); // Ensure maxJobs is greater than minJobs
    }
  };

  return (
    <div className="filter-panel">
      <div className="filter-panel-top">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or location"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <div className="number-inputs">
          <input
            className="number-input"
            type="number"
            placeholder="Min jobs"
            value={minJobs}
            onChange={(e) => handleMinJobsChange(Number(e.target.value))}
            onBlur={handleMinJobsBlur}
          />
          <input
            className="number-input"
            type="number"
            placeholder="Max jobs"
            value={maxJobs}
            onChange={(e) => handleMaxJobsChange(Number(e.target.value))}
            onBlur={handleMaxJobsBlur}
          />
        </div>
        <button
          className={`show-saved-button ${showSaved ? "active" : ""}`}
          onClick={() => setShowSaved(!showSaved)}
        >
          {showSaved ? (
            <div className="show-saved-button-content">
              <FaList /> All
            </div>
          ) : (
            <div className="show-saved-button-content">
              <FaHeart /> Saved
            </div>
          )}
        </button>
      </div>

      <div className="city-toggle-container">
        {cities.map((city) => (
          <button
            key={city}
            className={`city-toggle ${
              selectedCities.includes(city) ? "active" : ""
            }`}
            onClick={() => toggleCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;