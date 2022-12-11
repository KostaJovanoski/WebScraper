export function Images({scrapedImages, showImages}) {
    const images = scrapedImages.map((img, i) => {
        return <div className={'scraped-img'} key={i}>
            <img src={img} alt=''/>
        </div>;
    });
    if (images.length && showImages) {
        return (
            <div className={'col-md-12'}>
                <div className={'scraped-images'}>
                    {images}
                </div>
            </div>
        );
    }
}