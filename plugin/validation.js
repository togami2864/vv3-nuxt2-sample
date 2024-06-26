import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

export default function () {
  for (const [rule, validation] of Object.entries(rules)) {
    extend(rule, {
      ...validation,
    })
  }
}
