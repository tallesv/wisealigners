import {
  Box,
  Heading,
  Divider,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useState } from 'react';
import { PacientData } from '../components/NewCase/PacientData';
import { Button } from '../components/Button';
import { Input } from '../components/Form/input';
import { Arco } from '../components/NewCase/Arco';
import { RestricaoDeMovimentoDentario } from '../components/NewCase/RestricaoDeMovimentoDentario';
import { Attachments } from '../components/NewCase/Attachments';
import { RelacaoAnteroPosterior } from '../components/NewCase/RelacaoAnteroPosterior';

const steps = [
  { label: 'Dados do Paciente' },
  { label: 'Arco' },
  { label: 'Restrição De Movimento Dentário' },
  { label: 'Attachments' },
  { label: 'Relação Ântero-Posterior (A-P)' },
  { label: 'Overjet' },
  { label: 'Sobremordida' },
  { label: 'Linha Média' },
  { label: 'Manejo de Espaços' },
  { label: 'Informações Complementares' },
  { label: 'Documentação' },
];

type TratarArcoType = {
  tratarArco: string;
};

function NewCase() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  function handleNextStep() {
    nextStep();
  }

  function handlePrevStep() {
    prevStep();
  }

  function handleSubmitData(
    values:
      | DadosDoPacienteType
      | TratarArcoType
      | RestricaoDeMovimentoDentarioType
      | AttachmentsType
      | RelacaoAnteroPosteriorType,
  ) {
    console.log(values);
    handleNextStep();
  }

  function getInputsForStep(step: string): JSX.Element {
    const inputSize = 'md';
    switch (step) {
      case 'Dados do Paciente':
        return (
          <PacientData
            inputSize={inputSize}
            isWideVersion={isWideVersion}
            stepsSize={steps.length - 1}
            activeStep={activeStep}
            handlePrevStep={() => handlePrevStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Arco':
        return (
          <Arco
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Restrição De Movimento Dentário':
        return (
          <RestricaoDeMovimentoDentario
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Attachments':
        return (
          <Attachments
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Relação Ântero-Posterior (A-P)':
        return (
          <RelacaoAnteroPosterior
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      default:
        return <Text>Deafult</Text>;
    }
  }

  return (
    <Box mx="auto" p={[6, 8]}>
      <Heading size="lg">Novo Caso</Heading>
      <Divider my="6" borderColor="gray.800" />
      <Steps
        orientation="vertical"
        onClickStep={step => setStep(step)}
        activeStep={activeStep}
        colorScheme="purple"
      >
        {steps.map(({ label }) => (
          <Step width="100%" label={label} key={label}>
            <VStack w="100%" spacing={3}>
              {getInputsForStep(label)}
            </VStack>
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length ? (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center">
            Woohoo! All steps completed!
          </Heading>
          <Button mx="auto" mt={6} size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={() => handlePrevStep()}
            size="sm"
            variant="outline"
            bgColor="white"
            _hover={{ bgColor: 'white' }}
            color="blue.450"
          >
            Prev
          </Button>
          <Button size="sm" onClick={() => handleNextStep()}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default NewCase;