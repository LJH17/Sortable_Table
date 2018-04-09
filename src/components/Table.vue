<template>
  <div class="home">
    <h1>{{ msg }}</h1>
     <form id="search">
        Search <input name="query" v-model="filterKey">
    </form>
    <table>
      <thead>
        <tr>
          <th v-for="key in columns"
            :key="key"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }">
            {{ key | capitalise }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredData" :key="entry.id">
          <td v-for="key in columns" :key="key">
            {{entry[key]}}
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import Data from '../data/data.json'

export default {
  name: 'Table',

  data () {
    let sortOrders = {}
    let keys = []
    for (let key in Data.data[0]) {
      keys.push(key)
    }
    keys.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      msg: 'Simple Vue.js Sortable Table that features querying by name and sku.',
      data: Data.data,
      columns: keys,
      sortOrders: sortOrders,
      sortKey: '',
      filterKey: ''
    }
  },

  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        // filtering for all keys
        // data = data.filter(function (row) {
        //   return Object.keys(row).some(function (key) {
        //     return String(row[key]).toLowerCase().indexOf(filterKey) > -1
        //   })
        // })

        // specific filtering
        data = data.filter(entry => {
          return entry.sku.toLowerCase().includes(this.filterKey.toLowerCase()) || entry.name.toLowerCase().includes(this.filterKey.toLowerCase())
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalise: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  body {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 14px;
    color: #444;
  }

  table {
    border: 2px solid #c4166a;
    border-radius: 3px;
    background-color: #fff;
  }

  th {
    background-color: #c4166a;
    color: rgba(255,255,255,0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  td {
    background-color: #f9f9f9;
  }

  th, td {
    min-width: 120px;
    padding: 10px 20px;
  }

  th.active {
    color: #fff;
  }

  th.active .arrow {
    opacity: 1;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>
