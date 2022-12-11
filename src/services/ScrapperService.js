import {Request} from "./RequestService";

class ScrapperService {
    async getContentFromUrl(uriString) {
        try {
            const response = await Request.get(`/Scraper?uri=${uriString}`);
            return this.getBody(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    fixProtocol(uriString) {
        if (!uriString.includes('http')) {
            uriString = `https://${uriString}`;
        }
        return uriString;
    }

    getBody(htmlContent) {
        const regex = /<body[^>]*>(.+)<\/body>/gms;
        const matches = regex.exec(htmlContent);
        if (matches) {
            return matches[1] ?? matches[0];
        }
        return htmlContent;
    }
    
    getContentParagraphs(htmlContent){
        const regex = /<p[^>]*>(.+?)<\/p>/gms;
        return [...htmlContent.matchAll(regex)];
    }

    getLinksContent(htmlContent) {
        const regex = /<a href=["|'](.+?)["|'][^>]*>(.+?)<\/a>/gm;
        return [...htmlContent.matchAll(regex)];
    }

    getImages(htmlContent) {
        const regex = /<img src=["|'](.+?)["|'][^>]*\/?>/gm;
        return [...htmlContent.matchAll(regex)];
    }

    stripTagsFromInnerText(htmlContent) {
        return htmlContent.replace(/<[^>]*>/g, "");
    }
    
    fixImageUrl(imgSrc, host){
        imgSrc = imgSrc.replace(/^\//, "");
        const lastSlashIndex = host.lastIndexOf('/');
        if(host.indexOf('http') === -1 && lastSlashIndex > -1){
            host = host.substring(0, lastSlashIndex);
        }
        if(!imgSrc.includes('http') && imgSrc.substring(0, 2) !== '//'){
            if(!imgSrc.includes(host)){
                imgSrc = `${host}/${imgSrc}`; 
            } else {
                imgSrc =`https://${imgSrc}`;
            }
        }
        return imgSrc;
    }
}

export const scraperService = new ScrapperService();