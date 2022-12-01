import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import "../productos.css";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import ConfirmationPrompts from "../../prompts/confirmation";

export default class ProductosEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        idProducto: this.props.getIdProducto(),
        rediret: false,                               // Para que no me redireccione a otra pagina despues del mensaje de creación de producto
        message: {
          text: "",
          show: false, 
        },
        confirmation: {
          title: "Modificar producto",
          text: "¿Deasea modificar producto?",
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
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  componentDidMount() {
    this.getProducto();
  }
  getProducto(){
    this.setState({ loading: true });
    request
      .get(`/productos/${this.state.idProducto}`)
      .then((response) => {
          this.setState({
            producto: response.data,
            loading: false,
            });
          })

      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
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
      .put(`/productos/${this.state.idProducto}`, this.state.producto)
      .then((response) => {
        if(response.data.exito){
          this.props.changeTab("buscar");
        }
        this.setState({ loading: false});
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }
  onExitedMessage () {
    if (this.state.rediret) this.props.changeTab( 'buscar' );     // Después que el producto se confirme su creación redirecciona a la pestaña buscar.  
  }

  onCancel(){
    this.setState({
      confirmation:{
        ...this.state.confirmation,
        show: false,
      },
    })
  }

  onConfirm(){
    this.setState({
      confirmation:{
        ...this.state.confirmation,
        show: false,
      },
    },
    this.guardarProductos()
    );
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
 
      <ConfirmationPrompts
      show = {this.state.confirmation.show}
      title = {this.state.confirmation.title}
      text = {this.state.confirmation.text}
      onCancel = {this.onCancel}
      onConfirm = {this.onConfirm}
      />

        <Loading show = {this.state.loading}/>
        <Row>
          <h1>Editar producto</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Marca</Form.Label>
              <Form.Control 
              value = {this.state.producto.marca}
              onChange={ (e) => this.setValue("marca", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Modelo</Form.Label>
              <Form.Control 
              value = {this.state.producto.modelo}
              onChange={ (e) => this.setValue("modelo", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
              value = {this.state.producto.nombre}
              onChange={ (e) => this.setValue("nombre", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Precio</Form.Label>
              <Form.Control
              value = {this.state.producto.precio} 
              onChange={ (e) => this.setValue("precio", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
              value = {this.state.producto.descripcion}
              onChange={ (e) => this.setValue("descripcion", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Stock</Form.Label>
              <Form.Control 
              value = {this.state.producto.stock}
              onChange={ (e) => this.setValue("stock", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Activo</Form.Label>
              <Form.Control 
              value = {this.state.producto.activo}
              onChange={ (e) => this.setValue("activo", e.target.value) }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Categoria</Form.Label>
              <Form.Control 
              value = {this.state.producto.categoria}
              onChange={ (e) => this.setValue("categoria", e.target.value) }/>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
              </Form.Group> */}

            <Button variant="dark" onClick={() => this.setState({confirmation: { ...this.state.confirmation, show: true},})}>
            {/* <Button variant="dark" onClick={() => console.log(this.guardarProductos())}> */}
              Guardar producto
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
