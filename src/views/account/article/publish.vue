<template>
  <div class="publish">
    <a-form
      name="basic"
      ref="blogInfoRef"
      :model="formState"
      class="publish-head"
    >
      <a-button class="btn-article-manage" @click="goBack">
        <span class="iconfont blog-fanhui"></span>
        文章管理
      </a-button>
      <div class="input-content">
        <a-form-item name="blogTitle" :rules="rules.blogTitle">
          <a-input
            class="blog-title"
            placeholder="【标题】"
            v-model:value="formState.blogTitle"
            show-count
            :maxlength="20"
          />
        </a-form-item>
        <div class="status-category">
          <a-form-item name="blogStatus">
            <a-select
              class="blog-status"
              v-model:value="formState.blogStatus"
              style="width: 120px"
              :options="optionsBlogStatus"
              @change="selectStatusChange"
            ></a-select>
          </a-form-item>
          <a-form-item name="categoryId" :rules="rules.categoryId">
            <a-select
              class="blog-category"
              v-model:value="formState.categoryId"
              :options="optionsBlogCategory"
              style="width: 120px"
              @change="selectCategoryChange"
            ></a-select>
          </a-form-item>
        </div>
      </div>
      <a-button @click="saveOrPublickClick(0)"> 保存为草稿 </a-button>
      <a-button @click="saveOrPublickClick(1)"> 发布 </a-button>
      <a-button>个人中心</a-button>
    </a-form>
    <div class="editor-content">
      <v-md-editor
        v-model="blogContent"
        @save="saveOrPublickClick(0)"
        :include-level="[1, 2, 3, 4, 5, 6]"
      >
      </v-md-editor>
    </div>
  </div>
</template>
<script>
import { message } from 'ant-design-vue'
// import { message } from 'ant-design-vue'
// import { commentProps } from 'ant-design-vue/lib/comment'
export default {
  data() {
    return {
      optionsBlogStatus: [
        {
          value: 1,
          label: '私密'
        },
        {
          value: 2,
          label: '公开'
        }
      ],
      formState: {
        blogTitle: '',
        blogStatus: 2, // 是否私密 1私密 2公开
        categoryId: '',
        blogPublicStatus: 0, // 是否发布  0保存 1发布
        blogId: ''
      },
      rules: {
        blogTitle: [{ required: true, message: '请输入博客标题' }],
        categoryId: [{ required: true, message: '请选择分类' }]
      },
      blogContent: '',
      optionsBlogCategory: [],
      userId: JSON.parse(localStorage.getItem('userInfo')).userId
    }
  },
  methods: {
    // 保存OR发布
    saveOrPublickClick: async function (blogPublicStatus) {
      this.formState.blogPublicStatus = blogPublicStatus
      try {
        const blogInfoStatus = await this.validateBlogInfo(this.blogContent)
        if (blogInfoStatus) {
          if (this.$route.params.blogId !== '') {
            const res = await this.$http.post(this.$api.blog.update, {
              ...this.formState,
              userId: this.userId,
              blogContent: this.blogContent
            })
            message.success(res.msg)
          } else {
            const res = await this.$http.post(this.$api.blog.add, {
              ...this.formState,
              userId: this.userId,
              blogContent: this.blogContent
            })
            message.success(res.msg)
          }
          this.$router.back()
        }
      } catch (error) {
        console.log(error)
      }
    },
    selectCategoryChange: function (categoryId) {
      this.formState.categoryId = categoryId
    },
    selectStatusChange: function (status) {
      this.formState.blogStatus = status
    },
    validateBlogInfo: async function (blogContent) {
      const _promise = new Promise((resolve, reject) => {
        let resBool = false
        if (blogContent !== '') {
          resBool = true
        } else {
          message.error('博客内容不能为空~')
        }
        this.$refs.blogInfoRef.validate().then(
          () => {
            resolve(resBool && true)
          },
          (err) => {
            reject(err)
          }
        )
      })
      return _promise
    },
    goBack() {
      this.$router.back()
    }
  },
  created() {
    if (this.$route.params.blogId !== -1) {
      this.$http
        .get(this.$api.blog.detail, {
          blogId: this.$route.params.blogId
        })
        .then(
          (res) => {
            this.formState = { ...res.data[0] }
            this.blogContent = this.formState.blogContent
            console.log(this.formState.categoryId)
          },
          (err) => {
            console.log(err)
          }
        )
    }
    this.$http
      .get(this.$api.category.all, {
        userId: this.userId
      })
      .then(
        (res) => {
          const tempList = []
          this.$commonFunc.formatCategoryListChildren(res.data, tempList)
          this.optionsBlogCategory = tempList
          this.optionsBlogCategory.unshift({
            value: '',
            label: '---请选择---',
            disabled: true
          })
        },
        (err) => {
          console.log(err)
        }
      )
  }
}
</script>
<style lang="less" scoped>
.publish {
  display: flex;
  flex-direction: column;
  height: 100%;
  .publish-head {
    display: flex;
    padding: 16px;
    padding-bottom: 0;
    .input-content {
      flex: 1;
      margin-right: 16px;
      .status-category {
        display: flex;
        .blog-status {
          margin-right: 16px;
        }
        .blog-category {
          margin-right: 16px;
          width: 400px;
        }
      }
    }
    > button {
      margin-right: 16px;
      border-radius: 5px;
      border: 0;
    }
    > span {
      margin-right: 16px;
      border-radius: 5px !important;
    }
    > button:last-of-type {
      margin-right: 0;
    }
  }
  .editor-content {
    padding: 0 16px 16px;
    flex: 1;
    .v-md-editor {
      height: calc(100vh - 80px);
    }
  }
}
</style>
