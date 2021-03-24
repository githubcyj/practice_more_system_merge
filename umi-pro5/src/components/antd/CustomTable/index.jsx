import React, { Component } from 'react'
import { Table, Tooltip, Icon, Divider, Dropdown, Menu, Slider } from 'antd'
import { FullscreenExitOutlined, FullscreenOutlined, ReloadOutlined, LineHeightOutlined, SettingOutlined } from '@ant-design/icons'
import { withRouter, history} from 'umi'
import { EditableFormRow, EditableCell } from './@components/EditableTable'
import SettingTableCol from './@components/SettingTableCol'
import TableConfig, { handleCustomColumns } from './config'
import style from './index.less'
import { getCustomColumns } from './service'

const { table, pagination } = TableConfig

@withRouter
export default class CustomTable extends Component {
  settingTableRef = React.createRef()

  state = {
    tableSize: 'default',
    isFullScreen: false,
    selectedRowKeys: [],
    scrollWidth: 0,
    scrollValue: 0,
    isScroll: true,
    defaultColumns: this.props.defaultColumns || [],
    customColumns: [],

    tableState: {
      dataSource: table.dataSource,
      columns: table.columns,
      rowKey: this.props.rowKey || table.rowKey,
      loading: table.loading,
      onRow: this.props.onRow || (() => { }),
      scroll: this.props.scroll,
      components: this.props.editable ? { body: { row: EditableFormRow, cell: EditableCell } } : undefined
    },

    pagination: {
      pageSize: pagination.pageSize,
      current: pagination.current,
      total: pagination.total,
      showSizeChanger: pagination.showSizeChanger,
      pageSizeOptions: pagination.pageSizeOptions,
      showTotal: pagination.showTotal,
      onChange: (page, a, b) => { this.handleOnPageNoChange(page, a, b) },
      onShowSizeChange: (current, size, a, b) => { this.handleOnPageSizeChange(current, size, a, b) }
    },
  }

