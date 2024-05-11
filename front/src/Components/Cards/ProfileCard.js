import React from 'react'
import FavouritesTable from '../Tables/FavouritesTable';
import UserDetailsCard from '../Cards/UserDetailsCard';
import RegButton from '../Buttons/RegButton';

// profile card component for displaying profile data
const ProfileCard = ({ dietaryRestrictions, dietaryPreferences, setDietaryRestrictions, setDietaryPreferences }) => {

    // clickEvent functionality for submitting changes made to profile card
    const submitChanges = () => {
        console.log("not implemented yet")
    };

    // sprint one placeholders 
    const name = "Joe2024";
    const RecipePlaceholder = [
        { Recipes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'] }];

    return (
        <div className="w-[840px] h-[600px] mx-auto mt-8 bg-indigo-200 rounded-3xl">
            <div className="grid grid-cols-2 gap-8">
                <div>

                    <div className="flex items-center mb-4 relative left-[36px] top-[36px]">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="w-[150px] h-[150px] rounded-full mr-4"
                        />
                        <div>
                            <div className="text-3xl font-extrabold font-lexend cursor-default">{name}</div>

                        </div>
                    </div>

                    <div className="mb-4 relative top-[70px] left-[36px]">
                        <UserDetailsCard
                            label="Dietary Restrictions"
                            description="You have no Dietary Restrictions"
                            type="text"
                            value={dietaryRestrictions}
                            onChange={(e) => setDietaryRestrictions(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 relative top-[100px] left-[36px]">
                        <UserDetailsCard
                            label="Dietary Preferences"
                            description="You have no Dietary Preferences"
                            type="text"
                            value={dietaryPreferences}
                            onChange={(e) => setDietaryPreferences(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-8 mt-8 ml-16">
                        <FavouritesTable RecipePlaceholder={RecipePlaceholder[0]} />
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