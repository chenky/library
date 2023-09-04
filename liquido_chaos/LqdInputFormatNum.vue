<template>
  <div :class="['LqdInput', msgs.size || showRequired ? 'LqdInput-error' : '']">
    <div class="LqdInput__top">
      <label v-if="label">{{ label }}</label>
      <p
        v-if="!msg && showRequired"
        class="LqdInput-error--required"
      >
        {{ $t('required') }}
      </p>
    </div>
    <div class="LqdInput__content">
      <input
        ref="lqdInput"
        class="LqdInput_origin"
        :type="type"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        @input="input($event)"
        @change="change($event)"
        @blur="blur($event)"
      />
      <p
        class="LqdInput_render"
        :placeholder="placeholder"
      >
        {{ formatValue }}
      </p>
    </div>
    <p
      v-if="msg"
      class="LqdInput-error__tip"
    >
      {{ msg }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, inject, onMounted, onUnmounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import type { Rule, RuleCallback, FormatterFn } from '@/models/lqdForm'
import { LQD_FORM, BRL, MXN, COP, CLP } from '@/utils/constants'
import { useOrderStore } from '@/stores/order'
import intlTelInput from 'intl-tel-input'

type Props = {
  modelValue: string
  type?: 'tel' | 'number'
  name?: string
  placeholder?: string
  label?: string
  max?: number
  formatter?: FormatterFn
  rules?: Array<Rule>
  countryCode?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'number',
    name: '',
    placeholder: '',
    label: '',
    max: 100,
    formatter: (value: string) => {
      return value
    },
    rules: () => [],
    countryCode: ''
  }),
  emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'input', value: Event): void
  }>()

const lqdInput = ref<HTMLInputElement>()

const formatValue = ref(props.modelValue)

// phone
const isPhone = computed(() => {
    return props.type == 'tel'
  }),
  { country: paymenyCountry } = storeToRefs(useOrderStore()),
  country = computed(() => {
    const { countryCode } = props
    return countryCode ? countryCode : paymenyCountry.value.toLowerCase()
  })
let iti: intlTelInput.Plugin
if (isPhone.value) {
  onMounted(() => {
    watchEffect(() => {
      if (country.value) {
        iti = intlTelInput(lqdInput.value as HTMLInputElement, {
          initialCountry: country.value
        })
      }
    })
  })
}

// save error tip
// 保存错误信息
const msgs = reactive(new Map()),
  msg = computed((): string => {
    return msgs.size ? msgs.entries().next().value[1] : ''
  }),
  showRequired = ref(false)

// return validation result accouding to the passed in rule and value
// 根据传入的 rule 和 value 返回验证结果
function validVal(value: string, rules: Array<Rule>): boolean {
  if (!rules.length) return true
  const flag = rules.some((item) => {
    if (item.required && !value) {
      if (item.msg) {
        msgs.set(item, item.msg)
      } else {
        showRequired.value = true
      }
      return true
    } else if (typeof item.validator == 'function') {
      let isErr = false
      const ruleCallback: RuleCallback = (err: Error) => {
        msgs.set(item, err.message)
        isErr = true
      }
      item.validator(value, ruleCallback)
      if (isErr) {
        return true
      } else {
        msgs.delete(item)
      }
    } else {
      msgs.delete(item)
    }
  })
  if (!flag) showRequired.value = false
  return !flag
}

// return validation results about all rules
// 返回所有 rule 的验证结果
function validate(): boolean {
  return validVal(props.modelValue, props.rules)
}

// add validate function to parent component
// 将 validate 方法保存到父组件中
const formInject = inject(LQD_FORM)
formInject?.addValidator(validate)
onUnmounted(() => {
  formInject?.removeValidator(validate)
})

