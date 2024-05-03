import React, { useEffect, useState } from "react";

const ProfileCard = ({ profileData }) => {
  const [localProfileData, setLocalProfileData] = useState(profileData);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    console.log("Profile Data:", profileData); // Debug statement
    setLocalProfileData(profileData);
    console.log(localProfileData.avatar)
    if (localProfileData.avatar) {
      convertToJpeg(localProfileData.avatar);
      console.log("avatarURL:", avatarUrl)
    }
  }, [profileData]);

  useEffect(() => {
    console.log("Local Profile Data:", localProfileData); // Debug statement
  }, [localProfileData]);


  const convertToJpeg = (base64String) => {
    setAvatarUrl(`data:image/jpeg;base64,${base64String}`);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalProfileData({ ...localProfileData, [name]: value });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result); // Debug statement
      setLocalProfileData({
        ...localProfileData,
        avatar: reader.result, // Set the Base64 string directly
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    const token = localStorage.getItem("token"); // assuming you store the token in local storage
    console.log(JSON.stringify(localProfileData));
    fetch("/save-changes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(localProfileData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // handle response from Flask
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <label htmlFor="avatarInput">
        <img
          src={avatarUrl} // Display the avatar image using the created URL
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto cursor-pointer"
        />
      </label>
      <input
        type="file"
        id="avatarInput"
        className="hidden"
        onChange={handleAvatarChange}
      />
      <h1 className="text-3xl font-semibold text-center mt-4">
        {localProfileData.username}
      </h1>
      <p className="text-gray-600 text-center">{/* Add other profile details */}</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Allergies:</h2>
        <input
          type="text"
          name="allergies"
          value={localProfileData.allergies || ""}
          onChange={handleInputChange}
          className="text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Preferences:</h2>
        <input
          type="text"
          name="preferences"
          value={localProfileData.preferences || ""}
          onChange={handleInputChange}
          className="text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={saveChanges}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
