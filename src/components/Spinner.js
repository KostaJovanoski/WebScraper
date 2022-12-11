export const Spinner = ({reveal = false}) => {
    if(reveal){
        const spinnerSize = {
            width: '60px',
            height: '60px'
        }
        return(
            <div className='scraper-spinner'>
                <div className="spinner-border text-primary" style={spinnerSize} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
}