function input(e: Event) {
  let { value } = e.target as HTMLInputElement
  // only num
  if (isPhone.value) {
    value = value.replace(/[^0-9]/g, '')
  }

  // set max length
  // 设置最大长度
  if (value.length > props.max) {
    value = value.substring(0, props.max)
  }

  // set value
  ;(e.target as HTMLInputElement).value = value
  emit('update:modelValue', (e.target as HTMLInputElement).value)
  emit('input', e)

  // if formatter exist then need format it
  if (typeof props.formatter === 'function') {
    formatValue.value = props.formatter(value)
  }
}
function change(e: Event) {
  const { rules } = props
  validVal(
    (e.target as HTMLInputElement | HTMLSelectElement).value,
    rules.filter((i) => !i.triggle || i.triggle == 'change')
  )
}
function blur(e: Event) {
  const { rules } = props
  validVal(
    (e.target as HTMLInputElement | HTMLSelectElement).value,
    rules.filter((i) => i.triggle == 'blur')
  )
}

// full value
defineExpose({
  val: () => {
    let val = props.modelValue
    if (isPhone.value) {
      val = iti?.getSelectedCountryData().dialCode + val
    }
    return val
  },

  formatValue: () => {
    let formatVal = formatValue.value
    if (isPhone.value) {
      formatVal = iti?.getSelectedCountryData().dialCode + formatVal
    }
    return formatVal
  }
})
</script>

<style lang="scss" scoped>
%topFont {
  margin-bottom: 6px;
  font-size: 12px;
  line-height: 20px;
}
%focus {
  border: 1px solid #bfc9de;
  border-radius: 4px;
  &:focus {
    border-color: $themeColor;
    box-shadow: 0 0 0 2px $themeColorShadow;
  }
}
@keyframes waiting {
  0% {
    visibility: visible;
  }

  50% {
    visibility: hidden;
  }

  100% {
    visibility: visible;
  }
}
.LqdInput {
  margin-bottom: 20px;
  &__top {
    display: flex;
    justify-content: space-between;
    label {
      display: block;
      @extend %topFont;
      color: $boldFontColor;
    }
  }
  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    .LqdInput_render,
    .LqdInput_origin {
      padding: 7px 11px;
      width: 100%;
      height: 100%;
      font-size: 14px;
      line-height: 24px;
      color: #000;
      outline: none;
      transition: all 0.2s;
      @extend %focus;
      &::placeholder {
        color: #aaaaaa;
      }
    }
    .LqdInput_origin {
      position: absolute;
      opacity: 0;
    }
    .LqdInput_origin:focus + .LqdInput_render:empty::before {
      content: '|';
      animation: waiting 1s step-end infinite;
    }
    .LqdInput_render:empty::after {
      content: attr(placeholder);
      color: #aaa;
    }
    .LqdInput_origin:focus + .LqdInput_render {
      border-color: $themeColor;
      box-shadow: 0 0 0 2px $themeColorShadow;
    }
    /* 光标闪烁动画 */
    .LqdInput_origin:focus + .LqdInput_render:not(:empty)::after {
      content: '|';
      animation: waiting 1s step-end infinite;
    }
  }
  &-error {
    input {
      border-color: $dangerColor !important;
      box-shadow: 0 0 0 2px $dangerColorShadow !important;
    }
    &__tip {
      margin-top: 6px;
      font-size: 12px;
      line-height: 18px;
      color: $dangerColor;
    }
    &--required {
      @extend %topFont;
      color: $dangerColor;
    }
  }
}

:deep(.iti) {
  width: 100%;
  height: 100%;
  $prefixWidth: 50px;
  input {
    padding-left: calc($prefixWidth + 12px) !important;
  }
  .iti__flag-container {
    width: $prefixWidth;
    height: 100%;
    .iti__selected-flag {
      border-right: 1px solid #dcdcde;
    }
  }
}

@media (min-width: $minWidth) {
  .LqdInput {
    &__top label {
      margin-bottom: 8px;
      font-size: 14px;
    }
    &__content input {
      border-radius: 4px;
    }
  }

  .LqdInput-error--required {
    margin-bottom: 8px;
    font-size: 14px;
  }

  :deep(.iti) {
    .iti__country-list {
      max-height: 120px;
      font-size: 12px;
    }
  }
}
</style>
