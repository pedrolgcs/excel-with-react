import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiDownload } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";

// utils
import { ReportFormatters } from "../../utils/ReportFormatters";
import { GenerateReports } from "../../utils/GenerateReports";

// assets
import excelImg from "../../assets/excel.png";

// styles
import "./home.scss";

type Inputs = {
  usersFile: FileList;
  purchasesFile: FileList;
};

const Home: React.FC = () => {
  const [file, setFile] = useState<Blob | undefined>();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (
    { usersFile, purchasesFile },
    event
  ) => {
    try {
      const users = await ReportFormatters.users(usersFile);
      const purchases = await ReportFormatters.purchases(purchasesFile);

      const blobFile = await GenerateReports.users(users, purchases);

      setFile(blobFile);

      toast.success("Arquivo pronto para download!");
    } catch (error) {
      toast.error("Opa! Aconteceu algum problema, tente novamente");
    }

    event?.target.reset();
    return;
  };

  async function downloadFile() {
    let url = window.URL.createObjectURL(file);
    let a = document.createElement("a");
    a.href = url;
    a.download = "relatório-final.xlsx";
    a.click();
  }

  return (
    <div id="page-home">
      <img src={excelImg} alt="excel logo" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="users">Planilha de usuários</label>
          <input
            {...register("usersFile")}
            type="file"
            id="users"
            accept=".xlsx, .xls"
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="purchases">Planilha de compras</label>
          <input
            {...register("purchasesFile")}
            type="file"
            id="purchases"
            accept=".xlsx, .xls"
          />
        </div>

        <button type="submit">Processar</button>
      </form>

      {file && (
        <div className="download-container">
          <button type="button" onClick={downloadFile}>
            <FiDownload />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
