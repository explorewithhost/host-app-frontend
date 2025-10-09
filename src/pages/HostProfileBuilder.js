import React, { useState } from "react";
import axios from "axios";
import "./HostProfileBuilder.css"; // For custom styling

const HostProfileBuilder = () => {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    pronouns: "",
    bio: "",
    profilePicture: null,
    hostingPreferences: {
      groupSize: 1,
      preferredGuests: [],
      availability: [],
    },
    location: "",
    amenities: [],
    lifestyle: {
      hobbies: "",
      dietaryPreferences: "",
      smokingPolicy: "",
      drinkingPolicy: "",
    },
    uniqueOfferings: {
      airportPickup: false,
      specialExperiences: "",
    },
    verification: {
      idUploaded: false,
      socialMediaLinks: [],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      for (let key in profileData) {
        if (key === "profilePicture" && profileData[key]) {
          formData.append("profilePicture", profileData[key]);
        } else {
          formData.append(key, JSON.stringify(profileData[key]));
        }
      }
      const response = await axios.post("http://localhost:5000/api/hosts/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const steps = [
    {
      title: "Profile Information",
      content: (
        <div>
          <h2>Step 1: Profile Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profileData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={profileData.age}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pronouns"
            placeholder="Pronouns"
            value={profileData.pronouns}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            placeholder="Short Bio"
            value={profileData.bio}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileChange} />
        </div>
      ),
    },
    {
      title: "Hosting Preferences",
      content: (
        <div>
          <h2>Step 2: Hosting Preferences</h2>
          <label>Group Size:</label>
          <input
            type="number"
            name="groupSize"
            value={profileData.hostingPreferences.groupSize}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                hostingPreferences: {
                  ...profileData.hostingPreferences,
                  groupSize: e.target.value,
                },
              })
            }
          />
        </div>
      ),
    },
    {
      title: "Lodging Details",
      content: (
        <div>
          <h2>Step 3: Lodging Details</h2>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={profileData.location}
            onChange={handleChange}
          />
          <div>
            <label>Amenities:</label>
            <input
              type="checkbox"
              name="amenities"
              value="Wi-Fi"
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  amenities: [...profileData.amenities, e.target.value],
                })
              }
            />
            Wi-Fi
          </div>
        </div>
      ),
    },
    {
      title: "Activities and Experiences",
      content: (
        <div>
          <h2>Step 4: Activities and Experiences</h2>
          <textarea
            name="uniqueOfferings.specialExperiences"
            placeholder="Describe your unique offerings"
            value={profileData.uniqueOfferings.specialExperiences}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                uniqueOfferings: {
                  ...profileData.uniqueOfferings,
                  specialExperiences: e.target.value,
                },
              })
            }
          />
        </div>
      ),
    },
    {
      title: "Review & Submit",
      content: (
        <div>
          <h2>Step 5: Review & Submit</h2>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Bio:</strong> {profileData.bio}</p>
          <p><strong>Location:</strong> {profileData.location}</p>
          <p><strong>Group Size:</strong> {profileData.hostingPreferences.groupSize}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="profile-builder">
      <header className="profile-builder-header">
        <h1>Build Your Host Profile</h1>
        <progress value={step} max={steps.length} />
      </header>
      <main>{steps[step - 1].content}</main>
      <footer>
        <button onClick={() => setStep((prev) => Math.max(prev - 1, 1))} disabled={step === 1}>
          Previous
        </button>
        {step < steps.length ? (
          <button onClick={() => setStep((prev) => Math.min(prev + 1, steps.length))}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </footer>
    </div>
  );
};

export default HostProfileBuilder;
