import { styled } from "styled-components";
import { paths } from "../paths";
import { lighten } from "polished";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const StyledSideBar = styled.div`
  max-width: 280px;
  background-color: ${({ theme }) => theme.colors.secondary};

  .active {
    background: white;

    &:hover {
      background: white;
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    padding: 1rem;

    img {
      width: 50%;
      height: 10%;
      padding-bottom: 1rem;
      border-bottom: solid 2px ${({ theme }) => theme.colors.quaternary};
    }
  }

  nav {
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      padding: 0;

      a {
        cursor: pointer;
        font-size: 1.25rem;
        padding: 10px 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }

    li:hover {
      background-color: ${({ theme }) => lighten(0.1, theme.colors.secondary)};
    }
  }
`;

export default function SideBar() {
  const location = useLocation();

  return (
    <StyledSideBar>
      <div className="logo">
        <img src="/images/logo.png" alt="Pharmacie Hasimbola"></img>
      </div>
      <nav>
        <ul>
          {paths.map((path) => (
            <li key={path.name}>
              <Link
                to={path.to}
                className={location.pathname.includes(path.to) ? "active" : ""}
              >
                {path.icon}
                {path.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </StyledSideBar>
  );
}
