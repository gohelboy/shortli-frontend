import { useEffect } from 'react'

const RedirectPage = () => {

    //const base_api_url = 'http://localhost:5000'
    const base_api_url = 'https://shortli-server.onrender.com'

    const redirect = async () => {
        const link = window.location.href.split('/').pop();
        if (link) await fetch(`${base_api_url}/${link}`);
    }

    useEffect(() => {
        redirect()
    }, [])
    return (
        <div>Thanks for using <b>short.li</b> made by <b><i>@gohelboy</i></b></div>
    )
}

export default RedirectPage