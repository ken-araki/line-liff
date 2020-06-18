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
  TOBUY_API_URL = process.env.REACT_APP_API_URL + '/api/v1/tobuy';
  API_TOKEN = process.env.REACT_APP_API_TOKEN;
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
    fetch(this.TOBUY_API_URL, {
      method: 'GET',
      headers: new Headers({
        'token': this.API_TOKEN,
        'nonce': 'hoge'
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          tobuyList: res.data
        });
      })
  }

  addTobuy(goods) {
    fetch(`${this.TOBUY_API_URL}/add?goods=${goods}`, {
      method: 'POST',
      headers: new Headers({
        'token': this.API_TOKEN,
        'nonce': 'hoge'
      })
    }).then(_ => {
      this.fetchTobuy()
    });
  }

  buy() {
    fetch(`${this.TOBUY_API_URL}/buy`, {
      method: 'POST',
      body: JSON.stringify(this.state.checked),
      headers: new Headers({
        'Content-type': 'application/json',
        'token': this.API_TOKEN,
        'nonce': 'hoge'
      })
    }).then(_ => {
      this.setState({ checked: [] })
      this.fetchTobuy()
    });
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
        liff.login({
          redirectUri: process.env.REACT_APP_REDIRECT_URI
        });
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
