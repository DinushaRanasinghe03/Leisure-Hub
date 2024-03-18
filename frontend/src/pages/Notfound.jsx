import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div title={"Page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go back
        </Link>
      </div>
    </div>
  );
}

export default Notfound