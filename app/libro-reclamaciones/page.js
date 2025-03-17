import Layout from "../Layouts/layout";
import LoadingOverlay from "../components/LoadingOverlay";
import RefiereForm from "../components/RefiereForm";
import "../styles/refiere.css";
import Image from "next/image";

export const metadata = {
  title: "Libro de Reclamaciones | Verdânt Inmobiliaria",
  description: "",
  keywords: "libro, reclamaciones, verdânt",
};

export default function Page() {
  return (
    <Layout>
      <LoadingOverlay />
    </Layout>
  );
}
