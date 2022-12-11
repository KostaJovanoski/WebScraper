import { scraperService } from "../services/ScrapperService";
import { useContext, useEffect, useState } from "react";
import { HitContext } from "../context/HitContext";

export const Scraper = ({
  setShowLoader,
  setScrapedLinks,
  setScrapedImages,
  setShowNotFound,
  setScrapedSites,
  scrapedSites,
}) => {
  const [searchUrl, setSearchUrl] = useState("");
  const { hitLink } = useContext(HitContext);
  useEffect(() => {
    if (hitLink) {
      scrapContent(
        hitLink,
        setShowLoader,
        setShowNotFound,
        setScrapedLinks,
        setScrapedImages,
        scrapedSites,
        setScrapedSites
      );
      setSearchUrl(hitLink);
    }
  }, [
    hitLink,
    setShowLoader,
    setShowNotFound,
    setScrapedLinks,
    setScrapedImages,
    scrapedSites,
    setScrapedSites,
  ]);
  return (
    <div className="scrapper-search-container">
      <i className="bi bi-search"></i>
      <input
        type="search"
        className="scrapper-search"
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            await scrapContent(
              event.target.value,
              setShowLoader,
              setShowNotFound,
              setScrapedLinks,
              setScrapedImages,
              scrapedSites,
              setScrapedSites
            );
          }
        }}
        value={searchUrl}
        onInput={(e) => setSearchUrl(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

const getAllLinks = (response) => {
  let links = scraperService.getLinksContent(response);
  // Set all links
  links = links.map((l) => {
    if (l.length === 3) {
      const linkText = scraperService.stripTagsFromInnerText(l[2]).trim();
      if (linkText) {
        const dots = linkText.length > 30 ? "..." : "";
        return `<a href="${
          l[1]
        }" title="${linkText}" target="_blank">${linkText.substring(
          0,
          30
        )}${dots}</a>`;
      }
      return "";
    }
  });
  return links.filter((l) => l.length > 0);
};

const getAllImages = (response, host) => {
  let images = scraperService.getImages(response);
  const allImages = images.map((img) => {
    return scraperService.fixImageUrl(img[1], host);
  });
  return allImages.filter((img) => img.length > 0);
};

const scrapContent = async (
  hitLink,
  setShowLoader,
  setShowNotFound,
  setScrapedLinks,
  setScrapedImages,
  scrapedSites,
  setScrapedSites
) => {
  setShowLoader(true);
  setShowNotFound(false);
  setScrapedLinks([]);
  setScrapedImages([]);

  try {
    const uriString = scraperService.fixProtocol(hitLink);
    const response = await scraperService.getContentFromUrl(uriString);

    const allLinks = getAllLinks(response);
    const allImages = getAllImages(response, uriString);

    setScrapedLinks(allLinks);
    setScrapedImages(allImages);
    if (allLinks.length === 0 && allImages.length === 0) {
      setShowNotFound(true);
    }
    if (scrapedSites.indexOf(uriString) === -1) {
      setScrapedSites([...scrapedSites, uriString]);
    }
    setShowLoader(false);
  } catch (err) {
    console.log(err);
    setShowLoader(false);
    setScrapedLinks([]);
    setScrapedImages([]);
    setShowNotFound(true);
  }
};
