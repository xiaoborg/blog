export default {
  formatCategoryList: function (arr) {
    arr.forEach(item => {
      item.key = item.categoryId
      item.action = 'action'
      item.value = item.categoryId
      item.title = item.categoryName
      if (item.children.length > 0) {
        this.formatCategoryList(item.children)
      }
    })
  },
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
