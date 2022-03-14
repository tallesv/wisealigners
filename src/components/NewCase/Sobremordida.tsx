import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';

interface SobremordidaProps {
  handleNextStep: () => void;
  handleSubmitData: (values: { sobremordida: SobremordidaType }) => void;
}

const SobremordidaFormSchema = yup.object().shape({
  option: yup.string().required('Por favor selecione uma opção.'),
  subOptions: yup.array().of(yup.string()),
  observation: yup.string(),
});

export function Sobremordida({
  handleNextStep,
  handleSubmitData,
}: SobremordidaProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideAbertaSubOptions, setHideAbertaSubOptions] = useState(true);
  const [hideProfundaSubOptions, setHideProfundaSubOptions] = useState(true);
  const [subOptionsSelected, setSubOptionsSelected] = useState<string[]>([]);

  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<SobremordidaType>({
      resolver: yupResolver(SobremordidaFormSchema),
    });

  const { errors } = formState;

  function handleSelectOption(value: string) {
    setValue('option', value);
    setHideAbertaSubOptions(value !== 'corrigir mordida aberta');
    setHideProfundaSubOptions(value !== 'corrigir mordida profunda');

    setValue('sub_options', []);
    setSubOptionsSelected([]);
  }

  function handleSelectSubOptions(value: string) {
    const subOptionsArray = Array.isArray(getValues().sub_options)
      ? getValues().sub_options
      : [];

    const findValue = subOptionsArray?.find(item => item === value);

    if (findValue) {
      setValue(
        'sub_options',
        [...subOptionsSelected].filter(item => item !== value),
      );
      setSubOptionsSelected(
        [...subOptionsSelected].filter(item => item !== value),
      );
    } else {
      subOptionsArray?.push(value);
      const updateSubOptionsArray = [...subOptionsSelected];
      updateSubOptionsArray.push(value);
      setValue('sub_options', updateSubOptionsArray);
      setSubOptionsSelected(updateSubOptionsArray);
    }
  }

  const handleSubmitSobremordida: SubmitHandler<
    SobremordidaType
  > = async values => {
    setButtonLoading(true);
    handleSubmitData({ sobremordida: { ...values } });
    setButtonLoading(false);
  };
  return (
    <VStack
      w="100%"
      spacing={5}
      as="form"
      onSubmit={handleSubmit(handleSubmitSobremordida)}
    >
      <RadioGroup
        name="option"
        error={errors.option}
        onChangeOption={value => handleSelectOption(value)}
        value={undefined}
      >
        <VStack spacing={2} align="flex-start">
          <Radio value="mostrar resultado de sobremordida">
            Mostrar resultado de sobremordida
          </Radio>
          <Radio value="corrigir mordida aberta">Corrigir mordida aberta</Radio>
          <VStack align="flex-start" pl={10} hidden={hideAbertaSubOptions}>
            <Checkbox
              value="extruir dentes superiores"
              isChecked={subOptionsSelected.includes(
                'extruir dentes superiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Extruir dentes superiores
            </Checkbox>
            <Checkbox
              value="extruir dentes inferiores"
              isChecked={subOptionsSelected.includes(
                'extruir dentes inferiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Extruir dentes inferiores
            </Checkbox>
          </VStack>
          <Radio value="corrigir mordida profunda">
            Corrigir mordida profunda
          </Radio>
          <VStack align="flex-start" pl={10} hidden={hideProfundaSubOptions}>
            <Checkbox
              value="intruir dentes superiores"
              isChecked={subOptionsSelected.includes(
                'intruir dentes superiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Intruir dentes superiores
            </Checkbox>
            <Checkbox
              value="intruir dentes inferiores"
              isChecked={subOptionsSelected.includes(
                'intruir dentes inferiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Intruir dentes inferiores
            </Checkbox>
            <Checkbox
              value="adicionar bite ramps nos incisivos superiores"
              isChecked={subOptionsSelected.includes(
                'adicionar bite ramps nos incisivos superiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Adicionar Bite Ramps nos incisivos superiores
            </Checkbox>
          </VStack>
          <Radio value="outro">outro</Radio>
        </VStack>
      </RadioGroup>

      <FormControl>
        <FormLabel fontWeight={700} htmlFor="observation">
          Observações
        </FormLabel>
        <Textarea focusBorderColor="purple.400" {...register('observation')} />
      </FormControl>

      <Flex>
        <Button
          size="sm"
          type="submit"
          isLoading={buttonLoading}
          onClick={() => handleNextStep()}
        >
          Próximo
        </Button>
      </Flex>
    </VStack>
  );
}