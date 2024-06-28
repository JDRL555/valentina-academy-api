import { Document, Page } from 'react-pdf'

export default function PrevCertificate(htmlContent) {
  return (
    <Document>
      <Page>
        {htmlContent}
      </Page>
    </Document>
  );
}
