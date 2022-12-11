export const Links = ({scrapedLinks, showLinks}) => {
    const links = scrapedLinks.map((link, index) => {
        const htmlContent = `<i class="bi bi-link-45deg"></i>${link}`;
        return <li key={index} dangerouslySetInnerHTML={{__html: htmlContent}}></li>
    });
    if (links.length > 0 && showLinks) {
        return (
            <div className='scraped-links col-md-12'>
                <ul>
                    {links}
                </ul>
            </div>
        );
    }
}