import { Link } from "react-router-dom";
import { CButton, CContainer } from "@coreui/react";

const Page404 = () => (
  <div className="min-vh-100 d-flex align-items-center justify-content-center">
    <CContainer>
      <div className="text-center">
        <h1 className="display-1 fw-light text-muted mb-4">404</h1>
        <h2 className="h4 fw-normal mb-4">Сторінку не знайдено</h2>
        <p className="text-muted mb-4">Сторінка, яку ви шукаєте, не існує.</p>
        <Link to="/" className="text-decoration-none">
          <CButton color="primary" variant="outline">
            Повернутися додому
          </CButton>
        </Link>
      </div>
    </CContainer>
  </div>
);

export default Page404;
