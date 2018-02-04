module.exports = {
  processors: ['stylelint-processor-html'],
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    'selector-list-comma-newline-after': 'never-multi-line',
    'function-comma-space-after': null,
    'order/properties-order': [
      'content',
      'display',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'transform',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'color',
      'font-size',
      'font-weight',
      'line-height',
      'background',
      'background-color',
      'border',
      'cursor'
    ]
  }
};