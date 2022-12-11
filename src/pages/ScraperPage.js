import {useEffect, useState} from "react";
import {Sidebar} from "../components/Sidebar";
import {Content} from "../components/Content";
import {HitContext} from "../context/HitContext";
import {UseCheckLogin} from "../hooks/UseCheckLogin";

export function ScraperPage(){
    UseCheckLogin();
    // Loader
    const [showLoader, setShowLoader] = useState(false);
    // Links
    const [scrapedLinks, setScrapedLinks] = useState([]);
    // Images
    const [scrapedImages, setScrapedImages] = useState([]);
    // Recent visited sites
    const [scrapedSites, setScrapedSites] = useState([]);
    // Show not found message
    const [showNotFound, setShowNotFound] = useState(false);

    // Visited sites
    const [hitLink, setHitLink] = useState(null);
    return (
        <HitContext.Provider value={{hitLink, setHitLink}}>
            <Sidebar scrapedSites={scrapedSites}/>
            <Content
                showLoader={showLoader}
                setShowLoader={setShowLoader}
                scrapedLinks={scrapedLinks}
                setScrapedLinks={setScrapedLinks}
                showNotFound={showNotFound}
                setShowNotFound={setShowNotFound}
                scrapedImages={scrapedImages}
                setScrapedImages={setScrapedImages}
                setScrapedSites={setScrapedSites}
                scrapedSites={scrapedSites}
            />
        </HitContext.Provider>
    );
}