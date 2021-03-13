import { Link } from "gatsby"
import React from "react"

const items = [
  {
    href: "/",
    label: "Home",
  }
]

const Header = () => (
  <header className="px-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex">
        <div className="lg:ml-auto">
          {items.map(({ href, label }) => (
            <Link
              to={href}
              activeClassName="text-indigo-500"
              className="inline-block px-2 py-3"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </header>
)

export default Header
