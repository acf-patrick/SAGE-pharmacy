import { lighten } from "polished";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { paths } from "../paths";

const StyledSideBar = styled.div`
  max-width: 280px;
  background-color: ${({ theme }) => theme.colors.secondary};

  .active {
    position: relative;

    &::before {
      transform: scaleX(1);
      transition: transform 500ms;
    }

    span {
      position: relative;
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
        &::before {
          display: block;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          transform-origin: left;
          transform: scaleX(0);
        }

        & > span {
          cursor: pointer;
          font-size: 1.25rem;
          padding: 10px 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      }
    }

    li {
      &:hover {
        background-color: ${({ theme }) =>
          lighten(0.1, theme.colors.secondary)};
      }
    }
  }
`;

export default function SideBar() {
  const location = useLocation();

  return (
    <StyledSideBar>
      <div className="logo">
        <img src="/images/logo.png" alt="Pharmacie Hasimbola" />
      </div>
      <nav>
        <ul>
          {paths.map((path) => (
            <li key={path.name}>
              <Link
                to={path.to}
                className={location.pathname.includes(path.to) ? "active" : ""}>
                <span>
                  {path.icon}
                  {path.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </StyledSideBar>
  );
}
