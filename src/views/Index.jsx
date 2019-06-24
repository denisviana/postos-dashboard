import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.jsx";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {

  state = {
    activeNav: 1,
    chartExample1Data: "data1",
    top20maisCaros : [],
    top20maisBaratos : [],
    loadingMaisCaros : true,
    loadingMaisBartos : true
  };

  componentDidMount() {

    axios.get(`https://api-postos.azurewebsites.net/api/postos/top20/maisbaratos`)
      .then(res => {
        const maisbaratos = res.data;
        this.setState({
          top20maisBaratos: maisbaratos,
          loadingMaisBaratos: false
        })
      })
      .catch(err => {
        console.log(err);
      });

    axios.get(`https://api-postos.azurewebsites.net/api/postos/top20/maiscaros`)
      .then(res => {
        const maiscaros = res.data;
        this.setState({
          top20maisCaros: maiscaros,
          loadingMaisCaros: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <div className="col">
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Top 20 mais baratos</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Posto</th>
                      <th scope="col">Cidade/UF</th>
                      <th scope="col">Bandeira</th>
                      <th scope="col">Valor de Compra</th>
                      <th scope="col">Valor de Venda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.top20maisBaratos.map((value, index) => {
                        return <tr>
                        <th>{value.Revenda}</th>
                        <td>{value.Municipio+"/"+value.EstadoSigla}</td>
                        <td>{value.Bandeira}</td>
                        <td>{value.ValordeCompra}</td>
                        <td>{value.ValordeVenda}</td>
                      </tr>
                      })
                    }
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Top 20 mais caros</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Posto</th>
                      <th scope="col">Cidade/UF</th>
                      <th scope="col">Bandeira</th>
                      <th scope="col">Valor de Compra</th>
                      <th scope="col">Valor de Venda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.top20maisCaros.map((value, index) => {
                        return <tr>
                        <th>{value.Revenda}</th>
                        <td>{value.Municipio+"/"+value.EstadoSigla}</td>
                        <td>{value.Bandeira}</td>
                        <td>{value.ValordeCompra}</td>
                        <td>{value.ValordeVenda}</td>
                      </tr>
                      })
                    }
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          </div>
        </Container>
      </>
    );
  }
}

export default Index;
