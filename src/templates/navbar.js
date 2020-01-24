import React, { useState } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { Helmet } from "react-helmet";
import "../styles/burger.sass";
import Logo from "../img/logo.svg";
import Apple from "../img/apple-touch-icon.png";
import FavIcon32 from "../img/favicon-32x32.png";
import FavIcon16 from "../img/favicon-16x16.png";
import Safari from "../img/safari-pinned-tab.svg";
import Icon from "../img/favicon.ico";

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
            }
          }
        }
      }
    }
  `);
  const links = data.allMarkdownRemark.edges
    .map(({ node }) => ({
      title: node.frontmatter.title,
      slug: node.fields.slug,
      templateKey: node.frontmatter.templateKey
    }))
    .filter(n => n.templateKey !== "home");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>Fenia Adventures</title>
        <link rel="apple-touch-icon" sizes="180x180" href={Apple} />
        <link rel="icon" type="image/png" sizes="32x32" href={FavIcon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={FavIcon16} />
        <link rel="mask-icon" href={Safari} color="#ffdb4a" />
        <link rel="shortcut icon" href={Icon} />
        <meta name="apple-mobile-web-app-title" content="Fenia Adventures" />
        <meta name="application-name" content="Fenia Adventures" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <nav className="navbar" role="navigation">
        <div class="navbar-brand">
          <div class="navbar-item">
            <Link to="/">
              <img src={Logo} alt="LogoFenia Adventures" />
            </Link>
          </div>

          {links.length > 1 && (
            <a
              role="button"
              href="#menu"
              className={`navbar-burger burger${
                open ? " close is-active" : ""
              }`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={() => setOpen(!open)}
            >
              <div className="burger-icon">
                <div className="burger-bar"></div>
              </div>
            </a>
          )}
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu${open ? " is-active" : ""}`}
        >
          <div className="navbar-start">
            {links.map(
              ({ title, slug }) =>
                title !== "" && (
                  <div className="navbar-item">
                    <Link to={slug}>{title}</Link>
                  </div>
                )
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
