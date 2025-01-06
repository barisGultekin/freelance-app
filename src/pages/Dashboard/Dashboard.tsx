import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchFreelancers,
  toggleSaveFreelancer,
} from "../../features/freelancerListSlice";
import { RootState, AppDispatch } from "../../redux/store";

import FreelancerCard from "../../components/FreelancerCard/FreelancerCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

import Modal from "../../components/Modal/Modal";
import HireForm from "../../components/HireForm/HireForm";

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const freelancers = useSelector((state: RootState) => state.freelancers.data);
  const status = useSelector((state: RootState) => state.freelancers.status);

  const [searchName, setSearchName] = useState("");
  const [minJobs, setMinJobs] = useState(0);
  const [maxJobs, setMaxJobs] = useState(10);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<{
    name: string;
    id: number;
  } | null>(null);

  const [showSaved, setShowSaved] = useState(false);

  const handleHireSubmit = (formData: {
    name: string;
    email: string;
    message: string;
  }) => {
    console.log("Hiring Details:", {
      freelancerName: selectedFreelancer?.name,
      freelancerId: selectedFreelancer?.id,
      ...formData,
    });
  };

  const openHireModal = (freelancer: { name: string; id: number }) => {
    setSelectedFreelancer(freelancer);
    setIsModalOpen(true);
  };

  const savedFreelancers = useSelector(
    (state: RootState) => state.freelancers.saved,
  );

  const handleToggleSave = (id: number) => {
    dispatch(toggleSaveFreelancer(id));
  };

  useEffect(() => {
    dispatch(fetchFreelancers());
  }, [dispatch]);

  const cities = Array.from(
    new Set(freelancers.map((freelancer: any) => freelancer.address.city)),
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load freelancers.</p>;

  const filteredFreelancers = freelancers.filter((freelancer: any) => {
    const searchTerm = searchName.toLowerCase();
    const matchesName = freelancer.name.toLowerCase().includes(searchTerm);
    const matchesCity = freelancer.address.city.toLowerCase().includes(searchTerm);
    const matchesJobCount =
      freelancer.finishedJobCount >= minJobs &&
      freelancer.finishedJobCount <= maxJobs;
    const matchesCityFilter =
      selectedCities.length === 0 ||
      selectedCities.includes(freelancer.address.city);
    const matchesSaved = !showSaved || savedFreelancers.includes(freelancer.id); // Filter by saved if showSaved is true
  
    return (
      (matchesName || matchesCity) &&
      matchesJobCount &&
      matchesCityFilter &&
      matchesSaved
    );
  });

  return (
    <div className="dashboard">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedFreelancer && (
          <HireForm
            freelancerName={selectedFreelancer.name}
            onSubmit={handleHireSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
      <div className="dashboard-header">
        <h1>Explore Talents</h1>
        <FilterPanel
          searchName={searchName}
          setSearchName={setSearchName}
          minJobs={minJobs}
          setMinJobs={setMinJobs}
          maxJobs={maxJobs}
          setMaxJobs={setMaxJobs}
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
          cities={cities}
          showSaved={showSaved}
          setShowSaved={setShowSaved}
        />
      </div>
      <div className="freelancer-grid">
        {filteredFreelancers.map((freelancer: any) => (
          <FreelancerCard
            key={freelancer.id}
            id={freelancer.id}
            name={freelancer.name}
            email={freelancer.email}
            phone={freelancer.phone}
            city={freelancer.address.city}
            photo={`https://robohash.org/${freelancer.name}?size=80x80`}
            finishedJobCount={freelancer.finishedJobCount}
            onHire={() =>
              openHireModal({ name: freelancer.name, id: freelancer.id })
            }
            isSaved={savedFreelancers.includes(freelancer.id)}
            onToggleSave={() => handleToggleSave(freelancer.id)}
          />
        ))}
        <div className="placeholder"></div>
        <div className="placeholder"></div>
      </div>
    </div>
  );
};

export default Dashboard;
