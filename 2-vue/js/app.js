import HistoryModel from './models/HistoryModel.js'
import KeywordModel from './models/KeywordModel.js'
import SearchModel from './models/SearchModel.js'

new Vue({
    el: '#app',
    data: {
        query: '',
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '',
        keywords: [],
        history: [],
        searchResult: []
    },
    created() {
        this.selectedTab = this.tabs[1]
        this.fetchKeyword()
        this.fetchHistory()
    },
    methods: {
        onSubmit(e) {
            //console.log(e)
            this.search()
        },
        onKeyup(e) {
            //console.log(e)
            if (!this.query.length) this.onReset()
        },
        onReset(e) {
            //console.log(e)
            this.resetForm()
        },
        onClickTab(tab) {
            //console.log(tab)
            this.selectedTab = tab
        },
        onClickKeyword(keyword) {
            this.query = keyword
            this.search()
        },
        onClickRemoveHistory(keyword) {
            HistoryModel.remove(keyword)
            this.fetchHistory()
        },
        fetchKeyword() {
            KeywordModel.list().then(data => {
                this.keywords = data
            })
        },
        fetchHistory() {
            HistoryModel.list().then(data => {
                this.history = data
            })
        },
        search() {
            SearchModel.list().then(data => {
                this.submitted = true
                this.searchResult = data
            })
            HistoryModel.add(this.query)
            this.fetchHistory()
        },
        resetForm() {
            this.query = ''
            this.submitted = false
            this.searchResult = []
        }

    }
})