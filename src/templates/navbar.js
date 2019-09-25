import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import "../styles/burger.sass";

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
  const links = data.allMarkdownRemark.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    slug: node.fields.slug
  }));
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar" role="navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="" alt="LogoFenia Adventures" />
        </a>

        <a
          role="button"
          href="#menu"
          className={`navbar-burger burger${open ? " close is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setOpen(!open)}
        >
          <div className="burger-icon">
            <div className="burger-bar"></div>
          </div>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu${open ? " is-active" : ""}`}
      >
        <div className="navbar-start">
          {links.map(
            ({ title, slug }) =>
              title !== "" && (
                <a className="navbar-item" href={slug}>
                  {title}
                </a>
              )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
