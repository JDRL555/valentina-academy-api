/* eslint-disable react/prop-types */
import "./PrevCertificate.css";

export default function PrevCertificate({ data }) {
  return (
    <div className="certificado-contenedor">
      <div className="certificado-encabezado">
        <h2>República de Colombia</h2>
        <h3>Academia Valentina</h3>
      </div>

      <div className="certificado-cuerpo">
        <h2>Certificado de Participación</h2>

        <p>Se otorga el presente certificado a:</p>

        <p className="certificado-nombre">{data.user_full_name}</p>

        <p className="certificado-texto-titulo">
          Por haber concluido satisfactoriamente:
        </p>

        <p className="certificado-titulo-curso">{data.course_title}</p>

        <p className="certificado-detalles">
          En constancia de lo expuesto, se firma el presente certificado en
          Colombia, departamento de Bogotá, a los {data.day} días del mes de{" "}
          {data.month} de {data.year}.
        </p>

        <div className="certificado-firmas">
          <div className="certificado-firma-director">
            <p>{data.course_author}</p>
            <p>Profesor del curso</p>
          </div>
        </div>
      </div>

      <div className="certificado-pie-pagina">
        <p>&copy; {data.year} Academia Valentina</p>
      </div>
    </div>
  );
}
