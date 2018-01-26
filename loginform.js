import React, { Component } from 'react';
import {Button , Card , CardItem,Form ,Item,Input, Label, Body , Container , Content , Header} from 'native-base'
export default class loginform extends Component {
    render() {
        return (
            <Container>
               
            <Content>
              <Form>
                <Item fixedLabel>
                  <Label>Username</Label>
                  <Input />
                </Item>
                <Item fixedLabel last>
                  <Label>Password</Label>
                  <Input />
                </Item>
              </Form>
            </Content>
          </Container>
        );
    }
}
