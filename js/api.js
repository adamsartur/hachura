
const headers = {
    'Authorization': AUTH_TOKEN,
    'Content-Type': 'application/x-www-form-urlencoded',
};

const fetchPage = async (pageNumber) => {
    const formData = new URLSearchParams();
    formData.append('page', pageNumber);

    setIsLoading(true);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: formData.toString(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const totalPageHeader = response.headers.get('total_page');
        state.totalPages = totalPageHeader !== null ? parseInt(totalPageHeader, 10) : DEFAULT_TOTAL_PAGES;
        if (totalPageHeader === null) {
            console.warn("Cannot access 'total_page' header due to missing 'Access-Control-Expose-Headers' in the response.");
        }
        updatePageIndicator();

        const data = await response.json();

        if (data.image) {
            loadImage(data.image);
        } else {
            console.error('No image data received');
        }
    } catch (error) {
        console.error('Error fetching page:', error);
    } finally {
        setIsLoading(false);
    }
};