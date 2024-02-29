<template>
  <div class="article-list-content">
    <a-table class="list-table" :columns="columns" :data-source="blogList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-popconfirm
            title="您确定要删除?"
            okText="确定"
            cancelText="取消"
            @confirm="onDelete(record.blogId)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
        <template v-if="column.dataIndex === 'blogTitle'">
          <a href="javascript:void(0)" @click="goDetail(record)">{{
            record.blogTitle
          }}</a>
        </template>
        <template v-if="column.dataIndex === 'blogStatus'">
          {{ record.blogStatus === 1 ? '私密' : '公开' }}
        </template>
        <template v-if="column.dataIndex === 'blogPubliicStatus'">
          {{ record.blogStatus === 1 ? '已发布' : '草稿' }}
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: JSON.parse(localStorage.getItem('userInfo')).userId,
      columns: [
        {
          title: '博客名称',
          dataIndex: 'blogTitle',
          key: 'blogTitle'
        },
        {
          title: '是否公开',
          dataIndex: 'blogStatus',
          key: 'blogStatus'
        },
        {
          title: '博客状态',
          dataIndex: 'blogPubliicStatus',
          key: 'blogPubliicStatus'
        },
        {
          title: '创建时间',
          dataIndex: 'blogCreateTime',
          key: 'blogCreateTime'
        },
        {
          title: '更新时间',
          dataIndex: 'blogUpdateTime',
          key: 'blogUpdateTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action'
        }
      ],
      blogList: []
    }
  },
  methods: {
    onDelete: function (key) {
      console.log(key)
    },
    goDetail: function (item) {
      this.$router.push({
        name: 'accountArticlePublish',
        params: {
          blogId: item.blogId
        }
      })
    }
  },
  created() {
    this.$http
      .get(this.$api.blog.listByUserId, {
        userId: this.userId
      })
      .then(
        (res) => {
          this.blogList = res.data
          this.blogList.forEach((item) => {
            item.blogCreateTime = this.$moment(item.blogCreateTime).format(
              'YYYY-MM-DD HH:mm:ss'
            )
            item.blogUpdateTime = this.$moment(item.blogUpdateTime).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          })
        },
        (err) => {
          console.log(err)
        }
      )
  }
}
</script>
<style lang="less" >
.article-list-content {
  padding-left: 20px;
  flex: 1;
  .list-table {
    width: 100%;
    .ant-table-thead {
      // tr {
      //   > th:nth-child(1) {
      //     width: 100px;
      //   }
      //   > th:nth-child(3) {
      //     width: 100px;
      //   }
      //   > th:nth-child(4) {
      //     width: 120px;
      //   }
      //   > th:nth-child(5) {
      //     width: 120px;
      //   }
      //   > th:nth-child(6) {
      //     width: 70px;
      //   }
      // }
    }
  }
}
</style>
