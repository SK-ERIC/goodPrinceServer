
/**
 * 工具函数
 */

export const tools = {
	methods: {
		copyData(data) {
			var _this = this;
			uni.setClipboardData({
				data: data,
				success: function() {
					_this.$common.errorToShow('复制成功')
				}
			});
		}
	}
}
