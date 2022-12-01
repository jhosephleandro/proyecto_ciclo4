import React from "react";
import { Container, Row } from "react-bootstrap";
import { request } from "../helper/helper";
//import { request } from "../helper/helper";
import BootstrapTable from 'react-bootstrap-table-next';
// 1:13 horas video 2022/11/11 grupo 09 ********************************************** Go here !!!!!!!!*******************************************************
const products = [ 
  {
    id: 1,
    name: "Productos",
    price: 1000,
  }
];
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

// export default () =>
//   <BootstrapTable keyField='id' data={ products } columns={ columns } />

export default class EmpleadosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    request
    .get("/empleados")
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return <Container>
        <Row>
            <h1 style={{marginTop: 300}}>Buscar productos</h1>
        </Row>
        <Row>
          <BootstrapTable
          keyField="id" data={products} columns = {columns}></BootstrapTable>
        </Row>
    </Container>;
  }
}