  // table 多选和单选的选项改变时
  handleOnTableSelectionChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })

    if (typeof this.props.rowSelection.onChange === 'function') this.props.rowSelection.onChange(selectedRowKeys)
  }

  // 页码改变
  handleOnPageNoChange = (page) => {
    if (this.state.pagination.current == page) return

    if (this.props.keepalive !== false) {
      const { pathname, query } = this.props.location

      query.page = String(page)
      history.replace({ pathname, query })
    }

    this.setState(prevState => {
      const { pagination } = prevState

      pagination.current = page

      return { pagination }
    }, () => {
      this.handleGetPaginationInfo()
    })
  }

  // pageSize改变
  handleOnPageSizeChange = (current, size) => {
    if (this.props.keepalive !== false) {
      const { pathname, query } = this.props.location

      query.pageSize = String(size)
      history.replace({ pathname, query })
    }

    this.setState(prevState => {
      const { pagination } = prevState

      pagination.current = current
      pagination.pageSize = size

      return { pagination }
    }, () => {
      this.handleGetPaginationInfo()
    })
  }

  // 设置行高
  handleOnChangeLineHeight = (tableSize) => {
    this.setState({ tableSize })
    setTimeout(() => {
      this.setState({ tableSize })
    }, 300)
  }

  // 自定义表格列
  handleSetTableCol = () => {
    const { defaultColumns, customColumns } = this.state
    const { columns } = this.state.tableState
    console.log(columns)

    this.settingTableRef.current.show({ columns, defaultColumns, customColumns })
  }

  //监听fullscreenchange事件
  watchFullScreen = () => {
    document.addEventListener('fullscreenchange', (e) => {
      this.setState({ isFullScreen: document.fullscreenElement ? true : false })
    }, false)
  }

  // 全屏
  handleChangeFullScreen = () => {
    if (!this.state.isFullScreen) {
      this.inFullScreen()
    } else {
      this.outFullScreen()
    }
  }

  // 进入全屏模式
  inFullScreen = () => {
    var de = document.documentElement

    if (de.requestFullscreen) {
      de.requestFullscreen()
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen()
    } else if (de.webkitRequestFullScreen) {
      de.webkitRequestFullScreen()
    }
  }

  // 退出全屏模式
  outFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
  }

  // table loading
  handleOnTableLoading = () => {
    this.setState(prevState => {
      const { tableState } = prevState

      tableState.loading = true
      tableState.dataSource = []

      return { tableState }
    })
  }

  // 生成分页参数
  getPaginationParams = () => {
    const pagiantionParams = {}

    if (this.props.pagination !== false) {
      const { size, currPage, offset } = this.props.paginationKey

      // 每页的大小
      pagiantionParams[size] = this.state.pagination.pageSize
      // 当用页数分页的时候
      if (currPage) {
        pagiantionParams[currPage] = this.state.pagination.current
      }
      // 当用offset分页的时候
      if (offset) {
        pagiantionParams[offset] = (this.state.pagination.current - 1) * this.state.pagination.pageSize
      }
    }

    return pagiantionParams
  }

  // 在接口返回的数据中找到指定的字段
  getPathedData = (dataSource, path) => {
    let retVal = dataSource
    const elements = path.split('.')

    for (var i = 0; i < elements.length; i++) {
      if (!retVal[elements[i]]) return

      retVal = retVal[elements[i]]
    }

    return retVal
  }

  // 请求接口
  handleGetPaginationInfo = () => {
    // 开启loading
    this.handleOnTableLoading()

    // 获取分页参数
    const params = this.getPaginationParams()

    return this.props.handleRequestData(params).then(res => {
      const total = this.getPathedData(res, this.props.paginationKey.total)
      const list = this.getPathedData(res, this.props.paginationKey.list)

      this.setState(prevState => {
        prevState.tableState.loading = false
console.log('list============', list);
        if (list) {
          // 有数据的情况
          prevState.tableState.dataSource = list
          prevState.pagination.total = total || 0
        } else {
          // 没有数据的情况
          prevState.tableState.dataSource = []
        }

        return prevState
      }, () => {
        if (this.props.showScroller) {
          this.calcTableScrollWidth() // 计算滚动宽度
        }
      })
    })
  }

  handleRefresh = () => {
    // 获取分页参数
    const params = this.getPaginationParams()

    return this.props.handleRequestData(params).then(res => {
      const total = this.getPathedData(res, this.props.paginationKey.total)
      const list = this.getPathedData(res, this.props.paginationKey.list)

      this.setState(prevState => {
        if (list) {
          // 有数据的情况
          prevState.tableState.dataSource = list
          prevState.pagination.total = total || 0
        } else {
          // 没有数据的情况
          prevState.tableState.dataSource = []
        }

        return prevState
      })
    })
  }

  // 获取动态列
  async getCustomColumns () {
    const { customColumns } = this.props

    if (customColumns && customColumns.moduleType) {
      const res = await getCustomColumns(customColumns)
      const data = (Array.isArray(res.data) && handleCustomColumns(res.data, this)) || []

      this.setState({ customColumns: data }, () => {
        this.initTableConfig()
      })
    } else if (Array.isArray(customColumns)) {
      this.setState({ customColumns }, () => {
        this.initTableConfig()
      })
    }
  }

  // 从url中获取页码和pageSize，并设置
  initCurrentPage = () => {
    const { page, pageSize } = this.props.location.query

    this.setState(prevState => {
      if (page) prevState.pagination.current = Number(page)
      if (pageSize) prevState.pagination.pageSize = Number(pageSize)

      return { ...prevState }
    })
  }

  // 计算table的滚动宽度
  calcTableScrollWidth () {
    const scrollWidth = this.tableHeader.scrollWidth
    const clientWidth = this.tableHeader.clientWidth
    const scroll = Math.floor(scrollWidth - clientWidth)

    this.setState({ scrollWidth: scroll })
  }

  // slider拖动时，改变table的滚动位置
  handleOnSliderChange = (value) => {
    this.tableHeader.scrollTo(value, this.tableHeader.scrollTop)
    this.tableBody.scrollTo(value, this.tableBody.scrollTop)
  }

  // 浏览器窗口的size变化时，重新计算table的滚动宽度
  watchWindowResize () {
    window.addEventListener('resize', (e) => {
      this.calcTableScrollWidth()
    }, false)
  }

  // 监听table的滚动，滚动时改变slider的值
  watchTableScroll () {
    this.tableHeader.addEventListener('scroll', () => {
      this.setState({ scrollValue: this.tableHeader.scrollLeft })
    })
  }

  // 改变滚动的状态
  handleChangeScroller = () => {
    this.setState(prevState => {
      const isScroll = !prevState.isScroll

      return { isScroll }
    })
  }







  // 恢复列的设置 - 获取localStorage的key
  getStorageKey () {
    const pathname = this.props.location.pathname
    const str = localStorage.getItem('currentUser')

    if (str && str != 'null' && str != 'undefined') {
      const user = JSON.parse(str)

      return `${user.username}:${pathname}`
    }

    return pathname
  }
  // 恢复列的设置 - 获取配置
  handleGetSelectedList () {
    const key = this.getStorageKey()
    const str = localStorage.getItem(key)

    if (str && str != 'null' && str != 'undefined') {
      const selectedList = JSON.parse(str)

      return Array.isArray(selectedList) && selectedList || []
    } else {
      return []
    }
  }

  // 初始化 table列的配置 和 rowSelection配置
  initTableConfig = () => {
    const { rowSelection } = this.props
    const { defaultColumns, customColumns } = this.state
    const selectedColumns = this.handleGetSelectedList()

    // 配置rowSelection
    if (rowSelection) {
      this.setState(prevState => {
        const { tableState } = prevState

        tableState.rowSelection = {
          ...rowSelection,
          onChange: selectedRowKeys => { this.handleOnTableSelectionChange(selectedRowKeys) }
        }

        return { tableState }
      })
    }

    if (Array.isArray(defaultColumns) && Array.isArray(customColumns)) {
      let columns = []

      // 如果本地有用户的自定义列的配置，就只显示配置中的列
      if (selectedColumns.length > 0) {
        const all = [...defaultColumns, ...customColumns]

        selectedColumns.forEach(item => {
          all.forEach(item2 => {
            if (item2.dataIndex === item.dataIndex) {
              item2.show = true
              item2.selected = true
              columns.push(item2)
            } else if (!item2.selected) {
              item2.show = false
            }
          })
        })
      } else {
        const columns1 = defaultColumns.filter(item => item.show && !item.fixed)
        const fixedColumns = defaultColumns.filter(item => item.show && item.fixed)
        const columns2 = customColumns.filter(item => item.show)

        columns = [...columns1, ...columns2, ...fixedColumns]
      }

      const x = columns.reduce((x, item) => {
        if (item.width) return x + item.width

        return x
      }, 0)

      this.setState(prevState => {
        prevState.tableState.columns = columns

        if (x) {
          prevState.tableState.scroll.x = x < 1000 ? 1000 : x
        }

        return prevState
      })
    }
  }

  // 设置列
  handleOnTableColChange = (columns) => {
    const columns1 = columns.filter(item => !item.fixed)
    const columns2 = columns.filter(item => item.fixed)
    const columns3 = [...columns1, ...columns2]
    const x = columns3.reduce((x, item) => {
      if (item.width) return x + item.width

      return x
    }, 0)


    this.setState(prevState => {
      prevState.tableState.columns = columns3

      if (x) {
        prevState.tableState.scroll.x = x < 1000 ? 1000 : x
      }

      return prevState
    }, () => {
      this.calcTableScrollWidth()
    })
  }

  componentDidMount () {
    this.tableHeader = document.querySelector('#custom-table .ant-table-content .ant-table-scroll .ant-table-header')
    this.tableBody = document.querySelector('#custom-table .ant-table-content .ant-table-scroll .ant-table-body')

    const { page, pageSize } = this.props.location.query

    this.getCustomColumns()

    if (page || pageSize) {
      this.initCurrentPage()
    } else {
      if (this.props.automatic !== false) {
        this.handleGetPaginationInfo()
      }
    }
    console.log('data============', this.state.tableState);

    this.watchFullScreen()

    if (this.props.showScroller) {
      this.watchWindowResize()
      this.watchTableScroll()
    }
  }

