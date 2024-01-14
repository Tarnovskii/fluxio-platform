import { object, number } from "yup"

const getDepositFormSchema = (minDep, maxDep) => {
  return object({
    depositValue: number().test({
      test: (value) => value >= minDep,
      name: 'more-then-min',
      message: `Amount should me more than ${minDep}`,
    }).test({
      test: (value) => value <= maxDep,
      name: 'less-then-max',
      message: 'Not enough BNB on balance',
    }).required('You have to input valid number of BNB').typeError('You have to input valid number of BNB')
  })
}


export default getDepositFormSchema;
