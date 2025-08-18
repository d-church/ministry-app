import { Link } from "react-router-dom";
import { CButton, CContainer } from "@coreui/react";

const Page500 = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <CContainer>
        <div className="text-center">
          <h1 className="display-1 fw-light text-muted mb-4">500</h1>
          <h2 className="h4 fw-normal mb-4">Помилка сервера</h2>
          <p className="text-muted mb-4">
            Сталася технічна помилка. Спробуйте пізніше.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/" className="text-decoration-none">
              <CButton color="primary" variant="outline">
                Головна
              </CButton>
            </Link>
            <CButton
              color="secondary"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Оновити
            </CButton>
          </div>
        </div>
      </CContainer>
    </div>
  );
};

export default Page500;
