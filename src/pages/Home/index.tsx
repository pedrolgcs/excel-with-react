import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";

// assets
import excelImg from "../../assets/excel.png";

// styles
import "./home.scss";

type Inputs = {
  usersFile: FileList;
  purchasesFile: FileList;
};

const Home: React.FC = () => {
  const [file, setFile] = useState<Blob>();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (
    { usersFile, purchasesFile },
    event
  ) => {
    console.log("entrou");
  };

  async function downloadFile() {
    console.log('entrou')
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
            required
          />
        </div>

        <button type="submit">Processar</button>
      </form>

      {file && (
        <div className="download-container">
          <button onClick={downloadFile}>
            <FiDownload />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
