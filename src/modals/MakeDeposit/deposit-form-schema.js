import {object, number} from "yup"

const depositFormSchema = object({
    depositValue: number().test({
        test: (value) => value > 0,
        name: 'more-then-zero',
        message: 'Amount should me more then 0.',
    }).required('You have to input valid number of BNB').typeError('You have to input valid number of BNB')
})


export default depositFormSchema;