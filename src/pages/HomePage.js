import {Link} from "react-router-dom";
export function HomePage(){
    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className=<Link to={'/login'}>login Now.</Link>>
                    <h2 className={'display-6 text-center'}>Web Scraper</h2>
                </div>
            </div>
        </div>
    );
}