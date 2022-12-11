import {useContext} from "react";
import {HitContext} from "../context/HitContext";

export const Sidebar = ({scrapedSites}) => {
    const {setHitLink} = useContext(HitContext);
    
    const visitedSites = scrapedSites.map((site, i) => {
        return <li key={i} onClick={()=> setHitLink(site)}>
            <i className="bi bi-link-45deg"></i> {site}
        </li>
    });
    return (
        <aside className='main-sidebar'>
            <h4><i className="bi bi-sign-turn-right-fill"></i> Recent Sites</h4>
            <ul>
                {visitedSites}
            </ul>
            {visitedSites.length === 0 && <div className='no-hits'>
                No hits at the moment <i className="bi bi-outlet"></i>
            </div>}
        </aside>
    );
}