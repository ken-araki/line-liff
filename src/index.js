import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import * as api from './api/tobuy';
import * as line from './api/line';

class Addition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      onClick: (goods) => props.onClick(goods)
    };
  }

  handleChange(e) {
    this.setState = { value: e.target.value };
  }
  handleClick() {
    const v = this.setState.value;
    if (v !== '') {
      this.state.onClick(v);
    }
  }
  render() {
    return (
      <InputGroup size="lg">
        <FormControl
          placeholder="add tobuy"
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() => this.handleClick()}>Add</Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

function Item(props) {
  let variant = props.checked ? "success" : ""
  return (
    <ListGroup.Item
      action
      onClick={props.onClick}
      variant={variant}
    >
      {props.text}
    </ListGroup.Item>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tobuyList: [],
      checked: []
    };
  }
  componentDidMount() {
    this.fetchTobuy()
  }

  fetchTobuy() {
    api.fetchTobuy(res => {
      this.setState({
        tobuyList: res.data
      });
    });
  }

  addTobuy(goods) {
    api.addTobuy(goods, res => { this.fetchTobuy() });
  }

  buy() {
    api.buy(
      JSON.stringify(this.state.checked),
      res => {
        this.setState({ checked: [] })
        this.fetchTobuy()
      }
    );
  }

  isChecked(i) {
    return this.state.checked.includes(i)
  }
  handleCheck(i) {
    let checked = this.state.checked;
    if (this.isChecked(i)) {
      checked = checked.filter(id => id !== i)
    } else {
      checked.push(i)
    }
    this.setState({
      checked: checked
    });
  }
  handleClickBuy() {
    const checked = this.state.checked;
    if (checked.size === 0) {
      return;
    }
    this.buy()
  }
  render() {
    return (
      <div>
        <Container fluid="md">
          <Row className="mt-3">
            <Col lg="2">
              <Addition
                value={this.state.addition}
                onClick={(goods) => this.addTobuy(goods)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <ListGroup>
                {this.state.tobuyList.map((tobuy) => {
                  const checked = this.state.checked.includes(tobuy.id)
                  return <Item
                    text={tobuy.name}
                    checked={checked}
                    onClick={() => this.handleCheck(tobuy.id)}
                  />;
                })}
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button
                variant="success"
                size="lg"
                block
                onClick={() => this.handleClickBuy()}>Buy</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class Tobuy extends React.Component {
  render() {
    return (
      <div><Board /></div>
    );
  }
  componentDidMount() {
    const liff = window.liff
    const liffId = process.env.REACT_APP_LIFF_ID
    liff.init({ liffId: liffId }).then(() => {
      console.log("liff init.");
      if (!liff.isLoggedIn()) {
        console.log("is not LINE login. exec LINE login");
        liff.login()
      } else {
        // webブラウザ利用とLIFF利用でログイン仕様が異なる（っぽい）
        // SSO認証での戻り値(code, state)を利用して、`oauth2/v2.1/auth`を利用すれば良いかと思ったが、LIFF loginの際はどうやら違うらしい。
        line.auth(liff.getIDToken(), liff.getAccessToken())
      }
    }).catch((err) => {
      console.log(err.code, err.message)
    })
  }
}

// ========================================

ReactDOM.render(
  <Tobuy />,
  document.getElementById('root')
);
