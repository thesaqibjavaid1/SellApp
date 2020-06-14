import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, Platform} from 'react-native';
import ValidationRules from './validationRules';
import Logo from './logo';
import {connect} from 'react-redux';
import {signUp, signIn} from '../../store/actions/user_actions';
import {bindActionCreators} from 'redux';
import {setTokens} from '../../utils/mics';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Button,
  Body,
  Right,
  Title,
} from 'native-base';
class Login extends Component {
  state = {
    type: 'Login',
    action: 'Login',
    hasError: false,
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          minLength: 6,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          confirmPass: 'password',
        },
      },
    },
  };

  updateInput = (name, value) => {
    this.setState({
      hasError: false,
    });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({
      form: formCopy,
    });
  };
  formHasError = () =>
    this.state.hasError ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Oops, check your info.</Text>
      </View>
    ) : null;

  manageAccess = () => {
    if (!this.props.User.auth.uid) {
      this.setState({hasError: true});
    } else {
      setTokens(this.props.User.auth, () => {
        this.setState({hasError: false});
        this.props.goNext();
      });
    }
  };

  submitUser = () => {
    let isFormValid = true;
    let formToSubmit = {};
    const formCopy = this.state.form;
    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      formToSubmit[key] = formCopy[key].value;

      if (isFormValid) {
        this.props.signIn(formToSubmit).then(() => {
          this.manageAccess;
        });
      } else {
        this.setState({
          hasError: true,
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Content style={{marginLeft: 40, marginRight: 40}}>
          <View style={styles.name}>
            <Text style={styles.nameSell}>Sell </Text>
            <Text style={styles.nameIt}>It</Text>
          </View>
          <Logo />
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                value={this.state.form.email.value}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                onChangeText={value => this.updateInput('email', value)}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input
                value={this.state.form.password.value}
                onChangeText={value => this.updateInput('password', value)}
                secureTextEntry
              />
            </Item>
            {this.formHasError()}
          </Form>
          <View style={styles.button}>
            <Button block success onPress={this.submitUser}>
              <Text style={{color: 'white'}}>Sign In</Text>
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              block
              light
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{color: '#707672'}}>Register Now</Text>
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              block
              warning
              onPress={() => this.props.navigation.navigate('App')}>
              <Text
                style={{color: 'white'}}
                onPress={() => this.props.navigation.navigate('App')}>
                I 'll do it later
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        marginBottom: 0,
      },
      android: {
        marginBottom: 10,
        marginTop: 10,
      },
    }),
  },
  name: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  nameSell: {
    fontSize: 30,
    color: '#8B948E',
  },
  nameIt: {
    fontSize: 30,
    color: '#50BE72',
  },
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f44336',
  },
  errorLabel: {
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({signIn, signUp}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
