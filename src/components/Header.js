

import './header.css'

export default function Header({ img, text, content }) {
    return (
        <header id="header">
            {/* <div className="container_header">
                <img src={img} className="logo_header" />
                <span className="text_header_logo">{text}</span>
            </div> */}

            <div className='container_header_text'>
                <img src={img} className="logo_header" />
                <div className='container_header_column'>
                    <span className='text_header_title'>{text}</span>
                    <span className='text_header_content'>{content}</span>
                </div>
                <div />
            </div>
        </header>
    )
}