//   componentWillUnmount () {
//     // window.removeEventListener('resize', () => { })
//     document.removeEventListener('fullscreenchange', () => { })
//     this.tableHeader.removeEventListener('scroll', () => { })
//   }

  render () {
    const { tableSize, isFullScreen, isScroll, selectedRowKeys, scrollWidth, scrollValue } = this.state
    const { showRefresh, showLineHeight, showTableConfig, showFullScreen, showScroller, location } = this.props
    const pagination = this.props.pagination === false ? false : this.state.pagination
    const operation = typeof this.props.renderOperation === 'function' ? this.props.renderOperation() : null
    const batchOperation = typeof this.props.renderBatchOperation === 'function' ? this.props.renderBatchOperation() : null
    const menus = (
      <Menu>
        <Menu.Item onClick={() => this.handleOnChangeLineHeight('default')} style={{ padding: '5px 25px' }}>默认</Menu.Item>
        <Menu.Item onClick={() => this.handleOnChangeLineHeight('middle')} style={{ padding: '5px 25px' }}>中等</Menu.Item>
        <Menu.Item onClick={() => this.handleOnChangeLineHeight('small')} style={{ padding: '5px 25px' }}>紧凑</Menu.Item>
      </Menu>
    )

    return (
      <div className='custom-table-container'>
        <div className='custom-table-operate-bar'>
          {operation}

          {
            operation && (showRefresh || showLineHeight || showTableConfig || showFullScreen) ? (<Divider type="vertical" className='divider' />) : null
          }

          {
            showRefresh ? (
              <Tooltip title='刷新'>
                  <ReloadOutlined className='icon-button' onClick={this.handleGetPaginationInfo} />
                {/* <Icon type="reload" className='icon-button' onClick={this.handleGetPaginationInfo} /> */}
              </Tooltip>
            ) : null
          }

          {
            showLineHeight ? (
              <Dropdown overlay={menus} trigger={['click']} placement="bottomCenter">
                <Tooltip title='设置行高'>
                <LineHeightOutlined className='icon-button' />
                  {/* <Icon type="line-height" className='icon-button' /> */}
                </Tooltip>
              </Dropdown>
            ) : null
          }

          {
            showTableConfig ? (
              <Tooltip title='自定义显示字段'>
                  <SettingOutlined className='icon-button' onClick={this.handleSetTableCol} />
                {/* <Icon type="setting" className='icon-button' onClick={this.handleSetTableCol} /> */}
              </Tooltip>
            ) : null
          }

          {
            showFullScreen ? (
              <Tooltip title={isFullScreen ? '退出全屏' : '全屏'}>
                  {isFullScreen ? <FullscreenExitOutlined className='icon-button' onClick={this.handleChangeFullScreen} /> : <FullscreenOutlined className='icon-button' onClick={this.handleChangeFullScreen} /> }
                {/* <Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} className='icon-button' onClick={this.handleChangeFullScreen} /> */}
              </Tooltip>
            ) : null
          }

          {/* {
            showScroller ? (
              <Tooltip title={isScroll ? '隐藏滚动条' : '显示滚动条'}>
                <Icon type="control" className='icon-button' theme={isScroll ? 'twoTone' : 'outlined'} onClick={this.handleChangeScroller} />
              </Tooltip>
            ) : null
          } */}

        </div>

        {
          isScroll ? (
            <div className='custom-table-scroll-bar'>
              <Slider className='custom-table-slider' value={scrollValue} tipFormatter={() => '可拖动此滑块，横向滚动表格'} max={scrollWidth} onChange={this.handleOnSliderChange} />
            </div>
          ) : null
        }

        <Table id='custom-table' size={tableSize} {...this.state.tableState} pagination={pagination} />

        {
          selectedRowKeys.length > 0 ? (
            <div className='custom-table-batch-operate-bar'>
              <div className='total-count'>已选择 <a>{selectedRowKeys.length}</a> 项</div>

              <div className='buttons'>
                {batchOperation}
              </div>
            </div>
          ) : null
        }

        <SettingTableCol ref={this.settingTableRef} onChange={this.handleOnTableColChange} location={location} />
      </div>
    )
  }
}
