import Layout from "../Layouts/layout";
import dynamic from "next/dynamic";
import "../styles/nosotros.css";
import Head from "next/head";
import PilaresSection from "../components/PilaresSection";
import BrandsSection from "../components/BrandsSection";
import TeamSection from "../components/TeamSection";
import NotificationSection from "../components/NotificationSection";
import CircularProgressSection from "../components/CircularProgressSection";
import CertificacionesSection from "../components/CertificacionesSection";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import DontGoComponent from "../components/DontGo";

export const metadata = {
  title: "Nosotros | Verdant Inmobiliaria",
  description:
    "Conoce más sobre Verdant Inmobiliaria y nuestro compromiso con la sostenibilidad y la innovación.",
  keywords:
    "nosotros, equipo, pilares, certificaciones, socios estratégicos, verdant",
};

export default function Home() {
  return (
    <Layout>
      <section className="title-section">
        <picture>
          <Image
            width={1000}
            height={500}
            priority
            src="/nosotros/Verdant_team.png"
            alt="Equipo de Verdânt"
          />
        </picture>
        <div className="title-section__branding">
          <p>Una nueva forma de vivir</p>
          <h2>
            Vive <mark>verde</mark>
          </h2>
        </div>
        <NotificationSection />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none"></path>
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </section>

      <section className="description-section">
        <span>Nosotros</span>
        <h3>
          <strong>Más de 13 años</strong> de experiencia comprometidos contigo y
          con el planeta
        </h3>
        <CircularProgressSection />
      </section>

      <TeamSection />
      <PilaresSection />
      <CertificacionesSection />
      <BrandsSection />
      <ContactForm></ContactForm>
      <DontGoComponent variant="standard" />
    </Layout>
  );
}
