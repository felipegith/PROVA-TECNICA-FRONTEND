
import { Link } from 'react-router-dom'
import './header.css'

export default function Header({ img, text, content }) {
    return (
        <header id="header">
            <div className='container_header_text'>
                <Link to="/" className='container_header_text_link'>
                    <img src={img} className="logo_header" />
                </Link>
                <div className='container_header_column'>
                    <span className='text_header_title'>{text}</span>
                    <span className='text_header_content'>{content}</span>
                </div>
                <div />
            </div>
        </header>
    )
}