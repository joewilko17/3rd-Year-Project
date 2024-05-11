import React, { useEffect, useState } from "react";
import FavouritesTable from '../Tables/FavouritesTable';
import UserDetailsCard from '../Cards/UserDetailsCard';
import RegButton from '../Buttons/RegButton';

// profile card component for displaying profile data
const ProfileCard = ({ profileData }) => {
    const [localProfileData, setLocalProfileData] = useState(profileData);
    const [avatarURL, setAvatarUrl] = useState("")

    useEffect(() => {
        setLocalProfileData(profileData);
        handleAvatar(profileData.avatar)
    }, [profileData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLocalProfileData({ ...localProfileData, [name]: value });
    };

    const handleAvatar = (base64String) => {
        setAvatarUrl(`data:image/png;base64,${base64String}`);
    };

    // clickEvent functionality for submitting changes made to profile card
    const submitChanges = () => {
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
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="w-[840px] h-[600px] mx-auto mt-8 bg-indigo-200 rounded-3xl">
            <div className="grid grid-cols-2 gap-8">
                <div>

                    <div className="flex items-center mb-4 relative left-[36px] top-[36px]">
                        <label htmlFor="avatarInput">
                            <img
                                src={avatarURL}
                                alt="Profile"
                                className="w-[150px] h-[150px] rounded-full mr-4  bg-indigo-400"
                            />
                        </label>
                        <div>
                            <div className="text-3xl font-extrabold font-lexend cursor-default">{localProfileData.username}</div>

                        </div>
                    </div>

                    <div className="mb-4 relative top-[70px] left-[36px]">
                        <UserDetailsCard
                            label="Dietary Restrictions"
                            description="You have no Dietary Restrictions"
                            type="text"
                            value={localProfileData.allergies || ""}
                            onChange={handleInputChange}
                            name="allergies"
                        />
                    </div>

                    <div className="mb-4 relative top-[100px] left-[36px]">
                        <UserDetailsCard
                            label="Dietary Preferences"
                            description="You have no Dietary Preferences"
                            type="text"
                            value={localProfileData.preferences || ""}
                            onChange={handleInputChange}
                            name="preferences"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-8 mt-8 ml-16">
                        <FavouritesTable localProfileData={localProfileData} setLocalProfileData={setLocalProfileData} />
                    </div>
                    <div className='relative w-44 h-12 bottom-[20px] left-[125px]'>
                        <RegButton size={"normal"} label={"Save Changes"} clickEvent={submitChanges} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard