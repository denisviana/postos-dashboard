/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2019{" "}
                Denis Viana
            </div>
          </Col>

          <Col xl="6">
            
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
