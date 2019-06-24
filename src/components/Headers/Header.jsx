import React from "react";
import axios from "axios"
import https from 'https';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {

  state = {
    carregandoMaisCaro: true,
    carregandoMaisBarato: true,
    maiscaro: null,
    maisbarato: null
  }

  componentDidMount() {

    const agent = https.Agent({
      rejectUnauthorized: false
    });

    axios.get(`https://api-postos.azurewebsites.net/api/postos/maisbarato`)
      .then(res => {
        const maisbarato = res.data;
        this.setState({
          maisbarato: maisbarato,
          carregandoMaisBarato: false
        })
      })
      .catch(err => {
        console.log(err);
      });

    axios.get(`https://api-postos.azurewebsites.net/api/postos/maiscaro`)
      .then(res => {
        const maiscaro = res.data;
        this.setState({
          maiscaro: maiscaro,
          carregandoMaisCaro: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <div className="header pb-8 pt-5 pt-md-8" style={{backgroundImage:'linear-gradient(87deg, #3906a8 0, #2d0584 100%)'}}>
          <Container maxWidth="sm">
            <div className="header-body">
              <Row style={{ justifyContent: "center" }}>
                {
                  this.state.carregandoMaisCaro ?
                    <div lg="6" xl="5" style={{ width: 200 }}>
                      <CircularProgress style={{ margin: 'auto' }} />
                    </div> :
                    <Col lg="6" xl="5">
                      <p className="h3 mb-10 ml-0" style={{ color: "white" }}>Mais caro</p>
                      <Card className="card-stats mb-4 mb-xl-0" style={{ height: 160, backgroundImage: 'linear-gradient(to right,#e20202,#a00101)' }}>
                        <CardBody>
                          <div>
                            <Row>
                              <div className="col">
                                <span className="h3 font-weight-bold mb-0" style={{ color: "white" }}>{this.state.maiscaro.Revenda}</span>
                              </div>
                            </Row>
                            <Row style={{ height: 90 }}>
                              <div className="col">
                                <p className="mb-0 ml-0" style={{ color: "white", fontSize: 12 }}>{this.state.maiscaro.Municipio + "/" + this.state.maiscaro.EstadoSigla}</p>
                                <p className="mb-0 ml-0" style={{ color: "white", fontSize: 12 }}>{"Bandeira: " + this.state.maiscaro.Bandeira}</p>
                                {
                                  this.state.maiscaro.ValordeCompra.lenght > 0 ?
                                    <p className="mb-0 ml-0" style={{ color: "white", fontSize: 12 }}>{"Valor de compra: R$ " + this.state.maiscaro.ValordeCompra}</p>
                                    :
                                    <p className="mb-0 ml-0" style={{ color: "white", fontSize: 12 }}>{"Valor de compra: Não informado"}</p>
                                }
                              </div>
                              <div style={{ width: 0.5, backgroundColor: "grey" }}>
                              </div>
                              <div className="col">
                                <p className="h1 mb-0 ml-0" style={{ color: "white", fontSize: 45 }}>{"R$ " + this.state.maiscaro.ValordeVenda}</p>
                              </div>
                            </Row>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                }
                {
                  this.state.carregandoMaisBarato ?
                    <div lg="6" xl="5" style={{ width: 200 }}>
                      <CircularProgress style={{ margin: 'auto' }} />
                    </div> :
                    <Col lg="6" xl="5" >
                      <p className="h3 mb-10 ml-0" style={{ color: "white" }}>Mais barato</p>
                      <Card className="card-stats mb-4 mb-xl-0" style={{ height: 160, backgroundImage: 'linear-gradient(to right,#00cc66,#00a854)' }}>
                        <CardBody>
                          <div>
                            <Row>
                              <div className="col">
                                <span className="h3 font-weight-bold mb-0" style={{ color: "white" }}>{this.state.maisbarato.Revenda}</span>
                              </div>
                            </Row>
                            <Row style={{ height: 90 }}>
                              <div className="col">
                                <p className="mb-0 ml-0" style={{ color: "white", fontSize: 12 }}>{this.state.maisbarato.Municipio + "/" + this.state.maisbarato.EstadoSigla}</p>
                                <p className="mb-0 ml-0" style={{ color: "white", fontSize: 12 }}>{"Bandeira: " + this.state.maisbarato.Bandeira}</p>
                                {
                                  this.state.maisbarato.ValordeCompra.lenght > 0 ?
                                    <p className="mb-0 ml-0" style={{ color: "white", fontSize: 12 }}>{"Valor de compra: R$ " + this.state.maisbarato.ValordeCompra}</p>
                                    :
                                    <p className="mb-0 ml-0" style={{ color: "white", fontSize: 12 }}>{"Valor de compra: Não informado"}</p>
                                }                            </div>
                              <div style={{ width: 0.5, backgroundColor: "grey" }}>
                              </div>
                              <div className="col">
                                <p className="h1 mb-0 ml-0" style={{ color: "white", fontSize: 45 }}>{"R$ " + this.state.maisbarato.ValordeVenda}</p>
                              </div>
                            </Row>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                }
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
