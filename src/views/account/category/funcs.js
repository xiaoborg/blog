export default {
  formatCategoryList: function (arr) {
    arr.forEach(element => {
      element.key = element.categoryId
      element.action = 'action'
      element.value = element.categoryId
      element.title = element.categoryName
      if (element.children.length > 0) {
        element.childrens = element.children
        this.formatCategoryList(element.children)
      }
    })
  }
}
