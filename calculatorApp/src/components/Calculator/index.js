import React, {useContext, useCallback} from 'react';
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';

import {Row} from '../Row';
import {VerifyContext} from '../VerifyContextProvider';
import {CalculatorButton} from '../CalculatorButton';

export const Calculator = () => {
  const VerifyData = useContext(VerifyContext);
  const {state, setState} = VerifyData;

  const addFloatingPoint = () => {
    const {displayValue} = state;
    if (!/\./.test(displayValue)) {
      setState({
        displayValue: displayValue + '.',
      });
    }
  };

  const applyPercentage = useCallback(() => {
    let displayValue = state.displayValue;
    setState({displayValue: displayValue / 100});
  }, [state, setState]);

  const changeSign = () => {
    setState({displayValue: state.displayValue * -1});
  };

  const enterDigit = useCallback(
    digit => {
      if (state.calculatorState === 2 && state.displayValue.length > 10) {
        return;
      }
      let calculatorState = state.calculatorState;
      if (state.expectingSecondNumber || state.displayValue === '0') {
        setState({
          ...state,
          displayValue: digit,
          expectingSecondNumber: false,
        });
      } else {
        setState({...state, displayValue: state.displayValue + digit});
      }

      if (calculatorState === 1) {
        setState({...state, displayValue: digit, calculatorState: 2});
      }
    },
    [state, setState],
  );

  const handleOperatorPress = operator => {
    let calculatorState = state.calculatorState;
    let displayValue = state.displayValue;
    let result = state.lastValue;
    let currentOperator = state.currentOperator;
    let lastValue = 0;

    if (calculatorState === 1) {
      return;
    } else {
      if (calculatorState === 2) {
        calculatorState = 3;
      }
      if (operator === 'equals') {
        switch (currentOperator) {
          case 'plus':
            result += parseFloat(displayValue);
            break;
          case 'minus':
            result -= parseFloat(displayValue);
            break;
          case 'multiply':
            result *= parseFloat(displayValue);
            break;
          case 'divide':
            result /= parseFloat(displayValue);
            break;
          default:
            return;
        }
        displayValue = result;
        currentOperator = null;
      } else {
        currentOperator = operator;
        lastValue = parseFloat(displayValue);
      }
    }
    setState({
      displayValue: displayValue,
      lastValue: lastValue,
      currentOperator: currentOperator,
      calculatorState: calculatorState,
      expectingSecondNumber: true,
    });
  };

  const clearData = () => {
    setState({
      displayValue: '0',
      lastValue: 0,
      calculatorState: 1,
      currentOperator: null,
      expectingSecondNumber: false,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text style={styles.value}>
          {parseFloat(state.displayValue).toLocaleString()}
        </Text>
        <Row>
          <CalculatorButton
            text="C"
            theme="secondary"
            onPress={() => clearData()}
          />
          <CalculatorButton
            text="+/-"
            theme="secondary"
            onPress={() => changeSign()}
          />
          <CalculatorButton
            text="%"
            theme="secondary"
            onPress={() => applyPercentage()}
          />
          <CalculatorButton
            text="/"
            theme="accent"
            onPress={() => handleOperatorPress('divide')}
          />
        </Row>

        <Row>
          <CalculatorButton text="7" onPress={() => enterDigit('7')} />
          <CalculatorButton text="8" onPress={() => enterDigit('8')} />
          <CalculatorButton text="9" onPress={() => enterDigit('9')} />
          <CalculatorButton
            text="x"
            theme="accent"
            onPress={() => handleOperatorPress('multiply')}
          />
        </Row>

        <Row>
          <CalculatorButton text="4" onPress={() => enterDigit('4')} />
          <CalculatorButton text="5" onPress={() => enterDigit('5')} />
          <CalculatorButton text="6" onPress={() => enterDigit('6')} />
          <CalculatorButton
            text="-"
            theme="accent"
            onPress={() => handleOperatorPress('minus')}
          />
        </Row>

        <Row>
          <CalculatorButton text="1" onPress={() => enterDigit('1')} />
          <CalculatorButton text="2" onPress={() => enterDigit('2')} />
          <CalculatorButton text="3" onPress={() => enterDigit('3')} />
          <CalculatorButton
            text="+"
            theme="accent"
            onPress={() => handleOperatorPress('plus')}
          />
        </Row>

        <Row>
          <CalculatorButton
            text="0"
            size="double"
            onPress={() => enterDigit('0')}
          />
          <CalculatorButton text="." onPress={() => addFloatingPoint()} />
          <CalculatorButton
            text="="
            theme="accent"
            onPress={() => handleOperatorPress('equals')}
          />
        </Row>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
});
