export default {
  /**
   * 格式化table数据
   * @param {*} arr
   */
  formatCategoryList: function (arr) {
    arr.forEach(item => {
      // item.key = item.categoryId
      // item.action = 'action'
      // item.value = item.categoryId
      // item.title = item.categoryName
      // 若有子级则递归
      console.log(arr[0] === item)
      if (item.children.length > 0) {
        this.formatCategoryList(item.children)
      } else {
        // 若无子级则删除children属性
        const { children, ...objRest } = item
        item = objRest
        console.log(item)
        console.log(arr[0])
        // delete item.children
      }
    })
  },
  /**
   * 格式化下拉框
   * @param {*} arr
   * @param {*} resArr
   */
  formatCategoryListChildren: function (arr, resArr) {
    arr.forEach(item => {
      if (item.children.length === 0) {
        item.value = item.categoryId
        item.label = item.categoryName
        resArr.push(item)
      } else {
        this.formatCategoryListChildren(item.children, resArr)
      }
    })
  }
}
