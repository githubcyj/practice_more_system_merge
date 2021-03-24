import PropTypes from 'prop-types'

export const propTypes = {
  formConfig: PropTypes.array,
  colNum: PropTypes.number.isRequired,
  handleSearch: PropTypes.func,
  handleReset: PropTypes.func,
  formItemLayout: PropTypes.object,
}