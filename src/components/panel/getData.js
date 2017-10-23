export function getData() {
  this.$http.get('/getAllNum')
    .then((res) => {
      return res.data
    },(err) => {
      console.log(err)
    });
}
