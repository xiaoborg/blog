<template>
  <div class="account-categoy">
    <div class="content">
      <a-table
        :columns="columns"
        :data-source="list"
        childrenColumnName="childrens"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-popconfirm
              title="您确定要删除?"
              okText="确定"
              cancelText="取消"
              @confirm="onDelete(record.key)"
            >
              <a>删除</a>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
      <div class="btn-add">
        <a-button class="" shape="circle" @click="addBtnClick">
          <span class="iconfont blog-add"></span>
        </a-button>
      </div>
      <a-modal
        v-model:visible="visible"
        cancelText="取消"
        title="新增分类"
        okText="确定"
        @ok="confirmOkModalClick"
      >
        <a-form layout="vertical" :model="formState" ref="categoryForm">
          <a-form-item label="父级分类（可选）" name="categoryName">
            <a-tree-select
              :treeLine="true"
              show-search
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择"
              allow-clear
              tree-default-expand-all
              :tree-data="list"
              @change="treeChange"
            >
            </a-tree-select>
          </a-form-item>
          <a-form-item
            label="分类名称"
            name="categoryName"
            :rules="[{ required: true, message: '请输入分类名称!' }]"
          >
            <a-input
              placeholder="请输入分类名称"
              autocomplete="off"
              v-model:value="formState.categoryName"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { message } from 'ant-design-vue'
export default {
  data() {
    return {
      columns: [
        {
          title: '名称',
          dataIndex: 'categoryName',
          key: 'categoryName'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action'
        }
      ],
      list: [],
      rowSelection: {
        checkStrictly: false,
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
      },
      visible: false,
      formState: {
        categoryName: ''
      },
      categoryParentId: '',
      userId: JSON.parse(localStorage.getItem('userInfo')).userId
    }
  },
  methods: {
    // 页面事件
    addBtnClick: function () {
      this.visible = !this.visible
    },
    confirmOkModalClick: function () {
      this.$refs.categoryForm.validate().then(
        (res) => {
          console.log(res)
          this.addCategoryPost(
            res.categoryName,
            this.userId,
            this.categoryParentId
          )
          this.$refs.categoryForm.resetFields()
        },
        (errorInfo) => {
          console.log('errorInfo', errorInfo)
        }
      )
    },
    onDelete: function (key) {
      this.deleteCategoryPost(key, this.userId)
    },
    treeChange: function (value) {
      this.categoryParentId = value
    },
    // http请求
    addCategoryPost: function (categoryName, userId, categoryParentId) {
      this.$http
        .post(this.$api.category.add, {
          categoryName: categoryName,
          userId: userId,
          categoryParentId: categoryParentId
        })
        .then(
          (res) => {
            this.list = res.data
            this.$commonFunc.formatCategoryList(this.list)
            message.success('分类新增成功(*^▽^*)')
            this.visible = false
          },
          (errorInfo) => {
            message.error(errorInfo)
            this.visible = false
          }
        )
    },
    deleteCategoryPost: function (categoryId, userId) {
      this.$http
        .post(this.$api.category.delete, {
          categoryId: categoryId,
          userId: userId
        })
        .then(
          (res) => {
            this.list = res.data
            this.$commonFunc.formatCategoryList(this.list)
            message.success('分类删除成功(*^▽^*)')
          },
          (errorInfo) => {
            console.log(errorInfo)
          }
        )
    }
  },
  created() {
    this.$http
      .get(this.$api.category.all, {
        userId: this.userId
      })
      .then(
        (res) => {
          this.list = res.data
          this.$commonFunc.formatCategoryList(this.list)
        },
        (err) => {
          console.log(err)
        }
      )
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
  right: 10px;
  top: 13px;
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
