const ALL = 2

export default {
    data() {
        return {
            ratings: [],
            selectType: ALL,
            onlyContent: true,
        }
    },
    computed: {
        computedRatings() {
            let that = this
            let ret = []
            this.ratings.forEach((rating) => {
                if (that.onlyContent && !rating.text) {
                    return
                }
                if (that.selectType === ALL || that.selectType === rating.rateType) {
                    ret.push(rating)
                }
            })
            return ret
        }
    },
    methods: {
        onSelect(type) {
            this.selectType = type
        },
        onToggle(only) {
            this.onlyContent = only
        }
    }
}