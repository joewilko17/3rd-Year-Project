export const fetchProfileData = async (token, setProfileData) => {
    try {
        if (!token) {
            console.error('Token not found in local storage');
            return;
        }

        console.log(token)
        const response = await fetch('/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            setProfileData(data);
        } else {
            const errorData = await response.json();
            console.error('Unauthorized request');
            alert(errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const fetchLoginStatus = async (setIsLoggedOut) => {
    try {
        const storedToken = localStorage.getItem('token');
        setIsLoggedOut(!storedToken);
    } catch (error) {
        setIsLoggedOut(true);
        console.error('Error checking login status:', error);
    }
};
