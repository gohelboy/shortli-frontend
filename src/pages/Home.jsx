import { useEffect, useState } from 'react'

const Home = () => {

    // const base_api_url = 'http://localhost:5000'
    const base_api_url = 'https://shortli-server.onrender.com'
    const [originalLink, setOriginalLink] = useState('');
    const [shortLinks, setShortLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(8);
    const [isLoading, setIsLoading] = useState(false);

    const shortLink = async () => {
        const response = await fetch(`${base_api_url}/shorten`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                originalUrl: originalLink
            })
        })
        const data = await response.json();

        if (data.status == false) return alert(data.message)
        if (data && data.shortUrl) setShortLinks([data, ...shortLinks,])
        setOriginalLink('');
    }



    function convertTimestampToDateTimeFormat(timestamp) {
        const date = new Date(timestamp);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.querySelector('.links-container');
        if (scrollTop + clientHeight >= scrollHeight / 1.2 && !isLoading) {
            if (totalPages > currentPage) getUrls(currentPage + 1, limit);
        }
    };


    const getUrls = async (currentPage, limit) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${base_api_url}/get-urls?page=${currentPage}&limit=${limit}`);
            const data = await response.json();
            setShortLinks((prevLinks) => [...prevLinks, ...data.urls]);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUrls(currentPage, limit);
    }, [])


    useEffect(() => {
        const container = document.querySelector('.links-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <div className='home'>
            <h1 className='title'>Short.li</h1>
            <div className='container'>
                <div className='control'>
                    <input className='input' placeholder='Paste your original link here...' value={originalLink} onChange={(e) => setOriginalLink(e.target.value)} />
                    <button onClick={shortLink}>{isLoading ? "Loading..." : "Short"}</button>
                </div>
                {shortLinks.length > 0 && <div className='links-container'>
                    {shortLinks.map((link, key) => <div key={key} className='link'>
                        <span>{convertTimestampToDateTimeFormat(link.createdAt)}</span>
                        <a href={`${base_api_url}/${link.shortUrl}`} target='_blank' rel="noreferrer">{base_api_url}/{link.shortUrl}</a>
                    </div>)}
                </div>}
            </div>
        </div>
    )
}

export default Home