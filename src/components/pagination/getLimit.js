
import {eventBus} from './eventBus'
export function getLimit(num,callback) {
  $.ajax({
    url: '/getLimit',
    async: false,
    data:{num:num},
    success(data) {
      console.log(data);
      eventBus.$emit('click-data',data)
      callback()
    }
  });
}
