import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import "../productos.css";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

export default class ProductosCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        redirect: false,                     // Para que no me redireccione a otra pagina despues del mensaje de creación de producto
        message: {
          text: "",
          show: false, 
        },
        loading: false,
        producto: {
            marca: "",
            modelo: "",
            nombre: "",
            precio: "",
            descripcion: "",
            stock: "",
            activo: "",
            categoria: "",
        },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }
  setValue(inicio, value){
    this.setState({
        producto:{
            ...this.state.producto,
            [inicio]: value,
        },
    });
  }
  guardarProductos(){
    this.setState({ loading: true });
    request
      .post("/productos", this.state.producto)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }
  onExitedMessage () {
    if (this.state.rediret) this.props.changeTab( 'buscar' );     // Después que el producto se confirme su creación redirecciona a la pestaña buscar.  
  }
  render() {
    return (
      <Container id="productos-crear-container">
        <MessagePrompt
          text = {this.state.message.text}
          show = {this.state.message.show}
          duration = {2500}
          onExited = {this.onExitedMessage}
        />

        <Loading show = {this.state.loading}/>
        <Row>
          <h1>Crear producto</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Marca</Form.Label>
              <Form.Control onChange={ (e) => this.setValue("marca", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Modelo</Form.Label>
              <Form.Control onChange={ (e) => this.setValue("modelo", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control onChange={ (e) => this.setValue("nombre", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio</Form.Label>
              <Form.Control onChange={ (e) => this.setValue("precio", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Descripción</Form.Label>
              <Form.Control onChange={ (e) => this.setValue("descripcion", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Stock</Form.Label>
              <Form.Control onChange={ (e) => this.setValue("stock", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Activo</Form.Label>
              <Form.Control onChange={ (e) => this.setValue("activo", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Categoria</Form.Label>
              <Form.Control onChange={ (e) => this.setValue("categoria", e.target.value) }/>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
              </Form.Group> */}

            <Button variant="dark" onClick={() => console.log(this.guardarProductos())}>
              Crear
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
