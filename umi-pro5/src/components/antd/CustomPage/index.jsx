import React, { PureComponent } from 'react'
import { history } from 'umi'

export default class CustomPage extends PureComponent {
  state = {
    formData: {},
    loading: false
  }

  authority (code) {
    const permissions = this.props.permissions || []

    return permissions.indexOf(code) !== -1 ? true : false
  }

  handleSearch = (value) => {
    this.setState({
      formData: value,
      loading: true
    }, () => {
      if (this.keepalive !== false) {
        const { pathname, query } = this.props.location

        query.page = '1'
        history.replace({ pathname, query })
      }

      this.tableRef.current.state.pagination.current = 1
      this.tableRef.current.handleGetPaginationInfo().then(() => {
        this.setState({ loading: false })
      })
    })
  }

  handleReset = () => {
    this.setState({
      formData: {},
      loading: true
    }, () => {
      if (this.keepalive !== false) {
        const { pathname, query } = this.props.location

        query.page = '1'
        history.replace({ pathname, query })
      }

      this.tableRef.current.state.pagination.current = 1
      this.tableRef.current.handleGetPaginationInfo().then(() => {
        this.setState({ loading: false })
      })
    })
  }

  componentDidMount () {
    if (this.formRef) {
      const timeout = setTimeout(() => {
        //   console.log(Router, history);
        this.formRef.current.handleSearch()
        clearTimeout(timeout)
      }, 0)
    }
  }

  render (pageContent) {
    const padding = this.pagePadding || '15px 15px 75px 15px'

    return <div id='custom-page' style={{ width: '100%', minWidth: '1000px', padding }}>{pageContent}</div>
  }
}
