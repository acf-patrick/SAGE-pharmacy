import { lighten } from "polished";
import { useRef, useState } from "react";
import { FaFileCirclePlus } from "react-icons/fa6";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../../api";
import { Header } from "../../components";
import { useNotification } from "../../hooks";

const StyledContainer = styled.div`
  padding: 0 2rem;
`;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .import {
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      font-size: 2rem;
      fill: ${({ theme }) => theme.colors.buttons.add};
      cursor: pointer;
    }

    button {
      margin-right: 2rem;
      height: 3rem;
      padding: 5px 25px;
      background-color: ${({ theme }) => theme.colors.buttons.add};
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) =>
          lighten(0.1, theme.colors.buttons.add)};
      }

      &.disabled {
        cursor: not-allowed;
        background-color: #80808081;

        &:hover {
          background-color: #80808081;
        }
      }
    }

    input {
      display: none;
    }
  }
`;

export default function Provider() {
  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileLoaded, setFileLoaded] = useState(false);

  const { pushNotification } = useNotification();

  const navigate = useNavigate();

  const triggerFileInput = (_e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = document.querySelector("#xlsx-file") as HTMLInputElement;
    fileInput.click();
    formRef.current.cli;
  };

  const enableButton = () => {
    setFileLoaded(true);
    const button = formRef.current.querySelector("button") as HTMLElement;
    console.log(button);
    button.classList.remove("disabled");
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const path = location.pathname.split("/");
    api
      .post("/provider/import/" + path[path.length - 1], formData)
      .then(() => pushNotification("Importation terminé"))
      .catch((err) => {
        console.log(err);
        pushNotification("Erreur lors de l'importation", "error");
      })
      .finally(() => navigate(0));
  };

  return (
    <>
      <StyledHeader headerTitle="Fournisseurs 🏭">
        <form ref={formRef} onSubmit={submit}>
          {location.pathname.includes("create") ? null : (
            <div className="import">
              <FaFileCirclePlus onClick={triggerFileInput} />
              <input
                ref={inputRef}
                type="file"
                name="xlsx-file"
                id="xlsx-file"
                accept=".xlsx"
                onChange={enableButton}
              />
              <button
                disabled={!fileLoaded}
                className="disabled"
                title={!fileLoaded ? "Sélectionner un fichier d'abord" : ""}
              >
                Importer
              </button>
            </div>
          )}
        </form>
      </StyledHeader>
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </>
  );
}
