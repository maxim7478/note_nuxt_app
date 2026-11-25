// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin';
import stylisticTs from '@stylistic/eslint-plugin-ts';

export default withNuxt(
  {
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: 1,
        multiline: 1,
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside',
        multiline: 'below',
      }],
      'vue/html-closing-bracket-newline': 'warn',
      'vue/html-indent': 'warn',
      'vue/new-line-between-multi-line-property': [
        'error',
        {
          minLineOfMultilineProperty: 2,
        },
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'CONDITIONALS', // e.g. 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
            'LIST_RENDERING', // e.g. 'v-for item in items'
            'UNIQUE', // e.g. 'ref', 'key'
            'DEFINITION', // e.g. 'is', 'v-is'
            'GLOBAL', // e.g. 'id'
            'TWO_WAY_BINDING', //  e.g. 'v-model'
            'RENDER_MODIFIERS', // e.g. 'v-once', 'v-pre'
            'CONTENT', // e.g. 'v-text', 'v-html'
            'OTHER_DIRECTIVES', // e.g. 'v-custom-directive'
            'ATTR_SHORTHAND_BOOL', // e.g. 'boolean-prop'
            'ATTR_STATIC', //  e.g. 'prop="foo"', 'custom-prop="foo"'
            'ATTR_DYNAMIC', //  e.g. 'v-bind:prop="foo"', ':prop="foo"'
            'SLOT', // e.g. 'v-slot', 'slot'.
            'EVENTS', //  e.g. '@click="functionCall"', 'v-on="event"'
          ],
        },
      ],
    }
  }
)
