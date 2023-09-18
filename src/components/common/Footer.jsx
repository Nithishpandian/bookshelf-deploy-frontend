import React from 'react'
import "../../assets/styles/common/footer.css"

const Footer = () => {
  return (
    <div className='footer-cont-cont'>
    <div className='footer-cont'>
      <div>
        <h1 className='logo'>BOOKSHELF</h1>
        <p className='footer-para'>Start your journey today by adding your favourite books to the bookshelf</p>
      </div>
      <div className="footer-link-cont-cont">
        <div className='footer-link-cont'>
          <a className='footer-link' href={"/"}>Home</a>
          <a className='footer-link' href={"/searchbook"}>Search book</a>
          <a className='footer-link' href={"/posts"}>Social</a>
          <a className='footer-link' href={"/bookshelf"}>Bookshelf</a>
        </div>
      </div>
      <div>
        <h3 className='footer-social-title'>Let's chat</h3>
        <div className=' footer-social-cont'>
          <a className='socialmedia-link' href={""}><ion-icon name="logo-instagram"></ion-icon></a>
          <a className='socialmedia-link' href={""}><ion-icon name="logo-linkedin"></ion-icon></a>
          <a className='socialmedia-link' href={""}><ion-icon name="logo-facebook"></ion-icon></a>
          <a className='socialmedia-link' href={""}><ion-icon name="logo-twitter"></ion-icon></a>
        </div>
      </div>
    </div>
    <div className='footer-copyright'>&#169; copyrights have been reserved</div>
    </div>
  )
}

export default Footer