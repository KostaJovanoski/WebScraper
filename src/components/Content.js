import { Scraper } from "./Scraper";
import { Spinner } from "./Spinner";
import { Links } from "./Links";
import { useState } from "react";
import { Images } from "./Images";

export const Content = ({
  showLoader,
  setShowLoader,
  scrapedLinks,
  setScrapedLinks,
  showNotFound,
  setShowNotFound,
  scrapedImages,
  setScrapedImages,
  setScrapedSites,
  scrapedSites,
}) => {
  const [showLinks, setShowLinks] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const notFoundText = (
    <h1 className="display-6 mt-5 pt-5 not-found-txt">
      <i className="bi bi-emoji-frown"></i> Nothing was found for your search.
    </h1>
  );
  return (
    <div className="content-area">
      <Spinner reveal={showLoader} />
      <Scraper
        setShowLoader={setShowLoader}
        scrapedLinks={scrapedLinks}
        setScrapedLinks={setScrapedLinks}
        setScrapedImages={setScrapedImages}
        setShowNotFound={setShowNotFound}
        setScrapedSites={setScrapedSites}
        scrapedSites={scrapedSites}
      />
      {showNotFound && notFoundText}
      {(scrapedLinks.length > 0 || scrapedImages.length > 0) && (
        <div className={"container-fluid"}>
          <div className={"row"}>
            {/* Tabs Menu */}
            <ul className={"tabs-block"}>
              <li className={showLinks && !showImages ? "active-tab" : ""}>
                <h4
                  onClick={() => {
                    setShowLinks(true);
                    setShowImages(false);
                  }}
                >
                  Links ({scrapedLinks.length})
                </h4>
              </li>
              <li className={!showLinks && showImages ? "active-tab" : ""}>
                <h4
                  onClick={() => {
                    setShowLinks(false);
                    setShowImages(true);
                  }}
                >
                  Images ({scrapedImages.length})
                </h4>
              </li>
            </ul>

            {/* Actual links and images */}
            <Links scrapedLinks={scrapedLinks} showLinks={showLinks} />
            <Images scrapedImages={scrapedImages} showImages={showImages} />
          </div>
        </div>
      )}
    </div>
  );
};
