<template>
  <div class="account-categoy">
    <div class="content">
      <a-table
        :columns="columns"
        :data-source="datas"
        :row-selection="rowSelection"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <div class="editable-cell">
              <div
                v-if="editableData[record.key]"
                class="editable-cell-input-wrapper"
              >
                <a-input
                  v-model:value="editableData[record.key].name"
                  @pressEnter="save(record.key)"
                />
                <check-outlined
                  class="editable-cell-icon-check"
                  @click="save(record.key)"
                />
              </div>
              <div v-else class="editable-cell-text-wrapper">
                {{ text || ' ' }}
                <edit-outlined
                  class="editable-cell-icon"
                  @click="edit(record.key)"
                />
              </div>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <a-popconfirm
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="onDelete(record.key)"
            >
              <a>Delete</a>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
      <div class="btn-add">
        <a-button class="" shape="circle">
          <span class="iconfont blog-add"></span>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action'
        }
      ],
      datas: [
        {
          key: 1,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 1 Lake Park',
          children: [
            {
              key: 11,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 2 Lake Park'
            }
          ]
        },
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        }
      ],
      rowSelection: {
        checkStrictly: false
      }
    }
  },
  methods: {
    onChange: function (selectedRowKeys, selectedRows) {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    onSelect: function (record, selected, selectedRows) {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: function (selected, selectedRows, changeRows) {
      console.log(selected, selectedRows, changeRows)
    }
  }
}
</script>
<style lang="less">
.account-categoy {
  padding-left: 20px;
  flex: 1;
  position: relative;
}
.btn-add {
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 5px;
  button {
    width: 30px;
    height: 30px;
    border-color: #096dd9;
    display: flex;
    align-items: center;
    justify-content: center;
    > span::before {
      color: #096dd9;
    }
  }
}
</style>
