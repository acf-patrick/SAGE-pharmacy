import { lighten } from "polished";
import { Outlet, useLocation, useParams } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import styled from "styled-components";
import { Header } from "../../components";
import { useNotification } from "../../hooks";
import { api } from "../../api";

const StyledContainer = styled.div`
  padding: 0 2rem;
`;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  }

  input {
    display: none;
  }
`;

export default function Provider() {
  const triggerFileInput = (_e: React.MouseEvent<HTMLButtonElement>) => {
    const fileInput = document.querySelector("#xlsx-file") as HTMLInputElement;
    fileInput.click();
  };

  const importXlsxFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget!.files) return;
    const file = e.currentTarget!.files[0];
    const schema: any = {
      Nom: {
        type: String,
        prop: "name",
      },
      PHT: {
        type: Number,
        prop: "priceWithoutTax",
      },
      PTTC: {
        type: Number,
        prop: "priceWithTax",
      },
      DCI: {
        type: String,
        prop: "dci",
      },
      Expiration: {
        type: Date,
        prop: "expirationDate",
      },
    };
    readXlsxFile(file, { schema }).then((rows) => console.log(rows));

    updateOrders();
  };

  const location = useLocation();
  const { id: providerId } = useParams();
  const { pushNotification } = useNotification();

  // Verify all medicines ordered that are not in provider new list anymore
  const updateOrders = () => {
    api
      .post("/order/update/" + providerId)
      .then(() => pushNotification("Cataloqgue du fournisseur importée"))
      .catch((err) => {
        console.log(err);
        pushNotification("Erreur lors de l'importation du catalogue", "error");
      });
  };

  return (
    <>
      <StyledHeader headerTitle="Fournisseurs 🏭">
        {location.pathname.includes("create") ? null : (
          <button onClick={triggerFileInput}>Importer</button>
        )}
        <input
          onChange={importXlsxFile}
          type="file"
          name="xlsx-file"
          id="xlsx-file"
          accept=".xlsx"
        />
      </StyledHeader>
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </>
  );
}
